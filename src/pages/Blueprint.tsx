import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAccountIntelligence, type AccountIntelligenceData } from "@/data/accountIntelligence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Target, Activity, AlertTriangle, Zap, Shield, UserX, ArrowRight,
  Heart, Edit2, CheckCircle2, Clock, Eye,
  TrendingUp, ChevronDown, ChevronRight,
  Plus, GripVertical, Lock, Unlock,
  Thermometer, ArrowUpRight, RefreshCw, BarChart3,
  Database, Layers, ExternalLink, MessageSquare,
} from "lucide-react";

// ============================================================
// DATA
// ============================================================

const categories = [
  { name: "Lead & Contact Management", coverage: 94, cases: 22, auto: 18, manual: 4, description: "CRM record creation, deduplication, merge conflicts, field mapping" },
  { name: "Pipeline & Deal Tracking", coverage: 88, cases: 16, auto: 12, manual: 4, description: "Stage transitions, probability scoring, forecast accuracy, stale deal detection" },
  { name: "Email & Communication Sync", coverage: 82, cases: 14, auto: 10, manual: 4, description: "OAuth sync failures, threading errors, attachment handling, bounce management" },
  { name: "Workflow Automation", coverage: 79, cases: 11, auto: 7, manual: 4, description: "Trigger misfires, action loop detection, conditional branching errors" },
  { name: "Reporting & Analytics", coverage: 85, cases: 9, auto: 7, manual: 2, description: "Dashboard rendering, data aggregation timeouts, export failures" },
  { name: "Integration & API", coverage: 76, cases: 13, auto: 8, manual: 5, description: "Webhook delivery, rate limiting, API versioning, third-party sync" },
  { name: "User Access & Permissions", coverage: 91, cases: 6, auto: 5, manual: 1, description: "Role assignment errors, SSO provisioning, permission inheritance" },
];

const signals = [
  { signal: "API response latency (p95)", threshold: "> 800ms", interval: "30s", priority: "P1", status: "active" as const },
  { signal: "Sync queue depth", threshold: "> 5,000 jobs", interval: "15s", priority: "P1", status: "active" as const },
  { signal: "OAuth token refresh failure rate", threshold: "> 0.5%", interval: "60s", priority: "P1", status: "active" as const },
  { signal: "Webhook delivery failure rate", threshold: "> 2%", interval: "60s", priority: "P2", status: "active" as const },
  { signal: "Database connection pool usage", threshold: "> 85%", interval: "15s", priority: "P1", status: "active" as const },
  { signal: "Workflow execution error rate", threshold: "> 1%", interval: "60s", priority: "P2", status: "active" as const },
  { signal: "Search index lag", threshold: "> 30s", interval: "30s", priority: "P2", status: "active" as const },
  { signal: "Background job failure rate", threshold: "> 3%", interval: "120s", priority: "P3", status: "pending" as const },
  { signal: "Email bounce rate", threshold: "> 5%", interval: "300s", priority: "P3", status: "pending" as const },
];

const failureModes = [
  { mode: "Duplicate record creation during high-volume import", probability: "High", impact: "Medium", detection: "Telemetry", mitigation: "Dedup engine + merge queue" },
  { mode: "OAuth token expiry cascade across connected accounts", probability: "Medium", impact: "High", detection: "Telemetry", mitigation: "Proactive refresh + retry with backoff" },
  { mode: "Workflow infinite loop from circular trigger conditions", probability: "Low", impact: "Critical", detection: "Telemetry", mitigation: "Loop counter + circuit breaker" },
  { mode: "Data loss during bulk field type migration", probability: "Low", impact: "Critical", detection: "Both", mitigation: "Shadow write + rollback snapshot" },
  { mode: "Search index corruption after schema change", probability: "Medium", impact: "High", detection: "Customer", mitigation: "Full reindex + fallback to DB query" },
  { mode: "Rate limit cascade from Salesforce/HubSpot sync", probability: "High", impact: "Medium", detection: "Telemetry", mitigation: "Adaptive backoff + queue prioritization" },
  { mode: "Permission escalation via role inheritance bug", probability: "Low", impact: "Critical", detection: "Audit", mitigation: "Permission snapshot + immediate revoke" },
];

const automatedActions = [
  { action: "Scale sync workers", trigger: "Queue depth > 5K", confidence: 94, runbook: "RB-101", avgTime: "2 min" },
  { action: "Retry failed OAuth refresh", trigger: "Token failure detected", confidence: 96, runbook: "RB-102", avgTime: "30 sec" },
  { action: "Throttle outbound API calls", trigger: "Rate limit approaching", confidence: 92, runbook: "RB-103", avgTime: "instant" },
  { action: "Merge duplicate records", trigger: "Dedup score > 95%", confidence: 89, runbook: "RB-104", avgTime: "5 min" },
  { action: "Break workflow loop", trigger: "Loop count > 10", confidence: 97, runbook: "RB-105", avgTime: "instant" },
  { action: "Restart stalled sync job", trigger: "No progress for 10 min", confidence: 91, runbook: "RB-106", avgTime: "1 min" },
];

const approvalActions = [
  { action: "Bulk merge duplicate contacts (> 100 records)", risk: "high", reason: "Potential data loss if merge rules are incorrect", approver: "Support Engineer" },
  { action: "Force reindex of search database", risk: "medium", reason: "Temporary search degradation during rebuild", approver: "Support Engineer" },
  { action: "Roll back field type migration", risk: "high", reason: "May revert customer data transformations", approver: "Senior Engineer" },
  { action: "Override workflow rate limits", risk: "medium", reason: "Could impact system performance for other tenants", approver: "Support Engineer" },
  { action: "Revoke and re-provision user permissions", risk: "high", reason: "Temporary access disruption for end users", approver: "Senior Engineer" },
];

const humanOnlyActions = [
  { action: "Delete customer data per GDPR request", reason: "Legal compliance — requires audit trail and confirmation", sla: "24 hours" },
  { action: "Modify billing or subscription tier", reason: "Revenue impact — requires manager sign-off", sla: "4 hours" },
  { action: "Investigate potential data breach", reason: "Security incident protocol — human judgment required", sla: "1 hour" },
  { action: "Custom API integration troubleshooting", reason: "Requires understanding of customer's unique codebase", sla: "8 hours" },
  { action: "Account migration between regions", reason: "Complex data sovereignty and compliance implications", sla: "48 hours" },
];

const escalationMatrix = [
  { from: "AI Agent", to: "L1 Support Engineer", condition: "Confidence < 60% or customer explicitly requests human", sla: "15 min", auto: true },
  { from: "L1 Support", to: "L2 Senior Engineer", condition: "Unresolved after 2 hours or data integrity issue", sla: "30 min", auto: true },
  { from: "L2 Engineer", to: "L3 Engineering Lead", condition: "System-wide impact or requires code change", sla: "1 hour", auto: false },
  { from: "Any Level", to: "Security Team", condition: "Potential data breach or permission escalation", sla: "Immediate", auto: true },
  { from: "Any Level", to: "Customer Success", condition: "Churn risk score > 70 or 3+ escalations in 7 days", sla: "2 hours", auto: true },
  { from: "L2+ Engineer", to: "Product Team", condition: "Bug confirmed in core product, affecting > 5 customers", sla: "4 hours", auto: false },
];

const healthIndicators = [
  { indicator: "Support Volume Trend", value: "↓ 12%", status: "good" as const, detail: "Decreasing month-over-month" },
  { indicator: "Automation Success Rate", value: "87%", status: "good" as const, detail: "Above 80% threshold" },
  { indicator: "Escalation Rate", value: "11%", status: "warning" as const, detail: "Above 10% target" },
  { indicator: "Mean Time to Resolution", value: "1.8 hrs", status: "good" as const, detail: "Improved 22% from last quarter" },
  { indicator: "First Response Time", value: "4.2 min", status: "good" as const, detail: "Within 15-min SLA" },
  { indicator: "Repeat Issue Rate", value: "18%", status: "warning" as const, detail: "Above 15% target" },
];

// ============================================================
const riskBg: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const statusDot: Record<string, string> = {
  good: "bg-success",
  warning: "bg-warning",
  neutral: "bg-muted-foreground",
};

function SectionHeader({ icon: Icon, title, count, children }: { icon: any; title: string; count?: number; children?: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between mb-3 group">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </div>
          <h2 className="text-[13px] font-semibold text-foreground">{title}</h2>
          {count !== undefined && <Badge variant="secondary" className="text-[10px]">{count}</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => { e.stopPropagation(); }}>
            <Edit2 className="h-3 w-3 text-muted-foreground" />
          </Button>
          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>
      {open && children}
    </div>
  );
}

// ============================================================
export default function Blueprint() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");
  const workspaceType = searchParams.get("workspaceType") || "isv";
  const savedTemplate = searchParams.get("savedTemplate") === "true";

  const [accountContext, setAccountContext] = useState<AccountIntelligenceData | null>(null);
  const [wsType, setWsType] = useState<"isv" | "si">("isv");
  const [showTemplateBanner, setShowTemplateBanner] = useState(false);

  useEffect(() => {
    if (accountId) {
      const data = getAccountIntelligence(accountId);
      setAccountContext(data);
    }
    if (workspaceType === "isv" || workspaceType === "si") {
      setWsType(workspaceType);
    }
    if (savedTemplate) {
      setShowTemplateBanner(true);
    }
  }, [accountId, workspaceType, savedTemplate]);

  const coverageScore = 84;
  const confidenceScore = 81;

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-5 pb-16 animate-fade-in">
        {/* Template saved banner */}
        {showTemplateBanner && (
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border bg-success/5 border-success/20 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              <p className="text-[12px] text-foreground">
                <span className="font-semibold">Template saved</span> — {accountContext?.context.productsInScope[0] || "Finance Flow Agent"} — Cloud template is now available in your template library
              </p>
            </div>
            <button onClick={() => setShowTemplateBanner(false)} className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Blueprints</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Helio CRM</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground tracking-tight">Helio CRM — Governed Support Blueprint</h1>
              <p className="text-[12px] text-muted-foreground mt-0.5">Source of truth for support behavior, approval boundaries, and escalation policy</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="gap-2"><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
              <Button variant="outline" size="sm" className="gap-2"><Edit2 className="h-3.5 w-3.5" /> Edit</Button>
              <Button size="sm" className="gap-2"><Zap className="h-3.5 w-3.5" /> Deploy</Button>
            </div>
          </div>
        </div>

        {/* Governance summary bar */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-lg border bg-success/5 border-success/20">
            <div className="flex items-center gap-2 mb-1">
              <Unlock className="h-4 w-4 text-success" />
              <span className="text-xs font-semibold text-foreground">Automated</span>
            </div>
            <p className="text-xl font-bold text-success">{automatedActions.length} actions</p>
            <p className="text-[10px] text-muted-foreground">AI executes without human intervention</p>
          </div>
          <div className="p-4 rounded-lg border bg-warning/5 border-warning/20">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-4 w-4 text-warning" />
              <span className="text-xs font-semibold text-foreground">Approval Required</span>
            </div>
            <p className="text-xl font-bold text-warning">{approvalActions.length} actions</p>
            <p className="text-[10px] text-muted-foreground">Human must review before execution</p>
          </div>
          <div className="p-4 rounded-lg border bg-destructive/5 border-destructive/20">
            <div className="flex items-center gap-2 mb-1">
              <UserX className="h-4 w-4 text-destructive" />
              <span className="text-xs font-semibold text-foreground">Human Only</span>
            </div>
            <p className="text-xl font-bold text-destructive">{humanOnlyActions.length} actions</p>
            <p className="text-[10px] text-muted-foreground">Never automated — requires human judgment</p>
          </div>
        </div>

        {/* AUTOMATED ACTIONS — first to show governance */}
        <SectionHeader icon={Unlock} title="Automated Actions" count={automatedActions.length}>
          <div className="space-y-2">
            {automatedActions.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <Unlock className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{a.action}</p>
                  <p className="text-[11px] text-muted-foreground">Trigger: {a.trigger}</p>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono shrink-0">{a.runbook}</Badge>
                <div className="text-center shrink-0 w-16">
                  <p className="text-[10px] text-muted-foreground">Conf.</p>
                  <p className="text-xs font-semibold text-foreground">{a.confidence}%</p>
                </div>
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* APPROVAL-REQUIRED */}
        <SectionHeader icon={Shield} title="Approval-Required Actions" count={approvalActions.length}>
          <div className="space-y-2">
            {approvalActions.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                  <Lock className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{a.action}</p>
                  <p className="text-[11px] text-muted-foreground">{a.reason}</p>
                </div>
                <Badge variant="outline" className={`text-[10px] shrink-0 ${riskBg[a.risk]}`}>{a.risk}</Badge>
                <span className="text-[11px] text-muted-foreground shrink-0 w-28 text-right">{a.approver}</span>
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* HUMAN-ONLY */}
        <SectionHeader icon={UserX} title="Human-Only Actions" count={humanOnlyActions.length}>
          <div className="space-y-2">
            {humanOnlyActions.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border bg-card border-destructive/10 hover:bg-accent/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                  <UserX className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{a.action}</p>
                  <p className="text-[11px] text-muted-foreground">{a.reason}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">SLA</p>
                  <p className="text-xs font-semibold text-foreground">{a.sla}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* ESCALATION MATRIX */}
        <SectionHeader icon={ArrowUpRight} title="Escalation Matrix" count={escalationMatrix.length}>
          <div className="space-y-2">
            {escalationMatrix.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <Badge variant="secondary" className="text-[10px] shrink-0 w-24 justify-center">{e.from}</Badge>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <Badge variant="outline" className="text-[10px] bg-primary/8 text-primary border-primary/20 shrink-0 w-32 justify-center">{e.to}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-foreground">{e.condition}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">SLA</p>
                  <p className="text-[11px] font-semibold text-foreground">{e.sla}</p>
                </div>
                {e.auto ? (
                  <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">Auto</Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px]">Manual</Badge>
                )}
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* SUPPORT CATEGORIES */}
        <SectionHeader icon={Target} title="Support Categories" count={categories.length}>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors group">
                <div className="flex items-center gap-2 w-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{cat.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-32">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">Coverage</span>
                      <span className="text-[10px] font-semibold text-foreground">{cat.coverage}%</span>
                    </div>
                    <Progress value={cat.coverage} className="h-1" />
                  </div>
                  <div className="text-center w-14">
                    <p className="text-[10px] text-muted-foreground">Auto</p>
                    <p className="text-xs font-semibold text-success">{cat.auto}</p>
                  </div>
                  <div className="text-center w-14">
                    <p className="text-[10px] text-muted-foreground">Manual</p>
                    <p className="text-xs font-semibold text-warning">{cat.manual}</p>
                  </div>
                </div>
              </div>
            ))}
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
              <Plus className="h-3.5 w-3.5" /> Add Category
            </button>
          </div>
        </SectionHeader>

        {/* SIGNALS */}
        <SectionHeader icon={Activity} title="Signals to Monitor" count={signals.length}>
          <div className="grid grid-cols-1 gap-1.5">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-x-4 px-3.5 py-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              <span className="w-5" />
              <span>Signal</span>
              <span className="w-24 text-right">Threshold</span>
              <span className="w-16 text-center">Interval</span>
              <span className="w-12 text-center">Priority</span>
              <span className="w-16 text-center">Status</span>
            </div>
            {signals.map((s, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-x-4 items-center p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <div className={`h-2 w-2 rounded-full ${s.status === "active" ? "bg-success" : "bg-muted-foreground/40"}`} />
                <span className="text-xs font-medium text-foreground">{s.signal}</span>
                <Badge variant="outline" className="text-[10px] font-mono w-24 justify-center">{s.threshold}</Badge>
                <span className="text-[11px] text-muted-foreground w-16 text-center">{s.interval}</span>
                <Badge variant="outline" className={`text-[10px] w-12 justify-center ${s.priority === "P1" ? "bg-destructive/10 text-destructive border-destructive/20" : s.priority === "P2" ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}`}>{s.priority}</Badge>
                <span className="w-16 text-center">
                  {s.status === "active" ? (
                    <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">Pending</Badge>
                  )}
                </span>
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* FAILURE MODES */}
        <SectionHeader icon={AlertTriangle} title="Common Failure Modes" count={failureModes.length}>
          <div className="space-y-2">
            {failureModes.map((fm, i) => (
              <div key={i} className="p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground mb-1">{fm.mode}</p>
                    <p className="text-[11px] text-muted-foreground">Mitigation: {fm.mitigation}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={`text-[10px] ${fm.probability === "High" ? riskBg.high : fm.probability === "Medium" ? riskBg.medium : riskBg.low}`}>{fm.probability}</Badge>
                    <Badge variant="outline" className={`text-[10px] ${fm.impact === "Critical" ? riskBg.critical : fm.impact === "High" ? riskBg.high : riskBg.medium}`}>{fm.impact}</Badge>
                    <Badge variant="secondary" className="text-[10px]">{fm.detection}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* HEALTH INDICATORS */}
        <SectionHeader icon={Thermometer} title="Customer Health Indicators" count={healthIndicators.length}>
          <div className="grid grid-cols-2 gap-2">
            {healthIndicators.map((h, i) => (
              <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-lg border bg-card">
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${statusDot[h.status]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{h.indicator}</p>
                  <p className="text-[10px] text-muted-foreground">{h.detail}</p>
                </div>
                <span className="text-sm font-bold text-foreground shrink-0">{h.value}</span>
              </div>
            ))}
          </div>
        </SectionHeader>

        {/* COVERAGE SCORE */}
        <SectionHeader icon={BarChart3} title="Support Coverage Score">
          <Card className="border">
            <CardContent className="p-5">
              <div className="flex items-center gap-6">
                <div className="relative h-28 w-28 shrink-0">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${coverageScore * 2.64} ${264 - coverageScore * 2.64}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">{coverageScore}%</span>
                    <span className="text-[10px] text-muted-foreground">Coverage</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  {[
                    { label: "Categories Covered", value: "7 / 7", pct: 100 },
                    { label: "Signals Active", value: "7 / 9", pct: 78 },
                    { label: "Auto Actions", value: "6 / 6", pct: 100 },
                    { label: "Approval Rules", value: "5 / 5", pct: 100 },
                    { label: "Escalation Rules", value: "6 / 6", pct: 100 },
                    { label: "Health Indicators", value: "6 / 6", pct: 100 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">{item.label}</span>
                        <span className="text-[10px] font-semibold text-foreground">{item.value}</span>
                      </div>
                      <Progress value={item.pct} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </SectionHeader>
      </div>

      {/* RIGHT PANEL */}
      <aside className="w-72 shrink-0 border-l bg-card overflow-y-auto">
        <div className="p-5 border-b">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Blueprint Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Status</p>
              <Badge className="bg-success/10 text-success border border-success/20 text-xs px-2.5 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1.5" /> Active — Deployed
              </Badge>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Product</p>
              <p className="text-sm font-semibold text-foreground">Helio CRM</p>
              <p className="text-[11px] text-muted-foreground">v3.4.2 · B2B CRM Platform</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Last Updated</p>
              <p className="text-xs font-medium text-foreground">March 29, 2026 · 14:32 UTC</p>
            </div>
          </div>
        </div>

        {/* Governance breakdown */}
        <div className="p-5 border-b">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Governance Breakdown</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5"><Unlock className="h-3 w-3 text-success" /> Automated</span>
              <span className="text-xs font-semibold text-success">{automatedActions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5"><Lock className="h-3 w-3 text-warning" /> Approval Required</span>
              <span className="text-xs font-semibold text-warning">{approvalActions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5"><UserX className="h-3 w-3 text-destructive" /> Human Only</span>
              <span className="text-xs font-semibold text-destructive">{humanOnlyActions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5"><ArrowUpRight className="h-3 w-3" /> Escalation Rules</span>
              <span className="text-xs font-semibold text-foreground">{escalationMatrix.length}</span>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="p-5 border-b space-y-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Scores</h3>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-foreground font-medium">Coverage Score</span>
              <span className="text-xs font-bold text-primary">{coverageScore}%</span>
            </div>
            <Progress value={coverageScore} className="h-1.5" />
            <p className="text-[10px] text-success mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +6% from last revision</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-foreground font-medium">AI Confidence</span>
              <span className="text-xs font-bold text-foreground">{confidenceScore}%</span>
            </div>
            <Progress value={confidenceScore} className="h-1.5" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-foreground font-medium">Deployment Compat.</span>
              <span className="text-xs font-bold text-success">96%</span>
            </div>
            <Progress value={96} className="h-1.5" />
          </div>
        </div>

        {/* Deployed to */}
        <div className="p-5 border-b">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Deployed To</h3>
          <div className="space-y-2">
            {[
              { name: "Acme Manufacturing", status: "healthy" },
              { name: "HelioWorks AG", status: "at-risk" },
              { name: "Northwind Health", status: "healthy" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-md border bg-background">
                <div className={`h-1.5 w-1.5 rounded-full ${c.status === "at-risk" ? "bg-destructive" : "bg-success"}`} />
                <span className="text-[11px] font-medium text-foreground">{c.name}</span>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground mt-1">+ 2 more deployments</p>
          </div>
        </div>

        {/* Version history */}
        <div className="p-5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Version History</h3>
          <div className="space-y-3">
            {[
              { version: "v2.4", date: "Mar 29", note: "Added permission escalation failure mode" },
              { version: "v2.3", date: "Mar 22", note: "Expanded escalation SLAs" },
              { version: "v2.2", date: "Mar 14", note: "Tuned approval thresholds" },
              { version: "v2.1", date: "Mar 7", note: "Initial governed blueprint" },
            ].map((v, i) => (
              <div key={i} className="relative pl-4">
                {i < 3 && <div className="absolute left-[5px] top-5 bottom-0 w-px bg-border" />}
                <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-card" />
                <p className="text-[11px] font-medium text-foreground">{v.version} · {v.date}</p>
                <p className="text-[10px] text-muted-foreground">{v.note}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
