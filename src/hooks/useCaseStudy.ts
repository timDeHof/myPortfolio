import { useQuery } from "@tanstack/react-query";
import type { CaseStudyData } from "@/types/caseStudy";
import { fetchGitHubJson } from "@/lib/github-api";



async function fetchCaseStudyJson(owner: string, repo: string, path: string): Promise<CaseStudyData | null> {
  return fetchGitHubJson<CaseStudyData>(owner, repo, path);
}

export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const caseStudySlug = slug.replace("-case-study", "");
      const path = `${caseStudySlug}-case-study.json`;
      return fetchCaseStudyJson("timDeHof", "portfolio-metadata", path);
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

export type { CaseStudyData };
