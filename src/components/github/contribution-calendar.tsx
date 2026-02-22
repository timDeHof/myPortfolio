import { m } from "framer-motion";
import React, { useMemo } from "react";

import type { ContributionDay } from "../../services/api/github-stats";

import { useGitHubContributions } from "../../hooks/queries/use-github-stats";
import { Card, CardContent } from "../ui/card";
import { CalendarGrid } from "./calendar-grid";
import { CalendarHeader } from "./calendar-header";
import { CalendarLegend } from "./calendar-legend";
import { CalendarStats } from "./calendar-stats";

export const ContributionCalendar: React.FC = () => {
  const { data: contributionWeeks, error } = useGitHubContributions();

  const stats = useMemo(() => {
    if (!contributionWeeks)
      return { total: 0, streak: 0 };

    let total = 0;
    let streak = 0;
    const allDays: ContributionDay[] = [];

    contributionWeeks.forEach((week) => {
      week.days.forEach((day) => {
        allDays.push(day);
        total += day.count;
      });
    });

    const sortedDays = allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    for (const day of sortedDays) {
      if (day.count > 0) {
        streak++;
      }
      else {
        break;
      }
    }

    return { total, streak };
  }, [contributionWeeks]);

  const monthPositions = useMemo(() => {
    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (!contributionWeeks || contributionWeeks.length === 0)
      return [];

    const totalWeeks = contributionWeeks.length;

    const monthAppearances = new Map<number, { weekIndex: number; monthName: string; date: Date }>();

    contributionWeeks.forEach((week, weekIndex) => {
      if (week.days.length > 0) {
        const firstDay = week.days[0];
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        const monthName = monthLabels[month];

        if (!monthAppearances.has(month)) {
          monthAppearances.set(month, { weekIndex, monthName, date });
        }
      }
    });

    const sortedMonths = Array.from(monthAppearances.values())
      .sort((a, b) => a.weekIndex - b.weekIndex);

    const filteredMonths = [];
    let lastUsedPosition = -20;

    for (const monthData of sortedMonths) {
      const currentPosition = (monthData.weekIndex / totalWeeks) * 100;

      if (currentPosition - lastUsedPosition >= 18) {
        const finalPosition = Math.min(currentPosition, 88);
        filteredMonths.push({
          month: monthData.monthName,
          weekIndex: monthData.weekIndex,
          left: finalPosition,
          date: monthData.date,
        });
        lastUsedPosition = finalPosition;
      }
    }

    return filteredMonths;
  }, [contributionWeeks]);

  if (error || !contributionWeeks) {
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
        <CardContent className="p-10">
          <CalendarHeader total={stats.total} streak={stats.streak} />
          <div className="overflow-x-auto">
            <div className="inline-block" style={{ minWidth: "800px" }}>
              <CalendarGrid contributionWeeks={contributionWeeks} monthPositions={monthPositions} />
              <CalendarLegend />
              <CalendarStats total={stats.total} streak={stats.streak} contributionWeeks={contributionWeeks} />
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
};
