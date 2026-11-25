// Procedural canvas textures. Everything in Marlowe House is generated at load time:
// no external image assets, deterministic via seeded RNG.
import * as THREE from 'three';
import { Rng } from '../core/rng.js';

const cache = new Map();

function canvas(w, h = w) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}
function toTex(c, { repeat = true, srgb = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}
function noise(ctx, w, h, amt, rng, alpha = 1) {
  const img = ctx.getImageData(0, 0, w, h); const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rng.next() - 0.5) * amt;
    d[i] += n; d[i + 1] += n; d[i + 2] += n; d[i + 3] = d[i + 3] * alpha;
  }
  ctx.putImageData(img, 0, 0);
}
function stains(ctx, w, h, rng, n, color = '60,40,20', maxA = 0.18) {
  for (let i = 0; i < n; i++) {
    const x = rng.float(0, w), y = rng.float(0, h), r = rng.float(w * 0.05, w * 0.3);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const a = rng.float(0.04, maxA);
    g.addColorStop(0, `rgba(${color},${a})`); g.addColorStop(0.7, `rgba(${color},${a * 0.6})`); g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g;
    // draw wrapped so textures tile
    for (const ox of [-w, 0, w]) for (const oy of [-h, 0, h]) { ctx.save(); ctx.translate(ox, oy); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); }
  }
}
function cracks(ctx, w, h, rng, n, color = 'rgba(20,15,10,0.5)') {
  ctx.strokeStyle = color; ctx.lineWidth = 1;
  for (let i = 0; i < n; i++) {
    let x = rng.float(0, w), y = rng.float(0, h), a = rng.float(0, 6.28);
    ctx.beginPath(); ctx.moveTo(x, y);
    const len = rng.int(8, 30);
    for (let j = 0; j < len; j++) { a += rng.float(-0.7, 0.7); x += Math.cos(a) * 4; y += Math.sin(a) * 4; ctx.lineTo(x, y); }
    ctx.stroke();
  }
}

const PAPER = {
  paper_red: ['#5b2424', '#7a3a2f', '#3d1515'],
  paper_green: ['#33402f', '#4a5a3e', '#222b1f'],
  paper_blue: ['#2f3a4a', '#47566a', '#1e2633'],
  paper_ochre: ['#6b5732', '#8a7344', '#4a3b20'],
  paper_grey: ['#4d4a45', '#66625a', '#33312d'],
};

export function wallpaper(key, seed = 3) {
  const id = 'wp:' + key; if (cache.has(id)) return cache.get(id);
  const [base, motif, dark] = PAPER[key];
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(seed + key.length * 13);
  x.fillStyle = base; x.fillRect(0, 0, S, S);
  // vertical stripes
  for (let i = 0; i < 4; i++) { x.fillStyle = dark; x.globalAlpha = 0.35; x.fillRect(i * 64 + 30, 0, 4, S); x.fillRect(i * 64 + 0, 0, 2, S); }
  x.globalAlpha = 1;
  // damask motif: stylised lily shapes on a diamond lattice
  const drawMotif = (cx, cy, s) => {
    x.save(); x.translate(cx, cy); x.fillStyle = motif; x.globalAlpha = 0.55;
    x.beginPath(); x.ellipse(0, 0, s * 0.18, s * 0.42, 0, 0, 7); x.fill();
    for (const sgn of [-1, 1]) { x.beginPath(); x.ellipse(sgn * s * 0.26, s * 0.08, s * 0.1, s * 0.3, sgn * 0.6, 0, 7); x.fill(); }
    x.beginPath(); x.arc(0, -s * 0.5, s * 0.08, 0, 7); x.fill();
    x.fillStyle = dark; x.globalAlpha = 0.5; x.beginPath(); x.ellipse(0, s * 0.05, s * 0.06, s * 0.2, 0, 0, 7); x.fill();
    x.restore();
  };
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { drawMotif(i * 128, j * 128, 70); drawMotif(i * 128 + 64, j * 128 + 64, 70); }
  x.globalAlpha = 1;
  noise(x, S, S, 26, rng);
  stains(x, S, S, rng, 6, '40,30,15', 0.22);
  return cache.set(id, toTex(c)).get(id);
}

export function nurseryPaper() {
  if (cache.has('nursery')) return cache.get('nursery');
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(77);
  x.fillStyle = '#7d7358'; x.fillRect(0, 0, S, S);
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#857b60' : '#6e664f'; x.fillRect(i * 32, 0, 32, S); }
  // little stars and moons — faded
  x.fillStyle = 'rgba(220,200,150,0.35)';
  for (let i = 0; i < 18; i++) {
    const px = rng.float(0, S), py = rng.float(0, S), r = rng.float(4, 7);
    x.save(); x.translate(px, py); x.beginPath();
    for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    x.fill(); x.restore();
  }
  noise(x, S, S, 24, rng); stains(x, S, S, rng, 5, '50,35,10', 0.25);
  return cache.set('nursery', toTex(c)).get('nursery');
}

export function wood(dark = false, seed = 5) {
  const id = 'wood' + dark; if (cache.has(id)) return cache.get(id);
  const S = 512; const [c, x] = canvas(S); const rng = new Rng(seed + (dark ? 9 : 0));
  const planks = 5, pw = S / planks;
  for (let i = 0; i < planks; i++) {
    let yoff = rng.float(0, S);
    for (let seg = 0; seg < 2; seg++) {
      const L = S;
      const hue = dark ? rng.float(18, 26) : rng.float(24, 34);
      const light = dark ? rng.float(13, 20) : rng.float(22, 32);
      x.fillStyle = `hsl(${hue},${rng.float(30, 45)}%,${light}%)`;
      x.fillRect(i * pw, yoff - L * seg, pw, L);
      // grain
      for (let g = 0; g < 26; g++) {
        x.strokeStyle = `rgba(${dark ? '10,5,2' : '30,15,5'},${rng.float(0.08, 0.25)})`; x.lineWidth = rng.float(0.6, 2);
        const gx = i * pw + rng.float(2, pw - 2); x.beginPath();
        for (let yy = 0; yy <= S; yy += 16) x.lineTo(gx + Math.sin(yy * 0.02 + g) * rng.float(1, 4), yy);
        x.stroke();
      }
      // knot
      if (rng.chance(0.5)) { const kx = i * pw + rng.float(10, pw - 10), ky = rng.float(0, S); x.fillStyle = 'rgba(20,10,3,0.5)'; x.beginPath(); x.ellipse(kx, ky, 4, 9, 0, 0, 7); x.fill(); }
      // end seam
      x.fillStyle = 'rgba(0,0,0,0.7)'; x.fillRect(i * pw, (yoff % S), pw, 2);
      yoff += rng.float(S * 0.4, S * 0.9);
    }
    x.fillStyle = 'rgba(0,0,0,0.75)'; x.fillRect(i * pw, 0, 2, S);
  }
  noise(x, S, S, 14, rng);
  stains(x, S, S, rng, 5, '0,0,0', 0.2);
  return cache.set(id, toTex(c)).get(id);
}

export function plaster(stained = false, grey = false) {
  const id = 'plaster' + stained + grey; if (cache.has(id)) return cache.get(id);
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(stained ? 21 : 11);
  x.fillStyle = grey ? '#5d5f5c' : '#8a8577'; x.fillRect(0, 0, S, S);
  noise(x, S, S, 22, rng);
  stains(x, S, S, rng, stained ? 10 : 3, '70,55,25', stained ? 0.35 : 0.12);
  if (stained) { // water rings
    x.strokeStyle = 'rgba(60,40,15,0.35)'; x.lineWidth = 2;
    for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(rng.float(40, 216), rng.float(40, 216), rng.float(15, 45), 0, 7); x.stroke(); }
  }
  cracks(x, S, S, rng, stained ? 6 : 3);
  return cache.set(id, toTex(c)).get(id);
}

export function tiles(check = false) {
  const id = 'tiles' + check; if (cache.has(id)) return cache.get(id);
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(check ? 31 : 32);
  const n = check ? 4 : 6, ts = S / n;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const l = check ? ((i + j) % 2 ? 78 : 14) : rng.float(70, 80);
    x.fillStyle = `hsl(45,${check ? 6 : 10}%,${l}%)`; x.fillRect(i * ts, j * ts, ts, ts);
  }
  x.strokeStyle = check ? 'rgba(30,25,20,0.8)' : 'rgba(60,55,45,0.9)'; x.lineWidth = 3;
  for (let i = 0; i <= n; i++) { x.beginPath(); x.moveTo(i * ts, 0); x.lineTo(i * ts, S); x.stroke(); x.beginPath(); x.moveTo(0, i * ts); x.lineTo(S, i * ts); x.stroke(); }
  noise(x, S, S, 18, rng); stains(x, S, S, rng, 8, '50,40,20', 0.3); cracks(x, S, S, rng, 4);
  return cache.set(id, toTex(c)).get(id);
}

export function brick() {
  if (cache.has('brick')) return cache.get('brick');
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(41);
  x.fillStyle = '#2b2622'; x.fillRect(0, 0, S, S);
  const bh = 16, bw = 42;
  for (let row = 0; row < S / bh; row++) {
    const off = row % 2 ? bw / 2 : 0;
    for (let i = -1; i < S / bw + 1; i++) {
      x.fillStyle = `hsl(${rng.float(8, 20)},${rng.float(25, 40)}%,${rng.float(18, 28)}%)`;
      x.fillRect(i * bw + off + 1.5, row * bh + 1.5, bw - 3, bh - 3);
    }
  }
  noise(x, S, S, 26, rng); stains(x, S, S, rng, 8, '10,15,8', 0.4);
  return cache.set('brick', toTex(c)).get('brick');
}

export function concrete(stone = false) {
  const id = 'concrete' + stone; if (cache.has(id)) return cache.get(id);
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(stone ? 51 : 52);
  x.fillStyle = stone ? '#3a3834' : '#47464157'; x.fillRect(0, 0, S, S);
  x.fillStyle = stone ? '#3a3834' : '#474641'; x.fillRect(0, 0, S, S);
  if (stone) {
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
      x.fillStyle = `hsl(40,6%,${rng.float(18, 28)}%)`;
      x.fillRect(i * 64 + 2 + rng.float(0, 3), j * 64 + 2 + rng.float(0, 3), 58, 58);
    }
  }
  noise(x, S, S, 30, rng); stains(x, S, S, rng, 10, '15,15,10', 0.35); cracks(x, S, S, rng, 5);
  return cache.set(id, toTex(c)).get(id);
}

export function woodPanel() {
  if (cache.has('panel')) return cache.get('panel');
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(61);
  x.drawImage(wood(true).image, 0, 0, S, S);
  x.strokeStyle = 'rgba(0,0,0,0.6)'; x.lineWidth = 6;
  x.strokeRect(20, 20, S - 40, S - 40);
  x.strokeStyle = 'rgba(255,220,180,0.12)'; x.lineWidth = 2; x.strokeRect(26, 26, S - 52, S - 52);
  noise(x, S, S, 10, rng);
  return cache.set('panel', toTex(c)).get('panel');
}

export function foam() {
  if (cache.has('foam')) return cache.get('foam');
  const S = 128; const [c, x] = canvas(S); const rng = new Rng(71);
  const n = 4, s = S / n;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const cx = i * s + s / 2, cy = j * s + s / 2;
    const rot = (i + j) % 2;
    const faces = [[0, 0, s, 0, '#3a3d42'], [s, 0, s, s, '#202226'], [s, s, 0, s, '#141518'], [0, s, 0, 0, '#2c2e33']];
    for (const [ax, ay, bx, by, col] of faces) {
      x.fillStyle = col; x.beginPath(); x.moveTo(i * s + ax, j * s + ay); x.lineTo(i * s + bx, j * s + by); x.lineTo(cx, cy); x.fill();
    }
    if (rot) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(i * s, j * s, s, s); }
  }
  noise(x, S, S, 16, rng);
  return cache.set('foam', toTex(c)).get('foam');
}

export function grate() {
  if (cache.has('grate')) return cache.get('grate');
  const S = 128; const [c, x] = canvas(S); const rng = new Rng(81);
  x.fillStyle = '#060606'; x.fillRect(0, 0, S, S);
  x.strokeStyle = '#3b3a36'; x.lineWidth = 3;
  for (let i = 0; i <= S; i += 16) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, S); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(S, i); x.stroke(); }
  noise(x, S, S, 20, rng);
  return cache.set('grate', toTex(c)).get('grate');
}

export function rug(pattern = 0) {
  const id = 'rug' + pattern; if (cache.has(id)) return cache.get(id);
  const S = 256; const [c, x] = canvas(S); const rng = new Rng(91 + pattern);
  const pal = [['#4a1414', '#7d5a2a', '#1c1a2a'], ['#1c2a33', '#7a6a3a', '#3a1414'], ['#3a2a14', '#5a1e1e', '#1a1a14']][pattern % 3];
  x.fillStyle = pal[0]; x.fillRect(0, 0, S, S);
  x.strokeStyle = pal[1]; x.lineWidth = 10; x.strokeRect(14, 14, S - 28, S - 28);
  x.strokeStyle = pal[2]; x.lineWidth = 4; x.strokeRect(30, 30, S - 60, S - 60);
  x.fillStyle = pal[1];
  x.save(); x.translate(S / 2, S / 2); x.rotate(Math.PI / 4); x.fillRect(-40, -40, 80, 80); x.fillStyle = pal[2]; x.fillRect(-22, -22, 44, 44); x.restore();
  for (let i = 0; i < 40; i++) { x.fillStyle = pal[rng.int(1, 2)]; x.globalAlpha = 0.5; x.fillRect(rng.float(40, 210), rng.float(40, 210), 6, 6); }
  x.globalAlpha = 1;
  noise(x, S, S, 30, rng); stains(x, S, S, rng, 4, '0,0,0', 0.3);
  return cache.set(id, toTex(c, { repeat: false })).get(id);
}

export function fabric(color = '#1a1a1c', seed = 101) {
  const id = 'fab' + color + seed; if (cache.has(id)) return cache.get(id);
  const S = 128; const [c, x] = canvas(S); const rng = new Rng(seed);
  x.fillStyle = color; x.fillRect(0, 0, S, S);
  for (let i = 0; i < S; i += 2) { x.fillStyle = `rgba(255,255,255,${rng.float(0, 0.04)})`; x.fillRect(0, i, S, 1); x.fillStyle = `rgba(0,0,0,${rng.float(0, 0.08)})`; x.fillRect(i, 0, 1, S); }
  noise(x, S, S, 18, rng); stains(x, S, S, rng, 4, '0,0,0', 0.3);
  return cache.set(id, toTex(c)).get(id);
}

export function brass() {
  if (cache.has('brass')) return cache.get('brass');
  const S = 128; const [c, x] = canvas(S); const rng = new Rng(111);
  x.fillStyle = '#6b5326'; x.fillRect(0, 0, S, S);
  noise(x, S, S, 40, rng);
  stains(x, S, S, rng, 10, '40,70,55', 0.45); // verdigris
  stains(x, S, S, rng, 6, '10,8,4', 0.5);
  return cache.set('brass', toTex(c)).get('brass');
}

export function paper(seed = 1) {
  const id = 'paper' + seed; if (cache.has(id)) return cache.get(id);
  const [c, x] = canvas(128, 160); const rng = new Rng(seed + 400);
  x.fillStyle = '#c9bc98'; x.fillRect(0, 0, 128, 160);
  x.strokeStyle = 'rgba(40,30,20,0.55)'; x.lineWidth = 1.2;
  for (let y = 18; y < 150; y += 9) { x.beginPath(); x.moveTo(12, y); let px = 12; while (px < 116) { const l = rng.float(5, 20); x.lineTo(Math.min(116, px + l), y + rng.float(-0.6, 0.6)); px += l + rng.float(2, 5); x.moveTo(px, y); } x.stroke(); }
  noise(x, 128, 160, 20, rng); stains(x, 128, 160, rng, 3, '90,60,20', 0.3);
  return cache.set(id, toTex(c, { repeat: false })).get(id);
}

// Crayon drawings by Clara.
export function drawing(kind) {
  const id = 'draw' + kind; if (cache.has(id)) return cache.get(id);
  const [c, x] = canvas(256, 200); const rng = new Rng(kind.length * 7);
  x.fillStyle = '#d8d0b8'; x.fillRect(0, 0, 256, 200);
  const crayon = (col, w, pts) => { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a + rng.float(-1.5, 1.5), b + rng.float(-1.5, 1.5)) : x.moveTo(a, b))); x.stroke(); };
  const stick = (cx, base, h, col) => {
    crayon(col, 4, [[cx, base - h], [cx, base - h * 0.35]]);
    crayon(col, 4, [[cx, base - h * 0.35], [cx - 12, base]]); crayon(col, 4, [[cx, base - h * 0.35], [cx + 12, base]]);
    crayon(col, 4, [[cx - 16, base - h * 0.75], [cx, base - h * 0.7], [cx + 16, base - h * 0.75]]);
  };
  if (kind === 'horn_man') {
    // tall black figure with a trumpet head, a small girl hiding
    crayon('#111', 6, [[150, 40], [150, 160]]);
    crayon('#111', 5, [[150, 80], [120, 150]]); crayon('#111', 5, [[150, 80], [185, 150]]);
    crayon('#111', 5, [[150, 160], [135, 195]]); crayon('#111', 5, [[150, 160], [165, 195]]);
    x.fillStyle = '#8a6a1c'; x.beginPath(); x.moveTo(150, 45); x.lineTo(110, 10); x.lineTo(115, 55); x.closePath(); x.fill();
    x.fillStyle = '#000'; x.beginPath(); x.ellipse(112, 32, 6, 22, 0.2, 0, 7); x.fill();
    stick(50, 190, 60, '#c23'); x.fillStyle = '#c23'; x.beginPath(); x.arc(50, 122, 9, 0, 7); x.fill();
    x.fillStyle = '#222'; x.font = 'bold 20px Comic Sans MS, cursive'; x.fillText('SHHH', 20, 40);
  } else if (kind === 'family_draw') {
    stick(60, 180, 90, '#235'); x.strokeStyle = '#235'; x.lineWidth = 4; x.beginPath(); x.arc(60, 82, 12, 0, 7); x.stroke();
    stick(130, 180, 80, '#a33'); x.strokeStyle = '#a33'; x.beginPath(); x.arc(130, 92, 11, 0, 7); x.stroke();
    stick(190, 180, 50, '#c62'); x.strokeStyle = '#c62'; x.beginPath(); x.arc(190, 122, 9, 0, 7); x.stroke();
    // daddy scribbled out
    crayon('#111', 7, [[40, 70], [80, 110], [45, 120], [85, 80], [50, 150], [80, 140]]);
    x.fillStyle = '#333'; x.font = '16px Comic Sans MS, cursive'; x.fillText('mummy  me', 115, 30); x.fillText('daddy?', 30, 30);
  } else {
    // the house with all windows black and a tiny face
    crayon('#553', 4, [[50, 190], [50, 80], [128, 25], [206, 80], [206, 190], [50, 190]]);
    x.fillStyle = '#111';
    for (const [a, b] of [[70, 100], [160, 100], [70, 145], [160, 145]]) x.fillRect(a, b, 26, 24);
    x.fillStyle = '#fff'; x.beginPath(); x.arc(173, 112, 4, 0, 7); x.fill();
    x.fillStyle = '#333'; x.font = '15px Comic Sans MS, cursive'; x.fillText('our quiet house', 70, 18);
  }
  noise(x, 256, 200, 16, rng);
  return cache.set(id, toTex(c, { repeat: false })).get(id);
}

export function portrait(kind) {
  const id = 'portrait' + kind; if (cache.has(id)) return cache.get(id);
  const [c, x] = canvas(160, 200); const rng = new Rng(kind.length * 31);
  const g = x.createLinearGradient(0, 0, 0, 200); g.addColorStop(0, '#2a2418'); g.addColorStop(1, '#0f0c08');
  x.fillStyle = g; x.fillRect(0, 0, 160, 200);
  const face = (cx, cy, s, skin = '#8a6a4a') => {
    x.fillStyle = '#16120c'; x.beginPath(); x.ellipse(cx, cy + s * 2.2, s * 1.6, s * 1.4, 0, 0, 7); x.fill();
    x.fillStyle = skin; x.beginPath(); x.ellipse(cx, cy, s * 0.75, s, 0, 0, 7); x.fill();
    x.fillStyle = 'rgba(0,0,0,0.5)'; x.beginPath(); x.ellipse(cx - s * 0.3, cy - s * 0.1, s * 0.13, s * 0.08, 0, 0, 7); x.ellipse(cx + s * 0.3, cy - s * 0.1, s * 0.13, s * 0.08, 0, 0, 7); x.fill();
    x.fillRect(cx - s * 0.2, cy + s * 0.45, s * 0.4, s * 0.05);
  };
  if (kind === 'family') { face(45, 85, 22); face(112, 80, 24, '#7a5c40'); face(80, 125, 15, '#9a7a5a'); }
  else if (kind === 'ada') { face(80, 80, 32, '#8a6a4a'); x.fillStyle = '#1a120a'; x.beginPath(); x.ellipse(80, 55, 36, 22, 0, 3.14, 6.28); x.fill(); }
  else if (kind === 'thomas_scratched') {
    face(80, 85, 32, '#7a5c40');
    x.strokeStyle = 'rgba(200,190,170,0.85)'; x.lineWidth = 2;
    for (let i = 0; i < 40; i++) { x.beginPath(); const a = rng.float(50, 110), b = rng.float(55, 120); x.moveTo(a, b); x.lineTo(a + rng.float(-25, 25), b + rng.float(-20, 20)); x.stroke(); }
  } else { // landscape: dark sea and a lighthouse-less headland
    x.fillStyle = '#1e2a2a'; x.fillRect(0, 120, 160, 80); x.fillStyle = '#0c1010'; x.beginPath(); x.moveTo(0, 130); x.lineTo(70, 100); x.lineTo(110, 125); x.lineTo(160, 118); x.lineTo(160, 200); x.lineTo(0, 200); x.fill();
  }
  noise(x, 160, 200, 30, rng);
  x.fillStyle = 'rgba(80,60,20,0.15)'; x.fillRect(0, 0, 160, 200); // varnish
  return cache.set(id, toTex(c, { repeat: false })).get(id);
}

export function textDecal(text, color = '#e8e2d0', chalk = true, plate = false) {
  const id = 'txt' + text + color + plate; if (cache.has(id)) return cache.get(id);
  const lines = text.split('\n');
  const [c, x] = canvas(512, 128 * lines.length); const rng = new Rng(text.length);
  if (plate) { x.fillStyle = '#2a2a24'; x.fillRect(0, 0, 512, c.height); x.strokeStyle = '#c9c2a8'; x.lineWidth = 6; x.strokeRect(8, 8, 496, c.height - 16); }
  x.font = `${chalk ? 'bold ' : ''}86px ${plate ? 'Courier New, monospace' : 'Georgia, serif'}`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  lines.forEach((ln, i) => {
    for (let k = 0; k < (chalk ? 4 : 1); k++) {
      x.globalAlpha = chalk ? 0.35 : 1; x.fillStyle = color;
      x.fillText(ln, 256 + rng.float(-2, 2), 64 + i * 128 + rng.float(-2, 2));
    }
  });
  x.globalAlpha = 1;
  if (chalk) { // erode
    const img = x.getImageData(0, 0, 512, c.height); const d = img.data;
    for (let i = 3; i < d.length; i += 4) if (rng.next() < 0.35) d[i] *= 0.3;
    x.putImageData(img, 0, 0);
  }
  return cache.set(id, toTex(c, { repeat: false })).get(id);
}

export function chalkCross() {
  if (cache.has('chalkx')) return cache.get('chalkx');
  const [c, x] = canvas(64); const rng = new Rng(5);
  x.strokeStyle = 'rgba(235,230,215,0.85)'; x.lineWidth = 5; x.lineCap = 'round';
  x.beginPath(); x.moveTo(14, 14); x.lineTo(50, 50); x.moveTo(50, 12); x.lineTo(14, 52); x.stroke();
  const img = x.getImageData(0, 0, 64, 64); for (let i = 3; i < img.data.length; i += 4) if (rng.next() < 0.3) img.data[i] *= 0.4; x.putImageData(img, 0, 0);
  return cache.set('chalkx', toTex(c, { repeat: false })).get('chalkx');
}

export function tally(count) {
  const id = 'tally' + count; if (cache.has(id)) return cache.get(id);
  const [c, x] = canvas(256, 128); const rng = new Rng(count);
  x.strokeStyle = 'rgba(40,30,25,0.85)'; x.lineWidth = 3; x.lineCap = 'round';
  let n = 0;
  for (let g = 0; n < count; g++) {
    const gx = 12 + (g % 6) * 40, gy = 14 + Math.floor(g / 6) * 38;
    for (let k = 0; k < 4 && n < count; k++, n++) { x.beginPath(); x.moveTo(gx + k * 7, gy + rng.float(-1, 1)); x.lineTo(gx + k * 7 + rng.float(-2, 2), gy + 26); x.stroke(); }
    if (n < count) { x.beginPath(); x.moveTo(gx - 3, gy + 20); x.lineTo(gx + 26, gy + 6); x.stroke(); n++; }
  }
  return cache.set(id, toTex(c, { repeat: false })).get(id);
}

export function windowPane() {
  if (cache.has('window')) return cache.get('window');
  const [c, x] = canvas(128, 256); const rng = new Rng(9);
  const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#2c3c55'); g.addColorStop(0.6, '#16202e'); g.addColorStop(1, '#0a0e14');
  x.fillStyle = g; x.fillRect(0, 0, 128, 256);
  // tree silhouettes
  x.fillStyle = '#05070a';
  for (let i = 0; i < 5; i++) { const bx = rng.float(-10, 130); x.beginPath(); x.moveTo(bx, 256); x.lineTo(bx + rng.float(-6, 6), rng.float(90, 170)); x.lineTo(bx + 8, 256); x.fill(); }
  x.fillRect(0, 210, 128, 46);
  return cache.set('window', toTex(c, { repeat: false })).get('window');
}
export function rainStreaks() {
  if (cache.has('rain')) return cache.get('rain');
  const [c, x] = canvas(128, 256); const rng = new Rng(19);
  x.clearRect(0, 0, 128, 256);
  for (let i = 0; i < 70; i++) {
    const px = rng.float(0, 128), py = rng.float(0, 256), l = rng.float(8, 40);
    const g = x.createLinearGradient(px, py, px, py + l); g.addColorStop(0, 'rgba(180,200,230,0)'); g.addColorStop(1, 'rgba(180,200,230,0.5)');
    x.strokeStyle = g; x.lineWidth = rng.float(0.8, 1.8); x.beginPath(); x.moveTo(px, py); x.lineTo(px + rng.float(-1, 1), py + l); x.stroke();
    x.fillStyle = 'rgba(200,215,240,0.35)'; x.beginPath(); x.arc(rng.float(0, 128), rng.float(0, 256), rng.float(0.8, 2), 0, 7); x.fill();
  }
  const t = toTex(c); t.colorSpace = THREE.SRGBColorSpace;
  return cache.set('rain', t).get('rain');
}

export function blueprint() {
  if (cache.has('blueprint')) return cache.get('blueprint');
  const [c, x] = canvas(256, 192); const rng = new Rng(3);
  x.fillStyle = '#1d3350'; x.fillRect(0, 0, 256, 192);
  x.strokeStyle = 'rgba(220,230,255,0.7)'; x.lineWidth = 1.5;
  x.strokeRect(40, 30, 176, 130); x.strokeRect(60, 50, 136, 90);
  for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(60 + i * 17, 50); x.lineTo(68 + i * 17, 60); x.lineTo(76 + i * 17, 50); x.stroke(); }
  x.beginPath(); x.arc(128, 95, 12, 0, 7); x.stroke();
  x.font = '11px Courier New'; x.fillStyle = 'rgba(220,230,255,0.8)'; x.fillText('ANECHOIC CHAMBER — RECORDING ROOM B', 20, 20); x.fillText('-14 dB(A)  "the floor"', 70, 178);
  noise(x, 256, 192, 18, rng);
  return cache.set('blueprint', toTex(c, { repeat: false })).get('blueprint');
}

export function pinnedNotes() {
  if (cache.has('pinned')) return cache.get('pinned');
  const [c, x] = canvas(256); const rng = new Rng(8);
  x.clearRect(0, 0, 256, 256);
  for (let i = 0; i < 14; i++) {
    x.save(); x.translate(rng.float(30, 226), rng.float(30, 226)); x.rotate(rng.float(-0.3, 0.3));
    x.fillStyle = `hsl(45,30%,${rng.float(60, 75)}%)`; x.fillRect(-26, -32, 52, 64);
    x.strokeStyle = 'rgba(30,20,10,0.6)'; for (let y = -24; y < 28; y += 6) { x.beginPath(); x.moveTo(-20, y); x.lineTo(rng.float(0, 20), y); x.stroke(); }
    x.fillStyle = '#7a1010'; x.beginPath(); x.arc(0, -28, 3, 0, 7); x.fill();
    x.restore();
  }
  // red string connecting
  x.strokeStyle = 'rgba(150,20,20,0.7)'; x.lineWidth = 1.5; x.beginPath();
  for (let i = 0; i < 8; i++) x.lineTo(rng.float(30, 226), rng.float(30, 226)); x.stroke();
  return cache.set('pinned', toTex(c, { repeat: false })).get('pinned');
}

export function bookSpines() {
  if (cache.has('books')) return cache.get('books');
  const [c, x] = canvas(256, 64); const rng = new Rng(12);
  let px = 0;
  while (px < 256) {
    const w = rng.float(5, 13); x.fillStyle = `hsl(${rng.pick([0, 20, 30, 120, 210, 40])},${rng.float(20, 45)}%,${rng.float(10, 26)}%)`;
    const top = rng.float(0, 14); x.fillRect(px, top, w - 0.8, 64 - top);
    x.fillStyle = 'rgba(200,170,90,0.4)'; x.fillRect(px + 1, top + 8, w - 3, 2);
    px += w;
  }
  noise(x, 256, 64, 14, rng);
  return cache.set('books', toTex(c)).get('books');
}
