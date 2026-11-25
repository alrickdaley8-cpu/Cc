// Procedural audio engine (Web Audio API). Every sound in the game is synthesised at runtime:
// no audio files are required (optional voice recordings in /public/audio are layered on top).
import { clamp } from '../core/rng.js';
import { settings } from '../core/settings.js';

export class AudioEngine {
  constructor() {
    this.ctx = null; this.ready = false;
    this.loops = {};
    this.tension = 0; this.chase = 0; this.silence = 0; this.heartRate = 0;
    this.voiceBuffers = new Map();
  }

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC({ latencyHint: 'interactive' });
    this.master = ctx.createGain();
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14; this.comp.ratio.value = 4; this.comp.attack.value = 0.005; this.comp.release.value = 0.25;
    this.master.connect(this.comp).connect(ctx.destination);
    // "world" chain: everything diegetic except the player's own body sounds — can be muffled (Quiet Room / death)
    this.worldFilter = ctx.createBiquadFilter(); this.worldFilter.type = 'lowpass'; this.worldFilter.frequency.value = 20000;
    this.worldGain = ctx.createGain();
    this.worldFilter.connect(this.worldGain).connect(this.master);
    this.sfx = ctx.createGain(); this.sfx.connect(this.worldFilter);
    this.amb = ctx.createGain(); this.amb.connect(this.worldFilter);
    this.music = ctx.createGain(); this.music.connect(this.master);
    this.voice = ctx.createGain(); this.voice.connect(this.master);
    this.body = ctx.createGain(); this.body.connect(this.master); // heartbeat, breath, tinnitus
    // reverb
    this.reverb = ctx.createConvolver(); this.reverb.buffer = this.makeIR(2.6, 2.2);
    this.reverbSend = ctx.createGain(); this.reverbSend.gain.value = 0.35;
    this.reverbSend.connect(this.reverb).connect(this.worldFilter);
    // noise buffers
    this.white = this.makeNoise('white'); this.pink = this.makeNoise('pink'); this.brown = this.makeNoise('brown');
    this.applyVolumes();
    this.startAmbience();
    this.startMusic();
    this.ready = true;
  }

  applyVolumes() {
    if (!this.ctx) return;
    this.master.gain.value = settings.masterVolume;
    this.sfx.gain.value = settings.sfxVolume; this.amb.gain.value = settings.sfxVolume * 0.9;
    this.music.gain.value = settings.musicVolume * 0.55; this.voice.gain.value = settings.voiceVolume;
    this.body.gain.value = settings.sfxVolume;
  }

  get now() { return this.ctx ? this.ctx.currentTime : 0; }

  makeNoise(type) {
    const ctx = this.ctx, len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (type === 'white') d[i] = w;
      else if (type === 'pink') {
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    }
    return buf;
  }
  makeIR(seconds, decay) {
    const ctx = this.ctx, len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        // early reflections cluster + diffuse tail
        const er = i < ctx.sampleRate * 0.08 && Math.random() < 0.004 ? (Math.random() * 2 - 1) * 0.8 : 0;
        d[i] = ((Math.random() * 2 - 1) * Math.pow(1 - t, decay) + er) * (0.6 + 0.4 * Math.random());
      }
    }
    return buf;
  }

  // ---------- routing helpers ----------
  // Returns an input node that is spatialised at pos (or stereo/centred when pos is null).
  spatial(pos, { bus = this.sfx, reverb = 0.3, occlusion = 1, refDistance = 1.2, rolloff = 1.4 } = {}) {
    const ctx = this.ctx;
    const input = ctx.createGain();
    let last = input;
    if (occlusion < 1) {
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400 + 12000 * occlusion * occlusion;
      last.connect(lp); last = lp;
      const og = ctx.createGain(); og.gain.value = 0.35 + 0.65 * occlusion; lp.connect(og); last = og;
    }
    if (pos) {
      const p = ctx.createPanner();
      p.panningModel = 'HRTF'; p.distanceModel = 'inverse'; p.refDistance = refDistance; p.rolloffFactor = rolloff; p.maxDistance = 60;
      p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z;
      last.connect(p); last = p; input.panner = p;
    }
    last.connect(bus);
    if (reverb > 0) { const s = ctx.createGain(); s.gain.value = reverb; last.connect(s); s.connect(this.reverbSend); }
    return input;
  }
  noiseSrc(buf = this.white, loop = false, rate = 1) {
    const s = this.ctx.createBufferSource(); s.buffer = buf; s.loop = loop; s.playbackRate.value = rate;
    if (!loop) s.loopStart = 0;
    return s;
  }
  env(param, t, a, peak, d, end = 0.0001) {
    param.cancelScheduledValues(t);
    param.setValueAtTime(0.0001, t);
    param.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + a);
    param.exponentialRampToValueAtTime(Math.max(end, 0.0001), t + a + d);
  }
  // A burst of filtered noise.
  burst(out, { t = this.now, type = 'bandpass', freq = 800, q = 1, a = 0.005, d = 0.15, gain = 0.5, buf = this.white, rate = 1, sweepTo = null }) {
    const ctx = this.ctx, s = this.noiseSrc(buf, false, rate), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + a + d);
    s.connect(f).connect(g).connect(out);
    this.env(g.gain, t, a, gain, d);
    s.start(t, Math.random() * 3); s.stop(t + a + d + 0.05);
  }
  tone(out, { t = this.now, type = 'sine', freq = 440, a = 0.01, d = 0.5, gain = 0.3, glide = null, detune = 0 }) {
    const ctx = this.ctx, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t); o.detune.value = detune;
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, t + a + d);
    o.connect(g).connect(out); this.env(g.gain, t, a, gain, d);
    o.start(t); o.stop(t + a + d + 0.05);
  }

  setListener(cam) {
    if (!this.ctx) return;
    const l = this.ctx.listener, t = this.now;
    const e = cam.matrixWorld.elements;
    const fx = -e[8], fy = -e[9], fz = -e[10], ux = e[4], uy = e[5], uz = e[6];
    if (l.positionX) {
      l.positionX.setTargetAtTime(cam.position.x, t, 0.02); l.positionY.setTargetAtTime(cam.position.y, t, 0.02); l.positionZ.setTargetAtTime(cam.position.z, t, 0.02);
      l.forwardX.setTargetAtTime(fx, t, 0.02); l.forwardY.setTargetAtTime(fy, t, 0.02); l.forwardZ.setTargetAtTime(fz, t, 0.02);
      l.upX.setTargetAtTime(ux, t, 0.02); l.upY.setTargetAtTime(uy, t, 0.02); l.upZ.setTargetAtTime(uz, t, 0.02);
    } else { l.setPosition(cam.position.x, cam.position.y, cam.position.z); l.setOrientation(fx, fy, fz, ux, uy, uz); }
  }

  // ---------- one-shot sounds ----------
  play(name, o = {}) {
    if (!this.ready) return;
    const fn = this['s_' + name];
    if (fn) fn.call(this, o);
  }

  s_footstep({ surface = 'wood', creak, puddle, run, crouch, player = true, pos = null }) {
    const out = player ? this.spatial(null, { reverb: 0.25 }) : this.spatial(pos, { reverb: 0.4, refDistance: 2 });
    const v = player ? (crouch ? 0.18 : run ? 0.7 : 0.4) : 1;
    const t = this.now;
    const r = 0.85 + Math.random() * 0.3;
    if (surface === 'tile_check' || surface === 'tile_white') { this.burst(out, { t, freq: 2600 * r, q: 2, d: 0.05, gain: 0.35 * v }); this.burst(out, { t, type: 'lowpass', freq: 300, d: 0.06, gain: 0.4 * v }); }
    else if (surface === 'concrete' || surface === 'stone') { this.burst(out, { t, freq: 1400 * r, q: 0.8, d: 0.07, gain: 0.32 * v }); this.burst(out, { t, type: 'lowpass', freq: 220, d: 0.08, gain: 0.5 * v }); }
    else if (surface === 'grate') { this.burst(out, { t, freq: 3200, q: 6, d: 0.18, gain: 0.25 * v }); this.tone(out, { t, type: 'square', freq: 180 * r, d: 0.08, gain: 0.05 * v }); }
    else { // wood
      this.burst(out, { t, type: 'lowpass', freq: 380 * r, d: 0.09, gain: 0.8 * v, buf: this.pink });
      this.burst(out, { t: t + 0.01, freq: 1100 * r, q: 1.5, d: 0.04, gain: 0.18 * v });
    }
    if (creak) this.creak(out, t + 0.03, 0.5 + (run ? 0.3 : 0), 1.0);
    if (puddle) { this.burst(out, { t, freq: 900, q: 0.7, d: 0.25, gain: 0.5, sweepTo: 2500 }); this.burst(out, { t: t + 0.06, freq: 3000, q: 3, d: 0.1, gain: 0.15 }); }
  }
  // Wood creak: a buzzy oscillator with pitch wander through a resonant band.
  creak(out, t, gain = 0.4, dur = 0.6) {
    const ctx = this.ctx, o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain(), am = ctx.createOscillator(), amg = ctx.createGain();
    o.type = 'sawtooth'; const base = 90 + Math.random() * 90;
    o.frequency.setValueAtTime(base, t); o.frequency.linearRampToValueAtTime(base * (0.7 + Math.random() * 0.8), t + dur);
    am.frequency.value = 18 + Math.random() * 30; amg.gain.value = 0.5; am.connect(amg).connect(g.gain);
    f.type = 'bandpass'; f.frequency.value = 700 + Math.random() * 900; f.Q.value = 6;
    o.connect(f).connect(g).connect(out);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + dur * 0.3); g.gain.linearRampToValueAtTime(gain * 0.6, t + dur * 0.7); g.gain.linearRampToValueAtTime(0, t + dur);
    o.start(t); o.stop(t + dur + 0.05); am.start(t); am.stop(t + dur + 0.05);
  }
  s_creak({ pos, gain = 0.5, occlusion = 1 }) { this.creak(this.spatial(pos, { reverb: 0.6, occlusion, refDistance: 2.5 }), this.now, gain, 0.5 + Math.random() * 0.9); }
  s_knock({ pos, n = 3, occlusion = 1 }) {
    const out = this.spatial(pos, { reverb: 0.6, occlusion, refDistance: 3 });
    for (let i = 0; i < n; i++) { const t = this.now + i * (0.32 + Math.random() * 0.08); this.burst(out, { t, type: 'lowpass', freq: 260, d: 0.12, gain: 1.0, buf: this.pink }); this.burst(out, { t, freq: 900, q: 2, d: 0.05, gain: 0.25 }); }
  }
  s_doorCreak({ pos, slow }) { const out = this.spatial(pos, { reverb: 0.5, refDistance: 2 }); this.creak(out, this.now, slow ? 0.18 : 0.45, slow ? 1.6 : 0.7); if (!slow) this.creak(out, this.now + 0.25, 0.25, 0.5); }
  s_doorSlam({ pos, gain = 1 }) {
    const out = this.spatial(pos, { reverb: 0.9, refDistance: 3 });
    this.burst(out, { type: 'lowpass', freq: 180, d: 0.4, gain: 1.4 * gain, buf: this.brown });
    this.burst(out, { freq: 700, q: 1, d: 0.12, gain: 0.5 * gain });
    for (let i = 0; i < 4; i++) this.burst(out, { t: this.now + 0.05 + i * 0.04, freq: 2400, q: 8, d: 0.04, gain: 0.08 * gain });
  }
  s_doorClose({ pos }) { const out = this.spatial(pos, { reverb: 0.5 }); this.burst(out, { type: 'lowpass', freq: 240, d: 0.15, gain: 0.5, buf: this.pink }); this.burst(out, { t: this.now + 0.02, freq: 2200, q: 4, d: 0.05, gain: 0.12 }); }
  s_locked({ pos }) { const out = this.spatial(pos, { reverb: 0.3 }); for (let i = 0; i < 3; i++) { this.burst(out, { t: this.now + i * 0.11, freq: 1800, q: 5, d: 0.05, gain: 0.3 }); this.burst(out, { t: this.now + i * 0.11, type: 'lowpass', freq: 200, d: 0.06, gain: 0.35 }); } }
  s_unlock({ pos }) { const out = this.spatial(pos, { reverb: 0.3 }); this.burst(out, { freq: 3000, q: 8, d: 0.04, gain: 0.3 }); this.burst(out, { t: this.now + 0.15, freq: 1500, q: 6, d: 0.08, gain: 0.4 }); }
  s_torchClick() { const out = this.spatial(null, { reverb: 0.1 }); this.burst(out, { freq: 4000, q: 4, d: 0.02, gain: 0.25 }); this.burst(out, { t: this.now + 0.03, freq: 2500, q: 4, d: 0.02, gain: 0.15 }); }
  s_paper() { const out = this.spatial(null, { reverb: 0.15 }); for (let i = 0; i < 5; i++) this.burst(out, { t: this.now + i * 0.04 + Math.random() * 0.03, freq: 3000 + Math.random() * 2500, q: 0.8, d: 0.06, gain: 0.08 }); }
  s_pickup() { const out = this.spatial(null, { reverb: 0.15 }); this.burst(out, { freq: 1200, q: 0.8, d: 0.12, gain: 0.15, buf: this.pink }); this.tone(out, { freq: 1900, d: 0.15, gain: 0.03 }); }
  s_key() { const out = this.spatial(null, { reverb: 0.2 }); for (let i = 0; i < 3; i++) this.tone(out, { t: this.now + i * 0.07, freq: 3200 + Math.random() * 1500, d: 0.12, gain: 0.05, type: 'triangle' }); }
  s_glass({ pos }) {
    const out = this.spatial(pos, { reverb: 0.8, refDistance: 3 });
    this.burst(out, { freq: 4500, q: 1, d: 0.35, gain: 0.9 });
    for (let i = 0; i < 12; i++) this.tone(out, { t: this.now + Math.random() * 0.3, freq: 2500 + Math.random() * 5000, d: 0.08 + Math.random() * 0.15, gain: 0.06, type: 'sine' });
    this.burst(out, { type: 'lowpass', freq: 300, d: 0.1, gain: 0.5 });
  }
  s_throw() { const out = this.spatial(null, { reverb: 0.1 }); this.burst(out, { freq: 600, q: 0.7, d: 0.25, gain: 0.15, sweepTo: 1800 }); }
  s_bell({ pos, freq = 220, gain = 0.6 }) {
    const out = this.spatial(pos, { reverb: 1.0, refDistance: 3 });
    const partials = [0.5, 1, 1.183, 1.506, 2.0, 2.514, 2.662, 3.011, 4.166];
    partials.forEach((p, i) => this.tone(out, { freq: freq * p, a: 0.002, d: 2.5 + (8 - i) * 0.35, gain: gain * 0.12 / (1 + i * 0.3) }));
    this.burst(out, { freq: freq * 6, q: 2, d: 0.04, gain: gain * 0.2 });
  }
  s_musicBox({ pos }) {
    const out = this.spatial(pos, { reverb: 0.7, refDistance: 3 });
    // an original, slightly-wrong lullaby in D minor; tines slowly go out of tune
    const notes = [74, 77, 81, 79, 77, 76, 74, 69, 70, 74, 72, 70, 69, 65, 67, 69, 74, 77, 81, 86, 84, 81, 77, 76, 74];
    const beat = 0.29;
    notes.forEach((n, i) => {
      const t = this.now + i * beat * (1 + i * 0.012);
      const f = 440 * Math.pow(2, (n - 69) / 12) * (1 - i * 0.0012);
      this.tone(out, { t, freq: f, a: 0.002, d: 1.1, gain: 0.22, type: 'sine' });
      this.tone(out, { t, freq: f * 3.01, a: 0.001, d: 0.25, gain: 0.05, type: 'sine' });
      this.tone(out, { t, freq: f * 5.4, a: 0.001, d: 0.08, gain: 0.03 });
    });
    return notes.length * beat;
  }
  s_thunder({ intensity = 1, delay = 0 }) {
    const out = this.spatial(null, { bus: this.amb, reverb: 0.5 });
    const t = this.now + delay;
    this.burst(out, { t, type: 'lowpass', freq: 900 * intensity, a: 0.02, d: 0.6, gain: 0.6 * intensity, buf: this.brown, sweepTo: 120 });
    this.burst(out, { t: t + 0.15, type: 'lowpass', freq: 160, a: 0.4, d: 3.5 + intensity * 2, gain: 1.2 * intensity, buf: this.brown });
    for (let i = 0; i < 4; i++) this.burst(out, { t: t + 0.4 + Math.random() * 2.5, type: 'lowpass', freq: 220, a: 0.2, d: 1.2, gain: 0.6 * intensity, buf: this.brown });
  }
  s_gasp() { const out = this.spatial(null, { bus: this.body, reverb: 0.15 }); this.burst(out, { freq: 1300, q: 1.2, a: 0.05, d: 0.5, gain: 0.5, sweepTo: 700 }); this.burst(out, { t: this.now + 0.7, freq: 900, q: 1, a: 0.1, d: 0.6, gain: 0.25 }); }
  s_exhale() { const out = this.spatial(null, { bus: this.body, reverb: 0.1 }); this.burst(out, { freq: 900, q: 0.8, a: 0.15, d: 0.9, gain: 0.12, buf: this.pink }); }
  s_gaspExhausted() { const out = this.spatial(null, { bus: this.body }); for (let i = 0; i < 3; i++) this.burst(out, { t: this.now + i * 0.6, freq: 1100, q: 1, a: 0.08, d: 0.35, gain: 0.2 }); }
  s_breathIn() { const out = this.spatial(null, { bus: this.body }); this.burst(out, { freq: 1500, q: 1, a: 0.3, d: 0.25, gain: 0.1 }); }
  // A stinger: dissonant swell and a hit. Used sparingly, always after a telegraph.
  s_sting({ gain = 0.6 } = {}) {
    const out = this.spatial(null, { bus: this.music, reverb: 0.8 });
    const t = this.now;
    for (const f of [55, 58.3, 82.4, 116.5, 1244, 1318]) this.tone(out, { t, type: f < 200 ? 'sawtooth' : 'sine', freq: f, a: 0.04, d: 2.4, gain: gain * (f < 200 ? 0.12 : 0.04) });
    this.burst(out, { t, type: 'lowpass', freq: 200, d: 1.0, gain: gain * 1.2, buf: this.brown });
  }
  s_swell({ gain = 0.5, dur = 4 } = {}) {
    const out = this.spatial(null, { bus: this.music, reverb: 1 });
    const t = this.now;
    for (const f of [110, 116.5, 164.8, 233]) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = Math.random() * 20 - 10;
      const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(200, t); lp.frequency.exponentialRampToValueAtTime(2400, t + dur);
      o.connect(lp).connect(g).connect(out); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain * 0.08, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + 0.08);
      o.start(t); o.stop(t + dur + 0.1);
    }
  }
  s_listenerStep({ pos, occlusion = 1 }) {
    const out = this.spatial(pos, { reverb: 0.55, occlusion, refDistance: 2.2, rolloff: 1.2 });
    this.burst(out, { type: 'lowpass', freq: 160, d: 0.22, gain: 1.2, buf: this.brown });
    this.burst(out, { freq: 500, q: 2, d: 0.08, gain: 0.25 });
    if (Math.random() < 0.35) this.creak(out, this.now + 0.05, 0.3, 0.5);
  }
  // The Listener inhales — "listening". A rising band of noise drawn inwards.
  s_inhale({ pos, occlusion = 1, gain = 0.6 }) {
    const out = this.spatial(pos, { reverb: 0.6, occlusion, refDistance: 2.5 });
    this.burst(out, { freq: 400, q: 3, a: 1.2, d: 0.25, gain, sweepTo: 2800 });
    this.burst(out, { freq: 160, q: 6, a: 1.0, d: 0.3, gain: gain * 0.6, sweepTo: 90 });
  }
  // A record-scratch shriek: the Listener has found you.
  s_shriek({ pos }) {
    const out = this.spatial(pos, { reverb: 0.9, refDistance: 4 });
    const t = this.now;
    for (let i = 0; i < 6; i++) this.burst(out, { t: t + i * 0.07, freq: 1800 + Math.random() * 1500, q: 4, a: 0.005, d: 0.06, gain: 0.7 });
    this.tone(out, { t, type: 'sawtooth', freq: 140, glide: 70, a: 0.02, d: 1.4, gain: 0.25 });
    this.tone(out, { t, type: 'square', freq: 1180, glide: 900, a: 0.05, d: 1.2, gain: 0.05 });
    this.burst(out, { t, freq: 3000, q: 1, a: 0.1, d: 1.2, gain: 0.6, sweepTo: 600 });
  }
  s_death() {
    const t = this.now;
    // everything is sucked into the horn
    this.worldFilter.frequency.cancelScheduledValues(t); this.worldFilter.frequency.setValueAtTime(20000, t); this.worldFilter.frequency.exponentialRampToValueAtTime(120, t + 1.6);
    const out = this.spatial(null, { bus: this.body, reverb: 0.5 });
    this.burst(out, { freq: 200, q: 2, a: 1.4, d: 0.2, gain: 1.4, sweepTo: 6000 });
    this.tone(out, { type: 'sawtooth', freq: 40, glide: 900, a: 1.5, d: 0.15, gain: 0.4 });
  }
  restoreWorld() { if (!this.ctx) return; const t = this.now; this.worldFilter.frequency.cancelScheduledValues(t); this.worldFilter.frequency.setTargetAtTime(20000, t, 0.3); }
  s_vault({ pos }) {
    const out = this.spatial(pos, { reverb: 1, refDistance: 3 });
    this.burst(out, { type: 'lowpass', freq: 120, d: 1.4, gain: 1.6, buf: this.brown });
    this.tone(out, { type: 'triangle', freq: 82, d: 2, gain: 0.25 }); this.tone(out, { type: 'sine', freq: 311, d: 2.5, gain: 0.06 });
    for (let i = 0; i < 3; i++) this.burst(out, { t: this.now + 0.3 + i * 0.18, freq: 1600, q: 6, d: 0.1, gain: 0.2 });
  }
  s_genStart({ pos }) {
    const out = this.spatial(pos, { reverb: 0.8, refDistance: 3 });
    for (let i = 0; i < 4; i++) { const t = this.now + i * 0.45; this.burst(out, { t, type: 'lowpass', freq: 300, d: 0.3, gain: 0.9, buf: this.brown }); this.tone(out, { t, type: 'sawtooth', freq: 40 + i * 6, d: 0.3, gain: 0.15 }); }
  }
  s_clank({ pos }) { const out = this.spatial(pos, { reverb: 0.7 }); this.burst(out, { freq: 1200, q: 6, d: 0.3, gain: 0.5 }); this.tone(out, { freq: 523, d: 0.6, gain: 0.05, type: 'triangle' }); }
  s_uiHover() { if (!this.ready) return; const out = this.spatial(null, { bus: this.voice, reverb: 0 }); this.tone(out, { freq: 1600, d: 0.04, gain: 0.015 }); }
  s_heartbeat() {
    const out = this.spatial(null, { bus: this.body, reverb: 0 });
    const t = this.now, g = 0.4 + this.heartRate * 0.5;
    this.tone(out, { t, freq: 55, glide: 38, a: 0.005, d: 0.12, gain: g }); this.tone(out, { t: t + 0.16, freq: 50, glide: 35, a: 0.005, d: 0.14, gain: g * 0.7 });
  }
  // Speech-like babble: a glottal sawtooth through two moving formant filters with syllabic
  // amplitude. Unintelligible by design (subtitles carry the words) — it reads as "a voice
  // through a wall" or "a voice on a wax cylinder".
  s_murmur({ pos = null, text = '', mimic = false, old = true }) {
    const ctx = this.ctx, t0 = this.now;
    const dur = Math.min(7, 0.6 + text.length * 0.055);
    const out = this.spatial(pos, { bus: pos ? this.sfx : this.voice, reverb: pos ? 0.6 : 0.15, refDistance: 2 });
    const o = ctx.createOscillator(); o.type = 'sawtooth';
    const base = mimic ? 98 : /Clara/.test(text) || text.includes('♪') ? 260 : 150;
    o.frequency.setValueAtTime(base, t0);
    const f1 = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter(); f1.type = f2.type = 'bandpass'; f1.Q.value = 6; f2.Q.value = 8;
    const g = ctx.createGain(); g.gain.value = 0;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = old ? 300 : 90;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = old ? 3000 : 4500;
    const mix = ctx.createGain(); mix.gain.value = 0.9;
    o.connect(f1); o.connect(f2); f1.connect(mix); f2.connect(mix); mix.connect(g).connect(hp).connect(lp).connect(out);
    let t = t0;
    const V = [[730, 1090], [270, 2290], [530, 1840], [570, 840], [300, 870], [640, 1190], [440, 1020]];
    while (t < t0 + dur) {
      const syl = 0.11 + Math.random() * 0.16; const v = V[Math.floor(Math.random() * V.length)];
      f1.frequency.setTargetAtTime(v[0], t, 0.03); f2.frequency.setTargetAtTime(v[1], t, 0.03);
      o.frequency.setTargetAtTime(base * (0.85 + Math.random() * 0.35) * (mimic ? 1 + Math.sin(t * 7) * 0.04 : 1), t, 0.05);
      g.gain.setTargetAtTime(0.35 + Math.random() * 0.25, t, 0.02); g.gain.setTargetAtTime(0.02, t + syl * 0.7, 0.03);
      t += syl + (Math.random() < 0.15 ? 0.25 : 0.02);
    }
    g.gain.setTargetAtTime(0, t, 0.05);
    o.start(t0); o.stop(t + 0.3);
    if (old || mimic) this.s_crackle({ dur, pos, gain: mimic ? 0.18 : 0.12 });
  }
  s_crackle({ dur = 2, pos = null, gain = 0.2 }) {
    const out = this.spatial(pos, { bus: this.voice, reverb: 0.2 });
    for (let i = 0; i < dur * 25; i++) this.burst(out, { t: this.now + Math.random() * dur, freq: 2000 + Math.random() * 5000, q: 2, d: 0.008, gain: gain * Math.random() });
  }

  // ---------- continuous layers ----------
  startAmbience() {
    const ctx = this.ctx;
    // rain: two bands of pink noise with slow modulation
    const rainOut = ctx.createGain(); rainOut.gain.value = 0.0; rainOut.connect(this.amb);
    const r1 = this.noiseSrc(this.pink, true), f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 2500; f1.Q.value = 0.4;
    const r2 = this.noiseSrc(this.brown, true), f2 = ctx.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = 400;
    const g2 = ctx.createGain(); g2.gain.value = 0.6;
    r1.connect(f1).connect(rainOut); r2.connect(f2).connect(g2).connect(rainOut);
    r1.start(); r2.start();
    this.loops.rain = { out: rainOut, lp: f1 };
    // wind: noise through a slowly sweeping resonant band
    const wind = this.noiseSrc(this.pink, true), wf = ctx.createBiquadFilter(); wf.type = 'bandpass'; wf.Q.value = 3; wf.frequency.value = 400;
    const wg = ctx.createGain(); wg.gain.value = 0.0;
    wind.connect(wf).connect(wg).connect(this.amb); wind.start();
    this.loops.wind = { f: wf, g: wg, phase: 0 };
    // room tone: very low hum of the old house
    const hum = ctx.createOscillator(), hg = ctx.createGain(); hum.frequency.value = 46; hg.gain.value = 0.012; hum.connect(hg).connect(this.amb); hum.start();
    this.loops.room = { g: hg };
    // the Listener's hum: crackling gramophone + sub drone, positional
    const lp = ctx.createPanner(); lp.panningModel = 'HRTF'; lp.distanceModel = 'exponential'; lp.refDistance = 1.5; lp.rolloffFactor = 1.6; lp.maxDistance = 40;
    const locc = ctx.createBiquadFilter(); locc.type = 'lowpass'; locc.frequency.value = 8000;
    const lg = ctx.createGain(); lg.gain.value = 0;
    const sub = ctx.createOscillator(); sub.type = 'sine'; sub.frequency.value = 49;
    const sub2 = ctx.createOscillator(); sub2.type = 'sawtooth'; sub2.frequency.value = 98.7;
    const sub2g = ctx.createGain(); sub2g.gain.value = 0.12; const sub2f = ctx.createBiquadFilter(); sub2f.type = 'lowpass'; sub2f.frequency.value = 300;
    const crack = this.noiseSrc(this.white, true), cf = ctx.createBiquadFilter(); cf.type = 'bandpass'; cf.frequency.value = 1800; cf.Q.value = 1.5;
    // crackle gate: random-ish amplitude modulation
    const cg = ctx.createGain(); cg.gain.value = 0.0;
    const lfo = ctx.createOscillator(); lfo.type = 'square'; lfo.frequency.value = 13.7; const lfog = ctx.createGain(); lfog.gain.value = 0.12; lfo.connect(lfog).connect(cg.gain);
    const lfo2 = ctx.createOscillator(); lfo2.type = 'sawtooth'; lfo2.frequency.value = 3.1; const lfo2g = ctx.createGain(); lfo2g.gain.value = 0.08; lfo2.connect(lfo2g).connect(cg.gain);
    crack.connect(cf).connect(cg).connect(lg);
    sub.connect(lg); sub2.connect(sub2f).connect(sub2g).connect(lg);
    lg.connect(locc).connect(lp).connect(this.sfx);
    const lrv = ctx.createGain(); lrv.gain.value = 0.25; lp.connect(lrv).connect(this.reverbSend);
    [sub, sub2, crack, lfo, lfo2].forEach((n) => n.start());
    this.loops.listener = { panner: lp, gain: lg, occ: locc, sub, sub2 };
    // generator motor (positional)
    const gp = ctx.createPanner(); gp.panningModel = 'HRTF'; gp.refDistance = 2.5; gp.rolloffFactor = 1.1;
    const gg = ctx.createGain(); gg.gain.value = 0;
    const m1 = ctx.createOscillator(); m1.type = 'sawtooth'; m1.frequency.value = 29;
    const m1f = ctx.createBiquadFilter(); m1f.type = 'lowpass'; m1f.frequency.value = 260;
    const mn = this.noiseSrc(this.brown, true); const mng = ctx.createGain(); mng.gain.value = 0.5;
    const mam = ctx.createOscillator(); mam.frequency.value = 14.5; const mamg = ctx.createGain(); mamg.gain.value = 0.3; mam.connect(mamg).connect(gg.gain);
    m1.connect(m1f).connect(gg); mn.connect(mng).connect(gg); gg.connect(gp).connect(this.sfx);
    const grv = ctx.createGain(); grv.gain.value = 0.3; gp.connect(grv).connect(this.reverbSend);
    [m1, mn, mam].forEach((n) => n.start());
    this.loops.gen = { panner: gp, gain: gg, on: 0 };
    // torch crank whirr (non-positional)
    const ck = this.noiseSrc(this.white, true), ckf = ctx.createBiquadFilter(); ckf.type = 'bandpass'; ckf.frequency.value = 1400; ckf.Q.value = 3;
    const ckg = ctx.createGain(); ckg.gain.value = 0;
    const ckam = ctx.createOscillator(); ckam.type = 'square'; ckam.frequency.value = 22; const ckamg = ctx.createGain(); ckamg.gain.value = 0.0; ckam.connect(ckamg).connect(ckg.gain);
    const cko = ctx.createOscillator(); cko.type = 'triangle'; cko.frequency.value = 300; const ckog = ctx.createGain(); ckog.gain.value = 0.15;
    ck.connect(ckf).connect(ckg); cko.connect(ckog).connect(ckg); ckg.connect(this.sfx);
    [ck, ckam, cko].forEach((n) => n.start());
    this.loops.crank = { g: ckg, amg: ckamg, osc: cko, level: 0 };
    // tinnitus (Quiet Room) + lure tone from the chamber speaker
    const tin = ctx.createOscillator(); tin.frequency.value = 7300; const ting = ctx.createGain(); ting.gain.value = 0; tin.connect(ting).connect(this.body); tin.start();
    this.loops.tinnitus = { g: ting };
    const lureP = ctx.createPanner(); lureP.panningModel = 'HRTF'; lureP.refDistance = 4; lureP.rolloffFactor = 0.9;
    const lureG = ctx.createGain(); lureG.gain.value = 0;
    const lo1 = ctx.createOscillator(); lo1.type = 'sawtooth'; lo1.frequency.value = 110;
    const lo2 = ctx.createOscillator(); lo2.type = 'sawtooth'; lo2.frequency.value = 116.6;
    const lof = ctx.createBiquadFilter(); lof.type = 'bandpass'; lof.frequency.value = 900; lof.Q.value = 1.2;
    const lam = ctx.createOscillator(); lam.frequency.value = 1.6; const lamg = ctx.createGain(); lamg.gain.value = 0.5; lam.connect(lamg).connect(lureG.gain);
    lo1.connect(lof); lo2.connect(lof); lof.connect(lureG).connect(lureP).connect(this.sfx);
    const lrv2 = ctx.createGain(); lrv2.gain.value = 0.5; lureP.connect(lrv2).connect(this.reverbSend);
    [lo1, lo2, lam].forEach((n) => n.start());
    this.loops.lure = { panner: lureP, gain: lureG, on: 0 };
  }

  startMusic() {
    const ctx = this.ctx;
    // Dread bed: detuned low cluster with slowly breathing filter.
    const bed = ctx.createGain(); bed.gain.value = 0; bed.connect(this.music);
    const bf = ctx.createBiquadFilter(); bf.type = 'lowpass'; bf.frequency.value = 300; bf.Q.value = 2; bf.connect(bed);
    for (const [f, type] of [[55, 'sawtooth'], [58.27, 'sawtooth'], [41.2, 'sine'], [82.41, 'triangle']]) {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = (Math.random() - 0.5) * 12;
      const g = ctx.createGain(); g.gain.value = type === 'sine' ? 0.5 : 0.18; o.connect(g).connect(bf); o.start();
    }
    const blfo = ctx.createOscillator(); blfo.frequency.value = 0.05; const blfog = ctx.createGain(); blfog.gain.value = 180; blfo.connect(blfog).connect(bf.frequency); blfo.start();
    // Unease: glassy high cluster with tremolo.
    const glass = ctx.createGain(); glass.gain.value = 0; glass.connect(this.music);
    const trem = ctx.createOscillator(); trem.frequency.value = 5.3; const tremg = ctx.createGain(); tremg.gain.value = 0.3; trem.connect(tremg).connect(glass.gain); trem.start();
    for (const f of [1318.5, 1396.9, 987.8, 2093]) { const o = ctx.createOscillator(); o.frequency.value = f; const g = ctx.createGain(); g.gain.value = 0.02; o.connect(g).connect(glass); o.start(); }
    // Chase: pulsing low ostinato.
    const chase = ctx.createGain(); chase.gain.value = 0; chase.connect(this.music);
    const co = ctx.createOscillator(); co.type = 'sawtooth'; co.frequency.value = 73.4;
    const co2 = ctx.createOscillator(); co2.type = 'sawtooth'; co2.frequency.value = 77.8;
    const cf = ctx.createBiquadFilter(); cf.type = 'lowpass'; cf.frequency.value = 900; cf.Q.value = 5;
    const gate = ctx.createGain(); gate.gain.value = 0;
    const glfo = ctx.createOscillator(); glfo.type = 'square'; glfo.frequency.value = 4.6; const glfog = ctx.createGain(); glfog.gain.value = 0.5; glfo.connect(glfog).connect(gate.gain);
    co.connect(cf); co2.connect(cf); cf.connect(gate).connect(chase);
    [co, co2, glfo].forEach((n) => n.start());
    this.loops.music = { bed, bf, glass, chase };
  }

  // Called every frame with game state.
  update(dt, s) {
    if (!this.ready) return;
    const t = this.now;
    const L = this.loops;
    // silence factor (Quiet Room): duck everything diegetic
    this.silence += ((s.silentRoom ? 1 : 0) - this.silence) * Math.min(1, dt * 2.5);
    const outside = s.outsideExposure; // 0..1: windows nearby / floor
    L.rain.out.gain.setTargetAtTime((0.05 + 0.2 * outside) * (1 - this.silence), t, 0.4);
    L.rain.lp.frequency.setTargetAtTime(1200 + 2400 * outside, t, 0.5);
    L.wind.phase += dt * 0.13;
    const gust = 0.5 + 0.5 * Math.sin(L.wind.phase) * Math.sin(L.wind.phase * 2.7 + 1);
    L.wind.f.frequency.setTargetAtTime(250 + 500 * gust, t, 0.3);
    L.wind.g.gain.setTargetAtTime((0.015 + 0.06 * gust * (0.3 + outside)) * (1 - this.silence), t, 0.3);
    L.room.g.gain.setTargetAtTime(0.012 * (1 - this.silence), t, 0.3);
    this.worldGain.gain.setTargetAtTime(1 - this.silence * 0.97, t, 0.25);
    L.tinnitus.g.gain.setTargetAtTime(this.silence * 0.004, t, 0.8);
    this.reverbSend.gain.setTargetAtTime(s.reverb ?? 0.35, t, 0.3);
    // Listener hum
    const li = s.listener;
    if (li && li.active) {
      L.listener.panner.positionX.setTargetAtTime(li.x, t, 0.05); L.listener.panner.positionY.setTargetAtTime(li.y, t, 0.05); L.listener.panner.positionZ.setTargetAtTime(li.z, t, 0.05);
      L.listener.gain.gain.setTargetAtTime(li.humGain, t, 0.25);
      L.listener.occ.frequency.setTargetAtTime(300 + 9000 * li.occlusion * li.occlusion, t, 0.2);
      L.listener.sub.frequency.setTargetAtTime(49 + li.agitation * 8, t, 0.5);
    } else L.listener.gain.gain.setTargetAtTime(0, t, 0.3);
    // generator
    if (s.generator) { L.gen.panner.positionX.value = s.generator.x; L.gen.panner.positionY.value = s.generator.y; L.gen.panner.positionZ.value = s.generator.z; }
    L.gen.gain.gain.setTargetAtTime(s.generatorOn ? 0.5 : 0, t, s.generatorOn ? 0.8 : 1.5);
    // lure (chamber speaker)
    if (s.lure) { L.lure.panner.positionX.value = s.lure.x; L.lure.panner.positionY.value = s.lure.y; L.lure.panner.positionZ.value = s.lure.z; }
    L.lure.gain.gain.setTargetAtTime(s.lureOn ? 0.35 : 0, t, 0.3);
    // crank
    L.crank.level += ((s.cranking ? 1 : 0) - L.crank.level) * Math.min(1, dt * 10);
    L.crank.g.gain.setTargetAtTime(L.crank.level * 0.06, t, 0.05); L.crank.amg.gain.setTargetAtTime(L.crank.level * 0.05, t, 0.05);
    L.crank.osc.frequency.setTargetAtTime(220 + 260 * s.battery, t, 0.2);
    // music
    const tension = this.tension = s.tension, chase = this.chase = s.chase;
    L.music.bed.gain.setTargetAtTime((0.02 + tension * 0.32) * (1 - chase * 0.4) * (1 - this.silence * 0.8), t, 1.2);
    L.music.bf.frequency.setTargetAtTime(160 + tension * 600 + chase * 900, t, 1.0);
    L.music.glass.gain.setTargetAtTime(Math.max(0, tension - 0.35) * 0.35 * (1 - chase), t, 1.5);
    L.music.chase.gain.setTargetAtTime(chase * 0.5, t, chase > 0.5 ? 0.15 : 1.2);
    // heartbeat
    this.heartRate = s.fear;
    if (s.fear > 0.25) {
      this.hbT = (this.hbT || 0) + dt;
      const interval = 1.1 - s.fear * 0.65;
      if (this.hbT > interval) { this.hbT = 0; this.s_heartbeat(); }
    }
    if (s.silentRoom) { this.hbT2 = (this.hbT2 || 0) + dt; if (this.hbT2 > 0.95 && s.fear <= 0.25) { this.hbT2 = 0; this.s_heartbeat(); } }
  }

  // ---------- voice clips (optional recorded lines) ----------
  async loadVoice(id, url) {
    if (!this.ctx || this.voiceBuffers.has(id)) return this.voiceBuffers.get(id) || null;
    try {
      const res = await fetch(url);
      if (!res.ok) { this.voiceBuffers.set(id, null); return null; }
      const buf = await this.ctx.decodeAudioData(await res.arrayBuffer());
      this.voiceBuffers.set(id, buf); return buf;
    } catch { this.voiceBuffers.set(id, null); return null; }
  }
  // Plays a voice clip as if from a wax cylinder (band-limited + crackle) or as a stolen voice (pos).
  playVoice(buf, { pos = null, old = true, gain = 1, rate = 1, occlusion = 1 } = {}) {
    if (!this.ready || !buf) return null;
    const ctx = this.ctx, src = ctx.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = old ? 350 : 120;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = old ? 3200 : 6000;
    const sh = ctx.createWaveShaper(); const curve = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; curve[i] = Math.tanh(x * (old ? 2.2 : 1.4)); } sh.curve = curve;
    const g = ctx.createGain(); g.gain.value = gain;
    const out = pos ? this.spatial(pos, { bus: this.sfx, reverb: 0.7, occlusion, refDistance: 2 }) : this.spatial(null, { bus: this.voice, reverb: 0.15 });
    src.connect(hp).connect(lp).connect(sh).connect(g).connect(out);
    src.start();
    if (old) this.s_crackle({ dur: buf.duration / rate, pos, gain: 0.12 });
    return src;
  }
}

export const audio = new AudioEngine();
