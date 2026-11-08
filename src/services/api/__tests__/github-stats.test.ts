import type { Mock } from "vitest";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { githubAPI } from "../github"; // Import the actual githubAPI to mock its methods
import { githubStatsAPI, githubStatsKeys } from "../github-stats";

// Mock external dependencies
vi.mock("../github", () => ({
  githubAPI: {
    fetchUser: vi.fn(),
    fetchRepositories: vi.fn(),
    fetchRepositoryLanguages: vi.fn(),
  },
}));

describe("githubStatsAPI.fetchGitHubStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch GitHub stats correctly", async () => {
    const mockProfile = { login: "testuser", name: "Test User", bio: "Bio", public_repos: 5, followers: 10, following: 5, createdAt: "2020-01-01", updated_at: "2023-01-01" };
    const mockRepos = [
      { id: 1, name: "repo1", fork: false, stargazers_count: 5, forks_count: 1, languages_url: "url1", created_at: "2022-01-01", updated_at: "2023-01-01", topics: ["js"] },
      { id: 2, name: "repo2", fork: true, stargazers_count: 2, forks_count: 0, languages_url: "url2", created_at: "2021-01-01", updated_at: "2023-03-01", topics: ["ts"] },
      { id: 3, name: "repo3", fork: false, stargazers_count: 1, forks_count: 0, languages_url: "url3", created_at: "2020-01-01", updated_at: "2020-05-01", topics: ["java"] },
    ] as any[]; // Cast to any to simplify mock
    const mockLanguages = { JavaScript: 1000 };

    (githubAPI.fetchUser as Mock).mockResolvedValue(mockProfile);
    (githubAPI.fetchRepositories as Mock).mockResolvedValue(mockRepos);
    (githubAPI.fetchRepositoryLanguages as Mock).mockResolvedValue(mockLanguages);

    const stats = await githubStatsAPI.fetchGitHubStats();

    expect(githubAPI.fetchUser).toHaveBeenCalledTimes(1);
    expect(githubAPI.fetchRepositories).toHaveBeenCalledTimes(1);
    expect(stats.profile.login).toBe(mockProfile.login);
    expect(stats.repositories.total).toBe(mockRepos.length);
    expect(stats.repositories.stars).toBe(8); // 5+2+1
    expect(stats.repositories.languages.length).toBeGreaterThan(0);
    // Expect contributionYears to be sorted descending.
    // Years come from the UTC instants of the fixture dates; the previous
    // expectation included a phantom "2019" that only appeared west of UTC.
    expect(stats.activity.contributionYears).toEqual(["2023", "2022", "2021", "2020"]);
  });

  it("should propagate errors from fetchUser", async () => {
    (githubAPI.fetchUser as Mock).mockRejectedValue(new Error("User fetch failed"));
    (githubAPI.fetchRepositories as Mock).mockResolvedValue([]);

    await expect(githubStatsAPI.fetchGitHubStats()).rejects.toThrow("User fetch failed");
  });

  it("should propagate errors from fetchRepositories", async () => {
    (githubAPI.fetchUser as Mock).mockResolvedValue({});
    (githubAPI.fetchRepositories as Mock).mockRejectedValue(new Error("Repos fetch failed"));

    await expect(githubStatsAPI.fetchGitHubStats()).rejects.toThrow("Repos fetch failed");
  });
});

describe("githubStatsAPI.calculateRepositoryStats", () => {
  let mockConsoleWarn: (...data: any[]) => void;
  let originalConsoleWarn: (message?: any, ...optionalParams: any[]) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    // Directly mock console.warn for this describe block
    originalConsoleWarn = console.warn;
    mockConsoleWarn = vi.fn((..._data: any[]) => {});
    console.warn = mockConsoleWarn;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    console.warn = originalConsoleWarn; // Restore original console.warn
  });

  it("should calculate repository stats correctly", async () => {
    const mockRepos = [
      { id: 1, name: "repo1", fork: false, stargazers_count: 10, forks_count: 2, languages_url: "url1", topics: ["typescript", "react"], created_at: "2022-01-01", updated_at: "2023-01-01" },
      { id: 2, name: "repo2", fork: true, stargazers_count: 5, forks_count: 1, languages_url: "url2", topics: ["javascript", "node"], created_at: "2021-01-01", updated_at: "2023-03-01" },
      { id: 3, name: "repo3", fork: false, stargazers_count: 1, forks_count: 0, languages_url: "", topics: ["css"], created_at: "2020-01-01", updated_at: "2023-02-01" },
    ] as any[];

    (githubAPI.fetchRepositoryLanguages as Mock)
      .mockImplementation((url: string) => {
        if (url === "url1")
          return Promise.resolve({ TypeScript: 5000, JavaScript: 1000 });
        if (url === "url2")
          return Promise.resolve({ JavaScript: 3000, Python: 2000 });
        return Promise.resolve({});
      });

    const stats = await githubStatsAPI.calculateRepositoryStats(mockRepos);

    expect(stats.total).toBe(3);
    expect(stats.personal).toBe(2);
    expect(stats.contributions).toBe(1);
    expect(stats.stars).toBe(16); // 10 + 5 + 1
    expect(stats.forks).toBe(3); // 2 + 1 + 0

    expect(stats.languages.length).toBe(3);
    expect(stats.languages[0].name).toBe("TypeScript");
    expect(stats.languages[0].percentage).toBeCloseTo((5000 / 11000) * 100);
    expect(stats.languages[1].name).toBe("JavaScript");
    expect(stats.languages[1].percentage).toBeCloseTo((4000 / 11000) * 100);
    expect(stats.languages[2].name).toBe("Python");
    expect(stats.languages[2].percentage).toBeCloseTo((2000 / 11000) * 100);

    // Corrected assertion: 5 unique topics
    expect(stats.topics.length).toBe(5);
    expect(stats.topics.find(t => t.name === "typescript")?.count).toBe(1);
    expect(stats.topics.find(t => t.name === "javascript")?.count).toBe(1);
  });

  it("should handle empty repositories array", async () => {
    const stats = await githubStatsAPI.calculateRepositoryStats([]);
    expect(stats.total).toBe(0);
    expect(stats.personal).toBe(0);
    expect(stats.contributions).toBe(0);
    expect(stats.stars).toBe(0);
    expect(stats.forks).toBe(0);
    expect(stats.languages).toEqual([]);
    expect(stats.topics).toEqual([]);
  });

  it("should handle repositories without languages_url or topics gracefully", async () => {
    const mockRepos = [
      { id: 1, name: "repo1", fork: false, stargazers_count: 0, forks_count: 0, languages_url: "", topics: [], created_at: "2023-01-01", updated_at: "2023-01-01" },
    ] as any[];
    (githubAPI.fetchRepositoryLanguages as Mock).mockResolvedValue({});

    const stats = await githubStatsAPI.calculateRepositoryStats(mockRepos);
    expect(stats.languages).toEqual([]);
    expect(stats.topics).toEqual([]);
  });

  it("should handle fetchRepositoryLanguages errors by returning empty object", async () => {
    const mockRepos = [
      { id: 1, name: "repo1", fork: false, stargazers_count: 1, forks_count: 0, languages_url: "url1", topics: [], created_at: "2023-01-01", updated_at: "2023-01-01" },
    ] as any[];
    (githubAPI.fetchRepositoryLanguages as Mock).mockRejectedValue(new Error("Failed to fetch"));

    const stats = await githubStatsAPI.calculateRepositoryStats(mockRepos);
    expect(stats.languages).toEqual([]);
    expect(mockConsoleWarn).toHaveBeenCalledTimes(1); // Use the direct mock
    expect(mockConsoleWarn).toHaveBeenCalledWith(`⚠️ Failed to fetch languages for url1:`, expect.any(Error));
  });
});

describe("githubStatsAPI.calculateActivityStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should calculate activity stats correctly", () => {
    const mockRepos = [
      { created_at: "2023-01-01", updated_at: "2023-03-01" }, // Recent
      { created_at: "2023-02-01", updated_at: "2023-04-15" }, // Recent
      { created_at: "2022-01-01", updated_at: "2022-06-01" }, // Not recent
      { created_at: "2021-01-01", updated_at: "2023-05-20" }, // Recent
    ] as any[];

    const stats = githubStatsAPI.calculateActivityStats(mockRepos);

    // Expect contributionYears to be sorted descending.
    // Fixture years in UTC are {2023, 2022, 2021}; the previous "2020" was an
    // artifact of reading UTC-midnight dates back in a negative-offset zone.
    expect(stats).toEqual({ contributionYears: ["2023", "2022", "2021"] });
  });

  it("should handle empty repositories array", () => {
    const stats = githubStatsAPI.calculateActivityStats([]);
    expect(stats).toEqual({ contributionYears: [] });
  });
});

describe("githubStatsAPI.fetchContributions", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // A failure must reach the calendar's error state, not become a made-up history
  it("rethrows when the contributions API fails instead of returning random data", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 503, statusText: "Service Unavailable" })));

    await expect(githubStatsAPI.fetchContributions("timDeHof")).rejects.toThrow("Failed to fetch contributions: 503 Service Unavailable");
  });
});

describe("githubStatsKeys", () => {
  it("should return correct query keys", () => {
    expect(githubStatsKeys.all).toEqual(["githubStats"]);
    expect(githubStatsKeys.stats()).toEqual(["githubStats", "stats"]);
    expect(githubStatsKeys.contributions("timDeHof")).toEqual(["githubStats", "contributions", "timDeHof"]);
  });
});
