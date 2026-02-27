import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://portfolio-api.ttdehof.workers.dev/api";

export interface ServiceCard {
  id: number;
  title: string;
  paragraphs: string[];
  icon?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  badgeUrl?: string;
  description?: string;
  skills?: string[];
}

export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  social: SocialLink[];
}

export interface Navigation {
  navItems: NavItem[];
  footerLinks: FooterLinks;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  author: string;
  email: string;
  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };
  images: {
    ogImage: string;
    favicon: string;
    appleTouchIcon: string;
  };
  business: {
    name: string;
    jobTitle: string;
    location: string;
    skills: string[];
  };
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
}

export interface PortfolioData {
  services: ServiceCard[];
  certifications: Certification[];
  navigation: Navigation;
  seo: SEOConfig;
}

interface GitHubContentResponse {
  content?: string;
  encoding?: string;
}

async function fetchPortfolioData(): Promise<PortfolioData> {
  const url = `${API_BASE}/github/repos/timDeHof/portfolio-metadata/contents/portfolio.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.status}`);
  }

  const data: GitHubContentResponse = await response.json();

  if (data.content) {
    const decoded = new TextDecoder().decode(
      Uint8Array.from(atob(data.content.replace(/\n/g, "")), c => c.charCodeAt(0))
    );
    return JSON.parse(decoded);
  }

  throw new Error("No content in response");
}

export function usePortfolioData() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5,
  });
}
