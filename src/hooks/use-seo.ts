import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { SEOData } from '../utils/seo';
import { defaultSEO, pageSEO } from '../utils/seo';

// Hook for dynamic SEO management
export const useSEO = (customSEO?: Partial<SEOData>) => {
  const location = useLocation();

  // Get page-specific SEO based on current route
  const getPageSEO = (): Partial<SEOData> => {
    const path = location.pathname.slice(1) || 'home';
    return pageSEO[path as keyof typeof pageSEO] || pageSEO.home;
  };

  // Merge SEO data with priority: custom > page-specific > default
  const seoData: SEOData = {
    ...defaultSEO,
    ...getPageSEO(),
    ...customSEO,
    url: `${window.location.origin}${location.pathname}${location.search}`,
  };

  // Update document title when SEO changes
  useEffect(() => {
    document.title = seoData.title;
  }, [seoData.title]);

  return seoData;
};

// Hook for section-specific SEO (for single-page sections)
export const useSectionSEO = (sectionName: string, customSEO?: Partial<SEOData>) => {
  const baseSEO = useSEO(customSEO);
  
  return {
    ...baseSEO,
    title: `${sectionName} - ${baseSEO.title}`,
    section: sectionName,
  };
};