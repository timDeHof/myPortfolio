export type Project = {
  id: number;
  title: string;
  description: string[];
  collaborators?: Collaborator[];
  liveUrl: string;
  sourceUrl: string;
  imageUrl: string;
  technologies?: string[];
  featured?: boolean;
};

export type Collaborator = {
  name: string;
  url: string;
};

export type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

export type ServiceCard = {
  id: number;
  title: string;
  paragraphs: string[];
  icon?: string;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export type AppState = {
  isLoading: boolean;
  error: string | null;
  theme: "light" | "dark";
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: "light" | "dark") => void;
};

export type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  languages_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  topics: string[];
  visibility: string;
  private: boolean;
};
