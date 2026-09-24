"use client";

import { useState } from "react";
import { Eye, Edit, Trash2, Plus, Download, Upload, Image as ImageIcon, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatCard } from "@/components/shared/data-table";
import { formatDate } from "@/components/shared/badges";
import { GALLERY_ITEMS } from "@/lib/mock-data";
import type { GalleryItem } from "@/lib/types";
import { Image as ImageIcon2, Video as VideoIcon, FolderOpen, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function GalleryManagement() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "Photo" | "Video">("all");

  const filtered = GALLERY_ITEMS.filter((g) => filter === "all" || g.type === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery Management"
        description="Manage photo and video gallery — albums, captions, and bulk uploads."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Bulk upload", description: "Drag-drop multiple photos/videos." })}>
              <Upload className="mr-2 h-4 w-4" /> Bulk Upload
            </Button>
            <Button onClick={() => toast({ title: "Add gallery item" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Items" value={GALLERY_ITEMS.length} icon={ImageIcon2} tone="primary" />
        <StatCard title="Photos" value={GALLERY_ITEMS.filter(g => g.type === "Photo").length} icon={ImageIcon2} tone="accent" />
        <StatCard title="Videos" value={GALLERY_ITEMS.filter(g => g.type === "Video").length} icon={VideoIcon} tone="amber" />
        <StatCard title="Albums" value={4} icon={FolderOpen} tone="sky" />
      </div>

      {/* Filter tabs */}
      <div className="flex justify-start">
        <div className="inline-flex rounded-lg border bg-card p-1">
          {[
            { key: "all", label: "All" },
            { key: "Photo", label: "Photos" },
            { key: "Video", label: "Videos" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                filter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((g) => (
          <Card key={g.id} className="overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative aspect-video overflow-hidden">
              <img src={g.url} alt={g.title} className="h-full w-full object-cover" />
              <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px]">{g.type}</Badge>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                <Button variant="secondary" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                <Button variant="secondary" size="icon" className="h-8 w-8 text-rose-600"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm line-clamp-1">{g.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{g.category} · {formatDate(g.date)}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{g.caption}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
