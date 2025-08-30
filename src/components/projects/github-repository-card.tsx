import { motion } from "framer-motion";
import { Calendar, Code, ExternalLink, GitFork, Github, Star, Users } from "lucide-react";
import React from "react";

import type { GitHubRepository } from "../../services/api/github";

import { useGitHubRepositoryLanguages } from "../../hooks/queries/use-github-repositories";
import { formatDate, getRepositoryImage, getTopLanguages } from "../../services/api/github";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type GitHubRepositoryCardProps = {
  repository: GitHubRepository;
  index: number;
};

export const GitHubRepositoryCard: React.FC<GitHubRepositoryCardProps> = ({ repository, index }) => {
  // Use TanStack Query for languages
  const {
    data: repoLanguages = {},
    isLoading: loadingLanguages,
  } = useGitHubRepositoryLanguages(repository.languages_url);

  const languages = getTopLanguages(repoLanguages);
  const imageUrl = getRepositoryImage(repository.name);

  // Fallback to repository.language if languages API fails
  const displayLanguages = languages.length > 0
    ? languages
    : (repository.language ? [repository.language] : []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        {/* Repository Image */}
        <div className="relative">
          <div
            className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Project Type Badge */}
          {repository.fork && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-700">
              <GitFork className="h-3 w-3" />
              <span>Contribution</span>
            </div>
          )}

          {!repository.fork && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700">
              <Users className="h-3 w-3" />
              <span>Personal</span>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Header with title and stats */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {repository.name}
              {repository.fork && (
                <span className="ml-2 text-sm text-orange-600 dark:text-orange-400 font-normal">
                  (Fork)
                </span>
              )}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              {repository.stargazers_count > 0 && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{repository.stargazers_count}</span>
                </div>
              )}
              {repository.forks_count > 0 && (
                <div className="flex items-center space-x-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repository.forks_count}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 min-h-[4.5rem]">
            {repository.description || "No description available."}
          </p>

          {/* Languages */}
          <div className="mb-4">
            {loadingLanguages
              ? (
                  <div className="flex space-x-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                )
              : displayLanguages.length > 0
                ? (
                    <div className="flex flex-wrap gap-2">
                      {displayLanguages.map(language => (
                        <span
                          key={language}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium flex items-center border border-blue-200 dark:border-blue-700"
                        >
                          <Code className="h-3 w-3 mr-1" />
                          {language}
                        </span>
                      ))}
                    </div>
                  )
                : (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      No language information available
                    </div>
                  )}
          </div>

          {/* Project Type Info */}
          {repository.fork && (
            <div className="mb-4 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg">
              <p className="text-xs text-orange-700 dark:text-orange-300 flex items-center">
                <GitFork className="h-3 w-3 mr-1" />
                <span>This is a fork - I contributed to this project</span>
              </p>
            </div>
          )}

          {/* Last updated */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Updated {formatDate(repository.updated_at)}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button size="sm" asChild className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                {repository.fork ? "View Fork" : "Source"}
              </a>
            </Button>
            {repository.homepage && (
              <Button variant="outline" size="sm" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <a
                  href={repository.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
