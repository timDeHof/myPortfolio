import { m } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

import { coreValues } from "@/data/about-data";

import { AnimatedSection } from "../common/animated-section";
import { Card, CardContent } from "../ui/card";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

interface StorySectionProps {
  shouldReduceMotion: boolean;
}

export const StorySection: React.FC<StorySectionProps> = ({ shouldReduceMotion }) => {
  return (
    <AnimatedSection className="py-20 bg-background">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">My Journey</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                With a background in mechanical engineering and 3D printing, I discovered my passion
                for web development through the intersection of technology and problem-solving.
                This unique combination gives me a distinctive perspective on building efficient,
                scalable solutions.
              </p>
              <p>
                My engineering background taught me the importance of precision, efficiency, and
                systematic thinking, qualities I now apply to every line of code I write. I'm
                passionate about creating web applications that not only look great but also
                perform exceptionally well.
              </p>
              <p>
                I believe in continuous learning and staying up-to-date with the latest technologies
                and best practices. This commitment to growth allows me to deliver cutting-edge
                solutions that meet modern web standards.
              </p>
              <p>
                I regularly share my thoughts on development, engineering insights, and lessons learned
                on my
                {" "}
                <a
                  href="https://blog.timdehof.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-secondary/80 underline inline-flex items-center"
                >
                  blog
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
                , where I explore the intersection of engineering and web development.
              </p>
            </div>
          </div>
          <div className="relative">
            <Card className="bg-muted border overflow-hidden relative">
              <CardContent className="p-8 relative">
                <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  Core Values
                </h3>

                {/* Hybrid Layout - 2x2 grid with magazine styling */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coreValues.map((value, index) => (
                    <m.div
                      key={value.title}
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
                    >
                      {/* Card container with hover effects */}
                      <div className="group relative bg-card/60 rounded-2xl p-5 border border hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden h-full">

                        {/* Background gradient that appears on hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${value.gradient} -z-10`} />

                        <div className="flex items-start gap-4">
                          {/* Large icon with glow effect */}
                          <div className="relative flex-shrink-0">
                            <div className={`absolute inset-0 ${value.gradient} rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity`} />
                            <div className={`relative w-14 h-14 rounded-xl ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                              <value.icon className="w-7 h-7 text-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-foreground mb-1 group-hover:text-white dark:group-hover:text-white transition-colors">
                              {value.title}
                            </h4>
                            <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full ${value.gradient} transition-all duration-500 rounded-br-xl`} />
                      </div>
                    </m.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </AnimatedSection>
  );
};
