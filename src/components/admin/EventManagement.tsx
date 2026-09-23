"use client";

import { Eye, Edit, Trash2, Plus, Calendar, MapPin, Users, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate, ProgressBar } from "@/components/shared/badges";
import { EVENTS } from "@/lib/mock-data";
import type { EventItem } from "@/lib/types";
import { Calendar as CalIcon, CheckCircle2, Clock, Users as UsersIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function EventManagement() {
  const { toast } = useToast();

  const columns: Column<EventItem>[] = [
    {
      key: "title",
      header: "Event",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[260px]">
          <img src={row.cover} alt={row.title} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.title}</p>
            <p className="text-xs text-muted-foreground">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date & Time",
      render: (row) => (
        <div>
          <p className="text-sm flex items-center gap-1"><Calendar className="h-3 w-3 text-primary" /> {formatDate(row.date)}</p>
          <p className="text-xs text-muted-foreground">{row.time}</p>
        </div>
      ),
    },
    {
      key: "venue",
      header: "Venue",
      render: (row) => (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {row.venue}
        </span>
      ),
    },
    {
      key: "registered",
      header: "Registration",
      render: (row) => {
        const pct = Math.round((row.registered / row.participantLimit) * 100);
        return (
          <div className="min-w-[140px]">
            <p className="text-xs mb-1">{row.registered} / {row.participantLimit}</p>
            <ProgressBar value={pct} />
          </div>
        );
      },
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
            title="Generate QR code"
            onClick={() => toast({ title: "QR Code generated", description: `Attendance QR for ${row.title} ready.` })}
          >
            <QrCode className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Event Management"
        description="Create events, manage registrations, and track attendance."
        action={
          <Button onClick={() => toast({ title: "Event form opened" })}>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Events" value={EVENTS.length} icon={CalIcon} tone="primary" />
        <StatCard title="Upcoming" value={EVENTS.filter(e => e.status === "Upcoming").length} icon={Clock} tone="amber" />
        <StatCard title="Completed" value={EVENTS.filter(e => e.status === "Completed").length} icon={CheckCircle2} tone="accent" />
        <StatCard title="Total Registrations" value={EVENTS.reduce((s, e) => s + e.registered, 0)} icon={UsersIcon} tone="sky" />
      </div>

      <DataTable
        data={EVENTS}
        columns={columns}
        searchKeys={["title", "venue", "id"]}
        filterOptions={{ key: "status", label: "All Status", options: ["Upcoming", "Ongoing", "Completed", "Cancelled"] }}
        title="All Events"
      />
    </div>
  );
}
