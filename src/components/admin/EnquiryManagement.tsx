"use client";

import { Eye, Plus, MessageSquare, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate } from "@/components/shared/badges";
import { ENQUIRIES } from "@/lib/mock-data";
import type { Enquiry } from "@/lib/types";
import { MessageSquare as MsgIcon, Clock, CheckCircle2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function EnquiryManagement() {
  const { toast } = useToast();

  const columns: Column<Enquiry>[] = [
    {
      key: "subject",
      header: "Enquiry",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[260px]">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="bg-accent text-accent-foreground text-xs">
              {row.category.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.subject}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => <Badge variant="secondary">{row.category}</Badge>,
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
      key: "assignedTo",
      header: "Assigned To",
      render: (row) => <span className="text-sm">{row.assignedTo}</span>,
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
      render: (row) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => toast({ title: "Opening enquiry", description: row.subject })}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiry & Contact Management"
        description="Manage all incoming enquiries, assign to team, and track follow-ups."
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Enquiries" value={ENQUIRIES.length} icon={MsgIcon} tone="primary" />
        <StatCard title="New" value={ENQUIRIES.filter(e => e.status === "New").length} icon={Clock} tone="amber" />
        <StatCard title="In Progress" value={ENQUIRIES.filter(e => e.status === "In Progress").length} icon={Users} tone="sky" />
        <StatCard title="Resolved" value={ENQUIRIES.filter(e => e.status === "Resolved" || e.status === "Closed").length} icon={CheckCircle2} tone="accent" />
      </div>

      <DataTable
        data={ENQUIRIES}
        columns={columns}
        searchKeys={["subject", "name", "email"]}
        filterOptions={{ key: "status", label: "All Status", options: ["New", "In Progress", "Resolved", "Closed"] }}
        title="Enquiry Inbox"
      />
    </div>
  );
}
