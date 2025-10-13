import { useCallback, useRef } from "react";

export function useOptimizedScroll() {
  const rafId = useRef<number>();

  const handleScroll = useCallback((callback: () => void) => {
    if (rafId.current)
      cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      callback();
    });
  }, []);

  return handleScroll;
}
