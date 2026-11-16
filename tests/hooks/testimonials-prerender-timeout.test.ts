// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import { TESTIMONIALS_PRERENDER_TIMEOUT_MS, testimonialsQuery } from "../../src/hooks/use-testimonials";
import { githubAPI } from "../../src/services/api/github";

// The prerender runs without a window. /about's loader waits for testimonials
// there, so a request that never answers would hold the build.
describe("testimonials during the prerender", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("gives up and aborts the request when GitHub doesn't answer in time", async () => {
    vi.useFakeTimers();
    const fetchContents = vi.spyOn(githubAPI, "fetchContents").mockImplementation((_owner, _repo, _path, signal?: AbortSignal) => new Promise<never>((_resolve, reject) => {
      signal?.addEventListener("abort", () => reject(signal.reason));
    }));
    const queryFn = testimonialsQuery.queryFn as (context: { signal: AbortSignal }) => Promise<unknown>;

    const result = queryFn({ signal: new AbortController().signal });
    const settled = expect(result).rejects.toBeDefined();
    await vi.advanceTimersByTimeAsync(TESTIMONIALS_PRERENDER_TIMEOUT_MS);
    await settled;

    const signal = fetchContents.mock.calls[0][3] as AbortSignal | undefined;
    expect(signal?.aborted).toBe(true);
  });
});
