// Looks for the best interactable under the crosshair (distance + view angle + line of sight)
// and exposes a prompt. Targets are registered by the story module.
import * as THREE from 'three';
import { FLOORS } from '../world/levelData.js';

const _v = new THREE.Vector3();

export class Interaction {
  constructor(game) {
    this.game = game;
    this.targets = [];
    this.current = null;
  }
  add(t) { t.enabled = t.enabled ?? (() => true); t.reach = t.reach ?? 2.0; this.targets.push(t); return t; }
  remove(id) { this.targets = this.targets.filter((t) => t.id !== id); }
  get(id) { return this.targets.find((t) => t.id === id); }

  update() {
    const g = this.game, p = g.player, cam = g.camera;
    const fwd = p.forward();
    let best = null, bestScore = -Infinity;
    for (const t of this.targets) {
      if (t.floor !== p.floor && !(t.anyFloor)) continue;
      if (!t.enabled()) continue;
      if (p.hidden && t.id !== p.hidden.id) continue;
      const pos = typeof t.pos === 'function' ? t.pos() : t.pos;
      _v.subVectors(pos, cam.position);
      const d = _v.length();
      if (d > t.reach) continue;
      _v.divideScalar(d || 1);
      const cos = _v.dot(fwd);
      // forgiving cone that tightens with distance; tiny objects need more precision
      const need = t.wide ? 0.55 : 0.9 - Math.min(0.25, 0.32 / Math.max(d, 0.3)) * 0.6;
      if (cos < need && !(p.hidden && t.id === p.hidden.id)) continue;
      if (!p.hidden && !g.world.los(p.floor, cam.position.x, cam.position.z, pos.x, pos.z, true) && !t.ignoreLos) {
        // allow if the target is in the same tile as an adjacent wall (wall-mounted / door)
        if (d > 1.2) continue;
      }
      const score = cos * 2 - d * 0.35 + (t.priority || 0);
      if (score > bestScore) { bestScore = score; best = t; }
    }
    this.current = best;
    return best;
  }
  label() { const t = this.current; if (!t) return null; return typeof t.label === 'function' ? t.label() : t.label; }
  activate() { const t = this.current; if (t && t.action) { t.action(t); return true; } return false; }
}

export const tileCenter = (f, x, z, h = 1.1) => new THREE.Vector3(x + 0.5, FLOORS[f].y + h, z + 0.5);
