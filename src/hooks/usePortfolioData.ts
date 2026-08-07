import { useQuery } from "@tanstack/react-query";

import type { PortfolioData } from "@/types/portfolio";

import { githubAPI } from "@/services/api/github";

async function fetchPortfolioData(): Promise<PortfolioData> {
  return githubAPI.fetchContents<PortfolioData>("timDeHof", "portfolio-metadata", "portfolio.json");
}

export function usePortfolioData() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5,
  });
}
