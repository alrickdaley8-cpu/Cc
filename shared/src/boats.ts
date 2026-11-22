import type { BoatKind } from './types.js';

export interface BoatDef {
  kind: BoatKind;
  name: string;
  description: string;
  maxHp: number;
  costs: { itemId: string; count: number }[];
  requiresWorkbench?: boolean;
  paddleSpeed: number; // m/s (works into headwind)
  halfSailSpeed: number; // m/s
  fullSailSpeed: number; // m/s (with favorable wind)
  reverseSpeed: number; // m/s
  turnRate: number; // rad/s
  length: number;
  beam: number;
  cargoSlots: number;
  ramDamage: number;
  cameraDist: number;
  cameraHeight: number;
  helmOffsetZ: number; // local Z behind center where pilot stands (positive = stern)
  deckY: number;
  maxCrew: number; // total players including pilot
  passengerOffsets: [number, number][]; // [localX, localZ] seats for crew passengers
}

export const BOATS: Record<BoatKind, BoatDef> = {
  raft: {
    kind: 'raft',
    name: 'Timber Raft',
    description: 'Hand-lashed cedar raft with patchwork sail. Carries 2 survivors for coastal crossings.',
    maxHp: 320,
    costs: [
      { itemId: 'wood', count: 16 },
      { itemId: 'fiber', count: 6 },
      { itemId: 'resin', count: 2 },
    ],
    paddleSpeed: 2.8,
    halfSailSpeed: 4.3,
    fullSailSpeed: 5.8,
    reverseSpeed: 1.8,
    turnRate: 1.55,
    length: 3.8,
    beam: 2.5,
    cargoSlots: 0,
    ramDamage: 18,
    cameraDist: 7.4,
    cameraHeight: 3.1,
    helmOffsetZ: 1.05,
    deckY: 0.28,
    maxCrew: 2,
    passengerOffsets: [[0, -0.75]],
  },
  skiff: {
    kind: 'skiff',
    name: 'Outrigger Skiff',
    description: 'Agile copper-bound sailboat with brass lantern, 6-slot hold & 3-player crew seating.',
    maxHp: 580,
    costs: [
      { itemId: 'wood', count: 24 },
      { itemId: 'hide', count: 5 },
      { itemId: 'copper_ingot', count: 4 },
      { itemId: 'resin', count: 4 },
    ],
    requiresWorkbench: true,
    paddleSpeed: 3.8,
    halfSailSpeed: 6.4,
    fullSailSpeed: 9.0,
    reverseSpeed: 2.4,
    turnRate: 1.82,
    length: 5.6,
    beam: 2.4,
    cargoSlots: 6,
    ramDamage: 32,
    cameraDist: 9.2,
    cameraHeight: 3.8,
    helmOffsetZ: 1.55,
    deckY: 0.42,
    maxCrew: 3,
    passengerOffsets: [
      [-0.55, -0.6],
      [0.55, -0.6],
    ],
  },
  longship: {
    kind: 'longship',
    name: 'Dragon Longship',
    description: 'Ironbound Viking warship with dragon prow, shields, 12-slot hold & 6-player warband crew!',
    maxHp: 1150,
    costs: [
      { itemId: 'wood', count: 36 },
      { itemId: 'iron_ingot', count: 8 },
      { itemId: 'hide', count: 8 },
      { itemId: 'resin', count: 5 },
    ],
    requiresWorkbench: true,
    paddleSpeed: 4.5,
    halfSailSpeed: 8.6,
    fullSailSpeed: 12.6,
    reverseSpeed: 2.8,
    turnRate: 1.28,
    length: 8.8,
    beam: 3.1,
    cargoSlots: 12,
    ramDamage: 56,
    cameraDist: 12.2,
    cameraHeight: 4.9,
    helmOffsetZ: 2.55,
    deckY: 0.56,
    maxCrew: 6,
    passengerOffsets: [
      [-0.85, 0.75],
      [0.85, 0.75],
      [-0.85, -0.85],
      [0.85, -0.85],
      [0, -2.35],
    ],
  },
};

/**
 * Computes wind sail efficiency (0.28 headwind .. 1.15 beam/quartering tailwind)
 * based on boat heading (yaw) and global wind vector.
 */
export function computeWindSailEfficiency(
  boatYaw: number,
  windDirX: number,
  windDirZ: number
): number {
  const fwdX = -Math.sin(boatYaw);
  const fwdZ = -Math.cos(boatYaw);
  const wLen = Math.hypot(windDirX, windDirZ) || 1;
  const dot = (fwdX * windDirX + fwdZ * windDirZ) / wLen; // +1 = pure tailwind, -1 = pure headwind
  if (dot >= -0.15) {
    // Broad reach / crosswind / tailwind all feel rewarding & fast!
    return 0.78 + (dot + 0.15) * 0.32;
  }
  // Headwind dramatically reduces sail drive (encourage paddling or tacking!)
  return Math.max(0.24, 0.78 + (dot + 0.15) * 0.65);
}
