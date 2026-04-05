import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight, ChevronDown, CheckCircle2, AlertTriangle, XCircle,
  Loader2, Sparkles, GitBranch, Cloud, FileText, BookOpen, Globe,
  Plus, X, HelpCircle, Shield,
} from "lucide-react";
import { accounts, findProject } from "@/data/projectData";

// ─── Types ───────────────────────────────────────────────────

type SolutionState = "empty" | "ingesting" | "populated";
type Tab = "overview" | "environments" | "services" | "knowledge" | "risks";

interface Framework {
  id: string;
  label: string;
  signal: string;
}

// ─── Data ────────────────────────────────────────────────────

const match = findProject("fintrack-ag", "proj-ft1");
const account = match!.account;
const project = match!.project;

const ingestSteps = [
  { label: "Repository connected — 42 commits indexed", done: true },
  { label: "Architecture components detected — 6 found", done: true },
  { label: "AI risk classified — HIGH RISK (EU AI Act Article 6)", done: true },
  { label: "Detecting regulatory frameworks", active: true },
  { label: "Mapping data flows and PII", pending: true },
  { label: "Scanning for risk signals", pending: true },
  { label: "Building knowledge graph", pending: true },
];

const sourceCards = [
  { title: "GitHub repo", sub: "Architecture auto-mapped from code", icon: GitBranch },
  { title: "Architecture docs", sub: "PDF, Markdown, YAML", icon: FileText },
  { title: "Cloud environment", sub: "Azure · AWS · GCP", icon: Cloud },
  { title: "API spec", sub: "OpenAPI, Swagger, Postman", icon: Globe },
  { title: "Runbooks & ops", sub: "Monitoring, incident, on-call", icon: BookOpen, span2: true },
];

const baselineGaps = [
  { label: "ISO 27001 alignment", status: "fail" as const, detail: "Not demonstrated" },
  { label: "4-hour incident SLA", status: "fail" as const, detail: "Not met — no monitoring configured" },
  { label: "Tier 1 data handling", status: "partial" as const, detail: "Partial — residency not confirmed" },
  { label: "GDPR Article 28 DPA", status: "fail" as const, detail: "Not executed" },
];

const gapIcon = { fail: XCircle, partial: AlertTriangle } as const;
const gapColor = { fail: "text-destructive", partial: "text-amber-600" } as const;

const compTypeColor: Record<string, string> = {
  gateway: "bg-amber-100 text-amber-800 border-amber-200",
  model: "bg-purple-100 text-purple-800 border-purple-200",
  worker: "bg-emerald-100 text-emerald-800 border-emerald-200",
  database: "bg-blue-100 text-blue-800 border-blue-200",
  cache: "bg-stone-100 text-stone-700 border-stone-200",
};

const compNodeColor: Record<string, string> = {
  gateway: "border-amber-300 bg-amber-50",
  model: "border-purple-300 bg-purple-50",
  worker: "border-emerald-300 bg-emerald-50",
  database: "border-blue-300 bg-blue-50",
  cache: "border-stone-300 bg-stone-50",
};

const svcStatusBadge: Record<string, string> = {
  connected: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  partial: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  pending: "bg-muted text-muted-foreground",
  disconnected: "bg-destructive/10 text-destructive border-destructive/20",
};

const ksStatusBadge: Record<string, string> = {
  complete: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  partial: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  missing: "bg-destructive/10 text-destructive border-destructive/20",
  outdated: "bg-amber-500/10 text-amber-700 border-amber-500/20",
};

const sevBadge: Record<string, string> = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  high: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  low: "bg-muted text-muted-foreground",
};

const knowledgeSources = [
  { name: "Cash Flow Agent Architecture Doc", type: "documentation", status: "partial", pages: 8 },
  { name: "cashflow-agent repo", type: "repo", status: "complete", pages: 42 },
  { name: "OpenAI API Spec", type: "api-spec", status: "complete", pages: 12 },
];

const riskSignals = [
  { severity: "critical", title: "Hardcoded API key in repository", description: "API credentials found in plain text in committed source code. Any person with repository access can extract live production credentials." },
  { severity: "critical", title: "No human oversight for financial recommendations", description: "The app makes financial recommendations without any human approval gate. EU AI Act Article 14 requires human oversight for High Risk AI systems." },
  { severity: "high", title: "No monitoring configured on Azure", description: "No Azure Monitor, no alerting, no logging configured. P1 incident resolution within 4 hours is impossible without monitoring." },
  { severity: "high", title: "Single availability zone — 99.9% SLA not achievable", description: "Deployed to a single Azure availability zone with no failover. The 99.9% uptime SLA requirement cannot be met with this architecture." },
];

// ─── Component ───────────────────────────────────────────────

export default function SolutionIntelligence() {
  const navigate = useNavigate();
  const [solutionState, setSolutionState] = useState<SolutionState>("populated");
  const [riskRationaleOpen, setRiskRationaleOpen] = useState(false);
  const [frameworks, setFrameworks] = useState<Framework[]>([
    { id: "gdpr", label: "GDPR", signal: "Swiss customer data detected · Azure Switzerland North" },
    { id: "finma", label: "FINMA", signal: "Swiss financial services · Azure deployment" },
    { id: "eu-ai-act", label: "EU AI Act", signal: "AI system making financial recommendations" },
    { id: "iso27001", label: "ISO 27001", signal: "Security baseline required for all AI systems" },
    { id: "azure-waf", label: "Microsoft WAF", signal: "Azure infrastructure detected" },
  ]);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [hoveredFw, setHoveredFw] = useState<string | null>(null);

  const removeFramework = (id: string) => setFrameworks(prev => prev.filter(f => f.id !== id));

  const stateLabel = { empty: "Not connected", ingesting: "Ingesting…", populated: "Populated" };
  const stateDot = { empty: "bg-muted-foreground/40", ingesting: "bg-amber-500", populated: "bg-success" };

  const tabs: { value: Tab; label: string }[] = [
    { value: "overview", label: "Overview" },
    { value: "environments", label: "Environments" },
    { value: "services", label: "Connected services" },
    { value: "knowledge", label: "Knowledge sources" },
    { value: "risks", label: "Risk signals" },
  ];

  const stateTabs: SolutionState[] = ["empty", "ingesting", "populated"];
  const stateTabLabels: Record<SolutionState, string> = { empty: "Connect", ingesting: "Ingesting", populated: "Populated" };

  return (
    <div className="flex h-full">
      {/* ═══ LEFT PANEL ═══ */}
      <div className="w-60 shrink-0 border-r bg-card overflow-y-auto flex flex-col">
        {/* Solution */}
        <div className="px-4 pt-5 pb-3 border-b">
          <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Solution</p>
          <p className="text-[13px] font-semibold text-foreground">Cash Flow Forecasting Agent</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">v1.0.0 · FinTrack AG · ISV</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className={`h-2 w-2 rounded-full ${stateDot[solutionState]}`} />
            <span className="text-[10px] text-muted-foreground">{stateLabel[solutionState]}</span>
          </div>
        </div>

        {/* Enterprise context */}
        <div className="px-4 pt-4 pb-3 border-b">
          <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Enterprise Context</p>
          <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-3">
              <p className="text-[12px] font-semibold text-foreground">Alpina Bank</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Swiss private bank · Step 0 complete</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 mt-1.5 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                Baseline imported
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Launch Studio steps */}
        <div className="px-4 pt-4 pb-3 flex-1">
          <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Launch Studio</p>
          <div className="space-y-0">
            {[
              { label: "Enterprise context", done: true, active: false, route: "/context" },
              { label: "Solution intelligence", done: false, active: true, route: "/intelligence" },
              { label: "Readiness report", done: false, active: false, route: "/readiness" },
              { label: "Expert review", done: false, active: false, route: "/review" },
              { label: "Procurement package", done: false, active: false, route: "/package" },
            ].map((step, i, arr) => (
              <div key={i}>
                <button
                  onClick={() => step.route && navigate(step.route)}
                  className="flex items-center gap-2.5 py-1.5 w-full text-left group"
                >
                  {step.done ? (
                    <div className="h-5 w-5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  ) : step.active ? (
                    <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                  )}
                  <span className={`text-[11px] ${step.active ? "font-semibold text-foreground" : step.done ? "text-foreground" : "text-muted-foreground"} group-hover:text-foreground transition-colors`}>
                    {step.label}
                  </span>
                </button>
                {i < arr.length - 1 && (
                  <div className="ml-[9px] w-0.5 h-3 bg-muted-foreground/15" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="px-4 pb-4">
          <Button variant="ghost" className="w-full text-[11px] h-8 gap-1.5 text-muted-foreground" onClick={() => navigate("/context")}>
            <Plus className="h-3 w-3" />
            New evaluation
          </Button>
        </div>
      </div>

      {/* ═══ MAIN AREA ═══ */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pt-5 pb-6 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>Launch Studio</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Step 1 — Solution Intelligence</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Cash Flow Forecasting Agent <span className="text-[16px] text-muted-foreground">v1.0.0</span>
            </h1>
            <p className="text-[13px] text-muted-foreground mt-1">
              {solutionState === "empty" && "Not connected yet"}
              {solutionState === "ingesting" && "Ingesting fintrack/cashflow-agent…"}
              {solutionState === "populated" && "Connected 2 days ago · Azure Switzerland North"}
            </p>
          </div>

          {/* State tabs */}
          <div className="flex items-center gap-1 border-b" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            {stateTabs.map(st => (
              <button
                key={st}
                onClick={() => setSolutionState(st)}
                className={`px-4 py-2 text-[12px] font-medium transition-colors relative ${solutionState === st ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {stateTabLabels[st]}
                {solutionState === st && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>

          {/* ════ EMPTY STATE ════ */}
          {solutionState === "empty" && (
            <div className="max-w-[500px] mx-auto text-center space-y-5 pt-6 animate-fade-in">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-foreground">Connect your solution</h2>
                <p className="text-[13px] text-muted-foreground mt-1">
                  Add sources so Launch Studio can classify your AI risk, detect regulatory frameworks, and map your architecture.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                {sourceCards.map((sc, i) => (
                  <Card key={i} className={`border cursor-pointer hover:border-primary/30 transition-colors ${sc.span2 ? "col-span-2" : ""}`} style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                    <CardContent className="p-3 flex items-start gap-2.5">
                      <sc.icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[12px] font-semibold text-foreground">{sc.title}</p>
                        <p className="text-[10px] text-muted-foreground">{sc.sub}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://github.com/your-org/repo"
                  className="flex-1 h-10 px-3 rounded-md border bg-background text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  style={{ borderColor: "rgba(212,207,198,0.4)" }}
                  readOnly
                />
                <Button className="h-10 text-[13px] gap-1.5 px-4 shrink-0" onClick={() => setSolutionState("ingesting")}>
                  Connect <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
              <button className="text-[11px] text-primary hover:underline">or upload files manually</button>

              <div className="pt-2 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>Graph readiness</span>
                  <span className="text-[11px] text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>0%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30" />
                <p className="text-[10px] text-muted-foreground mt-1">Add sources to begin evaluation</p>
              </div>
            </div>
          )}

          {/* ════ INGESTING STATE ════ */}
          {solutionState === "ingesting" && (
            <div className="space-y-5 animate-fade-in">
              <Card className="border bg-secondary/30" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                <CardContent className="p-5 flex items-center gap-4">
                  <Loader2 className="h-6 w-6 text-primary animate-spin shrink-0" />
                  <div>
                    <p className="text-[14px] font-semibold text-foreground">Analysing repository…</p>
                    <p className="text-[12px] text-muted-foreground">fintrack/cashflow-agent · 42 commits · Detecting frameworks and classifying AI risk</p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>Graph readiness</span>
                  <span className="text-[11px] text-primary font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>47%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full rounded-full bg-primary w-[47%] transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                {ingestSteps.map((step, i) => (
                  <div key={i} className={`flex items-start gap-3 px-4 py-2.5 rounded-md border ${step.active ? "bg-primary/[0.04] border-primary/20" : ""}`} style={!step.active ? { borderColor: "rgba(212,207,198,0.25)" } : undefined}>
                    {step.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : step.active ? (
                      <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[8px] text-primary font-bold">…</span>
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-[12px] ${step.done ? "text-foreground" : step.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button className="h-9 text-[12px] gap-1.5 px-4" onClick={() => setSolutionState("populated")}>
                  Preview results <ChevronRight className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" className="h-9 text-[12px] text-muted-foreground" onClick={() => setSolutionState("empty")}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* ════ POPULATED STATE ════ */}
          {solutionState === "populated" && (
            <div className="space-y-5 animate-fade-in">
              {/* Three summary cards */}
              <div className="grid grid-cols-3 gap-3">
                {/* AI Risk */}
                <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                  <CardContent className="p-4">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>AI Risk Classification</p>
                    <p className="text-xl font-bold text-destructive mt-1">HIGH RISK</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Financial recommendations · EU AI Act Article 6</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Requires conformity assessment, human oversight, registration</p>
                    <button onClick={() => setRiskRationaleOpen(!riskRationaleOpen)} className="text-[10px] text-muted-foreground hover:text-foreground mt-1.5 flex items-center gap-1">
                      Why HIGH RISK? {riskRationaleOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    {riskRationaleOpen && (
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed bg-muted/30 rounded-md p-2.5 animate-fade-in">
                        Cash Flow Forecasting Agent makes financial recommendations for SME clients. EU AI Act Annex III classifies systems making credit or financial decisions as High Risk, requiring conformity assessment, human oversight mechanisms, and registration in the EU database.
                      </p>
                    )}
                    <Badge className="mt-2 bg-amber-500/10 text-amber-700 border-amber-500/20 text-[9px] px-1.5 py-0">Expert validation required</Badge>
                  </CardContent>
                </Card>

                {/* Graph Readiness */}
                <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                  <CardContent className="p-4">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Graph Readiness</p>
                    <div className="flex items-center gap-3 mt-2">
                      <svg width="56" height="56" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" opacity="0.3" />
                        <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeDasharray={`${74 * 1.508} ${100 * 1.508}`} strokeLinecap="round" transform="rotate(-90 28 28)" />
                        <text x="28" y="32" textAnchor="middle" className="text-[14px] font-bold" fill="currentColor">74%</text>
                      </svg>
                      <div>
                        <p className="text-[12px] font-medium text-foreground">Knowledge base 74% complete</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">3 sources pending connection</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regulatory Profile */}
                <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                  <CardContent className="p-4">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Regulatory Profile</p>
                    <p className="text-xl font-bold text-foreground mt-1">{frameworks.length} frameworks</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Auto-detected from code and enterprise context</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {frameworks.map(fw => (
                        <div key={fw.id} className="relative group">
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0 pr-5 font-medium">
                            {fw.label}
                          </Badge>
                          <button
                            onClick={() => setHoveredFw(hoveredFw === fw.id ? null : fw.id)}
                            className="absolute right-[14px] top-0 bottom-0 flex items-center text-primary/50 hover:text-primary"
                          >
                            <HelpCircle className="h-2.5 w-2.5" />
                          </button>
                          <button onClick={() => removeFramework(fw.id)} className="absolute right-0.5 top-0 bottom-0 flex items-center text-primary/30 hover:text-primary">
                            <X className="h-2.5 w-2.5" />
                          </button>
                          {hoveredFw === fw.id && (
                            <div className="absolute z-10 top-full left-0 mt-1 px-2.5 py-1.5 rounded-md bg-foreground text-background text-[10px] whitespace-nowrap shadow-lg">
                              {fw.signal}
                            </div>
                          )}
                        </div>
                      ))}
                      <button className="text-[9px] text-primary/60 hover:text-primary border border-dashed border-primary/30 rounded-full px-2 py-0.5">+ Add</button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Run evaluation CTA */}
              <div className="flex items-center justify-between py-3 px-1 mb-2 border-b" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                <div className="text-[12px] text-muted-foreground">
                  Knowledge base 74% complete · Ready to evaluate
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground text-[11px]">
                    Add more sources
                  </Button>
                  <Button size="sm" className="text-[11px] gap-1.5" onClick={() => navigate("/readiness")}>
                    Run evaluation <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Content tabs */}
              <div className="flex items-center gap-1 border-b" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                {tabs.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setActiveTab(t.value)}
                    className={`px-3 py-2 text-[12px] font-medium transition-colors relative ${activeTab === t.value ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t.label}
                    {activeTab === t.value && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>

              {/* ── OVERVIEW TAB ── */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-2 gap-6 animate-fade-in">
                  {/* Architecture diagram */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Architecture</p>

                    <div className="relative p-4">
                      {/* External client */}
                      <div className="flex justify-center mb-3">
                        <div className="px-3 py-1.5 rounded-md border border-muted-foreground/20 bg-muted/20 text-[10px] text-muted-foreground">Client app</div>
                      </div>
                      <div className="flex justify-center mb-2"><div className="w-0.5 h-4 bg-muted-foreground/20" /></div>

                      {/* Row 1 — Gateway */}
                      <div className="flex justify-center mb-2">
                        <ArchNode name="Azure API Gateway" type="gateway" />
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="flex items-center gap-8">
                          <div className="w-0.5 h-4 bg-muted-foreground/20" />
                          <div className="w-0.5 h-4 bg-muted-foreground/20" />
                        </div>
                      </div>

                      {/* Row 2 — Engine + ERP */}
                      <div className="flex justify-center gap-4 mb-2">
                        <ArchNode name="Cash Flow Analysis Engine" type="model" />
                        <ArchNode name="ERP Integration Layer" type="worker" />
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="flex items-center gap-16">
                          <div className="w-0.5 h-4 bg-muted-foreground/20" />
                          <div className="w-0.5 h-4 bg-muted-foreground/20" />
                          <div className="w-0.5 h-4 bg-muted-foreground/20" />
                        </div>
                      </div>

                      {/* Row 3 — DB + Key Vault + Notification */}
                      <div className="flex justify-center gap-3">
                        <ArchNode name="PostgreSQL on Azure" type="database" compact />
                        <ArchNode name="Azure Key Vault" type="cache" compact />
                        <ArchNode name="Notification Service" type="worker" compact />
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {Object.entries(compTypeColor).map(([type, cls]) => (
                        <div key={type} className="flex items-center gap-1">
                          <div className={`h-2.5 w-2.5 rounded border ${cls}`} />
                          <span className="text-[9px] text-muted-foreground capitalize">{type}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      Auto-generated from GitHub repository
                    </p>
                  </div>

                  {/* Enterprise context baseline */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>Enterprise Context Baseline</p>
                    <p className="text-[11px] text-muted-foreground mb-3">Requirements from Alpina Bank · imported from Step 0</p>

                    <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-4 space-y-3">
                        {baselineGaps.map((item, i) => {
                          const Icon = gapIcon[item.status];
                          return (
                            <div key={i} className="flex items-center gap-3">
                              <Icon className={`h-4 w-4 shrink-0 ${gapColor[item.status]}`} />
                              <div className="flex-1">
                                <span className="text-[12px] font-medium text-foreground">{item.label}</span>
                                <span className="text-[11px] text-muted-foreground ml-2">{item.detail}</span>
                              </div>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>

                    <button
                      onClick={() => navigate("/readiness")}
                      className="text-[11px] text-amber-700 mt-2 flex items-center gap-1.5 hover:underline"
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      4 gaps detected — see Readiness Report for remediation
                    </button>
                  </div>
                </div>
              )}

              {/* ── ENVIRONMENTS TAB ── */}
              {activeTab === "environments" && (
                <div className="grid grid-cols-2 gap-3 animate-fade-in">
                  {project.environments.map(env => (
                    <Card key={env.id} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-foreground">{env.name}</span>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">{env.status}</Badge>
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
              )}

              {/* ── CONNECTED SERVICES TAB ── */}
              {activeTab === "services" && (
                <div className="space-y-2 animate-fade-in">
                  {project.connectedServices.map(svc => (
                    <Card key={svc.id} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-3.5 flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full shrink-0 ${svc.status === "connected" ? "bg-success" : "bg-amber-500"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-foreground">{svc.name}</p>
                          <p className="text-[10px] text-muted-foreground">{svc.detail}</p>
                        </div>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 capitalize ${svcStatusBadge[svc.status]}`}>{svc.type}</Badge>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${svcStatusBadge[svc.status]}`}>{svc.status}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* ── KNOWLEDGE SOURCES TAB ── */}
              {activeTab === "knowledge" && (
                <div className="space-y-3 animate-fade-in">
                  {knowledgeSources.map((ks, i) => (
                    <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-3.5 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-foreground">{ks.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 capitalize">{ks.type}</Badge>
                            <span>{ks.pages} pages</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${ksStatusBadge[ks.status]}`}>{ks.status}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-[11px] text-muted-foreground">Add more sources to increase graph readiness above 74%</p>
                  <Button variant="ghost" className="text-[11px] h-8 gap-1.5 text-muted-foreground">
                    <Plus className="h-3 w-3" />
                    Connect source
                  </Button>
                </div>
              )}

              {/* ── RISK SIGNALS TAB ── */}
              {activeTab === "risks" && (
                <div className="space-y-2 animate-fade-in">
                  {riskSignals.map((rs, i) => (
                    <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 mt-0.5 shrink-0 uppercase ${sevBadge[rs.severity]}`}>{rs.severity}</Badge>
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold text-foreground">{rs.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{rs.description}</p>
                          </div>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 shrink-0">New</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Risk signals feed directly into the Readiness Report.{" "}
                    <button onClick={() => navigate("/readiness")} className="text-primary hover:underline">Resolve them there →</button>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Architecture node component ─────────────────────────────

function ArchNode({ name, type, compact }: { name: string; type: string; compact?: boolean }) {
  return (
    <div className={`px-3 ${compact ? "py-1.5" : "py-2"} rounded-lg border-2 ${compNodeColor[type] || "border-stone-200 bg-stone-50"} text-center ${compact ? "min-w-[100px]" : "min-w-[160px]"}`}>
      <p className={`${compact ? "text-[10px]" : "text-[11px]"} font-semibold text-foreground leading-tight`}>{name}</p>
      <Badge variant="outline" className={`text-[8px] px-1 py-0 mt-1 border ${compTypeColor[type] || ""}`}>{type}</Badge>
    </div>
  );
}
