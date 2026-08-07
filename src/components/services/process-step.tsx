import { m } from "framer-motion";
import React from "react";

interface ProcessStepProps {
  title: string;
  description: string;
  shouldReduceMotion: boolean;
  index: number;
}

/** Process step */
export const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  description,
  shouldReduceMotion,
  index,
}) => (
  <m.div
    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex gap-4"
  >
    <div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  </m.div>
);

export const processSteps = [
  {
    title: "Discovery",
    description:
      "We talk through your goals, constraints, and users. I ask hard questions before writing a line of code.",
  },
  {
    title: "Architecture",
    description:
      "Technical decisions documented upfront — stack choices, data models, API contracts. No surprises later.",
  },
  {
    title: "Build & Iterate",
    description:
      "Working software in short cycles. You see progress weekly, not monthly. Feedback shapes the next iteration.",
  },
  {
    title: "Ship & Support",
    description:
      "Deployment, monitoring, handoff. I don't disappear after launch — you get documentation and a contact who knows the code.",
  },
];
