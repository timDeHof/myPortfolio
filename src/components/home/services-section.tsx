import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Palette,
  Zap,
} from "lucide-react";
import React from "react";
import { Link } from "@tanstack/react-router";

import { AnimatedSection } from "../common/animated-section";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

const services = [
  {
    id: 1,
    icon: <Code className="h-6 w-6" />,
    title: "Full-Stack Development",
    description: "Building web apps from frontend to backend. React, Node.js, databases, the whole thing.",
    featured: true,
  },
  {
    id: 2,
    icon: <Palette className="h-6 w-6" />,
    title: "UI/UX Design & Development",
    description: "Interfaces that actually work for your users, not just ones that look good in screenshots.",
    featured: false,
  },
  {
    id: 3,
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Optimization",
    description: "Making your existing app faster. Better Core Web Vitals, quicker load times, happier users.",
    featured: false,
  },
];

export const ServicesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedSection
      id="services-section"
      className="py-20 bg-muted"
    >
      {/* Section Header */}
      <MaxWidthWrapper>
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What I Do Best
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            From concept to deployment, full-stack web development with a focus on
            code you'll actually want to maintain.
          </p>
        </m.div>
      </MaxWidthWrapper>

      {/* Asymmetric 1+2 Services Grid */}
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Featured service: Full-Stack Development */}
          {services
            .filter(s => s.featured)
            .map((service, index) => (
              <m.div
                key={service.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border rounded-xl">
                  <CardContent className="p-8 h-full bg-card rounded-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}

          {/* Secondary services stack */}
          <div className="flex flex-col gap-6">
            {services
              .filter(s => !s.featured)
              .map((service, index) => (
                <m.div
                  key={service.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.15 }}
                  viewport={{ once: true }}
                  className="group h-full"
                >
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border rounded-xl">
                    <CardContent className="p-6 h-full bg-card rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg shrink-0">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Value Proposition & CTA */}
      <MaxWidthWrapper>
        <m.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-sm border rounded-xl">
            <CardContent className="p-8 md:p-10 bg-card rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    Let's Work Together
                  </h3>
                  <p className="text-muted-foreground">
                    Have a project in mind? I'd love to hear about it.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button asChild size="lg">
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/services">
                      View All Services
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
