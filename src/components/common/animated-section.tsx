import { motion } from "framer-motion";
import React from "react";

import { useIntersectionObserver } from "../../hooks/use-intersection-observer";

type AnimatedSectionProps = {
  /**
   * Optional ID for the section element.
   */
  id?: string;
  /**
   * Content to be rendered inside the section.
   */
  children: React.ReactNode;
  /**
   * Optional CSS class name for the section element.
   */
  className?: string;
  /**
   * Animation delay in seconds.
   */
  delay?: number;
  /**
   * Direction from which the section animates in.
   */
  direction?: "up" | "down" | "left" | "right";
};

/**
 * A wrapper component that provides scroll-triggered animations for its children.
 * Uses Framer Motion for smooth, high-impact transitions.
 */
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
      ref={ref as React.RefObject<HTMLElement>}
      initial={directionVariants[direction]}
      animate={isIntersecting ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
};
