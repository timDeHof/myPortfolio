import type { CaseStudyData } from "@hooks/use-case-study";

import { CaseStudyTab } from "@components/projects/case-study-tab";
import { ProjectCaseStudyView } from "@components/projects/project-case-study-view";
import { ProjectDetailHeader } from "@components/projects/project-detail-header";
import { FeaturesTab, getProjectTabs, OverviewTab, TechStackTab, WorkflowTab } from "@components/projects/project-detail-tabs";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { useCaseStudy } from "@hooks/use-case-study";
import { useProject } from "@hooks/use-projects";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { CASE_STUDY_SLUGS } from "../types/project";

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
        <div className="min-h-[300px]">
          <TabContent activeTab={activeTab} project={project} caseStudyData={caseStudyData ?? undefined} />
        </div>
      </div>
    </div>
  );
};

export const ProjectDetailPage: React.FC = () => {
  // Use route-specific hook for type-safe params
  const { slug } = useParams({ from: "/projects_/$slug" });
  const { data: project, isLoading, error } = useProject(slug);
  const { data: caseStudy } = useCaseStudy(slug);

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

  return <ProjectCaseStudyView project={project} caseStudy={caseStudy} />;
};

export default ProjectDetailPage;
export { ProjectDetailContent };
