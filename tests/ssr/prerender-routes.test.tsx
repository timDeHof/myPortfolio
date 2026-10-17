// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import { queryClient } from "../../src/lib/query-client";
import { renderPage } from "../../src/prerender";
import { githubAPI } from "../../src/services/api/github";

// Data the prerender build would fetch from timDeHof/portfolio-metadata
const fixtures: Record<string, unknown> = {
  "portfolio.json": {
    certifications: [{ name: "Fixture Cloud Certificate", issuer: "Fixture Issuer", date: "2024-01-01" }],
  },
  "shadcn-timeline.json": {
    number: "01",
    name: "shadcn-timeline",
    tagline: "Accessible timeline component for shadcn/ui",
    description: "Description text",
    useCase: "Developers need a timeline that fits shadcn/ui.",
    image: "",
    accentColor: "#3568e8",
    techStack: [
      { category: "Frontend", tech: "React 18 · TypeScript", purpose: "Component built with forwardRef" },
      { category: "Styling", tech: "Tailwind CSS · CSS Variables", purpose: "Theming" },
    ],
    advancedFeatures: [{ title: "Multi-state items", description: "Completed, in-progress, and pending states" }],
    resumePitch: "Built and open-sourced the component.",
    tags: [],
    difficulty: "Intermediate",
    timeEstimate: "2-4 weeks",
  },
  "shadcn-timeline-case-study.json": {
    challenges: { title: "Challenges Solved", items: [{ challenge: "SSR Compatibility", solution: "Works with Next.js SSR" }] },
    impact: { title: "Results & Impact", metrics: [{ value: "297", label: "GitHub Stars" }], achievements: ["Listed in awesome-shadcn-ui"] },
    learnings: { title: "What I Learned", items: ["Accessibility from the start beats retrofitting"] },
  },
};

vi.mock("../../src/services/api/github", () => ({
  githubAPI: {
    fetchContents: vi.fn(async (_owner: string, _repo: string, path: string) => {
      const file = path.split("/").pop() ?? path;
      if (!(file in fixtures)) {
        throw new Error(`404: ${path}`);
      }
      return fixtures[file];
    }),
  },
}));

afterEach(() => {
  queryClient.clear();
});

function metaProps(head: Awaited<ReturnType<typeof renderPage>>["head"]) {
  return [...("elements" in head ? head.elements : [])].filter(element => element.type === "meta").map(element => element.props);
}

describe("prerendered routes contain their content, not the loading state", () => {
  it("renders the project case study on /projects/$slug", async () => {
    const { html } = await renderPage("/projects/shadcn-timeline");

    expect(html).toContain("Built and open-sourced the component.");
    expect(html).toContain("Bill of materials");
    expect(html).toContain("Accessibility from the start beats retrofitting");
    expect(html).not.toContain("animate-pulse");
  });

  it("gives each project page its own title and og tags", async () => {
    const { head } = await renderPage("/projects/shadcn-timeline");
    const meta = [...("elements" in head ? head.elements : [])]
      .filter(element => element.type === "meta")
      .map(element => element.props);
    const content = (key: string) => meta.find(props => props.property === key || props.name === key)?.content;

    expect(head.title).toBe("shadcn-timeline — Tim DeHof");
    expect(content("og:title")).toBe("shadcn-timeline — Tim DeHof");
    expect(content("description")).toBe("Accessible timeline component for shadcn/ui. Built with React 18, TypeScript, and Tailwind CSS.");
    expect(content("og:url")).toBe("https://timdehof.dev/projects/shadcn-timeline");
  });

  it("keeps Helmet's data-rh marker so the client replaces the static tags", async () => {
    const { head } = await renderPage("/projects/shadcn-timeline");
    const meta = metaProps(head);

    expect(meta.length).toBeGreaterThan(0);
    expect(meta.every(props => props["data-rh"] === "true")).toBe(true);
  });

  it("has no Services section or /services link on the home page", async () => {
    const { html } = await renderPage("/");

    expect(html).not.toContain("href=\"/services\"");
    expect(html).not.toContain("services-section");
  });

  it("links the footer to the real GitHub profile on pages that don't load portfolio data", async () => {
    const { html } = await renderPage("/contact");

    expect(html).not.toContain("href=\"https://github.com/tim-dehof\"");
    expect(html).toContain("href=\"https://github.com/timDeHof\"");
  });

  it("keeps the home page's JSON-LD script in the head", async () => {
    const { head } = await renderPage("/");
    const scripts = [...("elements" in head ? head.elements : [])].filter(element => element.type === "script");

    expect(scripts).toHaveLength(1);
    expect(scripts[0].props.type).toBe("application/ld+json");
    expect(String(scripts[0].props.children)).toContain("\"@type\":\"Person\"");
  });

  it("renders the certifications on /about instead of the spinner", async () => {
    const { html } = await renderPage("/about");

    expect(html).toContain("Fixture Cloud Certificate");
  });

  // About 7s: the project fetch rethrows without "404", so the query client
  // retries it 3 times with backoff before the query errors
  it("fails the build when a page's data download fails", { timeout: 30000 }, async () => {
    const fetchContents = vi.mocked(githubAPI.fetchContents);
    const fixtureFetch = fetchContents.getMockImplementation()!;
    fetchContents.mockImplementation(async (owner, repo, path) => {
      if (path.endsWith("shadcn-timeline.json")) {
        throw new Error("404: rate limited");
      }
      return fixtureFetch(owner, repo, path);
    });

    try {
      await expect(renderPage("/projects/shadcn-timeline")).rejects.toThrow(/project/);
    }
    finally {
      fetchContents.mockImplementation(fixtureFetch);
    }
  });
});
