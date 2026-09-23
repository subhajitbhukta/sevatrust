"use client";

import { Eye, Edit, Trash2, Plus, MapPin, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, DataTable, type Column } from "@/components/shared/data-table";
import { StatusBadge, formatDate } from "@/components/shared/badges";
import { ACTIVITIES } from "@/lib/mock-data";
import type { Activity } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function ActivitiesManagement() {
  const { toast } = useToast();

  const categories = Array.from(new Set(ACTIVITIES.map((a) => a.category)));

  const columns: Column<Activity>[] = [
    {
      key: "name",
      header: "Activity",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[260px]">
          <img src={row.cover} alt={row.name} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {row.location}
            </p>
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
      key: "date",
      header: "Date",
      render: (row) => (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatDate(row.date)}
        </span>
      ),
    },
    {
      key: "beneficiaries",
      header: "Beneficiaries",
      render: (row) => (
        <span className="text-sm font-medium flex items-center gap-1">
          <Users className="h-3 w-3 text-primary" /> {row.beneficiaries.toLocaleString("en-IN")}
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
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Activities & Projects Management"
        description="Create, manage, and track all trust activities and projects."
        action={
          <Button onClick={() => toast({ title: "Activity form opened", description: "Create new activity modal would open here." })}>
            <Plus className="mr-2 h-4 w-4" /> Add Activity
          </Button>
        }
      />
      <DataTable
        data={ACTIVITIES}
        columns={columns}
        searchKeys={["name", "location"]}
        filterOptions={{ key: "category", label: "All Categories", options: categories }}
        title="All Activities"
        onAdd={() => toast({ title: "Activity form opened", description: "Create new activity modal would open here." })}
        onExport={() => toast({ title: "Export started", description: "Activities will be exported to CSV." })}
      />
    </div>
  );
}
