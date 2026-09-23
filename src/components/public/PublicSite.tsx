"use client";

import { useAppStore } from "@/lib/store";
import { PublicLayout } from "./PublicLayout";
import { HomePage } from "./HomePage";
import { AboutPage } from "./AboutPage";
import { ActivitiesPage } from "./ActivitiesPage";
import { CampaignsPage } from "./CampaignsPage";
import { DonatePage } from "./DonatePage";
import { SponsorshipPage } from "./SponsorshipPage";
import { GalleryPage } from "./GalleryPage";
import { NewsPage } from "./NewsPage";
import { TransparencyPage } from "./TransparencyPage";
import { ContactPage } from "./ContactPage";

export function PublicSite() {
  const { publicPage } = useAppStore();

  const renderPage = () => {
    switch (publicPage) {
      case "home": return <HomePage />;
      case "about": return <AboutPage />;
      case "activities": return <ActivitiesPage />;
      case "campaigns": return <CampaignsPage />;
      case "donate": return <DonatePage />;
      case "sponsorship": return <SponsorshipPage />;
      case "gallery": return <GalleryPage />;
      case "news": return <NewsPage />;
      case "transparency": return <TransparencyPage />;
      case "contact": return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return <PublicLayout>{renderPage()}</PublicLayout>;
}
