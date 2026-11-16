import { queryOptions, useQuery } from "@tanstack/react-query";

import { retryDuringPrerender } from "@/lib/query-client";
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

/** How long the prerender waits for testimonials before building /about without them */
export const TESTIMONIALS_PRERENDER_TIMEOUT_MS = 5000;

async function fetchTestimonials(): Promise<Testimonial[]> {
  // The /about loader waits for this during the prerender, so a stalled request
  // would hold the build. In the browser the loader stops waiting after 1s instead.
  if (typeof window !== "undefined") {
    return githubAPI.fetchContents<Testimonial[]>("timDeHof", "portfolio-metadata", "testimonials.json");
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(`Testimonials timed out after ${TESTIMONIALS_PRERENDER_TIMEOUT_MS}ms`)), TESTIMONIALS_PRERENDER_TIMEOUT_MS);
  try {
    return await githubAPI.fetchContents<Testimonial[]>("timDeHof", "portfolio-metadata", "testimonials.json", controller.signal);
  }
  finally {
    clearTimeout(timer);
  }
}

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: fetchTestimonials,
  staleTime: 1000 * 60 * 5,
  retry: retryDuringPrerender,
  // The section hides itself when this fails, so a failed fetch must not fail the prerender
  meta: { optional: true },
});

export function useTestimonials() {
  return useQuery(testimonialsQuery);
}
