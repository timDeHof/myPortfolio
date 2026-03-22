import { m } from "framer-motion";
import { ArrowRight, CheckCircle, Code, Cpu, Globe, Palette, Shield, Target, Users, Wrench, Zap } from "lucide-react";
import React from "react";

import { AnimatedSection } from "../components/common/animated-section";
import { SEOHead } from "../components/common/seo-head";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MaxWidthWrapper } from "../components/ui/max-width-wrapper";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { pageSEO } from "../utils/seo";

const serviceIcons = {
  "Experience": <Users className="size-8" />,
  "Cutting-edge Technologies": <Cpu className="size-8"/>,
  "Web Development": <Code className="size-8" />,
};

const additionalServices = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Responsive Design",
    description: "Sites that work on every device—from phones to desktops.",
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Security & Performance",
    description: "Built-in security, fast load times, and solid SEO foundations.",
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Consulting",
    description: "Help making your interface intuitive and your users happy.",
    color: "bg-teal-700 dark:bg-teal-600",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your needs and project requirements",
    icon: <Target />,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    step: "02",
    title: "Planning",
    description: "Creating detailed project roadmap and timeline",
    icon: <Code />,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    step: "03",
    title: "Development",
    description: "Building your solution with clean, maintainable code",
    icon: <Wrench />,
    color: "bg-teal-700 dark:bg-teal-600",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Testing, deployment, and ongoing support",
    icon: <CheckCircle />,
    color: "bg-teal-700 dark:bg-teal-600",
  },
];

export const ServicesPage: React.FC = () => {
  const { data: portfolioData, isLoading } = usePortfolioData();
  const services = portfolioData?.services || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead seo={pageSEO.services} />

      {/* Hero Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <MaxWidthWrapper>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Services & Expertise
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              I build fast, maintainable web applications—from React frontends to Node.js backends.
              Code you'll actually want to maintain later.
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
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="h-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-700 dark:bg-teal-600 text-white rounded-full mb-6 group-hover:scale-105 transition-transform duration-300">
                      {serviceIcons[service.title as keyof typeof serviceIcons]}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {service.title}
                    </h3>

                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      {service.paragraphs.map(paragraph => (
                        <p key={paragraph} className="text-base leading-relaxed">
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
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center bg-white dark:bg-slate-900 rounded-2xl">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${service.color} text-white rounded-full mb-4 group-hover:scale-105 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Process Section - Horizontal 1x4 Grid */}
      <AnimatedSection className="py-20 bg-slate-50 dark:bg-slate-800">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How I Work
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A straightforward approach to turning your ideas into working software.
            </p>
          </div>

          {/* Process Grid - 1x4 horizontal on desktop, stacked on mobile */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 relative">
              {processSteps.map((phase, index) => (
                <m.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Process Card */}
                  <m.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Connecting line segment - left */}
                    {index > 0 && (
                      <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-transparent to-teal-300 dark:to-teal-600 z-10" />
                    )}

                    {/* Connecting line segment - right */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-gradient-to-l from-transparent to-teal-300 dark:to-teal-600 z-10" />
                    )}

                    {/* Large faded number in background */}
                    <div className="absolute -right-2 -bottom-2 text-7xl lg:text-8xl font-bold text-teal-100 dark:text-teal-900/30 select-none pointer-events-none opacity-50 group-hover:opacity-60 transition-opacity duration-300">
                      {phase.step}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Numbered Circle Icon */}
                      <m.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: index * 0.1 + 0.2,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className={`w-14 h-14 lg:w-16 lg:h-16 ${phase.color} rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-4`}
                      >
                        <div className="text-white flex flex-col items-center">
                          <span className="text-xs font-bold opacity-80">{phase.step}</span>
                          <span className="w-6 h-6 lg:w-7 lg:h-7 -mt-1">
                            {phase.icon}
                          </span>
                        </div>
                      </m.div>

                      {/* Text Content */}
                      <div>
                        <h3 className="text-xl lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
                          {phase.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>

                    {/* Subtle accent line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </m.div>
                </m.div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedSection>

      {/* Technologies Showcase */}
      <AnimatedSection className="py-20 bg-white dark:bg-slate-900">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Technologies I Work With
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Tools I've used to ship real projects—not just tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md">
                <CardContent className="p-6 bg-white dark:bg-slate-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-teal-700 dark:text-teal-400" />
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
                    <Wrench className="h-5 w-5 mr-2 text-teal-700 dark:text-teal-400" />
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
      <AnimatedSection className="py-20 bg-teal-700 dark:bg-teal-800 text-white">
        <MaxWidthWrapper className="text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
              Got a project in mind? I'd love to hear about it. Send me a message
              and let's see if we're a good fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-teal-700 hover:bg-gray-100">
                <a href="/contact">
                  Send a Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-teal-500 text-white hover:bg-teal-600">
                <a href="/projects">
                  See My Work
                </a>
              </Button>
            </div>
          </m.div>
        </MaxWidthWrapper>
      </AnimatedSection>
    </>
  );
};
