import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ChevronRight, Shield, Database, Loader2, FileText, ArrowRight, AlertTriangle,
} from "lucide-react";

export default function Support() {
  const navigate = useNavigate();
  const [step1State, setStep1State] = useState(0);
  const [s1Importing, setS1Importing] = useState(false);
  const [s1RowsVisible, setS1RowsVisible] = useState(0);
  const [s1BadgeVisible, setS1BadgeVisible] = useState(false);
  const [s1Connecting, setS1Connecting] = useState(false);
  const [s1ConnFading, setS1ConnFading] = useState(false);
  const [s1Row3a, setS1Row3a] = useState(false);
  const [s1Row3b, setS1Row3b] = useState(false);
  const [s1ReportVisible, setS1ReportVisible] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-[1100px] mx-auto pb-16 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Support Assessment
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Understand what support looks like today — before designing what it should look like tomorrow. This takes about 2 minutes.
        </p>
      </div>

      {/* What you'll get */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: FileText, title: "Support Baseline Report", sub: "Volume, categories, resolution times, reuse opportunities" },
          { icon: Shield, title: "Regulatory context", sub: "Imported from Launch Studio — frameworks, risk level, failure modes" },
          { icon: ArrowRight, title: "Design-ready inputs", sub: "Everything Design Support needs to generate your blueprint" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.15)" }}>
            <item.icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-medium text-foreground">{item.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* ── Left card — From Launch Studio ── */}
        <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
          <CardContent className="p-4 space-y-3">
            {step1State === 0 && !s1Importing ? (
              <>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="text-[13px] font-semibold text-foreground">From Launch Studio</h3>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Your readiness score, risk classification, regulatory frameworks, and top failure modes — already assessed. One click to import.
                </p>
                <Button className="text-[12px] h-9 gap-2 w-full" onClick={() => {
                  setS1Importing(true);
                  setTimeout(() => {
                    setStep1State(1);
                    setS1Importing(false);
                    const rows = 6;
                    for (let r = 0; r < rows; r++) {
                      setTimeout(() => setS1RowsVisible(r + 1), r * 80);
                    }
                    setTimeout(() => setS1BadgeVisible(true), rows * 80 + 100);
                  }, 1200);
                }}>
                  Import from Launch Studio <ChevronRight className="h-3.5 w-3.5" />
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">Takes 2 seconds — no re-entry needed</p>
              </>
            ) : step1State === 0 && s1Importing ? (
              <>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="text-[13px] font-semibold text-foreground">From Launch Studio</h3>
                </div>
                <div className="flex items-center gap-3 py-3 justify-center">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  <span className="text-[12px] text-muted-foreground">Importing from Launch Studio…</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary shrink-0" />
                    <h3 className="text-[13px] font-semibold text-foreground">From Launch Studio</h3>
                  </div>
                  <span style={{ opacity: s1BadgeVisible ? 1 : 0, transition: "opacity 200ms ease-out" }}>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Imported</Badge>
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Readiness score", value: "67 — Conditionally Ready" },
                    { label: "Risk classification", value: "HIGH RISK — EU AI Act Article 6" },
                    { label: "Regulatory context", value: "GDPR · FINMA · EU AI Act · ISO 27001 · WAF" },
                    { label: "Failure modes identified", value: "10" },
                    { label: "Automation boundaries", value: "6 automated, 5 approval-required" },
                    { label: "Support tier", value: "Tier 2 Standard" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: "rgba(212,207,198,0.15)", opacity: i < s1RowsVisible ? 1 : 0, transition: "opacity 200ms ease-out" }}>
                      <span className="text-[11px] text-muted-foreground">{row.label}</span>
                      <span className="text-[11px] font-medium text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* ── Right card — Existing support operation ── */}
        <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary shrink-0" />
              <h3 className="text-[13px] font-semibold text-foreground">Existing support operation</h3>
            </div>
            {step1State <= 1 && !s1Connecting ? (
              <>
                <p className="text-[12px] text-muted-foreground leading-relaxed" style={{ opacity: s1ConnFading ? 0 : 1, transition: "opacity 200ms ease-out" }}>
                  Connect Jira SM, ServiceNow, or Zendesk to pull 90 days of real ticket history — volume, categories, resolution times, escalation patterns.
                </p>
                {step1State === 0 ? (
                  <>
                    <Button variant="outline" className="text-[12px] h-9 gap-2 w-full opacity-50 cursor-not-allowed" disabled>Connect ticketing system</Button>
                    <p className="text-[10px] text-muted-foreground text-center">Enabled after Launch Studio import</p>
                  </>

                ) : (
                  <Button className="text-[12px] h-9 gap-2 w-full" onClick={() => {
                    setS1Connecting(true);
                    setTimeout(() => {
                      setS1ConnFading(true);
                      setTimeout(() => {
                        setStep1State(2);
                        setTimeout(() => {
                          setStep1State(3);
                          setS1Connecting(false);
                          setS1ConnFading(false);
                          setTimeout(() => setS1Row3a(true), 0);
                          setTimeout(() => setS1Row3b(true), 150);
                          setTimeout(() => setS1ReportVisible(true), 450);
                        }, 1100);
                      }, 200);
                    }, 400);
                  }}>
                    Connect ticketing system <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </>
            ) : step1State <= 1 && s1Connecting ? (
              <Button className="text-[12px] h-9 gap-2 w-full" disabled>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Connecting…
              </Button>
            ) : step1State === 2 ? (
              <div className="flex items-center gap-3 py-4 justify-center">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
                <span className="text-[12px] text-muted-foreground">Connecting to Jira SM…</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.25)", opacity: s1Row3a ? 1 : 0, transition: "opacity 300ms ease-out" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-foreground">Ticketing</span>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Connected</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Jira SM · 1,247 tickets · 90-day window</p>
                </div>
                <div className="p-3 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.25)", opacity: s1Row3b ? 1 : 0, transition: "opacity 300ms ease-out" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-foreground">Runbooks</span>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Uploaded</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">incident-response-playbook.yaml · escalation-matrix.md</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Support Baseline Report */}
      {step1State === 3 ? (
        <div style={{ opacity: s1ReportVisible ? 1 : 0, transform: s1ReportVisible ? "translateY(0)" : "translateY(16px)", transition: "opacity 400ms ease-out, transform 400ms ease-out" }}>
          <Card className="border border-l-4 border-l-primary" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-semibold text-foreground">Support Baseline Report — Cash Flow Forecasting Agent · Alpina Bank</h3>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 shrink-0">Generated</Badge>
              </div>

              {/* Section 1 — Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { number: "4.2 hrs", label: "Resolution time", benchmark: "Industry avg 2.8 hrs · +50% slower", benchColor: "text-amber-700", implication: "AI agents surface issues faster — your team needs to match that speed" },
                  { number: "18%", label: "Escalation rate", benchmark: "Best-in-class 8% · 2.25x higher", benchColor: "text-amber-700", implication: "High escalation = low automation confidence — blueprint must define tighter boundaries" },
                  { number: "1,247", label: "Tickets / 90 days", benchmark: "~14/day avg", benchColor: "text-muted-foreground", implication: "Agent will handle 80%+ autonomously — engineers focus only on exceptions" },
                  { number: "3 of 6", label: "Runbook coverage", benchmark: "—", benchColor: "text-muted-foreground", implication: "3 runbooks carry forward · 3 need rebuilding for AI-specific failure modes" },
                ].map((m, i) => (
                  <div key={i} className="p-3 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                    <p className="text-xl font-bold text-foreground">{m.number}</p>
                    <p className="text-[11px] text-muted-foreground">{m.label}</p>
                    <p className={`text-[10px] mt-1 ${m.benchColor}`}>{m.benchmark}</p>
                    <p className="text-[10px] text-muted-foreground italic mt-1">{m.implication}</p>
                  </div>
                ))}
              </div>

              {/* Section 2 — Issue breakdown */}
              <div>
                <p className="text-[11px] font-semibold text-foreground mb-2">Where tickets come from today — and what changes with an agent</p>
                <div className="space-y-2">
                  {[
                    { category: "Forecast drift", pct: 34, count: 424, badge: "AUTO-RESOLVABLE", badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", note: "Agent detects and remediates drift without human intervention" },
                    { category: "Data feed failures", pct: 28, count: 349, badge: "AUTO-RESOLVABLE", badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", note: "Agent monitors feed health and triggers recovery automatically" },
                    { category: "Reconciliation errors", pct: 18, count: 224, badge: "APPROVAL REQUIRED", badgeClass: "bg-amber-500/10 text-amber-700 border-amber-500/20", note: "Agent resolves but CHF/EUR edge cases need human sign-off" },
                    { category: "Regulatory reporting", pct: 20, count: 250, badge: "HUMAN ONLY", badgeClass: "bg-destructive/10 text-destructive border-destructive/20", note: "FINMA submissions must have human oversight — never automate" },
                  ].map((row, i) => (
                    <div key={i} className="p-2.5 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-medium text-foreground">{row.category}</span>
                          <span className="text-[10px] text-muted-foreground">{row.pct}% · {row.count} tickets</span>
                        </div>
                        <Badge variant="outline" className={`text-[8px] px-1.5 py-0 ${row.badgeClass}`} style={{ fontFamily: "'DM Mono', monospace" }}>{row.badge}</Badge>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden mb-1.5">
                        <div className="h-full rounded-full bg-primary/60" style={{ width: `${row.pct}%` }} />
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">{row.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 — Key implications */}
              <div>
                <p className="text-[11px] font-semibold text-foreground mb-2">What this baseline means for your governance boundaries</p>
                <div className="space-y-2">
                  {[
                    { color: "border-l-destructive", title: "FINMA reporting cannot be automated", body: "20% of your current volume touches regulatory submissions — every one needs a human approval gate in the blueprint" },
                    { color: "border-l-amber-500", title: "Escalation rate will drop but confidence matters", body: "Blueprint must define what confidence threshold triggers escalation — below 70% is the recommended starting point based on your current patterns" },
                    { color: "border-l-emerald-500", title: "Resolution time will improve significantly", body: "80%+ of your ticket volume is auto-resolvable — projected avg resolution drops from 4.2 hrs to under 40 min" },
                  ].map((row, i) => (
                    <div key={i} className={`p-3 rounded-md border border-l-4 ${row.color} bg-card`} style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
                      <p className="text-[12px] font-medium text-foreground">{row.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{row.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 — Gaps */}
              <div>
                <p className="text-[11px] font-semibold text-foreground mb-2">Gaps to close before go-live</p>
                <div className="space-y-2">
                  {[
                    "On-call rotation has no cover for AI agent failures outside business hours — 34% of forecast drift occurs overnight",
                    "No escalation path defined for confidence-threshold breaches — required for FINMA compliance",
                  ].map((gap, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-md border border-l-4 border-l-amber-500 bg-amber-500/[0.03]" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-foreground">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <p className="text-[10px] text-muted-foreground pt-2 border-t" style={{ borderColor: "rgba(212,207,198,0.15)" }}>
                This baseline pre-populates your governance boundaries in Design Support · FINMA + GDPR + EU AI Act scope
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-6" style={{ borderColor: "rgba(212,207,198,0.2)" }}>
          <div className="flex items-center gap-2 justify-center mb-2">
            <FileText className="h-4 w-4 text-muted-foreground/40" />
            <p className="text-[12px] text-muted-foreground/50">Your Support Baseline Report will appear here</p>
          </div>
          <div className="space-y-1 max-w-xs mx-auto">
            {["Ticket volume and top issue categories", "Runbooks that carry forward to your blueprint", "What needs to change for AI-specific support"].map((item, i) => (
              <p key={i} className="text-[10px] text-muted-foreground/40 flex items-start gap-1.5">
                <span className="mt-[5px] h-1 w-1 rounded-full bg-muted-foreground/30 shrink-0" />
                {item}
              </p>
            ))}
          </div>
        </div>
      )}

      <div>
        <Button
          className={`h-10 text-[13px] gap-2 px-5 ${step1State < 3 || !s1ReportVisible ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={step1State < 3 || !s1ReportVisible}
          onClick={() => navigate("/studio")}
        >
          Design support <ChevronRight className="h-3.5 w-3.5" />
        </Button>
        {(step1State < 3 || !s1ReportVisible) && (
          <p className="text-[10px] text-muted-foreground mt-1.5">Complete both steps above to continue</p>
        )}
      </div>
    </div>
  );
}
