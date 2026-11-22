import * as THREE from 'three';
import { WATER_LEVEL, WORLD_SIZE, type WorldTimeState } from '@wildreach/shared';

const WATER_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uWindSpeed;
  uniform sampler2D uHeightMap;
  uniform float uWorldSize;

  varying vec3 vWorldPos;
  varying float vDepth;
  varying float vWaveCrest;

  float sampleTerrainHeight(vec2 xz) {
    vec2 uv = (xz + uWorldSize * 0.5) / uWorldSize;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      return -8.0;
    }
    float enc = texture2D(uHeightMap, uv).r;
    return enc * 38.0 - 10.0;
  }

  // Exact match to shared/src/waves.ts OCEAN_WAVES so boats ride the exact drawn swells!
  float sampleWaveDisp(vec2 xz, float depth) {
    float damp = clamp(depth / 2.2, 0.0, 1.0);
    float t = uTime * (0.82 + uWindSpeed * 0.34);
    float ampScale = (0.78 + uWindSpeed * 0.32) * damp;
    float y = 0.0;
    y += sin((xz.x * 0.86 + xz.y * 0.51) * 0.145 + t * 1.45) * 0.16;
    y += sin((xz.x * -0.42 + xz.y * 0.91) * 0.195 + t * 1.25) * 0.12;
    y += sin((xz.x * 0.71 + xz.y * -0.70) * 0.31 + t * 2.05) * 0.055;
    y += sin((xz.x * -0.92 + xz.y * -0.39) * 0.44 + t * 2.55) * 0.03;
    return y * ampScale;
  }

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    float terrainH = sampleTerrainHeight(wp.xz);
    float depth = max(0.0, -terrainH);
    float disp = sampleWaveDisp(wp.xz, depth);

    wp.y += disp;
    vWorldPos = wp.xyz;
    vDepth = depth;
    vWaveCrest = disp;

    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uSkyHorizon;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uNightFactor;
  uniform sampler2D uHeightMap;
  uniform float uWorldSize;

  varying vec3 vWorldPos;
  varying float vDepth;
  varying float vWaveCrest;

  float sampleTerrainHeight(vec2 xz) {
    vec2 uv = (xz + uWorldSize * 0.5) / uWorldSize;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      return -8.0;
    }
    float enc = texture2D(uHeightMap, uv).r;
    return enc * 38.0 - 10.0;
  }

  float waveNoise(vec2 p) {
    return sin(p.x * 1.7 + sin(p.y * 1.3)) * 0.5 + cos(p.y * 2.1 - cos(p.x * 1.5)) * 0.5;
  }

  void main() {
    float terrainH = sampleTerrainHeight(vWorldPos.xz);
    float depth = max(0.0, -terrainH);
    float dist = length(cameraPosition - vWorldPos);
    float detailFade = exp(-dist * 0.0065);

    // Three-cascade scrolling normal ripples (coarse swell + capillary shimmer)
    vec2 p1 = vWorldPos.xz * 0.36 + vec2(uTime * 0.34, uTime * 0.22);
    vec2 p2 = vWorldPos.xz * 0.82 - vec2(uTime * 0.27, -uTime * 0.31);
    vec2 p3 = vWorldPos.xz * 1.85 + vec2(-uTime * 0.42, uTime * 0.38);
    float nx = waveNoise(p1) * 0.13 + (waveNoise(p2) * 0.08 + waveNoise(p3) * 0.04) * detailFade;
    float nz = waveNoise(p1 + vec2(4.2, 1.9)) * 0.13 + (waveNoise(p2 + vec2(2.7, 5.1)) * 0.08 + waveNoise(p3 + vec2(1.4, 3.3)) * 0.04) * detailFade;
    vec3 N = normalize(vec3(nx, 1.0, nz));

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    // Beer-Lambert depth absorption: vibrant tropical turquoise shallows -> deep oceanic sapphire
    vec3 shallowCol = mix(vec3(0.09, 0.72, 0.70), vec3(0.04, 0.24, 0.34), uNightFactor);
    vec3 midCol = mix(vec3(0.04, 0.39, 0.56), vec3(0.02, 0.12, 0.22), uNightFactor);
    vec3 deepCol = mix(vec3(0.02, 0.15, 0.33), vec3(0.01, 0.05, 0.12), uNightFactor);

    float d1 = 1.0 - exp(-depth * 0.62);
    float d2 = 1.0 - exp(-depth * 0.19);
    vec3 waterCol = mix(shallowCol, midCol, d1);
    waterCol = mix(waterCol, deepCol, d2);

    // Subsurface turquoise glow through sunlit wave crests!
    float sss = pow(max(0.0, dot(V, -L + N * 0.55)), 3.2) * smoothstep(-0.04, 0.24, vWaveCrest);
    waterCol += vec3(0.08, 0.44, 0.42) * sss * (1.0 - uNightFactor * 0.85) * 0.75;

    // Animated golden-cyan seabed caustics in shallow lagoons & coral reefs
    if (depth < 3.4) {
      float c1 = sin(p1.x * 3.1 + sin(p2.y * 2.4));
      float c2 = cos(p2.x * 2.9 - cos(p1.y * 3.3));
      float caustic = pow(max(0.0, (c1 * c2) * 0.65 + 0.45), 3.2);
      float shallowMask = (1.0 - smoothstep(0.12, 3.4, depth)) * (1.0 - uNightFactor * 0.82);
      waterCol += vec3(0.28, 0.58, 0.54) * caustic * shallowMask * 0.55;
    }

    // Schlick Fresnel sky reflection
    float ndv = max(dot(N, V), 0.0);
    float fresnel = 0.03 + 0.97 * pow(1.0 - ndv, 4.0);
    vec3 col = mix(waterCol, uSkyHorizon * (0.98 - uNightFactor * 0.22), fresnel * 0.74);

    // Crisp GGX-style sun/moon glints
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 210.0) * 2.2 + pow(max(dot(N, H), 0.0), 36.0) * 0.28;
    col += uSunColor * spec * (1.0 - uNightFactor * 0.62);

    // Lapping shoreline foam + offshore breaking crest whitecaps
    float shoreBand = 1.0 - smoothstep(0.0, 1.08, depth);
    float rippleLine = sin(depth * 13.0 - uTime * 3.2 + waveNoise(vWorldPos.xz * 0.52) * 2.4);
    float foamMask = smoothstep(0.30, 0.72, shoreBand + rippleLine * 0.24 * shoreBand);
    float edgeFoam = 1.0 - smoothstep(0.0, 0.24, depth);
    float crestNoise = waveNoise(vWorldPos.xz * 0.65 + uTime * 0.4);
    float crestFoam = smoothstep(0.16, 0.28, vWaveCrest + crestNoise * 0.04) * 0.46;
    float foam = clamp(max(foamMask * 0.84, edgeFoam) + crestFoam, 0.0, 1.0);
    vec3 foamColor = mix(vec3(0.94, 0.98, 1.0), vec3(0.36, 0.46, 0.60), uNightFactor * 0.84);
    col = mix(col, foamColor, foam);

    // Crystal clear shallows -> rich translucent deep sea
    float alpha = clamp(0.46 + (1.0 - exp(-depth * 0.82)) * 0.50 + foam * 0.38, 0.44, 0.97);

    // Atmospheric distance fog
    float fogFactor = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
    col = mix(col, uFogColor, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(col, alpha);
  }
`;

export class WaterMesh {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;

  constructor(heightTexture: THREE.DataTexture) {
    // Wider high-resolution ocean covering the main island + all 3 outer islands!
    const geo = new THREE.PlaneGeometry(760, 760, 176, 176);
    geo.rotateX(-Math.PI / 2);

    this.mat = new THREE.ShaderMaterial({
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uWindSpeed: { value: 1.0 },
        uSunDir: { value: new THREE.Vector3(0.4, 0.8, 0.3) },
        uSunColor: { value: new THREE.Color('#fff2d2') },
        uSkyHorizon: { value: new THREE.Color('#c2e0f5') },
        uFogColor: { value: new THREE.Color('#c2e0f5') },
        uFogDensity: { value: 0.0029 },
        uNightFactor: { value: 0 },
        uHeightMap: { value: heightTexture },
        uWorldSize: { value: WORLD_SIZE },
      },
    });

    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.position.y = WATER_LEVEL;
    this.mesh.renderOrder = 2;
  }

  update(
    elapsed: number,
    time: WorldTimeState,
    sunDir: THREE.Vector3,
    sunColor: THREE.Color,
    skyHorizon: THREE.Color,
    fogColor: THREE.Color,
    fogDensity: number,
    nightFactor: number
  ): void {
    this.mat.uniforms.uTime.value = elapsed;
    this.mat.uniforms.uWindSpeed.value = time.windSpeed;
    this.mat.uniforms.uSunDir.value.copy(sunDir);
    this.mat.uniforms.uSunColor.value.copy(sunColor);
    this.mat.uniforms.uSkyHorizon.value.copy(skyHorizon);
    this.mat.uniforms.uFogColor.value.copy(fogColor);
    this.mat.uniforms.uFogDensity.value = fogDensity;
    this.mat.uniforms.uNightFactor.value = nightFactor;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.mat.dispose();
  }
}
