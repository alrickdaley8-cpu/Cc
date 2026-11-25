import { defineConfig } from 'vite';
// Static site; relative base so the built game can be opened from any sub-path (e.g. GitHub Pages).
export default defineConfig({
  base: './',
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
  build: { target: 'es2022', chunkSizeWarningLimit: 1200 },
});
