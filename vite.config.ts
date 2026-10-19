import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';
import tailwindcss from '@tailwindcss/vite';
import {visualizer} from "rollup-plugin-visualizer";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import { buildEntries, writeSitemap } from './scripts/sitemap';

// Regenerates public/sitemap.xml from the route list and projects-index before
// each build, so adding a project cannot leave the sitemap behind again.
const sitemap = () => ({
  name: 'generate-sitemap',
  buildStart() {
    writeSitemap(resolve(__dirname, 'public'));
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    sitemap(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
      open: false
    }),
    // TanStack Router plugin must be before React plugin
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    vitePrerenderPlugin({
      renderTarget: '#app',
      prerenderScript: resolve(__dirname, 'src/index.tsx'),
      // Same route list as the sitemap, so a new page or project cannot be
      // listed in one and missing from the other
      additionalPrerenderRoutes: buildEntries().map(entry => entry.path),
    }),
    tailwindcss(),
    viteTsconfigPaths(),
    ...(mode === 'production' ? [cloudflare({
      // Cloudflare Pages/Workers configuration
      // The functions directory is used for Cloudflare Pages Functions
      // The wrangler.toml is used for Cloudflare Workers
      // For Pages Functions, we need to configure it to use the functions directory
    })] : []),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Well-known URIs (RFC 8615) must reach the network, not the SPA shell.
        // Without this, navigating to /.well-known/api-catalog returns index.html.
        navigateFallbackDenylist: [/^\/\.well-known\//],
        // Prerendered pages live at about/index.html, but Workbox only maps
        // URLs ending in "/" to index.html, so /about fell through to
        // navigateFallback and got the home page. Precache each page under
        // its slash-less URL, which is how Cloudflare serves it.
        manifestTransforms: [async entries => ({
          manifest: entries.map(entry => ({
            ...entry,
            url: entry.url.replace(/^(.+)\/index\.html$/, '$1'),
          })),
          warnings: [],
        })],
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
      // SVGs only. svgo runs in JS, but pngquant, mozjpeg and gifsicle need
      // binaries their install scripts download, and pnpm doesn't run those
      // scripts, so every PNG logged "imagemin error" and shipped unchanged.
      filter: /\.svg$/i,
    })
  ],
  base: "/",
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
    fs: {
      allow: [".."],
    },
    // No /api proxy: every request goes through the absolute
    // env.VITE_API_BASE_URL, so a relative /api path is never requested. The
    // proxy that used to sit here pointed at port 8788, which nothing has ever
    // listened on — dead config that read like working configuration.
  },
}))
