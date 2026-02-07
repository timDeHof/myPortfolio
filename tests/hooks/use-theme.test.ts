import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        clear: vi.fn(() => { for (const key in store) delete store[key]; }),
      },
      writable: true
    });

    // Reset document.documentElement classes
    document.documentElement.classList.remove("light", "dark");
  });

  it("initializes theme from localStorage if available", () => {
    window.localStorage.getItem = vi.fn().mockReturnValue("dark");
    
    renderHook(() => useTheme());
    
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("initializes theme from system preference if localStorage is empty", () => {
    window.localStorage.getItem = vi.fn().mockReturnValue(null);
    // Mock matchMedia to return dark
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    renderHook(() => useTheme());
    
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
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
