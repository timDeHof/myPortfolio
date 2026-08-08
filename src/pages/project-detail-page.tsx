import type { CaseStudyData } from "@hooks/use-case-study";

import { CaseStudyTab } from "@components/projects/case-study-tab";
import { ProjectDetailHeader } from "@components/projects/project-detail-header";
import { FeaturesTab, getProjectTabs, OverviewTab, TechStackTab, WorkflowTab } from "@components/projects/project-detail-tabs";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { useCaseStudy } from "@hooks/use-case-study";
import { useProject } from "@hooks/use-projects";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Code, ExternalLink, Github } from "lucide-react";
import { useState } from "react";

import type { ProjectAdvancedFeature, ProjectTechStackItem, ProjectWorkflowStep } from "../types/project";

import { CASE_STUDY_SLUGS } from "../types/project";
import { normalizeGallery } from "../utils/gallery";

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
      return caseStudyData
        ? (
            <CaseStudyTab data={caseStudyData} accentColor={project.accentColor} />
          )
        : null;
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

  const hasCaseStudy = CASE_STUDY_SLUGS.includes(project.slug);
  const { data: caseStudyData } = useCaseStudy(project.slug);

  const galleryImages = normalizeGallery(project.gallery, project.image, project.name);
  const tabs: Tab[] = getProjectTabs(hasCaseStudy);

  return (
    <div className="bg-muted">
      <ProjectDetailHeader project={project} isModal={isModal} onClose={onClose} />

      {/* Tabs - Only show in modal */}
      {isModal && (
        <div className="px-4 py-2 border-b border">
          <div className="flex gap-1 overflow-x-auto -mx-4 px-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:bg-accent"
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
        {isModal
          ? (
              <div className="min-h-[300px]">
                <TabContent activeTab={activeTab} project={project} caseStudyData={caseStudyData ?? undefined} />
              </div>
            )
          : (
        // Full page view (non-modal)
              <div className="space-y-6">
                {galleryImages.length > 0 && (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden bg-muted">
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
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
                    <p className="text-foreground whitespace-pre-wrap">{project.description}</p>
                  </CardContent>
                </Card>
                {project.useCase && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Use Case</h2>
                      <p className="text-foreground whitespace-pre-wrap">{project.useCase}</p>
                    </CardContent>
                  </Card>
                )}
                {project.advancedFeatures && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Advanced Features</h2>
                      <div className="space-y-4">
                        {Array.isArray(project.advancedFeatures) && project.advancedFeatures.map((feature) => {
                          const featureKey = typeof feature === "string" ? feature : (feature as ProjectAdvancedFeature).title;
                          return (
                            <div key={featureKey}>
                              <h3 className="font-medium text-foreground mb-2">
                                {typeof feature === "string" ? feature : (feature as ProjectAdvancedFeature).title}
                              </h3>
                              {typeof feature !== "string" && (
                                <p className="text-foreground">{(feature as ProjectAdvancedFeature).description}</p>
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
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Development Workflow</h2>
                      <div className="space-y-4">
                        {typeof project.workflow === "string"
                          ? (
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
                                        {index < steps.length - 1 && <span className="mx-1 text-muted-foreground">→</span>}
                                      </div>
                                    );
                                  });
                                })()}
                              </div>
                            )
                          : (
                              project.workflow.map((step: ProjectWorkflowStep) => {
                                const stepKey = step.number || step.title;
                                return (
                                  <div key={stepKey} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: project.accentColor }}>
                                      {step.number}
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                                      {step.subtitle && <p className="text-sm text-muted-foreground">{step.subtitle}</p>}
                                      {step.description && <p className="text-foreground leading-relaxed">{step.description}</p>}
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
                      <h2 className="text-lg font-semibold text-foreground mb-4">Links</h2>
                      <div className="space-y-2">
                        {project.links?.github && (
                          <Button asChild className="w-full bg-primary text-primary-foreground hover:opacity-90">
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              View Source
                            </a>
                          </Button>
                        )}
                        {project.links?.demo && (
                          <Button variant="outline" asChild className="w-full">
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h2>
                      <div className="space-y-2">
                        {project.techStack.map((item) => {
                          const techKey = typeof item === "string" ? item : (item as ProjectTechStackItem).tech;
                          return (
                            <div key={techKey} className="flex items-center gap-2">
                              <Code className="h-4 w-4" style={{ color: project.accentColor }} />
                              <span className="text-sm text-foreground">
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
                          <span key={tag} className="px-3 py-1 bg-muted text-foreground text-sm rounded">{tag}</span>
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
  // Use route-specific hook for type-safe params
  const { slug } = useParams({ from: "/projects/$slug" });
  const { data: project, isLoading, error } = useProject(slug);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-muted py-20">
        <MaxWidthWrapper>
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded-lg" />
          </div>
        </MaxWidthWrapper>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[100dvh] bg-muted py-20">
        <MaxWidthWrapper>
          <Card className="max-w-lg mx-auto bg-card">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The project &quot;
                {slug}
                &quot; could not be found.
              </p>
              <Button asChild>
                <Link to="/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Link>
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
