import { defineConfig } from 'vite';

// Relative asset URLs work both at the domain root and under GitHub Pages' /Cc/ path.
export default defineConfig({ base: './', server: { host: '0.0.0.0', allowedHosts: true } });
