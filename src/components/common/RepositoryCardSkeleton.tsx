import React from 'react';
import { Card, CardContent } from '../ui/card';

interface RepositoryCardSkeletonProps {
  index?: number;
}

export const RepositoryCardSkeleton: React.FC<RepositoryCardSkeletonProps> = ({ index = 0 }) => {
  return (
    <div 
      className="animate-pulse"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="h-full overflow-hidden bg-white border-gray-200">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200" />
        
        <CardContent className="p-6">
          {/* Header with title and stats */}
          <div className="flex items-start justify-between mb-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="flex items-center space-x-3">
              <div className="h-4 bg-gray-200 rounded w-8"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
          
          {/* Description lines */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
          </div>

          {/* Languages */}
          <div className="flex space-x-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
          </div>

          {/* Last updated */}
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <div className="h-9 bg-gray-200 rounded w-20"></div>
            <div className="h-9 bg-gray-200 rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Grid of skeleton cards
interface RepositorySkeletonGridProps {
  count?: number;
}

export const RepositorySkeletonGrid: React.FC<RepositorySkeletonGridProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <RepositoryCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
};