import { Github, RefreshCw } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";

interface ProjectsEmptyStateProps {
  selectedLanguage: string;
  selectedProjectType: string;
  hasRepositories: boolean;
  onClearLanguage: () => void;
  onClearType: () => void;
  onRefresh: () => void;
};

export const ProjectsEmptyState: React.FC<ProjectsEmptyStateProps> = ({
  selectedLanguage,
  selectedProjectType,
  hasRepositories,
  onClearLanguage,
  onClearType,
  onRefresh,
}) => {
  if (hasRepositories) {
    return (
      <div className="text-center py-12">
        <Github className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No
          {" "}
          {selectedLanguage !== "All" ? selectedLanguage : ""}
          {" "}
          repositories found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {selectedProjectType === "showcase" && "No showcase projects found for the selected criteria."}
          {selectedProjectType === "personal" && "No personal projects found for the selected criteria."}
          {selectedProjectType === "contributions" && "No contributions found for the selected criteria."}
          {selectedProjectType === "all" && "No repositories found for the selected filters."}
        </p>
        <div className="space-y-3">
          <Button
            onClick={onClearLanguage}
            className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
          >
            Show All Languages
          </Button>
          <Button
            variant="outline"
            onClick={onClearType}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Show All Project Types
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Github className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No Repositories Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        We couldn't find any public repositories. This might be due to API issues or configuration problems.
      </p>
      <div className="space-x-4">
        <Button
          onClick={onRefresh}
          className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        <Button variant="outline" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <a
            href="https://github.com/timDeHof"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4 mr-2" />
            View GitHub Profile
          </a>
        </Button>
      </div>
    </div>
  );
};
