import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: { port: 3000 },
  optimizeDeps: {
    include: ['tesseract.js/dist/tesseract.min.js'],
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Product Identifier',
        short_name: 'Product Identifier',
        description: 'Product Identifier',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ],
        display: 'standalone'
      },
      registerType: 'autoUpdate'
    })
  ]
})
