import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, Clock, Lock } from "lucide-react";

// ─── Agent scores ────────────────────────────────────────────

interface AgentScore {
  name: string;
  score: number | null;
  pending?: boolean;
}

const agents: AgentScore[] = [
  { name: "Security Posture", score: 34 },
  { name: "AI Governance", score: 48 },
  { name: "Data & Privacy", score: 52 },
  { name: "Infrastructure", score: 61 },
  { name: "Integration & Dependency", score: 58 },
  { name: "Operational Readiness", score: 29 },
  { name: "Compliance & Regulatory", score: 41 },
  { name: "Documentation", score: 22 },
  { name: "Support System Design", score: null, pending: true },
];

function scoreBarColor(score: number): string {
  if (score < 40) return "bg-destructive";
  if (score < 70) return "bg-amber-500";
  return "bg-success";
}

// ─── Findings ────────────────────────────────────────────────

interface Finding {
  id: string;
  priority: "P0" | "P1" | "P2";
  agent: string;
  title: string;
  description: string;
  framework: string;
  remediation: string;
  effort: string;
}

const findings: Finding[] = [
  {
    id: "SEC-001",
    priority: "P0",
    agent: "Security Posture",
    title: "Hardcoded API key detected in repository",
    description: "API credentials found in plain text committed to the repository. Any person with repository access can extract live production credentials.",
    framework: "OWASP A02:2021 · ISO 27001 A.9.4",
    remediation: "Move API key to Azure Key Vault immediately. Remove from repository history using git-filter-repo. Rotate the key.",
    effort: "2 hours",
  },
  {
    id: "GOV-001",
    priority: "P0",
    agent: "AI Governance",
    title: "No human oversight mechanism for financial recommendations",
    description: "The app makes financial recommendations without any human approval gate. EU AI Act Article 14 requires human oversight for High Risk AI systems making financial decisions.",
    framework: "EU AI Act Article 14 · NIST AI RMF GOVERN-1.2",
    remediation: "Implement approval workflow for recommendations above CHF 10,000. Document the human oversight process and log all override decisions.",
    effort: "1 day",
  },
  {
    id: "DAT-001",
    priority: "P0",
    agent: "Data & Privacy",
    title: "No GDPR data processing agreement with Alpina Freight",
    description: "Processing Alpina's financial data without a signed Article 28 DPA is a GDPR violation. Alpina's data classification policy explicitly requires this before any data processing begins.",
    framework: "GDPR Article 28 · Alpina Data Classification Policy",
    remediation: "Execute GDPR Article 28 DPA with Alpina Freight before any data processing. Use the standard SavanoAI DPA template.",
    effort: "3 days",
  },
  {
    id: "OP-001",
    priority: "P0",
    agent: "Operational Readiness",
    title: "No monitoring configured on Azure — Alpina's 4-hour SLA cannot be met",
    description: "No Azure Monitor, no alerting, no logging configured. Alpina Freight's IT Operations Runbook requires P1 incident resolution within 4 hours. Without monitoring, incidents won't even be detected.",
    framework: "Microsoft WAF — Operational Excellence · Alpina IT Ops Runbook v4",
    remediation: "Enable Azure Monitor diagnostic logging. Configure alerts for critical path failures. Set up PagerDuty or equivalent on-call rotation.",
    effort: "3 hours",
  },
  {
    id: "INF-001",
    priority: "P1",
    agent: "Infrastructure & Reliability",
    title: "Single availability zone — 99.9% SLA not achievable",
    description: "Deployed to a single Azure availability zone with no failover. Alpina's SLA requirement of 99.9% uptime cannot be met with this architecture.",
    framework: "Microsoft WAF — Reliability · Alpina IT Ops Runbook v4",
    remediation: "Configure Azure availability zones (minimum 2). Document RTO/RPO targets. Test failover procedure.",
    effort: "2 days",
  },
  {
    id: "INT-001",
    priority: "P1",
    agent: "Integration & Dependency",
    title: "No vendor risk assessment for banking data provider",
    description: "Third-party financial data provider processes Tier 1 financial data without a formal vendor risk assessment. Alpina's vendor questionnaire requires this before go-live.",
    framework: "ISO 27001 A.15 · Alpina Vendor Security Questionnaire",
    remediation: "Complete vendor risk assessment using ISO 27001 A.15 template. Request SOC 2 Type II report from provider.",
    effort: "1 week",
  },
  {
    id: "COM-001",
    priority: "P1",
    agent: "Compliance & Regulatory",
    title: "FINMA data residency not confirmed for all data flows",
    description: "Cannot confirm all financial data remains in Switzerland as required by FINMA. Some third-party API calls may route data outside Swiss jurisdiction.",
    framework: "FINMA data localisation · Alpina Data Classification Policy",
    remediation: "Audit all data flows. Configure Azure Switzerland North as the exclusive region. Confirm with all third-party providers.",
    effort: "4 hours",
  },
];

const BASE_SCORE = 67;
const P0_BOOST = 3;

// ─── Component ───────────────────────────────────────────────

export default function ReadinessReport() {
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<"all" | "P0" | "P1" | "P2">("all");

  const p0Findings = findings.filter(f => f.priority === "P0");
  const p0ResolvedCount = p0Findings.filter(f => resolvedIds.has(f.id)).length;
  const allP0Resolved = p0ResolvedCount === p0Findings.length;

  const currentScore = BASE_SCORE + (p0ResolvedCount * P0_BOOST);
  const scoreBand = currentScore >= 80 ? "Enterprise Ready" : currentScore >= 60 ? "Conditionally Ready" : currentScore >= 40 ? "Requires Remediation" : "Not Ready";

  const toggleResolved = (id: string) => {
    setResolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredFindings = activeFilter === "all"
    ? findings
    : findings.filter(f => f.priority === activeFilter);

  const filterTabs: Array<{ label: string; value: "all" | "P0" | "P1" | "P2"; count: number }> = [
    { label: "All", value: "all", count: findings.length },
    { label: "P0", value: "P0", count: findings.filter(f => f.priority === "P0").length },
    { label: "P1", value: "P1", count: findings.filter(f => f.priority === "P1").length },
    { label: "P2", value: "P2", count: findings.filter(f => f.priority === "P2").length },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Readiness Report
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            FinTrack AG — Cash Flow Forecasting Agent · Azure Switzerland North
          </p>
        </div>

        {/* Score display */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-3">
            <div
              className="h-16 w-16 rounded-full border-4 flex items-center justify-center"
              style={{
                borderColor: currentScore >= 80 ? "hsl(var(--success))" : currentScore >= 60 ? "hsl(var(--warning))" : "hsl(var(--destructive))",
              }}
            >
              <span className="text-xl font-bold text-foreground">{currentScore}</span>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5 max-w-[340px]">
            {scoreBand} for GDPR · FINMA · EU AI Act (High Risk) · ISO 27001
          </p>
          <Badge className="mt-1.5 bg-amber-500/10 text-amber-700 border-amber-500/20 text-[10px] px-2 py-0.5 uppercase font-semibold">
            {scoreBand}
          </Badge>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex gap-6">
        {/* LEFT — Agent scores (35%) */}
        <div className="w-[35%] shrink-0 space-y-4">
          <h2 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            Agent Scores
          </h2>

          <div className="space-y-2.5">
            {agents.map((agent, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-foreground">
                    <span className="text-muted-foreground mr-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>{i + 1}.</span>
                    {agent.name}
                  </span>
                  {agent.pending ? (
                    <span className="text-[10px] text-muted-foreground italic">Pending</span>
                  ) : (
                    <span className="text-[12px] font-semibold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {agent.score}/100
                    </span>
                  )}
                </div>
                {agent.pending ? (
                  <div className="h-2 rounded-full bg-muted/50" />
                ) : (
                  <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${scoreBarColor(agent.score!)}`}
                      style={{ width: `${agent.score}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-muted-foreground leading-relaxed pt-2">
            Weighted composite — AI Governance 25%, Security 18%, Data & Privacy 15%, Infrastructure 12%, Integration 10%, Operational Readiness 8%, Compliance 7%, Documentation 3%, Support Design 2%
          </p>
        </div>

        {/* RIGHT — Findings (65%) */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
              Findings
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 border-b" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            {filterTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-3 py-2 text-[12px] font-medium transition-colors relative ${
                  activeFilter === tab.value
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 ml-1.5">
                  {tab.count}
                </Badge>
                {activeFilter === tab.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Finding cards */}
          <div className="space-y-3">
            {filteredFindings.map(finding => {
              const isResolved = resolvedIds.has(finding.id);
              const borderColor = isResolved
                ? "border-l-emerald-500"
                : finding.priority === "P0"
                  ? "border-l-destructive"
                  : "border-l-amber-500";
              const bgTint = !isResolved && finding.priority === "P0" ? "bg-destructive/[0.02]" : "";

              return (
                <Card
                  key={finding.id}
                  className={`border border-l-4 ${borderColor} ${bgTint}`}
                  style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}
                >
                  <CardContent className="p-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 font-semibold ${
                            finding.priority === "P0"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-amber-500/10 text-amber-700 border-amber-500/20"
                          }`}
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {finding.priority}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{finding.agent}</span>
                      </div>
                      {isResolved && (
                        <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-[10px] px-1.5 py-0">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                          Resolved
                        </Badge>
                      )}
                    </div>

                    {/* Title + description */}
                    <h3 className="text-[14px] font-semibold text-foreground mb-1">{finding.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{finding.description}</p>

                    {/* Framework citation */}
                    <p className="text-[11px] text-muted-foreground mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {finding.framework}
                    </p>

                    {/* Remediation */}
                    <div className="bg-muted/30 rounded-md p-3 mb-3">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Remediation
                      </p>
                      <p className="text-[13px] text-foreground leading-relaxed">{finding.remediation}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        {finding.effort}
                      </Badge>
                      <Button
                        variant={isResolved ? "ghost" : "outline"}
                        size="sm"
                        className={`text-[11px] h-7 gap-1.5 ${!isResolved ? "border-primary/30 text-primary hover:bg-primary/5" : "text-muted-foreground"}`}
                        onClick={() => toggleResolved(finding.id)}
                      >
                        {isResolved ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            View evidence
                          </>
                        ) : (
                          "Mark as resolved"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t pt-5 space-y-3" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium text-foreground">
            {p0ResolvedCount} of {p0Findings.length} P0 findings resolved
          </span>
          <div className="flex-1 max-w-xs">
            <Progress value={(p0ResolvedCount / p0Findings.length) * 100} className="h-2" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className={`h-10 text-[13px] gap-2 px-5 ${
              allP0Resolved
                ? ""
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!allP0Resolved}
          >
            {allP0Resolved ? (
              <>
                Request Expert Review
                <ChevronRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" />
                Request Expert Review
              </>
            )}
          </Button>
          <p className="text-[11px] text-muted-foreground">
            {allP0Resolved
              ? "All P0 findings resolved — expert review available"
              : "Resolve all P0 findings to unlock expert review"}
          </p>
        </div>
      </div>
    </div>
  );
}
