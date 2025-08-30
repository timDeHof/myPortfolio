import React, { Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";
import { SEOHead } from "../components/common/seo-head";
import { pageSEO } from "../utils/seo";
import { generatePersonSchema, generateWebsiteSchema } from "../utils/structured-data";

// Lazy load components for better performances
const HeroSection = React.lazy(() =>
  import("../components/home/hero-section").then(module => ({ default: module.HeroSection })),
);

const ServicesSection = React.lazy(() =>
  import("../components/home/services-section").then(module => ({ default: module.ServicesSection })),
);

// Loading fallback component
const SectionLoader: React.FC<{ name: string }> = ({ name }) => (
  <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-slate-900">
    <div className="text-center">
      <LoadingSpinner size="lg" color="blue" />
      <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
        Loading
        {name}
        ...
      </p>
    </div>
  </div>
);

export const HomePage: React.FC = () => {
  // Generate structured data for the home page
  const structuredData = {
    "@graph": [
      generatePersonSchema(),
      generateWebsiteSchema()
    ]
  };

  return (
    <>
      <SEOHead 
        seo={pageSEO.home} 
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <Suspense fallback={<SectionLoader name="Hero Section" />}>
        <HeroSection />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<SectionLoader name="Services" />}>
        <ServicesSection />
      </Suspense>
    </>
  );
};
