import { createFileRoute } from "@tanstack/react-router";

import { shadcnTimelineStarsQuery } from "../hooks/use-repo-stars";
import { queryClient } from "../lib/query-client";

export const Route = createFileRoute("/")({
  // The prerender (no window) waits for the star count, so the HTML has the
  // number. The browser starts the fetch without waiting, so home never blocks
  // on GitHub. A failed or timed-out fetch falls back to "Open source" (D17).
  loader: async () => {
    if (typeof window === "undefined") {
      await queryClient.ensureQueryData(shadcnTimelineStarsQuery).catch(() => undefined);
      return;
    }
    void queryClient.prefetchQuery(shadcnTimelineStarsQuery);
  },
});
