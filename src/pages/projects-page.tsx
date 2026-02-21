import { m } from "framer-motion";
import { AlertCircle, Github, Loader, RefreshCw } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { RepositorySkeletonGrid } from "../components/common/repository-card-skeleton";
import { SectionSEO } from "../components/common/section-seo";
import { SEOHead } from "../components/common/seo-head";
import { GitHubStatsSection } from "../components/github/github-stats-section";
import { GitHubRepositoryCard } from "../components/projects/github-repository-card";
import { ProjectTypeFilter } from "../components/projects/project-type-filter";
import { RepositoryFilter } from "../components/projects/repository-filter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { useGitHubRepositories, useGitHubRepositoriesLanguages } from "../hooks/queries/use-github-repositories";
import { useRepositoryFiltering } from "../hooks/queries/use-repository-filtering";
import { pageSEO } from "../utils/seo";
import { generateBreadcrumbSchema } from "../utils/structured-data";

export const ProjectsPage: React.FC = () => {
  // TanStack Query for repositories
  const {
    data: repositories = [],
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useGitHubRepositories();

  // Fetch languages for all repositories concurrently
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


  // Repository filtering with project type support
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

  // Error state
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

  const getProjectTypeTitle = () => {
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

  const getProjectTypeDescription = () => {
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

  // Generate structured data for projects page
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 dark:from-slate-900 dark:via-teal-900 dark:to-blue-900">
        <SectionSEO section="portfolio" />
        <MaxWidthWrapper>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Github className="h-8 w-8 text-gray-700 dark:text-gray-300 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                My Development Journey
              </h1>
              {isFetching && (
                <Loader className="h-6 w-6 text-teal-700 dark:text-teal-400 ml-3 animate-spin" />
              )}
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              Explore my coding journey through personal projects and open-source contributions.
              Each project represents a step in my continuous learning and growth as a developer.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {isLoading
                ? (
                  <span>Loading repositories...</span>
                )
                : (
                  <>
                    <span>
                      {stats.total}
                      {" "}
                      total repositories
                    </span>
                    <span>•</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                      {stats.showcase}
                      {" "}
                      showcase
                    </span>
                    <span>•</span>
                    <span className="text-teal-700 dark:text-teal-400 font-medium">
                      {stats.personal}
                      {" "}
                      personal
                    </span>
                    <span>•</span>
                    <span>
                      {stats.contributions}
                      {" "}
                      contributions
                    </span>
                  </>
                )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isFetching}
                className="ml-4 border-teal-700 dark:border-teal-400 bg-teal-700 text-teal-50 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </m.div>
        </MaxWidthWrapper>
      </section>

      {/* Project Type Filter - Show when data is loaded */}
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

      {/* Language Filter - Only show when data is loaded and languages are available */}
      {!isLoading && availableLanguages.length > 0 && (
        <RepositoryFilter
          languages={availableLanguages.filter((lang): lang is string => lang !== null)}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {/* Repositories Grid */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          {/* Loading State - Show Skeletons */}
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
              {/* Current View Info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {getProjectTypeTitle()}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {getProjectTypeDescription()}
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

              {/* Repository Grid or Messages */}
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
              {filteredRepositories.length === 0 && repositories.length > 0 && (
                <div className="text-center py-12">
                  <Github className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No
                    {" "}
                    {selectedLanguage !== "All" ? selectedLanguage : ""}
                    {" "}
                    repositories found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {selectedProjectType === "showcase" && "No showcase projects found for the selected criteria."}
                    {selectedProjectType === "personal" && "No personal projects found for the selected criteria."}
                    {selectedProjectType === "contributions" && "No contributions found for the selected criteria."}
                    {selectedProjectType === "all" && "No repositories found for the selected filters."}
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleLanguageChange("All")}
                      className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                    >
                      Show All Languages
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleProjectTypeChange("all")}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Show All Project Types
                    </Button>
                  </div>
                </div>
              )}
              {filteredRepositories.length === 0 && repositories.length === 0 && (
                <div className="text-center py-12">
                  <Github className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Repositories Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    We couldn't find any public repositories. This might be due to API issues or configuration problems.
                  </p>
                  <div className="space-x-4">
                    <Button
                      onClick={handleRefresh}
                      className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                    <Button variant="outline" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
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
                </div>
              )}
            </>
          )}
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* GitHub Stats Section */}
      {!isLoading && repositories.length > 0 && (
        <GitHubStatsSection />
      )}

      {/* GitHub Profile Link */}
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
