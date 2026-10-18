import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface Practice {
  title: string;
  body: string;
}

const PRACTICES: Practice[] = [
  {
    title: "Measure, then change.",
    body: "Before optimizing anything, I find out where the time actually goes, whether that's a slow query, an oversized asset, or a render-blocking request.",
  },
  {
    title: "Understand existing code before touching it.",
    body: "Most work happens in codebases someone else started. I read what's there and why before proposing changes.",
  },
  {
    title: "Accessibility is part of done.",
    body: "I build accessibility in from the start instead of auditing it at the end. At TeamForward I keyboard-test each interface I build, and I took W3Cx WAI0.1x: Introduction to Web Accessibility.",
  },
  {
    title: "Write for the handoff.",
    body: "Clear pull requests, small commits, and docs that answer the question the next developer will actually ask.",
  },
];

function Practices() {
  return (
    <section aria-labelledby="practices-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <h2 id="practices-heading" className="mb-9 text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">How I work</h2>

        <div className="grid gap-5 md:grid-cols-2">
          {PRACTICES.map(practice => (
            <div key={practice.title} className="grid content-start gap-2.5 border-t-2 border-teal-700 pt-[18px] dark:border-teal-400">
              <h3 className="text-lg font-semibold text-foreground">{practice.title}</h3>
              <p className="max-w-[52ch] text-muted-foreground">{practice.body}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Practices;
