import * as THREE from 'three';
import {
  WATER_LEVEL,
  WorldGenerator,
  createRng,
  type ResourceNodeKind,
  type ResourceNodeState,
} from '@wildreach/shared';
import type { ProceduralTextureSet } from './Textures';

interface NodeVisual {
  group: THREE.Group;
  baseX: number;
  baseY: number;
  baseZ: number;
  baseRotY: number;
  shakeTime: number;
  kind: ResourceNodeKind;
}

export class EnvironmentManager {
  readonly root = new THREE.Group();
  readonly nodeGroup = new THREE.Group();
  private nodeVisuals = new Map<string, NodeVisual>();
  private grassUniforms = {
    uTime: { value: 0 },
    uWindSpeed: { value: 1.0 },
  };
  private runeGlowMeshes: THREE.Mesh[] = [];
  private sharedMats: Record<string, THREE.Material> = {};

  constructor(
    scene: THREE.Scene,
    world: WorldGenerator,
    textures: ProceduralTextureSet,
    grassCount = 7500
  ) {
    this.initSharedMaterials(textures);
    this.buildLandmarks(world, textures);
    this.buildInstancedGrass(world, grassCount);
    this.root.add(this.nodeGroup);
    scene.add(this.root);
  }

  private initSharedMaterials(textures: ProceduralTextureSet): void {
    this.sharedMats = {
      barkDark: new THREE.MeshStandardMaterial({
        map: textures.barkDark,
        roughness: 0.92,
      }),
      barkBirch: new THREE.MeshStandardMaterial({
        map: textures.barkBirch,
        roughness: 0.85,
      }),
      barkPalm: new THREE.MeshStandardMaterial({
        color: '#8f6c47',
        map: textures.barkDark,
        roughness: 0.9,
      }),
      pineNeedle: new THREE.MeshStandardMaterial({
        color: '#2d5a36',
        map: textures.leafCluster,
        roughness: 0.82,
      }),
      pineNeedleLight: new THREE.MeshStandardMaterial({
        color: '#3b6e3f',
        map: textures.leafCluster,
        roughness: 0.82,
      }),
      oakLeaf: new THREE.MeshStandardMaterial({
        color: '#4c8037',
        map: textures.leafCluster,
        roughness: 0.78,
      }),
      birchLeaf: new THREE.MeshStandardMaterial({
        color: '#86a93f',
        map: textures.leafCluster,
        roughness: 0.76,
      }),
      palmLeaf: new THREE.MeshStandardMaterial({
        color: '#538c38',
        roughness: 0.75,
        side: THREE.DoubleSide,
      }),
      marshLeaf: new THREE.MeshStandardMaterial({
        color: '#465e3b',
        map: textures.leafCluster,
        roughness: 0.85,
      }),
      stone: new THREE.MeshStandardMaterial({
        color: '#7c828a',
        map: textures.stoneMasonry,
        bumpMap: textures.stoneMasonryBump,
        bumpScale: 0.14,
        roughness: 0.88,
      }),
      stoneDark: new THREE.MeshStandardMaterial({
        color: '#494e56',
        roughness: 0.85,
      }),
      copper: new THREE.MeshStandardMaterial({
        color: '#d47c44',
        metalness: 0.62,
        roughness: 0.35,
      }),
      iron: new THREE.MeshStandardMaterial({
        color: '#a7b5c4',
        metalness: 0.72,
        roughness: 0.32,
      }),
      obsidian: new THREE.MeshStandardMaterial({
        color: '#2c1f3f',
        emissive: '#1e1036',
        metalness: 0.4,
        roughness: 0.18,
      }),
      crystal: new THREE.MeshStandardMaterial({
        color: '#49f2e1',
        emissive: '#18b8ad',
        emissiveIntensity: 0.75,
        roughness: 0.15,
        metalness: 0.25,
      }),
      berryLeaf: new THREE.MeshStandardMaterial({
        color: '#366b32',
        roughness: 0.82,
      }),
      berry: new THREE.MeshStandardMaterial({
        color: '#e63956',
        emissive: '#380912',
        roughness: 0.35,
      }),
      reed: new THREE.MeshStandardMaterial({
        color: '#6da345',
        roughness: 0.8,
        side: THREE.DoubleSide,
      }),
      mushroomCap: new THREE.MeshStandardMaterial({
        color: '#c9783e',
        roughness: 0.65,
      }),
      mushroomStem: new THREE.MeshStandardMaterial({
        color: '#e8dec8',
        roughness: 0.78,
      }),
      crateWood: new THREE.MeshStandardMaterial({
        map: textures.woodPlank,
        bumpMap: textures.woodPlankBump,
        bumpScale: 0.12,
        roughness: 0.82,
      }),
      ironBand: new THREE.MeshStandardMaterial({
        color: '#383d45',
        metalness: 0.75,
        roughness: 0.42,
      }),
    };
  }

  private buildLandmarks(world: WorldGenerator, textures: ProceduralTextureSet): void {
    const stoneMat = new THREE.MeshStandardMaterial({
      map: textures.stoneMasonry,
      bumpMap: textures.stoneMasonryBump,
      bumpScale: 0.2,
      color: '#9aa0a6',
      roughness: 0.9,
    });
    const runeMat = new THREE.MeshStandardMaterial({
      color: '#5cf2e6',
      emissive: '#22d3ee',
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });

    // 1. Runestone Sanctuary (-10, 18) — Ring of 6 towering carved monoliths + hearth pedestal
    const sancX = -10;
    const sancZ = 18;
    const sancY = world.getHeight(sancX, sancZ);
    const sancGroup = new THREE.Group();
    sancGroup.position.set(sancX, sancY, sancZ);

    const dais = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 6.2, 0.38, 12), stoneMat);
    dais.position.y = 0.12;
    dais.receiveShadow = true;
    sancGroup.add(dais);

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.25;
      const pillar = new THREE.Group();
      const h = 4.2 + (i % 2) * 1.1;
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.15, h, 0.72), stoneMat);
      body.position.y = h * 0.5;
      body.castShadow = true;
      body.receiveShadow = true;
      pillar.add(body);

      // Tapered capstone
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.95, 4), stoneMat);
      cap.position.y = h + 0.45;
      cap.rotation.y = Math.PI / 4;
      cap.castShadow = true;
      pillar.add(cap);

      // Glowing etched rune strip facing inward
      const rune = new THREE.Mesh(new THREE.BoxGeometry(0.18, h * 0.52, 0.08), runeMat);
      rune.position.set(0, h * 0.52, 0.37);
      pillar.add(rune);
      this.runeGlowMeshes.push(rune);

      pillar.position.set(Math.cos(a) * 6.8, -0.1, Math.sin(a) * 6.8);
      pillar.lookAt(sancX, sancY + 2, sancZ);
      pillar.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.05;
      sancGroup.add(pillar);
    }

    const sanctuaryLight = new THREE.PointLight('#38f2dc', 2.4, 18, 1.5);
    sanctuaryLight.position.set(0, 3.4, 0);
    sancGroup.add(sanctuaryLight);

    // Floating runic heart crystal hovering above the central sanctuary dais
    const heartCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), runeMat);
    heartCrystal.position.set(0, 2.75, 0);
    sancGroup.add(heartCrystal);
    this.runeGlowMeshes.push(heartCrystal);
    this.root.add(sancGroup);

    // 1b. Crystal Spring Freshwater Oasis (16, 8) — Mossy boulders & blooming lily pads
    const springGroup = new THREE.Group();
    const padMat = new THREE.MeshStandardMaterial({ color: '#3b8c42', roughness: 0.72, side: THREE.DoubleSide });
    const lotusMat = new THREE.MeshStandardMaterial({ color: '#f9a8d4', emissive: '#9d174d', emissiveIntensity: 0.25, roughness: 0.5 });
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + 0.15;
      const rad = 7.4 + (i % 3) * 1.4;
      const rx = 16 + Math.cos(a) * rad;
      const rz = 8 + Math.sin(a) * rad;
      const ry = world.getHeight(rx, rz);
      const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(0.65 + (i % 3) * 0.28, 0), stoneMat);
      boulder.position.set(rx, ry + 0.15, rz);
      boulder.scale.set(1.25, 0.72, 1.05);
      boulder.rotation.set(i * 0.4, i * 1.1, 0);
      boulder.castShadow = true;
      boulder.receiveShadow = true;
      springGroup.add(boulder);
    }
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const rad = 2.0 + (i % 4) * 1.3;
      const px = 16 + Math.cos(a) * rad;
      const pz = 8 + Math.sin(a) * rad;
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.45 + (i % 2) * 0.18, 0.45, 0.04, 9), padMat);
      pad.position.set(px, WATER_LEVEL + 0.04, pz);
      springGroup.add(pad);
      if (i % 2 === 0) {
        const flower = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), lotusMat);
        flower.position.set(px, WATER_LEVEL + 0.14, pz);
        springGroup.add(flower);
      }
    }
    this.root.add(springGroup);

    // 2. Wreck of the Dawnbreaker (-14, 112) — Half-buried tilted wooden ship hull
    const wreckX = -14;
    const wreckZ = 112;
    const wreckY = world.getHeight(wreckX, wreckZ);
    const wreck = new THREE.Group();
    wreck.position.set(wreckX, wreckY + 0.4, wreckZ);
    wreck.rotation.set(0.16, 0.62, -0.22);

    const hullMat = new THREE.MeshStandardMaterial({
      map: textures.woodPlank,
      color: '#6b4a2f',
      roughness: 0.92,
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.8, 14.5), hullMat);
    hull.castShadow = true;
    hull.receiveShadow = true;
    wreck.add(hull);

    // Tapered bow
    const bow = new THREE.Mesh(new THREE.ConeGeometry(3.5, 5.2, 4), hullMat);
    bow.rotation.x = Math.PI / 2;
    bow.rotation.y = Math.PI / 4;
    bow.position.set(0, 0.2, 9.2);
    bow.castShadow = true;
    wreck.add(bow);

    // Snapped mainmast + cross spar + tattered sail
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 9.5, 8), hullMat);
    mast.position.set(0, 5.2, 0.6);
    mast.rotation.z = 0.14;
    mast.castShadow = true;
    wreck.add(mast);

    const spar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 6.8, 7), hullMat);
    spar.rotation.z = Math.PI / 2 + 0.12;
    spar.position.set(0.4, 7.6, 0.8);
    wreck.add(spar);

    const sailMat = new THREE.MeshStandardMaterial({
      color: '#ddd3be',
      roughness: 0.95,
      side: THREE.DoubleSide,
    });
    const sail = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.6), sailMat);
    sail.position.set(0.4, 5.8, 1.05);
    sail.rotation.y = 0.08;
    wreck.add(sail);
    this.root.add(wreck);

    // 3. Northern Stone Watchtower Ruin (-44, -62)
    const twX = -44;
    const twZ = -62;
    const twY = world.getHeight(twX, twZ);
    const tower = new THREE.Group();
    tower.position.set(twX, twY, twZ);

    const baseWall = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.8, 7.5, 8, 1, true),
      stoneMat
    );
    baseWall.position.y = 3.5;
    baseWall.castShadow = true;
    baseWall.receiveShadow = true;
    tower.add(baseWall);

    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      const merlon = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.3 + (i % 2) * 0.7, 0.7), stoneMat);
      merlon.position.set(Math.cos(ang) * 3.3, 7.6, Math.sin(ang) * 3.3);
      merlon.lookAt(twX, twY + 7.6, twZ);
      merlon.castShadow = true;
      tower.add(merlon);
    }
    this.root.add(tower);

    // 4. Sunken Bog Arches (84, 36)
    const bogGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ax = 78 + i * 7.5;
      const az = 32 + i * 3.8;
      const ay = world.getHeight(ax, az);
      const arch = new THREE.Group();
      arch.position.set(ax, ay, az);
      arch.rotation.y = 0.48;

      const leftP = new THREE.Mesh(new THREE.BoxGeometry(1.1, 5.2, 1.1), stoneMat);
      leftP.position.set(-2.3, 2.4, 0);
      leftP.castShadow = true;
      const rightP = new THREE.Mesh(new THREE.BoxGeometry(1.1, 4.8, 1.1), stoneMat);
      rightP.position.set(2.3, 2.2, 0);
      rightP.castShadow = true;
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(6.0, 1.0, 1.25), stoneMat);
      lintel.position.set(0, 5.0, 0);
      lintel.rotation.z = i === 2 ? -0.14 : 0.03;
      lintel.castShadow = true;

      arch.add(leftP, rightP, lintel);
      bogGroup.add(arch);
    }
    this.root.add(bogGroup);
  }

  private buildInstancedGrass(world: WorldGenerator, targetCount: number): void {
    // Crossed 2-blade curved tuft geometry for lush wind-swept grass
    const blade = new THREE.PlaneGeometry(0.42, 0.72, 1, 2);
    blade.translate(0, 0.36, 0);

    // Slight curve on top vertices
    const pos = blade.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0.5) {
        pos.setZ(i, 0.14);
        pos.setX(i, pos.getX(i) * 0.25);
      } else if (y > 0.2) {
        pos.setZ(i, 0.04);
      }
    }
    blade.computeVertexNormals();

    const mat = new THREE.MeshLambertMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide,
    });

    // Inject GPU wind wave animation!
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.grassUniforms.uTime;
      shader.uniforms.uWindSpeed = this.grassUniforms.uWindSpeed;
      shader.vertexShader =
        `uniform float uTime;\nuniform float uWindSpeed;\n` + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vec4 instWorld = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float sway = sin(uTime * (1.8 + uWindSpeed * 0.7) + instWorld.x * 0.28 + instWorld.z * 0.22) * 0.18 * uWindSpeed;
        float sway2 = cos(uTime * 1.1 + instWorld.z * 0.45) * 0.09;
        float tipMask = clamp(position.y / 0.72, 0.0, 1.0);
        transformed.x += (sway + sway2) * tipMask * tipMask;
        transformed.z += sway * 0.5 * tipMask * tipMask;
        `
      );
    };

    const rng = createRng(world.seed + 9191);
    const matrices: THREE.Matrix4[] = [];
    const colors: THREE.Color[] = [];
    const dummy = new THREE.Object3D();

    const meadowGreens = ['#5d9c3f', '#6eb044', '#4d8739', '#7bb34b'];
    const pineGreens = ['#3f6c38', '#4b7a3d', '#355c33'];
    const flowers = ['#f4d35e', '#f7f4ea', '#ec7d8d', '#9dc6f7'];

    let tries = 0;
    while (matrices.length < targetCount && tries < targetCount * 3) {
      tries++;
      const x = (rng() * 2 - 1) * 140;
      const z = (rng() * 2 - 1) * 140;
      const s = world.sample(x, z);
      if (s.height < 1.75 || s.height > 12.2 || s.slope > 0.52) continue;
      if (s.biome === 'volcanic' || s.biome === 'beach' || s.biome === 'ocean') continue;

      const scale = 0.65 + rng() * 0.95;
      dummy.position.set(x, s.height - 0.04, z);
      dummy.rotation.set(0, rng() * Math.PI * 2, (rng() - 0.5) * 0.15);
      dummy.scale.set(scale, scale * (0.8 + rng() * 0.55), scale);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());

      let colHex: string;
      if (s.biome === 'meadow' && rng() < 0.085) {
        colHex = flowers[Math.floor(rng() * flowers.length)];
      } else if (s.biome === 'meadow') {
        colHex = meadowGreens[Math.floor(rng() * meadowGreens.length)];
      } else {
        colHex = pineGreens[Math.floor(rng() * pineGreens.length)];
      }
      colors.push(new THREE.Color(colHex));
    }

    const inst = new THREE.InstancedMesh(blade, mat, matrices.length);
    for (let i = 0; i < matrices.length; i++) {
      inst.setMatrixAt(i, matrices[i]);
      inst.setColorAt(i, colors[i]);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.receiveShadow = true;
    this.root.add(inst);
  }

  syncNodes(nodes: ResourceNodeState[]): void {
    for (const node of nodes) {
      this.upsertNode(node);
    }
  }

  upsertNode(node: ResourceNodeState): void {
    let vis = this.nodeVisuals.get(node.id);
    if (!vis) {
      const group = this.createNodeMesh(node.kind);
      group.position.set(node.x, node.y, node.z);
      group.rotation.y = node.rotY;
      group.scale.setScalar(node.scale);
      group.traverse((obj) => {
        obj.userData.nodeId = node.id;
        obj.userData.nodeKind = node.kind;
      });
      this.nodeGroup.add(group);
      vis = {
        group,
        baseX: node.x,
        baseY: node.y,
        baseZ: node.z,
        baseRotY: node.rotY,
        shakeTime: 0,
        kind: node.kind,
      };
      this.nodeVisuals.set(node.id, vis);
    } else if (!node.depleted && vis.group.visible && node.hp < node.maxHp) {
      vis.shakeTime = 0.24;
    }

    vis.group.visible = !node.depleted;
  }

  getNodeVisualClone(nodeId: string): THREE.Object3D | null {
    const vis = this.nodeVisuals.get(nodeId);
    if (!vis) return null;
    const clone = vis.group.clone();
    clone.visible = true;
    return clone;
  }

  private createNodeMesh(kind: ResourceNodeKind): THREE.Group {
    const g = new THREE.Group();

    if (kind === 'pine_tree') {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.42, 3.6, 7),
        this.sharedMats.barkDark
      );
      trunk.position.y = 1.75;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      g.add(trunk);

      const tiers = [
        { y: 3.1, r: 2.15, h: 2.4 },
        { y: 4.5, r: 1.75, h: 2.2 },
        { y: 5.8, r: 1.32, h: 2.0 },
        { y: 6.9, r: 0.82, h: 1.6 },
      ];
      tiers.forEach((t, idx) => {
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(t.r, t.h, 7),
          idx % 2 === 0 ? this.sharedMats.pineNeedle : this.sharedMats.pineNeedleLight
        );
        cone.position.y = t.y;
        cone.rotation.y = idx * 0.65;
        cone.castShadow = true;
        cone.receiveShadow = true;
        g.add(cone);
      });
    } else if (kind === 'oak_tree') {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.52, 3.2, 7),
        this.sharedMats.barkDark
      );
      trunk.position.y = 1.55;
      trunk.castShadow = true;
      g.add(trunk);

      const blobs: [number, number, number, number][] = [
        [0, 4.1, 0, 1.85],
        [1.1, 3.6, 0.5, 1.35],
        [-1.0, 3.7, -0.6, 1.4],
        [0.3, 4.9, -0.4, 1.25],
      ];
      for (const [bx, by, bz, br] of blobs) {
        const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(br, 1), this.sharedMats.oakLeaf);
        crown.position.set(bx, by, bz);
        crown.scale.set(1.05, 0.85, 1.05);
        crown.castShadow = true;
        crown.receiveShadow = true;
        g.add(crown);
      }
    } else if (kind === 'birch_tree') {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.28, 4.2, 7),
        this.sharedMats.barkBirch
      );
      trunk.position.y = 2.05;
      trunk.castShadow = true;
      g.add(trunk);

      const blobs: [number, number, number, number][] = [
        [0, 4.5, 0, 1.45],
        [0.75, 4.0, 0.4, 1.05],
        [-0.7, 4.2, -0.35, 1.1],
      ];
      for (const [bx, by, bz, br] of blobs) {
        const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(br, 1), this.sharedMats.birchLeaf);
        crown.position.set(bx, by, bz);
        crown.castShadow = true;
        g.add(crown);
      }
    } else if (kind === 'palm_tree') {
      // Gently curving segmented coastal palm
      let py = 0;
      let px = 0;
      for (let seg = 0; seg < 5; seg++) {
        const sMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18 - seg * 0.015, 0.24 - seg * 0.015, 1.15, 7),
          this.sharedMats.barkPalm
        );
        sMesh.position.set(px, py + 0.52, 0);
        sMesh.rotation.z = -seg * 0.08;
        sMesh.castShadow = true;
        g.add(sMesh);
        py += 1.05;
        px += seg * 0.12;
      }
      // 7 arching palm fronds
      for (let f = 0; f < 7; f++) {
        const ang = (f / 7) * Math.PI * 2;
        const frondGeo = new THREE.PlaneGeometry(0.75, 2.8, 1, 3);
        const fPos = frondGeo.attributes.position as THREE.BufferAttribute;
        for (let vi = 0; vi < fPos.count; vi++) {
          const y = fPos.getY(vi) + 1.4;
          fPos.setY(vi, y);
          fPos.setZ(vi, -y * y * 0.16);
        }
        frondGeo.computeVertexNormals();
        const frond = new THREE.Mesh(frondGeo, this.sharedMats.palmLeaf);
        frond.position.set(px, py, 0);
        frond.rotation.y = ang;
        frond.rotation.x = 1.08;
        frond.castShadow = true;
        g.add(frond);
      }
      // Coconuts tucked beneath crown
      for (let c = 0; c < 3; c++) {
        const a = (c / 3) * Math.PI * 2;
        const nut = new THREE.Mesh(new THREE.SphereGeometry(0.19, 6, 6), this.sharedMats.barkDark);
        nut.position.set(px + Math.cos(a) * 0.28, py - 0.15, Math.sin(a) * 0.28);
        g.add(nut);
      }
    } else if (kind === 'marsh_tree') {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.55, 3.0, 6),
        this.sharedMats.barkDark
      );
      trunk.position.y = 1.45;
      trunk.rotation.z = 0.12;
      trunk.castShadow = true;
      g.add(trunk);

      const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(1.9, 1), this.sharedMats.marshLeaf);
      canopy.position.set(0.3, 3.5, 0);
      canopy.scale.set(1.25, 0.72, 1.25);
      canopy.castShadow = true;
      g.add(canopy);
    } else if (
      kind === 'stone_boulder' ||
      kind === 'copper_vein' ||
      kind === 'iron_vein' ||
      kind === 'obsidian_vein'
    ) {
      const baseMat = kind === 'obsidian_vein' ? this.sharedMats.obsidian : this.sharedMats.stone;
      const main = new THREE.Mesh(new THREE.DodecahedronGeometry(1.15, 0), baseMat);
      main.scale.set(1.18, 0.82, 1.0);
      main.position.y = 0.62;
      main.castShadow = true;
      main.receiveShadow = true;
      g.add(main);

      const side = new THREE.Mesh(new THREE.DodecahedronGeometry(0.68, 0), this.sharedMats.stoneDark);
      side.position.set(0.75, 0.42, 0.45);
      side.castShadow = true;
      g.add(side);

      if (kind !== 'stone_boulder') {
        const oreMat =
          kind === 'copper_vein'
            ? this.sharedMats.copper
            : kind === 'iron_vein'
            ? this.sharedMats.iron
            : this.sharedMats.crystal;
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * Math.PI * 2;
          const chunk = new THREE.Mesh(new THREE.OctahedronGeometry(0.28 + (k % 2) * 0.1, 0), oreMat);
          chunk.position.set(Math.cos(a) * 0.72, 0.65 + (k % 3) * 0.22, Math.sin(a) * 0.66);
          chunk.rotation.set(k, k * 1.4, 0.4);
          g.add(chunk);
        }
      }
    } else if (kind === 'ancient_crystal') {
      const base = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 0), this.sharedMats.stoneDark);
      base.scale.set(1.2, 0.55, 1.2);
      base.position.y = 0.3;
      g.add(base);

      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const h = i === 0 ? 1.9 : 1.2 + (i % 2) * 0.35;
        const shard = new THREE.Mesh(new THREE.ConeGeometry(0.26, h, 5), this.sharedMats.crystal);
        shard.position.set(Math.cos(a) * (i === 0 ? 0 : 0.38), h * 0.5 + 0.15, Math.sin(a) * (i === 0 ? 0 : 0.38));
        shard.rotation.z = i === 0 ? 0.05 : Math.cos(a) * 0.28;
        shard.rotation.x = i === 0 ? 0 : Math.sin(a) * 0.28;
        shard.castShadow = true;
        g.add(shard);
      }
    } else if (kind === 'berry_bush') {
      const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75, 1), this.sharedMats.berryLeaf);
      bush.scale.set(1.15, 0.82, 1.15);
      bush.position.y = 0.52;
      bush.castShadow = true;
      g.add(bush);

      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.085, 5, 5), this.sharedMats.berry);
        b.position.set(Math.cos(a) * 0.62, 0.42 + (i % 3) * 0.18, Math.sin(a) * 0.62);
        g.add(b);
      }
    } else if (kind === 'fiber_reed') {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const stalk = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 1.15), this.sharedMats.reed);
        stalk.position.set(Math.cos(a) * 0.22, 0.55, Math.sin(a) * 0.22);
        stalk.rotation.y = a;
        stalk.rotation.x = 0.14;
        g.add(stalk);
      }
    } else if (kind === 'mushroom_cluster') {
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const sc = 0.7 + (i % 2) * 0.4;
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.07 * sc, 0.1 * sc, 0.36 * sc, 6),
          this.sharedMats.mushroomStem
        );
        stem.position.set(Math.cos(a) * 0.25, 0.18 * sc, Math.sin(a) * 0.25);
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(0.26 * sc, 0.2 * sc, 7),
          this.sharedMats.mushroomCap
        );
        cap.position.set(stem.position.x, 0.4 * sc, stem.position.z);
        g.add(stem, cap);
      }
    } else if (kind === 'driftwood') {
      const log = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.26, 2.2, 7),
        this.sharedMats.barkPalm
      );
      log.rotation.z = Math.PI / 2;
      log.position.y = 0.22;
      log.castShadow = true;
      g.add(log);
    } else if (kind === 'supply_crate') {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.95, 1.05), this.sharedMats.crateWood);
      box.position.y = 0.48;
      box.castShadow = true;
      box.receiveShadow = true;
      g.add(box);
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.09, 0.16, 1.09), this.sharedMats.ironBand);
      band.position.y = 0.48;
      g.add(band);
    } else if (kind === 'coral_reef_node') {
      const coralMat = new THREE.MeshStandardMaterial({
        color: '#f472b6',
        emissive: '#ec4899',
        emissiveIntensity: 0.38,
        roughness: 0.55,
      });
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const branch = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.85, 6), coralMat);
        branch.position.set(Math.cos(a) * 0.28, 0.42, Math.sin(a) * 0.28);
        branch.rotation.z = Math.cos(a) * 0.35;
        branch.rotation.x = Math.sin(a) * 0.35;
        g.add(branch);
      }
      const pearl = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 10, 10),
        new THREE.MeshStandardMaterial({
          color: '#f0f9ff',
          emissive: '#38bdf8',
          emissiveIntensity: 0.65,
          roughness: 0.15,
          metalness: 0.3,
        })
      );
      pearl.position.set(0, 0.52, 0);
      g.add(pearl);
    } else if (kind === 'sunbloom_flower') {
      const stemMat = new THREE.MeshStandardMaterial({ color: '#4d7c0f', roughness: 0.8 });
      const petalMat = new THREE.MeshStandardMaterial({
        color: '#fde047',
        emissive: '#f59e0b',
        emissiveIntensity: 0.55,
        roughness: 0.4,
      });
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const sx = Math.cos(a) * 0.24;
        const sz = Math.sin(a) * 0.24;
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.68, 5), stemMat);
        stem.position.set(sx, 0.34, sz);
        const bloom = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), petalMat);
        bloom.position.set(sx, 0.72, sz);
        g.add(stem, bloom);
      }
    } else if (kind === 'sunken_wreck_chest') {
      const chest = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.72, 0.78), this.sharedMats.crateWood);
      chest.position.y = 0.36;
      chest.castShadow = true;
      const lid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.39, 0.39, 1.18, 8, 1, false, 0, Math.PI),
        this.sharedMats.crateWood
      );
      lid.rotation.z = Math.PI / 2;
      lid.position.y = 0.72;
      const goldTrim = new THREE.Mesh(
        new THREE.BoxGeometry(1.22, 0.14, 0.82),
        new THREE.MeshStandardMaterial({
          color: '#facc15',
          emissive: '#d97706',
          emissiveIntensity: 0.35,
          metalness: 0.75,
          roughness: 0.28,
        })
      );
      goldTrim.position.y = 0.68;
      g.add(chest, lid, goldTrim);
    }

    return g;
  }

  update(dt: number, elapsed: number, windSpeed: number): void {
    this.grassUniforms.uTime.value = elapsed;
    this.grassUniforms.uWindSpeed.value = windSpeed;

    // Subtle breathing glow on Sanctuary runes & rotating heart crystal
    for (let i = 0; i < this.runeGlowMeshes.length; i++) {
      const m = this.runeGlowMeshes[i];
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.0 + Math.sin(elapsed * 2.1 + i) * 0.45;
      if (i === this.runeGlowMeshes.length - 1) {
        m.rotation.y = elapsed * 0.9;
        m.position.y = 2.75 + Math.sin(elapsed * 1.8) * 0.22;
      }
    }

    // Hit-shake animation on chopped trees & mined rocks
    for (const vis of this.nodeVisuals.values()) {
      if (vis.shakeTime > 0) {
        vis.shakeTime = Math.max(0, vis.shakeTime - dt);
        const amt = vis.shakeTime * 0.55;
        vis.group.rotation.z = Math.sin(elapsed * 55) * amt;
        vis.group.rotation.x = Math.cos(elapsed * 48) * amt * 0.6;
        if (vis.shakeTime === 0) {
          vis.group.rotation.z = 0;
          vis.group.rotation.x = 0;
        }
      }
    }
  }
}
