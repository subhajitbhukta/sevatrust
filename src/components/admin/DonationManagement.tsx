"use client";

import { useState } from "react";
import { Eye, Download, Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatINR, formatDate } from "@/components/shared/badges";
import { DONATIONS } from "@/lib/mock-data";
import type { Donation } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Heart, CheckCircle2, Clock, XCircle } from "lucide-react";

import { FormDialog } from "@/components/shared/FormDialog";
import { DONATION_FORM_SCHEMA } from "@/components/shared/form-schemas";
import { Receipt80GDialog, type Receipt80GData } from "@/components/shared/Receipt80GDialog";
export function DonationManagement() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<Receipt80GData | null>(null);

  const openReceipt = (row: Donation) => {
    setReceiptData({
      receiptNo: `RCPT/${row.id}/${new Date(row.date).getFullYear()}`,
      donorName: row.donor,
      donorEmail: row.email,
      donorMobile: row.mobile,
      donorAddress: "",
      donorPAN: "",
      amount: row.amount,
      purpose: row.purpose,
      campaign: row.campaign,
      paymentMethod: row.paymentMethod,
      txnId: row.txnId,
      date: row.date,
      anonymous: row.anonymous,
    });
  };

  const total = DONATIONS.filter(d => d.status === "Successful").reduce((s, d) => s + d.amount, 0);
  const successful = DONATIONS.filter(d => d.status === "Successful").length;
  const pending = DONATIONS.filter(d => d.status === "Pending").length;
  const failed = DONATIONS.filter(d => d.status === "Failed").length;

  const columns: Column<Donation>[] = [
    {
      key: "donor",
      header: "Donor",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {row.donor === "Anonymous Donor" ? "?" : row.donor.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.donor}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.email === "—" ? "—" : row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (row) => (
        <span className="font-semibold text-emerald-600">{formatINR(row.amount)}</span>
      ),
    },
    {
      key: "campaign",
      header: "Campaign",
      render: (row) => <span className="text-sm">{row.campaign === "—" ? "—" : row.campaign}</span>,
    },
    {
      key: "paymentMethod",
      header: "Method",
      render: (row) => <span className="text-sm">{row.paymentMethod}</span>,
    },
    {
      key: "date",
      header: "Date",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.date)}</span>,
    },
    {
      key: "txnId",
      header: "Transaction ID",
      render: (row) => <span className="text-xs font-mono text-muted-foreground">{row.txnId}</span>,
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
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View"><Eye className="h-4 w-4" /></Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="View 80G Receipt"
            onClick={() => openReceipt(row)}
          >
            <Receipt className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Donation Management"
        description="Track all donations, manage receipts, and export reports."
        action={
          <Button variant="outline" onClick={() => toast({ title: "Export started", description: "Donations exported to CSV." })}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Donations" value={formatINR(total)} icon={Heart} tone="primary" />
        <StatCard title="Successful" value={successful} icon={CheckCircle2} tone="accent" />
        <StatCard title="Pending" value={pending} icon={Clock} tone="amber" />
        <StatCard title="Failed" value={failed} icon={XCircle} tone="rose" />
      </div>

      <DataTable
        data={DONATIONS}
        columns={columns}
        searchKeys={["donor", "txnId", "id"]}
        filterOptions={{ key: "status", label: "All Status", options: ["Successful", "Pending", "Failed"] }}
        title="All Donations"
        onAdd={() => setFormOpen(true)}
        addLabel="Record Donation"
        onExport={() => toast({ title: "Export started", description: "Donations exported to CSV." })}
      />
    
      <FormDialog open={formOpen} onOpenChange={setFormOpen} schema={DONATION_FORM_SCHEMA} />
      <Receipt80GDialog
        open={receiptData !== null}
        onOpenChange={(o) => { if (!o) setReceiptData(null); }}
        data={receiptData}
      />
</div>
  );
}
