import type { GitHubRepository } from "../../types";

import { GitHubRepositoryCard } from "./github-repository-card";

/**
 * Renders a grid of GitHub repository cards.
 * This component requires pre-fetched language data for optimal performance.
 */
type RepositoryGridProps = {
  repositories: GitHubRepository[];
  languagesByRepo: Record<string, Record<string, number>> | undefined;
};

export function RepositoryGrid({ repositories, languagesByRepo }: RepositoryGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {repositories.map((repository, index) => (
        <GitHubRepositoryCard
          key={repository.id}
          repository={repository}
          languages={languagesByRepo?.[repository.id]}
          index={index}
        />
      ))}
    </div>
  );
}

