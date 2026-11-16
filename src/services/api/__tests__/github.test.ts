import type { Mock } from "vitest";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { env } from "../../../lib/env";
import {
  githubAPI,
  GitHubAPIError,
  githubKeys,
} from "../github";
import { createMockFetch } from "./test-utils";

const mockFetch = createMockFetch;

// Silence console output from the code under test
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

describe("gitHubAPIError", () => {
  it("should correctly initialize with message", () => {
    const error = new GitHubAPIError(404, "Not Found", "/api/test", "Custom message");
    expect(error.status).toBe(404);
    expect(error.statusText).toBe("Not Found");
    expect(error.url).toBe("/api/test");
    expect(error.message).toBe("Custom message");
    expect(error.name).toBe("GitHubAPIError");
  });

  it("should correctly initialize with default message", () => {
    const error = new GitHubAPIError(500, "Internal Server Error", "/api/test");
    expect(error.message).toBe("GitHub API Error: 500 Internal Server Error");
    expect(error.name).toBe("GitHubAPIError");
  });
});

describe("githubAPI.fetchUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("should fetch user information correctly", async () => {
    const mockUser = { login: "timDeHof", id: 1, name: "Tim DeHof", public_repos: 10, followers: 5 };
    globalThis.fetch = mockFetch(200, mockUser);

    const user = await githubAPI.fetchUser();
    expect(globalThis.fetch).toHaveBeenCalledWith(`${env.VITE_API_BASE_URL}/github/users/timDeHof`);
    expect(user).toEqual(mockUser);
  });

  it("should propagate error from githubFetch", async () => {
    globalThis.fetch = mockFetch(404, { message: "User not found" });
    await expect(githubAPI.fetchUser()).rejects.toThrow(GitHubAPIError);
    await expect(githubAPI.fetchUser()).rejects.toHaveProperty("status", 404);
  });
});

describe("githubAPI.fetchContents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("should fetch and decode base64-encoded JSON content", async () => {
    const payload = { title: "Test Project", description: "A test" };
    const encoded = btoa(JSON.stringify(payload));
    globalThis.fetch = mockFetch(200, { content: encoded });

    const result = await githubAPI.fetchContents<typeof payload>("timDeHof", "portfolio-metadata", "project.json");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${env.VITE_API_BASE_URL}/github/repos/timDeHof/portfolio-metadata/contents/project.json`,
    );
    expect(result).toEqual(payload);
  });

  it("should handle content with newlines in base64", async () => {
    const payload = { items: [1, 2, 3] };
    const encoded = btoa(JSON.stringify(payload));
    // Insert newlines every 40 chars to simulate GitHub's response format
    const withNewlines = encoded.match(/.{1,40}/g)?.join("\n") || encoded;
    globalThis.fetch = mockFetch(200, { content: withNewlines });

    const result = await githubAPI.fetchContents<typeof payload>("timDeHof", "repo", "data.json");
    expect(result).toEqual(payload);
  });

  it("should throw GitHubAPIError when content field is missing", async () => {
    globalThis.fetch = mockFetch(200, {});

    await expect(
      githubAPI.fetchContents("timDeHof", "repo", "missing.json"),
    ).rejects.toThrow(GitHubAPIError);
  });

  it("should throw GitHubAPIError on network error", async () => {
    globalThis.fetch = mockFetch(500, { message: "Server error" });

    await expect(
      githubAPI.fetchContents("timDeHof", "repo", "data.json"),
    ).rejects.toThrow(GitHubAPIError);
  });
});

describe("githubAPI.fetchRepositories", () => {
  const mockRepos = [
    { id: 1, name: "my-showcase", full_name: "timDeHof/my-showcase", description: "A great project with a demo link.", html_url: "", homepage: "https://demo.link", language: "TypeScript", languages_url: "", stargazers_count: 5, forks_count: 2, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-03-01T00:00:00Z", pushed_at: "2023-02-01T00:00:00Z", topics: ["showcase", "react"], archived: false, fork: false, private: false },
    { id: 2, name: "private-repo", full_name: "timDeHof/private-repo", description: "This is private.", html_url: "", homepage: "https://demo.link", language: "JavaScript", languages_url: "", stargazers_count: 0, forks_count: 0, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z", pushed_at: "2023-01-01T00:00:00Z", topics: [], archived: false, fork: false, private: true },
    { id: 3, name: "archived-repo", full_name: "timDeHof/archived-repo", description: "Old archived project.", html_url: "", homepage: "https://demo.link", language: "Python", languages_url: "", stargazers_count: 1, forks_count: 0, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z", pushed_at: "2023-01-01T00:00:00Z", topics: [], archived: true, fork: false, private: false },
    { id: 4, name: "test-repo", full_name: "timDeHof/test-repo", description: "Excluded repo.", html_url: "", homepage: "https://demo.link", language: "Java", languages_url: "", stargazers_count: 0, forks_count: 0, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z", pushed_at: "2023-01-01T00:00:00Z", topics: [], archived: false, fork: false, private: false }, // Excluded
    { id: 5, name: "no-demo-repo", full_name: "timDeHof/no-demo-repo", description: "No demo project.", html_url: "", homepage: "", language: "Go", languages_url: "", stargazers_count: 0, forks_count: 0, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z", pushed_at: "2023-01-01T00:00:00Z", topics: [], archived: false, fork: false, private: false }, // No demo
    { id: 6, name: "personal-project", full_name: "timDeHof/personal-project", description: "My personal tool.", html_url: "", homepage: "https://demo.link", language: "JavaScript", languages_url: "", stargazers_count: 1, forks_count: 0, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-03-05T00:00:00Z", pushed_at: "2023-03-01T00:00:00Z", topics: [], archived: false, fork: false, private: false },
    { id: 7, name: "contributed-fork", full_name: "timDeHof/contributed-fork", description: "Fork with some changes", html_url: "", homepage: "https://demo.link", language: "TypeScript", languages_url: "", stargazers_count: 3, forks_count: 1, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-04-01T00:00:00Z", pushed_at: "2023-03-15T00:00:00Z", topics: [], archived: false, fork: true, private: false },
    { id: 8, name: "simple-fork", full_name: "timDeHof/simple-fork", description: "Just a fork", html_url: "", homepage: "https://demo.link", language: "Rust", languages_url: "", stargazers_count: 0, forks_count: 0, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-01-01T00:00:00Z", pushed_at: "2023-01-01T00:00:00Z", topics: [], archived: false, fork: true, private: false },
    { id: 9, name: "another-showcase", full_name: "timDeHof/another-showcase", description: "Another featured project.", html_url: "", homepage: "https://another.link", language: "React", languages_url: "", stargazers_count: 10, forks_count: 3, created_at: "2023-01-01T00:00:00Z", updated_at: "2023-05-01T00:00:00Z", pushed_at: "2023-04-15T00:00:00Z", topics: ["featured"], archived: false, fork: false, private: false },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
    // Dynamically mock the EXCLUDED_REPOS to control test cases
    vi.doMock("../github", () => ({
      ...vi.importActual("../github"),
      EXCLUDED_REPOS: ["timDeHof", "test-repo", "playground", "scratch"],
    }));
  });

  it("should fetch and filter repositories correctly", async () => {
    globalThis.fetch = mockFetch(200, mockRepos);

    const repositories = await githubAPI.fetchRepositories();

    expect(globalThis.fetch).toHaveBeenCalledWith(`${env.VITE_API_BASE_URL}/github/users/timDeHof/repos?sort=updated&per_page=100&type=all`);
    expect(repositories.length).toBe(5); // 1 (showcase) + 1 (personal) + 1 (contribution) + 1 (fork) + 1 (another-showcase)
    expect(repositories.some(repo => repo.name === "private-repo")).toBeFalsy();
    expect(repositories.some(repo => repo.name === "archived-repo")).toBeFalsy();
    expect(repositories.some(repo => repo.name === "test-repo")).toBeFalsy();
    expect(repositories.some(repo => repo.name === "no-demo-repo")).toBeFalsy();
  });

  it("should propagate error from githubFetch", async () => {
    globalThis.fetch = mockFetch(500, { message: "Server error" });
    await expect(githubAPI.fetchRepositories()).rejects.toThrow(GitHubAPIError);
    await expect(githubAPI.fetchRepositories()).rejects.toHaveProperty("status", 500);
  });
});

describe("githubAPI.fetchRepositoryLanguages", () => {
  let originalConsoleWarn: (message?: any, ...optionalParams: any[]) => void;
  let mockConsoleWarn: Mock<typeof console.warn>;

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();

    // Capture original console.warn and replace with mock
    originalConsoleWarn = console.warn;
    mockConsoleWarn = vi.fn<typeof console.warn>();
    console.warn = mockConsoleWarn;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Explicitly restore console.warn after each test
    console.warn = originalConsoleWarn;
  });

  it("should fetch repository languages correctly", async () => {
    const mockLanguages = { TypeScript: 1000, JavaScript: 500 };
    globalThis.fetch = mockFetch(200, mockLanguages);
    const languagesUrl = "https://api.github.com/repos/timDeHof/my-showcase/languages";

    const languages = await githubAPI.fetchRepositoryLanguages(languagesUrl);

    expect(globalThis.fetch).toHaveBeenCalledWith(`${env.VITE_API_BASE_URL}/github/repos/timDeHof/my-showcase/languages`);
    expect(languages).toEqual(mockLanguages);
  });

  it("should return empty object and log warn on error", async () => {
    globalThis.fetch = mockFetch(500, { message: "Error fetching languages" });
    const languagesUrl = "https://api.github.com/repos/timDeHof/my-showcase/languages";

    const languages = await githubAPI.fetchRepositoryLanguages(languagesUrl);

    expect(mockConsoleWarn).toHaveBeenCalledWith(`⚠️ Failed to fetch languages for ${languagesUrl}:`, expect.any(GitHubAPIError));
    expect(languages).toEqual({});
  });
});

describe("githubKeys", () => {
  it("should return correct query keys", () => {
    expect(githubKeys.all).toEqual(["github"]);
    expect(githubKeys.user()).toEqual(["github", "user", "timDeHof"]);
    expect(githubKeys.repositories()).toEqual(["github", "repositories", "timDeHof"]);
    expect(githubKeys.languages("my-repo")).toEqual(["github", "languages", "timDeHof", "my-repo"]);
    expect(githubKeys.contents("timDeHof", "my-repo", "data.json")).toEqual(["github", "contents", "timDeHof", "my-repo", "data.json"]);
  });
});
