import * as THREE from 'three';
import {
  HALF_WORLD,
  WATER_LEVEL,
  WORLD_SIZE,
  WorldGenerator,
  clamp,
  smoothstep,
} from '@wildreach/shared';
import type { ProceduralTextureSet } from './Textures';

export interface TerrainBuildResult {
  mesh: THREE.Mesh;
  heightTexture: THREE.DataTexture;
}

export function buildTerrain(
  world: WorldGenerator,
  textures: ProceduralTextureSet
): TerrainBuildResult {
  const segs = 220;
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, segs, segs);
  geo.rotateX(-Math.PI / 2);

  const posAttr = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(posAttr.count * 3);

  const cDeepSand = new THREE.Color('#7f7254');
  const cWetSand = new THREE.Color('#a48a62');
  const cDrySand = new THREE.Color('#dec590');
  const cMeadow = new THREE.Color('#5a8f41');
  const cMeadowRich = new THREE.Color('#3f7634');
  const cPineFloor = new THREE.Color('#3d5d38');
  const cMarsh = new THREE.Color('#475c3a');
  const cCliff = new THREE.Color('#696b6e');
  const cVolcanic = new THREE.Color('#3d3840');
  const cSnow = new THREE.Color('#e6eef5');
  const tmp = new THREE.Color();

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    const sample = world.sample(x, z);
    posAttr.setY(i, sample.height);

    // Multi-biome smooth splat vertex coloration
    const h = sample.height;
    const slope = sample.slope;

    if (h < WATER_LEVEL - 0.15) {
      const depthT = smoothstep(-5.5, -0.15, h);
      tmp.copy(cDeepSand).lerp(cWetSand, depthT);
    } else if (h < 1.65) {
      const beachT = smoothstep(0.0, 1.25, h);
      tmp.copy(cWetSand).lerp(cDrySand, beachT);
      if (sample.biome === 'marsh') {
        tmp.lerp(cMarsh, smoothstep(0.25, 1.3, h) * 0.8);
      }
    } else {
      // Base biome color
      if (sample.biome === 'marsh') {
        tmp.copy(cMarsh);
      } else if (sample.biome === 'pine') {
        tmp.copy(cPineFloor).lerp(cMeadowRich, sample.moisture * 0.35);
      } else if (sample.biome === 'volcanic') {
        tmp.copy(cVolcanic);
      } else if (sample.biome === 'highland') {
        tmp.copy(cPineFloor).lerp(cCliff, 0.55);
      } else {
        tmp.copy(cMeadow).lerp(cMeadowRich, sample.moisture * 0.6);
      }

      // Smooth beach-to-meadow transition
      if (h < 2.55) {
        const edge = 1 - smoothstep(1.5, 2.55, h);
        tmp.lerp(cDrySand, edge * 0.85);
      }
    }

    // Steep slopes expose stratified granite/volcanic cliff rock
    const rockFactor = smoothstep(0.42, 0.92, slope);
    if (rockFactor > 0.01) {
      tmp.lerp(sample.biome === 'volcanic' ? cVolcanic : cCliff, rockFactor * 0.9);
    }

    // Alpine snow dust on highest peaks
    if (h > 17.5) {
      const snowT = smoothstep(17.5, 22.8, h) * (1 - smoothstep(0.65, 1.15, slope) * 0.7);
      tmp.lerp(cSnow, clamp(snowT, 0, 0.95));
    }

    // Subtle organic micro-variation so large meadows look painterly
    const micro = (Math.sin(x * 0.17) * Math.cos(z * 0.19) + Math.sin((x + z) * 0.08)) * 0.035;
    colors[i * 3] = clamp(tmp.r + micro, 0, 1);
    colors[i * 3 + 1] = clamp(tmp.g + micro, 0, 1);
    colors[i * 3 + 2] = clamp(tmp.b + micro * 0.6, 0, 1);
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    map: textures.terrainDetail,
    bumpMap: textures.terrainBump,
    bumpScale: 0.24,
    roughness: 0.9,
    metalness: 0.03,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.name = 'terrain';

  // Bake 256x256 heightmap DataTexture for exact shoreline foam & depth absorption in WaterMesh!
  const hmSize = 256;
  const hmData = new Uint8Array(hmSize * hmSize * 4);
  for (let py = 0; py < hmSize; py++) {
    const z = (py / (hmSize - 1)) * WORLD_SIZE - HALF_WORLD;
    for (let px = 0; px < hmSize; px++) {
      const x = (px / (hmSize - 1)) * WORLD_SIZE - HALF_WORLD;
      const h = world.getHeight(x, z);
      // Encode height [-10 .. +28] -> [0 .. 255]
      const enc = Math.round(clamp((h + 10) / 38, 0, 1) * 255);
      const idx = (py * hmSize + px) * 4;
      hmData[idx] = enc;
      hmData[idx + 1] = enc;
      hmData[idx + 2] = enc;
      hmData[idx + 3] = 255;
    }
  }
  const heightTexture = new THREE.DataTexture(hmData, hmSize, hmSize, THREE.RGBAFormat);
  heightTexture.minFilter = THREE.LinearFilter;
  heightTexture.magFilter = THREE.LinearFilter;
  heightTexture.wrapS = THREE.ClampToEdgeWrapping;
  heightTexture.wrapT = THREE.ClampToEdgeWrapping;
  heightTexture.needsUpdate = true;

  return { mesh, heightTexture };
}
