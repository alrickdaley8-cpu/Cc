// Procedural prop library. Every prop is assembled from primitives in local space (front = +z),
// then placed. Non-interactive props are merged per floor per material (few draw calls).
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { getMat, decalMat } from './materials.js';
import * as T from './textures.js';
import { PROPS, WINDOWS, CREAKS, PUDDLES, FLOORS } from './levelData.js';
import { DOOR_H } from './levelBuilder.js';
import { Rng } from '../core/rng.js';

const M = (k) => getMat(k);
const rng = new Rng(1337);

// ---------- primitive helpers ----------
function box(g, mat, w, h, d, x, y, z, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof mat === 'string' ? M(mat) : mat);
  m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m;
}
function cyl(g, mat, rt, rb, h, x, y, z, seg = 10, rx = 0, ry = 0, rz = 0, open = false) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg, 1, open), typeof mat === 'string' ? M(mat) : mat);
  m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m;
}
function sph(g, mat, r, x, y, z, sx = 1, sy = 1, sz = 1, seg = 10) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg - 2)), typeof mat === 'string' ? M(mat) : mat);
  m.position.set(x, y, z); m.scale.set(sx, sy, sz); g.add(m); return m;
}
function plane(g, mat, w, h, x, y, z, ry = 0, rx = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z); m.rotation.set(rx, ry, 0, 'YXZ'); g.add(m); return m;
}
function legs(g, mat, w, d, h, t = 0.05, inset = 0.04) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(g, mat, t, h, t, sx * (w / 2 - inset), h / 2, sz * (d / 2 - inset));
}
function hinge(g, x, y, z) { const p = new THREE.Group(); p.position.set(x, y, z); g.add(p); return p; }

// ---------- prop builders: return { parts } ----------
const B = {
  table(g, p) {
    const w = p.w, d = p.d, h = p.h;
    box(g, 'p_wood', w, 0.05, d, 0, h - 0.025, 0); legs(g, 'p_wood', w, d, h - 0.05, 0.06, 0.08);
    if (p.cloth) {
      const cm = M('p_sheet');
      box(g, cm, w + 0.1, 0.01, d + 0.1, 0, h + 0.005, 0);
      plane(g, cm, w + 0.1, 0.35, 0, h - 0.17, d / 2 + 0.05, 0); plane(g, cm, w + 0.1, 0.35, 0, h - 0.17, -d / 2 - 0.05, Math.PI);
    }
  },
  chair(g, p) {
    const c = new THREE.Group(); g.add(c);
    box(c, 'p_wood', 0.44, 0.05, 0.44, 0, 0.45, 0); legs(c, 'p_wood', 0.44, 0.44, 0.43, 0.04);
    box(c, 'p_wood', 0.44, 0.5, 0.04, 0, 0.72, -0.2); box(c, 'p_fabric_red', 0.38, 0.03, 0.38, 0, 0.485, 0);
    if (p.fallen) { c.rotation.x = -Math.PI / 2; c.position.set(0, 0.22, 0.2); }
  },
  sofa(g) {
    box(g, 'p_fabric_green', 2.0, 0.42, 0.85, 0, 0.21, 0); box(g, 'p_fabric_green', 2.0, 0.5, 0.2, 0, 0.62, -0.33);
    box(g, 'p_fabric_green', 0.18, 0.25, 0.85, -0.91, 0.55, 0); box(g, 'p_fabric_green', 0.18, 0.25, 0.85, 0.91, 0.55, 0);
    box(g, 'p_fabric_green', 0.8, 0.12, 0.6, -0.42, 0.48, 0.08); box(g, 'p_fabric_green', 0.8, 0.12, 0.6, 0.42, 0.48, 0.06);
  },
  armchair(g) {
    box(g, 'p_fabric_red', 0.8, 0.4, 0.8, 0, 0.2, 0); box(g, 'p_fabric_red', 0.8, 0.6, 0.18, 0, 0.7, -0.31);
    box(g, 'p_fabric_red', 0.14, 0.24, 0.8, -0.33, 0.52, 0); box(g, 'p_fabric_red', 0.14, 0.24, 0.8, 0.33, 0.52, 0);
  },
  bed(g, p) {
    const w = p.w, l = p.l;
    box(g, 'p_wood', w, 0.25, l, 0, 0.25, 0); box(g, 'p_wood', w + 0.06, 1.1, 0.06, 0, 0.55, -l / 2);
    box(g, 'p_wood', w + 0.06, 0.6, 0.06, 0, 0.3, l / 2);
    box(g, 'p_mattress', w - 0.06, 0.18, l - 0.1, 0, 0.46, 0);
    if (!p.sheet) {
      box(g, 'p_sheet', w * 0.38, 0.1, 0.32, -w * 0.22, 0.6, -l / 2 + 0.25); box(g, 'p_sheet', w * 0.38, 0.1, 0.32, w * 0.22, 0.6, -l / 2 + 0.25);
      const bl = box(g, 'p_fabric_blanket', w, 0.06, l * 0.6, 0, 0.58, l * 0.15); bl.rotation.z = 0.02;
    } else {
      // dust sheet thrown over everything
      const sh = sph(g, 'p_sheet', 0.5, 0, 0.5, 0, w * 1.1, 0.45, l * 1.05, 12); sh.position.y = 0.48;
    }
  },
  childbed(g) {
    box(g, 'p_wood_light', 0.9, 0.2, 1.6, 0, 0.3, 0); box(g, 'p_mattress', 0.84, 0.14, 1.52, 0, 0.47, 0);
    box(g, 'p_wood_light', 0.95, 0.8, 0.05, 0, 0.4, -0.8);
    for (let i = -3; i <= 3; i++) box(g, 'p_wood_light', 0.03, 0.35, 0.03, 0.45, 0.65, i * 0.2);
    box(g, 'p_wood_light', 0.04, 0.04, 1.6, 0.45, 0.82, 0);
    box(g, 'p_fabric_red', 0.86, 0.05, 0.9, 0, 0.56, 0.3);
    // a small stuffed rabbit, face down
    sph(g, 'p_fabric_blanket', 0.09, -0.1, 0.62, -0.5, 1, 0.8, 1.3);
  },
  cot(g) {
    box(g, 'p_metal_green', 0.75, 0.04, 1.85, 0, 0.42, 0); legs(g, 'p_metal_green', 0.75, 1.85, 0.42, 0.03);
    box(g, 'p_fabric_blanket', 0.7, 0.06, 1.2, 0, 0.47, 0.25); box(g, 'p_sheet', 0.4, 0.08, 0.3, 0, 0.48, -0.7);
  },
  wardrobe(g, p) {
    const kind = p.kind;
    const w = kind === 'cabinet' ? 1.0 : kind === 'linen' ? 0.9 : 1.1, h = kind === 'cabinet' ? 1.8 : 2.0, d = kind === 'linen' || kind === 'cabinet' ? 0.55 : 0.6;
    const mat = 'p_wood';
    box(g, mat, w, h, 0.04, 0, h / 2, -d / 2 + 0.02); box(g, mat, 0.04, h, d, -w / 2 + 0.02, h / 2, 0); box(g, mat, 0.04, h, d, w / 2 - 0.02, h / 2, 0);
    box(g, mat, w, 0.05, d, 0, h - 0.025, 0); box(g, mat, w, 0.1, d, 0, 0.05, 0);
    box(g, mat, w + 0.08, 0.08, d + 0.06, 0, h + 0.04, 0);
    const leaves = [];
    for (const s of [-1, 1]) {
      const hp = hinge(g, s * (w / 2 - 0.02), 0, d / 2 - 0.01);
      const leaf = box(hp, mat, w / 2 - 0.03, h - 0.16, 0.03, -s * (w / 4 - 0.01), h / 2, 0);
      // slats so you can see out
      for (let i = 0; i < 5; i++) box(hp, 'p_black', w / 2 - 0.14, 0.025, 0.035, -s * (w / 4 - 0.01), h * 0.62 + i * 0.07, 0);
      cyl(hp, 'p_brass', 0.012, 0.012, 0.08, -s * (w / 2 - 0.09), h * 0.5, 0.03, 6);
      hp.userData.sign = s; leaves.push(hp);
    }
    // a coat hanging inside
    cyl(g, 'p_fabric_dark', 0.12, 0.22, 1.0, -0.15, h - 0.75, -0.05, 8);
    return { leaves, hide: new THREE.Vector3(0, 0, -0.02), exit: new THREE.Vector3(0, 0, d / 2 + 0.55) };
  },
  locker(g) {
    const w = 0.6, h = 1.9, d = 0.5;
    box(g, 'p_metal_green', w, h, 0.03, 0, h / 2, -d / 2); box(g, 'p_metal_green', 0.03, h, d, -w / 2, h / 2, 0); box(g, 'p_metal_green', 0.03, h, d, w / 2, h / 2, 0);
    box(g, 'p_metal_green', w, 0.03, d, 0, h, 0); box(g, 'p_metal_green', w, 0.05, d, 0, 0.025, 0);
    const hp = hinge(g, -w / 2, 0, d / 2);
    box(hp, 'p_metal_green', w, h - 0.04, 0.02, w / 2, h / 2, 0);
    for (let i = 0; i < 4; i++) box(hp, 'p_black', w * 0.6, 0.015, 0.025, w / 2, h * 0.78 + i * 0.04, 0);
    hp.userData.sign = -1;
    return { leaves: [hp], hide: new THREE.Vector3(0, 0, -0.02), exit: new THREE.Vector3(0, 0, d / 2 + 0.5) };
  },
  bookshelf(g, p) {
    const w = p.w, h = 2.2, d = 0.4;
    box(g, 'p_wood', w, h, 0.03, 0, h / 2, -d / 2); box(g, 'p_wood', 0.04, h, d, -w / 2, h / 2, 0); box(g, 'p_wood', 0.04, h, d, w / 2, h / 2, 0);
    for (let i = 0; i < 5; i++) {
      const y = 0.08 + i * 0.5; box(g, 'p_wood', w, 0.03, d, 0, y, 0);
      if (i < 4) { const bm = box(g, 'p_books', w - 0.1, 0.36, d - 0.1, rng.float(-0.05, 0.05), y + 0.2, 0); bm.scale.x = rng.float(0.6, 1); }
    }
  },
  reelshelf(g, p) {
    B.bookshelf(g, { w: p.w });
    for (let i = 0; i < 10; i++) cyl(g, 'p_metal_dark', 0.13, 0.13, 0.02, rng.float(-p.w / 2 + 0.2, p.w / 2 - 0.2), 0.1 + rng.int(0, 3) * 0.5 + 0.15, 0.05, 12, Math.PI / 2, 0, rng.float(-0.3, 0.3));
  },
  shelf(g, p) {
    const w = p.w, d = 0.5;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(g, 'p_metal_dark', 0.04, 1.8, 0.04, sx * (w / 2 - 0.02), 0.9, sz * (d / 2 - 0.02));
    for (let i = 0; i < 4; i++) {
      box(g, 'p_metal_dark', w, 0.02, d, 0, 0.15 + i * 0.5, 0);
      for (let j = 0; j < 3; j++) if (rng.chance(0.7)) {
        if (rng.chance(0.5)) cyl(g, 'p_glass', 0.06, 0.06, 0.2, rng.float(-w / 2 + 0.15, w / 2 - 0.15), 0.26 + i * 0.5, rng.float(-0.1, 0.1), 8);
        else box(g, 'p_wood_light', rng.float(0.2, 0.4), rng.float(0.15, 0.3), 0.3, rng.float(-w / 2 + 0.25, w / 2 - 0.25), 0.25 + i * 0.5, 0);
      }
    }
  },
  shelf_wood(g) {
    const w = 1.2, d = 0.35;
    box(g, 'p_wood', w, 1.8, 0.03, 0, 0.9, -d / 2); box(g, 'p_wood', 0.04, 1.8, d, -w / 2, 0.9, 0); box(g, 'p_wood', 0.04, 1.8, d, w / 2, 0.9, 0);
    for (let i = 0; i < 4; i++) {
      box(g, 'p_wood', w, 0.03, d, 0, 0.2 + i * 0.5, 0);
      for (let j = 0; j < 4; j++) if (rng.chance(0.6)) {
        if (rng.chance(0.5)) cyl(g, 'p_porcelain', 0.06, 0.05, 0.12, -0.45 + j * 0.3, 0.28 + i * 0.5, 0, 8);
        else cyl(g, 'p_glass', 0.04, 0.04, 0.22, -0.45 + j * 0.3, 0.33 + i * 0.5, 0, 8);
      }
    }
  },
  piano(g) {
    box(g, 'p_wood', 1.5, 1.25, 0.45, 0, 0.625, -0.1); box(g, 'p_wood', 1.5, 0.08, 0.3, 0, 0.72, 0.18);
    box(g, 'p_ivory', 1.3, 0.02, 0.14, 0, 0.77, 0.2);
    for (let i = 0; i < 36; i++) if (i % 7 !== 2 && i % 7 !== 6) box(g, 'p_black', 0.018, 0.02, 0.08, -0.62 + i * 0.036, 0.785, 0.17);
    box(g, 'p_wood', 0.08, 0.7, 0.45, -0.71, 0.35, 0.15); box(g, 'p_wood', 0.08, 0.7, 0.45, 0.71, 0.35, 0.15);
    // felt stuffed under the lid, nails
    box(g, 'p_fabric_red', 1.3, 0.06, 0.35, 0, 1.27, -0.1);
  },
  clock(g) {
    box(g, 'p_wood', 0.5, 2.1, 0.32, 0, 1.05, 0); box(g, 'p_wood', 0.58, 0.12, 0.38, 0, 2.15, 0);
    cyl(g, 'p_ivory', 0.17, 0.17, 0.02, 0, 1.78, 0.17, 20, Math.PI / 2);
    box(g, 'p_black', 0.012, 0.13, 0.01, 0, 1.82, 0.185, 0, 0, 0.6); box(g, 'p_black', 0.012, 0.09, 0.01, 0.02, 1.76, 0.186, 0, 0, -1.2);
    const hp = hinge(g, -0.2, 0, 0.165);
    box(hp, 'p_wood', 0.4, 1.15, 0.02, 0.2, 0.95, 0);
    box(hp, 'p_glass', 0.24, 0.7, 0.01, 0.2, 1.0, 0.012);
    hp.userData.sign = -1;
    // empty pendulum hook, and the study key hanging where the pendulum was
    const key = new THREE.Group(); g.add(key); key.position.set(0, 1.0, 0.05);
    box(key, 'p_brass', 0.02, 0.12, 0.005, 0, 0, 0); cyl(key, 'p_brass', 0.025, 0.025, 0.006, 0, 0.07, 0, 10, Math.PI / 2);
    return { door: hp, key };
  },
  phonograph(g, p) {
    if (!p.small) { box(g, 'p_wood', 0.5, 0.7, 0.5, 0, 0.35, 0); }
    const y0 = p.small ? 0 : 0.7;
    box(g, 'p_wood', 0.38, 0.16, 0.38, 0, y0 + 0.08, 0);
    cyl(g, 'p_black', 0.15, 0.15, 0.01, 0, y0 + 0.165, 0, 20);
    cyl(g, 'p_brass', 0.012, 0.012, 0.3, 0.12, y0 + 0.3, -0.1, 6, 0.4);
    // the horn has been removed — only a bare elbow remains
    cyl(g, 'p_brass', 0.02, 0.03, 0.1, 0.12, y0 + 0.45, -0.16, 8, 1.2);
    box(g, 'p_brass', 0.02, 0.02, 0.12, -0.2, y0 + 0.1, 0, 0, 0, 0);
  },
  fireplace(g) {
    box(g, 'p_stone', 1.6, 1.15, 0.4, 0, 0.575, 0); box(g, 'p_black', 0.9, 0.75, 0.05, 0, 0.375, 0.18);
    box(g, 'p_wood', 1.8, 0.08, 0.5, 0, 1.19, 0.03);
    // ashes and a burnt book
    box(g, 'p_black', 0.3, 0.05, 0.2, 0.1, 0.03, 0.15, 0, 0.4, 0);
    // two upturned photo frames on the mantel
    box(g, 'p_wood', 0.2, 0.02, 0.15, -0.5, 1.24, 0.05); box(g, 'p_wood', 0.15, 0.02, 0.12, 0.45, 1.24, 0.1);
  },
  counter(g, p) {
    box(g, 'p_wood_light', p.w, 0.86, 0.58, 0, 0.43, 0); box(g, 'p_stone', p.w + 0.02, 0.05, 0.62, 0, 0.885, 0.01);
    for (let i = 0; i < Math.floor(p.w / 0.6); i++) box(g, 'p_black', 0.012, 0.6, 0.01, -p.w / 2 + 0.6 * (i + 1), 0.45, 0.295);
  },
  stove(g) {
    box(g, 'p_metal_dark', 0.8, 0.85, 0.62, 0, 0.425, 0);
    for (const sx of [-0.18, 0.18]) cyl(g, 'p_black', 0.11, 0.11, 0.02, sx, 0.86, 0, 14);
    cyl(g, 'p_metal_dark', 0.06, 0.06, 2.0, 0, 1.85, -0.25, 8);
    box(g, 'p_metal', 0.5, 0.3, 0.02, 0, 0.45, 0.315);
  },
  sink(g) {
    B.counter(g, { w: 1.0 });
    box(g, 'p_porcelain', 0.6, 0.2, 0.45, 0, 0.82, 0.02);
    box(g, 'p_black', 0.5, 0.02, 0.36, 0, 0.92, 0.02);
    cyl(g, 'p_metal', 0.015, 0.015, 0.25, 0, 1.0, -0.22, 6);
    // plates stacked in the sink, wrapped in tea towels
    for (let i = 0; i < 4; i++) cyl(g, 'p_sheet', 0.12, 0.12, 0.02, 0.05, 0.86 + i * 0.03, 0.02, 12);
  },
  table_set(g) {
    B.table(g, { w: 1.4, d: 0.8, h: 0.76 });
    const places = [[-0.45, 0.2, 0], [0.45, 0.2, 0], [0, -0.25, Math.PI]];
    for (const [px, pz] of places) {
      cyl(g, 'p_porcelain', 0.12, 0.1, 0.02, px, 0.775, pz, 14);
      sph(g, 'p_stone', 0.07, px, 0.79, pz, 1, 0.3, 1); // something grey and furred on the plate
      box(g, 'p_sheet', 0.04, 0.025, 0.2, px + 0.17, 0.775, pz); // cutlery wrapped in cloth
    }
    const c1 = new THREE.Group(); c1.position.set(-0.45, 0, 0.62); c1.rotation.y = Math.PI; g.add(c1); B.chair(c1, {});
    const c2 = new THREE.Group(); c2.position.set(0.45, 0, 0.62); c2.rotation.y = Math.PI; g.add(c2); B.chair(c2, {});
    const c3 = new THREE.Group(); c3.position.set(0, 0, -0.62); g.add(c3); B.chair(c3, {});
    // a small chair has a cushion stack for a child
    box(c3, 'p_fabric_red', 0.36, 0.12, 0.36, 0, 0.54, 0);
  },
  lamp(g) {
    cyl(g, 'p_brass', 0.07, 0.09, 0.08, 0, 0.04, 0, 10);
    cyl(g, 'p_glass', 0.05, 0.06, 0.18, 0, 0.17, 0, 10);
    const flame = sph(g, new THREE.MeshBasicMaterial({ color: 0xffb060 }), 0.015, 0, 0.13, 0, 1, 2.2, 1, 6);
    return { flame };
  },
  mirror(g, p) {
    box(g, 'p_wood', 0.7, 1.1, 0.04, 0, 1.45, -0.01);
    const glass = new THREE.MeshStandardMaterial({ color: 0x223, roughness: 0.05, metalness: 0.9 });
    plane(g, glass, 0.6, 1.0, 0, 1.45, 0.012);
    if (p.covered) {
      const s = plane(g, M('p_sheet'), 0.85, 1.35, 0, 1.38, 0.05); s.rotation.x = -0.04;
    }
    if (p.cracked) { for (let i = 0; i < 5; i++) box(g, 'p_ivory', 0.005, rng.float(0.2, 0.5), 0.003, rng.float(-0.2, 0.2), 1.45 + rng.float(-0.2, 0.2), 0.015, 0, 0, rng.float(-1, 1)); }
  },
  coatrack(g, p) {
    cyl(g, 'p_wood', 0.025, 0.03, 1.8, 0, 0.9, 0, 8); cyl(g, 'p_wood', 0.2, 0.22, 0.04, 0, 0.02, 0, 10);
    cyl(g, 'p_fabric_dark', 0.08, 0.22, 1.15, 0.08, 1.15, 0.05, 8); // Thomas's long coat
    if (p.coats?.includes('small')) cyl(g, 'p_fabric_red', 0.05, 0.13, 0.6, -0.1, 1.35, 0.0, 8); // a child's red coat
  },
  umbrella(g) {
    cyl(g, 'p_brass', 0.12, 0.1, 0.5, 0, 0.25, 0, 10, 0, 0, 0, true);
    cyl(g, 'p_black', 0.01, 0.01, 0.9, 0.03, 0.55, 0, 5, 0.1, 0, 0.1); cyl(g, 'p_black', 0.012, 0.012, 0.85, -0.04, 0.52, 0.02, 5, -0.1, 0, -0.05);
  },
  console(g) { box(g, 'p_wood', 1.0, 0.04, 0.35, 0, 0.82, 0); legs(g, 'p_wood', 1.0, 0.35, 0.8, 0.04); box(g, 'p_wood', 0.95, 0.12, 0.3, 0, 0.74, 0); },
  sideboard(g) { box(g, 'p_wood', 1.6, 0.85, 0.5, 0, 0.425, 0); box(g, 'p_wood', 1.65, 0.04, 0.54, 0, 0.87, 0); for (let i = -1; i <= 1; i++) box(g, 'p_black', 0.01, 0.6, 0.01, i * 0.4, 0.45, 0.255); },
  desk(g) {
    box(g, 'p_wood', 1.4, 0.05, 0.7, 0, 0.75, 0); box(g, 'p_wood', 0.4, 0.72, 0.68, -0.5, 0.36, 0); box(g, 'p_wood', 0.4, 0.72, 0.68, 0.5, 0.36, 0);
    box(g, 'p_wood', 0.6, 0.6, 0.02, 0, 0.42, -0.33);
    // papers, an inkwell
    for (let i = 0; i < 4; i++) plane(g, M('p_paper'), 0.21, 0.29, rng.float(-0.4, 0.4), 0.777, rng.float(-0.15, 0.15), rng.float(-0.5, 0.5), -Math.PI / 2);
    cyl(g, 'p_glass', 0.03, 0.03, 0.05, 0.55, 0.8, -0.2, 8);
  },
  nightstand(g) { box(g, 'p_wood', 0.45, 0.6, 0.4, 0, 0.3, 0); box(g, 'p_black', 0.3, 0.01, 0.01, 0, 0.45, 0.2); },
  dresser(g) { box(g, 'p_wood', 1.2, 0.9, 0.5, 0, 0.45, 0); for (let i = 0; i < 3; i++) box(g, 'p_black', 1.1, 0.01, 0.01, 0, 0.25 + i * 0.25, 0.25); },
  toychest(g) { box(g, 'p_toy_blue', 0.9, 0.45, 0.5, 0, 0.225, 0); box(g, 'p_toy_yellow', 0.92, 0.05, 0.52, 0, 0.47, 0); },
  rockinghorse(g) {
    const rk = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.02, 6, 16, 1.4), M('p_wood_light')); rk.rotation.set(0, Math.PI / 2, Math.PI + 0.85); rk.position.set(0, 0.52, 0);
    const rk2 = rk.clone(); rk.position.x = 0.15; rk2.position.x = -0.15; g.add(rk, rk2);
    sph(g, 'p_wood_light', 0.15, 0, 0.45, 0, 0.9, 0.9, 2.0); sph(g, 'p_wood_light', 0.09, 0, 0.7, 0.3, 0.8, 1, 1.5);
    box(g, 'p_black', 0.03, 0.2, 0.2, 0, 0.72, 0.18);
  },
  tent(g) {
    // blanket fort draped over two chairs: a ridge tent
    const geo = new THREE.BufferGeometry();
    const w = 1.3, h = 0.95, l = 1.3;
    const v = new Float32Array([-w / 2, 0, -l / 2, 0, h, -l / 2, 0, h, l / 2, -w / 2, 0, -l / 2, 0, h, l / 2, -w / 2, 0, l / 2,
      w / 2, 0, -l / 2, w / 2, 0, l / 2, 0, h, l / 2, w / 2, 0, -l / 2, 0, h, l / 2, 0, h, -l / 2,
      -w / 2, 0, -l / 2, w / 2, 0, -l / 2, 0, h, -l / 2]);
    geo.setAttribute('position', new THREE.BufferAttribute(v, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(v.length / 3 * 2).map((_, i) => (v[Math.floor(i / 2) * 3 + (i % 2 ? 1 : 0)])), 2));
    geo.computeVertexNormals();
    g.add(new THREE.Mesh(geo, M('p_fabric_blanket')));
    box(g, 'p_sheet', 0.9, 0.04, 1.0, 0, 0.02, 0.05); // bedding inside
    cyl(g, 'p_metal', 0.03, 0.03, 0.14, 0.25, 0.07, -0.3, 8, Math.PI / 2, 0, 0.4); // a dead torch
  },
  blocks(g) { for (let i = 0; i < 7; i++) box(g, rng.pick(['p_toy_red', 'p_toy_blue', 'p_toy_yellow']), 0.08, 0.08, 0.08, rng.float(-0.3, 0.3), 0.04 + (i > 4 ? 0.08 : 0), rng.float(-0.3, 0.3), 0, rng.float(0, 3), 0); },
  cello(g) {
    const body = sph(g, 'p_wood_light', 0.2, 0, 0.5, 0, 1, 1.7, 0.45, 12); body.rotation.x = -0.25;
    box(g, 'p_black', 0.05, 0.7, 0.03, 0, 1.15, -0.15, -0.25);
  },
  musicstand(g) { cyl(g, 'p_metal_dark', 0.01, 0.01, 1.1, 0, 0.55, 0, 6); box(g, 'p_metal_dark', 0.45, 0.3, 0.01, 0, 1.15, 0.03, -0.4); plane(g, M('p_paper'), 0.2, 0.28, 0.08, 1.16, 0.045, 0, -0.4); },
  radio_broken(g) {
    box(g, 'p_wood', 0.6, 0.4, 0.3, 0, 0.2, 0); box(g, 'p_black', 0.38, 0.22, 0.02, 0, 0.22, 0.15);
    // smashed in: grille pushed through, valves on the floor
    for (let i = 0; i < 5; i++) cyl(g, 'p_glass', 0.02, 0.02, 0.07, rng.float(-0.3, 0.3), 0.02, rng.float(0.2, 0.5), 6, Math.PI / 2, rng.float(0, 3), 0);
  },
  tub(g) {
    const t = cyl(g, 'p_porcelain', 0.42, 0.38, 1.7, 0, 0.5, 0, 14, 0, 0, Math.PI / 2, true); t.scale.set(1, 1, 0.95);
    box(g, 'p_black', 1.55, 0.02, 0.62, 0, 0.82, 0);
    for (const sx of [-0.65, 0.65]) for (const sz of [-0.25, 0.25]) sph(g, 'p_brass', 0.05, sx, 0.08, sz);
  },
  basin(g) { cyl(g, 'p_porcelain', 0.08, 0.12, 0.8, 0, 0.4, 0, 10); box(g, 'p_porcelain', 0.5, 0.12, 0.42, 0, 0.84, 0); },
  mattress_wall(g) { const m = box(g, 'p_mattress', 0.9, 1.9, 0.18, 0, 0.95, 0); m.rotation.x = -0.05; for (const sx of [-0.35, 0.35]) cyl(g, 'p_metal', 0.008, 0.008, 0.1, sx, 1.8, 0.1, 4, Math.PI / 2); },
  crate(g, p) { const s = p.s || 1; box(g, 'p_wood_light', 0.8 * s, 0.8 * s, 0.8 * s, 0, 0.4 * s, 0); },
  barrel(g) { cyl(g, 'p_wood', 0.28, 0.3, 0.9, 0, 0.45, 0, 12); cyl(g, 'p_metal_dark', 0.31, 0.31, 0.04, 0, 0.2, 0, 12); cyl(g, 'p_metal_dark', 0.31, 0.31, 0.04, 0, 0.7, 0, 12); },
  boiler(g) { cyl(g, 'p_metal_dark', 0.55, 0.55, 1.9, 0, 0.95, 0, 16); cyl(g, 'p_metal', 0.08, 0.08, 1.0, 0.3, 2.0, 0, 8); box(g, 'p_black', 0.3, 0.25, 0.05, 0, 0.6, 0.54); },
  generator(g) {
    box(g, 'p_metal_green', 1.4, 0.7, 0.8, 0, 0.45, 0); box(g, 'p_metal_dark', 1.6, 0.1, 0.9, 0, 0.05, 0);
    cyl(g, 'p_metal_dark', 0.25, 0.25, 0.4, 0.4, 1.0, 0, 14);
    const fly = new THREE.Group(); fly.position.set(-0.78, 0.5, 0); g.add(fly);
    cyl(fly, 'p_metal', 0.3, 0.3, 0.08, 0, 0, 0, 16, 0, 0, Math.PI / 2); box(fly, 'p_metal_dark', 0.1, 0.5, 0.06, -0.03, 0, 0);
    cyl(g, 'p_metal_dark', 0.05, 0.05, 1.6, 0.5, 1.6, -0.3, 8);
    box(g, 'p_black', 0.2, 0.12, 0.02, -0.2, 0.62, 0.41);
    return { fly };
  },
  labbench(g, p) { box(g, 'p_metal_dark', p.w, 0.05, 0.75, 0, 0.9, 0); legs(g, 'p_metal_dark', p.w, 0.75, 0.88, 0.05); box(g, 'p_wood_light', p.w - 0.1, 0.4, 0.6, 0, 0.3, 0); },
  oscilloscope(g) {
    box(g, 'p_metal', 0.35, 0.28, 0.35, 0, 0.14, 0);
    const scr = new THREE.MeshBasicMaterial({ color: 0x051008 });
    const s = plane(g, scr, 0.18, 0.14, -0.05, 0.16, 0.176);
    return { screen: s };
  },
  reel_deck(g) {
    box(g, 'p_metal_dark', 0.9, 1.3, 0.55, 0, 0.65, 0); box(g, 'p_metal', 0.86, 0.7, 0.02, 0, 0.95, 0.28);
    const reels = [];
    for (const sx of [-0.22, 0.22]) { const r = cyl(g, 'p_metal_dark', 0.15, 0.15, 0.02, sx, 1.08, 0.3, 16, Math.PI / 2); reels.push(r); cyl(g, 'p_wax', 0.07, 0.07, 0.025, sx, 1.08, 0.305, 12, Math.PI / 2); }
    for (let i = 0; i < 4; i++) cyl(g, 'p_ivory', 0.02, 0.02, 0.03, -0.25 + i * 0.16, 0.72, 0.3, 8, Math.PI / 2);
    const lampMat = new THREE.MeshBasicMaterial({ color: 0x220800 });
    sph(g, lampMat, 0.02, 0.35, 0.72, 0.29);
    return { reels, lamp: lampMat };
  },
  tape_vault(g) {
    box(g, 'p_metal_dark', 0.9, 1.4, 0.65, 0, 0.7, -0.03);
    const hp = hinge(g, -0.45, 0, 0.3);
    box(hp, 'p_metal', 0.9, 1.36, 0.06, 0.45, 0.7, 0);
    cyl(hp, 'p_brass', 0.08, 0.08, 0.03, 0.6, 0.8, 0.04, 14, Math.PI / 2);
    const lampMat = new THREE.MeshBasicMaterial({ color: 0x300000 });
    sph(hp, lampMat, 0.02, 0.2, 1.2, 0.04);
    hp.userData.sign = -1;
    // the master reel inside
    const reel = cyl(g, 'p_metal', 0.16, 0.16, 0.03, 0, 0.9, 0, 16, Math.PI / 2);
    return { door: hp, lamp: lampMat, reel };
  },
  headphone_chair(g) {
    B.chair(g, {});
    // straps on the arms
    box(g, 'p_rope', 0.46, 0.03, 0.06, 0, 0.6, 0.15);
    const hp = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 6, 14, Math.PI), M('p_metal_dark')); hp.position.set(0, 0.5, 0.05); g.add(hp);
    for (const sx of [-0.1, 0.1]) cyl(g, 'p_black', 0.04, 0.04, 0.03, sx, 0.5, 0.05, 10, 0, 0, Math.PI / 2);
  },
  chamber_speaker(g) {
    box(g, 'p_wood', 0.7, 1.1, 0.5, 0, 0.55, 0);
    cyl(g, 'p_black', 0.22, 0.22, 0.02, 0, 0.7, 0.25, 18, Math.PI / 2); cyl(g, 'p_black', 0.08, 0.08, 0.02, 0, 0.3, 0.25, 14, Math.PI / 2);
  },
  cables(g) { for (let i = 0; i < 6; i++) { const c = cyl(g, 'p_black', 0.012, 0.012, rng.float(1.5, 4), rng.float(-1, 1), 0.012, rng.float(-1, 1), 5, 0, rng.float(0, 3), Math.PI / 2); void c; } },
  pipes(g, p) { cyl(g, 'p_metal_dark', 0.06, 0.06, p.len, 0, 2.3, 0, 8, 0, 0, Math.PI / 2); cyl(g, 'p_metal', 0.035, 0.035, p.len, 0, 2.15, 0.12, 8, 0, 0, Math.PI / 2); },
  fuelcan(g) { box(g, 'p_toy_red', 0.3, 0.38, 0.2, 0, 0.19, 0); cyl(g, 'p_metal', 0.02, 0.02, 0.08, 0.1, 0.42, 0, 6, 0, 0, 0.5); },
  boxes(g) { box(g, 'p_wood_light', 0.6, 0.45, 0.5, -0.1, 0.225, 0); box(g, 'p_wood_light', 0.5, 0.35, 0.45, 0.05, 0.625, 0.03, 0, 0.2, 0); box(g, 'p_wood_light', 0.4, 0.4, 0.4, 0.3, 0.2, 0.15, 0, -0.3, 0); },
  bench(g) { box(g, 'p_wood', 1.2, 0.05, 0.38, 0, 0.45, 0); legs(g, 'p_wood', 1.2, 0.38, 0.43, 0.05); },
  candles(g) { for (const sx of [-0.06, 0.06]) { cyl(g, 'p_brass', 0.04, 0.05, 0.12, sx, 0.06, 0, 8); cyl(g, 'p_candle', 0.015, 0.015, rng.float(0.05, 0.15), sx, 0.18, 0, 6); } },
  bulb(g) {
    cyl(g, 'p_black', 0.004, 0.004, 0.5, 0, 2.25, 0, 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0x222018 });
    sph(g, mat, 0.045, 0, 1.97, 0, 1, 1.3, 1, 8);
    return { bulb: mat };
  },
  // ---- interactive small items ----
  note(g) { const n = plane(g, M('p_paper'), 0.17, 0.22, 0, 0.004, 0, rng.float(-0.4, 0.4), -Math.PI / 2); return { mesh: n }; },
  journal(g) { box(g, 'p_fabric_red', 0.18, 0.04, 0.24, 0, 0.02, 0, 0, 0.3, 0); box(g, 'p_ivory', 0.17, 0.035, 0.22, 0.004, 0.02, 0, 0, 0.3, 0); },
  cylinder(g) {
    cyl(g, 'p_wax', 0.028, 0.028, 0.11, 0, 0.028, 0, 12, 0, 0.6, Math.PI / 2);
    cyl(g, 'p_ivory', 0.032, 0.032, 0.06, 0.12, 0.032, 0.03, 10, 0, 0.6, Math.PI / 2); // its cardboard tube
  },
  bottle(g) { cyl(g, 'p_glass', 0.035, 0.035, 0.2, 0, 0.1, 0, 8); cyl(g, 'p_glass', 0.012, 0.03, 0.08, 0, 0.24, 0, 8); },
  music_box(g) {
    box(g, 'p_wood_light', 0.22, 0.1, 0.15, 0, 0.05, 0);
    const lid = hinge(g, 0, 0.1, -0.075); box(lid, 'p_wood_light', 0.22, 0.025, 0.15, 0, 0.012, 0.075);
    sph(g, 'p_ivory', 0.02, 0, 0.11, 0, 1, 2, 1, 6);
    return { lid };
  },
  // ---- wall decals ----
  portrait(g, p) { box(g, 'p_wood', 0.62, 0.78, 0.04, 0, 0, 0.02); plane(g, decalMat(T.portrait(p.img), { alphaTest: 0 }), 0.5, 0.65, 0, 0, 0.045); },
  drawing(g, p) { plane(g, decalMat(T.drawing(p.img), { alphaTest: 0 }), 0.42, 0.33, 0, 0, 0.01, 0, rng.float(-0.06, 0.06)); },
  decal_text(g, p) { const lines = p.text.split('\n').length; plane(g, decalMat(T.textDecal(p.text, p.color || '#ddd8c8', !p.plate, !!p.plate)), p.size * 4, p.size * lines, 0, 0, 0.01); },
  tally(g, p) { plane(g, decalMat(T.tally(p.count)), 0.6, 0.3, 0, 0, 0.01); },
  pinned_notes(g) { plane(g, decalMat(T.pinnedNotes()), 1.4, 1.4, 0, 0, 0.01); },
  blueprint(g) { plane(g, decalMat(T.blueprint(), { alphaTest: 0 }), 0.9, 0.68, 0, 0, 0.01); },
  rug(g, p) { plane(g, decalMat(T.rug(p.pattern), { alphaTest: 0 }), p.w, p.d, 0, 0.006, 0, 0, -Math.PI / 2); },
  runner(g, p) { const r = plane(g, decalMat(T.rug(0), { alphaTest: 0 }), p.w, p.d, 0, 0.006, 0, 0, -Math.PI / 2); r.material.map = r.material.map.clone(); r.material.map.needsUpdate = true; },
};
const WALL_MOUNT = new Set(['portrait', 'drawing', 'decal_text', 'tally', 'pinned_notes', 'blueprint']);

// ---------- builder ----------
export function buildProps(world) {
  const floors = FLOORS.map(() => ({ group: new THREE.Group(), buckets: new Map() }));
  const interactables = new Map();
  const lights = [];
  const powered = { screens: [], bulbs: [] };

  for (const p of PROPS) {
    const builder = B[p.t];
    if (!builder) { console.warn('no builder for', p.t); continue; }
    const g = new THREE.Group();
    const parts = builder(g, p) || {};
    const fy = FLOORS[p.floor].y;
    g.position.set(p.x, fy + (WALL_MOUNT.has(p.t) ? (p.y ?? 1.5) : (p.y ?? 0)), p.z);
    g.rotation.y = ((p.r || 0) * Math.PI) / 180;
    g.updateMatrixWorld(true);
    if (p.light) lights.push({ id: p.light, floor: p.floor, pos: new THREE.Vector3(p.x, fy + (p.t === 'bulb' ? 1.9 : (p.y ?? 0) + 0.2), p.z), color: p.t === 'bulb' ? 0xffd9a0 : 0xff9c48, intensity: p.t === 'bulb' ? 6 : 2.2, distance: p.t === 'bulb' ? 9 : 6, flicker: p.t === 'lamp' ? 1 : 0, on: p.t !== 'bulb', powered: p.t === 'bulb', parts });
    if (parts.screen) powered.screens.push(parts.screen);
    if (parts.bulb) powered.bulbs.push(parts.bulb);
    const dynamic = !!p.id || p.t === 'lamp' || p.t === 'oscilloscope' || p.t === 'bulb';
    if (dynamic) {
      compact(g, keepSet(parts));
      g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      floors[p.floor].group.add(g);
      if (p.id) interactables.set(p.id, { id: p.id, t: p.t, floor: p.floor, prop: p, object: g, parts, pos: new THREE.Vector3(p.x, fy + (p.y ?? 0), p.z) });
    } else {
      addToBuckets(floors[p.floor].buckets, g);
    }
  }

  // Chalk crosses on creaky boards (Clara's quiet path)
  const chalkMat = decalMat(T.chalkCross());
  for (const c of CREAKS) if (c.chalk) {
    const g = new THREE.Group();
    plane(g, chalkMat, 0.32, 0.32, c.x + 0.5 + rng.float(-0.15, 0.15), FLOORS[c.floor].y + 0.008, c.z + 0.5 + rng.float(-0.15, 0.15), rng.float(0, 3), -Math.PI / 2);
    floors[c.floor].group.add(g);
  }
  // Puddles
  const puddleMat = new THREE.MeshStandardMaterial({ color: 0x050607, roughness: 0.04, metalness: 0.6, transparent: true, opacity: 0.85, polygonOffset: true, polygonOffsetFactor: -3 });
  for (const p of PUDDLES) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.5, 14), puddleMat);
    m.rotation.x = -Math.PI / 2; m.position.set(p.x + 0.5, FLOORS[p.floor].y + 0.006, p.z + 0.5); m.scale.set(rng.float(0.9, 1.3), rng.float(0.7, 1.1), 1);
    floors[p.floor].group.add(m);
  }

  const windows = buildWindows(floors, lights);
  const doorVis = buildDoors(world, floors);

  // merge buckets
  for (const fl of floors) {
    for (const [, { mat, geos }] of fl.buckets) {
      const merged = mergeGeometries(geos, false);
      if (!merged) continue;
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = !mat.transparent && !mat.isMeshBasicMaterial; mesh.receiveShadow = true; mesh.matrixAutoUpdate = false;
      fl.group.add(mesh);
    }
    fl.buckets.clear();
  }
  return { floorGroups: floors.map((f) => f.group), interactables, lights, windows, doorVis, powered };
}

// Merge the static meshes of a dynamic prop per material (recursively per hinge group) so a
// wardrobe costs ~3 draw calls instead of ~20. Objects referenced in `keep` stay separate.
export function compact(g, keep = new Set()) {
  for (const c of [...g.children]) if (!c.isMesh && c.children.length) compact(c, keep);
  const buckets = new Map();
  for (const c of [...g.children]) {
    if (!c.isMesh || keep.has(c) || c.children.length) continue;
    c.updateMatrix();
    const geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
    for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
    if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
    geo.applyMatrix4(c.matrix);
    if (!buckets.has(c.material.uuid)) buckets.set(c.material.uuid, { mat: c.material, geos: [] });
    buckets.get(c.material.uuid).geos.push(geo);
    g.remove(c);
  }
  for (const { mat, geos } of buckets.values()) { const m = new THREE.Mesh(mergeGeometries(geos, false), mat); g.add(m); }
}
function keepSet(parts) {
  const k = new Set();
  for (const v of Object.values(parts)) for (const o of Array.isArray(v) ? v : [v]) if (o && o.isObject3D) o.traverse((x) => k.add(x));
  return k;
}

function addToBuckets(buckets, g) {
  g.traverse((o) => {
    if (!o.isMesh) return;
    o.updateWorldMatrix(true, false);
    let geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
    if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
    if (!geo.attributes.normal) geo.computeVertexNormals();
    geo.applyMatrix4(o.matrixWorld);
    const key = o.material.uuid;
    if (!buckets.has(key)) buckets.set(key, { mat: o.material, geos: [] });
    buckets.get(key).geos.push(geo);
  });
}

// ---------- windows ----------
function buildWindows(floors, lights) {
  const paneMat = new THREE.MeshBasicMaterial({ map: T.windowPane(), color: new THREE.Color(0.55, 0.6, 0.75) });
  const rainTex = T.rainStreaks(); rainTex.repeat.set(1, 1);
  const rainMat = new THREE.MeshBasicMaterial({ map: rainTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0x8899aa });
  const list = [];
  for (const w of WINDOWS) {
    const g = new THREE.Group();
    const fy = FLOORS[w.floor].y;
    let x = w.x + 0.5, z = w.z + 0.5, ry = 0;
    if (w.face === 'N') { z = w.z; ry = 0; } else if (w.face === 'S') { z = w.z + 1; ry = Math.PI; } else if (w.face === 'E') { x = w.x + 1; ry = -Math.PI / 2; } else { x = w.x; ry = Math.PI / 2; }
    g.position.set(x, fy, z); g.rotation.y = ry;
    const wy = w.floor === 0 ? 1.7 : 1.55, wh = w.floor === 0 ? 0.5 : 1.45, ww = 0.8;
    // recess + frame
    box(g, 'p_wood', ww + 0.12, 0.06, 0.1, 0, wy - wh / 2 - 0.03, 0.05); box(g, 'p_wood', ww + 0.12, 0.06, 0.06, 0, wy + wh / 2 + 0.03, 0.03);
    box(g, 'p_wood', 0.06, wh, 0.06, -ww / 2 - 0.03, wy, 0.03); box(g, 'p_wood', 0.06, wh, 0.06, ww / 2 + 0.03, wy, 0.03);
    box(g, 'p_wood', 0.03, wh, 0.03, 0, wy, 0.02); box(g, 'p_wood', ww, 0.03, 0.03, 0, wy + wh * 0.15, 0.02);
    if (w.covered) {
      const bg = new THREE.PlaneGeometry(ww + 0.35, wh + 0.4, 6, 6);
      const pos = bg.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin((pos.getX(i) + 0.5) * 4) * 0.025 + (1 - Math.abs(pos.getX(i)) * 2) * 0.03);
      bg.computeVertexNormals();
      const bl = new THREE.Mesh(bg, M('p_fabric_blanket')); bl.position.set(0, wy, 0.08); g.add(bl);
      for (const [nx, ny] of [[-0.5, 0.9], [0.5, 0.9], [0, 0.95], [-0.5, -0.9], [0.5, -0.9]]) cyl(g, 'p_metal', 0.008, 0.008, 0.04, nx * (ww + 0.3) / 1, wy + ny * (wh + 0.35) / 2, 0.1, 4, Math.PI / 2);
      addToBuckets(floors[w.floor].buckets, (g.updateMatrixWorld(true), g));
    } else {
      const pane = plane(g, paneMat, ww, wh, 0, wy, 0.004);
      const rain = plane(g, rainMat, ww, wh, 0, wy, 0.012);
      void pane; void rain;
      // sill
      box(g, 'p_wood', ww + 0.2, 0.04, 0.2, 0, wy - wh / 2 - 0.06, 0.1);
      g.updateMatrixWorld(true);
      addToBuckets(floors[w.floor].buckets, g); // frames, panes and rain sheets merge per material
      const n = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
      lights.push({ id: `moon_${w.floor}_${w.x}_${w.z}`, floor: w.floor, pos: new THREE.Vector3(x + n.x * 0.8, fy + wy, z + n.z * 0.8), color: 0x6f86b8, intensity: 0.9, distance: 5.5, flicker: 0, on: true, moon: true });
      list.push({ floor: w.floor, pos: new THREE.Vector3(x, fy + wy, z), normal: n });
    }
  }
  return { list, paneMat, rainMat, rainTex };
}

// ---------- doors ----------
function buildDoors(world, floors) {
  const vis = new Map();
  const doorMat = getMatDoor();
  for (const d of world.doors) {
    if (d.kind === 'arch') continue;
    const fy = FLOORS[d.floor].y;
    const pivot = new THREE.Group();
    const g = new THREE.Group();
    let base = 0;
    if (d.axis === 'z') { pivot.position.set(d.x + 0.03, fy, d.z + 0.5); base = 0; }
    else { pivot.position.set(d.x + 0.5, fy, d.z + 0.03); base = -Math.PI / 2; }
    pivot.rotation.y = base;
    pivot.add(g);
    const w = 0.94, h = DOOR_H - 0.04;
    if (d.kind === 'vault') {
      box(g, 'p_metal', w, h, 0.16, w / 2, h / 2, 0);
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.025, 6, 18), M('p_metal_dark')); wheel.position.set(w / 2, 1.1, 0.1); g.add(wheel);
      for (let i = 0; i < 3; i++) box(g, 'p_metal_dark', 0.36, 0.02, 0.02, w / 2, 1.1, 0.1, 0, 0, i * Math.PI / 3);
      box(g, 'p_foam', w - 0.1, h - 0.1, 0.03, w / 2, h / 2, -0.09);
    } else {
      box(g, doorMat, w, h, 0.05, w / 2, h / 2, 0);
      if (d.kind === 'front') { box(g, 'p_glass', 0.3, 0.4, 0.06, w / 2, 1.65, 0); box(g, 'p_wood', w, 0.1, 0.07, w / 2, 1.0, 0); }
      for (const s of [1, -1]) sph(g, 'p_brass', 0.03, w - 0.08, 1.0, s * 0.045);
      // felt strips nailed round the edges (soundproofing)
      if (d.floor === 2) box(g, 'p_fabric_red', w, 0.06, 0.06, w / 2, h - 0.03, 0);
    }
    compact(g, new Set());
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    floors[d.floor].group.add(pivot);
    vis.set(d.id, { pivot, base, door: d });
  }
  return vis;
}
let _doorMat;
function getMatDoor() {
  if (!_doorMat) _doorMat = new THREE.MeshStandardMaterial({ map: T.woodPanel(), bumpMap: T.woodPanel(), bumpScale: 1.5, roughness: 0.6 });
  return _doorMat;
}
