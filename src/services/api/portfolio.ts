import { env } from "../../lib/env";

export type Skill = {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon_key: string | null;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  icon_key: string | null;
};

export type Certification = {
  id: number;
  title: string;
  issuer: string;
  issue_date: string | null;
  url: string | null;
  icon_key: string | null;
};

const API_BASE = `${env.VITE_API_BASE_URL}/portfolio`;

async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return (data as any).results;
}

export const portfolioAPI = {
  fetchTechStack: () => apiFetch<Skill[]>('/techstack'),
  fetchServices: () => apiFetch<Service[]>('/services'),
  fetchCertifications: () => apiFetch<Certification[]>('/certifications'),
  getAssetUrl: (key: string) => `${env.VITE_API_BASE_URL}/assets/${key}`,
};
