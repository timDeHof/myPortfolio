import { Link } from "@tanstack/react-router";
import { m, useReducedMotion } from "framer-motion";
import { CodeXml, Download, Moon, Sun } from "lucide-react";
import { useEffect, useRef } from "react";

interface NavItem {
  readonly name: string;
  readonly href: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
  isPathActive: (path: string) => boolean;
  isExactPath: (path: string) => boolean;
  effectiveTheme: "light" | "dark";
  toggleTheme: () => void;
  resumeUrl?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, // ease-out-expo
  },
  exit: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const contentPushVariants = {
  hidden: { x: 0, scale: 1 },
  visible: {
    x: -20,
    scale: 0.92,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MobileDrawer({
  isOpen,
  onClose,
  navItems,
  isPathActive,
  isExactPath,
  effectiveTheme,
  toggleTheme,
  resumeUrl,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Escape key
  useEffect(() => {
    if (!isOpen)
      return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen)
      return;

    const drawer = drawerRef.current;
    if (!drawer)
      return;

    const focusable = drawer.querySelectorAll<HTMLElement>("a, button, [tabindex]");
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !drawer)
        return;

      const els = drawer.querySelectorAll<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])");
      const first = els[0];
      const last = els[els.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const nav = (
    <m.div
      ref={drawerRef}
      className="drawer"
      variants={shouldReduceMotion ? undefined : drawerVariants}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      exit={shouldReduceMotion ? undefined : "exit"}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Header */}
      <div className="drawer-header">
        <Link to="/" preload="intent" className="drawer-brand" onClick={onClose}>
          <CodeXml className="drawer-brand-icon" />
          <span className="drawer-brand-name">Tim DeHof</span>
        </Link>
        <span className="drawer-subtitle">{"\u002F\u002F navigation"}</span>
      </div>

      {/* Nav links */}
      <m.nav
        className="drawer-links"
        variants={shouldReduceMotion ? undefined : listVariants}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        aria-label="Mobile navigation"
      >
        {navItems.map((item, index) => (
          <m.div
            key={item.href}
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            <Link
              to={item.href}
              preload="intent"
              onClick={onClose}
              className={`drawer-link ${isPathActive(item.href) ? "is-selected" : ""}`}
              aria-current={isExactPath(item.href) ? "page" : undefined}
            >
              <span className="drawer-link-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.name}</span>
            </Link>
          </m.div>
        ))}
      </m.nav>

      {/* Footer */}
      <div className="drawer-footer">
        <button
          type="button"
          onClick={() => {
            toggleTheme();
            onClose();
          }}
          className="drawer-footer-btn"
          aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} mode`}
        >
          {effectiveTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span>{effectiveTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-footer-btn"
            onClick={onClose}
          >
            <Download size={18} aria-hidden="true" />
            <span>Resume</span>
          </a>
        )}
      </div>
    </m.div>
  );

  return (
    <>
      {/* Content push wrapper — rendered always but only active when open */}
      {isOpen && (
        <m.div
          className="drawer-content-push"
          variants={shouldReduceMotion ? undefined : contentPushVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
          exit={shouldReduceMotion ? undefined : "exit"}
        />
      )}

      {/* Backdrop + Drawer */}
      {isOpen && (
        <>
          <m.div
            className="drawer-backdrop"
            variants={shouldReduceMotion ? undefined : backdropVariants}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            exit={shouldReduceMotion ? undefined : "exit"}
            onClick={onClose}
            aria-hidden="true"
          />
          {nav}
        </>
      )}
    </>
  );
}
