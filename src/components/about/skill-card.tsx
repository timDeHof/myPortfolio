import { m } from "framer-motion";

import type { Skill } from "@/types/about";

import { Card, CardContent } from "../ui/card";

interface SkillCardProps {
  skill: Skill;
  index: number;
  shouldReduceMotion: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index, shouldReduceMotion }) => {
  const IconComponent = skill.icon;

  return (
    <m.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full bg-card border rounded-lg">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg shrink-0">
              <IconComponent size={20} className="text-foreground" />
            </div>
            <h4 className="text-sm font-medium text-foreground">
              {skill.name}
            </h4>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
};
