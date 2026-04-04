import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, ChevronDown, Database, Plus, Sparkles,
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

  const defaultAccountId = params.get("accountId") || "cust-1";
  const defaultProjectId = params.get("projectId") || accounts.find(a => a.id === defaultAccountId)?.projects[0]?.id || "";

  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccountId);
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(
    new Set(["cust-1", "cust-3"])
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
    // auto-expand
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
                {/* Account row */}
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

                {/* Projects (expanded) */}
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

function ProjectDetail({ account, project }: { account: Account; project: Project }) {
  const p = project;
  const isSeeded = account.isFullySeeded;
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
              Deployed {p.deployedDate} · {account.region}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${projectStatusLabel[p.status]}`}>{p.status}</Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 uppercase">{p.workspaceType}</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="px-6 pt-4">
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
          {/* Metrics */}
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

          {/* Architecture */}
          <div>
            <h3 className="text-[12px] font-semibold text-foreground mb-2">Architecture Components</h3>
            <div className="grid grid-cols-3 gap-2">
              {p.architecture.map((c, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${compStatusDot[c.status]}`} />
                      <span className="text-[11px] font-semibold text-foreground flex-1 truncate">{c.name}</span>
                      <Badge variant="outline" className={`text-[8px] px-1.5 py-0 border ${compTypeBadge[c.type]}`}>{c.type}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-snug">{c.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Empty state for minimal data */}
          {hasMinimalData && !isSeeded && <EmptyStateCTA account={account} project={p} />}
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
            <EmptyStateCTA account={account} project={p} />
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
            <EmptyStateCTA account={account} project={p} />
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
            <EmptyStateCTA account={account} project={p} />
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
    </div>
  );
}

// ─── Empty / minimal state CTA ───────────────────────────────

function EmptyStateCTA({ account, project }: { account: Account; project: Project }) {
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
