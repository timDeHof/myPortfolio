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
});
