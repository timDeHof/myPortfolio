export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  category?: "showcase" | "personal" | "contribution" | "fork";
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface GitHubUser {
  created_at: string;
  updated_at: string;
  location: string | undefined;
  blog: string | undefined;
  twitter_username: string | undefined;
  company: string | undefined;
  login: string;
  id: number;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubError {
  message: string;
  status: number;
  url: string;
}

export class GitHubAPIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    message?: string,
  ) {
    super(message || `GitHub API Error: ${status} ${statusText}`);
    this.name = "GitHubAPIError";
  }
}
