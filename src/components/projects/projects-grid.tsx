import type { GitHubRepository } from "@services/api/github";

import React from "react";

import { AnimatedSection } from "../common/animated-section";
import { RepositorySkeletonGrid } from "../common/repository-card-skeleton";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { GitHubRepositoryCard } from "./github-repository-card";
import { ProjectsEmptyState } from "./projects-empty-state";

interface ProjectsGridProps {
  isLoading: boolean;
  filteredRepositories: GitHubRepository[];
  languagesByRepo: Record<string, Record<string, number>>;
  selectedProjectType: string;
  selectedLanguage: string;
  stats: { filtered: number };
  hasRepositories: boolean;
  onClearLanguage: () => void;
  onClearType: () => void;
  onRefresh: () => void;
};

const getProjectTypeTitle = (selectedProjectType: string) => {
  switch (selectedProjectType) {
    case "showcase":
      return "Showcase Projects";
    case "personal":
      return "Personal Projects";
    case "contributions":
      return "Contributions";
    default:
      return "All Projects";
  }
};

const getProjectTypeDescription = (selectedProjectType: string) => {
  switch (selectedProjectType) {
    case "showcase":
      return "Featured high-quality projects worth highlighting";
    case "personal":
      return "Original projects I created from scratch";
    case "contributions":
      return "Projects I forked and contributed to";
    default:
      return "A mix of showcase, personal projects and contributions";
  }
};

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  isLoading,
  filteredRepositories,
  languagesByRepo,
  selectedProjectType,
  selectedLanguage,
  stats,
  hasRepositories,
  onClearLanguage,
  onClearType,
  onRefresh,
}) => {
  return (
    <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
      <MaxWidthWrapper>
        {isLoading && (
          <>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Loading repositories from GitHub...
              </p>
            </div>
            <RepositorySkeletonGrid count={6} />
          </>
        )}
        {!isLoading && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {getProjectTypeTitle(selectedProjectType)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {getProjectTypeDescription(selectedProjectType)}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Showing
                {" "}
                <strong className="text-teal-700 dark:text-teal-400">{stats.filtered}</strong>
                {" "}
                repositories
                {selectedLanguage !== "All" && (
                  <span>
                    {" "}
                    for
                    <strong className="text-teal-700 dark:text-teal-400">{selectedLanguage}</strong>
                  </span>
                )}
              </p>
            </div>

            {filteredRepositories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRepositories.map((repository, index) => (
                  <GitHubRepositoryCard
                    key={repository.id}
                    repository={repository}
                    languages={languagesByRepo[repository.id]}
                    index={index}
                  />
                ))}
              </div>
            )}
            {filteredRepositories.length === 0 && (
              <ProjectsEmptyState
                selectedLanguage={selectedLanguage}
                selectedProjectType={selectedProjectType}
                hasRepositories={hasRepositories}
                onClearLanguage={onClearLanguage}
                onClearType={onClearType}
                onRefresh={onRefresh}
              />
            )}
          </>
        )}
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
