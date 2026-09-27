import { create } from "zustand";
import type { PublicPage, AdminPage } from "./types";

export type ThemeName = "blue" | "orange" | "green";

interface AppState {
  mode: "public" | "admin";
  publicPage: PublicPage;
  adminPage: AdminPage;
  language: "en" | "hi" | "bn";
  theme: ThemeName;
  sidebarOpen: boolean;
  setMode: (mode: "public" | "admin") => void;
  setPublicPage: (page: PublicPage) => void;
  setAdminPage: (page: AdminPage) => void;
  setLanguage: (lang: "en" | "hi" | "bn") => void;
  setTheme: (theme: ThemeName) => void;
  setSidebarOpen: (open: boolean) => void;
}

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "orange";
  const stored = window.localStorage.getItem("bbmwt-theme");
  if (stored === "blue" || stored === "orange" || stored === "green") return stored;
  return "orange";
}

export const useAppStore = create<AppState>((set) => ({
  mode: "public",
  publicPage: "home",
  adminPage: "dashboard",
  language: "bn",
  theme: getInitialTheme(),
  sidebarOpen: false,
  setMode: (mode) => set({ mode, sidebarOpen: false }),
  setPublicPage: (publicPage) => set({ publicPage }),
  setAdminPage: (adminPage) => set({ adminPage, sidebarOpen: false }),
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bbmwt-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
