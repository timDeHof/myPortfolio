import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
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
import { Card, CardContent } from "../components/ui/card";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { pageSEO } from "../utils/seo";

// Enhanced skills with actual technology icons (removed proficiency)
const skillCategories = [
  {
    category: "Frontend Development",
    icon: "🎨",
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
    icon: "⚙️",
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
    icon: "🛠️",
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
    icon: "🔧",
    color: "from-orange-700 to-red-700 dark:from-orange-400 dark:to-red-400",
    skills: [
      { name: "3D Printing", icon: PrintingIcon, color: "#FF6B35" },
      { name: "Mechanical Engineering", icon: MechanicalIcon, color: "#4A90E2" },
      { name: "Problem Solving", icon: PuzzleIcon, color: "#8E44AD" },
      { name: "Team Leadership", icon: TeamIcon, color: "#E74C3C" },
      { name: "System Design", icon: SystemIcon, color: "#2ECC71" },
    ],
  },
];

const timeline = [
  {
    year: "2023",
    title: "Full-Stack Developer",
    description: "Focusing on modern web technologies and building scalable applications.",
    icon: "💻",
    color: "bg-blue-700 dark:bg-blue-600",
  },
  {
    year: "2022",
    title: "Career Transition",
    description: "Completed intensive web development bootcamp and started building projects.",
    icon: "🎓",
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    year: "2015-2022",
    title: "Mechanical Engineer",
    description: "Worked in manufacturing and 3D printing, developing problem-solving skills.",
    icon: "🔧",
    color: "bg-orange-700 dark:bg-orange-600",
  },
];

// Skill card component with actual technology icons
const SkillCard: React.FC<{
  skill: { name: string; icon: React.ComponentType<any>; color: string };
  index: number;
}> = ({ skill, index }) => {
  const IconComponent = skill.icon;

  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
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
              whileHover={{ scale: 1.2, rotate: 12 }}
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
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
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
  return (
    <>
      <SEOHead seo={pageSEO.about} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 dark:from-slate-900 dark:via-teal-900 dark:to-blue-900">
        <MaxWidthWrapper>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From mechanical engineering to web development, I bring a unique perspective
              to creating efficient and innovative digital solutions.
            </p>
          </m.div>
        </MaxWidthWrapper>
      </section>

      {/* Story Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
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
              <Card className="p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-purple-900/20 border-gray-200 dark:border-slate-600">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Core Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-700 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 dark:text-gray-300">Quality over quantity in every project</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-teal-700 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 dark:text-gray-300">Continuous learning and improvement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-teal-700 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 dark:text-gray-300">User-centered design and development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-700 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 dark:text-gray-300">Clean, maintainable code practices</span>
                    </li>
                  </ul>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 via-teal-800 to-purple-800 dark:from-gray-100 dark:via-blue-400 dark:via-purple-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                Skills & Technologies
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A comprehensive toolkit combining engineering precision with modern web development
                expertise to build exceptional digital experiences.
              </p>
            </m.div>
          </div>

          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <m.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <m.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-2xl text-white text-4xl bg-gradient-to-br ${category.color}`}
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.icon}
                  </m.div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-gray-200 dark:border-slate-600 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Technical Expertise Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <m.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                      {skillCategories.reduce((total, cat) => total + cat.skills.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Technologies</div>
                  </m.div>
                  <m.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                      {skillCategories.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Specializations</div>
                  </m.div>
                  <m.div
                    whileHover={{ scale: 1.05 }}
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
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Professional Timeline
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones in my journey from engineering to web development.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Year */}
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <span className="text-lg font-bold text-teal-700 dark:text-teal-400">{item.year}</span>
                </div>

                {/* Timeline Icon */}
                <div className="flex-shrink-0 relative">
                  <m.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl z-10 relative`}
                  >
                    {item.icon}
                  </m.div>
                  {index < timeline.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-teal-300 to-transparent dark:from-teal-600"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 ml-8">
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </m.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>
      {/* Certifications Section */}
      <AnimatedSection>
        <CertificationsSection />
      </AnimatedSection>

    </>
  );
};
