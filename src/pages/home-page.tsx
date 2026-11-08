import React from "react";

import { SEOHead } from "../components/common/seo-head";
import { Background, Contact, Hero, HowIWork, SelectedWork } from "../components/home/sections";
import { useShadcnTimelineStars } from "../hooks/use-repo-stars";
import { pageSEO } from "../utils/seo";
import { generatePersonSchema, generateWebsiteSchema } from "../utils/structured-data";

export const HomePage: React.FC = () => {
  const stars = useShadcnTimelineStars();

  // Generate structured data for the home page
  const structuredData = {
    "@graph": [
      generatePersonSchema(),
      generateWebsiteSchema(),
    ],
  };

  return (
    <>
      <SEOHead
        seo={pageSEO.home}
        structuredData={structuredData}
      />

      <Hero stars={stars} />
      <HowIWork />
      <SelectedWork stars={stars} />
      <Background />
      <Contact />
    </>
  );
};
