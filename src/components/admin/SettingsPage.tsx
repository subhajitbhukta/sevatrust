"use client";

import { useState } from "react";
import {
  Shield,
  Globe,
  Database,
  Bell,
  CreditCard,
  Save,
  Lock,
  KeyRound,
  Smartphone,
  Fingerprint,
  Download,
  Upload,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TRUST_INFO } from "@/lib/mock-data";

export function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    trustName: TRUST_INFO.name,
    trustEmail: TRUST_INFO.email,
    trustPhone: TRUST_INFO.phone,
    trustAddress: TRUST_INFO.address,
    language: "en",
    enable2FA: true,
    enableCaptcha: true,
    enableAuditLog: true,
    enableAutoBackup: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enableWhatsApp: false,
    enablePublicDocuments: true,
    enableDonationForm: true,
    enableVolunteerForm: true,
    enableCSRForm: true,
    paymentGateway: "razorpay",
    currency: "INR",
  });

  const update = (key: keyof typeof settings, value: string | boolean) =>
    setSettings({ ...settings, [key]: value });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Configuration"
        description="Configure trust profile, security, notifications, and integrations."
        action={
          <Button onClick={() => toast({ title: "Settings saved", description: "All changes have been applied." })}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Trust Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Trust Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trust-name">Trust Name</Label>
              <Input id="trust-name" value={settings.trustName} onChange={(e) => update("trustName", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="trust-email">Email</Label>
                <Input id="trust-email" value={settings.trustEmail} onChange={(e) => update("trustEmail", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="trust-phone">Phone</Label>
                <Input id="trust-phone" value={settings.trustPhone} onChange={(e) => update("trustPhone", e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="trust-addr">Address</Label>
              <Input id="trust-addr" value={settings.trustAddress} onChange={(e) => update("trustAddress", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Default Language</Label>
                <Select value={settings.language} onValueChange={(v) => update("language", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={settings.currency} onValueChange={(v) => update("currency", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "enable2FA", label: "Two-Factor Authentication", desc: "Require 2FA for admin accounts", icon: Fingerprint },
              { key: "enableCaptcha", label: "CAPTCHA Protection", desc: "Protect public forms from spam", icon: Shield },
              { key: "enableAuditLog", label: "Audit Logging", desc: "Record all admin actions", icon: KeyRound },
              { key: "enableAutoBackup", label: "Automatic Backup", desc: "Daily database backup at 2 AM", icon: Database },
            ].map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[s.key as keyof typeof settings] as boolean}
                  onCheckedChange={(v) => update(s.key as keyof typeof settings, v)}
                />
              </div>
            ))}
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Last backup: Today at 2:00 AM</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Download className="mr-2 h-3 w-3" /> Backup Now</Button>
                <Button variant="outline" size="sm"><Upload className="mr-2 h-3 w-3" /> Restore</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Notification Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "enableEmailNotifications", label: "Email Notifications", desc: "Send notifications via email", icon: Bell },
              { key: "enableSMSNotifications", label: "SMS Notifications", desc: "Send critical alerts via SMS", icon: Smartphone },
              { key: "enableWhatsApp", label: "WhatsApp Integration", desc: "Send updates via WhatsApp Business", icon: Bell },
            ].map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[s.key as keyof typeof settings] as boolean}
                  onCheckedChange={(v) => update(s.key as keyof typeof settings, v)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Public Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Public Website Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "enablePublicDocuments", label: "Public Documents Section", desc: "Show transparency documents" },
              { key: "enableDonationForm", label: "Online Donation Form", desc: "Accept donations via website" },
              { key: "enableVolunteerForm", label: "Volunteer Registration", desc: "Accept volunteer applications" },
              { key: "enableCSRForm", label: "CSR Enquiry Form", desc: "Accept CSR partnership enquiries" },
            ].map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <Switch
                  checked={settings[s.key as keyof typeof settings] as boolean}
                  onCheckedChange={(v) => update(s.key as keyof typeof settings, v)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Gateway */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Payment Gateway Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Payment Gateway</Label>
                <Select value={settings.paymentGateway} onValueChange={(v) => update("paymentGateway", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="razorpay">Razorpay</SelectItem>
                    <SelectItem value="payu">PayU Money</SelectItem>
                    <SelectItem value="paytm">Paytm for Business</SelectItem>
                    <SelectItem value="cashfree">Cashfree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="rzp_live_xxxxxxxxxxxx" />
              </div>
              <div>
                <Label htmlFor="api-secret">API Secret</Label>
                <Input id="api-secret" type="password" placeholder="••••••••••••••••" />
              </div>
              <div>
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input id="webhook" placeholder="https://yoursite.org/api/webhook" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline" className="text-xs"><Lock className="mr-1 h-3 w-3" /> Test Mode</Badge>
              <Badge variant="secondary" className="text-xs">Connected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
