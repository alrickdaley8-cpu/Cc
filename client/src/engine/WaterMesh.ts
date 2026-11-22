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

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    float terrainH = sampleTerrainHeight(wp.xz);
    float depth = max(0.0, -terrainH);
    float damp = smoothstep(0.0, 2.2, depth);

    float t = uTime * (0.8 + uWindSpeed * 0.35);
    float w1 = sin(wp.x * 0.16 + wp.z * 0.09 + t * 1.45) * 0.14;
    float w2 = cos(wp.x * 0.08 - wp.z * 0.19 + t * 1.15) * 0.11;
    float w3 = sin((wp.x - wp.z) * 0.32 + t * 2.1) * 0.045;
    float disp = (w1 + w2 + w3) * damp;

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

    // Dual-layer animated ripple normal
    vec2 p1 = vWorldPos.xz * 0.42 + vec2(uTime * 0.36, uTime * 0.24);
    vec2 p2 = vWorldPos.xz * 0.85 - vec2(uTime * 0.28, -uTime * 0.33);
    float nx = waveNoise(p1) * 0.12 + waveNoise(p2) * 0.08;
    float nz = waveNoise(p1 + vec2(4.2, 1.9)) * 0.12 + waveNoise(p2 + vec2(2.7, 5.1)) * 0.08;
    vec3 N = normalize(vec3(nx, 1.0, nz));

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    // Beer-Lambert depth absorption: crystal turquoise shallows -> deep sapphire sea
    vec3 shallowCol = mix(vec3(0.11, 0.62, 0.64), vec3(0.05, 0.22, 0.30), uNightFactor);
    vec3 midCol = mix(vec3(0.05, 0.36, 0.52), vec3(0.02, 0.11, 0.20), uNightFactor);
    vec3 deepCol = mix(vec3(0.03, 0.17, 0.34), vec3(0.01, 0.05, 0.12), uNightFactor);

    float d1 = 1.0 - exp(-depth * 0.65);
    float d2 = 1.0 - exp(-depth * 0.22);
    vec3 waterCol = mix(shallowCol, midCol, d1);
    waterCol = mix(waterCol, deepCol, d2);

    // Subtle sunlit seabed caustics in shallow water
    if (depth < 2.8) {
      float caustic = pow(max(0.0, sin(p1.x * 3.2) * cos(p2.y * 3.0) + 0.35), 3.0);
      float shallowMask = (1.0 - smoothstep(0.1, 2.8, depth)) * (1.0 - uNightFactor * 0.85);
      waterCol += vec3(0.24, 0.48, 0.45) * caustic * shallowMask * 0.45;
    }

    // Schlick Fresnel sky reflection
    float ndv = max(dot(N, V), 0.0);
    float fresnel = 0.03 + 0.97 * pow(1.0 - ndv, 4.2);
    vec3 col = mix(waterCol, uSkyHorizon * (0.95 - uNightFactor * 0.25), fresnel * 0.72);

    // Sparkling GGX-style sun/moon specular glints
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 190.0) * 1.9 + pow(max(dot(N, H), 0.0), 34.0) * 0.24;
    col += uSunColor * spec * (1.0 - uNightFactor * 0.68);

    // Dynamic lapping shoreline foam + offshore crest foam
    float shoreBand = 1.0 - smoothstep(0.0, 0.95, depth);
    float rippleLine = sin(depth * 14.0 - uTime * 3.1 + waveNoise(vWorldPos.xz * 0.5) * 2.2);
    float foamMask = smoothstep(0.32, 0.72, shoreBand + rippleLine * 0.22 * shoreBand);
    float edgeFoam = 1.0 - smoothstep(0.0, 0.22, depth);
    float crestFoam = smoothstep(0.16, 0.25, vWaveCrest) * 0.35;
    float foam = clamp(max(foamMask * 0.82, edgeFoam) + crestFoam, 0.0, 1.0);
    vec3 foamColor = mix(vec3(0.92, 0.97, 0.99), vec3(0.38, 0.46, 0.58), uNightFactor * 0.85);
    col = mix(col, foamColor, foam);

    // Transparency: clear right at water's edge, rich opaque deeper out
    float alpha = clamp(0.48 + (1.0 - exp(-depth * 0.85)) * 0.48 + foam * 0.35, 0.45, 0.96);

    // Exponential atmospheric fog blend
    float dist = length(cameraPosition - vWorldPos);
    float fogFactor = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
    col = mix(col, uFogColor, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(col, alpha);
  }
`;

export class WaterMesh {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;

  constructor(heightTexture: THREE.DataTexture) {
    const geo = new THREE.PlaneGeometry(580, 580, 150, 150);
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
        uFogDensity: { value: 0.0038 },
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
    horizonColor: THREE.Color,
    fogDensity: number
  ): void {
    const night = Math.max(0, Math.min(1, 1 - (sunDir.y + 0.14) / 0.42));
    this.mat.uniforms.uTime.value = elapsed;
    this.mat.uniforms.uWindSpeed.value = time.windSpeed;
    this.mat.uniforms.uSunDir.value.copy(sunDir);
    this.mat.uniforms.uSunColor.value.copy(sunColor);
    this.mat.uniforms.uSkyHorizon.value.copy(horizonColor);
    this.mat.uniforms.uFogColor.value.copy(horizonColor);
    this.mat.uniforms.uFogDensity.value = fogDensity;
    this.mat.uniforms.uNightFactor.value = night;
  }
}
