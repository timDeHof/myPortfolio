import { useState } from "react";
import { ArrowLeft, Clock, Code, ExternalLink, Github, Star, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";

import { useProject } from "@hooks/useProjects";
import { useCaseStudy } from "@hooks/useCaseStudy";
import type { ProjectGalleryItem, ProjectAdvancedFeature, ProjectWorkflowStep, ProjectTechStackItem } from "../types/project";
import { OverviewTab, FeaturesTab, TechStackTab, WorkflowTab, getProjectTabs } from "@components/projects/ProjectDetailTabs";
import { CaseStudyTab } from "@components/projects/CaseStudyTab";

import type { CaseStudyData } from "@hooks/useCaseStudy";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabContentProps {
  activeTab: string;
  project: NonNullable<ReturnType<typeof useProject>["data"]>;
  caseStudyData?: CaseStudyData | null;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, project, caseStudyData }) => {
  switch (activeTab) {
    case "case-study":
      return caseStudyData ? (
        <CaseStudyTab data={caseStudyData} accentColor={project.accentColor} />
      ) : null;
    case "overview":
      return <OverviewTab project={project} />;
    case "features":
      return <FeaturesTab project={project} />;
    case "tech":
      return <TechStackTab project={project} />;
    case "workflow":
      return <WorkflowTab project={project} />;
    default:
      return null;
  }
};

interface ProjectDetailContentProps {
  project: NonNullable<ReturnType<typeof useProject>["data"]>;
  onClose?: () => void;
  isModal?: boolean;
}

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project, onClose, isModal }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const hasCaseStudy = project.slug === "shadcn-timeline";
  const { data: caseStudyData } = useCaseStudy(project.slug);

  const galleryImages: ProjectGalleryItem[] = (() => {
    if (!project.gallery || (Array.isArray(project.gallery) && project.gallery.length === 0)) {
      return project.image ? [{ url: project.image, alt: project.name, type: "image" as const }] : [];
    }
    if (typeof project.gallery[0] === "string") {
      return (project.gallery as string[]).map((url) => ({ url, alt: project.name, type: "image" as const }));
    }
    return project.gallery as ProjectGalleryItem[];
  })();

  const tabs: Tab[] = getProjectTabs(hasCaseStudy);

  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      {/* Header with background image */}
      <div 
        className="relative p-4 pb-16"
        style={{
          backgroundImage: project.image ? `url(${project.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10">
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          )}
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl font-bold text-white drop-shadow-lg" style={{ color: project.accentColor }}>
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
            <span className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              {project.timeEstimate}
            </span>
            <span className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="h-4 w-4 mr-1" />
              {project.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs - Only show in modal */}
      {isModal && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
          <div className="flex gap-1 overflow-x-auto -mx-4 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {isModal ? (
          <div className="min-h-[300px]">
            <TabContent activeTab={activeTab} project={project} caseStudyData={caseStudyData ?? undefined} />
          </div>
        ) : (
          // Full page view (non-modal)
          <div className="space-y-6">
            {galleryImages.length > 0 && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={galleryImages[0]?.url}
                    alt={project.name}
                    className="w-full h-auto max-h-[400px] object-cover"
                  />
                </div>
              </div>
            )}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Overview</h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{project.description}</p>
              </CardContent>
            </Card>
            {project.useCase && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Use Case</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{project.useCase}</p>
                </CardContent>
              </Card>
            )}
            {project.advancedFeatures && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Advanced Features</h2>
                  <div className="space-y-4">
                    {Array.isArray(project.advancedFeatures) && project.advancedFeatures.map((feature) => {
                      const featureKey = typeof feature === "string" ? feature : (feature as ProjectAdvancedFeature).title;
                      return (
                        <div key={featureKey}>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {typeof feature === "string" ? feature : (feature as ProjectAdvancedFeature).title}
                          </h3>
                          {typeof feature !== "string" && (
                            <p className="text-gray-600 dark:text-gray-300">{(feature as ProjectAdvancedFeature).description}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
            {project.workflow && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Development Workflow</h2>
                  <div className="space-y-4">
                    {typeof project.workflow === "string" ? (
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          const steps = project.workflow.split("→");
                          return steps.map((step, index) => {
                            const stepKey = `step-${index}-${step.trim()}`;
                            return (
                              <div key={stepKey} className="flex items-center">
                                <div className="px-3 py-1.5 rounded-full text-white text-sm font-medium" style={{ backgroundColor: project.accentColor }}>
                                  {step.trim()}
                                </div>
                                {index < steps.length - 1 && <span className="mx-1 text-gray-400">→</span>}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    ) : (
                      project.workflow.map((step: ProjectWorkflowStep) => {
                        const stepKey = step.number || step.title;
                        return (
                          <div key={stepKey} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: project.accentColor }}>
                              {step.number}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{step.title}</h3>
                              {step.subtitle && <p className="text-sm text-gray-600 dark:text-gray-400">{step.subtitle}</p>}
                              {step.description && <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{step.description}</p>}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Links</h2>
                  <div className="space-y-2">
                    {project.links?.github && (
                      <Button asChild className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-2" />View Source</a>
                      </Button>
                    )}
                    {project.links?.demo && (
                      <Button variant="outline" asChild className="w-full"><a href={project.links.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 mr-2" />Live Demo</a></Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tech Stack</h2>
                  <div className="space-y-2">
                    {project.techStack.map((item) => {
                      const techKey = typeof item === "string" ? item : (item as ProjectTechStackItem).tech;
                      return (
                        <div key={techKey} className="flex items-center gap-2">
                          <Code className="h-4 w-4" style={{ color: project.accentColor }} />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {techKey}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            {project.tags && project.tags.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProject(slug!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-20">
        <MaxWidthWrapper>
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </MaxWidthWrapper>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-20">
        <MaxWidthWrapper>
          <Card className="max-w-lg mx-auto bg-white dark:bg-slate-800">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Project Not Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">The project &quot;{slug}&quot; could not be found.</p>
              <Button asChild>
                <Link to="/projects"><ArrowLeft className="h-4 w-4 mr-2" />Back to Projects</Link>
              </Button>
            </CardContent>
          </Card>
        </MaxWidthWrapper>
      </div>
    );
  }

  return <ProjectDetailContent project={project} />;
};

export default ProjectDetailPage;
export { ProjectDetailContent };
