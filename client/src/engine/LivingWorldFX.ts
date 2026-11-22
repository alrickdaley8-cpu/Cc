import * as THREE from 'three';
import {
  WATER_LEVEL,
  sampleOceanWaveHeight,
  type WorldGenerator,
  type WorldTimeState,
} from '@wildreach/shared';
import type { ProceduralTextureSet } from './Textures';

interface Seagull {
  group: THREE.Group;
  leftWing: THREE.Mesh;
  rightWing: THREE.Mesh;
  centerX: number;
  centerZ: number;
  radius: number;
  altitude: number;
  speed: number;
  phase: number;
}

export class LivingWorldFX {
  readonly group = new THREE.Group();
  private scene: THREE.Scene;
  private world: WorldGenerator;
  private tex: ProceduralTextureSet;
  private gulls: Seagull[] = [];
  private fireflies!: THREE.Points;
  private fireflyMat!: THREE.PointsMaterial;
  private godRays: THREE.Mesh[] = [];
  private jettyLantern: THREE.PointLight | null = null;
  private volcanoLight: THREE.PointLight | null = null;

  // Interactive 3D Fishing Bobber & Line
  private bobberGroup: THREE.Group;
  private lineMesh: THREE.Line;
  private fishingActive = false;
  private bobberPos = new THREE.Vector3();
  private biteDip = 0;

  constructor(scene: THREE.Scene, world: WorldGenerator, tex: ProceduralTextureSet) {
    this.scene = scene;
    this.world = world;
    this.tex = tex;
    this.scene.add(this.group);

    this.buildSouthHarborJetty();
    this.buildShipwreckAtollWreck();
    this.buildSeaArchLandmark();
    this.buildVolcanicCaldera();
    this.buildCoralReefDecor();
    this.buildSeagulls();
    this.buildFireflies();
    this.buildGodRays();

    // Fishing bobber + line
    this.bobberGroup = new THREE.Group();
    const topHalf = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
      new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.3 })
    );
    const botHalf = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 10, 8, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5),
      new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.3 })
    );
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.32, 16),
      new THREE.MeshBasicMaterial({ color: '#e0f2fe', transparent: true, opacity: 0.65, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    this.bobberGroup.add(topHalf, botHalf, ring);
    this.bobberGroup.visible = false;
    this.scene.add(this.bobberGroup);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    this.lineMesh = new THREE.Line(
      lineGeo,
      new THREE.LineBasicMaterial({ color: '#e2e8f0', transparent: true, opacity: 0.72 })
    );
    this.lineMesh.visible = false;
    this.scene.add(this.lineMesh);
  }

  setFishingBobber(
    active: boolean,
    rodTip: THREE.Vector3,
    targetX: number,
    targetZ: number,
    isBiting: boolean
  ): void {
    this.fishingActive = active;
    this.bobberGroup.visible = active;
    this.lineMesh.visible = active;
    if (!active) return;
    this.bobberPos.set(targetX, WATER_LEVEL, targetZ);
    this.biteDip = isBiting ? 1 : 0;

    // Update curved fishing line from player rod tip to bobber
    const mid = rodTip.clone().lerp(this.bobberGroup.position, 0.5);
    mid.y += isBiting ? 0.15 : 0.65;
    const pts = [rodTip, mid, this.bobberGroup.position.clone()];
    this.lineMesh.geometry.setFromPoints(pts);
  }

  update(dt: number, elapsed: number, time: WorldTimeState, nightFactor: number): void {
    // 1. Animate soaring coastal seagulls
    for (const g of this.gulls) {
      const ang = elapsed * g.speed + g.phase;
      const gx = g.centerX + Math.cos(ang) * g.radius;
      const gz = g.centerZ + Math.sin(ang) * g.radius;
      const gy = g.altitude + Math.sin(elapsed * 0.9 + g.phase) * 1.8;
      g.group.position.set(gx, gy, gz);
      g.group.rotation.y = -ang;
      const flap = Math.sin(elapsed * 6.4 + g.phase * 3) * 0.55;
      g.leftWing.rotation.z = flap;
      g.rightWing.rotation.z = -flap;
    }

    // 2. Animate Golden Fireflies & Sunlit Pollen Motes
    const pos = this.fireflies.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const drift = Math.sin(elapsed * 0.9 + i * 1.7) * 0.008;
      pos.setY(i, y + drift);
    }
    pos.needsUpdate = true;
    const goldenHour = Math.max(0, 1 - Math.abs(time.timeOfDay - 0.74) * 11) + Math.max(0, 1 - Math.abs(time.timeOfDay - 0.27) * 11);
    this.fireflyMat.opacity = Math.min(0.95, nightFactor * 0.85 + goldenHour * 0.55 + 0.12);
    this.fireflyMat.color.set(nightFactor > 0.35 ? '#d9f99d' : '#fef08a');

    // 3. Volumetric God Rays (glowing softly at sunrise & golden hour!)
    const rayAlpha = Math.max(0, (1 - nightFactor) * (0.045 + goldenHour * 0.09) * (1 - time.weatherIntensity * 0.7));
    for (let i = 0; i < this.godRays.length; i++) {
      const m = this.godRays[i];
      (m.material as THREE.MeshBasicMaterial).opacity = rayAlpha * (0.85 + Math.sin(elapsed * 0.6 + i) * 0.15);
    }

    // 4. Harbor Jetty & Volcano lights
    if (this.jettyLantern) {
      this.jettyLantern.intensity = (0.7 + nightFactor * 2.5) * (0.93 + Math.sin(elapsed * 8) * 0.07);
    }
    if (this.volcanoLight) {
      this.volcanoLight.intensity = 2.4 + Math.sin(elapsed * 3.1) * 0.6;
    }

    // 5. Bob fishing float smoothly on the exact wave surface!
    if (this.fishingActive) {
      const wh = sampleOceanWaveHeight(
        this.bobberPos.x,
        this.bobberPos.z,
        elapsed,
        time.windSpeed,
        this.world.getHeight(this.bobberPos.x, this.bobberPos.z)
      );
      const dip = this.biteDip > 0 ? Math.sin(elapsed * 22) * 0.16 - 0.14 : Math.sin(elapsed * 3) * 0.03;
      this.bobberGroup.position.set(this.bobberPos.x, wh + dip, this.bobberPos.z);
      const ring = this.bobberGroup.children[2];
      if (ring) {
        const pulse = this.biteDip > 0 ? 1.2 + Math.sin(elapsed * 16) * 0.55 : 1 + Math.sin(elapsed * 3) * 0.15;
        ring.scale.setScalar(pulse);
      }
    }
    void dt;
  }

  private buildSouthHarborJetty(): void {
    const spot = this.world.getHarborJettySpot();
    const g = new THREE.Group();
    const plankMat = new THREE.MeshStandardMaterial({ map: this.tex.woodPlank, roughness: 0.85, color: '#9c7850' });
    const postMat = new THREE.MeshStandardMaterial({ map: this.tex.barkDark, roughness: 0.92, color: '#5c3f28' });

    // Wooden pier extending out into the turquoise cove right next to the starter Raft
    for (let i = 0; i < 4; i++) {
      const pz = spot.z - 4 + i * 3.1;
      const deck = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.24, 3.05), plankMat);
      deck.position.set(spot.x, WATER_LEVEL + 0.78, pz);
      deck.castShadow = true;
      deck.receiveShadow = true;
      g.add(deck);

      for (const sx of [-1.45, 1.45]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 4.4, 8), postMat);
        post.position.set(spot.x + sx, WATER_LEVEL - 0.65, pz + 1.2);
        post.castShadow = true;
        g.add(post);
      }
    }

    // Hanging Harbor Beacon Lantern at the tip of the jetty
    const endZ = spot.z + 6.4;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 3.2, 8), postMat);
    pole.position.set(spot.x - 1.35, WATER_LEVEL + 2.3, endZ);
    g.add(pole);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), postMat);
    arm.position.set(spot.x - 0.95, WATER_LEVEL + 3.7, endZ);
    g.add(arm);
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 10, 10),
      new THREE.MeshBasicMaterial({ color: '#fde68a' })
    );
    bulb.position.set(spot.x - 0.55, WATER_LEVEL + 3.45, endZ);
    g.add(bulb);
    const light = new THREE.PointLight('#ffb74d', 1.8, 22, 1.7);
    light.position.set(spot.x - 0.55, WATER_LEVEL + 3.4, endZ);
    g.add(light);
    this.jettyLantern = light;

    this.scene.add(g);
  }

  private buildShipwreckAtollWreck(): void {
    const cx = -148;
    const cz = 136;
    const cy = Math.max(0.5, this.world.getHeight(cx, cz));
    const g = new THREE.Group();
    g.position.set(cx + 2, cy - 0.2, cz - 2);
    g.rotation.set(0.14, 0.55, -0.22);

    const timber = new THREE.MeshStandardMaterial({ map: this.tex.barkDark, roughness: 0.92, color: '#583b26' });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 11.5), timber);
    hull.position.y = 0.9;
    hull.castShadow = true;
    g.add(hull);

    // Dramatic exposed curved hull ribs
    for (let i = -4; i <= 4; i++) {
      for (const sx of [-2.15, 2.15]) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.8, 0.3), timber);
        rib.position.set(sx, 2.0, i * 1.2);
        rib.rotation.z = sx > 0 ? 0.18 : -0.18;
        g.add(rib);
      }
    }
    // Snapped tilted mainmast + tattered sail
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 9.5, 8), timber);
    mast.position.set(0, 5.2, -1.2);
    mast.rotation.z = 0.22;
    g.add(mast);
    const sail = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 3.6),
      new THREE.MeshStandardMaterial({ color: '#d6c7ae', roughness: 0.95, side: THREE.DoubleSide })
    );
    sail.position.set(0.7, 6.2, -1.2);
    sail.rotation.y = 0.4;
    g.add(sail);
    this.scene.add(g);
  }

  private buildSeaArchLandmark(): void {
    // Colossal natural stone arch rising off the shore of Sea-Arch Sanctuary Isle!
    const ax = -124;
    const az = -114;
    const rockMat = new THREE.MeshStandardMaterial({ map: this.tex.stoneMasonry, roughness: 0.92, color: '#6b757e' });
    const g = new THREE.Group();
    g.position.set(ax, WATER_LEVEL, az);
    g.rotation.y = Math.PI * 0.25;

    for (const sx of [-8.5, 8.5]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.8, 16, 8), rockMat);
      pillar.position.set(sx, 5.5, 0);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      g.add(pillar);
    }
    const span = new THREE.Mesh(new THREE.BoxGeometry(20.5, 3.4, 4.6), rockMat);
    span.position.set(0, 13.5, 0);
    span.castShadow = true;
    g.add(span);

    // Glowing ancient cyan rune crest at apex of the sea arch!
    const rune = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.MeshBasicMaterial({ color: '#38f2dc' })
    );
    rune.position.set(0, 16.4, 0);
    g.add(rune);

    this.scene.add(g);
  }

  private buildVolcanicCaldera(): void {
    const vx = 152;
    const vz = -136;
    const vy = Math.max(4, this.world.getHeight(vx, vz));
    const g = new THREE.Group();
    g.position.set(vx, vy, vz);

    const lavaMat = new THREE.MeshBasicMaterial({ color: '#ff5722' });
    const pool = new THREE.Mesh(new THREE.CircleGeometry(4.5, 16), lavaMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = 0.22;
    g.add(pool);

    const obelisk = new THREE.Mesh(
      new THREE.ConeGeometry(1.4, 7.5, 5),
      new THREE.MeshStandardMaterial({ color: '#1e1b24', roughness: 0.45, metalness: 0.4 })
    );
    obelisk.position.set(3.8, 3.5, -2.2);
    obelisk.castShadow = true;
    g.add(obelisk);

    const light = new THREE.PointLight('#ff6d00', 2.6, 32, 1.5);
    light.position.set(0, 3.2, 0);
    g.add(light);
    this.volcanoLight = light;
    this.scene.add(g);
  }

  private buildCoralReefDecor(): void {
    // Vibrant bioluminescent coral clusters shimmering beneath the shallow turquoise waters!
    const colors = ['#ff6b9d', '#2dd4bf', '#fb923c', '#a855f7', '#facc15'];
    const g = new THREE.Group();
    const spots: [number, number][] = [
      [-136, 128], [-152, 122], [-160, 144], [-134, 148],
      [12, 114], [30, 112], [-22, 118], [52, 92],
      [-132, -128], [134, -124],
    ];
    for (let i = 0; i < spots.length; i++) {
      const [bx, bz] = spots[i];
      for (let k = 0; k < 5; k++) {
        const x = bx + Math.cos(k * 1.4 + i) * (2.5 + k * 0.9);
        const z = bz + Math.sin(k * 1.9 + i) * (2.5 + k * 0.9);
        const h = this.world.getHeight(x, z);
        if (h > -0.25 || h < -2.4) continue;
        const col = colors[(i + k) % colors.length];
        const coral = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.45 + (k % 3) * 0.16, 0),
          new THREE.MeshStandardMaterial({
            color: col,
            emissive: col,
            emissiveIntensity: 0.32,
            roughness: 0.6,
          })
        );
        coral.position.set(x, h + 0.3, z);
        coral.scale.set(1.1, 0.75 + (k % 2) * 0.4, 1.1);
        g.add(coral);
      }
    }
    this.scene.add(g);
  }

  private buildSeagulls(): void {
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.6 });
    const wingMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.65 });
    const anchors: [number, number, number][] = [
      [18, 108, 28],
      [-14, 112, 26],
      [-148, 136, 30],
      [152, -136, 34],
      [-146, -134, 30],
      [0, 10, 42],
    ];
    for (let i = 0; i < 18; i++) {
      const [cx, cz, baseR] = anchors[i % anchors.length];
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.55, 5), bodyMat);
      body.rotation.x = Math.PI / 2;
      group.add(body);

      const lw = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.04, 0.2), wingMat);
      lw.position.set(-0.36, 0, 0);
      const rw = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.04, 0.2), wingMat);
      rw.position.set(0.36, 0, 0);
      group.add(lw, rw);

      this.scene.add(group);
      this.gulls.push({
        group,
        leftWing: lw,
        rightWing: rw,
        centerX: cx,
        centerZ: cz,
        radius: baseR + (i % 5) * 6.5,
        altitude: 16 + (i % 6) * 4.2,
        speed: (0.14 + (i % 4) * 0.035) * (i % 2 === 0 ? 1 : -1),
        phase: i * 1.15,
      });
    }
  }

  private buildFireflies(): void {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const ang = i * 2.39996;
      const rad = 8 + Math.sqrt(i / count) * 115;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;
      const h = Math.max(WATER_LEVEL + 0.5, this.world.getHeight(x, z));
      positions[i * 3] = x;
      positions[i * 3 + 1] = h + 0.9 + (i % 7) * 0.45;
      positions[i * 3 + 2] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.fireflyMat = new THREE.PointsMaterial({
      color: '#fef08a',
      size: 0.34,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.fireflies = new THREE.Points(geo, this.fireflyMat);
    this.scene.add(this.fireflies);
  }

  private buildGodRays(): void {
    const spots: [number, number][] = [
      [-10, 18], // Runestone Sanctuary
      [16, 8], // Crystal Spring
      [-146, -134], // Sea-Arch Sanctuary
    ];
    for (const [x, z] of spots) {
      const h = Math.max(0, this.world.getHeight(x, z));
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(7.5, 36, 14, 1, true),
        new THREE.MeshBasicMaterial({
          color: '#fde68a',
          transparent: true,
          opacity: 0.06,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      cone.position.set(x + 4, h + 16, z - 2);
      cone.rotation.z = 0.24;
      this.scene.add(cone);
      this.godRays.push(cone);
    }
  }
}
