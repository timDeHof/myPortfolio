import { useMemo, useState, useCallback } from 'react';
import { GitHubRepository } from '../../services/api/github';

export type ProjectType = 'all' | 'personal' | 'contributions';

interface UseRepositoryFilteringOptions {
  repositories: GitHubRepository[];
}

export const useRepositoryFiltering = ({ repositories }: UseRepositoryFilteringOptions) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>('all');

  console.log('🎯 useRepositoryFiltering:', {
    repositoriesCount: repositories.length,
    selectedLanguage,
    selectedProjectType
  });

  // Categorize repositories by type
  const categorizedRepositories = useMemo(() => {
    const personal: GitHubRepository[] = [];
    const contributions: GitHubRepository[] = [];

    repositories.forEach(repo => {
      if (repo.fork) {
        contributions.push(repo);
      } else {
        personal.push(repo);
      }
    });

    console.log('📊 Repository categories:', {
      total: repositories.length,
      personal: personal.length,
      contributions: contributions.length
    });

    return { personal, contributions };
  }, [repositories]);

  // Get repositories based on selected project type
  const repositoriesByType = useMemo(() => {
    switch (selectedProjectType) {
      case 'personal':
        return categorizedRepositories.personal;
      case 'contributions':
        return categorizedRepositories.contributions;
      default:
        return repositories;
    }
  }, [repositories, categorizedRepositories, selectedProjectType]);

  // Extract unique languages from filtered repositories
  const availableLanguages = useMemo(() => {
    if (repositoriesByType.length === 0) return [];
    
    const languages = [...new Set(
      repositoriesByType
        .map(repo => repo.language)
        .filter(Boolean)
    )].sort();
    
    console.log('🔤 Available languages for', selectedProjectType, ':', languages);
    return languages;
  }, [repositoriesByType, selectedProjectType]);

  // Filter repositories by language
  const filteredRepositories = useMemo(() => {
    console.log('🔍 Filtering repositories:', {
      type: selectedProjectType,
      total: repositoriesByType.length,
      selectedLanguage
    });

    if (repositoriesByType.length === 0) {
      return [];
    }

    if (selectedLanguage === 'All') {
      return repositoriesByType;
    }

    const filtered = repositoriesByType.filter(repo => repo.language === selectedLanguage);
    console.log(`🎯 Filtered for "${selectedLanguage}" in ${selectedProjectType}:`, filtered.length);
    return filtered;
  }, [repositoriesByType, selectedLanguage, selectedProjectType]);

  const handleLanguageChange = useCallback((language: string) => {
    console.log(`🔄 Changing language filter: "${selectedLanguage}" → "${language}"`);
    setSelectedLanguage(language);
  }, [selectedLanguage]);

  const handleProjectTypeChange = useCallback((type: ProjectType) => {
    console.log(`🔄 Changing project type: "${selectedProjectType}" → "${type}"`);
    setSelectedProjectType(type);
    // Reset language filter when changing project type
    setSelectedLanguage('All');
  }, [selectedProjectType]);

  const resetFilters = useCallback(() => {
    setSelectedLanguage('All');
    setSelectedProjectType('all');
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
      languages: availableLanguages.length
    }
  };
};