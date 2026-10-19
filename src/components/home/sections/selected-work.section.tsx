import { Link } from "@tanstack/react-router";

import { LINK_CLASS } from "@/lib/link-class";

import { CASE_STUDY_SLUGS } from "../../../types/project";
import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface SelectedWorkProps {
  /** shadcn-timeline's star count, read at build time (D3). The card says "Open source" when unknown. */
  stars?: number;
}

interface ExternalLink {
  label: string;
  href: string;
}

interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  /** The big figure in the left column, then the lines under it */
  stat: string;
  statLines: string[];
  links: ExternalLink[];
}

function getProjects(stars?: number): Project[] {
  return [
    {
      slug: "shadcn-timeline",
      name: "shadcn-timeline",
      description: "An accessible timeline component for shadcn/ui. It fits shadcn/ui's design system out of the box, with ARIA attributes so screen readers announce each item's state.",
      tags: ["React", "TypeScript", "shadcn/ui", "a11y"],
      stat: stars === undefined ? "Open source" : `${stars}★`,
      statLines: stars === undefined ? [] : ["GitHub stars", "Open source"],
      links: [
        { label: "Live demo", href: "https://timdehof.github.io/shadcn-timeline/" },
        { label: "Source", href: "https://github.com/timDeHof/shadcn-timeline" },
      ],
    },
    // Jokma card (sivs-platform field application) held until Joe approves (I8, D4)
    {
      slug: "teamforward",
      name: "TeamForward",
      description: "Frontend for an event-planning and networking platform. Chose web-push-neo over web-push for push notifications because it uses the Web Crypto API, so it runs outside Node.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      stat: "2024–",
      statLines: ["Present", "Frontend Engineer"],
      links: [],
    },
  ];
}

function SelectedWork({ stars }: SelectedWorkProps) {
  return (
    <section id="work" aria-labelledby="selected-work-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="mb-9 grid max-w-[640px] gap-2.5">
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">Selected work</p>
          <h2 id="selected-work-heading" className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">Two projects, in depth</h2>
          <p className="text-muted-foreground">Each one covers the problem and my role.</p>
        </div>

        <div className="grid gap-4">
          {getProjects(stars).map(project => (
            <article
              key={project.slug}
              className="grid items-start gap-3.5 rounded-[14px] border border-border bg-card p-6 md:grid-cols-[180px_minmax(0,1fr)_auto] md:gap-6"
            >
              <div className="grid gap-1 font-mono text-xs text-muted-foreground">
                <span className="font-sans text-[26px] font-bold leading-[1.1] text-teal-700 dark:text-teal-400">{project.stat}</span>
                {project.statLines.map(line => <span key={line}>{line}</span>)}
              </div>

              <div>
                <h3 className="mb-1.5 text-xl font-semibold text-foreground">{project.name}</h3>
                <p className="max-w-[55ch] text-muted-foreground text-pretty">{project.description}</p>
                <ul aria-label="Stack" className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <li key={tag} className="rounded-[5px] bg-background px-2 py-[3px] font-mono text-[11.5px] text-muted-foreground">{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-x-[18px] gap-y-2 whitespace-nowrap text-sm md:grid md:justify-items-end">
                {project.links.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {link.label}
                    {" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
                <Link to="/projects/$slug" params={{ slug: project.slug }} preload="intent" className={LINK_CLASS}>
                  {CASE_STUDY_SLUGS.includes(project.slug) ? "Case study" : "Details"}
                  {" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-[22px]">
          <Link to="/projects" className={LINK_CLASS}>
            All projects
            {" "}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </MaxWidthWrapper>
    </section>
  );
}

export default SelectedWork;
