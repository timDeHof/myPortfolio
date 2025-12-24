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

/**
 * Render a responsive grid of GitHub repository cards.
 *
 * Renders each repository as a GitHubRepositoryCard in a single-column layout on small screens and a two-column layout on large screens.
 *
 * @param repositories - The list of repositories to display.
 * @param languagesByRepo - Optional mapping of repository IDs to language usage objects; when provided the corresponding entry is passed to each card as `languages`.
 * @returns The container element wrapping the rendered repository cards.
 */
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
