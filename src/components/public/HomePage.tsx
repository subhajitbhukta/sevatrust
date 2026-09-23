"use client";

import {
  Heart,
  Target,
  Eye,
  Users,
  GraduationCap,
  Stethoscope,
  Sprout,
  HandHeart,
  Calendar,
  ArrowRight,
  Quote,
  Star,
  Award,
  TrendingUp,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import {
  TRUST_INFO,
  TRUSTEES,
  ACTIVITIES,
  ACTIVE_CAMPAIGNS,
  UPCOMING_EVENTS_PUBLIC,
  LATEST_NEWS_PUBLIC,
  TESTIMONIALS,
  IMPACT_STATS,
} from "@/lib/mock-data";
import { formatDate, formatINR, ProgressBar } from "@/components/shared/badges";

export function HomePage() {
  const { setPublicPage } = useAppStore();

  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 pattern-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/15 text-white border-0 backdrop-blur">
                <Award className="mr-1.5 h-3 w-3" /> Guidestar Platinum Rated
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Serving Humanity, <br />
                <span className="text-amber-200">Building Hope</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                For over {IMPACT_STATS.yearsOfService} years, {TRUST_INFO.name} has been at the
                forefront of community transformation — touching{" "}
                {IMPACT_STATS.beneficiaries.toLocaleString("en-IN")}+ lives across{" "}
                {IMPACT_STATS.villages}+ villages through sustainable development programs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setPublicPage("donate")} className="bg-amber-400 text-stone-900 hover:bg-amber-300">
                  <Heart className="mr-2 h-5 w-5" fill="currentColor" /> Donate Now
                </Button>
                <Button size="lg" variant="outline" onClick={() => setPublicPage("about")} className="border-white/30 bg-white/5 text-white hover:bg-white/10">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-200" />
                  80G Tax Exempt
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-200" />
                  12A Registered
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-200" />
                  CSR Compliant
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Beneficiaries", value: `${(IMPACT_STATS.beneficiaries / 1000).toFixed(0)}K+` },
                { icon: Building2, label: "Projects", value: `${IMPACT_STATS.projects}+` },
                { icon: MapPin, label: "Villages", value: `${IMPACT_STATS.villages}+` },
                { icon: HandHeart, label: "Volunteers", value: `${IMPACT_STATS.volunteers}+` },
              ].map((stat, i) => (
                <Card key={i} className="border-0 bg-white/10 backdrop-blur text-white">
                  <CardContent className="p-5 text-center">
                    <stat.icon className="mx-auto h-7 w-7 mb-2 text-amber-200" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/80">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust introduction */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-5">
              <Badge variant="outline" className="text-primary">
                About the Trust
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                A grassroots movement for lasting change
              </h2>
              <p className="text-muted-foreground leading-relaxed">{TRUST_INFO.about}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-lg bg-muted/40 p-4">
                  <Eye className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Our Vision</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{TRUST_INFO.vision}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <Target className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Our Mission</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{TRUST_INFO.mission}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setPublicPage("about")}>
                Read More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, title: "Education", desc: "Free tuition, scholarships & digital literacy for 8,000+ children", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" },
                { icon: Stethoscope, title: "Healthcare", desc: "Mobile medical camps reaching 50+ remote tribal villages", color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
                { icon: Sprout, title: "Rural Development", desc: "Safe water, sanitation & sustainable livelihoods", color: "bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300" },
                { icon: HandHeart, title: "Women Empowerment", desc: "Skill training, microfinance & entrepreneurship support", color: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300" },
              ].map((c, i) => (
                <Card key={i} className={i % 2 === 1 ? "lg:mt-8" : ""}>
                  <CardContent className="p-5">
                    <div className={`mb-3 inline-flex rounded-lg p-2.5 ${c.color}`}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-1">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chairman message */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-primary-foreground/15" />
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={TRUSTEES[0].photo}
                alt={TRUSTEES[0].name}
                className="h-24 w-24 rounded-full border-4 border-primary-foreground/20 flex-shrink-0"
              />
              <div className="space-y-4 flex-1">
                <p className="text-lg leading-relaxed italic">
                  “When we started with just ten children in a single classroom, we did not imagine
                  the journey would take us this far. Every life we touch is a reminder that
                  compassion, when channeled through committed action, has the power to rewrite
                  destinies. I invite you to walk with us on this path of service.”
                </p>
                <div>
                  <p className="font-semibold">{TRUSTEES[0].name}</p>
                  <p className="text-sm text-primary-foreground/80">{TRUSTEES[0].role}, {TRUST_INFO.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active campaigns */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="outline" className="text-primary mb-3">Active Campaigns</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Causes that need your support</h2>
              <p className="text-muted-foreground mt-2">Your contribution directly funds measurable impact on the ground.</p>
            </div>
            <Button variant="outline" onClick={() => setPublicPage("campaigns")}>
              View All Campaigns <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVE_CAMPAIGNS.map((c) => {
              const pct = Math.round((c.collectedAmount / c.targetAmount) * 100);
              return (
                <Card key={c.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.cover}
                      alt={c.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{c.category}</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-base leading-snug mb-2 line-clamp-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{c.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-primary">{formatINR(c.collectedAmount)}</span>
                        <span className="text-muted-foreground">of {formatINR(c.targetAmount)}</span>
                      </div>
                      <ProgressBar value={pct} />
                      <p className="text-xs text-muted-foreground">{pct}% funded · {c.beneficiaries} beneficiaries</p>
                    </div>
                    <Button className="w-full mt-4" size="sm" onClick={() => setPublicPage("donate")}>
                      <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> Donate
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact statistics */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-400 text-stone-900 border-0 mb-3">Our Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Numbers that tell our story</h2>
            <p className="text-primary-foreground/80 mt-2 max-w-2xl mx-auto">
              Every statistic represents a life touched, a community transformed, a future secured.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Users, value: `${(IMPACT_STATS.beneficiaries / 1000).toFixed(1)}K+`, label: "Beneficiaries" },
              { icon: Building2, value: `${IMPACT_STATS.projects}+`, label: "Projects Completed" },
              { icon: MapPin, value: `${IMPACT_STATS.villages}+`, label: "Villages Reached" },
              { icon: HandHeart, value: `${IMPACT_STATS.volunteers}+`, label: "Active Volunteers" },
              { icon: TrendingUp, value: formatINR(IMPACT_STATS.amountRaised).replace("₹", "₹") , label: "Funds Utilised" },
              { icon: Award, value: `${IMPACT_STATS.yearsOfService}`, label: "Years of Service" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto h-8 w-8 text-amber-200 mb-3" />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-primary-foreground/80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest activities */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="outline" className="text-primary mb-3">Recent Activities</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Our work on the ground</h2>
            </div>
            <Button variant="outline" onClick={() => setPublicPage("activities")}>
              View All Activities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.slice(0, 3).map((a) => (
              <Card key={a.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{a.category}</Badge>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1">{formatDate(a.date)}</p>
                  <h3 className="font-semibold mb-2 line-clamp-1">{a.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{a.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {a.location}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <Users className="h-3 w-3" /> {a.beneficiaries} benefited
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events + latest news */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="text-primary mb-3">Upcoming Events</Badge>
              <h2 className="text-3xl font-bold mb-6">Join us at our next event</h2>
              <div className="space-y-4">
                {UPCOMING_EVENTS_PUBLIC.map((e) => (
                  <Card key={e.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex gap-4 p-4">
                      <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Calendar className="h-5 w-5 mb-1" />
                        <span className="text-[10px]">{new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-1">{e.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {e.time} · {e.venue}
                        </p>
                        <p className="text-xs text-primary mt-1 font-medium">
                          {e.registered} / {e.participantLimit} registered
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Badge variant="outline" className="text-primary mb-3">Latest News & Updates</Badge>
              <h2 className="text-3xl font-bold mb-6">What's happening</h2>
              <div className="space-y-4">
                {LATEST_NEWS_PUBLIC.slice(0, 3).map((n) => (
                  <Card key={n.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="flex gap-4 p-4">
                      <img src={n.cover} alt={n.title} className="h-16 w-16 rounded-md object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-[10px] px-2 py-0">{n.category}</Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(n.date)}</span>
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2">{n.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{n.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="link" className="mt-2 p-0" onClick={() => setPublicPage("news")}>
                Read all news <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-primary mb-3">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Voices of impact</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Real stories from beneficiaries, donors, and volunteers who are part of our journey.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <Card key={t.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill="currentColor" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/30 mb-2" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed mb-4 line-clamp-5">"{t.quote}"</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="warm-gradient py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Heart className="mx-auto h-12 w-12 text-primary mb-4" fill="currentColor" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Your generosity can change a life today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every contribution, big or small, makes a measurable difference. Donate now and
            receive instant 80G tax exemption receipt.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => setPublicPage("donate")}>
              <Heart className="mr-2 h-5 w-5" fill="currentColor" /> Donate Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => setPublicPage("sponsorship")}>
              Become a Sponsor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
