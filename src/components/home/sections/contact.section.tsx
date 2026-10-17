import { Button } from "../../ui/button";
import { MaxWidthWrapper } from "../../ui/max-width-wrapper";

interface ProfileLink {
  label: string;
  href: string;
}

const PROFILES: ProfileLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tim-dehof/" },
  { label: "GitHub", href: "https://github.com/timDeHof" },
];

// Shared with the About page (A6)
function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-14 md:py-18">
      <MaxWidthWrapper>
        <div className="grid gap-5">
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-teal-700 dark:text-teal-400">Contact</p>
          <h2 id="contact-heading" className="text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold text-foreground">Hiring a frontend or full-stack engineer?</h2>
          <p className="max-w-[56ch] text-muted-foreground">
            I'm looking for a team where engineering judgment matters as much as output. The fastest way to reach me is email.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent">
              <a href="mailto:tim@timdehof.dev">Email me</a>
            </Button>
            {PROFILES.map(profile => (
              <Button key={profile.href} asChild variant="line">
                <a href={profile.href} target="_blank" rel="noopener noreferrer">{profile.label}</a>
              </Button>
            ))}
          </div>

          {/* Jokma referral line (P2), hidden for now
          <p className="max-w-[640px] border-t border-dashed border-border pt-[18px] text-sm text-muted-foreground">
            Need a website or app for your business? I take contract work through
            {" "}
            <a href="https://jokma.com" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline dark:text-teal-400">Jokma Web Solutions</a>
            .
          </p>
          */}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Contact;
