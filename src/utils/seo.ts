import type { Project } from "../types/project";

export const SITE_URL = "https://timdehof.dev";

export interface SEOData {
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
}

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
  blog: {
    title: "Blog - Tim DeHof",
    description: "Thoughts on web development, React, TypeScript, and building modern applications.",
    keywords: "Tim DeHof blog, web development articles, React tutorials, programming blog",
    section: "Blog",
    tags: ["blog", "articles", "tutorials", "web development"],
  },
};

/**
 * Head tags for a /projects/$slug page, per the meta template in
 * docs/v2/pages-v2-copy.md: "<name> — Tim DeHof", and the tagline plus the
 * first three stack names. The template's role sentence is left out, since
 * the only role text (resumePitch) is far longer than a meta description.
 */
export function projectSEO(project: Project): Partial<SEOData> {
  const stack = (project.techStack ?? [])
    .flatMap(item => (typeof item === "string" ? item : item.tech).split("·"))
    .map(name => name.trim())
    .filter(Boolean)
    .slice(0, 3);
  const builtWith = stack.length > 1
    ? `${stack.slice(0, -1).join(", ")}, and ${stack[stack.length - 1]}`
    : stack[0];
  const summary = project.tagline.replace(/\.$/, "");

  return {
    title: `${project.name} — Tim DeHof`,
    description: builtWith ? `${summary}. Built with ${builtWith}.` : `${summary}.`,
    image: project.image || undefined,
    type: "article",
    section: "Projects",
    tags: project.tags,
  };
}
