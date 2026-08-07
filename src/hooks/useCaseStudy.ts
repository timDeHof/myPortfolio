import { useQuery } from "@tanstack/react-query";

import type { CaseStudyData } from "@/types/caseStudy";

import { githubAPI } from "@/services/api/github";

export function useCaseStudy(slug: string) {
  return useQuery({
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

export type { CaseStudyData };
