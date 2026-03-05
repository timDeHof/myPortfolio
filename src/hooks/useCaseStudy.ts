import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://portfolio-api.ttdehof.workers.dev/api";

interface CaseStudyData {
  hero: {
    impactStatement: string;
    tagline: string;
  };
  stats: {
    stars: number;
    forks: number;
    contributors: number;
    featuredOnShadcn: boolean;
    license: string;
  };
  problem: {
    title: string;
    content: string;
  };
  technicalApproach: {
    title: string;
    decisions: {
      title: string;
      description: string;
    }[];
  };
  challenges: {
    title: string;
    items: {
      challenge: string;
      solution: string;
    }[];
  };
  impact: {
    title: string;
    metrics: { value: string; label: string }[];
    achievements: string[];
  };
  learnings: {
    title: string;
    items: string[];
  };
  links: {
    github: string;
    demo: string;
    storybook: string;
    npm?: string;
  };
}

interface GitHubContentResponse {
  content?: string;
  encoding?: string;
}

async function fetchCaseStudyJson(owner: string, repo: string, path: string): Promise<CaseStudyData | null> {
  try {
    const url = `${API_BASE}/github/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Worker API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: GitHubContentResponse = await response.json();

    if (data.content) {
      const decoded = new TextDecoder().decode(
        Uint8Array.from(atob(data.content.replace(/\n/g, "")), c => c.charCodeAt(0))
      );
      return JSON.parse(decoded);
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch case study:", error);
    return null;
  }
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
