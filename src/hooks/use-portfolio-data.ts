import { queryOptions, useQuery } from "@tanstack/react-query";

import type { PortfolioData } from "@/types/portfolio";

import { githubAPI } from "@/services/api/github";

async function fetchPortfolioData(): Promise<PortfolioData> {
  return githubAPI.fetchContents<PortfolioData>("timDeHof", "portfolio-metadata", "portfolio.json");
}

export const portfolioDataQuery = queryOptions({
  queryKey: ["portfolio"],
  queryFn: fetchPortfolioData,
  staleTime: 1000 * 60 * 5,
  // One attempt, so a failed fetch shows the page without waiting on retries
  retry: false,
});

export function usePortfolioData() {
  return useQuery(portfolioDataQuery);
}
