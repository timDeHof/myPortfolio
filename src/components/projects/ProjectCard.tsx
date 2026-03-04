import { m } from "framer-motion";
import { ArrowRight, Clock, Code, ExternalLink, Github, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

import type { Project, ProjectTechStackItem } from "../../types/project";
import { getTechBadgeClasses } from "../../lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: () => void;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&auto=format&q=80";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0, onClick }) => {
  const imageUrl = project.image || DEFAULT_IMAGE;

  return onClick ? (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <CardContent className="p-0">
          <div className="relative">
            <div
              className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${imageUrl})`,
                backgroundColor: project.accentColor || "#1e293b"
              }}
            />
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded text-sm font-bold" style={{ color: project.accentColor }}>
              {project.number}
            </div>
            {project.difficulty && (
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-medium">
                <Star className="h-3 w-3" />
                <span>{project.difficulty}</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {project.tagline}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{project.timeEstimate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  ) : (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="relative">
          <div
            className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundColor: project.accentColor || "#1e293b"
            }}
          />
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded text-sm font-bold" style={{ color: project.accentColor }}>
            {project.number}
          </div>
          {project.difficulty && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3" />
              <span>{project.difficulty}</span>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
            {project.name}
          </h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {project.tagline}
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 min-h-[3rem]">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.techStack) && project.techStack.length > 0 && project.techStack.slice(0, 5).map((item) => {
                const techKey = typeof item === "string" ? item : (item as ProjectTechStackItem).tech.split("·")[0].trim();
                const colors = getTechBadgeClasses(techKey);
                return (
                  <span
                    key={techKey}
                    className={`px-2 py-1 text-xs rounded-full font-medium flex items-center border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    <Code className="h-3 w-3 mr-1" />
                    {techKey}
                  </span>
                );
              })}
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 4).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Clock className="h-4 w-4" />
            <span>{project.timeEstimate}</span>
          </div>

          <div className="flex gap-2">
            <Button size="sm" asChild className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
              <Link to={`/projects/${project.slug}`}>
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            {project.links?.github && (
              <Button variant="outline" size="sm" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.links?.demo && (
              <Button variant="outline" size="sm" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
};
