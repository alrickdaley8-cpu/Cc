import {
  BOATS,
  CHEST_SIZE,
  DAY_LENGTH_SECONDS,
  HOTBAR_SIZE,
  INVENTORY_SIZE,
  ITEMS,
  RESOURCE_NODE_BLUEPRINTS,
  STRUCTURES,
  WATER_LEVEL,
  WorldGenerator,
  clamp,
  computeSnappedPlacement,
  computeWindSailEfficiency,
  getItem,
  getRecipe,
  type BoatBuildPayload,
  type BoatChestTransferPayload,
  type BoatControlPayload,
  type BoatState,
  type BuildPlacePayload,
  type ChatMessage,
  type ChestTransferPayload,
  type InventorySlot,
  type JoinRoomPayload,
  type LocalPlayerPrivateState,
  type LootDropState,
  type PlayerInputPayload,
  type PlayerOutfit,
  type PlayerState,
  type PrimaryActionPayload,
  type ProjectileState,
  type ResourceNodeState,
  type StructureState,
  type WeatherType,
  type WildlifeKind,
  type WildlifeState,
  type WorldInitPayload,
  type WorldPing,
  type WorldTimeState,
} from '@wildreach/shared';
import type { NetworkHandlers } from './NetworkClient';
import { startUnthrottledInterval } from './P2PMultiplayerBridge';

interface LocalWildlife extends WildlifeState {
  homeX: number;
  homeZ: number;
  targetX: number;
  targetZ: number;
  thinkTimer: number;
  attackCooldown: number;
  aggroUntil: number;
  respawnAt: number;
}

const MOB_CFG: Record<
  WildlifeKind,
  { maxHp: number; walk: number; run: number; dmg: number; hostile: boolean; xp: number; drops: [string, number, number][] }
> = {
  deer: { maxHp: 65, walk: 2.3, run: 7.2, dmg: 0, hostile: false, xp: 24, drops: [['raw_meat', 2, 3], ['hide', 2, 3]] },
  boar: { maxHp: 95, walk: 2.4, run: 6.0, dmg: 14, hostile: true, xp: 35, drops: [['raw_meat', 2, 4], ['hide', 1, 3]] },
  wolf: { maxHp: 115, walk: 3.0, run: 7.1, dmg: 20, hostile: true, xp: 48, drops: [['raw_meat', 1, 3], ['hide', 2, 3], ['fang', 1, 2]] },
  stalker: { maxHp: 185, walk: 3.4, run: 7.6, dmg: 26, hostile: true, xp: 95, drops: [['shadow_essence', 1, 3], ['ancient_shard', 1, 2]] },
  crab: { maxHp: 55, walk: 2.2, run: 4.4, dmg: 9, hostile: true, xp: 22, drops: [['crab_claw', 1, 2], ['sea_pearl', 1, 1]] },
  serpent: { maxHp: 260, walk: 4.5, run: 8.5, dmg: 26, hostile: true, xp: 120, drops: [['serpent_scale', 2, 4], ['raw_fish', 2, 4]] },
  cinder_golem: { maxHp: 420, walk: 2.4, run: 5.2, dmg: 36, hostile: true, xp: 180, drops: [['obsidian', 3, 5], ['volcanic_core', 1, 2], ['ancient_shard', 2, 3], ['sunken_gold', 3, 6]] },
};

/**
 * Full client-side simulation & P2P Host engine used automatically when WILDREACH
 * runs on GitHub Pages / static hosts (zero backend required!). Supports both solo
 * play AND real-time multi-player WebRTC P2P friends joining the host's world!
 */
export class LocalGameEngine {
  private handlers: NetworkHandlers;
  private world!: WorldGenerator;
  private roomId = 'emerald-archipelago';
  private roomName = 'Emerald Archipelago (P2P Host)';
  private seed = 42077;

  private localPlayer!: PlayerState;
  private remotePeers = new Map<string, { player: PlayerState; priv: LocalPlayerPrivateState }>();
  private boatSteers = new Map<string, number>();
  private activePings: WorldPing[] = [];
  private broadcastHook: ((event: string, data: unknown, targetPeerId?: string) => void) | null = null;
  private bots: (PlayerState & { homeX: number; homeZ: number; goalX: number; goalZ: number; timer: number; cd: number })[] = [];
  private priv!: LocalPlayerPrivateState;
  private nodes = new Map<string, ResourceNodeState>();
  private structures = new Map<string, StructureState>();
  private boats = new Map<string, BoatState>();
  private boatSteer = 0;
  private wildlife = new Map<string, LocalWildlife>();
  private loot = new Map<string, LootDropState>();
  private projectiles = new Map<string, ProjectileState & { bornAt: number }>();
  private stopTicker: (() => void) | null = null;

  private time: WorldTimeState = {
    day: 1,
    timeOfDay: 0.31,
    weather: 'clear',
    weatherIntensity: 0,
    windDirX: 0.78,
    windDirZ: 0.62,
    windSpeed: 1.0,
  };
  private weatherTimer = 90;
  private thunderTimer = 14;
  private wasNight = false;
  private seq = 1;
  private lastAction = 0;
  private lastDodge = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private lastTick = performance.now();
  private saveTimer = 0;

  constructor(handlers: NetworkHandlers) {
    this.handlers = handlers;
  }

  startSession(payload: JoinRoomPayload): WorldInitPayload {
    this.stop();
    this.roomId = (payload.roomId || 'emerald-archipelago').toLowerCase().replace(/[^a-z0-9-_]/g, '') || 'emerald-archipelago';
    this.roomName = `${payload.roomName || this.roomId} (Local World)`;
    this.seed = typeof payload.seed === 'number' && Number.isFinite(payload.seed) ? Math.abs(Math.floor(payload.seed)) % 999999 : 42077;
    this.world = new WorldGenerator(this.seed);

    this.nodes.clear();
    for (const n of this.world.generateResourceNodes()) this.nodes.set(n.id, n);

    this.structures.clear();
    this.boats.clear();
    this.loot.clear();
    this.projectiles.clear();
    this.bots = [];

    if (!this.loadLocalSave()) {
      this.seedStarterCamp();
    }
    this.ensureStarterBoat();

    const sp = this.world.getSpawnPoint();
    const inv: (InventorySlot | null)[] = Array.from({ length: INVENTORY_SIZE }, () => null);
    inv[0] = { itemId: 'stone_axe', count: 1, durability: ITEMS.stone_axe.maxDurability };
    inv[1] = { itemId: 'torch', count: 1, durability: ITEMS.torch.maxDurability };
    inv[2] = { itemId: 'build_hammer', count: 1, durability: ITEMS.build_hammer.maxDurability };
    inv[3] = { itemId: 'berries', count: 6 };
    inv[4] = { itemId: 'bandage', count: 2 };

    this.localPlayer = {
      id: 'local_player',
      name: (payload.playerName || 'Survivor').trim().slice(0, 18) || 'Survivor',
      isBot: false,
      outfit: payload.outfit || 'ranger',
      x: sp.x,
      y: sp.y,
      z: sp.z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: Math.PI,
      pitch: 0,
      anim: 'idle',
      swingTime: 0,
      equippedSlot: 0,
      equippedItemId: 'stone_axe',
      armorItemId: null,
      armorRating: 0,
      vitals: { hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, hunger: 92, thirst: 92, warmth: 58 },
      status: {
        sheltered: false,
        warm: true,
        wellFed: true,
        wet: false,
        chilled: false,
        nearCampfire: false,
        nearWorkbench: false,
        nearFurnace: false,
        nearRunicForge: false,
        nearCauldron: false,
        nearFreshWater: false,
      },
      alive: true,
      respawnAt: 0,
      bedPos: null,
      pvpEnabled: false,
      level: 1,
      xp: 0,
      kills: 0,
      daysSurvived: 1,
      emote: null,
      emoteUntil: 0,
      boatId: null,
    };

    this.priv = {
      inventory: inv,
      armorSlot: null,
      objectives: {
        gather_resources: false,
        craft_tool: false,
        build_shelter: false,
        cook_food: false,
        hunt_wildlife: false,
        smelt_iron: false,
      },
    };

    if (payload.spawnAiCompanions) {
      this.spawnBot();
    }

    this.localPlayer.isHost = true;
    this.spawnInitialWildlife();

    this.lastTick = performance.now();
    this.stopTicker = startUnthrottledInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - this.lastTick) / 1000);
      this.lastTick = now;
      this.tick(dt, Date.now());
    }, 50);

    const welcome: ChatMessage = {
      id: 'sys_welcome',
      senderId: 'system',
      senderName: 'Wildreach',
      text: 'Hosting Live P2P World! Share your 🔗 Invite Link so friends can join this island directly over WebRTC!',
      kind: 'system',
      timestamp: Date.now(),
    };

    return {
      playerId: this.localPlayer.id,
      room: {
        id: this.roomId,
        name: this.roomName,
        seed: this.seed,
        playerCount: 1 + this.remotePeers.size,
        maxPlayers: 12,
        day: this.time.day,
        weather: this.time.weather,
        pvpEnabled: false,
      },
      landmarks: this.world.landmarks,
      time: { ...this.time },
      players: this.getAllPlayers(),
      privateState: this.priv,
      nodes: Array.from(this.nodes.values()),
      structures: Array.from(this.structures.values()),
      boats: Array.from(this.boats.values()),
      wildlife: this.getWildlifeSnap(),
      loot: Array.from(this.loot.values()),
      chatHistory: [welcome],
      pings: [...this.activePings],
    };
  }

  setBroadcastHook(fn: ((event: string, data: unknown, targetPeerId?: string) => void) | null): void {
    this.broadcastHook = fn;
  }

  getRoomMeta(): { roomName: string; seed: number; playerCount: number } {
    return {
      roomName: this.roomName,
      seed: this.seed,
      playerCount: 1 + this.remotePeers.size,
    };
  }

  private getAllPlayers(): PlayerState[] {
    const out: PlayerState[] = [this.localPlayer];
    for (const r of this.remotePeers.values()) out.push(r.player);
    for (const b of this.bots) out.push(b);
    return out;
  }

  private relay(event: string, data: unknown, targetPeerId?: string): void {
    this.broadcastHook?.(event, data, targetPeerId);
  }

  /**
   * Accepts a remote WebRTC/BroadcastChannel friend into the Host's live world!
   */
  addRemotePeer(peerId: string, payload: JoinRoomPayload): WorldInitPayload {
    const spawn = this.world.getSpawnPoint();
    const ang = Math.random() * Math.PI * 2;
    const x = spawn.x + Math.cos(ang) * 3.5;
    const z = spawn.z + Math.sin(ang) * 3.5;
    const y = this.world.getHeight(x, z);
    const inv: (InventorySlot | null)[] = Array.from({ length: INVENTORY_SIZE }, () => null);
    inv[0] = { itemId: 'stone_axe', count: 1, durability: 75 };
    inv[1] = { itemId: 'stone_pickaxe', count: 1, durability: 75 };
    inv[2] = { itemId: 'torch', count: 1, durability: 180 };
    inv[3] = { itemId: 'berries', count: 6 };
    inv[4] = { itemId: 'build_hammer', count: 1, durability: 160 };
    inv[5] = { itemId: 'fishing_rod', count: 1, durability: 80 };

    const safeName = (payload.playerName || 'Voyager').trim().slice(0, 18) || 'Voyager';
    const player: PlayerState = {
      id: peerId,
      name: safeName,
      isBot: false,
      outfit: payload.outfit || 'mariner',
      x,
      y,
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: Math.PI,
      pitch: 0,
      anim: 'idle',
      swingTime: 0,
      equippedSlot: 0,
      equippedItemId: inv[0]?.itemId ?? null,
      armorItemId: null,
      armorRating: 0,
      vitals: { hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, hunger: 92, thirst: 92, warmth: 58 },
      status: {
        sheltered: false, warm: true, wellFed: true, wet: false, chilled: false,
        nearCampfire: false, nearWorkbench: false, nearFurnace: false,
        nearRunicForge: false, nearCauldron: false, nearFreshWater: false,
      },
      alive: true,
      downed: false,
      respawnAt: 0,
      bedPos: null,
      pvpEnabled: false,
      level: 1,
      xp: 0,
      kills: 0,
      daysSurvived: 1,
      emote: null,
      emoteUntil: 0,
      boatId: null,
      isHost: false,
    };
    const priv: LocalPlayerPrivateState = {
      inventory: inv,
      armorSlot: null,
      objectives: {
        gather_resources: false,
        craft_tool: false,
        build_shelter: false,
        cook_food: false,
        hunt_wildlife: false,
        smelt_iron: false,
      },
    };
    this.remotePeers.set(peerId, { player, priv });

    const joinMsg: ChatMessage = {
      id: `sys_${this.seq++}`,
      senderId: 'system',
      senderName: 'Wildreach',
      text: `⚡ ${safeName} joined your island over WebRTC P2P!`,
      kind: 'system',
      timestamp: Date.now(),
    };
    this.handlers.onChatMessage(joinMsg);
    this.handlers.onToast({ text: `${safeName} joined your world!`, tone: 'good' });
    this.relay('chat:message', joinMsg);

    return {
      playerId: peerId,
      room: {
        id: this.roomId,
        name: this.roomName,
        seed: this.seed,
        playerCount: 1 + this.remotePeers.size,
        maxPlayers: 12,
        day: this.time.day,
        weather: this.time.weather,
        pvpEnabled: false,
      },
      landmarks: this.world.landmarks,
      time: { ...this.time },
      players: this.getAllPlayers(),
      privateState: priv,
      nodes: Array.from(this.nodes.values()),
      structures: Array.from(this.structures.values()),
      boats: Array.from(this.boats.values()),
      wildlife: this.getWildlifeSnap(),
      loot: Array.from(this.loot.values()),
      chatHistory: [joinMsg],
      pings: [...this.activePings],
    };
  }

  removeRemotePeer(peerId: string): void {
    const entry = this.remotePeers.get(peerId);
    if (!entry) return;
    const p = entry.player;
    if (p.boatId) {
      const b = this.boats.get(p.boatId);
      if (b) {
        if (b.pilotId === peerId) {
          b.pilotId = null;
          b.throttle = 0;
        }
        if (b.passengerIds) {
          b.passengerIds = b.passengerIds.filter((id) => id !== peerId);
        }
      }
    }
    this.remotePeers.delete(peerId);
    const msg: ChatMessage = {
      id: `sys_${this.seq++}`,
      senderId: 'system',
      senderName: 'Wildreach',
      text: `${p.name} disconnected from the island.`,
      kind: 'system',
      timestamp: Date.now(),
    };
    this.handlers.onChatMessage(msg);
    this.relay('chat:message', msg);
  }

  /**
   * Executes any gameplay event received from a connected WebRTC P2P friend!
   */
  handlePeerCommand(peerId: string, event: string, data: unknown): void {
    const entry = this.remotePeers.get(peerId);
    if (!entry) return;
    const p = entry.player;
    const priv = entry.priv;

    const addPeerItem = (itemId: string, count: number, durability?: number): void => {
      const def = getItem(itemId);
      if (!def) return;
      let rem = count;
      if (def.maxStack > 1) {
        for (const s of priv.inventory) {
          if (s && s.itemId === itemId && s.count < def.maxStack) {
            const add = Math.min(rem, def.maxStack - s.count);
            s.count += add;
            rem -= add;
            if (rem <= 0) break;
          }
        }
      }
      for (let i = 0; i < priv.inventory.length && rem > 0; i++) {
        if (!priv.inventory[i]) {
          const add = Math.min(rem, def.maxStack);
          priv.inventory[i] = { itemId, count: add, durability: durability ?? def.maxDurability };
          rem -= add;
        }
      }
      p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
      this.relay('player:private', priv, peerId);
    };

    const consumePeerMats = (ings: { itemId: string; count: number }[]): boolean => {
      for (const ing of ings) {
        let have = 0;
        for (const s of priv.inventory) if (s?.itemId === ing.itemId) have += s.count;
        if (have < ing.count) return false;
      }
      for (const ing of ings) {
        let need = ing.count;
        for (let i = 0; i < priv.inventory.length && need > 0; i++) {
          const s = priv.inventory[i];
          if (s && s.itemId === ing.itemId) {
            const take = Math.min(need, s.count);
            s.count -= take;
            need -= take;
            if (s.count <= 0) priv.inventory[i] = null;
          }
        }
      }
      p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
      return true;
    };

    if (event === 'player:input') {
      const inp = data as PlayerInputPayload;
      if (!p.alive || p.downed) return;
      p.pitch = clamp(inp.pitch, -1.5, 1.5);
      if (p.boatId) {
        if ((p.boatSeatIndex ?? 0) > 0) p.yaw = inp.yaw;
        return;
      }
      p.x = clamp(inp.x, -212, 212);
      p.y = inp.y;
      p.z = clamp(inp.z, -212, 212);
      p.vx = inp.vx;
      p.vy = inp.vy;
      p.vz = inp.vz;
      p.yaw = inp.yaw;
      p.anim = inp.anim;
    } else if (event === 'player:equip') {
      const slot = Number(data);
      if (slot >= 0 && slot < HOTBAR_SIZE) {
        p.equippedSlot = slot;
        p.equippedItemId = priv.inventory[slot]?.itemId ?? null;
      }
    } else if (event === 'player:action') {
      const act = data as PrimaryActionPayload;
      p.swingTime = 0.34;
      if (act.targetNodeId) {
        const node = this.nodes.get(act.targetNodeId);
        if (node && !node.depleted && Math.hypot(node.x - p.x, node.z - p.z) < 6.5) {
          node.hp = Math.max(0, node.hp - 24);
          if (node.hp <= 0) {
            node.depleted = true;
            node.respawnAt = Date.now() + 90_000;
            const bp = RESOURCE_NODE_BLUEPRINTS[node.kind];
            for (const d of bp.drops) {
              addPeerItem(d.itemId, d.min + Math.floor(Math.random() * (d.max - d.min + 1)));
            }
          }
          this.handlers.onNodeUpdate(node);
          this.relay('node:update', node);
          const fx = { kind: 'chop' as const, x: node.x, y: node.y + 1, z: node.z };
          this.handlers.onFxEvent(fx);
          this.relay('fx:event', fx);
        }
      } else if (act.targetWildlifeId) {
        const w = this.wildlife.get(act.targetWildlifeId);
        if (w && w.state !== 'dead' && Math.hypot(w.x - p.x, w.z - p.z) < 6.5) {
          this.damageWildlife(w, 26, p.x, p.z);
        }
      }
    } else if (event === 'player:craft') {
      const r = getRecipe(String(data));
      if (r && consumePeerMats(r.ingredients)) {
        addPeerItem(r.outputItemId, r.outputCount);
        this.relay('toast:notify', { text: `Crafted ${r.outputCount}× ${ITEMS[r.outputItemId]?.name}!`, tone: 'good' }, peerId);
      }
    } else if (event === 'player:build') {
      const bp = data as BuildPlacePayload;
      const def = STRUCTURES[bp.kind];
      if (def && consumePeerMats(def.costs)) {
        const snapped = computeSnappedPlacement(
          bp.kind,
          { x: bp.x, y: bp.y, z: bp.z },
          bp.rotY,
          Array.from(this.structures.values()),
          (x, z) => this.world.getHeight(x, z)
        );
        const st: StructureState = {
          id: `st_${this.seq++}_${Date.now().toString(36)}`,
          kind: bp.kind,
          ownerId: p.id,
          ownerName: p.name,
          x: snapped.x,
          y: snapped.y,
          z: snapped.z,
          rotY: snapped.rotY,
          hp: def.maxHp,
          maxHp: def.maxHp,
          lit: bp.kind === 'campfire' || bp.kind === 'lantern_post' || bp.kind === 'lighthouse_beacon' || bp.kind === 'tiki_brazier' || bp.kind === 'alchemy_cauldron',
          fuel: bp.kind === 'campfire' ? 100 : undefined,
          waterLevel: bp.kind === 'rain_collector' ? 50 : undefined,
          cropProgress: bp.kind === 'planter_box' ? 20 : undefined,
          chestSlots: bp.kind === 'storage_chest' ? Array.from({ length: CHEST_SIZE }, () => null) : undefined,
        };
        this.structures.set(st.id, st);
        this.handlers.onStructureAdd(st);
        this.relay('structure:add', st);
        this.relay('player:private', priv, peerId);
      }
    } else if (event === 'boat:build') {
      const bb = data as BoatBuildPayload;
      const def = BOATS[bb.kind];
      if (def && consumePeerMats(def.costs)) {
        const boat: BoatState = {
          id: `boat_${this.seq++}_${Date.now().toString(36)}`,
          kind: bb.kind,
          ownerId: p.id,
          ownerName: p.name,
          x: bb.x,
          y: WATER_LEVEL,
          z: bb.z,
          yaw: bb.rotY,
          vx: 0,
          vz: 0,
          speed: 0,
          throttle: 0,
          rudder: 0,
          hp: def.maxHp,
          maxHp: def.maxHp,
          pilotId: null,
          passengerIds: [],
          chestSlots: def.cargoSlots > 0 ? Array.from({ length: def.cargoSlots }, () => null) : undefined,
        };
        this.boats.set(boat.id, boat);
        this.handlers.onBoatAdd(boat);
        this.relay('boat:add', boat);
        this.relay('player:private', priv, peerId);
      }
    } else if (event === 'boat:board') {
      this.boardBoatForPlayer(p, data as string | null, peerId);
    } else if (event === 'boat:control') {
      const bc = data as BoatControlPayload;
      if (p.boatId) {
        const b = this.boats.get(p.boatId);
        if (b && b.pilotId === p.id) {
          if (typeof bc.throttle === 'number') b.throttle = clamp(Math.round(bc.throttle), -1, 3);
          this.boatSteers.set(b.id, clamp(bc.steer, -1, 1));
        }
      }
    } else if (event === 'player:fishCatch') {
      const deep = Boolean((data as { deepWater?: boolean })?.deepWater);
      const itemId = deep && Math.random() < 0.35 ? 'golden_snapper' : 'raw_fish';
      addPeerItem(itemId, 1);
      this.relay('toast:notify', { text: `Reeled in ${ITEMS[itemId]?.name}!`, tone: 'good' }, peerId);
    } else if (event === 'chat:send') {
      const txt = String(data || '').trim().slice(0, 180);
      if (!txt) return;
      const msg: ChatMessage = {
        id: `c_${this.seq++}`,
        senderId: p.id,
        senderName: p.name,
        text: txt,
        kind: 'chat',
        timestamp: Date.now(),
      };
      this.handlers.onChatMessage(msg);
      this.relay('chat:message', msg);
    } else if (event === 'player:pingWorld') {
      const pg = data as { x: number; y: number; z: number; label?: string };
      this.emitWorldPing(p, pg.x, pg.y, pg.z, pg.label);
    } else if (event === 'player:revive') {
      this.revivePlayerBy(p, String(data));
    } else if (event === 'player:teleportToFriend') {
      this.teleportPlayerToFriend(p, String(data), peerId);
    } else if (event === 'player:respawn') {
      const sp = this.world.getSpawnPoint();
      p.x = sp.x;
      p.z = sp.z;
      p.y = sp.y;
      p.alive = true;
      p.downed = false;
      p.vitals.hp = p.vitals.maxHp;
    } else if (event === 'player:swapSlots') {
      const { from, to } = data as { from: number; to: number };
      const tmp = priv.inventory[from];
      priv.inventory[from] = priv.inventory[to];
      priv.inventory[to] = tmp;
      p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
      this.relay('player:private', priv, peerId);
    } else if (event === 'player:consume') {
      const idx = Number(data);
      const s = priv.inventory[idx];
      const def = getItem(s?.itemId);
      if (s && def?.category === 'consumable') {
        if (def.heal) p.vitals.hp = Math.min(p.vitals.maxHp, p.vitals.hp + def.heal);
        if (def.hungerRestore) p.vitals.hunger = Math.min(100, p.vitals.hunger + def.hungerRestore);
        if (def.thirstRestore) p.vitals.thirst = Math.min(100, p.vitals.thirst + def.thirstRestore);
        s.count--;
        if (s.count <= 0) priv.inventory[idx] = null;
        this.relay('player:private', priv, peerId);
      }
    }
  }

  private ensureStarterBoat(): void {
    if (this.boats.size > 0) return;
    const spot = this.world.getStarterBoatSpot();
    const def = BOATS.raft;
    this.boats.set('boat_starter_raft', {
      id: 'boat_starter_raft',
      kind: 'raft',
      ownerId: 'world',
      ownerName: 'Harbor',
      x: spot.x,
      y: WATER_LEVEL,
      z: spot.z,
      yaw: spot.yaw,
      vx: 0,
      vz: 0,
      speed: 0,
      throttle: 0,
      rudder: 0,
      hp: def.maxHp,
      maxHp: def.maxHp,
      pilotId: null,
    });
  }

  stop(): void {
    if (this.stopTicker) {
      this.stopTicker();
      this.stopTicker = null;
    }
    if (this.timer !== null) {
      globalThis.clearInterval(this.timer);
      this.timer = null;
    }
    this.saveLocal();
  }

  private seedStarterCamp(): void {
    const cx = -7.5;
    const cz = 20.5;
    this.structures.set('st_sanctuary_fire', {
      id: 'st_sanctuary_fire',
      kind: 'campfire',
      ownerId: 'world',
      ownerName: 'Sanctuary',
      x: cx,
      y: this.world.getHeight(cx, cz),
      z: cz,
      rotY: 0,
      hp: 120,
      maxHp: 120,
      lit: true,
      fuel: 95,
    });
    const bx = -13.2;
    const bz = 20.8;
    const slots: (InventorySlot | null)[] = Array.from({ length: CHEST_SIZE }, () => null);
    slots[0] = { itemId: 'wood', count: 12 };
    slots[1] = { itemId: 'stone', count: 10 };
    slots[2] = { itemId: 'berries', count: 8 };
    slots[3] = { itemId: 'cooked_meat', count: 3 };
    slots[4] = { itemId: 'flint_arrow', count: 12 };
    this.structures.set('st_sanctuary_chest', {
      id: 'st_sanctuary_chest',
      kind: 'storage_chest',
      ownerId: 'world',
      ownerName: 'Sanctuary',
      x: bx,
      y: this.world.getHeight(bx, bz),
      z: bz,
      rotY: 0.45,
      hp: 240,
      maxHp: 240,
      chestSlots: slots,
    });
  }

  private loadLocalSave(): boolean {
    try {
      const raw = localStorage.getItem(`wildreach_save_${this.roomId}_${this.seed}`);
      if (!raw) return false;
      const data = JSON.parse(raw) as {
        day: number;
        timeOfDay: number;
        structures: StructureState[];
        boats?: BoatState[];
      };
      this.time.day = data.day || 1;
      this.time.timeOfDay = typeof data.timeOfDay === 'number' ? data.timeOfDay : 0.31;
      for (const s of data.structures || []) this.structures.set(s.id, s);
      for (const b of data.boats || []) {
        this.boats.set(b.id, { ...b, pilotId: null, speed: 0, vx: 0, vz: 0, throttle: 0 });
      }
      return this.structures.size > 0;
    } catch {
      return false;
    }
  }

  private saveLocal(): void {
    try {
      localStorage.setItem(
        `wildreach_save_${this.roomId}_${this.seed}`,
        JSON.stringify({
          day: this.time.day,
          timeOfDay: this.time.timeOfDay,
          structures: Array.from(this.structures.values()),
          boats: Array.from(this.boats.values()).map((b) => ({ ...b, pilotId: null })),
        })
      );
    } catch {
      // ignore storage quota errors
    }
  }

  private spawnInitialWildlife(): void {
    this.wildlife.clear();
    const spawnGroup = (kind: WildlifeKind, count: number, biomes: string[]) => {
      let made = 0;
      let tries = 0;
      while (made < count && tries < 500) {
        tries++;
        const x = (Math.random() * 2 - 1) * 126;
        const z = (Math.random() * 2 - 1) * 126;
        if (kind !== 'deer' && Math.hypot(x + 10, z - 18) < 34) continue;
        const s = this.world.sample(x, z);
        if (s.height < 0.8 || s.slope > 0.75 || !biomes.includes(s.biome)) continue;
        this.addWildlife(kind, x, z);
        made++;
      }
    };
    spawnGroup('deer', 12, ['meadow', 'beach']);
    spawnGroup('boar', 7, ['meadow', 'pine', 'marsh']);
    spawnGroup('wolf', 6, ['pine', 'highland', 'volcanic']);
    spawnGroup('crab', 7, ['beach']);
    for (const [cx, cz] of [[-145, 132], [-153, 141]]) {
      if (this.world.getHeight(cx, cz) > 0.25) this.addWildlife('crab', cx, cz);
    }
    for (const [sx, sz] of [[-92, 134], [96, 128], [112, -96], [-104, -108]]) {
      if (this.world.getHeight(sx, sz) < -1.8) this.addWildlife('serpent', sx, sz);
    }
    if (this.world.getHeight(152, -136) > 1.0) this.addWildlife('cinder_golem', 152, -136);
  }

  private addWildlife(kind: WildlifeKind, x: number, z: number): void {
    const cfg = MOB_CFG[kind];
    const id = `lmob_${kind}_${this.seq++}`;
    this.wildlife.set(id, {
      id,
      kind,
      x,
      y: kind === 'serpent' ? WATER_LEVEL - 0.15 : this.world.getHeight(x, z),
      z,
      yaw: Math.random() * Math.PI * 2,
      hp: cfg.maxHp,
      maxHp: cfg.maxHp,
      state: 'idle',
      speed: 0,
      attackTime: 0,
      homeX: x,
      homeZ: z,
      targetX: x,
      targetZ: z,
      thinkTimer: 1 + Math.random() * 3,
      attackCooldown: 0,
      aggroUntil: 0,
      respawnAt: 0,
    });
  }

  private getWildlifeSnap(): WildlifeState[] {
    return Array.from(this.wildlife.values()).filter((w) => w.state !== 'dead');
  }

  handleTogglePvp(): void {
    this.localPlayer.pvpEnabled = !this.localPlayer.pvpEnabled;
    this.handlers.onToast({
      text: this.localPlayer.pvpEnabled ? 'PvP Duels enabled!' : 'PvP Duels disabled (Co-op Mode).',
      tone: this.localPlayer.pvpEnabled ? 'warn' : 'good',
    });
  }

  handleEmote(emote: string): void {
    const label = emote === 'wave' ? 'waves hello!' : emote === 'cheer' ? 'cheers!' : `signals (${emote})!`;
    const msg: ChatMessage = {
      id: `lem_${this.seq++}`,
      senderId: this.localPlayer.id,
      senderName: this.localPlayer.name,
      text: `${this.localPlayer.name} ${label}`,
      kind: 'system',
      timestamp: Date.now(),
    };
    this.handlers.onChatMessage(msg);
    this.relay('chat:message', msg);
  }

  spawnBot(): void {
    if (this.bots.length >= 3) return;
    const profiles: [string, PlayerOutfit][] = [
      ['Kael [AI]', 'ranger'],
      ['Lyra [AI]', 'warden'],
      ['Rowan [AI]', 'nomad'],
    ];
    const [name, outfit] = profiles[this.bots.length % profiles.length];
    const sp = this.world.getSpawnPoint();
    const x = sp.x + 3.5 + this.bots.length * 2;
    const z = sp.z - 2.5;
    this.bots.push({
      id: `lbot_${this.seq++}`,
      name,
      isBot: true,
      outfit,
      x,
      y: this.world.getHeight(x, z),
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: 0,
      pitch: 0,
      anim: 'idle',
      swingTime: 0,
      equippedSlot: 0,
      equippedItemId: 'stone_axe',
      armorItemId: 'leather_armor',
      armorRating: 25,
      vitals: { hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, hunger: 90, thirst: 90, warmth: 60 },
      status: {
        sheltered: false, warm: true, wellFed: true, wet: false, chilled: false,
        nearCampfire: false, nearWorkbench: false, nearFurnace: false, nearRunicForge: false, nearCauldron: false, nearFreshWater: false,
      },
      alive: true,
      respawnAt: 0,
      bedPos: null,
      pvpEnabled: false,
      level: 2,
      xp: 0,
      kills: 0,
      daysSurvived: 1,
      emote: null,
      emoteUntil: 0,
      boatId: null,
      homeX: sp.x,
      homeZ: sp.z,
      goalX: x,
      goalZ: z,
      timer: 2,
      cd: 0,
    });
    this.handlers.onChatMessage({
      id: `sys_${this.seq++}`,
      senderId: 'system',
      senderName: 'Wildreach',
      text: `${name} joined your camp to gather & defend.`,
      kind: 'system',
      timestamp: Date.now(),
    });
  }

  handleInput(input: PlayerInputPayload): void {
    const p = this.localPlayer;
    if (!p || !p.alive) return;
    if (p.boatId) {
      p.pitch = input.pitch;
      return;
    }
    p.x = clamp(input.x, -212, 212);
    p.y = input.y;
    p.z = clamp(input.z, -212, 212);
    p.vx = input.vx;
    p.vy = input.vy;
    p.vz = input.vz;
    p.yaw = input.yaw;
    p.pitch = input.pitch;
    p.anim = input.anim;
    if (input.sprinting && Math.hypot(p.vx, p.vz) > 1.5) {
      p.vitals.stamina = Math.max(0, p.vitals.stamina - 0.55);
    }
  }

  handleEquip(slot: number): void {
    if (slot < 0 || slot >= HOTBAR_SIZE) return;
    this.localPlayer.equippedSlot = slot;
    this.localPlayer.equippedItemId = this.priv.inventory[slot]?.itemId ?? null;
  }

  handleDodge(dir: { x: number; z: number }): void {
    const now = Date.now();
    if (now - this.lastDodge < 850 || this.localPlayer.vitals.stamina < 18) return;
    this.lastDodge = now;
    this.localPlayer.vitals.stamina -= 18;
    const len = Math.hypot(dir.x, dir.z) || 1;
    this.localPlayer.x = clamp(this.localPlayer.x + (dir.x / len) * 3.2, -170, 170);
    this.localPlayer.z = clamp(this.localPlayer.z + (dir.z / len) * 3.2, -170, 170);
  }

  handleAction(payload: PrimaryActionPayload): void {
    const p = this.localPlayer;
    if (!p.alive) return;
    const now = Date.now();
    const item = getItem(p.equippedItemId);
    if (now - this.lastAction < ((item?.attackCooldown ?? 0.5) * 850)) return;
    this.lastAction = now;
    if (p.vitals.stamina < 6) return;
    p.vitals.stamina = Math.max(0, p.vitals.stamina - 7);
    p.swingTime = 0.36;

    // Ranged Bow
    if (item?.isRanged) {
      if (!this.consumeMats([{ itemId: item.ammoItemId || 'flint_arrow', count: 1 }])) {
        this.handlers.onToast({ text: 'Out of Flint Arrows! Craft more at a Workbench.', tone: 'warn' });
        return;
      }
      const ch = clamp(payload.charge ?? 0.85, 0.3, 1);
      const spd = 26 + ch * 22;
      const len = Math.hypot(payload.dirX, payload.dirY, payload.dirZ) || 1;
      const id = `lpr_${this.seq++}`;
      this.projectiles.set(id, {
        id,
        ownerId: p.id,
        kind: item.id === 'starlight_bow' ? 'starlight_bolt' : 'arrow',
        x: p.x + (payload.dirX / len) * 0.9,
        y: p.y + 1.55,
        z: p.z + (payload.dirZ / len) * 0.9,
        vx: (payload.dirX / len) * spd,
        vy: (payload.dirY / len) * spd + 2.2,
        vz: (payload.dirZ / len) * spd,
        damage: Math.round((item.damage ?? 34) * (0.65 + ch * 0.55)),
        bornAt: now,
      });
      this.syncPrivate();
      return;
    }

    // Repair structure
    if (item?.toolKind === 'hammer' && payload.targetStructureId) {
      const st = this.structures.get(payload.targetStructureId);
      if (st && st.hp < st.maxHp) {
        st.hp = Math.min(st.maxHp, st.hp + 45);
        this.handlers.onStructureUpdate(st);
        this.handlers.onFxEvent({ kind: 'build', x: st.x, y: st.y + 1, z: st.z });
        return;
      }
    }

    // Wildlife hit
    if (payload.targetWildlifeId) {
      const w = this.wildlife.get(payload.targetWildlifeId);
      if (w && w.state !== 'dead' && Math.hypot(w.x - p.x, w.z - p.z) < (item?.range ?? 3.2) + 2) {
        this.damageWildlife(w, item?.damage ?? 12, p.x, p.z);
        return;
      }
    }

    // Resource node hit
    let node = payload.targetNodeId ? this.nodes.get(payload.targetNodeId) : undefined;
    if (!node || node.depleted) {
      let best = 4.6;
      for (const n of this.nodes.values()) {
        if (n.depleted) continue;
        const dx = n.x - p.x;
        const dz = n.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d < best && (dx * payload.dirX + dz * payload.dirZ) / (d || 1) > 0.5) {
          best = d;
          node = n;
        }
      }
    }
    if (node && !node.depleted) {
      this.hitNode(node, item);
    }
  }

  private hitNode(node: ResourceNodeState, item: ReturnType<typeof getItem>): void {
    const bp = RESOURCE_NODE_BLUEPRINTS[node.kind];
    if ((item?.tier ?? 0) < bp.minToolTier) {
      this.handlers.onToast({
        text: `Requires ${bp.minToolTier === 1 ? 'Stone Pickaxe' : 'Forged Iron Pickaxe'}!`,
        tone: 'warn',
      });
      return;
    }
    const power =
      bp.preferredTool === 'hand'
        ? 26
        : item?.toolKind === bp.preferredTool
        ? Math.round((item?.gatherPower ?? 16) * 1.25)
        : Math.max(10, Math.round((item?.gatherPower ?? 14) * 0.6));

    node.hp = Math.max(0, node.hp - power);
    this.handlers.onFxEvent({
      kind: node.kind.endsWith('tree') || node.kind === 'driftwood' ? 'chop' : 'mine',
      x: node.x,
      y: node.y + 1.1,
      z: node.z,
    });
    this.handlers.onCombatEvent({
      id: `ce_${this.seq++}`,
      x: node.x,
      y: node.y + 1.8,
      z: node.z,
      text: `-${power}`,
      color: '#f8fafc',
      kind: 'damage',
    });

    if (node.hp <= 0) {
      node.depleted = true;
      node.respawnAt = Date.now() + bp.respawnSec * 1000;
      const dx = node.x - this.localPlayer.x;
      const dz = node.z - this.localPlayer.z;
      const len = Math.hypot(dx, dz) || 1;
      if (node.kind.endsWith('tree')) {
        const fell = { id: node.id, dirX: dx / len, dirZ: dz / len };
        this.handlers.onNodeFell(fell);
        this.relay('node:fell', fell);
      }
      for (const d of bp.drops) {
        if (d.chance !== undefined && Math.random() > d.chance) continue;
        const amt = d.min + Math.floor(Math.random() * (d.max - d.min + 1));
        this.addItem(d.itemId, amt);
      }
      this.priv.objectives.gather_resources = true;
      this.grantXp(12);
      this.syncPrivate();
    }
    this.handlers.onNodeUpdate(node);
    this.relay('node:update', node);
  }

  private damageWildlife(w: LocalWildlife, dmg: number, fromX: number, fromZ: number): void {
    w.hp = Math.max(0, w.hp - dmg);
    this.handlers.onFxEvent({ kind: 'hit', x: w.x, y: w.y + 1, z: w.z });
    this.handlers.onCombatEvent({
      id: `ce_${this.seq++}`,
      x: w.x,
      y: w.y + 1.9,
      z: w.z,
      text: `-${dmg}`,
      color: '#fbbf24',
      kind: 'damage',
    });
    const cfg = MOB_CFG[w.kind];
    if (w.hp <= 0) {
      w.state = 'dead';
      w.respawnAt = Date.now() + 85_000;
      for (const [itemId, mn, mx] of cfg.drops) {
        const amt = mn + Math.floor(Math.random() * (mx - mn + 1));
        const lid = `lloot_${this.seq++}`;
        const drop: LootDropState = {
          id: lid,
          itemId,
          count: amt,
          x: w.x + (Math.random() - 0.5),
          y: w.y + 0.4,
          z: w.z + (Math.random() - 0.5),
        };
        this.loot.set(lid, drop);
        this.handlers.onLootAdd(drop);
      }
      this.localPlayer.kills += 1;
      this.priv.objectives.hunt_wildlife = true;
      this.grantXp(cfg.xp);
      this.syncPrivate();
    } else if (!cfg.hostile) {
      w.state = 'flee';
      const dx = w.x - fromX;
      const dz = w.z - fromZ;
      const l = Math.hypot(dx, dz) || 1;
      w.targetX = clamp(w.x + (dx / l) * 24, -135, 135);
      w.targetZ = clamp(w.z + (dz / l) * 24, -135, 135);
      w.thinkTimer = 4;
    } else {
      w.state = 'chase';
      w.aggroUntil = Date.now() + 14_000;
    }
  }

  handleInteract(payload: { structureId?: string; lootId?: string; drinkWater?: boolean }): void {
    const p = this.localPlayer;
    if (payload.drinkWater && this.world.isNearFreshWater(p.x, p.z)) {
      p.vitals.thirst = Math.min(100, p.vitals.thirst + 45);
      this.handlers.onFxEvent({ kind: 'drink', x: p.x, y: p.y + 1.2, z: p.z });
      this.handlers.onToast({ text: 'Drank fresh Crystal Spring water (+45 Thirst)', tone: 'good' });
      return;
    }
    if (payload.lootId) {
      const drop = this.loot.get(payload.lootId);
      if (drop) {
        this.addItem(drop.itemId, drop.count);
        this.loot.delete(drop.id);
        this.handlers.onLootRemove(drop.id);
        this.handlers.onToast({ text: `Picked up ${drop.count}× ${ITEMS[drop.itemId]?.name ?? drop.itemId}`, tone: 'good' });
        this.syncPrivate();
      }
      return;
    }
    if (payload.structureId) {
      const st = this.structures.get(payload.structureId);
      if (!st) return;
      if (st.kind === 'wood_doorway') {
        st.isOpen = !st.isOpen;
        this.handlers.onStructureUpdate(st);
      } else if (st.kind === 'bedroll') {
        p.bedPos = { x: st.x, y: st.y + 0.3, z: st.z };
        this.handlers.onToast({ text: 'Respawn point bound to Bedroll!', tone: 'good' });
      } else if (st.kind === 'planter_box') {
        if ((st.cropProgress ?? 0) >= 100) {
          st.cropProgress = 0;
          this.addItem('berries', 4);
          this.addItem('sunbloom', 2);
          this.handlers.onStructureUpdate(st);
          this.handlers.onToast({ text: 'Harvested +4 Sunberries & +2 Sunblooms!', tone: 'good' });
          this.syncPrivate();
        } else {
          this.handlers.onToast({ text: `Crops growing (${Math.round(st.cropProgress ?? 0)}%)...`, tone: 'info' });
        }
      } else if (st.kind === 'campfire') {
        if (this.consumeMats([{ itemId: 'wood', count: 2 }])) {
          st.lit = true;
          st.fuel = Math.min(100, (st.fuel ?? 0) + 45);
          this.handlers.onStructureUpdate(st);
          this.syncPrivate();
          this.handlers.onToast({ text: 'Stoked campfire with 2 Timber Wood.', tone: 'good' });
        } else {
          this.handlers.onToast({ text: 'Open Crafting [C] near campfire to cook!', tone: 'info' });
        }
      } else if (st.kind === 'rain_collector' && (st.waterLevel ?? 0) >= 20) {
        const d = Math.min(45, st.waterLevel ?? 0);
        st.waterLevel = (st.waterLevel ?? 0) - d;
        p.vitals.thirst = Math.min(100, p.vitals.thirst + d);
        this.handlers.onStructureUpdate(st);
        this.handlers.onFxEvent({ kind: 'drink', x: p.x, y: p.y + 1, z: p.z });
      }
    }
  }

  handleConsume(slotIdx: number): void {
    const slot = this.priv.inventory[slotIdx];
    const def = getItem(slot?.itemId);
    if (!slot || !def || def.category !== 'consumable') return;
    slot.count--;
    if (slot.count <= 0) this.priv.inventory[slotIdx] = null;
    if (def.heal) this.localPlayer.vitals.hp = clamp(this.localPlayer.vitals.hp + def.heal, 1, this.localPlayer.vitals.maxHp);
    if (def.hungerRestore) this.localPlayer.vitals.hunger = clamp(this.localPlayer.vitals.hunger + def.hungerRestore, 0, 100);
    if (def.thirstRestore) this.localPlayer.vitals.thirst = clamp(this.localPlayer.vitals.thirst + def.thirstRestore, 0, 100);
    if (def.warmthRestore) this.localPlayer.vitals.warmth = clamp(this.localPlayer.vitals.warmth + def.warmthRestore, 0, 100);
    this.handlers.onFxEvent({ kind: 'eat', x: this.localPlayer.x, y: this.localPlayer.y + 1, z: this.localPlayer.z });
    this.syncPrivate();
  }

  handleEquipArmor(slotIdx: number): void {
    const slot = this.priv.inventory[slotIdx];
    const def = getItem(slot?.itemId);
    if (!slot || !def || def.category !== 'armor') return;
    const prev = this.priv.armorSlot;
    this.priv.armorSlot = slot;
    this.priv.inventory[slotIdx] = prev;
    this.localPlayer.armorItemId = slot.itemId;
    this.localPlayer.armorRating = def.armorRating ?? 0;
    this.syncPrivate();
  }

  handleSwapSlots(from: number, to: number): void {
    const inv = this.priv.inventory;
    const tmp = inv[from];
    inv[from] = inv[to];
    inv[to] = tmp;
    this.localPlayer.equippedItemId = inv[this.localPlayer.equippedSlot]?.itemId ?? null;
    this.syncPrivate();
  }

  handleDropSlot(slotIdx: number): void {
    const s = this.priv.inventory[slotIdx];
    if (!s) return;
    this.priv.inventory[slotIdx] = null;
    const id = `lloot_${this.seq++}`;
    const drop: LootDropState = {
      id,
      itemId: s.itemId,
      count: s.count,
      x: this.localPlayer.x + Math.sin(this.localPlayer.yaw) * 1.4,
      y: this.localPlayer.y + 0.35,
      z: this.localPlayer.z + Math.cos(this.localPlayer.yaw) * 1.4,
    };
    this.loot.set(id, drop);
    this.handlers.onLootAdd(drop);
    this.syncPrivate();
  }

  handleCraft(recipeId: string): void {
    const r = getRecipe(recipeId);
    if (!r) return;
    if (r.station === 'cauldron' && !this.localPlayer.status.nearCauldron) {
      this.handlers.onToast({ text: 'Brew this elixir near an Alchemy Cauldron!', tone: 'warn' });
      return;
    }
    if (!this.consumeMats(r.ingredients)) {
      this.handlers.onToast({ text: 'Missing crafting materials!', tone: 'warn' });
      return;
    }
    this.addItem(r.outputItemId, r.outputCount);
    if (ITEMS[r.outputItemId]?.category === 'tool' || ITEMS[r.outputItemId]?.category === 'weapon') {
      this.priv.objectives.craft_tool = true;
    }
    if (r.station === 'campfire') this.priv.objectives.cook_food = true;
    if (r.outputItemId.endsWith('_ingot')) this.priv.objectives.smelt_iron = true;
    this.grantXp(r.xpReward);
    this.handlers.onFxEvent({ kind: 'build', x: this.localPlayer.x, y: this.localPlayer.y + 1, z: this.localPlayer.z });
    this.handlers.onToast({ text: `Crafted ${r.outputCount}× ${ITEMS[r.outputItemId]?.name}!`, tone: 'good' });
    this.syncPrivate();
  }

  handleBuild(payload: BuildPlacePayload): void {
    const def = STRUCTURES[payload.kind];
    if (!def) return;
    let usedKit = false;
    if (payload.fromItemSlot !== undefined) {
      const s = this.priv.inventory[payload.fromItemSlot];
      if (s && getItem(s.itemId)?.structureKind === payload.kind) {
        s.count--;
        if (s.count <= 0) this.priv.inventory[payload.fromItemSlot] = null;
        usedKit = true;
      }
    }
    if (!usedKit && !this.consumeMats(def.costs)) {
      this.handlers.onToast({ text: `Missing materials for ${def.name}.`, tone: 'warn' });
      return;
    }
    const sn = computeSnappedPlacement(
      payload.kind,
      { x: payload.x, y: payload.y, z: payload.z },
      payload.rotY,
      Array.from(this.structures.values()),
      (x, z) => this.world.getHeight(x, z)
    );
    const st: StructureState = {
      id: `lst_${this.seq++}_${Date.now().toString(36)}`,
      kind: payload.kind,
      ownerId: this.localPlayer.id,
      ownerName: this.localPlayer.name,
      x: sn.x,
      y: sn.y,
      z: sn.z,
      rotY: sn.rotY,
      hp: def.maxHp,
      maxHp: def.maxHp,
      isOpen: payload.kind === 'wood_doorway' ? false : undefined,
      lit: payload.kind === 'campfire' || payload.kind === 'furnace' || payload.kind === 'lantern_post' || payload.kind === 'watchtower_beacon' ? true : undefined,
      fuel: payload.kind === 'campfire' ? 80 : undefined,
      waterLevel: payload.kind === 'rain_collector' ? 30 : undefined,
      chestSlots: payload.kind === 'storage_chest' ? Array.from({ length: CHEST_SIZE }, () => null) : undefined,
    };
    this.structures.set(st.id, st);
    this.priv.objectives.build_shelter = true;
    this.grantXp(18);
    this.handlers.onStructureAdd(st);
    this.relay('structure:add', st);
    const fx = { kind: 'build' as const, x: st.x, y: st.y + 0.8, z: st.z };
    this.handlers.onFxEvent(fx);
    this.relay('fx:event', fx);
    this.syncPrivate();
    this.saveLocal();
  }

  handleBuildBoat(payload: BoatBuildPayload): void {
    const def = BOATS[payload.kind];
    if (!def) return;
    if (this.world.getHeight(payload.x, payload.z) > WATER_LEVEL - 0.25) {
      this.handlers.onToast({ text: 'Launch vessels directly onto coastal water!', tone: 'warn' });
      return;
    }
    if (def.requiresWorkbench && !this.localPlayer.status.nearWorkbench) {
      this.handlers.onToast({ text: `${def.name} requires a nearby Workbench!`, tone: 'warn' });
      return;
    }
    if (!this.consumeMats(def.costs)) {
      this.handlers.onToast({ text: `Not enough materials for ${def.name}.`, tone: 'warn' });
      return;
    }
    const boat: BoatState = {
      id: `lboat_${this.seq++}_${Date.now().toString(36)}`,
      kind: payload.kind,
      ownerId: this.localPlayer.id,
      ownerName: this.localPlayer.name,
      x: Math.round(payload.x * 100) / 100,
      y: WATER_LEVEL,
      z: Math.round(payload.z * 100) / 100,
      yaw: payload.rotY,
      vx: 0,
      vz: 0,
      speed: 0,
      throttle: 0,
      rudder: 0,
      hp: def.maxHp,
      maxHp: def.maxHp,
      pilotId: null,
      chestSlots: def.cargoSlots > 0 ? Array.from({ length: def.cargoSlots }, () => null) : undefined,
    };
    this.boats.set(boat.id, boat);
    this.grantXp(payload.kind === 'longship' ? 95 : payload.kind === 'skiff' ? 55 : 28);
    this.handlers.onBoatAdd(boat);
    this.relay('boat:add', boat);
    const fx = { kind: 'build' as const, x: boat.x, y: WATER_LEVEL + 0.8, z: boat.z };
    this.handlers.onFxEvent(fx);
    this.relay('fx:event', fx);
    this.handlers.onToast({ text: `Launched ${def.name}! Approach & press [E] to sail!`, tone: 'good' });
    this.syncPrivate();
    this.saveLocal();
  }

  private boardBoatForPlayer(p: PlayerState, boatId: string | null, peerId?: string): void {
    const notify = (text: string, tone: 'info' | 'good' | 'warn' = 'info') => {
      if (peerId) this.relay('toast:notify', { text, tone }, peerId);
      else this.handlers.onToast({ text, tone });
    };

    if (p.boatId) {
      const cur = this.boats.get(p.boatId);
      if (cur) {
        if (cur.pilotId === p.id) {
          cur.pilotId = null;
          cur.throttle = 0;
          this.boatSteers.delete(cur.id);
        }
        if (cur.passengerIds) {
          cur.passengerIds = cur.passengerIds.filter((id) => id !== p.id);
        }
        const sideX = Math.cos(cur.yaw) * 2.0;
        const sideZ = -Math.sin(cur.yaw) * 2.0;
        p.x = clamp(cur.x + sideX, -212, 212);
        p.z = clamp(cur.z + sideZ, -212, 212);
        p.y = Math.max(WATER_LEVEL + 0.25, this.world.getHeight(p.x, p.z) + 0.15);
      }
      p.boatId = null;
      p.boatSeatIndex = undefined;
      if (!peerId) this.boatSteer = 0;
      notify('Disembarked vessel.', 'info');
      return;
    }
    if (!boatId) return;
    const b = this.boats.get(boatId);
    if (!b || Math.hypot(b.x - p.x, b.z - p.z) > 8.5) return;
    const def = BOATS[b.kind];
    if (!b.passengerIds) b.passengerIds = [];

    if (!b.pilotId) {
      b.pilotId = p.id;
      p.boatId = b.id;
      p.boatSeatIndex = 0;
      notify(`Sailing ${def.name}! [W/S] Sails • [A/D] Steer • [E] Disembark`, 'good');
      return;
    }
    if (b.passengerIds.length < def.maxCrew - 1) {
      b.passengerIds.push(p.id);
      p.boatId = b.id;
      p.boatSeatIndex = b.passengerIds.length;
      notify(`Boarded ${def.name} as Crew (${1 + b.passengerIds.length}/${def.maxCrew})!`, 'good');
      return;
    }
    notify(`${def.name} is full (${def.maxCrew}/${def.maxCrew})!`, 'warn');
  }

  handleBoardBoat(boatId: string | null): void {
    this.boardBoatForPlayer(this.localPlayer, boatId);
  }

  private emitWorldPing(sender: PlayerState, x: number, y: number, z: number, label?: string): void {
    const now = Date.now();
    const ping: WorldPing = {
      id: `ping_${this.seq++}`,
      senderId: sender.id,
      senderName: sender.name,
      x: clamp(x, -216, 216),
      y: clamp(y, -2, 60),
      z: clamp(z, -216, 216),
      label: (label || 'Waypoint').slice(0, 36),
      color: sender.isHost ? '#fbbf24' : '#2dd4bf',
      createdAt: now,
      expiresAt: now + 14_000,
    };
    this.activePings.push(ping);
    if (this.activePings.length > 12) this.activePings.shift();
    this.handlers.onWorldPing?.(ping);
    this.relay('world:ping', ping);
  }

  handleWorldPing(payload: { x: number; y: number; z: number; label?: string }): void {
    this.emitWorldPing(this.localPlayer, payload.x, payload.y, payload.z, payload.label);
  }

  private revivePlayerBy(reviver: PlayerState, targetId: string): void {
    const target = this.getAllPlayers().find((pl) => pl.id === targetId);
    if (!target || !target.downed) return;
    target.downed = false;
    target.downedUntil = undefined;
    target.alive = true;
    target.anim = 'idle';
    target.vitals.hp = Math.round(target.vitals.maxHp * 0.5);
    const fx = { kind: 'levelup' as const, x: target.x, y: target.y + 1.2, z: target.z };
    this.handlers.onFxEvent(fx);
    this.relay('fx:event', fx);
    const msg: ChatMessage = {
      id: `sys_${this.seq++}`,
      senderId: 'system',
      senderName: 'Wildreach',
      text: `${reviver.name} revived ${target.name}!`,
      kind: 'system',
      timestamp: Date.now(),
    };
    this.handlers.onChatMessage(msg);
    this.relay('chat:message', msg);
  }

  handleRevive(targetId: string): void {
    this.revivePlayerBy(this.localPlayer, targetId);
  }

  private teleportPlayerToFriend(mover: PlayerState, friendId: string, peerId?: string): void {
    const friend = this.getAllPlayers().find((pl) => pl.id === friendId);
    if (!friend || friend.id === mover.id || !friend.alive) return;
    if (mover.boatId) this.boardBoatForPlayer(mover, null, peerId);
    mover.x = clamp(friend.x + (Math.random() - 0.5) * 2.2, -210, 210);
    mover.z = clamp(friend.z + (Math.random() - 0.5) * 2.2, -210, 210);
    mover.y = Math.max(this.world.getHeight(mover.x, mover.z), WATER_LEVEL + 0.2);
    if (peerId) this.relay('toast:notify', { text: `Rallied to ${friend.name}!`, tone: 'good' }, peerId);
    else this.handlers.onToast({ text: `Rallied to ${friend.name}!`, tone: 'good' });
  }

  handleTeleportToFriend(friendId: string): void {
    this.teleportPlayerToFriend(this.localPlayer, friendId);
  }

  handleBoatControl(payload: BoatControlPayload): void {
    const p = this.localPlayer;
    if (!p.boatId) return;
    const b = this.boats.get(p.boatId);
    if (!b) return;
    if (typeof payload.throttle === 'number') b.throttle = clamp(Math.round(payload.throttle), -1, 3);
    else if (typeof payload.throttleDelta === 'number' && payload.throttleDelta !== 0) {
      b.throttle = clamp(b.throttle + Math.sign(payload.throttleDelta), -1, 3);
    }
    this.boatSteer = clamp(payload.steer, -1, 1);
  }

  handleBoatChestTransfer(payload: BoatChestTransferPayload): void {
    const b = this.boats.get(payload.boatId);
    if (!b || !b.chestSlots) return;
    if (payload.from === 'inventory') {
      const s = this.priv.inventory[payload.fromIndex];
      if (!s) return;
      const idx = b.chestSlots.findIndex((x) => x === null);
      if (idx >= 0) {
        b.chestSlots[idx] = s;
        this.priv.inventory[payload.fromIndex] = null;
      }
    } else {
      const s = b.chestSlots[payload.fromIndex];
      if (!s) return;
      this.addItem(s.itemId, s.count, s.durability);
      b.chestSlots[payload.fromIndex] = null;
    }
    this.handlers.onBoatUpdate(b);
    this.relay('boat:update', b);
    this.syncPrivate();
    this.saveLocal();
  }

  handleFishCatch(payload: { deepWater: boolean }): void {
    const r = Math.random();
    let itemId = 'raw_fish';
    let count = 1;
    let xp = 18;
    if (payload.deepWater) {
      if (r < 0.15) { itemId = 'sea_pearl'; xp = 42; }
      else if (r < 0.26) { itemId = 'gold_coin'; count = 2 + Math.floor(Math.random() * 3); xp = 36; }
      else if (r < 0.7) { itemId = 'golden_snapper'; xp = 30; }
    } else {
      if (r < 0.08) { itemId = 'sea_pearl'; xp = 34; }
      else if (r < 0.34) { itemId = 'golden_snapper'; xp = 24; }
    }
    this.addItem(itemId, count);
    const name = ITEMS[itemId]?.name ?? itemId;
    this.grantXp(xp);
    this.handlers.onCombatEvent({
      id: `f_${this.seq++}`,
      x: this.localPlayer.x,
      y: this.localPlayer.y + 2.2,
      z: this.localPlayer.z,
      text: `Caught ${count}× ${name}!`,
      color: '#38bdf8',
      kind: 'gather',
    });
    this.handlers.onToast({ text: `Reeled in ${count}× ${name}!`, tone: 'good' });
    this.syncPrivate();
  }

  handleDemolish(structureId: string): void {
    const st = this.structures.get(structureId);
    if (!st || st.ownerId === 'world') return;
    for (const c of STRUCTURES[st.kind].costs) {
      this.addItem(c.itemId, Math.max(1, Math.floor(c.count * 0.5)));
    }
    this.structures.delete(structureId);
    this.handlers.onStructureRemove(structureId);
    this.relay('structure:remove', structureId);
    this.syncPrivate();
    this.saveLocal();
  }

  handleChestTransfer(payload: ChestTransferPayload): void {
    const st = this.structures.get(payload.structureId);
    if (!st || !st.chestSlots) return;
    if (payload.from === 'inventory') {
      const s = this.priv.inventory[payload.fromIndex];
      if (!s) return;
      const idx = st.chestSlots.findIndex((x) => x === null);
      if (idx >= 0) {
        st.chestSlots[idx] = s;
        this.priv.inventory[payload.fromIndex] = null;
      }
    } else {
      const s = st.chestSlots[payload.fromIndex];
      if (!s) return;
      this.addItem(s.itemId, s.count, s.durability);
      st.chestSlots[payload.fromIndex] = null;
    }
    this.handlers.onStructureUpdate(st);
    this.relay('structure:update', st);
    this.syncPrivate();
    this.saveLocal();
  }

  handleRespawn(): void {
    const sp = this.localPlayer.bedPos ?? this.world.getSpawnPoint();
    this.localPlayer.x = sp.x;
    this.localPlayer.y = sp.y;
    this.localPlayer.z = sp.z;
    this.localPlayer.alive = true;
    this.localPlayer.vitals.hp = this.localPlayer.vitals.maxHp;
    this.localPlayer.vitals.hunger = 78;
    this.localPlayer.vitals.thirst = 78;
  }

  handleChat(text: string): void {
    const t = text.trim();
    if (t === '/time day') {
      this.time.timeOfDay = 0.36;
      this.handlers.onToast({ text: 'Time shifted to bright midday.', tone: 'info' });
      return;
    }
    if (t === '/time dusk') {
      this.time.timeOfDay = 0.74;
      this.handlers.onToast({ text: 'Time shifted to golden dusk.', tone: 'info' });
      return;
    }
    if (t === '/weather rain') {
      this.time.weather = 'storm';
      this.time.weatherIntensity = 0.9;
      this.handlers.onToast({ text: 'A coastal storm rolls across the archipelago.', tone: 'warn' });
      return;
    }
    if (t === '/weather clear') {
      this.time.weather = 'clear';
      this.time.weatherIntensity = 0;
      this.handlers.onToast({ text: 'Skies clear over Wildreach.', tone: 'good' });
      return;
    }
    const msg: ChatMessage = {
      id: `lchat_${this.seq++}`,
      senderId: this.localPlayer.id,
      senderName: this.localPlayer.name,
      text: t,
      kind: 'chat',
      timestamp: Date.now(),
    };
    this.handlers.onChatMessage(msg);
    this.relay('chat:message', msg);
  }

  private addItem(itemId: string, count: number, durability?: number): void {
    const def = getItem(itemId);
    if (!def) return;
    let rem = count;
    if (def.maxStack > 1) {
      for (const s of this.priv.inventory) {
        if (s && s.itemId === itemId && s.count < def.maxStack) {
          const add = Math.min(def.maxStack - s.count, rem);
          s.count += add;
          rem -= add;
        }
      }
    }
    for (let i = 0; i < this.priv.inventory.length && rem > 0; i++) {
      if (!this.priv.inventory[i]) {
        const add = Math.min(def.maxStack, rem);
        this.priv.inventory[i] = { itemId, count: add, durability: durability ?? def.maxDurability };
        rem -= add;
      }
    }
  }

  private consumeMats(ings: { itemId: string; count: number }[]): boolean {
    for (const ing of ings) {
      let have = 0;
      for (const s of this.priv.inventory) if (s?.itemId === ing.itemId) have += s.count;
      if (have < ing.count) return false;
    }
    for (const ing of ings) {
      let rem = ing.count;
      for (let i = 0; i < this.priv.inventory.length && rem > 0; i++) {
        const s = this.priv.inventory[i];
        if (!s || s.itemId !== ing.itemId) continue;
        const take = Math.min(s.count, rem);
        s.count -= take;
        rem -= take;
        if (s.count <= 0) this.priv.inventory[i] = null;
      }
    }
    return true;
  }

  private grantXp(amt: number): void {
    this.localPlayer.xp += amt;
    const need = this.localPlayer.level * 120;
    if (this.localPlayer.xp >= need) {
      this.localPlayer.xp -= need;
      this.localPlayer.level += 1;
      this.localPlayer.vitals.maxHp += 10;
      this.localPlayer.vitals.hp = this.localPlayer.vitals.maxHp;
      this.handlers.onFxEvent({ kind: 'levelup', x: this.localPlayer.x, y: this.localPlayer.y + 1.5, z: this.localPlayer.z });
      this.handlers.onToast({ text: `Level Up! Reached Level ${this.localPlayer.level}!`, tone: 'good' });
    }
  }

  private syncPrivate(): void {
    this.localPlayer.equippedItemId = this.priv.inventory[this.localPlayer.equippedSlot]?.itemId ?? null;
    this.handlers.onPrivateState({ ...this.priv });
  }

  private tick(dt: number, now: number): void {
    this.time.timeOfDay += dt / DAY_LENGTH_SECONDS;
    if (this.time.timeOfDay >= 1) {
      this.time.timeOfDay -= 1;
      this.time.day += 1;
    }

    const isNight = this.time.timeOfDay < 0.22 || this.time.timeOfDay > 0.79;
    if (isNight && !this.wasNight) {
      this.handlers.onToast({ text: 'Night falls — stay near campfires!', tone: 'warn' });
    }
    this.wasNight = isNight;

    this.weatherTimer -= dt;
    if (this.weatherTimer <= 0) {
      this.weatherTimer = 70 + Math.random() * 80;
      const r = Math.random();
      const next: WeatherType = r < 0.5 ? 'clear' : r < 0.72 ? 'breezy' : r < 0.85 ? 'fog' : r < 0.94 ? 'rain' : 'storm';
      this.time.weather = next;
    }
    const targetW = this.time.weather === 'storm' ? 1 : this.time.weather === 'rain' ? 0.65 : this.time.weather === 'fog' ? 0.5 : 0;
    this.time.weatherIntensity += (targetW - this.time.weatherIntensity) * Math.min(1, dt * 0.4);
    this.time.windSpeed = this.time.weather === 'storm' ? 2.3 : this.time.weather === 'breezy' ? 1.55 : 0.95;

    if (this.time.weather === 'storm') {
      this.thunderTimer -= dt;
      if (this.thunderTimer <= 0) {
        this.thunderTimer = 14 + Math.random() * 16;
        this.handlers.onFxEvent({ kind: 'thunder', x: 0, y: 40, z: 0 });
      }
    }

    // Player vitals & station proximity
    const p = this.localPlayer;
    if (p.swingTime > 0) p.swingTime = Math.max(0, p.swingTime - dt);
    if (p.alive) {
      let nearCampfire = false, nearWorkbench = false, nearFurnace = false, nearRunicForge = false, nearCauldron = false;
      let roofs = 0, walls = 0;
      for (const s of this.structures.values()) {
        const d = Math.hypot(s.x - p.x, s.z - p.z);
        if (s.kind === 'campfire' && s.lit && d < 9.5) nearCampfire = true;
        if (s.kind === 'workbench' && d < 16) nearWorkbench = true;
        if (s.kind === 'furnace' && d < 9.5) nearFurnace = true;
        if (s.kind === 'runic_forge' && d < 9.5) nearRunicForge = true;
        if (s.kind === 'alchemy_cauldron' && d < 8.5) nearCauldron = true;
        if (s.kind === 'wood_roof' && d < 3.4) roofs++;
        if ((s.kind === 'wood_wall' || s.kind === 'wood_doorway' || s.kind === 'stone_wall') && d < 4.5) walls++;
        if (s.kind === 'planter_box') {
          const prev = s.cropProgress ?? 0;
          s.cropProgress = Math.min(100, prev + dt * 2.2);
          if (prev < 100 && s.cropProgress >= 100) this.handlers.onStructureUpdate(s);
        }
      }
      const sheltered = roofs >= 1 && walls >= 2;
      const wet = p.y < WATER_LEVEL - 0.1 || ((this.time.weather === 'rain' || this.time.weather === 'storm') && !sheltered);
      const ambient = (isNight ? 28 : 58) - (wet ? 16 : 0) + (nearCampfire ? 32 : 0) + (p.equippedItemId === 'torch' ? 16 : 0) + (sheltered ? 15 : 0);
      p.vitals.warmth += (clamp(ambient, 8, 95) - p.vitals.warmth) * Math.min(1, dt * 0.25);
      p.vitals.hunger = Math.max(0, p.vitals.hunger - dt * 0.09);
      p.vitals.thirst = Math.max(0, p.vitals.thirst - dt * 0.12);
      p.vitals.stamina = Math.min(p.vitals.maxStamina, p.vitals.stamina + dt * 15);
      if (p.vitals.hunger > 55 && p.vitals.thirst > 50 && p.vitals.warmth > 25) {
        p.vitals.hp = Math.min(p.vitals.maxHp, p.vitals.hp + dt * (sheltered || nearCampfire ? 2.0 : 0.9));
      }
      p.status = {
        sheltered,
        warm: p.vitals.warmth >= 55 && (nearCampfire || sheltered || p.equippedItemId === 'torch'),
        wellFed: p.vitals.hunger >= 60 && p.vitals.thirst >= 55,
        wet,
        chilled: p.vitals.warmth < 25,
        nearCampfire,
        nearWorkbench,
        nearFurnace,
        nearRunicForge,
        nearCauldron,
        nearFreshWater: this.world.isNearFreshWater(p.x, p.z),
      };
    }

    // Boats sailing simulation (supports BOTH host & remote P2P pilots + multi-passenger crew!)
    for (const b of this.boats.values()) {
      const def = BOATS[b.kind];
      const pilot =
        b.pilotId === p.id
          ? p
          : b.pilotId
          ? this.remotePeers.get(b.pilotId)?.player ?? null
          : null;
      const steer = b.pilotId === p.id ? this.boatSteer : b.pilotId ? this.boatSteers.get(b.id) ?? 0 : 0;
      b.rudder += (steer - b.rudder) * Math.min(1, dt * 6);
      let targetSpeed = 0;
      if (pilot && pilot.alive) {
        const windEff = computeWindSailEfficiency(b.yaw, this.time.windDirX, this.time.windDirZ);
        if (b.throttle === -1) targetSpeed = -def.reverseSpeed;
        else if (b.throttle === 1) targetSpeed = def.paddleSpeed;
        else if (b.throttle === 2) targetSpeed = def.halfSailSpeed * windEff;
        else if (b.throttle === 3) targetSpeed = def.fullSailSpeed * windEff;
      } else {
        b.pilotId = null;
        b.throttle = 0;
      }
      b.speed += (targetSpeed - b.speed) * Math.min(1, dt * (b.pilotId ? 2.4 : 1.4));
      if (Math.abs(b.speed) < 0.04 && targetSpeed === 0) b.speed = 0;
      if (Math.abs(b.rudder) > 0.02) {
        const turnFactor = 0.55 + Math.min(1, Math.abs(b.speed) / 4.0) * 0.65;
        b.yaw -= b.rudder * def.turnRate * turnFactor * (b.speed < -0.3 ? -1 : 1) * dt;
      }
      const fwdX = -Math.sin(b.yaw);
      const fwdZ = -Math.cos(b.yaw);
      const nx = clamp(b.x + fwdX * b.speed * dt, -208, 208);
      const nz = clamp(b.z + fwdZ * b.speed * dt, -208, 208);
      const bowX = nx + fwdX * (def.length * 0.44);
      const bowZ = nz + fwdZ * (def.length * 0.44);
      if (this.world.getHeight(nx, nz) < WATER_LEVEL - 0.3 && this.world.getHeight(bowX, bowZ) < WATER_LEVEL - 0.15) {
        b.x = nx;
        b.z = nz;
        b.vx = fwdX * b.speed;
        b.vz = fwdZ * b.speed;
      } else {
        b.speed *= -0.18;
        b.vx = 0;
        b.vz = 0;
      }
      b.y = WATER_LEVEL;
      if (pilot && pilot.alive) {
        pilot.x = b.x - fwdX * def.helmOffsetZ;
        pilot.z = b.z - fwdZ * def.helmOffsetZ;
        pilot.y = WATER_LEVEL + def.deckY;
        pilot.yaw = b.yaw;
        pilot.vx = b.vx;
        pilot.vz = b.vz;
        pilot.status.wet = false;
      }
      if (b.passengerIds && b.passengerIds.length > 0) {
        const rightX = Math.cos(b.yaw);
        const rightZ = -Math.sin(b.yaw);
        b.passengerIds = b.passengerIds.filter((pid, idx) => {
          const pax = pid === p.id ? p : this.remotePeers.get(pid)?.player;
          if (!pax || !pax.alive || pax.boatId !== b.id) return false;
          const seat = def.passengerOffsets[idx] ?? [0, 0];
          pax.x = b.x + rightX * seat[0] - fwdX * seat[1];
          pax.z = b.z + rightZ * seat[0] - fwdZ * seat[1];
          pax.y = WATER_LEVEL + def.deckY;
          pax.vx = b.vx;
          pax.vz = b.vz;
          pax.boatSeatIndex = idx + 1;
          pax.status.wet = false;
          return true;
        });
      }
    }

    // Wildlife AI
    for (const w of this.wildlife.values()) {
      if (w.state === 'dead') {
        if (now >= w.respawnAt) {
          w.hp = w.maxHp;
          w.x = w.homeX;
          w.z = w.homeZ;
          w.y = this.world.getHeight(w.x, w.z);
          w.state = 'idle';
        }
        continue;
      }
      const cfg = MOB_CFG[w.kind];
      if (w.attackCooldown > 0) w.attackCooldown -= dt;
      w.thinkTimer -= dt;
      const distP = Math.hypot(p.x - w.x, p.z - w.z);
      if (!cfg.hostile && distP < 12) {
        const ang = Math.atan2(w.z - p.z, w.x - p.x);
        w.targetX = clamp(w.x + Math.cos(ang) * 18, -135, 135);
        w.targetZ = clamp(w.z + Math.sin(ang) * 18, -135, 135);
        w.state = 'flee';
        w.thinkTimer = 2.5;
      } else if (cfg.hostile && p.alive && (distP < 12 || now < w.aggroUntil)) {
        if (distP < 2.2) {
          w.speed = 0;
          if (w.attackCooldown <= 0) {
            w.attackCooldown = 1.4;
            const dmg = Math.max(2, Math.round(cfg.dmg * (1 - p.armorRating / 100)));
            p.vitals.hp = Math.max(0, p.vitals.hp - dmg);
            this.handlers.onFxEvent({ kind: 'hit', x: p.x, y: p.y + 1.2, z: p.z });
            if (p.vitals.hp <= 0) p.alive = false;
          }
          continue;
        }
        w.targetX = p.x;
        w.targetZ = p.z;
        w.state = 'chase';
      }

      if (w.state === 'wander' || w.state === 'flee' || w.state === 'chase') {
        const dx = w.targetX - w.x;
        const dz = w.targetZ - w.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.8 || (w.state !== 'chase' && w.thinkTimer <= 0)) {
          w.state = 'idle';
          w.speed = 0;
          w.thinkTimer = 3 + Math.random() * 4;
        } else {
          const spd = w.state === 'wander' ? cfg.walk : cfg.run;
          const nx = w.x + (dx / d) * Math.min(d, spd * dt);
          const nz = w.z + (dz / d) * Math.min(d, spd * dt);
          const nh = this.world.getHeight(nx, nz);
          if (w.kind === 'serpent' ? nh < WATER_LEVEL - 0.9 : nh > WATER_LEVEL + 0.25) {
            w.x = nx;
            w.z = nz;
            w.y = w.kind === 'serpent' ? WATER_LEVEL - 0.15 : nh;
            w.yaw = Math.atan2(dx, dz);
            w.speed = spd;
          } else {
            w.state = 'idle';
          }
        }
      } else if (w.thinkTimer <= 0) {
        const a = Math.random() * Math.PI * 2;
        w.targetX = clamp(w.homeX + Math.cos(a) * 14, -135, 135);
        w.targetZ = clamp(w.homeZ + Math.sin(a) * 14, -135, 135);
        w.state = 'wander';
        w.thinkTimer = 5;
      }
    }

    // Companion Bots roaming camp
    for (const b of this.bots) {
      b.timer -= dt;
      const dx = b.goalX - b.x;
      const dz = b.goalZ - b.z;
      const d = Math.hypot(dx, dz);
      if (d < 1.2 || b.timer <= 0) {
        const a = Math.random() * Math.PI * 2;
        b.goalX = b.homeX + Math.cos(a) * (5 + Math.random() * 14);
        b.goalZ = b.homeZ + Math.sin(a) * (5 + Math.random() * 14);
        b.timer = 4 + Math.random() * 5;
        b.anim = 'idle';
      } else {
        const step = Math.min(d, 3.6 * dt);
        b.x += (dx / d) * step;
        b.z += (dz / d) * step;
        b.y = this.world.getHeight(b.x, b.z);
        b.yaw = Math.atan2(dx, dz);
        b.anim = 'walk';
      }
    }

    // Projectiles
    for (const [id, pr] of this.projectiles.entries()) {
      pr.vy -= 14.5 * dt;
      pr.x += pr.vx * dt;
      pr.y += pr.vy * dt;
      pr.z += pr.vz * dt;
      if (now - pr.bornAt > 4000 || pr.y <= this.world.getHeight(pr.x, pr.z)) {
        this.projectiles.delete(id);
        continue;
      }
      for (const w of this.wildlife.values()) {
        if (w.state === 'dead') continue;
        if (Math.hypot(w.x - pr.x, w.z - pr.z) < 1.25 && Math.abs(w.y + 1 - pr.y) < 1.35) {
          this.damageWildlife(w, pr.damage, pr.x, pr.z);
          this.projectiles.delete(id);
          break;
        }
      }
    }

    // Emit local snapshot + relay to all connected WebRTC/BroadcastChannel P2P friends!
    const snap = {
      t: now,
      time: { ...this.time },
      players: this.getAllPlayers(),
      boats: Array.from(this.boats.values()),
      wildlife: this.getWildlifeSnap(),
      projectiles: Array.from(this.projectiles.values()),
    };
    this.handlers.onSnapshot(snap);
    if (this.remotePeers.size > 0) {
      this.relay('world:snapshot', snap);
    }

    this.saveTimer += dt;
    if (this.saveTimer >= 20) {
      this.saveTimer = 0;
      this.saveLocal();
    }
  }
}
