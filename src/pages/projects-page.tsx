// fallow-ignore-file
// TanStack Router's file routes require importing Route from generated route file
// This is a false positive - runtime works correctly with this pattern
import { Github } from "lucide-react";
import React, { lazy, Suspense } from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { ProjectGrid } from "../components/projects/project-grid";
import { Button } from "../components/ui/button";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { Route } from "../routes/projects";
import { pageSEO } from "../utils/seo";

const GitHubStatsSection = lazy(() => import("../components/github/github-stats-section").then(m => ({ default: m.GitHubStatsSection })));

export const ProjectsPage: React.FC = () => {
  const { projects } = Route.useLoaderData();

  if (!projects || projects.length === 0) {
    return (
      <>
        <SEOHead seo={pageSEO.projects} />
        <div className="min-h-[100dvh] flex items-center justify-center bg-muted">
          <MaxWidthWrapper>
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                No projects found
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

      <AnimatedSection className="py-20 bg-muted">
        <MaxWidthWrapper>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              A collection of projects showcasing my expertise in building
              modern web applications with cutting-edge technologies.
            </p>
            <p className="mt-4 text-muted-foreground">
              {projects.length}
              {" "}
              projects featured
            </p>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      <ProjectGrid projects={projects} />

      <Suspense fallback={<div className="py-16" />}>
        <GitHubStatsSection />
      </Suspense>

      <AnimatedSection className="py-16 bg-muted">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to see more?
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out my complete GitHub profile for more projects and contributions.
          </p>
          <Button asChild className="bg-secondary text-secondary-foreground hover:opacity-90 py-4 px-6">
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
