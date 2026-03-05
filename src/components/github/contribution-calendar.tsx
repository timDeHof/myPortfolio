import { m } from "framer-motion";
import React, { useMemo } from "react";

import type { ContributionDay } from "../../services/api/github-stats";

import { useGitHubContributions } from "../../hooks/queries/use-github-stats";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "../kibo-ui/contribution-graph";

export const ContributionCalendar: React.FC<{ username?: string }> = ({ username = "timDeHof" }) => {
  const { data, error } = useGitHubContributions(username);
  const contributionData = data?.contributions;

  const { activities, total } = useMemo(() => {
    if (!contributionData) return { activities: [], total: 0 };

    let totalCount = 0;
    const allDays: ContributionDay[] = [];

    contributionData.forEach((week) => {
      week.days.forEach((day) => {
        allDays.push(day);
        totalCount += day.count;
      });
    });

    const activitiesData: Activity[] = contributionData.flatMap((week) =>
      week.days.map((day) => ({
        date: day.date,
        count: day.count,
        level: day.level,
      }))
    );

    return { activities: activitiesData, total: totalCount };
  }, [contributionData]);

  if (error || !contributionData) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900">
        <CardContent className="p-10 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-200 dark:bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-700 dark:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-medium">Unable to load contribution calendar</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Please try again later</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardContent className="p-10 w-full">
          <div className="w-full">
            <ContributionGraph
              data={activities}
              blockMargin={2}
              blockSize={20}
              fontSize={16}
            >
              <ContributionGraphCalendar>
                {({ activity, dayIndex, weekIndex }) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <g>

                  <ContributionGraphBlock
                    className="cursor-pointer"
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    />
                    </g>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold">{activity.date}</p>
                      <p className="text-muted-foreground">{activity.count} contributions</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
                )}
              </ContributionGraphCalendar>
              <ContributionGraphFooter>
                <ContributionGraphTotalCount>
                  {({ totalCount, year }) => (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm font-medium">
                        Year{" "}{year}:
                      </span>
                      <Badge className="text-sm font-bold text-emerald-600
                      bg-emerald-300 dark:bg-emerald-900
                      border-emerald-400 dark:border-emerald-700
                      dark:text-emerald-400">
                        {totalCount.toLocaleString()}{" "}contributions
                      </Badge>
                    </div>
                  )}
                </ContributionGraphTotalCount>
                <ContributionGraphLegend />
              </ContributionGraphFooter>
            </ContributionGraph>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
};
