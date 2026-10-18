import React from "react";

import { AnimatedSection } from "../common/animated-section";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { TooltipProvider } from "../ui/tooltip";
import { ContributionCalendar } from "./contribution-calendar";
import { GitHubStatsCard } from "./github-stats-card";
import { LanguageChart } from "./language-chart";

// Section styling constants to avoid magic values and repeated classes
const SECTION_STYLES = {
  container: "py-20 bg-muted",
  header: {
    wrapper: "text-center mb-16",
    title: "text-3xl md:text-4xl font-bold text-foreground mb-4",
    description:
      "text-lg text-foreground max-w-2xl mx-auto",
  },
  content: "space-y-8",
} as const;

export const GitHubStatsSection: React.FC = () => {
  return (
    <AnimatedSection
      className={SECTION_STYLES.container}
      aria-label="GitHub Analytics Section"
    >
      <MaxWidthWrapper>
        {/* Section Header */}
        <header className={SECTION_STYLES.header.wrapper}>
          <h2 className={SECTION_STYLES.header.title}>GitHub activity</h2>
          <p className={SECTION_STYLES.header.description}>
            Pulled from the GitHub API: repositories, languages, and recent contributions.
          </p>
        </header>

        {/* Main Content */}
        <div className={SECTION_STYLES.content} role="region" aria-label="GitHub Statistics">
          <TooltipProvider>
            {/* GitHub Profile Stats */}
            <GitHubStatsCard />

            {/* Language Chart */}
            <LanguageChart />

            {/* Contribution Calendar - Full Width */}
            <ContributionCalendar />
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
