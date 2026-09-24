"use client";

import { Eye, Edit, Plus, Trash2, Shield, ShieldCheck, UserCog, Lock, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/badges";
import { USERS } from "@/lib/mock-data";
import type { UserAccount } from "@/lib/types";
import { Users, ShieldCheck as SC, KeyRound as KR, UserCog as UC } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ROLE_PERMISSIONS: Record<string, { modules: string[]; description: string }> = {
  "Super Admin": {
    modules: ["All Modules", "User Management", "Audit Log", "Settings", "Backup"],
    description: "Complete system access with all permissions",
  },
  "Trust Admin": {
    modules: ["Website", "Activities", "Donations", "Campaigns", "News", "Gallery"],
    description: "Manage website, activities, and donations",
  },
  "Accounts": {
    modules: ["Donations", "Expenses", "Reports", "Grants"],
    description: "Financial management and reporting",
  },
  "Project Manager": {
    modules: ["Projects", "Beneficiaries", "Activities", "Reports"],
    description: "Manage projects and beneficiaries",
  },
  "Volunteer Coordinator": {
    modules: ["Volunteers", "Events", "Certificates"],
    description: "Coordinate volunteers and events",
  },
  "Content Manager": {
    modules: ["News", "Gallery", "Documents", "Website Content"],
    description: "Manage content and communications",
  },
};

export function UserManagement() {
  const { toast } = useToast();

  const columns: Column<UserAccount>[] = [
    {
      key: "name",
      header: "User",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[220px]">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {row.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <Badge variant="secondary" className="text-xs">
          <Shield className="mr-1 h-3 w-3" /> {row.role}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (row) => <span className="text-sm text-muted-foreground">{row.lastLogin}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Reset password"><KeyRound className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="2FA settings"><Lock className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User & Role Management"
        description="Manage admin users, roles, and granular permissions."
        action={
          <Button onClick={() => toast({ title: "User form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Users" value={USERS.length} icon={Users} tone="primary" />
        <StatCard title="Active" value={USERS.filter(u => u.status === "Active").length} icon={SC} tone="accent" />
        <StatCard title="Roles Defined" value={Object.keys(ROLE_PERMISSIONS).length} icon={UC} tone="amber" />
        <StatCard title="2FA Enabled" value={6} icon={KR} tone="sky" />
      </div>

      {/* Role permissions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" /> Role Definitions & Permissions
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(ROLE_PERMISSIONS).map(([role, info]) => (
              <div key={role} className="rounded-lg border p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-sm">{role}</p>
                  <Badge variant="outline" className="text-[10px]">{info.modules.length} modules</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{info.description}</p>
                <div className="flex flex-wrap gap-1">
                  {info.modules.map((m, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DataTable
        data={USERS}
        columns={columns}
        searchKeys={["name", "email"]}
        filterOptions={{ key: "role", label: "All Roles", options: Object.keys(ROLE_PERMISSIONS) }}
        title="Admin Users"
      />
    </div>
  );
}
