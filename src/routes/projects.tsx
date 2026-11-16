import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

import type { ProjectWithSource } from "../hooks/use-projects";

import { PageLoader } from "../components/common/page-loader";
import { projectsIndex } from "../data/projects-index";
import { projectQuery } from "../hooks/use-projects";
import { queryClient } from "../lib/query-client";
import { ProjectsPage } from "../pages/projects-page";

// Search params schema
interface ProjectsSearch {
  project?: string;
}

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => {
    let project: string | undefined;

    if (typeof search.project === "string") {
      project = search.project;
    }
    else if (Array.isArray(search.project) && search.project.length > 0) {
      // Handle array case by taking the first string element
      const first = search.project[0];
      if (typeof first === "string") {
        project = first;
      }
    }

    return { project };
  },
  // ?project=<slug> used to open a modal. Project pages now live at
  // /projects/<slug>, so old shared links go there instead.
  beforeLoad: ({ search }) => {
    if (search.project) {
      throw redirect({ to: "/projects/$slug", params: { slug: search.project }, replace: true });
    }
  },
  // Through the query cache, so the prerender retries a failed download and
  // then fails the build, instead of publishing the page without that project.
  // The browser keeps the projects that loaded.
  loader: async (): Promise<{ projects: ProjectWithSource[] }> => {
    const results = await Promise.allSettled(projectsIndex.map(entry => queryClient.ensureQueryData(projectQuery(entry.slug))));
    return { projects: results.flatMap(result => (result.status === "fulfilled" ? [result.value] : [])) };
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectsPage />
    </Suspense>
  ),
});
