/**
 * Timestamped Entity Snapshot Interpolation Buffer
 * Smooths 20Hz server/P2P updates to silky 60-144 FPS motion with bounded extrapolation.
 */
export interface PoseSample {
  t: number; // local performance.now() timestamp (ms)
  x: number;
  y: number;
  z: number;
  yaw: number;
}

function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

export class InterpolationBuffer {
  private samples: PoseSample[] = [];
  private maxSamples = 12;
  private delayMs: number;
  private maxExtrapolateMs: number;

  constructor(delayMs = 95, maxExtrapolateMs = 160) {
    this.delayMs = delayMs;
    this.maxExtrapolateMs = maxExtrapolateMs;
  }

  push(x: number, y: number, z: number, yaw: number, nowMs = performance.now()): void {
    const last = this.samples[this.samples.length - 1];
    if (last) {
      // Teleport / respawn guard: clear history on huge jumps (>14m)
      if (Math.hypot(x - last.x, z - last.z) > 14) {
        this.samples = [{ t: nowMs, x, y, z, yaw }];
        return;
      }
      // Deduplicate same-millisecond pushes
      if (nowMs <= last.t) {
        last.x = x;
        last.y = y;
        last.z = z;
        last.yaw = yaw;
        return;
      }
    }
    this.samples.push({ t: nowMs, x, y, z, yaw });
    if (this.samples.length > this.maxSamples) {
      this.samples.shift();
    }
  }

  sample(nowMs = performance.now()): { x: number; y: number; z: number; yaw: number } | null {
    const n = this.samples.length;
    if (n === 0) return null;
    if (n === 1) return this.samples[0];

    const renderTime = nowMs - this.delayMs;

    // Older than oldest sample
    if (renderTime <= this.samples[0].t) {
      return this.samples[0];
    }

    // Interpolate between bracketing samples
    for (let i = 0; i < n - 1; i++) {
      const a = this.samples[i];
      const b = this.samples[i + 1];
      if (renderTime >= a.t && renderTime <= b.t) {
        const span = Math.max(1, b.t - a.t);
        const f = Math.max(0, Math.min(1, (renderTime - a.t) / span));
        return {
          x: a.x + (b.x - a.x) * f,
          y: a.y + (b.y - a.y) * f,
          z: a.z + (b.z - a.z) * f,
          yaw: lerpAngle(a.yaw, b.yaw, f),
        };
      }
    }

    // Bounded velocity extrapolation when a packet is briefly delayed
    const a = this.samples[n - 2];
    const b = this.samples[n - 1];
    const span = Math.max(16, b.t - a.t);
    const extraMs = Math.min(this.maxExtrapolateMs, Math.max(0, renderTime - b.t));
    const ratio = extraMs / span;
    return {
      x: b.x + (b.x - a.x) * ratio,
      y: b.y + (b.y - a.y) * ratio,
      z: b.z + (b.z - a.z) * ratio,
      yaw: b.yaw,
    };
  }
}
