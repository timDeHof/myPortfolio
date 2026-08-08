import { Card, CardContent } from "@components/ui/card";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { usePortfolioData } from "@hooks/use-portfolio-data";
import { m } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import React from "react";

import type { Certification } from "@/types/portfolio";

import { AnimatedCard } from "../common/animated-card";

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
  return (
    <AnimatedCard index={index}>
      {/* Badge or Icon */}
      <div className="mb-6 flex justify-center">
        {certification.badgeUrl
          ? (
              <img
                src={certification.badgeUrl}
                alt={`${certification.name} badge`}
                className="h-32 w-32 rounded-full object-contain shadow-lg"
              />
            )
          : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary shadow-lg">
                <Award className="h-10 w-10 text-secondary-foreground" />
              </div>
            )}
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-bold text-foreground">
        {certification.name}
      </h3>

      <div className="mb-3 space-y-1">
        <p className="text-sm font-semibold text-secondary">
          {certification.issuer}
        </p>
        <p className="text-sm text-muted-foreground">
          Earned:
          {" "}
          {certification.date}
        </p>
      </div>

      {certification.description && (
        <p className="mb-4 text-sm leading-relaxed text-foreground">
          {certification.description}
        </p>
      )}

      {/* Skills Tags */}
      {certification.skills && certification.skills.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {certification.skills.map(skill => (
            <span
              key={skill}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Verification Link */}
      {certification.verificationUrl && (
        <a
          href={certification.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-lg bg-muted px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-muted/80"
        >
          Verify Credential
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      )}
    </AnimatedCard>
  );
};

export const CertificationsSection: React.FC = () => {
  const { data: portfolioData, isLoading } = usePortfolioData();
  const certifications = portfolioData?.certifications || [];

  if (isLoading) {
    return (
      <section className="bg-muted py-20">
        <MaxWidthWrapper>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </MaxWidthWrapper>
      </section>
    );
  }

  return (
    <section className="bg-muted py-20">
      <MaxWidthWrapper>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-secondary-foreground shadow-2xl">
              <Award className="h-10 w-10" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Certifications
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-foreground">
              Professional certifications that validate my expertise and commitment to continuous learning
              in modern web development and technology.
            </p>
          </m.div>
        </div>

        {/* Certifications Grid */}
        {certifications.length > 0
          ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert, index) => (
                  <CertificationCard
                    key={cert.name}
                    certification={cert}
                    index={index}
                  />
                ))}
              </div>
            )
          : (
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-12 text-center"
              >
                <Card className="mx-auto max-w-2xl border bg-card">
                  <CardContent className="p-12">
                    <Award className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      Always Learning
                    </h3>
                    <p className="text-muted-foreground">
                      I focus on hands-on experience and real-world project delivery.
                      Formal certifications are on the roadmap — watch this space.
                    </p>
                  </CardContent>
                </Card>
              </m.div>
            )}

        {/* Stats Summary */}
        {certifications.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="overflow-hidden border bg-card shadow-2xl">
              <CardContent className="p-10">
                <div className="grid gap-8 text-center sm:grid-cols-3">
                  <div>
                    <div className="mb-2 text-4xl font-bold text-primary">
                      {certifications.length}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Active Certifications
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-4xl font-bold text-primary">
                      {new Set(certifications.map(c => c.issuer)).size}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Issuing Organizations
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-4xl font-bold text-primary">
                      {certifications.filter(c => c.verificationUrl).length}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Verified Credentials
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </MaxWidthWrapper>
    </section>
  );
};
