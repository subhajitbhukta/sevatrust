"use client";

import { useState } from "react";
import {
  Heart,
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  CheckCircle2,
  FileText,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CAMPAIGNS, TRUST_INFO } from "@/lib/mock-data";
import { formatINR } from "@/components/shared/badges";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [500, 1100, 2100, 5100, 11000, 25000];

export function DonatePage() {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState<number>(1100);
  const [customAmount, setCustomAmount] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [consent, setConsent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pan: "",
    purpose: "General Donation",
    campaign: "",
  });

  const finalAmount = customAmount ? Number(customAmount) : amount;

  const handleNext = () => {
    if (step === 1) {
      if (!form.name || !form.mobile || !form.email) {
        toast({
          title: "Please fill required fields",
          description: "Name, mobile and email are required.",
          variant: "destructive",
        });
        return;
      }
      if (!consent) {
        toast({
          title: "Consent required",
          description: "Please accept the consent to proceed.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Donation successful!",
      description: `Receipt has been sent to ${form.email}. Thank you for your contribution of ${formatINR(finalAmount)}.`,
    });
    setStep(1);
    setForm({ name: "", mobile: "", email: "", address: "", pan: "", purpose: "General Donation", campaign: "" });
    setCustomAmount("");
    setConsent(false);
  };

  return (
    <div className="bg-background">
      <section className="hero-gradient text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Badge className="bg-white/15 text-white border-0 mb-3">Donate</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Make a Difference Today</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Your contribution directly impacts lives. Every donation receives an instant 80G tax exemption receipt.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Steps indicator */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-4">Donation Steps</h3>
                  <div className="space-y-4">
                    {[
                      { n: 1, label: "Donor Details", desc: "Your information" },
                      { n: 2, label: "Payment Method", desc: "Choose payment option" },
                      { n: 3, label: "Confirmation", desc: "Review & confirm" },
                    ].map((s) => (
                      <div key={s.n} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                            step === s.n
                              ? "bg-primary text-primary-foreground"
                              : step > s.n
                              ? "bg-emerald-500 text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {step > s.n ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                        </div>
                        <div>
                          <p className={cn("text-sm font-medium", step === s.n && "text-primary")}>{s.label}</p>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <Shield className="h-5 w-5" />
                    <p className="font-semibold">Secure & Tax Exempt</p>
                  </div>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      80G tax exemption certificate
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      SSL encrypted secure payment
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      Instant PDF receipt via email
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      100% funds go to the cause
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Main form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Donor Information</h2>
                        <p className="text-sm text-muted-foreground">Fill in your details to proceed.</p>
                      </div>

                      {/* Amount selection */}
                      <div className="space-y-3">
                        <Label>Choose Donation Amount</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {PRESET_AMOUNTS.map((a) => (
                            <button
                              key={a}
                              onClick={() => { setAmount(a); setCustomAmount(""); }}
                              className={cn(
                                "rounded-lg border-2 px-3 py-3 text-center text-sm font-semibold transition-colors",
                                amount === a && !customAmount
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary/40"
                              )}
                            >
                              ₹{a.toLocaleString("en-IN")}
                            </button>
                          ))}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                          <Input
                            type="number"
                            placeholder="Enter custom amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="pl-7"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mobile">Mobile Number *</Label>
                          <Input
                            id="mobile"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            placeholder="+91 98XXX XXXXX"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pan">PAN (for 80G receipt)</Label>
                          <Input
                            id="pan"
                            value={form.pan}
                            onChange={(e) => setForm({ ...form, pan: e.target.value })}
                            placeholder="ABCDE1234F"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          placeholder="Your full address"
                          rows={2}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="purpose">Donation Purpose</Label>
                          <select
                            id="purpose"
                            value={form.purpose}
                            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option>General Donation</option>
                            <option>Campaign Contribution</option>
                            <option>Sponsorship</option>
                            <option>Specific Project</option>
                            <option>Relief Fund</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="campaign">Campaign (optional)</Label>
                          <select
                            id="campaign"
                            value={form.campaign}
                            onChange={(e) => setForm({ ...form, campaign: e.target.value })}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="">— Select Campaign —</option>
                            {CAMPAIGNS.filter((c) => c.status === "Active").map((c) => (
                              <option key={c.id} value={c.title}>{c.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="anonymous"
                            checked={anonymous}
                            onCheckedChange={(v) => setAnonymous(v === true)}
                          />
                          <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                            Make this donation anonymous
                          </Label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="consent"
                            checked={consent}
                            onCheckedChange={(v) => setConsent(v === true)}
                          />
                          <Label htmlFor="consent" className="text-sm cursor-pointer leading-relaxed">
                            I consent to receive donation receipt and updates from {TRUST_INFO.name}. I declare that the information provided is true and correct.
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Donation Amount</p>
                          <p className="text-2xl font-bold text-primary">{formatINR(finalAmount)}</p>
                        </div>
                        <Button onClick={handleNext} size="lg">
                          Continue <CreditCard className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Payment Method</h2>
                        <p className="text-sm text-muted-foreground">Choose your preferred payment option.</p>
                      </div>

                      <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}>
                        <div className="space-y-3">
                          <Label
                            htmlFor="upi"
                            className={cn(
                              "flex items-center gap-4 rounded-lg border-2 p-4 cursor-pointer transition-colors",
                              paymentMethod === "upi" ? "border-primary bg-primary/5" : "hover:border-primary/40"
                            )}
                          >
                            <RadioGroupItem value="upi" id="upi" />
                            <Smartphone className="h-6 w-6 text-primary" />
                            <div className="flex-1">
                              <p className="font-medium">UPI</p>
                              <p className="text-xs text-muted-foreground">Pay using any UPI app — GPay, PhonePe, Paytm</p>
                            </div>
                          </Label>

                          <Label
                            htmlFor="card"
                            className={cn(
                              "flex items-center gap-4 rounded-lg border-2 p-4 cursor-pointer transition-colors",
                              paymentMethod === "card" ? "border-primary bg-primary/5" : "hover:border-primary/40"
                            )}
                          >
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="h-6 w-6 text-primary" />
                            <div className="flex-1">
                              <p className="font-medium">Debit / Credit Card</p>
                              <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay, Amex</p>
                            </div>
                          </Label>

                          <Label
                            htmlFor="netbanking"
                            className={cn(
                              "flex items-center gap-4 rounded-lg border-2 p-4 cursor-pointer transition-colors",
                              paymentMethod === "netbanking" ? "border-primary bg-primary/5" : "hover:border-primary/40"
                            )}
                          >
                            <RadioGroupItem value="netbanking" id="netbanking" />
                            <Building2 className="h-6 w-6 text-primary" />
                            <div className="flex-1">
                              <p className="font-medium">Net Banking</p>
                              <p className="text-xs text-muted-foreground">All major Indian banks supported</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "upi" && (
                        <div className="rounded-lg bg-muted/40 p-4">
                          <Label htmlFor="upi-id">Enter UPI ID</Label>
                          <Input id="upi-id" placeholder="yourname@upi" className="mt-1" />
                          <p className="text-xs text-muted-foreground mt-2">You will be redirected to your UPI app to confirm payment.</p>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4">
                          <div className="col-span-2">
                            <Label htmlFor="card-num">Card Number</Label>
                            <Input id="card-num" placeholder="1234 5678 9012 3456" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="card-exp">Expiry</Label>
                            <Input id="card-exp" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="card-cvv">CVV</Label>
                            <Input id="card-cvv" type="password" placeholder="•••" className="mt-1" />
                          </div>
                        </div>
                      )}

                      {paymentMethod === "netbanking" && (
                        <div className="rounded-lg bg-muted/40 p-4">
                          <Label htmlFor="bank">Select Bank</Label>
                          <select id="bank" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                            <option>State Bank of India</option>
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>Axis Bank</option>
                            <option>Punjab National Bank</option>
                            <option>Bank of Baroda</option>
                            <option>Other Banks</option>
                          </select>
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t pt-4">
                        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-xl font-bold text-primary">{formatINR(finalAmount)}</p>
                          </div>
                          <Button onClick={handleNext} size="lg">
                            Proceed to Pay
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Confirm Your Donation</h2>
                        <p className="text-sm text-muted-foreground">Review details before submitting.</p>
                      </div>

                      <Card className="bg-muted/40">
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Donor Name</span>
                            <span className="font-medium">{form.name || "—"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Mobile</span>
                            <span className="font-medium">{form.mobile || "—"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Email</span>
                            <span className="font-medium">{form.email || "—"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">PAN</span>
                            <span className="font-medium">{form.pan || "—"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Purpose</span>
                            <span className="font-medium">{form.purpose}</span>
                          </div>
                          {form.campaign && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Campaign</span>
                              <span className="font-medium text-right">{form.campaign}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Anonymous</span>
                            <span className="font-medium">{anonymous ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Payment Method</span>
                            <span className="font-medium uppercase">{paymentMethod}</span>
                          </div>
                          <div className="border-t pt-3 flex items-center justify-between">
                            <span className="font-semibold">Total Donation</span>
                            <span className="text-xl font-bold text-primary">{formatINR(finalAmount)}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="rounded-lg border-2 border-dashed p-4">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">You will receive:</p>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>• Instant 80G tax exemption receipt (PDF)</li>
                              <li>• Email confirmation with transaction details</li>
                              <li>• Quarterly impact updates</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-4">
                        <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                        <Button onClick={handleSubmit} size="lg">
                          <Heart className="mr-2 h-4 w-4" fill="currentColor" /> Donate {formatINR(finalAmount)}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                Need help? Email us at <span className="text-primary">{TRUST_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
