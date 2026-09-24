"use client";

import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  FileText,
  Building2,
  Calendar,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TRUST_INFO,
  TRUSTEES,
  ADVISORY_MEMBERS,
} from "@/lib/mock-data";

export function AboutPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <section className="hero-gradient text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About {TRUST_INFO.name}</h1>
          <p className="mt-3 max-w-2xl text-white/90">{TRUST_INFO.tagline}</p>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-5 items-start">
            <div className="lg:col-span-2 space-y-4">
              <Badge variant="outline" className="text-primary">Our Story</Badge>
              <h2 className="text-3xl font-bold">A journey of compassion since {TRUST_INFO.established}</h2>
              <p className="text-muted-foreground leading-relaxed">{TRUST_INFO.history}</p>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="rounded-lg bg-muted/40 p-4">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <p className="text-xl font-bold">{TRUST_INFO.established}</p>
                  <p className="text-xs text-muted-foreground">Year founded</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <Building2 className="h-6 w-6 text-primary mb-2" />
                  <p className="text-xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">Active centres</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <p className="text-xl font-bold">3 States</p>
                  <p className="text-xs text-muted-foreground">Operating regions</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <Award className="h-6 w-6 text-primary mb-2" />
                  <p className="text-xl font-bold">Platinum</p>
                  <p className="text-xs text-muted-foreground">Guidestar rating</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">About the Trust</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{TRUST_INFO.about}</p>
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-3">Key milestones</h4>
                    <div className="space-y-3">
                      {[
                        { year: "2009", event: "Trust registered; first classroom in Dharavi with 10 children" },
                        { year: "2014", event: "Launched flagship Mobile Medical Unit program" },
                        { year: "2018", event: "Established Women's Skill Centre in Pune" },
                        { year: "2022", event: "Introduced digital learning labs in 12 rural schools" },
                        { year: "2024", event: "Crossed 1 lakh beneficiaries mark" },
                        { year: "2026", event: "Active in 220+ villages across 3 states" },
                      ].map((m, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              {m.year}
                            </div>
                            {i < 5 && <div className="mx-auto w-px h-6 bg-border mt-1" />}
                          </div>
                          <p className="text-sm text-muted-foreground pt-3">{m.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission & Objectives */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <Eye className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-xl mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">{TRUST_INFO.vision}</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-accent">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-accent-foreground mb-3" />
                <h3 className="font-bold text-xl mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">{TRUST_INFO.mission}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <Badge variant="outline" className="text-primary mb-3">Our Objectives</Badge>
            <h2 className="text-3xl font-bold mb-6">What we strive to achieve</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {TRUST_INFO.objectives.map((obj, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="text-sm leading-relaxed">{obj}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trustees */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="text-primary mb-3">Leadership</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Our Trustees & Governing Body</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Guided by experienced professionals committed to the cause of social upliftment.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRUSTEES.map((t) => (
              <Card key={t.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-muted/40 p-6 flex flex-col items-center text-center">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-24 w-24 rounded-full border-4 border-background shadow-sm"
                  />
                  <h3 className="font-semibold mt-4">{t.name}</h3>
                  <p className="text-sm text-primary font-medium">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{t.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory members */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="text-primary mb-3">Advisory Council</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Our Advisory Members</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Renowned experts who provide strategic guidance across program areas.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORY_MEMBERS.map((t) => (
              <Card key={t.id} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-20 w-20 rounded-full mx-auto border-2 border-primary/20"
                  />
                  <h3 className="font-semibold mt-3">{t.name}</h3>
                  <p className="text-xs text-primary font-medium">{t.role}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Organization structure */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="text-primary mb-3">Structure</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Organisation Structure</h2>
          </div>
          <Card>
            <CardContent className="p-6 md:p-10">
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-center">
                    <p className="font-semibold">Board of Trustees</p>
                    <p className="text-xs text-primary-foreground/80">Strategic direction & governance</p>
                  </div>
                  <div className="w-px h-6 bg-border" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg bg-accent text-accent-foreground px-6 py-3 text-center">
                    <p className="font-semibold">Founder & Chairman</p>
                    <p className="text-xs">Executive leadership</p>
                  </div>
                  <div className="w-px h-6 bg-border" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg bg-muted px-6 py-3 text-center">
                    <p className="font-semibold">Advisory Council</p>
                    <p className="text-xs text-muted-foreground">Domain expertise</p>
                  </div>
                  <div className="w-px h-6 bg-border" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Programs", desc: "Field operations" },
                    { name: "Finance", desc: "Accounts & audit" },
                    { name: "Communications", desc: "Outreach & media" },
                    { name: "HR & Admin", desc: "Operations" },
                  ].map((dept, i) => (
                    <div key={i} className="rounded-lg border p-3 text-center">
                      <p className="font-medium text-sm">{dept.name}</p>
                      <p className="text-xs text-muted-foreground">{dept.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center pt-2">
                  <div className="w-px h-6 bg-border" />
                  <div className="rounded-lg border border-dashed px-6 py-3 text-center">
                    <p className="font-medium text-sm">Volunteers & Field Staff</p>
                    <p className="text-xs text-muted-foreground">380+ active members</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registration & Legal */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="text-primary mb-3">Compliance</Badge>
              <h2 className="text-3xl font-bold mb-4">Registration & Legal Information</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{TRUST_INFO.legalInfo}</p>
              <div className="space-y-3">
                {[
                  { label: "Trust Registration No.", value: TRUST_INFO.registrationNo },
                  { label: "PAN Number", value: TRUST_INFO.pan },
                  { label: "12A Registration", value: "Registered under Section 12A(a) of IT Act, 1961" },
                  { label: "80G Approval", value: "Donations exempt under Section 80G" },
                  { label: "FCRA Registration", value: "Registered for foreign contributions" },
                  { label: "GST Registration", value: "27AABTA1234N1Z5" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 rounded-lg border bg-card p-3">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Badge variant="outline" className="text-primary mb-3">Documents</Badge>
              <h2 className="text-3xl font-bold mb-4">Trust Deed & Certificates</h2>
              <p className="text-muted-foreground mb-6">
                Our registration documents, certificates, and trust deed are available for public review. We believe in complete transparency in our operations.
              </p>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[
                      { name: "Trust Registration Certificate", date: "14 Aug 2009" },
                      { name: "Trust Deed", date: "14 Aug 2009" },
                      { name: "12A Tax Exemption Certificate", date: "22 Mar 2010" },
                      { name: "80G Approval Letter", date: "22 Mar 2010" },
                      { name: "FCRA Registration", date: "15 Jul 2011" },
                      { name: "Annual Report 2025-26", date: "10 Sep 2026" },
                    ].map((d, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/40">
                        <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">Uploaded: {d.date}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">PDF</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                Visit our <button className="text-primary underline">Transparency section</button> for full financial reports.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
