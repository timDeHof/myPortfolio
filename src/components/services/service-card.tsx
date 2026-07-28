import { AnimatePresence, m } from "framer-motion";
import { Check, ChevronDown, Code, Cpu, Users } from "lucide-react";
import React, { useState } from "react";

import type { ServiceCard as ServiceCardType } from "@/types/portfolio";

/**
 * Title mapping: overrides vague GitHub data titles with concrete deliverables.
 * Also adds deliverables, icon, and accent color per service.
 */
const serviceEnrichments: Record<
  string,
  {
    title: string;
    icon: React.ReactNode;
    accent: string;
    deliverables: string[];
  }
> = {
  "Experience": {
    title: "Engineering-Led Development",
    icon: <Users className="size-6" />,
    accent: "text-primary",
    deliverables: [
      "Technical architecture and system design",
      "Code reviews and team mentorship",
      "Performance audits and optimization",
      "CI/CD pipeline setup and DevOps",
    ],
  },
  "Cutting-edge Technologies": {
    title: "Modern Tech Stack Implementation",
    icon: <Cpu className="size-6" />,
    accent: "text-accent",
    deliverables: [
      "React / TypeScript frontends",
      "Node.js and serverless backends",
      "Database design and API development",
      "Cloud deployment (AWS, Vercel, Cloudflare)",
    ],
  },
  "Web Development": {
    title: "Full-Stack Web Applications",
    icon: <Code className="size-6" />,
    accent: "text-primary",
    deliverables: [
      "Responsive, accessible interfaces",
      "RESTful and GraphQL APIs",
      "Authentication and authorization",
      "Testing and documentation",
    ],
  },
};

/** Fallback for services not in the enrichment map. */
const defaultEnrichment = {
  icon: <Code className="size-6" />,
  accent: "text-blue-700 dark:text-blue-400",
  deliverables: [] as string[],
};

interface ServiceCardProps {
  service: ServiceCardType;
  index: number;
  shouldReduceMotion: boolean;
}

/** Expandable service card with deliverables checklist. */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  shouldReduceMotion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const enrichment = serviceEnrichments[service.title] ?? {
    title: service.title,
    ...defaultEnrichment,
  };

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        className={`border rounded-xl transition-colors duration-200 ${
          isOpen
            ? "border-primary/30 bg-card"
            : "border-border bg-card hover:border-primary/20"
        }`}
      >
        {/* Header — always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-start gap-4 p-6 text-left cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={`service-${service.id}-content`}
        >
          <div
            className={`flex items-center justify-center w-11 h-11 bg-primary/10 rounded-lg shrink-0 ${enrichment.accent}`}
          >
            {enrichment.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground">
              {enrichment.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {service.paragraphs[0]}
            </p>
          </div>
          <ChevronDown
            className={`size-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className="px-6 pb-6 pt-0"
                id={`service-${service.id}-content`}
              >
                <div className="border-t border-border pt-5">
                  {/* Full description */}
                  <div className="space-y-3 mb-5">
                    {service.paragraphs.map(paragraph => (
                      <p
                        key={paragraph}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Deliverables checklist */}
                  {enrichment.deliverables.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                        What you get
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {enrichment.deliverables.map(item => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <Check className="size-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
};
