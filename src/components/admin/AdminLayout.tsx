"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Activity,
  Users,
  Heart,
  Target,
  HandHeart,
  Calendar,
  MessageSquare,
  Building2,
  TrendingUp,
  Receipt,
  Newspaper,
  Image as ImageIcon,
  FileText,
  Award,
  Bell,
  UserCog,
  ScrollText,
  Settings,
  Heart as HeartIcon,
  Menu,
  X,
  Globe,
  LogOut,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/lib/store";
import { TRUST_INFO } from "@/lib/mock-data";
import type { AdminPage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NavItem {
  key: AdminPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Programs",
    items: [
      { key: "activities", label: "Activities", icon: Activity },
      { key: "beneficiaries", label: "Beneficiaries", icon: Users },
      { key: "events", label: "Events", icon: Calendar },
      { key: "volunteers", label: "Volunteers", icon: HandHeart },
    ],
  },
  {
    title: "Fundraising",
    items: [
      { key: "donations", label: "Donations", icon: Heart, badge: "3" },
      { key: "campaigns", label: "Campaigns", icon: Target },
      { key: "sponsorships", label: "Sponsorships", icon: HandHeart },
      { key: "csr", label: "CSR Partners", icon: Building2 },
      { key: "grants", label: "Grants", icon: TrendingUp },
    ],
  },
  {
    title: "Finance",
    items: [
      { key: "expenses", label: "Expenses", icon: Receipt },
    ],
  },
  {
    title: "Content",
    items: [
      { key: "news", label: "News & Updates", icon: Newspaper },
      { key: "gallery", label: "Gallery", icon: ImageIcon },
      { key: "documents", label: "Documents", icon: FileText },
      { key: "certificates", label: "Certificates", icon: Award },
    ],
  },
  {
    title: "Administration",
    items: [
      { key: "enquiries", label: "Enquiries", icon: MessageSquare, badge: "2" },
      { key: "notifications", label: "Notifications", icon: Bell, badge: "5" },
      { key: "users", label: "Users & Roles", icon: UserCog },
      { key: "audit", label: "Audit Log", icon: ScrollText },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

const ADMIN_ROLE_LABELS: Record<AdminPage, string> = {
  dashboard: "Dashboard Overview",
  activities: "Activities Management",
  beneficiaries: "Beneficiary Management",
  donations: "Donation Management",
  campaigns: "Campaign Management",
  sponsorships: "Sponsorship Management",
  volunteers: "Volunteer Management",
  events: "Event Management",
  enquiries: "Enquiry Management",
  csr: "CSR & Corporate Partnerships",
  grants: "Grant & Funding Management",
  expenses: "Expense & Fund Utilisation",
  news: "News & Updates",
  gallery: "Gallery Management",
  documents: "Documents Management",
  certificates: "Certificate Management",
  notifications: "Notification System",
  users: "User & Role Management",
  audit: "Audit Log",
  settings: "Settings & Configuration",
};

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { adminPage, setAdminPage, setMode, sidebarOpen, setSidebarOpen } = useAppStore();
  const [search, setSearch] = useState("");

  const filteredSections = NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  const Sidebar = (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
          <HeartIcon className="h-4 w-4" fill="currentColor" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-sidebar-foreground truncate">{TRUST_INFO.name}</p>
          <p className="text-[10px] text-muted-foreground">Admin Console</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs bg-background"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-4">
        {filteredSections.map((section) => (
          <div key={section.title}>
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setAdminPage(item.key);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                    adminPage === item.key
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={adminPage === item.key ? "secondary" : "outline"}
                      className="h-5 px-1.5 text-[10px]"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">RM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">Dr. Rajesh Mehta</p>
            <p className="text-[10px] text-muted-foreground">Super Admin</p>
          </div>
          <button
            onClick={() => setMode("public")}
            className="text-muted-foreground hover:text-foreground"
            title="Back to website"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r">{Sidebar}</aside>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          {Sidebar}
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-3 border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base md:text-lg font-semibold truncate">
              {ADMIN_ROLE_LABELS[adminPage]}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setMode("public")}>
              <Globe className="mr-2 h-4 w-4" /> View Website
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <p className="text-sm font-medium">New donation received</p>
                <p className="text-xs text-muted-foreground">₹5,000 from Rohit Sharma · 2 min ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <p className="text-sm font-medium">New volunteer application</p>
                <p className="text-xs text-muted-foreground">Sahil Khan · 1 hour ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <p className="text-sm font-medium">CSR enquiry received</p>
                <p className="text-xs text-muted-foreground">Aditya Birla Foundation · 3 hours ago</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full hover:bg-muted p-1 pr-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">RM</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>2FA Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setMode("public")}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
