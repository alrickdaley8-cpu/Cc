import * as THREE from 'three';
import { clamp, type WorldTimeState } from '@wildreach/shared';

const SKY_VERT = /* glsl */ `
  varying vec3 vWorldDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3 uTopColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uGroundColor;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uNightFactor;
  uniform float uTime;
  uniform float uStormFactor;

  varying vec3 vWorldDir;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec3 dir = normalize(vWorldDir);
    float h = clamp(dir.y, -0.25, 1.0);

    // Smooth atmospheric zenith-to-horizon gradient
    float horizonBlend = pow(1.0 - max(h, 0.0), 2.6);
    vec3 col = mix(uTopColor, uHorizonColor, horizonBlend);
    if (h < 0.0) {
      col = mix(uHorizonColor, uGroundColor, clamp(-h * 5.0, 0.0, 1.0));
    }

    // Mie scattering sun halo & crisp solar disc
    float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
    float halo = pow(sunDot, 12.0) * 0.42 * (1.0 - uStormFactor * 0.7);
    float disc = smoothstep(0.9985, 0.9994, sunDot) * 1.8 * (1.0 - uStormFactor * 0.85);
    col += uSunColor * (halo + disc) * (1.0 - uNightFactor * 0.92);

    // Subtle emerald-teal aurora ribbons at night in the northern sky
    if (uNightFactor > 0.15 && dir.y > 0.08) {
      float north = smoothstep(-0.1, 0.75, -dir.z);
      float wave = sin(dir.x * 7.5 + uTime * 0.25) * 0.5 + 0.5;
      float band = exp(-pow((dir.y - 0.32 - wave * 0.12) * 7.0, 2.0));
      vec3 aurora = mix(vec3(0.08, 0.72, 0.58), vec3(0.28, 0.35, 0.85), wave);
      col += aurora * band * north * uNightFactor * 0.28 * (1.0 - uStormFactor);
    }

    // Storm overcast darkening
    vec3 stormTone = vec3(0.16, 0.20, 0.25) * (1.0 - uNightFactor * 0.65);
    col = mix(col, stormTone, uStormFactor * 0.52);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class SkySystem {
  readonly skyMesh: THREE.Mesh;
  readonly sunLight: THREE.DirectionalLight;
  readonly hemiLight: THREE.HemisphereLight;
  readonly fog: THREE.FogExp2;
  readonly sunDirection = new THREE.Vector3(0.4, 0.8, 0.3);
  readonly horizonColor = new THREE.Color('#c8dff0');

  private skyMat: THREE.ShaderMaterial;
  private starPoints: THREE.Points;
  private starMat: THREE.PointsMaterial;
  private moonMesh: THREE.Mesh;
  private cloudGroup: THREE.Group;
  private cloudMaterials: THREE.MeshLambertMaterial[] = [];
  private lightningFlash = 0;

  constructor(scene: THREE.Scene) {
    // 1. Atmospheric sky dome
    this.skyMat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTopColor: { value: new THREE.Color('#2768b5') },
        uHorizonColor: { value: new THREE.Color('#bfdcf2') },
        uGroundColor: { value: new THREE.Color('#1d3549') },
        uSunDir: { value: new THREE.Vector3(0.5, 0.7, 0.3) },
        uSunColor: { value: new THREE.Color('#fff2cc') },
        uNightFactor: { value: 0 },
        uTime: { value: 0 },
        uStormFactor: { value: 0 },
      },
    });
    this.skyMesh = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 20), this.skyMat);
    this.skyMesh.frustumCulled = false;
    scene.add(this.skyMesh);

    // 2. Starfield dome
    const starCount = 1100;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(0.08 + Math.random() * 0.92);
      const r = 385;
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.cos(phi);
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const tint = Math.random();
      starCol[i * 3] = tint > 0.7 ? 1.0 : 0.85;
      starCol[i * 3 + 1] = tint > 0.4 ? 0.94 : 0.88;
      starCol[i * 3 + 2] = 1.0;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    this.starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      fog: false,
    });
    this.starPoints = new THREE.Points(starGeo, this.starMat);
    scene.add(this.starPoints);

    // 3. Glowing Moon
    this.moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(11, 16, 16),
      new THREE.MeshBasicMaterial({ color: '#eef4ff', fog: false })
    );
    scene.add(this.moonMesh);

    // 4. Multi-puff drifting cloud deck
    this.cloudGroup = new THREE.Group();
    const puffGeo = new THREE.DodecahedronGeometry(1, 1);
    for (let i = 0; i < 28; i++) {
      const cluster = new THREE.Group();
      const mat = new THREE.MeshLambertMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.84,
        fog: true,
      });
      this.cloudMaterials.push(mat);
      const puffs = 4 + Math.floor(Math.random() * 4);
      for (let p = 0; p < puffs; p++) {
        const mesh = new THREE.Mesh(puffGeo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 11
        );
        const sx = 5.5 + Math.random() * 7.5;
        mesh.scale.set(sx, 2.2 + Math.random() * 2.0, sx * 0.78);
        cluster.add(mesh);
      }
      const ang = (i / 28) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 45 + Math.random() * 210;
      cluster.position.set(Math.cos(ang) * dist, 74 + Math.random() * 26, Math.sin(ang) * dist);
      cluster.userData.speed = 1.4 + Math.random() * 1.4;
      this.cloudGroup.add(cluster);
    }
    scene.add(this.cloudGroup);

    // 5. Dynamic Sun/Moon Directional Shadow Light
    this.sunLight = new THREE.DirectionalLight('#fff3dc', 2.2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 260;
    const d = 64;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    this.sunLight.shadow.normalBias = 0.04;
    scene.add(this.sunLight);
    scene.add(this.sunLight.target);

    // 6. Hemisphere Sky/Ground Bounce Light
    this.hemiLight = new THREE.HemisphereLight('#a9d4ff', '#4b5b3b', 0.85);
    scene.add(this.hemiLight);

    // 7. Exponential atmospheric fog
    this.fog = new THREE.FogExp2('#bddaf0', 0.0038);
    scene.fog = this.fog;
  }

  setShadowQuality(tier: 'low' | 'medium' | 'high'): void {
    const size = tier === 'high' ? 2048 : tier === 'medium' ? 1024 : 512;
    this.sunLight.shadow.mapSize.set(size, size);
    if (this.sunLight.shadow.map) {
      this.sunLight.shadow.map.dispose();
      this.sunLight.shadow.map = null;
    }
  }

  triggerLightning(): void {
    this.lightningFlash = 1.0;
  }

  update(dt: number, elapsed: number, time: WorldTimeState, anchorPos: THREE.Vector3): void {
    if (this.lightningFlash > 0) {
      this.lightningFlash = Math.max(0, this.lightningFlash - dt * 3.8);
    }

    // Sun angle: 0.25 = sunrise (east), 0.5 = noon (overhead), 0.75 = sunset (west)
    const sunAngle = (time.timeOfDay - 0.25) * Math.PI * 2;
    const sunY = Math.sin(sunAngle);
    const sunX = Math.cos(sunAngle);
    const sunZ = -0.32;
    this.sunDirection.set(sunX, sunY, sunZ).normalize();

    const dayFactor = clamp((sunY + 0.14) / 0.42, 0, 1);
    const nightFactor = 1 - dayFactor;
    const twilight = clamp(1 - Math.abs(sunY) * 4.2, 0, 1);
    const storm = time.weather === 'storm' ? time.weatherIntensity : time.weather === 'rain' ? time.weatherIntensity * 0.6 : 0;
    const fogFactor = time.weather === 'fog' ? time.weatherIntensity : 0;

    // Sky palette interpolation (crisp daylight, warm Firewatch sunset, starry midnight)
    const topDay = new THREE.Color('#2566b8');
    const topTwilight = new THREE.Color('#2d3363');
    const topNight = new THREE.Color('#060c1b');

    const horDay = new THREE.Color('#c2e0f5');
    const horTwilight = new THREE.Color('#f48c57');
    const horNight = new THREE.Color('#0f1d36');

    const topCol = topNight.clone().lerp(topDay, dayFactor).lerp(topTwilight, twilight * 0.75);
    const horCol = horNight.clone().lerp(horDay, dayFactor).lerp(horTwilight, twilight * 0.88);
    if (storm > 0.05) {
      horCol.lerp(new THREE.Color('#3b4859').multiplyScalar(0.35 + dayFactor * 0.65), storm * 0.65);
    }
    if (this.lightningFlash > 0.05) {
      horCol.lerp(new THREE.Color('#e2f0ff'), this.lightningFlash * 0.7);
      topCol.lerp(new THREE.Color('#c7e2ff'), this.lightningFlash * 0.5);
    }

    this.horizonColor.copy(horCol);

    this.skyMat.uniforms.uTopColor.value.copy(topCol);
    this.skyMat.uniforms.uHorizonColor.value.copy(horCol);
    this.skyMat.uniforms.uSunDir.value.copy(this.sunDirection);
    this.skyMat.uniforms.uSunColor.value
      .set('#fff3d1')
      .lerp(new THREE.Color('#ff8e47'), twilight * 0.85);
    this.skyMat.uniforms.uNightFactor.value = nightFactor;
    this.skyMat.uniforms.uTime.value = elapsed;
    this.skyMat.uniforms.uStormFactor.value = storm;

    // Stars & Moon
    this.starMat.opacity = clamp((nightFactor - 0.2) * 1.25 * (1 - storm * 0.85), 0, 0.92);
    this.starPoints.rotation.y = elapsed * 0.002;
    this.starPoints.position.copy(anchorPos);
    this.skyMesh.position.copy(anchorPos);

    const moonDir = this.sunDirection.clone().negate();
    this.moonMesh.position.copy(anchorPos).addScaledVector(moonDir, 330);
    this.moonMesh.visible = moonDir.y > -0.1;

    // Directional shadow light follows player smoothly (uses sun by day, cool moonlight by night)
    const activeLightDir = sunY >= -0.05 ? this.sunDirection : moonDir;
    const snap = 1.5;
    const tx = Math.round(anchorPos.x / snap) * snap;
    const tz = Math.round(anchorPos.z / snap) * snap;
    this.sunLight.target.position.set(tx, anchorPos.y, tz);
    this.sunLight.position.set(
      tx + activeLightDir.x * 110,
      anchorPos.y + Math.max(18, activeLightDir.y * 110),
      tz + activeLightDir.z * 110
    );

    if (sunY >= -0.05) {
      const sunInt = (0.35 + clamp(sunY, 0, 1) * 2.1) * (1 - storm * 0.55) + this.lightningFlash * 2.4;
      this.sunLight.intensity = sunInt;
      this.sunLight.color
        .set('#fff4dc')
        .lerp(new THREE.Color('#ff9a59'), twilight * 0.78);
    } else {
      this.sunLight.intensity = 0.42 * (1 - storm * 0.4) + this.lightningFlash * 2.6;
      this.sunLight.color.set('#7ea8e8');
    }

    // Hemisphere ambient lighting
    this.hemiLight.color.copy(
      new THREE.Color('#284166').lerp(new THREE.Color('#a8d8ff'), dayFactor)
    );
    this.hemiLight.groundColor.copy(
      new THREE.Color('#141c24').lerp(new THREE.Color('#4c5c3a'), dayFactor)
    );
    this.hemiLight.intensity = (0.32 + dayFactor * 0.62) * (1 - storm * 0.25) + this.lightningFlash * 0.6;

    // Atmospheric distance fog
    this.fog.color.copy(horCol);
    this.fog.density = 0.0034 + storm * 0.0042 + fogFactor * 0.0075 + nightFactor * 0.0016;

    // Drift clouds overhead
    const cloudColor = new THREE.Color('#253145')
      .lerp(new THREE.Color('#ffffff'), dayFactor)
      .lerp(new THREE.Color('#ffb587'), twilight * 0.72)
      .lerp(new THREE.Color('#4a5666'), storm * 0.7);
    for (const mat of this.cloudMaterials) {
      mat.color.copy(cloudColor);
      mat.opacity = 0.45 + dayFactor * 0.35 + storm * 0.18;
    }
    for (const c of this.cloudGroup.children) {
      c.position.x += time.windDirX * time.windSpeed * (c.userData.speed as number) * dt;
      c.position.z += time.windDirZ * time.windSpeed * (c.userData.speed as number) * dt;
      if (c.position.x > 250) c.position.x = -250;
      if (c.position.x < -250) c.position.x = 250;
      if (c.position.z > 250) c.position.z = -250;
      if (c.position.z < -250) c.position.z = 250;
    }
  }
}
