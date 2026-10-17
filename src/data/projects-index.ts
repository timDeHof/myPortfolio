import type { Project } from "../types/project";

export interface ProjectIndexEntry {
  slug: string;
  owner: string;
  repo: string;
  path: string;
  fallbackData?: Project;
}

export const projectsIndex: ProjectIndexEntry[] = [
  {
    slug: "shadcn-timeline",
    owner: "timDeHof",
    repo: "portfolio-metadata",
    path: "shadcn-timeline.json",
  },
  {
    slug: "teamforward",
    owner: "timDeHof",
    repo: "portfolio-metadata",
    path: "teamforward.json",
  },
  {
    slug: "cognidocs",
    owner: "timDeHof",
    repo: "portfolio-metadata",
    path: "cognidocs.json",
  },
  {
    slug: "habitgate-mobile",
    owner: "timDeHof",
    repo: "portfolio-metadata",
    path: "habitgate-mobile.json",
  },
];

export function findProjectBySlug(slug: string): ProjectIndexEntry | undefined {
  return projectsIndex.find(p => p.slug === slug);
}
