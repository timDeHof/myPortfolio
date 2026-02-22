import { m } from "framer-motion";
import React from "react";

import { contributionLevels } from "./calendar-config";

export const CalendarLegend: React.FC = () => {
  return (
    <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors flex items-center group"
      >
        <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full mr-3 group-hover:scale-110 transition-transform"></div>
        Learn how we count contributions
      </m.div>
      <m.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-8"
      >
        <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Less</span>
        <div className="flex gap-2">
          {contributionLevels.map((level, index) => {
            const isDarkMode = document.documentElement.classList.contains("dark");
            const squareColor = isDarkMode ? level.darkColor : level.color;

            return (
              <m.div
                key={level.level}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="w-5 h-5 rounded-md cursor-pointer hover:ring-2 hover:ring-slate-500 dark:hover:ring-slate-400 hover:ring-offset-2 hover:scale-125 transition-all duration-200 shadow-sm"
                style={{ backgroundColor: squareColor }}
                title={level.label}
              />
            );
          })}
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">More</span>
      </m.div>
    </div>
  );
};
