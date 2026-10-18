import { createFileRoute } from "@tanstack/react-router";

import { portfolioDataQuery } from "../hooks/use-portfolio-data";
import { testimonialsQuery } from "../hooks/use-testimonials";
import { queryClient } from "../lib/query-client";

export const Route = createFileRoute("/about")({
  // Fill the query cache before render, so the prerendered page lists the
  // AWS certifications and testimonials instead of leaving them out
  // (useQuery does not suspend)
  loader: async () => {
    await Promise.all([
      queryClient.ensureQueryData(portfolioDataQuery).catch(() => undefined),
      queryClient.ensureQueryData(testimonialsQuery).catch(() => undefined),
    ]);
  },
});
