import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccountIntelligence, type AccountIntelligenceData } from "@/data/accountIntelligence";
import { productKnowledgeSources } from "@/data/productKnowledge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload, Link, FileText, Sparkles, BookOpen, AlertTriangle, Activity,
  Shield, ArrowRight, Github, Globe, Code2, Building2, Server,
  Clock, Lock, Plus, X, ChevronDown, ChevronRight,
  Zap, Brain, CheckCircle2, Eye, Layers, Target, Bot, Unlock,
  Database, ExternalLink, Cloud, Square,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Generated output data ---
const generatedCategories = [
  { name: "Performance & Scalability", confidence: 94, issues: ["Memory pressure under load", "Throughput degradation", "Query latency spikes", "Resource contention"] },
  { name: "Authentication & Access", confidence: 89, issues: ["Token refresh failures", "SSO integration errors", "Permission escalation", "Session expiry handling"] },
  { name: "Data Integrity & Quality", confidence: 86, issues: ["Schema mismatch", "Validation rule conflicts", "Transformation errors", "Duplicate detection failures"] },
  { name: "Connectivity & Infrastructure", confidence: 91, issues: ["Connector timeouts", "VPN tunnel drops", "DNS resolution delays", "Certificate expiration"] },
  { name: "Compliance & Audit", confidence: 72, issues: ["Audit log gaps", "Retention policy violations", "PII handling errors", "Regulatory reporting failures"] },
  { name: "Integration & Plugins", confidence: 78, issues: ["Plugin version conflicts", "API contract changes", "Webhook delivery failures", "Rate limit cascades"] },
];

const failureModes = [
  { mode: "Memory pressure during batch ingestion", probability: "High", impact: "Critical", detection: "Telemetry" },
  { mode: "Token refresh race condition on multi-node", probability: "Medium", impact: "High", detection: "Customer report" },
  { mode: "WAL replay incomplete during regional failover", probability: "Low", impact: "Critical", detection: "Telemetry" },
  { mode: "Retry loop cascade from downstream rate limits", probability: "Medium", impact: "High", detection: "Telemetry" },
  { mode: "Schema drift after zero-downtime migration", probability: "Medium", impact: "Medium", detection: "Both" },
  { mode: "Plugin binary incompatibility post-upgrade", probability: "High", impact: "Medium", detection: "Customer report" },
];

const telemetrySignals = [
  { signal: "Worker node memory utilization", threshold: "> 85%", interval: "30s", priority: "P1" },
  { signal: "API response time (p99)", threshold: "> 2,000ms", interval: "60s", priority: "P1" },
  { signal: "Cross-region replication lag", threshold: "> 5s", interval: "15s", priority: "P1" },
  { signal: "Error rate (5xx responses)", threshold: "> 0.5%", interval: "60s", priority: "P2" },
  { signal: "Queue depth / backlog", threshold: "> 10,000", interval: "30s", priority: "P2" },
  { signal: "Disk I/O utilization", threshold: "> 90%", interval: "30s", priority: "P2" },
  { signal: "Auth token failure rate", threshold: "> 1%", interval: "60s", priority: "P3" },
  { signal: "Connection pool exhaustion", threshold: "> 95%", interval: "15s", priority: "P1" },
];

const runbooks = [
  { id: "RB-042", title: "Batch Ingestion Memory Pressure", steps: 4, auto: true, trigger: "Memory > 85% for 5min" },
  { id: "RB-043", title: "Token Refresh Recovery Procedure", steps: 3, auto: true, trigger: "Auth failure rate > 1%" },
  { id: "RB-044", title: "Failover Data Recovery & Validation", steps: 7, auto: false, trigger: "Failover event detected" },
  { id: "RB-045", title: "Rate Limit Mitigation & Backoff", steps: 3, auto: true, trigger: "429 rate > 5/min" },
  { id: "RB-046", title: "Schema Rollback Procedure", steps: 6, auto: false, trigger: "Manual escalation" },
  { id: "RB-047", title: "Plugin Compatibility Resolution", steps: 4, auto: false, trigger: "Plugin error detected" },
];

const agentRoles = [
  { name: "Orchestrator", role: "Triage, routing, coordination, and decision assembly", icon: Brain },
  { name: "Telemetry Agent", role: "Metrics collection, anomaly detection, threshold monitoring", icon: Activity },
  { name: "Knowledge Agent", role: "Runbook matching, documentation retrieval, precedent search", icon: BookOpen },
  { name: "Customer Context", role: "Deployment-aware reasoning, SLA checking, constraint validation", icon: Building2 },
  { name: "Resolution Agent", role: "Action planning, execution sequencing, confidence scoring", icon: Zap },
];

const escalationRules = [
  { condition: "Confidence < 50%", action: "Route to human support engineer", level: "L1", auto: true },
  { condition: "Confidence 50–80%", action: "Present recommendation, require approval", level: "L1", auto: false },
  { condition: "Data loss detected", action: "Immediate escalation to senior engineer", level: "L3", auto: true },
  { condition: "Compliance / audit", action: "Route to compliance-certified engineer", level: "L2", auto: true },
  { condition: "Resolution time > 4 hours", action: "Escalate to engineering lead", level: "L2", auto: true },
  { condition: "Customer requests human", action: "Priority queue, 15-min SLA", level: "L1", auto: true },
];

const approvalBoundaries = [
  { action: "Scale compute resources (up to 2x)", approval: "Auto-approved", risk: "low" },
  { action: "Restart stalled pipeline or service", approval: "Auto-approved", risk: "low" },
  { action: "Rotate authentication tokens", approval: "Auto-approved", risk: "medium" },
  { action: "Regional failover initiation", approval: "Human required", risk: "high" },
  { action: "Schema rollback to previous version", approval: "Human required", risk: "high" },
  { action: "Override customer SLA configuration", approval: "Manager required", risk: "critical" },
  { action: "Delete or modify audit logs", approval: "Blocked — never automated", risk: "critical" },
];

// --- Helpers ---
function FilePill({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/8 border border-primary/15 text-xs font-medium text-foreground">
      <FileText className="h-3 w-3 text-primary" />
      {name}
      <button onClick={onRemove} className="ml-0.5 text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>
    </span>
  );
}

function Section({ title, icon: Icon, children, badge, defaultOpen = true }: { title: string; icon: any; children: React.ReactNode; badge?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {badge && <Badge variant="secondary" className="text-[10px]">{badge}</Badge>}
          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>
      {open && <CardContent className="pt-0 px-5 pb-5">{children}</CardContent>}
    </Card>
  );
}

function InputRow({ icon: Icon, placeholder, defaultValue, label }: { icon: any; placeholder: string; defaultValue?: string; label?: string }) {
  return (
    <div>
      {label && <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">{label}</label>}
      <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border bg-card hover:border-primary/30 transition-colors">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <input className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground/60" placeholder={placeholder} defaultValue={defaultValue} />
      </div>
    </div>
  );
}

function TagInput({ label, tags: initial }: { label: string; tags: string[] }) {
  const [tags, setTags] = useState(initial);
  const [input, setInput] = useState("");
  const addTag = () => { if (input.trim()) { setTags([...tags, input.trim()]); setInput(""); } };
  return (
    <div>
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">{label}</label>
      <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg border bg-card min-h-[40px]">
        {tags.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-xs font-medium text-secondary-foreground">
            {t}
            <button onClick={() => setTags(tags.filter((_, j) => j !== i))}><X className="h-2.5 w-2.5" /></button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[120px] text-sm bg-transparent outline-none placeholder:text-muted-foreground/60"
          placeholder="Type and press Enter..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
        />
      </div>
    </div>
  );
}

const riskBg: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

// ================================================================
export default function SupportStudio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");
  const [accountContext, setAccountContext] = useState<AccountIntelligenceData | null>(null);
  const [phase, setPhase] = useState<"input" | "generating" | "output">("input");
  const [showTemplateInput, setShowTemplateInput] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState(["helio-crm-agent-v3.4.2-guide.pdf", "architecture-overview.md"]);
  const [uploadedRunbooks, setUploadedRunbooks] = useState(["incident-response-playbook.yaml"]);

  useEffect(() => {
    if (accountId) {
      const data = getAccountIntelligence(accountId);
      setAccountContext(data);
    }
  }, [accountId]);

  const handleGenerate = () => {
    setPhase("generating");
    setProgress(0);
    const steps = [12, 28, 45, 63, 78, 89, 96, 100];
    steps.forEach((v, i) => setTimeout(() => {
      setProgress(v);
      if (v === 100) setTimeout(() => setPhase("output"), 600);
    }, (i + 1) * 400));
  };

  return (
    <div className="p-6 space-y-5 max-w-[1100px] mx-auto pb-16 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Blueprint Studio</h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">Define your product knowledge, customer constraints, and governance boundaries — then generate a governed support blueprint</p>
        </div>
        {phase === "output" && (
          <Button variant="outline" size="sm" onClick={() => setPhase("input")} className="gap-2">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Edit Inputs
          </Button>
        )}
      </div>

      {/* INPUT PHASE */}
      {(phase === "input" || phase === "generating") && (
        <>
          {/* Two-panel layout */}
          <div className="grid grid-cols-2 gap-5">
            {/* LEFT PANEL — From Account Intelligence */}
            <Card className="border">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center">
                    <Database className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-foreground">From Account Intelligence</h3>
                    <p className="text-[10px] text-muted-foreground">Customer context for blueprint generation</p>
                  </div>
                </div>

                {accountContext ? (
                  <div className="space-y-3">
                    {/* Account + product */}
                    <div className="p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-foreground">{accountContext.customer.name}</span>
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 capitalize">{accountContext.customer.supportTier} tier</Badge>
                      </div>
                      <div className="space-y-1.5">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Products</span>
                          <p className="text-[11px] text-foreground">{accountContext.context.productsInScope.join(", ")}</p>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Environments</span>
                          <p className="text-[11px] text-foreground">{accountContext.context.environments.join(", ")}</p>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Business Criticality</span>
                          <p className="text-[11px] text-foreground capitalize">{accountContext.context.businessCriticality}</p>
                        </div>
                      </div>
                    </div>

                    {/* Top risks */}
                    {accountContext.risks.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Top Risks</span>
                        <div className="space-y-1.5">
                          {accountContext.risks.slice(0, 2).map(r => (
                            <div key={r.id} className="flex items-start gap-2 p-2 rounded-md border bg-card">
                              <AlertTriangle className={`h-3 w-3 mt-0.5 shrink-0 ${r.severity === "high" || r.severity === "critical" ? "text-destructive" : "text-warning"}`} />
                              <span className="text-[10px] text-foreground flex-1">{r.title}</span>
                              <Badge variant="outline" className={`text-[8px] px-1 py-0 shrink-0 ${riskBg[r.severity]}`}>{r.severity}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gaps */}
                    {accountContext.gaps.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Open Gaps</span>
                        <div className="space-y-1.5">
                          {accountContext.gaps.slice(0, 2).map(g => (
                            <div key={g.id} className="flex items-center gap-2 p-2 rounded-md border bg-card">
                              <AlertTriangle className={`h-3 w-3 shrink-0 ${g.severity === "high" ? "text-destructive" : "text-warning"}`} />
                              <span className="text-[10px] text-muted-foreground flex-1">{g.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer link */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      <span className="text-[10px] text-muted-foreground">Loaded from Account Intelligence</span>
                      <button onClick={() => navigate('/intelligence')} className="text-[10px] text-primary hover:underline ml-auto flex items-center gap-1">
                        View account <ExternalLink className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty state — no account connected */
                  <div className="py-8 text-center space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mx-auto">
                      <Database className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-foreground">Connect an account first</p>
                      <p className="text-[10px] text-muted-foreground mt-1 max-w-[240px] mx-auto">
                        Go to Account Intelligence to connect sources and build customer context
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-[11px] h-8 gap-1.5" onClick={() => navigate('/intelligence')}>
                      <ExternalLink className="h-3 w-3" />
                      Open Account Intelligence
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* RIGHT PANEL — Product Knowledge */}
            {(() => {
              const wsType = accountContext?.workspaceType || "isv";
              const pkSource = accountContext ? productKnowledgeSources.find(p => p.accountId === accountContext.customer.id) : null;
              const isISV = wsType === "isv";

              return (
                <Card className="border">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-[13px] font-semibold text-foreground">
                          {isISV ? "Your product sources" : "This engagement's sources"}
                        </h3>
                        <p className="text-[10px] text-muted-foreground">
                          {isISV ? "Upload once — deployed per customer" : "Upload per client — save as template"}
                        </p>
                      </div>
                      {!isISV && <Badge variant="outline" className="text-[9px] px-1.5 py-0 ml-auto">SI</Badge>}
                    </div>

                    {/* File drop zone */}
                    <div>
                      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                        {isISV ? "Product Documentation" : "Solution Documentation"}
                      </label>
                      <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-1.5 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors cursor-pointer">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <p className="text-[11px] font-medium text-foreground">
                          {isISV ? "Product docs, architecture, API reference" : "Solution design, integration specs, deployment notes"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">PDF, Markdown, DOCX, YAML — up to 50MB</p>
                      </div>
                      {uploadedDocs.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {uploadedDocs.map((f, i) => <FilePill key={i} name={f} onRemove={() => setUploadedDocs(uploadedDocs.filter((_, j) => j !== i))} />)}
                        </div>
                      )}
                    </div>

                    {/* URL inputs */}
                    <div className="space-y-3">
                      <InputRow icon={Github} label="GitHub Repository" placeholder={isISV ? "https://github.com/org/repo" : "Client solution repo"} defaultValue={pkSource?.githubRepo || ""} />
                      <InputRow icon={Globe} label={isISV ? "Documentation Site" : "Solution Documentation"} placeholder="https://docs.yourproduct.io" defaultValue={pkSource?.docsUrl || ""} />
                      {isISV ? (
                        <InputRow icon={Code2} label="API Documentation" placeholder="https://api.yourproduct.io/docs" defaultValue={pkSource?.apiDocsUrl || ""} />
                      ) : (
                        <InputRow icon={Link} label="Additional URLs" placeholder="Confluence, Notion, wikis..." />
                      )}
                    </div>

                    {/* Runbook upload */}
                    <div>
                      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                        {isISV ? "Runbooks & Playbooks" : "Delivery Runbooks"}
                      </label>
                      <div className="border-2 border-dashed rounded-lg p-3 flex items-center gap-3 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors cursor-pointer">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-[11px] font-medium text-foreground">
                            {isISV ? "Upload existing runbooks" : "Delivery runbooks from this engagement"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">YAML, JSON, Markdown</p>
                        </div>
                      </div>
                      {uploadedRunbooks.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {uploadedRunbooks.map((f, i) => <FilePill key={i} name={f} onRemove={() => setUploadedRunbooks(uploadedRunbooks.filter((_, j) => j !== i))} />)}
                        </div>
                      )}
                    </div>

                    {/* SI-only: save as template checkbox */}
                    {!isISV && (
                      <label className="flex items-center gap-2 p-2.5 rounded-lg border bg-card cursor-pointer hover:bg-accent/30 transition-colors">
                        <input type="checkbox" className="rounded border-muted-foreground" />
                        <span className="text-[11px] text-foreground">Save as reusable template after blueprint generation</span>
                      </label>
                    )}
                  </CardContent>
                </Card>
              );
            })()}
          </div>

          {/* Governance Boundaries — below both panels */}
          <Section title="Governance Boundaries" icon={Shield} badge="Critical" defaultOpen={true}>
            <p className="text-xs text-muted-foreground mb-4">Define what AI can do automatically, what requires human approval, and what must never be automated.</p>
            <div className="space-y-5">
              <TagInput label="Allowed Automated Actions" tags={["Scale compute (up to 2x)", "Restart pipeline", "Rotate tokens", "Adjust batch size"]} />
              <TagInput label="Approval-Required Actions" tags={["Bulk merge (>100 records)", "Force reindex", "Roll back migration", "Override rate limits"]} />
              <TagInput label="Never Automate" tags={["Delete customer data", "Modify billing", "Regional failover", "Modify audit logs"]} />
              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Escalation Policy</label>
                <textarea
                  className="w-full p-3 rounded-lg border bg-card text-sm outline-none placeholder:text-muted-foreground/60 resize-none"
                  rows={3}
                  defaultValue="Never auto-execute regional failover. Always escalate data loss scenarios. Compliance/audit issues must go to certified engineers. Any action affecting > 50% of nodes requires human approval."
                />
              </div>
            </div>
          </Section>

          {/* CTA */}
          <div className="pt-2">
            {phase === "generating" ? (
              <Card className="border border-primary/20 bg-primary/[0.03]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Generating Governed Support Blueprint...</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {progress < 30 ? "Analyzing product documentation and runbooks..." :
                         progress < 60 ? "Mapping failure modes and telemetry signals..." :
                         progress < 90 ? "Defining approval boundaries and escalation logic..." :
                         "Finalizing governance rules and confidence scores..."}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center gap-4">
                <Button size="lg" onClick={handleGenerate} className="gap-2.5 px-6" disabled={!accountContext}>
                  <Sparkles className="h-4 w-4" /> Generate Governed Blueprint
                </Button>
                <p className="text-xs text-muted-foreground">
                  {accountContext
                    ? "AI will analyze your inputs and create a governed support system with approval boundaries and escalation logic"
                    : "Connect an account in Account Intelligence to enable blueprint generation"}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* OUTPUT PHASE */}
      {phase === "output" && (
        <>
          {/* Context summary banner */}
          {accountContext && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border bg-muted/30">
              <Database className="h-3.5 w-3.5 text-primary shrink-0" />
              <p className="text-[11px] text-foreground">
                Blueprint generated for <span className="font-semibold">{accountContext.customer.name}</span> — {accountContext.context.productsInScope.join(", ")} — <span className="capitalize">{accountContext.customer.supportTier}</span> tier
              </p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 ml-auto capitalize">{accountContext.workspaceType === "si" ? "Service Integration" : "ISV"}</Badge>
            </div>
          )}

          <Card className="border border-primary/20 bg-primary/[0.03]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Governed Blueprint Generated — {accountContext ? `${accountContext.context.productsInScope[0]} × ${accountContext.customer.name}` : "Helio CRM Agent × Acme Manufacturing"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">6 categories · 8 signals · 6 runbooks · 7 approval rules · 6 escalation rules</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2"><Eye className="h-3.5 w-3.5" /> Preview</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governance summary — hero section */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Governance Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-success/5 border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Unlock className="h-4 w-4 text-success" />
                    <p className="text-xs font-semibold text-foreground">Auto-Approved</p>
                  </div>
                  <p className="text-2xl font-bold text-success mb-1">{approvalBoundaries.filter(a => a.approval === "Auto-approved").length}</p>
                  <p className="text-[10px] text-muted-foreground">Low-risk actions AI can execute automatically</p>
                </div>
                <div className="p-4 rounded-lg border bg-warning/5 border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-warning" />
                    <p className="text-xs font-semibold text-foreground">Approval Required</p>
                  </div>
                  <p className="text-2xl font-bold text-warning mb-1">{approvalBoundaries.filter(a => a.approval === "Human required" || a.approval === "Manager required").length}</p>
                  <p className="text-[10px] text-muted-foreground">Higher-risk actions needing human review</p>
                </div>
                <div className="p-4 rounded-lg border bg-destructive/5 border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-destructive" />
                    <p className="text-xs font-semibold text-foreground">Never Automated</p>
                  </div>
                  <p className="text-2xl font-bold text-destructive mb-1">{approvalBoundaries.filter(a => a.approval.includes("never")).length}</p>
                  <p className="text-[10px] text-muted-foreground">Blocked from automation by policy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Categories */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Support Categories</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{generatedCategories.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-3">
              {generatedCategories.map((cat, i) => (
                <div key={i} className="p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{cat.confidence}%</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.issues.map((issue, j) => (
                      <span key={j} className="px-2 py-0.5 rounded bg-secondary text-[10px] text-secondary-foreground">{issue}</span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Approval Boundaries — hero position */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-warning" />
                <CardTitle className="text-sm font-semibold">Approval Boundaries</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{approvalBoundaries.length} rules</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {approvalBoundaries.map((ab, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${ab.risk === "low" ? "bg-success" : ab.risk === "medium" ? "bg-warning" : ab.risk === "high" ? "bg-destructive" : "bg-destructive"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{ab.action}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] px-2 shrink-0 ${riskBg[ab.risk]}`}>{ab.risk}</Badge>
                  <span className="text-[11px] text-muted-foreground w-32 text-right shrink-0">{ab.approval}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Escalation Logic */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-warning rotate-45" />
                <CardTitle className="text-sm font-semibold">Escalation Logic</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{escalationRules.length} rules</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {escalationRules.map((rule, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <Badge variant="outline" className="text-[10px] shrink-0 font-mono">{rule.level}</Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{rule.condition}</p>
                    <p className="text-[11px] text-muted-foreground">{rule.action}</p>
                  </div>
                  {rule.auto ? (
                    <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20 shrink-0">Auto</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20 shrink-0">Approval</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Failure Modes */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <CardTitle className="text-sm font-semibold">Likely Failure Modes</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{failureModes.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {failureModes.map((fm, i) => {
                const riskKeywords = accountContext?.risks.map(r => r.title.toLowerCase()) || [];
                const flagged = riskKeywords.some(kw =>
                  fm.mode.toLowerCase().includes("memory") && kw.includes("memory") ||
                  fm.mode.toLowerCase().includes("batch") && kw.includes("batch") ||
                  fm.mode.toLowerCase().includes("token") && kw.includes("token") ||
                  fm.mode.toLowerCase().includes("drift") && kw.includes("drift")
                );
                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{fm.mode}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {flagged && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-warning/10 text-warning border-warning/20">
                          Flagged in Account Intelligence
                        </Badge>
                      )}
                      <Badge variant="outline" className={`text-[10px] ${fm.probability === "High" ? riskBg.high : fm.probability === "Medium" ? riskBg.medium : riskBg.low}`}>{fm.probability}</Badge>
                      <Badge variant="outline" className={`text-[10px] ${fm.impact === "Critical" ? riskBg.critical : fm.impact === "High" ? riskBg.high : riskBg.medium}`}>{fm.impact}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{fm.detection}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Telemetry */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-info" />
                <CardTitle className="text-sm font-semibold">Telemetry Signals</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{telemetrySignals.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-2">
              {telemetrySignals.map((ts, i) => {
                const gapKeywords = accountContext?.gaps.map(g => g.description.toLowerCase()) || [];
                const addressesGap = gapKeywords.some(kw =>
                  ts.signal.toLowerCase().includes("memory") && kw.includes("memory") ||
                  ts.signal.toLowerCase().includes("model") && kw.includes("model") ||
                  ts.signal.toLowerCase().includes("staleness") && kw.includes("staleness") ||
                  ts.signal.toLowerCase().includes("error") && kw.includes("monitor")
                );
                return (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${ts.priority === "P1" ? "bg-destructive" : ts.priority === "P2" ? "bg-warning" : "bg-muted-foreground"}`} />
                      <div>
                        <p className="text-xs font-medium text-foreground">{ts.signal}</p>
                        {addressesGap && (
                          <span className="text-[9px] text-teal-500">Addresses known gap</span>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono shrink-0">{ts.threshold}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Runbooks */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-success" />
                <CardTitle className="text-sm font-semibold">Generated Runbooks</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{runbooks.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-3">
              {runbooks.map((rb, i) => (
                <div key={i} className="p-3.5 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{rb.id}</span>
                    {rb.auto ? (
                      <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">Auto</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">Requires Approval</Badge>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-foreground">{rb.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{rb.steps} steps · Trigger: {rb.trigger}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Agent Roles — de-emphasized */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-semibold text-muted-foreground">Support Agents</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{agentRoles.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-5 gap-2">
                {agentRoles.map((agent, i) => (
                  <div key={i} className="p-3 rounded-lg border bg-card text-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                      <agent.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-[11px] font-semibold text-foreground">{agent.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{agent.role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Final CTA — persona-specific */}
          <div className="pt-2 border-t space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Review governance rules and approval boundaries, then deploy to start governed AI support</p>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2"><Eye className="h-3.5 w-3.5" /> Preview Blueprint</Button>
                {accountContext?.workspaceType === "si" && (
                  <Button variant="outline" className="gap-2" onClick={() => setShowTemplateInput(!showTemplateInput)}>
                    <Layers className="h-3.5 w-3.5" /> Save as service template
                  </Button>
                )}
                <Button className="gap-2" onClick={() => navigate(`/blueprints?accountId=${accountContext?.customer.id || ''}&workspaceType=${accountContext?.workspaceType || 'isv'}`)}>
                  Deploy to {accountContext?.customer.name || "customer"} <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            {accountContext?.workspaceType === "si" && showTemplateInput && (
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 animate-fade-in">
                <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1 block">Template Name</label>
                  <input
                    className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground/60"
                    defaultValue={`${accountContext.context.productsInScope[0]} — Cloud template`}
                  />
                </div>
                <Button size="sm" className="text-[11px] h-8 gap-1.5 shrink-0" onClick={() => navigate(`/blueprints?accountId=${accountContext.customer.id}&workspaceType=si&savedTemplate=true`)}>
                  <CheckCircle2 className="h-3 w-3" /> Save Template
                </Button>
              </div>
            )}
            {accountContext?.workspaceType === "isv" && (
              <button onClick={() => navigate('/intelligence')} className="text-[11px] text-primary hover:underline flex items-center gap-1">
                Deploy to another customer <ExternalLink className="h-3 w-3" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
