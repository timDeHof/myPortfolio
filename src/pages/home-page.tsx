import React from "react";

import { SEOHead } from "../components/common/seo-head";
import { Hero, HowIWork, SelectedWork } from "../components/home/sections";
import { pageSEO } from "../utils/seo";
import { generatePersonSchema, generateWebsiteSchema } from "../utils/structured-data";

export const HomePage: React.FC = () => {
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

      <Hero />
      <HowIWork />
      <SelectedWork />
    </>
  );
};
