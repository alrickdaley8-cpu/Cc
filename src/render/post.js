// Post-processing: the scene renders into a reduced-resolution target, then a single fullscreen
// pass upscales it with film grain, vignette, ordered dithering, fear-driven desaturation and
// chromatic aberration, held-breath darkening, and fades. Cheap, and it gives the game one
// coherent "found 16mm footage" look that hides procedural low-poly art.
import * as THREE from 'three';

const VERT = /* glsl */`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = /* glsl */`
precision highp float;
uniform sampler2D tScene;
uniform vec2 uRes;      // output resolution
uniform vec2 uSrcRes;   // scene target resolution
uniform float uTime, uFear, uGrain, uAberr, uBright, uFade, uBreath, uFlash, uHidden, uSilence, uPulse;
varying vec2 vUv;
vec3 aces(vec3 x){ const float a=2.51,b=0.03,c=2.43,d=0.59,e=0.14; return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.0,1.0); }
vec3 toSRGB(vec3 c){ return mix(c*12.92, 1.055*pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c)); }
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float bayer(vec2 p){ ivec2 i = ivec2(mod(p, 4.0)); int idx = i.x + i.y*4;
  float m[16] = float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.); return m[idx]/16.0 - 0.5; }
void main(){
  vec2 uv = vUv;
  // hidden: slatted wardrobe view
  vec2 c = uv - 0.5;
  float r2 = dot(c, c);
  // subtle lens warp
  uv = 0.5 + c * (1.0 + 0.04 * r2);
  float ab = uAberr * (0.0015 + uFear * 0.006) * (0.3 + r2 * 4.0);
  vec3 col;
  col.r = texture2D(tScene, uv + c * ab).r;
  col.g = texture2D(tScene, uv).g;
  col.b = texture2D(tScene, uv - c * ab).b;
  col = toSRGB(aces(max(col, vec3(0.0)) * 1.45 * uBright));
  // lift the very darkest values a little so silhouettes read on poor monitors
  col += vec3(0.012, 0.013, 0.016) * uBright;
  // fear: desaturate + cold tint + pulse
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, vec3(l) * vec3(0.92, 0.97, 1.08), clamp(uFear * 0.6 + uSilence * 0.5, 0.0, 0.85));
  // vignette
  float vig = smoothstep(0.85, 0.2 - uFear * 0.12 - uBreath * 0.15, length(c * vec2(1.0, 0.85)) * (1.0 + uPulse * 0.08));
  col *= mix(0.35, 1.0, vig);
  // wardrobe slats
  if (uHidden > 0.0) {
    float slat = smoothstep(0.35, 0.5, abs(fract(vUv.y * 9.0) - 0.5));
    float edge = smoothstep(0.32, 0.18, abs(vUv.x - 0.5));
    col *= mix(1.0, slat * edge, uHidden);
  }
  // grain (animated) + dither before quantisation
  float g = hash(vUv * uRes + fract(uTime * 7.13) * 100.0) - 0.5;
  col += g * uGrain * (0.035 + uFear * 0.04);
  col += bayer(gl_FragCoord.xy) / 255.0 * 2.0;
  // lightning flash wash
  col += vec3(0.55, 0.62, 0.8) * uFlash * 0.08;
  col *= (1.0 - uFade);
  gl_FragColor = vec4(col, 1.0);
}`;

export class PostFX {
  constructor(renderer) {
    this.renderer = renderer;
    this.scale = 0.6;
    this.target = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, depthBuffer: true, samples: 0 });
    this.target.texture.minFilter = THREE.LinearFilter; this.target.texture.magFilter = THREE.LinearFilter;
    this.uniforms = {
      tScene: { value: this.target.texture }, uRes: { value: new THREE.Vector2() }, uSrcRes: { value: new THREE.Vector2() },
      uTime: { value: 0 }, uFear: { value: 0 }, uGrain: { value: 1 }, uAberr: { value: 1 }, uBright: { value: 1 },
      uFade: { value: 1 }, uBreath: { value: 0 }, uFlash: { value: 0 }, uHidden: { value: 0 }, uSilence: { value: 0 }, uPulse: { value: 0 },
    };
    this.mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.uniforms, depthTest: false, depthWrite: false });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.quad.frustumCulled = false;
    this.scene = new THREE.Scene(); this.scene.add(this.quad);
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }
  setSize(w, h, scale) {
    this.scale = scale;
    const sw = Math.max(320, Math.floor(w * scale)), sh = Math.max(180, Math.floor(h * scale));
    this.target.setSize(sw, sh);
    this.uniforms.uRes.value.set(w, h); this.uniforms.uSrcRes.value.set(sw, sh);
  }
  render(scene, camera) {
    const r = this.renderer;
    r.setRenderTarget(this.target);
    r.render(scene, camera);
    this.sceneCalls = r.info.render.calls; this.sceneTris = r.info.render.triangles;
    r.setRenderTarget(null);
    r.render(this.scene, this.cam);
  }
}
