import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

function Intro() {
  return (
    <section aria-labelledby="about-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="grid gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">About</p>
          <h1 id="about-heading" className="text-[clamp(2.2rem,5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">Seven years in manufacturing. Now full-stack.</h1>
          <p className="max-w-[51ch] text-lg text-muted-foreground">
            I'm a full-stack engineer in Jacksonville, FL. Before software, I spent seven years as a mechanical engineer
            in manufacturing and 3D printing.
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Intro;
