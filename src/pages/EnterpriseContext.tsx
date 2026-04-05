import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, Upload, CheckCircle2, ChevronRight,
  Shield, Clock, Database, ClipboardCheck,
} from "lucide-react";

// ─── Mock uploaded documents ─────────────────────────────────

const documents = [
  {
    name: "Alpina Freight — Vendor Security Questionnaire.pdf",
    pages: 18,
    uploaded: "2 days ago",
    tag: "questionnaire",
    tagColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  {
    name: "Alpina Freight — IT Security Policy 2025.pdf",
    pages: 34,
    uploaded: "2 days ago",
    tag: "security-policy",
    tagColor: "bg-rose-500/10 text-rose-700 border-rose-500/20",
  },
  {
    name: "Alpina Freight — Data Classification Policy.pdf",
    pages: 12,
    uploaded: "yesterday",
    tag: "data-policy",
    tagColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
  {
    name: "Alpina Freight — IT Operations Runbook v4.pdf",
    pages: 67,
    uploaded: "yesterday",
    tag: "runbook",
    tagColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
];

// ─── Detected standards ──────────────────────────────────────

const detectedStandards = [
  {
    title: "Security Requirements",
    icon: Shield,
    source: "IT Security Policy 2025",
    items: [
      "ISO 27001 alignment required for all vendors",
      "MFA required on all system access",
      "Data encrypted at rest and in transit (AES-256)",
      "Penetration testing required annually",
      "Vulnerability scanning quarterly",
    ],
  },
  {
    title: "SLA Commitments",
    icon: Clock,
    source: "IT Operations Runbook v4",
    items: [
      "P1 incident: 1 hour acknowledgement, 4 hour resolution",
      "P2 incident: 4 hour acknowledgement, next business day resolution",
      "System availability: 99.9% uptime required",
      "Maintenance windows: Sundays 02:00–06:00 CET only",
    ],
  },
  {
    title: "Data Requirements",
    icon: Database,
    source: "Data Classification Policy",
    items: [
      "Financial data classified as Tier 1 (highest sensitivity)",
      "Tier 1 data must remain in Switzerland (data residency)",
      "GDPR Article 28 DPA required before data processing",
      "Retention: 10 years for financial records (FINMA requirement)",
    ],
  },
  {
    title: "Procurement Requirements",
    icon: ClipboardCheck,
    source: "Vendor Security Questionnaire",
    items: [
      "SOC 2 Type II or ISO 27001 certification required",
      "Annual third-party security audit required",
      "Incident notification within 4 hours of detection",
      "Right to audit clause required in all contracts",
    ],
  },
];

const regulatoryFrameworks = [
  "GDPR",
  "FINMA",
  "ISO 27001",
  "EU AI Act",
  "Microsoft Azure WAF",
];

// ─── Component ───────────────────────────────────────────────

export default function EnterpriseContext() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Enterprise Context
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Step 0 — Establish what enterprise-ready means for this deployment
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* LEFT COLUMN — Upload area (40%) */}
        <div className="w-[40%] shrink-0 space-y-4">
          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Enterprise context documents</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              The more context you provide, the more precisely Launch Studio can define enterprise readiness for this deployment — policies, runbooks, industry requirements, existing procedures.
            </p>
          </div>

          {/* Document cards */}
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                <CardContent className="p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground leading-snug truncate">{doc.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {doc.pages} pages · Uploaded {doc.uploaded}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 border ${doc.tagColor}`}
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {doc.tag}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                          Analysed
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upload area */}
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors"
            style={{ borderColor: "rgba(212,207,198,0.4)" }}
          >
            <Upload className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-[13px] font-medium text-foreground">Drop documents here or click to upload</p>
            <p className="text-[11px] text-muted-foreground mt-1">PDF, Word, plain text supported</p>
          </div>
        </div>

        {/* RIGHT COLUMN — Detected standards (60%) */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Detected enterprise standards</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Automatically extracted from uploaded documents
            </p>
          </div>

          <div className="space-y-3">
            {detectedStandards.map((section, i) => (
              <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center">
                      <section.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-semibold text-foreground">{section.title}</h3>
                      <p className="text-[10px] text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                        source: {section.source}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 ml-9">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 mt-[7px] shrink-0" />
                        <span className="text-[13px] text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM — Regulatory frameworks + CTA */}
      <div className="space-y-4 pt-2">
        <div>
          <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
            Regulatory frameworks detected
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {regulatoryFrameworks.map((fw) => (
              <Badge
                key={fw}
                className="bg-primary/10 text-primary border-primary/20 text-[11px] px-2.5 py-0.5 font-medium"
              >
                {fw}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="h-10 text-[13px] gap-2 px-5">
            Proceed to Solution Intelligence
            <ChevronRight className="h-4 w-4" />
          </Button>
          <p className="text-[11px] text-muted-foreground">
            Graph readiness will be calculated once solution sources are connected
          </p>
        </div>
      </div>
    </div>
  );
}
