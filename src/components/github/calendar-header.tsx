import React from "react";

type Props = {
  total: number;
  streak: number;
};

export const CalendarHeader: React.FC<Props> = ({ total, streak }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          Contribution Activity
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">Track my coding journey throughout the year</p>
      </div>
      <div className="text-right bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 rounded-2xl border border-green-200 dark:border-green-700">
        <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-900 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            {total}
          </span>
          <span className="ml-1">contributions this year</span>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-end">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></div>
          Current streak:
          {" "}
          <strong className="ml-1 text-blue-700 dark:text-blue-400">{streak}</strong>
          {" "}
          days
        </div>
      </div>
    </div>
  );
};
