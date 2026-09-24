"use client";

import { Eye, Edit, Plus, Download, Upload, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { formatDate, formatINR } from "@/components/shared/badges";
import { EXPENSES, GRANTS } from "@/lib/mock-data";
import type { Expense } from "@/lib/types";
import { Receipt, TrendingUp, Building2, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExpenseManagement() {
  const { toast } = useToast();

  const totalExpenses = EXPENSES.reduce((s, e) => s + e.amount, 0);
  const categories = Array.from(new Set(EXPENSES.map(e => e.category)));

  const columns: Column<Expense>[] = [
    {
      key: "date",
      header: "Date",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.date)}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (row) => <span className="text-sm font-medium">{row.category}</span>,
    },
    {
      key: "project",
      header: "Project",
      render: (row) => <span className="text-sm text-muted-foreground">{row.project}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (row) => <span className="font-semibold text-rose-600">{formatINR(row.amount)}</span>,
    },
    {
      key: "fundingSource",
      header: "Funding Source",
      render: (row) => <span className="text-sm">{row.fundingSource}</span>,
    },
    {
      key: "vendor",
      header: "Vendor",
      render: (row) => <span className="text-sm">{row.vendor}</span>,
    },
    {
      key: "remarks",
      header: "Remarks",
      render: (row) => <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{row.remarks}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Upload invoice"><Upload className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  // Fund flow data
  const totalDonations = 18500000;
  const allocatedProjects = 14500000;
  const utilised = totalExpenses;
  const balance = totalDonations - utilised;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense & Fund Utilisation"
        description="Track all expenses and demonstrate transparent fund utilisation."
        action={
          <Button onClick={() => toast({ title: "Expense form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Expenses" value={formatINR(totalExpenses)} icon={Receipt} tone="rose" />
        <StatCard title="This Month" value={formatINR(920000)} icon={TrendingUp} tone="amber" />
        <StatCard title="Pending Approvals" value={2} icon={Building2} tone="sky" />
        <StatCard title="Available Balance" value={formatINR(balance)} icon={Wallet} tone="primary" />
      </div>

      {/* Fund flow visualization */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Fund Flow Summary (FY 2025-26)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Donations Received", value: totalDonations, tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              { label: "Allocated to Projects", value: allocatedProjects, tone: "bg-primary/10 text-primary border-primary/30" },
              { label: "Amount Utilised", value: utilised, tone: "bg-amber-50 text-amber-700 border-amber-200" },
              { label: "Balance Available", value: balance, tone: "bg-sky-50 text-sky-700 border-sky-200" },
            ].map((item, i) => (
              <div key={i} className={`rounded-lg border-2 p-4 ${item.tone}`}>
                <p className="text-xs mb-1 opacity-80">{item.label}</p>
                <p className="text-xl font-bold">{formatINR(item.value)}</p>
                {i < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DataTable
        data={EXPENSES}
        columns={columns}
        searchKeys={["category", "project", "vendor", "remarks"]}
        filterOptions={{ key: "category", label: "All Categories", options: categories }}
        title="All Expenses"
        onExport={() => toast({ title: "Export started", description: "Expenses exported to CSV." })}
      />
    </div>
  );
}
