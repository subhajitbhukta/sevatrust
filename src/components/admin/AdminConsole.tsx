"use client";

import { AdminLayout } from "./AdminLayout";
import { DashboardPage } from "./DashboardPage";
import { ActivitiesManagement } from "./ActivitiesManagement";
import { BeneficiaryManagement } from "./BeneficiaryManagement";
import { DonationManagement } from "./DonationManagement";
import { CampaignManagement } from "./CampaignManagement";
import { SponsorshipManagement } from "./SponsorshipManagement";
import { VolunteerManagement } from "./VolunteerManagement";
import { EventManagement } from "./EventManagement";
import { EnquiryManagement } from "./EnquiryManagement";
import { CSRManagement } from "./CSRManagement";
import { GrantManagement } from "./GrantManagement";
import { ExpenseManagement } from "./ExpenseManagement";
import { NewsManagement } from "./NewsManagement";
import { GalleryManagement } from "./GalleryManagement";
import { DocumentsManagement } from "./DocumentsManagement";
import { CertificateManagement } from "./CertificateManagement";
import { NotificationsManagement } from "./NotificationsManagement";
import { UserManagement } from "./UserManagement";
import { AuditLog } from "./AuditLog";
import { SettingsPage } from "./SettingsPage";
import { useAppStore } from "@/lib/store";

export function AdminConsole() {
  const { adminPage } = useAppStore();

  const renderPage = () => {
    switch (adminPage) {
      case "dashboard": return <DashboardPage />;
      case "activities": return <ActivitiesManagement />;
      case "beneficiaries": return <BeneficiaryManagement />;
      case "donations": return <DonationManagement />;
      case "campaigns": return <CampaignManagement />;
      case "sponsorships": return <SponsorshipManagement />;
      case "volunteers": return <VolunteerManagement />;
      case "events": return <EventManagement />;
      case "enquiries": return <EnquiryManagement />;
      case "csr": return <CSRManagement />;
      case "grants": return <GrantManagement />;
      case "expenses": return <ExpenseManagement />;
      case "news": return <NewsManagement />;
      case "gallery": return <GalleryManagement />;
      case "documents": return <DocumentsManagement />;
      case "certificates": return <CertificateManagement />;
      case "notifications": return <NotificationsManagement />;
      case "users": return <UserManagement />;
      case "audit": return <AuditLog />;
      case "settings": return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
}
