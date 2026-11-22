import { WATER_LEVEL } from './worldGen.js';

/**
 * Shared ocean wave model evaluated identically by:
 * 1) GPU WaterMesh GLSL vertex shader
 * 2) CPU 4-probe boat buoyancy solver (bow, stern, port, starboard)
 * 3) Fishing bobber & floating debris height sampling
 */
export interface WaveTrain {
  dirX: number;
  dirZ: number;
  freq: number;
  speed: number;
  amp: number;
}

export const OCEAN_WAVES: readonly WaveTrain[] = [
  { dirX: 0.86, dirZ: 0.51, freq: 0.145, speed: 1.45, amp: 0.16 },
  { dirX: -0.42, dirZ: 0.91, freq: 0.195, speed: 1.25, amp: 0.12 },
  { dirX: 0.71, dirZ: -0.70, freq: 0.31, speed: 2.05, amp: 0.055 },
  { dirX: -0.92, dirZ: -0.39, freq: 0.44, speed: 2.55, amp: 0.03 },
];

export function sampleOceanWaveHeight(
  x: number,
  z: number,
  timeSec: number,
  windSpeed = 1.0,
  terrainHeight = -4.0
): number {
  const depth = Math.max(0, WATER_LEVEL - terrainHeight);
  // Smooth coastal damping so waves flatten naturally right on the beach
  const damp = Math.min(1, Math.max(0, depth / 2.2));
  const t = timeSec * (0.82 + windSpeed * 0.34);
  const ampScale = (0.78 + windSpeed * 0.32) * damp;

  let y = 0;
  for (let i = 0; i < OCEAN_WAVES.length; i++) {
    const w = OCEAN_WAVES[i];
    const phase = (x * w.dirX + z * w.dirZ) * w.freq + t * w.speed;
    y += Math.sin(phase) * w.amp;
  }
  return WATER_LEVEL + y * ampScale;
}

/**
 * Computes 4-probe boat buoyancy (heave, pitch, roll) directly from the shared wave field.
 */
export function sampleBoatBuoyancy(
  x: number,
  z: number,
  yaw: number,
  halfLength: number,
  halfBeam: number,
  timeSec: number,
  windSpeed: number,
  getTerrainHeight: (wx: number, wz: number) => number
): { heave: number; pitch: number; roll: number } {
  const fx = -Math.sin(yaw);
  const fz = -Math.cos(yaw);
  const rx = Math.cos(yaw);
  const rz = -Math.sin(yaw);

  const bowX = x + fx * halfLength;
  const bowZ = z + fz * halfLength;
  const sternX = x - fx * halfLength;
  const sternZ = z - fz * halfLength;
  const portX = x - rx * halfBeam;
  const portZ = z - rz * halfBeam;
  const stbdX = x + rx * halfBeam;
  const stbdZ = z + rz * halfBeam;

  const hBow = sampleOceanWaveHeight(bowX, bowZ, timeSec, windSpeed, getTerrainHeight(bowX, bowZ));
  const hStern = sampleOceanWaveHeight(sternX, sternZ, timeSec, windSpeed, getTerrainHeight(sternX, sternZ));
  const hPort = sampleOceanWaveHeight(portX, portZ, timeSec, windSpeed, getTerrainHeight(portX, portZ));
  const hStbd = sampleOceanWaveHeight(stbdX, stbdZ, timeSec, windSpeed, getTerrainHeight(stbdX, stbdZ));

  const heave = (hBow + hStern + hPort + hStbd) * 0.25;
  const pitch = Math.atan2(hBow - hStern, Math.max(1, halfLength * 2));
  const roll = Math.atan2(hPort - hStbd, Math.max(1, halfBeam * 2));
  return { heave, pitch, roll };
}
