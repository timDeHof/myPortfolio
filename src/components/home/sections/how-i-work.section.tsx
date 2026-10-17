import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface Principle {
  from: string;
  title: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    from: "scrapped parts, downtime",
    title: "Root cause first.",
    body: "On a production line, a fix that skips the root cause comes back on the next shift. I trace bugs through every layer, from the UI to the query, before changing code.",
  },
  {
    from: "tolerances",
    title: "Design for the constraint.",
    body: "Parts have tolerances, and software has budgets: load time, accessibility, the next developer's time. I decide which constraint matters before choosing a tool.",
  },
  {
    from: "drawings, shift handoff",
    title: "Built to be handed off.",
    body: "Engineering drawings have to make sense to someone who never met the designer. I write code, docs, and pull requests the same way.",
  },
];

function HowIWork() {
  return (
    <section aria-labelledby="how-i-work-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="mb-9 grid max-w-[640px] gap-2.5">
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">How I work</p>
          <h2 id="how-i-work-heading" className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">What the engineering background changed</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map(principle => (
            <div key={principle.title} className="grid content-start gap-2.5 border-t-2 border-teal-700 pt-[18px] dark:border-teal-400">
              <p className="font-mono text-[11.5px] tracking-[0.04em] text-muted-foreground">
                <b className="font-medium text-foreground">Shop floor:</b>
                {" "}
                {principle.from}
              </p>
              <h3 className="text-lg font-semibold text-foreground">{principle.title}</h3>
              <p className="text-muted-foreground">{principle.body}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default HowIWork;
