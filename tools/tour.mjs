// Visual + performance gate. Starts a game in headless Chromium, visits fixed viewpoints, and for
// each records a screenshot, mean/percentile luminance, draw calls and triangles.
// Usage: node tools/tour.mjs [baseUrl] [outDir] [onlyName]
import { launch } from './browser.mjs';
import fs from 'node:fs';

const base = process.argv[2] || 'http://localhost:5173/';
const out = process.argv[3] || '/tmp/shots/tour';
const only = process.argv[4];
fs.mkdirSync(out, { recursive: true });

export const VIEWS = [
  { name: 'foyer', f: 1, x: 15.5, z: 22.4, yaw: 0, pitch: 0.05 },
  { name: 'hall_clock', f: 1, x: 14.7, z: 16.2, yaw: -0.5, pitch: 0.05 },
  { name: 'parlour', f: 1, x: 10.2, z: 21.5, yaw: 1.4, pitch: -0.05 },
  { name: 'dining', f: 1, x: 11.8, z: 15.5, yaw: 0.9, pitch: -0.15 },
  { name: 'kitchen', f: 1, x: 8.5, z: 7.5, yaw: 0.7, pitch: -0.1 },
  { name: 'study', f: 1, x: 19.2, z: 11.0, yaw: 2.5, pitch: -0.15 },
  { name: 'gallery', f: 2, x: 14.5, z: 2.7, yaw: -1.57, pitch: 0 },
  { name: 'nursery', f: 2, x: 21.5, z: 5.6, yaw: 3.14, pitch: -0.2 },
  { name: 'master', f: 2, x: 10.5, z: 10.8, yaw: 0.9, pitch: -0.05 },
  { name: 'cellar', f: 0, x: 12.0, z: 9.2, yaw: 3.14, pitch: -0.1, power: false },
  { name: 'lab_power', f: 0, x: 11.5, z: 16.0, yaw: 3.6, pitch: -0.1, power: true },
  { name: 'chamber', f: 0, x: 19.6, z: 18.5, yaw: -1.57, pitch: -0.05, power: true },
  { name: 'listener', f: 1, x: 15.5, z: 16.5, yaw: 0, pitch: 0.15, listener: { f: 1, x: 15.5, z: 13.0, yaw: Math.PI / 2, state: 'scripted' } },
  { name: 'listener_close', f: 1, x: 15.5, z: 15.0, yaw: 0, pitch: 0.3, listener: { f: 1, x: 15.4, z: 13.4, yaw: 0, state: 'scripted' } },
  { name: 'stairs_up', f: 1, x: 14.9, z: 11.5, yaw: 0, pitch: 0.25 },
];

const b = await launch({ width: 960, height: 540 });
const p = await b.newPage();
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
await p.goto(base + '?bot=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__game && window.__game.mode === 'title', { timeout: 60000 });
await p.evaluate(() => { localStorage.clear(); window.__game.newGame(); window.__game.fadeTarget = 0; window.__game.fade = 0; });
const results = [];
for (const v of VIEWS) {
  if (only && v.name !== only) continue;
  await p.evaluate((v) => {
    const g = window.__game;
    if (g.mode !== 'playing') { g.ui.hideScreen(); g.setMode('playing'); g.player.frozen = false; g.player.lookOverride = null; g.listener.toBackstage(); }
    g.setPower(!!v.power); g.flags.power = !!v.power;
    g.teleport(v.f, v.x, v.z, v.yaw); g.player.pitch = v.pitch; g.player.torchOn = true; g.player.battery = 1;
    const L = g.listener;
    if (v.listener) { L.placeAt(v.listener.f, v.listener.x, v.listener.z, v.listener.yaw ?? Math.PI); if (v.listener.state === 'scripted') { g.director.stop(); L.scripted([{ f: v.listener.f, x: v.listener.x, z: v.listener.z }], null, false); L.yaw = v.listener.yaw ?? 0; } else { L.setState(v.listener.state || 'patrol'); L.goal = null; } L.listenT = 3; }
    else { L.toBackstage(); }
    g.fade = 0; g.fadeTarget = 0;
  }, v);
  await new Promise((r) => setTimeout(r, 1800));
  const file = `${out}/${v.name}.png`;
  await p.screenshot({ path: file });
  const stats = await p.evaluate(() => {
    const g = window.__game, c = g.renderer.domElement;
    const w = 160, h = 90, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const x = cv.getContext('2d'); x.drawImage(c, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data; const L = [];
    for (let i = 0; i < d.length; i += 4) L.push((0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255);
    L.sort((a, b) => a - b);
    const mean = L.reduce((a, b) => a + b, 0) / L.length;
    return { mean: +mean.toFixed(3), p50: +L[L.length >> 1].toFixed(3), p95: +L[Math.floor(L.length * 0.95)].toFixed(3), calls: g.post.sceneCalls, tris: g.post.sceneTris };
  });
  results.push({ view: v.name, ...stats });
  console.log(v.name.padEnd(12), JSON.stringify(stats));
}
fs.writeFileSync(`${out}/results.json`, JSON.stringify({ results, errors }, null, 2));
if (errors.length) console.log('ERRORS:\n' + [...new Set(errors)].join('\n'));
await b.close();
