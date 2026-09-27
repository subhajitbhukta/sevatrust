"use client";

import {
  Heart,
  Target,
  Eye,
  Users,
  GraduationCap,
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
  Shirt,
  TreePine,
  BookOpen,
  Package,
  Facebook,
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
  ACTIVITY_PHOTOS,
} from "@/lib/mock-data";
import { formatDate, formatINR, ProgressBar } from "@/components/shared/badges";

export function HomePage() {
  const { publicPage, setPublicPage, language } = useAppStore();
  const isBn = language === "bn";

  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 pattern-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="bg-amber-400 text-stone-900 border-0">
                <Heart className="mr-1.5 h-3 w-3" fill="currentColor" /> {isBn ? "প্রতিষ্ঠা ২০২৪" : "Established 2024"}
              </Badge>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight bangla-heading">
                  {isBn ? "মানুষের পাশে," : "Beside people,"}
                  <br />
                  <span className="text-amber-300">{isBn ? "মানুষের জন্য ❤️" : "for people ❤️"}</span>
                </h1>
                <p className="mt-2 text-sm md:text-base text-amber-100/90 font-medium">
                  {isBn ? "ভারতী ব্যানার্জী মেমোরিয়াল ওয়েলফেয়ার ট্রাস্ট" : "Bharati Banerjee Memorial Welfare Trust"}
                </p>
              </div>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl bangla">
                {isBn
                  ? "ছোট ছোট উদ্যোগে মানবিকতার বার্তা ছড়িয়ে দেওয়াই আমাদের লক্ষ্য — বস্ত্র ও কম্বল বিতরণ, বৃক্ষরোপণ, শিক্ষা সামগ্রী এবং প্রয়োজনীয় সামগ্রী বিতরণ।"
                  : "Spreading humanity's message through small initiatives — clothes and blanket distribution, tree plantation, education supplies and essential items distribution in Singur, West Bengal."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setPublicPage("donate")} className="bg-amber-400 text-stone-900 hover:bg-amber-300">
                  <Heart className="mr-2 h-5 w-5" fill="currentColor" /> {isBn ? "দান করুন" : "Donate Now"}
                </Button>
                <Button size="lg" variant="outline" onClick={() => setPublicPage("about")} className="border-white/30 bg-white/5 text-white hover:bg-white/10">
                  {isBn ? "আরও জানুন" : "Learn More"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-200" />
                  {isBn ? "নথিভুক্ত ট্রাস্ট" : "Registered Trust"}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-200" />
                  {isBn ? "স্বচ্ছ কার্যক্রম" : "Transparent"}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-200" />
                  {isBn ? "সম্প্রদায়-চালিত" : "Community-Driven"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: isBn ? "উপকৃত" : "Beneficiaries", value: `${IMPACT_STATS.beneficiaries}+` },
                { icon: Building2, label: isBn ? "কার্যক্রম" : "Activities", value: `${IMPACT_STATS.projects}+` },
                { icon: MapPin, label: isBn ? "গ্রাম" : "Villages", value: `${IMPACT_STATS.villages}+` },
                { icon: TreePine, label: isBn ? "বৃক্ষ" : "Saplings", value: `${IMPACT_STATS.saplingsPlanted}+` },
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
                {isBn ? "আমাদের কথা" : "About the Trust"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight bangla-heading">
                {isBn ? "স্মৃতি থেকে সেবার যাত্রা" : "A journey of service born from memory"}
              </h2>
              <p className="text-muted-foreground leading-relaxed bangla">
                {isBn ? TRUST_INFO.aboutBn : TRUST_INFO.about}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-lg bg-muted/40 p-4">
                  <Eye className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">{isBn ? "আমাদের দৃষ্টিভঙ্গি" : "Our Vision"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 bangla">{isBn ? TRUST_INFO.visionBn : TRUST_INFO.vision}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <Target className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">{isBn ? "আমাদের লক্ষ্য" : "Our Mission"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 bangla">{isBn ? TRUST_INFO.missionBn : TRUST_INFO.mission}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setPublicPage("about")}>
                {isBn ? "আরও পড়ুন" : "Read More About Us"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shirt, title: isBn ? "বস্ত্র বিতরণ" : "Clothes Distribution", desc: isBn ? "বছরজুড়ে শিশু ও পরিবারে বস্ত্র পৌঁছে দেওয়া" : "Year-round clothes for poor children & families", color: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300" },
                { icon: TreePine, title: isBn ? "সবুজ সিঙ্গুর" : "Green Singur", desc: isBn ? "বৃক্ষরোপণ অভিযান" : "Tree plantation drives", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" },
                { icon: BookOpen, title: isBn ? "শিক্ষা সহায়তা" : "Education Support", desc: isBn ? "বই ও সামগ্রী বিতরণ" : "Books & supplies to children", color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
                { icon: Package, title: isBn ? "প্রয়োজনীয় সামগ্রী" : "Essentials", desc: isBn ? "খাদ্য ও দৈনন্দিন সামগ্রী" : "Food & daily-need items", color: "bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300" },
              ].map((c, i) => (
                <Card key={i} className={i % 2 === 1 ? "lg:mt-8" : ""}>
                  <CardContent className="p-5">
                    <div className={`mb-3 inline-flex rounded-lg p-2.5 ${c.color}`}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-1 bangla">{c.title}</h3>
                    <p className="text-sm text-muted-foreground bangla">{c.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Memorial message / Chairman message */}
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
                <p className="text-lg leading-relaxed italic bangla">
                  {isBn
                    ? "« ভারতীর স্মৃতিতে আমরা শুরু করেছি। প্রতিটি কম্বল, প্রতিটি চারা, প্রতিটি বই তাঁর ভালোবাসার প্রতিচ্ছবি। মানবিকতার ছোট ছোট উদ্যোগেই সমাজ বদলায়। এটাই তাঁর শিক্ষা ছিল। »"
                    : "« We began in Bharati's memory — every blanket, every sapling, every book is a reflection of her love. Humanity transforms society through small gestures — this was her teaching. »"}
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
              <Badge variant="outline" className="text-primary mb-3">{isBn ? "সক্রিয় ক্যাম্পেইন" : "Active Campaigns"}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold bangla-heading">{isBn ? "আপনার সাহায্যের অপেক্ষায় কারণ" : "Causes that need your support"}</h2>
              <p className="text-muted-foreground mt-2 bangla">{isBn ? "আপনার অবদান সরাসরি মাঠে পরিমাপযোগ্য প্রভাব ফেলে।" : "Your contribution directly funds measurable impact on the ground."}</p>
            </div>
            <Button variant="outline" onClick={() => setPublicPage("campaigns")}>
              {isBn ? "সব ক্যাম্পেইন" : "View All Campaigns"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVE_CAMPAIGNS.map((c) => {
              const pct = Math.round((c.collectedAmount / c.targetAmount) * 100);
              return (
                <Card key={c.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img src={c.cover} alt={c.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{c.category}</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-base leading-snug mb-2 line-clamp-2 bangla">{c.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 bangla">{c.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-primary">{formatINR(c.collectedAmount)}</span>
                        <span className="text-muted-foreground">{isBn ? "লক্ষ্য" : "of"} {formatINR(c.targetAmount)}</span>
                      </div>
                      <ProgressBar value={pct} />
                      <p className="text-xs text-muted-foreground">{pct}% {isBn ? "অর্জিত" : "funded"} · {c.beneficiaries} {isBn ? "উপকৃত" : "beneficiaries"}</p>
                    </div>
                    <Button className="w-full mt-4" size="sm" onClick={() => setPublicPage("donate")}>
                      <Heart className="mr-1.5 h-4 w-4" fill="currentColor" /> {isBn ? "দান করুন" : "Donate"}
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
            <Badge className="bg-amber-400 text-stone-900 border-0 mb-3">{isBn ? "আমাদের প্রভাব" : "Our Impact"}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold bangla-heading">{isBn ? "আমাদের গল্প বলে এমন সংখ্যা" : "Numbers that tell our story"}</h2>
            <p className="text-primary-foreground/80 mt-2 max-w-2xl mx-auto bangla">
              {isBn ? "প্রতিটি সংখ্যা একটি জীবনের পরিবর্তন, একটি সম্প্রদায়ের উষ্ণতার প্রতীক।" : "Every statistic represents a life touched, a community warmed, a future secured."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Users, value: `${IMPACT_STATS.beneficiaries}+`, label: isBn ? "উপকৃত" : "Beneficiaries" },
              { icon: Building2, value: `${IMPACT_STATS.projects}+`, label: isBn ? "কার্যক্রম" : "Activities" },
              { icon: MapPin, value: `${IMPACT_STATS.villages}+`, label: isBn ? "গ্রাম" : "Villages" },
              { icon: HandHeart, value: `${IMPACT_STATS.volunteers}+`, label: isBn ? "স্বেচ্ছাসেবী" : "Volunteers" },
              { icon: TreePine, value: `${IMPACT_STATS.saplingsPlanted}+`, label: isBn ? "বৃক্ষ" : "Saplings" },
              { icon: Award, value: `${IMPACT_STATS.yearsOfService}`, label: isBn ? "বছর" : "Years" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto h-8 w-8 text-amber-200 mb-3" />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-primary-foreground/80 mt-1 bangla">{stat.label}</p>
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
              <Badge variant="outline" className="text-primary mb-3">{isBn ? "সাম্প্রতিক কার্যক্রম" : "Recent Activities"}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold bangla-heading">{isBn ? "মাঠে আমাদের কাজ" : "Our work on the ground"}</h2>
            </div>
            <Button variant="outline" onClick={() => setPublicPage("activities")}>
              {isBn ? "সব কার্যক্রম" : "View All Activities"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.slice(0, 3).map((a) => (
              <Card key={a.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={a.cover} alt={a.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">{a.category}</Badge>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1">{formatDate(a.date)}</p>
                  <h3 className="font-semibold mb-2 line-clamp-2 bangla">{a.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 bangla">{a.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {a.location}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <Users className="h-3 w-3" /> {a.beneficiaries} {isBn ? "উপকৃত" : "benefited"}
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
              <Badge variant="outline" className="text-primary mb-3">{isBn ? "আসন্ন অনুষ্ঠান" : "Upcoming Events"}</Badge>
              <h2 className="text-3xl font-bold mb-6 bangla-heading">{isBn ? "পরবর্তী অনুষ্ঠানে যোগ দিন" : "Join us at our next event"}</h2>
              <div className="space-y-4">
                {UPCOMING_EVENTS_PUBLIC.map((e) => (
                  <Card key={e.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex gap-4 p-4">
                      <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Calendar className="h-5 w-5 mb-1" />
                        <span className="text-[10px]">{new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-1 bangla">{e.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          <Clock className="inline h-3 w-3 mr-1" /> {e.time} · {e.venue}
                        </p>
                        <p className="text-xs text-primary mt-1 font-medium">
                          {e.registered} / {e.participantLimit} {isBn ? "নিবন্ধিত" : "registered"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Badge variant="outline" className="text-primary mb-3">{isBn ? "সর্বশেষ খবর" : "Latest News & Updates"}</Badge>
              <h2 className="text-3xl font-bold mb-6 bangla-heading">{isBn ? "কী ঘটছে" : "What's happening"}</h2>
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
                        <h3 className="font-semibold text-sm line-clamp-2 bangla">{n.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1 bangla">{n.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="link" className="mt-2 p-0" onClick={() => setPublicPage("news")}>
                {isBn ? "সব খবর পড়ুন" : "Read all news"} <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook link banner */}
      <section className="py-10 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-950/30 dark:to-amber-950/30">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white flex-shrink-0">
                <Facebook className="h-7 w-7" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold">{isBn ? "ফেসবুকে আমাদের অনুসরণ করুন" : "Follow us on Facebook"}</h3>
                <p className="text-sm text-muted-foreground">{isBn ? "প্রতিটি কার্যক্রমের ছবি ও ভিডিও সরাসরি আপলোড হয় আমাদের ফেসবুক পেজে।" : "Every activity's photos and videos are uploaded directly to our Facebook page for full transparency."}</p>
              </div>
              <a href={TRUST_INFO.facebook} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Facebook className="mr-2 h-4 w-4" /> {isBn ? "পেজ দেখুন" : "Visit Page"}
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-primary mb-3">{isBn ? "সাক্ষ্য" : "Testimonials"}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold bangla-heading">{isBn ? "প্রভাবের কণ্ঠস্বর" : "Voices of impact"}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto bangla">
              {isBn ? "উপকৃত, দাতা ও স্বেচ্ছাসেবীদের বাস্তব গল্প।" : "Real stories from beneficiaries, donors, and volunteers who are part of our journey."}
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
                  <p className="text-sm text-muted-foreground italic leading-relaxed mb-4 line-clamp-5 bangla">« {t.quote} »</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-sm bangla">{t.name}</p>
                    <p className="text-xs text-muted-foreground bangla">{t.role}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bangla-heading">{isBn ? "আপনার উদারতা আজই একটি জীবন বদলে দিতে পারে" : "Your generosity can change a life today"}</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto bangla">
            {isBn ? "প্রতিটি অবদান পরিমাপযোগ্য পার্থক্য তৈরি করে। এখনই দান করুন এবং প্রাপ্ত রসিদ পান।" : "Every contribution, big or small, makes a measurable difference. Donate now and contribute to lasting community impact."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => setPublicPage("donate")}>
              <Heart className="mr-2 h-5 w-5" fill="currentColor" /> {isBn ? "এখনই দান করুন" : "Donate Now"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => setPublicPage("sponsorship")}>
              {isBn ? "স্পন্সর হোন" : "Become a Sponsor"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
