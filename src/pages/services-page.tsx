import { m, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code,
  Cpu,
  MessageSquare,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { Button } from "../components/ui/button";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { pageSEO } from "../utils/seo";

/**
 * Title mapping: overrides vague GitHub data titles with concrete deliverables.
 * Also adds deliverables, icon, and accent color per service.
 */
const serviceEnrichments: Record<string, {
  title: string;
  icon: React.ReactNode;
  accent: string;
  deliverables: string[];
}> = {
  "Experience": {
    title: "Engineering-Led Development",
    icon: <Users className="size-6" />,
    accent: "text-primary",
    deliverables: [
      "Technical architecture and system design",
      "Code reviews and team mentorship",
      "Performance audits and optimization",
      "CI/CD pipeline setup and DevOps",
    ],
  },
  "Cutting-edge Technologies": {
    title: "Modern Tech Stack Implementation",
    icon: <Cpu className="size-6" />,
    accent: "text-accent",
    deliverables: [
      "React / TypeScript frontends",
      "Node.js and serverless backends",
      "Database design and API development",
      "Cloud deployment (AWS, Vercel, Cloudflare)",
    ],
  },
  "Web Development": {
    title: "Full-Stack Web Applications",
    icon: <Code className="size-6" />,
    accent: "text-primary",
    deliverables: [
      "Responsive, accessible interfaces",
      "RESTful and GraphQL APIs",
      "Authentication and authorization",
      "Testing and documentation",
    ],
  },
};

/** Fallback for services not in the enrichment map. */
const defaultEnrichment = {
  icon: <Code className="size-6" />,
  accent: "text-blue-700 dark:text-blue-400",
  deliverables: [] as string[],
};

interface ServiceCardProps {
  service: { id: number; title: string; paragraphs: string[] };
  index: number;
  shouldReduceMotion: boolean;
}

/** Expandable service card with deliverables checklist. */
const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  shouldReduceMotion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const enrichment = serviceEnrichments[service.title] ?? {
    title: service.title,
    ...defaultEnrichment,
  };

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        className={`border rounded-xl transition-colors duration-200 ${
          isOpen
            ? "border-primary/30 bg-card"
            : "border-border bg-card hover:border-primary/20"
        }`}
      >
        {/* Header — always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-start gap-4 p-6 text-left cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={`service-${service.id}-content`}
        >
          <div className={`flex items-center justify-center w-11 h-11 bg-primary/10 rounded-lg shrink-0 ${enrichment.accent}`}>
            {enrichment.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground">
              {enrichment.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {service.paragraphs[0]}
            </p>
          </div>
          <ChevronDown
            className={`size-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0" id={`service-${service.id}-content`}>
                <div className="border-t border-border pt-5">
                  {/* Full description */}
                  <div className="space-y-3 mb-5">
                    {service.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Deliverables checklist */}
                  {enrichment.deliverables.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                        What you get
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {enrichment.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <Check className="size-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
};

/** Process step */
const ProcessStep: React.FC<{
  title: string;
  description: string;
  shouldReduceMotion: boolean;
  index: number;
}> = ({ title, description, shouldReduceMotion, index }) => (
  <m.div
    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex gap-4"
  >
    <div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  </m.div>
);

const processSteps = [
  {
    title: "Discovery",
    description:
      "We talk through your goals, constraints, and users. I ask hard questions before writing a line of code.",
  },
  {
    title: "Architecture",
    description:
      "Technical decisions documented upfront — stack choices, data models, API contracts. No surprises later.",
  },
  {
    title: "Build & Iterate",
    description:
      "Working software in short cycles. You see progress weekly, not monthly. Feedback shapes the next iteration.",
  },
  {
    title: "Ship & Support",
    description:
      "Deployment, monitoring, handoff. I don't disappear after launch — you get documentation and a contact who knows the code.",
  },
];

export const ServicesPage: React.FC = () => {
  const { data: portfolioData, isLoading, isError } = usePortfolioData();
  const services = portfolioData?.services || [];
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" role="status" aria-live="polite">
        <div className={`rounded-full h-12 w-12 border-b-2 border-primary ${shouldReduceMotion ? "" : "animate-spin"}`} aria-hidden="true" />
        <span className="sr-only">Loading services…</span>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <>
        <SEOHead seo={pageSEO.services} />
        <div className="min-h-[100dvh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-lg text-foreground font-medium mb-2">
              Something went wrong loading services.
            </p>
            <p className="text-muted-foreground mb-6">
              Try refreshing the page, or reach out directly — I'd love to hear about your project.
            </p>
            <Button asChild>
              <Link to="/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send a Message
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Empty state
  if (services.length === 0) {
    return (
      <>
        <SEOHead seo={pageSEO.services} />
        <div className="min-h-[100dvh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-lg text-foreground font-medium mb-2">
              Services coming soon.
            </p>
            <p className="text-muted-foreground mb-6">
              In the meantime, let's talk about what I can build for you.
            </p>
            <Button asChild>
              <Link to="/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead seo={pageSEO.services} />

      {/* Entry heading — no hero section, saves ~200px of scroll */}
      <AnimatedSection className="pt-24 pb-12 bg-background">
        <MaxWidthWrapper>
          <m.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              What I build, how I work, and what you can expect.
            </p>
          </m.div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Services — expandable cards, not identical grid */}
      <AnimatedSection className="py-12 bg-background">
        <MaxWidthWrapper>
          <div className="space-y-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Process — differentiates from homepage */}
      <AnimatedSection className="py-16 bg-muted">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                How I Work
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A predictable process that keeps you in the loop. No black boxes, no
                surprise invoices.
              </p>
            </div>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  {...step}
                  shouldReduceMotion={shouldReduceMotion}
                  index={index}
                />
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* CTA — cobalt background for visual distinction */}
      <AnimatedSection className="py-20 bg-primary text-primary-foreground">
        <MaxWidthWrapper className="text-center">
          <m.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Got a project in mind? I'd love to hear about it. Send me a message
              and let's see if we're a good fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-[2px_2px_0_rgba(0,0,0,0.15)]">
                <Link to="/contact">
                  Send a Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="text-primary-foreground hover:bg-white/10"
              >
                <Link to="/projects">See My Work</Link>
              </Button>
            </div>
          </m.div>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};
