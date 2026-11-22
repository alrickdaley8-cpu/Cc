import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const distDir = path.join(rootDir, 'client', 'dist');

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('[sync-root-build] client/dist/index.html not found. Run client build first.');
  process.exit(1);
}

// Clean previous hashed bundle files in root /assets so stale files never accumulate
const rootAssets = path.join(rootDir, 'assets');
fs.rmSync(rootAssets, { recursive: true, force: true });

// Copy client/dist/assets -> /assets
const distAssets = path.join(distDir, 'assets');
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, rootAssets, { recursive: true });
}

// Copy index.html -> /index.html and /404.html (SPA/subpath fallback) + /.nojekyll
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, '404.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

console.log('[sync-root-build] Synced client/dist -> repo root (index.html, 404.html, .nojekyll, assets/)');
