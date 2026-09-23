"use client";

import { useState } from "react";
import { Search, Download, ScrollText, Shield, Activity, Eye, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard } from "@/components/shared/data-table";
import { AUDIT_LOGS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export function AuditLog() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  const modules = Array.from(new Set(AUDIT_LOGS.map((l) => l.module)));

  const filtered = AUDIT_LOGS.filter((l) => {
    const matchesSearch = !search ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase());
    const matchesModule = moduleFilter === "all" || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Log"
        description="Complete activity trail of all administrative actions."
        action={
          <Button variant="outline" onClick={() => toast({ title: "Export started", description: "Audit log exported." })}>
            <Download className="mr-2 h-4 w-4" /> Export Log
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Activities" value={AUDIT_LOGS.length} icon={Activity} tone="primary" />
        <StatCard title="Active Users" value={new Set(AUDIT_LOGS.map(l => l.user)).size} icon={Shield} tone="accent" />
        <StatCard title="Modules Logged" value={modules.length} icon={ScrollText} tone="amber" />
        <StatCard title="Critical Actions" value={AUDIT_LOGS.filter(l => l.action === "Updated" || l.action === "Deleted").length} icon={Eye} tone="rose" />
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by user, action, or details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Modules" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                {modules.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            {filtered.map((log) => (
              <div key={log.id} className="flex items-start gap-4 pb-3 border-b last:border-0 last:pb-0">
                <Avatar className="h-9 w-9 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {log.user.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{log.user}</span>{" "}
                    <span className="text-muted-foreground">{log.action.toLowerCase()}</span>{" "}
                    <Badge variant="secondary" className="text-[10px]">{log.module}</Badge>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.details}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{log.timestamp}</span>
                    <span>·</span>
                    <span className="font-mono">IP: {log.ip}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No audit log entries match your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
