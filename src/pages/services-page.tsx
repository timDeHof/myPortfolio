import { Link } from "@tanstack/react-router";
import { m, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { ProcessStep, processSteps } from "../components/services/process-step";
import { ServiceCard } from "../components/services/service-card";
import { Button } from "../components/ui/button";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { usePortfolioData } from "../hooks/use-portfolio-data";
import { pageSEO } from "../utils/seo";

export const ServicesPage: React.FC = () => {
  const { data: portfolioData, isLoading, isError } = usePortfolioData();
  const services = portfolioData?.services || [];
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-[100dvh] flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div
          className={`rounded-full h-12 w-12 border-b-2 border-primary ${shouldReduceMotion ? "" : "animate-spin"}`}
          aria-hidden="true"
        />
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
              Try refreshing the page, or reach out directly — I'd love to hear
              about your project.
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
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
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
                A predictable process that keeps you in the loop. No black
                boxes, no surprise invoices.
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
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
            }
            whileInView={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Got a project in mind? I'd love to hear about it. Send me a
              message and let's see if we're a good fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90 shadow-[2px_2px_0_rgba(0,0,0,0.15)]"
              >
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
