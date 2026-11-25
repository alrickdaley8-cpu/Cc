// Animated doors: swing away from whoever opens them, emit sound + noise events.
import { bus } from '../core/events.js';
import { FLOORS } from '../world/levelData.js';
import * as THREE from 'three';

export class Doors {
  constructor(game, doorVis) {
    this.game = game; this.world = game.world; this.vis = doorVis;
    this.anim = new Map(); // door.id -> { from, to, t, dur }
    for (const d of this.world.doors) { d.swing = 1; this.apply(d); }
  }
  center(d) { return new THREE.Vector3(d.x + 0.5, FLOORS[d.floor].y + 1.1, d.z + 0.5); }
  // Choose swing direction so the leaf moves away from the opener.
  chooseSwing(d, from) {
    if (!from) return;
    const v = this.vis.get(d.id); if (!v) return;
    const px = v.pivot.position.x, pz = v.pivot.position.z;
    const ox = from.x - px, oz = from.z - pz;
    let best = 1, bestDot = Infinity;
    for (const s of [1, -1]) {
      const th = v.base + s * Math.PI / 2;
      const dx = Math.cos(th), dz = -Math.sin(th);
      const dot = dx * ox + dz * oz;
      if (dot < bestDot) { bestDot = dot; best = s; }
    }
    d.swing = best;
  }
  open(d, { slow = false, by = 'player', from = null, silent = false } = {}) {
    if (d.kind === 'arch' || d.kind === 'front' && !this.game.flags.frontOpen) return false;
    if (d.open > 0.95) return true;
    if (d.open < 0.05) this.chooseSwing(d, from);
    const dur = slow ? 2.2 : by === 'listener' ? 1.6 : 0.55;
    this.anim.set(d.id, { from: d.open, to: 1, t: 0, dur });
    const pos = this.center(d);
    if (!silent) {
      this.game.audio.play('doorCreak', { pos, slow });
      if (by === 'player') bus.emit('noise', { f: d.floor, x: d.x + 0.5, z: d.z + 0.5, loud: slow ? 1.5 : 3.5, kind: 'door', src: 'player' });
      if (by === 'listener') this.game.caption('doorCreak', pos);
    }
    return true;
  }
  close(d, { slam = false, by = 'player', slow = false } = {}) {
    if (d.kind === 'arch') return;
    this.anim.set(d.id, { from: d.open, to: 0, t: 0, dur: slam ? 0.25 : slow ? 1.6 : 0.6, slam });
    d.closing = true;
    if (by === 'player') bus.emit('noise', { f: d.floor, x: d.x + 0.5, z: d.z + 0.5, loud: slam ? 9 : slow ? 1.2 : 3, kind: 'door', src: 'player' });
  }
  toggle(d, opts) { if (d.open > 0.5) this.close(d, opts); else this.open(d, opts); }
  setOpen(d, v) { d.open = v; this.anim.delete(d.id); this.apply(d); }
  apply(d) {
    const v = this.vis.get(d.id); if (!v) return;
    const ease = d.open;
    v.pivot.rotation.y = v.base + d.swing * ease * (Math.PI / 2) * (d.kind === 'vault' ? 0.95 : 0.92);
  }
  update(dt) {
    for (const [id, a] of this.anim) {
      const d = this.world.doorById.get(id);
      a.t += dt;
      const k = Math.min(1, a.t / a.dur);
      const e = a.to > a.from ? 1 - Math.pow(1 - k, 2) : k * k;
      d.open = a.from + (a.to - a.from) * e;
      this.apply(d);
      if (k >= 1) {
        this.anim.delete(id); d.closing = false;
        if (a.to === 0) {
          const pos = this.center(d);
          if (d.kind === 'vault') { this.game.audio.play('vault', { pos }); this.game.caption('vault', pos); bus.emit('vaultClosed', d); }
          else if (a.slam) { this.game.audio.play('doorSlam', { pos }); this.game.caption('doorSlam', pos); }
          else this.game.audio.play('doorClose', { pos });
        }
      }
    }
  }
  serialize() { return this.world.doors.map((d) => [d.id, d.open, d.unlocked, d.swing]); }
  restore(arr) { for (const [id, open, unlocked, swing] of arr) { const d = this.world.doorById.get(id); d.unlocked = unlocked; d.swing = swing; this.setOpen(d, open); } }
}
