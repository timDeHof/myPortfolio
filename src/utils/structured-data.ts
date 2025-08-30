// Structured Data (JSON-LD) utilities for rich snippets

export type PersonSchema = {
  "@context": "https://schema.org";
  "@type": "Person";
  "name": string;
  "jobTitle": string;
  "description": string;
  "url": string;
  "image": string;
  "email": string;
  "sameAs": string[];
  "knowsAbout": string[];
  "alumniOf"?: string;
  "workLocation"?: {
    "@type": "Place";
    "name": string;
  };
};

export type WebsiteSchema = {
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
};

export type ProjectSchema = {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  "name": string;
  "description": string;
  "url": string;
  "image": string;
  "author": {
    "@type": "Person";
    "name": string;
  };
  "dateCreated": string;
  "programmingLanguage": string[];
  "keywords": string[];
};

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
    "workLocation": {
      "@type": "Place",
      "name": "Remote",
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

// Generate Project structured data
export function generateProjectSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated: string;
  technologies: string[];
  keywords: string[];
}): ProjectSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description,
    "url": project.url,
    "image": project.image,
    "author": {
      "@type": "Person",
      "name": "Tim DeHof",
    },
    "dateCreated": project.dateCreated,
    "programmingLanguage": project.technologies,
    "keywords": project.keywords,
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

// Generate FAQ structured data
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
