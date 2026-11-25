// Thrown bottles: a simple ballistic projectile that shatters on contact and makes a loud noise
// where it lands — the player's one way to steer the Listener.
import * as THREE from 'three';
import { bus } from '../core/events.js';
import { getMat } from '../world/materials.js';
import { FLOORS } from '../world/levelData.js';

export class Throwables {
  constructor(game) {
    this.game = game; this.list = [];
    this.geo = new THREE.CylinderGeometry(0.035, 0.035, 0.26, 8);
    this.shards = [];
  }
  throw() {
    const g = this.game, p = g.player;
    const dir = p.forward();
    const mesh = new THREE.Mesh(this.geo, getMat('p_glass'));
    mesh.position.copy(g.camera.position).addScaledVector(dir, 0.4);
    g.scene.add(mesh);
    const v = dir.clone().multiplyScalar(9.5); v.y += 2.2;
    this.list.push({ mesh, v, f: p.floor, life: 4 });
    g.audio.play('throw');
  }
  update(dt) {
    const w = this.game.world;
    for (let i = this.list.length - 1; i >= 0; i--) {
      const b = this.list[i];
      b.life -= dt;
      const steps = 4;
      let hit = false;
      for (let s = 0; s < steps && !hit; s++) {
        const h = dt / steps;
        b.v.y -= 9.8 * h;
        const nx = b.mesh.position.x + b.v.x * h, ny = b.mesh.position.y + b.v.y * h, nz = b.mesh.position.z + b.v.z * h;
        const fy = w.resolveHeight(b.f, nx, nz).y;
        const ceil = FLOORS[b.f].y + FLOORS[b.f].ceiling;
        const blocked = w.blocksMove(b.f, Math.floor(nx), Math.floor(nz)) || w.propRects[b.f].some((r) => nx > r.x0 && nx < r.x1 && nz > r.z0 && nz < r.z1 && ny < fy + 0.9);
        if (blocked || ny <= fy + 0.03 || ny >= ceil - 0.05) { hit = true; break; }
        b.mesh.position.set(nx, ny, nz);
      }
      b.mesh.rotation.x += dt * 12; b.mesh.rotation.z += dt * 7;
      if (hit || b.life <= 0) {
        const pos = b.mesh.position;
        this.game.scene.remove(b.mesh);
        this.list.splice(i, 1);
        this.game.audio.play('glass', { pos: pos.clone() });
        this.game.caption('glass', pos);
        bus.emit('noise', { f: b.f, x: pos.x, z: pos.z, loud: 11, kind: 'glass', src: 'bottle' });
        bus.emit('bottleShattered', { f: b.f, x: pos.x, z: pos.z });
      }
    }
  }
}
