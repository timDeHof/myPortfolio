import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useOptimizedAnimations } from "../../src/hooks/use-optimized-animations";

describe("useOptimizedAnimations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("requestAnimationFrame", vi.fn((cb) => setTimeout(cb, 0)));
    vi.stubGlobal("cancelAnimationFrame", vi.fn((id) => clearTimeout(id)));
  });

  it("schedules an animation using requestAnimationFrame", async () => {
    const { result } = renderHook(() => useOptimizedAnimations());
    const callback = vi.fn();

    act(() => {
      result.current.scheduleAnimation(callback);
    });

    expect(window.requestAnimationFrame).toHaveBeenCalled();
    
    // Wait for the mock timer
    await vi.waitFor(() => expect(callback).toHaveBeenCalled());
  });

  it("cancels previous animation if a new one is scheduled", () => {
    const { result } = renderHook(() => useOptimizedAnimations());
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    act(() => {
      result.current.scheduleAnimation(callback1);
      result.current.scheduleAnimation(callback2);
    });

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it("cleans up scheduled animations", () => {
    const { result } = renderHook(() => useOptimizedAnimations());
    const callback = vi.fn();

    act(() => {
      result.current.scheduleAnimation(callback);
      result.current.cleanup();
    });

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});
