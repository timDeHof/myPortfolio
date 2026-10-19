import { Link } from "@tanstack/react-router";

import { LINK_CLASS } from "@/lib/link-class";

import type { Project } from "../../types/project";

interface ProjectLinksProps {
  project: Project;
}

function ProjectLinks({ project }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-x-[18px] gap-y-2 whitespace-nowrap text-sm">
      <Link to="/projects/$slug" params={{ slug: project.slug }} preload="intent" className={LINK_CLASS}>
        Read more
        {" "}
        <span aria-hidden="true">→</span>
      </Link>
      {project.links?.demo && (
        <a href={project.links.demo} aria-label={`Live demo of ${project.name}`} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          Live demo
          {" "}
          <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.links?.github && (
        <a href={project.links.github} aria-label={`Source for ${project.name}`} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          Source
          {" "}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

export default ProjectLinks;
