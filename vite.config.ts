import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works from any subpath
// (GitHub Pages project sites, a file:// open, an S3 prefix, etc.)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
