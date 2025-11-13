import React from "react";

import { AnimatedSection } from "../common/animated-section";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { ContributionCalendar } from "./contribution-calendar";
import { GitHubStatsCard } from "./github-stats-card";
import { LanguageChart } from "./language-chart";

export const GitHubStatsSection: React.FC = () => {
  return (
    <AnimatedSection className="py-20 bg-gray-50 dark:bg-slate-800">
      <MaxWidthWrapper>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            GitHub Analytics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time insights into my coding activity, language preferences, and contribution patterns.
          </p>
        </div>

        <div className="space-y-8">
          {/* GitHub Profile Stats */}
          <GitHubStatsCard />

          {/* Language Chart */}
          <LanguageChart />

          {/* Contribution Calendar - Full Width */}
          <ContributionCalendar />
        </div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
