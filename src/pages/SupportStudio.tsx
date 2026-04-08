import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ChevronRight, Shield, Sparkles, Database, Loader2, FileText,
} from "lucide-react";

// ─── Component ───────────────────────────────────────────────

type GeneratePhase = "idle" | "generating" | "done";

export default function SupportStudio() {
  const [generatePhase, setGeneratePhase] = useState<GeneratePhase>("idle");
  const [generateStep, setGenerateStep] = useState(0);

  const generateLabels = ["Merging agent intelligence…", "Applying support baseline…", "Generating governance boundaries…", "Done"];

  const handleGenerate = () => {
    setGeneratePhase("generating");
    setGenerateStep(0);
    generateLabels.forEach((_, i) => {
      setTimeout(() => {
        setGenerateStep(i);
        if (i === generateLabels.length - 1) {
          setTimeout(() => setGeneratePhase("done"), 600);
        }
      }, (i + 1) * 700);
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1100px] mx-auto pb-16 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Design Support
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Merging what we know about your agent and your support operation into a governed blueprint
        </p>
      </div>

      {/* Section 1 — Two source cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left — From Launch Studio */}
        <Card className="border border-l-4 border-l-emerald-500" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
          <CardContent className="p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[12px] font-semibold text-foreground">From Launch Studio</span>
              </div>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Imported</Badge>
            </div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Agent intelligence</p>
            <div className="space-y-1.5">
              {[
                { label: "Agent", value: "Cash Flow Forecasting Agent v1.0.0" },
                { label: "Readiness", value: "67 — Conditionally Ready" },
                { label: "Risk", value: "HIGH RISK · EU AI Act Article 6" },
                { label: "Regulatory", value: "FINMA · GDPR · EU AI Act · ISO 27001 · WAF" },
                { label: "Failure modes", value: "10 identified" },
                { label: "Agent docs", value: "cashflow-agent-v1.0.0-guide.pdf · architecture-overview.md · API reference" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-2 py-0.5">
                  <span className="text-[10px] text-muted-foreground w-20 shrink-0">{row.label}</span>
                  <span className="text-[11px] text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right — From Support Assessment */}
        <Card className="border border-l-4 border-l-emerald-500" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
          <CardContent className="p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[12px] font-semibold text-foreground">From Support Assessment</span>
              </div>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Imported</Badge>
            </div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Support baseline</p>
            <div className="space-y-1.5">
              {[
                { label: "Ticketing", value: "Jira SM · 1,247 tickets · 90-day window" },
                { label: "Top issues", value: "Forecast drift 34% · Data feed 28% · Reconciliation 18% · Reporting 20%" },
                { label: "Avg resolution", value: "4.2 hrs" },
                { label: "Runbooks", value: "incident-response-playbook.yaml · escalation-matrix.md · RB-045" },
                { label: "Escalation paths", value: "2 need updating for AI-specific failures" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-2 py-0.5">
                  <span className="text-[10px] text-muted-foreground w-20 shrink-0">{row.label}</span>
                  <span className="text-[11px] text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-[11px] text-muted-foreground">Both sources have been merged — governance boundaries below are pre-populated from this analysis</p>

      {/* Section 2 — Governance boundaries */}
      {generatePhase !== "done" && (
        <>
          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Governance boundaries</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">Pre-populated from agent intelligence and support baseline — review and adjust before generating</p>
          </div>

          <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <GovSection title="Allowed Automated Actions" tags={["Scale compute (up to 2x)", "Restart pipeline", "Rotate tokens", "Adjust batch size"]} color="emerald" />
                <GovSection title="Approval-Required Actions" tags={["Bulk merge (>100 records)", "Force reindex", "Roll back migration", "Override rate limits"]} color="amber" />
                <GovSection title="Never Automate" tags={["Delete customer data", "Modify billing", "Regional failover", "Modify audit logs"]} color="red" />
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Escalation Policy</label>
                  <textarea className="w-full p-3 rounded-lg border bg-card text-[12px] outline-none placeholder:text-muted-foreground/60 resize-none" style={{ borderColor: "rgba(212,207,198,0.25)" }} rows={4} defaultValue="Never auto-execute regional failover. Always escalate data loss scenarios. Compliance/audit issues must go to certified engineers. Any action affecting > 50% of nodes requires human approval." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 — Generate */}
          {generatePhase === "idle" && (
            <Button className="w-full h-11 text-[13px] gap-2" onClick={handleGenerate}>
              <Sparkles className="h-4 w-4" /> Generate Governed Blueprint
            </Button>
          )}

          {generatePhase === "generating" && (
            <Card className="border border-primary/20 bg-primary/[0.03]">
              <CardContent className="p-5 space-y-3">
                {generateLabels.slice(0, generateStep + 1).map((label, i) => (
                  <div key={i} className="flex items-center gap-3 animate-fade-in">
                    {i < generateStep ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                    )}
                    <span className={`text-[12px] ${i < generateStep ? "text-muted-foreground" : "text-foreground font-medium"}`}>{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Done */}
      {generatePhase === "done" && (
        <Card className="border border-emerald-200 bg-emerald-50/30">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-foreground">
                  Blueprint generated — Cash Flow Forecasting Agent v1.0.0 · v2.4 · 22 rules across 9 sections
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <Link to="/blueprints" className="text-[12px] text-primary hover:underline flex items-center gap-1">
                    View Active Blueprint <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Change will go through approval workflow before deploying to customers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Helper ──────────────────────────────────────────────────

function GovSection({ title, tags, color }: { title: string; tags: string[]; color: "emerald" | "amber" | "red" }) {
  const dotColor = color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-destructive";
  return (
    <div>
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">{title}</label>
      <div className="space-y-1">
        {tags.map((tag, i) => (
          <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border bg-card text-[11px] text-foreground" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <div className={`h-1.5 w-1.5 rounded-full ${dotColor} shrink-0`} />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
