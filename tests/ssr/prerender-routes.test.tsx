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
  "teamforward.json": {
    number: "03",
    name: "TeamForward",
    tagline: "Event-planning and networking platform",
    description: "TeamForward description",
    useCase: "Attendees find events, RSVP, and connect with other attendees.",
    image: "",
    accentColor: "#0f766e",
    techStack: [{ category: "Frontend", tech: "React · TypeScript", purpose: "UI" }],
    advancedFeatures: [],
    resumePitch: "Frontend Engineer at TeamForward since 2024.",
    tags: [],
    difficulty: "Advanced",
    timeEstimate: "Ongoing",
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
    fetchRepository: vi.fn(async (_owner: string, repo: string) => {
      if (repo !== "shadcn-timeline") {
        throw new Error(`404: ${repo}`);
      }
      return { name: repo, stargazers_count: 297 };
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

  it.each([
    [
      "/",
      "Tim DeHof — Full-Stack Engineer, formerly Mechanical Engineer",
      "Full-stack engineer in Jacksonville, FL. Seven years in manufacturing engineering, now building React, TypeScript, and AWS applications. Author of shadcn-timeline.",
    ],
    [
      "/about",
      "About — Tim DeHof",
      "Mechanical engineer from 2015 to 2022, full-stack engineer since. Frontend Engineer at TeamForward and AWS Cloud Institute graduate.",
    ],
    [
      "/projects",
      "Projects — Tim DeHof",
      "Selected projects by Tim DeHof, with the problem, his role, the stack, and what he would change. Includes shadcn-timeline, an accessible timeline component for shadcn/ui.",
    ],
    [
      "/blog",
      "Blog — Tim DeHof",
      "Write-ups on AWS and frontend engineering by Tim DeHof: what was built, what broke, and what it cost.",
    ],
    [
      "/contact",
      "Contact — Tim DeHof",
      "Contact Tim DeHof about frontend and full-stack roles. Remote, based in Jacksonville, FL.",
    ],
  ])("gives %s the v2 title and description", async (url, title, description) => {
    const { head } = await renderPage(url);
    const meta = metaProps(head);
    const content = (key: string) => meta.find(props => props.property === key || props.name === key)?.content;

    expect(head.title).toBe(title);
    expect(content("og:title")).toBe(title);
    expect(content("description")).toBe(description);
    expect(content("og:description")).toBe(description);
  });

  it("keeps Helmet's data-rh marker so the client replaces the static tags", async () => {
    const { head } = await renderPage("/projects/shadcn-timeline");
    const meta = metaProps(head);

    expect(meta.length).toBeGreaterThan(0);
    expect(meta.every(props => props["data-rh"] === "true")).toBe(true);
  });

  it("renders the v2 hero on the home page", async () => {
    const { html } = await renderPage("/");
    const h1s = html.match(/<h1[\s>]/g) ?? [];

    expect(h1s).toHaveLength(1);
    expect(html).toMatch(/<section aria-labelledby="hero-heading" class="[^"]*\bhero-grid\b[^"]*">/);
    expect(html).toContain("I spent seven years engineering physical products.");
    expect(html).toContain("aria-label=\"Engineering drawing title block\"");
    // 11px, not the prototype's 10px, which read too small next to the 12.5px values
    const titleBlock = html.match(/<dl aria-label="Engineering drawing title block"[\s\S]*?<\/dl>/)?.[0] ?? "";
    const labels = titleBlock.match(/<dt class="[^"]*">/g) ?? [];
    expect(labels).toHaveLength(8);
    for (const label of labels) {
      expect(label).toMatch(/\btext-\[11px\]/);
    }
    expect(html).toMatch(/<a[^>]*href="\/projects"[^>]*>See my work<\/a>/);
    expect(html).not.toContain("Loading Hero Section");
  });

  it("renders the How I work section under the hero", async () => {
    const { html } = await renderPage("/");
    const section = html.match(/<section aria-labelledby="how-i-work-heading"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(section).toMatch(/<h2 id="how-i-work-heading"[^>]*>What manufacturing taught me about software<\/h2>/);
    expect(section.match(/<h3[\s>]/g)).toHaveLength(3);
    expect(section).toContain("Root cause first.");
    expect(section).toContain("Design for the constraint.");
    expect(section).toContain("Built to be handed off.");
    // 13px, not the prototype's 11.5px, which read smaller than the eyebrow (D23)
    const shopFloorLines = section.match(/<p class="[^"]*"><b[^>]*>Shop floor:<\/b>/g) ?? [];
    expect(shopFloorLines).toHaveLength(3);
    for (const line of shopFloorLines) {
      expect(line).toMatch(/class="[^"]*\btext-\[13px\][^"]*"/);
    }
    // At 13px the longest line wraps in a 272px column at 1024px, so three
    // columns wait for xl
    expect(section).toMatch(/<div class="grid gap-5 xl:grid-cols-3">/);
    expect(section).not.toContain("md:grid-cols-3");
    // Single column runs up to 1279px. 52ch keeps lines under 80 characters there
    const bodies = section.match(/<\/h3><p class="[^"]*">/g) ?? [];
    expect(bodies).toHaveLength(3);
    for (const body of bodies) {
      expect(body).toMatch(/\bmax-w-\[52ch\]/);
    }
    // Prototype class names have no styles in the app
    expect(section).not.toMatch(/class="(eyebrow|section-head|principles|principle)"/);
  });

  it("renders Selected work with two project cards and their links", async () => {
    const { html } = await renderPage("/");
    const section = html.match(/<section[^>]*aria-labelledby="selected-work-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const cards = section.match(/<article[\s\S]*?<\/article>/g) ?? [];

    expect(section).toMatch(/<section id="work"/);
    expect(section).toMatch(/<h2 id="selected-work-heading"[^>]*>Two projects, in depth<\/h2>/);
    expect(cards).toHaveLength(2);
    expect(cards[0]).toMatch(/<h3[^>]*>shadcn-timeline<\/h3>/);
    expect(cards[0]).toContain("href=\"https://timdehof.github.io/shadcn-timeline/\"");
    expect(cards[0]).toContain("href=\"https://github.com/timDeHof/shadcn-timeline\"");
    expect(cards[0]).toContain("href=\"/projects/shadcn-timeline\"");
    expect(cards[1]).toMatch(/<h3[^>]*>TeamForward<\/h3>/);
    expect(cards[1]).toContain("web-push-neo");
    expect(cards[1]).toContain("href=\"/projects/teamforward\"");
    // 55ch with text-pretty: the longest line is 79 characters at 1440px and wider
    for (const card of cards) {
      expect(card).toMatch(/<\/h3><p class="[^"]*\bmax-w-\[55ch\][^"]*">/);
    }
    expect(section).toMatch(/<a[^>]*href="\/projects"[^>]*>All projects/);
  });

  it("renders Background with a 4-row timeline and an About link", async () => {
    const { html } = await renderPage("/");
    const section = html.match(/<section[^>]*aria-labelledby="background-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const rows = section.match(/<ol[^>]*aria-label="Short timeline"[\s\S]*?<\/ol>/)?.[0].match(/<li[\s>]/g) ?? [];

    expect(section).toMatch(/<h2 id="background-heading"[^>]*>From the shop floor to the stack<\/h2>/);
    expect(section).toContain("From 2015 to 2022 I worked as a mechanical engineer");
    expect(section).toContain("in June 2026 I graduated from the AWS Cloud Institute");
    expect(rows).toHaveLength(4);
    expect(section).toMatch(/<a[^>]*href="\/about"[^>]*>More about me/);
  });

  it("renders the Contact section with email and profiles", async () => {
    const { html } = await renderPage("/");
    const section = html.match(/<section[^>]*aria-labelledby="contact-heading"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(section).toMatch(/<section id="contact"/);
    expect(section).toMatch(/<h2 id="contact-heading"[^>]*>Hiring a frontend or full-stack engineer\?<\/h2>/);
    expect(section).toMatch(/<a[^>]*href="mailto:tim@timdehof.dev"[^>]*>Email me<\/a>/);
    expect(section).toContain("href=\"https://www.linkedin.com/in/tim-dehof/\"");
    expect(section).toContain("href=\"https://github.com/timDeHof\"");
    // The Jokma referral line is commented out for now
    expect(section).not.toContain("jokma.com");
  });

  it("prints shadcn-timeline's star count in the hero and its Selected work card", async () => {
    const { html } = await renderPage("/");
    const card = html.match(/<article[\s\S]*?<\/article>/)?.[0] ?? "";

    expect(html).toMatch(/Author of shadcn-timeline(<!-- -->)? · <strong[^>]*>297(<!-- -->)?★<\/strong>/);
    expect(card).toMatch(/>297(<!-- -->)?★</);
    expect(card).toContain("GitHub stars");
  });

  it("falls back to \"Open source\" when the star count can't be fetched", async () => {
    const fetchRepository = vi.mocked(githubAPI.fetchRepository);
    const fixtureFetch = fetchRepository.getMockImplementation()!;
    // "404" skips the query client's retries, so the test stays fast
    fetchRepository.mockRejectedValue(new Error("404: rate limited"));

    try {
      const { html } = await renderPage("/");
      const card = html.match(/<article[\s\S]*?<\/article>/)?.[0] ?? "";

      expect(html).not.toContain("★");
      expect(card).toContain(">Open source<");
      expect(card).not.toContain("GitHub stars");
    }
    finally {
      fetchRepository.mockImplementation(fixtureFetch);
    }
  });

  it("has no Services section or /services link on the home page", async () => {
    const { html } = await renderPage("/");

    expect(html).not.toContain("href=\"/services\"");
    expect(html).not.toContain("services-section");
  });

  it("uses the v2 accent and line buttons in the hero, Contact and footer", async () => {
    const { html } = await renderPage("/");
    const contact = html.match(/<section[^>]*aria-labelledby="contact-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? "";

    expect(html).toMatch(/<a href="\/projects" class="[^"]*btn--accent[^"]*">See my work<\/a>/);
    expect(html).toMatch(/<a[^>]*href="[^"]*resume[^"]*"[^>]*class="[^"]*btn--line[^"]*">Résumé \(PDF\)<\/a>/);
    expect(contact).toMatch(/<a href="mailto:tim@timdehof.dev" class="[^"]*btn--accent[^"]*">/);
    expect(contact).toMatch(/<a href="https:\/\/www.linkedin.com\/in\/tim-dehof\/"[^>]*class="[^"]*btn--line[^"]*">/);
    expect(contact).toMatch(/<a href="https:\/\/github.com\/timDeHof"[^>]*class="[^"]*btn--line[^"]*">/);
    expect(footer).toMatch(/<a href="\/contact" class="[^"]*btn--accent[^"]*">/);
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

  it("renders /projects as a lead project with a title block, then an index", async () => {
    const { html } = await renderPage("/projects");
    const titleBlock = html.match(/<dl aria-label="shadcn-timeline title block"[\s\S]*?<\/dl>/)?.[0] ?? "";
    const index = html.match(/<ol aria-label="More projects"[\s\S]*?<\/ol>/)?.[0] ?? "";

    expect(html).toMatch(/<h1[^>]*>Projects<\/h1>/);
    expect(html).toContain("The first three are the ones I&#x27;d walk through in an interview.");
    expect(html).toContain(">2 projects<");
    // The lead project's title block uses the hero's drawing labels
    expect([...titleBlock.matchAll(/<dt[^>]*>([^<]+)<\/dt>/g)].map(match => match[1])).toEqual(["Part", "Function", "What I built", "Material"]);
    expect(titleBlock).toContain("Built and open-sourced the component.");
    expect(titleBlock).toContain("React 18 · TypeScript · Tailwind CSS · CSS Variables");
    expect(html).toMatch(/<a[^>]*href="\/projects\/shadcn-timeline"[^>]*>Read more/);
    // The rest are rows, not cards, and carry no project numbers
    expect(index.match(/<li[\s>]/g)).toHaveLength(1);
    expect(index).toMatch(/<h2[^>]*>TeamForward<\/h2>/);
    expect(index).toContain("Frontend Engineer at TeamForward since 2024.");
    expect(index).toMatch(/<a[^>]*href="\/projects\/teamforward"[^>]*>Read more/);
    expect(index).not.toContain(">03<");
    // The old card grid is gone
    expect(html).not.toContain("View Details");
    expect(html).not.toContain("projects featured");
  });

  it("renders the certifications on /about instead of the spinner", async () => {
    const { html } = await renderPage("/about");

    expect(html).toContain("Fixture Cloud Certificate");
  });

  // Each cap was measured at 1920px to keep the longest line at 79 characters or under
  it("caps the hero intro at 51ch", async () => {
    const { html } = await renderPage("/");

    expect(html).toMatch(/<p class="[^"]*\bmax-w-\[51ch\][^"]*\btext-lg\b[^"]*">\s*Full-stack engineer/);
  });

  it("caps both Background paragraphs at 57ch", async () => {
    const { html } = await renderPage("/");
    const section = html.match(/<section[^>]*aria-labelledby="background-heading"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(section).toMatch(/<p class="[^"]*\bmax-w-\[57ch\][^"]*">\s*From 2015 to 2022/);
    expect(section).toMatch(/<p class="[^"]*\bmax-w-\[57ch\][^"]*">\s*Since 2024/);
  });

  it("caps the home Contact paragraph at 55ch", async () => {
    const { html } = await renderPage("/");
    const section = html.match(/<section[^>]*aria-labelledby="contact-heading"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(section).toMatch(/<p class="[^"]*\bmax-w-\[55ch\][^"]*">\s*I(?:'|&#x27;)m looking for a team/);
  });

  it("caps case study paragraphs and lists at 52ch", async () => {
    const { html } = await renderPage("/projects/shadcn-timeline");
    const article = html.match(/<article[\s\S]*?<\/article>/)?.[0] ?? "";
    const blocks = article.match(/<(?:p|ul)\b[^>]*>/g) ?? [];

    expect(blocks.length).toBeGreaterThan(0);
    for (const block of blocks) {
      expect(block).toMatch(/\bmax-w-\[52ch\]/);
    }
  });

  it("caps the /about story at 51ch", async () => {
    const { html } = await renderPage("/about");

    expect(html).toMatch(/<div class="[^"]*\bmax-w-\[51ch\][^"]*">\s*<p[^>]*>\s*With a background in mechanical engineering/);
  });

  it("caps the /contact panel paragraphs at 55ch", async () => {
    const { html } = await renderPage("/contact");

    expect(html).toMatch(/<p class="[^"]*\bmax-w-\[55ch\][^"]*">\s*I(?:'|&#x27;)m always excited/);
    expect(html).toMatch(/<p class="[^"]*\bmax-w-\[55ch\][^"]*">\s*You can also check out my/);
    expect(html).toMatch(/<p class="[^"]*\bmax-w-\[55ch\][^"]*">\s*I typically respond/);
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
