"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, Printer, FileText, CheckCircle2 } from "lucide-react";
import { TRUST_INFO } from "@/lib/mock-data";
import { formatINR, formatDate } from "@/components/shared/badges";

export interface Receipt80GData {
  receiptNo: string;
  donorName: string;
  donorEmail: string;
  donorMobile: string;
  donorAddress: string;
  donorPAN: string;
  amount: number;
  purpose: string;
  campaign: string;
  paymentMethod: string;
  txnId: string;
  date: string;
  anonymous: boolean;
}

interface Receipt80GDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Receipt80GData | null;
}

export function Receipt80GDialog({ open, onOpenChange, data }: Receipt80GDialogProps) {
  const { toast } = useToast();

  if (!data) return null;

  const handleDownload = () => {
    toast({
      title: "Sample 80G Receipt PDF",
      description: `Receipt ${data.receiptNo} downloaded as PDF (sample).`,
    });
    // Trigger print dialog (which can be saved as PDF)
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            80G Donation Receipt
            <Badge variant="secondary" className="text-[10px]">SAMPLE</Badge>
          </DialogTitle>
          <DialogDescription>
            Sample tax-exemption receipt under Section 80G of the Income Tax Act, 1961.
          </DialogDescription>
        </DialogHeader>

        {/* Receipt body — printable */}
        <div id="receipt-print-area" className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-white">
          {/* Header with logo */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-primary">
            <div className="flex items-center gap-3">
              <img src="/LOGO_BBMWT.png" alt="Logo" className="h-14 w-14" />
              <div>
                <h2 className="text-lg font-bold leading-tight">{TRUST_INFO.name}</h2>
                <p className="text-xs text-muted-foreground">মানুষের পাশে, মানুষের জন্য ❤️</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {TRUST_INFO.address}
                </p>
                <p className="text-xs text-muted-foreground">
                  Phone: {TRUST_INFO.phone} · Email: {TRUST_INFO.email}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="rounded bg-primary/10 px-3 py-1.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Receipt No.</p>
                <p className="font-mono font-bold text-primary">{data.receiptNo}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Date: {formatDate(data.date)}</p>
            </div>
          </div>

          {/* Receipt title */}
          <div className="text-center py-4">
            <h3 className="text-lg font-bold text-primary">DONATION RECEIPT</h3>
            <p className="text-xs text-muted-foreground">
              (Under Section 80G of the Income Tax Act, 1961)
            </p>
            <p className="text-[10px] text-muted-foreground italic mt-0.5">
              50% deduction available to donors under Section 80G(5)(iii) of Income Tax Act, 1961
            </p>
          </div>

          {/* Donor details */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Donor Details</p>
              <p><span className="font-medium">Name:</span> {data.donorName}</p>
              <p><span className="font-medium">PAN:</span> {data.donorPAN || "—"}</p>
              <p><span className="font-medium">Mobile:</span> {data.donorMobile}</p>
              <p><span className="font-medium">Email:</span> {data.donorEmail}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
              <p className="text-sm">{data.donorAddress || "—"}</p>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Anonymous Donation</p>
              <p className="text-sm">{data.anonymous ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Donation details table */}
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-primary/10">
                <th className="border border-primary/20 px-3 py-2 text-left">Particulars</th>
                <th className="border border-primary/20 px-3 py-2 text-left">Mode of Payment</th>
                <th className="border border-primary/20 px-3 py-2 text-left">Transaction ID</th>
                <th className="border border-primary/20 px-3 py-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-primary/20 px-3 py-2">
                  <p className="font-medium">{data.purpose}</p>
                  {data.campaign && data.campaign !== "—" && (
                    <p className="text-xs text-muted-foreground">Campaign: {data.campaign}</p>
                  )}
                </td>
                <td className="border border-primary/20 px-3 py-2">{data.paymentMethod}</td>
                <td className="border border-primary/20 px-3 py-2 font-mono text-xs">{data.txnId}</td>
                <td className="border border-primary/20 px-3 py-2 text-right font-bold">
                  {formatINR(data.amount)}
                </td>
              </tr>
              <tr className="bg-muted/30">
                <td colSpan={3} className="border border-primary/20 px-3 py-2 text-right font-semibold">
                  Total (80G eligible):
                </td>
                <td className="border border-primary/20 px-3 py-2 text-right font-bold text-primary">
                  {formatINR(data.amount)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Declaration */}
          <div className="rounded bg-muted/40 p-3 text-xs leading-relaxed mb-4">
            <p className="font-semibold mb-1">Declaration:</p>
            <p>
              We hereby acknowledge with gratitude the receipt of the donation mentioned above from
              the donor. This donation is eligible for tax deduction under Section 80G(5) of the
              Income Tax Act, 1961, vide approval number {TRUST_INFO.registrationNo} (Validity:
              Assessment Years 2024-25 to 2026-27). The Trust declares that it has not received any
              consideration, benefit, or perquisite in lieu of this donation. The funds will be
              utilised solely for the charitable objects of the Trust.
            </p>
          </div>

          {/* Trust registration info */}
          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div>
              <p className="font-semibold">Trust Registration:</p>
              <p>Reg. No: {TRUST_INFO.registrationNo}</p>
              <p>PAN: {TRUST_INFO.pan}</p>
              <p>Trust Type: Public Charitable Trust</p>
            </div>
            <div>
              <p className="font-semibold">80G Details:</p>
              <p>Section: 80G(5)(iii)</p>
              <p>Approval: Pending (Applied for)</p>
              <p>Deduction: 50% of donation amount</p>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-between items-end pt-4 mt-4 border-t">
            <div className="text-xs">
              <p className="text-muted-foreground">Generated on:</p>
              <p className="font-medium">{new Date().toLocaleString("en-IN")}</p>
              <p className="text-muted-foreground mt-1">This is a computer-generated receipt.</p>
            </div>
            <div className="text-center">
              <div className="border-t border-primary/40 w-32 mb-1" />
              <p className="text-xs font-medium">Authorised Signatory</p>
              <p className="text-xs text-muted-foreground">For {TRUST_INFO.name}</p>
            </div>
          </div>
        </div>

        {/* Action buttons (non-printable) */}
        <div className="flex gap-2 justify-end print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>

        {/* Verification note */}
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 p-3 text-xs flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-emerald-900 dark:text-emerald-300">Verification</p>
            <p className="text-emerald-800 dark:text-emerald-400 mt-0.5">
              Donors can verify the authenticity of this receipt by scanning the QR code or
              visiting the Trust&apos;s Transparency page and entering receipt number{" "}
              <span className="font-mono font-medium">{data.receiptNo}</span>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
