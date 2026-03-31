import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Shield, Activity, GitBranch, FileText, Cloud, AlertTriangle,
  CheckCircle2, Clock, Link2, ChevronRight, Database, BookOpen,
  Layers, Bot, Zap, RefreshCw, Globe, Lock, Monitor, MessageSquare,
  Mail, Users, ArrowRight, Server, Clipboard, Plus, Sparkles,
  CircleDot, Play, Check, Loader2,
} from "lucide-react";
import { allAccounts, type AISource, type AccountIntelRecord } from "@/data/accountIntelData";

// ─── Helpers ───

const sourceTypeIcon: Record<string, React.ElementType> = {
  crm: Database, support: Clipboard, slack: MessageSquare, teams: MessageSquare,
  email: Mail, docs: FileText, github: GitBranch, telemetry: Monitor,
  "cloud-logs": Cloud, "api-docs": FileText, runbooks: BookOpen, "customer-notes": Users,
};

const riskBadge: Record<string, string> = {
  low: "status-info", medium: "status-warning", high: "status-danger", critical: "status-critical",
};

// ─── Demo step definitions ───

interface BriefingStep {
  id: string;
  sourceId: string;
  assistantMessage: string;
  surfacedFacts: string[];
  agentCapability?: string;
  nextHint?: string;
}

function buildSteps(acct: AccountIntelRecord): BriefingStep[] {
  const s = acct.sources;
  return [
    {
      id: "step-0", sourceId: "",
      assistantMessage: `Here's what we already know about ${acct.name}. They run ${acct.product} with ${acct.overview.activeEnvironments.length} environments. Let's connect sources to build a complete picture.`,
      surfacedFacts: [
        `Product: ${acct.product}`,
        `Environments: ${acct.overview.activeEnvironments.map(e => e.name).join(", ")}`,
        `Key integrations: ${acct.overview.keyIntegrations.slice(0, 3).join(", ")}`,
      ],
      nextHint: "Connect telemetry to see what's actually happening in production.",
    },
    {
      id: "step-1", sourceId: s.find(x => x.type === "telemetry")?.id || "",
      assistantMessage: `Connecting ${s.find(x => x.type === "telemetry")?.name || "telemetry"}… I found live production signals.`,
      surfacedFacts: s.find(x => x.type === "telemetry")?.extractedSignals || [],
      agentCapability: "Agents can now auto-triage based on live telemetry patterns.",
      nextHint: "Next, let's pull support history to understand recurring issues.",
    },
    {
      id: "step-2", sourceId: s.find(x => x.type === "support")?.id || "",
      assistantMessage: `Connected ${s.find(x => x.type === "support")?.name || "support system"}. Here's the support picture.`,
      surfacedFacts: s.find(x => x.type === "support")?.extractedSignals || [],
      agentCapability: "Agents can now reference past cases and resolution patterns during investigation.",
      nextHint: "Let's connect the code repository for deployment context.",
    },
    {
      id: "step-3", sourceId: s.find(x => x.type === "github")?.id || "",
      assistantMessage: `Connected ${s.find(x => x.type === "github")?.name || "GitHub repo"}. Deployment and config context extracted.`,
      surfacedFacts: s.find(x => x.type === "github")?.extractedSignals || [],
      agentCapability: "Agents can now correlate issues with recent deployments and config changes.",
      nextHint: "Now let's add runbooks so agents know how to respond.",
    },
    {
      id: "step-4", sourceId: s.find(x => x.type === "runbooks")?.id || "",
      assistantMessage: `Connected ${s.find(x => x.type === "runbooks")?.name || "runbooks"}. Operational procedures indexed.`,
      surfacedFacts: s.find(x => x.type === "runbooks")?.extractedSignals || [],
      agentCapability: "Agents can now follow documented remediation procedures automatically.",
      nextHint: "Finally, let's connect the collaboration channel for context from the team.",
    },
    {
      id: "step-5", sourceId: s.find(x => x.type === "teams")?.id || "",
      assistantMessage: `Connected ${s.find(x => x.type === "teams")?.name || "Teams"}. Collaboration context is now available.`,
      surfacedFacts: s.find(x => x.type === "teams")?.extractedSignals || [],
      agentCapability: "Agents can now route updates through the preferred support channel and reference recent conversations.",
    },
  ];
}

// ─── Components ───

function AssistantBubble({ message, facts, agentCap, isLatest }: {
  message: string;
  facts: string[];
  agentCap?: string;
  isLatest: boolean;
}) {
  return (
    <div className={`animate-slide-up ${isLatest ? "" : "opacity-80"}`}>
      <div className="flex items-start gap-3">
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] text-foreground leading-relaxed mb-2">{message}</p>
          {facts.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-3 mb-2 space-y-1">
              {facts.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-foreground">
                  <CircleDot className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}
          {agentCap && (
            <div className="flex items-start gap-2 bg-primary/[0.04] rounded-lg p-2.5 border border-primary/10">
              <Bot className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] text-primary font-medium">{agentCap}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SourcePill({ source, connected }: { source: AISource; connected: boolean }) {
  const Icon = sourceTypeIcon[source.type] || Cloud;
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] transition-all ${
      connected ? "bg-success/[0.04] border-success/20" : "bg-card border-border"
    }`}>
      <Icon className={`h-3.5 w-3.5 ${connected ? "text-success" : "text-muted-foreground"}`} />
      <span className={`font-medium ${connected ? "text-foreground" : "text-muted-foreground"}`}>{source.name}</span>
      {connected ? (
        <Check className="h-3 w-3 text-success ml-auto" />
      ) : (
        <span className="text-[9px] text-muted-foreground ml-auto">{source.coverage}%</span>
      )}
    </div>
  );
}

// ─── Right panel summary ───

function SummaryPanel({ acct, connectedIds }: { acct: AccountIntelRecord; connectedIds: Set<string> }) {
  const connectedSources = acct.sources.filter(s => connectedIds.has(s.id));
  const connectedCount = connectedSources.length;
  const totalCoverage = connectedCount > 0
    ? Math.round(connectedSources.reduce((sum, s) => sum + s.coverage, 0) / connectedCount)
    : 0;

  const topRisks = acct.overview.openRisks.slice(0, 3);
  const topGaps = acct.gaps.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Account snapshot */}
      <Card className="border">
        <CardContent className="p-4">
          <h3 className="text-[11px] font-semibold text-foreground mb-3 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" /> Account Snapshot
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Product</span>
              <span className="text-[10px] font-medium text-foreground">{acct.product}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Status</span>
              <Badge variant="outline" className="text-[9px] px-2 py-0 status-info">{acct.deploymentStatus}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Risk</span>
              <Badge variant="outline" className={`text-[9px] px-2 py-0 ${riskBadge[acct.riskLevel]}`}>{acct.riskLevel}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Agent readiness</span>
              <Badge variant="outline" className={`text-[9px] px-2 py-0 capitalize ${
                acct.agentReadiness === "ready" ? "status-success" : acct.agentReadiness === "partial" ? "status-warning" : "status-danger"
              }`}>{acct.agentReadiness}</Badge>
            </div>
            <Separator className="my-1" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Sources connected</span>
              <span className="text-[10px] font-semibold text-foreground">{connectedCount} / {acct.sources.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Avg coverage</span>
              <span className="text-[10px] font-semibold text-foreground">{totalCoverage}%</span>
            </div>
            <Progress value={(connectedCount / acct.sources.length) * 100} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Solutions & environment */}
      {connectedCount > 0 && (
        <Card className="border animate-fade-in">
          <CardContent className="p-4">
            <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-muted-foreground" /> Solutions & Environment
            </h3>
            <div className="space-y-2">
              {acct.overview.activeEnvironments.map((env, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <div className={`h-1.5 w-1.5 rounded-full ${
                    env.status === "healthy" ? "bg-success" : env.status === "degraded" ? "bg-warning" : "bg-destructive"
                  }`} />
                  <span className="text-foreground">{env.name}</span>
                </div>
              ))}
              <Separator className="my-1" />
              <div className="flex flex-wrap gap-1">
                {acct.overview.keyIntegrations.map((int, i) => (
                  <Badge key={i} variant="outline" className="text-[8px] px-1.5 py-0">{int}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risks & constraints */}
      {connectedCount >= 2 && (
        <Card className="border animate-fade-in">
          <CardContent className="p-4">
            <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" /> Risks & Constraints
            </h3>
            <div className="space-y-2">
              {topRisks.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Badge variant="outline" className={`text-[8px] px-1 py-0 mt-0.5 shrink-0 ${riskBadge[r.severity]}`}>{r.severity}</Badge>
                  <span className="text-[10px] text-foreground leading-snug">{r.title}</span>
                </div>
              ))}
              <Separator className="my-1" />
              {acct.supportDesign.customerRestrictions.slice(0, 2).map((r, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                  <Lock className="h-3 w-3 text-warning mt-0.5 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Open gaps */}
      {connectedCount >= 3 && (
        <Card className="border animate-fade-in">
          <CardContent className="p-4">
            <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" /> Open Gaps
            </h3>
            <div className="space-y-2">
              {topGaps.map((g, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Badge variant="outline" className={`text-[8px] px-1 py-0 mt-0.5 shrink-0 ${riskBadge[g.severity]}`}>{g.severity}</Badge>
                  <div>
                    <p className="text-[10px] text-foreground leading-snug">{g.title}</p>
                    <p className="text-[9px] text-primary flex items-center gap-1 mt-0.5">
                      <ArrowRight className="h-2.5 w-2.5" /> {g.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* What agents use this for */}
      {connectedCount >= 4 && (
        <Card className="border border-primary/10 bg-primary/[0.02] animate-fade-in">
          <CardContent className="p-4">
            <h3 className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Bot className="h-3.5 w-3.5 text-primary" /> What agents use this for
            </h3>
            <div className="space-y-1.5">
              {[
                "Faster triage with deployment context",
                "Safer routing using customer constraints",
                "Better investigation with linked runbooks",
                "Playbook drafting from incident patterns",
                "Support-service creation inputs",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-foreground">
                  <Zap className="h-3 w-3 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Main page ───

export default function AccountIntelligencePage() {
  const [selectedId, setSelectedId] = useState("acct-acme");
  const acct = allAccounts.find(a => a.id === selectedId) || allAccounts[0];
  const steps = buildSteps(acct);

  const [currentStep, setCurrentStep] = useState(0);
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());
  const [connecting, setConnecting] = useState(false);

  // Reset when account changes
  useEffect(() => {
    setCurrentStep(0);
    setConnectedIds(new Set());
  }, [selectedId]);

  const handleConnect = useCallback(() => {
    if (currentStep >= steps.length - 1 || connecting) return;
    setConnecting(true);
    const nextStep = steps[currentStep + 1];
    setTimeout(() => {
      setConnectedIds(prev => {
        const next = new Set(prev);
        if (nextStep.sourceId) next.add(nextStep.sourceId);
        return next;
      });
      setCurrentStep(s => s + 1);
      setConnecting(false);
    }, 1200);
  }, [currentStep, steps, connecting]);

  const handleConnectAll = useCallback(() => {
    if (connecting) return;
    setConnecting(true);
    let idx = currentStep;
    const interval = setInterval(() => {
      idx++;
      if (idx >= steps.length) {
        clearInterval(interval);
        setConnecting(false);
        return;
      }
      const step = steps[idx];
      setConnectedIds(prev => {
        const next = new Set(prev);
        if (step.sourceId) next.add(step.sourceId);
        return next;
      });
      setCurrentStep(idx);
    }, 800);
  }, [currentStep, steps, connecting]);

  const visibleSteps = steps.slice(0, currentStep + 1);
  const nextStep = currentStep < steps.length - 1 ? steps[currentStep + 1] : null;
  const nextSource = nextStep ? acct.sources.find(s => s.id === nextStep.sourceId) : null;
  const isDone = currentStep >= steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Page title + account switcher */}
      <div className="border-b bg-card/50">
        <div className="max-w-[1400px] mx-auto px-8 pt-4 pb-2">
          <h1 className="text-[15px] font-semibold text-foreground tracking-tight">Account Intelligence</h1>
          <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">Connect key customer sources and surface the solution, environment, and support context agents need to create and run support.</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mr-2">Account</span>
          {allAccounts.map(a => (
            <Button
              key={a.id}
              variant={selectedId === a.id ? "default" : "outline"}
              size="sm"
              className="h-7 text-[11px] px-3"
              onClick={() => setSelectedId(a.id)}
            >
              {a.name}
            </Button>
          ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/8 flex items-center justify-center">
                <Layers className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-semibold text-foreground tracking-tight">{acct.name}</h2>
                  <Badge variant="outline" className="text-[9px] px-2 py-0 status-info">{acct.deploymentStatus}</Badge>
                  <Badge variant="outline" className={`text-[9px] px-2 py-0 ${riskBadge[acct.riskLevel]}`}>Risk: {acct.riskLevel}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{acct.product} · {acct.overview.activeEnvironments.length} environments · {acct.sources.length} available sources</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Last sync: {acct.lastSync}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{acct.supportStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-column body */}
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        <div className="grid grid-cols-[1fr_320px] gap-6">

          {/* Left: guided assistant flow */}
          <div className="space-y-5">
            {/* Progress indicator */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= currentStep ? "w-8 bg-primary" : "w-4 bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">
                {connectedIds.size} of {acct.sources.length} sources connected
              </span>
              {!isDone && currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[10px] h-6 ml-auto text-primary hover:text-primary"
                  onClick={handleConnectAll}
                  disabled={connecting}
                >
                  Connect all remaining
                </Button>
              )}
            </div>

            {/* Assistant messages */}
            <ScrollArea className="pr-2">
              <div className="space-y-5">
                {visibleSteps.map((step, i) => (
                  <AssistantBubble
                    key={step.id}
                    message={step.assistantMessage}
                    facts={step.surfacedFacts}
                    agentCap={step.agentCapability}
                    isLatest={i === visibleSteps.length - 1}
                  />
                ))}

                {/* Loading state */}
                {connecting && (
                  <div className="flex items-center gap-3 animate-fade-in">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Connecting {nextSource?.name || "source"} and extracting signals…
                    </p>
                  </div>
                )}

                {/* Next action prompt */}
                {!isDone && !connecting && (
                  <div className="animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="flex-1">
                        {steps[currentStep].nextHint && (
                          <p className="text-[11px] text-muted-foreground mb-3">{steps[currentStep].nextHint}</p>
                        )}
                        {nextSource && (
                          <Button
                            size="sm"
                            className="h-8 text-[11px] gap-2"
                            onClick={handleConnect}
                          >
                            <Play className="h-3 w-3" />
                            Connect {nextSource.name}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Done state */}
                {isDone && !connecting && (
                  <div className="animate-fade-in">
                    <Card className="border border-primary/15 bg-primary/[0.02]">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-foreground mb-1">Account briefing complete</p>
                            <p className="text-[11px] text-muted-foreground mb-3">
                              {connectedIds.size} sources connected. {acct.gaps.length} gaps identified. Agent context is ready for support setup and execution.
                            </p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="h-7 text-[10px] gap-1.5">
                                <Zap className="h-3 w-3" />
                                Use in Blueprint Studio
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5">
                                <Link2 className="h-3 w-3" />
                                Connect more sources
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Connected sources strip */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Sources</p>
              <div className="grid grid-cols-3 gap-2">
                {acct.sources.map(s => (
                  <SourcePill key={s.id} source={s} connected={connectedIds.has(s.id)} />
                ))}
              </div>
            </div>

            {/* Surfaced sections — visible after enough steps */}
            {currentStep >= 2 && (
              <div className="space-y-4 animate-fade-in">
                <Separator />

                {/* Solutions running */}
                <div>
                  <h3 className="text-[12px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Solutions Running
                  </h3>
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-foreground">{acct.product}</span>
                        <Badge variant="outline" className="text-[9px] px-2 py-0 status-info">{acct.deploymentStatus}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{acct.overview.deploymentSummary}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Environment */}
                <div>
                  <h3 className="text-[12px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Server className="h-3.5 w-3.5 text-muted-foreground" /> Environment
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="border">
                      <CardContent className="p-3.5">
                        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Environments</p>
                        <div className="space-y-1.5">
                          {acct.overview.activeEnvironments.map((env, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px]">
                              <div className={`h-1.5 w-1.5 rounded-full ${
                                env.status === "healthy" ? "bg-success" : env.status === "degraded" ? "bg-warning" : "bg-destructive"
                              }`} />
                              <span className="text-foreground">{env.name}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border">
                      <CardContent className="p-3.5">
                        <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Integrations</p>
                        <div className="flex flex-wrap gap-1.5">
                          {acct.overview.keyIntegrations.map((int, i) => (
                            <Badge key={i} variant="outline" className="text-[9px] px-2 py-0.5">{int}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Recent changes and incidents */}
                {currentStep >= 3 && (
                  <div className="animate-fade-in">
                    <h3 className="text-[12px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" /> Recent Changes & Incidents
                    </h3>
                    <div className="space-y-1.5">
                      {acct.overview.recentIncidents.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-card border">
                          <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${
                            inc.severity === "high" ? "bg-destructive" : inc.severity === "medium" ? "bg-warning" : "bg-muted-foreground"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-medium text-foreground">{inc.title}</p>
                            <p className="text-[9px] text-muted-foreground">{inc.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Support-relevant context */}
                {currentStep >= 4 && (
                  <div className="animate-fade-in">
                    <h3 className="text-[12px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" /> Support-Relevant Context
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="border">
                        <CardContent className="p-3.5 space-y-2">
                          {acct.supportDesign.customerRestrictions.map((r, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[10px] text-foreground">
                              <Lock className="h-3 w-3 text-warning mt-0.5 shrink-0" /> {r}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                      <Card className="border">
                        <CardContent className="p-3.5 space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-foreground">
                            <MessageSquare className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span>Channel: {acct.supportDesign.recommendedChannel}</span>
                          </div>
                          {acct.overview.stakeholders.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px]">
                              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                                {s.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-medium text-foreground">{s.name}</span>
                              <span className="text-muted-foreground">· {s.role}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: live repository summary */}
          <div className="sticky top-6">
            <SummaryPanel acct={acct} connectedIds={connectedIds} />
          </div>
        </div>
      </div>
    </div>
  );
}
