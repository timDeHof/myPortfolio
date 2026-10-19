import { careerTimeline } from "../../../data/career-timeline";
import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

function Story() {
  return (
    <section aria-labelledby="story-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid max-w-[51ch] gap-[18px] text-muted-foreground">
            <div className="grid gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">How I got here</p>
              <h2 id="story-heading" className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">The habits carried over</h2>
            </div>
            <p>
              In manufacturing, a problem on the line had a cost you could count:
              {" "}
              <strong className="font-semibold text-foreground">scrapped parts, downtime, a missed shipment.</strong>
              {" "}
              I learned to measure before changing anything, to find the root cause instead of the nearest symptom, and
              to document work so the next shift could pick it up.
            </p>
            <p>
              What pulled me toward software was the 3D-printing software itself. The first time I used it, I saw how
              much of our production process it could streamline.
            </p>
            <p>
              In 2022 I finished Fullstack Academy's full-stack web development bootcamp and started building full-time.
              Since 2024 I've been a Frontend Engineer at TeamForward, building an event-planning and networking platform
              in React, TypeScript, and Tailwind CSS, with a focus on accessible interfaces. Since 2026 I've also taken
              contract work through Jokma Web Solutions.
            </p>
            <p>
              I still measure before I optimize, trace bugs to their source, and write code for whoever maintains it next.
            </p>
          </div>

          <ol aria-label="Career timeline" className="grid">
            {careerTimeline.map(row => (
              <li
                key={row.title}
                className="grid gap-1 border-b border-border py-3.5 first:pt-0 sm:grid-cols-[118px_minmax(0,1fr)] sm:gap-4"
              >
                <span className="pt-[3px] font-mono text-[12.5px] tabular-nums text-teal-700 dark:text-teal-400">{row.years}</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{row.title}</h3>
                  <p className="max-w-[52ch] text-[15px] text-muted-foreground">{row.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Story;
