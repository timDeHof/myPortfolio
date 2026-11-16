import "@testing-library/jest-dom/vitest";
// tests/setup.ts
// Global test setup file
import { vi } from "vitest";

// Browser mocks only apply in jsdom; files that opt into the node environment
// (e.g. server-render tests) have no window.
if (typeof window !== "undefined") {
  // Mock ResizeObserver for components that use it
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;

  // Mock IntersectionObserver for components that use it (e.g., Framer Motion, lazy loading)
  class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = IntersectionObserver as unknown as typeof window.IntersectionObserver;

  // Mock matchMedia for responsive design testing
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
