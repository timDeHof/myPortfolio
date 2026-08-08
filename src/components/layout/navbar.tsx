import { MobileDrawer } from "@components/layout/mobile-drawer";
import { MaxWidthWrapper } from "@components/ui/max-width-wrapper";
import { usePortfolioData } from "@hooks/use-portfolio-data";
import { useScrollPosition } from "@hooks/use-scroll-position";
import { useTheme } from "@hooks/use-theme";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { CodeXml, Download, Menu, Moon, Sun } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { DEFAULT_NAV_ITEMS } from "@/lib/constants";
import { env } from "@/lib/env";

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { data: portfolioData } = usePortfolioData();
  const { effectiveTheme, toggleTheme } = useTheme();
  const { isScrolled } = useScrollPosition(60);
  const navItems = portfolioData?.navigation?.navItems || DEFAULT_NAV_ITEMS;

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Helper to check if a path is active (prefix match)
  const isPathActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Helper for exact path match (aria-current)
  const isExactPath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path || location.pathname === `${path}/`;
  };

  return (
    <header
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      data-scrolled={isScrolled || undefined}
    >
      <MaxWidthWrapper>
        <div className="bar">
          {/* Brand */}
          <Link to="/" preload="intent" className="brand" aria-label="Home">
            <CodeXml className="brand-icon" />
            <span className="brand-name">Tim DeHof</span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="links">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                preload="intent"
                className={`link ${isPathActive(item.href) ? "is-selected" : ""}`}
                aria-current={isExactPath(item.href) ? "page" : undefined}
              >
                <span className="link-prefix">{"// "}</span>
                <span className="link-text">{item.name}</span>
                <span className="link-cursor" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* Desktop right section */}
          <div className="right">
            <button
              type="button"
              onClick={toggleTheme}
              className="right-btn"
              aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} mode`}
            >
              {effectiveTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            {env.VITE_RESUME_URL && (
              <a
                href={env.VITE_RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="right-btn resume-link"
              >
                <Download size={16} aria-hidden="true" />
                <span>Resume</span>
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="mobile-toggle">
            <button
              type="button"
              ref={toggleButtonRef}
              onClick={openDrawer}
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Mobile side drawer */}
      <AnimatePresence>
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          navItems={navItems}
          isPathActive={isPathActive}
          isExactPath={isExactPath}
          effectiveTheme={effectiveTheme}
          toggleTheme={toggleTheme}
          resumeUrl={env.VITE_RESUME_URL}
        />
      </AnimatePresence>
    </header>
  );
}
