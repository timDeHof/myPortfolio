// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import { queryClient } from "../../src/lib/query-client";
import { renderPage } from "../../src/prerender";
import { githubAPI } from "../../src/services/api/github";

// Data the prerender build would fetch from timDeHof/portfolio-metadata
const fixtures: Record<string, unknown> = {
  "portfolio.json": {
    certifications: [
      { name: "Fixture Cloud Certificate", issuer: "Fixture Issuer", date: "2024-01-01" },
      { name: "AWS Certified Fixture Practitioner", issuer: "Amazon Web Services", date: "September 2025", verificationUrl: "https://www.credly.com/badges/fixture-practitioner" },
      { name: "AWS Certified Fixture Specialist", issuer: "Amazon Web Services", date: "September 2026", verificationUrl: "https://www.credly.com/badges/fixture-specialist" },
    ],
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
  "testimonials.json": [
    { id: "fixture-1", name: "Fixture Colleague", role: "Engineering Manager", company: "Fixture Co", quote: "Fixture testimonial quote.", date: "2026-01-01" },
  ],
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
    expect(section).toMatch(/<p class="[^"]*\buppercase\b[^"]*">Contact<\/p>/);
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

    const jsonLd = scripts.filter(script => script.props.type === "application/ld+json");

    expect(jsonLd).toHaveLength(1);
    expect(String(jsonLd[0].props.children)).toContain("\"@type\":\"Person\"");
  });

  it("renders /projects as a lead project with a title block, then an index", async () => {
    const { html } = await renderPage("/projects");
    const titleBlock = html.match(/<dl aria-label="shadcn-timeline title block"[\s\S]*?<\/dl>/)?.[0] ?? "";
    const index = html.match(/<ol aria-label="More projects"[\s\S]*?<\/ol>/)?.[0] ?? "";

    expect(html).toMatch(/<h1[^>]*>Projects<\/h1>/);
    // Only the lead project is featured, so the lead names one project, not three
    expect(html).toContain("The first is the one I&#x27;d walk through in an interview.");
    expect(html).not.toContain("The first three");
    // Only shadcn-timeline has a case study, so the lead doesn't promise "what I'd do differently"
    expect(html).toContain("Each project lists the problem, my role, and the stack.");
    expect(html).not.toContain("do differently");
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

  it("gives the lead project an h2 and project links names that say which project they open", async () => {
    const lead = fixtures["shadcn-timeline.json"] as Record<string, unknown>;
    lead.links = { demo: "https://timeline.example.com", github: "https://github.com/timDeHof/shadcn-timeline" };
    try {
      const { html } = await renderPage("/projects");
      const titleBlock = html.match(/<dl aria-label="shadcn-timeline title block"[\s\S]*?<\/dl>/)?.[0] ?? "";

      expect(titleBlock).toMatch(/<h2[^>]*>shadcn-timeline<\/h2>/);
      expect(html).toMatch(/<a[^>]*href="https:\/\/timeline\.example\.com"[^>]*aria-label="Live demo of shadcn-timeline"/);
      expect(html).toMatch(/<a[^>]*href="https:\/\/github\.com\/timDeHof\/shadcn-timeline"[^>]*aria-label="Source for shadcn-timeline"/);
    }
    finally {
      delete lead.links;
    }
  });

  it("shows the lead project's tagline once when it has no résumé pitch", async () => {
    const lead = fixtures["shadcn-timeline.json"] as Record<string, unknown>;
    const resumePitch = lead.resumePitch;
    delete lead.resumePitch;
    try {
      const { html } = await renderPage("/projects");
      const titleBlock = html.match(/<dl aria-label="shadcn-timeline title block"[\s\S]*?<\/dl>/)?.[0] ?? "";

      expect(titleBlock.split("Accessible timeline component for shadcn/ui")).toHaveLength(2);
      expect([...titleBlock.matchAll(/<dt[^>]*>([^<]+)<\/dt>/g)].map(match => match[1])).toEqual(["Part", "Function", "Material"]);
    }
    finally {
      lead.resumePitch = resumePitch;
    }
  });

  it("uses the v2 copy for the GitHub activity and closing sections on /projects", async () => {
    const { html } = await renderPage("/projects");

    expect(html).toMatch(/<h2[^>]*>GitHub activity<\/h2>/);
    expect(html).toContain("Pulled from the GitHub API: repositories, languages, and recent contributions.");
    expect(html).toMatch(/<h2[^>]*>More on GitHub<\/h2>/);
    expect(html).toContain("Smaller experiments and older bootcamp work are on my GitHub profile.");
    expect(html).toMatch(/<a href="https:\/\/github.com\/timDeHof"[^>]*>(?:<svg[\s\S]*?<\/svg>)?GitHub profile<\/a>/);
    expect(html).not.toContain("GitHub Analytics");
    expect(html).not.toContain("Want to see more?");
    expect(html).not.toContain("View GitHub Profile");
  });

  it("labels the GitHub activity section with its heading", async () => {
    const { html } = await renderPage("/projects");

    expect(html).toMatch(/<section[^>]*aria-labelledby="github-activity-heading"/);
    expect(html).toMatch(/<h2 id="github-activity-heading"[^>]*>GitHub activity<\/h2>/);
  });

  it("gives the More on GitHub button the footer Get In Touch button's accent colors", async () => {
    const { html } = await renderPage("/projects");
    const button = html.match(/<a href="https:\/\/github.com\/timDeHof"[^>]*>(?:<svg[\s\S]*?<\/svg>)?GitHub profile<\/a>/)?.[0] ?? "";

    expect(button).toMatch(/class="[^"]*\bbtn--accent\b[^"]*"/);
    expect(button).not.toMatch(/\bbg-secondary\b/);
  });

  describe("when some project downloads fail", () => {
    const failing = (files: string[]) => {
      const fetchContents = vi.mocked(githubAPI.fetchContents);
      const fixtureFetch = fetchContents.getMockImplementation()!;
      fetchContents.mockImplementation(async (owner, repo, path) => {
        if (files.some(file => path.endsWith(file))) {
          throw new Error(`404: ${path}`);
        }
        return fixtureFetch(owner, repo, path);
      });
      return () => fetchContents.mockImplementation(fixtureFetch);
    };

    it("counts one project in the singular", async () => {
      const restore = failing(["teamforward.json"]);
      try {
        const { html } = await renderPage("/projects");

        expect(html).not.toContain(">1 projects<");
        expect(html).toContain(">1 project<");
      }
      finally {
        restore();
      }
    });

    // The intro says the first is the one to walk through, so another project
    // must not take shadcn-timeline's place
    it("doesn't promote another project to the lead when the lead fails", async () => {
      const restore = failing(["shadcn-timeline.json"]);
      try {
        const { html } = await renderPage("/projects");
        const index = html.match(/<ol aria-label="More projects"[\s\S]*?<\/ol>/)?.[0] ?? "";

        expect(html).not.toContain("TeamForward title block");
        expect(index).toMatch(/<h2[^>]*>TeamForward<\/h2>/);
      }
      finally {
        restore();
      }
    });
  });

  it("says the projects didn't load, not that there are none, when every download fails", async () => {
    const fetchContents = vi.mocked(githubAPI.fetchContents);
    const fixtureFetch = fetchContents.getMockImplementation()!;
    fetchContents.mockImplementation(async (_owner, _repo, path) => {
      throw new Error(`404: ${path}`);
    });

    try {
      const { html } = await renderPage("/projects");

      expect(html).toContain("Projects didn&#x27;t load. They&#x27;re also on GitHub.");
      const button = html.match(/<a href="https:\/\/github.com\/timDeHof"[^>]*>(?:<svg[\s\S]*?<\/svg>)?GitHub profile<\/a>/)?.[0] ?? "";
      expect(button).not.toBe("");
      // Same accent colors as the More on GitHub and footer Get In Touch buttons
      expect(button).toMatch(/class="[^"]*\bbtn--accent\b[^"]*"/);
      expect(html).not.toContain("No projects found");
    }
    finally {
      fetchContents.mockImplementation(fixtureFetch);
    }
  });

  it("renders the /about intro with one h1 and the v2 lead", async () => {
    const { html } = await renderPage("/about");
    const h1s = html.match(/<h1[\s>]/g) ?? [];

    expect(h1s).toHaveLength(1);
    // The prototype's About label sits directly above the h1
    expect(html).toMatch(/<p class="[^"]*\buppercase\b[^"]*">About<\/p><h1 id="about-heading"[^>]*>Seven years in manufacturing. Now full-stack.<\/h1>/);
    expect(html).toContain("I&#x27;m a full-stack engineer in Jacksonville, FL. Before software, I spent seven years as a mechanical engineer in manufacturing and 3D printing.");
    // The v1 sections are gone
    expect(html).not.toContain("About Me");
    expect(html).not.toContain("unique perspective");
    expect(html).not.toContain("Core Values");
    expect(html).not.toContain("Skills &amp; Technologies");
    expect(html).not.toContain("Career Timeline");
  });

  it("renders How I got here with the story and a 6-row career timeline", async () => {
    const { html } = await renderPage("/about");
    const section = html.match(/<section aria-labelledby="story-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const timeline = section.match(/<ol aria-label="Career timeline"[\s\S]*?<\/ol>/)?.[0] ?? "";
    const years = [...timeline.matchAll(/<span class="[^"]*">([^<]+)<\/span><div><h3/g)].map(match => match[1]);

    expect(section).toMatch(/<p class="[^"]*\buppercase\b[^"]*">How I got here<\/p><h2 id="story-heading"[^>]*>The habits carried over<\/h2>/);
    expect(section).toContain("What pulled me toward software was the 3D-printing software itself.");
    expect(section).toContain("with a focus on accessible interfaces");
    // The prototype's last paragraph starts after the heading's words
    expect(section).toMatch(/<p>I still measure before I optimize/);
    expect(section).not.toContain("The habits carried over. I still measure");
    expect(years).toEqual(["2026 – present", "2024 – present", "2024 – 2026", "2023", "2022", "2015 – 2022"]);
    expect(timeline).toMatch(/<h3[^>]*>Contract developer, Jokma Web Solutions<\/h3><p[^>]*>Client web and mobile apps.<\/p>/);
    expect(timeline).toMatch(/<h3[^>]*>Mechanical engineer, Polyhistor International<\/h3>/);
    expect(timeline).toContain("Owned the engraving design for a line producing 250 parts a day.");
    // The sivs-platform line waits for Joe's OK (I8, P3)
    expect(html).not.toContain("sivs-platform");
  });

  it("renders the four How I work practices on /about", async () => {
    const { html } = await renderPage("/about");
    const section = html.match(/<section aria-labelledby="practices-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const titles = [...section.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map(match => match[1]);
    const bodies = section.match(/<\/h3><p class="[^"]*">/g) ?? [];

    expect(section).toMatch(/<p class="[^"]*\buppercase\b[^"]*">How I work<\/p><h2 id="practices-heading"[^>]*>Four practices<\/h2>/);
    expect(titles).toEqual([
      "Measure, then change.",
      "Understand existing code before touching it.",
      "Accessibility is part of done.",
      "Write for the handoff.",
    ]);
    expect(section).toContain("I took W3Cx WAI0.1x: Introduction to Web Accessibility.");
    expect(bodies).toHaveLength(4);
    for (const body of bodies) {
      expect(body).toMatch(/\bmax-w-\[52ch\]/);
    }
  });

  it("renders the testimonials on /about between How I work and AWS Cloud Institute", async () => {
    const { html } = await renderPage("/about");
    const practices = html.indexOf("id=\"practices-heading\"");
    const testimonials = html.indexOf(">What People Say<");
    const cloud = html.indexOf("id=\"cloud-heading\"");
    expect(testimonials).toBeGreaterThan(-1);
    expect(html).toContain("Fixture testimonial quote.");
    expect(practices).toBeLessThan(testimonials);
    expect(testimonials).toBeLessThan(cloud);
  });

  it("builds /about without the testimonials when testimonials.json can't be downloaded", async () => {
    const fetchContents = vi.mocked(githubAPI.fetchContents);
    const fixtureFetch = fetchContents.getMockImplementation()!;
    fetchContents.mockImplementation(async (owner, repo, path) => {
      if (path.endsWith("testimonials.json")) {
        throw new Error(`404: ${path}`);
      }
      return fixtureFetch(owner, repo, path);
    });

    try {
      const { html } = await renderPage("/about");

      // The section hides itself, and the rest of the page still renders
      expect(html).not.toContain("testimonials-heading");
      expect(html).toMatch(/<h2 id="cloud-heading"/);
    }
    finally {
      fetchContents.mockImplementation(fixtureFetch);
    }
  });

  it("styles the /about testimonials like the v2 sections", async () => {
    const { html } = await renderPage("/about");
    expect(html).toMatch(/<section[^>]*aria-labelledby="testimonials-heading"/);
    expect(html).toMatch(/<h2 id="testimonials-heading"[^>]*>What People Say<\/h2>/);
    const start = html.indexOf("aria-labelledby=\"testimonials-heading\"");
    const section = html.slice(start, html.indexOf("</section>", start));
    expect(section).toContain("Fixture testimonial quote.");
    expect(section).not.toMatch(/bg-muted|bg-card/);
  });

  it("renders the AWS Cloud Institute section with the AWS certs linked to Credly", async () => {
    const { html } = await renderPage("/about");
    const section = html.match(/<section aria-labelledby="cloud-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const certs = section.match(/<ul aria-label="Certifications"[\s\S]*?<\/ul>/)?.[0] ?? "";

    expect(section).toMatch(/<h2 id="cloud-heading"[^>]*>AWS Cloud Institute<\/h2>/);
    expect(section).toContain("In June 2026 I graduated from the AWS Cloud Institute&#x27;s Cloud Application Developer program, a nine-course curriculum covering Python");
    expect(section).toMatch(/<a[^>]*href="https:\/\/blog.timdehof.dev\/"[^>]*>blog<\/a>/);
    // Only the AWS certifications, each linked to its Credly verification
    expect(certs.match(/<li[\s>]/g)).toHaveLength(2);
    expect(certs).toMatch(/<a href="https:\/\/www.credly.com\/badges\/fixture-practitioner"[^>]*>AWS Certified Fixture Practitioner/);
    expect(certs).toMatch(/<a href="https:\/\/www.credly.com\/badges\/fixture-specialist"[^>]*>AWS Certified Fixture Specialist/);
    expect(certs).toContain("Earned September 2025");
    expect(certs).toContain("Earned September 2026");
    expect(html).not.toContain("Fixture Cloud Certificate");
    expect(html).not.toContain("animate-spin");
  });

  it("renders the Tools in three proficiency groups", async () => {
    const { html } = await renderPage("/about");
    const section = html.match(/<section aria-labelledby="tools-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const groups = [...section.matchAll(/<h3[^>]*>([^<]+)<\/h3><ul[^>]*>([\s\S]*?)<\/ul>/g)].map(match => [
      match[1],
      [...match[2].matchAll(/<li[^>]*>([^<]+)<\/li>/g)].map(item => item[1]),
    ]);

    expect(section).toMatch(/<p class="[^"]*\buppercase\b[^"]*">Tools<\/p><h2 id="tools-heading"[^>]*>Grouped by how well I know them<\/h2>/);
    expect(groups).toEqual([
      ["Use daily", ["React", "TypeScript", "Tailwind CSS", "Postgres", "Docker", "Git"]],
      ["Have shipped with", ["Next.js", "Node.js", "Express", "REST APIs", "Vercel", "Figma", "Framer Motion"]],
      ["Cloud (AWS Cloud Institute)", ["AWS (Lambda, DynamoDB, S3, CloudFront, CloudFormation, SAM)", "Python"]],
    ]);
  });

  it("closes /about with the Contact block and a Résumé button", async () => {
    const { html } = await renderPage("/about");
    const section = html.match(/<section[^>]*aria-labelledby="contact-heading"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(section).toMatch(/<h2 id="contact-heading"[^>]*>Hiring a frontend or full-stack engineer\?<\/h2>/);
    // impeccable flags the "Contact" kicker. Home keeps it, About hides it
    expect(section).not.toContain(">Contact</p>");
    expect(section).toMatch(/<p class="[^"]*\bmax-w-\[55ch\][^"]*">The fastest way to reach me is email.<\/p>/);
    expect(section).toMatch(/<a href="mailto:tim@timdehof.dev" class="[^"]*btn--accent[^"]*">Email me<\/a>/);
    expect(section).toMatch(/<a href="https:\/\/www.linkedin.com\/in\/tim-dehof\/"[^>]*class="[^"]*btn--line[^"]*">LinkedIn<\/a>/);
    expect(section).toMatch(/<a href="https:\/\/github.com\/timDeHof"[^>]*class="[^"]*btn--line[^"]*">GitHub<\/a>/);
    expect(section).toMatch(/<a[^>]*href="[^"]*resume[^"]*"[^>]*class="[^"]*btn--line[^"]*">Résumé \(PDF\)<\/a>/);
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

    expect(html).toMatch(/<div class="[^"]*\bmax-w-\[51ch\][^"]*">\s*<div[^>]*><p[^>]*>How I got here<\/p><h2[^>]*>The habits carried over<\/h2><\/div>\s*<p[^>]*>\s*In manufacturing, a problem on the line/);
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
