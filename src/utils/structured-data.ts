// Structured Data (JSON-LD) utilities for rich snippets

interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  "name": string;
  "jobTitle": string;
  "description": string;
  "url": string;
  "image": string;
  "email": string;
  "sameAs": string[];
  "skills": string[];
  "knowsAbout": string[];
  "alumniOf"?: string;
  "address"?: {
    "@type": "PostalAddress";
    "addressLocality": string;
    "addressCountry": string;
    "addressRegion": string;
  };
}

interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "name": string;
  "description": string;
  "url": string;
  "author": {
    "@type": "Person";
    "name": string;
  };
  "potentialAction": {
    "@type": "SearchAction";
    "target": string;
    "query-input": string;
  };
}

// Generate Person structured data
export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tim DeHof",
    "jobTitle": "Full Stack Developer",
    "description": "Experienced full-stack developer specializing in React, Node.js, and modern web technologies with a background in mechanical engineering.",
    "url": "https://timdehof.dev",
    "image": "https://timdehof.dev/og-image.jpg",
    "email": "tim@timdehof.dev",
    "sameAs": [
      "https://github.com/timDeHof",
      "https://linkedin.com/in/timdehof",
      "https://twitter.com/timDeHof",
    ],
    "skills": ["React", "Node.js", "TypeScript", "Python", "JavaScript", "Cloudflare Workers", "AWS Lambda", "Vitest", "test-driven development"],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Web Development",
      "Full Stack Development",
      "Mechanical Engineering",
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jacksonville",
      "addressRegion": "FL",
      "addressCountry": "USA",
    },
  };
}

// Generate Website structured data
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tim DeHof Portfolio",
    "description": "Portfolio website of Tim DeHof, a full-stack developer specializing in modern web technologies.",
    "url": "https://timdehof.dev",
    "author": {
      "@type": "Person",
      "name": "Tim DeHof",
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://timdehof.dev/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url,
    })),
  };
}
