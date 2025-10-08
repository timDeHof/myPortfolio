import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, ChevronDown, Code, Coffee, Rocket, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TextGenerateEffect } from "../ui/aceternity/text-generate-effect";
import { Button } from "../ui/button";
// Floating icons configuration
import { floatingIcons } from "./floating-icons";

// Background elements
const backgroundElements = [
  { icon: Code, x: "5%", y: "10%" },
  { icon: Star, x: "95%", y: "25%" },
  { icon: Coffee, x: "8%", y: "60%" },
  { icon: Rocket, x: "92%", y: "70%" },
  { icon: ArrowRight, x: "12%", y: "30%" },
  { icon: Code, x: "88%", y: "85%" },
];

export const HeroSection: React.FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.8;

      setShowScrollIndicator(scrolled < 100);
      setShowBackToTop(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.querySelector("#services-section");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 overflow-hidden">
      {/* Floating tech icons */}
      {floatingIcons.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={index}
            className="absolute z-10 opacity-20 dark:opacity-30 hidden lg:block"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            <IconComponent size={48} />
          </motion.div>
        );
      })}

      {/* Background decorative elements */}
      {backgroundElements.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={`bg-${index}`}
            className="absolute z-5 opacity-10 dark:opacity-20 text-blue-600 dark:text-blue-400 hidden md:block"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "linear",
            }}
          >
            <IconComponent size={32} />
          </motion.div>
        );
      })}

      {/* Main content with glassmorphism card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glassmorphism container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl max-w-5xl mx-auto touch-manipulation"
          >
            {/* Glassmorphism overlay effects */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-white/5 dark:from-white/10 dark:via-transparent dark:to-white/5"></div>
            <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 blur-lg -z-10"></div>

            <div className="relative z-10">
              {/* Enhanced greeting with animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-4"
              >
                <span className="inline-block px-3 py-2 sm:px-4 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium border border-blue-200 dark:border-blue-700 touch-manipulation">
                  👋 Welcome to my digital space
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-400 dark:via-teal-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Tim DeHof
                </span>
                <br />
                <span className="relative">
                  Full-Stack Developer
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-400 dark:via-teal-400 dark:to-purple-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                </span>
              </motion.h1>

              {/* Enhanced description with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-3xl mx-auto mb-6 sm:mb-8"
              >
                <div className="backdrop-blur-sm bg-white/20 dark:bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 dark:border-white/20">
                  <TextGenerateEffect
                    words="Transforming Your Business Challenges into Powerful Web Applications"
                    className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium text-center flex items-center justify-center leading-relaxed text-pretty"
                  />
                </div>
              </motion.div>

              {/* Enhanced CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto min-h-[48px] bg-blue-700 hover:bg-blue-800 active:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-600 dark:border-blue-500 touch-manipulation transform transition-all duration-200"
                  >
                    <Link to="/projects">
                      <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full sm:w-auto min-h-[48px] backdrop-blur-sm bg-white/20 dark:bg-white/10 border-white/40 dark:border-white/30 text-gray-800 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-white/20 active:bg-white/40 dark:active:bg-white/30 shadow-lg touch-manipulation transform transition-all duration-200"
                  >
                    <Link to="/contact">Get In Touch</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced social proof with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
              >
                <motion.div
                  className="flex items-center backdrop-blur-sm bg-white/20 dark:bg-white/10 rounded-full px-3 sm:px-4 py-2 border border-white/30 dark:border-white/20 touch-manipulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-yellow-500" />
                  <span>GitHub Active</span>
                </motion.div>
                <motion.div
                  className="flex items-center backdrop-blur-sm bg-white/20 dark:bg-white/10 rounded-full px-3 sm:px-4 py-2 border border-white/30 dark:border-white/20 touch-manipulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Coffee className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-teal-600 dark:text-teal-400" />
                  <span>3+ Years Experience</span>
                </motion.div>
                <motion.div
                  className="flex items-center backdrop-blur-sm bg-white/20 dark:bg-white/10 rounded-full px-3 sm:px-4 py-2 border border-white/30 dark:border-white/20 touch-manipulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Rocket className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-600 dark:text-purple-400" />
                  <span>Always Learning</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Smart Scroll Indicator */}
      {showScrollIndicator && (
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300 z-30 touch-manipulation group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to explore"
        >
          <div className="backdrop-blur-sm bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-full p-3 group-hover:bg-white/30 dark:group-hover:bg-white/20 transition-all duration-300">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </div>
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll to explore
          </span>
        </motion.button>
      )}

      {/* Fixed Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation group min-w-[48px] min-h-[48px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Back to top
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </motion.button>
      )}
    </section>
  );
};
