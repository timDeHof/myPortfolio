import { m } from "framer-motion";
import React from "react";

import type { ContributionWeek } from "../../services/api/github-stats";

import { contributionLevels, dayLabels } from "./calendar-config";

type Props = {
  contributionWeeks: ContributionWeek[];
  monthPositions: Array<{ month: string; weekIndex: number; left: number; date: Date }>;
};

export const CalendarGrid: React.FC<Props> = ({ contributionWeeks, monthPositions }) => {
  return (
    <>
      {/* Month labels with improved accessibility */}
      <div className="hidden md:block mb-8 relative" style={{ minHeight: "40px" }}>
        <div className="flex">
          <div className="w-20 flex-shrink-0"></div>
          <div className="flex-1 relative">
            {monthPositions.map((monthData, index) => (
              <m.div
                key={`${monthData.month}-${monthData.weekIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="absolute text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-full shadow-lg border border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
                style={{
                  left: `${monthData.left}%`,
                  transform: "translateX(-50%)",
                  zIndex: 20,
                  top: "0px",
                }}
              >
                {monthData.month}
              </m.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile month display */}
      <div className="md:hidden flex justify-center gap-3 mb-8 flex-wrap">
        {monthPositions.slice(0, 4).map((monthData, index) => (
          <m.span
            key={`mobile-${monthData.month}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-full border border-slate-400 dark:border-slate-500 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
          >
            {monthData.month}
          </m.span>
        ))}
      </div>

      {/* Main calendar grid */}
      <div className="flex items-start bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
        {/* Enhanced day labels */}
        <div className="flex flex-col gap-1 mr-4 flex-shrink-0" style={{ width: "60px" }}>
          <div className="h-8 mb-2"></div>
          {dayLabels.map((day, index) => (
            <div
              key={day}
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-end pr-3"
              style={{
                height: "18px",
                visibility: index % 2 === 1 ? "visible" : "hidden",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Enhanced contribution squares with accessible colors */}
        <div className="flex gap-1 flex-1 min-w-0">
          {contributionWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.days.map((day, dayIndex) => {
                const levelConfig = contributionLevels.find(l => l.level === day.level);
                const date = new Date(day.date);
                const isDarkMode = document.documentElement.classList.contains("dark");
                const squareColor = isDarkMode ? levelConfig?.darkColor : levelConfig?.color;

                return (
                  <m.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: (weekIndex * 7 + dayIndex) * 0.002,
                      ease: "easeOut",
                    }}
                    className="w-[18px] h-[18px] rounded-md cursor-pointer group relative hover:ring-2 hover:ring-blue-500 dark:hover:ring-blue-400 hover:ring-offset-2 hover:scale-125 hover:z-30 transition-all duration-300 shadow-sm hover:shadow-lg"
                    style={{
                      backgroundColor: squareColor || "#e5e7eb",
                      border: day.level > 0 ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.1)",
                    }}
                    title={`${day.count} contributions on ${day.date}`}
                  >
                    {/* Enhanced accessible tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-5 px-5 py-4 bg-slate-900/95 dark:bg-slate-100/95 backdrop-blur-sm text-white dark:text-slate-900 text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-slate-700 dark:border-slate-300">
                      <div className="font-bold text-center text-base">
                        {day.count}
                        {" "}
                        contribution
                        {day.count !== 1 ? "s" : ""}
                      </div>
                      <div className="text-slate-300 dark:text-slate-600 text-xs text-center mt-2 leading-relaxed">
                        {date.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {day.level > 0 && (
                        <div className="text-center mt-2">
                          <span className="inline-block px-2 py-1 bg-green-600/20 dark:bg-green-400/20 text-green-300 dark:text-green-600 rounded-full text-xs font-medium">
                            {levelConfig?.label}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-slate-900/95 dark:border-t-slate-100/95"></div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
