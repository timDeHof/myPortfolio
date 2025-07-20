import React from "react";

import { AnimatedSection } from "../common/animated-section";
import { ContributionCalendar } from "./contribution-calendar";
import { GitHubStatsCard } from "./github-stats-card";
import { LanguageChart } from "./language-chart";

export const GitHubStatsSection: React.FC = () => {
  return (
    <AnimatedSection className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            GitHub Analytics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time insights into my coding activity, language preferences, and contribution patterns.
          </p>
        </div>

        <div className="space-y-8">
          {/* GitHub Profile Stats */}
          <GitHubStatsCard />

          {/* Two Column Layout for Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LanguageChart />
            <div className="space-y-8">
              {/* You can add more small charts here */}
              <div className="h-full">
                <ContributionCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
