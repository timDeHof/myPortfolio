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
    vi.unstubAllGlobals();
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

  it("doesn't log the timeout as a network error", async () => {
    vi.useFakeTimers();
    // A network request that never answers, but stops when its signal aborts
    vi.stubGlobal("fetch", vi.fn((_url: string, init?: RequestInit) => new Promise<never>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
    })));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const queryFn = shadcnTimelineStarsQuery.queryFn as (context: { signal: AbortSignal }) => Promise<number>;

    const result = queryFn({ signal: new AbortController().signal });
    const settled = expect(result).rejects.toThrow(`Star count timed out after ${STAR_COUNT_TIMEOUT_MS}ms`);
    await vi.advanceTimersByTimeAsync(STAR_COUNT_TIMEOUT_MS);
    await settled;

    expect(consoleError).not.toHaveBeenCalled();
  });

  it("stops following the query's signal once the count has loaded", async () => {
    const fetchRepository = vi.spyOn(githubAPI, "fetchRepository").mockResolvedValue({ stargazers_count: 317 } as Awaited<ReturnType<typeof githubAPI.fetchRepository>>);
    const queryFn = shadcnTimelineStarsQuery.queryFn as (context: { signal: AbortSignal }) => Promise<number>;
    const query = new AbortController();

    await expect(queryFn({ signal: query.signal })).resolves.toBe(317);
    query.abort();

    const signal = fetchRepository.mock.calls[0][2];
    expect(signal?.aborted).toBe(false);
  });

  it("doesn't retry, so the Open source fallback shows after one attempt", () => {
    expect(shadcnTimelineStarsQuery.retry).toBe(false);
  });
});
