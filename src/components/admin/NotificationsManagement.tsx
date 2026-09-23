"use client";

import { useState } from "react";
import { Bell, Mail, MessageSquare, Send, Plus, CheckCircle2, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard } from "@/components/shared/data-table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const NOTIFICATION_TEMPLATES = [
  {
    id: "TPL-001",
    audience: "Donor",
    event: "Donation Successful",
    subject: "Thank you for your donation!",
    channel: ["Email", "SMS"],
    enabled: true,
  },
  {
    id: "TPL-002",
    audience: "Donor",
    event: "Receipt Generated",
    subject: "Your 80G tax receipt is ready",
    channel: ["Email"],
    enabled: true,
  },
  {
    id: "TPL-003",
    audience: "Donor",
    event: "Campaign Acknowledgement",
    subject: "Thank you for supporting {campaign}",
    channel: ["Email", "WhatsApp"],
    enabled: true,
  },
  {
    id: "TPL-004",
    audience: "Volunteer",
    event: "Registration Received",
    subject: "We received your volunteer application",
    channel: ["Email", "SMS"],
    enabled: true,
  },
  {
    id: "TPL-005",
    audience: "Volunteer",
    event: "Approval",
    subject: "Welcome to {trust} volunteer team!",
    channel: ["Email"],
    enabled: true,
  },
  {
    id: "TPL-006",
    audience: "Volunteer",
    event: "Event Assignment",
    subject: "You have been assigned to {event}",
    channel: ["Email", "WhatsApp"],
    enabled: true,
  },
  {
    id: "TPL-007",
    audience: "Admin",
    event: "New Donation",
    subject: "New donation received: ₹{amount}",
    channel: ["Email", "SMS"],
    enabled: true,
  },
  {
    id: "TPL-008",
    audience: "Admin",
    event: "New Enquiry",
    subject: "New {category} enquiry from {name}",
    channel: ["Email"],
    enabled: true,
  },
  {
    id: "TPL-009",
    audience: "Admin",
    event: "Failed Payment",
    subject: "Payment failed for {donor}",
    channel: ["SMS"],
    enabled: false,
  },
  {
    id: "TPL-010",
    audience: "Participant",
    event: "Registration Confirmation",
    subject: "Your registration for {event} is confirmed",
    channel: ["Email", "SMS"],
    enabled: true,
  },
];

const CHANNEL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: Mail,
  SMS: Smartphone,
  WhatsApp: MessageSquare,
};

export function NotificationsManagement() {
  const { toast } = useToast();
  const [showComposer, setShowComposer] = useState(false);
  const [composer, setComposer] = useState({
    audience: "All Donors",
    subject: "",
    message: "",
    channels: { email: true, sms: false, whatsapp: false },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notification System"
        description="Configure automated notifications and send manual alerts across channels."
        action={
          <Button onClick={() => setShowComposer(!showComposer)}>
            <Plus className="mr-2 h-4 w-4" /> Compose Notification
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Active Templates" value={NOTIFICATION_TEMPLATES.filter(t => t.enabled).length} icon={Bell} tone="primary" />
        <StatCard title="Emails Sent (30d)" value="1,247" icon={Mail} tone="accent" />
        <StatCard title="SMS Sent (30d)" value="412" icon={Smartphone} tone="amber" />
        <StatCard title="Delivery Rate" value="98.4%" icon={CheckCircle2} tone="sky" />
      </div>

      {/* Composer */}
      {showComposer && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" /> Compose Manual Notification
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aud">Audience</Label>
                <Select value={composer.audience} onValueChange={(v) => setComposer({ ...composer, audience: v })}>
                  <SelectTrigger id="aud"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Donors">All Donors</SelectItem>
                    <SelectItem value="Active Volunteers">Active Volunteers</SelectItem>
                    <SelectItem value="All Beneficiaries">All Beneficiaries</SelectItem>
                    <SelectItem value="Event Participants">Event Participants</SelectItem>
                    <SelectItem value="Sponsors">Sponsors</SelectItem>
                    <SelectItem value="CSR Partners">CSR Partners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subj">Subject</Label>
                <Input id="subj" value={composer.subject} onChange={(e) => setComposer({ ...composer, subject: e.target.value })} placeholder="Subject line" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="msg">Message</Label>
              <Textarea
                id="msg"
                rows={4}
                value={composer.message}
                onChange={(e) => setComposer({ ...composer, message: e.target.value })}
                placeholder="Write your message..."
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label>Channels</Label>
              <div className="flex gap-4">
                {(["email", "sms", "whatsapp"] as const).map((ch) => (
                  <label key={ch} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={composer.channels[ch]}
                      onCheckedChange={(v) => setComposer({
                        ...composer,
                        channels: { ...composer.channels, [ch]: v === true }
                      })}
                    />
                    <span className="capitalize">{ch === "whatsapp" ? "WhatsApp" : ch}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button onClick={() => {
                toast({ title: "Notification queued", description: `Message will be sent to ${composer.audience}.` });
                setShowComposer(false);
                setComposer({ audience: "All Donors", subject: "", message: "", channels: { email: true, sms: false, whatsapp: false } });
              }}>
              <Send className="mr-2 h-4 w-4" /> Send Now
              </Button>
              <Button variant="outline" onClick={() => setShowComposer(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Automated Notification Templates</h3>
          <div className="space-y-2">
            {NOTIFICATION_TEMPLATES.map((t) => (
              <div key={t.id} className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/30">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0",
                  t.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{t.event}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
                <Badge variant="outline" className="text-xs">{t.audience}</Badge>
                <div className="flex items-center gap-1">
                  {t.channel.map((c) => {
                    const Icon = CHANNEL_ICONS[c] || Bell;
                    return (
                      <span key={c} className="flex h-7 w-7 items-center justify-center rounded-md bg-muted" title={c}>
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    );
                  })}
                </div>
                <Badge variant={t.enabled ? "default" : "secondary"} className="text-xs">
                  {t.enabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
