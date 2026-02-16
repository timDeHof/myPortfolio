import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import type { SEOData } from "../utils/seo";

import { defaultSEO, pageSEO } from "../utils/seo";

/**
 * Custom hook for dynamic SEO management across the application.
 * Merges default, page-specific, and custom SEO data.
 *
 * @param customSEO - Optional overrides for SEO tags.
 * @returns Combined SEO data for the current view.
 */
export function useSEO(customSEO?: Partial<SEOData>) {
  const location = useLocation();

  /**
   * Retrieves page-specific SEO data based on the current pathname.
   */
  const getPageSEO = (): Partial<SEOData> => {
    const path = location.pathname.slice(1) || "home";
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
}

/**
 * Custom hook for section-specific SEO, useful for single-page scrolling sections.
 *
 * @param sectionName - The name of the section.
 * @param customSEO - Optional overrides for SEO tags.
 * @returns SEO data with the section name prefixed to the title.
 */
export function useSectionSEO(sectionName: string, customSEO?: Partial<SEOData>) {
  const baseSEO = useSEO(customSEO);

  return {
    ...baseSEO,
    title: `${sectionName} - ${baseSEO.title}`,
    section: sectionName,
  };
}
