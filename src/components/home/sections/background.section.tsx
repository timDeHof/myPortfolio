import { Link } from "@tanstack/react-router";

import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface TimelineRow {
  years: string;
  title: string;
}

const TIMELINE: TimelineRow[] = [
  { years: "2024 – now", title: "Frontend Engineer, TeamForward" },
  { years: "2024 – 2026", title: "AWS Cloud Institute graduate" },
  { years: "2022", title: "Fullstack Academy, career change" },
  { years: "2015 – 2022", title: "Mechanical engineer" },
];

function Background() {
  return (
    <section aria-labelledby="background-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="grid max-w-[62ch] gap-[18px]">
            <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">Background</p>
            <h2 id="background-heading" className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">From the shop floor to the stack</h2>
            <p className="text-muted-foreground">
              From 2015 to 2022 I worked as a mechanical engineer in manufacturing and 3D printing. In 2022 I moved into
              software through Fullstack Academy.
            </p>
            <p className="text-muted-foreground">
              Since 2024 I've been building production frontends at TeamForward, and in June 2026 I graduated from the AWS
              Cloud Institute's Cloud Application Developer program.
            </p>
            <p>
              <Link to="/about" className="font-semibold text-teal-700 hover:underline dark:text-teal-400">
                More about me
                {" "}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>

          <ol aria-label="Short timeline" className="grid">
            {TIMELINE.map(row => (
              <li
                key={row.title}
                className="grid gap-1 border-b border-border py-3.5 first:pt-0 md:grid-cols-[118px_minmax(0,1fr)] md:gap-4"
              >
                <span className="pt-[3px] font-mono text-[12.5px] tabular-nums text-teal-700 dark:text-teal-400">{row.years}</span>
                <h3 className="text-base font-semibold text-foreground">{row.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Background;
