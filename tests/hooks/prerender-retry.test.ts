// @vitest-environment node
import { describe, expect, it } from "vitest";

import { portfolioDataQuery } from "../../src/hooks/use-portfolio-data";
import { testimonialsQuery } from "../../src/hooks/use-testimonials";
import { GitHubAPIError } from "../../src/types/github";

// The prerender runs without a window. These queries make one attempt in the
// browser (see e2e/about-navigation.spec.ts) and retry here, where a failure
// fails the build or publishes a page without its data.
type Retry = boolean | number | ((failureCount: number, error: Error) => boolean) | undefined;

function retries(retry: Retry, error: Error, failureCount = 0): boolean {
  if (typeof retry === "function") {
    return retry(failureCount, error);
  }
  if (typeof retry === "number") {
    return failureCount < retry;
  }
  return retry === true;
}

const serverError = new GitHubAPIError(500, "Internal Server Error", "https://example.test", "upstream failed");
const missing = new GitHubAPIError(404, "Not Found", "https://example.test", "Not Found");

describe("prerender retries", () => {
  it("retries portfolio data after a server error, but not after a 404", () => {
    const retry = portfolioDataQuery.retry as Retry;

    expect(retries(retry, serverError)).toBe(true);
    expect(retries(retry, missing)).toBe(false);
  });

  // Testimonials are optional, so a failed fetch publishes /about without them
  it("retries testimonials after a server error", () => {
    expect(retries(testimonialsQuery.retry as Retry, serverError)).toBe(true);
  });
});
