import { createFileRoute } from "@tanstack/react-router";

import { portfolioDataQuery } from "../hooks/use-portfolio-data";
import { queryClient } from "../lib/query-client";

export const Route = createFileRoute("/about")({
  // Fill the query cache before render, so the prerendered page has the
  // certifications instead of their spinner (useQuery does not suspend)
  loader: async () => {
    await queryClient.ensureQueryData(portfolioDataQuery).catch(() => undefined);
  },
});
