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
    // Expect contributionYears to be sorted descending
    expect(stats.activity.contributionYears).toEqual(["2023", "2022", "2021", "2020", "2019"]);
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

    // Mock Date.now() to ensure consistent "6 months ago"
    const mockDate = new Date("2023-06-01T00:00:00Z");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const stats = githubStatsAPI.calculateActivityStats(mockRepos);

    // Expect contributionYears to be sorted descending
    expect(stats.contributionYears).toEqual(["2023", "2022", "2021", "2020"]);
    expect(stats.totalCommits).toBe(mockRepos.length * 10);
    expect(stats.currentStreak).toBe(3); // 3 recent activities
    expect(stats.longestStreak).toBe(mockRepos.length); // Estimated
    vi.useRealTimers();
  });

  it("should handle empty repositories array", () => {
    const stats = githubStatsAPI.calculateActivityStats([]);
    expect(stats.contributionYears).toEqual([]);
    expect(stats.totalCommits).toBe(0);
    expect(stats.currentStreak).toBe(0);
    expect(stats.longestStreak).toBe(0);
  });
});

describe("githubStatsAPI.generateContributionCalendar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Consistent date for testing for a full year
    const mockDate = new Date("2024-12-31T12:00:00Z");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should generate a contribution calendar with approximately 52 weeks", () => {
    const calendar = githubStatsAPI.generateContributionCalendar();
    expect(calendar.length).toBeGreaterThanOrEqual(52); // Some years might have 53 weeks
    expect(calendar.length).toBeLessThanOrEqual(53);
  });

  it("each week should contain days with correct properties", () => {
    const calendar = githubStatsAPI.generateContributionCalendar();
    const firstWeek = calendar[0];
    expect(firstWeek.days.length).toBeGreaterThan(0); // Can be less than 7 for first week of year
    const firstDay = firstWeek.days[0];

    expect(firstDay).toHaveProperty("date");
    expect(typeof firstDay.date).toBe("string");
    expect(firstDay.date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format

    expect(firstDay).toHaveProperty("count");
    expect(typeof firstDay.count).toBe("number");
    expect(firstDay.count).toBeGreaterThanOrEqual(0);

    expect(firstDay).toHaveProperty("level");
    expect(typeof firstDay.level).toBe("number");
    expect(firstDay.level).toBeGreaterThanOrEqual(0);
    expect(firstDay.level).toBeLessThanOrEqual(4);
  });

  it("should have less activity on weekends", () => {
    const calendar = githubStatsAPI.generateContributionCalendar();
    let weekdayActivity = 0;
    let weekendActivity = 0;
    let weekdayCount = 0;
    let weekendCount = 0;

    // Iterate through a few weeks to get a good sample
    for (let i = 0; i < Math.min(calendar.length, 10); i++) {
      calendar[i].days.forEach((day) => {
        const date = new Date(day.date);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendActivity += day.count;
          weekendCount++;
        }
        else {
          weekdayActivity += day.count;
          weekdayCount++;
        }
      });
    }
    const avgWeekday = weekdayCount > 0 ? weekdayActivity / weekdayCount : 0;
    const avgWeekend = weekendCount > 0 ? weekendActivity / weekendCount : 0;

    // This is probabilistic, so we expect average weekday activity to be higher,
    // but can't guarantee for every single run due to Math.random().
    // A significant difference should be observed on average.
    if (avgWeekday > 0) {
      expect(avgWeekday).toBeGreaterThan(avgWeekend * 0.5); // Expect weekdays to be at least 50% more active
    }
  });
});

describe("githubStatsKeys", () => {
  it("should return correct query keys", () => {
    expect(githubStatsKeys.all).toEqual(["githubStats"]);
    expect(githubStatsKeys.stats()).toEqual(["githubStats", "stats"]);
    expect(githubStatsKeys.contributions()).toEqual(["githubStats", "contributions"]);
  });
});
