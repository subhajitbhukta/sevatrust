"use client";

import {
  FileText,
  Download,
  Eye,
  Shield,
  TrendingUp,
  Users,
  Building2,
  HandHeart,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DOCUMENTS, IMPACT_STATS, DONATION_SOURCES, MONTHLY_DONATIONS } from "@/lib/mock-data";
import { formatDate, formatINR } from "@/components/shared/badges";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PUBLIC_DOCUMENTS = DOCUMENTS.filter((d) => d.visibility === "Public");

const PIE_COLORS = ["oklch(0.55 0.14 165)", "oklch(0.70 0.15 75)", "oklch(0.60 0.18 30)", "oklch(0.65 0.12 200)"];

export function TransparencyPage() {
  const totalDonations = DONATION_SOURCES.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">Transparency</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Transparency & Reports</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            We believe in complete accountability. Explore our financials, impact reports, and official documents.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: TrendingUp, label: "Total Funds (FY 25-26)", value: formatINR(totalDonations), color: "bg-emerald-50 text-emerald-600" },
              { icon: Users, label: "Beneficiaries", value: `${(IMPACT_STATS.beneficiaries / 1000).toFixed(0)}K+`, color: "bg-amber-50 text-amber-600" },
              { icon: Building2, label: "Active Projects", value: `${IMPACT_STATS.projects}+`, color: "bg-sky-50 text-sky-600" },
              { icon: HandHeart, label: "Volunteers", value: `${IMPACT_STATS.volunteers}+`, color: "bg-rose-50 text-rose-600" },
            ].map((s, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className={`inline-flex rounded-lg p-2.5 mb-3 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2 mb-10">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Monthly Donations (FY 25-26)</h3>
                <p className="text-xs text-muted-foreground mb-4">Month-wise donation collection trend</p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={MONTHLY_DONATIONS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 80)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.55 0.02 70)" />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="oklch(0.55 0.02 70)"
                      tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                    />
                    <Tooltip
                      formatter={(v: number) => formatINR(v)}
                      contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.90 0.01 80)" }}
                    />
                    <Bar dataKey="amount" fill="oklch(0.55 0.14 165)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Donation Sources</h3>
                <p className="text-xs text-muted-foreground mb-4">Breakdown of funding by source type</p>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={DONATION_SOURCES}
                      dataKey="amount"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {DONATION_SOURCES.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatINR(v)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Public Documents</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            All our registration documents, audited financials, and reports are available for public review.
          </p>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {PUBLIC_DOCUMENTS.map((d) => (
                  <div key={d.id} className="flex items-center gap-4 p-4 hover:bg-muted/40">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.category} · v{d.version} · {d.size} · {formatDate(d.date)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{d.visibility}</Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
            <Award className="mx-auto h-10 w-10 text-primary mb-2" />
            <h3 className="font-bold text-lg mb-1">Accredited & Transparent</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              We are accredited by Guidestar India (Platinum), Credibility Alliance, and comply with all regulatory requirements under the Income Tax Act and Bombay Public Trusts Act.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
