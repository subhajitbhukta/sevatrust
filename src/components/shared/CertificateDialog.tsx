"use client";

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
import { Download, Printer, Award, ShieldCheck } from "lucide-react";
import { TRUST_INFO } from "@/lib/mock-data";
import { formatDate } from "@/components/shared/badges";

export interface CertificateData {
  certificateNo: string;
  recipientName: string;
  recipientType: "Volunteer" | "Donor" | "Participant" | "Sponsor";
  event: string;
  issueDate: string;
}

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CertificateData | null;
}

export function CertificateDialog({ open, onOpenChange, data }: CertificateDialogProps) {
  const { toast } = useToast();

  if (!data) return null;

  const handleDownload = () => {
    toast({
      title: "Sample Certificate Downloaded",
      description: `Certificate ${data.certificateNo} downloaded as PDF (sample).`,
    });
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
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Certificate of {data.recipientType}
            <Badge variant="secondary" className="text-[10px]">SAMPLE</Badge>
          </DialogTitle>
          <DialogDescription>
            Auto-generated digital certificate with QR verification capability.
          </DialogDescription>
        </DialogHeader>

        {/* Certificate body */}
        <div id="certificate-print-area" className="bg-white">
          {/* Outer ornate border */}
          <div className="relative border-4 border-double border-primary p-1 bg-gradient-to-br from-amber-50 via-white to-amber-50">
            {/* Inner border */}
            <div className="border border-primary/40 p-8 relative">
              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 text-primary/30 text-3xl">❧</div>
              <div className="absolute top-2 right-2 text-primary/30 text-3xl">❧</div>
              <div className="absolute bottom-2 left-2 text-primary/30 text-3xl">❧</div>
              <div className="absolute bottom-2 right-2 text-primary/30 text-3xl">❧</div>

              {/* Header with logo and trust name */}
              <div className="flex flex-col items-center text-center mb-6">
                <img src="/logo.svg" alt="Logo" className="h-20 w-20 mb-2" />
                <h1 className="text-xl font-bold text-primary leading-tight">
                  {TRUST_INFO.name}
                </h1>
                <p className="text-sm text-muted-foreground italic">
                  মানুষের পাশে, মানুষের জন্য ❤️
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {TRUST_INFO.address} · {TRUST_INFO.phone}
                </p>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <div className="inline-block border-y-2 border-primary/40 py-2 px-6">
                  <p className="text-2xl font-bold tracking-wider text-primary"
                     style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    CERTIFICATE OF {data.recipientType.toUpperCase()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground italic mt-2">
                  এই সনদপত্র সম্মানজনক অবদানের স্বীকৃতিস্বরূপ
                </p>
              </div>

              {/* Body text */}
              <div className="text-center my-8 leading-relaxed">
                <p className="text-sm text-muted-foreground">This certificate is proudly presented to</p>
                <p
                  className="text-3xl font-bold text-primary my-3"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {data.recipientName}
                </p>
                <p className="text-sm text-foreground/80 max-w-xl mx-auto">
                  in grateful recognition of their valuable contribution as a{" "}
                  <span className="font-semibold text-primary">{data.recipientType.toLowerCase()}</span>{" "}
                  for the initiative
                </p>
                <p
                  className="text-lg font-semibold text-foreground mt-2 italic"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  &ldquo;{data.event}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
                  Your generosity and dedication have made a meaningful difference in the lives of
                  those we serve. We extend our heartfelt thanks for your support.
                </p>
              </div>

              {/* QR code area + verification info */}
              <div className="flex items-center justify-between mt-8 mb-4">
                <div className="text-xs space-y-1">
                  <p className="text-muted-foreground uppercase tracking-wider">Certificate No.</p>
                  <p className="font-mono font-bold text-primary">{data.certificateNo}</p>
                  <p className="text-muted-foreground uppercase tracking-wider mt-2">Issue Date</p>
                  <p className="font-medium">{formatDate(data.issueDate)}</p>
                </div>

                {/* QR code placeholder */}
                <div className="flex flex-col items-center">
                  <div className="border-2 border-primary p-2 bg-white">
                    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                      <rect width="80" height="80" fill="white" />
                      {/* Decorative QR pattern */}
                      <g fill="#1c1917">
                        <rect x="0" y="0" width="20" height="20" />
                        <rect x="4" y="4" width="12" height="12" fill="white" />
                        <rect x="8" y="8" width="4" height="4" />
                        <rect x="60" y="0" width="20" height="20" />
                        <rect x="64" y="4" width="12" height="12" fill="white" />
                        <rect x="68" y="8" width="4" height="4" />
                        <rect x="0" y="60" width="20" height="20" />
                        <rect x="4" y="64" width="12" height="12" fill="white" />
                        <rect x="8" y="68" width="4" height="4" />
                        <rect x="28" y="4" width="4" height="4" />
                        <rect x="36" y="4" width="4" height="4" />
                        <rect x="44" y="4" width="8" height="4" />
                        <rect x="4" y="28" width="4" height="4" />
                        <rect x="12" y="28" width="4" height="4" />
                        <rect x="24" y="24" width="8" height="8" />
                        <rect x="36" y="28" width="4" height="4" />
                        <rect x="44" y="24" width="4" height="4" />
                        <rect x="52" y="28" width="4" height="4" />
                        <rect x="60" y="24" width="8" height="4" />
                        <rect x="68" y="28" width="4" height="4" />
                        <rect x="4" y="36" width="4" height="4" />
                        <rect x="20" y="36" width="4" height="4" />
                        <rect x="28" y="40" width="4" height="4" />
                        <rect x="36" y="36" width="8" height="4" />
                        <rect x="48" y="40" width="4" height="4" />
                        <rect x="56" y="36" width="4" height="4" />
                        <rect x="64" y="40" width="4" height="4" />
                        <rect x="72" y="36" width="4" height="4" />
                        <rect x="12" y="44" width="4" height="4" />
                        <rect x="24" y="48" width="8" height="4" />
                        <rect x="40" y="44" width="4" height="4" />
                        <rect x="48" y="48" width="4" height="4" />
                        <rect x="60" y="44" width="8" height="4" />
                        <rect x="72" y="48" width="4" height="4" />
                        <rect x="4" y="52" width="4" height="4" />
                        <rect x="20" y="56" width="4" height="4" />
                        <rect x="32" y="52" width="4" height="4" />
                        <rect x="44" y="56" width="8" height="4" />
                        <rect x="56" y="52" width="4" height="4" />
                        <rect x="68" y="56" width="8" height="4" />
                        <rect x="28" y="64" width="4" height="4" />
                        <rect x="36" y="68" width="4" height="4" />
                        <rect x="48" y="64" width="4" height="4" />
                        <rect x="56" y="68" width="8" height="4" />
                        <rect x="68" y="64" width="4" height="4" />
                        <rect x="28" y="72" width="4" height="4" />
                        <rect x="36" y="76" width="4" height="4" />
                        <rect x="44" y="72" width="8" height="4" />
                        <rect x="56" y="76" width="4" height="4" />
                        <rect x="68" y="72" width="8" height="4" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Scan to verify</p>
                </div>

                <div className="text-xs space-y-1 text-right">
                  <p className="text-muted-foreground uppercase tracking-wider">Verify Online</p>
                  <p>bbmwt.org/verify</p>
                  <p className="font-mono text-primary mt-1">{data.certificateNo}</p>
                </div>
              </div>

              {/* Signature line */}
              <div className="flex justify-around items-end mt-12 pt-6 border-t border-primary/30">
                <div className="text-center">
                  <div className="border-t border-primary/60 w-32 mb-1" />
                  <p className="text-xs font-medium">Founder Trustee</p>
                  <p className="text-xs text-muted-foreground">For {TRUST_INFO.name}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="border-t border-primary/60 w-32 mb-1" />
                  <p className="text-xs font-medium">Secretary</p>
                  <p className="text-xs text-muted-foreground">Trust Board</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-primary/20">
                <p className="text-[10px] text-muted-foreground italic">
                  This is a digitally generated certificate. Verify authenticity at bbmwt.org/verify
                  using certificate number. Trust Registration No: {TRUST_INFO.registrationNo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 justify-end print:hidden mt-4">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
