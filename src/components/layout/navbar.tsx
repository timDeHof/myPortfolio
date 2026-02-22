import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import {Link, useLocation } from "react-router-dom";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { navItems } from "@/config/navigation";
import {Menu, X, CodeXml } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <MaxWidthWrapper>
        <div className="inner">
          <div className="left">

          <Link
            to="/"
            className="brand"
            >
            <CodeXml className="logo" />
            <span className="name brand-gradient">
              Tim DeHof
              </span>
          </Link>
            </div>

          <div className="links">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`${location.pathname === item.href
                  ? "is-selected" : "not-selected"}`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <m.div
                    layoutId="activeTab"
                    className="link-select"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="mobile">
            <button
              type="button"
              onClick={toggleMenu}
              className="toggle-menu"
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
              className="mobile-menu"
            >
              <div className="mobile-content">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`${location.pathname === item.href
                      ? "is-selected" : "not-selected" }`}
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
