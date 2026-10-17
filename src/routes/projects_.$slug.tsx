import { createFileRoute } from "@tanstack/react-router";

import { findProjectBySlug } from "../data/projects-index";
import { caseStudyQuery } from "../hooks/use-case-study";
import { projectQuery } from "../hooks/use-projects";
import { queryClient } from "../lib/query-client";
import { CASE_STUDY_SLUGS } from "../types/project";

export const Route = createFileRoute("/projects_/$slug")({
  // Fill the query cache before render, so the prerendered HTML has the
  // project instead of the loading skeleton. Only known slugs and published
  // case studies are fetched: a missing file comes back as "Not Found", which
  // the query client retries with backoff, and that would hold up navigation.
  loader: async ({ params }) => {
    if (!findProjectBySlug(params.slug)) {
      return;
    }
    await Promise.allSettled([
      queryClient.ensureQueryData(projectQuery(params.slug)),
      ...(CASE_STUDY_SLUGS.includes(params.slug) ? [queryClient.ensureQueryData(caseStudyQuery(params.slug))] : []),
    ]);
  },
});
