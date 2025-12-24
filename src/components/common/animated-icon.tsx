import type { LucideIcon } from "lucide-react";

import { m as motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type AnimatedIconProps = {
  item: {
    Icon?: LucideIcon | React.FC<{ className?: string; size?: number }>;
    icon?: LucideIcon | React.FC<{ className?: string; size?: number }>;
    x?: string;
    y?: string;
  };
  animationProps: {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  };
  className: string;
  size: number;
  index?: number;
};

function AnimatedIcon({ item, animationProps, className, size, index }: AnimatedIconProps) {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });

  const shouldReducedMotion = useReducedMotion();

  const IconComponent = item.Icon || item.icon;

  const getAnimation = () => {
    if (shouldReducedMotion) {
      return { opacity: 0.2, scale: 1 };
    }
    return animationProps.animate;
  };

  if (!IconComponent) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
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
