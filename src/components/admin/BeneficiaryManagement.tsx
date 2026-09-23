"use client";

import { Eye, Edit, Trash2, Plus, User, Phone, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate } from "@/components/shared/badges";
import { BENEFICIARIES } from "@/lib/mock-data";
import type { Beneficiary } from "@/lib/types";
import { Users, Heart, Activity, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BeneficiaryManagement() {
  const { toast } = useToast();

  const categories = Array.from(new Set(BENEFICIARIES.map((b) => b.category)));

  const columns: Column<Beneficiary>[] = [
    {
      key: "name",
      header: "Beneficiary",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[220px]">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {row.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.age}y · {row.gender}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => <span className="text-sm">{row.category}</span>,
    },
    {
      key: "project",
      header: "Project",
      render: (row) => <span className="text-sm text-muted-foreground">{row.project}</span>,
    },
    {
      key: "assistance",
      header: "Assistance",
      render: (row) => <span className="text-sm">{row.assistance}</span>,
    },
    {
      key: "assistanceDate",
      header: "Assistance Date",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.assistanceDate)}</span>,
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
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="History"><History className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Beneficiary Management"
        description="Maintain and track beneficiary records, assistance history, and follow-ups."
        action={
          <Button onClick={() => toast({ title: "Beneficiary form opened", description: "Add new beneficiary modal would open here." })}>
            <Plus className="mr-2 h-4 w-4" /> Add Beneficiary
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Beneficiaries" value={BENEFICIARIES.length} icon={Users} tone="primary" />
        <StatCard title="Active" value={BENEFICIARIES.filter(b => b.status === "Active").length} icon={Activity} tone="accent" />
        <StatCard title="Completed" value={BENEFICIARIES.filter(b => b.status === "Completed").length} icon={CheckCircle2} tone="sky" />
        <StatCard title="Follow-ups" value={BENEFICIARIES.filter(b => b.status === "Follow-up").length} icon={Heart} tone="rose" />
      </div>

      <DataTable
        data={BENEFICIARIES}
        columns={columns}
        searchKeys={["name", "project", "id"]}
        filterOptions={{ key: "category", label: "All Categories", options: categories }}
        title="Beneficiary Records"
        onExport={() => toast({ title: "Export started", description: "Beneficiary records will be exported (with restricted fields)." })}
      />

      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 p-4">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Sensitive Information Notice</p>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
              Beneficiary contact details and documents are restricted to authorized administrators only. Access is logged in the audit trail for compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
