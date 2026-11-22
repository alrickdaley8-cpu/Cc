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
  WorldSnapshotPayload,
} from '@wildreach/shared';
import { LocalGameEngine } from './LocalGameEngine';

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
  onToast: (payload: { text: string; tone?: 'info' | 'good' | 'warn' | 'danger' }) => void;
  onConnectionChange: (connected: boolean) => void;
}

export class NetworkClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private localEngine: LocalGameEngine | null = null;
  private pingTimer: number | null = null;
  private serverUrl = '';
  private staticHostDetected: boolean | null = null;
  pingMs = 0;
  isOfflineMode = false;

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

  connect(handlers: NetworkHandlers): Promise<{ online: boolean }> {
    if (this.isStaticHost()) {
      this.isOfflineMode = true;
      this.localEngine = new LocalGameEngine(handlers);
      return Promise.resolve({ online: false });
    }

    if (this.socket?.connected) {
      this.isOfflineMode = false;
      return Promise.resolve({ online: true });
    }

    return new Promise((resolve) => {
      const target = this.serverUrl || undefined;
      const sock: Socket<ServerToClientEvents, ClientToServerEvents> = io(target, {
        path: '/socket.io',
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 2,
        reconnectionDelay: 800,
        timeout: 2600,
      });
      this.socket = sock;

      let settled = false;
      const fallbackToLocal = () => {
        if (settled) return;
        settled = true;
        sock.disconnect();
        this.socket = null;
        this.isOfflineMode = true;
        this.localEngine = new LocalGameEngine(handlers);
        resolve({ online: false });
      };

      const failTimer = window.setTimeout(fallbackToLocal, 2800);

      sock.on('connect', () => {
        if (!settled) {
          settled = true;
          window.clearTimeout(failTimer);
          this.isOfflineMode = false;
          this.localEngine?.stop();
          this.localEngine = null;
          handlers.onConnectionChange(true);
          this.startPingLoop();
          resolve({ online: true });
        }
      });

      sock.on('connect_error', () => {
        if (!settled) {
          window.clearTimeout(failTimer);
          fallbackToLocal();
        }
      });

      sock.on('disconnect', () => {
        if (!this.isOfflineMode) handlers.onConnectionChange(false);
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
      sock.on('toast:notify', handlers.onToast);
    });
  }

  private startPingLoop(): void {
    if (this.pingTimer) window.clearInterval(this.pingTimer);
    this.pingTimer = window.setInterval(() => {
      if (!this.socket?.connected) return;
      const t0 = performance.now();
      this.socket.emit('net:ping', Date.now(), () => {
        this.pingMs = Math.round(performance.now() - t0);
      });
    }, 3000);
  }

  joinRoom(payload: JoinRoomPayload): Promise<WorldInitPayload> {
    if (this.isOfflineMode && this.localEngine) {
      return Promise.resolve(this.localEngine.startSession(payload));
    }
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('Not connected'));
      this.socket.emit('room:join', payload, (res) => {
        if (res.ok && res.init) resolve(res.init);
        else reject(new Error(res.error || 'Failed to join world'));
      });
    });
  }

  sendInput(payload: PlayerInputPayload): void {
    if (this.isOfflineMode) this.localEngine?.handleInput(payload);
    else this.socket?.emit('player:input', payload);
  }
  sendEquip(slot: number): void {
    if (this.isOfflineMode) this.localEngine?.handleEquip(slot);
    else this.socket?.emit('player:equip', slot);
  }
  sendAction(payload: PrimaryActionPayload): void {
    if (this.isOfflineMode) this.localEngine?.handleAction(payload);
    else this.socket?.emit('player:action', payload);
  }
  sendDodge(dir: { x: number; z: number }): void {
    if (this.isOfflineMode) this.localEngine?.handleDodge(dir);
    else this.socket?.emit('player:dodge', dir);
  }
  sendInteract(payload: { structureId?: string; lootId?: string; drinkWater?: boolean }): void {
    if (this.isOfflineMode) this.localEngine?.handleInteract(payload);
    else this.socket?.emit('player:interact', payload);
  }
  sendConsume(slot: number): void {
    if (this.isOfflineMode) this.localEngine?.handleConsume(slot);
    else this.socket?.emit('player:consume', slot);
  }
  sendEquipArmor(slot: number): void {
    if (this.isOfflineMode) this.localEngine?.handleEquipArmor(slot);
    else this.socket?.emit('player:equipArmor', slot);
  }
  sendSwapSlots(from: number, to: number): void {
    if (this.isOfflineMode) this.localEngine?.handleSwapSlots(from, to);
    else this.socket?.emit('player:swapSlots', { from, to });
  }
  sendDropSlot(slotIndex: number, count?: number): void {
    if (this.isOfflineMode) this.localEngine?.handleDropSlot(slotIndex);
    else this.socket?.emit('player:dropSlot', { slotIndex, count });
  }
  sendCraft(recipeId: string): void {
    if (this.isOfflineMode) this.localEngine?.handleCraft(recipeId);
    else this.socket?.emit('player:craft', recipeId);
  }
  sendBuild(payload: BuildPlacePayload): void {
    if (this.isOfflineMode) this.localEngine?.handleBuild(payload);
    else this.socket?.emit('player:build', payload);
  }
  sendDemolish(structureId: string): void {
    if (this.isOfflineMode) this.localEngine?.handleDemolish(structureId);
    else this.socket?.emit('player:demolish', structureId);
  }
  sendChestTransfer(payload: ChestTransferPayload): void {
    if (this.isOfflineMode) this.localEngine?.handleChestTransfer(payload);
    else this.socket?.emit('player:chestTransfer', payload);
  }
  sendBuildBoat(payload: BoatBuildPayload): void {
    if (this.isOfflineMode) this.localEngine?.handleBuildBoat(payload);
    else this.socket?.emit('boat:build', payload);
  }
  sendBoardBoat(boatId: string | null): void {
    if (this.isOfflineMode) this.localEngine?.handleBoardBoat(boatId);
    else this.socket?.emit('boat:board', boatId);
  }
  sendBoatControl(payload: BoatControlPayload): void {
    if (this.isOfflineMode) this.localEngine?.handleBoatControl(payload);
    else this.socket?.emit('boat:control', payload);
  }
  sendBoatChestTransfer(payload: BoatChestTransferPayload): void {
    if (this.isOfflineMode) this.localEngine?.handleBoatChestTransfer(payload);
    else this.socket?.emit('boat:chestTransfer', payload);
  }
  sendFishCatch(deepWater: boolean): void {
    if (this.isOfflineMode) this.localEngine?.handleFishCatch({ deepWater });
    else this.socket?.emit('player:fishCatch', { deepWater });
  }
  sendRespawn(): void {
    if (this.isOfflineMode) this.localEngine?.handleRespawn();
    else this.socket?.emit('player:respawn');
  }
  sendTogglePvp(): void {
    if (!this.isOfflineMode) this.socket?.emit('player:togglePvp');
  }
  sendEmote(emote: string): void {
    if (!this.isOfflineMode) this.socket?.emit('player:emote', emote);
  }
  sendSpawnBot(): void {
    if (this.isOfflineMode) this.localEngine?.spawnBot();
    else this.socket?.emit('player:spawnBot');
  }
  sendChat(text: string): void {
    if (this.isOfflineMode) this.localEngine?.handleChat(text);
    else this.socket?.emit('chat:send', text);
  }
}
