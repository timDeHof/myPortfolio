import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useGitHubContributions } from '../../hooks/queries/useGitHubStats';
import { ContributionDay } from '../../services/api/githubStats';

export const ContributionCalendar: React.FC = () => {
  const { data: contributionWeeks, isLoading, error } = useGitHubContributions();

  // WCAG AA compliant contribution colors
  const contributionLevels = [
    { 
      level: 0, 
      color: '#e5e7eb', 
      darkColor: '#374151', 
      label: 'No contributions', 
      bgColor: 'bg-gray-200 dark:bg-gray-700' 
    },
    { 
      level: 1, 
      color: '#86efac', 
      darkColor: '#4ade80', 
      label: '1-3 contributions', 
      bgColor: 'bg-green-300 dark:bg-green-400' 
    },
    { 
      level: 2, 
      color: '#22c55e', 
      darkColor: '#22c55e', 
      label: '4-6 contributions', 
      bgColor: 'bg-green-500 dark:bg-green-500' 
    },
    { 
      level: 3, 
      color: '#15803d', 
      darkColor: '#16a34a', 
      label: '7-9 contributions', 
      bgColor: 'bg-green-700 dark:bg-green-600' 
    },
    { 
      level: 4, 
      color: '#14532d', 
      darkColor: '#15803d', 
      label: '10+ contributions', 
      bgColor: 'bg-green-800 dark:bg-green-700' 
    },
  ];

  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate total contributions and current streak
  const stats = useMemo(() => {
    if (!contributionWeeks) return { total: 0, streak: 0 };

    let total = 0;
    let streak = 0;
    const allDays: ContributionDay[] = [];

    contributionWeeks.forEach(week => {
      week.days.forEach(day => {
        allDays.push(day);
        total += day.count;
      });
    });

    // Calculate current streak (from most recent day backwards)
    const sortedDays = allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    for (const day of sortedDays) {
      if (day.count > 0) {
        streak++;
      } else {
        break;
      }
    }

    return { total, streak };
  }, [contributionWeeks]);

  // Enhanced month positioning with better spacing
  const monthPositions = useMemo(() => {
    if (!contributionWeeks || contributionWeeks.length === 0) return [];
    
    const totalWeeks = contributionWeeks.length;
    
    // Track month appearances with their week positions
    const monthAppearances = new Map<number, { weekIndex: number; monthName: string; date: Date }>();
    
    contributionWeeks.forEach((week, weekIndex) => {
      if (week.days.length > 0) {
        const firstDay = week.days[0];
        const date = new Date(firstDay.date);
        const month = date.getMonth(); // 0-11
        const monthName = monthLabels[month];
        
        // Only track the first appearance of each month
        if (!monthAppearances.has(month)) {
          monthAppearances.set(month, { weekIndex, monthName, date });
        }
      }
    });
    
    // Convert to array and sort by week index
    const sortedMonths = Array.from(monthAppearances.values())
      .sort((a, b) => a.weekIndex - b.weekIndex);
    
    // Improved spacing algorithm
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
          date: monthData.date
        });
        lastUsedPosition = finalPosition;
      }
    }
    
    return filteredMonths;
  }, [contributionWeeks, monthLabels]);

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <CardContent className="p-10 flex items-center justify-center h-96">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-slate-700 dark:text-slate-300 mt-4 font-medium">Loading contribution data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardContent className="p-10">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Contribution Activity
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">Track my coding journey throughout the year</p>
            </div>
            <div className="text-right bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 rounded-2xl border border-green-200 dark:border-green-700">
              <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  {stats.total}
                </span>
                <span className="ml-1">contributions this year</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-end">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                Current streak: <strong className="ml-1 text-blue-700 dark:text-blue-400">{stats.streak}</strong> days
              </div>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Month labels with improved accessibility */}
              <div className="hidden md:block mb-8 relative" style={{ minHeight: '40px' }}>
                <div className="flex">
                  <div className="w-20 flex-shrink-0"></div>
                  <div className="flex-1 relative">
                    {monthPositions.map((monthData, index) => (
                      <motion.div
                        key={`${monthData.month}-${monthData.weekIndex}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-full shadow-lg border border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
                        style={{ 
                          left: `${monthData.left}%`,
                          transform: 'translateX(-50%)',
                          zIndex: 20,
                          top: '0px'
                        }}
                      >
                        {monthData.month}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile month display */}
              <div className="md:hidden flex justify-center gap-3 mb-8 flex-wrap">
                {monthPositions.slice(0, 4).map((monthData, index) => (
                  <motion.span 
                    key={`mobile-${monthData.month}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-full border border-slate-400 dark:border-slate-500 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
                  >
                    {monthData.month}
                  </motion.span>
                ))}
              </div>

              {/* Main calendar grid */}
              <div className="flex items-start bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                {/* Enhanced day labels */}
                <div className="flex flex-col gap-1 mr-6" style={{ width: '72px' }}>
                  <div className="h-8 mb-2"></div>
                  {dayLabels.map((day, index) => (
                    <div
                      key={day}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-end pr-3"
                      style={{ 
                        height: '18px',
                        visibility: index % 2 === 1 ? 'visible' : 'hidden',
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Enhanced contribution squares with accessible colors */}
                <div className="flex gap-1">
                  {contributionWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.days.map((day, dayIndex) => {
                        const levelConfig = contributionLevels.find(l => l.level === day.level);
                        const date = new Date(day.date);
                        const isDarkMode = document.documentElement.classList.contains('dark');
                        const squareColor = isDarkMode ? levelConfig?.darkColor : levelConfig?.color;
                        
                        return (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: (weekIndex * 7 + dayIndex) * 0.002,
                              ease: 'easeOut'
                            }}
                            className="w-[18px] h-[18px] rounded-md cursor-pointer group relative hover:ring-2 hover:ring-blue-500 dark:hover:ring-blue-400 hover:ring-offset-2 hover:scale-125 hover:z-30 transition-all duration-300 shadow-sm hover:shadow-lg"
                            style={{ 
                              backgroundColor: squareColor || '#e5e7eb',
                              border: day.level > 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)'
                            }}
                            title={`${day.count} contributions on ${day.date}`}
                          >
                            {/* Enhanced accessible tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-5 px-5 py-4 bg-slate-900/95 dark:bg-slate-100/95 backdrop-blur-sm text-white dark:text-slate-900 text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-slate-700 dark:border-slate-300">
                              <div className="font-bold text-center text-base">
                                {day.count} contribution{day.count !== 1 ? 's' : ''}
                              </div>
                              <div className="text-slate-300 dark:text-slate-600 text-xs text-center mt-2 leading-relaxed">
                                {date.toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'long', 
                                  day: 'numeric',
                                  year: 'numeric'
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
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Legend with accessible colors */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors flex items-center group"
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full mr-3 group-hover:scale-110 transition-transform"></div>
                  Learn how we count contributions
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-8"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Less</span>
                  <div className="flex gap-2">
                    {contributionLevels.map((level, index) => {
                      const isDarkMode = document.documentElement.classList.contains('dark');
                      const squareColor = isDarkMode ? level.darkColor : level.color;
                      
                      return (
                        <motion.div
                          key={level.level}
                          initial={{ scale: 0 }}
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
                </motion.div>
              </div>

              {/* Enhanced Summary Stats with accessible colors */}
              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                      {stats.total}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      Total Contributions
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                      {stats.streak}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      Current Streak
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                      {Math.round(stats.total / 52)}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      Weekly Average
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-center group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-700 to-red-700 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-2">
                      {contributionWeeks.reduce((max, week) => 
                        Math.max(max, week.days.reduce((sum, day) => sum + day.count, 0)), 0
                      )}
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      Best Week
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};