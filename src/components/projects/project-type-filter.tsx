import { motion } from "framer-motion";
import { GitFork, Globe, User } from "lucide-react";
import React from "react";

import type { ProjectType } from "../../hooks/queries/use-repository-filtering";

import { Button } from "../ui/button";

type ProjectTypeFilterProps = {
  selectedType: ProjectType;
  onTypeChange: (type: ProjectType) => void;
  stats: {
    total: number;
    personal: number;
    contributions: number;
  };
};

const projectTypes = [
  {
    type: "all" as ProjectType,
    label: "All Projects",
    icon: Globe,
    description: "All repositories",
    color: "blue",
  },
  {
    type: "personal" as ProjectType,
    label: "Personal",
    icon: User,
    description: "Original projects I created",
    color: "teal",
  },
  {
    type: "contributions" as ProjectType,
    label: "Contributions",
    icon: GitFork,
    description: "Projects I contributed to",
    color: "purple",
  },
];

export const ProjectTypeFilter: React.FC<ProjectTypeFilterProps> = ({
  selectedType,
  onTypeChange,
  stats,
}) => {
  const getCount = (type: ProjectType) => {
    switch (type) {
      case "personal":
        return stats.personal;
      case "contributions":
        return stats.contributions;
      default:
        return stats.total;
    }
  };

  const getButtonClasses = (type: ProjectType, color: string) => {
    const isSelected = selectedType === type;

    const colorClasses = {
      blue: {
        selected: "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white",
        unselected: "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
      },
      teal: {
        selected: "bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white",
        unselected: "hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-600 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
      },
      purple: {
        selected: "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 text-white",
        unselected: "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
      },
    };

    return isSelected ? colorClasses[color as keyof typeof colorClasses].selected : colorClasses[color as keyof typeof colorClasses].unselected;
  };

  const getBadgeClasses = (type: ProjectType, color: string) => {
    const isSelected = selectedType === type;

    const colorClasses = {
      blue: {
        selected: "bg-blue-600 dark:bg-blue-500 text-white",
        unselected: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-800",
      },
      teal: {
        selected: "bg-teal-600 dark:bg-teal-500 text-white",
        unselected: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-800",
      },
      purple: {
        selected: "bg-purple-600 dark:bg-purple-500 text-white",
        unselected: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-800",
      },
    };

    return isSelected ? colorClasses[color as keyof typeof colorClasses].selected : colorClasses[color as keyof typeof colorClasses].unselected;
  };

  return (
    <div className="py-8 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Project Categories
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Browse by project type to see different aspects of my work
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {projectTypes.map((projectType) => {
            const Icon = projectType.icon;
            const count = getCount(projectType.type);

            return (
              <motion.div
                key={projectType.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedType === projectType.type ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTypeChange(projectType.type)}
                  className={`relative group ${getButtonClasses(projectType.type, projectType.color)}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="font-medium">{projectType.label}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${getBadgeClasses(projectType.type, projectType.color)}`}>
                    {count}
                  </span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {projectType.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
