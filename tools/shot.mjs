// Usage: node tools/shot.mjs <url> <out.png> [waitMs] [evalJs]
import { launch } from './browser.mjs';
const [url, out, wait = '4000', js] = process.argv.slice(2);
const b = await launch();
const p = await b.newPage();
const logs = [];
p.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
p.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await p.goto(url, { waitUntil: 'load' });
await new Promise((r) => setTimeout(r, +wait));
if (js) { const r = await p.evaluate(js); if (r !== undefined) console.log('eval:', JSON.stringify(r)); await new Promise((r) => setTimeout(r, 1500)); }
await p.screenshot({ path: out });
console.log(logs.slice(-30).join('\n'));
await b.close();
