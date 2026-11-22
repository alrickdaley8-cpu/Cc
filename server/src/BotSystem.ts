import {
  WATER_LEVEL,
  clamp,
  type PlayerOutfit,
  type PlayerState,
  type ResourceNodeState,
  type StructureState,
  type WildlifeState,
  type WorldGenerator,
} from '@wildreach/shared';

interface BotBrain {
  id: string;
  homeX: number;
  homeZ: number;
  goalX: number;
  goalZ: number;
  thinkTimer: number;
  actionCooldown: number;
  chatCooldown: number;
}

const BOT_PROFILES: { name: string; outfit: PlayerOutfit }[] = [
  { name: 'Kael [AI]', outfit: 'ranger' },
  { name: 'Lyra [AI]', outfit: 'warden' },
  { name: 'Rowan [AI]', outfit: 'nomad' },
  { name: 'Sera [AI]', outfit: 'alchemist' },
];

export interface BotActionHooks {
  onHitNode: (botId: string, nodeId: string) => void;
  onHitWildlife: (botId: string, wildlifeId: string) => void;
  onBotChat: (botId: string, text: string) => void;
}

export class BotSystem {
  private brains: Map<string, BotBrain> = new Map();
  private profileIndex = 0;

  createBot(
    world: WorldGenerator,
    spawnX: number,
    spawnZ: number
  ): PlayerState {
    const prof = BOT_PROFILES[this.profileIndex % BOT_PROFILES.length];
    this.profileIndex++;
    const id = `bot_${Date.now().toString(36)}_${this.profileIndex}`;
    const x = spawnX + (Math.random() - 0.5) * 10;
    const z = spawnZ + (Math.random() - 0.5) * 10;
    const y = world.getHeight(x, z);

    this.brains.set(id, {
      id,
      homeX: spawnX,
      homeZ: spawnZ,
      goalX: x,
      goalZ: z,
      thinkTimer: 1.5,
      actionCooldown: 0,
      chatCooldown: 25 + Math.random() * 35,
    });

    return {
      id,
      name: prof.name,
      isBot: true,
      outfit: prof.outfit,
      x,
      y,
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: Math.random() * Math.PI * 2,
      pitch: 0,
      anim: 'idle',
      swingTime: 0,
      equippedSlot: 0,
      equippedItemId: 'stone_axe',
      armorItemId: 'leather_armor',
      armorRating: 25,
      vitals: {
        hp: 100,
        maxHp: 100,
        stamina: 100,
        maxStamina: 100,
        hunger: 88,
        thirst: 88,
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
        nearFreshWater: false,
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
    };
  }

  getBotCount(): number {
    return this.brains.size;
  }

  update(
    dt: number,
    isNight: boolean,
    world: WorldGenerator,
    players: Map<string, PlayerState>,
    nodes: ResourceNodeState[],
    structures: StructureState[],
    wildlife: WildlifeState[],
    hooks: BotActionHooks
  ): void {
    const campfires = structures.filter((s) => s.kind === 'campfire' && s.lit);

    for (const [id, brain] of this.brains.entries()) {
      const bot = players.get(id);
      if (!bot) {
        this.brains.delete(id);
        continue;
      }
      if (!bot.alive) continue;

      if (brain.actionCooldown > 0) brain.actionCooldown -= dt;
      if (bot.swingTime > 0) bot.swingTime = Math.max(0, bot.swingTime - dt);
      brain.thinkTimer -= dt;
      brain.chatCooldown -= dt;

      // 1. Defend against nearby hostile creatures
      let threat: WildlifeState | null = null;
      let threatDist = 18;
      for (const w of wildlife) {
        if (w.kind === 'deer') continue;
        const d = Math.hypot(w.x - bot.x, w.z - bot.z);
        if (d < threatDist) {
          threatDist = d;
          threat = w;
        }
      }

      if (threat) {
        bot.equippedItemId = 'wood_spear';
        if (threatDist <= 3.1) {
          bot.yaw = Math.atan2(threat.x - bot.x, threat.z - bot.z);
          bot.anim = 'swing';
          if (brain.actionCooldown <= 0) {
            brain.actionCooldown = 0.85;
            bot.swingTime = 0.4;
            hooks.onHitWildlife(bot.id, threat.id);
          }
        } else {
          this.stepBot(bot, threat.x, threat.z, 5.6, dt, world, 'run');
        }
        continue;
      }

      // 2. At night, gather near the nearest lit campfire with a torch!
      if (isNight && campfires.length > 0) {
        bot.equippedItemId = 'torch';
        const fire = campfires[0];
        const d = Math.hypot(fire.x - bot.x, fire.z - bot.z);
        if (d > 4.2) {
          this.stepBot(bot, fire.x + 2.2, fire.z + 1.8, 4.3, dt, world, 'walk');
        } else {
          bot.anim = 'idle';
          bot.yaw = Math.atan2(fire.x - bot.x, fire.z - bot.z);
          if (brain.chatCooldown <= 0) {
            brain.chatCooldown = 55;
            hooks.onBotChat(bot.id, 'Keeping watch by the campfire tonight. Stay close to the light!');
          }
        }
        continue;
      }

      // 3. By day, forage/chop trees near sanctuary & roam organically
      bot.equippedItemId = 'stone_axe';
      let nearestTree: ResourceNodeState | null = null;
      let bestDist = 28;
      for (const n of nodes) {
        if (n.depleted) continue;
        if (!n.kind.endsWith('tree') && n.kind !== 'driftwood') continue;
        const dHome = Math.hypot(n.x - brain.homeX, n.z - brain.homeZ);
        if (dHome > 46) continue;
        const d = Math.hypot(n.x - bot.x, n.z - bot.z);
        if (d < bestDist) {
          bestDist = d;
          nearestTree = n;
        }
      }

      if (nearestTree && bestDist < 24) {
        if (bestDist <= 2.6) {
          bot.yaw = Math.atan2(nearestTree.x - bot.x, nearestTree.z - bot.z);
          bot.anim = 'swing';
          if (brain.actionCooldown <= 0) {
            brain.actionCooldown = 1.05;
            bot.swingTime = 0.4;
            hooks.onHitNode(bot.id, nearestTree.id);
          }
        } else {
          this.stepBot(bot, nearestTree.x, nearestTree.z, 4.4, dt, world, 'walk');
        }
        continue;
      }

      // Patrol around camp
      const distGoal = Math.hypot(brain.goalX - bot.x, brain.goalZ - bot.z);
      if (distGoal < 1.5 || brain.thinkTimer <= 0) {
        const ang = Math.random() * Math.PI * 2;
        const rad = 6 + Math.random() * 24;
        brain.goalX = clamp(brain.homeX + Math.cos(ang) * rad, -120, 120);
        brain.goalZ = clamp(brain.homeZ + Math.sin(ang) * rad, -120, 120);
        brain.thinkTimer = 5 + Math.random() * 5;
        bot.anim = 'idle';
      } else {
        this.stepBot(bot, brain.goalX, brain.goalZ, 3.8, dt, world, 'walk');
      }
    }
  }

  private stepBot(
    bot: PlayerState,
    tx: number,
    tz: number,
    speed: number,
    dt: number,
    world: WorldGenerator,
    anim: 'walk' | 'run'
  ): void {
    const dx = tx - bot.x;
    const dz = tz - bot.z;
    const d = Math.hypot(dx, dz) || 1;
    const step = Math.min(d, speed * dt);
    const nx = bot.x + (dx / d) * step;
    const nz = bot.z + (dz / d) * step;
    const nh = world.getHeight(nx, nz);
    if (nh < WATER_LEVEL + 0.2) {
      bot.anim = 'idle';
      return;
    }
    bot.vx = (nx - bot.x) / Math.max(dt, 0.016);
    bot.vz = (nz - bot.z) / Math.max(dt, 0.016);
    bot.x = nx;
    bot.z = nz;
    bot.y = nh;
    bot.yaw = Math.atan2(dx, dz);
    bot.anim = anim;
  }
}
