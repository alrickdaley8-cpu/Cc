// Pure-data collision footprints for props (local space, prop front = +z). Shared by the renderer
// (colliders) and the nav grid (tiles under large furniture are not walkable for the AI).
export function footprint(p) {
  const R = (w, d, cx = 0, cz = 0) => [{ cx, cz, w, d }];
  switch (p.t) {
    case 'table': return R(p.w, p.d);
    case 'chair': return p.fallen ? R(0.5, 0.9) : R(0.45, 0.45);
    case 'sofa': return R(2.0, 0.9);
    case 'armchair': return R(0.85, 0.85);
    case 'bed': return R(p.w, p.l);
    case 'childbed': return R(0.95, 1.7);
    case 'cot': return R(0.8, 1.9);
    case 'wardrobe': return p.kind === 'cabinet' ? R(1.0, 0.55) : p.kind === 'linen' ? R(0.9, 0.55) : R(1.1, 0.6);
    case 'locker': return R(0.65, 0.5);
    case 'bookshelf': case 'reelshelf': return R(p.w, 0.4);
    case 'shelf': return R(p.w, 0.5);
    case 'shelf_wood': return R(1.2, 0.35);
    case 'piano': return R(1.5, 0.65);
    case 'clock': return R(0.5, 0.4);
    case 'phonograph': return p.small ? [] : R(0.5, 0.5);
    case 'fireplace': return R(1.6, 0.45);
    case 'counter': return R(p.w, 0.6);
    case 'stove': return R(0.8, 0.65);
    case 'sink': return R(1.0, 0.6);
    case 'table_set': return R(1.4, 0.8);
    case 'console': return R(1.0, 0.35);
    case 'sideboard': return R(1.6, 0.5);
    case 'desk': return R(1.4, 0.7);
    case 'nightstand': return R(0.45, 0.4);
    case 'dresser': return R(1.2, 0.5);
    case 'toychest': return R(0.9, 0.5);
    case 'rockinghorse': return R(0.4, 1.0);
    case 'tent': return R(1.3, 1.3);
    case 'cello': return R(0.45, 0.4);
    case 'radio_broken': return R(0.6, 0.35);
    case 'tub': return R(1.7, 0.8);
    case 'basin': return R(0.5, 0.45);
    case 'mattress_wall': return R(0.9, 0.25);
    case 'crate': return p.y ? [] : R(0.8 * (p.s || 1), 0.8 * (p.s || 1));
    case 'barrel': return R(0.6, 0.6);
    case 'boiler': return R(1.2, 1.2);
    case 'generator': return R(1.6, 0.9);
    case 'labbench': return R(p.w, 0.75);
    case 'reel_deck': return R(0.9, 0.6);
    case 'tape_vault': return R(0.9, 0.7);
    case 'headphone_chair': return R(0.5, 0.5);
    case 'chamber_speaker': return R(0.7, 0.5);
    case 'boxes': return R(0.9, 0.7);
    case 'bench': return R(1.2, 0.4);
    case 'coatrack': return R(0.35, 0.35);
    case 'umbrella': return R(0.3, 0.3);
    case 'fuelcan': return R(0.3, 0.25);
    default: return [];
  }
}

// World-space AABBs {x0,z0,x1,z1} after rotation by p.r degrees around (p.x,p.z).
export function worldRects(p) {
  const a = ((p.r || 0) * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return footprint(p).map((f) => {
    let x0 = Infinity, z0 = Infinity, x1 = -Infinity, z1 = -Infinity;
    for (const [ox, oz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      const lx = f.cx + (ox * f.w) / 2, lz = f.cz + (oz * f.d) / 2;
      // three.js Y rotation: x' = x cos + z sin, z' = -x sin + z cos
      const wx = p.x + lx * c + lz * s, wz = p.z - lx * s + lz * c;
      x0 = Math.min(x0, wx); x1 = Math.max(x1, wx); z0 = Math.min(z0, wz); z1 = Math.max(z1, wz);
    }
    return { x0, z0, x1, z1, floor: p.floor };
  });
}
