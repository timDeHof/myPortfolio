import React, { Suspense } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { pageSEO } from '../utils/seo';

// Lazy load components for better performance
const HeroSection = React.lazy(() => 
  import('../components/home/HeroSection').then(module => ({ default: module.HeroSection }))
);

const ServicesSection = React.lazy(() => 
  import('../components/home/ServicesSection').then(module => ({ default: module.ServicesSection }))
);

// Loading fallback component
const SectionLoader: React.FC<{ name: string }> = ({ name }) => (
  <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-slate-900">
    <div className="text-center">
      <LoadingSpinner size="lg" color="blue" />
      <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">Loading {name}...</p>
    </div>
  </div>
);

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.home} />
      
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