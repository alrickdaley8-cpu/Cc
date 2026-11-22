import type { BiomeType, WorldTimeState } from '@wildreach/shared';

/**
 * Full procedural Web Audio API sound engine — zero external audio files required.
 * Synthesizes layered ocean surf, breeze, birdsong, night crickets, campfire crackle,
 * rain & thunder, surface footsteps, tool chops, mining clinks, combat & UI foley.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private windGain: GainNode | null = null;
  private oceanGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private fireGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private birdTimer = 2.5;
  private cricketTimer = 0.6;
  private muted = false;
  private volume = 0.55;

  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      return;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(this.ctx.destination);

    // Pre-generate 3 seconds of warm pink-ish noise
    const len = this.ctx.sampleRate * 3;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.950 * b2 + white * 0.048;
      data[i] = (b0 + b1 + b2 + white * 0.06) * 1.8;
    }

    this.windGain = this.createAmbientLoop('bandpass', 420, 0.8, 0.04);
    this.oceanGain = this.createAmbientLoop('lowpass', 320, 0.5, 0.02);
    this.rainGain = this.createAmbientLoop('bandpass', 1650, 0.5, 0.0);
    this.fireGain = this.createAmbientLoop('bandpass', 920, 1.4, 0.0);
  }

  private createAmbientLoop(
    filterType: BiquadFilterType,
    freq: number,
    q: number,
    initialGain: number
  ): GainNode | null {
    if (!this.ctx || !this.master || !this.noiseBuffer) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;

    const gain = this.ctx.createGain();
    gain.gain.value = initialGain;

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start();
    return gain;
  }

  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  updateAmbient(
    dt: number,
    time: WorldTimeState,
    biome: BiomeType,
    nearFireDist: number,
    distFromCoast: number
  ): void {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;

    if (this.windGain) {
      const windLevel = 0.035 + time.windSpeed * 0.032;
      this.windGain.gain.setTargetAtTime(windLevel, t, 0.35);
    }
    if (this.oceanGain) {
      const wavePulse = 0.72 + Math.sin(t * 0.55) * 0.28;
      const coastal = Math.max(0.015, (1 - Math.min(1, distFromCoast / 75)) * 0.14) * wavePulse;
      this.oceanGain.gain.setTargetAtTime(coastal, t, 0.25);
    }
    if (this.rainGain) {
      const rLevel =
        time.weather === 'storm' ? 0.18 * time.weatherIntensity : time.weather === 'rain' ? 0.11 * time.weatherIntensity : 0;
      this.rainGain.gain.setTargetAtTime(rLevel, t, 0.4);
    }
    if (this.fireGain) {
      const fLevel = nearFireDist < 12 ? (1 - nearFireDist / 12) * 0.11 : 0;
      this.fireGain.gain.setTargetAtTime(fLevel, t, 0.2);
    }

    const isNight = time.timeOfDay < 0.23 || time.timeOfDay > 0.78;
    const isStorm = time.weather === 'storm' || time.weather === 'rain';

    // Daytime birdsong in meadows/forests
    if (!isNight && !isStorm && (biome === 'meadow' || biome === 'pine' || biome === 'marsh')) {
      this.birdTimer -= dt;
      if (this.birdTimer <= 0) {
        this.birdTimer = 3.5 + Math.random() * 6.5;
        this.playBirdChirp();
      }
    }

    // Night crickets
    if (isNight && !isStorm) {
      this.cricketTimer -= dt;
      if (this.cricketTimer <= 0) {
        this.cricketTimer = 1.6 + Math.random() * 2.5;
        this.playCricket();
      }
    }
  }

  private playBirdChirp(): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    const base = 2200 + Math.random() * 1400;
    osc.frequency.setValueAtTime(base, t);
    osc.frequency.exponentialRampToValueAtTime(base * 1.35, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(base * 0.9, t + 0.17);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.032, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.19);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  private playCricket(): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const st = t + i * 0.075;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 4150 + (i % 2) * 120;
      g.gain.setValueAtTime(0.0001, st);
      g.gain.linearRampToValueAtTime(0.014, st + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, st + 0.055);
      osc.connect(g);
      g.connect(this.master);
      osc.start(st);
      osc.stop(st + 0.06);
    }
  }

  playFootstep(surface: 'grass' | 'sand' | 'stone' | 'water'): void {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value =
      surface === 'stone' ? 1150 : surface === 'water' ? 680 : surface === 'sand' ? 920 : 520;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(surface === 'water' ? 0.09 : 0.055, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + (surface === 'water' ? 0.18 : 0.09));
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t, Math.random() * 1.5, 0.2);
  }

  playSfx(
    kind: 'chop' | 'mine' | 'hit' | 'arrow' | 'build' | 'eat' | 'drink' | 'thunder' | 'levelup' | 'ui'
  ): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;

    if (kind === 'chop') {
      this.tone('triangle', 155, 62, 0.12, 0.22);
      this.noiseBurst(750, 0.09, 0.14);
    } else if (kind === 'mine') {
      this.tone('sine', 1480, 920, 0.18, 0.15);
      this.tone('triangle', 620, 310, 0.11, 0.12);
      this.noiseBurst(2200, 0.08, 0.12);
    } else if (kind === 'hit') {
      this.tone('sawtooth', 190, 55, 0.14, 0.22);
      this.noiseBurst(450, 0.1, 0.16);
    } else if (kind === 'arrow') {
      this.tone('triangle', 520, 180, 0.15, 0.16);
      this.noiseBurst(1600, 0.14, 0.1);
    } else if (kind === 'build') {
      this.tone('triangle', 260, 140, 0.1, 0.18);
      setTimeout(() => this.tone('sine', 520, 380, 0.12, 0.12), 70);
    } else if (kind === 'eat') {
      this.noiseBurst(1100, 0.07, 0.12);
      setTimeout(() => this.noiseBurst(950, 0.07, 0.11), 95);
    } else if (kind === 'drink') {
      this.tone('sine', 380, 620, 0.12, 0.12);
      setTimeout(() => this.tone('sine', 420, 690, 0.12, 0.11), 130);
    } else if (kind === 'thunder') {
      this.noiseBurst(95, 2.2, 0.45);
      this.tone('sawtooth', 62, 28, 1.4, 0.18);
    } else if (kind === 'levelup') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((n, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = n;
        const st = t + idx * 0.09;
        g.gain.setValueAtTime(0.001, st);
        g.gain.linearRampToValueAtTime(0.14, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.45);
        osc.connect(g);
        g.connect(this.master!);
        osc.start(st);
        osc.stop(st + 0.46);
      });
    } else if (kind === 'ui') {
      this.tone('sine', 680, 820, 0.045, 0.07);
    }
  }

  private tone(type: OscillatorType, startHz: number, endHz: number, dur: number, vol: number): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startHz, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endHz), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private noiseBurst(freq: number, dur: number, vol: number): void {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(t, Math.random() * 1.0, dur + 0.05);
  }
}
