import { m } from "framer-motion";
import React from "react";

import { Card, CardContent } from "../ui/card";

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  className?: string;
  cardClassName?: string;
  contentClassName?: string;
  delayMultiplier?: number;
}

/**
 * Card wrapper with framer-motion slide-in animation.
 * Used by certifications and testimonials sections.
 */
export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  index,
  className,
  cardClassName,
  contentClassName,
  delayMultiplier = 0.1,
}) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * delayMultiplier }}
      viewport={{ once: true }}
      className={className}
    >
      <Card
        className={
          cardClassName ??
          "flex h-full flex-col border bg-card"
        }
      >
        <CardContent
          className={contentClassName ?? "flex flex-1 flex-col p-6"}
        >
          {children}
        </CardContent>
      </Card>
    </m.div>
  );
};