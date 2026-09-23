import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ananya Seva Trust — Serving Humanity, Building Hope",
  description: "A registered non-profit organization working since 2009 to uplift underprivileged communities across India through education, healthcare, women empowerment, and rural development programs.",
  keywords: ["NGO", "Trust", "Charity", "Donation", "Education", "Healthcare", "Women Empowerment", "Rural Development", "India"],
  authors: [{ name: "Ananya Seva Trust" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Ananya Seva Trust",
    description: "Serving Humanity, Building Hope — A grassroots movement for lasting change.",
    url: "https://ananyaseva.org",
    siteName: "Ananya Seva Trust",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananya Seva Trust",
    description: "Serving Humanity, Building Hope",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
