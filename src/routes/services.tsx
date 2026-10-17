import { createFileRoute } from "@tanstack/react-router";

import { portfolioDataQuery } from "../hooks/use-portfolio-data";
import { queryClient } from "../lib/query-client";

export const Route = createFileRoute("/services")({
  // Fill the query cache before render, so the prerendered HTML has the
  // services instead of the loading state. A failed fetch still renders the
  // page, which shows its own error state.
  loader: async () => {
    await queryClient.ensureQueryData(portfolioDataQuery).catch(() => undefined);
  },
});
