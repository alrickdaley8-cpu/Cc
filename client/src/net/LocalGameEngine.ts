import {
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
  getItem,
  getRecipe,
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
  type WorldTimeState,
} from '@wildreach/shared';
import type { NetworkHandlers } from './NetworkClient';

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
};

/**
 * Full client-side simulation engine used automatically when WILDREACH is opened
 * on static hosting like GitHub Pages (with zero backend required), while keeping
 * 100% parity with the authoritative Socket.IO server protocol.
 */
export class LocalGameEngine {
  private handlers: NetworkHandlers;
  private world!: WorldGenerator;
  private roomId = 'emerald-archipelago';
  private roomName = 'Emerald Archipelago (Offline / GitHub Pages)';
  private seed = 42077;

  private localPlayer!: PlayerState;
  private bots: (PlayerState & { homeX: number; homeZ: number; goalX: number; goalZ: number; timer: number; cd: number })[] = [];
  private priv!: LocalPlayerPrivateState;
  private nodes = new Map<string, ResourceNodeState>();
  private structures = new Map<string, StructureState>();
  private wildlife = new Map<string, LocalWildlife>();
  private loot = new Map<string, LootDropState>();
  private projectiles = new Map<string, ProjectileState & { bornAt: number }>();

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
    this.loot.clear();
    this.projectiles.clear();
    this.bots = [];

    if (!this.loadLocalSave()) {
      this.seedStarterCamp();
    }

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

    this.spawnInitialWildlife();

    this.lastTick = performance.now();
    this.timer = globalThis.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - this.lastTick) / 1000);
      this.lastTick = now;
      this.tick(dt, Date.now());
    }, 50);

    const welcome: ChatMessage = {
      id: 'sys_welcome',
      senderId: 'system',
      senderName: 'Wildreach',
      text: 'Running in Local World Mode (auto-saved in browser). Add a server URL in the lobby for online co-op!',
      kind: 'system',
      timestamp: Date.now(),
    };

    return {
      playerId: this.localPlayer.id,
      room: {
        id: this.roomId,
        name: this.roomName,
        seed: this.seed,
        playerCount: 1,
        maxPlayers: 1,
        day: this.time.day,
        weather: this.time.weather,
        pvpEnabled: false,
      },
      landmarks: this.world.landmarks,
      time: { ...this.time },
      players: [this.localPlayer, ...this.bots],
      privateState: this.priv,
      nodes: Array.from(this.nodes.values()),
      structures: Array.from(this.structures.values()),
      wildlife: this.getWildlifeSnap(),
      loot: Array.from(this.loot.values()),
      chatHistory: [welcome],
    };
  }

  stop(): void {
    if (this.timer !== null) {
      globalThis.clearInterval(this.timer);
      this.timer = null;
    }
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
      const data = JSON.parse(raw) as { day: number; timeOfDay: number; structures: StructureState[] };
      this.time.day = data.day || 1;
      this.time.timeOfDay = typeof data.timeOfDay === 'number' ? data.timeOfDay : 0.31;
      for (const s of data.structures || []) this.structures.set(s.id, s);
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
  }

  private addWildlife(kind: WildlifeKind, x: number, z: number): void {
    const cfg = MOB_CFG[kind];
    const id = `lmob_${kind}_${this.seq++}`;
    this.wildlife.set(id, {
      id,
      kind,
      x,
      y: this.world.getHeight(x, z),
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
        nearCampfire: false, nearWorkbench: false, nearFurnace: false, nearRunicForge: false, nearFreshWater: false,
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
    p.x = clamp(input.x, -170, 170);
    p.y = input.y;
    p.z = clamp(input.z, -170, 170);
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
        this.handlers.onNodeFell({ id: node.id, dirX: dx / len, dirZ: dz / len });
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
    this.handlers.onFxEvent({ kind: 'build', x: st.x, y: st.y + 0.8, z: st.z });
    this.syncPrivate();
    this.saveLocal();
  }

  handleDemolish(structureId: string): void {
    const st = this.structures.get(structureId);
    if (!st || st.ownerId === 'world') return;
    for (const c of STRUCTURES[st.kind].costs) {
      this.addItem(c.itemId, Math.max(1, Math.floor(c.count * 0.5)));
    }
    this.structures.delete(structureId);
    this.handlers.onStructureRemove(structureId);
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
    this.handlers.onChatMessage({
      id: `lchat_${this.seq++}`,
      senderId: this.localPlayer.id,
      senderName: this.localPlayer.name,
      text: t,
      kind: 'chat',
      timestamp: Date.now(),
    });
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
      let nearCampfire = false, nearWorkbench = false, nearFurnace = false, nearRunicForge = false;
      let roofs = 0, walls = 0;
      for (const s of this.structures.values()) {
        const d = Math.hypot(s.x - p.x, s.z - p.z);
        if (s.kind === 'campfire' && s.lit && d < 9.5) nearCampfire = true;
        if (s.kind === 'workbench' && d < 16) nearWorkbench = true;
        if (s.kind === 'furnace' && d < 9.5) nearFurnace = true;
        if (s.kind === 'runic_forge' && d < 9.5) nearRunicForge = true;
        if (s.kind === 'wood_roof' && d < 3.4) roofs++;
        if ((s.kind === 'wood_wall' || s.kind === 'wood_doorway' || s.kind === 'stone_wall') && d < 4.5) walls++;
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
        nearFreshWater: this.world.isNearFreshWater(p.x, p.z),
      };
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
          if (nh > WATER_LEVEL + 0.25) {
            w.x = nx;
            w.z = nz;
            w.y = nh;
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

    // Emit local snapshot
    this.handlers.onSnapshot({
      t: now,
      time: { ...this.time },
      players: [this.localPlayer, ...this.bots],
      wildlife: this.getWildlifeSnap(),
      projectiles: Array.from(this.projectiles.values()),
    });

    this.saveTimer += dt;
    if (this.saveTimer >= 20) {
      this.saveTimer = 0;
      this.saveLocal();
    }
  }
}
