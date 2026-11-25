// Pacing log: a bot "player" lives in Marlowe House for N simulated minutes after the
// Listener wakes, and we record what the Director does to it. It is deliberately a
// cautious-but-imperfect player:
//   - walks crouched (real keyboard input → real footstep noise) between random rooms,
//     torch on, cranking when the battery runs low;
//   - when the Listener is close/searching (or it is spotted) it runs to the nearest hiding spot,
//     and holds its breath by Clara's rule ("when it stops outside");
//   - leaves the hiding spot once the Listener has gone backstage or is far away;
//   - if caught: retry from checkpoint (counted as a death).
// Output: docs/pacing.json (timeline + summary) and a summary printed to stdout.
// Usage: node tools/pacing.mjs [baseUrl] [minutes=20] [seed-ish label]
import { launch } from './browser.mjs';
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:5173/';
const MINUTES = +(process.argv[3] || 20);
const browser = await launch({ width: 640, height: 360 });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE + '?bot=1', { waitUntil: 'load' });
await page.waitForFunction(() => window.__game && window.__game.mode === 'title', { timeout: 90000 });

const result = await page.evaluate(async (MINUTES) => {
  const g = window.__game, S = g.story, L = g.listener, W = g.world, P = g.player, D = g.director, I = g.input;
  localStorage.clear(); g.newGame();
  const act = (id) => { if (!g.interactWith(id)) throw new Error('no target ' + id); };
  // skip Act I quickly (same route as the e2e bot), then hand over to the wanderer
  act('note_executor'); g.teleport(1, 15.5, 20.5); g.simulate(5);
  g.teleport(1, 15.5, 14.5, 1.57); S.flags.clockSeen = true;
  for (let t = 0; t < 40 && !S.flags.clockOpen; t += 0.5) g.simulate(0.5);
  act('clock'); act('study_door'); g.simulate(1); act('journal_ada'); act('cyl_ada');
  g.teleport(2, 19.6, 10.4, 1.57); act('music_box'); g.simulate(3.5);
  S.flags.mimicDone = true; // keep the scripted hall event out of the pacing sample

  const spots = [...S.hideSpots.values()];
  const keys = new Set();
  const press = (k, on) => { if (on && !keys.has(k)) { I.simKey(k, true); keys.add(k); } else if (!on && keys.has(k)) { I.simKey(k, false); keys.delete(k); } };
  const release = () => { for (const k of [...keys]) press(k, false); };
  let path = null, goal = null, stuckT = 0, lastPos = null, hidingIn = null, hideT = 0;
  const ev = [], deaths = [], hides = [];
  let prevPhase = D.phase, prevState = L.state, chaseN = 0, inspN = 0, learned = [];
  const dt = 1 / 30, total = MINUTES * 60;
  const t0 = g.time;
  const newGoal = () => {
    for (let i = 0; i < 20; i++) {
      const f = Math.random() < 0.65 ? P.floor : [0, 1, 2][Math.floor(Math.random() * 3)];
      if (f === 0 && !S.inv.keys.has('cellar_key')) continue;
      const c = W.randomWalkableNear(f, 15, 12, 0, 16);
      if (!c) continue;
      const pth = W.findPath({ f: P.floor, x: P.x, z: P.z }, c);
      if (pth && pth.length > 2) { goal = c; path = pth; return; }
    }
  };
  const nearestSpot = () => {
    let best = null, bd = 1e9;
    for (const s of spots) {
      if (s.floor !== P.floor) continue;
      const pth = W.findPath({ f: P.floor, x: P.x, z: P.z }, { f: s.floor, x: s.exitPos.x, z: s.exitPos.z });
      const d = W.pathLength({ f: P.floor, x: P.x, z: P.z }, pth);
      if (d < bd) { bd = d; best = { s, pth, d }; }
    }
    return best;
  };
  window.__bus_learned = [];
  let simT = 0; const hist = []; let sampleT = 0, lastCause = null;
  // why a hidden player gets found: track what happened just before
  for (let step = 0; simT < total; step++) {
    const t = simT;
    if (g.mode === 'dead') {
      release(); deaths.push({ t: Math.round(t), hidden: !!hidingIn, phase: D.phase, cause: lastCause, screen: g.lastDeathCause, hideT: +hideT.toFixed(1), breath: +P.breath.toFixed(2) });
      g.simulate(0.2); simT += 0.2; g.retry(); hidingIn = null; path = null; S.flags.mimicDone = true; continue;
    }
    if (g.mode !== 'playing') { g.simulate(0.2); simT += 0.2; continue; }
    const d = L.active ? Math.hypot(L.x - P.x, L.z - P.z) + (L.f !== P.floor ? 30 : 0) : 99;
    const threat = L.active && L.f === P.floor && (L.state === 'chase' || (d < 9 && (L.state === 'search' || L.state === 'investigate')) || d < 5);
    if (hidingIn) {
      hideT += dt;
      const want = (!!L.inspecting || d < 1.6) && P.breath > 0.05;
      press('Space', want);
      if (hideT > 4 && (!L.active || d > 14 || L.state === 'leave') ) { press('Space', false); act(hidingIn.id); hidingIn = null; path = null; }
    } else if (threat && !path?.toHide) {
      const ns = nearestSpot();
      if (ns && ns.d < 14) { path = ns.pth; path.toHide = ns.s; goal = null; }
    } else if (!path) newGoal();
    if (!hidingIn && path) {
      // follow the path with real input: face the next node, hold W (crouched unless fleeing)
      const n = path[0];
      if (n.f !== P.floor && Math.hypot(n.x - P.x, n.z - P.z) < 1.2) path.shift();
      const dx = n.x - P.x, dz = n.z - P.z, dd = Math.hypot(dx, dz);
      if (dd < 0.35) { path.shift(); if (!path.length) {
        if (path.toHide) { release(); act(path.toHide.id); hidingIn = path.toHide; hideT = 0; hides.push({ t: Math.round(t), id: hidingIn.id }); }
        path = null;
      } }
      else {
        P.yaw = Math.atan2(-dx, -dz); P.pitch = -0.1;
        const flee = !!path.toHide && (L.state === 'chase' || d < 4);
        press('KeyW', true); press('ShiftLeft', flee); press('KeyC', !flee);
      }
      // unstick
      if (lastPos && Math.hypot(P.x - lastPos.x, P.z - lastPos.z) < 0.002) stuckT += dt; else stuckT = 0;
      if (stuckT > 2.5) { path = null; stuckT = 0; release(); }
    } else if (!hidingIn) { press('KeyW', false); }
    press('KeyR', !hidingIn && P.battery < 0.25 && !threat);
    lastPos = { x: P.x, z: P.z };
    const wasChase = L.state === 'chase', sawHide = L.sawHide;
    g.simulate(dt, dt); simT += dt;
    if (hidingIn && L.state === 'chase' && !wasChase) lastCause = sawHide === hidingIn ? 'saw-you-hide' : L.inspecting || L.prevState === 'search' ? 'heard-breath-during-inspect' : 'other:' + L.prevState;
    if (hidingIn && wasChase && L.sawHide === hidingIn && !lastCause) lastCause = 'saw-you-hide(chase)';
    if (!hidingIn && L.state === 'chase' && !wasChase) lastCause = L.seesPlayer ? 'seen' : 'heard';
    sampleT += dt; if (sampleT >= 1) { sampleT -= 1; hist.push({ t: Math.round(simT), menace: D.menace, phase: D.phase }); }
    if (D.phase !== prevPhase) { ev.push({ t: Math.round(t), phase: D.phase }); prevPhase = D.phase; }
    if (L.state !== prevState) { if (L.state === 'chase') chaseN++; prevState = L.state; }
    if (L.inspecting && !ev.inspFlag) { inspN++; ev.inspFlag = true; } else if (!L.inspecting) ev.inspFlag = false;
  }
  release();
  const phaseSecs = {}; for (const h of hist) phaseSecs[h.phase] = (phaseSecs[h.phase] || 0) + 1;
  const peaks = ev.filter((e) => e.phase === 'peak').map((e) => e.t);
  const gaps = peaks.slice(1).map((t, i) => t - peaks[i]);
  const firstPeak = peaks[0] ?? null;
  let longestCalm = 0, run = 0; for (const h of hist) { if (h.menace < 0.2) { run++; longestCalm = Math.max(longestCalm, run); } else run = 0; }
  let longestTense = 0; run = 0; for (const h of hist) { if (h.menace >= 0.5) { run++; longestTense = Math.max(longestTense, run); } else run = 0; }
  // minute-by-minute mean menace
  const perMin = []; for (let m = 0; m < MINUTES; m++) { const s = hist.filter((h) => h.t >= m * 60 && h.t < (m + 1) * 60); perMin.push(s.length ? +(s.reduce((a, h) => a + h.menace, 0) / s.length).toFixed(2) : 0); }
  return {
    minutes: MINUTES,
    summary: {
      phaseSeconds: phaseSecs, peaks: peaks.length, firstPeakAt: firstPeak,
      peakGapMean: gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null,
      peakGapMin: gaps.length ? Math.min(...gaps) : null, peakGapMax: gaps.length ? Math.max(...gaps) : null,
      chases: chaseN, inspections: inspN, hides: hides.length, deaths: deaths.length, deathsWhileHidden: deaths.filter((x) => x.hidden).length,
      longestCalmSec: longestCalm, longestTenseSec: longestTense, learned: { ...D.learn.told },
    },
    menacePerMinute: perMin, phaseEvents: ev, deaths, hides,
  };
}, MINUTES);
result.errors = errors;
await browser.close();
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/pacing.json', JSON.stringify(result, null, 1));
console.log(JSON.stringify(result.summary, null, 1));
console.log('menace/min', result.menacePerMinute.join(' '));
if (errors.length) console.log('PAGE ERRORS', errors);
