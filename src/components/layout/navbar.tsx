import { AnimatePresence, m } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CodeXml, Download, Menu, Moon, Sun, X } from "lucide-react";

import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { usePortfolioData } from "@hooks/usePortfolioData";
import { useTheme } from "@hooks/use-theme";
import { env } from "@/lib/env";
import { DEFAULT_NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { data: portfolioData } = usePortfolioData();
  const { effectiveTheme, toggleTheme } = useTheme();
  const navItems = portfolioData?.navigation?.navItems || DEFAULT_NAV_ITEMS;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const mousedownHandler = (e: MouseEvent) => {
      if (isOpen && mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("mousedown", mousedownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("mousedown", mousedownHandler);
    };
  }, [isOpen]);

  // Helper to check if a path is active (for styling - uses prefix match)
  const isPathActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Helper for exact path match (for aria-current accessibility)
  const isExactPath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    // Check exact match or match with trailing slash
    return location.pathname === path || location.pathname === path + "/";
  };

  return (
    <header role="banner" className="navbar">
      <MaxWidthWrapper>
        <div className="inner">
          <div className="left">
          <Link
            to="/"
            preload="intent"
            className="brand"
            >
            <CodeXml className="logo" />
            <span className="name brand-gradient">
              Tim DeHof
              </span>
          </Link>
            </div>
          <nav aria-label="Primary" className="links">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                preload="intent"
                className={isPathActive(item.href) ? "is-selected" : "not-selected"}
                aria-current={isExactPath(item.href) ? "page" : undefined}
              >
                {item.name}
                {isPathActive(item.href) && (
                  <m.div
                    layoutId="activeTab"
                    className="link-select"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
              </nav>
          <div className="right hidden md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="not-selected flex items-center justify-center min-w-[44px] min-h-[44px] -ml-2"
              aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} mode`}
            >
              {effectiveTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            {env.VITE_RESUME_URL && (
              <a
                href={env.VITE_RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="not-selected flex items-center gap-1"
                >
                <Download size={16} aria-hidden="true" />
                <span>Resume</span>
              </a>
            )}
            </div>

          <div className="mobile">
            <button
              type="button"
              onClick={toggleMenu}
              className="toggle-menu min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
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
              className="mobile-menu"
              id="mobile-menu"
              ref={mobileNavRef}
            >
              <m.div
                className="mobile-content"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                <nav aria-label="Mobile navigation">
                {navItems.map(item => (
                  <m.div
                    key={item.href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link
                      to={item.href}
                      preload="intent"
                      onClick={() => setIsOpen(false)}
                      className={isPathActive(item.href) ? "is-selected" : "not-selected"}
                      aria-current={isPathActive(item.href) ? "page" : undefined}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </m.div>
                ))}
                </nav>
                <m.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }}
                    className="not-selected flex items-center gap-1 w-full"
                  >
                    {effectiveTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{effectiveTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                </m.div>
                {env.VITE_RESUME_URL && (
                  <m.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <a
                      href={env.VITE_RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="not-selected flex items-center gap-1"
                    >
                      <Download size={16} aria-hidden="true" />
                      <span>Resume</span>
                    </a>
                  </m.div>
                )}
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </MaxWidthWrapper>
    </header>
  );
}
