import { m as motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    requestAnimationFrame(() => {
      const nextSection = document.querySelector("#services-section");
      nextSection?.scrollIntoView({ behavior: "smooth" });
    });
  };

  if (!show)
    return null;

  return (
    <motion.button
      onClick={scrollToContent}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300 z-30 touch-manipulation group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll to explore"
    >
      <div className="backdrop-blur-sm bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-full p-3 group-hover:bg-white/30 dark:group-hover:bg-white/20 transition-all duration-300">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </div>
      <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Scroll to explore
      </span>
    </motion.button>
  );
}
