import { afterEach, describe, expect, it } from "vitest";

import { hydrateFromPrerender, QUERY_STATE_ELEMENT_ID, queryClient } from "../../src/lib/query-client";

afterEach(() => {
  document.body.innerHTML = "";
  queryClient.clear();
});

describe("hydrateFromPrerender", () => {
  // src/index.tsx calls it before createRoot, so a throw here leaves a blank page
  it("ignores a malformed query state script, so the app still mounts", () => {
    document.body.innerHTML = `<script type="application/json" id="${QUERY_STATE_ELEMENT_ID}">{"queries":[</script>`;

    expect(() => hydrateFromPrerender()).not.toThrow();
    expect(queryClient.getQueryCache().getAll()).toHaveLength(0);
  });
});
