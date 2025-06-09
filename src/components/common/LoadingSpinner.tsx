import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'blue' | 'teal' | 'purple' | 'gray';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  color = 'blue'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    blue: 'border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400',
    teal: 'border-gray-300 dark:border-gray-600 border-t-teal-600 dark:border-t-teal-400',
    purple: 'border-gray-300 dark:border-gray-600 border-t-purple-600 dark:border-t-purple-400',
    gray: 'border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-400',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};