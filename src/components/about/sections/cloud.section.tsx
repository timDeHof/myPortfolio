import { usePortfolioData } from "@hooks/use-portfolio-data";

import { LINK_CLASS } from "@/lib/link-class";

import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

function Cloud() {
  const { data: portfolioData } = usePortfolioData();
  // portfolio.json also lists courses and badges. This section shows the AWS certifications only
  const certifications = (portfolioData?.certifications ?? []).filter(cert => cert.name.startsWith("AWS Certified"));

  return (
    <section aria-labelledby="cloud-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid max-w-[51ch] gap-[18px] text-muted-foreground">
            <h2 id="cloud-heading" className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">AWS Cloud Institute</h2>
            <p>
              In June 2026 I graduated from the AWS Cloud Institute's Cloud Application Developer program, a nine-course
              curriculum covering Python, microservices, serverless architecture, CI/CD, infrastructure as code, and AI/ML
              on AWS.
            </p>
            <p>
              I write up what I learn on my
              {" "}
              <a href="https://blog.timdehof.dev/" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>blog</a>
              .
            </p>
          </div>

          {certifications.length > 0 && (
            <ul aria-label="Certifications" className="grid gap-2">
              {certifications.map(cert => (
                <li
                  key={cert.name}
                  className="flex flex-wrap justify-between gap-x-3 gap-y-1 rounded-lg border border-border bg-card px-3.5 py-2.5 text-[15px]"
                >
                  {cert.verificationUrl
                    ? (
                        <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                          {cert.name}
                          {" "}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )
                    : <span className="text-foreground">{cert.name}</span>}
                  <span className="font-mono text-xs leading-[1.9] text-muted-foreground">{`Earned ${cert.date}`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Cloud;
