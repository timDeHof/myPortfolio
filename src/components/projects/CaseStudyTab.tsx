import { m } from "framer-motion";
import { ArrowRight, BookOpen, Check, Code, ExternalLink, Github, Lightbulb, Target, Trophy } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface CaseStudyData {
  hero: {
    impactStatement: string;
    tagline: string;
  };
  stats: {
    stars: number;
    forks: number;
    contributors: number;
    featuredOnShadcn: boolean;
    license: string;
  };
  problem: {
    title: string;
    content: string;
  };
  technicalApproach: {
    title: string;
    decisions: {
      title: string;
      description: string;
    }[];
  };
  challenges: {
    title: string;
    items: {
      challenge: string;
      solution: string;
    }[];
  };
  impact: {
    title: string;
    metrics: { value: string; label: string }[];
    achievements: string[];
  };
  learnings: {
    title: string;
    items: string[];
  };
  links: {
    github: string;
    demo: string;
    storybook: string;
    npm?: string;
  };
}

interface CaseStudyTabProps {
  data: CaseStudyData;
  accentColor?: string;
}

const DEFAULT_ACCENT = "#2563eb";

export function CaseStudyTab({ data, accentColor = DEFAULT_ACCENT }: CaseStudyTabProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
          <Trophy className="h-4 w-4" />
          Featured Case Study
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {data.hero.impactStatement}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {data.hero.tagline}
        </p>

        {/* Stats Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{data.stats.stars}</span>
            <span className="text-gray-500 dark:text-gray-400">stars</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <ForkIcon className="h-5 w-5 text-gray-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{data.stats.forks}</span>
            <span className="text-gray-500 dark:text-gray-400">forks</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Code className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{data.stats.license}</span>
            <span className="text-gray-500 dark:text-gray-400">license</span>
          </div>
          {data.stats.featuredOnShadcn && (
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg">
              <Check className="h-5 w-5" />
              <span className="font-medium">Featured on shadcn.io</span>
            </div>
          )}
        </div>
      </m.div>

      {/* Problem Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Target className="h-5 w-5" style={{ color: accentColor }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {data.problem.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.problem.content}
            </p>
          </CardContent>
        </Card>
      </m.div>

      {/* Technical Approach Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {data.technicalApproach.title}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {data.technicalApproach.decisions.map((decision, index) => (
            <Card key={`decision-${index}`}>
              <CardContent className="p-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <BookOpen className="h-5 w-5" style={{ color: accentColor }} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {decision.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {decision.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </m.div>

      {/* Challenges Solved Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {data.challenges.title}
        </h3>
        <div className="space-y-3">
          {data.challenges.items.map((item, index) => (
            <Card key={`challenge-${index}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.challenge}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </m.div>

      {/* Impact Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {data.impact.title}
        </h3>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {data.impact.metrics.map((metric, index) => (
            <div
              key={`metric-${index}`}
              className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="text-2xl font-bold" style={{ color: accentColor }}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <Card>
          <CardContent className="p-5">
            <ul className="space-y-3">
              {data.impact.achievements.map((achievement, index) => (
                <li key={`achievement-${index}`} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </m.div>

      {/* Learnings Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-l-4" style={{ borderLeftColor: accentColor }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-5 w-5" style={{ color: accentColor }} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {data.learnings.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {data.learnings.items.map((item, index) => (
                <li key={`learning-${index}`} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </m.div>

      {/* CTA Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 justify-center py-2"
      >
        <Button asChild className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 py-4">
          <a href={data.links.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            View on GitHub
          </a>
        </Button>
        <Button variant="outline" asChild className="py-4">
          <a href={data.links.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </a>
        </Button>
        <Button variant="outline" asChild className="py-4">
          <a href={data.links.storybook} target="_blank" rel="noopener noreferrer">
            <BookOpen className="h-4 w-4 mr-2" />
            Storybook Docs
          </a>
        </Button>
      </m.div>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ForkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0c-6 0-11 5-11 11 0 4.17 2.43 7.92 6 9.52v3.48c0 .55.45 1 1 1h1v-6.48h4v6.48h1c.55 0 1-.45 1-1v-3.48c3.57-1.6 6-6.35 6-9.52 0-6-5-11-11-11zm3 10h-2v-2h2v2zm-4 0h-2v-2h2v2zm8 0h-2v-2h2v2z" />
    </svg>
  );
}
