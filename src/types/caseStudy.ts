export interface CaseStudyData {
  hero: {
    impactStatement: string;
    tagline: string;
  };
  stats: {
    stars: number;
    forks: number;
    contributors: number;
    featuredOnShadcn: boolean;
    license: string;
  };
  problem: {
    title: string;
    content: string;
  };
  technicalApproach: {
    title: string;
    decisions: {
      title: string;
      description: string;
    }[];
  };
  challenges: {
    title: string;
    items: {
      challenge: string;
      solution: string;
    }[];
  };
  impact: {
    title: string;
    metrics: { value: string; label: string }[];
    achievements: string[];
  };
  learnings: {
    title: string;
    items: string[];
  };
  links: {
    github: string;
    demo: string;
    storybook: string;
    npm?: string;
  };
}

export interface GitHubContentResponse {
  content?: string;
  encoding?: string;
}
