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
  title: "Tim DeHof — Full-Stack Engineer",
  description: "Full-stack engineer in Jacksonville, FL, working in React, TypeScript, Node, and AWS. Seven years as a mechanical engineer before software.",
  keywords: "full stack developer, React, Node.js, JavaScript, TypeScript",
  image: "/og-image.jpg",
  type: "website",
  author: "Tim DeHof",
  locale: "en_US",
  siteName: "Tim DeHof Portfolio",
  twitterHandle: "@timDeHof",
};

export const pageSEO = {
  home: {
    title: "Tim DeHof — Full-Stack Engineer, formerly Mechanical Engineer",
    description: "Full-stack engineer in Jacksonville, FL. Seven years in manufacturing engineering, now building React, TypeScript, and AWS applications. Author of shadcn-timeline.",
    keywords: "Tim DeHof, full stack developer, React developer, Node.js, mechanical engineer, web development portfolio",
    section: "Home",
    tags: ["portfolio", "developer", "react", "nodejs"],
  },
  about: {
    title: "About — Tim DeHof",
    description: "Mechanical engineer from 2015 to 2022, full-stack engineer since. Frontend Engineer at TeamForward and AWS Cloud Institute graduate.",
    keywords: "Tim DeHof about, mechanical engineering, web development journey, developer background",
    section: "About",
    tags: ["about", "biography", "experience"],
  },
  projects: {
    title: "Projects — Tim DeHof",
    description: "Selected projects by Tim DeHof, with the problem, his role, the stack, and what he would change. Includes shadcn-timeline, an accessible timeline component for shadcn/ui.",
    keywords: "Tim DeHof projects, web development projects, React projects, full stack applications",
    section: "Projects",
    tags: ["projects", "portfolio", "web-apps"],
  },
  contact: {
    title: "Contact — Tim DeHof",
    description: "Contact Tim DeHof about frontend and full-stack roles. Remote, based in Jacksonville, FL.",
    keywords: "contact Tim DeHof, hire developer, web development contact, project inquiry",
    section: "Contact",
    tags: ["contact", "hire", "collaboration"],
  },
  blog: {
    title: "Blog — Tim DeHof",
    description: "Write-ups on AWS and frontend engineering by Tim DeHof: what was built, what broke, and what it cost.",
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
