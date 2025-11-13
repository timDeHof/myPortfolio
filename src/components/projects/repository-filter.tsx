import { Filter } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";

interface RepositoryFilterProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
};

export const RepositoryFilter: React.FC<RepositoryFilterProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="py-12 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="text-gray-600 dark:text-gray-400 font-medium">Filter by language:</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedLanguage === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => onLanguageChange("All")}
            className={selectedLanguage === "All"
              ? "bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-600"}
          >
            All
          </Button>
          {languages.map(language => (
            <Button
              key={language}
              variant={selectedLanguage === language ? "default" : "outline"}
              size="sm"
              onClick={() => onLanguageChange(language)}
              className={selectedLanguage === language
                ? "bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                : "border-gray-300 dark:border-gray-600 text-white dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-600"}
            >
              {language}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
