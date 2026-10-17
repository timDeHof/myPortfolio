import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import type { CaseStudyData } from "../../../src/types/case-study";
import type { Project } from "../../../src/types/project";

import { ProjectCaseStudyView } from "../../../src/components/projects/project-case-study-view";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => <a href={to} {...props}>{children}</a>,
}));

const project: Project = {
  slug: "shadcn-timeline",
  number: "01",
  name: "shadcn-timeline",
  tagline: "Accessible timeline component for shadcn/ui",
  description: "Description text",
  useCase: "Developers need a timeline that fits shadcn/ui.",
  image: "/timeline.png",
  accentColor: "#3568e8",
  techStack: [{ category: "Frontend", tech: "React 18", purpose: "Component built with forwardRef" }],
  advancedFeatures: [{ title: "Multi-state items", description: "Completed, in-progress, and pending states" }],
  resumePitch: "Built and open-sourced the component.",
  tags: [],
  difficulty: "Intermediate",
  timeEstimate: "2-4 weeks",
  workflow: "Design → Build → Ship",
  links: { demo: "https://demo.example", github: "https://github.com/example/repo" },
};

const caseStudy = {
  challenges: { title: "Challenges Solved", items: [{ challenge: "SSR Compatibility", solution: "Works with Next.js SSR" }] },
  impact: { title: "Results & Impact", metrics: [{ value: "297", label: "GitHub Stars" }], achievements: ["Listed in awesome-shadcn-ui"] },
  learnings: { title: "What I Learned", items: ["Accessibility from the start beats retrofitting"] },
} as CaseStudyData;

describe("project case study view", () => {
  it("puts the name, role, effort, and links in the title block", () => {
    render(<ProjectCaseStudyView project={project} />);

    expect(screen.getByRole("heading", { level: 1, name: "shadcn-timeline" })).toBeInTheDocument();
    expect(screen.getByText("Built and open-sourced the component.")).toBeInTheDocument();
    expect(screen.getByText("2-4 weeks")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Live demo" })).toHaveAttribute("href", "https://demo.example");
    expect(screen.getByRole("link", { name: "Source" })).toHaveAttribute("href", "https://github.com/example/repo");
    expect(screen.getByRole("link", { name: "All projects" })).toHaveAttribute("href", "/projects");
  });

  it("renders the story sections and the bill of materials", () => {
    render(<ProjectCaseStudyView project={project} caseStudy={caseStudy} />);

    const headings = screen.getAllByRole("heading", { level: 2 }).map(h => h.textContent);
    expect(headings).toEqual(["Problem", "Decisions", "Challenges", "How it was built", "Result", "What I learned", "Bill of materials"]);
    expect(screen.getByText("297")).toBeInTheDocument();
    expect(screen.getByText("Accessibility from the start beats retrofitting")).toBeInTheDocument();

    const table = screen.getByRole("table");
    expect(within(table).getByText("Component built with forwardRef")).toBeInTheDocument();
  });

  it("leaves out case-study sections when there is no case study", () => {
    render(<ProjectCaseStudyView project={{ ...project, workflow: "" }} caseStudy={null} />);

    const headings = screen.getAllByRole("heading", { level: 2 }).map(h => h.textContent);
    expect(headings).toEqual(["Problem", "Decisions", "Bill of materials"]);
  });
});
