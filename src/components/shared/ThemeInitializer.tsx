"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Applies the saved theme to <html data-theme="..."> on mount and whenever theme changes.
 * Prevents FOUC by reading from localStorage synchronously via getInitialTheme in store.
 */
export function ThemeInitializer() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}
