export interface Project {
  id: number;
  title: string;
  description: string[];
  collaborators?: Collaborator[];
  liveUrl: string;
  sourceUrl: string;
  imageUrl: string;
  technologies?: string[];
  featured?: boolean;
}

export interface Collaborator {
  name: string;
  url: string;
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface ServiceCard {
  id: number;
  title: string;
  paragraphs: string[];
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}