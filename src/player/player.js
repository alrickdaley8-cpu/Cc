// First-person controller: movement, collision, stairs, crouch/run/stamina, head-bob, footsteps
// that emit noise, the hand-crank dynamo torch, hiding and held breath.
import * as THREE from 'three';
import { clamp, damp, lerp } from '../core/rng.js';
import { settings } from '../core/settings.js';
import { bus } from '../core/events.js';

export const NOISE = {
  stepCrouch: 1.2, stepWalk: 4.0, stepRun: 9.5,
  creakCrouch: 4.5, creakWalk: 7.5, creakRun: 11,
  puddle: 3, crank: 6.5, gasp: 7, exhausted: 3.5,
};
const RADIUS = 0.27;

export class Player {
  constructor(game) {
    this.game = game;
    this.world = game.world;
    this.camera = game.camera;
    this.floor = 1; this.x = 0; this.z = 0; this.y = 0;
    this.yaw = 0; this.pitch = 0;
    this.vx = 0; this.vz = 0;
    this.eye = 1.62; this.crouching = false; this.running = false;
    this.stamina = 1; this.exhausted = false;
    this.stepAcc = 0; this.bobPhase = 0; this.bobAmt = 0;
    this.hidden = null; this.hideT = 0;
    this.breathHeld = false; this.breath = 1; // 1 = full lungs
    this.moving = 0; this.speed = 0;
    this.frozen = false; // cutscenes
    this.lookOverride = null; // {yaw,pitch,t}
    this.ySmooth = 0;
    // torch
    this.torchOn = true; this.battery = 1; this.cranking = false; this.crankAcc = 0;
    this.flicker = 0; this.torchIntensity = 0;
    this.spot = new THREE.SpotLight(0xffe6c0, 0, 16, 0.42, 0.55, 1.6);
    this.spot.castShadow = true;
    this.spot.shadow.mapSize.set(1024, 1024);
    this.spot.shadow.camera.near = 0.15; this.spot.shadow.camera.far = 14;
    this.spot.shadow.bias = -0.0006; this.spot.shadow.normalBias = 0.02;
    this.spotTarget = new THREE.Object3D();
    this.spot.target = this.spotTarget;
    this.fill = new THREE.PointLight(0xffd8a8, 0, 3.2, 2); // bounce light from the beam
    this.beamYaw = 0; this.beamPitch = 0;
    game.scene.add(this.spot, this.spotTarget, this.fill);
    this.noiseLevel = 0; // recent self-noise for UI/music feedback (0..1)
  }

  place(f, x, z, yaw = 0, pitch = 0) {
    this.floor = f; this.x = x; this.z = z; this.yaw = yaw; this.pitch = pitch;
    const h = this.world.resolveHeight(f, x, z); this.y = h.y; this.ySmooth = h.y; this.floor = h.floor;
    this.beamYaw = yaw; this.beamPitch = pitch; this.vx = this.vz = 0;
  }

  emitNoise(loud, kind) {
    bus.emit('noise', { f: this.floor, x: this.x, z: this.z, loud, kind, src: 'player' });
    this.noiseLevel = Math.max(this.noiseLevel, clamp(loud / 10, 0, 1));
  }

  update(dt, input) {
    const g = this.game;
    // ---------- look ----------
    const [mdx, mdy] = input.consumeMouse();
    if (!this.frozen) {
      const sens = 0.0022 * settings.sensitivity;
      this.yaw -= mdx * sens;
      this.pitch -= mdy * sens * (settings.invertY ? -1 : 1);
      this.pitch = clamp(this.pitch, -1.45, 1.45);
      if (input.isDown('ArrowLeft')) this.yaw += 2.2 * dt;
      if (input.isDown('ArrowRight')) this.yaw -= 2.2 * dt;
    }
    if (this.lookOverride) {
      const lo = this.lookOverride;
      lo.t += dt;
      const k = 1 - Math.exp(-lo.speed * dt);
      let dy = lo.yaw - this.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      this.yaw += dy * k; this.pitch += (lo.pitch - this.pitch) * k;
      if (lo.t > lo.dur) this.lookOverride = null;
    }

    if (this.hidden) { this.updateHidden(dt, input); this.updateTorch(dt, input); this.updateCamera(dt); return; }

    // ---------- move ----------
    let ix = 0, iz = 0;
    if (!this.frozen) {
      if (input.isDown('KeyW') || input.isDown('ArrowUp')) iz -= 1;
      if (input.isDown('KeyS') || input.isDown('ArrowDown')) iz += 1;
      if (input.isDown('KeyA')) ix -= 1;
      if (input.isDown('KeyD')) ix += 1;
      const crouchKey = input.wasPressed('KeyC') || input.wasPressed('ControlLeft');
      if (settings.crouchToggle) { if (crouchKey) this.crouching = !this.crouching; }
      else this.crouching = input.isDown('KeyC') || input.isDown('ControlLeft');
    }
    const len = Math.hypot(ix, iz);
    if (len > 0) { ix /= len; iz /= len; }
    const wantRun = !this.frozen && (input.isDown('ShiftLeft') || input.isDown('ShiftRight')) && iz < 0 && !this.exhausted;
    if (wantRun && this.crouching && len > 0) this.crouching = false;
    this.running = wantRun && len > 0;
    const maxSpeed = this.crouching ? 1.15 : this.running ? 4.1 : 2.15;
    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    const wx = ix * cos + iz * sin, wz = -ix * sin + iz * cos;
    const accel = len > 0 ? 12 : 10;
    this.vx = damp(this.vx, wx * maxSpeed, accel, dt);
    this.vz = damp(this.vz, wz * maxSpeed, accel, dt);
    this.speed = Math.hypot(this.vx, this.vz);

    // stamina
    if (this.running) { this.stamina -= dt / 6.0; if (this.stamina <= 0) { this.stamina = 0; this.exhausted = true; bus.emit('sfx', { name: 'gaspExhausted' }); } }
    else { this.stamina = Math.min(1, this.stamina + dt / (this.exhausted ? 7 : 4.5)); if (this.exhausted && this.stamina > 0.45) this.exhausted = false; }
    if (this.exhausted) { this.exhaustT = (this.exhaustT || 0) + dt; if (this.exhaustT > 1.4) { this.exhaustT = 0; this.emitNoise(NOISE.exhausted, 'breath'); } }

    const prevX = this.x, prevZ = this.z;
    this.moveCollide(this.vx * dt, this.vz * dt);
    const moved = Math.hypot(this.x - prevX, this.z - prevZ);
    const h = this.world.resolveHeight(this.floor, this.x, this.z);
    if (h.floor !== this.floor) { this.floor = h.floor; bus.emit('floorChanged', this.floor); }
    this.y = h.y;
    this.ySmooth = damp(this.ySmooth, this.y, 18, dt);

    // footsteps
    const stride = this.crouching ? 0.6 : this.running ? 1.0 : 0.78;
    this.stepAcc += moved;
    if (this.stepAcc > stride) { this.stepAcc = 0; this.footstep(); }
    this.moving = damp(this.moving, moved / dt / 2.2, 8, dt);
    this.bobPhase += moved * (this.running ? 4.2 : 5.2);
    this.eye = damp(this.eye, this.crouching ? 1.0 : 1.62, 10, dt);

    this.noiseLevel = Math.max(0, this.noiseLevel - dt * 0.6);
    this.updateTorch(dt, input);
    this.updateCamera(dt);
  }

  footstep() {
    const w = this.world;
    const creak = w.isCreaky(this.floor, this.x, this.z);
    const puddle = w.isPuddle(this.floor, this.x, this.z);
    const room = w.roomAtPos(this.floor, this.x, this.z);
    const onStair = !!w.stairAt(this.x, this.z, this.floor);
    let surface = onStair ? 'wood' : room ? room.floorMat : 'wood';
    let loud = this.crouching ? NOISE.stepCrouch : this.running ? NOISE.stepRun : NOISE.stepWalk;
    if (creak) loud = Math.max(loud, this.crouching ? NOISE.creakCrouch : this.running ? NOISE.creakRun : NOISE.creakWalk);
    if (puddle) loud += NOISE.puddle;
    if (surface === 'grate') loud += 1.5;
    bus.emit('footstep', { surface, creak, puddle, run: this.running, crouch: this.crouching, x: this.x, y: this.y, z: this.z, player: true });
    this.emitNoise(loud, creak ? 'creak' : 'step');
  }

  // Circle-vs-AABB collision against wall tiles, closed doors and prop footprints.
  moveCollide(dx, dz) {
    const steps = Math.ceil(Math.hypot(dx, dz) / 0.2) || 1;
    for (let s = 0; s < steps; s++) {
      this.x += dx / steps; this.resolve();
      this.z += dz / steps; this.resolve();
    }
  }
  resolve() {
    const w = this.world, f = this.floor;
    for (let it = 0; it < 3; it++) {
      let pushed = false;
      const x0 = Math.floor(this.x - RADIUS - 1), x1 = Math.floor(this.x + RADIUS + 1);
      const z0 = Math.floor(this.z - RADIUS - 1), z1 = Math.floor(this.z + RADIUS + 1);
      for (let tz = z0; tz <= z1; tz++) for (let tx = x0; tx <= x1; tx++) {
        if (!w.blocksMove(f, tx, tz)) continue;
        // while on stairs, the other floor's map may also be relevant: only block if solid on the floor we resolve as
        if (this.pushOut(tx, tz, tx + 1, tz + 1)) pushed = true;
      }
      for (const r of w.propRects[f]) {
        if (r.x1 < this.x - 1.5 || r.x0 > this.x + 1.5 || r.z1 < this.z - 1.5 || r.z0 > this.z + 1.5) continue;
        if (this.pushOut(r.x0, r.z0, r.x1, r.z1)) pushed = true;
      }
      if (!pushed) break;
    }
  }
  pushOut(ax0, az0, ax1, az1) {
    const cx = clamp(this.x, ax0, ax1), cz = clamp(this.z, az0, az1);
    let dx = this.x - cx, dz = this.z - cz;
    const d2 = dx * dx + dz * dz;
    if (d2 >= RADIUS * RADIUS) return false;
    if (d2 < 1e-8) { // centre inside box: push along smallest axis
      const l = this.x - ax0, r = ax1 - this.x, t = this.z - az0, b = az1 - this.z;
      const m = Math.min(l, r, t, b);
      if (m === l) this.x = ax0 - RADIUS; else if (m === r) this.x = ax1 + RADIUS; else if (m === t) this.z = az0 - RADIUS; else this.z = az1 + RADIUS;
      return true;
    }
    const d = Math.sqrt(d2), k = (RADIUS - d) / d;
    this.x += dx * k; this.z += dz * k;
    return true;
  }

  // ---------- hiding ----------
  enterHide(spot) {
    this.hidden = spot; this.hideT = 0; this.crouching = false;
    this.preHide = { x: this.x, z: this.z };
    this.x = spot.hidePos.x; this.z = spot.hidePos.z;
    this.yaw = spot.facing; this.pitch = -0.05;
    this.vx = this.vz = 0;
  }
  exitHide() {
    const s = this.hidden; if (!s) return;
    this.hidden = null; this.breathHeld = false;
    this.x = s.exitPos.x; this.z = s.exitPos.z;
    this.resolve();
  }
  updateHidden(dt, input) {
    this.hideT += dt;
    // limited look inside the wardrobe
    let dy = this.yaw - this.hidden.facing; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    this.yaw = this.hidden.facing + clamp(dy, -0.5, 0.5);
    this.pitch = clamp(this.pitch, -0.5, 0.35);
    this.eye = damp(this.eye, 1.5, 6, dt);
    const hold = input.isDown('Space');
    if (hold && this.breath > 0 && !this.gasping) {
      this.breathHeld = true; this.breath -= dt / 9.0;
      if (this.breath <= 0) { this.breath = 0; this.breathHeld = false; this.gasping = true; this.emitNoise(NOISE.gasp, 'gasp'); bus.emit('sfx', { name: 'gasp' }); }
    } else {
      if (this.breathHeld) bus.emit('sfx', { name: 'exhale' });
      this.breathHeld = false; this.breath = Math.min(1, this.breath + dt / 5.0);
      if (this.gasping && this.breath > 0.35) this.gasping = false;
    }
    this.breathEmitT = (this.breathEmitT || 0) + dt;
    if (!this.breathHeld && this.breathEmitT > 2.2) {
      this.breathEmitT = 0;
      // quiet breathing: only audible at very close range
      bus.emit('noise', { f: this.floor, x: this.x, z: this.z, loud: this.gasping ? 2.2 : 1.1, kind: 'breath', src: 'player' });
    }
  }

  // ---------- torch ----------
  updateTorch(dt, input) {
    const g = this.game;
    if (!this.frozen && input.wasPressed('KeyF')) { this.torchOn = !this.torchOn; bus.emit('sfx', { name: 'torchClick' }); }
    this.cranking = !this.frozen && input.isDown('KeyR') && !this.hidden;
    if (this.cranking) {
      this.battery = Math.min(1, this.battery + dt / 3.5);
      this.crankAcc += dt;
      if (this.crankAcc > 0.5) { this.crankAcc = 0; this.emitNoise(NOISE.crank, 'crank'); }
    }
    if (this.torchOn) this.battery = Math.max(0, this.battery - dt / (g.difficulty.batterySeconds));
    // flicker when low, or when the Listener is close (its hum couples into the dynamo)
    const near = g.listenerProximity || 0;
    let flick = 1;
    if (this.battery < 0.2) flick *= 0.55 + 0.45 * (Math.sin(g.time * 37) * Math.sin(g.time * 13.3) > -0.3 ? 1 : 0.15);
    if (near > 0.35) flick *= Math.random() < near * 0.25 ? 0.15 + Math.random() * 0.5 : 1;
    if (g.forceFlicker > 0) flick *= Math.random() < 0.5 ? 0.05 : 1;
    const level = this.torchOn ? (0.25 + 0.75 * clamp(this.battery * 4, 0, 1)) : 0;
    const target = level * flick * (this.cranking ? 1.08 : 1);
    this.torchIntensity = damp(this.torchIntensity, target, 30, dt);
    this.spot.intensity = this.torchIntensity * 34;
    this.fill.intensity = this.torchIntensity * 0.7;
  }

  updateCamera(dt) {
    const cam = this.camera;
    let bob = 0, sway = 0;
    if (settings.headBob && !this.hidden) {
      const amt = clamp(this.moving, 0, 1.6) * (this.crouching ? 0.5 : 1);
      this.bobAmt = damp(this.bobAmt, amt, 6, dt);
      bob = Math.sin(this.bobPhase * 2) * 0.035 * this.bobAmt;
      sway = Math.cos(this.bobPhase) * 0.02 * this.bobAmt;
    }
    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    cam.position.set(this.x + cos * sway, this.ySmooth + this.eye + bob, this.z - sin * sway);
    cam.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
    // torch lags slightly behind the view — feels hand-held
    const k = 1 - Math.exp(-14 * dt);
    let dy = this.yaw - this.beamYaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    this.beamYaw += dy * k; this.beamPitch = lerp(this.beamPitch, this.pitch, k);
    const off = new THREE.Vector3(0.16, -0.22, -0.05).applyEuler(cam.rotation);
    this.spot.position.copy(cam.position).add(off);
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.beamPitch, this.beamYaw, 0, 'YXZ'));
    this.spotTarget.position.copy(this.spot.position).addScaledVector(dir, 5);
    this.spotTarget.updateMatrixWorld();
    // bounce fill sits ~1.2m along the beam (or at the wall it hits)
    const hit = this.world.raycast(this.floor, this.spot.position.x, this.spot.position.z, dir.x, dir.z, 3.5);
    this.fill.position.copy(this.spot.position).addScaledVector(dir, Math.max(0.3, Math.min(hit - 0.5, 3.0)));
    this.fill.position.y = Math.min(this.fill.position.y, this.ySmooth + 1.2);
  }

  forward() { return new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ')); }
}
