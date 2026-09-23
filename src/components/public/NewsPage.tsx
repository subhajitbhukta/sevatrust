"use client";

import { useState } from "react";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NEWS_ITEMS } from "@/lib/mock-data";
import { formatDate } from "@/components/shared/badges";

export function NewsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(NEWS_ITEMS.map((n) => n.category)));

  const filtered = NEWS_ITEMS.filter((n) => {
    const matchesSearch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || n.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">News & Updates</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Latest News & Announcements</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Stay updated with our latest activities, achievements, and announcements.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Featured news */}
          {filtered.length > 0 && (
            <Card className="overflow-hidden mb-10">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img src={filtered[0].cover} alt={filtered[0].title} className="h-full w-full object-cover" />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{filtered[0].category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(filtered[0].date)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{filtered[0].title}</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{filtered[0].content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" /> {filtered[0].author}
                    </span>
                    <Button variant="outline" size="sm">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* News grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(1).map((n) => (
              <Card key={n.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={n.cover}
                    alt={n.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{n.category}</Badge>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatDate(n.date)}
                  </p>
                  <h3 className="font-semibold mb-2 line-clamp-2 leading-snug">{n.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{n.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" /> {n.author}
                    </span>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      Read more <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No news articles found.</div>
          )}
        </div>
      </section>
    </div>
  );
}
