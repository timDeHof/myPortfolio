import { motion } from "framer-motion";
import React from "react";

import { useIntersectionObserver } from "../../hooks/use-intersectio-observer";

type AnimatedSectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  };

  return (
    <motion.section
      ref={ref}
      initial={directionVariants[direction]}
      animate={isIntersecting ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
      id={id} // Added id prop to motion.section
    >
      {children}
    </motion.section>
  );
};
