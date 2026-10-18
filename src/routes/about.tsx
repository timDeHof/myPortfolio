import { createFileRoute } from "@tanstack/react-router";

import { portfolioDataQuery } from "../hooks/use-portfolio-data";
import { testimonialsQuery } from "../hooks/use-testimonials";
import { queryClient } from "../lib/query-client";

/** How long a click through to About waits for its data before showing the page */
export const ABOUT_LOADER_TIMEOUT_MS = 1500;

export const Route = createFileRoute("/about")({
  // Fill the query cache before render, so the prerendered page lists the
  // AWS certifications and testimonials instead of leaving them out
  // (useQuery does not suspend)
  loader: async () => {
    const data = Promise.all([
      queryClient.ensureQueryData(portfolioDataQuery).catch(() => undefined),
      queryClient.ensureQueryData(testimonialsQuery).catch(() => undefined),
    ]);
    if (typeof window === "undefined") {
      await data;
      return;
    }
    // In the browser a stalled request must not hold the page back. The
    // queries keep fetching, and their sections render when the data arrives.
    await Promise.race([data, new Promise(resolve => setTimeout(resolve, ABOUT_LOADER_TIMEOUT_MS))]);
  },
});
