import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const vitestConfig = defineConfig({
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)
