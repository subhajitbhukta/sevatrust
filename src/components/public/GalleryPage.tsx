"use client";

import { useState } from "react";
import { Play, Image as ImageIcon, Video, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GALLERY_ITEMS } from "@/lib/mock-data";
import { formatDate } from "@/components/shared/badges";
import { cn } from "@/lib/utils";

export function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "Photo" | "Video">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = GALLERY_ITEMS.filter((g) => filter === "all" || g.type === filter);
  const selectedItem = GALLERY_ITEMS.find((g) => g.id === selected);

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">Gallery</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Photo & Video Gallery</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Witness the impact of our work through photographs and videos from the field.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border bg-card p-1">
              {[
                { key: "all", label: "All", icon: ImageIcon },
                { key: "Photo", label: "Photos", icon: ImageIcon },
                { key: "Video", label: "Videos", icon: Video },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as typeof filter)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    filter === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((g) => (
              <Card
                key={g.id}
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelected(g.id)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={g.url}
                    alt={g.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {g.type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                        <Play className="h-5 w-5 text-stone-900" fill="currentColor" />
                      </div>
                    </div>
                  )}
                  <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px]">
                    {g.type}
                  </Badge>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white text-[10px]">
                    {g.category}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm line-clamp-1">{g.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(g.date)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setSelected(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === "Video" ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={selectedItem.url}
                  title={selectedItem.title}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="max-h-[80vh] w-full object-contain rounded-lg"
              />
            )}
            <div className="mt-4 text-white">
              <h3 className="font-semibold">{selectedItem.title}</h3>
              <p className="text-sm text-white/80">{selectedItem.caption}</p>
              <p className="text-xs text-white/60 mt-1">{formatDate(selectedItem.date)} · {selectedItem.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
