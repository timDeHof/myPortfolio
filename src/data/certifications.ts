import type { Certification } from "../components/about/certifications-section";

/**
 * Certifications Data
 *
 * Add your certifications here following this format:
 *
 * {
 *   name: "Full certification name",
 *   issuer: "Issuing organization",
 *   date: "Month Year (e.g., 'January 2023' or '2023')",
 *   verificationUrl: "https://link-to-verify-credential.com", // Optional
 *   badgeUrl: "https://link-to-badge-image.png", // Optional
 *   description: "Brief description of what this certification covers", // Optional
 *   skills: ["Skill 1", "Skill 2", "Skill 3"], // Optional
 * }
 *
 * Tips:
 * - For Credly badges, right-click on your badge and copy the image URL
 * - Include verification URLs when available to add credibility
 * - Keep descriptions concise (1-2 sentences)
 * - List 2-4 key skills per certification
 */

export const certifications: Certification[] = [
  // Example certification - Replace with your own
  {
    name: "Full Stack Web Development",
    issuer: "Fullstack Academy",
    date: "2022",
    description: "Intensive bootcamp covering modern web development with React, Node.js, and PostgreSQL.",
    skills: ["React", "Node.js", "PostgreSQL", "REST APIs"],
  },
  {
    name: "WAI0.1x: Introduction to Web Accessibility",
    issuer: "W3Cx ",
    date: "August 2025",
    verificationUrl: "https://courses.edx.org/certificates/b2cd0533aae54ee58674678296fbb699",
    description: "Demonstrated a strong fundamental understanding of digital accessibility to make websites and apps work well for people with disabilities, meet international standards, and provide a better user experience for everyone.",
    skills: ["W3C Accessibility Standards", "ISO/TEC 40500", "WCAG 2.0", "Web Accessibility"],
  },
  // Add more certifications below
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services Training and Certification",
    date: "September 2025",
    verificationUrl: "https://www.credly.com/badges/150250fd-6cb5-473f-aa78-7846135f2c83",
    badgeUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    description: "Demonstrated a fundamental understanding of IT services and their uses in the AWS Cloud.",
    skills: ["Cloud Computing", "AWS Web Services", "Cloud Platform"],
  },
  {
    name: "IBM DevOps Essentials",
    issuer: "Coursera",
    date: "July 2023",
    verificationUrl: "https://www.credly.com/badges/18963610-c612-4306-9f5d-9e4bc491923f",
    badgeUrl: "https://images.credly.com/size/340x340/images/48847c2a-7b9a-4044-b13d-bb175649904b/image.png",
    description: "demonstrated foundational knowledge of the basic characteristics of DevOps",
    skills: ["DevOps", "Continuous Integration", "Continuous Development", "Behavior-Driven Development", "Infrastructure As Code", "Test-Driven Development"],
  },
];
