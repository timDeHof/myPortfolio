"use client";
import { useEffect } from "react";
import { m, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { cn } from "../../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show all text immediately if user prefers reduced motion
      const spans = scope.current?.querySelectorAll("span");
      spans?.forEach((span: Element) => {
        (span as HTMLElement).style.opacity = "1";
        (span as HTMLElement).style.transform = "translateY(0px)";
      });
      return;
    }

    animate(
      "span",
      {
        opacity: 1,
        transform: "translateY(0px)",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.1),
      }
    );
  }, [scope.current, prefersReducedMotion, animate, duration]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide min-h-[3em]">
          <m.div ref={scope} className="min-h-[1.5em]">
            {wordsArray.map((word, idx) => (
              <m.span
                key={word + idx}
                className="dark:text-white text-black"
                style={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  transform: prefersReducedMotion ? "translateY(0px)" : "translateY(10px)",
                  display: "inline-block",
                  marginRight: "0.25em"
                }}
              >
                {word}
              </m.span>
            ))}
          </m.div>
        </div>
      </div>
    </div>
  );
};