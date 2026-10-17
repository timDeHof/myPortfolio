// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import { queryClient } from "../../src/lib/query-client";
import { renderPage } from "../../src/prerender";

// Data the prerender build would fetch from timDeHof/portfolio-metadata
const fixtures: Record<string, unknown> = {
  "portfolio.json": {
    services: [{ id: 1, title: "Frontend builds", paragraphs: ["React and TypeScript applications."] }],
    certifications: [],
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
});
