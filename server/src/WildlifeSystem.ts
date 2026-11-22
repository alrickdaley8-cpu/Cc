import {
  STRUCTURES,
  WATER_LEVEL,
  clamp,
  type PlayerState,
  type StructureState,
  type WildlifeKind,
  type WildlifeState,
  type WorldGenerator,
} from '@wildreach/shared';

interface WildlifeAgent extends WildlifeState {
  homeX: number;
  homeZ: number;
  targetX: number;
  targetZ: number;
  thinkTimer: number;
  attackCooldown: number;
  aggroTargetId: string | null;
  aggroUntil: number;
  respawnAt: number;
}

interface WildlifeConfig {
  maxHp: number;
  walkSpeed: number;
  runSpeed: number;
  damage: number;
  attackRange: number;
  aggroRange: number;
  hostile: boolean;
  fleeRange: number;
  xp: number;
  drops: { itemId: string; min: number; max: number; chance?: number }[];
}

export const WILDLIFE_CONFIG: Record<WildlifeKind, WildlifeConfig> = {
  deer: {
    maxHp: 65,
    walkSpeed: 2.3,
    runSpeed: 7.4,
    damage: 0,
    attackRange: 0,
    aggroRange: 0,
    hostile: false,
    fleeRange: 14,
    xp: 24,
    drops: [
      { itemId: 'raw_meat', min: 2, max: 3 },
      { itemId: 'hide', min: 2, max: 3 },
    ],
  },
  boar: {
    maxHp: 95,
    walkSpeed: 2.4,
    runSpeed: 6.2,
    damage: 14,
    attackRange: 2.2,
    aggroRange: 10,
    hostile: true,
    fleeRange: 0,
    xp: 35,
    drops: [
      { itemId: 'raw_meat', min: 2, max: 4 },
      { itemId: 'hide', min: 1, max: 3 },
    ],
  },
  wolf: {
    maxHp: 115,
    walkSpeed: 3.0,
    runSpeed: 7.3,
    damage: 20,
    attackRange: 2.3,
    aggroRange: 16,
    hostile: true,
    fleeRange: 0,
    xp: 48,
    drops: [
      { itemId: 'raw_meat', min: 1, max: 3 },
      { itemId: 'hide', min: 2, max: 3 },
      { itemId: 'fang', min: 1, max: 2, chance: 0.75 },
    ],
  },
  stalker: {
    maxHp: 185,
    walkSpeed: 3.4,
    runSpeed: 7.8,
    damage: 28,
    attackRange: 2.6,
    aggroRange: 26,
    hostile: true,
    fleeRange: 0,
    xp: 95,
    drops: [
      { itemId: 'shadow_essence', min: 1, max: 3 },
      { itemId: 'ancient_shard', min: 1, max: 2, chance: 0.65 },
    ],
  },
};

export interface WildlifeCallbacks {
  onAttackPlayer: (playerId: string, damage: number, fromX: number, fromZ: number, kind: WildlifeKind) => void;
  onAttackStructure: (structureId: string, damage: number) => void;
  onDie: (agent: WildlifeState, killerId: string | null) => void;
}

export class WildlifeSystem {
  private agents: Map<string, WildlifeAgent> = new Map();
  private nextId = 1;
  private world: WorldGenerator;

  constructor(world: WorldGenerator) {
    this.world = world;
    this.spawnInitialPopulations();
  }

  private spawnInitialPopulations(): void {
    this.spawnBiomeGroup('deer', 13, ['meadow', 'beach']);
    this.spawnBiomeGroup('boar', 8, ['meadow', 'pine', 'marsh']);
    this.spawnBiomeGroup('wolf', 7, ['pine', 'highland', 'volcanic']);
  }

  private spawnBiomeGroup(kind: WildlifeKind, count: number, biomes: string[]): void {
    let created = 0;
    let tries = 0;
    while (created < count && tries < 600) {
      tries++;
      const x = (Math.random() * 2 - 1) * 130;
      const z = (Math.random() * 2 - 1) * 130;
      // Keep starter sanctuary clear of predators
      if (kind !== 'deer' && Math.hypot(x + 10, z - 18) < 34) continue;
      const sample = this.world.sample(x, z);
      if (sample.height < 0.8 || sample.slope > 0.75) continue;
      if (!biomes.includes(sample.biome)) continue;
      this.createAgent(kind, x, z);
      created++;
    }
  }

  private createAgent(kind: WildlifeKind, x: number, z: number): WildlifeAgent {
    const cfg = WILDLIFE_CONFIG[kind];
    const y = this.world.getHeight(x, z);
    const id = `mob_${kind}_${this.nextId++}`;
    const agent: WildlifeAgent = {
      id,
      kind,
      x,
      y,
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
      aggroTargetId: null,
      aggroUntil: 0,
      respawnAt: 0,
    };
    this.agents.set(id, agent);
    return agent;
  }

  getSnapshots(): WildlifeState[] {
    const out: WildlifeState[] = [];
    for (const a of this.agents.values()) {
      if (a.state === 'dead') continue;
      out.push({
        id: a.id,
        kind: a.kind,
        x: Math.round(a.x * 100) / 100,
        y: Math.round(a.y * 100) / 100,
        z: Math.round(a.z * 100) / 100,
        yaw: Math.round(a.yaw * 100) / 100,
        hp: a.hp,
        maxHp: a.maxHp,
        state: a.state,
        speed: Math.round(a.speed * 100) / 100,
        attackTime: a.attackTime,
      });
    }
    return out;
  }

  getAgent(id: string): WildlifeState | undefined {
    const a = this.agents.get(id);
    if (!a || a.state === 'dead') return undefined;
    return a;
  }

  damageAgent(
    id: string,
    damage: number,
    attackerId: string | null,
    attackerX: number,
    attackerZ: number,
    now: number,
    callbacks: WildlifeCallbacks
  ): { hit: boolean; killed: boolean; remainingHp: number; x: number; y: number; z: number } | null {
    const a = this.agents.get(id);
    if (!a || a.state === 'dead') return null;

    a.hp = Math.max(0, a.hp - damage);

    // Knockback
    const dx = a.x - attackerX;
    const dz = a.z - attackerZ;
    const dist = Math.hypot(dx, dz) || 1;
    const nx = a.x + (dx / dist) * 0.9;
    const nz = a.z + (dz / dist) * 0.9;
    const nh = this.world.getHeight(nx, nz);
    if (nh > WATER_LEVEL + 0.1) {
      a.x = nx;
      a.z = nz;
      a.y = nh;
    }

    if (a.hp <= 0) {
      a.state = 'dead';
      a.respawnAt = now + (a.kind === 'stalker' ? 999999000 : 85_000);
      callbacks.onDie(a, attackerId);
      return { hit: true, killed: true, remainingHp: 0, x: a.x, y: a.y, z: a.z };
    }

    // Trigger flee or aggro
    const cfg = WILDLIFE_CONFIG[a.kind];
    if (!cfg.hostile) {
      a.state = 'flee';
      a.targetX = clamp(a.x + (dx / dist) * 26, -135, 135);
      a.targetZ = clamp(a.z + (dz / dist) * 26, -135, 135);
      a.thinkTimer = 4.5;
    } else if (attackerId) {
      a.aggroTargetId = attackerId;
      a.aggroUntil = now + 16_000;
      a.state = 'chase';
    }

    return { hit: true, killed: false, remainingHp: a.hp, x: a.x, y: a.y, z: a.z };
  }

  update(
    dt: number,
    now: number,
    isNight: boolean,
    players: PlayerState[],
    structures: StructureState[],
    callbacks: WildlifeCallbacks
  ): void {
    // Manage night stalker spawns/despawns
    const liveStalkers = Array.from(this.agents.values()).filter(
      (a) => a.kind === 'stalker' && a.state !== 'dead'
    );
    if (isNight && liveStalkers.length < 5 && players.length > 0 && Math.random() < dt * 0.35) {
      const anchor = players[Math.floor(Math.random() * players.length)];
      if (anchor.alive) {
        const ang = Math.random() * Math.PI * 2;
        const dist = 26 + Math.random() * 18;
        const sx = clamp(anchor.x + Math.cos(ang) * dist, -135, 135);
        const sz = clamp(anchor.z + Math.sin(ang) * dist, -135, 135);
        if (this.world.getHeight(sx, sz) > 0.6) {
          this.createAgent('stalker', sx, sz);
        }
      }
    } else if (!isNight) {
      for (const s of liveStalkers) {
        this.agents.delete(s.id);
      }
    }

    // Collect bright fire/beacon repel zones for night stalkers
    const lightZones: { x: number; z: number; r: number }[] = [];
    for (const st of structures) {
      if (
        (st.kind === 'campfire' && st.lit) ||
        st.kind === 'lantern_post' ||
        st.kind === 'watchtower_beacon'
      ) {
        lightZones.push({
          x: st.x,
          z: st.z,
          r: st.kind === 'watchtower_beacon' ? 16 : st.kind === 'campfire' ? 8.5 : 6.5,
        });
      }
    }

    for (const a of this.agents.values()) {
      if (a.state === 'dead') {
        if (a.kind === 'stalker') {
          this.agents.delete(a.id);
          continue;
        }
        if (now >= a.respawnAt) {
          a.x = a.homeX + (Math.random() - 0.5) * 14;
          a.z = a.homeZ + (Math.random() - 0.5) * 14;
          a.y = this.world.getHeight(a.x, a.z);
          a.hp = a.maxHp;
          a.state = 'idle';
          a.aggroTargetId = null;
        }
        continue;
      }

      const cfg = WILDLIFE_CONFIG[a.kind];
      if (a.attackCooldown > 0) a.attackCooldown -= dt;
      if (a.attackTime > 0) a.attackTime = Math.max(0, a.attackTime - dt);
      a.thinkTimer -= dt;

      // Find nearest alive player
      let nearestPlayer: PlayerState | null = null;
      let nearestDist = Infinity;
      for (const p of players) {
        if (!p.alive) continue;
        const d = Math.hypot(p.x - a.x, p.z - a.z);
        if (d < nearestDist) {
          nearestDist = d;
          nearestPlayer = p;
        }
      }

      // Stalkers shy away from bright campfires and beacons
      if (a.kind === 'stalker') {
        let repelled = false;
        for (const lz of lightZones) {
          const d = Math.hypot(a.x - lz.x, a.z - lz.z);
          if (d < lz.r) {
            const ang = Math.atan2(a.z - lz.z, a.x - lz.x);
            a.targetX = a.x + Math.cos(ang) * 14;
            a.targetZ = a.z + Math.sin(ang) * 14;
            a.state = 'flee';
            a.thinkTimer = 1.6;
            repelled = true;
            break;
          }
        }
        if (repelled) {
          this.moveToward(a, a.targetX, a.targetZ, cfg.runSpeed * 0.9, dt, structures, callbacks);
          continue;
        }
      }

      // Passive deer flee when player approaches
      if (!cfg.hostile) {
        if (nearestPlayer && nearestDist < cfg.fleeRange) {
          const dx = a.x - nearestPlayer.x;
          const dz = a.z - nearestPlayer.z;
          const len = Math.hypot(dx, dz) || 1;
          a.targetX = clamp(a.x + (dx / len) * 20, -135, 135);
          a.targetZ = clamp(a.z + (dz / len) * 20, -135, 135);
          a.state = 'flee';
          a.thinkTimer = 2.0;
        }
      } else {
        // Hostile creature target acquisition
        let target: PlayerState | null = null;
        if (a.aggroTargetId && now < a.aggroUntil) {
          target = players.find((p) => p.id === a.aggroTargetId && p.alive) ?? null;
        }
        const effectiveAggro =
          a.kind === 'stalker' && nearestPlayer?.equippedItemId === 'torch'
            ? cfg.aggroRange * 0.55
            : cfg.aggroRange;

        if (!target && nearestPlayer && nearestDist < effectiveAggro) {
          // Boars only aggro if you get fairly close; wolves & stalkers hunt more actively
          target = nearestPlayer;
          a.aggroTargetId = nearestPlayer.id;
          a.aggroUntil = now + 12_000;
        }

        if (target) {
          const d = Math.hypot(target.x - a.x, target.z - a.z);
          if (d > cfg.aggroRange * 2.2) {
            a.aggroTargetId = null;
            a.state = 'wander';
          } else if (d <= cfg.attackRange) {
            a.state = 'attack';
            a.speed = 0;
            a.yaw = Math.atan2(target.x - a.x, target.z - a.z);
            if (a.attackCooldown <= 0) {
              a.attackCooldown = a.kind === 'stalker' ? 1.15 : 1.35;
              a.attackTime = 0.45;
              callbacks.onAttackPlayer(target.id, cfg.damage, a.x, a.z, a.kind);
            }
            continue;
          } else {
            a.state = 'chase';
            this.moveToward(a, target.x, target.z, cfg.runSpeed, dt, structures, callbacks);
            continue;
          }
        }
      }

      // Wander / Idle / Flee movement
      if (a.state === 'flee') {
        const arrived = this.moveToward(a, a.targetX, a.targetZ, cfg.runSpeed, dt, structures, callbacks);
        if (arrived || a.thinkTimer <= 0) {
          a.state = 'idle';
          a.thinkTimer = 2 + Math.random() * 3;
        }
      } else if (a.state === 'wander') {
        const arrived = this.moveToward(a, a.targetX, a.targetZ, cfg.walkSpeed, dt, structures, callbacks);
        if (arrived || a.thinkTimer <= 0) {
          a.state = 'idle';
          a.speed = 0;
          a.thinkTimer = 2.5 + Math.random() * 4.5;
        }
      } else {
        a.speed = 0;
        if (a.thinkTimer <= 0) {
          const ang = Math.random() * Math.PI * 2;
          const dist = 6 + Math.random() * 14;
          const tx = clamp(a.homeX + Math.cos(ang) * dist, -135, 135);
          const tz = clamp(a.homeZ + Math.sin(ang) * dist, -135, 135);
          if (this.world.getHeight(tx, tz) > 0.65) {
            a.targetX = tx;
            a.targetZ = tz;
            a.state = 'wander';
            a.thinkTimer = 5 + Math.random() * 5;
          } else {
            a.thinkTimer = 1.5;
          }
        }
      }
    }
  }

  private moveToward(
    a: WildlifeAgent,
    tx: number,
    tz: number,
    speed: number,
    dt: number,
    structures: StructureState[],
    callbacks: WildlifeCallbacks
  ): boolean {
    const dx = tx - a.x;
    const dz = tz - a.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.8) {
      a.speed = 0;
      return true;
    }
    const step = Math.min(dist, speed * dt);
    const nx = a.x + (dx / dist) * step;
    const nz = a.z + (dz / dist) * step;

    // Avoid walking deep into ocean
    const nh = this.world.getHeight(nx, nz);
    if (nh < WATER_LEVEL + 0.25) {
      a.thinkTimer = 0;
      a.speed = 0;
      return true;
    }

    // Check structure barricades & walls
    for (const s of structures) {
      const def = STRUCTURES[s.kind];
      if (!def.solidCollision) continue;
      if (s.kind === 'wood_doorway' && s.isOpen) continue;
      const sd = Math.hypot(nx - s.x, nz - s.z);
      const blockR = Math.max(def.width, def.depth) * 0.45 + 0.55;
      if (sd < blockR) {
        if (WILDLIFE_CONFIG[a.kind].hostile && a.attackCooldown <= 0) {
          a.attackCooldown = 1.4;
          a.attackTime = 0.4;
          callbacks.onAttackStructure(s.id, Math.round(WILDLIFE_CONFIG[a.kind].damage * 0.9));
          // Spike barricade hurts attacker!
          if (s.kind === 'spike_barricade') {
            a.hp = Math.max(1, a.hp - 16);
          }
        }
        a.speed = 0;
        return false;
      }
    }

    a.x = nx;
    a.z = nz;
    a.y = nh;
    a.yaw = Math.atan2(dx, dz);
    a.speed = speed;
    return false;
  }
}
