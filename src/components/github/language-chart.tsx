import { m } from "framer-motion";
import React from "react";

import { useGitHubStats } from "../../hooks/queries/use-github-stats";
import { LoadingSpinner } from "../common/loading-spinner";
import { Card, CardContent } from "../ui/card";

export const LanguageChart: React.FC = () => {
  const { data: stats, isLoading, error } = useGitHubStats();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center h-64">
          <p className="text-muted-foreground">Unable to load language stats</p>
        </CardContent>
      </Card>
    );
  }

  const { languages } = stats.repositories;
  const topLanguages = languages.slice(0, 8); // Show top 8 languages

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold dark:text-white text-foreground mb-6">
            Most Used Languages
          </h3>

          {/* Language List */}
          <div className="space-y-4">
            {topLanguages.map((language, index) => (
              <m.div
                key={language.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: language.color }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {language.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {language.percentage.toFixed(1)}
                    %
                  </span>
                </div>

                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <m.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: language.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${language.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </m.div>
            ))}
          </div>

          {/* Summary */}
          <hr className="my-6 border-border" />
          <div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Analyzed across
                {" "}
                <strong>{stats.repositories.total}</strong>
                {" "}
                repositories
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on lines of code and project composition
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
};
