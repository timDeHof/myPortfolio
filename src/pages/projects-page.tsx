import { Github } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { Button } from "../components/ui/button";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { useProjects } from "../hooks/useProjects";
import { pageSEO } from "../utils/seo";

export const ProjectsPage: React.FC = () => {
  const { data: projects = [], isLoading, error, isError } = useProjects();

  if (isError) {
    return (
      <>
        <SEOHead seo={pageSEO.projects} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
          <MaxWidthWrapper>
            <div className="text-center">
              <p className="text-lg text-red-600 dark:text-red-400 mb-4">
                Failed to load projects
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              <Button asChild>
                <a href="https://github.com/timDeHof" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </MaxWidthWrapper>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead seo={pageSEO.projects} />

      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50 dark:from-slate-800 dark:via-teal-900/30 dark:to-blue-900">
        <MaxWidthWrapper>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A collection of projects showcasing my expertise in building
              modern web applications with cutting-edge technologies.
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {projects.length} projects featured
            </p>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      <ProjectGrid projects={projects} isLoading={isLoading} />

      <AnimatedSection className="py-16 bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50 dark:from-slate-800 dark:via-teal-900/30 dark:to-blue-900">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Want to see more?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check out my complete GitHub profile for more projects and contributions.
          </p>
          <Button asChild className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
            <a href="https://github.com/timDeHof" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View GitHub Profile
            </a>
          </Button>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};

export default ProjectsPage;
