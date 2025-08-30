import { useEffect } from "react";

import { useAppStore } from "../store/useAppStore";

export function useTheme() {
  const { theme, setTheme } = useAppStore();

  // Detect system preference
  const getSystemPreference = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | "system" | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }
    else {
      // Set system as default if no preference is saved
      setTheme("system");
    }
  }, [setTheme]);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = (themeToApply: "light" | "dark") => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(themeToApply);

      // Update meta theme color
      const metaThemeColor = document.querySelector("meta[name=\"theme-color\"]");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themeToApply === "dark" ? "#1f2937" : "#2563eb");
      }
    };

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    // Determine which theme to apply
    let effectiveTheme: "light" | "dark";
    if (theme === "system") {
      effectiveTheme = getSystemPreference();
    }
    else {
      effectiveTheme = theme;
    }

    applyTheme(effectiveTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    }
    else if (theme === "dark") {
      setTheme("system");
    }
    else {
      setTheme("light");
    }
  };

  const getEffectiveTheme = (): "light" | "dark" => {
    if (theme === "system") {
      return getSystemPreference();
    }
    return theme;
  };

  return {
    theme,
    effectiveTheme: getEffectiveTheme(),
    setTheme,
    toggleTheme,
    isSystemTheme: theme === "system",
  };
}
