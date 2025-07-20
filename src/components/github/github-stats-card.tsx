import { motion } from "framer-motion";
import { Calendar, GitBranch, GitFork, Link as LinkIcon, MapPin, Star, Users } from "lucide-react";
import React from "react";

import { useGitHubStats } from "../../hooks/queries/use-github-stats";
import { LoadingSpinner } from "../common/loading-spinner";
import { Card, CardContent } from "../ui/card";

export const GitHubStatsCard: React.FC = () => {
  const { data: stats, isLoading, error } = useGitHubStats();

  if (isLoading) {
    return (
      <Card className="h-64">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card className="h-64">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <p className="text-gray-500">Unable to load GitHub stats</p>
        </CardContent>
      </Card>
    );
  }

  const { profile, repositories, activity } = stats;

  const statItems = [
    {
      icon: <GitBranch className="h-5 w-5" />,
      label: "Public Repos",
      value: repositories.total.toLocaleString(),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: "Total Stars",
      value: repositories.stars.toLocaleString(),
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      icon: <GitFork className="h-5 w-5" />,
      label: "Total Forks",
      value: repositories.forks.toLocaleString(),
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Followers",
      value: profile.followers.toLocaleString(),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-white border-0 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">{profile.name || profile.login}</h3>
              <p className="text-gray-300 text-sm mb-2">
                @
                {profile.login}
              </p>
              {profile.bio && (
                <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                  {profile.bio}
                </p>
              )}
            </div>
            <a
              href={`https://github.com/${profile.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Profile Details */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-300">
            {profile.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
              </div>
            )}
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              <a
                href="https://blog.timdehof.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors underline"
              >
                Blog
              </a>
            </div>
            {profile.blog && profile.blog !== "https://blog.timdehof.dev/" && (
              <div className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                <a
                  href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                >
                  {profile.blog}
                </a>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Joined
                {new Date(profile.created_at).getFullYear()}
              </span>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <div className={`inline-flex p-2 rounded-lg ${item.bgColor} mb-2 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-xs text-gray-300">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Activity Summary */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-teal-400">
                  {activity.currentStreak}
                </div>
                <div className="text-xs text-gray-300">Current Streak</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-400">
                  {activity.longestStreak}
                </div>
                <div className="text-xs text-gray-300">Longest Streak</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-lg font-bold text-blue-400">
                  {activity.contributionYears.length}
                </div>
                <div className="text-xs text-gray-300">Years Active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
