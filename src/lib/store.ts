import { create } from "zustand";
import type { PublicPage, AdminPage } from "./types";

interface AppState {
  mode: "public" | "admin";
  publicPage: PublicPage;
  adminPage: AdminPage;
  language: "en" | "hi" | "bn";
  sidebarOpen: boolean;
  setMode: (mode: "public" | "admin") => void;
  setPublicPage: (page: PublicPage) => void;
  setAdminPage: (page: AdminPage) => void;
  setLanguage: (lang: "en" | "hi" | "bn") => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "public",
  publicPage: "home",
  adminPage: "dashboard",
  language: "en",
  sidebarOpen: false,
  setMode: (mode) => set({ mode, sidebarOpen: false }),
  setPublicPage: (publicPage) => set({ publicPage }),
  setAdminPage: (adminPage) => set({ adminPage, sidebarOpen: false }),
  setLanguage: (language) => set({ language }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
