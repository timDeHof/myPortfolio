import * as matchers from "@testing-library/jest-dom/matchers";
// tests/setup.ts
// Global test setup file
import { expect } from "vitest";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mock ResizeObserver for components that use it
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
