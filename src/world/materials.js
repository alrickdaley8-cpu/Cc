// Material library. Surfaces use MeshStandardMaterial with vertex-colour ambient occlusion
// and their own albedo as a bump map, which gives cheap relief under the moving torch.
import * as THREE from 'three';
import * as T from './textures.js';

const mats = new Map();

function std(map, opts = {}) {
  const m = new THREE.MeshStandardMaterial({
    map, bumpMap: opts.bump === false ? null : map, bumpScale: opts.bumpScale ?? 1.2,
    roughness: opts.roughness ?? 0.85, metalness: opts.metalness ?? 0, vertexColors: opts.vc ?? true,
    color: opts.color ?? 0xffffff, side: opts.side ?? THREE.FrontSide,
    transparent: !!opts.transparent, alphaTest: opts.alphaTest ?? 0,
    emissive: opts.emissive ?? 0x000000, emissiveMap: opts.emissiveMap ?? null, emissiveIntensity: opts.emissiveIntensity ?? 1,
    depthWrite: opts.depthWrite ?? true,
  });
  if (opts.polygonOffset) { m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -2; }
  return m;
}

const BUILDERS = {
  paper_red: () => std(T.wallpaper('paper_red')),
  paper_green: () => std(T.wallpaper('paper_green')),
  paper_blue: () => std(T.wallpaper('paper_blue')),
  paper_ochre: () => std(T.wallpaper('paper_ochre')),
  paper_grey: () => std(T.wallpaper('paper_grey')),
  paper_nursery: () => std(T.nurseryPaper()),
  plaster: () => std(T.plaster(false)),
  plaster_grey: () => std(T.plaster(false, true)),
  plaster_stain: () => std(T.plaster(true)),
  tile_white: () => std(T.tiles(false), { roughness: 0.45 }),
  tile_check: () => std(T.tiles(true), { roughness: 0.5 }),
  brick: () => std(T.brick(), { bumpScale: 2.5 }),
  concrete: () => std(T.concrete(false), { roughness: 0.95 }),
  stone: () => std(T.concrete(true), { roughness: 0.9, bumpScale: 2 }),
  foam: () => std(T.foam(), { roughness: 1, bumpScale: 4 }),
  grate: () => std(T.grate(), { roughness: 0.6, metalness: 0.4 }),
  wood: () => std(T.wood(false), { roughness: 0.7 }),
  wood_dark: () => std(T.wood(true), { roughness: 0.65 }),
  wood_panel: () => std(T.woodPanel(), { roughness: 0.6 }),
  trim: () => std(T.wood(true), { roughness: 0.55, color: 0x8a7a6a }),
  // prop materials (no vertex colours)
  p_wood: () => std(T.wood(true), { vc: false, roughness: 0.6 }),
  p_wood_light: () => std(T.wood(false), { vc: false, roughness: 0.65 }),
  p_fabric_dark: () => std(T.fabric('#1d1a1a'), { vc: false, roughness: 1, bumpScale: 0.6 }),
  p_fabric_red: () => std(T.fabric('#4a1b1b', 102), { vc: false, roughness: 1 }),
  p_fabric_green: () => std(T.fabric('#24301f', 103), { vc: false, roughness: 1 }),
  p_fabric_blanket: () => std(T.fabric('#3a3022', 104), { vc: false, roughness: 1, side: THREE.DoubleSide }),
  p_mattress: () => std(T.fabric('#8a8268', 105), { vc: false, roughness: 1, bumpScale: 2 }),
  p_sheet: () => std(T.fabric('#a39d8c', 106), { vc: false, roughness: 1, side: THREE.DoubleSide }),
  p_metal: () => std(null, { vc: false, roughness: 0.45, metalness: 0.8, color: 0x3a3a38, bump: false }),
  p_metal_dark: () => std(null, { vc: false, roughness: 0.6, metalness: 0.6, color: 0x1c1c1c, bump: false }),
  p_metal_green: () => std(null, { vc: false, roughness: 0.6, metalness: 0.35, color: 0x2c3a2c, bump: false }),
  p_brass: () => std(T.brass(), { vc: false, roughness: 0.35, metalness: 0.85, bumpScale: 0.6 }),
  p_porcelain: () => std(null, { vc: false, roughness: 0.25, color: 0xb9b3a4, bump: false }),
  p_black: () => std(null, { vc: false, roughness: 0.9, color: 0x050505, bump: false }),
  p_glass: () => new THREE.MeshStandardMaterial({ color: 0x223322, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.6 }),
  p_paper: () => std(T.paper(1), { vc: false, roughness: 0.95, bump: false, side: THREE.DoubleSide }),
  p_books: () => std(T.bookSpines(), { vc: false, roughness: 0.8 }),
  p_stone: () => std(T.concrete(true), { vc: false, roughness: 0.9 }),
  p_brick: () => std(T.brick(), { vc: false }),
  p_foam: () => std(T.foam(), { vc: false, roughness: 1 }),
  p_ivory: () => std(null, { vc: false, roughness: 0.4, color: 0xc8bfa8, bump: false }),
  p_wax: () => std(null, { vc: false, roughness: 0.35, color: 0x3b2a17, bump: false }),
  p_candle: () => std(null, { vc: false, roughness: 0.7, color: 0xd8ccb0, bump: false }),
  p_toy_red: () => std(null, { vc: false, roughness: 0.6, color: 0x6a1a14, bump: false }),
  p_toy_blue: () => std(null, { vc: false, roughness: 0.6, color: 0x1a2a4a, bump: false }),
  p_toy_yellow: () => std(null, { vc: false, roughness: 0.6, color: 0x8a6a1a, bump: false }),
  p_rope: () => std(T.fabric('#5a4a30', 107), { vc: false, roughness: 1 }),
};

export function getMat(key) {
  if (!mats.has(key)) {
    const b = BUILDERS[key];
    if (!b) throw new Error('unknown material ' + key);
    mats.set(key, b());
  }
  return mats.get(key);
}

export function decalMat(tex, opts = {}) {
  return new THREE.MeshStandardMaterial({
    map: tex, transparent: true, alphaTest: opts.alphaTest ?? 0.05, roughness: 0.9, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, side: THREE.FrontSide,
    emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 0,
  });
}
