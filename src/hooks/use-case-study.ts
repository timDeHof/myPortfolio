import { queryOptions, useQuery } from "@tanstack/react-query";

import type { CaseStudyData } from "@/types/case-study";

import { githubAPI } from "@/services/api/github";

// Shared with the /projects/$slug route loader, which fills the cache before render
export function caseStudyQuery(slug: string) {
  return queryOptions({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const caseStudySlug = slug.replace("-case-study", "");
      const path = `${caseStudySlug}-case-study.json`;
      return githubAPI.fetchContents<CaseStudyData>("timDeHof", "portfolio-metadata", path);
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCaseStudy(slug: string) {
  return useQuery(caseStudyQuery(slug));
}

export type { CaseStudyData };
