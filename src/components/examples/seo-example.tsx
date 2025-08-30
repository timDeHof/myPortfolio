// Example component showing different SEO implementations

import React from 'react';
import { SEOHead } from '../common/seo-head';
import { SectionSEO } from '../common/section-seo';
import { useSEO } from '../../hooks/use-seo';
import { generateProjectSEO } from '../../utils/seo';
import { generatePersonSchema, generateProjectSchema } from '../../utils/structured-data';

// Example 1: Basic page SEO
export const BasicSEOExample: React.FC = () => {
  return (
    <>
      <SEOHead seo={{
        title: 'My Custom Page Title',
        description: 'This is a custom page description for SEO',
        keywords: 'react, typescript, seo, portfolio',
      }} />
      <div>Your page content here</div>
    </>
  );
};

// Example 2: Section-specific SEO
export const SectionSEOExample: React.FC = () => {
  return (
    <section>
      <SectionSEO 
        section="hero" 
        customTitle="Custom Hero Title"
        customDescription="Custom hero description for this specific section"
      />
      <h1>Hero Section</h1>
      <p>This section has its own SEO metadata</p>
    </section>
  );
};

// Example 3: Dynamic project SEO
export const ProjectSEOExample: React.FC = () => {
  const project = {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'e-commerce' as const,
  };

  const projectSEO = generateProjectSEO(project);
  
  const projectStructuredData = generateProjectSchema({
    name: project.title,
    description: project.description,
    url: 'https://github.com/timDeHof/ecommerce-project',
    image: '/project-image.jpg',
    dateCreated: '2024-01-15',
    technologies: project.technologies,
    keywords: ['ecommerce', 'react', 'nodejs', 'mongodb'],
  });

  return (
    <>
      <SEOHead 
        seo={projectSEO} 
        structuredData={projectStructuredData}
      />
      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
    </>
  );
};

// Example 4: Using the SEO hook
export const HookSEOExample: React.FC = () => {
  const seoData = useSEO({
    title: 'About Me - Tim DeHof',
    description: 'Learn about my journey from mechanical engineering to web development',
  });

  // The hook automatically applies SEO, but you can also access the data
  console.log('Current SEO data:', seoData);

  return (
    <div>
      <h1>About Me</h1>
      <p>Current page title: {seoData.title}</p>
    </div>
  );
};

// Example 5: Conditional SEO (e.g., for private/draft content)
export const ConditionalSEOExample: React.FC<{ isDraft: boolean }> = ({ isDraft }) => {
  return (
    <>
      <SEOHead seo={{
        title: isDraft ? 'Draft Article' : 'Published Article',
        description: 'Article description',
        noIndex: isDraft, // Don't index draft articles
        noFollow: isDraft,
      }} />
      <article>
        {isDraft && <div className="draft-banner">This is a draft</div>}
        <h1>Article Title</h1>
        <p>Article content...</p>
      </article>
    </>
  );
};

// Example 6: Multiple structured data types
export const ComplexSEOExample: React.FC = () => {
  const structuredData = {
    "@graph": [
      generatePersonSchema(),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Tim DeHof - Portfolio",
        "description": "Professional portfolio showcasing web development projects",
        "url": window.location.href,
        "author": {
          "@type": "Person",
          "name": "Tim DeHof"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "/"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "About",
              "item": "/about"
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <SEOHead 
        seo={{
          title: 'About Tim DeHof - Full Stack Developer',
          description: 'Learn about Tim DeHof\'s journey from mechanical engineering to web development',
          type: 'profile',
          section: 'About',
          tags: ['about', 'biography', 'developer'],
        }}
        structuredData={structuredData}
      />
      <div>Your complex page content</div>
    </>
  );
};