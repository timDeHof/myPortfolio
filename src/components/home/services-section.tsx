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
    description: "Building web apps from frontend to backend—React, Node.js, databases, the whole thing.",
    color: "bg-teal-700 dark:bg-teal-600",
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
    description: "Interfaces that actually work for your users—not just ones that look good in screenshots.",
    color: "bg-teal-700 dark:bg-teal-600",
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
    description: "Making your existing app faster. Better Core Web Vitals, quicker load times, happier users.",
    color: "bg-teal-700 dark:bg-teal-600",
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
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    phase: "02",
    title: "Design",
    description: "Creating user-centered designs and technical architecture for optimal results",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "bg-teal-700 dark:bg-teal-600",
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
    color: "bg-teal-700 dark:bg-teal-600",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <AnimatedSection
      id="services-section"
      className="py-20 bg-slate-50 dark:bg-slate-800"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            What I Do Best
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From concept to deployment—full-stack web development with a focus on
            code you'll actually want to maintain.
          </p>
        </m.div>
      </MaxWidthWrapper>

      {/* Services Grid */}
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-600 rounded-2xl">
                  <CardContent className="p-8 h-full bg-white dark:bg-slate-700 rounded-2xl">
                    {/* Service Icon & Header */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${service.color} text-white rounded-xl mb-6 group-hover:scale-105 transition-transform duration-300`}>
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Benefits list */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">What You Get:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-center text-gray-700 dark:text-gray-300"
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process steps */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Process:</h4>
                      <div className="space-y-2">
                        {service.process.map((step, stepIndex) => (
                          <div
                            key={step}
                            className="flex items-center"
                          >
                            <div className={`w-6 h-6 rounded-full ${service.color} text-white flex items-center justify-center text-sm mr-3 font-bold`}>
                              {stepIndex + 1}
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="h-full shadow-md border border-gray-100 dark:border-slate-600 rounded-2xl">
                  <CardContent className="p-6 text-center bg-white dark:bg-slate-700 rounded-2xl h-full">
                    {/* Phase number */}
                    <div className={`w-12 h-12 ${phase.color} text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4`}>
                      {phase.phase}
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {phase.title}
                    </h4>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{phase.description}</p>
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
          <Card className="shadow-md border border-gray-100 dark:border-slate-600 rounded-2xl">
            <CardContent className="p-8 md:p-12 bg-white dark:bg-slate-700 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Let's Work Together
              </h3>

              {/* Value metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Custom Solutions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                    &lt;24h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                    3+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-teal-700 hover:bg-teal-800 text-white">
                  <Link to="/contact">
                    <Coffee className="mr-2 h-4 w-4" />
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-2">
                  <Link to="/services">
                    <Users className="mr-2 h-4 w-4" />
                    View All Services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
