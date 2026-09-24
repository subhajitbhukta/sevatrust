"use client";

import { Eye, Edit, Trash2, Plus, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate, formatINR, ProgressBar } from "@/components/shared/badges";
import { CAMPAIGNS } from "@/lib/mock-data";
import type { Campaign } from "@/lib/types";
import { Target, Heart, Users, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CampaignManagement() {
  const { toast } = useToast();

  const totalRaised = CAMPAIGNS.reduce((s, c) => s + c.collectedAmount, 0);
  const activeCount = CAMPAIGNS.filter(c => c.status === "Active").length;
  const completedCount = CAMPAIGNS.filter(c => c.status === "Completed").length;

  const columns: Column<Campaign>[] = [
    {
      key: "title",
      header: "Campaign",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[280px]">
          <img src={row.cover} alt={row.title} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.title}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "collectedAmount",
      header: "Progress",
      render: (row) => {
        const pct = Math.round((row.collectedAmount / row.targetAmount) * 100);
        return (
          <div className="min-w-[160px]">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-emerald-600">{formatINR(row.collectedAmount)}</span>
              <span className="text-muted-foreground">/ {formatINR(row.targetAmount)}</span>
            </div>
            <ProgressBar value={pct} />
            <p className="text-[10px] text-muted-foreground mt-1">{pct}% funded</p>
          </div>
        );
      },
    },
    {
      key: "beneficiaries",
      header: "Beneficiaries",
      render: (row) => <span className="text-sm">{row.beneficiaries}</span>,
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
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaign Management"
        description="Create and manage fundraising campaigns with progress tracking."
        action={
          <Button onClick={() => toast({ title: "Campaign form opened", description: "Create new campaign modal." })}>
            <Plus className="mr-2 h-4 w-4" /> New Campaign
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Raised" value={formatINR(totalRaised)} icon={Heart} tone="primary" />
        <StatCard title="Active Campaigns" value={activeCount} icon={Target} tone="accent" />
        <StatCard title="Completed" value={completedCount} icon={CheckCircle2} tone="sky" />
        <StatCard title="Total Beneficiaries" value={CAMPAIGNS.reduce((s, c) => s + c.beneficiaries, 0)} icon={Users} tone="amber" />
      </div>

      <DataTable
        data={CAMPAIGNS}
        columns={columns}
        searchKeys={["title", "id"]}
        filterOptions={{ key: "status", label: "All Status", options: ["Active", "Completed", "Upcoming"] }}
        title="All Campaigns"
        onAdd={() => toast({ title: "Campaign form opened", description: "Create new campaign modal." })}
        onExport={() => toast({ title: "Export started", description: "Campaigns exported." })}
      />
    </div>
  );
}
