import { m, useReducedMotion, type Variants } from "framer-motion";
import { Download, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { BackToTopButton } from "./back-to-top-button";
import { ScrollIndicator } from "./scroll-indicator";

// Background tech keywords for desktop (md: and larger)
// Positioned around edges with generous spacing from center content
const BACKGROUND_TECH = [
  // ========== TOP-LEFT ZONE ==========
  { name: "React", position: "top-8 left-[4%] md:left-[6%]", size: "text-4xl md:text-6xl lg:text-7xl" },
  { name: "TypeScript", position: "top-16 right-[4%] md:right-[8%]", size: "text-3xl md:text-5xl lg:text-6xl" },
  { name: "Vue", position: "top-[6%] left-[12%] md:left-[15%]", size: "text-xl md:text-3xl lg:text-4xl" },
  { name: "Jest", position: "top-[22%] left-[6%] md:left-[8%]", size: "text-base md:text-xl lg:text-2xl" },
  { name: "Firebase", position: "top-[4%] right-[20%] md:right-[25%]", size: "text-base md:text-lg lg:text-xl" },

  // ========== TOP-RIGHT ZONE ==========
  { name: "Python", position: "top-[30%] right-[6%] md:right-[5%]", size: "text-3xl md:text-5xl lg:text-6xl" },
  { name: "Tailwind CSS", position: "bottom-[32%] left-[12%] md:left-[16%]", size: "text-base md:text-xl lg:text-2xl" },
  { name: "Git", position: "top-[45%] right-[10%] md:right-[15%]", size: "text-lg md:text-2xl lg:text-3xl" },

  // ========== BOTTOM-LEFT ZONE ==========
  { name: "AWS", position: "bottom-[18%] left-[4%] md:left-[8%]", size: "text-4xl md:text-6xl lg:text-7xl" },
  { name: "Docker", position: "bottom-[35%] left-[8%] md:left-[12%]", size: "text-lg md:text-2xl lg:text-3xl" },
  { name: "Node.js", position: "bottom-[55%] left-[5%] md:left-[8%]", size: "text-2xl md:text-4xl lg:text-5xl" },
  { name: "Next.js", position: "bottom-[12%] left-[15%] md:left-[18%]", size: "text-base md:text-lg lg:text-xl" },
  { name: "Figma", position: "bottom-[70%] left-[4%] md:left-[6%]", size: "text-sm md:text-base lg:text-lg" },
  { name: "Vercel", position: "bottom-[48%] left-[18%] md:left-[22%]", size: "text-sm md:text-base lg:text-lg" },
  { name: "Vite", position: "bottom-[85%] left-[10%] md:left-[14%]", size: "text-sm md:text-base lg:text-lg" },
  { name: "SQLite", position: "bottom-[5%] left-[8%] md:left-[10%]", size: "text-xs md:text-sm lg:text-base" },
  { name: "ESLint", position: "bottom-[78%] left-[18%] md:left-[22%]", size: "text-xs md:text-sm lg:text-base" },

  // ========== BOTTOM-RIGHT ZONE ==========
  { name: "PostgreSQL", position: "bottom-[25%] right-[5%] md:right-[8%]", size: "text-2xl md:text-4xl lg:text-5xl" },
  { name: "Go", position: "bottom-[45%] right-[8%] md:right-[12%]", size: "text-xl md:text-3xl lg:text-4xl" },
  { name: "GraphQL", position: "bottom-[15%] right-[15%] md:right-[20%]", size: "text-base md:text-xl lg:text-2xl" },
  { name: "Express", position: "bottom-[62%] right-[5%] md:right-[8%]", size: "text-base md:text-lg lg:text-xl" },
  { name: "Fastify", position: "bottom-[38%] right-[20%] md:right-[25%]", size: "text-sm md:text-base lg:text-lg" },
  { name: "CI/CD", position: "bottom-[5%] right-[25%] md:right-[30%]", size: "text-sm md:text-base lg:text-lg" },
  { name: "WebSockets", position: "bottom-[78%] right-[8%] md:right-[12%]", size: "text-sm md:text-base lg:text-lg" },
  { name: "Microservices", position: "bottom-[88%] right-[15%] md:right-[20%]", size: "text-xs md:text-sm lg:text-base" },

  // ========== LEFT SIDE ZONE ==========
  { name: "Rust", position: "top-[55%] left-[3%] md:left-[5%]", size: "text-lg md:text-3xl lg:text-4xl" },
  { name: "MongoDB", position: "top-[70%] left-[5%] md:left-[8%]", size: "text-base md:text-xl lg:text-2xl" },
  { name: "Redis", position: "top-[38%] left-[15%] md:left-[18%]", size: "text-base md:text-lg lg:text-xl" },
  { name: "NestJS", position: "top-[82%] left-[25%] md:left-[28%]", size: "text-xs md:text-sm lg:text-base" },
  { name: "PWA", position: "top-[18%] left-[28%] md:left-[32%]", size: "text-xs md:text-sm lg:text-base" },

  // ========== RIGHT SIDE ZONE ==========
  { name: "Kubernetes", position: "top-[65%] right-[3%] md:right-[5%]", size: "text-base md:text-xl lg:text-2xl" },
  { name: "SSR", position: "top-[80%] right-[20%] md:right-[25%]", size: "text-xs md:text-sm lg:text-base" },
  { name: "REST API", position: "top-[25%] right-[28%] md:right-[32%]", size: "text-xs md:text-sm lg:text-base" },
  { name: "Zustand", position: "bottom-[60%] right-[28%] md:right-[32%]", size: "text-xs md:text-sm lg:text-base" },
] as const;

// Mobile-optimized background tech keywords (hidden on md: and larger)
// Fewer keywords, positioned at extreme edges, smaller sizes
const MOBILE_BACKGROUND_TECH = [
  // Top corners - large but far from center
  { name: "React", position: "top-6 left-[2%]", size: "text-2xl" },
  { name: "Python", position: "top-4 right-[2%]", size: "text-xl" },
  // Bottom corners - anchors
  { name: "AWS", position: "bottom-12 left-[2%]", size: "text-2xl" },
  { name: "Node", position: "bottom-16 right-[2%]", size: "text-lg" },
  // Scattered along edges - keeping content area clear
  { name: "TypeScript", position: "top-[35%] left-[1%]", size: "text-base" },
  { name: "PostgreSQL", position: "bottom-[35%] right-[1%]", size: "text-base" },
  { name: "Docker", position: "top-[60%] left-[1%]", size: "text-sm" },
  { name: "Go", position: "bottom-[55%] right-[1%]", size: "text-sm" },
  { name: "Rust", position: "top-[20%] left-[1%]", size: "text-xs" },
  { name: "GraphQL", position: "bottom-[20%] right-[1%]", size: "text-xs" },
] as const;

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

// Factory function to create floating variants with per-element random duration
const createFloatVariants = (delay: number): Variants => ({
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1] as const,
    },
  },
});

// Keep for backwards compatibility reference, but we'll generate per-element
const _floatVariantsReference = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1] as const,
    },
  },
};

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Use motion-safe variants when reduced motion is preferred
  const activeContainerVariants = shouldReduceMotion ? containerVariantsReduced : containerVariants;
  const activeItemVariants = shouldReduceMotion ? itemVariantsReduced : itemVariants;

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[hsl(var(--background))]">
      {/* Subtle background pattern - minimal, professional */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23000%27%20fill-opacity=%271%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      />

      {/* Single accent line - distinctive, not overwhelming */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/20 to-transparent" />

      {/* Background tech keywords - subtle, faded, non-distracting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Desktop keywords (hidden on mobile) */}
        <div className="hidden md:block">
          {BACKGROUND_TECH.map((tech, index) => {
            const floatVariants = shouldReduceMotion
              ? undefined
              : createFloatVariants(index * 0.5);
            return (
              <m.div
                key={`desktop-${tech.name}`}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className={`absolute ${tech.position} ${tech.size} font-bold tracking-tight select-none text-muted-foreground`}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsl(var(--muted-foreground) / 0.15) 0%, hsl(var(--foreground) / 0.08) 100%)`,
                  }}
                >
                  {tech.name}
                </span>
              </m.div>
            );
          })}
        </div>

        {/* Mobile keywords (hidden on md: and larger) - fewer, smaller, at edges */}
        <div className="md:hidden">
          {MOBILE_BACKGROUND_TECH.map((tech, index) => {
            const floatVariants = shouldReduceMotion
              ? undefined
              : createFloatVariants(index * 0.7);
            return (
              <m.div
                key={`mobile-${tech.name}`}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className={`absolute ${tech.position} ${tech.size} font-bold tracking-tight select-none text-muted-foreground`}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsl(var(--muted-foreground) / 0.12) 0%, hsl(var(--foreground) / 0.06) 100%)`,
                  }}
                >
                  {tech.name}
                </span>
              </m.div>
            );
          })}
        </div>
      </div>

      <MaxWidthWrapper>
        <m.div
          variants={activeContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 px-4 py-16"
        >
          {/* Availability Badge */}
          <m.div variants={activeItemVariants} className="mb-5 flex justify-center">
            <Badge
              variant="outline"
              className="border-emerald-500/50 bg-emerald-500/10 px-4 py-1 text-emerald-600 dark:border-emerald-400/50 dark:bg-emerald-400/10 dark:text-emerald-400"
            >
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Available for opportunities
            </Badge>
          </m.div>

          {/* Name - Bold, distinctive, large */}
          <m.h1
            variants={activeItemVariants}
            className="mb-1 text-center font-bold tracking-tight"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Tim DeHof
            </span>
          </m.h1>

          {/* Title - Clear, professional */}
          <m.p
            variants={activeItemVariants}
            className="mb-4 text-center text-xl text-muted-foreground sm:text-2xl md:text-3xl"
          >
            Full-Stack Developer
          </m.p>

          {/* Location & Experience - Quick credibility signals */}
          <m.div
            variants={activeItemVariants}
            className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground sm:text-base"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>Remote · Jacksonville, FL</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span>3+ Years Experience</span>
            <span className="hidden sm:inline">·</span>
            <span>20+ Projects Delivered</span>
          </m.div>

          {/* Tagline - Short, punchy, no marketing speak */}
          <m.p
            variants={activeItemVariants}
            className="mx-auto mb-8 max-w-xl text-center text-base text-muted-foreground sm:text-lg"
          >
            Building scalable web applications that solve real problems.
            Focused on clean code and maintainable architecture.
          </m.p>

          {/* CTAs - Distinctive, valuable actions */}
          <m.div
            variants={activeItemVariants}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group w-full sm:w-auto"
            >
              <a
                href="/TimDeHof-Resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to="/contact">
                <MessageCircle className="h-5 w-5" />
                Let's Talk
              </Link>
            </Button>
          </m.div>
        </m.div>
      </MaxWidthWrapper>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Back to Top Button */}
      <BackToTopButton />
    </section>
  );
};
