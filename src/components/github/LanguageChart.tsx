import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useGitHubStats } from '../../hooks/queries/useGitHubStats';

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
          <p className="text-gray-500">Unable to load language stats</p>
        </CardContent>
      </Card>
    );
  }

  const { languages } = stats.repositories;
  const topLanguages = languages.slice(0, 8); // Show top 8 languages

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Most Used Languages
          </h3>
          
          {/* Language List */}
          <div className="space-y-4">
            {topLanguages.map((language, index) => (
              <motion.div
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
                    <span className="text-sm font-medium text-gray-900">
                      {language.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {language.percentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: language.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${language.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Language Circles Visualization */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Language Distribution
            </h4>
            <div className="flex flex-wrap gap-2">
              {topLanguages.map((language, index) => {
                const size = Math.max(language.percentage * 2, 20); // Minimum size of 20px
                return (
                  <motion.div
                    key={`circle-${language.name}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div
                      className="rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      style={{
                        backgroundColor: language.color,
                        width: `${size}px`,
                        height: `${size}px`,
                        minWidth: '20px',
                        minHeight: '20px'
                      }}
                      title={`${language.name} - ${language.percentage.toFixed(1)}%`}
                    >
                      {language.name.charAt(0)}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {language.name}: {language.percentage.toFixed(1)}%
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Analyzed across <strong>{stats.repositories.total}</strong> repositories
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Based on lines of code and project composition
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};