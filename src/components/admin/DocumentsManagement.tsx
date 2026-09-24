"use client";

import { Eye, Download, Plus, Upload, FileText, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { formatDate } from "@/components/shared/badges";
import { DOCUMENTS } from "@/lib/mock-data";
import type { DocumentItem } from "@/lib/types";
import { FileText as FileIcon, FolderOpen, Globe as GlobeIcon, Lock as LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DocumentsManagement() {
  const { toast } = useToast();

  const categories = Array.from(new Set(DOCUMENTS.map(d => d.category)));

  const columns: Column<DocumentItem>[] = [
    {
      key: "name",
      header: "Document Name",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[260px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.id} · {row.size}</p>
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
      key: "version",
      header: "Version",
      render: (row) => <span className="text-sm">v{row.version}</span>,
    },
    {
      key: "date",
      header: "Date",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.date)}</span>,
    },
    {
      key: "visibility",
      header: "Visibility",
      render: (row) => (
        <Badge variant={row.visibility === "Public" ? "default" : "outline"} className="text-xs">
          {row.visibility === "Public" ? (
            <><Globe className="mr-1 h-3 w-3" /> Public</>
          ) : (
            <><Lock className="mr-1 h-3 w-3" /> Admin Only</>
          )}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: "Downloading..." })}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents Management"
        description="Central document repository with version control and visibility settings."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Upload document" })}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <Button onClick={() => toast({ title: "Add document metadata" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Documents" value={DOCUMENTS.length} icon={FileIcon} tone="primary" />
        <StatCard title="Public" value={DOCUMENTS.filter(d => d.visibility === "Public").length} icon={GlobeIcon} tone="accent" />
        <StatCard title="Admin Only" value={DOCUMENTS.filter(d => d.visibility === "Admin Only").length} icon={LockIcon} tone="amber" />
        <StatCard title="Categories" value={categories.length} icon={FolderOpen} tone="sky" />
      </div>

      <DataTable
        data={DOCUMENTS}
        columns={columns}
        searchKeys={["name", "id"]}
        filterOptions={{ key: "category", label: "All Categories", options: categories }}
        title="All Documents"
      />
    </div>
  );
}
