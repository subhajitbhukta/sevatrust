"use client";

import {
  Heart,
  Users,
  Target,
  TrendingUp,
  HandHeart,
  Calendar,
  MessageSquare,
  Receipt,
  Building2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatINR, formatDate } from "@/components/shared/badges";
import {
  DONATIONS,
  CAMPAIGNS,
  UPCOMING_EVENTS_PUBLIC,
  ENQUIRIES,
  ACTIVITIES,
  MONTHLY_DONATIONS,
  CATEGORY_DISTRIBUTION,
  DONATION_SOURCES,
  IMPACT_STATS,
} from "@/lib/mock-data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
  LineChart,
  Line,
} from "recharts";

const PIE_COLORS = CATEGORY_DISTRIBUTION.map((c) => c.color);

export function DashboardPage() {
  const totalDonations = DONATIONS.filter((d) => d.status === "Successful").reduce(
    (sum, d) => sum + d.amount,
    0
  );
  const monthDonations = 2100000;
  const activeCampaigns = CAMPAIGNS.filter((c) => c.status === "Active").length;
  const pendingEnquiries = ENQUIRIES.filter((e) => e.status === "New").length;
  const activeVolunteers = 5;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <Card className="overflow-hidden border-0 bg-primary text-primary-foreground">
        <CardContent className="p-6 md:p-8 relative">
          <div className="absolute inset-0 pattern-bg opacity-15" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Badge className="bg-white/15 text-white border-0 mb-2">
                {new Date().toLocaleDateString("en-IN", { weekday: "long" })}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome back, Dr. Rajesh 👋
              </h2>
              <p className="text-primary-foreground/80 mt-1 text-sm">
                Here's what's happening at {IMPACT_STATS.yearsOfService ? "Ananya Seva Trust" : "the Trust"} today.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Activity
              </Button>
              <Button className="bg-amber-400 text-stone-900 hover:bg-amber-300" size="sm">
                <Heart className="mr-2 h-4 w-4" fill="currentColor" /> New Campaign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatCard
          title="Total Donations (FY)"
          value={formatINR(totalDonations)}
          change="+18% from last year"
          icon={Heart}
          tone="primary"
        />
        <StatCard
          title="This Month"
          value={formatINR(monthDonations)}
          change="+12% vs last month"
          icon={TrendingUp}
          tone="accent"
        />
        <StatCard
          title="Active Campaigns"
          value={activeCampaigns}
          change={`${CAMPAIGNS.filter(c => c.status === "Upcoming").length} upcoming`}
          icon={Target}
          tone="amber"
        />
        <StatCard
          title="Active Projects"
          value={ACTIVITIES.filter(a => a.status === "Ongoing").length}
          change="3 new this month"
          icon={Activity}
          tone="sky"
        />
        <StatCard
          title="Total Beneficiaries"
          value={`${(IMPACT_STATS.beneficiaries / 1000).toFixed(0)}K+`}
          change="+2.4K added this quarter"
          icon={Users}
          tone="primary"
        />
        <StatCard
          title="Active Volunteers"
          value={activeVolunteers + 378}
          change="+15 new applications"
          icon={HandHeart}
          tone="accent"
        />
        <StatCard
          title="Pending Enquiries"
          value={pendingEnquiries}
          change="Needs attention"
          icon={MessageSquare}
          tone="rose"
        />
        <StatCard
          title="Upcoming Events"
          value={UPCOMING_EVENTS_PUBLIC.length}
          change="Next: Oct 2"
          icon={Calendar}
          tone="amber"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Donation Trend</CardTitle>
            <p className="text-xs text-muted-foreground">Monthly donation collection (last 6 months)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={MONTHLY_DONATIONS}>
                <defs>
                  <linearGradient id="colorDonation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.45 0.12 165)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.45 0.12 165)" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="oklch(0.45 0.12 165)"
                  strokeWidth={2.5}
                  fill="url(#colorDonation)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category Distribution</CardTitle>
            <p className="text-xs text-muted-foreground">Beneficiaries by program category</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {CATEGORY_DISTRIBUTION.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Donation sources + Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Donation Sources</CardTitle>
            <p className="text-xs text-muted-foreground">Funding breakdown by source</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={DONATION_SOURCES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 80)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12 }}
                  stroke="oklch(0.55 0.02 70)"
                  tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                />
                <YAxis
                  type="category"
                  dataKey="source"
                  tick={{ fontSize: 11 }}
                  stroke="oklch(0.55 0.02 70)"
                  width={100}
                />
                <Tooltip
                  formatter={(v: number) => formatINR(v)}
                  contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.90 0.01 80)" }}
                />
                <Bar dataKey="amount" fill="oklch(0.70 0.15 75)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Donations</CardTitle>
            <p className="text-xs text-muted-foreground">Latest transactions</p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[280px] overflow-y-auto">
            {DONATIONS.slice(0, 6).map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {d.donor.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{d.donor}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(d.date)} · {d.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600">{formatINR(d.amount)}</p>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent enquiries + Upcoming events */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Enquiries</CardTitle>
            <p className="text-xs text-muted-foreground">Latest enquiries received</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {ENQUIRIES.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {e.category.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.subject}</p>
                  <p className="text-xs text-muted-foreground">{e.name} · {e.category}</p>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming Events</CardTitle>
            <p className="text-xs text-muted-foreground">Events scheduled in coming days</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {UPCOMING_EVENTS_PUBLIC.map((e) => (
              <div key={e.id} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                  <span className="text-[10px] leading-none">
                    {new Date(e.date).toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                  <span className="text-base font-bold leading-tight">
                    {new Date(e.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.time} · {e.venue}</p>
                  <p className="text-xs text-primary mt-0.5">{e.registered}/{e.participantLimit} registered</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fund flow summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fund Flow Summary (FY 2025-26)</CardTitle>
          <p className="text-xs text-muted-foreground">Donations → Projects → Expenses → Balance</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Donations Received", value: formatINR(18500000), icon: Heart, tone: "text-emerald-600 bg-emerald-50" },
              { label: "Allocated to Projects", value: formatINR(14500000), icon: Target, tone: "text-primary bg-primary/10" },
              { label: "Total Expenses", value: formatINR(12200000), icon: Receipt, tone: "text-amber-600 bg-amber-50" },
              { label: "Available Balance", value: formatINR(6300000), icon: Building2, tone: "text-sky-600 bg-sky-50" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div className={`inline-flex rounded-md p-2 mb-2 ${item.tone}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
