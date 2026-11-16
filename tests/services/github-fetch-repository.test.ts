import { afterEach, describe, expect, it, vi } from "vitest";

import { githubAPI } from "../../src/services/api/github";

function repos(names: string[]) {
  return names.map(name => ({ name, stargazers_count: name.length }));
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

describe("githubAPI.fetchRepository", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("follows later pages when the repository isn't in the first 100", async () => {
    const firstPage = repos(Array.from({ length: 100 }, (_, i) => `repo-${i}`));
    const fetchMock = vi.fn(async (url: string) => jsonResponse(url.includes("page=2") ? repos(["shadcn-timeline"]) : firstPage));
    vi.stubGlobal("fetch", fetchMock);

    const repository = await githubAPI.fetchRepository("timDeHof", "shadcn-timeline");

    expect(repository.name).toBe("shadcn-timeline");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("stops at a short page and reports the repository as not found", async () => {
    const fetchMock = vi.fn(async () => jsonResponse(repos(["one", "two"])));
    vi.stubGlobal("fetch", fetchMock);

    await expect(githubAPI.fetchRepository("timDeHof", "shadcn-timeline")).rejects.toMatchObject({ status: 404 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("stops after a bounded number of pages when every page is full", async () => {
    // A proxy that ignores `page` returns the same full page forever. Stop the
    // mock well past any sane bound, so an unbounded loop fails instead of hanging.
    const fullPage = repos(Array.from({ length: 100 }, (_, i) => `repo-${i}`));
    const fetchMock = vi.fn(async () => {
      if (fetchMock.mock.calls.length > 50) {
        throw new Error("fetchRepository requested more than 50 pages");
      }
      return jsonResponse(fullPage);
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(githubAPI.fetchRepository("timDeHof", "shadcn-timeline")).rejects.toMatchObject({ status: 404 });
    expect(fetchMock.mock.calls.length).toBeLessThanOrEqual(10);
  });
});
