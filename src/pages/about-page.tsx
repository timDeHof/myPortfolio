import { m, useReducedMotion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Palette,
  Cog,
  Wrench,
  HardHat,
  Monitor,
  GraduationCap,
  Handshake,
  Cloud,
  Sparkles,
  BookOpen,
  Users,
  Code2,
  type LucideIcon
} from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { Button } from "../components/ui/button";
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
} from "../components/common/technology-icons";
import { CertificationsSection } from "@/components/about/certifications-section";
import { TestimonialsSection } from "@/components/about/testimonials-section";
import { Card, CardContent } from "../components/ui/card";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { env } from "../lib/env";
import { pageSEO } from "../utils/seo";

// Type definitions for about page data
interface Skill {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

interface SkillCategory {
  category: string;
  icon: LucideIcon;
  color: string;
  skills: Skill[];
}

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface CoreValue {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

// Enhanced skills with actual technology icons (removed proficiency)
const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: Palette,
    color: "from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400",
    skills: [
      { name: "React", icon: ReactIcon, color: "#61DAFB" },
      { name: "TypeScript", icon: TypeScriptIcon, color: "#3178C6" },
      { name: "Next.js", icon: NextJSIcon, color: "#000000" },
      { name: "Tailwind CSS", icon: TailwindIcon, color: "#06B6D4" },
      { name: "Framer Motion", icon: FramerIcon, color: "#FF3366" },
    ],
  },
  {
    category: "Backend Development",
    icon: Cog,
    color: "from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400",
    skills: [
      { name: "Node.js", icon: NodeJSIcon, color: "#339933" },
      { name: "Express", icon: ExpressIcon, color: "#000000" },
      { name: "PostgreSQL", icon: PostgreSQLIcon, color: "#336791" },
      { name: "MongoDB", icon: MongoDBIcon, color: "#47A248" },
      { name: "REST APIs", icon: APIIcon, color: "#FF6B35" },
    ],
  },
  {
    category: "Development Tools",
    icon: Wrench,
    color: "from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400",
    skills: [
      { name: "Git", icon: GitIcon, color: "#F05032" },
      { name: "Docker", icon: DockerIcon, color: "#2496ED" },
      { name: "AWS", icon: AWSIcon, color: "#FF9900" },
      { name: "Vercel", icon: VercelIcon, color: "#000000" },
      { name: "Figma", icon: FigmaIcon, color: "#F24E1E" },
    ],
  },
  {
    category: "Engineering & Innovation",
    icon: HardHat,
    color: "from-slate-600 to-slate-500 dark:from-slate-300 dark:to-slate-400",
    skills: [
      { name: "3D Printing", icon: PrintingIcon, color: "#FF6B35" },
      { name: "Mechanical Engineering", icon: MechanicalIcon, color: "#4A90E2" },
      { name: "Problem Solving", icon: PuzzleIcon, color: "#8E44AD" },
      { name: "Team Leadership", icon: TeamIcon, color: "#E74C3C" },
      { name: "System Design", icon: SystemIcon, color: "#2ECC71" },
    ],
  },
];

const timeline: TimelineEntry[] = [
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
const coreValues: CoreValue[] = [
  {
    title: "Quality over Quantity",
    description: "Every project receives full attention to detail and thoughtful implementation.",
    icon: Sparkles,
    gradient: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
  },
  {
    title: "Continuous Learning",
    description: "Staying current with emerging technologies and best practices.",
    icon: BookOpen,
    gradient: "from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700",
  },
  {
    title: "User-Centered Design",
    description: "Building interfaces that prioritize usability and accessibility.",
    icon: Users,
    gradient: "from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600",
  },
  {
    title: "Clean Code",
    description: "Writing maintainable, well-documented code that scales.",
    icon: Code2,
    gradient: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
  },
];

// Skill card component with actual technology icons
const SkillCard: React.FC<{
  skill: Skill;
  index: number;
  shouldReduceMotion: boolean;
}> = ({ skill, index, shouldReduceMotion }) => {
  const IconComponent = skill.icon;

  return (
    <m.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={shouldReduceMotion ? undefined : {
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      className="group"
    >
      <Card className="h-full bg-white dark:bg-slate-800 hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-slate-600 rounded-2xl overflow-hidden">
        <CardContent className="p-6 relative">
          {/* Background gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: skill.color }}
          />

          {/* Icon and title */}
          <div className="flex flex-col items-center text-center space-y-4">
            <m.div
              className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.2, rotate: 12 }}
            >
              <IconComponent size={48} className="drop-shadow-lg" />
            </m.div>

            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
              {skill.name}
            </h4>

            {/* Technology color indicator */}
            <m.div
              className="w-full h-1 rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
              whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Decorative elements */}
          <div
            className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: skill.color }}
          />
          <div
            className="absolute bottom-4 left-4 w-1 h-1 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
            style={{ backgroundColor: skill.color }}
          />
        </CardContent>
      </Card>
    </m.div>
  );
};

export const AboutPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <SEOHead seo={pageSEO.about} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 dark:from-slate-900 dark:via-teal-900 dark:to-blue-900">
        <MaxWidthWrapper>
          <m.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              From mechanical engineering to web development, I bring a unique perspective
              to creating efficient and innovative digital solutions.
            </p>
            {env.VITE_RESUME_URL && (
              <Button asChild className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
                <a href={env.VITE_RESUME_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            )}
          </m.div>
        </MaxWidthWrapper>
      </section>

      {/* Story Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  With a background in mechanical engineering and 3D printing, I discovered my passion
                  for web development through the intersection of technology and problem-solving.
                  This unique combination gives me a distinctive perspective on building efficient,
                  scalable solutions.
                </p>
                <p>
                  My engineering background taught me the importance of precision, efficiency, and
                  systematic thinking—qualities I now apply to every line of code I write. I'm
                  passionate about creating web applications that not only look great but also
                  perform exceptionally well.
                </p>
                <p>
                  I believe in continuous learning and staying up-to-date with the latest technologies
                  and best practices. This commitment to growth allows me to deliver cutting-edge
                  solutions that meet modern web standards.
                </p>
                <p>
                  I regularly share my thoughts on development, engineering insights, and lessons learned
                  on my
                  {" "}
                  <a
                    href="https://blog.timdehof.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 underline inline-flex items-center"
                  >
                    blog
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                  , where I explore the intersection of engineering and web development.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-purple-900/20 border-gray-200 dark:border-slate-600 overflow-hidden relative">
                <CardContent className="p-8 relative">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    Core Values
                  </h3>

                  {/* Hybrid Layout - 2x2 grid with magazine styling */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coreValues.map((value, index) => (
                      <m.div
                        key={value.title}
                        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
                      >
                        {/* Card container with hover effects */}
                        <div className="group relative bg-white/60 dark:bg-slate-800/60 rounded-2xl p-5 border border-gray-200 dark:border-slate-600 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden h-full">

                          {/* Background gradient that appears on hover */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${value.gradient} -z-10`} />

                          <div className="flex items-start gap-4">
                            {/* Large icon with glow effect */}
                            <div className="relative flex-shrink-0">
                              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity`} />
                              <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                <value.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-white dark:group-hover:text-white transition-colors">
                                {value.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors leading-relaxed">
                                {value.description}
                              </p>
                            </div>
                          </div>

                          {/* Bottom accent line */}
                          <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${value.gradient} transition-all duration-500 rounded-br-xl`} />
                        </div>
                      </m.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Enhanced Skills Section - With Actual Technology Icons */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-800 dark:to-blue-900/30">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <m.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 dark:from-slate-200 dark:via-slate-300 dark:to-slate-200 bg-clip-text text-transparent mb-6">
                Skills & Technologies
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                A comprehensive toolkit combining engineering precision with modern web development
                expertise to build exceptional digital experiences.
              </p>
            </m.div>
          </div>

          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <m.div
                key={category.category}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className="relative inline-block mb-6">
                    <m.div
                      className={`w-20 h-20 rounded-3xl shadow-2xl bg-gradient-to-br ${category.color}`}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotateY: 15 }}
                      transition={shouldReduceMotion ? undefined : { duration: 0.3 }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <category.icon size={36} className="text-white" />
                      </div>
                    </m.div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {category.category}
                  </h3>
                  <div className={`w-24 h-1 bg-gradient-to-r ${category.color} mx-auto rounded-full`} />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full opacity-5 bg-gradient-to-br from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 -z-10" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-5 bg-gradient-to-br from-teal-600 to-purple-600 dark:from-teal-400 dark:to-purple-400 -z-10" />
              </m.div>
            ))}
          </div>

          {/* Skills Summary Stats */}
          <m.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-gray-200 dark:border-slate-600 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Technical Expertise Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <m.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                      {skillCategories.reduce((total, cat) => total + cat.skills.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Technologies</div>
                  </m.div>
                  <m.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                      {skillCategories.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Specializations</div>
                  </m.div>
                  <m.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                      3+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Years Experience</div>
                  </m.div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Timeline Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full blur-3xl" />
        </div>

        <MaxWidthWrapper className="relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              My Journey
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              From mechanical engineering to full-stack development — a path of continuous learning and growth.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-200 via-teal-400 to-teal-200 dark:from-teal-800 dark:via-teal-600 dark:to-teal-800 rounded-full hidden md:block" />

            {/* Timeline items - alternating layout */}
            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <m.div
                    key={item.title}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} mb-8 md:mb-0`}>
                      <Card className="group p-6 md:p-8 hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800 border-0 md:border md:border-gray-100 dark:md:border-slate-700 shadow-lg hover:-translate-y-1">
                        {/* Year badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                          isLeft ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        }`}>
                          <span className={`w-2 h-2 rounded-full bg-current ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                          {item.year}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Decorative gradient line */}
                        <div className={`h-1 w-12 rounded-full mt-6 ${isLeft ? "md:ml-auto" : ""} bg-gradient-to-r from-teal-400 to-blue-500 group-hover:w-24 transition-all duration-500`} />
                      </Card>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                      {/* Glowing dot on the timeline */}
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-lg opacity-50 ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                        <div className={`relative w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-900 group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon size={24} className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Icon above card */}
                    <div className="flex md:hidden items-center gap-4 mb-4 w-full order-first">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <item.icon size={20} className="text-white" />
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        index % 2 === 0 ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      }`}>
                        <span className={`w-2 h-2 rounded-full bg-current ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                        {item.year}
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>
      {/* Certifications Section */}
      <AnimatedSection>
        <CertificationsSection />
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>

    </>
  );
};
