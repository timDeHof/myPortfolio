import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GitHubStatsCard } from "../../../src/components/github/github-stats-card";

const stats = {
  profile: {
    login: "timDeHof",
    name: "Tim DeHof",
    bio: "",
    public_repos: 4,
    followers: 10,
    following: 2,
    created_at: "2020-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  repositories: { total: 4, languages: [], topics: [], stars: 300, forks: 20, personal: 4, contributions: 0 },
  activity: { contributionYears: ["2026", "2025"] },
};

vi.mock("../../../src/hooks/queries/use-github-stats", () => ({
  useGitHubStats: () => ({ data: stats, isLoading: false, error: null }),
}));

describe("gitHub stats card", () => {
  // The REST API has no streak data. The old tiles showed repo counts under streak labels.
  it("shows no Current Streak or Longest Streak", () => {
    render(<GitHubStatsCard />);

    expect(screen.getByText("Years Active")).toBeInTheDocument();
    expect(screen.queryByText("Current Streak")).not.toBeInTheDocument();
    expect(screen.queryByText("Longest Streak")).not.toBeInTheDocument();
  });
});
