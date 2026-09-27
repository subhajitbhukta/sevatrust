"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Menu,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Globe,
  Shield,
  MessageCircle,
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
import { ThemeSelector } from "@/components/shared/ThemeSelector";

const NAV_ITEMS: { key: PublicPage; label: string; labelBn?: string }[] = [
  { key: "home", label: "Home", labelBn: "হোম" },
  { key: "about", label: "About Us", labelBn: "আমাদের কথা" },
  { key: "activities", label: "Activities", labelBn: "কার্যক্রম" },
  { key: "campaigns", label: "Campaigns", labelBn: "ক্যাম্পেইন" },
  { key: "sponsorship", label: "Sponsorship", labelBn: "স্পন্সরশিপ" },
  { key: "gallery", label: "Gallery", labelBn: "গ্যালারি" },
  { key: "news", label: "News", labelBn: "খবর" },
  { key: "transparency", label: "Transparency", labelBn: "স্বচ্ছতা" },
  { key: "contact", label: "Contact", labelBn: "যোগাযোগ" },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { publicPage, setPublicPage, setMode, language, setLanguage } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (page: PublicPage) => {
    setPublicPage(page);
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isBn = language === "bn";

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
              <MapPin className="h-3 w-3" /> Kamarkundu, Singur
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={TRUST_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Facebook className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <Select value={language} onValueChange={(v) => setLanguage(v as "en" | "hi" | "bn")}>
              <SelectTrigger className="h-6 w-[110px] border-0 bg-primary-foreground/15 text-xs text-primary-foreground px-2 py-0">
                <Globe className="mr-1 h-3 w-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bn">বাংলা</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
            <ThemeSelector compact />
            <button
              onClick={() => setMode("admin")}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <button onClick={() => nav("home")} className="flex items-center gap-2.5">
            <img src="/LOGO_BBMWT.png" alt="Logo" className="h-10 w-10 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-bold leading-tight">Bharati Banerjee</p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {isBn ? "মানুষের পাশে, মানুষের জন্য ❤️" : "Memorial Welfare Trust"}
              </p>
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
                {isBn && item.labelBn ? item.labelBn : item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => nav("donate")}>
              <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> {isBn ? "দান করুন" : "Donate"}
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
                    <img src="/LOGO_BBMWT.png" alt="Logo" className="h-8 w-8" />
                    <span className="font-bold text-sm">Bharati Banerjee</span>
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
                      {isBn && item.labelBn ? item.labelBn : item.label}
                    </button>
                  ))}
                  <Button size="sm" className="mt-3" onClick={() => nav("donate")}>
                    <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> {isBn ? "দান করুন" : "Donate Now"}
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
                <img src="/LOGO_BBMWT.png" alt="Logo" className="h-10 w-10" />
                <div>
                  <p className="font-bold leading-tight">Bharati Banerjee</p>
                  <p className="text-[10px] text-stone-400">Memorial Welfare Trust</p>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {isBn
                  ? "মানুষের পাশে, মানুষের জন্য ❤️ — সিঙ্গুর ও হুগলির গ্রামে মানবিকতার কাজ।"
                  : "Beside people, for people ❤️ — community welfare initiatives across Singur and Hooghly, West Bengal."}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a href={TRUST_INFO.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-stone-800 p-2 hover:bg-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${TRUST_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-stone-800 p-2 hover:bg-emerald-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href={`tel:${TRUST_INFO.phone.replace(/\s/g, "")}`} className="rounded-full bg-stone-800 p-2 hover:bg-primary transition-colors" aria-label="Call">
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">{isBn ? "দ্রুত লিঙ্ক" : "Quick Links"}</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                {NAV_ITEMS.slice(0, 6).map((item) => (
                  <li key={item.key}>
                    <button onClick={() => nav(item.key)} className="hover:text-primary-foreground transition-colors">
                      {isBn && item.labelBn ? item.labelBn : item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">{isBn ? "কার্যক্রম" : "Our Programs"}</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><button onClick={() => nav("activities")} className="hover:text-primary-foreground">{isBn ? "বস্ত্র বিতরণ" : "Clothes Distribution"}</button></li>
                <li><button onClick={() => nav("activities")} className="hover:text-primary-foreground">{isBn ? "শিক্ষা সামগ্রী" : "Education Supplies"}</button></li>
                <li><button onClick={() => nav("sponsorship")} className="hover:text-primary-foreground">{isBn ? "স্পন্সরশিপ" : "Sponsorship"}</button></li>
                <li><button onClick={() => nav("campaigns")} className="hover:text-primary-foreground">{isBn ? "সক্রিয় ক্যাম্পেইন" : "Active Campaigns"}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">{isBn ? "যোগাযোগ" : "Contact Us"}</h4>
              <ul className="space-y-3 text-sm text-stone-400">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400" />
                  <span>{TRUST_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <a href={`tel:${TRUST_INFO.phone.replace(/\s/g, "")}`} className="hover:text-primary-foreground">{TRUST_INFO.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-amber-400" />
                  <a href={`https://wa.me/${TRUST_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">WhatsApp</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-400" />
                  <a href={`mailto:${TRUST_INFO.email}`} className="hover:text-primary-foreground">{TRUST_INFO.email}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-400">
              © {new Date().getFullYear()} {TRUST_INFO.name}. {isBn ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."} | Reg. No: {TRUST_INFO.registrationNo}
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms</Link>
              <a href={TRUST_INFO.facebook} target="_blank" rel="noopener noreferrer">Facebook Page</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${TRUST_INFO.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about the welfare activities of Bharati Banerjee Memorial Welfare Trust and how I can contribute.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors wa-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" />
      </a>
    </div>
  );
}
