import type { JSX } from "react";

import { m as motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function BackToTopButton(): JSX.Element | null {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShow(latest > window.innerHeight * 0.8);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show)
    return null;

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground hover:opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation group min-w-[48px] min-h-[48px] flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Back to top
        <div className="absolute top-full right-4 border-4 border-transparent border-t-foreground"></div>
      </div>
    </motion.button>
  );
}
