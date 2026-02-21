import { m } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Coffee,
  Lightbulb,
  Palette,
  Rocket,
  Target,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { AnimatedSection } from "../common/animated-section";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

const services = [
  {
    id: 1,
    icon: <Code className="h-8 w-8" />,
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern technologies and best practices.",
    color: "from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400",
    benefits: [
      "Custom React/TypeScript applications",
      "Scalable Node.js backend architecture",
      "Database design & optimization",
      "RESTful API development",
      "Third-party integrations",
    ],
    process: [
      "Requirements analysis",
      "Technical architecture",
      "Development & testing",
      "Deployment & monitoring",
    ],
  },
  {
    id: 2,
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design & Development",
    description: "Creating intuitive, accessible, and visually appealing user interfaces that users love.",
    color: "from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400",
    benefits: [
      "Responsive design for all devices",
      "WCAG AA accessibility compliance",
      "Modern design systems",
      "User experience optimization",
      "Performance-focused implementation",
    ],
    process: [
      "User research & wireframes",
      "Design system creation",
      "Interactive prototyping",
      "Development & testing",
    ],
  },
  {
    id: 3,
    icon: <Zap className="h-8 w-8" />,
    title: "Performance Optimization",
    description: "Enhancing application speed, efficiency, and user experience through optimization.",
    color: "from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400",
    benefits: [
      "Core Web Vitals optimization",
      "SEO-friendly architecture",
      "Efficient caching strategies",
      "Bundle size optimization",
      "Continuous performance monitoring",
    ],
    process: [
      "Performance audit",
      "Optimization strategy",
      "Implementation & testing",
      "Monitoring & maintenance",
    ],
  },
];

const philosophy = [
  {
    phase: "01",
    title: "Discovery",
    description: "Understanding your business goals, target audience, and technical requirements",
    icon: <Target className="h-6 w-6" />,
    color: "bg-blue-700 dark:bg-blue-600",
  },
  {
    phase: "02",
    title: "Design",
    description: "Creating user-centered designs and technical architecture for optimal results",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "bg-purple-700 dark:bg-purple-600",
  },
  {
    phase: "03",
    title: "Development",
    description: "Building your solution with clean, maintainable code and modern best practices",
    icon: <Code className="h-6 w-6" />,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    phase: "04",
    title: "Deployment",
    description: "Launching your application with proper testing, monitoring, and ongoing support",
    icon: <Rocket className="h-6 w-6" />,
    color: "bg-orange-700 dark:bg-orange-600",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <AnimatedSection
      id="services-section"
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 dark:from-slate-800 dark:via-blue-900/30 dark:to-teal-900/30"
    >
      {/* Section Header */}
      <MaxWidthWrapper>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-teal-500 dark:from-white dark:via-blue-300 dark:to-teal-400 bg-clip-text text-transparent mb-6">
            What I Do Best
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Combining engineering precision with creative problem-solving to deliver
            exceptional web solutions that drive business growth.
          </p>
        </m.div>
      </MaxWidthWrapper>

      {/* Services Grid */}
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group h-full"
              >
                <Card className="h-full bg-white dark:bg-slate-800 hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-slate-600 rounded-2xl overflow-hidden">
                  <CardContent className="p-8 h-full relative">
                    {/* Service Icon & Header */}
                    <m.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      whileHover={{ scale: 1.2, rotate: 12 }}
                    >
                      {service.icon}
                    </m.div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>

                    {/* Benefits list */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">What You Get:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <m.li
                            key={benefit}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: (index * 0.2) + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="flex items-center text-gray-700 dark:text-gray-300"
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </m.li>
                        ))}
                      </ul>
                    </div>

                    {/* Process steps */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Process:</h4>
                      <div className="space-y-2">
                        {service.process.map((step, i) => (
                          <m.div
                            key={step}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: (index * 0.2) + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="flex items-center"
                          >
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-sm mr-3 font-bold`}>
                              {i + 1}
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                          </m.div>
                        ))}
                      </div>
                    </div>

                    {/* Hidden CTA that reveals on hover */}
                    <m.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100"
                    >
                      <Button
                        asChild
                        size="sm"
                        className={`w-full bg-gradient-to-r ${service.color} text-white hover:shadow-lg transition-all duration-300`}
                      >
                        <Link to="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </m.div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
        </div>
      </MaxWidthWrapper>

      {/* Development Philosophy Section */}
      <MaxWidthWrapper>
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              My Development Philosophy
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A systematic approach to creating exceptional web experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((phase, index) => (
              <m.div
                key={phase.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                <Card className="h-full bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-slate-600">
                  <CardContent className="p-6 text-center relative">
                    {/* Connecting line (hidden on last item) */}
                    {index < philosophy.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600 dark:to-transparent transform -translate-y-1/2 z-10" />
                    )}

                    {/* Phase number */}
                    <m.div
                      className={`w-12 h-12 ${phase.color} text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 8 }}
                    >
                      {phase.phase}
                    </m.div>

                    {/* Phase icon overlay */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {phase.icon}
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {phase.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{phase.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </m.div>
      </MaxWidthWrapper>

      {/* Value Proposition & CTA */}
      <MaxWidthWrapper>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-purple-900/20 border-gray-200 dark:border-slate-600">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Ready to Build Something Amazing?
              </h3>

              {/* Value metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <m.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Custom Solutions</div>
                </m.div>
                <m.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-teal-900 to-emerald-700 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                    &lt;24h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Response Time</div>
                </m.div>
                <m.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-900 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                    3+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Years Engineering + Development</div>
                </m.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <m.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 hover:from-blue-800 hover:via-teal-800 hover:to-purple-800 text-white">
                    <Link to="/contact">
                      <Coffee className="mr-2 h-4 w-4" />
                      Start Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </m.div>
                <m.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Link to="/services">
                      <Users className="mr-2 h-4 w-4" />
                      View All Services
                    </Link>
                  </Button>
                </m.div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
