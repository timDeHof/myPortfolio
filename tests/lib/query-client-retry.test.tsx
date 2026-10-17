import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useProject } from "../../src/hooks/use-projects";
import { queryClient } from "../../src/lib/query-client";
import { githubAPI } from "../../src/services/api/github";
import { GitHubAPIError } from "../../src/types/github";

vi.mock("../../src/services/api/github", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/services/api/github")>();
  return { ...actual, githubAPI: { ...actual.githubAPI, fetchContents: vi.fn() } };
});

const retry = queryClient.getDefaultOptions().queries!.retry as (failureCount: number, error: Error) => boolean;
const notFound = () => new GitHubAPIError(404, "Not Found", "/github/repos/timDeHof/portfolio-metadata/contents/x.json", "Not Found");

afterEach(() => {
  queryClient.clear();
  vi.mocked(githubAPI.fetchContents).mockReset();
});

describe("query client retry rule", () => {
  it("does not retry a GitHub 404, whose message is \"Not Found\"", () => {
    expect(retry(0, notFound())).toBe(false);
  });

  it("still retries server errors", () => {
    expect(retry(0, new GitHubAPIError(500, "Internal Server Error", "/github/users/timDeHof"))).toBe(true);
  });

  it("does not retry a project whose file is missing", async () => {
    vi.mocked(githubAPI.fetchContents).mockRejectedValue(notFound());

    const { result } = renderHook(() => useProject("cognidocs"), {
      wrapper: ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    // With retries, the first retry alone waits 1s
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 500 });
    expect(result.current.error?.message).toBe("No data found for project: cognidocs");
    expect(githubAPI.fetchContents).toHaveBeenCalledTimes(1);
  });
});
