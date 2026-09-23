"use client";

import { Eye, Edit, Plus, Building2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate, formatINR } from "@/components/shared/badges";
import { CSR_PARTNERS } from "@/lib/mock-data";
import type { CSRPartner } from "@/lib/types";
import { Building2 as B2, HandHeart, CheckCircle2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CSRManagement() {
  const { toast } = useToast();

  const totalContribution = CSR_PARTNERS.reduce((s, p) => s + p.proposedContribution, 0);

  const columns: Column<CSRPartner>[] = [
    {
      key: "companyName",
      header: "Company",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <Avatar className="h-9 w-9 rounded-md flex-shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {row.companyName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.companyName}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.contactPerson}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (row) => (
        <div className="text-xs">
          <p className="flex items-center gap-1 text-muted-foreground"><Mail className="h-3 w-3" /> {row.email}</p>
          <p className="flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" /> {row.mobile}</p>
        </div>
      ),
    },
    {
      key: "csrInterest",
      header: "CSR Interest",
      render: (row) => <span className="text-sm">{row.csrInterest}</span>,
    },
    {
      key: "proposedContribution",
      header: "Proposed",
      render: (row) => <span className="font-semibold text-emerald-600">{formatINR(row.proposedContribution)}</span>,
    },
    {
      key: "projectInterest",
      header: "Project Interest",
      render: (row) => <span className="text-sm text-muted-foreground">{row.projectInterest}</span>,
    },
    {
      key: "date",
      header: "Received",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.date)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="CSR & Corporate Partnerships"
        description="Manage corporate partnerships, CSR proposals, and contribution tracking."
        action={
          <Button onClick={() => toast({ title: "Partner form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Add Partner
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Partners" value={CSR_PARTNERS.length} icon={B2} tone="primary" />
        <StatCard title="Active" value={CSR_PARTNERS.filter(p => p.status === "Active").length} icon={CheckCircle2} tone="accent" />
        <StatCard title="In Discussion" value={CSR_PARTNERS.filter(p => p.status === "In Discussion").length} icon={HandHeart} tone="amber" />
        <StatCard title="Total Proposed" value={formatINR(totalContribution)} icon={TrendingUp} tone="sky" />
      </div>

      <DataTable
        data={CSR_PARTNERS}
        columns={columns}
        searchKeys={["companyName", "contactPerson", "csrInterest"]}
        filterOptions={{ key: "status", label: "All Status", options: ["New", "In Discussion", "Approved", "Active", "Closed"] }}
        title="Corporate Database"
      />
    </div>
  );
}
