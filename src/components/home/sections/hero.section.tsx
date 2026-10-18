import { Link } from "@tanstack/react-router";

import { env } from "@/lib/env";

import type { TitleBlockCell } from "../../common/title-block";

import { TitleBlock } from "../../common/title-block";
import { Button } from "../../ui/button";
import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface HeroProps {
  /** shadcn-timeline's star count, read at build time (D3). Left out of the chip when unknown. */
  stars?: number;
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
    <section aria-labelledby="hero-heading" className="hero-grid border-b border-border py-16 md:py-20">
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

            <p className="max-w-[51ch] text-lg text-muted-foreground">
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
              <Button asChild variant="accent">
                <Link to="/projects">See my work</Link>
              </Button>
              {env.VITE_RESUME_URL && (
                <Button asChild variant="line">
                  <a href={env.VITE_RESUME_URL} target="_blank" rel="noopener noreferrer">
                    Résumé (PDF)
                  </a>
                </Button>
              )}
            </div>
          </div>

          <figure className="min-w-0">
            <TitleBlock label="Engineering drawing title block" cells={TITLE_BLOCK} />
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
