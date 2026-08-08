import { Quote } from "lucide-react";
import React from "react";

import type { Testimonial } from "../../hooks/use-testimonials";

import { useTestimonials } from "../../hooks/use-testimonials";
import { AnimatedCard } from "../common/animated-card";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <AnimatedCard index={index}>
      <div className="mb-4 flex justify-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0072b1] shadow-lg">
          {testimonial.avatar
            ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )
            : (
                <Quote className="h-6 w-6 text-white" />
              )}
        </div>
      </div>

      <blockquote className="mb-6 flex-1">
        <p className="text-lg text-foreground italic">
          "
          {testimonial.quote}
          "
        </p>
      </blockquote>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-foreground">
          {testimonial.name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {testimonial.role}
          {testimonial.company && ` at ${testimonial.company}`}
        </p>
        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-sm text-secondary hover:text-secondary/80"
          >
            View on LinkedIn
            <svg
              className="ml-1 h-4 w-4"
              fill="#0072b1"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
      </div>
    </AnimatedCard>
  );
};

export const TestimonialsSection: React.FC = () => {
  const { data: testimonials, isLoading, isError } = useTestimonials();

  if (isError) {
    return null;
  }

  if (isLoading || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted">
      <MaxWidthWrapper>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            What People Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground">
            Recommendations from colleagues and collaborators
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
