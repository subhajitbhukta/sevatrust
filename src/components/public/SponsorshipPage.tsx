"use client";

import {
  Heart,
  GraduationCap,
  Utensils,
  Stethoscope,
  Calendar,
  Wrench,
  Baby,
  CreditCard,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { formatINR } from "@/components/shared/badges";

const SPONSORSHIP_TYPES = [
  {
    icon: Baby,
    title: "Sponsor a Child",
    amount: 12000,
    duration: "per year",
    description: "Support a child's education, meals, and basic needs for a full academic year.",
    benefits: ["Quarterly progress report", "Direct correspondence with child", "Annual meet & greet", "80G receipt"],
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300",
  },
  {
    icon: GraduationCap,
    title: "Sponsor Education",
    amount: 25000,
    duration: "per year",
    description: "Fund tuition, books, uniforms, and digital learning resources for students.",
    benefits: ["Academic performance reports", "School visit opportunities", "Sponsor certificate", "80G receipt"],
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  {
    icon: Utensils,
    title: "Sponsor Food",
    amount: 6000,
    duration: "per year",
    description: "Provide daily nutritious mid-day meals to children in government schools.",
    benefits: ["Monthly impact reports", "Photo updates", "Sponsor badge", "80G receipt"],
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
  },
  {
    icon: Stethoscope,
    title: "Sponsor Medical Treatment",
    amount: 25000,
    duration: "one-time",
    description: "Cover medical treatment, surgery, or ongoing care for those in need.",
    benefits: ["Treatment progress updates", "Doctor reports", "Recovery follow-ups", "80G receipt"],
    color: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
  },
  {
    icon: Calendar,
    title: "Sponsor an Event",
    amount: 50000,
    duration: "one-time",
    description: "Sponsor community events, awareness programs, or annual celebrations.",
    benefits: ["Brand visibility at event", "Speaking opportunity", "Event photos & report", "80G receipt"],
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300",
  },
  {
    icon: Wrench,
    title: "Sponsor Equipment",
    amount: 15000,
    duration: "one-time",
    description: "Fund essential equipment — sewing machines, computers, medical tools.",
    benefits: ["Equipment utilization report", "Beneficiary acknowledgements", "Sponsor certificate", "80G receipt"],
    color: "bg-lime-50 text-lime-600 dark:bg-lime-950/40 dark:text-lime-300",
  },
];

export function SponsorshipPage() {
  const { setPublicPage } = useAppStore();

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">Sponsorship</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Recurring Sponsorship Programs</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Make a sustained impact through monthly or annual sponsorships. Build a long-term relationship with the cause you care about.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SPONSORSHIP_TYPES.map((s, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className={`inline-flex rounded-lg p-3 mb-4 ${s.color}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.description}</p>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">{formatINR(s.amount)}</span>
                    <span className="text-sm text-muted-foreground ml-1">{s.duration}</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {s.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button onClick={() => setPublicPage("donate")} className="w-full">
                    <Heart className="mr-2 h-4 w-4" fill="currentColor" /> Sponsor Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor features */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="text-primary mb-3">Sponsorship Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">More than just a donation</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our sponsorship program is designed for meaningful, long-term engagement between sponsors and beneficiaries.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CreditCard, title: "Flexible Recurring", desc: "Monthly, quarterly, or annual auto-renewal options" },
              { icon: Calendar, title: "Renewal Reminders", desc: "Automated reminders so your support never lapses" },
              { icon: Award, title: "Sponsor Certificate", desc: "Official certificate acknowledging your contribution" },
              { icon: Heart, title: "Direct Impact Updates", desc: "Regular stories and reports from your beneficiary" },
            ].map((f, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <f.icon className="mx-auto h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
