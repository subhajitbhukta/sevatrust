import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
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

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-bangla-serif",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharati Banerjee Memorial Welfare Trust — মানুষের পাশে, মানুষের জন্য",
  description: "ভারতী ব্যানার্জী মেমোরিয়াল ওয়েলফেয়ার ট্রাস্ট — বস্ত্র ও কম্বল বিতরণ, বৃক্ষরোপণ, শিক্ষা সামগ্রী এবং প্রয়োজনীয় সামগ্রী বিতরণ। ছোট ছোট উদ্যোগে মানবিকতার বার্তা ছড়িয়ে দেওয়াই আমাদের লক্ষ্য।",
  keywords: ["welfare trust", "charity", "NGO", "Singur", "West Bengal", "clothes distribution", "tree plantation", "education", "Bharati Banerjee", "Memorial Trust", "কল্যাণ ট্রাস্ট", "এনজিও", "পশ্চিমবঙ্গ"],
  authors: [{ name: "Bharati Banerjee Memorial Welfare Trust" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Bharati Banerjee Memorial Welfare Trust",
    description: "মানুষের পাশে, মানুষের জন্য ❤️ — Spreading humanity's message through small initiatives.",
    url: "https://www.facebook.com/profile.php?id=61594263927379",
    siteName: "BBMWT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharati Banerjee Memorial Welfare Trust",
    description: "মানুষের পাশে, মানুষের জন্য ❤️",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} ${notoSerifBengali.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
