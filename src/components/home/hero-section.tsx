import { Link } from "@tanstack/react-router";
import { m, useReducedMotion } from "framer-motion";
import { Download, MapPin, MessageCircle } from "lucide-react";

import { env } from "@/lib/env";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { HeroIllustration } from "./hero-illustration";

// Motion-safe variants for reduced motion preference
const containerVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Use motion-safe variants when reduced motion is preferred
  const activeContainerVariants = shouldReduceMotion ? containerVariantsReduced : containerVariants;
  const activeItemVariants = shouldReduceMotion ? itemVariantsReduced : itemVariants;

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[hsl(var(--background))]">
      {/* Subtle background pattern - minimal, professional */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23000%27%20fill-opacity=%271%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      />
      <MaxWidthWrapper>
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16">
          {/* Left: Text content */}
          <m.div
            variants={activeContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability Badge */}
            <m.div variants={activeItemVariants} className="mb-5">
              <Badge
                variant="outline"
                className="border-amber-500/50 bg-amber-500/10 px-4 py-1 text-amber-600 dark:border-amber-400/50 dark:bg-amber-400/10 dark:text-amber-400"
              >
                <m.span
                  className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400"
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={shouldReduceMotion ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                Available for opportunities
              </Badge>
            </m.div>

            {/* Name - Bold, distinctive, large */}
            <m.h1
              variants={activeItemVariants}
              className="mb-1 font-bold tracking-tight"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Tim DeHof
              </span>
            </m.h1>

            {/* Title - Clear, professional */}
            <m.p
              variants={activeItemVariants}
              className="mb-4 text-xl text-muted-foreground sm:text-2xl md:text-3xl"
            >
              Full-Stack Developer
            </m.p>

              {/* Location & Experience - Quick credibility signals */}
              <m.div
                variants={activeItemVariants}
                className="mb-5 flex flex-col gap-1.5 text-sm text-muted-foreground xl:flex-row xl:flex-wrap xl:items-center xl:gap-x-2 xl:gap-y-1 xl:text-base"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>Remote · Jacksonville, FL</span>
                </span>
                <span aria-hidden="true" className="hidden xl:inline text-muted-foreground/40">·</span>
                <span>3+ Years Experience</span>
                <span aria-hidden="true" className="hidden xl:inline text-muted-foreground/40">·</span>
                <span>20+ Projects Delivered</span>
              </m.div>

            {/* Tagline - Short, punchy, no marketing speak */}
            <m.p
              variants={activeItemVariants}
              className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Building scalable web applications that solve real problems.
              Focused on clean code and maintainable architecture.
            </m.p>

            {/* CTAs - Distinctive, valuable actions */}
            <m.div
              variants={activeItemVariants}
              className="flex flex-wrap gap-3"
            >
              {env.VITE_RESUME_URL && (
                <Button
                  asChild
                  size="lg"
                  className="group"
                >
                  <a
                    href={env.VITE_RESUME_URL}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                    Download Resume
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link to="/contact">
                  <MessageCircle className="h-5 w-5" />
                  Let's Talk
                </Link>
              </Button>
            </m.div>
          </m.div>

          {/* Right: Custom geometric illustration */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <HeroIllustration />
          </m.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
