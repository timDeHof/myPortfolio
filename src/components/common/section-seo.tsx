import React from 'react';
import { Helmet } from 'react-helmet-async';
import { sectionTemplates } from '../../config/seo-config';

interface SectionSEOProps {
  section: keyof typeof sectionTemplates;
  customTitle?: string;
  customDescription?: string;
  noIndex?: boolean;
}

export const SectionSEO: React.FC<SectionSEOProps> = ({
  section,
  customTitle,
  customDescription,
  noIndex = false,
}) => {
  const sectionData = sectionTemplates[section];
  const title = customTitle || sectionData.title;
  const description = customDescription || sectionData.description;

  return (
    <Helmet>
      {/* Section-specific meta tags */}
      <meta name="section" content={section} />
      <meta name="section-title" content={title} />
      <meta name="section-description" content={description} />
      
      {/* Prevent indexing of specific sections if needed */}
      {noIndex && <meta name="robots" content="noindex" />}
      
      {/* Open Graph section data */}
      <meta property="og:section" content={section} />
      
      {/* Schema.org section markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPageElement",
          "name": title,
          "description": description,
          "isPartOf": {
            "@type": "WebPage",
            "url": window.location.href
          }
        })}
      </script>
    </Helmet>
  );
};