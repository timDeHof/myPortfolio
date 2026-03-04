import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TECH_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  React: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
  "React Native": { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
  Next: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
  "Next.js": { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
  TypeScript: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  JavaScript: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  Python: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  Node: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  "Node.js": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  Express: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
  "Express.js": { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
  PostgreSQL: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  MongoDB: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  Tailwind: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
  "Tailwind CSS": { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
  "Framer Motion": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  Docker: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  AWS: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  Vercel: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
  Git: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  Figma: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  Prisma: { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-200" },
  GraphQL: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
  REST: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  "REST API": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  HTML: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  CSS: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  Redux: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  Jest: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  Vitest: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
};

export const LANGUAGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  TypeScript: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  JavaScript: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  Python: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  Java: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  "C#": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  "C++": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  Go: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
  Rust: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  Ruby: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  PHP: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
  Swift: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  Kotlin: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  HTML: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  CSS: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  SCSS: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
  Shell: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  Vue: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  Svelte: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
};

export function getTechBadgeClasses(tech: string): { bg: string; text: string; border: string } {
  const normalizedTech = tech.split("·")[0].trim();
  return TECH_COLORS[normalizedTech] || { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" };
}

export function getLanguageBadgeClasses(language: string): { bg: string; text: string; border: string } {
  return LANGUAGE_COLORS[language] || { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" };
}
