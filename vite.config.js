import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister:'auto',
      // strategies:'generateSW',
      strategies:'injectManifest',
      srcDir:'src',
      filename:'sw.js',
      // registerType: 'autoUpdate',
      registerType:'prompt',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'My Awesome App - Yulius',
        short_name: 'MyApp',
        description: 'My Awesome App description - Yulius',
        theme_color: '#ffffff',
				icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'  
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/6557178bbd4bcef8b61208ce.mockapi.io\/article\/article$/,
            /*
            Cache Strategies -> https://wildanjisung.notion.site/Cache-Strategies-9b0ff6d787f5430188147a26c7740443
             - Cache First
             - Cache Only
             - Network First
             - Network Only
             - StaleWhileRevalidate
            */
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'auth-user-cache',
              expiration: {
                maxEntries:100,
                maxAgeSeconds:10
              },
              cacheableResponse: {
                statuses: [0,200]
              }
            }
          }
        ]
      }
    })
  ],
})
