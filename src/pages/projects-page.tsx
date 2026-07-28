import { useNavigate } from "@tanstack/react-router";
// fallow-ignore-file
// TanStack Router's file routes require importing Route from generated route file
// This is a false positive - runtime works correctly with this pattern
import { Github } from "lucide-react";
import React, { lazy, Suspense, useEffect } from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { ProjectModal } from "../components/projects/ProjectModal";
import { Button } from "../components/ui/button";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { useProject } from "../hooks/useProjects";
import { Route } from "../routes/projects";
import { pageSEO } from "../utils/seo";

// Lazy load heavy modal components
const ProjectDetailContent = lazy(() => import("./project-detail-page").then(m => ({ default: m.ProjectDetailContent })));
const GitHubStatsSection = lazy(() => import("../components/github/github-stats-section").then(m => ({ default: m.GitHubStatsSection })));

export const ProjectsPage: React.FC = () => {
  const { projects } = Route.useLoaderData();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const selectedSlug = search.project;

  const { data: selectedProject, isLoading: isProjectLoading } = useProject(selectedSlug || "");

  useEffect(() => {
    if (selectedSlug) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSlug]);

  const handleCloseModal = () => {
    navigate({ search: {} });
  };

  const handleProjectClick = (slug: string) => {
    navigate({ search: { project: slug } });
  };

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

      <ProjectGrid projects={projects} onProjectClick={handleProjectClick} />

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

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedSlug}
        project={selectedProject ?? null}
        isLoading={isProjectLoading}
        onClose={handleCloseModal}
      >
        {project => (
          <ProjectDetailContent
            project={project}
            onClose={handleCloseModal}
            isModal
          />
        )}
      </ProjectModal>
    </>
  );
};

export default ProjectsPage;
