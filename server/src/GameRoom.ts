import fs from 'fs';
import path from 'path';
import type { Server, Socket } from 'socket.io';
import {
  BOATS,
  CHEST_SIZE,
  DAY_LENGTH_SECONDS,
  HOTBAR_SIZE,
  ITEMS,
  RESOURCE_NODE_BLUEPRINTS,
  SERVER_TICK_HZ,
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
  type ClientToServerEvents,
  type FloatingCombatEvent,
  type InventorySlot,
  type JoinRoomPayload,
  type LocalPlayerPrivateState,
  type LootDropState,
  type PlayerInputPayload,
  type PlayerState,
  type PrimaryActionPayload,
  type ProjectileState,
  type ResourceNodeState,
  type RoomSummary,
  type ServerToClientEvents,
  type StructureKind,
  type StructureState,
  type WeatherType,
  type WildlifeState,
  type WorldInitPayload,
  type WorldTimeState,
} from '@wildreach/shared';
import {
  addItemToSlots,
  consumeIngredients,
  createEmptyInventory,
  createStarterInventory,
  hasIngredients,
  swapSlots,
} from './InventoryHelper.js';
import { WILDLIFE_CONFIG, WildlifeSystem } from './WildlifeSystem.js';
import { BotSystem } from './BotSystem.js';

interface PersistedRoomData {
  seed: number;
  day: number;
  timeOfDay: number;
  structures: StructureState[];
  boats?: BoatState[];
}

export class GameRoom {
  readonly id: string;
  readonly name: string;
  readonly seed: number;
  readonly maxPlayers = 24;
  readonly world: WorldGenerator;

  private io: Server<ClientToServerEvents, ServerToClientEvents>;
  private players: Map<string, PlayerState> = new Map();
  private privateStates: Map<string, LocalPlayerPrivateState> = new Map();
  private sockets: Map<string, Socket<ClientToServerEvents, ServerToClientEvents>> = new Map();
  private lastActionTime: Map<string, number> = new Map();
  private lastDodgeTime: Map<string, number> = new Map();
  private nodes: Map<string, ResourceNodeState> = new Map();
  private structures: Map<string, StructureState> = new Map();
  private boats: Map<string, BoatState> = new Map();
  private boatSteerInputs: Map<string, number> = new Map();
  private loot: Map<string, LootDropState> = new Map();
  private projectiles: Map<string, ProjectileState & { bornAt: number }> = new Map();
  private chatHistory: ChatMessage[] = [];

  private wildlife: WildlifeSystem;
  private bots: BotSystem;

  private time: WorldTimeState = {
    day: 1,
    timeOfDay: 0.31, // Golden morning sunlight on fresh join!
    weather: 'clear',
    weatherIntensity: 0,
    windDirX: 0.78,
    windDirZ: 0.62,
    windSpeed: 1.0,
  };
  private weatherTimer = 95;
  private thunderTimer = 14;
  private wasNight = false;
  private nextEntitySeq = 1;
  private tickHandle: NodeJS.Timeout | null = null;
  private saveTimer = 0;
  private lastTickAt = Date.now();
  private dataFile: string;

  constructor(
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    id: string,
    name: string,
    seed: number
  ) {
    this.io = io;
    this.id = id;
    this.name = name;
    this.seed = seed;
    this.world = new WorldGenerator(seed);
    this.wildlife = new WildlifeSystem(this.world);
    this.bots = new BotSystem();

    const dataDir = path.resolve(process.cwd(), 'data');
    fs.mkdirSync(dataDir, { recursive: true });
    this.dataFile = path.join(dataDir, `room-${id}.json`);

    // Generate deterministic world nodes
    for (const node of this.world.generateResourceNodes()) {
      this.nodes.set(node.id, node);
    }

    if (!this.loadFromDisk()) {
      this.seedStarterCamp();
    }

    this.addSystemMessage(`Welcome to ${this.name}! Gather timber & stone, light a campfire before dusk, and build together.`);
    this.startLoop();
  }

  private seedStarterCamp(): void {
    // Cozy shared starter campfire & supply chest beside the Runestone Sanctuary
    const cx = -7.5;
    const cz = 20.5;
    const cy = this.world.getHeight(cx, cz);
    this.structures.set('st_sanctuary_fire', {
      id: 'st_sanctuary_fire',
      kind: 'campfire',
      ownerId: 'world',
      ownerName: 'Sanctuary',
      x: cx,
      y: cy,
      z: cz,
      rotY: 0,
      hp: 120,
      maxHp: 120,
      lit: true,
      fuel: 95,
    });

    const bx = -13.2;
    const bz = 20.8;
    const by = this.world.getHeight(bx, bz);
    const chestSlots = createEmptyInventory(CHEST_SIZE);
    chestSlots[0] = { itemId: 'wood', count: 12 };
    chestSlots[1] = { itemId: 'stone', count: 10 };
    chestSlots[2] = { itemId: 'berries', count: 8 };
    chestSlots[3] = { itemId: 'cooked_meat', count: 3 };
    chestSlots[4] = { itemId: 'flint_arrow', count: 12 };
    this.structures.set('st_sanctuary_chest', {
      id: 'st_sanctuary_chest',
      kind: 'storage_chest',
      ownerId: 'world',
      ownerName: 'Sanctuary',
      x: bx,
      y: by,
      z: bz,
      rotY: 0.45,
      hp: 240,
      maxHp: 240,
      chestSlots,
    });

    // Starter Timber Raft moored right off the South Harbor Jetty so players can sail immediately!
    this.ensureStarterBoat();
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

  private loadFromDisk(): boolean {
    try {
      if (!fs.existsSync(this.dataFile)) return false;
      const raw = fs.readFileSync(this.dataFile, 'utf8');
      const data = JSON.parse(raw) as PersistedRoomData;
      if (data.seed !== this.seed) return false;
      this.time.day = data.day || 1;
      this.time.timeOfDay = typeof data.timeOfDay === 'number' ? data.timeOfDay : 0.31;
      if (Array.isArray(data.structures)) {
        for (const s of data.structures) {
          this.structures.set(s.id, s);
        }
      }
      if (Array.isArray(data.boats)) {
        for (const b of data.boats) {
          this.boats.set(b.id, { ...b, pilotId: null, speed: 0, vx: 0, vz: 0, throttle: 0 });
        }
      }
      this.ensureStarterBoat();
      return this.structures.size > 0;
    } catch {
      return false;
    }
  }

  private saveToDisk(): void {
    try {
      const payload: PersistedRoomData = {
        seed: this.seed,
        day: this.time.day,
        timeOfDay: this.time.timeOfDay,
        structures: Array.from(this.structures.values()),
        boats: Array.from(this.boats.values()).map((b) => ({ ...b, pilotId: null })),
      };
      fs.writeFileSync(this.dataFile, JSON.stringify(payload), 'utf8');
    } catch {
      // Ignore disk save errors in restricted environments
    }
  }

  getSummary(): RoomSummary {
    const humanCount = Array.from(this.players.values()).filter((p) => !p.isBot).length;
    return {
      id: this.id,
      name: this.name,
      seed: this.seed,
      playerCount: humanCount,
      maxPlayers: this.maxPlayers,
      day: this.time.day,
      weather: this.time.weather,
      pvpEnabled: false,
    };
  }

  private startLoop(): void {
    if (this.tickHandle) return;
    this.lastTickAt = Date.now();
    this.tickHandle = setInterval(() => {
      const now = Date.now();
      const dt = Math.min(0.12, (now - this.lastTickAt) / 1000);
      this.lastTickAt = now;
      this.tick(dt, now);
    }, Math.round(1000 / SERVER_TICK_HZ));
  }

  destroy(): void {
    if (this.tickHandle) {
      clearInterval(this.tickHandle);
      this.tickHandle = null;
    }
    this.saveToDisk();
  }

  addPlayer(
    socket: Socket<ClientToServerEvents, ServerToClientEvents>,
    payload: JoinRoomPayload
  ): WorldInitPayload {
    const spawn = this.world.getSpawnPoint();
    const angle = Math.random() * Math.PI * 2;
    const x = spawn.x + Math.cos(angle) * 2.8;
    const z = spawn.z + Math.sin(angle) * 2.8;
    const y = this.world.getHeight(x, z);

    const safeName = (payload.playerName || 'Survivor').trim().slice(0, 18) || 'Survivor';
    const inv = createStarterInventory();

    const player: PlayerState = {
      id: socket.id,
      name: safeName,
      isBot: false,
      outfit: payload.outfit || 'ranger',
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
      vitals: {
        hp: 100,
        maxHp: 100,
        stamina: 100,
        maxStamina: 100,
        hunger: 92,
        thirst: 92,
        warmth: 58,
      },
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

    this.players.set(socket.id, player);
    this.privateStates.set(socket.id, priv);
    this.sockets.set(socket.id, socket);
    socket.join(this.id);

    // Spawn 1 transparent AI companion on request when room has no bots yet
    if (payload.spawnAiCompanions && this.bots.getBotCount() === 0) {
      this.spawnCompanionBot();
    }

    this.addSystemMessage(`${safeName} arrived on the island.`);

    return {
      playerId: socket.id,
      room: this.getSummary(),
      landmarks: this.world.landmarks,
      time: { ...this.time },
      players: Array.from(this.players.values()),
      privateState: priv,
      nodes: Array.from(this.nodes.values()),
      structures: Array.from(this.structures.values()),
      boats: Array.from(this.boats.values()),
      wildlife: this.wildlife.getSnapshots(),
      loot: Array.from(this.loot.values()),
      chatHistory: this.chatHistory.slice(-24),
    };
  }

  spawnCompanionBot(): void {
    if (this.bots.getBotCount() >= 3) return;
    const spawn = this.world.getSpawnPoint();
    const bot = this.bots.createBot(this.world, spawn.x, spawn.z);
    this.players.set(bot.id, bot);
    this.addSystemMessage(`${bot.name} joined the camp to help gather & defend.`);
  }

  removePlayer(socketId: string): void {
    const p = this.players.get(socketId);
    if (!p) return;
    if (p.boatId) {
      const boat = this.boats.get(p.boatId);
      if (boat && boat.pilotId === socketId) {
        boat.pilotId = null;
        boat.throttle = 0;
        this.boatSteerInputs.delete(boat.id);
      }
    }
    this.players.delete(socketId);
    this.privateStates.delete(socketId);
    this.sockets.delete(socketId);
    this.addSystemMessage(`${p.name} left the island.`);
  }

  handleInput(socketId: string, input: PlayerInputPayload): void {
    const p = this.players.get(socketId);
    if (!p || !p.alive) return;
    if (p.boatId) {
      // While piloting a vessel, keep player synced to the helm (only update look pitch)
      p.pitch = clamp(input.pitch, -1.5, 1.5);
      return;
    }

    // Anti-teleport / reasonable movement bounds clamp across all outer islands!
    const clampedX = clamp(input.x, -212, 212);
    const clampedZ = clamp(input.z, -212, 212);
    const dist = Math.hypot(clampedX - p.x, clampedZ - p.z);
    if (dist < 6.5) {
      p.x = clampedX;
      p.z = clampedZ;
      const ground = this.getSupportHeight(clampedX, clampedZ);
      p.y = Math.max(ground - 0.3, Math.min(ground + 16, input.y));
    }
    p.vx = clamp(input.vx, -16, 16);
    p.vy = clamp(input.vy, -24, 24);
    p.vz = clamp(input.vz, -16, 16);
    p.yaw = input.yaw;
    p.pitch = clamp(input.pitch, -1.5, 1.5);
    p.anim = input.anim;

    // Sprint / swim stamina consumption handled gently on server
    if (input.sprinting && Math.hypot(p.vx, p.vz) > 1.5) {
      p.vitals.stamina = Math.max(0, p.vitals.stamina - 0.55);
      p.vitals.hunger = Math.max(0, p.vitals.hunger - 0.015);
      p.vitals.thirst = Math.max(0, p.vitals.thirst - 0.022);
    }
    if (input.swimming) {
      p.status.wet = true;
      p.vitals.stamina = Math.max(0, p.vitals.stamina - 0.35);
    }
  }

  handleEquip(socketId: string, slotIndex: number): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv) return;
    if (slotIndex < 0 || slotIndex >= HOTBAR_SIZE) return;
    p.equippedSlot = slotIndex;
    p.equippedItemId = priv.inventory[slotIndex]?.itemId ?? null;
  }

  handleDodge(socketId: string, dir: { x: number; z: number }): void {
    const p = this.players.get(socketId);
    if (!p || !p.alive) return;
    const now = Date.now();
    if (now - (this.lastDodgeTime.get(socketId) ?? 0) < 900) return;
    if (p.vitals.stamina < 18) return;

    this.lastDodgeTime.set(socketId, now);
    p.vitals.stamina -= 18;
    p.anim = 'dodge';
    const len = Math.hypot(dir.x, dir.z) || 1;
    const nx = clamp(p.x + (dir.x / len) * 3.4, -212, 212);
    const nz = clamp(p.z + (dir.z / len) * 3.4, -212, 212);
    p.x = nx;
    p.z = nz;
    p.y = this.getSupportHeight(nx, nz);
  }

  handlePrimaryAction(socketId: string, payload: PrimaryActionPayload): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;

    const now = Date.now();
    const slot = priv.inventory[p.equippedSlot];
    const item = getItem(slot?.itemId);
    const cooldownMs = ((item?.attackCooldown ?? 0.5) * 1000) * 0.85;
    if (now - (this.lastActionTime.get(socketId) ?? 0) < cooldownMs) return;
    this.lastActionTime.set(socketId, now);

    if (p.vitals.stamina < 6) {
      this.notify(socketId, 'Out of stamina!', 'warn');
      return;
    }
    p.vitals.stamina = Math.max(0, p.vitals.stamina - 7);
    p.swingTime = 0.38;

    // 1. Ranged Bow Shot
    if (item?.isRanged) {
      const ammoId = item.ammoItemId || 'flint_arrow';
      if (!consumeIngredients(priv.inventory, [{ itemId: ammoId, count: 1 }])) {
        this.notify(socketId, 'Out of Flint Arrows! Craft more at a Workbench.', 'warn');
        return;
      }
      const charge = clamp(payload.charge ?? 0.85, 0.3, 1.0);
      const speed = 26 + charge * 22;
      const len = Math.hypot(payload.dirX, payload.dirY, payload.dirZ) || 1;
      const dx = payload.dirX / len;
      const dy = payload.dirY / len;
      const dz = payload.dirZ / len;
      const projId = `proj_${this.nextEntitySeq++}`;
      this.projectiles.set(projId, {
        id: projId,
        ownerId: socketId,
        kind: item.id === 'starlight_bow' ? 'starlight_bolt' : 'arrow',
        x: p.x + dx * 0.9,
        y: p.y + 1.55 + dy * 0.5,
        z: p.z + dz * 0.9,
        vx: dx * speed,
        vy: dy * speed + 2.4,
        vz: dz * speed,
        damage: Math.round((item.damage ?? 34) * (0.65 + charge * 0.55)),
        bornAt: now,
      });
      this.damageToolDurability(p, priv, 1);
      this.sendPrivateState(socketId);
      return;
    }

    // 2. Builder Hammer repairs damaged structures
    if (item?.toolKind === 'hammer' && payload.targetStructureId) {
      const st = this.structures.get(payload.targetStructureId);
      if (st && Math.hypot(st.x - p.x, st.z - p.z) < 5.2 && st.hp < st.maxHp) {
        st.hp = Math.min(st.maxHp, st.hp + 45);
        this.io.to(this.id).emit('structure:update', st);
        this.emitCombatText(st.x, st.y + 1.5, st.z, '+45 Repaired', '#4ade80', 'heal');
        this.io.to(this.id).emit('fx:event', { kind: 'build', x: st.x, y: st.y + 1, z: st.z });
        return;
      }
    }

    const reach = (item?.range ?? 2.9) + 1.1;
    const weaponDmg = item?.damage ?? 10;

    // 3. Melee hit on Wildlife
    let hitWildlife: WildlifeState | undefined;
    if (payload.targetWildlifeId) {
      const w = this.wildlife.getAgent(payload.targetWildlifeId);
      if (w && Math.hypot(w.x - p.x, w.z - p.z) <= reach + 1.3) {
        hitWildlife = w;
      }
    }
    if (!hitWildlife) {
      // Cone fallback check
      let bestD = reach + 0.9;
      for (const w of this.wildlife.getSnapshots()) {
        const dx = w.x - p.x;
        const dz = w.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d < bestD) {
          const dot = (dx * payload.dirX + dz * payload.dirZ) / (d || 1);
          if (dot > 0.45) {
            bestD = d;
            hitWildlife = w;
          }
        }
      }
    }
    if (hitWildlife) {
      const isCrit = Math.random() < 0.18;
      const dmg = Math.round(weaponDmg * (isCrit ? 1.55 : 1.0));
      this.applyWildlifeDamage(hitWildlife.id, dmg, socketId, p.x, p.z, isCrit);
      this.damageToolDurability(p, priv, 1);
      return;
    }

    // 4. Optional PvP Melee Hit (only when both players enabled PvP)
    if (p.pvpEnabled && payload.targetPlayerId) {
      const target = this.players.get(payload.targetPlayerId);
      if (
        target &&
        target.id !== p.id &&
        target.alive &&
        target.pvpEnabled &&
        Math.hypot(target.x - p.x, target.z - p.z) <= reach + 0.8
      ) {
        this.applyPlayerDamage(target.id, weaponDmg, p.name, p.x, p.z);
        this.damageToolDurability(p, priv, 1);
        return;
      }
    }

    // 5. Resource Node Harvesting
    let node: ResourceNodeState | undefined;
    if (payload.targetNodeId) {
      const n = this.nodes.get(payload.targetNodeId);
      if (n && !n.depleted && Math.hypot(n.x - p.x, n.z - p.z) <= reach + 1.6) {
        node = n;
      }
    }
    if (!node) {
      let bestD = reach + 1.4;
      for (const n of this.nodes.values()) {
        if (n.depleted) continue;
        const dx = n.x - p.x;
        const dz = n.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d < bestD) {
          const dot = (dx * payload.dirX + dz * payload.dirZ) / (d || 1);
          if (dot > 0.5) {
            bestD = d;
            node = n;
          }
        }
      }
    }
    if (node) {
      this.hitResourceNode(p, priv, node);
    }
  }

  private hitResourceNode(
    p: PlayerState,
    priv: LocalPlayerPrivateState | null,
    node: ResourceNodeState
  ): void {
    const bp = RESOURCE_NODE_BLUEPRINTS[node.kind];
    const item = getItem(p.equippedItemId);
    const toolTier = item?.tier ?? 0;

    if (toolTier < bp.minToolTier) {
      if (!p.isBot) {
        const needed = bp.minToolTier === 1 ? 'Stone Pickaxe' : 'Forged Iron Pickaxe';
        this.notify(p.id, `Requires a ${needed} to mine this deposit!`, 'warn');
      }
      this.io.to(this.id).emit('fx:event', { kind: 'mine', x: node.x, y: node.y + 1, z: node.z });
      return;
    }

    let power = item?.gatherPower ?? 14;
    if (bp.preferredTool === 'hand') {
      power = 26;
    } else if (item?.toolKind === bp.preferredTool) {
      power = Math.round(power * 1.25);
    } else {
      power = Math.max(8, Math.round(power * 0.55));
    }

    node.hp = Math.max(0, node.hp - power);
    const isTree = node.kind.endsWith('tree') || node.kind === 'driftwood' || node.kind === 'supply_crate';
    this.io.to(this.id).emit('fx:event', {
      kind: isTree ? 'chop' : 'mine',
      x: node.x,
      y: node.y + 1.1,
      z: node.z,
    });
    this.emitCombatText(node.x, node.y + 1.8, node.z, `-${power}`, '#f8fafc', 'damage');

    if (priv) {
      this.damageToolDurability(p, priv, 1);
    }

    if (node.hp <= 0) {
      node.depleted = true;
      node.respawnAt = Date.now() + bp.respawnSec * 1000;
      const dx = node.x - p.x;
      const dz = node.z - p.z;
      const len = Math.hypot(dx, dz) || 1;

      if (node.kind.endsWith('tree')) {
        this.io.to(this.id).emit('node:fell', { id: node.id, dirX: dx / len, dirZ: dz / len });
      }
      this.io.to(this.id).emit('node:update', node);

      // Grant drops directly into inventory (or spawn world loot if full)
      const gained: string[] = [];
      for (const d of bp.drops) {
        if (d.chance !== undefined && Math.random() > d.chance) continue;
        const amt = d.min + Math.floor(Math.random() * (d.max - d.min + 1));
        if (priv) {
          const leftover = addItemToSlots(priv.inventory, d.itemId, amt);
          if (leftover > 0) {
            this.spawnLoot(d.itemId, leftover, node.x, node.y + 0.5, node.z);
          }
          gained.push(`+${amt} ${ITEMS[d.itemId]?.name ?? d.itemId}`);
        } else {
          // Bot drops wood nearby occasionally for teammates!
          if (Math.random() < 0.35) {
            this.spawnLoot(d.itemId, Math.max(1, Math.floor(amt / 2)), node.x, node.y + 0.5, node.z);
          }
        }
      }

      if (priv) {
        priv.objectives.gather_resources = true;
        this.grantXp(p, 12);
        if (gained.length > 0) {
          this.emitCombatText(node.x, node.y + 2.3, node.z, gained[0], '#86efac', 'gather');
        }
        this.sendPrivateState(p.id);
      }
    } else {
      this.io.to(this.id).emit('node:update', node);
    }
  }

  private damageToolDurability(p: PlayerState, priv: LocalPlayerPrivateState, amount: number): void {
    const slot = priv.inventory[p.equippedSlot];
    if (!slot || slot.durability === undefined) return;
    slot.durability -= amount;
    if (slot.durability <= 0) {
      const brokenName = ITEMS[slot.itemId]?.name ?? 'Tool';
      priv.inventory[p.equippedSlot] = null;
      p.equippedItemId = null;
      this.notify(p.id, `${brokenName} broke!`, 'warn');
    }
    this.sendPrivateState(p.id);
  }

  handleInteract(
    socketId: string,
    payload: { structureId?: string; lootId?: string; drinkWater?: boolean }
  ): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;

    // 1. Drink freshwater from Crystal Spring
    if (payload.drinkWater && this.world.isNearFreshWater(p.x, p.z)) {
      p.vitals.thirst = Math.min(100, p.vitals.thirst + 45);
      this.io.to(this.id).emit('fx:event', { kind: 'drink', x: p.x, y: p.y + 1.2, z: p.z });
      this.notify(socketId, 'Drank cool fresh spring water (+45 Thirst)', 'good');
      return;
    }

    // 2. Pickup world loot
    if (payload.lootId) {
      const drop = this.loot.get(payload.lootId);
      if (drop && Math.hypot(drop.x - p.x, drop.z - p.z) < 4.5) {
        const leftover = addItemToSlots(priv.inventory, drop.itemId, drop.count);
        if (leftover === 0) {
          this.loot.delete(drop.id);
          this.io.to(this.id).emit('loot:remove', drop.id);
          this.notify(socketId, `Picked up ${drop.count}× ${ITEMS[drop.itemId]?.name ?? drop.itemId}`, 'good');
        } else {
          drop.count = leftover;
          this.notify(socketId, 'Inventory full!', 'warn');
        }
        this.sendPrivateState(socketId);
        return;
      }
    }

    // 3. Interact with structure
    if (payload.structureId) {
      const st = this.structures.get(payload.structureId);
      if (!st || Math.hypot(st.x - p.x, st.z - p.z) > 5.2) return;

      if (st.kind === 'wood_doorway') {
        st.isOpen = !st.isOpen;
        this.io.to(this.id).emit('structure:update', st);
      } else if (st.kind === 'bedroll') {
        p.bedPos = { x: st.x, y: st.y + 0.3, z: st.z };
        this.notify(socketId, 'Respawn point bound to Camp Bedroll!', 'good');
      } else if (st.kind === 'planter_box') {
        if ((st.cropProgress ?? 0) >= 100) {
          st.cropProgress = 0;
          addItemToSlots(priv.inventory, 'berries', 4);
          addItemToSlots(priv.inventory, 'sunbloom', 2);
          this.io.to(this.id).emit('structure:update', st);
          this.io.to(this.id).emit('fx:event', { kind: 'build', x: st.x, y: st.y + 0.8, z: st.z });
          this.notify(socketId, 'Harvested +4 Sunberries & +2 Sunblooms!', 'good');
          this.sendPrivateState(socketId);
        } else {
          this.notify(socketId, `Crops growing (${Math.round(st.cropProgress ?? 0)}%)...`, 'info');
        }
      } else if (st.kind === 'campfire') {
        if (consumeIngredients(priv.inventory, [{ itemId: 'wood', count: 2 }])) {
          st.lit = true;
          st.fuel = Math.min(100, (st.fuel ?? 0) + 45);
          this.io.to(this.id).emit('structure:update', st);
          this.sendPrivateState(socketId);
          this.notify(socketId, 'Stoked the campfire with 2 Timber Wood.', 'good');
        } else if (!st.lit && (st.fuel ?? 0) > 0) {
          st.lit = true;
          this.io.to(this.id).emit('structure:update', st);
          this.notify(socketId, 'Relit the campfire!', 'good');
        } else {
          this.notify(socketId, 'Open Crafting [C] near a lit campfire to cook meat & stew!', 'info');
        }
      } else if (st.kind === 'rain_collector') {
        if ((st.waterLevel ?? 0) >= 20) {
          const drink = Math.min(45, st.waterLevel ?? 0);
          st.waterLevel = Math.max(0, (st.waterLevel ?? 0) - drink);
          p.vitals.thirst = Math.min(100, p.vitals.thirst + drink);
          this.io.to(this.id).emit('structure:update', st);
          this.io.to(this.id).emit('fx:event', { kind: 'drink', x: p.x, y: p.y + 1.2, z: p.z });
          this.notify(socketId, `Drank purified rainwater (+${Math.round(drink)} Thirst)`, 'good');
        } else {
          this.notify(socketId, 'Rain Collector is still gathering dew...', 'info');
        }
      }
    }
  }

  handleConsume(socketId: string, slotIndex: number): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;
    const slot = priv.inventory[slotIndex];
    if (!slot) return;
    const def = getItem(slot.itemId);
    if (!def || def.category !== 'consumable') return;

    slot.count -= 1;
    if (slot.count <= 0) {
      priv.inventory[slotIndex] = null;
      if (p.equippedSlot === slotIndex) p.equippedItemId = null;
    }

    if (def.heal) {
      p.vitals.hp = clamp(p.vitals.hp + def.heal, 1, p.vitals.maxHp);
      this.emitCombatText(
        p.x,
        p.y + 2.1,
        p.z,
        def.heal > 0 ? `+${def.heal} HP` : `${def.heal} HP`,
        def.heal > 0 ? '#4ade80' : '#f87171',
        'heal'
      );
    }
    if (def.hungerRestore) p.vitals.hunger = clamp(p.vitals.hunger + def.hungerRestore, 0, 100);
    if (def.thirstRestore) p.vitals.thirst = clamp(p.vitals.thirst + def.thirstRestore, 0, 100);
    if (def.warmthRestore) p.vitals.warmth = clamp(p.vitals.warmth + def.warmthRestore, 0, 100);

    this.io.to(this.id).emit('fx:event', { kind: 'eat', x: p.x, y: p.y + 1.3, z: p.z });
    this.sendPrivateState(socketId);
  }

  handleEquipArmor(socketId: string, slotIndex: number): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv) return;
    const slot = priv.inventory[slotIndex];
    if (!slot) return;
    const def = getItem(slot.itemId);
    if (!def || def.category !== 'armor') return;

    const prevArmor = priv.armorSlot;
    priv.armorSlot = slot;
    priv.inventory[slotIndex] = prevArmor;
    p.armorItemId = slot.itemId;
    p.armorRating = def.armorRating ?? 0;
    if (p.equippedSlot === slotIndex) {
      p.equippedItemId = priv.inventory[slotIndex]?.itemId ?? null;
    }
    this.notify(socketId, `Equipped ${def.name} (${p.armorRating}% Defense)`, 'good');
    this.sendPrivateState(socketId);
  }

  handleSwapSlots(socketId: string, from: number, to: number): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv) return;
    if (swapSlots(priv.inventory, from, to)) {
      p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
      this.sendPrivateState(socketId);
    }
  }

  handleDropSlot(socketId: string, slotIndex: number, count?: number): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;
    const slot = priv.inventory[slotIndex];
    if (!slot) return;
    const dropCount = Math.min(slot.count, count ?? slot.count);
    slot.count -= dropCount;
    if (slot.count <= 0) {
      priv.inventory[slotIndex] = null;
      if (p.equippedSlot === slotIndex) p.equippedItemId = null;
    }
    const fx = p.x + Math.sin(p.yaw) * 1.4;
    const fz = p.z + Math.cos(p.yaw) * 1.4;
    this.spawnLoot(slot.itemId, dropCount, fx, this.world.getHeight(fx, fz) + 0.35, fz);
    this.sendPrivateState(socketId);
  }

  handleCraft(socketId: string, recipeId: string): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;

    const recipe = getRecipe(recipeId);
    if (!recipe) return;

    // Station proximity checks
    if (recipe.station === 'campfire' && !p.status.nearCampfire) {
      this.notify(socketId, 'Stand near a lit Campfire to cook!', 'warn');
      return;
    }
    if (recipe.station === 'workbench' && !p.status.nearWorkbench) {
      this.notify(socketId, 'Requires a nearby Workbench!', 'warn');
      return;
    }
    if (recipe.station === 'furnace' && !p.status.nearFurnace) {
      this.notify(socketId, 'Requires a nearby Stone Furnace!', 'warn');
      return;
    }
    if (recipe.station === 'runic_forge' && !p.status.nearRunicForge) {
      this.notify(socketId, 'Requires a nearby Runic Forge!', 'warn');
      return;
    }
    if (recipe.station === 'cauldron' && !p.status.nearCauldron) {
      this.notify(socketId, 'Stand near an Alchemy Cauldron to brew!', 'warn');
      return;
    }

    if (!consumeIngredients(priv.inventory, recipe.ingredients)) {
      this.notify(socketId, 'Missing crafting materials!', 'warn');
      return;
    }

    const leftover = addItemToSlots(priv.inventory, recipe.outputItemId, recipe.outputCount);
    if (leftover > 0) {
      this.spawnLoot(recipe.outputItemId, leftover, p.x, p.y + 0.4, p.z);
    }

    const outItem = ITEMS[recipe.outputItemId];
    p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
    this.grantXp(p, recipe.xpReward);

    if (outItem?.category === 'tool' || outItem?.category === 'weapon') {
      priv.objectives.craft_tool = true;
    }
    if (recipe.station === 'campfire') {
      priv.objectives.cook_food = true;
    }
    if (recipe.outputItemId === 'iron_ingot' || recipe.outputItemId === 'copper_ingot') {
      priv.objectives.smelt_iron = true;
    }

    this.io.to(this.id).emit('fx:event', { kind: 'build', x: p.x, y: p.y + 1.2, z: p.z });
    this.notify(socketId, `Crafted ${recipe.outputCount}× ${outItem?.name ?? recipe.outputItemId}!`, 'good');
    this.sendPrivateState(socketId);
  }

  handleBuild(socketId: string, payload: BuildPlacePayload): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;

    const def = STRUCTURES[payload.kind];
    if (!def) return;
    if (Math.hypot(payload.x - p.x, payload.z - p.z) > 12) {
      this.notify(socketId, 'Too far away to build there.', 'warn');
      return;
    }

    const groundH = this.world.getHeight(payload.x, payload.z);
    if (payload.kind === 'dock_pier') {
      if (groundH < -4.2) {
        this.notify(socketId, 'Dock Piers must be placed in coastal shallows (not abyssal sea).', 'warn');
        return;
      }
    } else if (groundH < WATER_LEVEL - 0.15) {
      this.notify(socketId, 'Cannot build in deep ocean water.', 'warn');
      return;
    }

    if (def.requiresWorkbench && !p.status.nearWorkbench) {
      this.notify(socketId, `${def.name} requires a nearby Workbench!`, 'warn');
      return;
    }

    // Check if placed via kit item in inventory or raw building materials
    let usedKit = false;
    if (payload.fromItemSlot !== undefined) {
      const slot = priv.inventory[payload.fromItemSlot];
      const itemDef = getItem(slot?.itemId);
      if (slot && itemDef?.structureKind === payload.kind) {
        slot.count -= 1;
        if (slot.count <= 0) {
          priv.inventory[payload.fromItemSlot] = null;
          if (p.equippedSlot === payload.fromItemSlot) p.equippedItemId = null;
        }
        usedKit = true;
      }
    }

    if (!usedKit) {
      if (!consumeIngredients(priv.inventory, def.costs)) {
        this.notify(socketId, `Not enough materials for ${def.name}.`, 'warn');
        return;
      }
    }

    const snapped = computeSnappedPlacement(
      payload.kind,
      { x: payload.x, y: payload.y, z: payload.z },
      payload.rotY,
      Array.from(this.structures.values()),
      (x, z) => this.world.getHeight(x, z)
    );

    const st: StructureState = {
      id: `st_${this.nextEntitySeq++}_${Date.now().toString(36)}`,
      kind: payload.kind,
      ownerId: socketId,
      ownerName: p.name,
      x: snapped.x,
      y: snapped.y,
      z: snapped.z,
      rotY: snapped.rotY,
      hp: def.maxHp,
      maxHp: def.maxHp,
      isOpen: payload.kind === 'wood_doorway' ? false : undefined,
      lit:
        payload.kind === 'campfire' ||
        payload.kind === 'furnace' ||
        payload.kind === 'lantern_post' ||
        payload.kind === 'watchtower_beacon' ||
        payload.kind === 'lighthouse_beacon' ||
        payload.kind === 'tiki_brazier' ||
        payload.kind === 'alchemy_cauldron'
          ? true
          : undefined,
      fuel: payload.kind === 'campfire' ? 80 : undefined,
      waterLevel: payload.kind === 'rain_collector' ? 25 : undefined,
      cropProgress: payload.kind === 'planter_box' ? 35 : undefined,
      chestSlots: payload.kind === 'storage_chest' ? createEmptyInventory(CHEST_SIZE) : undefined,
    };

    this.structures.set(st.id, st);
    priv.objectives.build_shelter = true;
    this.grantXp(p, 18);

    if (st.kind === 'bedroll') {
      p.bedPos = { x: st.x, y: st.y + 0.3, z: st.z };
    }

    this.io.to(this.id).emit('structure:add', st);
    this.io.to(this.id).emit('fx:event', { kind: 'build', x: st.x, y: st.y + 0.8, z: st.z });
    this.notify(socketId, `Built ${def.name}!`, 'good');
    this.sendPrivateState(socketId);
    this.saveToDisk();
  }

  handleBuildBoat(socketId: string, payload: BoatBuildPayload): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;
    const def = BOATS[payload.kind];
    if (!def) return;
    if (Math.hypot(payload.x - p.x, payload.z - p.z) > 16) {
      this.notify(socketId, 'Move closer to the shoreline to launch a vessel!', 'warn');
      return;
    }
    const groundH = this.world.getHeight(payload.x, payload.z);
    if (groundH > WATER_LEVEL - 0.25) {
      this.notify(socketId, 'Boats must be launched directly onto coastal water!', 'warn');
      return;
    }
    if (def.requiresWorkbench && !p.status.nearWorkbench) {
      this.notify(socketId, `${def.name} requires a nearby Workbench!`, 'warn');
      return;
    }
    if (!consumeIngredients(priv.inventory, def.costs)) {
      this.notify(socketId, `Not enough materials to build ${def.name}.`, 'warn');
      return;
    }

    const boat: BoatState = {
      id: `boat_${this.nextEntitySeq++}_${Date.now().toString(36)}`,
      kind: payload.kind,
      ownerId: socketId,
      ownerName: p.name,
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
      chestSlots: def.cargoSlots > 0 ? createEmptyInventory(def.cargoSlots) : undefined,
    };
    this.boats.set(boat.id, boat);
    this.grantXp(p, payload.kind === 'longship' ? 95 : payload.kind === 'skiff' ? 55 : 28);
    this.io.to(this.id).emit('boat:add', boat);
    this.io.to(this.id).emit('fx:event', { kind: 'build', x: boat.x, y: WATER_LEVEL + 0.8, z: boat.z });
    this.notify(socketId, `Launched ${def.name}! Approach and press [E] to sail!`, 'good');
    this.sendPrivateState(socketId);
    this.saveToDisk();
  }

  handleBoardBoat(socketId: string, boatId: string | null): void {
    const p = this.players.get(socketId);
    if (!p || !p.alive) return;

    // Disembark current boat
    if (p.boatId) {
      const current = this.boats.get(p.boatId);
      if (current && current.pilotId === socketId) {
        current.pilotId = null;
        current.throttle = 0;
        this.boatSteerInputs.delete(current.id);
        // Place player smoothly beside the boat
        const sideX = Math.cos(current.yaw) * 1.9;
        const sideZ = -Math.sin(current.yaw) * 1.9;
        p.x = clamp(current.x + sideX, -212, 212);
        p.z = clamp(current.z + sideZ, -212, 212);
        p.y = Math.max(WATER_LEVEL + 0.25, this.world.getHeight(p.x, p.z) + 0.15);
      }
      p.boatId = null;
      this.notify(socketId, 'Stepped off the helm.', 'info');
      return;
    }

    if (!boatId) return;
    const boat = this.boats.get(boatId);
    if (!boat) return;
    if (Math.hypot(boat.x - p.x, boat.z - p.z) > 7.5) {
      this.notify(socketId, 'Swim or walk closer to board this vessel.', 'warn');
      return;
    }
    if (boat.pilotId && boat.pilotId !== socketId) {
      this.notify(socketId, 'Another survivor is already at the helm!', 'warn');
      return;
    }

    boat.pilotId = socketId;
    p.boatId = boat.id;
    p.anim = 'idle';
    this.notify(socketId, `Took the helm of ${BOATS[boat.kind].name}! [W/S] Sails • [A/D] Steer • [E] Disembark`, 'good');
  }

  handleBoatControl(socketId: string, payload: BoatControlPayload): void {
    const p = this.players.get(socketId);
    if (!p || !p.boatId) return;
    const boat = this.boats.get(p.boatId);
    if (!boat || boat.pilotId !== socketId) return;

    if (typeof payload.throttle === 'number') {
      boat.throttle = clamp(Math.round(payload.throttle), -1, 3);
    } else if (typeof payload.throttleDelta === 'number' && payload.throttleDelta !== 0) {
      boat.throttle = clamp(boat.throttle + Math.sign(payload.throttleDelta), -1, 3);
    }
    this.boatSteerInputs.set(boat.id, clamp(payload.steer, -1, 1));
  }

  handleBoatChestTransfer(socketId: string, payload: BoatChestTransferPayload): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;
    const boat = this.boats.get(payload.boatId);
    if (!boat || !boat.chestSlots) return;
    if (Math.hypot(boat.x - p.x, boat.z - p.z) > 7.5) return;

    if (payload.from === 'inventory') {
      const slot = priv.inventory[payload.fromIndex];
      if (!slot) return;
      const leftover = addItemToSlots(boat.chestSlots, slot.itemId, slot.count);
      if (leftover === 0) priv.inventory[payload.fromIndex] = null;
      else slot.count = leftover;
    } else {
      const slot = boat.chestSlots[payload.fromIndex];
      if (!slot) return;
      const leftover = addItemToSlots(priv.inventory, slot.itemId, slot.count);
      if (leftover === 0) boat.chestSlots[payload.fromIndex] = null;
      else slot.count = leftover;
    }
    p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
    this.io.to(this.id).emit('boat:update', boat);
    this.sendPrivateState(socketId);
    this.saveToDisk();
  }

  handleFishCatch(socketId: string, payload: { deepWater: boolean }): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || !p.alive) return;

    const r = Math.random();
    let itemId = 'raw_fish';
    let count = 1;
    let xp = 18;
    if (payload.deepWater) {
      if (r < 0.14) {
        itemId = 'sea_pearl';
        xp = 42;
      } else if (r < 0.24) {
        itemId = 'gold_coin';
        count = 2 + Math.floor(Math.random() * 3);
        xp = 36;
      } else if (r < 0.68) {
        itemId = 'golden_snapper';
        xp = 30;
      }
    } else {
      if (r < 0.08) {
        itemId = 'sea_pearl';
        xp = 34;
      } else if (r < 0.32) {
        itemId = 'golden_snapper';
        xp = 24;
      }
    }

    const leftover = addItemToSlots(priv.inventory, itemId, count);
    if (leftover > 0) this.spawnLoot(itemId, leftover, p.x, p.y + 0.5, p.z);
    const itemName = ITEMS[itemId]?.name ?? itemId;
    this.grantXp(p, xp);
    this.emitCombatText(p.x, p.y + 2.2, p.z, `Caught ${count}× ${itemName}!`, '#38bdf8', 'gather');
    this.notify(socketId, `Reeled in ${count}× ${itemName}!`, 'good');
    this.sendPrivateState(socketId);
  }

  handleDemolish(socketId: string, structureId: string): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    const st = this.structures.get(structureId);
    if (!p || !priv || !st) return;
    if (st.ownerId === 'world') {
      this.notify(socketId, 'Sanctuary relics cannot be demolished.', 'warn');
      return;
    }
    if (Math.hypot(st.x - p.x, st.z - p.z) > 8) return;

    const def = STRUCTURES[st.kind];
    // Refund 50% of materials
    for (const c of def.costs) {
      const refund = Math.max(1, Math.floor(c.count * 0.5));
      addItemToSlots(priv.inventory, c.itemId, refund);
    }
    this.structures.delete(structureId);
    this.io.to(this.id).emit('structure:remove', structureId);
    this.sendPrivateState(socketId);
    this.notify(socketId, `Dismantled ${def.name} (50% materials refunded).`, 'info');
    this.saveToDisk();
  }

  handleChestTransfer(socketId: string, payload: ChestTransferPayload): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    const st = this.structures.get(payload.structureId);
    if (!p || !priv || !st || !st.chestSlots) return;
    if (Math.hypot(st.x - p.x, st.z - p.z) > 6) return;

    if (payload.from === 'inventory') {
      const slot = priv.inventory[payload.fromIndex];
      if (!slot) return;
      const leftover = addItemToSlots(st.chestSlots, slot.itemId, slot.count, slot.durability);
      if (leftover === 0) {
        priv.inventory[payload.fromIndex] = null;
      } else {
        slot.count = leftover;
      }
    } else {
      const slot = st.chestSlots[payload.fromIndex];
      if (!slot) return;
      const leftover = addItemToSlots(priv.inventory, slot.itemId, slot.count, slot.durability);
      if (leftover === 0) {
        st.chestSlots[payload.fromIndex] = null;
      } else {
        slot.count = leftover;
      }
    }

    p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
    this.io.to(this.id).emit('structure:update', st);
    this.sendPrivateState(socketId);
  }

  handleRespawn(socketId: string): void {
    const p = this.players.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (!p || !priv || p.alive) return;

    const target = p.bedPos ?? this.world.getSpawnPoint();
    p.x = target.x + (Math.random() - 0.5) * 1.6;
    p.z = target.z + (Math.random() - 0.5) * 1.6;
    p.y = this.getSupportHeight(p.x, p.z);
    p.alive = true;
    p.anim = 'idle';
    p.vitals = {
      hp: p.vitals.maxHp,
      maxHp: p.vitals.maxHp,
      stamina: p.vitals.maxStamina,
      maxStamina: p.vitals.maxStamina,
      hunger: 75,
      thirst: 75,
      warmth: 56,
    };

    // Keep starter tools if inventory was emptied
    if (!hasIngredients(priv.inventory, [{ itemId: 'stone_axe', count: 1 }])) {
      addItemToSlots(priv.inventory, 'stone_axe', 1);
    }
    p.equippedItemId = priv.inventory[p.equippedSlot]?.itemId ?? null;
    this.sendPrivateState(socketId);
    this.notify(socketId, 'You awaken refreshed at camp.', 'info');
  }

  handleTogglePvp(socketId: string): void {
    const p = this.players.get(socketId);
    if (!p) return;
    p.pvpEnabled = !p.pvpEnabled;
    this.notify(
      socketId,
      p.pvpEnabled
        ? 'PvP Mode ENABLED — You can now duel other PvP-flagged survivors.'
        : 'PvP Mode DISABLED — Cooperative survival mode active.',
      p.pvpEnabled ? 'warn' : 'good'
    );
  }

  handleEmote(socketId: string, emote: string): void {
    const p = this.players.get(socketId);
    if (!p || !p.alive) return;
    const allowed: Record<string, string> = {
      wave: '👋 Waves hello!',
      cheer: '🔥 Raises a rallying cheer!',
      help: '⚠️ Calls for backup!',
      camp: '⛺ Signals to regroup at camp!',
    };
    const label = allowed[emote];
    if (!label) return;
    p.emote = emote;
    p.emoteUntil = Date.now() + 4000;
    this.broadcastChat({
      id: `chat_${this.nextEntitySeq++}`,
      senderId: p.id,
      senderName: p.name,
      text: label,
      kind: 'emote',
      timestamp: Date.now(),
    });
  }

  handleChat(socketId: string, rawText: string): void {
    const p = this.players.get(socketId);
    if (!p) return;
    const text = rawText.trim().slice(0, 180);
    if (!text) return;

    // Handy slash commands for quick multiplayer testing/fun
    if (text === '/time day') {
      this.time.timeOfDay = 0.36;
      this.addSystemMessage(`${p.name} invoked Dawn.`);
      return;
    }
    if (text === '/time dusk') {
      this.time.timeOfDay = 0.74;
      this.addSystemMessage(`${p.name} hastened Nightfall.`);
      return;
    }
    if (text === '/weather rain') {
      this.time.weather = 'storm';
      this.time.weatherIntensity = 0.9;
      this.addSystemMessage(`${p.name} summoned an island storm!`);
      return;
    }
    if (text === '/weather clear') {
      this.time.weather = 'clear';
      this.time.weatherIntensity = 0;
      this.addSystemMessage(`${p.name} cleared the skies.`);
      return;
    }

    this.broadcastChat({
      id: `chat_${this.nextEntitySeq++}`,
      senderId: p.id,
      senderName: p.name,
      text,
      kind: 'chat',
      timestamp: Date.now(),
    });
  }

  private tick(dt: number, now: number): void {
    // 1. Advance Day/Night cycle
    const prevTod = this.time.timeOfDay;
    this.time.timeOfDay += dt / DAY_LENGTH_SECONDS;
    if (this.time.timeOfDay >= 1) {
      this.time.timeOfDay -= 1;
      this.time.day += 1;
      for (const p of this.players.values()) {
        if (p.alive) p.daysSurvived += 1;
      }
      this.addSystemMessage(`Day ${this.time.day} dawns across Wildreach.`);
    }

    const isNight = this.time.timeOfDay < 0.22 || this.time.timeOfDay > 0.79;
    if (isNight && !this.wasNight) {
      this.addSystemMessage('Night falls! Light campfires — Shadow Stalkers prowl the darkness.');
    } else if (!isNight && this.wasNight && prevTod < 0.25) {
      this.addSystemMessage('Sunlight breaks over the cliffs. The Shadow Stalkers retreat.');
    }
    this.wasNight = isNight;

    // 2. Dynamic weather simulation
    this.weatherTimer -= dt;
    if (this.weatherTimer <= 0) {
      this.weatherTimer = 65 + Math.random() * 85;
      const roll = Math.random();
      const next: WeatherType =
        roll < 0.45 ? 'clear' : roll < 0.68 ? 'breezy' : roll < 0.82 ? 'fog' : roll < 0.93 ? 'rain' : 'storm';
      this.time.weather = next;
      if (next === 'storm') {
        this.addSystemMessage('A coastal tempest rolls in! Seek shelter or firelight.');
      }
    }
    const targetInt =
      this.time.weather === 'storm'
        ? 1.0
        : this.time.weather === 'rain'
        ? 0.65
        : this.time.weather === 'fog'
        ? 0.55
        : this.time.weather === 'breezy'
        ? 0.25
        : 0;
    this.time.weatherIntensity += (targetInt - this.time.weatherIntensity) * Math.min(1, dt * 0.4);
    this.time.windSpeed =
      this.time.weather === 'storm' ? 2.4 : this.time.weather === 'breezy' ? 1.6 : 0.95;

    if (this.time.weather === 'storm') {
      this.thunderTimer -= dt;
      if (this.thunderTimer <= 0) {
        this.thunderTimer = 11 + Math.random() * 18;
        this.io.to(this.id).emit('fx:event', { kind: 'thunder', x: 0, y: 40, z: 0 });
      }
    }

    // 3. Structure upkeep (campfire fuel & rain collectors)
    const structureArr = Array.from(this.structures.values());
    for (const st of structureArr) {
      if (st.kind === 'campfire' && st.lit && st.ownerId !== 'world') {
        st.fuel = Math.max(0, (st.fuel ?? 0) - dt * 0.16);
        if (st.fuel <= 0) {
          st.lit = false;
          this.io.to(this.id).emit('structure:update', st);
        }
      }
      if (st.kind === 'rain_collector') {
        const rate = this.time.weather === 'rain' || this.time.weather === 'storm' ? 4.2 : 0.55;
        st.waterLevel = Math.min(100, (st.waterLevel ?? 0) + dt * rate);
      }
      if (st.kind === 'planter_box') {
        const prev = st.cropProgress ?? 0;
        const rate = this.time.weather === 'rain' ? 3.2 : 2.1;
        st.cropProgress = Math.min(100, prev + dt * rate);
        if (prev < 100 && st.cropProgress >= 100) {
          this.io.to(this.id).emit('structure:update', st);
        }
      }
    }

    // 3b. Simulate Boats (Authoritative Sailing, Wind Efficiency, Grounding & Ramming!)
    this.updateBoats(dt);

    // 4. Resource node regrowth
    for (const n of this.nodes.values()) {
      if (n.depleted && now >= n.respawnAt) {
        n.depleted = false;
        n.hp = n.maxHp;
        this.io.to(this.id).emit('node:update', n);
      }
    }

    // 5. Update Players (Vitals, Shelter, Warmth, Buffs)
    const playerArr = Array.from(this.players.values());
    for (const p of playerArr) {
      if (p.swingTime > 0) p.swingTime = Math.max(0, p.swingTime - dt);
      if (p.emote && now > p.emoteUntil) p.emote = null;
      if (!p.alive) continue;

      this.updatePlayerVitals(p, dt, isNight, structureArr);
    }

    // 6. Update Wildlife AI
    this.wildlife.update(dt, now, isNight, playerArr, structureArr, {
      onAttackPlayer: (playerId, damage, fromX, fromZ, kind) => {
        const label =
          kind === 'stalker'
            ? 'Shadow Stalker'
            : kind === 'wolf'
            ? 'Timber Wolf'
            : kind === 'crab'
            ? 'Giant Reef Crab'
            : kind === 'serpent'
            ? 'Ocean Sea Serpent'
            : kind === 'cinder_golem'
            ? 'Volcanic Cinder Golem'
            : 'Wild Boar';
        this.applyPlayerDamage(playerId, damage, label, fromX, fromZ);
      },
      onAttackStructure: (structureId, damage) => {
        const st = this.structures.get(structureId);
        if (!st || st.ownerId === 'world') return;
        st.hp = Math.max(0, st.hp - damage);
        if (st.hp <= 0) {
          this.structures.delete(structureId);
          this.io.to(this.id).emit('structure:remove', structureId);
        } else {
          this.io.to(this.id).emit('structure:update', st);
        }
      },
      onDie: (agent, killerId) => {
        const cfg = WILDLIFE_CONFIG[agent.kind];
        for (const d of cfg.drops) {
          if (d.chance !== undefined && Math.random() > d.chance) continue;
          const amt = d.min + Math.floor(Math.random() * (d.max - d.min + 1));
          this.spawnLoot(
            d.itemId,
            amt,
            agent.x + (Math.random() - 0.5) * 1.2,
            agent.y + 0.4,
            agent.z + (Math.random() - 0.5) * 1.2
          );
        }
        if (killerId) {
          const killer = this.players.get(killerId);
          const priv = this.privateStates.get(killerId);
          if (killer) {
            killer.kills += 1;
            this.grantXp(killer, cfg.xp);
          }
          if (priv) {
            priv.objectives.hunt_wildlife = true;
            this.sendPrivateState(killerId);
          }
        }
      },
    });

    // 7. Update AI Companion Bots
    const wildSnap = this.wildlife.getSnapshots();
    this.bots.update(
      dt,
      isNight,
      this.world,
      this.players,
      Array.from(this.nodes.values()),
      structureArr,
      wildSnap,
      {
        onHitNode: (botId, nodeId) => {
          const bot = this.players.get(botId);
          const node = this.nodes.get(nodeId);
          if (bot && node && !node.depleted) {
            this.hitResourceNode(bot, null, node);
          }
        },
        onHitWildlife: (botId, wildlifeId) => {
          const bot = this.players.get(botId);
          if (bot) {
            this.applyWildlifeDamage(wildlifeId, 22, bot.id, bot.x, bot.z, false);
          }
        },
        onBotChat: (botId, text) => {
          const bot = this.players.get(botId);
          if (!bot) return;
          this.broadcastChat({
            id: `chat_${this.nextEntitySeq++}`,
            senderId: bot.id,
            senderName: bot.name,
            text,
            kind: 'chat',
            timestamp: now,
          });
        },
      }
    );

    // 8. Simulate Projectiles (Arrows & Starlight Bolts)
    this.updateProjectiles(dt, now, wildSnap, playerArr);

    // 9. Broadcast world snapshot to all connected players
    if (this.sockets.size > 0) {
      this.io.to(this.id).emit('world:snapshot', {
        t: now,
        time: { ...this.time },
        players: Array.from(this.players.values()),
        boats: Array.from(this.boats.values()),
        wildlife: this.wildlife.getSnapshots(),
        projectiles: Array.from(this.projectiles.values()).map((pr) => ({
          id: pr.id,
          ownerId: pr.ownerId,
          kind: pr.kind,
          x: Math.round(pr.x * 100) / 100,
          y: Math.round(pr.y * 100) / 100,
          z: Math.round(pr.z * 100) / 100,
          vx: Math.round(pr.vx * 100) / 100,
          vy: Math.round(pr.vy * 100) / 100,
          vz: Math.round(pr.vz * 100) / 100,
          damage: pr.damage,
        })),
      });
    }

    // Periodic autosave
    this.saveTimer += dt;
    if (this.saveTimer >= 30) {
      this.saveTimer = 0;
      this.saveToDisk();
    }
  }

  private updatePlayerVitals(
    p: PlayerState,
    dt: number,
    isNight: boolean,
    structures: StructureState[]
  ): void {
    // Check nearby stations, shelter, warmth, freshwater
    let nearCampfire = false;
    let nearWorkbench = false;
    let nearFurnace = false;
    let nearRunicForge = false;
    let nearCauldron = false;
    let warmthBonus = 0;
    let roofCount = 0;
    let wallCount = 0;

    for (const s of structures) {
      const d = Math.hypot(s.x - p.x, s.z - p.z);
      if (s.kind === 'campfire' && s.lit && d < 9.5) {
        nearCampfire = true;
        warmthBonus = Math.max(warmthBonus, 34);
      } else if (s.kind === 'workbench' && d < 16) {
        nearWorkbench = true;
      } else if (s.kind === 'furnace' && d < 9.5) {
        nearFurnace = true;
        warmthBonus = Math.max(warmthBonus, 24);
      } else if (s.kind === 'runic_forge' && d < 9.5) {
        nearRunicForge = true;
        warmthBonus = Math.max(warmthBonus, 20);
      } else if (s.kind === 'alchemy_cauldron' && d < 8.5) {
        nearCauldron = true;
        warmthBonus = Math.max(warmthBonus, 16);
      } else if (s.kind === 'watchtower_beacon' && d < 18) {
        warmthBonus = Math.max(warmthBonus, 28);
      } else if (s.kind === 'lighthouse_beacon' && d < 14) {
        warmthBonus = Math.max(warmthBonus, 20);
      } else if (s.kind === 'tiki_brazier' && d < 10.5) {
        warmthBonus = Math.max(warmthBonus, 24);
      } else if (s.kind === 'lantern_post' && d < 6) {
        warmthBonus = Math.max(warmthBonus, 14);
      }

      if (s.kind === 'wood_roof' && d < 3.4) roofCount++;
      if ((s.kind === 'wood_wall' || s.kind === 'wood_doorway' || s.kind === 'stone_wall') && d < 4.5) {
        wallCount++;
      }
    }

    const sheltered = roofCount >= 1 && wallCount >= 2;
    const holdingTorch = p.equippedItemId === 'torch';
    if (holdingTorch) warmthBonus = Math.max(warmthBonus, 18);
    if (p.armorRating >= 25) warmthBonus += 10;

    const isRaining = this.time.weather === 'rain' || this.time.weather === 'storm';
    const wet = p.y < WATER_LEVEL - 0.1 || (isRaining && !sheltered);

    const ambientWarmth =
      (isNight ? 26 : 58) - (wet ? 18 : 0) - Math.max(0, p.y - 10) * 1.4 + warmthBonus + (sheltered ? 16 : 0);
    p.vitals.warmth += (clamp(ambientWarmth, 5, 95) - p.vitals.warmth) * Math.min(1, dt * 0.25);

    const chilled = p.vitals.warmth < 25;
    const warm = p.vitals.warmth >= 55 && (nearCampfire || sheltered || holdingTorch);
    const wellFed = p.vitals.hunger >= 60 && p.vitals.thirst >= 55;

    p.status = {
      sheltered,
      warm,
      wellFed,
      wet,
      chilled,
      nearCampfire,
      nearWorkbench,
      nearFurnace,
      nearRunicForge,
      nearCauldron,
      nearFreshWater: this.world.isNearFreshWater(p.x, p.z),
    };

    if (p.isBot) {
      p.vitals.hp = Math.min(p.vitals.maxHp, p.vitals.hp + dt * 2.0);
      return;
    }

    // Gentle hunger & thirst depletion (~16 mins to starve from full)
    p.vitals.hunger = Math.max(0, p.vitals.hunger - dt * 0.11);
    p.vitals.thirst = Math.max(0, p.vitals.thirst - dt * 0.14);

    // Stamina recovery
    const stamRate = wellFed ? 16 : 10;
    p.vitals.stamina = Math.min(p.vitals.maxStamina, p.vitals.stamina + dt * stamRate);

    // Health regeneration vs environmental damage
    if (wellFed && !chilled) {
      const regen = sheltered || warm ? 2.1 : 0.9;
      p.vitals.hp = Math.min(p.vitals.maxHp, p.vitals.hp + dt * regen);
    }
    if (p.vitals.hunger <= 0) {
      this.applyEnvironmentDamage(p, dt * 1.8, 'Starvation');
    }
    if (p.vitals.thirst <= 0) {
      this.applyEnvironmentDamage(p, dt * 2.2, 'Dehydration');
    }
    if (chilled) {
      this.applyEnvironmentDamage(p, dt * 1.4, 'Hypothermia');
    }
  }

  private updateBoats(dt: number): void {
    for (const b of this.boats.values()) {
      const def = BOATS[b.kind];
      const steer = b.pilotId ? this.boatSteerInputs.get(b.id) ?? 0 : 0;
      b.rudder += (steer - b.rudder) * Math.min(1, dt * 6);

      // Compute target speed based on sail gear + live wind efficiency
      let targetSpeed = 0;
      if (b.pilotId) {
        const windEff = computeWindSailEfficiency(b.yaw, this.time.windDirX, this.time.windDirZ);
        if (b.throttle === -1) targetSpeed = -def.reverseSpeed;
        else if (b.throttle === 1) targetSpeed = def.paddleSpeed;
        else if (b.throttle === 2) targetSpeed = def.halfSailSpeed * windEff;
        else if (b.throttle === 3) targetSpeed = def.fullSailSpeed * windEff;
      } else {
        b.throttle = 0;
      }

      const accel = b.pilotId ? 2.4 : 1.4;
      b.speed += (targetSpeed - b.speed) * Math.min(1, dt * accel);
      if (Math.abs(b.speed) < 0.04 && targetSpeed === 0) b.speed = 0;

      // Turn smoothly (even slowly at idle paddle so docking feels responsive)
      if (Math.abs(b.rudder) > 0.02) {
        const turnFactor = 0.55 + Math.min(1, Math.abs(b.speed) / 4.0) * 0.65;
        const dirSign = b.speed < -0.3 ? -1 : 1;
        b.yaw -= b.rudder * def.turnRate * turnFactor * dirSign * dt;
      }

      const fwdX = -Math.sin(b.yaw);
      const fwdZ = -Math.cos(b.yaw);
      const nx = clamp(b.x + fwdX * b.speed * dt, -208, 208);
      const nz = clamp(b.z + fwdZ * b.speed * dt, -208, 208);

      // Prevent boats from driving up onto dry land (check bow & center depth)
      const bowX = nx + fwdX * (def.length * 0.44);
      const bowZ = nz + fwdZ * (def.length * 0.44);
      const hCenter = this.world.getHeight(nx, nz);
      const hBow = this.world.getHeight(bowX, bowZ);
      if (hCenter < WATER_LEVEL - 0.3 && hBow < WATER_LEVEL - 0.15) {
        b.x = nx;
        b.z = nz;
        b.vx = fwdX * b.speed;
        b.vz = fwdZ * b.speed;
      } else {
        // Gentle beach bumper slowdown
        b.speed *= -0.18;
        b.vx = 0;
        b.vz = 0;
      }
      b.y = WATER_LEVEL;

      // Keep piloted player seated cleanly at the helm!
      if (b.pilotId) {
        const pilot = this.players.get(b.pilotId);
        if (pilot && pilot.alive) {
          pilot.x = b.x - fwdX * def.helmOffsetZ;
          pilot.z = b.z - fwdZ * def.helmOffsetZ;
          pilot.y = WATER_LEVEL + def.deckY;
          pilot.yaw = b.yaw;
          pilot.vx = b.vx;
          pilot.vz = b.vz;
          pilot.anim = 'idle';
          pilot.status.wet = false;
        } else {
          b.pilotId = null;
        }
      }

      // Ramming speed damage against Sea Serpents!
      if (Math.abs(b.speed) > 4.2 && b.pilotId) {
        for (const w of this.wildlife.getSnapshots()) {
          if (w.state === 'dead' || w.kind !== 'serpent') continue;
          if (Math.hypot(w.x - bowX, w.z - bowZ) < 2.8) {
            this.applyWildlifeDamage(w.id, def.ramDamage, b.pilotId, b.x, b.z, true);
            b.speed *= 0.65;
            break;
          }
        }
      }
    }
  }

  private applyEnvironmentDamage(p: PlayerState, amount: number, cause: string): void {
    p.vitals.hp = Math.max(0, p.vitals.hp - amount);
    if (p.vitals.hp <= 0 && p.alive) {
      this.killPlayer(p, cause);
    }
  }

  private applyPlayerDamage(
    playerId: string,
    rawDamage: number,
    attackerName: string,
    fromX: number,
    fromZ: number
  ): void {
    const p = this.players.get(playerId);
    if (!p || !p.alive) return;

    const mitigation = 1 - clamp(p.armorRating, 0, 75) / 100;
    const dmg = Math.max(2, Math.round(rawDamage * mitigation));
    p.vitals.hp = Math.max(0, p.vitals.hp - dmg);

    this.io.to(this.id).emit('fx:event', { kind: 'hit', x: p.x, y: p.y + 1.2, z: p.z, color: '#ef4444' });
    this.emitCombatText(p.x, p.y + 2.1, p.z, `-${dmg}`, '#f87171', 'damage');

    // Subtle knockback
    const dx = p.x - fromX;
    const dz = p.z - fromZ;
    const len = Math.hypot(dx, dz) || 1;
    p.x = clamp(p.x + (dx / len) * 0.65, -212, 212);
    p.z = clamp(p.z + (dz / len) * 0.65, -212, 212);

    if (p.vitals.hp <= 0) {
      this.killPlayer(p, attackerName);
    }
  }

  private killPlayer(p: PlayerState, cause: string): void {
    p.alive = false;
    p.anim = 'dead';
    p.respawnAt = Date.now() + 3000;
    this.addSystemMessage(`${p.name} fell to ${cause}.`);
    if (p.isBot) {
      setTimeout(() => {
        const b = this.players.get(p.id);
        if (b) {
          const sp = this.world.getSpawnPoint();
          b.x = sp.x;
          b.z = sp.z;
          b.y = sp.y;
          b.vitals.hp = b.vitals.maxHp;
          b.alive = true;
          b.anim = 'idle';
        }
      }, 15_000);
    }
  }

  private applyWildlifeDamage(
    wildlifeId: string,
    damage: number,
    attackerId: string | null,
    attackerX: number,
    attackerZ: number,
    isCrit: boolean
  ): void {
    const res = this.wildlife.damageAgent(wildlifeId, damage, attackerId, attackerX, attackerZ, Date.now(), {
      onAttackPlayer: () => {},
      onAttackStructure: () => {},
      onDie: (agent, killerId) => {
        const cfg = WILDLIFE_CONFIG[agent.kind];
        for (const d of cfg.drops) {
          if (d.chance !== undefined && Math.random() > d.chance) continue;
          const amt = d.min + Math.floor(Math.random() * (d.max - d.min + 1));
          this.spawnLoot(
            d.itemId,
            amt,
            agent.x + (Math.random() - 0.5) * 1.1,
            agent.y + 0.4,
            agent.z + (Math.random() - 0.5) * 1.1
          );
        }
        if (killerId) {
          const killer = this.players.get(killerId);
          const priv = this.privateStates.get(killerId);
          if (killer) {
            killer.kills += 1;
            this.grantXp(killer, cfg.xp);
          }
          if (priv) {
            priv.objectives.hunt_wildlife = true;
            this.sendPrivateState(killerId);
          }
        }
      },
    });
    if (res) {
      this.io.to(this.id).emit('fx:event', { kind: 'hit', x: res.x, y: res.y + 1.0, z: res.z });
      this.emitCombatText(
        res.x,
        res.y + 1.9,
        res.z,
        isCrit ? `CRIT -${damage}!` : `-${damage}`,
        isCrit ? '#fbbf24' : '#ffffff',
        isCrit ? 'crit' : 'damage'
      );
    }
  }

  private updateProjectiles(
    dt: number,
    now: number,
    wildSnap: WildlifeState[],
    players: PlayerState[]
  ): void {
    for (const [id, pr] of this.projectiles.entries()) {
      pr.vy -= 14.5 * dt; // Gravity arc
      pr.x += pr.vx * dt;
      pr.y += pr.vy * dt;
      pr.z += pr.vz * dt;

      if (now - pr.bornAt > 4500 || pr.y <= this.world.getHeight(pr.x, pr.z)) {
        this.projectiles.delete(id);
        continue;
      }

      // Check wildlife hits
      let hit = false;
      for (const w of wildSnap) {
        const d = Math.hypot(w.x - pr.x, w.z - pr.z);
        if (d < 1.25 && Math.abs(w.y + 1.0 - pr.y) < 1.35) {
          const isCrit = Math.abs(w.y + 1.4 - pr.y) < 0.45;
          const dmg = Math.round(pr.damage * (isCrit ? 1.45 : 1.0));
          this.applyWildlifeDamage(w.id, dmg, pr.ownerId, pr.x, pr.z, isCrit);
          this.io.to(this.id).emit('fx:event', { kind: 'arrow_hit', x: pr.x, y: pr.y, z: pr.z });
          this.projectiles.delete(id);
          hit = true;
          break;
        }
      }
      if (hit) continue;

      // Check PvP hits
      const owner = this.players.get(pr.ownerId);
      if (owner?.pvpEnabled) {
        for (const p of players) {
          if (p.id === pr.ownerId || !p.alive || !p.pvpEnabled) continue;
          const d = Math.hypot(p.x - pr.x, p.z - pr.z);
          if (d < 0.95 && Math.abs(p.y + 1.0 - pr.y) < 1.2) {
            this.applyPlayerDamage(p.id, pr.damage, owner.name, pr.x, pr.z);
            this.projectiles.delete(id);
            break;
          }
        }
      }
    }
  }

  private getSupportHeight(x: number, z: number): number {
    let h = this.world.getHeight(x, z);
    for (const s of this.structures.values()) {
      if (s.kind === 'wood_foundation') {
        if (Math.abs(x - s.x) < 1.7 && Math.abs(z - s.z) < 1.7) {
          h = Math.max(h, s.y + 0.55);
        }
      } else if (s.kind === 'wood_roof') {
        if (Math.abs(x - s.x) < 1.75 && Math.abs(z - s.z) < 1.75) {
          // Only stand on roof if already high
          if (h > s.y - 0.5) h = Math.max(h, s.y + 0.4);
        }
      }
    }
    return h;
  }

  private grantXp(p: PlayerState, amount: number): void {
    p.xp += amount;
    const needed = p.level * 120;
    if (p.xp >= needed) {
      p.xp -= needed;
      p.level += 1;
      p.vitals.maxHp += 10;
      p.vitals.hp = p.vitals.maxHp;
      p.vitals.maxStamina += 8;
      this.io.to(this.id).emit('fx:event', { kind: 'levelup', x: p.x, y: p.y + 1.5, z: p.z });
      this.emitCombatText(p.x, p.y + 2.4, p.z, `LEVEL ${p.level}!`, '#38f2dc', 'xp');
      if (!p.isBot) {
        this.notify(p.id, `Level Up! You reached Level ${p.level} (+10 Max HP, +8 Stamina).`, 'good');
      }
    }
  }

  private spawnLoot(itemId: string, count: number, x: number, y: number, z: number): void {
    const id = `loot_${this.nextEntitySeq++}`;
    const drop: LootDropState = {
      id,
      itemId,
      count,
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      z: Math.round(z * 100) / 100,
    };
    this.loot.set(id, drop);
    this.io.to(this.id).emit('loot:add', drop);

    // Cap total loose loot on island to prevent clutter
    if (this.loot.size > 140) {
      const oldestKey = this.loot.keys().next().value;
      if (oldestKey) {
        this.loot.delete(oldestKey);
        this.io.to(this.id).emit('loot:remove', oldestKey);
      }
    }
  }

  private emitCombatText(
    x: number,
    y: number,
    z: number,
    text: string,
    color: string,
    kind: FloatingCombatEvent['kind']
  ): void {
    this.io.to(this.id).emit('combat:event', {
      id: `ce_${this.nextEntitySeq++}`,
      x,
      y,
      z,
      text,
      color,
      kind,
    });
  }

  private sendPrivateState(socketId: string): void {
    const sock = this.sockets.get(socketId);
    const priv = this.privateStates.get(socketId);
    if (sock && priv) {
      sock.emit('player:private', priv);
    }
  }

  private notify(socketId: string, text: string, tone: 'info' | 'good' | 'warn' | 'danger' = 'info'): void {
    this.sockets.get(socketId)?.emit('toast:notify', { text, tone });
  }

  private addSystemMessage(text: string): void {
    this.broadcastChat({
      id: `sys_${this.nextEntitySeq++}`,
      senderId: 'system',
      senderName: 'Wildreach',
      text,
      kind: 'system',
      timestamp: Date.now(),
    });
  }

  private broadcastChat(msg: ChatMessage): void {
    this.chatHistory.push(msg);
    if (this.chatHistory.length > 60) this.chatHistory.shift();
    this.io.to(this.id).emit('chat:message', msg);
  }
}
