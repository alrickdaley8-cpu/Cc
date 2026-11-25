// Entry point: creates the renderer and every system, owns the main loop and game modes.
import * as THREE from 'three';
import { World } from './world/grid.js';
import { buildLevel } from './world/levelBuilder.js';
import { buildProps } from './world/props.js';
import { FLOORS, STAIRS } from './world/levelData.js';
import { PostFX } from './render/post.js';
import { Input } from './core/input.js';
import { bus } from './core/events.js';
import { settings, loadSettings } from './core/settings.js';
import { clamp, damp } from './core/rng.js';
import { audio } from './audio/audio.js';
import { Player } from './player/player.js';
import { Listener } from './ai/listener.js';
import { Director } from './ai/director.js';
import { Doors } from './game/doors.js';
import { Interaction } from './game/interaction.js';
import { Story } from './game/story.js';
import { Throwables } from './game/throwables.js';
import { CAPTIONS, NOTES } from './game/content.js';
import { UI } from './ui/ui.js';

const DIFFICULTY = {
  gentle: { hearing: 0.7, vision: 0.75, speed: 0.85, chaseSpeed: 3.2, maxChase: 12, batterySeconds: 260, inspectChance: 0.45, relaxMin: 55, relaxMax: 90, buildMax: 60, peakMax: 30 },
  standard: { hearing: 1.0, vision: 1.0, speed: 1.0, chaseSpeed: 3.75, maxChase: 18, batterySeconds: 170, inspectChance: 0.7, relaxMin: 35, relaxMax: 65, buildMax: 75, peakMax: 40 },
  nightmare: { hearing: 1.3, vision: 1.2, speed: 1.12, chaseSpeed: 4.15, maxChase: 30, batterySeconds: 110, inspectChance: 0.9, relaxMin: 22, relaxMax: 40, buildMax: 90, peakMax: 60 },
};
const LIGHT_POOL = 6;
const params = new URLSearchParams(location.search);

class Game {
  constructor() {
    loadSettings();
    this.params = params;
    this.bot = params.has('bot');
    this.time = 0; this.mode = 'boot';
    this.flags = {};
    this.listenerProximity = 0; this.forceFlicker = 0; this.lureOn = false;
    this.fear = 0; this.flash = 0; this.fade = 1; this.fadeTarget = 0;
    this.perf = { fps: 0, calls: 0, tris: 0, ms: 0, frames: 0, acc: 0, worst: 0 };
    this.audio = audio;
    this.ui = new UI(this, document.getElementById('ui'));
    this.difficulty = { ...DIFFICULTY[settings.difficulty] || DIFFICULTY.standard };
  }

  init() {
    this.ui.loading('Opening the house…');
    const canvas = document.getElementById('game');
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: this.bot });
    } catch (e) { this.ui.fatal('WebGL2 is not available: ' + e.message); throw e; }
    this.renderer = renderer;
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.NoToneMapping; // tone mapping happens in the post pass (HalfFloat target)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.075);
    this.camera = new THREE.PerspectiveCamera(settings.fov, innerWidth / innerHeight, 0.05, 45);
    this.camera.rotation.order = 'YXZ';
    this.post = new PostFX(renderer);

    // world
    this.world = new World();
    this.levelGroups = buildLevel(this.world);
    this.props = buildProps(this.world);
    for (let f = 0; f < FLOORS.length; f++) { this.scene.add(this.levelGroups[f]); this.scene.add(this.props.floorGroups[f]); }
    // a faint ambient so silhouettes read; the torch and practical lights do the real work
    this.ambient = new THREE.HemisphereLight(0x3a4660, 0x1a130c, 0.5);
    this.scene.add(this.ambient);
    this.lightPool = [];
    for (let i = 0; i < LIGHT_POOL; i++) { const l = new THREE.PointLight(0xffffff, 0, 6, 2); l.castShadow = false; this.scene.add(l); this.lightPool.push(l); }

    // systems (the noise mask must subscribe before the Listener so it can attenuate first)
    bus.on('noise', (n) => this.maskNoise(n));
    this.input = new Input(canvas);
    this.player = new Player(this);
    this.doors = new Doors(this, this.props.doorVis);
    this.interaction = new Interaction(this);
    this.listener = new Listener(this);
    this.director = new Director(this);
    this.throwables = new Throwables(this);
    this.story = new Story(this, this.props);
    this.story.newGame(false);
    this.initialSnapshot = this.story.snapshot();

    bus.on('footstep', (e) => this.audio.play('footstep', e));
    bus.on('sfx', (e) => this.audio.play(e.name, e));
    bus.on('listenerHeard', () => { this.lastHeardT = this.time; });

    this.input.onLockChange = (locked) => { if (!locked && this.mode === 'playing' && !this.bot && !this.ui.readingOpen) this.pause(); };
    canvas.addEventListener('click', () => { this.audio.init(); if (this.mode === 'playing') this.input.requestLock(); });
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.mode === 'paused' && !this.bot) { /* browser exits lock; resume via button */ }
      if (e.code === 'Escape' && this.bot && this.mode === 'playing') this.pause();
    });
    this.applySettings();
    this.resize();
    this.lightningT = 12;
    this.last = performance.now();
    this.showTitle();
    requestAnimationFrame((t) => this.frame(t));
  }

  // ---------------------------------------------------------------- modes
  setMode(m) { this.mode = m; this.ui.showHud(m === 'playing' || m === 'reading' || m === 'dead'); }
  showTitle() {
    this.setMode('title'); this.input.exitLock();
    this.ui.toggleJournal(false); this.ui.closeNote?.(); this.ui.reader.classList.add('hidden');
    this.fadeTarget = 0.55;
    this.player.place(1, 15.5, 21.4, 0, 0.08);
    this.ui.title({ canContinue: !!Story.loadSaved(), endings: Story.endingsFound() });
  }
  begin() {
    this.audio.init(); this.audio.applyVolumes(); this.audio.restoreWorld();
    this.ui.hideScreen(); this.setMode('playing'); this.fade = 1; this.fadeTarget = 0;
    if (!this.bot) this.input.requestLock();
  }
  newGame() {
    Story.clearSaved();
    this.applySettings();
    this.story.restore(this.initialSnapshot);
    this.story.read.clear(); this.story.stats.deaths = 0;
    this.director.resetLearning(); this.director.recentDeaths = [];
    this.story.newGame();
    this.time = 0;
    this.begin();
  }
  continueGame() {
    const s = Story.loadSaved(); if (!s) return this.newGame();
    this.story.restore(this.initialSnapshot);
    this.story.restore(s); this.story.checkpoint = s; this.story.stats.deaths = s.deaths || 0;
    this.begin();
  }
  pause() { if (this.mode !== 'playing') return; this.setMode('paused'); this.ui.toggleJournal(false); this.ui.pause(); this.audio.ctx?.suspend(); }
  resume() { this.audio.ctx?.resume(); this.ui.hideScreen(); this.setMode('playing'); if (!this.bot) this.input.requestLock(); }
  retry() {
    this.audio.ctx?.resume();
    const cp = this.story.checkpoint || this.initialSnapshot;
    const deaths = this.story.stats.deaths;
    this.story.restore(cp); this.story.stats.deaths = deaths;
    // mercy: a full relief window after waking up (the pacing log showed 3 deaths in 100 s with the old 12 s),
    // growing if you keep dying close together
    const D = this.director, now = this.playClock || 0;
    D.recentDeaths = (D.recentDeaths || []).filter((t) => now - t < 240); D.recentDeaths.push(now);
    if (D.enabled) { D.phase = 'relax'; D.phaseT = 0; D.intensity = 0; D.relaxFor = this.difficulty.relaxMin * (1 + 0.6 * (D.recentDeaths.length - 1)); }
    this.post.uniforms.uFlash.value = 0;
    this.begin();
  }
  ending(id) {
    if (this.mode === 'ending') return;
    this.setMode('ending'); this.endingId = id; this.input.exitLock();
    this.fadeTarget = 1;
    const found = Story.recordEnding(id);
    Story.clearSaved();
    const s = this.story;
    const mins = Math.floor(this.time / 60), secs = Math.floor(this.time % 60);
    const stats = { time: `${mins}:${String(secs).padStart(2, '0')}`, notes: `${s.read.size}/${Object.keys(NOTES).length}`, cyl: s.inv.cylinders.size, deaths: s.stats.deaths };
    bus.emit('ending', id);
    setTimeout(() => this.ui.ending(id, stats, found), this.bot ? 50 : 2600);
  }
  onCaught(listener, spot) {
    if (this.mode !== 'playing') return;
    const cause = spot ? (listener.sawHide === spot ? 'sawHide' : 'breath') : (listener.prevState === 'chase' ? listener.chaseCause || 'seen' : listener.seesPlayer ? 'seen' : 'heard');
    this.lastDeathCause = cause;
    this.setMode('dead');
    this.story.stats.deaths++;
    const p = this.player;
    p.frozen = true;
    if (spot) { p.exitHide(); this.story.swingLeaves(spot, true, 0.15); }
    // The one hard scare: it is suddenly, completely in your face.
    const fwd = new THREE.Vector3(Math.sin(listener.yaw), 0, Math.cos(listener.yaw));
    const toP = new THREE.Vector3(p.x - listener.x, 0, p.z - listener.z).normalize();
    if (toP.lengthSq() > 0) fwd.copy(toP);
    listener.x = p.x - fwd.x * 1.9; listener.z = p.z - fwd.z * 1.9; // stooped: the horn mouth ends ~0.45 m from your face
    listener.yaw = Math.atan2(fwd.x, fwd.z);
    listener.rig.root.visible = true;
    const yawToL = Math.atan2(-(listener.x - p.x), -(listener.z - p.z));
    p.lookOverride = { yaw: yawToL, pitch: 0.36, t: 0, dur: 3, speed: 16 };
    this.audio.play('shriek', { pos: new THREE.Vector3(listener.x, p.y + 2, listener.z) });
    this.audio.play('death');
    this.flash = settings.reduceFlashing ? 0.3 : 1;
    if (!settings.reduceFlashing) this.forceFlicker = 0.6; // the dynamo stutters as it leans in
    bus.emit('caught', { hidden: !!spot });
    setTimeout(() => { this.fadeTarget = 1; }, this.bot ? 10 : 1500);
    setTimeout(() => { this.input.exitLock(); this.ui.death(cause); }, this.bot ? 50 : 2700);
  }

  // ---------------------------------------------------------------- helpers used by systems
  toVec(at, h = 1.2) { return new THREE.Vector3(at.x, FLOORS[at.f ?? at.floor].y + h, at.z); }
  caption(key, pos) {
    const text = CAPTIONS[key]; if (!text) return;
    let dir = '';
    if (pos) {
      const cam = this.camera, v = pos.clone().sub(cam.position);
      if (Math.abs(v.y) > 2.2) dir = v.y > 0 ? '(above)' : '(below)';
      else {
        const fwd = this.player.forward().setY(0).normalize(), right = new THREE.Vector3(-fwd.z, 0, fwd.x);
        const f = v.dot(fwd), r = v.dot(right);
        dir = f < -Math.abs(r) ? '(behind)' : r > Math.abs(f) * 0.6 ? '(right)' : r < -Math.abs(f) * 0.6 ? '(left)' : '(ahead)';
      }
    }
    this.ui.caption(text, 3, dir);
  }
  voice(id, line, { pos = null, old = true, mimic = false } = {}) {
    this.ui.subtitle(line.who, line.text, Math.max(3, line.text.length * 0.065));
    if (!this.audio.ready) return;
    this.audio.loadVoice(id, `audio/${id}.mp3`).then((buf) => {
      if (buf) this.audio.playVoice(buf, { pos, old, rate: mimic ? 0.94 : 1, gain: mimic ? 1.2 : 1 });
      else this.audio.play('murmur', { pos, text: line.text, mimic, old });
    });
  }
  maskNoise(n) {
    // the running generator masks nearby footsteps (diegetic cover)
    if (this.flags.power && n.src === 'player' && n.f === 0 && (n.kind === 'step' || n.kind === 'creak')) {
      const gi = this.props.interactables.get('generator').pos;
      if (Math.hypot(n.x - gi.x, n.z - gi.z) < 6) n.loud *= 0.4;
    }
  }
  setPower(on) {
    for (const l of this.props.lights) if (l.powered) l.on = on;
    for (const m of this.props.powered.bulbs) m.color.setHex(on ? 0xfff2c8 : 0x222018);
    for (const m of this.props.powered.screens) m.material.color.setHex(on ? 0x2aff7a : 0x051008);
  }
  lightning(intensity = 1) {
    if (this.player.floor === 0) return;
    this.flash = settings.reduceFlashing ? intensity * 0.25 : intensity;
    this.audio.play('thunder', { intensity, delay: 0.6 + Math.random() * 2 });
    this.caption('thunder');
  }
  applySettings() {
    this.difficulty = { ...(DIFFICULTY[settings.difficulty] || DIFFICULTY.standard) };
    if (this.camera) { this.camera.fov = settings.fov; this.camera.updateProjectionMatrix(); }
    if (this.post) {
      this.post.uniforms.uGrain.value = settings.grain ? 1 : 0;
      this.post.uniforms.uAberr.value = settings.aberration ? 1 : 0;
      this.post.uniforms.uBright.value = settings.brightness;
      this.resize();
    }
    this.audio.applyVolumes();
  }
  resize() {
    if (!this.renderer) return;
    const w = innerWidth, h = innerHeight;
    this.renderer.setSize(w, h, false);
    this.post.setSize(w, h, settings.resolutionScale);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }

  // ---------------------------------------------------------------- loop
  frame(now) {
    requestAnimationFrame((t) => this.frame(t));
    const dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
    const t0 = performance.now();
    this.tick(dt);
    this.render(dt);
    this.measure(dt, performance.now() - t0);
  }
  tick(dt) {
    const input = this.input;
    if (this.mode === 'playing') {
      if (input.wasPressed('Tab')) { const open = this.ui.journalEl.classList.contains('hidden'); this.ui.toggleJournal(open); }
      if (!this.ui.journalEl.classList.contains('hidden')) { input.consumeMouse(); input.endFrame(); this.ui.update(dt); return; }
      this.update(dt);
      if (input.wasPressed('KeyE') || input.mouseWasPressed(0)) this.interaction.activate();
      if (input.wasPressed('KeyQ') || input.mouseWasPressed(2)) this.story.throwBottle();
    } else if (this.mode === 'reading') {
      input.consumeMouse();
      if (input.wasPressed('KeyE') || input.wasPressed('Escape') || input.mouseWasPressed(0)) this.ui.closeNote();
    } else if (this.mode === 'dead') {
      this.update(dt, true);
    } else if (this.mode === 'title') {
      // slow drift for the title backdrop
      this.player.yaw = Math.sin(performance.now() * 0.00007) * 0.25; this.player.updateCamera(dt);
      this.player.updateTorch(dt, { wasPressed: () => false, isDown: () => false });
    }
    this.ui.update(dt);
    input.endFrame();
  }
  update(dt, dead = false) {
    this.time += dt; this.playClock = (this.playClock || 0) + dt; // playClock never rewinds on retry
    const p = this.player, L = this.listener;
    p.update(dt, dead ? { consumeMouse: () => [0, 0], isDown: () => false, wasPressed: () => false } : this.input);
    this.doors.update(dt);
    L.update(dt);
    this.director.update(dt);
    this.throwables.update(dt);
    if (!dead) this.story.update(dt); else this.story.tweens.length && this.story.update(0);
    this.forceFlicker = Math.max(0, this.forceFlicker - dt);
    // proximity / fear
    const la = L.audioState();
    this.listenerProximity = la.active ? clamp(1 - la.dist / 9, 0, 1) * (Math.abs(p.y - L.y) < 2 ? 1 : 0.3) : 0;
    const targetFear = Math.max(this.listenerProximity * 0.9, L.state === 'chase' ? 0.85 : 0, this.director.menace * 0.7, dead ? 1 : 0);
    this.fear = damp(this.fear, targetFear, targetFear > this.fear ? 4 : 0.8, dt);
    // interaction prompt
    if (!dead) { const t = this.interaction.update(); this.ui.setPrompt(t ? this.interaction.label() : null); } else this.ui.setPrompt(null);
    this.ui.breath(p.breath, p.hidden && (p.breathHeld || p.breath < 1));
    // lightning (only heard/seen above ground)
    this.lightningT -= dt;
    if (this.lightningT <= 0) { this.lightningT = 25 + Math.random() * 45; if (this.flags.started) this.lightning(0.5 + Math.random() * 0.6); }
    this.props.windows.rainTex.offset.y -= dt * 0.35;
    // audio
    const room = this.world.roomAtPos(p.floor, p.x, p.z);
    const gen = this.props.interactables.get('generator').pos, spk = this.props.interactables.get('chamber_speaker').pos;
    this.audio.setListener(this.camera);
    this.audio.update(dt, {
      silentRoom: !!(room && room.silent), outsideExposure: p.floor === 2 ? 0.85 : p.floor === 1 ? 0.55 : 0.04,
      reverb: room ? 0.12 + room.reverb * 0.6 : 0.3, listener: la,
      generatorOn: !!this.flags.power, generator: { x: gen.x, y: gen.y + 0.6, z: gen.z },
      lureOn: this.lureOn, lure: { x: spk.x, y: spk.y + 0.7, z: spk.z },
      cranking: p.cranking, battery: p.battery,
      tension: clamp((this.flags.listenerAwake ? 0.12 : 0.04) + this.director.menace * 0.85 + (this.flags.cellar ? 0.08 : 0), 0, 1),
      chase: L.state === 'chase' || L.state === 'kill' ? 1 : 0, fear: this.fear,
    });
  }
  updateLights(dt) {
    const p = this.player, cam = this.camera;
    const floors = this.visibleFloors();
    const cands = [];
    for (const l of this.props.lights) {
      if (!floors.has(l.floor) || !l.on) continue;
      const d = l.pos.distanceToSquared(cam.position);
      if (d > 20 * 20) continue;
      cands.push([d, l]);
    }
    cands.sort((a, b) => a[0] - b[0]);
    const t = this.time;
    for (let i = 0; i < LIGHT_POOL; i++) {
      const pl = this.lightPool[i], c = cands[i];
      if (!c) { pl.intensity = 0; pl.visible = false; continue; }
      const l = c[1];
      pl.visible = true;
      pl.position.copy(l.pos); pl.color.setHex(l.color); pl.distance = l.distance;
      let k = 1;
      if (l.flicker) k *= 0.85 + 0.1 * Math.sin(t * 9.1 + i) + 0.05 * Math.sin(t * 23.7);
      if (l.moon) k *= 1 + this.flash * 3.5;
      if (l.powered && this.listenerProximity > 0.3 && Math.random() < this.listenerProximity * 0.2 && !settings.reduceFlashing) k *= 0.1;
      pl.intensity = l.intensity * k;
    }
    void p; void dt;
  }
  visibleFloors() {
    const p = this.player, s = new Set([p.floor]);
    if (!this._stairBoxes) {
      this._stairBoxes = STAIRS.map((st) => new THREE.Box3(new THREE.Vector3(st.x - 0.5, FLOORS[st.low].y, st.z - 0.5), new THREE.Vector3(st.x + st.w + 0.5, FLOORS[st.high].y + 3, st.z + st.h + 0.5)));
      this._frustum = new THREE.Frustum(); this._pv = new THREE.Matrix4();
    }
    this.camera.updateMatrixWorld();
    this._pv.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(this._pv);
    STAIRS.forEach((st, i) => {
      if (p.floor !== st.low && p.floor !== st.high) return;
      const near = p.x > st.x - 2.5 && p.x < st.x + st.w + 2.5 && p.z > st.z - 2.5 && p.z < st.z + st.h + 2.5;
      const onIt = p.x > st.x - 0.3 && p.x < st.x + st.w + 0.3 && p.z > st.z - 0.3 && p.z < st.z + st.h + 0.3;
      if (onIt || (near && this._frustum.intersectsBox(this._stairBoxes[i]))) { s.add(st.low); s.add(st.high); }
    });
    return s;
  }
  render(dt) {
    if (!this.renderer) return;
    const floors = this.visibleFloors();
    for (let f = 0; f < FLOORS.length; f++) { const v = floors.has(f); this.levelGroups[f].visible = v; this.props.floorGroups[f].visible = v; }
    // only the floor you stand on casts torch shadows (adjacent floors seen down a stairwell don't)
    if (this._shadowFloor !== this.player.floor) {
      this._shadowFloor = this.player.floor;
      if (!this._casters) { this._casters = FLOORS.map((_, f) => { const a = []; for (const g of [this.levelGroups[f], this.props.floorGroups[f]]) g.traverse((o) => { if (o.isMesh && o.castShadow) a.push(o); }); return a; }); }
      this._casters.forEach((list, f) => list.forEach((o) => { o.castShadow = f === this._shadowFloor; }));
      this.renderer.shadowMap.needsUpdate = true;
    }
    this.updateLights(dt);
    // fade / flash / fear into the post pass
    this.fade = damp(this.fade, this.fadeTarget, this.fadeTarget > this.fade ? 2.2 : 1.4, dt);
    this.flash = Math.max(0, this.flash - dt * 2.5);
    const U = this.post.uniforms, p = this.player;
    U.uTime.value = performance.now() / 1000;
    U.uFear.value = this.fear; U.uFade.value = this.fade; U.uFlash.value = this.flash;
    U.uHidden.value = damp(U.uHidden.value, p.hidden ? 1 : 0, 8, dt);
    U.uBreath.value = damp(U.uBreath.value, p.breathHeld ? 1 - p.breath * 0.5 : 0, 4, dt);
    U.uSilence.value = this.audio.silence || 0;
    U.uPulse.value = this.fear > 0.3 ? Math.max(0, Math.sin(U.uTime.value * (4 + this.fear * 6))) * this.fear : 0;
    this.post.render(this.scene, this.camera);
  }
  measure(dt, ms) {
    const P = this.perf;
    P.frames++; P.acc += dt; P.worst = Math.max(P.worst, ms);
    if (P.acc >= 0.5) {
      P.fps = Math.round(P.frames / P.acc); P.frames = 0; P.acc = 0;
      P.calls = this.post.sceneCalls; P.tris = this.post.sceneTris; P.ms = +ms.toFixed(2);
      if (this.statsEl) this.statsEl.textContent = `${P.fps} fps · ${P.calls} calls · ${(P.tris / 1000).toFixed(1)}k tris · ${P.ms} ms`;
    }
  }

  // ---------------------------------------------------------------- testing hooks (used by tests/e2e)
  simulate(seconds, dt = 1 / 30) { const n = Math.round(seconds / dt); for (let i = 0; i < n; i++) { this.update(dt); this.input.endFrame(); if (this.mode !== 'playing') break; } }
  interactWith(id) { const t = this.interaction.get(id); if (!t) return false; t.action(t); if (this.mode === 'reading') this.ui.closeNote(); return true; }
  teleport(f, x, z, yaw = this.player.yaw) { this.player.place(f, x, z, yaw, 0); }
}

const game = new Game();
window.__game = game;
try { game.init(); } catch (e) { console.error(e); game.ui.fatal(String(e && e.message || e)); }
if (params.has('stats')) { const el = document.createElement('div'); el.style.cssText = 'position:fixed;right:8px;top:6px;font:11px monospace;color:#8f8;z-index:9;pointer-events:none'; document.body.appendChild(el); game.statsEl = el; }
