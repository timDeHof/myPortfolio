import React from "react";

import { AnimatedSection } from "../common/animated-section";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { TooltipProvider } from "../ui/tooltip";
import { GitHubStatsCard } from "./github-stats-card";
import { LanguageChart } from "./language-chart";
import { ContributionCalendar } from "./contribution-calendar";

// Section styling constants to avoid magic values and repeated classes
const SECTION_STYLES = {
  container: "py-20 bg-gray-50 dark:bg-slate-800",
  header: {
    wrapper: "text-center mb-16",
    title: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4",
    description:
      "text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto",
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
          <h2 className={SECTION_STYLES.header.title}>GitHub Analytics</h2>
          <p className={SECTION_STYLES.header.description}>
            Real-time insights into my coding activity, language preferences,
            and contribution patterns.
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
