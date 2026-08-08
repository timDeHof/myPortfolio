import { Clock, Star, X } from "lucide-react";

import type { Project } from "../../types/project";

interface ProjectDetailHeaderProps {
  project: Project;
  isModal?: boolean;
  onClose?: () => void;
}

export function ProjectDetailHeader({ project, isModal, onClose }: ProjectDetailHeaderProps) {
  return (
    <div
      className="relative p-4 pb-16"
      style={{
        backgroundImage: project.image ? `url(${project.image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        {isModal && onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-0 right-0 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-4xl font-bold text-white drop-shadow-lg"
            style={{ color: project.accentColor }}
          >
            {project.number}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
          {project.name}
        </h1>
        <p className="text-base text-gray-200 drop-shadow-md mb-3">
          {project.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
          <span className="flex items-center bg-card/20 px-2 py-1 rounded-full">
            <Clock className="h-4 w-4 mr-1" />
            {project.timeEstimate}
          </span>
          <span className="flex items-center bg-card/20 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 mr-1" />
            {project.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}
