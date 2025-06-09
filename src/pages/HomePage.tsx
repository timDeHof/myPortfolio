import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, Wrench } from 'lucide-react';
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

const features = [
  {
    icon: <Code className="h-8 w-8" />,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development with modern technologies.',
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging user interfaces that delight users.',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Performance Optimization',
    description: 'Building fast, efficient applications with cutting-edge optimization techniques.',
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
  return (
    <>
      <SEOHead seo={pageSEO.home} />
      
      {/* Hero Section - Clean and Light */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-100/50" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-400 dark:via-teal-400 dark:to-purple-400 bg-clip-text text-transparent">
                Tim DeHof
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto mb-8">
              <TextGenerateEffect 
                words="Full-Stack Developer & Engineer crafting innovative web solutions with modern technologies and best practices."
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                <Link to="/projects">
                  <Code className="mr-2 h-4 w-4" />
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-teal-700 dark:border-teal-400 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
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
      <AnimatedSection className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              I specialize in creating modern, efficient, and user-friendly web applications
              that solve real-world problems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${
                      index === 0 ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400' :
                      index === 1 ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400' :
                      'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400'
                    } rounded-full mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* About Section with accessible colors */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                From Engineering to Code
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  With a background in mechanical engineering and 3D printing, I bring a unique 
                  perspective to web development. This combination of technical precision and 
                  creative problem-solving helps me build efficient, scalable solutions.
                </p>
                <p>
                  My engineering experience taught me the importance of systematic thinking, 
                  attention to detail, and optimization—qualities I now apply to every line 
                  of code I write.
                </p>
                <p>
                  I'm passionate about continuous learning and staying current with the latest 
                  technologies and best practices in the ever-evolving world of web development.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
                  <Link to="/about">
                    Learn More About Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-purple-900/20 border-0">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Core Strengths</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-700 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">Full-stack web application development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-teal-700 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">Modern React and TypeScript expertise</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-teal-700 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">Backend development with Node.js</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-teal-700 dark:bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">Database design and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-700 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">Engineering-driven problem solving</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section with accessible colors */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-600 dark:via-teal-600 dark:to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your next project and bring your ideas to life with modern web technologies.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-white text-teal-700 hover:bg-gray-100">
            <Link to="/contact">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
};