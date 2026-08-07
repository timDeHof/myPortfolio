import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useTheme } from "../../src/hooks/use-theme";
import { useAppStore } from "../../src/store/use-app-store";

// Mock useAppStore
vi.mock("../../src/store/use-app-store", () => ({
  useAppStore: vi.fn(),
}));

describe("useTheme", () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppStore as any).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    // Mock localStorage
    const store: Record<string, string> = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(key => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        clear: vi.fn(() => { for (const key in store) delete store[key]; }),
      },
      writable: true,
    });

    // Reset document.documentElement classes
    document.documentElement.classList.remove("light", "dark");
  });

  it("uses theme from Zustand store without overriding", () => {
    (useAppStore as any).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    renderHook(() => useTheme());

    // Should NOT call setTheme on mount — Zustand persist handles hydration
    expect(mockSetTheme).not.toHaveBeenCalled();
  });

  it("does not override system preference on mount", () => {
    (useAppStore as any).mockReturnValue({
      theme: "system",
      setTheme: mockSetTheme,
    });

    renderHook(() => useTheme());

    // Should NOT call setTheme — 'system' is a valid stored value
    expect(mockSetTheme).not.toHaveBeenCalled();
  });

  it("toggles theme correctly", () => {
    (useAppStore as any).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("applies theme class to document element", () => {
    (useAppStore as any).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    renderHook(() => useTheme());

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });
});
