"use client";

import { Eye, Edit, Plus, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate, formatINR } from "@/components/shared/badges";
import { GRANTS } from "@/lib/mock-data";
import type { Grant } from "@/lib/types";
import { TrendingUp, Building2, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function GrantManagement() {
  const { toast } = useToast();

  const totalSanctioned = GRANTS.reduce((s, g) => s + g.sanctionedAmount, 0);
  const totalReceived = GRANTS.reduce((s, g) => s + g.receivedAmount, 0);
  const totalUtilised = GRANTS.reduce((s, g) => s + g.utilisedAmount, 0);
  const balance = totalReceived - totalUtilised;

  const columns: Column<Grant>[] = [
    {
      key: "name",
      header: "Grant Name",
      render: (row) => (
        <div className="min-w-[200px]">
          <p className="font-medium text-sm">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.id} · {row.fundingOrganisation}</p>
        </div>
      ),
    },
    {
      key: "project",
      header: "Project",
      render: (row) => <span className="text-sm">{row.project}</span>,
    },
    {
      key: "sanctionedAmount",
      header: "Sanctioned",
      render: (row) => <span className="text-sm font-medium">{formatINR(row.sanctionedAmount)}</span>,
    },
    {
      key: "receivedAmount",
      header: "Received",
      render: (row) => <span className="text-sm text-emerald-600">{formatINR(row.receivedAmount)}</span>,
    },
    {
      key: "utilisedAmount",
      header: "Utilised",
      render: (row) => <span className="text-sm text-amber-600">{formatINR(row.utilisedAmount)}</span>,
    },
    {
      key: "balance",
      header: "Balance",
      render: (row) => (
        <span className="text-sm font-semibold text-primary">{formatINR(row.receivedAmount - row.utilisedAmount)}</span>
      ),
    },
    {
      key: "endDate",
      header: "End Date",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.endDate)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Utilisation records"
            onClick={() => toast({ title: "Utilisation records", description: row.name })}
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grant & Funding Management"
        description="Track grants from various funding organisations with utilisation records."
        action={
          <Button onClick={() => toast({ title: "Grant form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Add Grant
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Sanctioned" value={formatINR(totalSanctioned)} icon={TrendingUp} tone="primary" />
        <StatCard title="Total Received" value={formatINR(totalReceived)} icon={Building2} tone="accent" />
        <StatCard title="Total Utilised" value={formatINR(totalUtilised)} icon={CheckCircle2} tone="amber" />
        <StatCard title="Available Balance" value={formatINR(balance)} icon={Clock} tone="sky" />
      </div>

      <DataTable
        data={GRANTS}
        columns={columns}
        searchKeys={["name", "fundingOrganisation", "project"]}
        filterOptions={{ key: "status", label: "All Status", options: ["Active", "Completed", "Pending"] }}
        title="All Grants"
        onExport={() => toast({ title: "Export started" })}
      />
    </div>
  );
}
