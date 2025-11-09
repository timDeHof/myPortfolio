import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Home, Mail, Menu, Settings, User, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { ThemeToggle } from "../common/theme-toggle";
import { ViewTransitionLink } from "../common/view-transition-link";

const navItems = [
  { path: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  { path: "/about", label: "About", icon: <User className="h-4 w-4" /> },
  { path: "/projects", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
  { path: "/services", label: "Services", icon: <Settings className="h-4 w-4" /> },
  { path: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <ViewTransitionLink
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 dark:from-blue-400 dark:via-teal-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-blue-800 hover:via-teal-800 hover:to-purple-800 dark:hover:from-blue-300 dark:hover:via-teal-300 dark:hover:to-purple-300 transition-all"
          >
            Tim DeHof
          </ViewTransitionLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <ViewTransitionLink
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-teal-700 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 dark:bg-teal-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </ViewTransitionLink>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-2">
                {navItems.map(item => (
                  <ViewTransitionLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
                      location.pathname === item.path
                        ? "text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </ViewTransitionLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
