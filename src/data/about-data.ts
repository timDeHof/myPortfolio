import {
  BookOpen,
  Cloud,
  Code2,
  Cog,
  GraduationCap,
  Handshake,
  HardHat,
  Monitor,
  Palette,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

import type { CoreValue, SkillCategory, SkillColorVariant, TimelineEntry } from "@/types/about";

import {
  APIIcon,
  AWSIcon,
  DockerIcon,
  ExpressIcon,
  FigmaIcon,
  FramerIcon,
  GitIcon,
  MechanicalIcon,
  MongoDBIcon,
  NextJSIcon,
  NodeJSIcon,
  PostgreSQLIcon,
  PrintingIcon,
  PuzzleIcon,
  ReactIcon,
  SystemIcon,
  TailwindIcon,
  TeamIcon,
  TypeScriptIcon,
  VercelIcon,
} from "@/components/common/technology-icons";

// Map color tokens to Tailwind background/text classes
export const skillColorMap: Record<SkillColorVariant, { bg: string; border: string; shadow: string }> = {
  react: { bg: "bg-[#61DAFB]/10", border: "border-[#61DAFB]/30", shadow: "shadow-[#61DAFB]/20" },
  typescript: { bg: "bg-[#3178C6]/10", border: "border-[#3178C6]/30", shadow: "shadow-[#3178C6]/20" },
  nextjs: { bg: "bg-slate-900/10", border: "border-slate-900/30", shadow: "shadow-slate-900/20" },
  tailwind: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", shadow: "shadow-cyan-500/20" },
  framermotion: { bg: "bg-pink-500/10", border: "border-pink-500/30", shadow: "shadow-pink-500/20" },
  nodejs: { bg: "bg-[#339933]/10", border: "border-[#339933]/30", shadow: "shadow-[#339933]/20" },
  express: { bg: "bg-slate-900/10", border: "border-slate-900/30", shadow: "shadow-slate-900/20" },
  postgresql: { bg: "bg-[#336791]/10", border: "border-[#336791]/30", shadow: "shadow-[#336791]/20" },
  mongodb: { bg: "bg-[#47A248]/10", border: "border-[#47A248]/30", shadow: "shadow-[#47A248]/20" },
  restapi: { bg: "bg-orange-500/10", border: "border-orange-500/30", shadow: "shadow-orange-500/20" },
  git: { bg: "bg-[#F05032]/10", border: "border-[#F05032]/30", shadow: "shadow-[#F05032]/20" },
  docker: { bg: "bg-[#2496ED]/10", border: "border-[#2496ED]/30", shadow: "shadow-[#2496ED]/20" },
  aws: { bg: "bg-[#FF9900]/10", border: "border-[#FF9900]/30", shadow: "shadow-[#FF9900]/20" },
  vercel: { bg: "bg-slate-900/10", border: "border-slate-900/30", shadow: "shadow-slate-900/20" },
  figma: { bg: "bg-[#F24E1E]/10", border: "border-[#F24E1E]/30", shadow: "shadow-[#F24E1E]/20" },
  printing: { bg: "bg-orange-500/10", border: "border-orange-500/30", shadow: "shadow-orange-500/20" },
  mechanical: { bg: "bg-blue-500/10", border: "border-blue-500/30", shadow: "shadow-blue-500/20" },
  problem: { bg: "bg-purple-500/10", border: "border-purple-500/30", shadow: "shadow-purple-500/20" },
  team: { bg: "bg-red-500/10", border: "border-red-500/30", shadow: "shadow-red-500/20" },
  system: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", shadow: "shadow-emerald-500/20" },
};

// Enhanced skills with actual technology icons (removed proficiency)
export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: Palette,
    color: "bg-secondary",
    skills: [
      { name: "React", icon: ReactIcon, colorVariant: "react" },
      { name: "TypeScript", icon: TypeScriptIcon, colorVariant: "typescript" },
      { name: "Next.js", icon: NextJSIcon, colorVariant: "nextjs" },
      { name: "Tailwind CSS", icon: TailwindIcon, colorVariant: "tailwind" },
      { name: "Framer Motion", icon: FramerIcon, colorVariant: "framermotion" },
    ],
  },
  {
    category: "Backend Development",
    icon: Cog,
    color: "bg-secondary",
    skills: [
      { name: "Node.js", icon: NodeJSIcon, colorVariant: "nodejs" },
      { name: "Express", icon: ExpressIcon, colorVariant: "express" },
      { name: "PostgreSQL", icon: PostgreSQLIcon, colorVariant: "postgresql" },
      { name: "MongoDB", icon: MongoDBIcon, colorVariant: "mongodb" },
      { name: "REST APIs", icon: APIIcon, colorVariant: "restapi" },
    ],
  },
  {
    category: "Development Tools",
    icon: Wrench,
    color: "bg-secondary",
    skills: [
      { name: "Git", icon: GitIcon, colorVariant: "git" },
      { name: "Docker", icon: DockerIcon, colorVariant: "docker" },
      { name: "AWS", icon: AWSIcon, colorVariant: "aws" },
      { name: "Vercel", icon: VercelIcon, colorVariant: "vercel" },
      { name: "Figma", icon: FigmaIcon, colorVariant: "figma" },
    ],
  },
  {
    category: "Engineering & Innovation",
    icon: HardHat,
    color: "bg-secondary",
    skills: [
      { name: "3D Printing", icon: PrintingIcon, colorVariant: "printing" },
      { name: "Mechanical Engineering", icon: MechanicalIcon, colorVariant: "mechanical" },
      { name: "Problem Solving", icon: PuzzleIcon, colorVariant: "problem" },
      { name: "Team Leadership", icon: TeamIcon, colorVariant: "team" },
      { name: "System Design", icon: SystemIcon, colorVariant: "system" },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2024 - Present",
    title: "Frontend Engineer",
    description: "Building the TeamForward networking platform using React, TypeScript, and Tailwind CSS. Developing accessible, user-friendly interfaces for an event planning application.",
    icon: Handshake,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    year: "2024 - Present",
    title: "AWS Cloud Institute Student",
    description: "Pursuing cloud development certification through a structured 9-course curriculum covering Python, microservices, serverless architectures, CI/CD, Infrastructure as Code, and AI/ML on AWS. Preparing for AWS Certified Cloud Practitioner, Developer Associate, and AI Practitioner certifications.",
    icon: Cloud,
    color: "bg-orange-500 dark:bg-orange-600",
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    description: "Focusing on modern web technologies and building scalable applications.",
    icon: Monitor,
    color: "bg-blue-700 dark:bg-blue-600",
  },
  {
    year: "2022",
    title: "Career Transition",
    description: "Completed intensive web development bootcamp and started building projects.",
    icon: GraduationCap,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    year: "2015-2022",
    title: "Mechanical Engineer",
    description: "Worked in manufacturing and 3D printing, developing problem-solving skills.",
    icon: Wrench,
    color: "bg-orange-700 dark:bg-orange-600",
  },
];

// Core values data
export const coreValues: CoreValue[] = [
  {
    title: "Quality over Quantity",
    description: "Every project receives full attention to detail and thoughtful implementation.",
    icon: Sparkles,
    gradient: "bg-secondary",
  },
  {
    title: "Continuous Learning",
    description: "Staying current with emerging technologies and best practices.",
    icon: BookOpen,
    gradient: "bg-secondary",
  },
  {
    title: "User-Centered Design",
    description: "Building interfaces that prioritize usability and accessibility.",
    icon: Users,
    gradient: "bg-secondary",
  },
  {
    title: "Clean Code",
    description: "Writing maintainable, well-documented code that scales.",
    icon: Code2,
    gradient: "bg-secondary",
  },
];
