import { AlertCircle, Github, RefreshCw } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { GitHubStatsSection } from "../components/github/github-stats-section";
import { ProjectTypeFilter } from "../components/projects/project-type-filter";
import { ProjectsGrid } from "../components/projects/projects-grid";
import { ProjectsHero } from "../components/projects/projects-hero";
import { RepositoryFilter } from "../components/projects/repository-filter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { useGitHubRepositories, useGitHubRepositoriesLanguages } from "../hooks/queries/use-github-repositories";
import { useRepositoryFiltering } from "../hooks/queries/use-repository-filtering";
import { pageSEO } from "../utils/seo";
import { generateBreadcrumbSchema } from "../utils/structured-data";

export const ProjectsPage: React.FC = () => {
  const {
    data: repositories = [],
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useGitHubRepositories();

  const languagesQueries = useGitHubRepositoriesLanguages(repositories);

  const queryStates = languagesQueries.map(q => q.dataUpdatedAt ?? 0).join(',');

  const languagesByRepo = React.useMemo(() => {
    if (!repositories || languagesQueries.length === 0) return {};
    return repositories.reduce((acc, repo, index) => {
      const query = languagesQueries[index];
      if (query?.isSuccess && query.data) {
        acc[repo.id] = query.data;
      }
      return acc;
    }, {} as Record<string, Record<string, number>>);
  }, [repositories, queryStates]);

  const {
    selectedLanguage,
    selectedProjectType,
    availableLanguages,
    filteredRepositories,
    handleLanguageChange,
    handleProjectTypeChange,
    stats,
  } = useRepositoryFiltering({ repositories });

  const handleRefresh = async () => {
    await refetch();
  };

  if (isError && !repositories.length) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch repositories";

    return (
      <>
        <SEOHead seo={pageSEO.projects} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
          <MaxWidthWrapper>
            <Card className="max-w-lg w-full mx-auto bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Failed to Load Repositories
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{errorMessage}</p>
                <div className="space-y-3">
                  <Button onClick={handleRefresh} className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button variant="outline" asChild className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <a
                      href="https://github.com/timDeHof"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View GitHub Profile
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MaxWidthWrapper>
        </div>
      </>
    );
  }

  const structuredData = {
    "@graph": [
      generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Tim DeHof - Projects Portfolio",
        "description": "A collection of web development projects and open-source contributions",
        "url": `${window.location.origin}/projects`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": repositories.length,
          "itemListElement": filteredRepositories.slice(0, 10).map((repo, index) => ({
            "@type": "SoftwareSourceCode",
            "position": index + 1,
            "name": repo.name,
            "description": repo.description,
            "url": repo.html_url,
            "programmingLanguage": repo.language,
            "author": {
              "@type": "Person",
              "name": "Tim DeHof",
            },
          })),
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        seo={pageSEO.projects}
        structuredData={structuredData}
      />

      <ProjectsHero
        isFetching={isFetching}
        isLoading={isLoading}
        stats={{
          total: stats.total,
          showcase: stats.showcase,
          personal: stats.personal,
          contributions: stats.contributions,
        }}
        onRefresh={handleRefresh}
      />

      {!isLoading && repositories.length > 0 && (
        <ProjectTypeFilter
          selectedType={selectedProjectType}
          onTypeChange={handleProjectTypeChange}
          stats={{
            total: stats.total,
            showcase: stats.showcase,
            personal: stats.personal,
            contributions: stats.contributions,
          }}
        />
      )}

      {!isLoading && availableLanguages.length > 0 && (
        <RepositoryFilter
          languages={availableLanguages.filter((lang): lang is string => lang !== null)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}

      <ProjectsGrid
        isLoading={isLoading}
        filteredRepositories={filteredRepositories}
        languagesByRepo={languagesByRepo}
        selectedProjectType={selectedProjectType}
        selectedLanguage={selectedLanguage}
        stats={{ filtered: stats.filtered }}
        hasRepositories={repositories.length > 0}
        onClearLanguage={() => handleLanguageChange("All")}
        onClearType={() => handleProjectTypeChange("all")}
        onRefresh={handleRefresh}
      />

      {!isLoading && repositories.length > 0 && (
        <GitHubStatsSection />
      )}

      <AnimatedSection className="py-16 bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50 dark:from-slate-800 dark:via-teal-900/30 dark:to-blue-900">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Want to see more?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check out my complete GitHub profile for more projects, contributions, and activity.
          </p>
          <Button asChild className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
            <a
              href="https://github.com/timDeHof"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              View GitHub Profile
            </a>
          </Button>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};
