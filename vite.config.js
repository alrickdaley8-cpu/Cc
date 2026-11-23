import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Source lives in src/ so the repository root can hold the static Pages build.
export default defineConfig({
  root: fileURLToPath(new URL('./src', import.meta.url)),
  base: './',
  build: { outDir: '../dist', emptyOutDir: true },
  server: { host: '0.0.0.0', allowedHosts: true },
});
