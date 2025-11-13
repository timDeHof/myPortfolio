import { ArrowUpIcon, ExternalLink, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { Separator } from "../ui/separator";

const socialLinks = [
  {
    icon: <TwitterIcon className="h-6 w-6" />,
    href: "https://twitter.com/timdehof",
    label: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    icon: <LinkedinIcon className="h-6 w-6" />,
    href: "https://www.linkedin.com/in/timothy-dehof/",
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    icon: <GithubIcon className="h-6 w-6" />,
    href: "https://github.com/timDeHof",
    label: "GitHub",
    color: "hover:text-teal-400",
  },
];

const footerLinks = [
  { path: "/", label: "Home", color: "hover:text-blue-400" },
  { path: "/about", label: "About", color: "hover:text-teal-400" },
  { path: "/projects", label: "Projects", color: "hover:text-teal-400" },
  { path: "/services", label: "Services", color: "hover:text-purple-400" },
  { path: "/contact", label: "Contact", color: "hover:text-blue-400" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white pt-16 pb-8">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Tim DeHof
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Full-stack developer passionate about creating innovative web solutions
              with modern technologies and best practices.
            </p>
            <div className="mb-6">
              <a
                href="https://blog.timdehof.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center text-sm"
              >
                Read my blog
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>

          </div>

          {/* Quick Links - Enhanced Mobile Design */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>

            {/* Mobile: Enhanced grid layout */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-y-3">
              {footerLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-gray-300 ${link.color} transition-all duration-300 py-3 px-4 md:py-2 md:px-0 rounded-xl md:rounded-none hover:bg-gray-800 md:hover:bg-transparent text-center md:text-left font-medium hover:translate-x-1 md:hover:translate-x-2`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Get In Touch</h4>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ready to work together? Let's discuss your next project.
            </p>

            <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3 items-center">
              <Button asChild className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 hover:from-blue-800 hover:via-teal-800 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/contact">Contact Me</Link>
              </Button>
              <div className="flex justify-center md:justify-end w-full space-x-4">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`text-gray-300 ${link.color} transition-all duration-300 p-3 hover:bg-gray-800 rounded-xl hover:scale-110`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-gray-300 text-sm text-center md:text-left">
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            Tim DeHof. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-300 hover:text-teal-400 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-gray-800 group"
            aria-label="Back to top"
          >
            <ArrowUpIcon className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            <span className="text-sm">Back to top</span>
          </button>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
