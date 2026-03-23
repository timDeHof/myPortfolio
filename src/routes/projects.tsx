import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageLoader } from "../components/common/page-loader";
import { ProjectsPage } from "../pages/projects-page";
import { fetchAllProjects } from "../hooks/useProjects";
import type { ProjectWithSource } from "../hooks/useProjects";

// Search params schema
interface ProjectsSearch {
  project?: string;
}

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => {
    let project: string | undefined;

    if (typeof search.project === "string") {
      project = search.project;
    } else if (Array.isArray(search.project) && search.project.length > 0) {
      // Handle array case by taking the first string element
      const first = search.project[0];
      if (typeof first === "string") {
        project = first;
      }
    }

    return { project };
  },
  loader: async (): Promise<{ projects: ProjectWithSource[] }> => {
    const projects = await fetchAllProjects();
    return { projects };
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectsPage />
    </Suspense>
  ),
});
