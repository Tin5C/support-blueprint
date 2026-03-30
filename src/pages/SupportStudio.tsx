import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload, Link, FileText, Sparkles, BookOpen, AlertTriangle, Activity,
  Shield, Users, ArrowRight, Github, Globe, Code2, Building2, Server,
  ToggleLeft, Plug, Clock, Lock, Plus, X, ChevronDown, ChevronRight,
  Zap, Brain, CheckCircle2, Eye, Layers, Target, Bot,
} from "lucide-react";

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
  { name: "Orchestrator Agent", role: "Triage, routing, coordination, and final decision assembly", scope: "All incoming signals and cases", icon: Brain },
  { name: "Telemetry Agent", role: "Real-time metrics collection, anomaly detection, threshold monitoring", scope: "Infrastructure & application metrics", icon: Activity },
  { name: "Knowledge Agent", role: "Runbook matching, documentation retrieval, precedent search", scope: "Product docs, runbooks, historical cases", icon: BookOpen },
  { name: "Customer Context Agent", role: "Deployment-aware reasoning, SLA checking, environment understanding", scope: "Customer config, deployment notes, SLA terms", icon: Building2 },
  { name: "Resolution Agent", role: "Action planning, execution sequencing, confidence scoring", scope: "Approved runbooks and automated actions", icon: Zap },
];

const escalationRules = [
  { condition: "Confidence < 50%", action: "Route to human support engineer", level: "L1", auto: true },
  { condition: "Confidence 50–80%", action: "Present recommendation, require approval", level: "L1", auto: false },
  { condition: "Data loss detected", action: "Immediate escalation to senior engineer + notify manager", level: "L3", auto: true },
  { condition: "Compliance / audit category", action: "Auto-route to compliance-certified engineer", level: "L2", auto: true },
  { condition: "Resolution time > 4 hours", action: "Escalate to engineering lead, notify customer success", level: "L2", auto: true },
  { condition: "Customer-triggered + critical priority", action: "Priority queue, 15-min SLA for first response", level: "L1", auto: true },
];

const approvalBoundaries = [
  { action: "Scale compute resources (up to 2x)", approval: "Auto-approved", risk: "low" },
  { action: "Restart stalled pipeline or service", approval: "Auto-approved", risk: "low" },
  { action: "Adjust batch sizes or concurrency", approval: "Auto-approved", risk: "low" },
  { action: "Rotate authentication tokens", approval: "Auto-approved", risk: "medium" },
  { action: "Regional failover initiation", approval: "Human required", risk: "high" },
  { action: "Schema rollback to previous version", approval: "Human required", risk: "high" },
  { action: "Purge and rebuild replication state", approval: "Human required", risk: "high" },
  { action: "Override customer SLA configuration", approval: "Manager required", risk: "critical" },
  { action: "Delete or modify audit logs", approval: "Blocked — never automated", risk: "critical" },
];

// --- Uploaded file pills ---
function FilePill({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/8 border border-primary/15 text-xs font-medium text-foreground">
      <FileText className="h-3 w-3 text-primary" />
      {name}
      <button onClick={onRemove} className="ml-0.5 text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>
    </span>
  );
}

// --- Collapsible section ---
function Section({ title, icon: Icon, children, badge, defaultOpen = true }: { title: string; icon: any; children: React.ReactNode; badge?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
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

// --- Input field ---
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

// --- Tag input ---
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

// --- Risk badge ---
const riskBg: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

// ================================================================
// MAIN COMPONENT
// ================================================================
export default function SupportStudio() {
  const [phase, setPhase] = useState<"input" | "generating" | "output">("input");
  const [progress, setProgress] = useState(0);

  const [uploadedDocs, setUploadedDocs] = useState(["datasync-pro-v4.2-guide.pdf", "architecture-overview.md"]);
  const [uploadedRunbooks, setUploadedRunbooks] = useState(["incident-response-playbook.yaml"]);

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
    <div className="p-6 space-y-5 max-w-[1100px] mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Support Studio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Design your AI-powered support system — upload knowledge, define context, let AI co-create your blueprint</p>
        </div>
        {phase === "output" && (
          <Button variant="outline" size="sm" onClick={() => setPhase("input")} className="gap-2">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Edit Inputs
          </Button>
        )}
      </div>

      {/* ==================== INPUT PHASE ==================== */}
      {(phase === "input" || phase === "generating") && (
        <>
          {/* PRODUCT KNOWLEDGE */}
          <Section title="Product Knowledge" icon={BookOpen} badge="Core input">
            <div className="space-y-5">
              {/* Docs upload */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Product Documentation</label>
                <div className="border-2 border-dashed rounded-lg p-5 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <p className="text-xs font-medium text-foreground">Drop product docs here or click to browse</p>
                  <p className="text-[11px] text-muted-foreground">PDF, Markdown, DOCX, YAML — up to 50MB</p>
                </div>
                {uploadedDocs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedDocs.map((f, i) => <FilePill key={i} name={f} onRemove={() => setUploadedDocs(uploadedDocs.filter((_, j) => j !== i))} />)}
                  </div>
                )}
              </div>

              {/* Runbooks upload */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Runbooks & Playbooks</label>
                <div className="border-2 border-dashed rounded-lg p-4 flex items-center gap-3 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors cursor-pointer">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Upload existing runbooks</p>
                    <p className="text-[11px] text-muted-foreground">YAML, JSON, Markdown — we'll parse and structure them</p>
                  </div>
                </div>
                {uploadedRunbooks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedRunbooks.map((f, i) => <FilePill key={i} name={f} onRemove={() => setUploadedRunbooks(uploadedRunbooks.filter((_, j) => j !== i))} />)}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <InputRow icon={Github} label="GitHub Repository" placeholder="https://github.com/org/repo" defaultValue="https://github.com/acme/datasync-pro" />
                <InputRow icon={Globe} label="Documentation Site" placeholder="https://docs.yourproduct.io" defaultValue="https://docs.datasyncpro.io/v4.2" />
                <InputRow icon={Code2} label="API Documentation" placeholder="https://api.yourproduct.io/docs" defaultValue="https://api.datasyncpro.io/v4/openapi.json" />
                <InputRow icon={Link} label="Additional URLs" placeholder="Confluence, Notion, wikis..." />
              </div>
            </div>
          </Section>

          {/* CUSTOMER CONTEXT */}
          <Section title="Customer Context" icon={Building2} badge="Deployment-specific">
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <InputRow icon={Building2} label="Customer Name" placeholder="Acme Corp" defaultValue="Meridian Financial" />
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Deployment Type</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-card">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <select className="flex-1 text-sm bg-transparent outline-none text-foreground" defaultValue="cloud-multi">
                      <option value="cloud-single">Cloud — Single Region</option>
                      <option value="cloud-multi">Cloud — Multi Region</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="on-prem">On-Premises</option>
                    </select>
                  </div>
                </div>
                <InputRow icon={Globe} label="Environment" placeholder="AWS US-East, Azure West EU..." defaultValue="AWS US-East-1, US-West-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TagInput label="Enabled Features" tags={["Batch Ingestion", "Real-time Sync", "Schema Validation", "CDC Streams", "Custom Transforms"]} />
                <TagInput label="Integrations" tags={["Oracle 12c", "PostgreSQL 15", "Salesforce", "Snowflake", "Kafka"]} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">SLA Tier</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-card">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <select className="flex-1 text-sm bg-transparent outline-none text-foreground" defaultValue="enterprise">
                      <option value="standard">Standard — 8hr response</option>
                      <option value="premium">Premium — 4hr response</option>
                      <option value="enterprise">Enterprise — 1hr response</option>
                      <option value="critical">Mission Critical — 15min</option>
                    </select>
                  </div>
                </div>
                <InputRow icon={Server} label="Instance Count" placeholder="e.g. 24" defaultValue="24 instances" />
                <InputRow icon={Clock} label="Maintenance Window" placeholder="e.g. Sun 02:00-06:00 UTC" defaultValue="Sun 02:00–06:00 UTC" />
              </div>

              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Special Constraints</label>
                <textarea
                  className="w-full p-3 rounded-lg border bg-card text-sm outline-none placeholder:text-muted-foreground/60 resize-none"
                  rows={3}
                  placeholder="Any special constraints, compliance requirements, or operational notes..."
                  defaultValue="PCI-DSS compliant environment. No data may leave US regions. Nightly batch window: 2–6 AM UTC. Customer has custom Oracle connector with vendor-specific patches."
                />
              </div>
            </div>
          </Section>

          {/* MANUAL DEFINITION */}
          <Section title="Manual Definition" icon={Layers} badge="Optional" defaultOpen={false}>
            <p className="text-xs text-muted-foreground mb-4">Override or supplement AI-generated definitions with your own expertise. These will be merged with generated output.</p>
            <div className="space-y-5">
              <TagInput label="Support Categories" tags={["Performance", "Authentication", "Data Integrity", "Connectivity"]} />
              <TagInput label="Common Issue Types" tags={["Memory pressure", "Token refresh failure", "Replication lag", "Plugin conflict"]} />
              <TagInput label="Allowed Automated Actions" tags={["Scale compute (up to 2x)", "Restart pipeline", "Rotate tokens", "Adjust batch size"]} />

              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Escalation Boundaries</label>
                <textarea
                  className="w-full p-3 rounded-lg border bg-card text-sm outline-none placeholder:text-muted-foreground/60 resize-none"
                  rows={3}
                  placeholder="Define when AI should stop and escalate to humans..."
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
                      <Sparkles className="h-5 w-5 text-primary animate-pulse-subtle" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Generating Support Blueprint...</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {progress < 30 ? "Analyzing product documentation and runbooks..." :
                         progress < 60 ? "Mapping failure modes and telemetry signals..." :
                         progress < 90 ? "Defining agent roles and escalation logic..." :
                         "Finalizing blueprint and confidence scores..."}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center gap-4">
                <Button size="lg" onClick={handleGenerate} className="gap-2.5 px-6">
                  <Sparkles className="h-4 w-4" /> Generate Support Blueprint
                </Button>
                <p className="text-xs text-muted-foreground">AI will analyze your inputs and co-create a complete support system design</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ==================== OUTPUT PHASE ==================== */}
      {phase === "output" && (
        <>
          {/* Summary bar */}
          <Card className="border border-primary/20 bg-primary/[0.03]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Blueprint Generated — DataSync Pro × Meridian Financial</p>
                    <p className="text-xs text-muted-foreground mt-0.5">6 categories · 8 signals · 6 runbooks · 5 agents · 9 approval rules</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2"><Eye className="h-3.5 w-3.5" /> Preview Blueprint</Button>
                  <Button size="sm" className="gap-2" onClick={() => window.location.href = '/blueprint'}>
                    Deploy Blueprint <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SUPPORT CATEGORIES */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Support Categories</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{generatedCategories.length} categories</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-3">
              {generatedCategories.map((cat, i) => (
                <div key={i} className="p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{cat.confidence}% conf</Badge>
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

          {/* FAILURE MODES */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <CardTitle className="text-sm font-semibold">Likely Failure Modes</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{failureModes.length} modes</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {failureModes.map((fm, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{fm.mode}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">Probability</p>
                      <Badge variant="outline" className={`text-[10px] mt-0.5 ${fm.probability === "High" ? "bg-destructive/10 text-destructive border-destructive/20" : fm.probability === "Medium" ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}`}>{fm.probability}</Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">Impact</p>
                      <Badge variant="outline" className={`text-[10px] mt-0.5 ${fm.impact === "Critical" ? "bg-destructive/10 text-destructive border-destructive/20" : fm.impact === "High" ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}`}>{fm.impact}</Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">Detection</p>
                      <Badge variant="secondary" className="text-[10px] mt-0.5">{fm.detection}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* TELEMETRY */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-info" />
                <CardTitle className="text-sm font-semibold">Telemetry to Monitor</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{telemetrySignals.length} signals</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {telemetrySignals.map((ts, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${ts.priority === "P1" ? "bg-destructive" : ts.priority === "P2" ? "bg-warning" : "bg-muted-foreground"}`} />
                      <div>
                        <p className="text-xs font-medium text-foreground">{ts.signal}</p>
                        <p className="text-[10px] text-muted-foreground">Every {ts.interval}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono shrink-0">{ts.threshold}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RUNBOOKS */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-success" />
                <CardTitle className="text-sm font-semibold">Generated Runbooks</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{runbooks.length} runbooks</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-3">
              {runbooks.map((rb, i) => (
                <div key={i} className="p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{rb.id}</span>
                    {rb.auto ? (
                      <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">Auto</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">Manual</Badge>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-foreground">{rb.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{rb.steps} steps · Trigger: {rb.trigger}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AGENT ROLES */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Agent Roles</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{agentRoles.length} agents</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {agentRoles.map((agent, i) => (
                <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-lg border bg-card">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <agent.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{agent.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{agent.role}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">Scope: {agent.scope}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ESCALATION LOGIC */}
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

          {/* APPROVAL BOUNDARIES */}
          <Card className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-destructive" />
                <CardTitle className="text-sm font-semibold">Approval Boundaries</CardTitle>
                <Badge variant="secondary" className="text-[10px] ml-auto">{approvalBoundaries.length} rules</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {approvalBoundaries.map((ab, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${ab.risk === "low" ? "bg-success" : ab.risk === "medium" ? "bg-warning" : ab.risk === "high" ? "bg-destructive" : "bg-destructive animate-pulse-subtle"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{ab.action}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] px-2 shrink-0 ${riskBg[ab.risk]}`}>{ab.risk}</Badge>
                  <span className="text-[11px] text-muted-foreground w-28 text-right shrink-0">{ab.approval}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Final CTA */}
          <div className="flex items-center justify-between pt-2 border-t">
            <p className="text-xs text-muted-foreground">Review and edit any section above, then deploy to start running AI support</p>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2"><Eye className="h-3.5 w-3.5" /> Preview Blueprint</Button>
              <Button className="gap-2" onClick={() => window.location.href = '/blueprint'}>
                Deploy Blueprint <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
