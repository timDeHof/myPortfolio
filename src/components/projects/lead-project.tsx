import type { Project } from "../../types/project";

import { projectBuilt, projectStack } from "../../utils/project-summary";
import ProjectLinks from "./project-links";

interface LeadProjectProps {
  project: Project;
}

// The first project, written up in the same title block as the home hero
function LeadProject({ project }: LeadProjectProps) {
  const cells = [
    { label: "Part", value: <h2 className="font-sans text-xl font-bold">{project.name}</h2> },
    { label: "Function", value: project.tagline },
    { label: "What I built", value: <span className="font-sans text-[15px]">{projectBuilt(project)}</span> },
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
        <dl aria-label={`${project.name} title block`} className="grid rounded-sm border-[1.5px] border-foreground bg-card font-mono text-[12.5px]">
          {cells.map((cell, index) => (
            <div key={cell.label} className={`min-w-0 border-border px-3 py-2.5 ${index < cells.length - 1 ? "border-b" : ""}`}>
              <dt className="mb-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{cell.label}</dt>
              <dd className="text-foreground">{cell.value}</dd>
            </div>
          ))}
        </dl>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default LeadProject;
