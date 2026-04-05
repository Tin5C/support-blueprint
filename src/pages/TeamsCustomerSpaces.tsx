import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, ChevronDown, Database, Plus, Sparkles,
  AlertTriangle, Shield, CheckCircle2, XCircle, Clock,
} from "lucide-react";
import { accounts, findProject } from "@/data/projectData";
import type { Account, Project } from "@/data/projectData";

// ─── Color helpers ───────────────────────────────────────────

const healthDot: Record<string, string> = {
  high: "bg-success",
  medium: "bg-warning",
  critical: "bg-destructive",
  low: "bg-muted-foreground/40",
};

const projectStatusDot: Record<string, string> = {
  active: "bg-success",
  onboarding: "bg-amber-500",
  inactive: "bg-muted-foreground/40",
};

const projectStatusLabel: Record<string, string> = {
  active: "status-success",
  onboarding: "status-warning",
  inactive: "status-neutral",
};

const envStatusBadge: Record<string, string> = {
  running: "status-success",
  degraded: "status-warning",
  stopped: "status-danger",
};

const agentStatusColor: Record<string, string> = {
  active: "status-success",
  idle: "status-info",
  error: "status-danger",
};

const serviceStatusColor: Record<string, string> = {
  connected: "bg-success",
  partial: "bg-amber-500",
  pending: "bg-muted-foreground/40",
  disconnected: "bg-destructive",
};

const serviceStatusBadge: Record<string, string> = {
  connected: "status-success",
  partial: "status-warning",
  pending: "status-neutral",
  disconnected: "status-danger",
};

const knowledgeStatusBadge: Record<string, string> = {
  complete: "status-success",
  partial: "status-warning",
  missing: "status-danger",
  outdated: "status-warning",
};

const severityBadge: Record<string, string> = {
  critical: "status-critical",
  high: "status-danger",
  medium: "status-warning",
  low: "status-neutral",
};

const riskStatusBadge: Record<string, string> = {
  new: "status-info",
  investigating: "status-warning",
  mitigated: "status-success",
  resolved: "status-success",
};

const compTypeBadge: Record<string, string> = {
  api: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  worker: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  database: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cache: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  queue: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  gateway: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  model: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  scheduler: "bg-teal-500/10 text-teal-600 border-teal-500/20",
};

const compStatusDot: Record<string, string> = {
  healthy: "bg-success",
  degraded: "bg-warning",
  down: "bg-destructive",
};

// ─── Component ───────────────────────────────────────────────

export default function TeamsCustomerSpaces() {
  const [params, setParams] = useSearchParams();

  const defaultAccountId = params.get("accountId") || "fintrack-ag";
  const defaultProjectId = params.get("projectId") || accounts.find(a => a.id === defaultAccountId)?.projects[0]?.id || "";

  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccountId);
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(
    new Set(["fintrack-ag", "cust-1", "cust-3"])
  );

  const toggleAccount = (id: string) => {
    setExpandedAccounts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectProject = (accountId: string, projectId: string) => {
    setSelectedAccountId(accountId);
    setSelectedProjectId(projectId);
    setParams({ accountId, projectId });
    setExpandedAccounts(prev => new Set(prev).add(accountId));
  };

  const match = findProject(selectedAccountId, selectedProjectId);
  const selectedAccount = match?.account;
  const selectedProject = match?.project;

  return (
    <div className="flex h-full">
      {/* ── SIDEBAR ── */}
      <div className="w-60 shrink-0 border-r bg-card overflow-y-auto">
        <div className="px-4 pt-5 pb-3 border-b">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center">
              <Database className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-[13px] font-semibold text-foreground">Accounts</p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{accounts.length} accounts</p>
        </div>

        <div className="p-1.5 space-y-0.5">
          {accounts.map(acct => {
            const expanded = expandedAccounts.has(acct.id);
            return (
              <div key={acct.id}>
                <button
                  onClick={() => toggleAccount(acct.id)}
                  className="w-full text-left px-3 py-2 rounded-md text-xs transition-all duration-150 hover:bg-accent/50 flex items-center gap-2"
                >
                  {expanded
                    ? <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                    : <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />}
                  <div className={`h-2 w-2 rounded-full shrink-0 ${healthDot[acct.health]}`} />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-foreground text-[11px] block truncate">{acct.name}</span>
                    <span className="text-[9px] text-muted-foreground">{acct.industry} · <span className="uppercase">{acct.tier}</span></span>
                  </div>
                </button>

                {expanded && (
                  <div className="ml-5 pl-2.5 border-l border-border space-y-0.5 pb-1">
                    {acct.projects.map(proj => {
                      const isSelected = selectedAccountId === acct.id && selectedProjectId === proj.id;
                      return (
                        <button
                          key={proj.id}
                          onClick={() => selectProject(acct.id, proj.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition-all duration-150 flex items-center gap-2 ${
                            isSelected
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-accent/50 border border-transparent"
                          }`}
                        >
                          <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${projectStatusDot[proj.status]}`} />
                          <span className={`truncate ${isSelected ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{proj.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 overflow-y-auto">
        {selectedAccount && selectedProject ? (
          <ProjectDetail account={selectedAccount} project={selectedProject} />
        ) : (
          <div className="p-6">
            <p className="text-sm text-muted-foreground">Select an account and project to view intelligence.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Project Detail ──────────────────────────────────────────

const isFinTrack = (accountId: string) => accountId === "fintrack-ag";

const regulatoryFrameworks = ["GDPR", "FINMA", "EU AI Act", "ISO 27001", "Microsoft WAF"];

const enterpriseBaseline = [
  { requirement: "ISO 27001 alignment", status: "fail" as const, detail: "Not demonstrated" },
  { requirement: "4-hour incident SLA", status: "fail" as const, detail: "Not met — no monitoring configured" },
  { requirement: "Tier 1 data handling", status: "partial" as const, detail: "Partial — residency not confirmed" },
  { requirement: "GDPR Article 28 DPA", status: "fail" as const, detail: "Not executed" },
];

const baselineStatusIcon: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  pass: { icon: CheckCircle2, color: "text-success" },
  fail: { icon: XCircle, color: "text-destructive" },
  partial: { icon: AlertTriangle, color: "text-amber-600" },
};

function ProjectDetail({ account, project }: { account: Account; project: Project }) {
  const navigate = useNavigate();
  const p = project;
  const ft = isFinTrack(account.id);
  const hasMinimalData = p.agents.length === 0 && p.knowledgeSources.length === 0 && p.riskSignals.length === 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span>Solution Intelligence</span>
          <ChevronRight className="h-3 w-3" />
          <span>{account.name}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{p.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">{p.name} <span className="text-sm font-normal text-muted-foreground">v{p.version}</span></h1>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Connected {ft ? "2 days ago" : p.deployedDate} · {account.region}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${projectStatusLabel[p.status]}`}>{p.status}</Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 uppercase">{p.workspaceType}</Badge>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-6 space-y-5">
        {/* ── TOP ROW — FinTrack-specific cards ── */}
        {ft && (
          <div className="grid grid-cols-3 gap-3">
            {/* AI Risk Classification */}
            <Card className="border">
              <CardContent className="p-4">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>AI Risk Classification</span>
                <p className="text-xl font-bold text-destructive mt-1">HIGH RISK</p>
                <p className="text-[11px] text-muted-foreground mt-1">Financial recommendations — EU AI Act Article 6</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Requires conformity assessment, human oversight, registration</p>
                <Badge className="mt-2 bg-amber-500/10 text-amber-700 border-amber-500/20 text-[9px] px-1.5 py-0">
                  Expert validation required
                </Badge>
              </CardContent>
            </Card>

            {/* Graph Readiness */}
            <Card className="border">
              <CardContent className="p-4">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Graph Readiness</span>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="h-14 w-14 rounded-full border-4 border-amber-500 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-foreground">74%</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">Knowledge base 74% complete</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">3 sources pending connection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regulatory Profile */}
            <Card className="border">
              <CardContent className="p-4">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Regulatory Profile</span>
                <p className="text-xl font-bold text-foreground mt-1">5 frameworks</p>
                <p className="text-[11px] text-muted-foreground mt-1">Auto-detected from code and enterprise context</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {regulatoryFrameworks.map(fw => (
                    <Badge key={fw} variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0">{fw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Non-FinTrack: show original metrics ── */}
        {!ft && (
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Open Cases", value: p.metrics.openCases, fmt: (v: number) => String(v) },
              { label: "Resolution Rate", value: p.metrics.resolutionRate, fmt: (v: number) => v ? `${v}%` : "—" },
              { label: "Automation Rate", value: p.metrics.automationRate, fmt: (v: number) => v ? `${v}%` : "—" },
              { label: "CSAT", value: p.metrics.csat, fmt: (v: number) => v ? v.toFixed(1) : "—" },
            ].map((m, i) => (
              <Card key={i} className="border">
                <CardContent className="p-3.5">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{m.label}</span>
                  <p className="text-xl font-bold text-foreground mt-1">{m.fmt(m.value)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── TABS ── */}
        <Tabs defaultValue="overview">
          <TabsList className="h-8 text-[11px]">
            <TabsTrigger value="overview" className="text-[11px] px-3 py-1">Overview</TabsTrigger>
            <TabsTrigger value="environments" className="text-[11px] px-3 py-1">Environments</TabsTrigger>
            <TabsTrigger value="agents" className="text-[11px] px-3 py-1">Agents</TabsTrigger>
            <TabsTrigger value="services" className="text-[11px] px-3 py-1">Connected Services</TabsTrigger>
            <TabsTrigger value="knowledge" className="text-[11px] px-3 py-1">Knowledge Sources</TabsTrigger>
            <TabsTrigger value="risks" className="text-[11px] px-3 py-1">Risk Signals</TabsTrigger>
          </TabsList>

          {/* ── OVERVIEW ── */}
          <TabsContent value="overview" className="space-y-5 pb-8">
            <div className={ft ? "grid grid-cols-2 gap-5" : ""}>
              {/* Architecture */}
              <div>
                <h3 className="text-[12px] font-semibold text-foreground mb-2">Architecture Components</h3>
                <div className={ft ? "space-y-2" : "grid grid-cols-3 gap-2"}>
                  {p.architecture.map((c, i) => (
                    <Card key={i} className="border">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`h-2 w-2 rounded-full shrink-0 ${compStatusDot[c.status]}`} />
                          <span className="text-[11px] font-semibold text-foreground flex-1 truncate">{c.name}</span>
                          <Badge variant="outline" className={`text-[8px] px-1.5 py-0 border ${compTypeBadge[c.type] || "bg-muted/50 text-muted-foreground"}`}>{c.type}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-snug">{c.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Enterprise Context Baseline (FinTrack only) */}
              {ft && (
                <div>
                  <h3 className="text-[12px] font-semibold text-foreground mb-0.5">Enterprise Context Baseline</h3>
                  <p className="text-[10px] text-muted-foreground mb-3">Requirements from Alpina Bank — imported from Step 0</p>

                  <Card className="border">
                    <CardContent className="p-4 space-y-3">
                      {enterpriseBaseline.map((item, i) => {
                        const si = baselineStatusIcon[item.status];
                        const Icon = si.icon;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <Icon className={`h-4 w-4 shrink-0 ${si.color}`} />
                            <div className="flex-1 min-w-0">
                              <span className="text-[12px] font-medium text-foreground">{item.requirement}</span>
                              <span className="text-[11px] text-muted-foreground ml-2">{item.detail}</span>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <p className="text-[11px] text-amber-700 mt-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    4 gaps detected — see Readiness Report for remediation
                  </p>
                </div>
              )}
            </div>

            {hasMinimalData && !ft && !account.isFullySeeded && <EmptyStateCTA project={p} />}
          </TabsContent>

          {/* ── ENVIRONMENTS ── */}
          <TabsContent value="environments" className="space-y-3 pb-8">
            <div className="grid grid-cols-2 gap-3">
              {p.environments.map(env => (
                <Card key={env.id} className="border">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-foreground">{env.name}</span>
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${envStatusBadge[env.status]}`}>{env.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0">{env.cloud}</Badge>
                      <span>{env.region}</span>
                      <span>{env.nodes} nodes</span>
                      <span>Uptime {env.uptime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {p.environments.length === 0 && <p className="text-sm text-muted-foreground py-4">No environments configured.</p>}
          </TabsContent>

          {/* ── AGENTS ── */}
          <TabsContent value="agents" className="space-y-3 pb-8">
            {p.agents.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {p.agents.map(ag => (
                  <Card key={ag.id} className="border">
                    <CardContent className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-semibold text-foreground">{ag.name}</span>
                          <span className="text-[10px] text-muted-foreground ml-2">v{ag.version}</span>
                        </div>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${agentStatusColor[ag.status]}`}>{ag.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 capitalize">{ag.type}</Badge>
                        <span>{ag.casesHandled} cases</span>
                        <span>{ag.autoResolved} auto-resolved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground w-16">Confidence</span>
                        <Progress value={ag.confidence} className="h-1.5 flex-1" />
                        <span className="text-[10px] font-mono text-foreground w-8 text-right">{ag.confidence}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyStateCTA project={p} />
            )}
          </TabsContent>

          {/* ── CONNECTED SERVICES ── */}
          <TabsContent value="services" className="space-y-3 pb-8">
            {p.connectedServices.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {p.connectedServices.map(svc => (
                  <Card key={svc.id} className="border">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full shrink-0 ${serviceStatusColor[svc.status]}`} />
                          <span className="text-[12px] font-semibold text-foreground">{svc.name}</span>
                        </div>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${serviceStatusBadge[svc.status]}`}>{svc.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 capitalize">{svc.type}</Badge>
                        <span>Synced {svc.lastSync}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{svc.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyStateCTA project={p} />
            )}
          </TabsContent>

          {/* ── KNOWLEDGE SOURCES ── */}
          <TabsContent value="knowledge" className="space-y-3 pb-8">
            {p.knowledgeSources.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {p.knowledgeSources.map(ks => (
                  <Card key={ks.id} className="border">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-foreground">{ks.name}</span>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${knowledgeStatusBadge[ks.status]}`}>{ks.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 capitalize">{ks.type}</Badge>
                        {ks.pages > 0 && <span>{ks.pages} pages</span>}
                        <span>Updated {ks.lastUpdated}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Uploaded by {ks.uploadedBy}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyStateCTA project={p} />
            )}
          </TabsContent>

          {/* ── RISK SIGNALS ── */}
          <TabsContent value="risks" className="space-y-3 pb-8">
            {p.riskSignals.length > 0 ? (
              <div className="space-y-2">
                {p.riskSignals.map(rs => (
                  <Card key={rs.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 mt-0.5 shrink-0 ${severityBadge[rs.severity]}`}>{rs.severity}</Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-foreground">{rs.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{rs.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                            <span>Detected {rs.detectedDate}</span>
                            <Badge variant="outline" className={`text-[8px] px-1.5 py-0 ${riskStatusBadge[rs.status]}`}>{rs.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4">No active risk signals.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* ── BOTTOM CTA (FinTrack only) ── */}
        {ft && (
          <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <div>
              <p className="text-[12px] font-medium text-foreground">Graph readiness: 74% — evaluation can proceed</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Connect remaining sources to improve accuracy</p>
            </div>
            <Button className="h-9 text-[12px] gap-2 px-5" onClick={() => navigate("/readiness")}>
              Proceed to Readiness Report
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty / minimal state CTA ───────────────────────────────

function EmptyStateCTA({ project }: { project: Project }) {
  const svcCount = project.connectedServices.length;
  const ksCount = project.knowledgeSources.length;

  return (
    <Card className="border-dashed border-2 border-primary/20 bg-primary/[0.02]">
      <CardContent className="py-8 text-center space-y-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Connect sources to build full intelligence</h3>
          <p className="text-[11px] text-muted-foreground mt-1 max-w-md mx-auto">
            Add data sources and upload knowledge to power agents, risk detection, and automated resolution for {project.name}.
          </p>
        </div>
        {(svcCount > 0 || ksCount > 0) && (
          <p className="text-[10px] text-muted-foreground">
            {svcCount} service{svcCount !== 1 ? "s" : ""} connected · {ksCount} knowledge source{ksCount !== 1 ? "s" : ""} uploaded
          </p>
        )}
        <Button className="h-9 text-[12px] gap-2">
          <Plus className="h-3.5 w-3.5" />
          Add Sources & Classify
        </Button>
      </CardContent>
    </Card>
  );
}
