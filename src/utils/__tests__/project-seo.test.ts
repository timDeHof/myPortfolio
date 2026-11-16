import { describe, expect, it } from "vitest";

import type { Project } from "../../types/project";

import { projectStack } from "../project-summary";
import { projectSEO } from "../seo";

const project: Project = {
  slug: "fixture",
  number: "01",
  name: "Fixture",
  tagline: "Fixture tagline.",
  description: "",
  useCase: "",
  image: "",
  accentColor: "#3568e8",
  // Padding around the names, as hand-edited project JSON can have
  techStack: [
    { category: "Frontend", tech: " React 18 · TypeScript ", purpose: "" },
    { category: "Styling", tech: "Tailwind CSS", purpose: "" },
    { category: "Build", tech: "Vite", purpose: "" },
  ],
  advancedFeatures: [],
  resumePitch: "",
  tags: [],
  difficulty: "",
  timeEstimate: "",
  workflow: "",
};

describe("projectSEO", () => {
  // The meta description and the page's Material line must name the same stack
  it("names the same first three technologies as projectStack", () => {
    const stack = projectStack(project, 3);

    expect(stack).toEqual(["React 18", "TypeScript", "Tailwind CSS"]);
    expect(projectSEO(project).description).toBe(`Fixture tagline. Built with ${stack[0]}, ${stack[1]}, and ${stack[2]}.`);
  });
});
