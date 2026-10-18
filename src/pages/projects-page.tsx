// fallow-ignore-file
// TanStack Router's file routes require importing Route from generated route file
// This is a false positive - runtime works correctly with this pattern
import { Github } from "lucide-react";
import React, { lazy, Suspense } from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import LeadProject from "../components/projects/lead-project";
import ProjectIndex from "../components/projects/project-index";
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
                Projects didn&apos;t load. They&apos;re also on GitHub.
              </p>
              <Button asChild>
                <a href="https://github.com/timDeHof" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub profile
                </a>
              </Button>
            </div>
          </MaxWidthWrapper>
        </div>
      </>
    );
  }

  const [leadProject, ...moreProjects] = projects;

  return (
    <>
      <SEOHead seo={pageSEO.projects} />

      <section aria-labelledby="projects-heading" className="border-b border-border py-14 md:py-18">
        <MaxWidthWrapper>
          <div className="mb-10 grid max-w-[640px] gap-3">
            <h1 id="projects-heading" className="text-[clamp(2rem,4.6vw,3.25rem)] font-bold text-foreground">Projects</h1>
            <p className="max-w-[55ch] text-muted-foreground text-pretty">
              Each project lists the problem, my role, the stack, and what I&apos;d do differently. The first three are the
              ones I&apos;d walk through in an interview.
            </p>
            <p className="text-sm text-muted-foreground">{`${projects.length} projects`}</p>
          </div>

          <LeadProject project={leadProject} />
          <ProjectIndex projects={moreProjects} />
        </MaxWidthWrapper>
      </section>

      <Suspense fallback={<div className="py-16" />}>
        <GitHubStatsSection />
      </Suspense>

      <AnimatedSection className="py-16 bg-muted">
        <MaxWidthWrapper className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            More on GitHub
          </h2>
          <p className="text-muted-foreground mb-6">
            Smaller experiments and older bootcamp work are on my GitHub profile.
          </p>
          <Button asChild className="bg-secondary text-secondary-foreground hover:opacity-90 py-4 px-6">
            <a href="https://github.com/timDeHof" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub profile
            </a>
          </Button>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};

export default ProjectsPage;
