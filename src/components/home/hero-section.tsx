import { m } from "framer-motion";
import { ArrowRight, Code, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { TextGenerateEffect } from "../ui/aceternity/text-generate-effect";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { BackToTopButton } from "./back-to-top-button";
import { FloatingIcons } from "./floating-icons.tsx";
import { ScrollIndicator } from "./scroll-indicator";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Floating background icons */}
      <FloatingIcons />

      <MaxWidthWrapper>
        <div className="relative z-20 text-center">
          {/* Main content */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting badge */}
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                👋 Welcome to my digital space
              </span>
            </m.div>

            {/* Headline */}
            <m.h1
              className="mb-6 text-5xl font-bold text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-indigo-800 via-blue-600 to-purple-700 bg-clip-text text-transparent dark:from-indigo-300 dark:via-blue-300 dark:to-purple-400">
                Tim DeHof
              </span>
              <br />
              <span>Full-Stack Developer</span>
            </m.h1>

            {/* Description */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-8 max-w-3xl"
            >
              <TextGenerateEffect
                words="Transforming Your Business Challenges into Powerful Web Applications"
                className="text-xl text-gray-700 dark:text-gray-300 md:text-2xl"
              />
            </m.div>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Link to="/projects">
                  <Code className="h-5 w-5" />
                  View My Work
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-teal-600 text-teal-700 hover:bg-teal-50 hover:border-teal-700 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20"
              >
                <Link to="/contact">
                  <Mail className="h-5 w-5" />
                  Get In Touch
                </Link>
              </Button>
            </m.div>
          </m.div>
        </div>
      </MaxWidthWrapper>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Back to Top Button */}
      <BackToTopButton />
    </section>
  );
};
