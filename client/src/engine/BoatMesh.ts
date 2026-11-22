import * as THREE from 'three';
import {
  BOATS,
  WATER_LEVEL,
  sampleBoatBuoyancy,
  type BoatKind,
  type BoatState,
  type WorldGenerator,
  type WorldTimeState,
} from '@wildreach/shared';
import type { ProceduralTextureSet } from './Textures';

interface BoatVisual {
  state: BoatState;
  root: THREE.Group;
  hullGroup: THREE.Group;
  sailMesh: THREE.Mesh;
  rudderPivot: THREE.Group;
  lanternLights: THREE.PointLight[];
  // Smoothed interpolated world & buoyancy pose
  curX: number;
  curZ: number;
  curYaw: number;
  curHeave: number;
  curPitch: number;
  curRoll: number;
  wakeAccum: number;
}

interface WakeParticle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  age: number;
  maxAge: number;
  isSpray: boolean;
}

export class BoatManager {
  readonly group = new THREE.Group();
  private scene: THREE.Scene;
  private world: WorldGenerator;
  private tex: ProceduralTextureSet;
  private boats = new Map<string, BoatVisual>();
  private wakeParticles: WakeParticle[] = [];
  private foamGeo = new THREE.CircleGeometry(0.45, 8);
  private sprayGeo = new THREE.SphereGeometry(0.11, 5, 5);
  private ghostGroup: THREE.Group | null = null;
  private ghostKind: BoatKind | null = null;

  constructor(scene: THREE.Scene, world: WorldGenerator, tex: ProceduralTextureSet) {
    this.scene = scene;
    this.world = world;
    this.tex = tex;
    this.scene.add(this.group);
    this.foamGeo.rotateX(-Math.PI / 2);
  }

  syncAll(list: BoatState[]): void {
    const keep = new Set<string>();
    for (const b of list) {
      keep.add(b.id);
      const existing = this.boats.get(b.id);
      if (!existing) {
        this.addBoat(b);
      } else {
        existing.state = b;
      }
    }
    for (const id of Array.from(this.boats.keys())) {
      if (!keep.has(id)) this.removeBoat(id);
    }
  }

  addBoat(b: BoatState): void {
    if (this.boats.has(b.id)) {
      this.boats.get(b.id)!.state = b;
      return;
    }
    const built = this.createBoatMesh(b.kind);
    built.root.position.set(b.x, WATER_LEVEL, b.z);
    built.root.rotation.y = b.yaw;
    built.root.traverse((o) => {
      o.userData.boatId = b.id;
    });
    this.group.add(built.root);
    this.boats.set(b.id, {
      state: b,
      root: built.root,
      hullGroup: built.hullGroup,
      sailMesh: built.sailMesh,
      rudderPivot: built.rudderPivot,
      lanternLights: built.lanternLights,
      curX: b.x,
      curZ: b.z,
      curYaw: b.yaw,
      curHeave: WATER_LEVEL,
      curPitch: 0,
      curRoll: 0,
      wakeAccum: 0,
    });
  }

  updateBoatState(b: BoatState): void {
    const existing = this.boats.get(b.id);
    if (existing) existing.state = b;
    else this.addBoat(b);
  }

  removeBoat(id: string): void {
    const v = this.boats.get(id);
    if (!v) return;
    this.group.remove(v.root);
    this.boats.delete(id);
  }

  getHelmWorldPos(id: string, seatIndex = 0): THREE.Vector3 | null {
    const v = this.boats.get(id);
    if (!v) return null;
    const def = BOATS[v.state.kind];
    const cos = Math.cos(v.curYaw);
    const sin = Math.sin(v.curYaw);
    if (seatIndex > 0) {
      const seat = def.passengerOffsets[seatIndex - 1] ?? [0, 0];
      const rightX = cos;
      const rightZ = -sin;
      return new THREE.Vector3(
        v.curX + rightX * seat[0] + sin * seat[1],
        v.curHeave + def.deckY,
        v.curZ + rightZ * seat[0] + cos * seat[1]
      );
    }
    return new THREE.Vector3(
      v.curX + sin * def.helmOffsetZ,
      v.curHeave + def.deckY,
      v.curZ + cos * def.helmOffsetZ
    );
  }

  getAll(): BoatState[] {
    return Array.from(this.boats.values()).map((v) => v.state);
  }

  getById(id: string): BoatState | null {
    return this.boats.get(id)?.state ?? null;
  }

  getVisualPose(id: string): { x: number; y: number; z: number; yaw: number } | null {
    const v = this.boats.get(id);
    if (!v) return null;
    return { x: v.curX, y: v.curHeave, z: v.curZ, yaw: v.curYaw };
  }

  findNearestBoat(x: number, z: number, maxDist = 7.2): BoatState | null {
    let best: BoatState | null = null;
    let bestD = maxDist;
    for (const v of this.boats.values()) {
      const d = Math.hypot(v.curX - x, v.curZ - z);
      if (d < bestD) {
        bestD = d;
        best = v.state;
      }
    }
    return best;
  }

  updateGhost(kind: BoatKind | null, x: number, z: number, rotY: number, valid: boolean): void {
    if (!kind) {
      if (this.ghostGroup) this.ghostGroup.visible = false;
      return;
    }
    if (!this.ghostGroup || this.ghostKind !== kind) {
      if (this.ghostGroup) this.scene.remove(this.ghostGroup);
      const built = this.createBoatMesh(kind);
      built.root.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.castShadow = false;
          o.receiveShadow = false;
          o.material = new THREE.MeshBasicMaterial({
            color: valid ? '#2dd4bf' : '#f87171',
            transparent: true,
            opacity: 0.45,
            wireframe: false,
          });
        }
        if (o instanceof THREE.Light) o.visible = false;
      });
      this.ghostGroup = built.root;
      this.ghostKind = kind;
      this.scene.add(this.ghostGroup);
    }
    this.ghostGroup.visible = true;
    this.ghostGroup.position.set(x, WATER_LEVEL + 0.15, z);
    this.ghostGroup.rotation.y = rotY;
    this.ghostGroup.traverse((o) => {
      if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshBasicMaterial) {
        o.material.color.set(valid ? '#2dd4bf' : '#f87171');
      }
    });
  }

  update(dt: number, elapsed: number, time: WorldTimeState, nightFactor: number): void {
    for (const v of this.boats.values()) {
      const b = v.state;
      const def = BOATS[b.kind];

      // Smoothly interpolate network boat position & heading
      const lerpFactor = Math.min(1, dt * 11);
      v.curX += (b.x - v.curX) * lerpFactor;
      v.curZ += (b.z - v.curZ) * lerpFactor;
      let dyaw = b.yaw - v.curYaw;
      while (dyaw > Math.PI) dyaw -= Math.PI * 2;
      while (dyaw < -Math.PI) dyaw += Math.PI * 2;
      v.curYaw += dyaw * lerpFactor;

      // Exact 4-probe wave buoyancy synchronized with WaterMesh GLSL!
      const buoy = sampleBoatBuoyancy(
        v.curX,
        v.curZ,
        v.curYaw,
        def.length * 0.46,
        def.beam * 0.46,
        elapsed,
        time.windSpeed,
        (wx, wz) => this.world.getHeight(wx, wz)
      );

      // Add realistic sailing turn heel!
      const heel = -b.rudder * Math.min(1, Math.abs(b.speed) / 7) * 0.16;
      const damp = Math.min(1, dt * 6.5);
      v.curHeave += (buoy.heave - v.curHeave) * damp;
      v.curPitch += (buoy.pitch - v.curPitch) * damp;
      v.curRoll += (buoy.roll + heel - v.curRoll) * damp;

      v.root.position.set(v.curX, v.curHeave, v.curZ);
      v.root.rotation.y = v.curYaw;
      v.hullGroup.rotation.set(v.curPitch, 0, v.curRoll);

      // Animate billowing sail scale & flutter based on sail gear (throttle 2/3)
      const sailOpen = b.throttle >= 3 ? 1.0 : b.throttle === 2 ? 0.62 : 0.14;
      const targetScaleY = sailOpen;
      v.sailMesh.scale.y += (targetScaleY - v.sailMesh.scale.y) * Math.min(1, dt * 5);
      const billow = b.throttle >= 2 ? 1.15 + Math.sin(elapsed * 5.2 + v.curX) * 0.12 * time.windSpeed : 0.35;
      v.sailMesh.scale.z += (billow - v.sailMesh.scale.z) * Math.min(1, dt * 5);
      v.rudderPivot.rotation.y = b.rudder * 0.55;

      // Glow lanterns brightly at dusk & night
      for (const l of v.lanternLights) {
        l.intensity = (0.4 + nightFactor * 2.4) * (0.94 + Math.sin(elapsed * 7.5 + v.curZ) * 0.06);
      }

      // Emit V-shaped Kelvin foaming wake + leaping bow spray droplets while sailing!
      const absSpeed = Math.abs(b.speed);
      if (absSpeed > 0.7) {
        v.wakeAccum += dt * (4 + absSpeed * 2.2);
        while (v.wakeAccum >= 1) {
          v.wakeAccum -= 1;
          this.spawnWake(v.curX, v.curHeave, v.curZ, v.curYaw, def.length, def.beam, absSpeed);
        }
      }
    }

    // Update wake foam & spray particles
    for (let i = this.wakeParticles.length - 1; i >= 0; i--) {
      const wp = this.wakeParticles[i];
      wp.age += dt;
      if (wp.age >= wp.maxAge) {
        this.scene.remove(wp.mesh);
        (wp.mesh.material as THREE.Material).dispose();
        this.wakeParticles.splice(i, 1);
        continue;
      }
      const p = wp.age / wp.maxAge;
      wp.mesh.position.x += wp.vx * dt;
      wp.mesh.position.z += wp.vz * dt;
      if (wp.isSpray) {
        wp.vy -= 9.8 * dt;
        wp.mesh.position.y += wp.vy * dt;
      } else {
        wp.mesh.scale.setScalar(1 + p * 2.6);
      }
      const mat = wp.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - p) * (wp.isSpray ? 0.85 : 0.55);
    }
  }

  private spawnWake(
    x: number,
    y: number,
    z: number,
    yaw: number,
    length: number,
    beam: number,
    speed: number
  ): void {
    if (this.wakeParticles.length > 140) return;
    const fwdX = -Math.sin(yaw);
    const fwdZ = -Math.cos(yaw);
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);

    // Stern foam ring
    const sternX = x - fwdX * (length * 0.48) + (Math.random() - 0.5) * beam * 0.5;
    const sternZ = z - fwdZ * (length * 0.48) + (Math.random() - 0.5) * beam * 0.5;
    const foamMat = new THREE.MeshBasicMaterial({
      color: '#e0f7fa',
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    });
    const foam = new THREE.Mesh(this.foamGeo, foamMat);
    foam.position.set(sternX, y + 0.08, sternZ);
    this.scene.add(foam);
    this.wakeParticles.push({
      mesh: foam,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 0,
      vz: (Math.random() - 0.5) * 0.6,
      age: 0,
      maxAge: 1.4 + Math.random() * 0.7,
      isSpray: false,
    });

    // Bow water spray droplets at high sailing speed
    if (speed > 3.5 && Math.random() < 0.65) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const bowX = x + fwdX * (length * 0.45) + rightX * side * (beam * 0.28);
      const bowZ = z + fwdZ * (length * 0.45) + rightZ * side * (beam * 0.28);
      const sprayMat = new THREE.MeshBasicMaterial({
        color: '#f0fdff',
        transparent: true,
        opacity: 0.85,
      });
      const spray = new THREE.Mesh(this.sprayGeo, sprayMat);
      spray.position.set(bowX, y + 0.25, bowZ);
      this.scene.add(spray);
      this.wakeParticles.push({
        mesh: spray,
        vx: rightX * side * (1.2 + Math.random() * 1.4),
        vy: 1.9 + Math.random() * 1.6,
        vz: rightZ * side * (1.2 + Math.random() * 1.4),
        age: 0,
        maxAge: 0.55 + Math.random() * 0.25,
        isSpray: true,
      });
    }
  }

  private createBoatMesh(kind: BoatKind): {
    root: THREE.Group;
    hullGroup: THREE.Group;
    sailMesh: THREE.Mesh;
    rudderPivot: THREE.Group;
    lanternLights: THREE.PointLight[];
  } {
    const root = new THREE.Group();
    const hullGroup = new THREE.Group();
    root.add(hullGroup);

    const woodMat = new THREE.MeshStandardMaterial({
      map: this.tex.woodPlank,
      roughness: 0.82,
      color: kind === 'longship' ? '#6d4528' : kind === 'skiff' ? '#8c5a34' : '#9b7248',
    });
    const darkWood = new THREE.MeshStandardMaterial({
      map: this.tex.barkDark,
      roughness: 0.88,
      color: '#4e311d',
    });
    const ropeMat = new THREE.MeshStandardMaterial({ color: '#c8a97e', roughness: 0.95 });
    const brassMat = new THREE.MeshStandardMaterial({ color: '#d4a64a', metalness: 0.72, roughness: 0.3 });
    const lanternLights: THREE.PointLight[] = [];

    const rudderPivot = new THREE.Group();
    let sailMesh: THREE.Mesh;

    if (kind === 'raft') {
      // 7 lashed cedar logs forming a rustic floating raft
      for (let i = -3; i <= 3; i++) {
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.19, 3.8, 8), darkWood);
        log.rotation.x = Math.PI / 2;
        log.position.set(i * 0.35, 0.05, 0);
        log.castShadow = true;
        log.receiveShadow = true;
        hullGroup.add(log);
      }
      // Cross planks + lashing ropes
      for (const lz of [-1.25, 0, 1.25]) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.12, 0.24), woodMat);
        beam.position.set(0, 0.22, lz);
        hullGroup.add(beam);
        const rope = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 0.08), ropeMat);
        rope.position.set(0, 0.22, lz);
        hullGroup.add(rope);
      }
      // Mast + patchwork cream sail
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 3.6, 8), darkWood);
      mast.position.set(0, 1.95, -0.3);
      mast.castShadow = true;
      hullGroup.add(mast);

      const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 6), darkWood);
      yard.rotation.z = Math.PI / 2;
      yard.position.set(0, 3.2, -0.35);
      hullGroup.add(yard);

      const sailGeo = new THREE.PlaneGeometry(2.05, 2.15, 6, 6);
      // Curve sail slightly forward so scaling Z creates realistic wind billow!
      const pos = sailGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i) / 1.05;
        const v = pos.getY(i) / 1.1;
        pos.setZ(i, -Math.max(0, (1 - u * u) * (1 - v * v)) * 0.42);
      }
      sailGeo.computeVertexNormals();
      sailMesh = new THREE.Mesh(
        sailGeo,
        new THREE.MeshStandardMaterial({ color: '#f3e5c8', roughness: 0.9, side: THREE.DoubleSide })
      );
      sailMesh.position.set(0, 2.15, -0.4);
      sailMesh.castShadow = true;
      hullGroup.add(sailMesh);

      // Steering oar at stern
      rudderPivot.position.set(0, 0.35, 1.75);
      const oar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.8), darkWood);
      oar.position.set(0, -0.18, 0.65);
      oar.rotation.x = 0.28;
      rudderPivot.add(oar);
      hullGroup.add(rudderPivot);
    } else if (kind === 'skiff') {
      // Sleek curved coastal hull
      const hull = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.72, 4.6), woodMat);
      hull.position.set(0, 0.12, 0);
      hull.castShadow = true;
      hull.receiveShadow = true;
      hullGroup.add(hull);

      // Pointed bow cone
      const bow = new THREE.Mesh(new THREE.ConeGeometry(1.18, 1.65, 4), woodMat);
      bow.rotation.x = -Math.PI / 2;
      bow.rotation.y = Math.PI / 4;
      bow.scale.set(0.88, 1, 0.56);
      bow.position.set(0, 0.2, -3.0);
      bow.castShadow = true;
      hullGroup.add(bow);

      // Gunwale rails + benches
      for (const sx of [-1.02, 1.02]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, 4.6), darkWood);
        rail.position.set(sx, 0.55, 0);
        hullGroup.add(rail);
      }
      // Outrigger stability pontoon on starboard
      const pontoon = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 4.1, 8), darkWood);
      pontoon.rotation.x = Math.PI / 2;
      pontoon.position.set(1.95, 0.02, 0);
      hullGroup.add(pontoon);
      for (const bz of [-0.95, 0.95]) {
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.9, 6), ropeMat);
        arm.rotation.z = Math.PI / 2;
        arm.position.set(1.05, 0.32, bz);
        hullGroup.add(arm);
      }

      // Cargo hold chest midship
      const cargo = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.62, 0.75), darkWood);
      cargo.position.set(0, 0.58, 0.55);
      hullGroup.add(cargo);
      const clasp = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.8), brassMat);
      clasp.position.set(0, 0.68, 0.55);
      hullGroup.add(clasp);

      // Mast + Indigo-and-Gold Striped Sail
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 5.2, 8), darkWood);
      mast.position.set(0, 2.7, -0.55);
      mast.castShadow = true;
      hullGroup.add(mast);

      const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.1, 6), darkWood);
      yard.rotation.z = Math.PI / 2;
      yard.position.set(0, 4.55, -0.62);
      hullGroup.add(yard);

      const sailGeo = new THREE.PlaneGeometry(2.9, 3.1, 8, 8);
      const pos = sailGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i) / 1.5;
        const v = pos.getY(i) / 1.6;
        pos.setZ(i, -Math.max(0, (1 - u * u) * (1 - v * v)) * 0.62);
      }
      sailGeo.computeVertexNormals();
      sailMesh = new THREE.Mesh(
        sailGeo,
        new THREE.MeshStandardMaterial({
          map: this.createStripedSailTex('#1e3a8a', '#fbbf24'),
          roughness: 0.85,
          side: THREE.DoubleSide,
        })
      );
      sailMesh.position.set(0, 3.0, -0.68);
      sailMesh.castShadow = true;
      hullGroup.add(sailMesh);

      // Warm Brass Bow Lantern
      const lanPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.0, 6), brassMat);
      lanPost.position.set(0, 0.95, -2.5);
      hullGroup.add(lanPost);
      const lanOrb = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ color: '#fde68a' })
      );
      lanOrb.position.set(0, 1.45, -2.5);
      hullGroup.add(lanOrb);
      const pt = new THREE.PointLight('#ffb74d', 1.4, 15, 1.8);
      pt.position.set(0, 1.5, -2.5);
      hullGroup.add(pt);
      lanternLights.push(pt);

      // Rudder
      rudderPivot.position.set(0, 0.35, 2.35);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.05, 0.55), darkWood);
      blade.position.set(0, -0.4, 0.25);
      rudderPivot.add(blade);
      hullGroup.add(rudderPivot);
    } else {
      // DRAGON LONGSHIP — Majestic Viking Warship!
      const hull = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.95, 6.8), woodMat);
      hull.position.set(0, 0.2, 0);
      hull.castShadow = true;
      hull.receiveShadow = true;
      hullGroup.add(hull);

      // Swept clinker bow & stern cones
      const bow = new THREE.Mesh(new THREE.ConeGeometry(1.55, 2.5, 4), woodMat);
      bow.rotation.x = -Math.PI / 2;
      bow.rotation.y = Math.PI / 4;
      bow.scale.set(0.92, 1, 0.62);
      bow.position.set(0, 0.35, -4.5);
      hullGroup.add(bow);

      const stern = new THREE.Mesh(new THREE.ConeGeometry(1.45, 2.1, 4), woodMat);
      stern.rotation.x = Math.PI / 2;
      stern.rotation.y = Math.PI / 4;
      stern.scale.set(0.92, 1, 0.6);
      stern.position.set(0, 0.35, 4.35);
      hullGroup.add(stern);

      // Carved Rising Dragon Prow + Golden Horns!
      const prowNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 2.3, 8), darkWood);
      prowNeck.position.set(0, 1.55, -5.2);
      prowNeck.rotation.x = 0.28;
      hullGroup.add(prowNeck);
      const dragonHead = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.42, 0.92), darkWood);
      dragonHead.position.set(0, 2.65, -5.6);
      hullGroup.add(dragonHead);
      const crest = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 5), brassMat);
      crest.position.set(0, 3.05, -5.35);
      crest.rotation.x = -0.5;
      hullGroup.add(crest);

      // 8 Painted Viking Round Shields along port & starboard gunwales!
      const shieldColors = ['#b91c1c', '#1d4ed8', '#d97706', '#0f766e'];
      for (let i = 0; i < 4; i++) {
        const sz = -2.1 + i * 1.4;
        for (const sx of [-1.52, 1.52]) {
          const shield = new THREE.Mesh(
            new THREE.CylinderGeometry(0.46, 0.46, 0.08, 12),
            new THREE.MeshStandardMaterial({
              color: shieldColors[(i + (sx > 0 ? 1 : 0)) % shieldColors.length],
              roughness: 0.7,
            })
          );
          shield.rotation.z = Math.PI / 2;
          shield.position.set(sx, 0.78, sz);
          hullGroup.add(shield);
          const boss = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), brassMat);
          boss.position.set(sx + Math.sign(sx) * 0.05, 0.78, sz);
          hullGroup.add(boss);
        }
      }

      // Twin cargo chests
      for (const cz of [0.85, 1.75]) {
        const ch = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.68, 0.72), darkWood);
        ch.position.set(0, 0.78, cz);
        hullGroup.add(ch);
      }

      // Towering Mast + Crimson-and-Cream Striped Square Sail
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 7.6, 10), darkWood);
      mast.position.set(0, 4.0, -0.55);
      mast.castShadow = true;
      hullGroup.add(mast);

      const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5.2, 8), darkWood);
      yard.rotation.z = Math.PI / 2;
      yard.position.set(0, 6.65, -0.68);
      hullGroup.add(yard);

      // Masthead pennant flag
      const flag = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.35, 1.25),
        new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.85 })
      );
      flag.position.set(0, 7.65, 0.05);
      hullGroup.add(flag);

      const sailGeo = new THREE.PlaneGeometry(4.8, 4.4, 10, 8);
      const pos = sailGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i) / 2.4;
        const v = pos.getY(i) / 2.2;
        pos.setZ(i, -Math.max(0, (1 - u * u) * (1 - v * v)) * 0.95);
      }
      sailGeo.computeVertexNormals();
      sailMesh = new THREE.Mesh(
        sailGeo,
        new THREE.MeshStandardMaterial({
          map: this.createStripedSailTex('#991b1b', '#fef3c7'),
          roughness: 0.82,
          side: THREE.DoubleSide,
        })
      );
      sailMesh.position.set(0, 4.45, -0.75);
      sailMesh.castShadow = true;
      hullGroup.add(sailMesh);

      // Twin Bow & Stern Lanterns
      for (const lz of [-4.6, 3.9]) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 8, 8),
          new THREE.MeshBasicMaterial({ color: '#fde68a' })
        );
        orb.position.set(0, 1.85, lz);
        hullGroup.add(orb);
        const pt = new THREE.PointLight('#ffa726', 1.6, 20, 1.7);
        pt.position.set(0, 1.9, lz);
        hullGroup.add(pt);
        lanternLights.push(pt);
      }

      // Massive side steering rudder
      rudderPivot.position.set(1.25, 0.45, 3.3);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.5, 0.72), darkWood);
      blade.position.set(0, -0.55, 0.25);
      rudderPivot.add(blade);
      hullGroup.add(rudderPivot);
    }

    return { root, hullGroup, sailMesh, rudderPivot, lanternLights };
  }

  private createStripedSailTex(colA: string, colB: string): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d')!;
    const stripes = 6;
    const sw = c.width / stripes;
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? colA : colB;
      ctx.fillRect(i * sw, 0, sw + 1, c.height);
    }
    // Subtle woven canvas texture lines
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let y = 0; y < c.height; y += 8) ctx.fillRect(0, y, c.width, 2);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
}
