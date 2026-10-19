import type { Testimonial } from "@hooks/use-testimonials";

import { useTestimonials } from "@hooks/use-testimonials";

import { LINK_CLASS } from "@/lib/link-class";

import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="grid content-start gap-4 border-t-2 border-teal-700 pt-[18px] dark:border-teal-400">
      <blockquote>
        <p className="max-w-[52ch] text-foreground">
          "
          {testimonial.quote}
          "
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div className="grid gap-0.5 text-sm">
          <span className="font-semibold text-foreground">{testimonial.name}</span>
          <span className="text-muted-foreground">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </span>
          {testimonial.linkedinUrl && (
            <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              View on LinkedIn
              {" "}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  const { data: testimonials, isLoading, isError } = useTestimonials();

  if (isError) {
    return null;
  }

  if (isLoading || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="testimonials-heading" className="border-b border-border py-14 md:py-18">
      <MaxWidthWrapper>
        <h2 id="testimonials-heading" className="mb-3 text-[clamp(1.6rem,3.2vw,2.1rem)] font-bold text-foreground">What People Say</h2>
        <p className="mb-9 max-w-[51ch] text-muted-foreground">Recommendations from colleagues and collaborators</p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Testimonials;
