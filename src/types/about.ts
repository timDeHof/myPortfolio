import type { LucideIcon } from "lucide-react";
import type React from "react";

// Color token types for Tailwind-compatible theming
export type SkillColorVariant =
  | "react" | "typescript" | "nextjs" | "tailwind" | "framermotion"
  | "nodejs" | "express" | "postgresql" | "mongodb" | "restapi"
  | "git" | "docker" | "aws" | "vercel" | "figma"
  | "printing" | "mechanical" | "problem" | "team" | "system";

export interface Skill {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colorVariant: SkillColorVariant;
}

export interface SkillCategory {
  category: string;
  icon: LucideIcon;
  color: string;
  skills: Skill[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}
