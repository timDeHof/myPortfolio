import { Link } from "@tanstack/react-router";

import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";
import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface HeroProps {
  /** shadcn-timeline's star count, read at build time (D3). Left out of the chip when unknown. */
  stars?: number;
}

interface TitleBlockCell {
  label: string;
  /** An array renders one line per item */
  value: React.ReactNode | string[];
  wide?: boolean;
}

// An engineering drawing's title block, with the career as its revisions
const TITLE_BLOCK: TitleBlockCell[] = [
  { label: "Part", value: <span className="font-sans text-xl font-bold">Tim DeHof</span>, wide: true },
  { label: "Function", value: "Full-stack engineer" },
  { label: "Location", value: "Jacksonville, FL · Remote" },
  { label: "Material", value: "React · TypeScript · Node · PostgreSQL · AWS", wide: true },
  { label: "Rev A", value: ["Mechanical engineer", "2015–2022"] },
  { label: "Rev B", value: ["Software engineer", "2022–present"] },
  { label: "Sheet", value: "1 of 1" },
  { label: "Rev", value: <span className="text-xl font-medium text-teal-700 dark:text-teal-400">B</span> },
];

function Hero({ stars }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-border py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <div className="grid min-w-0 gap-6">
            <p className="inline-flex items-start gap-2.5 justify-self-start rounded-2xl border border-border bg-background px-4 py-1.5 font-mono text-[12.5px] leading-normal text-muted-foreground">
              <span aria-hidden="true" className="mt-[0.45em] h-[7px] w-[7px] flex-none rounded-full bg-teal-700 dark:bg-teal-400" />
              <span>Open to full-time frontend and full-stack roles</span>
            </p>

            <h1 id="hero-heading" className="text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">
              I spent seven years engineering physical products. Now I engineer
              {" "}
              <span className="text-teal-700 dark:text-teal-400">software</span>
              {" "}
              the same way.
            </h1>

            <p className="max-w-[58ch] text-lg text-muted-foreground">
              Full-stack engineer working in React, TypeScript, and Node. Manufacturing taught me to find the root
              cause, test against real constraints, and build things that hold up after handoff.
            </p>

            <ul aria-label="Highlights" className="flex flex-wrap gap-2">
              <li className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                Author of shadcn-timeline
                {stars !== undefined && (
                  <>
                    {" · "}
                    <strong className="font-semibold text-teal-700 dark:text-teal-400">
                      {stars}
                      ★
                    </strong>
                  </>
                )}
              </li>
              <li className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                Frontend Engineer at TeamForward
              </li>
              <li className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                2× AWS Certified (Cloud Practitioner, AI Practitioner)
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/projects">See my work</Link>
              </Button>
              {env.VITE_RESUME_URL && (
                <Button asChild variant="outline">
                  <a href={env.VITE_RESUME_URL} target="_blank" rel="noopener noreferrer">
                    Résumé (PDF)
                  </a>
                </Button>
              )}
            </div>
          </div>

          <figure className="min-w-0">
            <dl
              aria-label="Engineering drawing title block"
              className="grid grid-cols-2 rounded-sm border-[1.5px] border-foreground bg-card font-mono text-[12.5px]"
            >
              {TITLE_BLOCK.map((cell, index) => {
                // Wide cells span both columns, so a half cell's column depends on the cells before it
                const halfCellsBefore = TITLE_BLOCK.slice(0, index).reduce((count, prev) => (prev.wide ? 0 : count + 1), 0);
                const isLeftColumn = !cell.wide && halfCellsBefore % 2 === 0;
                const isLastRow = index >= TITLE_BLOCK.length - 2;
                return (
                  <div
                    key={cell.label}
                    className={cn(
                      "min-w-0 border-border px-3 py-2.5",
                      cell.wide && "col-span-2",
                      isLeftColumn && "border-r",
                      !isLastRow && "border-b",
                    )}
                  >
                    <dt className="mb-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{cell.label}</dt>
                    <dd className="text-foreground [overflow-wrap:anywhere]">
                      {Array.isArray(cell.value)
                        ? cell.value.map(line => <span key={line} className="block">{line}</span>)
                        : cell.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <figcaption className="mt-2.5 font-mono text-[11.5px] text-muted-foreground">
              Every drawing I signed had one of these. This is v2 of the site, so: Rev B.
            </figcaption>
          </figure>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Hero;
