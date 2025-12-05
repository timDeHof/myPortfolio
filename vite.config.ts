import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteTsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [{
          urlPattern: /^https:\/\/api\.github\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'github-api-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 300 }
          }
      }]
    }
    }),
    viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
    pngquant: { quality: [0.65, 0.8] },
    webp: { quality: 75 }
  })
  ],
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@services": resolve(__dirname, "./src/services"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  esbuild: {
    target: "es2020",
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 5173,
    host: true,
  },
});
