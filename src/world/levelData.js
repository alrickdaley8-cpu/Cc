// ---------------------------------------------------------------------------
// MARLOWE HOUSE — level data.
// Coordinates are in tiles (1 tile = 1 metre). Tile (x,z) spans [x,x+1) x [z,z+1).
// Rooms are interior rectangles; everything not carved is solid wall.
// Prop rotation r (degrees): 0 = prop front faces +z (south), 90 = faces +x (east),
// 180 = faces -z (north), -90 = faces -x (west).
// ---------------------------------------------------------------------------

export const TILE = 1;
export const MAP_W = 30;
export const MAP_H = 26;

export const FLOORS = [
  { id: 0, name: 'Cellar', y: -3.6, ceiling: 2.5 },
  { id: 1, name: 'Ground Floor', y: 0, ceiling: 3.0 },
  { id: 2, name: 'Upper Floor', y: 3.6, ceiling: 2.9 },
];

// Room style keys map to procedural materials in materials.js
export const ROOMS = [
  // ---------------- GROUND FLOOR (1) ----------------
  { id: 'foyer', floor: 1, name: 'Foyer', x: 12, z: 18, w: 7, h: 6, wall: 'paper_red', floorMat: 'wood_dark', ceil: 'plaster', wainscot: true, reverb: 0.5 },
  { id: 'hall', floor: 1, name: 'Hall', x: 14, z: 10, w: 3, h: 7, wall: 'paper_red', floorMat: 'wood_dark', ceil: 'plaster', wainscot: true, reverb: 0.45 },
  { id: 'parlor', floor: 1, name: 'Parlour', x: 3, z: 18, w: 8, h: 6, wall: 'paper_green', floorMat: 'wood', ceil: 'plaster', wainscot: true, reverb: 0.35 },
  { id: 'dining', floor: 1, name: 'Dining Room', x: 3, z: 10, w: 10, h: 7, wall: 'paper_ochre', floorMat: 'wood', ceil: 'plaster_stain', wainscot: true, reverb: 0.4 },
  { id: 'kitchen', floor: 1, name: 'Kitchen', x: 3, z: 1, w: 7, h: 8, wall: 'tile_white', floorMat: 'tile_check', ceil: 'plaster_stain', reverb: 0.55 },
  { id: 'landing', floor: 1, name: 'Cellar Landing', x: 11, z: 1, w: 2, h: 2, wall: 'plaster', floorMat: 'wood', ceil: 'plaster', reverb: 0.3 },
  { id: 'study', floor: 1, name: 'Study', x: 18, z: 10, w: 8, h: 7, wall: 'wood_panel', floorMat: 'wood_dark', ceil: 'plaster', reverb: 0.25 },
  { id: 'library', floor: 1, name: 'Library', x: 18, z: 1, w: 9, h: 8, wall: 'paper_green', floorMat: 'wood_dark', ceil: 'plaster', wainscot: true, reverb: 0.2 },
  { id: 'music', floor: 1, name: 'Music Room', x: 20, z: 18, w: 8, h: 6, wall: 'paper_blue', floorMat: 'wood', ceil: 'plaster', wainscot: true, reverb: 0.5 },

  // ---------------- UPPER FLOOR (2) ----------------
  { id: 'gallery', floor: 2, name: 'Gallery', x: 4, z: 2, w: 23, h: 2, wall: 'paper_grey', floorMat: 'wood', ceil: 'plaster_stain', wainscot: true, reverb: 0.5 },
  { id: 'master', floor: 2, name: 'Master Bedroom', x: 4, z: 5, w: 8, h: 7, wall: 'paper_blue', floorMat: 'wood', ceil: 'plaster', reverb: 0.25 },
  { id: 'nursery', floor: 2, name: 'Nursery', x: 18, z: 5, w: 8, h: 7, wall: 'paper_nursery', floorMat: 'wood', ceil: 'plaster', reverb: 0.25 },
  { id: 'bath', floor: 2, name: 'Bathroom', x: 4, z: 13, w: 6, h: 5, wall: 'tile_white', floorMat: 'tile_check', ceil: 'plaster_stain', reverb: 0.7 },
  { id: 'southhall', floor: 2, name: 'South Corridor', x: 11, z: 13, w: 15, h: 2, wall: 'paper_grey', floorMat: 'wood', ceil: 'plaster_stain', wainscot: true, reverb: 0.5 },
  { id: 'ada', floor: 2, name: "Ada's Room", x: 12, z: 16, w: 6, h: 5, wall: 'plaster', floorMat: 'wood_dark', ceil: 'plaster', reverb: 0.2 },
  { id: 'guest', floor: 2, name: 'Guest Room', x: 19, z: 16, w: 7, h: 5, wall: 'paper_ochre', floorMat: 'wood', ceil: 'plaster', reverb: 0.3 },

  // ---------------- CELLAR (0) ----------------
  { id: 'storage', floor: 0, name: 'Cellar Storage', x: 6, z: 8, w: 12, h: 6, wall: 'brick', floorMat: 'concrete', ceil: 'concrete', reverb: 0.75 },
  { id: 'passage', floor: 0, name: 'Service Passage', x: 3, z: 9, w: 2, h: 12, wall: 'brick', floorMat: 'stone', ceil: 'concrete', reverb: 0.8 },
  { id: 'lab', floor: 0, name: 'Laboratory', x: 6, z: 15, w: 12, h: 7, wall: 'plaster_grey', floorMat: 'concrete', ceil: 'concrete', reverb: 0.6 },
  { id: 'generator', floor: 0, name: 'Generator Room', x: 19, z: 8, w: 6, h: 6, wall: 'brick', floorMat: 'concrete', ceil: 'concrete', reverb: 0.8 },
  { id: 'chamber', floor: 0, name: 'The Quiet Room', x: 19, z: 15, w: 6, h: 7, wall: 'foam', floorMat: 'grate', ceil: 'foam', reverb: 0.0, silent: true },
];

// kind: door | arch | vault | front.  locked: key item id (or 'never' for scripted doors)
export const DOORS = [
  // ground
  { id: 'front_door', floor: 1, x: 15, z: 24, kind: 'front', locked: 'never' },
  { id: 'arch_hall_1', floor: 1, x: 14, z: 17, kind: 'arch' },
  { id: 'arch_hall_2', floor: 1, x: 15, z: 17, kind: 'arch' },
  { id: 'arch_hall_3', floor: 1, x: 16, z: 17, kind: 'arch' },
  { id: 'd_parlor', floor: 1, x: 11, z: 20, kind: 'door', open: 0.35 },
  { id: 'd_dining_hall', floor: 1, x: 13, z: 13, kind: 'door' },
  { id: 'd_dining_parlor', floor: 1, x: 6, z: 17, kind: 'door', open: 1 },
  { id: 'd_kitchen', floor: 1, x: 6, z: 9, kind: 'door' },
  { id: 'cellar_door', floor: 1, x: 10, z: 2, kind: 'door', locked: 'cellar_key' },
  { id: 'study_door', floor: 1, x: 17, z: 12, kind: 'door', locked: 'study_key' },
  { id: 'd_library', floor: 1, x: 22, z: 9, kind: 'door' },
  { id: 'd_music', floor: 1, x: 19, z: 20, kind: 'door', open: 0.15 },
  // upper
  { id: 'd_master', floor: 2, x: 7, z: 4, kind: 'door' },
  { id: 'd_nursery', floor: 2, x: 21, z: 4, kind: 'door' },
  { id: 'd_bath_master', floor: 2, x: 7, z: 12, kind: 'door', open: 1 },
  { id: 'd_bath_hall', floor: 2, x: 10, z: 14, kind: 'door' },
  { id: 'd_nursery_hall', floor: 2, x: 21, z: 12, kind: 'door' },
  { id: 'd_ada', floor: 2, x: 14, z: 15, kind: 'door' },
  { id: 'd_guest', floor: 2, x: 22, z: 15, kind: 'door', open: 0.5 },
  // cellar
  { id: 'd_pass_n', floor: 0, x: 5, z: 10, kind: 'door', open: 1 },
  { id: 'd_pass_s', floor: 0, x: 5, z: 18, kind: 'door' },
  { id: 'd_lab', floor: 0, x: 10, z: 14, kind: 'door' },
  { id: 'd_gen', floor: 0, x: 18, z: 10, kind: 'door' },
  { id: 'chamber_door', floor: 0, x: 18, z: 18, kind: 'vault', open: 1 },
];

// Stairwells. Tiles [x,x+w) x [z,z+h). Along `axis`, y goes from the low floor at lowEdge to the high floor at highEdge.
export const STAIRS = [
  { id: 'main_stairs', low: 1, high: 2, x: 14, z: 4, w: 2, h: 6, axis: 'z', lowEdge: 10, highEdge: 4, walls: { 1: 'paper_red', 2: 'paper_grey' } },
  { id: 'cellar_stairs', low: 0, high: 1, x: 11, z: 3, w: 2, h: 5, axis: 'z', lowEdge: 8, highEdge: 3, walls: { 0: 'brick', 1: 'plaster' } },
];

// face = which side of the walkable tile the window is on. covered = blanket nailed over it.
export const WINDOWS = [
  { floor: 1, x: 5, z: 1, face: 'N' }, { floor: 1, x: 8, z: 1, face: 'N' },
  { floor: 1, x: 3, z: 12, face: 'W' }, { floor: 1, x: 3, z: 14, face: 'W' },
  { floor: 1, x: 3, z: 20, face: 'W' }, { floor: 1, x: 3, z: 22, face: 'W', covered: true },
  { floor: 1, x: 6, z: 23, face: 'S' }, { floor: 1, x: 9, z: 23, face: 'S' },
  { floor: 1, x: 13, z: 23, face: 'S' }, { floor: 1, x: 17, z: 23, face: 'S' },
  { floor: 1, x: 22, z: 23, face: 'S' }, { floor: 1, x: 25, z: 23, face: 'S' },
  { floor: 1, x: 27, z: 20, face: 'E' }, { floor: 1, x: 27, z: 22, face: 'E', covered: true },
  { floor: 1, x: 25, z: 12, face: 'E' }, { floor: 1, x: 25, z: 14, face: 'E' },
  { floor: 1, x: 20, z: 1, face: 'N' }, { floor: 1, x: 24, z: 1, face: 'N' },
  { floor: 1, x: 26, z: 3, face: 'E' }, { floor: 1, x: 26, z: 6, face: 'E' },

  { floor: 2, x: 6, z: 2, face: 'N', covered: true }, { floor: 2, x: 10, z: 2, face: 'N', covered: true },
  { floor: 2, x: 19, z: 2, face: 'N', covered: true }, { floor: 2, x: 24, z: 2, face: 'N' },
  { floor: 2, x: 4, z: 2, face: 'W' }, { floor: 2, x: 26, z: 3, face: 'E', covered: true },
  { floor: 2, x: 4, z: 7, face: 'W', covered: true }, { floor: 2, x: 4, z: 9, face: 'W' },
  { floor: 2, x: 25, z: 7, face: 'E', covered: true }, { floor: 2, x: 25, z: 9, face: 'E' },
  { floor: 2, x: 4, z: 15, face: 'W' },
  { floor: 2, x: 14, z: 20, face: 'S', covered: true },
  { floor: 2, x: 22, z: 20, face: 'S' }, { floor: 2, x: 25, z: 18, face: 'E', covered: true },
];

// Creaking floorboards. chalk = Clara marked it with a chalk cross.
export const CREAKS = [
  { floor: 1, x: 15, z: 12 }, { floor: 1, x: 14, z: 15 }, { floor: 1, x: 16, z: 14 }, { floor: 1, x: 15, z: 19, chalk: true },
  { floor: 1, x: 8, z: 13 }, { floor: 1, x: 6, z: 11 },
  { floor: 2, x: 8, z: 3, chalk: true }, { floor: 2, x: 9, z: 2, chalk: true }, { floor: 2, x: 12, z: 3, chalk: true },
  { floor: 2, x: 17, z: 2, chalk: true }, { floor: 2, x: 18, z: 3, chalk: true }, { floor: 2, x: 21, z: 3, chalk: true },
  { floor: 2, x: 23, z: 2, chalk: true }, { floor: 2, x: 13, z: 13, chalk: true }, { floor: 2, x: 15, z: 14, chalk: true },
  { floor: 2, x: 17, z: 13, chalk: true }, { floor: 2, x: 19, z: 14, chalk: true }, { floor: 2, x: 22, z: 13, chalk: true },
  { floor: 2, x: 24, z: 14, chalk: true }, { floor: 2, x: 20, z: 8, chalk: true }, { floor: 2, x: 6, z: 8 },
];
// Puddles in the cellar: splash when stepped in.
export const PUDDLES = [
  { floor: 0, x: 3, z: 13 }, { floor: 0, x: 4, z: 14 }, { floor: 0, x: 3, z: 16 }, { floor: 0, x: 9, z: 11 }, { floor: 0, x: 14, z: 12 },
];

// ---------------------------------------------------------------------------
// PROPS — positions in tile units (floats). Interactive props carry an `id`.
// ---------------------------------------------------------------------------
export const PROPS = [
  // ===== FOYER =====
  { t: 'rug', floor: 1, x: 15.5, z: 20.5, w: 3, d: 4, pattern: 0 },
  { t: 'coatrack', floor: 1, x: 12.5, z: 23.3, coats: ['long', 'small'] },
  { t: 'umbrella', floor: 1, x: 18.4, z: 23.4 },
  { t: 'console', floor: 1, x: 18.75, z: 22.2, r: -90 },
  { t: 'note', floor: 1, x: 18.75, z: 22.0, y: 0.86, id: 'note_executor' },
  { t: 'mirror', floor: 1, x: 12.08, z: 20.5, r: 90, covered: true },
  { t: 'bench', floor: 1, x: 12.5, z: 21.8, r: 90 },
  { t: 'portrait', floor: 1, x: 15.5, z: 18.03, r: 0, y: 1.7, img: 'family' },
  { t: 'mattress_wall', floor: 1, x: 18.85, z: 18.9, r: -90 },

  // ===== HALL =====
  { t: 'clock', floor: 1, x: 16.62, z: 14.5, r: -90, id: 'clock' },
  { t: 'runner', floor: 1, x: 15, z: 13.5, w: 1.6, d: 6.2 },
  { t: 'portrait', floor: 1, x: 14.03, z: 11.5, r: 90, y: 1.65, img: 'ada' },
  { t: 'portrait', floor: 1, x: 14.03, z: 15.0, r: 90, y: 1.65, img: 'landscape' },
  { t: 'decal_text', floor: 1, x: 16.97, z: 11.0, r: -90, y: 1.3, text: 'hush', size: 0.5 },

  // ===== PARLOUR =====
  { t: 'rug', floor: 1, x: 7, z: 20.8, w: 4, d: 3, pattern: 1 },
  { t: 'fireplace', floor: 1, x: 3.35, z: 20.8, r: 90 },
  { t: 'sofa', floor: 1, x: 8.6, z: 20.8, r: -90 },
  { t: 'armchair', floor: 1, x: 6.2, z: 19.1, r: 160 },
  { t: 'armchair', floor: 1, x: 6.2, z: 22.6, r: 20 },
  { t: 'table', floor: 1, x: 6.9, z: 20.8, w: 0.9, d: 0.9, h: 0.45 },
  { t: 'radio_broken', floor: 1, x: 10.4, z: 22.9, r: -90 },
  { t: 'portrait', floor: 1, x: 7, z: 23.97, r: 180, y: 1.7, img: 'thomas_scratched' },
  { t: 'note', floor: 1, x: 6.9, z: 20.7, y: 0.47, id: 'note_clipping' },
  { t: 'bottle', floor: 1, x: 4.0, z: 18.5, id: 'bottle_parlor' },
  { t: 'mattress_wall', floor: 1, x: 10.85, z: 18.9, r: -90 },

  // ===== DINING =====
  { t: 'table', floor: 1, x: 8, z: 13.5, w: 4.2, d: 1.4, h: 0.78, cloth: true },
  { t: 'chair', floor: 1, x: 6.6, z: 12.4, r: 0 }, { t: 'chair', floor: 1, x: 8.0, z: 12.4, r: 0 }, { t: 'chair', floor: 1, x: 9.4, z: 12.4, r: 10 },
  { t: 'chair', floor: 1, x: 6.6, z: 14.6, r: 180 }, { t: 'chair', floor: 1, x: 8.0, z: 14.6, r: 170 }, { t: 'chair', floor: 1, x: 10.6, z: 15.7, r: 120, fallen: true },
  { t: 'candles', floor: 1, x: 7.4, z: 13.5, y: 0.8 }, { t: 'candles', floor: 1, x: 8.8, z: 13.4, y: 0.8 },
  { t: 'sideboard', floor: 1, x: 12.6, z: 11.0, r: -90 },
  { t: 'decal_text', floor: 1, x: 3.03, z: 13.0, r: 90, y: 1.6, text: 'QUIET', size: 0.9 },
  { t: 'note', floor: 1, x: 12.55, z: 11.0, y: 0.92, id: 'note_rules' },

  // ===== KITCHEN =====
  { t: 'counter', floor: 1, x: 3.4, z: 3.5, r: 90, w: 4 },
  { t: 'stove', floor: 1, x: 3.45, z: 6.3, r: 90 },
  { t: 'sink', floor: 1, x: 6.5, z: 1.4, r: 0 },
  { t: 'counter', floor: 1, x: 8.3, z: 1.4, r: 0, w: 2.2 },
  { t: 'table_set', floor: 1, x: 6.8, z: 5.2 },
  { t: 'lamp', floor: 1, x: 6.8, z: 5.0, y: 0.8, light: 'kitchen_lamp' },
  { t: 'note', floor: 1, x: 7.4, z: 5.6, y: 0.8, id: 'note_kettle' },
  { t: 'bottle', floor: 1, x: 8.6, z: 1.45, y: 0.92, id: 'bottle_kitchen1' },
  { t: 'bottle', floor: 1, x: 3.4, z: 2.4, y: 0.92, id: 'bottle_kitchen2' },
  { t: 'shelf_wood', floor: 1, x: 9.6, z: 7.0, r: -90 },

  // ===== STUDY =====
  { t: 'desk', floor: 1, x: 22, z: 15.2, r: 180 },
  { t: 'chair', floor: 1, x: 22, z: 14.4, r: 0 },
  { t: 'bookshelf', floor: 1, x: 18.3, z: 14.5, r: 90, w: 2.4 },
  { t: 'bookshelf', floor: 1, x: 25.7, z: 11.2, r: -90, w: 1.6 },
  { t: 'journal', floor: 1, x: 21.7, z: 15.3, y: 0.79, id: 'journal_ada' },
  { t: 'cylinder', floor: 1, x: 22.5, z: 15.4, y: 0.79, id: 'cyl_ada' },
  { t: 'blueprint', floor: 1, x: 22, z: 16.95, r: 180, y: 1.6 },
  { t: 'phonograph', floor: 1, x: 24.9, z: 16.3, r: -135 },
  { t: 'rug', floor: 1, x: 22, z: 13, w: 3, d: 2.4, pattern: 2 },

  // ===== LIBRARY =====
  { t: 'bookshelf', floor: 1, x: 18.3, z: 3.0, r: 90, w: 3.5 },
  { t: 'bookshelf', floor: 1, x: 22.0, z: 1.3, r: 0, w: 3.0 },
  { t: 'reelshelf', floor: 1, x: 26.7, z: 7.6, r: -90, w: 1.6 },
  { t: 'table', floor: 1, x: 22.5, z: 5.5, w: 2.2, d: 1.1, h: 0.76 },
  { t: 'chair', floor: 1, x: 22.5, z: 6.4, r: 180 },
  { t: 'note', floor: 1, x: 22.2, z: 5.4, y: 0.77, id: 'note_letter' },
  { t: 'bottle', floor: 1, x: 19.0, z: 7.6, id: 'bottle_library' },
  { t: 'boxes', floor: 1, x: 25.5, z: 2.0 },

  // ===== MUSIC ROOM =====
  { t: 'piano', floor: 1, x: 23.5, z: 23.4, r: 180 },
  { t: 'phonograph', floor: 1, x: 27.3, z: 18.6, r: -135 },
  { t: 'cello', floor: 1, x: 20.5, z: 18.6, r: 30 },
  { t: 'chair', floor: 1, x: 23.5, z: 22.4, r: 0 },
  { t: 'chair', floor: 1, x: 25.8, z: 20.2, r: -60 },
  { t: 'musicstand', floor: 1, x: 25.2, z: 21.0, r: -60 },
  { t: 'wardrobe', floor: 1, x: 20.7, z: 23.6, r: 180, id: 'hide_music', kind: 'cabinet' },
  { t: 'note', floor: 1, x: 23.2, z: 23.2, y: 1.32, id: 'note_horns' },
  { t: 'rug', floor: 1, x: 24, z: 20.5, w: 3, d: 2.5, pattern: 1 },

  // ===== GALLERY (upper) =====
  { t: 'runner', floor: 2, x: 15, z: 3, w: 21, d: 1.0 },
  { t: 'mattress_wall', floor: 2, x: 6.0, z: 2.08, r: 0 }, { t: 'mattress_wall', floor: 2, x: 11.5, z: 2.08, r: 0 },
  { t: 'mattress_wall', floor: 2, x: 20.5, z: 2.08, r: 0 }, { t: 'mattress_wall', floor: 2, x: 25.8, z: 3.92, r: 180 },
  { t: 'wardrobe', floor: 2, x: 12.4, z: 3.68, r: 180, id: 'hide_gallery' },
  { t: 'table', floor: 2, x: 17.4, z: 2.3, w: 0.6, d: 0.5, h: 0.8 },
  { t: 'decal_text', floor: 2, x: 4.03, z: 3.3, r: 90, y: 1.2, text: 'shh', size: 0.4 },

  // ===== MASTER BEDROOM =====
  { t: 'bed', floor: 2, x: 5.1, z: 7.8, r: 90, w: 1.6, l: 2.1 },
  { t: 'nightstand', floor: 2, x: 4.5, z: 6.4 }, { t: 'nightstand', floor: 2, x: 4.5, z: 9.3 },
  { t: 'cylinder', floor: 2, x: 4.5, z: 6.4, y: 0.62, id: 'cyl_thomas' },
  { t: 'wardrobe', floor: 2, x: 11.3, z: 6.0, r: -90, id: 'hide_master' },
  { t: 'dresser', floor: 2, x: 9.5, z: 11.6, r: 180 },
  { t: 'decal_text', floor: 2, x: 9.0, z: 5.03, r: 0, y: 1.5, text: 'IT IS NOT HIM\nDO NOT ANSWER', size: 0.42, color: '#5a0f0b' },
  { t: 'note', floor: 2, x: 9.5, z: 11.55, y: 0.92, id: 'note_master' },
  { t: 'mattress_wall', floor: 2, x: 11.85, z: 9.5, r: -90 },
  { t: 'rug', floor: 2, x: 8, z: 8, w: 3, d: 3, pattern: 2 },

  // ===== NURSERY =====
  { t: 'childbed', floor: 2, x: 25.1, z: 10.5, r: -90 },
  { t: 'toychest', floor: 2, x: 18.6, z: 10.6, r: 90 },
  { t: 'music_box', floor: 2, x: 18.6, z: 10.6, y: 0.5, id: 'music_box' },
  { t: 'tent', floor: 2, x: 21.2, z: 7.4 },
  { t: 'rockinghorse', floor: 2, x: 24.4, z: 6.0, r: -120 },
  { t: 'wardrobe', floor: 2, x: 18.4, z: 6.2, r: 90, id: 'hide_nursery' },
  { t: 'drawing', floor: 2, x: 22.0, z: 5.03, r: 0, y: 1.2, img: 'horn_man' },
  { t: 'drawing', floor: 2, x: 23.2, z: 5.03, r: 0, y: 1.35, img: 'family_draw' },
  { t: 'drawing', floor: 2, x: 25.97, z: 8.3, r: -90, y: 1.1, img: 'quiet_house' },
  { t: 'tally', floor: 2, x: 18.03, z: 8.8, r: 90, y: 1.0, count: 41 },
  { t: 'note', floor: 2, x: 21.3, z: 7.6, y: 0.03, id: 'note_clara' },
  { t: 'blocks', floor: 2, x: 22.6, z: 9.6 },

  // ===== BATH =====
  { t: 'tub', floor: 2, x: 5.0, z: 15.5, r: 90 },
  { t: 'basin', floor: 2, x: 9.5, z: 16.6, r: -90 },
  { t: 'mirror', floor: 2, x: 9.95, z: 16.6, r: -90, cracked: true },
  { t: 'bottle', floor: 2, x: 8.6, z: 17.5, id: 'bottle_bath' },

  // ===== SOUTH CORRIDOR =====
  { t: 'runner', floor: 2, x: 18.5, z: 14, w: 13, d: 1.0 },
  { t: 'mattress_wall', floor: 2, x: 16.5, z: 13.08, r: 0 },
  { t: 'wardrobe', floor: 2, x: 25.68, z: 13.5, r: -90, id: 'hide_southhall', kind: 'linen' },

  // ===== ADA'S ROOM =====
  { t: 'desk', floor: 2, x: 16.3, z: 16.4, r: 0 },
  { t: 'chair', floor: 2, x: 16.3, z: 17.3, r: 180 },
  { t: 'cot', floor: 2, x: 13.0, z: 19.4, r: 90 },
  { t: 'cylinder', floor: 2, x: 16.8, z: 16.3, y: 0.79, id: 'cyl_clara' },
  { t: 'phonograph', floor: 2, x: 15.8, z: 16.3, r: 0, y: 0.78, small: true },
  { t: 'pinned_notes', floor: 2, x: 17.97, z: 18.0, r: -90, y: 1.5 },
  { t: 'note', floor: 2, x: 16.6, z: 20.5, y: 0.02, id: 'note_ada_room' },
  { t: 'mattress_wall', floor: 2, x: 12.08, z: 17.5, r: 90 },

  // ===== GUEST ROOM =====
  { t: 'bed', floor: 2, x: 24.95, z: 17.5, r: -90, w: 1.2, l: 2.0, sheet: true },
  { t: 'wardrobe', floor: 2, x: 19.4, z: 19.6, r: 90, id: 'hide_guest' },
  { t: 'boxes', floor: 2, x: 20.0, z: 16.6 },
  { t: 'bottle', floor: 2, x: 25.2, z: 20.3, id: 'bottle_guest' },

  // ===== CELLAR STORAGE =====
  { t: 'shelf', floor: 0, x: 6.4, z: 12.0, r: 90, w: 2 },
  { t: 'shelf', floor: 0, x: 17.6, z: 12.4, r: -90, w: 2 },
  { t: 'crate', floor: 0, x: 14.5, z: 8.7 }, { t: 'crate', floor: 0, x: 15.5, z: 8.7 }, { t: 'crate', floor: 0, x: 15.0, z: 8.7, y: 0.8, s: 0.8 },
  { t: 'boiler', floor: 0, x: 7.3, z: 9.0 },
  { t: 'barrel', floor: 0, x: 16.8, z: 9.6 },
  { t: 'bottle', floor: 0, x: 13.0, z: 13.4, id: 'bottle_cellar1' },
  { t: 'bottle', floor: 0, x: 6.5, z: 12.9, y: 0.9, id: 'bottle_cellar2' },
  { t: 'bulb', floor: 0, x: 11.5, z: 10.5, light: 'bulb_storage' },
  { t: 'pipes', floor: 0, x: 11.5, z: 8.1, len: 11, r: 0 },
  { t: 'note', floor: 0, x: 14.5, z: 8.75, y: 0.82, id: 'note_storage' },

  // ===== PASSAGE =====
  { t: 'pipes', floor: 0, x: 3.1, z: 15, len: 12, r: 90 },
  { t: 'locker', floor: 0, x: 4.6, z: 20.68, r: 180, id: 'hide_passage' },

  // ===== GENERATOR ROOM =====
  { t: 'generator', floor: 0, x: 22.0, z: 11.5, id: 'generator' },
  { t: 'fuelcan', floor: 0, x: 19.6, z: 8.6 },
  { t: 'note', floor: 0, x: 23.8, z: 8.5, y: 0.02, id: 'note_generator' },
  { t: 'bulb', floor: 0, x: 21.5, z: 10.0, light: 'bulb_gen' },

  // ===== LAB =====
  { t: 'labbench', floor: 0, x: 8.5, z: 15.5, r: 0, w: 3 },
  { t: 'labbench', floor: 0, x: 14.5, z: 15.5, r: 0, w: 3 },
  { t: 'oscilloscope', floor: 0, x: 8.0, z: 15.4, y: 0.92 },
  { t: 'oscilloscope', floor: 0, x: 15.2, z: 15.4, y: 0.92 },
  { t: 'reel_deck', floor: 0, x: 17.55, z: 20.2, r: -90, id: 'reel_deck' },
  { t: 'tape_vault', floor: 0, x: 6.6, z: 21.0, r: 90, id: 'tape_vault' },
  { t: 'locker', floor: 0, x: 11.5, z: 21.68, r: 180, id: 'hide_lab' },
  { t: 'cables', floor: 0, x: 12, z: 18.5 },
  { t: 'journal', floor: 0, x: 14.0, z: 15.4, y: 0.92, id: 'journal_final' },
  { t: 'bulb', floor: 0, x: 11.5, z: 18.5, light: 'bulb_lab' },
  { t: 'decal_text', floor: 0, x: 17.97, z: 16.8, r: -90, y: 1.6, text: 'DO NOT OPEN\nWHILE RECORDING', size: 0.22, color: '#c9c2a8', plate: true },

  // ===== THE QUIET ROOM =====
  { t: 'headphone_chair', floor: 0, x: 22.0, z: 18.5, r: -90 },
  { t: 'chamber_speaker', floor: 0, x: 24.4, z: 18.5, r: -90, id: 'chamber_speaker' },
];

// Trigger volumes (tiles). Handled by game/scripts.js
export const TRIGGERS = [
  { id: 't_foyer', floor: 1, x: 13, z: 19, w: 5, h: 3 },
  { id: 't_dining', floor: 1, x: 4, z: 11, w: 8, h: 5 },
  { id: 't_kitchen', floor: 1, x: 3, z: 1, w: 7, h: 8 },
  { id: 't_gallery', floor: 2, x: 13, z: 2, w: 4, h: 2 },
  { id: 't_cellar_bottom', floor: 0, x: 10, z: 8, w: 4, h: 2 },
  { id: 't_lab', floor: 0, x: 6, z: 15, w: 12, h: 7 },
  { id: 't_nursery', floor: 2, x: 18, z: 5, w: 8, h: 7 },
  { id: 't_master', floor: 2, x: 4, z: 5, w: 8, h: 7 },
];

export const PLAYER_START = { floor: 1, x: 15.5, z: 22.6, yaw: 0 }; // yaw 0 = looking north (-z)
