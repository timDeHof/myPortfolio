import type { Project } from "../../types/project";

import { projectBuilt, projectStack } from "../../utils/project-summary";
import ProjectLinks from "./project-links";

interface ProjectIndexProps {
  projects: Project[];
}

// The projects after the lead one, as rows rather than cards
function ProjectIndex({ projects }: ProjectIndexProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <ol aria-label="More projects" className="mt-12 grid border-t border-border">
      {projects.map(project => (
        <li key={project.slug} className="grid items-baseline gap-2 border-b border-border py-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6">
          <div className="grid gap-1">
            <h2 className="text-xl font-semibold text-foreground">{project.name}</h2>
            <p className="max-w-[55ch] text-foreground text-pretty">{projectBuilt(project)}</p>
            <p className="font-mono text-[13px] text-muted-foreground">{projectStack(project).join(" · ")}</p>
          </div>
          <ProjectLinks project={project} />
        </li>
      ))}
    </ol>
  );
}

export default ProjectIndex;
