import { BookOpen, Code, Layout, List, Workflow } from "lucide-react";

import { Card, CardContent } from "../ui/card";

import type { ProjectTechStackItem, ProjectWorkflowStep, ProjectAdvancedFeature } from "../../types/project";

interface Project {
  name: string;
  description: string;
  useCase?: string;
  accentColor: string;
  techStack: (string | ProjectTechStackItem)[];
  workflow?: string | ProjectWorkflowStep[];
  advancedFeatures?: (string | ProjectAdvancedFeature)[];
  links?: {
    github?: string;
    demo?: string;
    storybook?: string;
    npm?: string;
    docs?: string;
  };
  tags?: string[];
}

interface OverviewTabProps {
  project: Project;
}

export function OverviewTab({ project }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {project.description}
        </p>
      </div>

      {project.useCase && (
        <div>
          <h3 className="font-semibold text-foreground mb-2">Use Case</h3>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {project.useCase}
          </p>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-foreground mb-3">Links</h3>
        <div className="flex flex-wrap gap-2">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-primary text-primary-foreground hover:opacity-90 text-sm rounded-lg"
            >
              Source
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border text-foreground hover:bg-accent text-sm rounded-lg"
            >
              Demo
            </a>
          )}
        </div>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-muted text-foreground text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function FeaturesTab({ project }: OverviewTabProps) {
  const features = project.advancedFeatures;
  
  return (
    <ol className="list-none space-y-4">
      {Array.isArray(features) && features.length > 0 ? (
        features.map((feature, index: number) => (
          <li key={`feature-${typeof feature === 'string' ? feature : feature.title}-${index}`} className="flex gap-3">
            <div 
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: project.accentColor }}
            >
              {index + 1}
            </div>
            <div className="pt-0.5">
              <h3 className="font-medium text-foreground">
                {typeof feature === "string" ? feature : feature.title}
              </h3>
              {typeof feature !== "string" && feature.description && (
                <p className="text-muted-foreground text-sm mt-1">
                  {feature.description}
                </p>
              )}
            </div>
          </li>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-8">No features listed</p>
      )}
    </ol>
  );
}

export function TechStackTab({ project }: OverviewTabProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Layer</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Technology</th>
          </tr>
        </thead>
        <tbody>
          {project.techStack.map((item, index) => (
            <tr key={`tech-${typeof item === 'string' ? item : item.category}-${index}`} className="border-b border">
              <td className="py-3 px-4 text-muted-foreground">
                {typeof item === "string" ? "-" : item.category}
              </td>
              <td className="py-3 px-4">
                {typeof item === "string" ? (
                  <span className="font-medium text-foreground">{item}</span>
                ) : (
                  <div>
                    <span className="font-medium text-foreground">
                      {item.tech}
                    </span>
                    {item.purpose && (
                      <p className="text-xs text-muted-foreground">
                        {item.purpose}
                      </p>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WorkflowTab({ project }: OverviewTabProps) {
  const workflow = project.workflow;
  
  return (
    <div className="space-y-4">
      {typeof workflow === "string" ? (
        <div className="flex flex-wrap gap-2">
          {(() => {
            const steps = workflow.split("→");
            return steps.map((step, index) => (
              <div key={`step-${step.trim()}-${index}`} className="flex items-center">
                <div 
                  className="px-3 py-2 rounded-full text-white text-sm font-medium"
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
      ) : Array.isArray(workflow) && workflow.length > 0 ? (
        workflow.map((step: ProjectWorkflowStep, index: number) => (
          <Card key={`workflow-${step.number || index}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {step.title}
                  </h3>
                  {step.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {step.subtitle}
                    </p>
                  )}
                  {step.description && (
                    <p className="text-base text-foreground mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-8">No workflow defined</p>
      )}
    </div>
  );
}

export function getProjectTabs(
  hasCaseStudy: boolean = false
): { id: string; label: string; icon: React.ReactNode }[] {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Layout className="h-4 w-4" /> },
    { id: "features", label: "Features", icon: <List className="h-4 w-4" /> },
    { id: "tech", label: "Tech Stack", icon: <Code className="h-4 w-4" /> },
    { id: "workflow", label: "Workflow", icon: <Workflow className="h-4 w-4" /> },
  ];

  if (hasCaseStudy) {
    tabs.unshift({ id: "case-study", label: "Case Study", icon: <BookOpen className="h-4 w-4" /> });
  }

  return tabs;
}
