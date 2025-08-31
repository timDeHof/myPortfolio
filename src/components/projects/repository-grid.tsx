import type { GitHubRepository } from "../../types";

import { GitHubRepositoryCard } from "./github-repository-card";

type RepositoryGridProps = {
  repositories: GitHubRepository[];
};

export function RepositoryGrid({ repositories }: RepositoryGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {repositories.map((repository, index) => (
        <GitHubRepositoryCard
          key={repository.id}
          repository={repository}
          index={index}
        />
      ))}
    </div>
  );
}
