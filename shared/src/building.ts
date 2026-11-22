import type { StructureKind, StructureState, Vec3 } from './types.js';

export const BUILD_GRID = 3.2; // 3.2m modular Valheim/Rust-style foundation grid
export const WALL_HEIGHT = 2.8;

export interface StructureDef {
  kind: StructureKind;
  name: string;
  description: string;
  category: 'stations' | 'structure' | 'defense' | 'utility';
  maxHp: number;
  costs: { itemId: string; count: number }[];
  requiresWorkbench?: boolean;
  snapGroup: 'free' | 'foundation' | 'wall' | 'roof';
  width: number;
  height: number;
  depth: number;
  solidCollision: boolean;
  providesShelter?: boolean;
  warmthRadius?: number;
  stationRadius?: number;
}

export const STRUCTURES: Record<StructureKind, StructureDef> = {
  campfire: {
    kind: 'campfire',
    name: 'Campfire',
    description: 'Cooks food, radiates cozy warmth, and scares off Shadow Stalkers.',
    category: 'stations',
    maxHp: 120,
    costs: [
      { itemId: 'wood', count: 6 },
      { itemId: 'stone', count: 5 },
    ],
    snapGroup: 'free',
    width: 1.4,
    height: 0.6,
    depth: 1.4,
    solidCollision: false,
    warmthRadius: 9.5,
    stationRadius: 5.5,
  },
  workbench: {
    kind: 'workbench',
    name: 'Workbench',
    description: 'Crafting station unlocking bows, armor, and modular building.',
    category: 'stations',
    maxHp: 220,
    costs: [
      { itemId: 'wood', count: 12 },
      { itemId: 'stone', count: 4 },
    ],
    snapGroup: 'free',
    width: 1.9,
    height: 1.1,
    depth: 1.1,
    solidCollision: true,
    stationRadius: 16,
  },
  furnace: {
    kind: 'furnace',
    name: 'Stone Furnace',
    description: 'Smelts Copper & Iron ores and forges Tier 2 iron equipment.',
    category: 'stations',
    maxHp: 380,
    costs: [
      { itemId: 'stone', count: 16 },
      { itemId: 'coal', count: 4 },
      { itemId: 'wood', count: 6 },
    ],
    requiresWorkbench: true,
    snapGroup: 'free',
    width: 1.8,
    height: 2.3,
    depth: 1.8,
    solidCollision: true,
    warmthRadius: 8,
    stationRadius: 9,
  },
  runic_forge: {
    kind: 'runic_forge',
    name: 'Runic Forge',
    description: 'Channels Ancient Shards to craft endgame Shadowsteel & Starlight gear.',
    category: 'stations',
    maxHp: 520,
    costs: [
      { itemId: 'iron_ingot', count: 4 },
      { itemId: 'obsidian', count: 3 },
      { itemId: 'ancient_shard', count: 2 },
    ],
    requiresWorkbench: true,
    snapGroup: 'free',
    width: 2.0,
    height: 2.0,
    depth: 2.0,
    solidCollision: true,
    warmthRadius: 7,
    stationRadius: 9,
  },
  wood_foundation: {
    kind: 'wood_foundation',
    name: 'Timber Foundation',
    description: 'Elevated log platform. Snaps seamlessly to neighboring foundations.',
    category: 'structure',
    maxHp: 320,
    costs: [{ itemId: 'wood', count: 6 }],
    snapGroup: 'foundation',
    width: BUILD_GRID,
    height: 0.55,
    depth: BUILD_GRID,
    solidCollision: false,
  },
  wood_wall: {
    kind: 'wood_wall',
    name: 'Timber Wall',
    description: 'Solid plank fortification. Snaps cleanly to foundation edges.',
    category: 'structure',
    maxHp: 280,
    costs: [{ itemId: 'wood', count: 5 }],
    snapGroup: 'wall',
    width: BUILD_GRID,
    height: WALL_HEIGHT,
    depth: 0.35,
    solidCollision: true,
    providesShelter: true,
  },
  wood_doorway: {
    kind: 'wood_doorway',
    name: 'Timber Doorway',
    description: 'Framed cabin door you can swing open and shut with [E].',
    category: 'structure',
    maxHp: 250,
    costs: [
      { itemId: 'wood', count: 6 },
      { itemId: 'fiber', count: 2 },
    ],
    snapGroup: 'wall',
    width: BUILD_GRID,
    height: WALL_HEIGHT,
    depth: 0.35,
    solidCollision: true,
    providesShelter: true,
  },
  wood_roof: {
    kind: 'wood_roof',
    name: 'Timber Roof',
    description: 'Shingled shelter roof protecting against chilling rainstorms.',
    category: 'structure',
    maxHp: 240,
    costs: [{ itemId: 'wood', count: 5 }],
    snapGroup: 'roof',
    width: BUILD_GRID + 0.3,
    height: 0.45,
    depth: BUILD_GRID + 0.3,
    solidCollision: false,
    providesShelter: true,
  },
  wood_stairs: {
    kind: 'wood_stairs',
    name: 'Timber Steps',
    description: 'Walkable wooden steps up onto elevated foundations.',
    category: 'structure',
    maxHp: 200,
    costs: [{ itemId: 'wood', count: 5 }],
    snapGroup: 'foundation',
    width: BUILD_GRID * 0.85,
    height: 1.2,
    depth: BUILD_GRID * 0.85,
    solidCollision: false,
  },
  stone_wall: {
    kind: 'stone_wall',
    name: 'Stone Battlement',
    description: 'Heavy masonry wall capable of halting packs of wolves and stalkers.',
    category: 'defense',
    maxHp: 680,
    costs: [
      { itemId: 'stone', count: 10 },
      { itemId: 'wood', count: 2 },
    ],
    requiresWorkbench: true,
    snapGroup: 'wall',
    width: BUILD_GRID,
    height: WALL_HEIGHT,
    depth: 0.55,
    solidCollision: true,
    providesShelter: true,
  },
  spike_barricade: {
    kind: 'spike_barricade',
    name: 'Spike Palisade',
    description: 'Sharpened wooden stakes that injure hostile creatures on contact.',
    category: 'defense',
    maxHp: 260,
    costs: [
      { itemId: 'wood', count: 7 },
      { itemId: 'flint', count: 2 },
    ],
    snapGroup: 'free',
    width: 2.6,
    height: 1.6,
    depth: 0.9,
    solidCollision: true,
  },
  storage_chest: {
    kind: 'storage_chest',
    name: 'Shared Chest',
    description: '12-slot sturdy chest to store and share gear with teammates.',
    category: 'utility',
    maxHp: 240,
    costs: [
      { itemId: 'wood', count: 8 },
      { itemId: 'fiber', count: 4 },
    ],
    snapGroup: 'free',
    width: 1.25,
    height: 0.85,
    depth: 0.8,
    solidCollision: true,
  },
  bedroll: {
    kind: 'bedroll',
    name: 'Camp Bedroll',
    description: 'Sets your respawn point so you wake safely back at base.',
    category: 'utility',
    maxHp: 120,
    costs: [
      { itemId: 'fiber', count: 8 },
      { itemId: 'hide', count: 2 },
    ],
    snapGroup: 'free',
    width: 1.2,
    height: 0.3,
    depth: 2.1,
    solidCollision: false,
  },
  rain_collector: {
    kind: 'rain_collector',
    name: 'Dew & Rain Collector',
    description: 'Gathers clean freshwater over time; press [E] to drink.',
    category: 'utility',
    maxHp: 180,
    costs: [
      { itemId: 'wood', count: 6 },
      { itemId: 'hide', count: 3 },
      { itemId: 'rope', count: 1 },
    ],
    snapGroup: 'free',
    width: 1.5,
    height: 1.6,
    depth: 1.5,
    solidCollision: true,
  },
  lantern_post: {
    kind: 'lantern_post',
    name: 'Resin Lantern Post',
    description: 'Tall glowing beacon illuminating paths and camp perimeters.',
    category: 'utility',
    maxHp: 160,
    costs: [
      { itemId: 'wood', count: 4 },
      { itemId: 'resin', count: 3 },
      { itemId: 'stone', count: 2 },
    ],
    snapGroup: 'free',
    width: 0.6,
    height: 3.2,
    depth: 0.6,
    solidCollision: true,
    warmthRadius: 5.5,
  },
  watchtower_beacon: {
    kind: 'watchtower_beacon',
    name: 'Starlight Beacon',
    description: 'Towering runic brazier visible across the island. Repels night threats.',
    category: 'defense',
    maxHp: 900,
    costs: [
      { itemId: 'stone', count: 16 },
      { itemId: 'iron_ingot', count: 4 },
      { itemId: 'ancient_shard', count: 3 },
    ],
    requiresWorkbench: true,
    snapGroup: 'free',
    width: 2.2,
    height: 5.4,
    depth: 2.2,
    solidCollision: true,
    warmthRadius: 18,
  },
};

export const BUILDABLE_LIST: StructureKind[] = [
  'campfire',
  'workbench',
  'wood_foundation',
  'wood_wall',
  'wood_doorway',
  'wood_roof',
  'wood_stairs',
  'storage_chest',
  'bedroll',
  'rain_collector',
  'lantern_post',
  'spike_barricade',
  'stone_wall',
  'furnace',
  'runic_forge',
  'watchtower_beacon',
];

/**
 * Computes smart snapped placement for foundations, walls, and roofs
 * shared identically by client ghost preview and server placement validation.
 */
export function computeSnappedPlacement(
  kind: StructureKind,
  rawPos: Vec3,
  desiredRotY: number,
  structures: StructureState[],
  terrainHeightFn: (x: number, z: number) => number
): { x: number; y: number; z: number; rotY: number; snapped: boolean } {
  const def = STRUCTURES[kind];
  let bestX = rawPos.x;
  let bestY = terrainHeightFn(rawPos.x, rawPos.z);
  let bestZ = rawPos.z;
  let bestRotY = desiredRotY;
  let snapped = false;

  // Raise free items placed atop a foundation
  if (def.snapGroup === 'free') {
    for (const s of structures) {
      if (s.kind === 'wood_foundation') {
        const dx = Math.abs(rawPos.x - s.x);
        const dz = Math.abs(rawPos.z - s.z);
        if (dx < BUILD_GRID * 0.5 && dz < BUILD_GRID * 0.5) {
          bestY = Math.max(bestY, s.y + 0.52);
        }
      }
    }
    return { x: bestX, y: bestY, z: bestZ, rotY: bestRotY, snapped: false };
  }

  let bestDist = 2.4;

  if (def.snapGroup === 'foundation') {
    for (const s of structures) {
      if (s.kind !== 'wood_foundation') continue;
      const cos = Math.cos(s.rotY);
      const sin = Math.sin(s.rotY);
      const offsets: [number, number][] = [
        [BUILD_GRID, 0],
        [-BUILD_GRID, 0],
        [0, BUILD_GRID],
        [0, -BUILD_GRID],
      ];
      for (const [ox, oz] of offsets) {
        const cx = s.x + ox * cos - oz * sin;
        const cz = s.z + ox * sin + oz * cos;
        const d = Math.hypot(rawPos.x - cx, rawPos.z - cz);
        if (d < bestDist) {
          bestDist = d;
          bestX = cx;
          bestY = s.y;
          bestZ = cz;
          bestRotY = s.rotY;
          snapped = true;
        }
      }
    }
    if (!snapped) {
      bestY = terrainHeightFn(rawPos.x, rawPos.z) + 0.25;
    }
  } else if (def.snapGroup === 'wall') {
    for (const s of structures) {
      if (s.kind !== 'wood_foundation') continue;
      const cos = Math.cos(s.rotY);
      const sin = Math.sin(s.rotY);
      const half = BUILD_GRID * 0.5;
      const edges: [number, number, number][] = [
        [0, -half, s.rotY],
        [0, half, s.rotY + Math.PI],
        [half, 0, s.rotY + Math.PI / 2],
        [-half, 0, s.rotY - Math.PI / 2],
      ];
      for (const [ox, oz, erot] of edges) {
        const cx = s.x + ox * cos - oz * sin;
        const cz = s.z + ox * sin + oz * cos;
        const d = Math.hypot(rawPos.x - cx, rawPos.z - cz);
        if (d < bestDist) {
          bestDist = d;
          bestX = cx;
          bestY = s.y + 0.5;
          bestZ = cz;
          bestRotY = erot;
          snapped = true;
        }
      }
    }
  } else if (def.snapGroup === 'roof') {
    for (const s of structures) {
      if (s.kind !== 'wood_foundation') continue;
      const d = Math.hypot(rawPos.x - s.x, rawPos.z - s.z);
      if (d < bestDist + 0.6) {
        bestDist = d;
        bestX = s.x;
        bestY = s.y + 0.5 + WALL_HEIGHT;
        bestZ = s.z;
        bestRotY = s.rotY;
        snapped = true;
      }
    }
    if (!snapped) {
      bestY = terrainHeightFn(rawPos.x, rawPos.z) + WALL_HEIGHT;
    }
  }

  return {
    x: Math.round(bestX * 100) / 100,
    y: Math.round(bestY * 100) / 100,
    z: Math.round(bestZ * 100) / 100,
    rotY: Math.round(bestRotY * 1000) / 1000,
    snapped,
  };
}
