"use client";

import { useState } from "react";
import {
  MapPin,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";
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
import { ACTIVITIES } from "@/lib/mock-data";
import { formatDate, StatusBadge } from "@/components/shared/badges";

export function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(ACTIVITIES.map((a) => a.category)));

  const filtered = ACTIVITIES.filter((a) => {
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || a.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">Activities</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Our Activities & Projects</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Browse our ongoing and completed initiatives across multiple domains of social impact.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[240px]">
                <Filter className="mr-2 h-4 w-4" />
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <Card key={a.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{a.category}</Badge>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(a.date)}
                    </span>
                    <StatusBadge status={a.status} />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg leading-snug mb-2 line-clamp-2">{a.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{a.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{a.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{a.objectives}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" /> Beneficiaries
                      </div>
                      <p className="font-semibold text-primary">{a.beneficiaries.toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" /> Impact
                      </div>
                      <p className="text-xs font-medium line-clamp-2">{a.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No activities match your search. Try different keywords or categories.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
