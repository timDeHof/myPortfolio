import { Button } from "@components/ui/button";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { m, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import React from "react";

import { env } from "@/lib/env";

export const AboutHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="py-20 bg-muted">
      <MaxWidthWrapper>
        <m.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            About Me
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto mb-8">
            From mechanical engineering to web development, I bring a unique perspective
            to creating efficient and innovative digital solutions.
          </p>
          {env.VITE_RESUME_URL && (
            <Button asChild className="bg-secondary text-secondary-foreground hover:opacity-90">
              <a href={env.VITE_RESUME_URL} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          )}
        </m.div>
      </MaxWidthWrapper>
    </section>
  );
};
