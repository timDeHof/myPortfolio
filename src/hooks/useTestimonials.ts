import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://portfolio-api.ttdehof.workers.dev/api";

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
  const url = `${API_BASE}/github/repos/timDeHof/portfolio-metadata/contents/testimonials.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch testimonials: ${response.status}`);
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

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 5,
  });
}
