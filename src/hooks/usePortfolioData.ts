import { useQuery } from "@tanstack/react-query";

import { API_BASE, fetchGitHubJson, type GitHubContentResponse } from "@/lib/github-api";

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
  const result = await fetchGitHubJson<PortfolioData>("timDeHof", "portfolio-metadata", "portfolio.json");
  if (!result) {
    throw new Error("No portfolio data found");
  }
  return result;
}

export function usePortfolioData() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5,
  });
}
