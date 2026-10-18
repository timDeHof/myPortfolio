import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

function Intro() {
  return (
    <section aria-labelledby="about-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="grid gap-4">
          <h1 id="about-heading" className="text-[clamp(2.2rem,5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">About</h1>
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
