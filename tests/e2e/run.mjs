// End-to-end bot. Drives the real game in headless Chromium (SwiftShader WebGL2) through
// window.__game: real input for movement, story actions via the same interaction callbacks the
// player triggers with E, and accelerated simulation (game.simulate) for waiting.
// Covers: boot, movement/collision, every story step, all three endings, death + checkpoint
// retry, Listener hearing/sight/hiding behaviour, and the performance budget.
// Usage: node tests/e2e/run.mjs [baseUrl]   (needs the dev server or `vite preview` running)
import { launch } from '../../tools/browser.mjs';
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:5173/';
const OUT = new URL('./out/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const results = [];
let browser;

async function freshPage() {
  const p = await browser.newPage();
  await p.setViewport({ width: 960, height: 540 });
  p.errors = [];
  p.on('pageerror', (e) => p.errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') p.errors.push(m.text()); });
  await p.goto(BASE + '?bot=1', { waitUntil: 'load' });
  await p.waitForFunction(() => window.__game && window.__game.mode === 'title', { timeout: 90000 });
  await p.evaluate(() => { localStorage.clear(); window.__game.newGame(); });
  return p;
}
async function test(name, fn) {
  const t0 = Date.now();
  let page;
  try {
    page = await freshPage();
    const info = await fn(page);
    if (page.errors.length) throw new Error('page errors: ' + [...new Set(page.errors)].join(' | '));
    results.push({ name, ok: true, ms: Date.now() - t0, info });
    console.log(`  ✓ ${name} (${((Date.now() - t0) / 1000).toFixed(1)}s)${info ? ' ' + JSON.stringify(info) : ''}`);
  } catch (e) {
    results.push({ name, ok: false, ms: Date.now() - t0, error: String(e.message || e) });
    console.log(`  ✗ ${name}: ${e.message || e}`);
    if (page) await page.screenshot({ path: `${OUT}${name.replace(/\W+/g, '_')}.png` }).catch(() => {});
  } finally { if (page) await page.close().catch(() => {}); }
}
const assert = (c, msg) => { if (!c) throw new Error(msg); };

// Shared in-page helpers, injected as a string so each evaluate can use them.
const H = `
  const g = window.__game, S = g.story, L = g.listener;
  const act = (id) => { const ok = g.interactWith(id); if (!ok) throw new Error('no target ' + id); };
  const sim = (s) => g.simulate(s);
  const until = (cond, max, step = 0.5) => { let t = 0; while (!cond() && t < max) { g.simulate(step); t += step; } return cond(); };
  const safe = () => { S.flags.mimicDone = true; L.toBackstage(); g.director.phase = 'relax'; g.director.phaseT = 0; g.director.relaxFor = 9999; };
  const toCellarKey = () => {
    act('note_executor'); g.teleport(1, 15.5, 20.5); sim(5);
    g.teleport(1, 15.5, 14.5, 1.57); S.flags.clockSeen = true; until(() => S.flags.clockOpen, 40);
    if (!S.flags.clockOpen) throw new Error('clock never opened');
    act('clock'); act('study_door'); sim(1); act('journal_ada'); act('cyl_ada');
    g.teleport(2, 19.6, 10.4, 1.57); act('music_box'); sim(3.5);
  };
  const toPower = () => {
    toCellarKey(); safe(); S.flags.mimicDone = true;
    act('cellar_door'); g.teleport(0, 12.0, 9.0, 3.14); sim(1); safe();
    g.teleport(0, 21.0, 10.0); act('generator'); sim(3); safe();
  };
  const sealIt = () => {
    g.teleport(0, 7.6, 20.4); act('tape_vault'); sim(1.5); act('tape_vault');
    g.teleport(0, 16.6, 20.2, -1.57); act('reel_deck');
    g.teleport(0, 11.5, 20.8); act('hide_lab'); S.flags.lure;
    const inside = until(() => S.flags.listenerInChamber, 120, 0.5);
    if (!inside) throw new Error('listener never entered chamber; state=' + L.state + ' at ' + L.x.toFixed(1) + ',' + L.z.toFixed(1));
    act('hide_lab'); g.player.torchOn = false; g.player.crouching = true; g.teleport(0, 17.4, 18.5, -1.57); act('chamber_door');
    until(() => S.flags.sealed, 10, 0.25);
    sim(2);
  };
`;
const run = (page, body) => page.evaluate(`(() => { ${H}\n${body} })()`);

browser = await launch({ width: 960, height: 540 });
console.log('E2E — The Quiet at Marlowe House');

await test('boots to title, starts, renders within draw-call budget', async (p) => {
  await new Promise((r) => setTimeout(r, 2500));
  const r = await run(p, `return { mode: g.mode, calls: g.post.sceneCalls, interactables: g.interaction.targets.length, objective: S.objective };`);
  assert(r.mode === 'playing', 'mode ' + r.mode);
  assert(r.calls > 10 && r.calls < 150, 'draw calls ' + r.calls);
  assert(r.interactables > 40, 'targets ' + r.interactables);
  return r;
});

await test('real keyboard movement, wall collision, foyer trigger slams the door', async (p) => {
  const r = await run(p, `
    g.teleport(1, 15.5, 22.6, 0);
    g.input.simKey('KeyW', true); sim(2.0); g.input.simKey('KeyW', false);
    const z1 = g.player.z;
    sim(4);
    // walk into the west wall of the foyer: must stop at the wall (x=12) plus radius
    g.teleport(1, 13.0, 20.5, Math.PI / 2); g.input.simKey('KeyW', true); sim(3); g.input.simKey('KeyW', false);
    return { z1, x2: g.player.x, front: g.world.doorById.get('front_door').open, fired: [...S.firedTriggers], started: !!S.flags.started };`);
  assert(r.z1 < 20.5, 'did not move forward: z=' + r.z1);
  assert(r.x2 > 12.2 && r.x2 < 12.6, 'wall collision failed x=' + r.x2);
  assert(r.front < 0.05 && r.started, 'front door did not slam');
  return r;
});

await test('audio engine: context starts on gesture and every procedural sound synthesizes', async (p) => {
  await p.mouse.click(480, 270); // user gesture → AudioContext allowed
  const r = await run(p, `
    g.audio.init();
    const a = g.audio, pos = new (g.camera.position.constructor)(15, 1.5, 18);
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(a)).filter((n) => n.startsWith('s_')).map((n) => n.slice(2));
    const failed = [];
    for (const n of names) { try { a.play(n, { pos, text: 'hello there friend', surface: 'wood' }); } catch (e) { failed.push(n + ': ' + e.message); } }
    for (const surface of ['wood', 'wood_dark', 'tile_check', 'concrete', 'stone', 'grate']) a.play('footstep', { surface, creak: true, puddle: true });
    toCellarKey(); sim(5);   // exercises per-frame update with the Listener hum active
    return { ready: a.ready, state: a.ctx && a.ctx.state, sounds: names.length, failed, rate: a.ctx.sampleRate };`);
  assert(r.ready, 'audio not ready');
  assert(r.failed.length === 0, 'sounds failed: ' + r.failed.join('; '));
  return r;
});

await test('Act I: clock strikes 13 → study key → journal → music box wakes the Listener', async (p) => {
  const r = await run(p, `toCellarKey(); return { keys: [...S.inv.keys], obj: S.objective, awake: !!S.flags.listenerAwake, Lstate: L.state, cyl: S.inv.cylinders.size, cp: S.checkpoint.name };`);
  assert(r.keys.includes('study_key') && r.keys.includes('cellar_key'), 'keys ' + r.keys);
  assert(r.awake && r.Lstate !== 'dormant' && r.Lstate !== 'backstage', 'listener not awake: ' + r.Lstate);
  assert(r.obj === 'cellar', 'objective ' + r.obj);
  return r;
});

await test('Listener hears a thrown bottle and goes to investigate it', async (p) => {
  const r = await run(p, `
    toCellarKey(); safe(); g.director.stop();
    g.teleport(1, 15.5, 21.0, 0);
    L.placeAt(1, 15.5, 22.0, Math.PI); L.patrolTo({ f: 1, x: 15.5, z: 22.5 }); sim(0.2);
    // throw from the north end of the hall, south toward the foyer: the shatter is loud and close to it
    g.teleport(1, 15.5, 10.8, Math.PI); g.player.pitch = 0.15; g.player.torchOn = false; S.inv.bottles = 1; S.throwBottle();
    const before = L.state; let shard = null; const t0 = g.time;
    until(() => (shard = g.listener.heard && g.listener.heard.kind === 'glass' && g.listener.heard.t >= t0 ? g.listener.heard : null), 3, 0.1);
    const s1 = L.state, goal = L.goal && { x: +L.goal.x.toFixed(1), z: +L.goal.z.toFixed(1) };
    return { before, s1, goal, shard: shard && { x: +shard.x.toFixed(1), z: +shard.z.toFixed(1) } };`);
  assert(r.shard, 'listener never heard the glass');
  assert(r.s1 === 'investigate', 'listener state ' + r.s1);
  assert(Math.hypot(r.goal.x - r.shard.x, r.goal.z - r.shard.z) < 0.5, 'investigating something other than the shatter ' + JSON.stringify(r));
  return r;
});

await test('Listener sees the player in torchlight, chases, and catches → death → checkpoint retry', async (p) => {
  const r = await run(p, `
    toCellarKey(); safe(); g.director.stop();
    g.teleport(1, 15.5, 16.0, 0); g.player.torchOn = true;
    L.placeAt(1, 15.5, 12.0, 0); L.yaw = 0; L.patrolTo({ f: 1, x: 15.5, z: 13 });
    const seen = until(() => L.state === 'chase', 6, 0.1);
    until(() => g.mode === 'dead', 10, 0.1);
    return { seen, mode: g.mode, deaths: S.stats.deaths, cause: g.lastDeathCause };`);
  assert(r.seen, 'never started chase');
  assert(r.mode === 'dead', 'never caught, mode ' + r.mode);
  assert(r.cause === 'seen', 'death screen should explain it SAW you, got ' + r.cause);
  await new Promise((res) => setTimeout(res, 400));
  const r2 = await run(p, `const scr = !!document.querySelector('.death'); g.retry(); return { scr, mode: g.mode, keys: [...S.inv.keys], Lstate: L.state, hidden: g.player.hidden };`);
  assert(r2.scr, 'no death screen'); assert(r2.mode === 'playing', 'retry mode ' + r2.mode);
  assert(r2.keys.includes('cellar_key'), 'checkpoint lost key');
  return { ...r, ...r2 };
});

await test('Hiding: unseen + held breath → Listener searches nearby and leaves without finding you', async (p) => {
  const r = await run(p, `
    toCellarKey(); safe(); g.director.stop();
    g.teleport(2, 19.3, 7.0); act('hide_nursery');
    L.placeAt(2, 15.0, 3.0, 0); L.investigate({ f: 2, x: 20.0, z: 7.5 }, true);
    const states = new Set(); let held = false, minD = 99;
    for (let i = 0; i < 160 && g.mode === 'playing'; i++) {
      // play by Clara's rule 5: hold your breath when it STOPS OUTSIDE (it inhales, then stands at the doors)
      const d = Math.hypot(L.x - g.player.x, L.z - g.player.z); minD = Math.min(minD, d);
      const want = (!!L.inspecting || d < 1.6) && g.player.breath > 0.05;
      if (want !== held) { g.input.simKey('Space', want); held = want; }
      g.simulate(0.25); states.add(L.state);
    }
    g.input.simKey('Space', false);
    return { states: [...states], mode: g.mode, hidden: !!g.player.hidden, minD: +minD.toFixed(2) };`);
  assert(r.mode === 'playing', 'player was caught while hidden & holding breath ' + JSON.stringify(r));
  assert(r.states.includes('search') || r.states.includes('investigate'), 'listener never searched: ' + r.states);
  return r;
});

await test('It learns: after 3 bottle lures it traces the throw; a habitual hiding spot is checked longer but stays survivable', async (p) => {
  const r = await run(p, `
    toCellarKey(); safe(); g.director.stop();
    const D = g.director, traced = [];
    for (let i = 0; i < 3; i++) {
      L.placeAt(1, 15.5, 22.0, Math.PI); L.patrolTo({ f: 1, x: 15.5, z: 22.5 }); sim(0.2);
      g.teleport(1, 15.5, 10.8, Math.PI); g.player.pitch = 0.15; g.player.torchOn = false; S.inv.bottles = 1; S.throwBottle();
      until(() => L.state === 'investigate', 3, 0.1);
      g.teleport(2, 4.5, 16.5, 0); // slip away upstairs; only the throw position is left behind
      const n0 = D.learn.glass; until(() => D.learn.glass > n0, 20, 0.1);
      traced.push({ glass: D.learn.glass, goalZ: L.goal ? +L.goal.z.toFixed(1) : null, state: L.state });
    }
    const told = !!D.learn.told.glass;
    // habit: pretend you've already survived two inspections in the nursery wardrobe
    D.learn.spots.hide_nursery = 2;
    const chance = D.inspectChance(0.7, { id: 'hide_nursery' }), other = D.inspectChance(0.7, { id: 'hide_guest' });
    g.teleport(2, 19.3, 7.0); act('hide_nursery');
    L.placeAt(2, 15.0, 3.0, 0); L.investigate({ f: 2, x: 20.0, z: 7.5 }, true);
    let held = false, maxDur = 0;
    for (let i = 0; i < 160 && g.mode === 'playing'; i++) {
      const d = Math.hypot(L.x - g.player.x, L.z - g.player.z);
      if (L.inspecting) maxDur = Math.max(maxDur, L.inspectDur);
      const want = (!!L.inspecting || d < 1.6) && g.player.breath > 0.05;
      if (want !== held) { g.input.simKey('Space', want); held = want; }
      g.simulate(0.25);
    }
    g.input.simKey('Space', false);
    return { traced, told, chance, other, maxDur: +maxDur.toFixed(1), mode: g.mode };`);
  assert(r.traced.every((t, i) => t.glass === i + 1), 'glass lures not counted ' + JSON.stringify(r.traced));
  assert(r.traced[0].goalZ > 18 && r.traced[1].goalZ > 18, 'it traced the throw before learning ' + JSON.stringify(r.traced));
  assert(r.traced[2].goalZ < 15, 'third lure: did not turn toward the throw origin ' + JSON.stringify(r.traced));
  assert(r.told, 'glass unlock was never telegraphed');
  assert(r.chance > r.other, 'habit spot not more suspicious');
  assert(r.mode === 'playing', 'habit made hiding unsurvivable ' + JSON.stringify(r));
  return r;
});

await test('Choice: answering the voice behind the door → ending "Answered"', async (p) => {
  const r = await run(p, `
    toCellarKey(); safe(); S.flags.mimicDone = false;
    g.teleport(1, 15.0, 13.0, Math.PI / 2); sim(0.5);
    const started = !!S.mimic; until(() => S.mimic && S.mimic.canAnswer, 8, 0.25);
    act('answer'); sim(3);
    return { started, mode: g.mode, ending: g.endingId };`);
  assert(r.started, 'mimic event did not start');
  assert(r.mode === 'ending' && r.ending === 'answered', 'ending ' + r.ending);
  return r;
});

await test('Choice: opening the door on the voice starts a chase', async (p) => {
  const r = await run(p, `
    toCellarKey(); safe(); S.flags.mimicDone = false;
    g.teleport(1, 14.5, 13.5, Math.PI / 2); sim(0.5); until(() => S.mimic && S.mimic.canAnswer, 8, 0.25);
    act('d_dining_hall'); sim(0.2);
    return { state: L.state, mimic: !!S.mimic };`);
  assert(r.state === 'chase', 'state ' + r.state);
  return r;
});

await test('Act III: power → vault → reel → lure → seal → ending "The Quiet"', async (p) => {
  const r = await run(p, `
    toPower();
    const power = !!S.flags.power;
    sealIt();
    const sealed = !!S.flags.sealed, front = !!S.flags.frontOpen, obj = S.objective;
    act('front_door'); sim(1);
    return { power, sealed, front, obj, ending: g.endingId, mode: g.mode };`);
  assert(r.power, 'no power'); assert(r.sealed, 'not sealed'); assert(r.front, 'front door not opened');
  assert(r.ending === 'sealed', 'ending ' + r.ending);
  return r;
});

await test('True ending: all three cylinders played into the sealed room → "The Voices Come Home"', async (p) => {
  const r = await run(p, `
    toPower(); act('cyl_thomas'); act('cyl_clara');
    sealIt();
    const obj = S.objective;
    act('reel_deck'); sim(36);
    act('front_door'); sim(1);
    return { cyl: S.inv.cylinders.size, obj, freed: !!S.flags.voicesFreed, ending: g.endingId };`);
  assert(r.cyl === 3 && r.freed, 'voices not freed');
  assert(r.ending === 'voices', 'ending ' + r.ending);
  return r;
});

await test('Checkpoint persists across reload (Continue)', async (p) => {
  await run(p, `toCellarKey(); S.saveCheckpoint('test');`);
  await p.reload({ waitUntil: 'load' });
  await p.waitForFunction(() => window.__game && window.__game.mode === 'title', { timeout: 90000 });
  const r = await p.evaluate(() => { const has = !!document.getElementById('b-continue'); window.__game.continueGame(); const S = window.__game.story; return { has, keys: [...S.inv.keys], obj: S.objective, mode: window.__game.mode }; });
  assert(r.has, 'no Continue button'); assert(r.keys.includes('cellar_key'), 'keys not restored');
  return r;
});

await test('Director pacing: menace rises and relief follows (no endless hunt)', async (p) => {
  const r = await run(p, `
    toCellarKey(); g.director.relaxFor = 5; g.director.phase = 'relax'; L.toBackstage();
    // player stands still in the gallery, unhidden, torch off; simulate 6 minutes
    g.teleport(2, 9.5, 2.5); g.player.torchOn = false;
    let caught = 0; const phases = {};
    for (let i = 0; i < 360 * 2; i++) { g.simulate(0.5); phases[g.director.phase] = (phases[g.director.phase] || 0) + 1; if (g.mode !== 'playing') { caught++; g.retry(); g.teleport(2, 9.5, 2.5); g.player.torchOn = false; } }
    const h = g.director.history; const maxM = Math.max(...h.map((x) => x.menace));
    return { phases, maxMenace: maxM, caught, scripted: g.director.scripted, Lstate: L.state, emerged: h.filter((x) => x.state !== 'backstage').length };`);
  assert(r.phases.relax > 20 && (r.phases.build || 0) > 10, 'phases ' + JSON.stringify(r));
  return r;
});

const passed = results.filter((r) => r.ok).length;
console.log(`\n${passed}/${results.length} passed`);
fs.writeFileSync(`${OUT}results.json`, JSON.stringify({ date: new Date().toISOString(), base: BASE, results }, null, 2));
await browser.close();
process.exit(passed === results.length ? 0 : 1);
