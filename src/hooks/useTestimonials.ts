import { useQuery } from "@tanstack/react-query";

import { fetchGitHubJson, type GitHubContentResponse } from "@/lib/github-api";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  linkedinUrl?: string;
  quote: string;
  date: string;
}

interface GitHubContentResponse {
  content?: string;
  encoding?: string;
}

async function fetchTestimonials(): Promise<Testimonial[]> {
  const result = await fetchGitHubJson<Testimonial[]>("timDeHof", "portfolio-metadata", "testimonials.json");
  if (!result) {
    throw new Error("No testimonials found");
  }
  return result;
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 5,
  });
}
