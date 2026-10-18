import { Link } from "@tanstack/react-router";

import type { Project } from "../../types/project";

const LINK = "font-semibold text-teal-700 hover:underline dark:text-teal-400";

interface ProjectLinksProps {
  project: Project;
}

function ProjectLinks({ project }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-x-[18px] gap-y-2 whitespace-nowrap text-sm">
      <Link to="/projects/$slug" params={{ slug: project.slug }} className={LINK}>
        Read more
        {" "}
        <span aria-hidden="true">→</span>
      </Link>
      {project.links?.demo && (
        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={LINK}>
          Live demo
          {" "}
          <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.links?.github && (
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={LINK}>
          Source
          {" "}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

export default ProjectLinks;
