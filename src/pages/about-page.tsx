import { useReducedMotion } from "framer-motion";

import { AboutHero } from "@/components/about/about-hero";
import { CertificationsSection } from "@/components/about/certifications-section";
import { SkillsSection } from "@/components/about/skills-section";
import { StorySection } from "@/components/about/story-section";
import { TestimonialsSection } from "@/components/about/testimonials-section";
import { TimelineSection } from "@/components/about/timeline-section";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { pageSEO } from "../utils/seo";

export const AboutPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <SEOHead seo={pageSEO.about} />
      <AboutHero />
      <StorySection shouldReduceMotion={shouldReduceMotion} />
      <AnimatedSection className="py-20 bg-muted">
        <SkillsSection shouldReduceMotion={shouldReduceMotion} />
      </AnimatedSection>
      <AnimatedSection className="py-20 bg-background relative overflow-hidden">
        <TimelineSection shouldReduceMotion={shouldReduceMotion} />
      </AnimatedSection>
      <AnimatedSection>
        <CertificationsSection />
      </AnimatedSection>
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>
    </>
  );
};
