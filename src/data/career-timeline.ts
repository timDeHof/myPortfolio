export interface CareerTimelineEntry {
  years: string;
  title: string;
  body: string;
  /** The shorter title the home page shows. Entries without one stay off the home page. */
  homeTitle?: string;
}

// The About page shows every entry. The home page shows the ones with a homeTitle.
export const careerTimeline: CareerTimelineEntry[] = [
  // The sivs-platform line waits for Joe's OK (I8, P3)
  { years: "2026 – present", title: "Contract developer, Jokma Web Solutions", body: "Client web and mobile apps." },
  { years: "2024 – present", title: "Frontend Engineer, TeamForward", homeTitle: "Frontend Engineer, TeamForward", body: "Event-planning and networking platform. React, TypeScript, Tailwind CSS." },
  { years: "2024 – 2026", title: "AWS Cloud Institute", homeTitle: "AWS Cloud Institute graduate", body: "Graduated from the Cloud Application Developer program, June 2026. AWS Certified Cloud Practitioner and AI Practitioner." },
  { years: "2023", title: "Full-stack developer", body: "Built CI/CD pipelines. IBM DevOps Essentials (Coursera, July 2023)." },
  { years: "2022", title: "Career change", homeTitle: "Fullstack Academy, career change", body: "Finished Fullstack Academy's full-stack web development bootcamp." },
  { years: "2015 – 2022", title: "Mechanical engineer, Polyhistor International", homeTitle: "Mechanical engineer", body: "Manufacturing and 3D printing. Owned the engraving design for a line producing 250 parts a day." },
];
