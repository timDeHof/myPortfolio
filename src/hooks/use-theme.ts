import { useEffect } from "react";

import { useAppStore } from "../store/use-app-store";

/**
 * Custom hook for managing the application theme (light/dark/system).
 * Handles system preference detection, persistence in localStorage, and applying styles to the document.
 * 
 * @returns An object containing theme state and control functions.
 */
export function useTheme() {
  const { theme, setTheme } = useAppStore();

  /**
   * Detects the user's system color scheme preference.
   */
  const getSystemPreference = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | "system" | null;

    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
    }
    else {
      // Default to system preference
      setTheme(getSystemPreference());
    }
  }, [setTheme]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === "undefined")
      return;

    /**
     * Applies the specified theme to the document root and meta tags.
     */
    const applyTheme = (themeToApply: "light" | "dark") => {
      const root = document.documentElement;

      // Remove existing theme classes
      root.classList.remove("light", "dark");

      // Add new theme class
      root.classList.add(themeToApply);

      // Force a repaint to ensure styles are applied
      root.style.colorScheme = themeToApply;

      // Update meta theme color
      const metaThemeColor = document.querySelector("meta[name=\"theme-color\"]");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themeToApply === "dark" ? "#1f2937" : "#2563eb");
      }
    };

    /**
     * Handles changes to the system theme preference.
     */
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

    // Apply theme immediately
    applyTheme(effectiveTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    }
    else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      }
      else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, [theme]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  /**
   * Toggles the theme between light and dark.
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /**
   * Gets the currently active theme (resolving 'system' to its actual value).
   */
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
