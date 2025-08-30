export type SEOData = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

export const defaultSEO: SEOData = {
  title: "Tim DeHof - Full Stack Developer",
  description: "Experienced full-stack developer specializing in React, Node.js, and modern web technologies. Building innovative solutions with cutting-edge technologies.",
  keywords: "web developer, full stack developer, React, Node.js, JavaScript, TypeScript, portfolio",
  image: "/og-image.jpg",
  type: "website",
  author: "Tim DeHof",
  locale: "en_US",
  siteName: "Tim DeHof Portfolio",
  twitterHandle: "@timDeHof",
};

export const pageSEO = {
  home: {
    title: "Tim DeHof - Full Stack Developer & Engineer",
    description: "Welcome to my portfolio. I'm a full-stack developer with a background in mechanical engineering, creating efficient and innovative web solutions.",
    keywords: "Tim DeHof, full stack developer, React developer, Node.js, mechanical engineer, web development portfolio",
    section: "Home",
    tags: ["portfolio", "developer", "react", "nodejs"],
  },
  about: {
    title: "About Tim DeHof - Developer & Engineer",
    description: "Learn about my journey from mechanical engineering to web development, and how I bring unique perspectives to every project.",
    keywords: "Tim DeHof about, mechanical engineering, web development journey, developer background",
    section: "About",
    tags: ["about", "biography", "experience"],
  },
  projects: {
    title: "Projects - Tim DeHof Portfolio",
    description: "Explore my latest projects including e-commerce applications, machine learning integrations, and full-stack web applications.",
    keywords: "Tim DeHof projects, web development projects, React projects, full stack applications",
    section: "Projects",
    tags: ["projects", "portfolio", "web-apps"],
  },
  services: {
    title: "Services - Web Development Solutions",
    description: "Discover the web development services I offer, from full-stack applications to cutting-edge technology implementations.",
    keywords: "web development services, React development, Node.js development, full stack services",
    section: "Services",
    tags: ["services", "web-development", "consulting"],
  },
  contact: {
    title: "Contact Tim DeHof - Let's Work Together",
    description: "Get in touch to discuss your next project. I'm always excited to work on new challenges and innovative solutions.",
    keywords: "contact Tim DeHof, hire developer, web development contact, project inquiry",
    section: "Contact",
    tags: ["contact", "hire", "collaboration"],
  },
};

// Section-specific SEO for different parts of pages
export const sectionSEO = {
  hero: {
    title: "Tim DeHof - Innovative Full Stack Developer",
    description: "Transforming ideas into powerful web applications with modern technologies and engineering precision.",
  },
  skills: {
    title: "Technical Skills - Tim DeHof",
    description: "Expertise in React, TypeScript, Node.js, Python, and modern web development technologies.",
  },
  experience: {
    title: "Professional Experience - Tim DeHof",
    description: "Years of experience in full-stack development, from mechanical engineering to cutting-edge web solutions.",
  },
  testimonials: {
    title: "Client Testimonials - Tim DeHof",
    description: "What clients say about working with Tim DeHof on their web development projects.",
  },
};

// Project-specific SEO generator
export function generateProjectSEO(project: {
  title: string;
  description: string;
  technologies: string[];
  category?: string;
}): Partial<SEOData> {
  return {
    title: `${project.title} - Tim DeHof Portfolio`,
    description: project.description,
    keywords: `${project.title}, ${project.technologies.join(", ")}, Tim DeHof project, web development`,
    section: "Projects",
    tags: ["project", project.category || "web-app", ...project.technologies.map(tech => tech.toLowerCase())],
  };
}

// Utility to merge SEO data
export function mergeSEO(base: Partial<SEOData>, override: Partial<SEOData>): SEOData {
  return {
    ...defaultSEO,
    ...base,
    ...override,
  };
}
