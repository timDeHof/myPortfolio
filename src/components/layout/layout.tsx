import { AnimatePresence, m } from "framer-motion";
import { ArrowUpIcon, ExternalLink, GithubIcon, LinkedinIcon, Menu, TwitterIcon, X } from "lucide-react";
import React, { Suspense, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { navItems, footerLinks } from "@/config/navigation";
import { LoadingSpinner } from "../common/loading-spinner";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { Separator } from "../ui/separator";

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-800 via-blue-600 to-purple-600 dark:from-blue-300 dark:via-teal-300 dark:to-purple-400 bg-clip-text text-transparent hover:from-indigo-900 hover:via-blue-700 hover:to-purple-700 dark:hover:from-blue-200 dark:hover:via-teal-200 dark:hover:to-purple-300 transition-all"
          >
            Tim DeHof
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${location.pathname === item.href
                  ? "text-teal-700 dark:text-teal-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400"
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <m.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 dark:bg-teal-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-2">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg ${location.pathname === item.href
                      ? "text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </MaxWidthWrapper>
    </nav>
  );
}

const socialIconMap = {
  GitHub: <GithubIcon className="h-6 w-6" />,
  LinkedIn: <LinkedinIcon className="h-6 w-6" />,
  Twitter: <TwitterIcon className="h-6 w-6" />,
};

// Footer Component
function Footer() {
  const scrollToTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white pt-16 pb-8">
      <MaxWidthWrapper>
        <div className="mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-teal-300 to-purple-400 bg-clip-text text-transparent">
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

            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-y-3">
                {navItems.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-gray-300 hover:text-teal-400 transition-all duration-300 py-3 px-4 md:py-2 md:px-0 rounded-xl md:rounded-none hover:bg-gray-800 md:hover:bg-transparent text-center md:text-left font-medium hover:translate-x-1 md:hover:translate-x-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

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
                  {footerLinks.social.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="text-gray-300 hover:text-teal-400 transition-all duration-300 p-3 hover:bg-gray-800 rounded-xl hover:scale-110"
                    >
                      {socialIconMap[link.name as keyof typeof socialIconMap]}
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
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <Suspense fallback={<div className="h-full flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
