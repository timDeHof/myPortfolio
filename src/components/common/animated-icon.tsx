import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import { useIntersectionObserver } from "../../hooks/use-intersection-observer";

type AnimatedIconProps = {
  /**
   * The icon item to render, containing the icon component and its coordinates.
   */
  item: {
    Icon?: LucideIcon | React.FC<{ className?: string; size?: number }>;
    icon?: LucideIcon | React.FC<{ className?: string; size?: number }>;
    x?: string;
    y?: string;
  };
  /**
   * Framer Motion animation properties.
   */
  animationProps: {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  };
  /**
   * CSS class name for the motion container.
   */
  className: string;
  /**
   * The size of the icon in pixels.
   */
  size: number;
  /**
   * Optional index for key generation.
   */
  index?: number;
};

/**
 * A component that renders an icon with animations and intersection observer support.
 * Used for floating background icons and interactive elements.
 */
function AnimatedIcon({ item, animationProps, className, size, index }: AnimatedIconProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    triggerOnce: false,
  });

  const shouldReducedMotion = useReducedMotion();

  const IconComponent = item.Icon || item.icon;

  const getAnimation = () => {
    if (shouldReducedMotion) {
      return { opacity: 0.2, scale: 1 };
    }
    // Only animate when intersecting
    return isIntersecting ? animationProps.animate : animationProps.initial;
  };

  if (!IconComponent) {
    return null;
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      key={`animated-${item.Icon?.displayName || item.icon?.displayName || index}-${item.x}-${item.y}`}
      className={className}
      style={{ left: item.x, top: item.y }}
      initial={animationProps.initial}
      animate={getAnimation()}
      transition={animationProps.transition}
    >
      <IconComponent size={size} />
    </motion.div>
  );
}

export default AnimatedIcon;
