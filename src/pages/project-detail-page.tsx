import { ProjectCaseStudyView } from "@components/projects/project-case-study-view";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { useCaseStudy } from "@hooks/use-case-study";
import { useProject } from "@hooks/use-projects";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
