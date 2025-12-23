/// <reference types="vitest/config" />
/// <reference types="vitest/browser" />
import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

const vitestConfig = defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    } as any,
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    globals: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)
