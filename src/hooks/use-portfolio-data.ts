import { queryOptions, useQuery } from "@tanstack/react-query";

import type { PortfolioData } from "@/types/portfolio";

import { retryDuringPrerender } from "@/lib/query-client";
import { githubAPI } from "@/services/api/github";

async function fetchPortfolioData(): Promise<PortfolioData> {
  return githubAPI.fetchContents<PortfolioData>("timDeHof", "portfolio-metadata", "portfolio.json");
}

export const portfolioDataQuery = queryOptions({
  queryKey: ["portfolio"],
  queryFn: fetchPortfolioData,
  staleTime: 1000 * 60 * 5,
  retry: retryDuringPrerender,
});

export function usePortfolioData() {
  return useQuery(portfolioDataQuery);
}
