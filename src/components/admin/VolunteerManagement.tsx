"use client";

import { Eye, Edit, Plus, CheckCircle2, XCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate } from "@/components/shared/badges";
import { VOLUNTEERS } from "@/lib/mock-data";
import type { Volunteer } from "@/lib/types";
import { HandHeart, CheckCircle2 as Check, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VolunteerManagement() {
  const { toast } = useToast();

  const active = VOLUNTEERS.filter(v => v.status === "Active").length;
  const pending = VOLUNTEERS.filter(v => v.status === "Pending").length;

  const columns: Column<Volunteer>[] = [
    {
      key: "name",
      header: "Volunteer",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {row.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.occupation}</p>
          </div>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (row) => <span className="text-sm">{row.location}</span>,
    },
    {
      key: "skills",
      header: "Skills",
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.skills.map((s, i) => (
            <Badge key={i} variant="secondary" className="text-[10px]">{s}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: "interests",
      header: "Interests",
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.interests.map((s, i) => (
            <Badge key={i} variant="outline" className="text-[10px]">{s}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: "availability",
      header: "Availability",
      render: (row) => <span className="text-sm text-muted-foreground">{row.availability}</span>,
    },
    {
      key: "joinedDate",
      header: "Joined",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.joinedDate)}</span>,
    },
    {
      key: "activitiesCount",
      header: "Activities",
      render: (row) => <span className="text-sm font-medium">{row.activitiesCount}</span>,
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
          {row.status === "Pending" ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-600"
                onClick={() => toast({ title: "Volunteer approved", description: `${row.name} has been approved.` })}
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><XCircle className="h-4 w-4" /></Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Award className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Volunteer Management"
        description="Manage volunteer registrations, approvals, assignments, and certificates."
        action={
          <Button onClick={() => toast({ title: "Volunteer form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Add Volunteer
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Volunteers" value={VOLUNTEERS.length} icon={Users} tone="primary" />
        <StatCard title="Active" value={active} icon={HandHeart} tone="accent" />
        <StatCard title="Pending Approval" value={pending} icon={Clock} tone="amber" />
        <StatCard title="Total Activities" value={VOLUNTEERS.reduce((s, v) => s + v.activitiesCount, 0)} icon={Check} tone="sky" />
      </div>

      <DataTable
        data={VOLUNTEERS}
        columns={columns}
        searchKeys={["name", "location", "occupation", "id"]}
        filterOptions={{ key: "status", label: "All Status", options: ["Active", "Pending", "Inactive"] }}
        title="Volunteer Database"
      />
    </div>
  );
}
