/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfigFactory from './vite.config'

// vite.config.ts exports a mode-dependent callback; resolve it for the test
// environment so shared settings (aliases, esbuild target, base, server) are
// merged into Vitest instead of being duplicated or dropped.
const resolvedViteConfig = typeof viteConfigFactory === 'function'
  ? viteConfigFactory({ mode: 'test' })
  : viteConfigFactory

// Build-only plugins (visualizer, PWA, imagemin, TanStack Router codegen,
// Tailwind, React) are excluded from the test environment: JSX is transformed
// by esbuild via tsconfig ("jsx": "react-jsx") and CSS is stubbed by Vitest,
// so no transform plugins are required for unit/component tests.
const { plugins: _vitePlugins, ...sharedViteConfig } = resolvedViteConfig

const vitestConfig = defineConfig({
  test: {
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    globals: true,
  },
})

export default mergeConfig(sharedViteConfig, vitestConfig)
