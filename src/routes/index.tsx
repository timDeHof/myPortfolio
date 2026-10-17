import { createFileRoute } from "@tanstack/react-router";

import { shadcnTimelineStarsQuery } from "../hooks/use-repo-stars";
import { queryClient } from "../lib/query-client";

export const Route = createFileRoute("/")({
  // Fill the star count before render, so the prerendered page has the number.
  // A failed fetch is ignored: the page falls back to "Open source" (D17).
  loader: async () => {
    await queryClient.ensureQueryData(shadcnTimelineStarsQuery).catch(() => undefined);
  },
});
