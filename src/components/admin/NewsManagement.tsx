"use client";

import { Eye, Edit, Trash2, Plus, Download, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { formatDate } from "@/components/shared/badges";
import { NEWS_ITEMS } from "@/lib/mock-data";
import type { NewsItem } from "@/lib/types";
import { Newspaper, CheckCircle2, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsManagement() {
  const { toast } = useToast();

  const columns: Column<NewsItem>[] = [
    {
      key: "title",
      header: "News Article",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[300px]">
          <img src={row.cover} alt={row.title} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{row.title}</p>
            <p className="text-xs text-muted-foreground">{row.id} · by {row.author}</p>
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
      header: "Published",
      render: (row) => (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatDate(row.date)}
        </span>
      ),
    },
    {
      key: "excerpt",
      header: "Excerpt",
      render: (row) => <span className="text-xs text-muted-foreground line-clamp-1 max-w-[260px]">{row.excerpt}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="News & Updates Management"
        description="Publish and manage news articles, announcements, and notices."
        action={
          <Button onClick={() => toast({ title: "Article form opened", description: "Create new article with text, images, videos, PDFs, or external links." })}>
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Articles" value={NEWS_ITEMS.length} icon={Newspaper} tone="primary" />
        <StatCard title="Published" value={NEWS_ITEMS.length} icon={CheckCircle2} tone="accent" />
        <StatCard title="Drafts" value={2} icon={Clock} tone="amber" />
        <StatCard title="Total Views" value="12.4K" icon={FileText} tone="sky" />
      </div>

      <DataTable
        data={NEWS_ITEMS}
        columns={columns}
        searchKeys={["title", "author"]}
        filterOptions={{ key: "category", label: "All Categories", options: ["News", "Announcement", "Press Release", "Achievement", "Notice"] }}
        title="All News Articles"
      />
    </div>
  );
}
