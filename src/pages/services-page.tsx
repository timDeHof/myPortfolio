import { m } from "framer-motion";
import { ArrowRight, CheckCircle, Code, Globe, Palette, Shield, Target, Users, Wrench, Zap } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { services } from "../data/services";
import { pageSEO } from "../utils/seo";

const serviceIcons = {
  "Experience": <Users className="h-8 w-8" />,
  "Cutting-edge Technologies": <Zap className="h-8 w-8" />,
  "Web Development": <Code className="h-8 w-8" />,
};

const additionalServices = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Responsive Design",
    description: "Creating websites that work perfectly on all devices and screen sizes.",
    color: "from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Security & Performance",
    description: "Implementing best practices for security, performance, and SEO optimization.",
    color: "from-teal-700 to-emerald-700 dark:from-teal-400 dark:to-emerald-400",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Consulting",
    description: "Providing guidance on user experience and interface design decisions.",
    color: "from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your needs and project requirements",
    icon: <Target className="h-6 w-6" />,
    color: "bg-blue-700 dark:bg-blue-600",
  },
  {
    step: "02",
    title: "Planning",
    description: "Creating detailed project roadmap and timeline",
    icon: <Code className="h-6 w-6" />,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    step: "03",
    title: "Development",
    description: "Building your solution with modern best practices",
    icon: <Wrench className="h-6 w-6" />,
    color: "bg-purple-700 dark:bg-purple-600",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Testing, deployment, and ongoing support",
    icon: <CheckCircle className="h-6 w-6" />,
    color: "bg-orange-700 dark:bg-orange-600",
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead seo={pageSEO.services} />

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
              Services & Expertise
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive web development services combining technical expertise
              with creative problem-solving to deliver exceptional results.
            </p>
          </m.div>
        </MaxWidthWrapper>
      </section>

      {/* Main Services Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              What I Offer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Drawing from my unique background in engineering and web development
              to provide comprehensive solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="h-full bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-purple-900/20 border-gray-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <m.div
                      className={`inline-flex items-center justify-center w-16 h-16 ${
                        index === 0
                          ? "bg-gradient-to-br from-blue-700 to-cyan-700 dark:from-blue-500 dark:to-cyan-500"
                          : index === 1
                            ? "bg-gradient-to-br from-teal-700 to-emerald-700 dark:from-teal-500 dark:to-emerald-500"
                            : "bg-gradient-to-br from-purple-700 to-pink-700 dark:from-purple-500 dark:to-pink-500"
                      } text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 12 }}
                    >
                      {serviceIcons[service.title as keyof typeof serviceIcons]}
                    </m.div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {service.title}
                    </h3>

                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                      {service.paragraphs.map(paragraph => (
                        <p key={paragraph} className="text-sm leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Additional Services Section */}
      <AnimatedSection className="py-20 bg-gray-50 dark:bg-slate-800">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Specialized services to ensure your project meets the highest standards
              of quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600">
                  <CardContent className="p-6 text-center">
                    <m.div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.color} text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 8 }}
                    >
                      {service.icon}
                    </m.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              My Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A systematic approach to delivering high-quality results on time and within budget.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((phase, index) => (
                <m.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <m.div
                      className={`w-16 h-16 ${phase.color} text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: 8 }}
                    >
                      {phase.step}
                    </m.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {phase.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{phase.description}</p>
                </m.div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Technologies Showcase */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50 dark:from-slate-800 dark:via-teal-900/30 dark:to-blue-900">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Technologies I Work With
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Modern tools and frameworks to build scalable, efficient, and maintainable applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-blue-700 dark:text-blue-400" />
                    Frontend
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>• React & TypeScript</div>
                    <div>• Next.js & Tailwind CSS</div>
                    <div>• Framer Motion</div>
                    <div>• Responsive Design</div>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-teal-700 dark:text-teal-400" />
                    Backend
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>• Node.js & Express</div>
                    <div>• PostgreSQL & MongoDB</div>
                    <div>• REST APIs & GraphQL</div>
                    <div>• Authentication & Security</div>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Wrench className="h-5 w-5 mr-2 text-purple-700 dark:text-purple-400" />
                    DevOps
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>• Docker & AWS</div>
                    <div>• CI/CD Pipelines</div>
                    <div>• Git & Version Control</div>
                    <div>• Performance Monitoring</div>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-600 dark:via-teal-600 dark:to-purple-600 text-white">
        <MaxWidthWrapper className="text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your vision and create something amazing together.
              I'm here to help bring your ideas to life with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-teal-700 hover:bg-gray-100">
                <a href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-teal-700">
                <a href="/projects">
                  View My Work
                </a>
              </Button>
            </div>
          </m.div>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};
