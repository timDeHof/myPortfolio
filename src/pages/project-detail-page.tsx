import { useState } from "react";
import { ArrowLeft, Clock, Code, ExternalLink, Github, Star, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { AnimatedSection } from "@components/common/animated-section";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";

import { useProject, useProjects } from "@hooks/useProjects";
import type { ProjectTechStackItem, ProjectWorkflowStep, ProjectAdvancedFeature, ProjectGalleryItem } from "../types/project";

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProject(slug!);
  const { data: allProjects } = useProjects();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const relatedProjects = allProjects?.filter(p => 
    project?.relatedProjects?.includes(p.slug) && p.slug !== project.slug
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-20">
        <MaxWidthWrapper>
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Project Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The project &quot;{slug}&quot; could not be found.
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

  const galleryImages: ProjectGalleryItem[] = (() => {
    if (!project.gallery || (Array.isArray(project.gallery) && project.gallery.length === 0)) {
      return project.image ? [{ url: project.image, alt: project.name, type: "image" as const }] : [];
    }
    if (typeof project.gallery[0] === "string") {
      return (project.gallery as string[]).map((url) => ({ url, alt: project.name, type: "image" as const }));
    }
    return project.gallery as ProjectGalleryItem[];
  })();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <AnimatedSection>
        <MaxWidthWrapper className="py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </MaxWidthWrapper>
      </AnimatedSection>

      <AnimatedSection>
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-6xl font-bold" style={{ color: project.accentColor }}>
                    {project.number}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {project.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.timeEstimate}
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {project.difficulty}
                  </span>
                </div>
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <img
                      src={activeImage || galleryImages[0]?.url}
                      alt={project.name}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                  </div>
                  {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage((img as ProjectGalleryItem).url)}
                          className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all ${
                            (activeImage || galleryImages[0]?.url) === (img as ProjectGalleryItem).url
                              ? "border-blue-500"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={(img as ProjectGalleryItem).url} alt={(img as ProjectGalleryItem).alt || ""} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Overview */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {project.description}
                  </p>
                </CardContent>
              </Card>

              {/* Use Case */}
              {project.useCase && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Use Case
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                      {project.useCase}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Advanced Features */}
              {project.advancedFeatures && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                      Advanced Features
                    </h2>
                    <div className="space-y-6">
                      {Array.isArray(project.advancedFeatures) && project.advancedFeatures.length > 0 && project.advancedFeatures.map((feature, index: number) => (
                        <div key={index}>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {typeof feature === "string" ? feature : (feature as ProjectAdvancedFeature).title}
                          </h3>
                          {typeof feature !== "string" && (
                            <p className="text-gray-600 dark:text-gray-300">
                              {(feature as ProjectAdvancedFeature).description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Workflow */}
              {project.workflow && project.workflow.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                      Development Workflow
                    </h2>
                    <div className="space-y-8">
                      {typeof project.workflow === "string" ? (
                        <div className="flex flex-wrap gap-2">
                          {(() => {
                            const steps = project.workflow.split("→");
                            return steps.map((step, index) => (
                              <div key={index} className="flex items-center">
                                <div 
                                  className="px-4 py-2 rounded-full text-white text-sm font-medium"
                                  style={{ backgroundColor: project.accentColor }}
                                >
                                  {step.trim()}
                                </div>
                                {index < steps.length - 1 && (
                                  <span className="mx-2 text-gray-400">→</span>
                                )}
                              </div>
                            ));
                          })()}
                        </div>
                      ) : (
                        project.workflow.map((step: ProjectWorkflowStep, index: number) => (
                          <div key={index} className="relative pl-8">
                            <div 
                              className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: project.accentColor }}
                            >
                              {step.number}
                            </div>
                            {index < project.workflow.length - 1 && (
                              <div 
                                className="absolute left-[14px] top-10 w-0.5 h-full -translate-x-1/2" 
                                style={{ backgroundColor: project.accentColor, opacity: 0.3 }}
                              />
                            )}
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {step.subtitle}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {step.description}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resume Pitch */}
              {project.resumePitch && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Resume Pitch
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                      {project.resumePitch}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Links */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Links
                  </h2>
                  <div className="space-y-3">
                    {project.links?.github && (
                      <Button asChild className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
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
                    {project.links?.storybook && (
                      <Button variant="outline" asChild className="w-full">
                        <a href={project.links.storybook} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-2" />
                          Storybook
                        </a>
                      </Button>
                    )}
                    {project.links?.npm && (
                      <Button variant="outline" asChild className="w-full">
                        <a href={project.links.npm} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          npm Package
                        </a>
                      </Button>
                    )}
                    {project.links?.docs && (
                      <Button variant="outline" asChild className="w-full">
                        <a href={project.links.docs} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Documentation
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Tech Stack
                  </h2>
                  <div className="space-y-4">
                    {project.techStack.map((item, index) => (
                      <div key={index}>
                        {typeof item === "string" ? (
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4" style={{ color: project.accentColor }} />
                            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {item}
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <Code className="h-4 w-4" style={{ color: project.accentColor }} />
                              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {(item as ProjectTechStackItem).category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {(item as ProjectTechStackItem).tech}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(item as ProjectTechStackItem).purpose}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Related Projects
                    </h2>
                    <div className="space-y-3">
                      {relatedProjects.map((related) => (
                        <Link
                          key={related.slug}
                          to={`/projects/${related.slug}`}
                          className="group flex items-center p-3 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                        >
                          <div 
                            className="w-12 h-12 rounded bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${related.image})` }}
                          />
                          <div className="ml-3 flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-blue-500 transition-colors truncate">
                              {related.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {related.tagline}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>
    </div>
  );
};

export default ProjectDetailPage;
