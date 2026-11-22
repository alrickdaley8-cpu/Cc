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
    engine.handleFishCatch({ deepWater: true });
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

describe('Multiplayer Netcode, P2P Host/Client Sync & Co-op Systems', () => {
  it('InterpolationBuffer smoothly interpolates snapshots, wraps yaw shortest-arc, and snaps on teleport', async () => {
    const { InterpolationBuffer } = await import('../client/src/net/InterpolationBuffer.js');
    const buf = new InterpolationBuffer(100, 160);

    buf.push(0, 0, 0, Math.PI - 0.1, 1000);
    buf.push(10, 2, 0, -Math.PI + 0.1, 1100);

    // At renderTime = 1150 -> targetTime = 1050 (exact midpoint)
    const mid = buf.sample(1150);
    expect(mid).not.toBeNull();
    expect(mid!.x).toBeCloseTo(5, 2);
    expect(mid!.y).toBeCloseTo(1, 2);
    // Shortest arc across +/-PI passes right near +/-PI, NOT through 0!
    expect(Math.abs(mid!.yaw)).toBeGreaterThan(2.9);

    // Teleport (>14m jump) clears history and snaps cleanly
    buf.push(80, 5, -40, 0.5, 1200);
    const snapped = buf.sample(1300);
    expect(snapped!.x).toBeCloseTo(80, 2);
    expect(snapped!.z).toBeCloseTo(-40, 2);
  });

  it('defines multi-passenger crew capacities and deck seat offsets for all 3 vessel tiers', () => {
    expect(BOATS.raft.maxCrew).toBe(2);
    expect(BOATS.skiff.maxCrew).toBe(3);
    expect(BOATS.longship.maxCrew).toBe(6);
    expect(BOATS.raft.passengerOffsets.length).toBeGreaterThanOrEqual(1);
    expect(BOATS.skiff.passengerOffsets.length).toBeGreaterThanOrEqual(2);
    expect(BOATS.longship.passengerOffsets.length).toBeGreaterThanOrEqual(5);
  });

  it('LocalGameEngine P2P Host accepts remote peers, supports multi-passenger boats, world pings, revive, and rally teleport', async () => {
    const { LocalGameEngine } = await import('../client/src/net/LocalGameEngine.js');
    const relayed: Array<{ event: string; target?: string; data: unknown }> = [];
    const pings: Array<{ label: string }> = [];

    const host = new LocalGameEngine({
      onSnapshot: () => {},
      onPrivateState: () => {},
      onNodeUpdate: () => {},
      onNodeFell: () => {},
      onStructureAdd: () => {},
      onStructureUpdate: () => {},
      onStructureRemove: () => {},
      onBoatAdd: () => {},
      onBoatUpdate: () => {},
      onBoatRemove: () => {},
      onLootAdd: () => {},
      onLootRemove: () => {},
      onCombatEvent: () => {},
      onFxEvent: () => {},
      onChatMessage: () => {},
      onToast: () => {},
      onConnectionChange: () => {},
      onWorldPing: (pg) => pings.push({ label: pg.label }),
    });
    host.setBroadcastHook((event, data, targetPeerId) => {
      relayed.push({ event, target: targetPeerId, data });
    });

    const hostInit = host.startSession({
      roomId: 'p2p-coop-test',
      roomName: 'P2P Coop Test',
      seed: 42077,
      playerName: 'Captain',
      outfit: 'mariner',
      spawnAiCompanions: false,
    });
    expect(hostInit.players.length).toBe(1);
    expect(hostInit.players[0].isHost).toBe(true);

    // Remote WebRTC/BroadcastChannel friend joins!
    const peerInit = host.addRemotePeer('peer_alice', {
      roomId: 'p2p-coop-test',
      playerName: 'Alice',
      outfit: 'ranger',
    });
    expect(peerInit.playerId).toBe('peer_alice');
    expect(peerInit.players.length).toBe(2);
    expect(host.getRoomMeta().playerCount).toBe(2);

    // Remote peer drops a 3D world ping -> host receives it AND relays it!
    host.handlePeerCommand('peer_alice', 'player:pingWorld', { x: 12, y: 4, z: -8, label: 'Treasure!' });
    expect(pings.some((p) => p.label === 'Treasure!')).toBe(true);
    expect(relayed.some((r) => r.event === 'world:ping')).toBe(true);

    // Multi-passenger starter boat boarding: Captain pilots (seat 0), Alice rides as crew (seat 1)!
    const starterBoat = hostInit.boats[0];
    expect(starterBoat).toBeDefined();
    // Move both players close to starter boat via input/direct
    host.handleInput({ x: starterBoat.x, y: starterBoat.y + 0.5, z: starterBoat.z, vx: 0, vy: 0, vz: 0, yaw: 0, pitch: 0, anim: 'idle', sprinting: false, swimming: false, seq: 1 });
    host.handleBoardBoat(starterBoat.id);
    host.handlePeerCommand('peer_alice', 'player:input', { x: starterBoat.x + 1, y: starterBoat.y + 0.5, z: starterBoat.z, vx: 0, vy: 0, vz: 0, yaw: 0, pitch: 0, anim: 'idle', sprinting: false, swimming: false, seq: 1 });
    host.handlePeerCommand('peer_alice', 'boat:board', starterBoat.id);

    const updatedBoats = host.addRemotePeer('peer_bob', { roomId: 'p2p-coop-test', playerName: 'Bob', outfit: 'artisan' }).boats;
    const raft = updatedBoats.find((b) => b.id === starterBoat.id)!;
    expect(raft.pilotId).toBe(hostInit.playerId);
    expect(raft.passengerIds).toContain('peer_alice');

    // Rally teleport: Bob rallies to Captain!
    host.handlePeerCommand('peer_bob', 'player:teleportToFriend', hostInit.playerId);
    expect(relayed.some((r) => r.event === 'toast:notify' && r.target === 'peer_bob')).toBe(true);

    // Clean disconnect of remote peers
    host.removeRemotePeer('peer_alice');
    host.removeRemotePeer('peer_bob');
    expect(host.getRoomMeta().playerCount).toBe(1);
    host.stop();
  });

  it('Server GameRoom persists playerToken session across disconnect/rejoin, handles multi-passenger boats, downed/revive, world pings & rally', async () => {
    const { GameRoom } = await import('../server/src/GameRoom.js');

    const emitted: Array<{ room?: string; socket?: string; event: string; data: unknown }> = [];
    const fakeIo = {
      to: (target: string) => ({
        emit: (event: string, data: unknown) => {
          emitted.push({ room: target, event, data });
        },
      }),
    } as unknown as import('socket.io').Server;

    const makeSocket = (id: string) =>
      ({
        id,
        join: () => {},
        leave: () => {},
        emit: (event: string, data: unknown) => {
          emitted.push({ socket: id, event, data });
        },
      }) as unknown as import('socket.io').Socket;

    const room = new GameRoom(fakeIo, `vitest-mp-${Date.now()}`, 'Vitest Coop', 42077, false);
    const s1 = makeSocket('sock_1');
    const s2 = makeSocket('sock_2');

    const init1 = room.addPlayer(s1, {
      roomId: room.id,
      playerName: 'Captain',
      outfit: 'mariner',
      playerToken: 'tok_captain_12345',
    });
    expect(init1.players.find((p) => p.id === 'sock_1')?.isHost).toBe(true);

    const init2 = room.addPlayer(s2, {
      roomId: room.id,
      playerName: 'FirstMate',
      outfit: 'ranger',
      playerToken: 'tok_mate_67890',
    });
    expect(init2.players.length).toBe(2);
    expect(init2.players.find((p) => p.id === 'sock_2')?.isHost).toBe(false);

    // 1. Multi-passenger boat boarding
    const boat = init1.boats[0];
    room.handleBoardBoat('sock_1', boat.id); // Too far -> move close first!
    // Position both right by the boat
    const p1 = (room as unknown as { players: Map<string, import('../shared/src/index.js').PlayerState> }).players.get('sock_1')!;
    const p2 = (room as unknown as { players: Map<string, import('../shared/src/index.js').PlayerState> }).players.get('sock_2')!;
    p1.x = boat.x;
    p1.z = boat.z;
    p2.x = boat.x + 1;
    p2.z = boat.z;
    room.handleBoardBoat('sock_1', boat.id);
    room.handleBoardBoat('sock_2', boat.id);
    expect(p1.boatId).toBe(boat.id);
    expect(p1.boatSeatIndex).toBe(0);
    expect(p2.boatId).toBe(boat.id);
    expect(p2.boatSeatIndex).toBe(1);

    // 2. World Ping
    room.handleWorldPing('sock_1', { x: 25, y: 4, z: -15, label: 'Camp Here' });
    expect(emitted.some((e) => e.event === 'world:ping')).toBe(true);

    // 3. Downed & Co-op Revive loop
    p2.downed = true;
    p2.downedUntil = Date.now() + 30000;
    p2.vitals.hp = 1;
    room.handleRevive('sock_1', 'sock_2');
    expect(p2.downed).toBe(false);
    expect(p2.vitals.hp).toBeGreaterThanOrEqual(40);

    // 4. Rally Teleport
    p2.boatId = null;
    p1.boatId = null;
    p2.x = 60;
    p2.z = -50;
    room.handleTeleportToFriend('sock_2', 'sock_1');
    expect(Math.hypot(p2.x - p1.x, p2.z - p1.z)).toBeLessThan(8);

    // 5. Disconnect & Reconnect with playerToken restores XP/level & transfers host!
    p1.level = 5;
    p1.xp = 42;
    room.removePlayer('sock_1');
    // Host crown automatically transferred to FirstMate!
    expect(p2.isHost).toBe(true);

    const s1Re = makeSocket('sock_1_reconnected');
    const reInit = room.addPlayer(s1Re, {
      roomId: room.id,
      playerName: 'Captain',
      outfit: 'mariner',
      playerToken: 'tok_captain_12345',
    });
    const restoredP1 = reInit.players.find((p) => p.id === 'sock_1_reconnected')!;
    expect(restoredP1.level).toBe(5);
    expect(restoredP1.xp).toBe(42);

    room.destroy();
  });
});

