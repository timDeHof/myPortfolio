import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';
import tailwindcss from '@tailwindcss/vite';
import {visualizer} from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    visualizer({
      emitFile: true,
      filename: 'stats.html',
      open: true
    }),
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
      webp: { quality: 75 },
      // Filter to include assets from the public directory and other image files
      filter: /\.(jpg|jpeg|png|gif|svg)$/i,
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
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8788',
        changeOrigin: true,
        // The rewrite function is not needed here as the worker expects the full path
      },
    }
  },
});
