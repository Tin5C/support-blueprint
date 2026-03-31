import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Shield, Activity, GitBranch, FileText, Cloud, AlertTriangle,
  CheckCircle2, Clock, Upload, Link2, Sparkles, ChevronRight,
  Database, BookOpen, CircleDot, Layers, Eye, ExternalLink,
  Plus, BarChart3, XCircle,
} from "lucide-react";
import type { AccountIntelligenceData, ConnectedSystem, IngestionActivity } from "@/data/accountIntelligence";

type DemoState = "empty" | "ingesting" | "populated";

const tierColor: Record<string, string> = {
  standard: "status-info",
  premium: "status-warning",
  critical: "status-danger",
};
const healthColor: Record<string, string> = {
  healthy: "status-success",
  medium: "status-warning",
  low: "status-danger",
  critical: "status-critical",
};
const severityColor: Record<string, string> = {
  low: "status-info",
  medium: "status-warning",
  high: "status-danger",
  critical: "status-critical",
};
const systemIcon: Record<string, typeof Cloud> = {
  jira: Layers,
  github: GitBranch,
  azure: Cloud,
  runbook: BookOpen,
  docs: FileText,
};
const statusIcon: Record<string, typeof CheckCircle2> = {
  connected: CheckCircle2,
  partial: Clock,
  missing: XCircle,
};
const statusColor: Record<string, string> = {
  connected: "text-success",
  partial: "text-warning",
  missing: "text-destructive",
};
const knowledgeStatusBadge: Record<string, string> = {
  complete: "status-success",
  partial: "status-warning",
  missing: "status-danger",
  outdated: "status-warning",
};

interface Props {
  data: AccountIntelligenceData;
}

export default function AccountIntelligence({ data }: Props) {
  const navigate = useNavigate();
  const [state, setState] = useState<DemoState>("empty");
  const [ingestionStep, setIngestionStep] = useState(0);
  const [visibleActivities, setVisibleActivities] = useState<IngestionActivity[]>([]);

  const resetToEmpty = useCallback(() => {
    setState("empty");
    setIngestionStep(0);
    setVisibleActivities([]);
  }, []);

  // Reset when customer changes
  useEffect(() => {
    resetToEmpty();
  }, [data.customer.id, resetToEmpty]);

  const startIngestion = () => {
    setState("ingesting");
    setIngestionStep(0);
    setVisibleActivities([]);
    // Simulate step-by-step ingestion
    data.ingestion.forEach((act, i) => {
      setTimeout(() => {
        setVisibleActivities(prev => [...prev, act]);
        setIngestionStep(i + 1);
        if (i === data.ingestion.length - 1) {
          setTimeout(() => setState("populated"), 800);
        }
      }, (i + 1) * 900);
    });
  };

  const { customer, context, systems, knowledge, risks, changes, gaps, classified } = data;
  const connectedCount = systems.filter(s => s.status === "connected").length;
  const graphCoverage = Math.round(
    ((classified.length - gaps.length) / Math.max(classified.length, 1)) * 100
  );

  return (
    <div className="flex-1 overflow-y-auto animate-fade-in">
      {/* Customer header — aligned to Blueprint header pattern */}
      <div className="px-6 pt-5 pb-4 border-b">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span>Account Intelligence</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{customer.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">{customer.name}</h1>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              {customer.industry} · {customer.size} · {customer.region}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${tierColor[customer.supportTier]}`}>
              {customer.supportTier} tier
            </Badge>
            <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${healthColor[customer.healthStatus]}`}>
              {customer.healthStatus} health
            </Badge>
            <span className="text-[10px] text-muted-foreground ml-2">
              <span className="font-medium text-foreground">{customer.accountOwner}</span> · {connectedCount}/{systems.length} systems
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* STATE 1: Empty / pre-ingestion */}
        {state === "empty" && (
          <div className="animate-fade-in space-y-5">
            {/* Context overview (minimal) */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Products", value: context.productsInScope.join(", "), icon: Database },
                { label: "Environments", value: context.environments.join(", "), icon: Cloud },
                { label: "Critical Workflows", value: context.criticalWorkflows.join(", "), icon: Activity },
                { label: "Business Criticality", value: context.businessCriticality, icon: Shield },
              ].map((m, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-3.5">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <m.icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{m.label}</span>
                    </div>
                    <p className="text-[11px] font-medium text-foreground leading-snug">{m.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Sources CTA */}
            <Card className="border-dashed border-2 border-primary/20 bg-primary/[0.02]">
              <CardContent className="py-10 text-center space-y-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Connect systems & upload context</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 max-w-md mx-auto">
                    Add data sources to build this customer's support knowledge graph. Connected context powers Blueprint Studio and Live Cases.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {[
                    { label: "Connect Jira", icon: Layers },
                    { label: "Connect GitHub", icon: GitBranch },
                    { label: "Connect Azure", icon: Cloud },
                    { label: "Upload Runbook", icon: Upload },
                    { label: "Upload Docs", icon: FileText },
                  ].map((s, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-[11px] h-8 gap-1.5"
                      onClick={startIngestion}
                    >
                      <s.icon className="h-3 w-3" />
                      {s.label}
                    </Button>
                  ))}
                </div>
                <div className="pt-2">
                  <Button className="h-9 text-[12px] gap-2" onClick={startIngestion}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Add Sources & Classify Context
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Systems status (skeleton) */}
            <div>
              <h3 className="text-[12px] font-semibold text-foreground mb-2">Connected Systems</h3>
              <div className="grid grid-cols-5 gap-2">
                {systems.map(s => {
                  const Icon = systemIcon[s.type] || Cloud;
                  const SIcon = statusIcon[s.status];
                  return (
                    <Card key={s.id} className="border">
                      <CardContent className="p-3 text-center space-y-1.5">
                        <Icon className="h-4 w-4 mx-auto text-muted-foreground" />
                        <p className="text-[10px] font-medium text-foreground capitalize">{s.type}</p>
                        <div className="flex items-center justify-center gap-1">
                          <SIcon className={`h-3 w-3 ${statusColor[s.status]}`} />
                          <span className={`text-[9px] ${statusColor[s.status]}`}>{s.status}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STATE 2: Ingestion / classification in progress */}
        {state === "ingesting" && (
          <div className="animate-fade-in space-y-5">
            <Card className="border bg-primary/[0.02]">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-semibold text-foreground">Classifying context…</h3>
                      <p className="text-[10px] text-muted-foreground">Connecting systems, ingesting data, building knowledge graph</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-primary">{ingestionStep}/{data.ingestion.length}</span>
                </div>
                <Progress value={(ingestionStep / data.ingestion.length) * 100} className="h-1.5" />

                {/* Activity log */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                  {visibleActivities.map((act, i) => (
                    <div key={act.id} className="flex items-start gap-2.5 py-1.5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${act.status === "complete" ? "bg-success" : "bg-primary animate-pulse"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-foreground">{act.message}</p>
                        <p className="text-[9px] text-muted-foreground">{act.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="text-[8px] px-1.5 py-0 shrink-0 capitalize">{act.sourceType}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Show classification entities as they appear */}
            {ingestionStep >= 3 && (
              <div className="animate-fade-in">
                <h3 className="text-[12px] font-semibold text-foreground mb-2">Detected Entities</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {classified.slice(0, Math.min(classified.length, ingestionStep + 1)).map(e => (
                    <div key={e.id} className="flex items-center gap-2 px-3 py-2 rounded-md border bg-card animate-scale-in">
                      <CircleDot className="h-3 w-3 text-primary shrink-0" />
                      <span className="text-[10px] text-foreground font-medium flex-1">{e.label}</span>
                      <Badge variant="outline" className="text-[8px] px-1 py-0 capitalize">{e.entityType}</Badge>
                      <span className="text-[9px] text-muted-foreground font-mono">{e.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STATE 3: Populated account intelligence */}
        {state === "populated" && (
          <div className="animate-fade-in space-y-5">
            {/* Context overview */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Products", value: context.productsInScope.join(", "), icon: Database },
                { label: "Environments", value: context.environments.join(", "), icon: Cloud },
                { label: "Critical Workflows", value: context.criticalWorkflows.join(", "), icon: Activity },
                { label: "Business Criticality", value: context.businessCriticality, icon: Shield },
              ].map((m, i) => (
                <Card key={i} className="border">
                  <CardContent className="p-3.5">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <m.icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{m.label}</span>
                    </div>
                    <p className="text-[11px] font-medium text-foreground leading-snug">{m.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support footprint + Graph readiness */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border col-span-2">
                <CardContent className="p-4">
                  <h3 className="text-[12px] font-semibold text-foreground mb-3">Support Footprint</h3>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    {[
                      { label: "Systems", value: connectedCount, sub: `of ${systems.length}` },
                      { label: "Knowledge", value: knowledge.filter(k => k.status === "complete").length, sub: `of ${knowledge.length}` },
                      { label: "Risks", value: risks.length, sub: "identified" },
                      { label: "Gaps", value: gaps.length, sub: "to resolve" },
                    ].map((m, i) => (
                      <div key={i}>
                        <p className="text-xl font-bold text-foreground">{m.value}</p>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                        <p className="text-[9px] text-muted-foreground">{m.sub}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-[12px] font-semibold text-foreground">Graph Readiness</h3>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{graphCoverage}%</p>
                    <p className="text-[10px] text-muted-foreground">coverage</p>
                  </div>
                  <Progress value={graphCoverage} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground">{gaps.length} gap{gaps.length !== 1 ? "s" : ""} remaining</p>
                  {gaps.map(g => (
                    <div key={g.id} className="flex items-center gap-1.5 text-[10px]">
                      <AlertTriangle className={`h-3 w-3 ${g.severity === "high" ? "text-destructive" : "text-warning"}`} />
                      <span className="text-muted-foreground">{g.description}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Connected Systems */}
            <div>
              <h3 className="text-[12px] font-semibold text-foreground mb-2">Connected Systems</h3>
              <div className="grid grid-cols-5 gap-2">
                {systems.map(s => {
                  const Icon = systemIcon[s.type] || Cloud;
                  const SIcon = statusIcon[s.status];
                  return (
                    <Card key={s.id} className="border">
                      <CardContent className="p-3 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-[10px] font-semibold text-foreground capitalize">{s.type}</span>
                          <SIcon className={`h-3 w-3 ml-auto ${statusColor[s.status]}`} />
                        </div>
                        <p className="text-[9px] text-muted-foreground truncate">{s.name}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Classified entities */}
            <div>
              <h3 className="text-[12px] font-semibold text-foreground mb-2">Classified Entities ({classified.length})</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {classified.map(e => (
                  <div key={e.id} className="flex items-center gap-2 px-3 py-2 rounded-md border bg-card">
                    <CircleDot className="h-3 w-3 text-primary shrink-0" />
                    <span className="text-[10px] text-foreground font-medium flex-1">{e.label}</span>
                    <Badge variant="outline" className="text-[8px] px-1 py-0 capitalize">{e.entityType}</Badge>
                    <span className="text-[9px] text-muted-foreground font-mono">{e.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks + Recent Changes side by side */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border">
                <CardContent className="p-4">
                  <h3 className="text-[12px] font-semibold text-foreground mb-2.5">Risk Signals ({risks.length})</h3>
                  <div className="space-y-2">
                    {risks.map(r => (
                      <div key={r.id} className="flex items-start gap-2">
                        <AlertTriangle className={`h-3 w-3 mt-0.5 shrink-0 ${r.severity === "high" || r.severity === "critical" ? "text-destructive" : "text-warning"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-foreground">{r.title}</p>
                          <p className="text-[9px] text-muted-foreground">{r.description}</p>
                        </div>
                        <Badge variant="outline" className={`text-[8px] px-1 py-0 ${severityColor[r.severity]}`}>{r.severity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent className="p-4">
                  <h3 className="text-[12px] font-semibold text-foreground mb-2.5">Recent Changes</h3>
                  <div className="space-y-2">
                    {changes.map(c => (
                      <div key={c.id} className="flex items-start gap-2">
                        <Clock className="h-3 w-3 mt-0.5 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-foreground">{c.description}</p>
                          <p className="text-[9px] text-muted-foreground">{c.type} · {c.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Knowledge Sources */}
            <div>
              <h3 className="text-[12px] font-semibold text-foreground mb-2">Knowledge Sources</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {knowledge.map(k => (
                  <div key={k.id} className="flex items-center gap-2 px-3 py-2.5 rounded-md border bg-card">
                    <BookOpen className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-[10px] text-foreground font-medium flex-1">{k.title}</span>
                    <Badge variant="outline" className={`text-[8px] px-1.5 py-0 ${knowledgeStatusBadge[k.status]}`}>{k.status}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Activation CTAs */}
            <Card className="border bg-primary/[0.02]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[12px] font-semibold text-foreground">Context ready for activation</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {classified.length} entities classified · {connectedCount} systems connected · {gaps.length} gap{gaps.length !== 1 ? "s" : ""} remaining
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-[11px] h-8 gap-1.5">
                      <Eye className="h-3 w-3" />
                      Review Graph Gaps
                    </Button>
                    <Button variant="outline" size="sm" className="text-[11px] h-8 gap-1.5">
                      <ExternalLink className="h-3 w-3" />
                      Open Linked Cases
                    </Button>
                    <Button size="sm" className="text-[11px] h-8 gap-1.5" onClick={() => navigate('/studio?accountId=' + customer.id)}>
                      <BarChart3 className="h-3 w-3" />
                      Use in Blueprint Studio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingestion log (collapsed) */}
            <div>
              <h3 className="text-[12px] font-semibold text-foreground mb-2">Ingestion Log</h3>
              <div className="space-y-1">
                {data.ingestion.map(act => (
                  <div key={act.id} className="flex items-center gap-2 px-3 py-1.5 text-[10px] rounded-md border bg-card">
                    <div className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                    <span className="text-foreground flex-1">{act.message}</span>
                    <span className="text-muted-foreground">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset for demo */}
            <div className="text-center pt-2">
              <Button variant="ghost" size="sm" className="text-[10px] text-muted-foreground h-7" onClick={resetToEmpty}>
                Reset demo state
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
