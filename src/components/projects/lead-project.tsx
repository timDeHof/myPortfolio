import type { Project } from "../../types/project";

import { projectStack } from "../../utils/project-summary";
import { TitleBlock } from "../common/title-block";
import ProjectLinks from "./project-links";

interface LeadProjectProps {
  project: Project;
}

// The first project, written up in the same title block as the home hero
function LeadProject({ project }: LeadProjectProps) {
  const cells = [
    { label: "Part", value: <h2 className="font-sans text-xl font-bold">{project.name}</h2> },
    { label: "Function", value: project.tagline },
    // Without a résumé pitch this cell would repeat the tagline above it
    ...(project.resumePitch ? [{ label: "What I built", value: <span className="font-sans text-[15px]">{project.resumePitch}</span> }] : []),
    { label: "Material", value: projectStack(project).join(" · ") },
  ];

  return (
    <article className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
      <div className="grid gap-4">
        {project.image && (
          <img src={project.image} alt={`${project.name} screenshot`} className="aspect-[16/10] w-full rounded-lg border border-border object-cover" />
        )}
        <p className="line-clamp-4 max-w-[55ch] text-muted-foreground text-pretty">{project.useCase || project.description}</p>
      </div>
      <div className="grid gap-4">
        <TitleBlock label={`${project.name} title block`} columns={1} cells={cells} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default LeadProject;
