import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface ToolGroup {
  title: string;
  tools: string[];
}

// Grouped by how well I know each tool, not by category
const TOOL_GROUPS: ToolGroup[] = [
  { title: "Use daily", tools: ["React", "TypeScript", "Tailwind CSS", "Postgres", "Docker", "Git"] },
  { title: "Have shipped with", tools: ["Next.js", "Node.js", "Express", "REST APIs", "Vercel", "Figma", "Framer Motion"] },
  { title: "Cloud (AWS Cloud Institute)", tools: ["AWS (Lambda, DynamoDB, S3, CloudFront, CloudFormation, SAM)", "Python"] },
];

function Tools() {
  return (
    <section aria-labelledby="tools-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="mb-9 grid gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">Tools</p>
          <h2 id="tools-heading" className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">Grouped by how well I know them</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TOOL_GROUPS.map(group => (
            <div key={group.title} className="grid content-start gap-3 rounded-xl border border-border p-5">
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">{group.title}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.tools.map(tool => (
                  <li key={tool} className="rounded-md bg-muted px-2.5 py-1 text-sm text-foreground">{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Tools;
