import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { ContactForm } from "../components/contact/contact-form";
import { ContactHero } from "../components/contact/contact-hero";
import { ContactInfoPanel } from "../components/contact/contact-info-panel";
import { pageSEO } from "../utils/seo";

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.contact} />

      <ContactHero />

      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfoPanel />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};
