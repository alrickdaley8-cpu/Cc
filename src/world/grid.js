// Pure-logic world model: tiles, rooms, doors, stairs, line-of-sight, A* navigation and
// sound propagation. No three.js dependency so it is unit-testable in Node.
import { MAP_W, MAP_H, FLOORS, ROOMS, DOORS, STAIRS, CREAKS, PUDDLES, PROPS } from './levelData.js';
import { worldRects } from './footprints.js';

const W = MAP_W, H = MAP_H, FN = FLOORS.length;
const SQ2 = Math.SQRT2;

export class World {
  constructor() {
    this.W = W; this.H = H;
    this.floors = FLOORS;
    this.solid = []; // per floor Uint8Array (1 = wall)
    this.room = [];  // per floor Int16Array (room index or -1)
    this.rooms = ROOMS.map((r, i) => ({ ...r, index: i }));
    this.roomById = new Map(this.rooms.map((r) => [r.id, r]));
    this.doors = DOORS.map((d) => ({ ...d, open: d.open ?? (d.kind === 'arch' ? 1 : 0), unlocked: !d.locked, axis: 'x', busy: false }));
    this.doorById = new Map(this.doors.map((d) => [d.id, d]));
    this.doorAtKey = new Map();
    this.creak = new Map(); this.puddle = new Set();
    this.stairs = STAIRS;
    for (let f = 0; f < FN; f++) {
      this.solid.push(new Uint8Array(W * H).fill(1));
      this.room.push(new Int16Array(W * H).fill(-1));
    }
    for (const r of this.rooms) {
      for (let z = r.z; z < r.z + r.h; z++) for (let x = r.x; x < r.x + r.w; x++) {
        this.solid[r.floor][z * W + x] = 0; this.room[r.floor][z * W + x] = r.index;
      }
    }
    // Stair tiles are walkable on both connected floors (the stairwell is walled on both maps).
    for (const s of STAIRS) for (let z = s.z; z < s.z + s.h; z++) for (let x = s.x; x < s.x + s.w; x++) {
      this.solid[s.low][z * W + x] = 0; this.solid[s.high][z * W + x] = 0;
    }
    for (const d of this.doors) {
      this.solid[d.floor][d.z * W + d.x] = 0;
      this.doorAtKey.set(this.key(d.floor, d.x, d.z), d);
      // Passage axis: if walls left/right, passage runs along z and the panel spans x.
      const l = this.isSolidRaw(d.floor, d.x - 1, d.z), rgt = this.isSolidRaw(d.floor, d.x + 1, d.z);
      d.axis = (l && rgt) ? 'z' : 'x';
    }
    // Prop colliders: AABBs per floor, plus nav-blocking for tiles whose centre is covered.
    this.propRects = [[], [], []];
    this.propBlocked = [];
    for (let f = 0; f < FN; f++) this.propBlocked.push(new Uint8Array(W * H));
    for (const p of PROPS) for (const r of worldRects(p)) {
      this.propRects[p.floor].push(r);
      for (let z = Math.floor(r.z0); z <= Math.floor(r.z1); z++) for (let x = Math.floor(r.x0); x <= Math.floor(r.x1); x++) {
        if (this.inBounds(x, z) && x + 0.5 > r.x0 - 0.05 && x + 0.5 < r.x1 + 0.05 && z + 0.5 > r.z0 - 0.05 && z + 0.5 < r.z1 + 0.05) this.propBlocked[p.floor][z * W + x] = 1;
      }
    }
    for (const c of CREAKS) this.creak.set(this.key(c.floor, c.x, c.z), c);
    for (const p of PUDDLES) this.puddle.add(this.key(p.floor, p.x, p.z));
  }

  key(f, x, z) { return f * W * H + z * W + x; }
  unkey(k) { const f = Math.floor(k / (W * H)); const r = k - f * W * H; return { f, x: r % W, z: Math.floor(r / W) }; }
  inBounds(x, z) { return x >= 0 && z >= 0 && x < W && z < H; }
  isSolidRaw(f, x, z) { return !this.inBounds(x, z) || this.solid[f][z * W + x] === 1; }
  doorAt(f, x, z) { return this.doorAtKey.get(this.key(f, x, z)); }
  roomAt(f, x, z) {
    x = Math.floor(x); z = Math.floor(z);
    if (!this.inBounds(x, z)) return null;
    const i = this.room[f][z * W + x];
    return i >= 0 ? this.rooms[i] : null;
  }
  roomAtPos(f, x, z) {
    const r = this.roomAt(f, x, z);
    if (r) return r;
    // doors/stairs belong to no room: search neighbours
    for (const [dx, dz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) { const rr = this.roomAt(f, x + dx, z + dz); if (rr) return rr; }
    return null;
  }
  isDoorBlocking(d) { return d.kind !== 'arch' && (d.open < 0.5 || !d.unlocked && d.kind !== 'arch'); }
  // Movement blocking for player/creature collision.
  blocksMove(f, x, z) {
    if (this.isSolidRaw(f, x, z)) return true;
    const d = this.doorAt(f, x, z);
    if (d && d.kind !== 'arch') {
      if (d.kind === 'front') return true;
      return d.open < 0.6;
    }
    return false;
  }
  blocksSight(f, x, z) {
    if (this.isSolidRaw(f, x, z)) return true;
    const d = this.doorAt(f, x, z);
    return !!(d && d.kind !== 'arch' && d.open < 0.35);
  }
  isCreaky(f, x, z) { return this.creak.has(this.key(f, Math.floor(x), Math.floor(z))); }
  isPuddle(f, x, z) { return this.puddle.has(this.key(f, Math.floor(x), Math.floor(z))); }

  // ----- stairs -----
  // f (optional): only stairs that connect to floor f.
  stairAt(x, z, f) {
    for (const s of STAIRS) if (x >= s.x && x < s.x + s.w && z >= s.z && z < s.z + s.h && (f === undefined || f === s.low || f === s.high)) return s;
    return null;
  }
  stairT(s, x, z) {
    const p = s.axis === 'z' ? z : x;
    const t = (p - s.lowEdge) / (s.highEdge - s.lowEdge);
    return t < 0 ? 0 : t > 1 ? 1 : t;
  }
  floorY(f) { return FLOORS[f].y; }
  // Resolve floor + ground height for an entity at (x,z) currently believed to be on floor f.
  resolveHeight(f, x, z) {
    const s = this.stairAt(x, z, f);
    if (s) {
      const t = this.stairT(s, x, z);
      const y = FLOORS[s.low].y + t * (FLOORS[s.high].y - FLOORS[s.low].y);
      return { floor: t < 0.5 ? s.low : s.high, y, stair: s, t };
    }
    return { floor: f, y: FLOORS[f].y, stair: null, t: 0 };
  }
  stairNavFloor(f, x, z) {
    const s = this.stairAt(x + 0.5, z + 0.5, f);
    if (!s) return -1;
    return this.stairT(s, x + 0.5, z + 0.5) < 0.5 ? s.low : s.high;
  }

  // ----- line of sight (grid DDA) -----
  los(f, x0, z0, x1, z1, forSight = true) {
    let cx = Math.floor(x0), cz = Math.floor(z0);
    const tx = Math.floor(x1), tz = Math.floor(z1);
    const dx = x1 - x0, dz = z1 - z0;
    const stepX = dx > 0 ? 1 : -1, stepZ = dz > 0 ? 1 : -1;
    const tDX = dx !== 0 ? Math.abs(1 / dx) : Infinity, tDZ = dz !== 0 ? Math.abs(1 / dz) : Infinity;
    let tMX = dx !== 0 ? (dx > 0 ? (cx + 1 - x0) : (x0 - cx)) * tDX : Infinity;
    let tMZ = dz !== 0 ? (dz > 0 ? (cz + 1 - z0) : (z0 - cz)) * tDZ : Infinity;
    let guard = 0;
    while ((cx !== tx || cz !== tz) && guard++ < 200) {
      if (tMX < tMZ) { cx += stepX; tMX += tDX; } else { cz += stepZ; tMZ += tDZ; }
      if (cx === tx && cz === tz) break;
      if (forSight ? this.blocksSight(f, cx, cz) : this.blocksMove(f, cx, cz)) return false;
    }
    return true;
  }
  // Raycast against walls; returns distance to first solid tile or maxDist.
  raycast(f, x0, z0, dirX, dirZ, maxDist) {
    const step = 0.05;
    for (let d = 0; d < maxDist; d += step) {
      const x = x0 + dirX * d, z = z0 + dirZ * d;
      if (this.blocksSight(f, Math.floor(x), Math.floor(z))) return d;
    }
    return maxDist;
  }

  // ----- navigation -----
  navWalkable(f, x, z, opts) {
    if (!this.inBounds(x, z) || this.solid[f][z * W + x] || this.propBlocked[f][z * W + x]) return false;
    const sf = this.stairNavFloor(f, x, z);
    if (sf >= 0 && sf !== f) return false;
    const d = this.doorAt(f, x, z);
    if (d && d.kind !== 'arch') {
      if (d.kind === 'front') return false;
      if (!d.unlocked) return false;
      if (opts && opts.noClosedDoors && d.open < 0.6) return false;
    }
    return true;
  }
  neighbors(node, opts, out) {
    out.length = 0;
    const { f, x, z } = node;
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dz) continue;
      const nx = x + dx, nz = z + dz;
      if (!this.inBounds(nx, nz)) continue;
      const sf = this.stairNavFloor(f, nx, nz);
      const nf = sf >= 0 ? sf : f;
      if (nf !== f && (dx && dz)) continue; // no diagonal floor transitions
      if (!this.navWalkable(nf, nx, nz, opts)) continue;
      if (dx && dz) {
        // no corner cutting, and never diagonally through door tiles
        if (!this.navWalkable(f, x + dx, z, opts) || !this.navWalkable(f, x, z + dz, opts)) continue;
        if (this.doorAt(nf, nx, nz) || this.doorAt(f, x, z)) continue;
      }
      let cost = dx && dz ? SQ2 : 1;
      const d = this.doorAt(nf, nx, nz);
      if (d && d.kind !== 'arch' && d.open < 0.6) cost += (opts && opts.doorCost != null) ? opts.doorCost : 1.5;
      out.push({ f: nf, x: nx, z: nz, cost });
    }
    return out;
  }
  findPath(start, goal, opts = {}) {
    const sx = Math.floor(start.x), sz = Math.floor(start.z), gx = Math.floor(goal.x), gz = Math.floor(goal.z);
    const sk = this.key(start.f, sx, sz), gk = this.key(goal.f, gx, gz);
    if (!this.navWalkable(goal.f, gx, gz, opts)) return null;
    if (sk === gk) return [{ f: goal.f, x: goal.x, z: goal.z }];
    const g = new Map([[sk, 0]]), came = new Map();
    const open = new MinHeap();
    const h = (x, z) => Math.hypot(x - gx, z - gz);
    open.push(sk, h(sx, sz));
    const nb = [];
    let iter = 0;
    while (open.size && iter++ < 20000) {
      const ck = open.pop();
      if (ck === gk) break;
      const cn = this.unkey(ck);
      const cg = g.get(ck);
      for (const n of this.neighbors(cn, opts, nb)) {
        const nk = this.key(n.f, n.x, n.z);
        const ng = cg + n.cost;
        if (ng < (g.get(nk) ?? Infinity)) { g.set(nk, ng); came.set(nk, ck); open.push(nk, ng + h(n.x, n.z)); }
      }
    }
    if (!came.has(gk)) return null;
    const cells = [];
    for (let k = gk; k !== undefined && k !== sk; k = came.get(k)) cells.push(this.unkey(k));
    cells.reverse();
    const pts = cells.map((c) => ({ f: c.f, x: c.x + 0.5, z: c.z + 0.5 }));
    pts[pts.length - 1] = { f: goal.f, x: goal.x, z: goal.z };
    return this.smoothPath({ f: start.f, x: start.x, z: start.z }, pts);
  }
  // String-pulling: drop waypoints visible from the previous kept one (same floor, no doors, no stairs).
  smoothPath(start, pts) {
    if (pts.length < 3) return pts;
    const out = [];
    let anchor = start;
    for (let i = 0; i < pts.length; i++) {
      const next = pts[i + 1];
      if (!next) { out.push(pts[i]); break; }
      const ok = next.f === anchor.f && !this.stairAt(next.x, next.z, next.f) && !this.stairAt(pts[i].x, pts[i].z, pts[i].f) &&
        !this.doorAt(pts[i].f, Math.floor(pts[i].x), Math.floor(pts[i].z)) &&
        this.corridorClear(anchor.f, anchor.x, anchor.z, next.x, next.z);
      if (!ok) { out.push(pts[i]); anchor = pts[i]; }
    }
    return out;
  }
  // Fat line-of-movement check (approximates entity radius) so smoothed paths don't clip corners.
  corridorClear(f, x0, z0, x1, z1) {
    const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz) || 1;
    const px = -dz / len * 0.3, pz = dx / len * 0.3;
    return this.los(f, x0, z0, x1, z1, false) && this.los(f, x0 + px, z0 + pz, x1 + px, z1 + pz, false) && this.los(f, x0 - px, z0 - pz, x1 - px, z1 - pz, false);
  }
  pathLength(start, path) {
    if (!path) return Infinity;
    let L = 0, p = start;
    for (const q of path) { L += Math.hypot(q.x - p.x, q.z - p.z) + Math.abs(this.floorY(q.f) - this.floorY(p.f)) * 0.5; p = q; }
    return L;
  }

  // ----- sound propagation -----
  // Dijkstra over walkable tiles; closed doors muffle (+cost) but still conduct.
  soundCost(src, dst, maxCost) {
    const sx = Math.floor(src.x), sz = Math.floor(src.z), dx = Math.floor(dst.x), dz = Math.floor(dst.z);
    const direct = Math.hypot(src.x - dst.x, src.z - dst.z) * 2.6 + Math.abs(src.f - dst.f) * 6;
    let best = direct;
    const sk = this.key(src.f, sx, sz), dk = this.key(dst.f, dx, dz);
    if (sk === dk) return 0;
    const dist = new Map([[sk, 0]]);
    const open = new MinHeap(); open.push(sk, 0);
    const nb = [];
    const opts = { doorCost: 0 };
    let iter = 0;
    while (open.size && iter++ < 6000) {
      const ck = open.pop();
      const cd = dist.get(ck);
      if (cd > maxCost || cd >= best) break;
      if (ck === dk) { best = Math.min(best, cd); break; }
      const cn = this.unkey(ck);
      for (const n of this.soundNeighbors(cn, nb, opts)) {
        const nk = this.key(n.f, n.x, n.z);
        const nd = cd + n.cost;
        if (nd < (dist.get(nk) ?? Infinity)) { dist.set(nk, nd); open.push(nk, nd); }
      }
    }
    return best;
  }
  soundNeighbors(node, out) {
    out.length = 0;
    const { f, x, z } = node;
    for (const [ddx, ddz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + ddx, nz = z + ddz;
      if (!this.inBounds(nx, nz)) continue;
      const sf = this.stairNavFloor(f, nx, nz);
      const nf = sf >= 0 ? sf : f;
      if (this.solid[nf][nz * W + nx]) continue;
      let cost = 1;
      const d = this.doorAt(nf, nx, nz);
      if (d && d.kind !== 'arch' && d.open < 0.6) cost += d.kind === 'vault' ? 30 : 4;
      out.push({ f: nf, x: nx, z: nz, cost });
    }
    return out;
  }

  randomWalkableNear(f, x, z, rMin, rMax, rnd = Math.random, filter) {
    for (let i = 0; i < 60; i++) {
      const a = rnd() * Math.PI * 2, r = rMin + rnd() * (rMax - rMin);
      const tx = Math.floor(x + Math.cos(a) * r), tz = Math.floor(z + Math.sin(a) * r);
      if (!this.navWalkable(f, tx, tz) || this.doorAt(f, tx, tz) || this.stairAt(tx + 0.5, tz + 0.5, f)) continue;
      if (filter && !filter(f, tx, tz)) continue;
      return { f, x: tx + 0.5, z: tz + 0.5 };
    }
    return null;
  }
  ascii(f) {
    let s = '';
    for (let z = 0; z < H; z++) {
      for (let x = 0; x < W; x++) {
        const d = this.doorAt(f, x, z);
        if (d) s += d.kind === 'arch' ? 'a' : d.locked ? 'L' : 'D';
        else if (this.stairAt(x + 0.5, z + 0.5, f) && !this.solid[f][z * W + x]) s += '^';
        else s += this.solid[f][z * W + x] ? '#' : (this.creak.has(this.key(f, x, z)) ? ',' : '.');
      }
      s += '\n';
    }
    return s;
  }
}

export class MinHeap {
  constructor() { this.k = []; this.p = []; }
  get size() { return this.k.length; }
  push(key, pri) {
    const k = this.k, p = this.p; let i = k.length; k.push(key); p.push(pri);
    while (i > 0) { const par = (i - 1) >> 1; if (p[par] <= pri) break; k[i] = k[par]; p[i] = p[par]; i = par; }
    k[i] = key; p[i] = pri;
  }
  pop() {
    const k = this.k, p = this.p; const top = k[0]; const lk = k.pop(), lp = p.pop();
    if (k.length) {
      let i = 0; const n = k.length;
      for (;;) {
        let c = 2 * i + 1; if (c >= n) break;
        if (c + 1 < n && p[c + 1] < p[c]) c++;
        if (p[c] >= lp) break;
        k[i] = k[c]; p[i] = p[c]; i = c;
      }
      k[i] = lk; p[i] = lp;
    }
    return top;
  }
}
