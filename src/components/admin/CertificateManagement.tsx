"use client";

import { Eye, Download, Plus, Award, QrCode, Mail, CheckCircle2, Search, X, Award as AwardIcon, QrCode as Qr, Mail as MailIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, DataTable, type Column, StatCard } from "@/components/shared/data-table";
import { StatusBadge, formatDate } from "@/components/shared/badges";
import { CERTIFICATES } from "@/lib/mock-data";
import type { Certificate } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function CertificateManagement() {
  const { toast } = useToast();
  const [verifyNo, setVerifyNo] = useState("");
  const [verifyResult, setVerifyResult] = useState<"idle" | "valid" | "invalid">("idle");

  const handleVerify = () => {
    if (!verifyNo) {
      toast({ title: "Please enter certificate number", variant: "destructive" });
      return;
    }
    const found = CERTIFICATES.find((c) => c.certificateNo === verifyNo);
    setVerifyResult(found ? "valid" : "invalid");
  };

  const columns: Column<Certificate>[] = [
    {
      key: "certificateNo",
      header: "Certificate No.",
      render: (row) => (
        <span className="font-mono text-xs font-medium text-primary">{row.certificateNo}</span>
      ),
    },
    {
      key: "recipientName",
      header: "Recipient",
      render: (row) => <span className="text-sm font-medium">{row.recipientName}</span>,
    },
    {
      key: "recipientType",
      header: "Type",
      render: (row) => <Badge variant="secondary">{row.recipientType}</Badge>,
    },
    {
      key: "event",
      header: "Event/Reason",
      render: (row) => <span className="text-sm text-muted-foreground">{row.event}</span>,
    },
    {
      key: "issueDate",
      header: "Issue Date",
      render: (row) => <span className="text-sm text-muted-foreground">{formatDate(row.issueDate)}</span>,
    },
    {
      key: "verified",
      header: "Verification",
      render: (row) => <StatusBadge status={row.verified ? "Verified" : "Pending"} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><QrCode className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: "Email sent", description: `Certificate emailed to ${row.recipientName}.` })}>
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital Certificate Management"
        description="Generate, verify, and distribute certificates with QR verification."
        action={
          <Button onClick={() => toast({ title: "Certificate generator opened", description: "Auto-generate with unique certificate no. and QR." })}>
            <Plus className="mr-2 h-4 w-4" /> Generate Certificate
          </Button>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Issued" value={CERTIFICATES.length} icon={AwardIcon} tone="primary" />
        <StatCard title="Verified" value={CERTIFICATES.filter(c => c.verified).length} icon={CheckCircle2} tone="accent" />
        <StatCard title="This Month" value={6} icon={Award} tone="amber" />
        <StatCard title="Verifications" value={142} icon={Qr} tone="sky" />
      </div>

      {/* QR Verification panel */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <QrCode className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Certificate Verification</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter a certificate number to verify its authenticity. Public users can also verify certificates via QR code scanning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="cert-no">Certificate Number</Label>
              <Input
                id="cert-no"
                placeholder="e.g., TRUST/2026/000125"
                value={verifyNo}
                onChange={(e) => {
                  setVerifyNo(e.target.value);
                  setVerifyResult("idle");
                }}
                className="mt-1 font-mono"
              />
            </div>
            <Button className="self-end" onClick={handleVerify}>
              <Search className="mr-2 h-4 w-4" /> Verify
            </Button>
          </div>
          {verifyResult === "valid" && (
            <div className="mt-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 p-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-semibold">Valid Certificate</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                This certificate is valid and issued by {CERTIFICATES.find(c => c.certificateNo === verifyNo)?.recipientName} on{" "}
                {formatDate(CERTIFICATES.find(c => c.certificateNo === verifyNo)?.issueDate || "")}.
              </p>
            </div>
          )}
          {verifyResult === "invalid" && (
            <div className="mt-4 rounded-lg border-2 border-rose-200 bg-rose-50 dark:bg-rose-950/30 p-4">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                <X className="h-5 w-5" />
                <p className="font-semibold">Invalid Certificate</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                This certificate number does not exist in our records. Please verify the number and try again.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <DataTable
        data={CERTIFICATES}
        columns={columns}
        searchKeys={["certificateNo", "recipientName"]}
        filterOptions={{ key: "recipientType", label: "All Types", options: ["Volunteer", "Donor", "Participant", "Sponsor"] }}
        title="All Certificates"
      />
    </div>
  );
}
