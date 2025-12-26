import { beforeEach, describe, expect, it, vi } from "vitest";

import { githubAPI } from "../api/github";

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("gitHub Fork Filtering", () => {
  const mockRepositories = [
    {
      id: 1,
      name: "owned-repo-1",
      full_name: "timDeHof/owned-repo-1",
      description: "Original repository",
      html_url: "https://github.com/timDeHof/owned-repo-1",
      homepage: "https://example.com/owned-repo-1", // Added homepage
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/timDeHof/owned-repo-1/languages",
      stargazers_count: 5,
      forks_count: 2,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-12-01T00:00:00Z",
      pushed_at: "2023-12-01T00:00:00Z",
      topics: ["typescript", "react"],
      archived: false,
      fork: false, // Original repository
      private: false,
    },
    {
      id: 2,
      name: "forked-repo-1",
      full_name: "timDeHof/forked-repo-1",
      description: "Forked repository",
      html_url: "https://github.com/timDeHof/forked-repo-1",
      homepage: null,
      language: "JavaScript",
      languages_url: "https://api.github.com/repos/timDeHof/forked-repo-1/languages",
      stargazers_count: 10,
      forks_count: 5,
      created_at: "2023-02-01T00:00:00Z",
      updated_at: "2023-11-01T00:00:00Z",
      pushed_at: "2023-11-01T00:00:00Z",
      topics: ["javascript"],
      archived: false,
      fork: true, // Forked repository - should be filtered out
      private: false,
    },
    {
      id: 3,
      name: "owned-repo-2",
      full_name: "timDeHof/owned-repo-2",
      description: "Another original repository",
      html_url: "https://github.com/timDeHof/owned-repo-2",
      homepage: "https://example.com/owned-repo-2", // Added homepage
      language: "Python",
      languages_url: "https://api.github.com/repos/timDeHof/owned-repo-2/languages",
      stargazers_count: 3,
      forks_count: 1,
      created_at: "2023-03-01T00:00:00Z",
      updated_at: "2023-10-01T00:00:00Z",
      pushed_at: "2023-10-01T00:00:00Z",
      topics: ["python"],
      archived: false,
      fork: false, // Original repository
      private: false,
    },
    {
      id: 4,
      name: "private-repo",
      full_name: "timDeHof/private-repo",
      description: "Private repository",
      html_url: "https://github.com/timDeHof/private-repo",
      homepage: null,
      language: "TypeScript",
      languages_url: "https://api.github.com/repos/timDeHof/private-repo/languages",
      stargazers_count: 0,
      forks_count: 0,
      created_at: "2023-04-01T00:00:00Z",
      updated_at: "2023-09-01T00:00:00Z",
      pushed_at: "2023-09-01T00:00:00Z",
      topics: [],
      archived: false,
      fork: false,
      private: true, // Private repository - should be filtered out
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should filter out forked, private, and non-demo repositories", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      type: "basic",
      url: "https://api.github.com/users/timDeHof/repos",
      json: async () => mockRepositories,
      text: async () => JSON.stringify(mockRepositories),
    });

    const result = await githubAPI.fetchRepositories();

    // Should only return owned, public repositories with a homepage
    expect(result).toHaveLength(2);
    // Note: The sorting logic is complex, so we check for names inclusively
    const repoNames = result.map(repo => repo.name);
    expect(repoNames).toContain("owned-repo-1");
    expect(repoNames).toContain("owned-repo-2");

    // Verify no forked repositories are included
    expect(result.every(repo => !repo.fork)).toBe(true);

    // Verify no private repositories are included
    expect(result.every(repo => !repo.private)).toBe(true);

    // Verify all returned repos have a homepage
    expect(result.every(repo => repo.homepage)).toBe(true);
  });

  it("should maintain sorting by category and engagement", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      type: "basic",
      url: "https://api.github.com/users/timDeHof/repos",
      json: async () => mockRepositories,
      text: async () => JSON.stringify(mockRepositories),
    });

    const result = await githubAPI.fetchRepositories();

    // owned-repo-1 has more stars, so it should come first in the 'showcase' category
    // The sorting is by category first, then engagement. Both are 'showcase' here.
    expect(result[0].name).toBe("owned-repo-1");
    expect(result[1].name).toBe("owned-repo-2");
  });
});
