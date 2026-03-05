import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTechBadgeClasses(tech: string): { bg: string; text: string; border: string } {
  const techLower = tech.split("·")[0].trim().toLowerCase();

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    react: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    typescript: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    javascript: { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800" },
    nextjs: { bg: "bg-gray-50 dark:bg-gray-900/20", text: "text-gray-700 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" },
    "next.js": { bg: "bg-gray-50 dark:bg-gray-900/20", text: "text-gray-700 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" },
    tailwind: { bg: "bg-cyan-50 dark:bg-cyan-900/20", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800" },
    nodejs: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    "node.js": { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    express: { bg: "bg-gray-50 dark:bg-gray-900/20", text: "text-gray-700 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" },
    mongodb: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    postgresql: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    python: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    docker: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    aws: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
    vercel: { bg: "bg-gray-50 dark:bg-gray-900/20", text: "text-gray-700 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" },
  };

  return colorMap[techLower] || { bg: "bg-gray-50 dark:bg-gray-900/20", text: "text-gray-700 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" };
}

export function getLanguageBadgeClasses(language: string): { bg: string; text: string; border: string } {
  const langLower = language.toLowerCase();

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    typescript: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    javascript: { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800" },
    python: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    java: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
    "c#": { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
    "c++": { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    go: { bg: "bg-cyan-50 dark:bg-cyan-900/20", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800" },
    rust: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
    ruby: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
    php: { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-700 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800" },
    swift: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
    kotlin: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
    html: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
    css: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    scss: { bg: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-700 dark:text-pink-400", border: "border-pink-200 dark:border-pink-800" },
    shell: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    vue: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    svelte: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
  };

  return colorMap[langLower] || { bg: "bg-gray-50 dark:bg-gray-900/20", text: "text-gray-700 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" };
}
