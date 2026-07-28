import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Returns the current vertical scroll position, updated via
 * requestAnimationFrame-throttled scroll listener.
 *
 * @param threshold - Pixel offset at which `isScrolled` flips to true (default 60)
 */
export function useScrollPosition(threshold = 60) {
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafId.current)
      return;

    rafId.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
      rafId.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return { scrollY, isScrolled: scrollY > threshold };
}
