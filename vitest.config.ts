/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const vitestConfig = defineConfig({
  test: {
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    globals: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)
