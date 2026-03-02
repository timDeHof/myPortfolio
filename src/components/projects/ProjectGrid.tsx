import React from "react";

import { AnimatedSection } from "@components/common/animated-section";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";

import type { Project } from "../../types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  onProjectClick?: (slug: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, isLoading, onProjectClick }) => {
  const SKELETON_COUNT = 3;

  if (isLoading) {
    return (
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Loading projects...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>
    );
  }

  if (projects.length === 0) {
    return (
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No projects found.
            </p>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              index={index}
              onClick={onProjectClick ? () => onProjectClick(project.slug) : undefined}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
