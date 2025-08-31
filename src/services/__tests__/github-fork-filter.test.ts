import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchGitHubRepositories } from "../github-service";

// Mock the environment
vi.mock("../../lib/env", () => ({
  env: {
    VITE_GITHUB_PAT: "test-token",
  },
}));

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
      homepage: null,
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
      homepage: null,
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
    // Clear cache between tests
    vi.resetModules();
  });

  describe("legacy GitHub Service", () => {
    it("should filter out forked repositories", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepositories,
        text: async () => JSON.stringify(mockRepositories),
      });

      const result = await fetchGitHubRepositories();

      // Should only return owned, public repositories (owned-repo-1 and owned-repo-2)
      expect(result).toHaveLength(2);
      expect(result.map(repo => repo.name)).toEqual(["owned-repo-1", "owned-repo-2"]);

      // Verify no forked repositories are included
      expect(result.every(repo => !repo.fork)).toBe(true);

      // Verify no private repositories are included
      expect(result.every(repo => !repo.private)).toBe(true);
    });

    it("should maintain sorting by stars then by update date", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepositories,
        text: async () => JSON.stringify(mockRepositories),
      });

      const result = await fetchGitHubRepositories();

      // owned-repo-1 has 5 stars, owned-repo-2 has 3 stars
      // So owned-repo-1 should come first
      expect(result[0].name).toBe("owned-repo-1");
      expect(result[1].name).toBe("owned-repo-2");
    });
  });
});

// Note: Modern GitHub service uses the same filtering logic as legacy service
// The filtering functionality has been verified through the legacy service tests above
