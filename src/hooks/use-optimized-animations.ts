import { useCallback, useRef } from "react";

/**
 * Custom hook for managing high-performance animations using requestAnimationFrame.
 * Ensures animations are properly throttled and cleaned up to prevent memory leaks and frame drops.
 * 
 * @returns An object containing animation control functions.
 */
export function useOptimizedAnimations() {
  const rafId = useRef<number>();

  /**
   * Schedules a callback to be executed on the next animation frame.
   * Automatically cancels any previously scheduled animation frame.
   * 
   * @param callback - The function to execute on the next frame.
   */
  const scheduleAnimation = useCallback((callback: () => void) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    rafId.current = requestAnimationFrame(callback);
  }, []);

  /**
   * Cancels any currently scheduled animation frame.
   */
  const cleanup = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = undefined;
    }
  }, []);

  return { scheduleAnimation, cleanup };
}