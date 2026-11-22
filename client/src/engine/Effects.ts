import * as THREE from 'three';
import {
  getItem,
  type LootDropState,
  type ProjectileState,
  type WorldTimeState,
} from '@wildreach/shared';
import type { ProceduralTextureSet } from './Textures';

interface Particle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  gravity: number;
}

interface FallingTree {
  obj: THREE.Object3D;
  axis: THREE.Vector3;
  angle: number;
  speed: number;
  life: number;
}

export class EffectsManager {
  readonly group = new THREE.Group();
  readonly lootGroup = new THREE.Group();
  private particles: Particle[] = [];
  private fallingTrees: FallingTree[] = [];
  private lootMeshes = new Map<string, { mesh: THREE.Group; baseY: number }>();
  private projMeshes = new Map<string, THREE.Group>();
  private rainLines: THREE.LineSegments;
  private rainMat: THREE.LineBasicMaterial;
  private fireflies: THREE.Points;
  private fireflyMat: THREE.PointsMaterial;
  private seagulls: THREE.Group[] = [];
  private chipGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
  private campfireSmokeTimer = 0;

  constructor(scene: THREE.Scene, textures: ProceduralTextureSet) {
    this.group.add(this.lootGroup);

    // 1. Rain streak system
    const rainCount = 650;
    const rPos = new Float32Array(rainCount * 6);
    for (let i = 0; i < rainCount; i++) {
      const rx = (Math.random() - 0.5) * 65;
      const ry = Math.random() * 28;
      const rz = (Math.random() - 0.5) * 65;
      rPos[i * 6] = rx;
      rPos[i * 6 + 1] = ry;
      rPos[i * 6 + 2] = rz;
      rPos[i * 6 + 3] = rx - 0.18;
      rPos[i * 6 + 4] = ry - 1.15;
      rPos[i * 6 + 5] = rz - 0.1;
    }
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
    this.rainMat = new THREE.LineBasicMaterial({
      color: '#bdd8f2',
      transparent: true,
      opacity: 0,
    });
    this.rainLines = new THREE.LineSegments(rGeo, this.rainMat);
    this.rainLines.frustumCulled = false;
    this.group.add(this.rainLines);

    // 2. Magical night fireflies drifting around the player
    const ffCount = 90;
    const ffPos = new Float32Array(ffCount * 3);
    for (let i = 0; i < ffCount; i++) {
      ffPos[i * 3] = (Math.random() - 0.5) * 55;
      ffPos[i * 3 + 1] = 0.8 + Math.random() * 4.5;
      ffPos[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }
    const ffGeo = new THREE.BufferGeometry();
    ffGeo.setAttribute('position', new THREE.BufferAttribute(ffPos, 3));
    this.fireflyMat = new THREE.PointsMaterial({
      map: textures.softParticle,
      color: '#b8ff6b',
      size: 0.45,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.fireflies = new THREE.Points(ffGeo, this.fireflyMat);
    this.fireflies.frustumCulled = false;
    this.group.add(this.fireflies);

    // 3. Ambient circling coastal seagulls
    const wingMat = new THREE.MeshBasicMaterial({ color: '#f8fafc', side: THREE.DoubleSide });
    for (let i = 0; i < 9; i++) {
      const bird = new THREE.Group();
      const lWing = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.25), wingMat);
      lWing.position.x = -0.45;
      lWing.rotation.x = Math.PI / 2;
      const rWing = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.25), wingMat);
      rWing.position.x = 0.45;
      rWing.rotation.x = Math.PI / 2;
      bird.add(lWing, rWing);
      bird.userData = {
        angle: (i / 9) * Math.PI * 2,
        radius: 36 + (i % 3) * 26,
        height: 24 + (i % 4) * 5,
        speed: 0.14 + (i % 3) * 0.04,
        lWing,
        rWing,
      };
      this.seagulls.push(bird);
      this.group.add(bird);
    }

    scene.add(this.group);
  }

  spawnBurst(
    x: number,
    y: number,
    z: number,
    color: string,
    count = 10,
    speed = 4.2,
    gravity = 12
  ): void {
    const mat = new THREE.MeshBasicMaterial({ color });
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(this.chipGeo, mat);
      m.position.set(x, y, z);
      const scale = 0.55 + Math.random() * 0.9;
      m.scale.setScalar(scale);
      this.group.add(m);
      this.particles.push({
        mesh: m,
        vx: (Math.random() - 0.5) * speed * 1.4,
        vy: 1.5 + Math.random() * speed,
        vz: (Math.random() - 0.5) * speed * 1.4,
        life: 0.45 + Math.random() * 0.45,
        maxLife: 0.9,
        gravity,
      });
    }
  }

  spawnFallingTree(clone: THREE.Object3D, dirX: number, dirZ: number): void {
    // Axis perpendicular to fall direction
    const axis = new THREE.Vector3(-dirZ, 0, dirX).normalize();
    this.group.add(clone);
    this.fallingTrees.push({
      obj: clone,
      axis,
      angle: 0,
      speed: 0.35,
      life: 1.65,
    });
  }

  syncLootAll(list: LootDropState[]): void {
    for (const l of list) this.addLoot(l);
  }

  addLoot(drop: LootDropState): void {
    if (this.lootMeshes.has(drop.id)) return;
    const item = getItem(drop.itemId);
    const col = item?.accentColor ?? '#fbbf24';
    const g = new THREE.Group();
    const gem = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.45,
        roughness: 0.35,
      })
    );
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.34, 14),
      new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: 0.65 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.22;
    g.add(gem, ring);
    g.position.set(drop.x, drop.y + 0.3, drop.z);
    g.traverse((o) => {
      o.userData.lootId = drop.id;
      o.userData.lootItemId = drop.itemId;
      o.userData.lootCount = drop.count;
    });
    this.lootGroup.add(g);
    this.lootMeshes.set(drop.id, { mesh: g, baseY: drop.y + 0.32 });
  }

  removeLoot(id: string): void {
    const entry = this.lootMeshes.get(id);
    if (!entry) return;
    this.lootGroup.remove(entry.mesh);
    this.lootMeshes.delete(id);
  }

  syncProjectiles(list: ProjectileState[]): void {
    const seen = new Set<string>();
    for (const pr of list) {
      seen.add(pr.id);
      let mesh = this.projMeshes.get(pr.id);
      if (!mesh) {
        mesh = new THREE.Group();
        const isStar = pr.kind === 'starlight_bolt';
        const shaft = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 1.05, 5),
          new THREE.MeshBasicMaterial({ color: isStar ? '#38f2dc' : '#e6d5b8' })
        );
        shaft.rotation.x = Math.PI / 2;
        mesh.add(shaft);
        if (isStar) {
          const glow = new THREE.PointLight('#38f2dc', 2.2, 7, 2);
          mesh.add(glow);
        }
        this.group.add(mesh);
        this.projMeshes.set(pr.id, mesh);
      }
      mesh.position.set(pr.x, pr.y, pr.z);
      mesh.lookAt(pr.x + pr.vx, pr.y + pr.vy, pr.z + pr.vz);
    }
    for (const [id, mesh] of Array.from(this.projMeshes.entries())) {
      if (!seen.has(id)) {
        this.group.remove(mesh);
        this.projMeshes.delete(id);
      }
    }
  }

  update(
    dt: number,
    elapsed: number,
    time: WorldTimeState,
    anchor: THREE.Vector3,
    campfirePositions: THREE.Vector3[]
  ): void {
    // 1. Burst particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.group.remove(p.mesh);
        this.particles.splice(i, 1);
        continue;
      }
      p.vy -= p.gravity * dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += dt * 7;
      p.mesh.rotation.y += dt * 5;
      p.mesh.scale.setScalar(Math.max(0.05, p.life / p.maxLife));
    }

    // 2. Campfire rising ember/smoke particles
    this.campfireSmokeTimer -= dt;
    if (this.campfireSmokeTimer <= 0) {
      this.campfireSmokeTimer = 0.18;
      for (const pos of campfirePositions) {
        if (pos.distanceTo(anchor) < 42) {
          this.spawnBurst(pos.x, pos.y + 0.7, pos.z, Math.random() > 0.4 ? '#ff9b30' : '#94a3b8', 1, 0.9, -1.8);
        }
      }
    }

    // 3. Falling trees physics easing
    for (let i = this.fallingTrees.length - 1; i >= 0; i--) {
      const ft = this.fallingTrees[i];
      ft.life -= dt;
      ft.speed += dt * 2.8;
      const step = Math.min(Math.PI * 0.48 - ft.angle, ft.speed * dt);
      if (step > 0) {
        ft.obj.rotateOnWorldAxis(ft.axis, step);
        ft.angle += step;
      }
      if (ft.life <= 0) {
        this.spawnBurst(ft.obj.position.x, ft.obj.position.y + 1.2, ft.obj.position.z, '#5a8f41', 12, 5.2, 9);
        this.group.remove(ft.obj);
        this.fallingTrees.splice(i, 1);
      }
    }

    // 4. Bobbing world loot
    for (const entry of this.lootMeshes.values()) {
      entry.mesh.rotation.y = elapsed * 2.1;
      entry.mesh.position.y = entry.baseY + Math.sin(elapsed * 3.2 + entry.mesh.position.x) * 0.14;
    }

    // 5. Weather Rain Streaks
    const rainAlpha =
      time.weather === 'storm'
        ? 0.55 * time.weatherIntensity
        : time.weather === 'rain'
        ? 0.36 * time.weatherIntensity
        : 0;
    this.rainMat.opacity = rainAlpha;
    if (rainAlpha > 0.02) {
      this.rainLines.position.set(anchor.x, anchor.y, anchor.z);
      const pos = this.rainLines.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i += 2) {
        let y = pos.getY(i) - dt * 26;
        if (y < -4) y = 24;
        pos.setY(i, y);
        pos.setY(i + 1, y - 1.15);
      }
      pos.needsUpdate = true;
    }

    // 6. Night Fireflies
    const isNight = time.timeOfDay < 0.24 || time.timeOfDay > 0.76;
    const targetFF = isNight && rainAlpha < 0.1 ? 0.85 : 0;
    this.fireflyMat.opacity += (targetFF - this.fireflyMat.opacity) * Math.min(1, dt * 1.5);
    if (this.fireflyMat.opacity > 0.02) {
      this.fireflies.position.set(anchor.x, Math.max(1, anchor.y), anchor.z);
      this.fireflies.rotation.y = elapsed * 0.08;
    }

    // 7. Circling coastal seagulls
    for (const bird of this.seagulls) {
      const u = bird.userData;
      u.angle += u.speed * dt;
      bird.position.set(
        Math.cos(u.angle) * u.radius,
        u.height + Math.sin(elapsed * 1.5 + u.radius) * 1.4,
        Math.sin(u.angle) * u.radius
      );
      bird.rotation.y = -u.angle;
      const flap = Math.sin(elapsed * 7.5 + u.radius) * 0.42;
      (u.lWing as THREE.Mesh).rotation.z = flap;
      (u.rWing as THREE.Mesh).rotation.z = -flap;
    }
  }
}
