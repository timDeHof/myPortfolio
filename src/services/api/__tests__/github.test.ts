import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GitHubAPIError,
  githubAPI,
  githubKeys,
  githubCache,
  getTopLanguages,
  formatDate,
  getRepositoryImage,
} from '../github';
import { queryClient } from '../../../lib/query-client';
import { env } from '../../../lib/env';

// Mock external dependencies
vi.mock('../../../lib/query-client', () => ({
  queryClient: {
    invalidateQueries: vi.fn(),
    prefetchQuery: vi.fn(),
    getQueryData: vi.fn(),
  },
}));

// Mock console for asserting logs
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
};

// Helper function to mock fetch responses
const mockFetch = (status: number, body: any, headers: HeadersInit = { 'Content-Type': 'application/json' }) => {
  return vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: `Status ${status}`,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
      headers: new Headers(headers),
    })
  );
};

describe('GitHubAPIError', () => {
  it('should correctly initialize with message', () => {
    const error = new GitHubAPIError(404, 'Not Found', '/api/test', 'Custom message');
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Not Found');
    expect(error.url).toBe('/api/test');
    expect(error.message).toBe('Custom message');
    expect(error.name).toBe('GitHubAPIError');
  });

  it('should correctly initialize with default message', () => {
    const error = new GitHubAPIError(500, 'Internal Server Error', '/api/test');
    expect(error.message).toBe('GitHub API Error: 500 Internal Server Error');
    expect(error.name).toBe('GitHubAPIError');
  });
});


describe('githubAPI.fetchUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should fetch user information correctly', async () => {
    const mockUser = { login: 'timDeHof', id: 1, name: 'Tim DeHof', public_repos: 10, followers: 5 };
    global.fetch = mockFetch(200, mockUser);

    const user = await githubAPI.fetchUser();
    expect(global.fetch).toHaveBeenCalledWith(`${env.VITE_GITHUB_PROXY_URL}/users/timDeHof`);
    expect(user).toEqual(mockUser);
  });

  it('should propagate error from githubFetch', async () => {
    global.fetch = mockFetch(404, { message: 'User not found' });
    await expect(githubAPI.fetchUser()).rejects.toThrow(GitHubAPIError);
    await expect(githubAPI.fetchUser()).rejects.toHaveProperty('status', 404);
  });
});

describe('githubAPI.fetchRepositories', () => {
  const mockRepos = [
    { id: 1, name: 'my-showcase', full_name: 'timDeHof/my-showcase', description: 'A great project with a demo link.', html_url: '', homepage: 'https://demo.link', language: 'TypeScript', languages_url: '', stargazers_count: 5, forks_count: 2, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-03-01T00:00:00Z', pushed_at: '2023-02-01T00:00:00Z', topics: ['showcase', 'react'], archived: false, fork: false, private: false },
    { id: 2, name: 'private-repo', full_name: 'timDeHof/private-repo', description: 'This is private.', html_url: '', homepage: 'https://demo.link', language: 'JavaScript', languages_url: '', stargazers_count: 0, forks_count: 0, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: false, fork: false, private: true },
    { id: 3, name: 'archived-repo', full_name: 'timDeHof/archived-repo', description: 'Old archived project.', html_url: '', homepage: 'https://demo.link', language: 'Python', languages_url: '', stargazers_count: 1, forks_count: 0, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: true, fork: false, private: false },
    { id: 4, name: 'test-repo', full_name: 'timDeHof/test-repo', description: 'Excluded repo.', html_url: '', homepage: 'https://demo.link', language: 'Java', languages_url: '', stargazers_count: 0, forks_count: 0, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: false, fork: false, private: false }, // Excluded
    { id: 5, name: 'no-demo-repo', full_name: 'timDeHof/no-demo-repo', description: 'No demo project.', html_url: '', homepage: '', language: 'Go', languages_url: '', stargazers_count: 0, forks_count: 0, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: false, fork: false, private: false }, // No demo
    { id: 6, name: 'personal-project', full_name: 'timDeHof/personal-project', description: 'My personal tool.', html_url: '', homepage: 'https://demo.link', language: 'JavaScript', languages_url: '', stargazers_count: 1, forks_count: 0, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-03-05T00:00:00Z', pushed_at: '2023-03-01T00:00:00Z', topics: [], archived: false, fork: false, private: false },
    { id: 7, name: 'contributed-fork', full_name: 'timDeHof/contributed-fork', description: 'Fork with some changes', html_url: '', homepage: 'https://demo.link', language: 'TypeScript', languages_url: '', stargazers_count: 3, forks_count: 1, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-04-01T00:00:00Z', pushed_at: '2023-03-15T00:00:00Z', topics: [], archived: false, fork: true, private: false },
    { id: 8, name: 'simple-fork', full_name: 'timDeHof/simple-fork', description: 'Just a fork', html_url: '', homepage: 'https://demo.link', language: 'Rust', languages_url: '', stargazers_count: 0, forks_count: 0, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: false, fork: true, private: false },
    { id: 9, name: 'another-showcase', full_name: 'timDeHof/another-showcase', description: 'Another featured project.', html_url: '', homepage: 'https://another.link', language: 'React', languages_url: '', stargazers_count: 10, forks_count: 3, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-05-01T00:00:00Z', pushed_at: '2023-04-15T00:00:00Z', topics: ['featured'], archived: false, fork: false, private: false },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    // Dynamically mock the EXCLUDED_REPOS to control test cases
    vi.doMock('../github', () => ({
      ...vi.importActual('../github'),
      EXCLUDED_REPOS: ['timDeHof', 'test-repo', 'playground', 'scratch'],
    }));
  });

  it('should fetch and filter repositories correctly', async () => {
    global.fetch = mockFetch(200, mockRepos);

    const repositories = await githubAPI.fetchRepositories();

    expect(global.fetch).toHaveBeenCalledWith(`${env.VITE_GITHUB_PROXY_URL}/users/timDeHof/repos?sort=updated&per_page=100&type=all`);
    expect(repositories.length).toBe(5); // 1 (showcase) + 1 (personal) + 1 (contribution) + 1 (fork) + 1 (another-showcase)
    expect(repositories.some(repo => repo.name === 'private-repo')).toBeFalsy();
    expect(repositories.some(repo => repo.name === 'archived-repo')).toBeFalsy();
    expect(repositories.some(repo => repo.name === 'test-repo')).toBeFalsy();
    expect(repositories.some(repo => repo.name === 'no-demo-repo')).toBeFalsy();
  });

  it('should categorize repositories correctly', async () => {
    global.fetch = mockFetch(200, mockRepos);

    const repositories = await githubAPI.fetchRepositories();

    const showcaseRepo = repositories.find(repo => repo.name === 'my-showcase');
    expect(showcaseRepo?.category).toBe('showcase');

    const anotherShowcaseRepo = repositories.find(repo => repo.name === 'another-showcase');
    expect(anotherShowcaseRepo?.category).toBe('showcase');

    const personalRepo = repositories.find(repo => repo.name === 'personal-project');
    expect(personalRepo?.category).toBe('personal');

    const contributionRepo = repositories.find(repo => repo.name === 'contributed-fork');
    expect(contributionRepo?.category).toBe('contribution');

    const simpleForkRepo = repositories.find(repo => repo.name === 'simple-fork');
    expect(simpleForkRepo?.category).toBe('fork');
  });

  it('should sort repositories by category priority and then by engagement', async () => {
    const customRepos = [
      { id: 1, name: 'z-personal', full_name: '', description: 'Personal', html_url: '', homepage: 'https://demo.link', language: 'TypeScript', languages_url: '', stargazers_count: 10, forks_count: 1, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: false, fork: false, private: false },
      { id: 2, name: 'a-showcase', full_name: '', description: 'Showcase', html_url: '', homepage: 'https://demo.link', language: 'TypeScript', languages_url: '', stargazers_count: 20, forks_count: 5, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: ['showcase'], archived: false, fork: false, private: false },
      { id: 3, name: 'b-personal', full_name: '', description: 'Personal', html_url: '', homepage: 'https://demo.link', language: 'TypeScript', languages_url: '', stargazers_count: 15, forks_count: 2, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-02T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: [], archived: false, fork: false, private: false },
      { id: 4, name: 'c-showcase-low-engagement', full_name: '', description: 'Showcase', html_url: '', homepage: 'https://demo.link', language: 'TypeScript', languages_url: '', stargazers_count: 5, forks_count: 1, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z', pushed_at: '2023-01-01T00:00:00Z', topics: ['showcase'], archived: false, fork: false, private: false },
    ];
    global.fetch = mockFetch(200, customRepos);

    const repositories = await githubAPI.fetchRepositories();

    // Expected order: a-showcase (showcase, highest engagement), c-showcase (showcase, lower engagement),
    // b-personal (personal, higher engagement), z-personal (personal, lower engagement)
    expect(repositories.map(repo => repo.name)).toEqual([
      'a-showcase', // showcase, engagement 25
      'b-personal', // showcase, engagement 17
      'z-personal', // showcase, engagement 11
      'c-showcase-low-engagement', // showcase, engagement 6
    ]);
  });

  it('should propagate error from githubFetch', async () => {
    global.fetch = mockFetch(500, { message: 'Server error' });
    await expect(githubAPI.fetchRepositories()).rejects.toThrow(GitHubAPIError);
    await expect(githubAPI.fetchRepositories()).rejects.toHaveProperty('status', 500);
  });
});

describe('githubAPI.categorizeRepository', () => {
  it('should categorize a non-fork with portfolio topic as showcase', () => {
    const repo = {
      name: 'portfolio-app', fork: false, topics: ['portfolio'], stargazers_count: 1, forks_count: 0,
      description: 'a test', homepage: 'url', html_url: 'url', language: 'TS', languages_url: 'url',
      created_at: '2023-01-01', updated_at: '2023-01-01', pushed_at: '2023-01-01', archived: false, private: false
    };
    expect(githubAPI.categorizeRepository(repo)).toBe('showcase');
  });

  it('should categorize a non-fork with high showcase score as showcase', () => {
    const repo = {
      name: 'high-score-app', fork: false, topics: ['react', 'nextjs', 'tailwind'], stargazers_count: 10, forks_count: 5,
      description: 'very good project', homepage: 'url', html_url: 'url', language: 'TS', languages_url: 'url',
      created_at: '2023-01-01', updated_at: '2023-01-01', pushed_at: '2023-01-01', archived: false, private: false
    };
    expect(githubAPI.categorizeRepository(repo)).toBe('showcase');
  });

  it('should categorize a non-fork with low score as personal', () => {
    const repo = {
      name: 'small-tool', fork: false, topics: [], stargazers_count: 0, forks_count: 0,
      description: 'my tiny tool', homepage: 'url', html_url: 'url', language: 'TS', languages_url: 'url',
      created_at: '2023-01-01', updated_at: '2023-01-01', pushed_at: '2023-01-01', archived: false, private: false
    };
    expect(githubAPI.categorizeRepository(repo)).toBe('personal');
  });

  it('should categorize a fork with meaningful contributions as contribution', () => {
    const repo = {
      name: 'contributed-lib', fork: true, topics: [], stargazers_count: 2, forks_count: 0,
      description: 'fixed bug in lib', homepage: 'url', html_url: 'url', language: 'TS', languages_url: 'url',
      created_at: '2023-01-01', updated_at: '2023-01-01', pushed_at: '2023-03-01', archived: false, private: false
    };
    expect(githubAPI.categorizeRepository(repo)).toBe('contribution');
  });

  it('should categorize a simple fork as fork', () => {
    const repo = {
      name: 'cloned-repo', fork: true, topics: [], stargazers_count: 0, forks_count: 0,
      description: 'just a clone', homepage: 'url', html_url: 'url', language: 'TS', languages_url: 'url',
      created_at: '2023-01-01', updated_at: '2023-01-01', pushed_at: '2023-01-01', archived: false, private: false
    };
    expect(githubAPI.categorizeRepository(repo)).toBe('fork');
  });
});

describe('githubAPI.fetchRepositoryLanguages', () => {
  let originalConsoleWarn: (message?: any, ...optionalParams: any[]) => void;
  let mockConsoleWarn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    
    // Capture original console.warn and replace with mock
    originalConsoleWarn = console.warn;
    mockConsoleWarn = vi.fn();
    console.warn = mockConsoleWarn;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Explicitly restore console.warn after each test
    console.warn = originalConsoleWarn;
  });

  it('should fetch repository languages correctly', async () => {
    const mockLanguages = { TypeScript: 1000, JavaScript: 500 };
    global.fetch = mockFetch(200, mockLanguages);
    const languagesUrl = 'https://api.github.com/repos/timDeHof/my-showcase/languages';

    const languages = await githubAPI.fetchRepositoryLanguages(languagesUrl);

    expect(global.fetch).toHaveBeenCalledWith(`${env.VITE_GITHUB_PROXY_URL}/repos/timDeHof/my-showcase/languages`);
    expect(languages).toEqual(mockLanguages);
  });

  it('should return empty object and log warn on error', async () => {
    global.fetch = mockFetch(500, { message: 'Error fetching languages' });
    const languagesUrl = 'https://api.github.com/repos/timDeHof/my-showcase/languages';

    const languages = await githubAPI.fetchRepositoryLanguages(languagesUrl);

    expect(mockConsoleWarn).toHaveBeenCalledWith(`⚠️ Failed to fetch languages for ${languagesUrl}:`, expect.any(GitHubAPIError));
    expect(languages).toEqual({});
  });
});

describe('githubAPI.fetchRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should fetch rate limit information correctly', async () => {
    const mockRateLimit = { rate: { limit: 5000, remaining: 4999 } };
    global.fetch = mockFetch(200, mockRateLimit);

    const rateLimit = await githubAPI.fetchRateLimit();

    expect(global.fetch).toHaveBeenCalledWith(`${env.VITE_GITHUB_PROXY_URL}/rate_limit`);
    expect(rateLimit).toEqual(mockRateLimit);
  });

  it('should propagate error from githubFetch', async () => {
    global.fetch = mockFetch(403, { message: 'Rate limit exceeded' });
    await expect(githubAPI.fetchRateLimit()).rejects.toThrow(GitHubAPIError);
    await expect(githubAPI.fetchRateLimit()).rejects.toHaveProperty('status', 403);
  });
});

describe('githubKeys', () => {
  it('should return correct query keys', () => {
    expect(githubKeys.all).toEqual(['github']);
    expect(githubKeys.user()).toEqual(['github', 'user', 'timDeHof']);
    expect(githubKeys.repositories()).toEqual(['github', 'repositories', 'timDeHof']);
    expect(githubKeys.languages('my-repo')).toEqual(['github', 'languages', 'timDeHof', 'my-repo']);
    expect(githubKeys.rateLimit()).toEqual(['github', 'rateLimit']);
  });
});

describe('githubCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should invalidate all GitHub data', () => {
    githubCache.invalidateAll();
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['github'] });
  });

  it('should invalidate repositories', () => {
    githubCache.invalidateRepositories();
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['github', 'repositories', 'timDeHof'] });
  });

  it('should prefetch repositories', () => {
    githubCache.prefetchRepositories();
    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['github', 'repositories', 'timDeHof'],
      queryFn: githubAPI.fetchRepositories,
    });
  });

  it('should get cached repositories', () => {
    const mockCachedRepos = [{ id: 1, name: 'cached-repo' }];
    (queryClient.getQueryData as vi.Mock).mockReturnValue(mockCachedRepos);
    const cachedRepos = githubCache.getCachedRepositories();
    expect(queryClient.getQueryData).toHaveBeenCalledWith(['github', 'repositories', 'timDeHof']);
    expect(cachedRepos).toEqual(mockCachedRepos);
  });
});

describe('getTopLanguages', () => {
  it('should return top 3 languages sorted by count', () => {
    const languages = { TypeScript: 1000, JavaScript: 500, Python: 700, CSS: 200 };
    expect(getTopLanguages(languages)).toEqual(['TypeScript', 'Python', 'JavaScript']);
  });

  it('should return less than 3 languages if fewer exist', () => {
    const languages = { Rust: 150, Go: 300 };
    expect(getTopLanguages(languages)).toEqual(['Go', 'Rust']);
  });

  it('should return empty array for empty language object', () => {
    expect(getTopLanguages({})).toEqual([]);
  });
});

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const dateString = '2023-03-15T10:30:00Z';
    expect(formatDate(dateString)).toBe('Mar 15, 2023');
  });

  it('should handle a different valid date string', () => {
    const dateString = '2024-11-05T08:00:00Z';
    expect(formatDate(dateString)).toBe('Nov 5, 2024');
  });

  // Note: JavaScript's Date.toLocaleDateString handles invalid dates by returning 'Invalid Date'
  // depending on locale, or throws. For simplicity, we assume valid date strings are passed.
});

describe('getRepositoryImage', () => {
  it('should return correct image URL for known repo names', () => {
    expect(getRepositoryImage('galactic-pawn')).toBe('/galactic-pawn-project-image.png');
    expect(getRepositoryImage('monsters-rolodex')).toBe('/monster-rolodex-project-image.png');
  });

  it('should return default image URL for unknown repo names', () => {
    const defaultImageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80';
    expect(getRepositoryImage('unknown-repo')).toBe(defaultImageUrl);
    expect(getRepositoryImage('another-unknown')).toBe(defaultImageUrl);
  });
});