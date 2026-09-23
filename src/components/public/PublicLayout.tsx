"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { TRUST_INFO } from "@/lib/mock-data";
import type { PublicPage } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { key: PublicPage; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About Us" },
  { key: "activities", label: "Activities" },
  { key: "campaigns", label: "Campaigns" },
  { key: "sponsorship", label: "Sponsorship" },
  { key: "gallery", label: "Gallery" },
  { key: "news", label: "News" },
  { key: "transparency", label: "Transparency" },
  { key: "contact", label: "Contact" },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { publicPage, setPublicPage, setMode, language, setLanguage } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (page: PublicPage) => {
    setPublicPage(page);
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top info bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> {TRUST_INFO.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> {TRUST_INFO.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={(v) => setLanguage(v as "en" | "hi" | "bn")}>
              <SelectTrigger className="h-6 w-[110px] border-0 bg-primary-foreground/15 text-xs text-primary-foreground px-2 py-0">
                <Globe className="mr-1 h-3 w-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={() => setMode("admin")}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Admin Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <button onClick={() => nav("home")} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" fill="currentColor" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold leading-tight">{TRUST_INFO.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{TRUST_INFO.tagline}</p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => nav(item.key)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/40",
                  publicPage === item.key
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => nav("donate")}>
              <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> Donate Now
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex items-center justify-between px-2 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Heart className="h-4 w-4" fill="currentColor" />
                    </div>
                    <span className="font-bold">{TRUST_INFO.name}</span>
                  </div>
                </div>
                <nav className="flex flex-col gap-1 px-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => nav(item.key)}
                      className={cn(
                        "rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent/40",
                        publicPage === item.key
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => nav("donate")}
                  >
                    <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> Donate Now
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mt-auto bg-stone-900 text-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Heart className="h-5 w-5" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold">{TRUST_INFO.name}</p>
                  <p className="text-xs text-stone-400">{TRUST_INFO.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                A registered non-profit organization working since {TRUST_INFO.established} to uplift underprivileged communities across India.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className="rounded-full bg-stone-800 p-2 hover:bg-primary transition-colors"
                    aria-label="social media"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                {NAV_ITEMS.slice(0, 6).map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => nav(item.key)}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Programs</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><button onClick={() => nav("activities")} className="hover:text-primary-foreground">Education</button></li>
                <li><button onClick={() => nav("activities")} className="hover:text-primary-foreground">Healthcare</button></li>
                <li><button onClick={() => nav("activities")} className="hover:text-primary-foreground">Women Empowerment</button></li>
                <li><button onClick={() => nav("sponsorship")} className="hover:text-primary-foreground">Sponsorship</button></li>
                <li><button onClick={() => nav("campaigns")} className="hover:text-primary-foreground">Active Campaigns</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <ul className="space-y-3 text-sm text-stone-400">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{TRUST_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{TRUST_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{TRUST_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-400">
              © {new Date().getFullYear()} {TRUST_INFO.name}. All rights reserved. | Reg. No: {TRUST_INFO.registrationNo}
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms</Link>
              <Link href="#">80G Certificate</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
