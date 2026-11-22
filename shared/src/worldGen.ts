import { SimplexNoise2D, clamp, createRng, lerp, smoothstep } from './noise.js';
import type {
  BiomeType,
  LandmarkInfo,
  ResourceNodeKind,
  ResourceNodeState,
  Vec3,
} from './types.js';

export const WORLD_SIZE = 440;
export const HALF_WORLD = WORLD_SIZE / 2; // 220
export const WATER_LEVEL = 0.0;
export const SWIM_DEPTH = -0.65;

export interface TerrainSample {
  height: number;
  biome: BiomeType;
  moisture: number;
  temperature: number;
  slope: number;
}

export interface NodeBlueprint {
  kind: ResourceNodeKind;
  maxHp: number;
  minToolTier: number;
  preferredTool: 'axe' | 'pickaxe' | 'hand';
  drops: { itemId: string; min: number; max: number; chance?: number }[];
  respawnSec: number;
  radius: number;
}

export const RESOURCE_NODE_BLUEPRINTS: Record<ResourceNodeKind, NodeBlueprint> = {
  pine_tree: {
    kind: 'pine_tree',
    maxHp: 90,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'wood', min: 5, max: 8 },
      { itemId: 'resin', min: 1, max: 2, chance: 0.6 },
    ],
    respawnSec: 210,
    radius: 0.85,
  },
  oak_tree: {
    kind: 'oak_tree',
    maxHp: 110,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'wood', min: 6, max: 10 },
      { itemId: 'fiber', min: 1, max: 3, chance: 0.5 },
    ],
    respawnSec: 240,
    radius: 0.95,
  },
  birch_tree: {
    kind: 'birch_tree',
    maxHp: 75,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'wood', min: 4, max: 7 },
      { itemId: 'fiber', min: 1, max: 2, chance: 0.65 },
    ],
    respawnSec: 180,
    radius: 0.72,
  },
  palm_tree: {
    kind: 'palm_tree',
    maxHp: 70,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'wood', min: 4, max: 6 },
      { itemId: 'coconut', min: 1, max: 2, chance: 0.85 },
    ],
    respawnSec: 180,
    radius: 0.7,
  },
  marsh_tree: {
    kind: 'marsh_tree',
    maxHp: 95,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'wood', min: 5, max: 7 },
      { itemId: 'resin', min: 1, max: 3, chance: 0.75 },
    ],
    respawnSec: 220,
    radius: 0.9,
  },
  stone_boulder: {
    kind: 'stone_boulder',
    maxHp: 100,
    minToolTier: 0,
    preferredTool: 'pickaxe',
    drops: [
      { itemId: 'stone', min: 5, max: 8 },
      { itemId: 'flint', min: 1, max: 3, chance: 0.75 },
    ],
    respawnSec: 200,
    radius: 1.15,
  },
  copper_vein: {
    kind: 'copper_vein',
    maxHp: 135,
    minToolTier: 1,
    preferredTool: 'pickaxe',
    drops: [
      { itemId: 'copper_ore', min: 3, max: 5 },
      { itemId: 'stone', min: 2, max: 4 },
    ],
    respawnSec: 260,
    radius: 1.2,
  },
  iron_vein: {
    kind: 'iron_vein',
    maxHp: 180,
    minToolTier: 1,
    preferredTool: 'pickaxe',
    drops: [
      { itemId: 'iron_ore', min: 3, max: 5 },
      { itemId: 'stone', min: 2, max: 3 },
      { itemId: 'coal', min: 1, max: 2, chance: 0.6 },
    ],
    respawnSec: 300,
    radius: 1.25,
  },
  obsidian_vein: {
    kind: 'obsidian_vein',
    maxHp: 240,
    minToolTier: 2,
    preferredTool: 'pickaxe',
    drops: [
      { itemId: 'obsidian', min: 2, max: 4 },
      { itemId: 'coal', min: 2, max: 3 },
    ],
    respawnSec: 360,
    radius: 1.3,
  },
  ancient_crystal: {
    kind: 'ancient_crystal',
    maxHp: 210,
    minToolTier: 2,
    preferredTool: 'pickaxe',
    drops: [
      { itemId: 'ancient_shard', min: 2, max: 3 },
      { itemId: 'flint', min: 1, max: 2 },
    ],
    respawnSec: 420,
    radius: 1.0,
  },
  berry_bush: {
    kind: 'berry_bush',
    maxHp: 25,
    minToolTier: 0,
    preferredTool: 'hand',
    drops: [
      { itemId: 'berries', min: 3, max: 5 },
      { itemId: 'fiber', min: 1, max: 2, chance: 0.7 },
    ],
    respawnSec: 120,
    radius: 0.7,
  },
  fiber_reed: {
    kind: 'fiber_reed',
    maxHp: 20,
    minToolTier: 0,
    preferredTool: 'hand',
    drops: [{ itemId: 'fiber', min: 3, max: 6 }],
    respawnSec: 100,
    radius: 0.6,
  },
  mushroom_cluster: {
    kind: 'mushroom_cluster',
    maxHp: 18,
    minToolTier: 0,
    preferredTool: 'hand',
    drops: [{ itemId: 'mushroom', min: 2, max: 4 }],
    respawnSec: 130,
    radius: 0.55,
  },
  driftwood: {
    kind: 'driftwood',
    maxHp: 35,
    minToolTier: 0,
    preferredTool: 'hand',
    drops: [
      { itemId: 'wood', min: 3, max: 5 },
      { itemId: 'fiber', min: 1, max: 2, chance: 0.5 },
    ],
    respawnSec: 150,
    radius: 0.85,
  },
  supply_crate: {
    kind: 'supply_crate',
    maxHp: 45,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'wood', min: 3, max: 6 },
      { itemId: 'iron_ingot', min: 1, max: 2, chance: 0.55 },
      { itemId: 'bandage', min: 1, max: 2, chance: 0.7 },
      { itemId: 'cooked_meat', min: 1, max: 2, chance: 0.65 },
      { itemId: 'rope', min: 1, max: 2, chance: 0.8 },
    ],
    respawnSec: 320,
    radius: 0.85,
  },
  coral_reef_node: {
    kind: 'coral_reef_node',
    maxHp: 55,
    minToolTier: 0,
    preferredTool: 'pickaxe',
    drops: [
      { itemId: 'sea_pearl', min: 1, max: 2 },
      { itemId: 'flint', min: 1, max: 2, chance: 0.65 },
    ],
    respawnSec: 210,
    radius: 0.85,
  },
  sunbloom_flower: {
    kind: 'sunbloom_flower',
    maxHp: 22,
    minToolTier: 0,
    preferredTool: 'hand',
    drops: [
      { itemId: 'sunbloom', min: 2, max: 4 },
      { itemId: 'fiber', min: 1, max: 2, chance: 0.5 },
    ],
    respawnSec: 140,
    radius: 0.55,
  },
  sunken_wreck_chest: {
    kind: 'sunken_wreck_chest',
    maxHp: 65,
    minToolTier: 0,
    preferredTool: 'axe',
    drops: [
      { itemId: 'gold_coin', min: 3, max: 8 },
      { itemId: 'iron_ingot', min: 1, max: 3, chance: 0.85 },
      { itemId: 'sea_pearl', min: 1, max: 2, chance: 0.75 },
      { itemId: 'rope', min: 2, max: 3, chance: 0.8 },
      { itemId: 'seafarer_chowder', min: 1, max: 1, chance: 0.55 },
    ],
    respawnSec: 380,
    radius: 0.95,
  },
};

export class WorldGenerator {
  readonly seed: number;
  private elevationNoise: SimplexNoise2D;
  private detailNoise: SimplexNoise2D;
  private ridgeNoise: SimplexNoise2D;
  private moistureNoise: SimplexNoise2D;
  private shapeNoise: SimplexNoise2D;
  readonly landmarks: LandmarkInfo[];

  constructor(seed: number) {
    this.seed = seed;
    this.elevationNoise = new SimplexNoise2D(seed + 101);
    this.detailNoise = new SimplexNoise2D(seed + 202);
    this.ridgeNoise = new SimplexNoise2D(seed + 303);
    this.moistureNoise = new SimplexNoise2D(seed + 404);
    this.shapeNoise = new SimplexNoise2D(seed + 505);

    this.landmarks = [
      {
        id: 'lm_sanctuary',
        name: 'Runestone Sanctuary',
        kind: 'sanctuary',
        x: -10,
        z: 18,
        radius: 13,
      },
      {
        id: 'lm_spring',
        name: 'Crystal Spring',
        kind: 'spring',
        x: 16,
        z: 8,
        radius: 11,
      },
      {
        id: 'lm_shipwreck',
        name: 'Wreck of the Dawnbreaker',
        kind: 'shipwreck',
        x: -14,
        z: 112,
        radius: 16,
      },
      {
        id: 'lm_watchtower',
        name: 'Northern Watchtower',
        kind: 'watchtower',
        x: -44,
        z: -62,
        radius: 12,
      },
      {
        id: 'lm_peak',
        name: 'Obsidian Spire',
        kind: 'peak',
        x: 62,
        z: -68,
        radius: 26,
      },
      {
        id: 'lm_ruins',
        name: 'Sunken Bog Arches',
        kind: 'ruins',
        x: 84,
        z: 36,
        radius: 18,
      },
      {
        id: 'lm_jetty',
        name: 'South Harbor Jetty',
        kind: 'jetty',
        x: 20,
        z: 106,
        radius: 14,
      },
      {
        id: 'lm_atoll',
        name: 'Shipwreck Coral Atoll',
        kind: 'atoll',
        x: -148,
        z: 136,
        radius: 32,
      },
      {
        id: 'lm_volcano',
        name: 'Volcanic Obsidian Isle',
        kind: 'volcano',
        x: 152,
        z: -136,
        radius: 34,
      },
      {
        id: 'lm_sea_arch',
        name: 'Sea-Arch Sanctuary',
        kind: 'sea_arch',
        x: -146,
        z: -134,
        radius: 30,
      },
    ];
  }

  getHeight(x: number, z: number): number {
    // Organic archipelago island mask
    const nx = x / 138;
    const nz = z / 138;
    const dist = Math.sqrt(nx * nx + nz * nz);
    const angle = Math.atan2(nz, nx);

    // Coastal coves & peninsulas
    const coastWarp =
      this.shapeNoise.fbm(Math.cos(angle) * 1.45, Math.sin(angle) * 1.45, 3) * 0.24 +
      this.shapeNoise.noise2D(x * 0.011, z * 0.011) * 0.14;
    const effectiveDist = dist + coastWarp;

    // Island falloff: flat ocean floor outside ~1.05, smooth continental shelf
    const islandMask = 1 - smoothstep(0.56, 1.06, effectiveDist);
    const shelfDepth = lerp(-7.2, 0.2, smoothstep(1.18, 0.72, effectiveDist));

    // ---- 3 Explorable Outer Sailing Islands across open ocean! ----
    const computeOuterIslands = (): number => {
      let outerH = -7.2 + this.detailNoise.noise2D(x * 0.03, z * 0.03) * 0.35;

      // 1) SW Shipwreck Coral Atoll (-148, 136) — low turquoise sandbar + palm lagoon
      const atollD = Math.hypot(x + 148, z - 136);
      if (atollD < 46) {
        const warp = this.shapeNoise.noise2D(x * 0.04, z * 0.04) * 5.5;
        const m = 1 - smoothstep(11, 36, atollD + warp);
        if (m > 0) {
          const hA = 0.6 + m * 3.8 + this.detailNoise.noise2D(x * 0.05, z * 0.05) * 0.65;
          outerH = Math.max(outerH, lerp(-6.5, hA, m));
        }
      }

      // 2) NE Volcanic Obsidian Isle (152, -136) — steep basalt caldera + obsidian crags
      const volcD = Math.hypot(x - 152, z + 136);
      if (volcD < 48) {
        const warp = this.shapeNoise.noise2D(x * 0.035, z * 0.035) * 4.5;
        const m = 1 - smoothstep(10, 38, volcD + warp);
        if (m > 0) {
          const ridge = this.ridgeNoise.ridged(x * 0.03, z * 0.03, 3);
          const hV = 2.0 + m * (14.5 + ridge * 7.5);
          outerH = Math.max(outerH, lerp(-6.8, hV, m));
        }
      }

      // 3) NW Sea-Arch Sanctuary Isle (-146, -134) — pine-crowned highland bluff & cove
      const archD = Math.hypot(x + 146, z + 134);
      if (archD < 45) {
        const warp = this.shapeNoise.noise2D(x * 0.038, z * 0.038) * 5.0;
        const m = 1 - smoothstep(10, 35, archD + warp);
        if (m > 0) {
          const hS = 1.6 + m * 8.4 + this.detailNoise.fbm(x * 0.04, z * 0.04, 2) * 1.1;
          outerH = Math.max(outerH, lerp(-6.6, hS, m));
        }
      }

      return outerH;
    };

    if (islandMask <= 0.001) {
      return Math.max(
        shelfDepth + this.detailNoise.noise2D(x * 0.03, z * 0.03) * 0.35,
        computeOuterIslands()
      );
    }

    // Base rolling island terrain
    const baseFbm = this.elevationNoise.fbm(x * 0.0085, z * 0.0085, 4);
    const detail = this.detailNoise.fbm(x * 0.032, z * 0.032, 3) * 1.1;
    let h = 2.4 + (baseFbm * 0.5 + 0.5) * 6.5 + detail;

    // Northeastern Obsidian Peak mountain range around (62, -68)
    const peakDist = Math.hypot(x - 62, z + 68);
    const peakMask = 1 - smoothstep(10, 74, peakDist);
    if (peakMask > 0) {
      const ridge = this.ridgeNoise.ridged(x * 0.018, z * 0.018, 4);
      h += peakMask * peakMask * (11.5 + ridge * 13.5);
    }

    // Northern Whispering Pine Highlands around (-44, -62)
    const northDist = Math.hypot(x + 44, z + 62);
    const northMask = 1 - smoothstep(16, 78, northDist);
    if (northMask > 0) {
      const ridge = this.ridgeNoise.ridged(x * 0.014, z * 0.014, 3);
      h += northMask * (5.2 + ridge * 4.5);
    }

    // Eastern Misty Marsh basin around (84, 36) -> low flat wet basin
    const marshDist = Math.hypot(x - 84, z - 36);
    const marshMask = 1 - smoothstep(10, 52, marshDist);
    if (marshMask > 0) {
      h = lerp(h, 0.55 + this.detailNoise.noise2D(x * 0.04, z * 0.04) * 0.5, marshMask * 0.85);
    }

    // Southern Shipwreck Cove -> gentle sandy beach apron around (-14, 112)
    const coveDist = Math.hypot(x + 14, z - 102);
    const coveMask = 1 - smoothstep(12, 42, coveDist);
    if (coveMask > 0) {
      h = lerp(h, 1.35, coveMask * 0.65);
    }

    // Apply island coastal falloff
    h = lerp(shelfDepth, h, islandMask);

    // Flatten the Runestone Sanctuary clearing gently so spawn is scenic and build-ready
    const sancDist = Math.hypot(x + 10, z - 18);
    if (sancDist < 17) {
      const t = 1 - smoothstep(7, 17, sancDist);
      h = lerp(h, 4.2, t * 0.85);
    }

    // Carve the Crystal Spring freshwater pond around (16, 8)
    const springDist = Math.hypot(x - 16, z - 8);
    if (springDist < 14) {
      const basin = 1 - smoothstep(3.5, 13.5, springDist);
      h = lerp(h, -0.75, basin * 0.92);
    }

    // Flatten tiny plateau at Northern Watchtower (-44, -62)
    const towerDist = Math.hypot(x + 44, z + 62);
    if (towerDist < 11) {
      const t = 1 - smoothstep(4.5, 11, towerDist);
      h = lerp(h, 11.2, t * 0.75);
    }

    return h;
  }

  getSlope(x: number, z: number): number {
    const eps = 1.0;
    const hL = this.getHeight(x - eps, z);
    const hR = this.getHeight(x + eps, z);
    const hD = this.getHeight(x, z - eps);
    const hU = this.getHeight(x, z + eps);
    const dx = (hR - hL) / (2 * eps);
    const dz = (hU - hD) / (2 * eps);
    return Math.sqrt(dx * dx + dz * dz);
  }

  getNormal(x: number, z: number): Vec3 {
    const eps = 0.8;
    const hL = this.getHeight(x - eps, z);
    const hR = this.getHeight(x + eps, z);
    const hD = this.getHeight(x, z - eps);
    const hU = this.getHeight(x, z + eps);
    const nx = hL - hR;
    const ny = 2 * eps;
    const nz = hD - hU;
    const len = Math.hypot(nx, ny, nz) || 1;
    return { x: nx / len, y: ny / len, z: nz / len };
  }

  isNearFreshWater(x: number, z: number): boolean {
    const d = Math.hypot(x - 16, z - 8);
    return d < 12.5;
  }

  sample(x: number, z: number): TerrainSample {
    const height = this.getHeight(x, z);
    const slope = this.getSlope(x, z);
    const moisture = clamp(
      0.5 + this.moistureNoise.fbm(x * 0.011, z * 0.011, 3) * 0.7,
      0,
      1
    );
    const temperature = clamp(0.65 - Math.max(0, height) * 0.025 + (z / 300) * 0.25, 0, 1);

    let biome: BiomeType;
    const marshDist = Math.hypot(x - 84, z - 36);
    const peakDist = Math.hypot(x - 62, z + 68);
    const outerVolcDist = Math.hypot(x - 152, z + 136);
    const outerAtollDist = Math.hypot(x + 148, z - 136);

    if (height < WATER_LEVEL - 0.12) {
      biome = 'ocean';
    } else if (outerVolcDist < 36 && height > 2.2) {
      biome = 'volcanic';
    } else if (outerAtollDist < 35 && height < 3.6) {
      biome = 'beach';
    } else if (marshDist < 42 && height < 2.6) {
      biome = 'marsh';
    } else if (height < 1.55) {
      biome = 'beach';
    } else if (peakDist < 54 && height > 12.2) {
      biome = 'volcanic';
    } else if (height > 10.2 || slope > 0.72) {
      biome = 'highland';
    } else if (z < -12 || height > 6.4 || moisture < 0.42) {
      biome = 'pine';
    } else {
      biome = 'meadow';
    }

    return { height, biome, moisture, temperature, slope };
  }

  getSpawnPoint(): Vec3 {
    const x = -10;
    const z = 25;
    return { x, y: this.getHeight(x, z), z };
  }

  /**
   * Finds a reliable deep-enough coastal water spot just off the South Harbor Jetty
   * for mooring the starter Timber Raft.
   */
  getStarterBoatSpot(): { x: number; z: number; yaw: number } {
    const x = 20;
    for (let z = 96; z <= 184; z += 2) {
      if (this.getHeight(x, z) < -1.1 && this.getHeight(x + 4.5, z + 2) < -1.1) {
        return { x: x + 4.5, z: z + 2, yaw: Math.PI };
      }
    }
    return { x: 24.5, z: 172, yaw: Math.PI };
  }

  /**
   * Finds exact waterline coordinate for the South Harbor Jetty pier.
   */
  getHarborJettySpot(): { x: number; z: number } {
    const x = 20;
    for (let z = 82; z <= 176; z += 1.5) {
      if (this.getHeight(x, z) < 0.15) {
        return { x, z };
      }
    }
    return { x: 20, z: 158 };
  }

  generateResourceNodes(): ResourceNodeState[] {
    const rng = createRng(this.seed + 7777);
    const nodes: ResourceNodeState[] = [];
    const occupied: { x: number; z: number; r: number }[] = [];

    const canPlace = (x: number, z: number, minGap: number): boolean => {
      // Keep clear of spawn center and spring center
      if (Math.hypot(x + 10, z - 18) < 9.5) return false;
      if (Math.hypot(x - 16, z - 8) < 9.5) return false;
      if (Math.hypot(x + 44, z + 62) < 6.5) return false;
      for (let i = 0; i < occupied.length; i++) {
        const o = occupied[i];
        const dx = x - o.x;
        const dz = z - o.z;
        const gap = o.r + minGap;
        if (dx * dx + dz * dz < gap * gap) return false;
      }
      return true;
    };

    const addNode = (kind: ResourceNodeKind, x: number, z: number, scaleMin = 0.85, scaleMax = 1.28) => {
      const bp = RESOURCE_NODE_BLUEPRINTS[kind];
      const y = this.getHeight(x, z);
      const id = `node_${nodes.length}`;
      const scale = lerp(scaleMin, scaleMax, rng());
      nodes.push({
        id,
        kind,
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100,
        z: Math.round(z * 100) / 100,
        rotY: Math.round(rng() * Math.PI * 2 * 100) / 100,
        scale: Math.round(scale * 100) / 100,
        hp: bp.maxHp,
        maxHp: bp.maxHp,
        depleted: false,
        respawnAt: 0,
      });
      occupied.push({ x, z, r: bp.radius * scale + 1.3 });
    };

    // Guaranteed starter resources near Sanctuary so first 60 seconds feel immediate & rewarding
    const starterSpots: [ResourceNodeKind, number, number][] = [
      ['driftwood', -19, 26],
      ['driftwood', -2, 29],
      ['stone_boulder', -21, 16],
      ['stone_boulder', 2, 21],
      ['berry_bush', -15, 31],
      ['berry_bush', -3, 14],
      ['fiber_reed', 6, 13],
      ['fiber_reed', 12, 17],
      ['birch_tree', -23, 21],
      ['oak_tree', -17, 7],
      ['pine_tree', -27, 12],
      ['copper_vein', -31, 4],
      ['sunbloom_flower', -6, 12],
      ['sunbloom_flower', 6, 23],
    ];
    for (const [kind, sx, sz] of starterSpots) {
      if (this.getHeight(sx, sz) > 0.3) {
        addNode(kind, sx, sz, 0.95, 1.1);
      }
    }

    // Shipwreck salvage crates on southern beach + outer Shipwreck Atoll sunken chests!
    const crateSpots: [ResourceNodeKind, number, number][] = [
      ['supply_crate', -18, 108],
      ['supply_crate', -10, 109],
      ['supply_crate', -15, 117],
      ['supply_crate', -6, 113],
      ['supply_crate', -22, 113],
      ['supply_crate', -40, -56],
      ['supply_crate', -48, -66],
      ['supply_crate', 81, 32],
      ['supply_crate', 89, 39],
      // Outer Shipwreck Atoll treasure chests
      ['sunken_wreck_chest', -144, 134],
      ['sunken_wreck_chest', -154, 140],
      ['sunken_wreck_chest', -147, 128],
      // Outer Sea-Arch Isle treasures & sunblooms
      ['sunken_wreck_chest', -146, -131],
      ['sunbloom_flower', -141, -137],
      ['sunbloom_flower', -151, -135],
      ['sunbloom_flower', -145, -142],
      // Outer Volcanic Obsidian Isle rich veins
      ['obsidian_vein', 148, -132],
      ['obsidian_vein', 156, -140],
      ['ancient_crystal', 151, -135],
      ['iron_vein', 144, -139],
      ['iron_vein', 158, -130],
    ];
    for (const [kind, cx, cz] of crateSpots) {
      if (this.getHeight(cx, cz) > 0.1) {
        addNode(kind, cx, cz, 0.95, 1.12);
      }
    }

    // Procedural biome-driven world scatter (~740 nodes including outer islands & shallow coral reefs!)
    const attempts = 4400;
    for (let i = 0; i < attempts && nodes.length < 740; i++) {
      const x = (rng() * 2 - 1) * 195;
      const z = (rng() * 2 - 1) * 195;
      const sample = this.sample(x, z);

      // Shallow turquoise coral reefs right along beaches & Shipwreck Atoll!
      if (sample.biome === 'ocean') {
        if (sample.height > -1.35 && sample.height < -0.25 && rng() < 0.065) {
          if (canPlace(x, z, 3.5)) {
            addNode('coral_reef_node', x, z, 0.85, 1.3);
          }
        }
        continue;
      }
      if (sample.slope > 0.92) continue;

      let kind: ResourceNodeKind | null = null;
      const r = rng();

      if (sample.biome === 'beach') {
        if (sample.height < 0.3) continue;
        if (r < 0.42) kind = 'palm_tree';
        else if (r < 0.70) kind = 'driftwood';
        else if (r < 0.88) kind = 'stone_boulder';
        else kind = 'fiber_reed';
      } else if (sample.biome === 'meadow') {
        if (r < 0.26) kind = 'oak_tree';
        else if (r < 0.46) kind = 'birch_tree';
        else if (r < 0.60) kind = 'berry_bush';
        else if (r < 0.70) kind = 'sunbloom_flower';
        else if (r < 0.82) kind = 'stone_boulder';
        else if (r < 0.92) kind = 'fiber_reed';
        else kind = 'copper_vein';
      } else if (sample.biome === 'pine') {
        if (r < 0.50) kind = 'pine_tree';
        else if (r < 0.66) kind = 'stone_boulder';
        else if (r < 0.79) kind = 'copper_vein';
        else if (r < 0.89) kind = 'iron_vein';
        else kind = 'mushroom_cluster';
      } else if (sample.biome === 'highland') {
        if (r < 0.26) kind = 'pine_tree';
        else if (r < 0.48) kind = 'stone_boulder';
        else if (r < 0.68) kind = 'iron_vein';
        else if (r < 0.82) kind = 'copper_vein';
        else if (r < 0.92) kind = 'ancient_crystal';
        else kind = 'sunbloom_flower';
      } else if (sample.biome === 'volcanic') {
        if (r < 0.36) kind = 'obsidian_vein';
        else if (r < 0.62) kind = 'iron_vein';
        else if (r < 0.84) kind = 'ancient_crystal';
        else kind = 'stone_boulder';
      } else if (sample.biome === 'marsh') {
        if (r < 0.36) kind = 'marsh_tree';
        else if (r < 0.64) kind = 'fiber_reed';
        else if (r < 0.86) kind = 'mushroom_cluster';
        else kind = 'ancient_crystal';
      }

      if (!kind) continue;
      const bp = RESOURCE_NODE_BLUEPRINTS[kind];
      const minGap = kind.endsWith('tree') ? 3.2 : 2.1;
      if (!canPlace(x, z, Math.max(bp.radius, minGap))) continue;
      addNode(kind, x, z);
    }

    return nodes;
  }
}
