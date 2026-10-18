import { queryOptions, useQuery } from "@tanstack/react-query";

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

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: fetchTestimonials,
  staleTime: 1000 * 60 * 5,
  // The section hides itself when this fails, so a failed fetch must not fail the prerender
  meta: { optional: true },
});

export function useTestimonials() {
  return useQuery(testimonialsQuery);
}
