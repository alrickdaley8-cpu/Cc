// Ad-hoc harness: node tests/e2e/debug.mjs "<js using helpers from run.mjs>"
import { launch } from '../../tools/browser.mjs';
import fs from 'node:fs';
const src = fs.readFileSync(new URL('./run.mjs', import.meta.url), 'utf8');
const H = src.slice(src.indexOf('const H = `') + 11, src.indexOf('`;\nconst run'));
const b = await launch({ width: 640, height: 360 });
const p = await b.newPage();
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await p.goto('http://localhost:5173/?bot=1', { waitUntil: 'load' });
await p.waitForFunction(() => window.__game && window.__game.mode === 'title', { timeout: 90000 });
await p.evaluate(() => { localStorage.clear(); window.__game.newGame(); });
const r = await p.evaluate(`(() => { ${H}\n${process.argv[2]} })()`);
console.log(JSON.stringify(r, null, 1));
await b.close();
