import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SectionSEOProps {
  section: string;
  customTitle?: string;
  customDescription?: string;
  noIndex?: boolean;
}

const defaultSectionTemplates: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Innovative Full Stack Developer',
    description: 'Transforming ideas into powerful web applications with modern technologies and engineering precision.',
  },
  skills: {
    title: 'Technical Skills & Expertise',
    description: 'Expertise in React, TypeScript, Node.js, Python, and modern web development technologies.',
  },
  experience: {
    title: 'Professional Experience',
    description: 'Years of experience in full-stack development, from mechanical engineering to cutting-edge web solutions.',
  },
  testimonials: {
    title: 'Client Testimonials',
    description: 'What clients say about working with Tim DeHof on their web development projects.',
  },
  portfolio: {
    title: 'Featured Projects',
    description: 'A showcase of recent web development projects and technical achievements.',
  },
};

export const SectionSEO: React.FC<SectionSEOProps> = ({
  section,
  customTitle,
  customDescription,
  noIndex = false,
}) => {
  const sectionData = defaultSectionTemplates[section] || { title: section, description: '' };
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