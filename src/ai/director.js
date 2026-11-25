// The Director — "background" AI. Knows where the player is, but never tells the Listener
// exactly; it only points it at a rough area. It shapes pacing with a menace gauge
// (Alien: Isolation) and a Build-Up → Peak → Relax cycle (Left 4 Dead), and stages
// the implication-only phantom events of Act I.
import { bus } from '../core/events.js';
import { clamp } from '../core/rng.js';

const GLASS_WISE = 3; // bottle lures investigated before it starts tracing the throw
const HABIT_WISE = 2; // inspections survived in one spot before it gets suspicious of that spot

const LAIRS = [ // backstage entry/exit points, far corners of each floor
  { f: 2, x: 4.5, z: 2.5 }, { f: 2, x: 26.5, z: 2.5 }, { f: 2, x: 24.5, z: 19.5 }, { f: 2, x: 5.5, z: 16.5 },
  { f: 1, x: 4.5, z: 2.5 }, { f: 1, x: 26.5, z: 22.5 }, { f: 1, x: 26.5, z: 2.5 }, { f: 1, x: 4.5, z: 22.5 },
  { f: 0, x: 3.5, z: 9.5 }, { f: 0, x: 23.5, z: 12.5 }, { f: 0, x: 6.5, z: 9.5 }, { f: 0, x: 3.5, z: 20.5 },
];

export class Director {
  constructor(game) {
    this.game = game; this.world = game.world;
    this.menace = 0;      // 0..1 how pressured the player is right now
    this.intensity = 0;   // slower-moving "emotional intensity" (L4D)
    this.phase = 'idle';  // idle | build | peak | relax
    this.phaseT = 0;
    this.relaxFor = 30;
    this.enabled = false;
    this.phantomT = 25;
    this.history = [];    // pacing log for the gate test
    this.logT = 0;
    this.scripted = false;
    this.resetLearning();
    bus.on('chaseStart', () => { this.intensity = Math.min(1, this.intensity + 0.35); });
    // ---- it learns (Alien: Isolation-style behaviour unlocks, but driven by what *you* keep doing) ----
    bus.on('bottleThrown', (from) => { this.lastThrow = { ...from, t: game.time }; });
    bus.on('glassInvestigated', () => {
      const n = ++this.learn.glass;
      if (n === GLASS_WISE) this.announce('glass');
    });
    bus.on('inspectSurvived', (spot) => {
      const n = (this.learn.spots[spot.id] || 0) + 1; this.learn.spots[spot.id] = n;
      if (n === HABIT_WISE) this.announce('habit');
    });
    bus.on('noise', (n) => { if (n.src === 'player' && n.loud >= 9) this.lastLoud = { ...n, t: game.time }; });
  }

  resetLearning() { this.learn = { glass: 0, spots: {}, told: {} }; this.lastThrow = null; }
  glassWise() { return this.learn.glass >= GLASS_WISE; }
  // habit: a spot you've survived an inspection in twice gets checked more often, and for longer
  inspectChance(base, spot) { return (this.learn.spots[spot.id] || 0) >= HABIT_WISE ? Math.min(1, base + 0.25) : base; }
  inspectBonus(spot) { return (this.learn.spots[spot.id] || 0) >= HABIT_WISE ? 0.75 : 0; } // measured: +1.5 s left 2% breath (unfair)
  // where the bottle came from — blurred, never the exact tile
  throwOrigin() {
    const t = this.lastThrow; if (!t || this.game.time - t.t > 20) return null;
    return this.roughArea({ floor: t.f, x: t.x, z: t.z }, 1, 3);
  }
  announce(kind) {
    if (this.learn.told[kind]) return; this.learn.told[kind] = true;
    // Telegraph every unlock once, so a new behaviour is never an unexplained "cheat".
    const msg = { glass: '[it lingers over the broken glass… then turns toward where it was thrown from]', habit: '[it stays at the door longer than before. It remembers this place.]' }[kind];
    this.game.ui.caption(msg, 5);
    bus.emit('learned', kind);
  }

  start() { this.enabled = true; this.phase = 'relax'; this.phaseT = 0; this.relaxFor = 6; }
  stop() { this.enabled = false; }

  update(dt) {
    const g = this.game, L = g.listener, p = g.player;
    this.phaseT += dt;
    // ---- menace gauge ----
    let target = 0;
    if (L.active) {
      const pd = L.pathDistToPlayer;
      target += clamp(1 - pd / 14, 0, 1) * 0.55;
      if (L.state === 'chase') target += 0.45;
      if (L.seesPlayer) target += 0.25;
      if (L.state === 'search' || L.state === 'investigate') target += 0.1;
    }
    this.menace += (clamp(target, 0, 1) - this.menace) * Math.min(1, dt * 1.5);
    this.intensity = clamp(this.intensity + (this.menace > 0.5 ? dt * 0.05 : -dt * 0.02), 0, 1);
    this.logT -= dt;
    if (this.logT <= 0) { this.logT = 1; this.history.push({ t: Math.round(g.time), menace: +this.menace.toFixed(2), phase: this.phase, state: L.state }); if (this.history.length > 3600) this.history.shift(); }

    if (!this.enabled) { if (!g.flags.listenerAwake) this.updatePhantoms(dt); return; }
    if (this.scripted) return;
    const diff = g.difficulty;

    switch (this.phase) {
      case 'relax':
        // The Listener is backstage. Relief, but never too long; quieter between scares.
        if (L.active && L.state !== 'chase' && L.state !== 'leave' && L.state !== 'scripted') this.sendAway();
        if (this.phaseT > this.relaxFor && !L.active) this.beginBuild();
        break;
      case 'build': {
        // It wanders toward a rough area around the player (never the exact tile).
        if (!L.active) { this.beginBuild(); break; }
        if (L.state === 'chase' || this.menace > 0.55) { this.phase = 'peak'; this.phaseT = 0; break; }
        if (L.bored) this.hint();
        if (this.phaseT > diff.buildMax) { this.phase = 'peak'; this.phaseT = 0; }
        break;
      }
      case 'peak':
        // Let the encounter play out, then force relief (fair: no endless hunting).
        if (L.state !== 'chase' && L.state !== 'kill' && (this.phaseT > diff.peakMax || (this.intensity > 0.85 && this.phaseT > 10))) this.beginRelax();
        else if (L.bored && this.phaseT > 6) this.hint(true);
        break;
    }
  }

  beginBuild() {
    const g = this.game, L = g.listener;
    this.phase = 'build'; this.phaseT = 0;
    if (!L.active) {
      const spawn = this.pickLair();
      if (!spawn) return;
      const goal = this.roughArea(g.player, 4, 8) || spawn;
      L.emerge(spawn, goal);
      // forewarning: an audible "entrance" from the lair, a door or a creak
      g.audio.play('creak', { pos: g.toVec(spawn, 1.2), gain: 0.6, occlusion: 0.6 });
      g.caption('hum', g.toVec(spawn, 1.2));
      bus.emit('listenerEmerged', spawn);
    }
  }
  beginRelax() {
    this.phase = 'relax'; this.phaseT = 0;
    const d = this.game.difficulty;
    this.relaxFor = d.relaxMin + Math.random() * (d.relaxMax - d.relaxMin) - this.intensity * 6;
    if (this.game.flags.cellar) this.relaxFor *= 0.8; // Act III: less breathing room
    this.intensity *= 0.5;
    this.sendAway();
  }
  sendAway() {
    const L = this.game.listener;
    if (!L.active || L.state === 'leave') return;
    // exit through the lair farthest from the player
    const p = this.game.player;
    let best = null, bestD = -1;
    for (const l of LAIRS) {
      if (l.f !== L.f) continue;
      const d = Math.hypot(l.x - p.x, l.z - p.z) + (l.f !== p.floor ? 20 : 0);
      if (d > bestD) { bestD = d; best = l; }
    }
    L.leave(best || LAIRS[0]);
  }
  // Give the Listener a vague area near the player (or near their last loud noise).
  hint(stronger = false) {
    const g = this.game, L = g.listener;
    let c = g.player;
    if (this.lastLoud && g.time - this.lastLoud.t < 8) c = this.lastLoud;
    const goal = this.roughArea({ floor: c.f ?? c.floor, x: c.x, z: c.z }, stronger ? 2 : 4, stronger ? 5 : 8);
    if (goal) L.patrolTo(goal);
  }
  roughArea(p, rMin, rMax) {
    const f = p.floor ?? p.f;
    return this.world.randomWalkableNear(f, p.x, p.z, rMin, rMax) || this.world.randomWalkableNear(f, p.x, p.z, 0, rMax + 3);
  }
  pickLair() {
    const g = this.game, p = g.player;
    const options = [];
    for (const l of LAIRS) {
      const sameFloor = l.f === p.floor;
      const d = Math.hypot(l.x - p.x, l.z - p.z);
      if (sameFloor && d < 9) continue;
      if (sameFloor && this.world.los(l.f, l.x, l.z, p.x, p.z)) continue;
      // is it reachable?
      const path = this.world.findPath(l, { f: p.floor, x: p.x, z: p.z });
      if (!path) continue;
      const len = this.world.pathLength(l, path);
      if (len < 10) continue;
      options.push({ l, score: (sameFloor ? 0 : 12) + Math.abs(len - 18) + Math.random() * 6 });
    }
    options.sort((a, b) => a.score - b.score);
    return options[0]?.l || null;
  }

  // ---- Act I: implication only. Sounds of a presence that is never seen. ----
  updatePhantoms(dt) {
    const g = this.game;
    if (!g.flags.started || g.flags.listenerAwake) return;
    this.phantomT -= dt;
    if (this.phantomT > 0) return;
    this.phantomT = 28 + Math.random() * 30;
    const p = g.player;
    const events = ['steps', 'creak', 'knock', 'hum'];
    const e = events[Math.floor(Math.random() * events.length)];
    // place it on another floor or behind a wall, never in view
    let at = null;
    for (let i = 0; i < 20 && !at; i++) {
      const f = Math.random() < 0.6 ? (p.floor === 2 ? 1 : 2) : p.floor;
      const c = this.world.randomWalkableNear(f, p.x, p.z, 4, 10);
      if (c && !(f === p.floor && this.world.los(f, c.x, c.z, p.x, p.z))) at = c;
    }
    if (!at) return;
    const pos = g.toVec(at, at.f === p.floor ? 1 : 0.2);
    const occ = at.f === p.floor ? 0.5 : 0.25;
    if (e === 'steps') {
      for (let i = 0; i < 4; i++) setTimeout(() => g.audio.play('listenerStep', { pos, occlusion: occ }), i * 900);
      g.caption('listenerStep', pos);
    } else if (e === 'creak') { g.audio.play('creak', { pos, gain: 0.6, occlusion: occ }); g.caption('creak', pos); }
    else if (e === 'knock') { g.audio.play('knock', { pos, n: 3, occlusion: occ }); g.caption('knock', pos); }
    else { g.audio.play('crackle', { pos, dur: 2.5, gain: 0.25 }); g.caption('hum', pos); }
    bus.emit('phantom', { e, at });
  }
}
