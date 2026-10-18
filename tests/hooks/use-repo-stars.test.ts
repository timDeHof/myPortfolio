import { afterEach, describe, expect, it, vi } from "vitest";

import { shadcnTimelineStarsQuery, STAR_COUNT_TIMEOUT_MS } from "../../src/hooks/use-repo-stars";
import { githubAPI } from "../../src/services/api/github";

// A GitHub request that never answers, but stops when its signal aborts
function stalledFetch() {
  return vi.spyOn(githubAPI, "fetchRepository").mockImplementation((_owner, _repo, signal) => new Promise<never>((_resolve, reject) => {
    signal?.addEventListener("abort", () => reject(signal.reason));
  }));
}

describe("shadcnTimelineStarsQuery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("gives up and aborts the request when GitHub doesn't answer in time", async () => {
    vi.useFakeTimers();
    const fetchRepository = stalledFetch();
    const queryFn = shadcnTimelineStarsQuery.queryFn as (context: { signal: AbortSignal }) => Promise<number>;

    const result = queryFn({ signal: new AbortController().signal });
    const settled = expect(result).rejects.toBeDefined();
    await vi.advanceTimersByTimeAsync(STAR_COUNT_TIMEOUT_MS);
    await settled;

    const signal = fetchRepository.mock.calls[0][2];
    expect(signal?.aborted).toBe(true);
  });

  it("doesn't retry, so the Open source fallback shows after one attempt", () => {
    expect(shadcnTimelineStarsQuery.retry).toBe(false);
  });
});
