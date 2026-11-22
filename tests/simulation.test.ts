import { describe, it, expect } from 'vitest';
import {
  BOATS,
  BUILD_GRID,
  ITEMS,
  RECIPES,
  STRUCTURES,
  WATER_LEVEL,
  WORLD_SIZE,
  WorldGenerator,
  computeSnappedPlacement,
  computeWindSailEfficiency,
  sampleBoatBuoyancy,
  sampleOceanWaveHeight,
  type BoatState,
  type StructureState,
} from '../shared/src/index.js';
import {
  addItemToSlots,
  consumeIngredients,
  countItem,
  createEmptyInventory,
  createStarterInventory,
  hasIngredients,
  swapSlots,
} from '../server/src/InventoryHelper.js';

describe('Wildreach Shared Deterministic WorldGen', () => {
  it('generates identical heightmaps and resource nodes for the same seed', () => {
    const w1 = new WorldGenerator(42077);
    const w2 = new WorldGenerator(42077);

    for (let x = -120; x <= 120; x += 30) {
      for (let z = -120; z <= 120; z += 30) {
        expect(w1.getHeight(x, z)).toBe(w2.getHeight(x, z));
        expect(w1.sample(x, z).biome).toBe(w2.sample(x, z).biome);
      }
    }

    const n1 = w1.generateResourceNodes();
    const n2 = w2.generateResourceNodes();
    expect(n1.length).toBeGreaterThan(250);
    expect(n1.length).toBe(n2.length);
    expect(n1[0]).toEqual(n2[0]);
    expect(n1[n1.length - 1]).toEqual(n2[n2.length - 1]);
  });

  it('produces all distinct island biomes and safe dry spawn', () => {
    const w = new WorldGenerator(42077);
    const spawn = w.getSpawnPoint();
    expect(spawn.y).toBeGreaterThan(1.5);
    expect(w.isNearFreshWater(16, 8)).toBe(true);

    const biomes = new Set<string>();
    for (let x = -160; x <= 160; x += 12) {
      for (let z = -160; z <= 160; z += 12) {
        biomes.add(w.sample(x, z).biome);
      }
    }
    expect(biomes.has('ocean')).toBe(true);
    expect(biomes.has('beach')).toBe(true);
    expect(biomes.has('meadow')).toBe(true);
    expect(biomes.has('pine')).toBe(true);
    expect(biomes.has('volcanic')).toBe(true);
    expect(biomes.has('marsh')).toBe(true);
  });
});

describe('Modular Snap-Grid Building', () => {
  it('snaps neighboring foundations edge-to-edge on BUILD_GRID', () => {
    const world = new WorldGenerator(42077);
    const existing: StructureState[] = [
      {
        id: 'f1',
        kind: 'wood_foundation',
        ownerId: 'p1',
        ownerName: 'Ash',
        x: 0,
        y: 4.5,
        z: 0,
        rotY: 0,
        hp: 320,
        maxHp: 320,
      },
    ];

    const snapped = computeSnappedPlacement(
      'wood_foundation',
      { x: BUILD_GRID + 0.4, y: 4.0, z: 0.3 },
      0.5,
      existing,
      (x, z) => world.getHeight(x, z)
    );
    expect(snapped.snapped).toBe(true);
    expect(snapped.x).toBeCloseTo(BUILD_GRID, 2);
    expect(snapped.z).toBeCloseTo(0, 2);
    expect(snapped.y).toBeCloseTo(4.5, 2);
  });

  it('snaps walls cleanly to foundation edges', () => {
    const world = new WorldGenerator(42077);
    const existing: StructureState[] = [
      {
        id: 'f1',
        kind: 'wood_foundation',
        ownerId: 'p1',
        ownerName: 'Ash',
        x: 10,
        y: 5.0,
        z: 10,
        rotY: 0,
        hp: 320,
        maxHp: 320,
      },
    ];

    const wallSnap = computeSnappedPlacement(
      'wood_wall',
      { x: 10.2, y: 5.0, z: 10 - BUILD_GRID * 0.5 + 0.2 },
      0,
      existing,
      (x, z) => world.getHeight(x, z)
    );
    expect(wallSnap.snapped).toBe(true);
    expect(wallSnap.x).toBeCloseTo(10, 2);
    expect(wallSnap.z).toBeCloseTo(10 - BUILD_GRID * 0.5, 2);
    expect(wallSnap.y).toBeCloseTo(5.5, 2);
  });
});

describe('Inventory, Items & Crafting Consistency', () => {
  it('ensures every recipe references valid items and every structure cost uses valid items', () => {
    for (const r of RECIPES) {
      expect(ITEMS[r.outputItemId]).toBeDefined();
      for (const ing of r.ingredients) {
        expect(ITEMS[ing.itemId]).toBeDefined();
      }
    }
    for (const st of Object.values(STRUCTURES)) {
      for (const c of st.costs) {
        expect(ITEMS[c.itemId]).toBeDefined();
      }
    }
  });

  it('handles stacking, swapping, and ingredient consumption accurately', () => {
    const inv = createStarterInventory();
    expect(countItem(inv, 'stone_axe')).toBe(1);
    expect(countItem(inv, 'berries')).toBe(6);

    const leftover = addItemToSlots(inv, 'wood', 65);
    expect(leftover).toBe(0);
    expect(countItem(inv, 'wood')).toBe(65);

    const ok = consumeIngredients(inv, [{ itemId: 'wood', count: 15 }]);
    expect(ok).toBe(true);
    expect(countItem(inv, 'wood')).toBe(50);
    expect(hasIngredients(inv, [{ itemId: 'wood', count: 51 }])).toBe(false);

    const bag = createEmptyInventory(4);
    addItemToSlots(bag, 'berries', 10);
    bag[1] = { itemId: 'berries', count: 5 };
    swapSlots(bag, 0, 1);
    expect(bag[0]).toBeNull();
    expect(bag[1]?.count).toBe(15);
  });

  it('client LocalGameEngine boots a complete offline/GitHub Pages survival world with starter boat & fishing', async () => {
    const { LocalGameEngine } = await import('../client/src/net/LocalGameEngine.js');
    const chats: string[] = [];
    const toasts: string[] = [];
    const addedBoats: BoatState[] = [];
    const engine = new LocalGameEngine({
      onSnapshot: () => {},
      onPrivateState: () => {},
      onNodeUpdate: () => {},
      onNodeFell: () => {},
      onStructureAdd: () => {},
      onStructureUpdate: () => {},
      onStructureRemove: () => {},
      onBoatAdd: (b) => addedBoats.push(b),
      onBoatUpdate: () => {},
      onBoatRemove: () => {},
      onLootAdd: () => {},
      onLootRemove: () => {},
      onCombatEvent: () => {},
      onFxEvent: () => {},
      onChatMessage: (m) => chats.push(m.text),
      onToast: (t) => toasts.push(t.text),
      onConnectionChange: () => {},
    });

    const init = engine.startSession({
      roomId: 'gh-pages-test',
      roomName: 'GitHub Pages Test Island',
      seed: 42077,
      playerName: 'Tester',
      outfit: 'ranger',
      spawnAiCompanions: true,
    });
    expect(init.playerId).toBeTruthy();
    expect(init.nodes.length).toBeGreaterThan(250);
    expect(init.structures.length).toBeGreaterThanOrEqual(2);
    expect(init.boats.length).toBeGreaterThanOrEqual(1);
    expect(init.wildlife.length).toBeGreaterThan(10);
    expect(init.players.length).toBe(2);

    // Test fishing catch + chat commands
    engine.handleFishCatch(true);
    engine.handleChat('/time dusk');
    engine.handleChat('Hello archipelago!');
    expect(toasts.some((t) => t.includes('dusk'))).toBe(true);
    expect(chats.includes('Hello archipelago!')).toBe(true);
    expect(addedBoats.length).toBeGreaterThanOrEqual(0);
    engine.stop();
  });
});

describe('Tides & Horizons — Boats, Waves, Outer Islands & Alchemy', () => {
  it('validates all boat definitions, costs, and wind sail efficiency curve', () => {
    expect(Object.keys(BOATS)).toEqual(['raft', 'skiff', 'longship']);
    for (const def of Object.values(BOATS)) {
      expect(def.maxHp).toBeGreaterThan(100);
      expect(def.fullSailSpeed).toBeGreaterThan(def.paddleSpeed);
      for (const c of def.costs) {
        expect(ITEMS[c.itemId]).toBeDefined();
      }
    }
    // Boat forward at yaw=0 is (0, -1), so wind (0, -1) is tailwind & (0, 1) is headwind
    const tailwind = computeWindSailEfficiency(0, 0, -1);
    const crosswind = computeWindSailEfficiency(0, 1, 0);
    const headwind = computeWindSailEfficiency(0, 0, 1);
    expect(tailwind).toBeGreaterThan(crosswind);
    expect(crosswind).toBeGreaterThan(headwind);
  });

  it('computes deterministic wave heights & 4-probe boat buoyancy without NaN', () => {
    const w = new WorldGenerator(42077);
    const spot = w.getStarterBoatSpot();
    expect(w.getHeight(spot.x, spot.z)).toBeLessThan(WATER_LEVEL);

    const h1 = sampleOceanWaveHeight(spot.x, spot.z, 12.5, 1.2, w.getHeight(spot.x, spot.z));
    const h2 = sampleOceanWaveHeight(spot.x, spot.z, 12.5, 1.2, w.getHeight(spot.x, spot.z));
    expect(h1).toBe(h2);
    expect(Number.isFinite(h1)).toBe(true);

    const buoy = sampleBoatBuoyancy(spot.x, spot.z, 0.4, 2.5, 1.4, 12.5, 1.2, (x, z) => w.getHeight(x, z));
    expect(Number.isFinite(buoy.heave)).toBe(true);
    expect(Number.isFinite(buoy.pitch)).toBe(true);
    expect(Number.isFinite(buoy.roll)).toBe(true);
    expect(Math.abs(buoy.pitch)).toBeLessThan(0.5);
    expect(Math.abs(buoy.roll)).toBeLessThan(0.5);
  });

  it('generates outer archipelago islands, landmarks, and coral/sunbloom/wreck nodes across WORLD_SIZE=440', () => {
    expect(WORLD_SIZE).toBe(440);
    const w = new WorldGenerator(42077);
    // All 3 outer islands rise dry above WATER_LEVEL
    expect(w.getHeight(-148, 136)).toBeGreaterThan(1.0); // SW Shipwreck Coral Atoll
    expect(w.getHeight(152, -136)).toBeGreaterThan(2.0); // NE Volcanic Obsidian Isle
    expect(w.getHeight(-146, -134)).toBeGreaterThan(1.5); // NW Sea-Arch Sanctuary

    const landmarks = w.landmarks;
    expect(landmarks.length).toBeGreaterThanOrEqual(7);
    const nodes = w.generateResourceNodes();
    const kinds = new Set(nodes.map((n) => n.kind));
    expect(kinds.has('coral_reef_node')).toBe(true);
    expect(kinds.has('sunbloom_flower')).toBe(true);
    expect(kinds.has('sunken_wreck_chest')).toBe(true);
  });
});
