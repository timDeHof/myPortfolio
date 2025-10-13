import { useCallback, useRef } from "react";

export function useOptimizedAnimations() {
  const rafId = useRef<number>();

  const scheduleAnimation = useCallback((callback: () => void) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    rafId.current = requestAnimationFrame(callback);
  }, []);

  const cleanup = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = undefined;
    }
  }, []);

  return { scheduleAnimation, cleanup };
}