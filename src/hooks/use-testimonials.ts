import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "@/services/api/github";

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

async function fetchTestimonials(): Promise<Testimonial[]> {
  return githubAPI.fetchContents<Testimonial[]>("timDeHof", "portfolio-metadata", "testimonials.json");
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 5,
  });
}
