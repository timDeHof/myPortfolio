import { m } from "framer-motion";

import { skillCategories } from "@/data/about-data";

import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { SkillCard } from "./skill-card";

interface SkillsSectionProps {
  shouldReduceMotion: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ shouldReduceMotion }) => {
  return (
    <MaxWidthWrapper>
      <div className="text-center mb-16">
        <m.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive toolkit combining engineering precision with modern web development
            expertise to build exceptional digital experiences.
          </p>
        </m.div>
      </div>

      <div className="space-y-16">
        {skillCategories.map((category, categoryIndex) => (
          <m.div
            key={category.category}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Category Header */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl">
                  <category.icon size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {category.category}
                </h3>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={skillIndex}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>

          </m.div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};
