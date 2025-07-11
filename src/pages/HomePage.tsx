import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, Wrench, Star, Coffee, Lightbulb, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { TextGenerateEffect } from '../components/ui/aceternity/text-generate-effect';
import { 
  ReactIcon, 
  TypeScriptIcon, 
  NextJSIcon, 
  TailwindIcon,
  NodeJSIcon,
  ExpressIcon,
  PostgreSQLIcon,
  MongoDBIcon,
  GitIcon,
  DockerIcon,
  AWSIcon,
  FigmaIcon
} from '../components/common/TechnologyIcons';
import { pageSEO } from '../utils/seo';

// Floating icons data for glassmorphism hero
const floatingIcons = [
  { Icon: ReactIcon, delay: 0, x: "10%", y: "20%", duration: 4 },
  { Icon: TypeScriptIcon, delay: 0.5, x: "80%", y: "15%", duration: 5 },
  { Icon: NodeJSIcon, delay: 1, x: "15%", y: "70%", duration: 4.5 },
  { Icon: TailwindIcon, delay: 1.5, x: "85%", y: "65%", duration: 6 },
  { Icon: GitIcon, delay: 2, x: "5%", y: "45%", duration: 5.5 },
  { Icon: PostgreSQLIcon, delay: 2.5, x: "90%", y: "40%", duration: 4.8 },
];

// Floating background elements
const backgroundElements = [
  { icon: Star, delay: 0, x: "5%", y: "10%", duration: 8, scale: 0.8 },
  { icon: Coffee, delay: 1, x: "95%", y: "80%", duration: 7, scale: 0.6 },
  { icon: Lightbulb, delay: 2, x: "8%", y: "85%", duration: 9, scale: 0.7 },
  { icon: Rocket, delay: 3, x: "92%", y: "12%", duration: 6, scale: 0.9 },
];

// Enhanced services with detailed processes and benefits
const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: 'Full-Stack Development',
    description: 'Complete web application development from database to user interface.',
    benefits: [
      'Custom React applications with TypeScript',
      'Scalable Node.js backend architecture', 
      'Database design and optimization',
      'API development and integration'
    ],
    process: ['Planning & Architecture', 'Development & Testing', 'Deployment & Optimization'],
    color: 'from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700'
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: 'UI/UX Design',
    description: 'Designing user-centered interfaces that convert visitors into customers.',
    benefits: [
      'Responsive design for all devices',
      'Accessibility compliance (WCAG AA)',
      'Modern design systems and components',
      'User experience optimization'
    ],
    process: ['User Research', 'Design & Prototyping', 'Testing & Refinement'],
    color: 'from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-700'
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: 'Performance Optimization',
    description: 'Ensuring your applications load fast and perform flawlessly under load.',
    benefits: [
      'Core Web Vitals optimization',
      'SEO-friendly architecture',
      'Efficient caching strategies',
      'Continuous monitoring and improvements'
    ],
    process: ['Performance Audit', 'Optimization Implementation', 'Monitoring & Maintenance'],
    color: 'from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700'
  },
];

// Enhanced technical skills with accessible color gradients including teal
const technicalSkills = [
  {
    category: 'Frontend Technologies',
    icon: <Code className="h-7 w-7" />,
    color: 'from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400',
    skills: [
      { name: 'React', icon: ReactIcon, color: '#61DAFB' },
      { name: 'TypeScript', icon: TypeScriptIcon, color: '#3178C6' },
      { name: 'Next.js', icon: NextJSIcon, color: '#000000' },
      { name: 'Tailwind CSS', icon: TailwindIcon, color: '#06B6D4' },
    ],
  },
  {
    category: 'Backend & Database',
    icon: <Zap className="h-7 w-7" />,
    color: 'from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400',
    skills: [
      { name: 'Node.js', icon: NodeJSIcon, color: '#339933' },
      { name: 'Express', icon: ExpressIcon, color: '#000000' },
      { name: 'PostgreSQL', icon: PostgreSQLIcon, color: '#336791' },
      { name: 'MongoDB', icon: MongoDBIcon, color: '#47A248' },
    ],
  },
  {
    category: 'Development Tools',
    icon: <Wrench className="h-7 w-7" />,
    color: 'from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400',
    skills: [
      { name: 'Git', icon: GitIcon, color: '#F05032' },
      { name: 'Docker', icon: DockerIcon, color: '#2496ED' },
      { name: 'AWS', icon: AWSIcon, color: '#FF9900' },
      { name: 'Figma', icon: FigmaIcon, color: '#F24E1E' },
    ],
  },
];

// Static decorative component with accessible colors
const TechDecorator: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <div className="flex space-x-1">
        {/* Central hexagon */}
        <div className={`w-4 h-4 bg-gradient-to-br ${color} transform rotate-45 rounded-sm`} />
        
        {/* Circuit-like connectors */}
        <div className="flex items-center space-x-1">
          <div className={`w-8 h-0.5 bg-gradient-to-r ${color} rounded-full`} />
          <div className={`w-2 h-2 bg-gradient-to-br ${color} rounded-full`} />
          <div className={`w-8 h-0.5 bg-gradient-to-r ${color} rounded-full`} />
        </div>
        
        {/* End hexagon */}
        <div className={`w-4 h-4 bg-gradient-to-br ${color} transform rotate-45 rounded-sm`} />
      </div>
    </div>
  );
};

// Skill card component with improved accessibility
const SkillCard: React.FC<{ 
  skill: { name: string; icon: React.ComponentType<any>; color: string }; 
  index: number 
}> = ({ skill, index }) => {
  const IconComponent = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group cursor-pointer"
    >
      <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500">
        <motion.div
          className="mb-3"
          whileHover={{ rotate: 12, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <IconComponent size={40} />
        </motion.div>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
          {skill.name}
        </span>
        <motion.div
          className="w-full h-1 rounded-full mt-2"
          style={{ backgroundColor: skill.color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

export const HomePage: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show back to top when scrolled past 80% of first screen
      setShowBackToTop(scrolled > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll functions
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const scrollToContent = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({ 
      top: windowHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <SEOHead seo={pageSEO.home} />
      
      {/* Modern Glassmorphism Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:via-teal-900 dark:to-purple-900">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgb(59 130 246 / 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgb(16 185 129 / 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgb(139 92 246 / 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgb(59 130 246 / 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        
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
                y: [-10, 10, -10],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg">
                <IconComponent size={32} />
              </div>
            </motion.div>
          );
        })}
        
        {/* Floating background elements */}
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
                scale: [item.scale * 0.8, item.scale * 1.2, item.scale * 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconComponent size={24} />
            </motion.div>
          );
        })}
        
        {/* Main content with glassmorphism card - All content now contained within */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                  Hi, I'm{' '}
                  <motion.span
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-400 dark:via-teal-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Tim DeHof
                    </span>
                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-400 dark:via-teal-400 dark:to-purple-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                  </motion.span>
                </motion.h1>
                
                {/* Enhanced tagline with glassmorphism */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="max-w-3xl mx-auto mb-6 sm:mb-8"
                >
                  <div className="backdrop-blur-sm bg-white/20 dark:bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 dark:border-white/20">
                    <TextGenerateEffect 
                      words="Transforming Your Business Challenges into Powerful Web Applications"
                     className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium text-center flex items-center justify-center leading-relaxed"
                    />
                  </div>
                </motion.div>
                
                {/* Action buttons with enhanced styling */}
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
                
                {/* Social proof indicators */}
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
        
        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: showBackToTop ? 0 : 1, 
            y: showBackToTop ? 10 : 0,
            pointerEvents: showBackToTop ? 'none' : 'auto'
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
          aria-label="Scroll to content"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 dark:border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/10 dark:bg-white/5 group-hover:border-white/60 dark:group-hover:border-white/50 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-all duration-300"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/60 dark:bg-white/50 rounded-full mt-2 group-hover:bg-white/80 dark:group-hover:bg-white/70 transition-all duration-300"
            />
          </motion.div>
          
          {/* Tooltip for scroll indicator */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-sm">
            Scroll to explore
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/90 dark:border-t-gray-100/90"></div>
          </div>
        </motion.button>

        {/* Back to Top Button - Fixed Position */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-600 dark:border-blue-500 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 touch-manipulation"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: showBackToTop ? 1 : 0,
            scale: showBackToTop ? 1 : 0,
            y: showBackToTop ? 0 : 20,
            pointerEvents: showBackToTop ? 'auto' : 'none'
          }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.div>
          
          {/* Tooltip for back to top */}
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-sm">
            Back to top
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900/90 dark:border-t-gray-100/90"></div>
          </div>
        </motion.button>
      </section>

      {/* Enhanced Technical Expertise Section with accessible colors */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 via-teal-800 to-purple-800 dark:from-gray-100 dark:via-blue-400 dark:via-teal-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                Technical Expertise
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Combining engineering precision with modern web development technologies 
                to build scalable, efficient, and user-focused applications.
              </p>
            </motion.div>
          </div>
          
          <div className="space-y-16">
            {technicalSkills.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Category Header */}
                <div className="text-center mb-10">
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 text-white shadow-xl bg-gradient-to-br ${category.color}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {category.category}
                  </h3>
                  
                  {/* Static decorative element with accessible colors */}
                  <TechDecorator color={category.color} />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                    />
                  ))}
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-5 bg-gradient-to-br from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 -z-10" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-5 bg-gradient-to-br from-teal-600 to-purple-600 dark:from-teal-400 dark:to-purple-400 -z-10" />
              </motion.div>
            ))}
          </div>

          {/* Skills Summary with accessible colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl rounded-3xl overflow-hidden max-w-4xl mx-auto">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Why These Technologies?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Modern Frontend</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">React and TypeScript provide type safety and component reusability for scalable applications.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Robust Backend</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Node.js ecosystem with reliable databases ensures fast development and data integrity.</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Wrench className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Professional Tools</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Industry-standard tools for version control, deployment, and design collaboration.</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 hover:from-blue-800 hover:via-teal-800 hover:to-purple-800 dark:from-blue-600 dark:via-teal-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:via-teal-700 dark:hover:to-purple-700 text-white">
              <Link to="/about">
                <Palette className="mr-2 h-4 w-4" />
                Explore My Full Skill Set
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features Section with accessible colors */}
      <AnimatedSection className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 dark:from-slate-800 dark:via-blue-900/20 dark:to-teal-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700 mb-6">
                💼 Professional Services
              </span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 dark:from-gray-100 dark:via-blue-400 dark:to-teal-400 bg-clip-text text-transparent mb-6">
                How I Help Your Business Succeed
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From concept to deployment, I provide comprehensive web development services 
                that transform your business ideas into powerful, user-friendly applications.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className={`h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${service.bgColor} ${service.borderColor} border-2 overflow-hidden`}>
                  <CardContent className="p-8 relative">
                    {/* Background decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Icon with enhanced styling */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative z-10`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    