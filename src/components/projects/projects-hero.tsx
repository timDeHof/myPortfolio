import { m } from "framer-motion";
import { Github, Loader, RefreshCw } from "lucide-react";
import React from "react";

import { SectionSEO } from "../common/section-seo";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

interface ProjectsHeroProps {
  isFetching: boolean;
  isLoading: boolean;
  stats: {
    total: number;
    showcase: number;
    personal: number;
    contributions: number;
  };
  onRefresh: () => void;
};

export const ProjectsHero: React.FC<ProjectsHeroProps> = ({ isFetching, isLoading, stats, onRefresh }) => {
  return (
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
              onClick={onRefresh}
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
  );
};
