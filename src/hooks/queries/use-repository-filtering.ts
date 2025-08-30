import { useCallback, useMemo, useState } from "react";

import type { GitHubRepository } from "../../services/api/github";

export type ProjectType = "all" | "personal" | "contributions";

type UseRepositoryFilteringOptions = {
  repositories: GitHubRepository[];
};

export function useRepositoryFiltering({ repositories }: UseRepositoryFilteringOptions) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>("all");

  // Categorize repositories by type
  const categorizedRepositories = useMemo(() => {
    const personal: GitHubRepository[] = [];
    const contributions: GitHubRepository[] = [];

    repositories.forEach((repo) => {
      if (repo.fork) {
        contributions.push(repo);
      }
      else {
        personal.push(repo);
      }
    });

    return { personal, contributions };
  }, [repositories]);

  // Get repositories based on selected project type
  const repositoriesByType = useMemo(() => {
    switch (selectedProjectType) {
      case "personal":
        return categorizedRepositories.personal;
      case "contributions":
        return categorizedRepositories.contributions;
      default:
        return repositories;
    }
  }, [repositories, categorizedRepositories, selectedProjectType]);

  // Extract unique languages from filtered repositories
  const availableLanguages = useMemo(() => {
    if (repositoriesByType.length === 0)
      return [];

    const languages = [...new Set(
      repositoriesByType
        .map(repo => repo.language)
        .filter(Boolean),
    )].sort();

    return languages;
  }, [repositoriesByType]);

  // Filter repositories by language
  const filteredRepositories = useMemo(() => {

    if (repositoriesByType.length === 0) {
      return [];
    }

    if (selectedLanguage === "All") {
      return repositoriesByType;
    }

    const filtered = repositoriesByType.filter(repo => repo.language === selectedLanguage);
    return filtered;
  }, [repositoriesByType, selectedLanguage]);

  const handleLanguageChange = useCallback((language: string) => {

    setSelectedLanguage(language);
  }, []);

  const handleProjectTypeChange = useCallback((type: ProjectType) => {
    setSelectedProjectType(type);
    // Reset language filter when changing project type
    setSelectedLanguage("All");
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedLanguage("All");
    setSelectedProjectType("all");
  }, []);

  return {
    selectedLanguage,
    selectedProjectType,
    availableLanguages,
    filteredRepositories,
    categorizedRepositories,
    handleLanguageChange,
    handleProjectTypeChange,
    resetFilters,
    stats: {
      total: repositories.length,
      personal: categorizedRepositories.personal.length,
      contributions: categorizedRepositories.contributions.length,
      filtered: filteredRepositories.length,
      languages: availableLanguages.length,
    },
  };
}
