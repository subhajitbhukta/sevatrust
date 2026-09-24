"use client";

import { Eye, Edit, Plus, Download, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatINR, formatDate } from "@/components/shared/badges";
import { SPONSORSHIPS } from "@/lib/mock-data";
import type { Sponsorship } from "@/lib/types";
import { HandHeart, CheckCircle2, Clock, Calendar as CalIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SponsorshipManagement() {
  const { toast } = useToast();

  const totalActive = SPONSORSHIPS.filter(s => s.status === "Active").length;
  const totalAmount = SPONSORSHIPS.filter(s => s.status === "Active").reduce((sum, s) => sum + s.amount, 0);
  const completed = SPONSORSHIPS.filter(s => s.status === "Completed").length;

  const columns: Column<Sponsorship>[] = [
    {
      key: "sponsorName",
      header: "Sponsor",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[180px]">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {row.sponsorName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.sponsorName}</p>
            <p className="text-xs text-muted-foreground">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => <span className="text-sm">{row.type}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (row) => <span className="font-semibold text-emerald-600">{formatINR(row.amount)}</span>,
    },
    {
      key: "duration",
      header: "Duration",
      render: (row) => <span className="text-sm text-muted-foreground">{row.duration}</span>,
    },
    {
      key: "beneficiary",
      header: "Beneficiary",
      render: (row) => <span className="text-sm">{row.beneficiary}</span>,
    },
    {
      key: "nextPayment",
      header: "Next Payment",
      render: (row) => (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <CalIcon className="h-3 w-3" /> {row.nextPayment === "—" ? "—" : formatDate(row.nextPayment)}
        </span>
      ),
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
          <Button variant="ghost" size="icon" className="h-8 w-8"><Award className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sponsorship Management"
        description="Manage recurring donations and sponsorships with payment tracking."
        action={
          <Button onClick={() => toast({ title: "Sponsorship form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Add Sponsorship
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Active Sponsorships" value={totalActive} icon={HandHeart} tone="primary" />
        <StatCard title="Total Committed" value={formatINR(totalAmount)} icon={CheckCircle2} tone="accent" />
        <StatCard title="Completed" value={completed} icon={CheckCircle2} tone="sky" />
        <StatCard title="Pending Renewals" value={2} icon={Clock} tone="amber" />
      </div>

      <DataTable
        data={SPONSORSHIPS}
        columns={columns}
        searchKeys={["sponsorName", "beneficiary", "id"]}
        filterOptions={{ key: "status", label: "All Status", options: ["Active", "Completed", "Pending"] }}
        title="All Sponsorships"
        onExport={() => toast({ title: "Export started" })}
      />
    </div>
  );
}
