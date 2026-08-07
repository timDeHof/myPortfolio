import { m } from "framer-motion";

import { timeline } from "@/data/about-data";

import { Card } from "../ui/card";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

interface TimelineSectionProps {
  shouldReduceMotion: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ shouldReduceMotion }) => {
  return (
    <>
      <MaxWidthWrapper className="relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Timeline
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            From mechanical engineering to full-stack development, a path of continuous learning and growth.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-200 via-teal-400 to-teal-200 dark:from-teal-800 dark:via-teal-600 dark:to-teal-800 rounded-full hidden md:block" />

          {/* Timeline items - alternating layout */}
          <div className="space-y-12 md:space-y-0">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <m.div
                  key={item.title}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} mb-8 md:mb-0`}>
                    <Card className="p-6 md:p-8 hover:shadow-2xl transition-all duration-500 bg-card border-0 md:border md:border shadow-lg hover:-translate-y-1">
                      {/* Year badge - hidden on mobile, shown from md up */}
                      <div className={`hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                        isLeft ? "bg-muted text-secondary" : "bg-muted text-primary"
                      }`}
                      >
                        <span className={`w-2 h-2 rounded-full bg-current ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                        {item.year}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      {/* Decorative gradient line */}
                      <div className={`h-1 w-12 rounded-full mt-6 ${isLeft ? "md:ml-auto" : ""} bg-secondary group-hover:w-24 transition-all duration-500`} />
                    </Card>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                    {/* Glowing dot on the timeline */}
                    <div className="relative">
                      <div className={`relative w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-2xl border-4 border-background group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={24} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Icon above card */}
                  <div className="flex md:hidden items-center gap-4 mb-4 w-full order-first">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      index % 2 === 0 ? "bg-muted text-secondary" : "bg-muted text-primary"
                    }`}
                    >
                      <span className={`w-2 h-2 rounded-full bg-current ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                      {item.year}
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};
