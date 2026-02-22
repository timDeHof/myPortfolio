import { m } from "framer-motion";
import React from "react";

import type { ContributionWeek } from "../../services/api/github-stats";

type Props = {
  total: number;
  streak: number;
  contributionWeeks: ContributionWeek[];
};

export const CalendarStats: React.FC<Props> = ({ total, streak, contributionWeeks }) => {
  return (
    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-green-900 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
            {total}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            Total Contributions
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-indigo-800 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
            {streak}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            Current Streak
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-violet-900 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
            {Math.round(total / 52)}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            Weekly Average
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-900 to-red-700 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-2">
            {contributionWeeks.reduce((max, week) =>
              Math.max(max, week.days.reduce((sum, day) => sum + day.count, 0)), 0)}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            Best Week
          </div>
        </m.div>
      </div>
    </div>
  );
};
