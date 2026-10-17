import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import type { CaseStudyData } from "../../types/case-study";
import type { Project, ProjectAdvancedFeature, ProjectTechStackItem, ProjectWorkflowStep } from "../../types/project";

import { normalizeGallery } from "../../utils/gallery";

interface ProjectCaseStudyViewProps {
  project: Project;
  caseStudy?: CaseStudyData | null;
}

const LABEL = "block font-mono text-[10px] uppercase tracking-widest text-muted-foreground";
const BOX = "border border-foreground/30 p-3";
const CELL = "border border-foreground/30 px-3 py-2 align-top";
const HEADING = "text-2xl font-semibold text-foreground";

function toTechItems(techStack: Project["techStack"] | undefined): ProjectTechStackItem[] {
  return (techStack ?? []).map(item => typeof item === "string" ? { tech: item, category: "", purpose: "" } : item);
}

function toFeatures(features: Project["advancedFeatures"] | undefined): ProjectAdvancedFeature[] {
  return (features ?? []).map(item => typeof item === "string" ? { title: item, description: "" } : item);
}

function toSteps(workflow: Project["workflow"] | undefined): Pick<ProjectWorkflowStep, "number" | "title">[] {
  if (!workflow) {
    return [];
  }
  return typeof workflow === "string"
    ? workflow.split("→").map((title, index) => ({ number: String(index + 1), title: title.trim() }))
    : workflow;
}

/**
 * Full-page project view: a title block (number, name, summary, effort,
 * links, role), the case study as a reading column, and the stack as a
 * bill of materials. Sections without data are left out.
 *
 * At phone width the title block collapses to two columns and Role moves
 * below Effort and Links, so the links stay on the first screen.
 */
export function ProjectCaseStudyView({ project, caseStudy }: ProjectCaseStudyViewProps) {
  const cover = normalizeGallery(project.gallery, project.image, project.name)[0];
  const features = toFeatures(project.advancedFeatures);
  const steps = toSteps(project.workflow);
  const techItems = toTechItems(project.techStack);
  const challenges = caseStudy?.challenges?.items ?? [];
  const impact = caseStudy?.impact;
  const learnings = caseStudy?.learnings?.items ?? [];
  const hasLinks = Boolean(project.links?.demo || project.links?.github);

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>

        <div className="mt-4 grid grid-cols-2 border-2 border-foreground/60 bg-card md:grid-cols-[96px_1fr_1fr_auto]">
          <div className={`${BOX} col-span-2 md:col-span-1 md:row-span-2`}>
            <span className={LABEL}>No.</span>
            <span className="font-mono text-3xl font-bold" style={{ color: project.accentColor }}>{project.number}</span>
          </div>
          <div className={`${BOX} col-span-2 md:col-span-3`}>
            <span className={LABEL}>Project</span>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">{project.name}</h1>
          </div>
          <div className={`${BOX} col-span-2 md:col-span-3`}>
            <span className={LABEL}>Summary</span>
            <span className="text-foreground">{project.tagline}</span>
          </div>
          {project.resumePitch && (
            <div className={`${BOX} order-last col-span-2 md:order-none md:col-span-2`}>
              <span className={LABEL}>Role</span>
              <span className="text-sm text-foreground">{project.resumePitch}</span>
            </div>
          )}
          <div className={`${BOX} ${hasLinks ? "" : "col-span-2 md:col-span-2"}`}>
            <span className={LABEL}>Effort</span>
            <span className="text-foreground">{project.timeEstimate}</span>
          </div>
          {hasLinks && (
            <div className={BOX}>
              <span className={LABEL}>Links</span>
              <div className="mt-1 flex flex-col gap-2 md:flex-row">
                {project.links?.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a>
                )}
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <article className="mx-auto mt-12 max-w-[68ch]">
          {cover && <img src={cover.url} alt={cover.alt ?? project.name} className="w-full rounded-lg border" />}

          <section className="mt-10 space-y-3">
            <h2 className={HEADING}>Problem</h2>
            <p className="leading-relaxed text-foreground whitespace-pre-wrap">{project.useCase || project.description}</p>
          </section>

          {features.length > 0 && (
            <section className="mt-10 space-y-6">
              <h2 className={HEADING}>Decisions</h2>
              {features.map(feature => (
                <div key={feature.title}>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  {feature.description && <p className="mt-1 leading-relaxed text-foreground">{feature.description}</p>}
                </div>
              ))}
            </section>
          )}

          {challenges.length > 0 && (
            <section className="mt-10 space-y-4">
              <h2 className={HEADING}>Challenges</h2>
              {challenges.map(item => (
                <div key={item.challenge}>
                  <h3 className="font-semibold text-foreground">{item.challenge}</h3>
                  <p className="mt-1 leading-relaxed text-foreground">{item.solution}</p>
                </div>
              ))}
            </section>
          )}

          {steps.length > 0 && (
            <section className="mt-10 space-y-3">
              <h2 className={HEADING}>How it was built</h2>
              <ol className="space-y-3">
                {steps.map(step => (
                  <li key={`${step.number}-${step.title}`} className="flex gap-3">
                    <span className="font-mono text-sm text-muted-foreground">{step.number.padStart(2, "0")}</span>
                    <strong className="text-foreground">{step.title}</strong>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {impact && (
            <section className="mt-10 space-y-4">
              <h2 className={HEADING}>Result</h2>
              <dl className="grid grid-cols-3 gap-4">
                {impact.metrics.map(metric => (
                  <div key={metric.label}>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">{metric.label}</dt>
                    <dd className="text-2xl font-bold text-foreground">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="list-disc space-y-1 pl-5 text-foreground">
                {impact.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}
              </ul>
            </section>
          )}

          {learnings.length > 0 && (
            <section className="mt-10 space-y-3">
              <h2 className={HEADING}>What I learned</h2>
              <ul className="list-disc space-y-1 pl-5 text-foreground">
                {learnings.map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
        </article>

        {techItems.length > 0 && (
          <section className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Bill of materials</h2>
            <table className="mt-2 w-full border-collapse bg-card text-sm">
              <thead>
                <tr className="text-left">
                  <th className={CELL}>Part</th>
                  <th className={`${CELL} hidden md:table-cell`}>Category</th>
                  <th className={CELL}>Why it's there</th>
                </tr>
              </thead>
              <tbody>
                {techItems.map(item => (
                  <tr key={item.tech}>
                    <td className={`${CELL} w-2/5 font-medium text-foreground`}>
                      {item.tech}
                      <span className="mt-1 block text-xs font-normal text-muted-foreground md:hidden">{item.category}</span>
                    </td>
                    <td className={`${CELL} hidden text-muted-foreground md:table-cell`}>{item.category}</td>
                    <td className={`${CELL} text-foreground`}>{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
}
