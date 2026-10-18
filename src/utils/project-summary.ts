import type { Project } from "../types/project";

/** Tech names from the project's stack, one entry per technology */
export function projectStack(project: Project, limit = 6): string[] {
  return (project.techStack ?? [])
    .flatMap(item => (typeof item === "string" ? item : item.tech).split(/\s*·\s*/))
    .filter(Boolean)
    .slice(0, limit);
}

/** What Tim built, falling back to the tagline when the project has no résumé pitch */
export function projectBuilt(project: Project): string {
  return project.resumePitch || project.tagline;
}
