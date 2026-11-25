// The Listener — "foreground" AI. It must find the player using its own senses:
//  * hearing: noise events propagate through the house graph (doors muffle, walls bleed)
//  * sight: poor and short-ranged, but it notices light, and a torch beam shone on it
// It never reads the player's position directly; the Director only hints at a rough area.
import * as THREE from 'three';
import { buildListenerBody, animateListener } from './listenerBody.js';
import { bus } from '../core/events.js';
import { clamp } from '../core/rng.js';

const SPEED = { patrol: 1.25, investigate: 1.75, search: 1.0, leave: 1.6, scripted: 1.1 };

export class Listener {
  constructor(game) {
    this.game = game; this.world = game.world;
    this.rig = buildListenerBody();
    this.rig.root.visible = false;
    game.scene.add(this.rig.root);
    this.state = 'dormant'; this.prevState = 'dormant';
    this.f = 1; this.x = 0; this.z = 0; this.y = 0; this.yaw = 0;
    this.path = null; this.pathIdx = 0; this.goal = null; this.repathT = 0;
    this.stateT = 0; this.waitT = 0; this.listenT = 0;
    this.suspicion = 0; this.lastKnown = null; this.lostT = 0;
    this.sawHide = null; this.inspecting = null;
    this.searchCenter = null; this.searchPoints = 0;
    this.stepAcc = 0; this.speed = 0;
    this.seesPlayer = false; this.lit = false;
    this.pathDistToPlayer = Infinity; this.distT = 0;
    this.occlusion = 0; this.agitation = 0; this.silentStalk = false;
    this.scriptCb = null;
    this.killT = 0;
    this.chaseT = 0;
    this.heard = null;
    this.unsubs = [bus.on('noise', (n) => this.onNoise(n))];
  }
  get active() { return this.state !== 'dormant' && this.state !== 'backstage'; }
  pos3() { return new THREE.Vector3(this.x, this.y, this.z); }

  setState(s) { if (s === this.state) return; this.moving = false; this.pendingInspect = null; this.inspecting = null; this.prevState = this.state; this.state = s; this.stateT = 0; bus.emit('listenerState', { state: s, prev: this.prevState }); }

  // ---------- commands (Director / scripts) ----------
  toBackstage() {
    this.setState('backstage'); this.rig.root.visible = false; this.path = null; this.suspicion = 0; this.sawHide = null; this.inspecting = null; this.lastKnown = null;
  }
  emerge(spawn, goal) {
    this.f = spawn.f; this.x = spawn.x; this.z = spawn.z;
    this.y = this.world.resolveHeight(this.f, this.x, this.z).y;
    this.rig.root.visible = true; this.suspicion = 0;
    this.patrolTo(goal);
  }
  patrolTo(goal) { this.bored = false; this.goal = goal; this.path = null; this.setState('patrol'); this.wanders = 2 + Math.floor(Math.random() * 3); }
  investigate(p, fromNoise = true, kind = null) { this.glassLure = kind === 'glass'; this.bored = false; this.goal = { f: p.f, x: p.x, z: p.z }; this.path = null; this.searchCenter = { ...this.goal }; this.setState('investigate'); this.fromNoise = fromNoise; }
  leave(dest) { this.goal = dest; this.path = null; this.setState('leave'); this.suspicion = 0; }
  scripted(points, cb, aware = false) { this.scriptAware = aware; this.script = points.slice(); this.scriptCb = cb; this.goal = this.script.shift(); this.path = null; this.setState('scripted'); this.rig.root.visible = true; }
  placeAt(f, x, z, yaw = 0) { this.f = f; this.x = x; this.z = z; this.yaw = yaw; this.y = this.world.resolveHeight(f, x, z).y; this.rig.root.visible = true; }

  // ---------- senses ----------
  onNoise(n) {
    if (!this.active || this.state === 'kill' || (this.state === 'scripted' && !this.scriptAware)) return;
    const mult = this.game.difficulty.hearing;
    const loud = n.loud * mult;
    const cost = this.world.soundCost(n, { f: this.f, x: this.x, z: this.z }, loud + 1);
    if (cost > loud) return;
    this.heard = { ...n, cost, t: this.game.time };
    bus.emit('listenerHeard', n);
    const closeness = 1 - cost / loud; // 0 = barely heard, 1 = right beside
    if (this.state === 'chase') { if (n.src === 'player') this.lastKnown = { f: n.f, x: n.x, z: n.z }; return; }
    // breath heard while inspecting a hiding place: found you
    if (this.inspecting && n.src === 'player' && (n.kind === 'breath' || n.kind === 'gasp') && this.game.player.hidden === this.inspecting) {
      this.sawHide = this.inspecting; this.startChase(); return;
    }
    if (n.src === 'player') this.suspicion = Math.min(0.95, this.suspicion + closeness * 0.6);
    this.agitation = Math.min(1, this.agitation + 0.3);
    // go and look (unless already investigating something louder & recent)
    if (this.state !== 'investigate' || closeness > 0.2 || n.loud >= 8) this.investigate(n, true, n.kind);
  }

  perceive(dt) {
    const p = this.game.player, w = this.world;
    this.seesPlayer = false; this.lit = false;
    const dx = p.x - this.x, dz = p.z - this.z, d = Math.hypot(dx, dz);
    const sameFloor = p.floor === this.f || (Math.abs(p.y - this.y) < 1.6 && (w.stairAt(p.x, p.z, this.f) || w.stairAt(this.x, this.z, p.floor)));
    this.occlusion = 0.15;
    if (!sameFloor) return;
    const los = d < 22 && w.los(this.f, this.x, this.z, p.x, p.z, true);
    this.occlusion = los ? 1 : d < 3 ? 0.55 : 0.25;
    if (!los || p.hidden) return;
    // facing check (horn points along yaw)
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    const cosA = (dx * fx + dz * fz) / (d || 1);
    const torch = p.torchOn && p.torchIntensity > 0.25;
    const vis = this.game.difficulty.vision;
    const range = (torch ? 10.5 : p.crouching ? 2.6 : 4.2) * vis;
    if (cosA > 0.45 && d < range) this.seesPlayer = true;
    if (d < 1.4) this.seesPlayer = true; // it can feel you breathing on it
    // torch beam on its body
    if (torch && d < 15) {
      const bd = p.forward();
      const tx = this.x - p.x, ty = this.y + 1.7 - (p.ySmooth + p.eye), tz = this.z - p.z;
      const tl = Math.hypot(tx, ty, tz);
      if ((bd.x * tx + bd.y * ty + bd.z * tz) / tl > Math.cos(0.36)) this.lit = true;
    }
    let rate = 0;
    if (this.seesPlayer) rate += (1.4 - d / (range + 0.01)) * 1.3 + (d < 2.5 ? 3 : 0);
    if (this.lit) rate += 1.1;
    if (rate > 0) this.suspicion += rate * dt;
  }

  // ---------- update ----------
  update(dt) {
    const g = this.game;
    if (!this.active) return;
    this.stateT += dt;
    this.agitation = Math.max(0, this.agitation - dt * 0.05);
    if (this.state !== 'kill' && (this.state !== 'scripted' || this.scriptAware)) this.perceive(dt);
    if (!this.seesPlayer && !this.lit) this.suspicion = Math.max(0, this.suspicion - dt * (this.state === 'chase' ? 0 : 0.18));

    const p = g.player;
    // decide
    if (this.state !== 'kill' && this.state !== 'chase' && (this.state !== 'scripted' || this.scriptAware)) {
      if (this.suspicion >= 1) { this.startChase(); }
      else if (this.suspicion > 0.4 && this.state !== 'scripted' && (this.state === 'patrol' || this.state === 'search' || this.state === 'leave') && (this.seesPlayer || this.lit)) {
        // noticed something: stop, turn the horn toward it, then come and look
        this.investigate({ f: p.floor, x: p.x, z: p.z }, false); this.waitT = 0.9; this.listenT = 0.9;
        g.audio.play('inhale', { pos: this.pos3(), occlusion: this.occlusion, gain: 0.7 });
      }
    }

    switch (this.state) {
      case 'patrol': this.doPatrol(dt); break;
      case 'investigate': this.doInvestigate(dt); break;
      case 'search': this.doSearch(dt); break;
      case 'chase': this.doChase(dt); break;
      case 'leave': if (this.follow(dt, SPEED.leave)) { this.toBackstage(); bus.emit('listenerLeft'); } break;
      case 'scripted': if (this.follow(dt, SPEED.scripted * (this.script?.speed || 1))) { if (this.script && this.script.length) { this.goal = this.script.shift(); this.path = null; } else { const cb = this.scriptCb; this.scriptCb = null; if (cb) cb(); } } break;
      case 'kill': this.killT += dt; break;
    }
    this.updateBody(dt);
    this.updateMetrics(dt);
  }

  startChase() {
    const g = this.game;
    if (this.state !== 'chase') { this.chaseCause = this.seesPlayer || this.lit ? 'seen' : 'heard'; g.audio.play('shriek', { pos: this.pos3() }); bus.emit('chaseStart'); }
    this.setState('chase'); this.chaseT = 0; this.lostT = 0; this.path = null;
    this.lastKnown = { f: g.player.floor, x: g.player.x, z: g.player.z };
  }

  doPatrol(dt) {
    if (this.waitT > 0) { this.waitT -= dt; return; }
    if (this.follow(dt, SPEED.patrol * this.game.difficulty.speed)) {
      // arrived: listen, then wander a little around the hinted area
      this.waitT = 1.6 + Math.random() * 2.2; this.listenT = this.waitT;
      if (Math.random() < 0.5) this.game.audio.play('inhale', { pos: this.pos3(), occlusion: this.occlusion, gain: 0.5 });
      this.wanders--;
      const c = this.goal;
      const n = this.wanders > 0 ? this.world.randomWalkableNear(c.f, c.x, c.z, 2, 5) : null;
      if (n) { this.goal = n; this.path = null; }
      else { this.searchCenter = { ...c }; this.searchPoints = 2; this.setState('search'); }
    }
  }
  doInvestigate(dt) {
    if (this.waitT > 0) { this.waitT -= dt; this.faceTowards(this.goal.x, this.goal.z, dt, 5); return; }
    const sp = (this.fromNoise ? SPEED.investigate : SPEED.investigate * 0.85) * this.game.difficulty.speed;
    if (this.follow(dt, sp)) {
      if (this.glassLure) {
        this.glassLure = false;
        const D = this.game.director;
        bus.emit('glassInvestigated'); // counts this lure (and telegraphs the unlock the moment it happens)
        const origin = D.glassWise() ? D.throwOrigin() : null;
        if (origin && origin.f === this.f) {
          // learned: the glass is only where the sound went — not where you are. Search toward the throw.
          this.waitT = 1.4; this.listenT = 1.4; this.goal = origin; this.path = null; this.fromNoise = true;
          this.game.audio.play('inhale', { pos: this.pos3(), occlusion: this.occlusion, gain: 0.8 });
          return;
        }
      }
      this.searchCenter = { ...this.goal }; this.searchPoints = 3 + Math.floor(Math.random() * 3);
      this.setState('search'); this.waitT = 1.5 + Math.random(); this.listenT = this.waitT;
      this.game.audio.play('inhale', { pos: this.pos3(), occlusion: this.occlusion, gain: 0.65 });
    }
  }
  doSearch(dt) {
    const g = this.game;
    if (this.inspecting) {
      // standing at a hiding place, listening hard
      this.faceTowards(this.inspecting.hidePos.x, this.inspecting.hidePos.z, dt, 6);
      this.listenT = 0.5;
      if (this.stateT > this.inspectDur) { if (g.player.hidden === this.inspecting) bus.emit('inspectSurvived', this.inspecting); this.inspecting = null; this.searchPoints = Math.min(this.searchPoints, 1); this.waitT = 0.8; }
      return;
    }
    if (this.waitT > 0) { this.waitT -= dt; return; }
    if (this.moving) {
      if (!this.follow(dt, SPEED.search * g.difficulty.speed)) return;
      this.moving = false;
      if (this.pendingInspect) {
        this.inspecting = this.pendingInspect; this.pendingInspect = null; this.inspectDur = 4.5 + Math.random() * 1.5 + g.director.inspectBonus(this.inspecting); this.stateT = 0;
        g.audio.play('inhale', { pos: this.pos3(), occlusion: 1, gain: 0.9 }); g.caption('inhale', this.pos3()); bus.emit('inspectHide', this.inspecting);
        if (this.sawHide === this.inspecting) this.startChase();
        return;
      }
      this.waitT = 1 + Math.random() * 1.8; this.listenT = this.waitT;
      return;
    }
    // Maybe inspect an occupied hiding place near the search centre. Fair: only if close to where it
    // was drawn, only once per search, and the player can still survive by holding their breath.
    const ps = g.player.hidden;
    this.inspectedRecently = this.inspectedRecently || new Set();
    if (ps && !this.inspectedRecently.has(ps.id) && ps.floor === this.f && Math.hypot(ps.hidePos.x - this.searchCenter.x, ps.hidePos.z - this.searchCenter.z) < 4.5 && Math.random() < g.director.inspectChance(g.difficulty.inspectChance, ps)) {
      this.inspectedRecently.add(ps.id);
      this.goal = { f: ps.floor, x: ps.frontPos.x, z: ps.frontPos.z }; this.path = null; this.moving = true; this.pendingInspect = ps;
      return;
    }
    if (this.searchPoints-- <= 0) {
      this.inspectedRecently = null; this.bored = true; this.wanders = 0; this.goal = { f: this.f, x: this.x, z: this.z };
      this.setState('patrol'); this.waitT = 2; bus.emit('searchEnded'); return;
    }
    const n = this.world.randomWalkableNear(this.searchCenter.f, this.searchCenter.x, this.searchCenter.z, 1, 3.5, Math.random, this.searchFilter || undefined);
    if (n) { this.goal = n; this.path = null; this.moving = true; } else this.waitT = 1;
  }
  atGoal() { return this.goal && Math.hypot(this.goal.x - this.x, this.goal.z - this.z) < 0.4; }

  doChase(dt) {
    const g = this.game, p = g.player;
    this.chaseT += dt;
    if (this.seesPlayer || this.lit) { this.lostT = 0; this.lastKnown = { f: p.floor, x: p.x, z: p.z }; }
    else this.lostT += dt;
    // saw them climb into a wardrobe?
    if (p.hidden && this.lostT < 1.2 && !this.sawHide) this.sawHide = p.hidden;
    if (p.hidden && this.sawHide === p.hidden) {
      this.goal = { f: p.hidden.floor, x: p.hidden.frontPos.x, z: p.hidden.frontPos.z };
      if (this.follow(dt, 3.0 * g.difficulty.speed, true)) { this.setState('kill'); g.onCaught(this, p.hidden); }
      return;
    }
    if (!p.hidden && this.lostT < 0.1) this.goal = { f: p.floor, x: p.x, z: p.z };
    else this.goal = this.lastKnown;
    this.repathT -= dt;
    if (this.repathT <= 0) { this.path = null; this.repathT = 0.5; }
    const arrived = this.follow(dt, g.difficulty.chaseSpeed, true);
    const d = Math.hypot(p.x - this.x, p.z - this.z);
    if (!p.hidden && d < 0.95 && Math.abs(p.y - this.y) < 1.2) { this.setState('kill'); g.onCaught(this, null); return; }
    if ((arrived && !this.seesPlayer) || this.lostT > 6 || this.chaseT > g.difficulty.maxChase) {
      // lost them: search where they were last
      this.suspicion = 0.3; this.sawHide = null;
      this.searchCenter = { ...this.lastKnown }; this.searchPoints = 4; this.setState('search'); this.waitT = 1.5; this.listenT = 1.5;
      g.audio.play('inhale', { pos: this.pos3(), occlusion: this.occlusion, gain: 0.8 });
      bus.emit('chaseEnd');
    }
  }

  // Path following with door opening. Returns true when goal reached.
  follow(dt, speed, fast = false) {
    if (!this.goal) return true;
    if (!this.path) {
      this.path = this.world.findPath({ f: this.f, x: this.x, z: this.z }, this.goal, { doorCost: fast ? 0.5 : 1.5 });
      this.pathIdx = 0;
      if (!this.path) {
        // unreachable goal: snap goal to something near and try once more
        const n = this.world.randomWalkableNear(this.goal.f, this.goal.x, this.goal.z, 0, 2);
        if (n) this.path = this.world.findPath({ f: this.f, x: this.x, z: this.z }, n);
        if (!this.path) { this.speed = 0; return true; }
      }
    }
    if (this.opening) {
      this.speed = 0;
      if (this.opening.open >= 0.6) this.opening = null; else return false;
    }
    const wp = this.path[this.pathIdx];
    if (!wp) return true;
    // door ahead?
    const door = this.world.doorAt(wp.f, Math.floor(wp.x), Math.floor(wp.z)) || this.doorBetween(wp);
    if (door && door.kind !== 'arch' && door.open < 0.6) {
      if (!door.unlocked) { this.path = null; this.goal = null; return true; }
      this.opening = door; this.game.doors.open(door, { slow: !fast, by: 'listener', from: { x: this.x, z: this.z } });
      this.speed = 0; return false;
    }
    const dx = wp.x - this.x, dz = wp.z - this.z, dist = Math.hypot(dx, dz);
    const step = speed * dt;
    if (dist <= step) {
      this.x = wp.x; this.z = wp.z; this.pathIdx++;
      if (this.pathIdx >= this.path.length) { this.path = null; this.speed = speed; return true; }
    } else {
      this.x += (dx / dist) * step; this.z += (dz / dist) * step;
      this.faceTowards(wp.x, wp.z, dt, fast ? 10 : 5);
    }
    const h = this.world.resolveHeight(this.f, this.x, this.z);
    this.f = h.floor; this.y = h.y;
    this.speed = speed;
    // footsteps
    this.stepAcc += step;
    if (this.stepAcc > (fast ? 1.3 : 0.95)) { this.stepAcc = 0; this.game.audio.play('listenerStep', { pos: this.pos3(), occlusion: this.occlusion }); }
    return false;
  }
  doorBetween(wp) {
    // the next tile itself may be a door on our floor
    return this.world.doorAt(this.f, Math.floor(wp.x), Math.floor(wp.z));
  }
  faceTowards(x, z, dt, rate) {
    const target = Math.atan2(x - this.x, z - this.z);
    let d = target - this.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    this.yaw += d * Math.min(1, rate * dt);
  }

  updateBody(dt) {
    const r = this.rig, p = this.game.player;
    r.root.position.set(this.x, this.y, this.z);
    r.root.rotation.y = this.yaw;
    let mode = 'walk';
    if (this.state === 'chase') mode = 'chase';
    else if (this.state === 'kill') mode = 'kill';
    else if (this.listenT > 0 || this.inspecting) mode = 'listen';
    this.listenT = Math.max(0, this.listenT - dt);
    let lookYaw = 0, lookPitch = 0;
    if (this.state === 'chase' || this.state === 'kill' || (this.suspicion > 0.3 && (this.seesPlayer || this.lit))) {
      const a = Math.atan2(p.x - this.x, p.z - this.z) - this.yaw;
      lookYaw = clamp(Math.atan2(Math.sin(a), Math.cos(a)), -1.2, 1.2);
      lookPitch = clamp(-Math.atan2((p.ySmooth + p.eye) - (this.y + 2.2), Math.hypot(p.x - this.x, p.z - this.z)), -0.6, 0.8);
    }
    animateListener(r, dt, { speed: this.speed, mode, lookYaw, lookPitch, time: this.game.time });
  }

  updateMetrics(dt) {
    const p = this.game.player;
    this.distT -= dt;
    if (this.distT <= 0) {
      this.distT = 0.5;
      const path = this.world.findPath({ f: this.f, x: this.x, z: this.z }, { f: p.floor, x: p.x, z: p.z });
      this.pathDistToPlayer = path ? this.world.pathLength({ x: this.x, z: this.z, f: this.f }, path) : 40;
    }
  }

  // State snapshot for audio
  audioState() {
    const p = this.game.player;
    const d = Math.hypot(p.x - this.x, p.z - this.z, (p.y - this.y) * 1.5);
    let hum = this.state === 'chase' ? 0.55 : this.state === 'kill' ? 0.8 : 0.32;
    // Act III: when it is stalking close it holds its breath — the hum (a cue players learned to trust) goes silent.
    this.silentStalk = this.game.flags.cellar && (this.state === 'investigate' || this.state === 'search') && d < 7 && !this.inspecting;
    if (this.silentStalk) hum *= 0.05;
    return { active: this.active && this.rig.root.visible, x: this.x, y: this.y + 2.0, z: this.z, humGain: hum, occlusion: this.occlusion, agitation: this.agitation, dist: d };
  }
}
