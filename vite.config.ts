import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// A service worker needs a real, stable scope, so the base has to be a concrete
// path — a relative './' base cannot give it one. Root by default, which is what
// Cloudflare Pages and a custom domain serve from.
//
// Deploying under a subdirectory (a GitHub Pages *project* site, say) means
// building with that path, trailing slash included:
//     BASE_PATH=/safari/ npm run build
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Safari Journal (Ryan Party 2026)',
        short_name: 'Safari Journal',
        description:
          'Itinerary, destination guides, wildlife field guide and documents for the Ryan Party safari, September 2026.',
        theme_color: '#2C2416',
        background_color: '#FAF6F1',
        display: 'standalone',
        orientation: 'portrait',
        start_url: BASE,
        scope: BASE,
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the whole site, photos and trip PDFs included. This is the
        // point of the exercise: Ruckomechi and Kings Camp have little or no
        // connectivity, so nothing may be left to fetch on demand.
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico,webmanifest,pdf}'],
        // The bundled itinerary PDF is ~1 MB; the 2 MB default would drop it.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        // Off in dev: an autoUpdate worker caching a Vite dev server is a
        // reliable way to spend an afternoon debugging stale modules.
        enabled: false,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
