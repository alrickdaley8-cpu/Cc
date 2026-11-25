import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../../src/world/grid.js';
import { ROOMS, PROPS, PLAYER_START, TRIGGERS } from '../../src/world/levelData.js';

test('every room is reachable from the player start (doors unlocked)', () => {
  const w = new World();
  for (const d of w.doors) if (d.kind !== 'front') { d.unlocked = true; }
  for (const r of ROOMS) {
    let goal = null;
    for (let z = r.z; z < r.z + r.h && !goal; z++) for (let x = r.x; x < r.x + r.w && !goal; x++) if (w.navWalkable(r.floor, x, z)) goal = { f: r.floor, x: x + 0.5, z: z + 0.5 };
    const p = w.findPath({ f: PLAYER_START.floor, x: PLAYER_START.x, z: PLAYER_START.z }, goal);
    assert.ok(p && p.length, `room ${r.id} unreachable`);
  }
});

test('locked doors gate the study and cellar', () => {
  const w = new World();
  const study = w.roomById.get('study'), lab = w.roomById.get('lab');
  const s = { f: 1, x: 15.5, z: 22.5 };
  assert.equal(w.findPath(s, { f: 1, x: study.x + 1.5, z: study.z + 1.5 }), null);
  assert.equal(w.findPath(s, { f: 0, x: lab.x + 1.5, z: lab.z + 1.5 }), null);
  w.doorById.get('cellar_door').unlocked = true;
  assert.ok(w.findPath(s, { f: 0, x: lab.x + 1.5, z: lab.z + 1.5 }));
});

test('stairs resolve heights continuously and switch floors at midpoint', () => {
  const w = new World();
  const bottom = w.resolveHeight(1, 14.5, 9.9), mid = w.resolveHeight(1, 14.5, 7.0), top = w.resolveHeight(1, 14.5, 4.05);
  assert.ok(Math.abs(bottom.y - 0.06) < 0.1);
  assert.equal(mid.floor, 2); // t = 0.5
  assert.ok(top.y > 3.5 && top.floor === 2);
  const c = w.resolveHeight(1, 11.5, 7.9);
  assert.equal(c.floor, 0); assert.ok(c.y < -3.4);
});

test('line of sight is blocked by walls and closed doors', () => {
  const w = new World();
  assert.equal(w.los(1, 15.5, 22.5, 15.5, 11.5), true); // foyer -> hall through arch
  assert.equal(w.los(1, 15.5, 13.5, 8.5, 13.5), false); // dining door closed
  w.doorById.get('d_dining_hall').open = 1;
  assert.equal(w.los(1, 15.5, 13.5, 8.5, 13.5), true);
});

test('sound is muffled by closed doors and distance', () => {
  const w = new World();
  const a = { f: 1, x: 15.5, z: 13.5 }, b = { f: 1, x: 8.5, z: 13.5 };
  const closed = w.soundCost(a, b, 60);
  w.doorById.get('d_dining_hall').open = 1;
  const open = w.soundCost(a, b, 60);
  assert.ok(open < closed, `${open} < ${closed}`);
  const upstairs = w.soundCost({ f: 2, x: 8.5, z: 8.5 }, { f: 1, x: 8.5, z: 13.5 }, 60);
  assert.ok(upstairs > 6);
});

test('props and triggers sit inside walkable space', () => {
  const w = new World();
  for (const p of PROPS) {
    const x = Math.floor(p.x), z = Math.floor(p.z);
    // wall-mounted things may sit within 0.1 of the wall face: test a point nudged into the room
    let ok = !w.isSolidRaw(p.floor, x, z);
    if (!ok) for (const [dx, dz] of [[0.12, 0], [-0.12, 0], [0, 0.12], [0, -0.12]]) ok ||= !w.isSolidRaw(p.floor, Math.floor(p.x + dx), Math.floor(p.z + dz));
    assert.ok(ok, `prop ${p.t} ${p.id || ''} at ${p.x},${p.z} f${p.floor} is inside a wall`);
  }
  for (const t of TRIGGERS) assert.ok(!w.isSolidRaw(t.floor, t.x, t.z), t.id);
});

test.skip('print maps', () => { const w = new World(); for (const f of [2, 1, 0]) console.log(`floor ${f}\n` + w.ascii(f)); });

test('furniture never disconnects rooms or blocks doors/stairs', () => {
  const w = new World();
  for (const d of w.doors) if (d.kind !== 'front') d.unlocked = true;
  for (const d of w.doors) {
    const k = d.z * w.W + d.x;
    assert.equal(w.propBlocked[d.floor][k], 0, `door ${d.id} blocked by a prop`);
    for (const [dx, dz] of d.axis === 'z' ? [[0, 1], [0, -1]] : [[1, 0], [-1, 0]]) {
      if (w.isSolidRaw(d.floor, d.x + dx, d.z + dz)) continue;
      assert.equal(w.propBlocked[d.floor][(d.z + dz) * w.W + d.x + dx], 0, `tile beside door ${d.id} blocked`);
    }
  }
  // every walkable, non-blocked tile is reachable from the start
  const start = { f: 1, x: 15.5, z: 22.5 };
  let unreachable = [];
  for (let f = 0; f < 3; f++) for (let z = 0; z < w.H; z++) for (let x = 0; x < w.W; x++) {
    if (!w.navWalkable(f, x, z) || w.doorAt(f, x, z)) continue;
    if (!w.findPath(start, { f, x: x + 0.5, z: z + 0.5 })) unreachable.push(`${f}:${x},${z}`);
  }
  assert.deepEqual(unreachable, []);
});
