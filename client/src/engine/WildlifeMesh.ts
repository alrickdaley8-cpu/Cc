import * as THREE from 'three';
import type { WildlifeKind, WildlifeState } from '@wildreach/shared';

interface WildlifeVisual {
  group: THREE.Group;
  kind: WildlifeKind;
  legs: THREE.Object3D[];
  head: THREE.Object3D;
  hpBarFill: THREE.Mesh;
  hpBarGroup: THREE.Group;
  targetPos: THREE.Vector3;
  targetYaw: number;
  state: WildlifeState;
}

export class WildlifeManager {
  readonly group = new THREE.Group();
  private visuals = new Map<string, WildlifeVisual>();

  constructor(scene: THREE.Scene) {
    scene.add(this.group);
  }

  sync(list: WildlifeState[]): void {
    const aliveIds = new Set<string>();
    for (const w of list) {
      aliveIds.add(w.id);
      let vis = this.visuals.get(w.id);
      if (!vis) {
        vis = this.createVisual(w);
        vis.group.position.set(w.x, w.y, w.z);
        vis.group.rotation.y = w.yaw;
        vis.group.traverse((o) => {
          o.userData.wildlifeId = w.id;
          o.userData.wildlifeKind = w.kind;
        });
        this.group.add(vis.group);
        this.visuals.set(w.id, vis);
      }
      vis.targetPos.set(w.x, w.y, w.z);
      vis.targetYaw = w.yaw;
      vis.state = w;

      const pct = Math.max(0.01, w.hp / Math.max(1, w.maxHp));
      vis.hpBarGroup.visible = w.hp < w.maxHp;
      vis.hpBarFill.scale.x = pct;
      vis.hpBarFill.position.x = -(1 - pct) * 0.55;
    }

    for (const [id, vis] of Array.from(this.visuals.entries())) {
      if (!aliveIds.has(id)) {
        this.group.remove(vis.group);
        this.visuals.delete(id);
      }
    }
  }

  private createVisual(w: WildlifeState): WildlifeVisual {
    const g = new THREE.Group();
    const legs: THREE.Object3D[] = [];
    const head = new THREE.Group();

    if (w.kind === 'deer') {
      const fur = new THREE.MeshStandardMaterial({ color: '#9e6b40', roughness: 0.86 });
      const belly = new THREE.MeshStandardMaterial({ color: '#e6d6be', roughness: 0.9 });
      const antlerMat = new THREE.MeshStandardMaterial({ color: '#d8ccb8', roughness: 0.78 });

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.58, 1.38), fur);
      body.position.y = 1.05;
      body.castShadow = true;
      g.add(body);

      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.16), belly);
      tail.position.set(0, 1.18, -0.74);
      g.add(tail);

      head.position.set(0, 1.32, 0.58);
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.56, 0.28), fur);
      neck.position.set(0, 0.24, 0.1);
      neck.rotation.x = 0.24;
      const snout = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.46), fur);
      snout.position.set(0, 0.52, 0.3);
      // Branching antlers
      for (const s of [-1, 1]) {
        const a1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.48, 5), antlerMat);
        a1.position.set(s * 0.15, 0.78, 0.16);
        a1.rotation.z = -s * 0.42;
        const a2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.28, 5), antlerMat);
        a2.position.set(s * 0.28, 0.9, 0.22);
        a2.rotation.x = 0.5;
        head.add(a1, a2);
      }
      head.add(neck, snout);
      g.add(head);

      const legPos: [number, number][] = [[-0.2, 0.46], [0.2, 0.46], [-0.2, -0.46], [0.2, -0.46]];
      for (const [lx, lz] of legPos) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.85, 0.13), fur);
        leg.position.set(lx, 0.42, lz);
        leg.castShadow = true;
        g.add(leg);
        legs.push(leg);
      }
    } else if (w.kind === 'boar') {
      const hide = new THREE.MeshStandardMaterial({ color: '#4d3a2f', roughness: 0.92 });
      const tuskMat = new THREE.MeshStandardMaterial({ color: '#f2e8d5', roughness: 0.55 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.58, 1.15), hide);
      body.position.y = 0.64;
      body.castShadow = true;
      g.add(body);

      head.position.set(0, 0.68, 0.58);
      const snout = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.45), hide);
      snout.position.set(0, -0.02, 0.18);
      for (const s of [-1, 1]) {
        const tusk = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.26, 5), tuskMat);
        tusk.position.set(s * 0.18, -0.04, 0.4);
        tusk.rotation.x = 0.8;
        tusk.rotation.z = -s * 0.35;
        head.add(tusk);
      }
      head.add(snout);
      g.add(head);

      for (const [lx, lz] of [[-0.22, 0.36], [0.22, 0.36], [-0.22, -0.36], [0.22, -0.36]]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.14), hide);
        leg.position.set(lx, 0.22, lz);
        leg.castShadow = true;
        g.add(leg);
        legs.push(leg);
      }
    } else if (w.kind === 'wolf') {
      const fur = new THREE.MeshStandardMaterial({ color: '#6b727d', roughness: 0.86 });
      const dark = new THREE.MeshStandardMaterial({ color: '#393e46', roughness: 0.9 });
      const eyeMat = new THREE.MeshBasicMaterial({ color: '#fbbf24' });

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.48, 1.24), fur);
      body.position.y = 0.78;
      body.castShadow = true;
      g.add(body);

      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.55), dark);
      tail.position.set(0, 0.82, -0.82);
      tail.rotation.x = -0.35;
      g.add(tail);

      head.position.set(0, 0.94, 0.62);
      const skull = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 0.48), dark);
      skull.position.set(0, 0.04, 0.15);
      for (const s of [-1, 1]) {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 4), dark);
        ear.position.set(s * 0.12, 0.26, 0.05);
        const eye = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.04), eyeMat);
        eye.position.set(s * 0.1, 0.08, 0.38);
        head.add(ear, eye);
      }
      head.add(skull);
      g.add(head);

      for (const [lx, lz] of [[-0.17, 0.42], [0.17, 0.42], [-0.17, -0.42], [0.17, -0.42]]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.58, 0.12), dark);
        leg.position.set(lx, 0.29, lz);
        leg.castShadow = true;
        g.add(leg);
        legs.push(leg);
      }
    } else {
      // Shadow Stalker — eerie hovering night predator with horned crown & blazing eyes
      const shadowMat = new THREE.MeshStandardMaterial({
        color: '#171124',
        emissive: '#3b1566',
        emissiveIntensity: 0.75,
        roughness: 0.45,
      });
      const eyeMat = new THREE.MeshBasicMaterial({ color: '#c084fc' });
      const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.62, 2.05, 7), shadowMat);
      cloak.position.y = 1.25;
      cloak.castShadow = true;
      g.add(cloak);

      head.position.set(0, 2.2, 0.12);
      const skull = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), shadowMat);
      for (const s of [-1, 1]) {
        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.55, 5), shadowMat);
        horn.position.set(s * 0.2, 0.35, -0.05);
        horn.rotation.z = -s * 0.4;
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 6, 6), eyeMat);
        eye.position.set(s * 0.11, 0.04, 0.26);
        head.add(horn, eye);
      }
      head.add(skull);
      g.add(head);

      const aura = new THREE.PointLight('#a855f7', 2.8, 9, 1.8);
      aura.position.set(0, 1.8, 0);
      g.add(aura);
    }

    // Crisp mini world HP bar (visible only when injured)
    const hpBarGroup = new THREE.Group();
    hpBarGroup.position.set(0, w.kind === 'stalker' ? 2.95 : 1.95, 0);
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(1.16, 0.14),
      new THREE.MeshBasicMaterial({ color: '#0f172a', side: THREE.DoubleSide })
    );
    const fill = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 0.09),
      new THREE.MeshBasicMaterial({ color: '#ef4444', side: THREE.DoubleSide })
    );
    fill.position.z = 0.01;
    hpBarGroup.add(bg, fill);
    hpBarGroup.visible = false;
    g.add(hpBarGroup);

    return {
      group: g,
      kind: w.kind,
      legs,
      head,
      hpBarFill: fill,
      hpBarGroup,
      targetPos: new THREE.Vector3(w.x, w.y, w.z),
      targetYaw: w.yaw,
      state: w,
    };
  }

  update(dt: number, elapsed: number, camera: THREE.Camera): void {
    const smooth = Math.min(1, dt * 11);
    for (const vis of this.visuals.values()) {
      vis.group.position.lerp(vis.targetPos, smooth);

      // Smooth angular interpolation
      let dy = vis.targetYaw - vis.group.rotation.y;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      vis.group.rotation.y += dy * smooth;

      if (vis.hpBarGroup.visible) {
        vis.hpBarGroup.lookAt(camera.position);
      }

      if (vis.kind === 'stalker') {
        vis.group.position.y += Math.sin(elapsed * 4 + vis.targetPos.x) * 0.14;
        vis.head.rotation.x = vis.state.attackTime > 0 ? 0.5 : Math.sin(elapsed * 3) * 0.1;
      } else if (vis.state.speed > 0.3) {
        const stride = Math.sin(elapsed * (vis.state.speed * 2.1));
        for (let i = 0; i < vis.legs.length; i++) {
          vis.legs[i].rotation.x = (i % 2 === 0 ? stride : -stride) * 0.65;
        }
      } else {
        for (const leg of vis.legs) leg.rotation.x *= 0.85;
      }
    }
  }
}
