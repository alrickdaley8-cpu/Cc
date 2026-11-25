// Builds merged static geometry (walls, floors, ceilings, lintels, stairs, baseboards) per floor
// and per material so the whole house renders in a few dozen draw calls.
import * as THREE from 'three';
import { getMat } from './materials.js';
import { FLOORS } from './levelData.js';

export const DOOR_H = 2.2;
export const ARCH_H = 2.45;

// Accumulates quads for one material.
class Batch {
  constructor() { this.pos = []; this.nrm = []; this.uv = []; this.col = []; this.idx = []; }
  // p0..p3 counter-clockwise when seen from the front; uv per vertex; c per vertex (AO)
  quad(p, n, uv, c) {
    const b = this.pos.length / 3;
    for (let i = 0; i < 4; i++) {
      this.pos.push(p[i][0], p[i][1], p[i][2]); this.nrm.push(n[0], n[1], n[2]);
      this.uv.push(uv[i][0], uv[i][1]); const cc = c ? c[i] : 1; this.col.push(cc, cc, cc);
    }
    this.idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
  }
  box(cx, cy, cz, sx, sy, sz, cMul = 1) {
    const x0 = cx - sx / 2, x1 = cx + sx / 2, y0 = cy - sy / 2, y1 = cy + sy / 2, z0 = cz - sz / 2, z1 = cz + sz / 2;
    const c = [cMul, cMul, cMul, cMul];
    this.quad([[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], [0, 1, 0], [[x0, z1], [x1, z1], [x1, z0], [x0, z0]], c);
    this.quad([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], c.map((v) => v * 0.85));
    this.quad([[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], [0, 0, -1], [[x1, y0], [x0, y0], [x0, y1], [x1, y1]], c.map((v) => v * 0.85));
    this.quad([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], [1, 0, 0], [[z1, y0], [z0, y0], [z0, y1], [z1, y1]], c.map((v) => v * 0.8));
    this.quad([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0], [[z0, y0], [z1, y0], [z1, y1], [z0, y1]], c.map((v) => v * 0.8));
  }
  geometry() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nrm, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setIndex(this.idx);
    g.computeBoundingSphere();
    return g;
  }
}

class Batches {
  constructor() { this.map = new Map(); }
  get(k) { if (!this.map.has(k)) this.map.set(k, new Batch()); return this.map.get(k); }
}

const DIRS = [
  { dx: 0, dz: -1, n: [0, 0, 1], name: 'N' },
  { dx: 0, dz: 1, n: [0, 0, -1], name: 'S' },
  { dx: 1, dz: 0, n: [-1, 0, 0], name: 'E' },
  { dx: -1, dz: 0, n: [1, 0, 0], name: 'W' },
];

// Edge segment endpoints (in xz) of the face of tile (x,z) toward direction d, oriented so that
// the quad faces into the tile (counter-clockwise from inside).
function edge(x, z, d) {
  switch (d.name) {
    case 'N': return [[x, z], [x + 1, z]];
    case 'S': return [[x + 1, z + 1], [x, z + 1]];
    case 'E': return [[x + 1, z], [x + 1, z + 1]];
    default: return [[x, z + 1], [x, z]];
  }
}

export function buildLevel(world) {
  const groups = [];
  for (let f = 0; f < FLOORS.length; f++) groups.push(buildFloor(world, f));
  return groups;
}

function wallFace(b, x, z, d, y0, y1, aoBottom = 0.55, aoTop = 0.7, uOff = 0) {
  const [[ax, az], [bx, bz]] = edge(x, z, d);
  const u0 = (d.name === 'N' || d.name === 'S') ? ax : az;
  const u1 = (d.name === 'N' || d.name === 'S') ? bx : bz;
  b.quad([[ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az]], d.n,
    [[u0 + uOff, y0], [u1 + uOff, y0], [u1 + uOff, y1], [u0 + uOff, y1]], [aoBottom, aoBottom, aoTop, aoTop]);
}

function buildFloor(world, f) {
  const fl = FLOORS[f];
  const y = fl.y, ch = fl.ceiling;
  const B = new Batches();
  const W = world.W, H = world.H;
  const solid = (xx, zz) => world.isSolidRaw(f, xx, zz);
  const roomOf = (xx, zz) => {
    const r = world.roomAt(f, xx, zz); if (r) return r;
    for (const d of DIRS) { const rr = world.roomAt(f, xx + d.dx, zz + d.dz); if (rr) return rr; }
    return world.rooms.find((r2) => r2.floor === f);
  };
  // AO at a grid corner: count solid tiles around it.
  const cornerAO = (cx, cz) => {
    let n = 0;
    for (const [ox, oz] of [[-1, -1], [0, -1], [-1, 0], [0, 0]]) if (solid(cx + ox, cz + oz)) n++;
    return 1 - n * 0.16;
  };

  for (let z = 0; z < H; z++) for (let x = 0; x < W; x++) {
    if (solid(x, z)) continue;
    const door = world.doorAt(f, x, z);
    const stair = world.stairAt(x + 0.5, z + 0.5, f);
    const room = roomOf(x, z);
    const isLow = stair && stair.low === f, isHigh = stair && stair.high === f;
    const topY = door ? y + (door.kind === 'arch' ? ARCH_H : DOOR_H) : y + ch;

    // ----- floor -----
    if (!stair) {
      const fb = B.get(room.floorMat);
      const c = [cornerAO(x, z + 1), cornerAO(x + 1, z + 1), cornerAO(x + 1, z), cornerAO(x, z)];
      fb.quad([[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y, z], [x, y, z]], [0, 1, 0], [[x, z + 1], [x + 1, z + 1], [x + 1, z], [x, z]], c);
    }
    // ----- ceiling -----
    if (!isLow || (stair && !isLow)) {
      const cb = B.get(door ? 'trim' : room.ceil);
      const cy = topY;
      const c = door ? [0.7, 0.7, 0.7, 0.7] : [cornerAO(x, z), cornerAO(x + 1, z), cornerAO(x + 1, z + 1), cornerAO(x, z + 1)].map((v) => 0.5 + v * 0.4);
      cb.quad([[x, cy, z], [x + 1, cy, z], [x + 1, cy, z + 1], [x, cy, z + 1]], [0, -1, 0], [[x, z], [x + 1, z], [x + 1, z + 1], [x, z + 1]], c);
    }
    // ----- walls -----
    for (const d of DIRS) {
      const nx = x + d.dx, nz = z + d.dz;
      if (!solid(nx, nz)) {
        // Door lintel faces: a door tile's open sides need a header from doorTop to ceiling.
        if (door && !world.doorAt(f, nx, nz)) {
          const nr = roomOf(nx, nz);
          const nCeil = y + ch;
          if (nCeil > topY + 0.01) {
            // face belongs to neighbour room, facing the neighbour (so normal = -d.n from door tile's perspective)
            const back = DIRS.find((q) => q.dx === -d.dx && q.dz === -d.dz);
            wallFace(B.get(nr.wall), nx, nz, back, topY, nCeil, 0.75, 0.6);
          }
        }
        continue;
      }
      let y0 = y, y1 = topY;
      if (stair) {
        const other = isLow ? stair.high : stair.low;
        const otherSolid = world.isSolidRaw(other, nx, nz);
        if (isLow) { y1 = FLOORS[stair.high].y; }
        else {
          y0 = FLOORS[stair.high].y;
          if (!otherSolid) y0 = FLOORS[stair.low].y + FLOORS[stair.low].ceiling; // slab edge over an opening
          y1 = y + ch;
        }
      }
      if (door) {
        wallFace(B.get('trim'), x, z, d, y0, y1, 0.5, 0.6);
        continue;
      }
      const wallKey = stair ? (stair.walls?.[f] ?? room.wall) : room.wall;
      if (room.wainscot && !stair) {
        wallFace(B.get('wood_panel'), x, z, d, y0, y0 + 1.0, 0.5, 0.8);
        wallFace(B.get(wallKey), x, z, d, y0 + 1.0, y1, 0.85, 0.62);
        // chair rail
        trimStrip(B.get('trim'), x, z, d, y0 + 0.98, 0.06, 0.03);
      } else {
        wallFace(B.get(wallKey), x, z, d, y0, y1, 0.5, 0.65);
      }
      if (!stair && f > 0 && room.floorMat !== 'tile_check') trimStrip(B.get('trim'), x, z, d, y0, 0.14, 0.02);
    }
  }

  // ----- stairs (steps) -----
  for (const s of world.stairs) {
    if (s.low !== f) continue;
    const yLow = FLOORS[s.low].y, yHigh = FLOORS[s.high].y;
    const steps = Math.round((yHigh - yLow) / 0.2);
    const run = Math.abs(s.highEdge - s.lowEdge) / steps;
    const dir = Math.sign(s.highEdge - s.lowEdge);
    const sb = B.get('wood_dark');
    for (let i = 0; i < steps; i++) {
      const top = yLow + (i + 1) * (yHigh - yLow) / steps;
      const a = s.lowEdge + dir * i * run, bb = s.lowEdge + dir * (i + 1) * run;
      const zc = (a + bb) / 2;
      const h = top - yLow;
      if (s.axis === 'z') sb.box(s.x + s.w / 2, yLow + h / 2, zc, s.w, h, run, 0.6 + 0.4 * (i % 2));
      else sb.box(zc, yLow + h / 2, s.z + s.h / 2, run, h, s.h, 0.8);
    }
  }

  const group = new THREE.Group();
  group.name = 'floor' + f;
  for (const [k, b] of B.map) {
    const mesh = new THREE.Mesh(b.geometry(), getMat(k));
    mesh.receiveShadow = true; mesh.castShadow = k !== 'trim' && !k.startsWith('wood') && !k.includes('tile') && k !== 'concrete' && k !== 'stone' && k !== 'grate';
    mesh.matrixAutoUpdate = false;
    mesh.name = `static_${f}_${k}`;
    group.add(mesh);
  }
  return group;
}

// Thin protruding trim strip along the base of a wall face.
function trimStrip(b, x, z, d, y0, h, depth) {
  const [[ax, az], [bx, bz]] = edge(x, z, d);
  const ox = d.n[0] * depth, oz = d.n[2] * depth;
  const u0 = (d.name === 'N' || d.name === 'S') ? ax : az, u1 = (d.name === 'N' || d.name === 'S') ? bx : bz;
  b.quad([[ax + ox, y0, az + oz], [bx + ox, y0, bz + oz], [bx + ox, y0 + h, bz + oz], [ax + ox, y0 + h, az + oz]], d.n, [[u0, 0], [u1, 0], [u1, h], [u0, h]], [0.5, 0.5, 0.8, 0.8]);
  b.quad([[ax + ox, y0 + h, az + oz], [bx + ox, y0 + h, bz + oz], [bx, y0 + h, bz], [ax, y0 + h, az]], [0, 1, 0], [[u0, 0], [u1, 0], [u1, depth], [u0, depth]], [0.9, 0.9, 0.9, 0.9]);
}
