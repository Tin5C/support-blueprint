import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Shield, Activity, GitBranch, FileText, Cloud, AlertTriangle,
  CheckCircle2, Clock, Upload, Link2, ChevronRight, ChevronDown,
  Database, BookOpen, CircleDot, Layers, Eye, ExternalLink, Radio,
  Plus, BarChart3, XCircle, Users, MessageSquare, Mail, Monitor,
  Bot, Zap, RefreshCw, Info, ArrowRight, Cpu, Server, Globe, Lock,
  Clipboard, Hash, FileWarning, Search, BellRing,
} from "lucide-react";
import { acmeAccount, contosoAccount, allAccounts, type AISource, type GapRecommendation, type AccountIntelRecord } from "@/data/accountIntelData";

// ─── Color helpers ───

const riskColor: Record<string, string> = {
  low: "status-info",
  medium: "status-warning",
  high: "status-danger",
  critical: "status-critical",
};

const sourceStatusColor: Record<string, string> = {
  connected: "text-success",
  partial: "text-warning",
  "not-connected": "text-muted-foreground",
};

const sourceStatusLabel: Record<string, string> = {
  connected: "Connected",
  partial: "Partial",
  "not-connected": "Not connected",
};

const sourceTypeIcon: Record<string, React.ElementType> = {
  crm: Database,
  support: Clipboard,
  slack: MessageSquare,
  teams: MessageSquare,
  email: Mail,
  docs: FileText,
  github: GitBranch,
  telemetry: Monitor,
  "cloud-logs": Cloud,
  "api-docs": FileText,
  runbooks: BookOpen,
  "customer-notes": Users,
};

const readinessColor: Record<string, string> = {
  ready: "status-success",
  partial: "status-warning",
  "not-ready": "status-danger",
};

const envStatusDot: Record<string, string> = {
  healthy: "bg-success",
  degraded: "bg-warning",
  down: "bg-destructive",
};

const severityColor: Record<string, string> = {
  low: "status-info",
  medium: "status-warning",
  high: "status-danger",
};

const gapTypeIcon: Record<string, React.ElementType> = {
  "missing-source": Link2,
  outdated: Clock,
  "unclear-ownership": Users,
  "monitoring-gap": BellRing,
  "missing-approval": Lock,
  "weak-docs": FileWarning,
};

// ─── Section wrapper ───

function Section({ title, icon: Icon, count, children, defaultOpen = true }: {
  title: string;
  icon: React.ElementType;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 w-full group mb-3">
        <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
        <h2 className="text-[13px] font-semibold text-foreground tracking-tight flex-1 text-left">{title}</h2>
        {count !== undefined && (
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{count}</span>
        )}
        {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
      </button>
      {open && <div className="animate-fade-in">{children}</div>}
    </div>
  );
}

// ─── Tag component ───

function Tag({ label, variant = "default" }: { label: string; variant?: "default" | "agent" | "playbook" | "automation" }) {
  const styles: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    agent: "bg-primary/8 text-primary",
    playbook: "bg-success/8 text-success",
    automation: "bg-warning/8 text-warning",
  };
  return <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${styles[variant]}`}>{label}</span>;
}

function tagVariant(t: string): "agent" | "playbook" | "automation" | "default" {
  if (t.includes("agent")) return "agent";
  if (t.includes("playbook")) return "playbook";
  if (t.includes("automation")) return "automation";
  return "default";
}

// ─── Source card ───

function SourceCard({ source }: { source: AISource }) {
  const Icon = sourceTypeIcon[source.type] || Cloud;
  const isConnected = source.status === "connected";
  const isPartial = source.status === "partial";

  return (
    <Card className={`border transition-all duration-150 hover:shadow-sm ${!isConnected && !isPartial ? "opacity-60 border-dashed" : ""}`}>
      <CardContent className="p-3.5">
        <div className="flex items-start gap-2.5">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${isConnected ? "bg-success/8" : isPartial ? "bg-warning/8" : "bg-muted"}`}>
            <Icon className={`h-4 w-4 ${isConnected ? "text-success" : isPartial ? "text-warning" : "text-muted-foreground"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-[11px] font-semibold text-foreground truncate">{source.name}</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[9px] font-medium ${sourceStatusColor[source.status]}`}>{sourceStatusLabel[source.status]}</span>
              <span className="text-[9px] text-muted-foreground">· {source.freshness}</span>
            </div>
            {/* Coverage bar */}
            <div className="flex items-center gap-2 mb-2">
              <Progress value={source.coverage} className="h-1 flex-1" />
              <span className="text-[9px] font-mono text-muted-foreground">{source.coverage}%</span>
            </div>
            {/* Extracted signals */}
            <div className="space-y-0.5">
              {source.extractedSignals.map((sig, i) => (
                <p key={i} className="text-[9px] text-muted-foreground leading-snug">· {sig}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main page ───

export default function AccountIntelligencePage() {
  const acct = schindlerAccount;
  const connectedSources = acct.sources.filter(s => s.status === "connected").length;
  const partialSources = acct.sources.filter(s => s.status === "partial").length;
  const avgCoverage = Math.round(acct.sources.reduce((sum, s) => sum + s.coverage, 0) / acct.sources.length);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── 1. Header / Summary Strip ─── */}
      <div className="border-b bg-card">
        <div className="max-w-[1280px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/8 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg font-semibold text-foreground tracking-tight">{acct.name}</h1>
                  <Badge variant="outline" className="text-[9px] px-2 py-0.5 status-info">{acct.deploymentStatus}</Badge>
                  <Badge variant="outline" className={`text-[9px] px-2 py-0.5 ${riskColor[acct.riskLevel]}`}>Risk: {acct.riskLevel}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{acct.product}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {[
                { label: "Connected sources", value: `${connectedSources} of ${acct.sources.length}`, icon: Link2 },
                { label: "Last sync", value: acct.lastSync, icon: RefreshCw },
                { label: "Agent readiness", value: acct.agentReadiness, icon: Bot, badge: true },
                { label: "Support status", value: acct.supportStatus, icon: Activity },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <m.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                    {m.badge ? (
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 capitalize ${readinessColor[acct.agentReadiness]}`}>{m.value}</Badge>
                    ) : (
                      <p className="text-[11px] font-medium text-foreground">{m.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="max-w-[1280px] mx-auto px-8 py-6 space-y-7">

        {/* ─── 2. Source Connections ─── */}
        <Section title="Source Connections" icon={Link2} count={acct.sources.length}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 className="h-3 w-3 text-success" />
              {connectedSources} connected
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3 text-warning" />
              {partialSources} partial
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <XCircle className="h-3 w-3 text-muted-foreground" />
              {acct.sources.length - connectedSources - partialSources} not connected
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span>Avg coverage:</span>
              <span className="font-semibold text-foreground">{avgCoverage}%</span>
            </div>
            <Button variant="outline" size="sm" className="text-[10px] h-7 gap-1.5">
              <Plus className="h-3 w-3" />
              Connect source
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {acct.sources.map(s => <SourceCard key={s.id} source={s} />)}
          </div>
        </Section>

        {/* ─── 3. Account Overview ─── */}
        <Section title="Account Overview" icon={Search}>
          {/* Summary */}
          <Card className="border mb-4">
            <CardContent className="p-4">
              <p className="text-[11px] text-foreground leading-relaxed">{acct.overview.summary}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Deployment / product */}
            <Card className="border">
              <CardContent className="p-4">
                <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Server className="h-3 w-3 text-muted-foreground" /> Deployment & Usage
                </h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">{acct.overview.deploymentSummary}</p>
                <div className="space-y-1.5">
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">Environments</p>
                  <div className="flex flex-wrap gap-2">
                    {acct.overview.activeEnvironments.map((env, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-foreground">
                        <div className={`h-1.5 w-1.5 rounded-full ${envStatusDot[env.status] || "bg-muted-foreground"}`} />
                        {env.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key integrations + stakeholders */}
            <Card className="border">
              <CardContent className="p-4">
                <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-muted-foreground" /> Integrations & Stakeholders
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {acct.overview.keyIntegrations.map((int, i) => (
                    <Badge key={i} variant="outline" className="text-[9px] px-2 py-0.5">{int}</Badge>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {acct.overview.stakeholders.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">{s.name.split(" ").map(n => n[0]).join("")}</div>
                      <span className="font-medium text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">· {s.role}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support history + recent incidents + risks */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border">
              <CardContent className="p-4">
                <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <BarChart3 className="h-3 w-3 text-muted-foreground" /> Support History
                </h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{acct.overview.supportHistorySnapshot}</p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4">
                <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-muted-foreground" /> Recent Incidents
                </h3>
                <div className="space-y-2">
                  {acct.overview.recentIncidents.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${inc.severity === "high" ? "bg-destructive" : "bg-warning"}`} />
                      <div>
                        <p className="text-[10px] font-medium text-foreground">{inc.title}</p>
                        <p className="text-[9px] text-muted-foreground">{inc.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4">
                <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Shield className="h-3 w-3 text-muted-foreground" /> Open Risks
                </h3>
                <div className="space-y-2">
                  {acct.overview.openRisks.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Badge variant="outline" className={`text-[8px] px-1 py-0 mt-0.5 shrink-0 ${riskColor[r.severity]}`}>{r.severity}</Badge>
                      <p className="text-[10px] text-foreground">{r.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ─── 4. Support Design Inputs ─── */}
        <Section title="Support Design Inputs" icon={Zap}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="border">
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Complexity</p>
                  <p className="text-[10px] text-foreground leading-relaxed">{acct.supportDesign.complexity}</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Recommended Posture</p>
                  <p className="text-[10px] text-foreground leading-relaxed">{acct.supportDesign.recommendedPosture}</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Recommended Channel</p>
                  <p className="text-[10px] text-foreground leading-relaxed">{acct.supportDesign.recommendedChannel}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Suggested Playbooks</p>
                  <div className="space-y-1">
                    {acct.supportDesign.suggestedPlaybooks.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-foreground">
                        <BookOpen className="h-3 w-3 text-muted-foreground shrink-0" /> {p}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Likely Issue Categories</p>
                  <div className="flex flex-wrap gap-1.5">
                    {acct.supportDesign.likelyIssueCategories.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-[9px] px-2 py-0.5">{c}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="border">
              <CardContent className="p-4">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Escalation Paths</p>
                <div className="space-y-1.5">
                  {acct.supportDesign.escalationPaths.map((p, i) => (
                    <p key={i} className="text-[10px] text-foreground leading-snug">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Approval Requirements</p>
                <div className="space-y-1.5">
                  {acct.supportDesign.approvalRequirements.map((a, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px] text-foreground">
                      <Lock className="h-3 w-3 text-warning mt-0.5 shrink-0" /> {a}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Customer Restrictions</p>
                <div className="space-y-1.5">
                  {acct.supportDesign.customerRestrictions.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px] text-foreground">
                      <Shield className="h-3 w-3 text-destructive mt-0.5 shrink-0" /> {r}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {acct.supportDesign.monitoringGaps.length > 0 && (
            <Card className="border border-warning/20 bg-warning/[0.02] mt-4">
              <CardContent className="p-4">
                <p className="text-[9px] font-semibold text-warning uppercase tracking-wider mb-2">Monitoring Gaps</p>
                <div className="space-y-1.5">
                  {acct.supportDesign.monitoringGaps.map((g, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-foreground">
                      <BellRing className="h-3 w-3 text-warning shrink-0" /> {g}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </Section>

        {/* ─── 5. Agent Context ─── */}
        <Section title="Agent Context" icon={Bot} count={acct.agentContext.length}>
          <p className="text-[10px] text-muted-foreground mb-3">Context items available to agents during support execution. Tags show where each item is actively used.</p>
          <div className="grid grid-cols-2 gap-2">
            {acct.agentContext.map((item, i) => (
              <Card key={i} className="border">
                <CardContent className="p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-[10px] font-semibold text-foreground">{item.label}</p>
                    <div className="flex-1" />
                    {item.tags.map((t, j) => (
                      <Tag key={j} label={t} variant={tagVariant(t)} />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ─── 6. Gaps & Recommendations ─── */}
        <Section title="Gaps & Recommendations" icon={AlertTriangle} count={acct.gaps.length}>
          <div className="space-y-2">
            {acct.gaps.map(g => {
              const GIcon = gapTypeIcon[g.type] || AlertTriangle;
              return (
                <Card key={g.id} className={`border ${g.severity === "high" ? "border-destructive/20 bg-destructive/[0.02]" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${g.severity === "high" ? "bg-destructive/8" : "bg-warning/8"}`}>
                        <GIcon className={`h-3.5 w-3.5 ${g.severity === "high" ? "text-destructive" : "text-warning"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[11px] font-semibold text-foreground">{g.title}</p>
                          <Badge variant="outline" className={`text-[8px] px-1.5 py-0 ${severityColor[g.severity]}`}>{g.severity}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-2">{g.description}</p>
                        <div className="flex items-center gap-1.5">
                          <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                          <p className="text-[10px] font-medium text-primary">{g.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ─── Activation CTAs ─── */}
        <Card className="border bg-primary/[0.02]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[12px] font-semibold text-foreground">Account context ready</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {connectedSources} sources connected · {avgCoverage}% avg coverage · {acct.gaps.length} gaps to resolve
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-[10px] h-8 gap-1.5">
                  <Eye className="h-3 w-3" />
                  Review Gaps
                </Button>
                <Button variant="outline" size="sm" className="text-[10px] h-8 gap-1.5">
                  <ExternalLink className="h-3 w-3" />
                  Open Cases
                </Button>
                <Button size="sm" className="text-[10px] h-8 gap-1.5">
                  <Zap className="h-3 w-3" />
                  Use in Blueprint Studio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
