"use client";

import {
  Heart,
  Users,
  Calendar,
  Target,
  Share2,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CAMPAIGNS } from "@/lib/mock-data";
import { formatDate, formatINR, ProgressBar, StatusBadge } from "@/components/shared/badges";
import { useAppStore } from "@/lib/store";

export function CampaignsPage() {
  const { setPublicPage } = useAppStore();

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">Campaigns</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Active Fundraising Campaigns</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Support a cause that resonates with you. 100% of your donation funds the campaign you choose.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {CAMPAIGNS.map((c) => {
              const pct = Math.round((c.collectedAmount / c.targetAmount) * 100);
              return (
                <Card key={c.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={c.cover}
                      alt={c.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{c.category}</Badge>
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{c.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="rounded-lg bg-muted/40 p-3 text-center">
                        <Target className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="font-semibold text-sm">{formatINR(c.targetAmount)}</p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-3 text-center">
                        <TrendingUp className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Raised</p>
                        <p className="font-semibold text-sm text-emerald-600">{formatINR(c.collectedAmount)}</p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-3 text-center">
                        <Users className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Beneficiaries</p>
                        <p className="font-semibold text-sm">{c.beneficiaries}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-primary">{pct}% funded</span>
                        <span className="text-muted-foreground">
                          {formatINR(c.targetAmount - c.collectedAmount)} to go
                        </span>
                      </div>
                      <ProgressBar value={pct} />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Started {formatDate(c.startDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Ends {formatDate(c.endDate)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => setPublicPage("donate")}
                      >
                        <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> Donate Now
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
