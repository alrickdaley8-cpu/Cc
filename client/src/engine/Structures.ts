import * as THREE from 'three';
import {
  BUILD_GRID,
  WALL_HEIGHT,
  type StructureKind,
  type StructureState,
} from '@wildreach/shared';
import type { ProceduralTextureSet } from './Textures';

interface StructureVisual {
  group: THREE.Group;
  state: StructureState;
  flame?: THREE.Group;
  light?: THREE.PointLight;
  doorPivot?: THREE.Group;
  crystal?: THREE.Mesh;
  waterMesh?: THREE.Mesh;
  spinner?: THREE.Object3D;
  cropGroup?: THREE.Group;
}

export class StructureManager {
  readonly group = new THREE.Group();
  private visuals = new Map<string, StructureVisual>();
  private mats: Record<string, THREE.Material>;
  private ghostGroup: THREE.Group | null = null;
  private ghostKind: StructureKind | null = null;
  private ghostValidMat: THREE.MeshBasicMaterial;
  private ghostInvalidMat: THREE.MeshBasicMaterial;

  constructor(scene: THREE.Scene, textures: ProceduralTextureSet) {
    this.mats = {
      wood: new THREE.MeshStandardMaterial({
        map: textures.woodPlank,
        bumpMap: textures.woodPlankBump,
        bumpScale: 0.14,
        roughness: 0.82,
      }),
      woodDark: new THREE.MeshStandardMaterial({
        map: textures.barkDark,
        color: '#6b472b',
        roughness: 0.88,
      }),
      roof: new THREE.MeshStandardMaterial({
        map: textures.roofShingle,
        roughness: 0.85,
      }),
      stone: new THREE.MeshStandardMaterial({
        map: textures.stoneMasonry,
        bumpMap: textures.stoneMasonryBump,
        bumpScale: 0.2,
        roughness: 0.88,
      }),
      iron: new THREE.MeshStandardMaterial({
        color: '#3f4650',
        metalness: 0.72,
        roughness: 0.35,
      }),
      cloth: new THREE.MeshStandardMaterial({
        color: '#b84c3e',
        roughness: 0.92,
      }),
      hide: new THREE.MeshStandardMaterial({
        color: '#a37146',
        roughness: 0.88,
      }),
      flameOuter: new THREE.MeshBasicMaterial({
        color: '#ff6a1a',
        transparent: true,
        opacity: 0.9,
      }),
      flameInner: new THREE.MeshBasicMaterial({
        color: '#ffe573',
      }),
      ember: new THREE.MeshStandardMaterial({
        color: '#ff4500',
        emissive: '#ff5500',
        emissiveIntensity: 1.6,
      }),
      crystal: new THREE.MeshStandardMaterial({
        color: '#5cf2e6',
        emissive: '#22d3ee',
        emissiveIntensity: 1.4,
        roughness: 0.15,
      }),
      water: new THREE.MeshStandardMaterial({
        color: '#2fb8d9',
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
    };

    this.ghostValidMat = new THREE.MeshBasicMaterial({
      color: '#38f2dc',
      transparent: true,
      opacity: 0.42,
      wireframe: false,
      depthWrite: false,
    });
    this.ghostInvalidMat = new THREE.MeshBasicMaterial({
      color: '#f87171',
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    scene.add(this.group);
  }

  syncAll(list: StructureState[]): void {
    const incoming = new Set<string>();
    for (const s of list) {
      incoming.add(s.id);
      this.upsert(s);
    }
    for (const id of Array.from(this.visuals.keys())) {
      if (!incoming.has(id)) this.remove(id);
    }
  }

  upsert(state: StructureState): void {
    let vis = this.visuals.get(state.id);
    if (!vis) {
      vis = this.buildVisual(state);
      vis.group.traverse((o) => {
        o.userData.structureId = state.id;
        o.userData.structureKind = state.kind;
      });
      this.group.add(vis.group);
      this.visuals.set(state.id, vis);
    }
    vis.state = state;
    vis.group.position.set(state.x, state.y, state.z);
    vis.group.rotation.y = state.rotY;

    if (vis.flame) vis.flame.visible = Boolean(state.lit);
    if (vis.light) vis.light.visible = Boolean(state.lit);
  }

  remove(id: string): void {
    const vis = this.visuals.get(id);
    if (!vis) return;
    this.group.remove(vis.group);
    this.visuals.delete(id);
  }

  getLitCampfirePositions(): THREE.Vector3[] {
    const out: THREE.Vector3[] = [];
    for (const vis of this.visuals.values()) {
      if ((vis.state.kind === 'campfire' || vis.state.kind === 'furnace') && vis.state.lit) {
        out.push(vis.group.position);
      }
    }
    return out;
  }

  // Holographic placement preview for Build Mode
  updateGhost(
    kind: StructureKind | null,
    x: number,
    y: number,
    z: number,
    rotY: number,
    valid: boolean
  ): void {
    if (!kind) {
      if (this.ghostGroup) {
        this.group.remove(this.ghostGroup);
        this.ghostGroup = null;
        this.ghostKind = null;
      }
      return;
    }

    if (this.ghostKind !== kind || !this.ghostGroup) {
      if (this.ghostGroup) this.group.remove(this.ghostGroup);
      const dummyState: StructureState = {
        id: 'ghost',
        kind,
        ownerId: '',
        ownerName: '',
        x,
        y,
        z,
        rotY,
        hp: 100,
        maxHp: 100,
        lit: false,
      };
      this.ghostGroup = this.buildVisual(dummyState, true).group;
      this.ghostKind = kind;
      this.group.add(this.ghostGroup);
    }

    this.ghostGroup.position.set(x, y, z);
    this.ghostGroup.rotation.y = rotY;
    const mat = valid ? this.ghostValidMat : this.ghostInvalidMat;
    this.ghostGroup.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).material = mat;
        o.castShadow = false;
        o.receiveShadow = false;
      }
    });
  }

  private buildVisual(state: StructureState, isGhost = false): StructureVisual {
    const g = new THREE.Group();
    const vis: StructureVisual = { group: g, state };

    switch (state.kind) {
      case 'campfire': {
        // Ring of 8 river stones
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), this.mats.stone);
          rock.position.set(Math.cos(a) * 0.62, 0.14, Math.sin(a) * 0.62);
          rock.castShadow = true;
          g.add(rock);
        }
        // Crossed firewood logs
        for (let i = 0; i < 3; i++) {
          const log = new THREE.Mesh(
            new THREE.CylinderGeometry(0.09, 0.1, 1.05, 6),
            this.mats.woodDark
          );
          log.rotation.z = Math.PI / 2;
          log.rotation.y = (i / 3) * Math.PI;
          log.position.y = 0.14;
          g.add(log);
        }
        const coalBed = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.1, 8), this.mats.ember);
        coalBed.position.y = 0.08;
        g.add(coalBed);

        if (!isGhost) {
          const flame = new THREE.Group();
          const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.92, 6), this.mats.flameOuter);
          f1.position.y = 0.5;
          const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.62, 6), this.mats.flameInner);
          f2.position.y = 0.38;
          flame.add(f1, f2);
          g.add(flame);
          vis.flame = flame;

          const light = new THREE.PointLight('#ff8a33', 5.5, 16, 1.6);
          light.position.set(0, 1.25, 0);
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'workbench': {
        const top = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.16, 1.05), this.mats.wood);
        top.position.y = 0.95;
        top.castShadow = true;
        top.receiveShadow = true;
        g.add(top);
        const legOffsets: [number, number][] = [
          [-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4],
        ];
        for (const [lx, lz] of legOffsets) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.95, 0.16), this.mats.woodDark);
          leg.position.set(lx, 0.47, lz);
          leg.castShadow = true;
          g.add(leg);
        }
        // Small vise & tool rack detail
        const rack = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.52, 0.1), this.mats.woodDark);
        rack.position.set(0, 1.25, -0.46);
        g.add(rack);
        const anvil = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.22), this.mats.iron);
        anvil.position.set(0.55, 1.12, 0.1);
        g.add(anvil);
        break;
      }

      case 'furnace': {
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.1, 1.5, 8), this.mats.stone);
        base.position.y = 0.75;
        base.castShadow = true;
        base.receiveShadow = true;
        g.add(base);
        const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.72, 1.25, 8), this.mats.stone);
        chimney.position.y = 2.05;
        chimney.castShadow = true;
        g.add(chimney);
        const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.56, 0.35), this.mats.ember);
        mouth.position.set(0, 0.52, 0.84);
        g.add(mouth);
        if (!isGhost) {
          const light = new THREE.PointLight('#ff6b22', 4.4, 13, 1.6);
          light.position.set(0, 0.8, 1.25);
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'runic_forge': {
        const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.15, 0.95, 6), this.mats.stone);
        ped.position.y = 0.48;
        ped.castShadow = true;
        g.add(ped);
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.46, 0), this.mats.crystal);
        crystal.position.y = 1.68;
        g.add(crystal);
        vis.crystal = crystal;
        if (!isGhost) {
          const light = new THREE.PointLight('#38f2dc', 5.0, 15, 1.5);
          light.position.set(0, 1.8, 0);
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'wood_foundation': {
        const deck = new THREE.Mesh(new THREE.BoxGeometry(BUILD_GRID, 0.32, BUILD_GRID), this.mats.wood);
        deck.position.y = 0.36;
        deck.castShadow = true;
        deck.receiveShadow = true;
        g.add(deck);
        // 4 sturdy corner pilings extending into sloped ground
        const p = BUILD_GRID * 0.44;
        for (const [px, pz] of [[-p, -p], [p, -p], [-p, p], [p, p]]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 1.8, 6), this.mats.woodDark);
          post.position.set(px, -0.5, pz);
          post.castShadow = true;
          g.add(post);
        }
        break;
      }

      case 'wood_wall': {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(BUILD_GRID, WALL_HEIGHT, 0.28), this.mats.wood);
        wall.position.y = WALL_HEIGHT * 0.5;
        wall.castShadow = true;
        wall.receiveShadow = true;
        g.add(wall);
        // Timber corner beams
        for (const sx of [-BUILD_GRID * 0.48, BUILD_GRID * 0.48]) {
          const beam = new THREE.Mesh(new THREE.BoxGeometry(0.24, WALL_HEIGHT + 0.08, 0.36), this.mats.woodDark);
          beam.position.set(sx, WALL_HEIGHT * 0.5, 0);
          g.add(beam);
        }
        break;
      }

      case 'wood_doorway': {
        const sideW = (BUILD_GRID - 1.25) * 0.5;
        const left = new THREE.Mesh(new THREE.BoxGeometry(sideW, WALL_HEIGHT, 0.28), this.mats.wood);
        left.position.set(-(BUILD_GRID * 0.5 - sideW * 0.5), WALL_HEIGHT * 0.5, 0);
        left.castShadow = true;
        left.receiveShadow = true;
        const right = left.clone();
        right.position.x = -left.position.x;
        const header = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.62, 0.3), this.mats.woodDark);
        header.position.set(0, WALL_HEIGHT - 0.31, 0);
        g.add(left, right, header);

        // Hinged swinging door leaf
        const pivot = new THREE.Group();
        pivot.position.set(-0.6, 0, 0);
        const doorLeaf = new THREE.Mesh(new THREE.BoxGeometry(1.18, WALL_HEIGHT - 0.64, 0.14), this.mats.woodDark);
        doorLeaf.position.set(0.59, (WALL_HEIGHT - 0.64) * 0.5, 0);
        doorLeaf.castShadow = true;
        const handle = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), this.mats.iron);
        handle.position.set(1.02, 1.15, 0.1);
        pivot.add(doorLeaf, handle);
        g.add(pivot);
        vis.doorPivot = pivot;
        break;
      }

      case 'wood_roof': {
        const roof = new THREE.Mesh(
          new THREE.BoxGeometry(BUILD_GRID + 0.35, 0.28, BUILD_GRID + 0.35),
          this.mats.roof
        );
        roof.position.y = 0.14;
        roof.castShadow = true;
        roof.receiveShadow = true;
        g.add(roof);
        break;
      }

      case 'wood_stairs': {
        for (let step = 0; step < 5; step++) {
          const tread = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 0.58), this.mats.wood);
          tread.position.set(0, 0.12 + step * 0.24, -1.0 + step * 0.5);
          tread.castShadow = true;
          tread.receiveShadow = true;
          g.add(tread);
        }
        break;
      }

      case 'stone_wall': {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(BUILD_GRID, WALL_HEIGHT, 0.52), this.mats.stone);
        wall.position.y = WALL_HEIGHT * 0.5;
        wall.castShadow = true;
        wall.receiveShadow = true;
        g.add(wall);
        // Battlement crenels along top
        for (const cx of [-1.05, 0, 1.05]) {
          const cr = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.56), this.mats.stone);
          cr.position.set(cx, WALL_HEIGHT + 0.21, 0);
          cr.castShadow = true;
          g.add(cr);
        }
        break;
      }

      case 'spike_barricade': {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.22, 0.25), this.mats.woodDark);
        rail.position.y = 0.65;
        g.add(rail);
        for (let i = -2; i <= 2; i++) {
          const stake = new THREE.Mesh(new THREE.ConeGeometry(0.14, 1.9, 6), this.mats.wood);
          stake.position.set(i * 0.52, 0.85, 0);
          stake.rotation.x = 0.42;
          stake.castShadow = true;
          g.add(stake);
        }
        break;
      }

      case 'storage_chest': {
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.72, 0.78), this.mats.wood);
        body.position.y = 0.36;
        body.castShadow = true;
        body.receiveShadow = true;
        g.add(body);
        const lid = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.2, 0.82), this.mats.woodDark);
        lid.position.y = 0.78;
        lid.castShadow = true;
        g.add(lid);
        const latch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.1), this.mats.iron);
        latch.position.set(0, 0.68, 0.42);
        g.add(latch);
        break;
      }

      case 'bedroll': {
        const mat = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.16, 2.05), this.mats.cloth);
        mat.position.y = 0.09;
        mat.receiveShadow = true;
        const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.22, 0.42), this.mats.hide);
        pillow.position.set(0, 0.2, -0.72);
        g.add(mat, pillow);
        break;
      }

      case 'rain_collector': {
        const tub = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.62, 0.9, 10), this.mats.wood);
        tub.position.y = 0.45;
        tub.castShadow = true;
        g.add(tub);
        const water = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.64, 0.12, 10), this.mats.water);
        water.position.y = 0.4;
        g.add(water);
        vis.waterMesh = water;
        // Catcher funnel posts
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2;
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.55, 5), this.mats.woodDark);
          post.position.set(Math.cos(a) * 0.68, 0.8, Math.sin(a) * 0.68);
          g.add(post);
        }
        break;
      }

      case 'lantern_post': {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 3.1, 6), this.mats.woodDark);
        post.position.y = 1.55;
        post.castShadow = true;
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.1), this.mats.woodDark);
        arm.position.set(0.35, 2.95, 0);
        const lamp = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), this.mats.flameInner);
        lamp.position.set(0.68, 2.68, 0);
        g.add(post, arm, lamp);
        if (!isGhost) {
          const light = new THREE.PointLight('#ffbd59', 5.2, 18, 1.5);
          light.position.set(0.68, 2.6, 0);
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'watchtower_beacon': {
        const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, 4.4, 8), this.mats.stone);
        base.position.y = 2.2;
        base.castShadow = true;
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 0.75, 0.65, 8), this.mats.iron);
        bowl.position.y = 4.6;
        const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.62, 1), this.mats.crystal);
        orb.position.y = 5.4;
        g.add(base, bowl, orb);
        vis.crystal = orb;
        if (!isGhost) {
          const light = new THREE.PointLight('#38f2dc', 9.0, 32, 1.3);
          light.position.set(0, 5.6, 0);
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'dock_pier': {
        const deck = new THREE.Mesh(new THREE.BoxGeometry(BUILD_GRID, 0.24, BUILD_GRID), this.mats.wood);
        deck.position.y = 0.36;
        deck.castShadow = true;
        deck.receiveShadow = true;
        g.add(deck);
        // Tall sturdy pilings reaching down into seabed
        const p = BUILD_GRID * 0.44;
        for (const [px, pz] of [[-p, -p], [p, -p], [-p, p], [p, p]]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 5.2, 7), this.mats.woodDark);
          post.position.set(px, -1.7, pz);
          post.castShadow = true;
          g.add(post);
        }
        // Mooring bollard
        const bollard = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.65, 8), this.mats.woodDark);
        bollard.position.set(p * 0.85, 0.72, p * 0.85);
        g.add(bollard);
        break;
      }

      case 'lighthouse_beacon': {
        const tower = new THREE.Mesh(
          new THREE.CylinderGeometry(1.05, 1.65, 7.6, 12),
          new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.75 })
        );
        tower.position.y = 3.8;
        tower.castShadow = true;
        tower.receiveShadow = true;
        const stripe = new THREE.Mesh(
          new THREE.CylinderGeometry(1.25, 1.42, 1.8, 12),
          new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.72 })
        );
        stripe.position.y = 4.2;
        const gallery = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.3, 0.35, 12), this.mats.iron);
        gallery.position.y = 7.65;
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(1.25, 1.2, 12),
          new THREE.MeshStandardMaterial({ color: '#b91c1c', roughness: 0.65 })
        );
        cap.position.y = 9.2;
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 12, 12),
          new THREE.MeshBasicMaterial({ color: '#fef08a' })
        );
        orb.position.y = 8.25;
        g.add(tower, stripe, gallery, cap, orb);

        // Sweeping volumetric rotating lighthouse beam!
        const spinner = new THREE.Group();
        spinner.position.y = 8.25;
        const beamMat = new THREE.MeshBasicMaterial({
          color: '#fde68a',
          transparent: true,
          opacity: 0.17,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        for (const dir of [-1, 1]) {
          const cone = new THREE.Mesh(new THREE.ConeGeometry(4.2, 34, 14, 1, true), beamMat);
          cone.rotation.z = (dir * Math.PI) / 2;
          cone.position.x = dir * 17;
          spinner.add(cone);
        }
        g.add(spinner);
        vis.spinner = spinner;

        if (!isGhost) {
          const light = new THREE.PointLight('#fde047', 11, 45, 1.2);
          light.position.y = 8.3;
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'planter_box': {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.55, 1.25), this.mats.wood);
        frame.position.y = 0.28;
        frame.castShadow = true;
        const soil = new THREE.Mesh(
          new THREE.BoxGeometry(1.65, 0.14, 1.05),
          new THREE.MeshStandardMaterial({ color: '#3f2818', roughness: 0.96 })
        );
        soil.position.y = 0.52;
        g.add(frame, soil);

        const cropGroup = new THREE.Group();
        const leafMat = new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.7 });
        const bloomMat = new THREE.MeshStandardMaterial({
          color: '#fde047',
          emissive: '#f59e0b',
          emissiveIntensity: 0.55,
        });
        for (let i = -1; i <= 1; i++) {
          const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), leafMat);
          bush.position.set(i * 0.48, 0.72, 0);
          const flower = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), bloomMat);
          flower.position.set(i * 0.48, 0.96, 0);
          cropGroup.add(bush, flower);
        }
        g.add(cropGroup);
        vis.cropGroup = cropGroup;
        break;
      }

      case 'alchemy_cauldron': {
        const pot = new THREE.Mesh(new THREE.SphereGeometry(0.68, 12, 10, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.7), this.mats.iron);
        pot.position.y = 0.85;
        pot.castShadow = true;
        const brew = new THREE.Mesh(
          new THREE.CircleGeometry(0.56, 12),
          new THREE.MeshBasicMaterial({ color: '#2dd4bf' })
        );
        brew.rotation.x = -Math.PI / 2;
        brew.position.y = 1.02;
        g.add(pot, brew);
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.55, 6), this.mats.woodDark);
          leg.position.set(Math.cos(a) * 0.58, 0.75, Math.sin(a) * 0.58);
          leg.rotation.z = Math.cos(a) * 0.25;
          leg.rotation.x = -Math.sin(a) * 0.25;
          g.add(leg);
        }
        if (!isGhost) {
          const light = new THREE.PointLight('#2dd4bf', 4.2, 12, 1.6);
          light.position.y = 1.25;
          g.add(light);
          vis.light = light;
        }
        break;
      }

      case 'windmill': {
        const base = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.65, 5.8, 8), this.mats.stone);
        base.position.y = 2.9;
        base.castShadow = true;
        const roof = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.7, 8), this.mats.woodDark);
        roof.position.y = 6.55;
        g.add(base, roof);

        const rotor = new THREE.Group();
        rotor.position.set(0, 5.3, 1.25);
        const sailMat = new THREE.MeshStandardMaterial({ color: '#f5ead6', roughness: 0.85, side: THREE.DoubleSide });
        for (let i = 0; i < 4; i++) {
          const arm = new THREE.Group();
          arm.rotation.z = (i * Math.PI) / 2;
          const spar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.1), this.mats.woodDark);
          spar.position.y = 1.6;
          const canvas = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.55, 0.04), sailMat);
          canvas.position.set(0.36, 1.85, 0.04);
          arm.add(spar, canvas);
          rotor.add(arm);
        }
        g.add(rotor);
        vis.spinner = rotor;
        break;
      }

      case 'camp_banner': {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.2, 6), this.mats.woodDark);
        pole.position.y = 2.1;
        pole.castShadow = true;
        const cloth = new THREE.Mesh(
          new THREE.PlaneGeometry(1.45, 0.9),
          new THREE.MeshStandardMaterial({
            color: '#0d9488',
            emissive: '#115e59',
            emissiveIntensity: 0.25,
            side: THREE.DoubleSide,
          })
        );
        cloth.position.set(0.76, 3.55, 0);
        g.add(pole, cloth);
        vis.spinner = cloth;
        break;
      }

      case 'tiki_brazier': {
        const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.56, 1.25, 7), this.mats.stone);
        ped.position.y = 0.62;
        ped.castShadow = true;
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.35, 0.42, 8), this.mats.iron);
        bowl.position.y = 1.38;
        g.add(ped, bowl);
        const flame = new THREE.Group();
        const outer = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.95, 6), this.mats.flameOuter);
        outer.position.y = 1.85;
        const inner = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.6, 5), this.mats.flameInner);
        inner.position.y = 1.75;
        flame.add(outer, inner);
        g.add(flame);
        vis.flame = flame;
        if (!isGhost) {
          const light = new THREE.PointLight('#ff9436', 6.2, 18, 1.5);
          light.position.y = 2.0;
          g.add(light);
          vis.light = light;
        }
        break;
      }
    }

    return vis;
  }

  update(dt: number, elapsed: number): void {
    for (const vis of this.visuals.values()) {
      if (vis.flame && vis.state.lit) {
        const flicker = 0.88 + Math.sin(elapsed * 16 + vis.state.x) * 0.14 + Math.cos(elapsed * 23) * 0.08;
        vis.flame.scale.set(flicker, 0.9 + Math.sin(elapsed * 19 + vis.state.z) * 0.22, flicker);
        vis.flame.rotation.y = elapsed * 2.5;
      }
      if (vis.light && vis.state.lit && vis.state.kind === 'campfire') {
        vis.light.intensity = 5.2 + Math.sin(elapsed * 14 + vis.state.x) * 1.1;
      }
      if (vis.doorPivot) {
        const target = vis.state.isOpen ? -Math.PI * 0.56 : 0;
        vis.doorPivot.rotation.y += (target - vis.doorPivot.rotation.y) * Math.min(1, dt * 8);
      }
      if (vis.crystal) {
        vis.crystal.rotation.y = elapsed * 1.4;
        vis.crystal.position.y =
          (vis.state.kind === 'watchtower_beacon' ? 5.45 : 1.68) + Math.sin(elapsed * 2.5) * 0.14;
      }
      if (vis.waterMesh) {
        const lvl = (vis.state.waterLevel ?? 0) / 100;
        vis.waterMesh.position.y = 0.15 + lvl * 0.68;
        vis.waterMesh.visible = lvl > 0.04;
      }
      if (vis.spinner) {
        if (vis.state.kind === 'lighthouse_beacon') {
          vis.spinner.rotation.y = elapsed * 0.72;
        } else if (vis.state.kind === 'windmill') {
          vis.spinner.rotation.z = -elapsed * 1.15;
        } else if (vis.state.kind === 'camp_banner') {
          vis.spinner.rotation.y = Math.sin(elapsed * 4.5 + vis.state.x) * 0.24;
        }
      }
      if (vis.cropGroup) {
        const prog = (vis.state.cropProgress ?? 30) / 100;
        const sc = 0.35 + prog * 0.75;
        vis.cropGroup.scale.set(sc, sc, sc);
      }
    }
  }
}
