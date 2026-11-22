import { io, type Socket } from 'socket.io-client';
import type {
  BoatBuildPayload,
  BoatChestTransferPayload,
  BoatControlPayload,
  BoatState,
  BuildPlacePayload,
  ChatMessage,
  ChestTransferPayload,
  ClientToServerEvents,
  FloatingCombatEvent,
  JoinRoomPayload,
  LocalPlayerPrivateState,
  LootDropState,
  PlayerInputPayload,
  PrimaryActionPayload,
  ResourceNodeState,
  RoomSummary,
  ServerToClientEvents,
  StructureState,
  WorldInitPayload,
  WorldPing,
  WorldSnapshotPayload,
} from '@wildreach/shared';
import { LocalGameEngine } from './LocalGameEngine';
import { P2PMultiplayerBridge, type P2PMessage } from './P2PMultiplayerBridge';

export type TransportMode = 'dedicated' | 'p2p-host' | 'p2p-client';

export interface NetworkHandlers {
  onSnapshot: (snap: WorldSnapshotPayload) => void;
  onPrivateState: (priv: LocalPlayerPrivateState) => void;
  onNodeUpdate: (node: ResourceNodeState) => void;
  onNodeFell: (payload: { id: string; dirX: number; dirZ: number }) => void;
  onStructureAdd: (st: StructureState) => void;
  onStructureUpdate: (st: StructureState) => void;
  onStructureRemove: (id: string) => void;
  onBoatAdd: (boat: BoatState) => void;
  onBoatUpdate: (boat: BoatState) => void;
  onBoatRemove: (id: string) => void;
  onLootAdd: (loot: LootDropState) => void;
  onLootRemove: (id: string) => void;
  onCombatEvent: (ev: FloatingCombatEvent) => void;
  onFxEvent: (ev: {
    kind: 'chop' | 'mine' | 'hit' | 'arrow_hit' | 'build' | 'eat' | 'drink' | 'thunder' | 'levelup';
    x: number;
    y: number;
    z: number;
    color?: string;
  }) => void;
  onChatMessage: (msg: ChatMessage) => void;
  onWorldPing?: (ping: WorldPing) => void;
  onToast: (payload: { text: string; tone?: 'info' | 'good' | 'warn' | 'danger' }) => void;
  onConnectionChange: (connected: boolean, reconnecting?: boolean) => void;
  onRejoined?: (init: WorldInitPayload) => void;
}

function getOrCreatePlayerToken(): string {
  const key = 'wildreach_player_token_v1';
  try {
    const existing = window.localStorage.getItem(key);
    if (existing && existing.length >= 8) return existing;
    const created = `wr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
    window.localStorage.setItem(key, created);
    return created;
  } catch {
    return `wr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export class NetworkClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private localEngine: LocalGameEngine | null = null;
  private p2p: P2PMultiplayerBridge | null = null;
  private handlers: NetworkHandlers | null = null;
  private pingTimer: number | null = null;
  private serverUrl = '';
  private staticHostDetected: boolean | null = null;
  private lastJoinPayload: JoinRoomPayload | null = null;
  private joinedOnce = false;
  private playerToken = getOrCreatePlayerToken();

  pingMs = 0;
  isOfflineMode = false;
  transportMode: TransportMode = 'dedicated';
  currentRoomId = 'emerald-archipelago';

  constructor() {
    const params = new URLSearchParams(window.location.search);
    const paramServer = params.get('server');
    if (paramServer) {
      this.serverUrl = paramServer.trim().replace(/\/+$/, '');
    }
  }

  getServerUrl(): string {
    return this.serverUrl;
  }

  setServerUrl(url: string): void {
    const clean = url.trim().replace(/\/+$/, '');
    if (clean !== this.serverUrl) {
      this.serverUrl = clean;
      this.staticHostDetected = null;
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    }
  }

  private isStaticHost(): boolean {
    if (this.serverUrl) return false;
    if (this.staticHostDetected === true) return true;
    const host = window.location.hostname;
    return (
      window.location.protocol === 'file:' ||
      host.endsWith('.github.io') ||
      host.endsWith('raw.githack.com') ||
      host.endsWith('htmlpreview.github.io')
    );
  }

  async fetchRooms(): Promise<{ rooms: RoomSummary[]; serverReachable: boolean }> {
    if (this.isStaticHost()) {
      this.staticHostDetected = true;
      return { rooms: [], serverReachable: false };
    }
    try {
      const base = this.serverUrl || '';
      const ctrl = new AbortController();
      const t = window.setTimeout(() => ctrl.abort(), 2200);
      const res = await fetch(`${base}/api/rooms`, { signal: ctrl.signal });
      window.clearTimeout(t);
      const ct = res.headers.get('content-type') || '';
      if (!res.ok || !ct.includes('application/json')) {
        if (!this.serverUrl) this.staticHostDetected = true;
        return { rooms: [], serverReachable: false };
      }
      const data = (await res.json()) as { rooms?: RoomSummary[] };
      this.staticHostDetected = false;
      return { rooms: data.rooms ?? [], serverReachable: true };
    } catch {
      if (!this.serverUrl) this.staticHostDetected = true;
      return { rooms: [], serverReachable: false };
    }
  }

  connect(handlers: NetworkHandlers): Promise<{ online: boolean; mode: TransportMode }> {
    this.handlers = handlers;
    this.teardownP2P();

    if (this.isStaticHost()) {
      this.isOfflineMode = true;
      this.transportMode = 'p2p-host';
      return Promise.resolve({ online: false, mode: 'p2p-host' });
    }

    if (this.socket?.connected) {
      this.isOfflineMode = false;
      this.transportMode = 'dedicated';
      return Promise.resolve({ online: true, mode: 'dedicated' });
    }

    return new Promise((resolve) => {
      const target = this.serverUrl || undefined;
      const sock: Socket<ServerToClientEvents, ClientToServerEvents> = io(target, {
        path: '/socket.io',
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 6000,
        timeout: 2600,
      });
      this.socket = sock;

      let settled = false;
      const fallbackToP2P = () => {
        if (settled) return;
        settled = true;
        sock.disconnect();
        this.socket = null;
        this.isOfflineMode = true;
        this.transportMode = 'p2p-host';
        resolve({ online: false, mode: 'p2p-host' });
      };

      const failTimer = window.setTimeout(fallbackToP2P, 2600);

      sock.on('connect', () => {
        if (!settled) {
          settled = true;
          window.clearTimeout(failTimer);
          this.isOfflineMode = false;
          this.transportMode = 'dedicated';
          this.localEngine?.stop();
          this.localEngine = null;
          handlers.onConnectionChange(true, false);
          this.startPingLoop();
          resolve({ online: true, mode: 'dedicated' });
          return;
        }

        // Seamless Automatic Rejoin on network recovery!
        if (this.joinedOnce && this.lastJoinPayload) {
          handlers.onToast({ text: 'Reconnected to server — restoring your island state...', tone: 'good' });
          sock.emit(
            'room:join',
            { ...this.lastJoinPayload, playerToken: this.playerToken },
            (res) => {
              if (res.ok && res.init) {
                handlers.onConnectionChange(true, false);
                handlers.onRejoined?.(res.init);
              }
            }
          );
        }
      });

      sock.on('connect_error', () => {
        if (!settled) {
          window.clearTimeout(failTimer);
          fallbackToP2P();
        }
      });

      sock.on('disconnect', () => {
        if (!this.isOfflineMode && this.joinedOnce) {
          handlers.onConnectionChange(false, true);
        }
      });

      sock.on('world:snapshot', handlers.onSnapshot);
      sock.on('player:private', handlers.onPrivateState);
      sock.on('node:update', handlers.onNodeUpdate);
      sock.on('node:fell', handlers.onNodeFell);
      sock.on('structure:add', handlers.onStructureAdd);
      sock.on('structure:update', handlers.onStructureUpdate);
      sock.on('structure:remove', handlers.onStructureRemove);
      sock.on('boat:add', handlers.onBoatAdd);
      sock.on('boat:update', handlers.onBoatUpdate);
      sock.on('boat:remove', handlers.onBoatRemove);
      sock.on('loot:add', handlers.onLootAdd);
      sock.on('loot:remove', handlers.onLootRemove);
      sock.on('combat:event', handlers.onCombatEvent);
      sock.on('fx:event', handlers.onFxEvent);
      sock.on('chat:message', handlers.onChatMessage);
      sock.on('world:ping', (p) => handlers.onWorldPing?.(p));
      sock.on('toast:notify', handlers.onToast);
    });
  }

  private teardownP2P(): void {
    if (this.p2p) {
      this.p2p.close();
      this.p2p = null;
    }
    if (this.localEngine) {
      this.localEngine.stop();
      this.localEngine = null;
    }
  }

  private startPingLoop(): void {
    if (this.pingTimer) window.clearInterval(this.pingTimer);
    this.pingTimer = window.setInterval(() => {
      if (this.transportMode === 'dedicated') {
        if (!this.socket?.connected) return;
        const t0 = performance.now();
        this.socket.emit('net:ping', Date.now(), () => {
          this.pingMs = Math.round(performance.now() - t0);
        });
      } else if (this.transportMode === 'p2p-client' && this.p2p) {
        this.p2p.send({ type: 'ping', peerId: this.p2p.peerId, t: performance.now() });
      } else {
        this.pingMs = 0;
      }
    }, 3000);
  }

  async joinRoom(payload: JoinRoomPayload): Promise<WorldInitPayload> {
    const cleanRoomId =
      (payload.roomId || 'emerald-archipelago')
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
        .slice(0, 32) || 'emerald-archipelago';
    this.currentRoomId = cleanRoomId;
    this.lastJoinPayload = { ...payload, roomId: cleanRoomId, playerToken: this.playerToken };

    // 1. Dedicated Authoritative Node.js Server
    if (!this.isOfflineMode && this.socket) {
      this.transportMode = 'dedicated';
      const init = await new Promise<WorldInitPayload>((resolve, reject) => {
        this.socket!.emit('room:join', this.lastJoinPayload!, (res) => {
          if (res.ok && res.init) resolve(res.init);
          else reject(new Error(res.error || 'Failed to join world'));
        });
      });
      this.joinedOnce = true;
      return init;
    }

    // 2. Serverless WebRTC + BroadcastChannel P2P Multiplayer (works on GitHub Pages with ZERO server!)
    return this.joinP2PRoom(cleanRoomId, this.lastJoinPayload);
  }

  private async joinP2PRoom(roomId: string, payload: JoinRoomPayload): Promise<WorldInitPayload> {
    const handlers = this.handlers!;
    this.teardownP2P();

    return new Promise<WorldInitPayload>((resolve) => {
      let resolved = false;
      let discoveredHostId: string | null = null;
      let hostReady = false;

      const bridge = new P2PMultiplayerBridge(roomId, {
        onMessage: (msg: P2PMessage, fromPeerId: string) => {
          // ---- GUEST RECEIVES FROM HOST ----
          if (msg.type === 'host_here' && !resolved && !discoveredHostId) {
            discoveredHostId = msg.peerId;
            bridge.send({ type: 'join_req', peerId: bridge.peerId, payload });
            return;
          }
          if (msg.type === 'join_res' && msg.targetPeerId === bridge.peerId && !resolved) {
            if (msg.ok && msg.init) {
              resolved = true;
              this.transportMode = 'p2p-client';
              this.joinedOnce = true;
              this.startPingLoop();
              handlers.onToast({ text: '⚡ Connected to friend via WebRTC P2P!', tone: 'good' });
              resolve(msg.init as WorldInitPayload);
            }
            return;
          }
          if (msg.type === 'pong' && msg.targetPeerId === bridge.peerId) {
            this.pingMs = Math.max(1, Math.round(performance.now() - msg.t));
            return;
          }
          if (msg.type === 'server_event' && this.transportMode === 'p2p-client') {
            if (msg.targetPeerId && msg.targetPeerId !== bridge.peerId) return;
            this.dispatchServerEvent(msg.event, msg.data);
            return;
          }

          // ---- HOST RECEIVES FROM FRIENDS ----
          if (hostReady && this.localEngine && this.transportMode === 'p2p-host') {
            if (msg.type === 'who_is_host') {
              const meta = this.localEngine.getRoomMeta();
              bridge.send({
                type: 'host_here',
                peerId: bridge.peerId,
                roomName: meta.roomName,
                seed: meta.seed,
                playerCount: meta.playerCount,
              });
            } else if (msg.type === 'join_req') {
              const init = this.localEngine.addRemotePeer(
                msg.peerId,
                msg.payload as JoinRoomPayload
              );
              bridge.send({ type: 'join_res', targetPeerId: msg.peerId, ok: true, init });
            } else if (msg.type === 'client_event') {
              this.localEngine.handlePeerCommand(msg.peerId, msg.event, msg.data);
            } else if (msg.type === 'ping') {
              bridge.send({ type: 'pong', targetPeerId: msg.peerId, t: msg.t });
            }
          }
          void fromPeerId;
        },
        onPeerLeave: (peerId: string) => {
          if (this.transportMode === 'p2p-host' && this.localEngine) {
            this.localEngine.removeRemotePeer(peerId);
          } else if (this.transportMode === 'p2p-client' && peerId === discoveredHostId) {
            handlers.onToast({
              text: 'Host left the P2P room — refresh or join another room to continue.',
              tone: 'warn',
            });
          }
        },
      });
      this.p2p = bridge;

      // Probe for an existing host on WebRTC + BroadcastChannel
      bridge.send({ type: 'who_is_host', peerId: bridge.peerId });
      const retryProbe = window.setTimeout(() => {
        if (!resolved && !discoveredHostId) {
          bridge.send({ type: 'who_is_host', peerId: bridge.peerId });
        }
      }, 380);

      // If no host answers within 950ms, seamlessly become the Authoritative P2P Room Host!
      window.setTimeout(() => {
        window.clearTimeout(retryProbe);
        if (resolved) return;
        resolved = true;
        this.transportMode = 'p2p-host';
        this.localEngine = new LocalGameEngine(handlers);
        this.localEngine.setBroadcastHook((event, data, targetPeerId) => {
          bridge.send({ type: 'server_event', targetPeerId, event, data });
        });
        const init = this.localEngine.startSession(payload);
        hostReady = true;
        this.joinedOnce = true;
        this.startPingLoop();
        // Announce presence so late/simultaneous joiners find us immediately
        const meta = this.localEngine.getRoomMeta();
        bridge.send({
          type: 'host_here',
          peerId: bridge.peerId,
          roomName: meta.roomName,
          seed: meta.seed,
          playerCount: meta.playerCount,
        });
        resolve(init);
      }, 950);
    });
  }

  private dispatchServerEvent(event: string, data: unknown): void {
    const h = this.handlers;
    if (!h) return;
    switch (event) {
      case 'world:snapshot': h.onSnapshot(data as WorldSnapshotPayload); break;
      case 'player:private': h.onPrivateState(data as LocalPlayerPrivateState); break;
      case 'node:update': h.onNodeUpdate(data as ResourceNodeState); break;
      case 'node:fell': h.onNodeFell(data as { id: string; dirX: number; dirZ: number }); break;
      case 'structure:add': h.onStructureAdd(data as StructureState); break;
      case 'structure:update': h.onStructureUpdate(data as StructureState); break;
      case 'structure:remove': h.onStructureRemove(data as string); break;
      case 'boat:add': h.onBoatAdd(data as BoatState); break;
      case 'boat:update': h.onBoatUpdate(data as BoatState); break;
      case 'boat:remove': h.onBoatRemove(data as string); break;
      case 'loot:add': h.onLootAdd(data as LootDropState); break;
      case 'loot:remove': h.onLootRemove(data as string); break;
      case 'combat:event': h.onCombatEvent(data as FloatingCombatEvent); break;
      case 'fx:event': h.onFxEvent(data as Parameters<NetworkHandlers['onFxEvent']>[0]); break;
      case 'chat:message': h.onChatMessage(data as ChatMessage); break;
      case 'world:ping': h.onWorldPing?.(data as WorldPing); break;
      case 'toast:notify': h.onToast(data as { text: string; tone?: 'info' | 'good' | 'warn' | 'danger' }); break;
    }
  }

  private emitP2PClient(event: string, data: unknown): void {
    if (!this.p2p) return;
    this.p2p.send({ type: 'client_event', peerId: this.p2p.peerId, event, data });
  }

  sendInput(payload: PlayerInputPayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:input', payload);
    else if (this.isOfflineMode) this.localEngine?.handleInput(payload);
    else this.socket?.emit('player:input', payload);
  }
  sendEquip(slot: number): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:equip', slot);
    else if (this.isOfflineMode) this.localEngine?.handleEquip(slot);
    else this.socket?.emit('player:equip', slot);
  }
  sendAction(payload: PrimaryActionPayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:action', payload);
    else if (this.isOfflineMode) this.localEngine?.handleAction(payload);
    else this.socket?.emit('player:action', payload);
  }
  sendDodge(dir: { x: number; z: number }): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:dodge', dir);
    else if (this.isOfflineMode) this.localEngine?.handleDodge(dir);
    else this.socket?.emit('player:dodge', dir);
  }
  sendInteract(payload: { structureId?: string; lootId?: string; drinkWater?: boolean }): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:interact', payload);
    else if (this.isOfflineMode) this.localEngine?.handleInteract(payload);
    else this.socket?.emit('player:interact', payload);
  }
  sendConsume(slot: number): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:consume', slot);
    else if (this.isOfflineMode) this.localEngine?.handleConsume(slot);
    else this.socket?.emit('player:consume', slot);
  }
  sendEquipArmor(slot: number): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:equipArmor', slot);
    else if (this.isOfflineMode) this.localEngine?.handleEquipArmor(slot);
    else this.socket?.emit('player:equipArmor', slot);
  }
  sendSwapSlots(from: number, to: number): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:swapSlots', { from, to });
    else if (this.isOfflineMode) this.localEngine?.handleSwapSlots(from, to);
    else this.socket?.emit('player:swapSlots', { from, to });
  }
  sendDropSlot(slotIndex: number, count?: number): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:dropSlot', { slotIndex, count });
    else if (this.isOfflineMode) this.localEngine?.handleDropSlot(slotIndex);
    else this.socket?.emit('player:dropSlot', { slotIndex, count });
  }
  sendCraft(recipeId: string): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:craft', recipeId);
    else if (this.isOfflineMode) this.localEngine?.handleCraft(recipeId);
    else this.socket?.emit('player:craft', recipeId);
  }
  sendBuild(payload: BuildPlacePayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:build', payload);
    else if (this.isOfflineMode) this.localEngine?.handleBuild(payload);
    else this.socket?.emit('player:build', payload);
  }
  sendDemolish(structureId: string): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:demolish', structureId);
    else if (this.isOfflineMode) this.localEngine?.handleDemolish(structureId);
    else this.socket?.emit('player:demolish', structureId);
  }
  sendChestTransfer(payload: ChestTransferPayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:chestTransfer', payload);
    else if (this.isOfflineMode) this.localEngine?.handleChestTransfer(payload);
    else this.socket?.emit('player:chestTransfer', payload);
  }
  sendBuildBoat(payload: BoatBuildPayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('boat:build', payload);
    else if (this.isOfflineMode) this.localEngine?.handleBuildBoat(payload);
    else this.socket?.emit('boat:build', payload);
  }
  sendBoardBoat(boatId: string | null): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('boat:board', boatId);
    else if (this.isOfflineMode) this.localEngine?.handleBoardBoat(boatId);
    else this.socket?.emit('boat:board', boatId);
  }
  sendBoatControl(payload: BoatControlPayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('boat:control', payload);
    else if (this.isOfflineMode) this.localEngine?.handleBoatControl(payload);
    else this.socket?.emit('boat:control', payload);
  }
  sendBoatChestTransfer(payload: BoatChestTransferPayload): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('boat:chestTransfer', payload);
    else if (this.isOfflineMode) this.localEngine?.handleBoatChestTransfer(payload);
    else this.socket?.emit('boat:chestTransfer', payload);
  }
  sendFishCatch(deepWater: boolean): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:fishCatch', { deepWater });
    else if (this.isOfflineMode) this.localEngine?.handleFishCatch({ deepWater });
    else this.socket?.emit('player:fishCatch', { deepWater });
  }
  sendWorldPing(payload: { x: number; y: number; z: number; label?: string }): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:pingWorld', payload);
    else if (this.isOfflineMode) this.localEngine?.handleWorldPing(payload);
    else this.socket?.emit('player:pingWorld', payload);
  }
  sendRevive(targetPlayerId: string): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:revive', targetPlayerId);
    else if (this.isOfflineMode) this.localEngine?.handleRevive(targetPlayerId);
    else this.socket?.emit('player:revive', targetPlayerId);
  }
  sendTeleportToFriend(targetPlayerId: string): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:teleportToFriend', targetPlayerId);
    else if (this.isOfflineMode) this.localEngine?.handleTeleportToFriend(targetPlayerId);
    else this.socket?.emit('player:teleportToFriend', targetPlayerId);
  }
  sendRespawn(): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:respawn', null);
    else if (this.isOfflineMode) this.localEngine?.handleRespawn();
    else this.socket?.emit('player:respawn');
  }
  sendTogglePvp(): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:togglePvp', null);
    else if (this.isOfflineMode) this.localEngine?.handleTogglePvp();
    else this.socket?.emit('player:togglePvp');
  }
  sendEmote(emote: string): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:emote', emote);
    else if (this.isOfflineMode) this.localEngine?.handleEmote(emote);
    else this.socket?.emit('player:emote', emote);
  }
  sendSpawnBot(): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('player:spawnBot', null);
    else if (this.isOfflineMode) this.localEngine?.spawnBot();
    else this.socket?.emit('player:spawnBot');
  }
  sendChat(text: string): void {
    if (this.transportMode === 'p2p-client') this.emitP2PClient('chat:send', text);
    else if (this.isOfflineMode) this.localEngine?.handleChat(text);
    else this.socket?.emit('chat:send', text);
  }
}
