export interface ProjectTechStackItem {
  category: string;
  tech: string;
  purpose: string;
}

export interface ProjectAdvancedFeature {
  title: string;
  description: string;
}

export interface ProjectWorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  prompt?: string;
  output?: string;
}

export interface ProjectLinks {
  demo?: string;
  github?: string;
  storybook?: string;
  npm?: string;
  docs?: string;
}

export interface ProjectGalleryItem {
  url: string;
  alt?: string;
  caption?: string;
  type?: "image" | "video";
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  useCase: string;
  image: string;
  accentColor: string;
  accentColorLight?: string;
  techStack: ProjectTechStackItem[] | string[];
  advancedFeatures: ProjectAdvancedFeature[] | string[];
  resumePitch: string;
  tags: string[];
  difficulty: string;
  timeEstimate: string;
  workflow: ProjectWorkflowStep[] | string;
  links?: ProjectLinks;
  gallery?: ProjectGalleryItem[] | string[];
  relatedProjects?: string[];
}

export interface ProjectCardData {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  image: string;
  accentColor: string;
  techStack: ProjectTechStackItem[] | string[];
  tags: string[];
  difficulty: string;
  timeEstimate: string;
}

export const PROJECT_CARD_FIELDS: (keyof ProjectCardData)[] = [
  "slug",
  "number",
  "name",
  "tagline",
  "image",
  "accentColor",
  "techStack",
  "tags",
  "difficulty",
  "timeEstimate",
];
