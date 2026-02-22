import { ArrowUpIcon, ExternalLink, GithubIcon, LinkedinIcon, TwitterIcon, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { Separator } from "../ui/separator";
import { navItems, footerLinks } from "@/config/navigation";
import { Link } from "react-router-dom";

const socialIconMap = {
  GitHub: <GithubIcon className="h-6 w-6" />,
  LinkedIn: <LinkedinIcon className="h-6 w-6" />,
  Twitter: <TwitterIcon className="h-6 w-6" />,
};

// Footer Component
export function Footer() {
  const scrollToTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <footer className="footer">
      <MaxWidthWrapper>
        <div className="inner">
          <div className="footer-grid">
            <div className="left">
              <h3>Tim DeHof</h3>
              <p>Full-stack developer passionate about creating innovative web solutions with modern technologies and best practices.
              </p>
              <div className="actions">
                <a
                  href="https://blog.timdehof.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read my blog
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="center">
              <h3>Quick Links</h3>
              <div className="links">
                {navItems.map(link => (
                  <Link key={link.href} to={link.href}>{link.name}</Link>
                ))}
              </div>
            </div>

            <div className="right">
              <h3>Get In Touch</h3>
              <p>Ready to work together?<br />
              Let's discuss your next project.</p>
              <div className="contacts">
              <Button variant="outline" size="lg" asChild className="cta">
                <Link to="/contact">
                  <Mail className="h-5 w-5" />
                  Get In Touch
                </Link>
              </Button>
                <div className="socials">
                  {footerLinks.social.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      {socialIconMap[link.name as keyof typeof socialIconMap]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator className="separator" />

          <div className="bottom">
            <p className="copyright">
              ©
              {" "}
              {new Date().getFullYear()}
              {" "}
              Tim DeHof. All rights reserved.
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top"
              aria-label="Back to top"
            >
              <ArrowUpIcon className="back-to-top-icon" />
              <span className="back-to-top-txt">Back to top</span>
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
