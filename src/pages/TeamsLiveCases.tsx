import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { customers, cases } from "@/data/mockData";
import {
  Bot, CheckCircle2, RotateCcw, ArrowUpRight, Shield,
  Brain, Activity, BookOpen, Zap, User, AlertTriangle,
  Pin, Smile, Paperclip, Send, AtSign, Clock,
  ChevronRight, FileText, TrendingDown, Settings,
} from "lucide-react";
import TeamsShell from "@/components/TeamsShell";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

// --- Rich thread for the featured case ---
const threadMessages = [
  {
    id: 1,
    type: "telemetry" as const,
    sender: "Support Studio · Telemetry",
    avatar: "telemetry",
    timestamp: "Today 09:14 AM",
    content: null,
    card: {
      title: "⚡ Telemetry-Triggered Case Created",
      subtitle: "CS-2041 · Acme Manufacturing · Helio CRM",
      body: "Product telemetry detected a **34% drop in CRM agent usage** across Acme Manufacturing's deployment over the past 72 hours. Feature utilization for `smart-routing` and `auto-escalation` declined from baseline. Automated investigation initiated.",
      metrics: [
        { label: "Usage Drop", value: "−34%", color: "text-destructive" },
        { label: "Affected Features", value: "3 of 12", color: "text-warning" },
        { label: "Detection", value: "Anomaly Model v2", color: "text-foreground" },
      ],
    },
  },
  {
    id: 2,
    type: "agent" as const,
    sender: "AI Support Summary",
    avatar: "orchestrator",
    timestamp: "Today 09:16 AM",
    content: null,
    card: {
      title: "🔍 Root Cause Analysis Complete",
      subtitle: "Confidence: 78% · 4 agents contributed",
      body: "**Summary:** Acme Manufacturing's IT team applied a configuration change on March 27 that modified routing rules for their APAC region. This change drifted from the validated baseline, causing `smart-routing` to fall back to manual mode and `auto-escalation` to deactivate for 40% of their user segments.\n\n**Impact:** 340 end-users affected. Average handle time increased 2.1x. Customer health score dropped from 82 → 64.\n\n**Root Cause:** Configuration drift in `routing_config.apac.v3` — 6 rule modifications detected, 4 conflict with blueprint defaults.",
      metrics: [
        { label: "Users Affected", value: "340", color: "text-destructive" },
        { label: "AHT Increase", value: "2.1×", color: "text-warning" },
        { label: "Health Score", value: "82 → 64", color: "text-destructive" },
      ],
    },
  },
  {
    id: 3,
    type: "customer-draft" as const,
    sender: "Support Studio · Draft",
    avatar: "draft",
    timestamp: "Today 09:18 AM",
    content: null,
    card: {
      title: "📝 Customer-Facing Update (Draft)",
      subtitle: "Ready for review before posting to #acme-manufacturing",
      body: "Hi Acme team,\n\nWe detected a configuration change in your APAC routing rules that's affecting smart-routing and auto-escalation for approximately 340 users. This is causing higher-than-normal handle times.\n\nOur team has identified the specific rule conflicts and prepared a remediation plan. We can either:\n\n1. **Roll back** the 4 conflicting rules to your validated baseline\n2. **Merge** your changes with baseline defaults (preserving your APAC customizations where safe)\n\nWe recommend Option 2. Would you like us to proceed, or would you prefer to review the specific changes first?\n\nBest,\nSupport Engineering",
      metrics: [],
    },
  },
  {
    id: 4,
    type: "approval" as const,
    sender: "Support Studio · Approval Request",
    avatar: "approval",
    timestamp: "Today 09:19 AM",
    content: null,
    card: {
      title: "⏳ Approval Required",
      subtitle: "Action: Apply configuration remediation",
      body: "**Proposed Action:** Merge Acme's APAC routing customizations with blueprint baseline defaults. This will restore `smart-routing` and `auto-escalation` while preserving 2 of their 6 custom rules that don't conflict.\n\n**Risk Level:** Medium — affects production routing for 340 users\n**Confidence:** 78% — below 80% auto-approval threshold\n**Runbook:** RB-118 (Configuration Drift Remediation)\n**Estimated Recovery:** ~25 minutes after approval",
      metrics: [
        { label: "Risk", value: "Medium", color: "text-warning" },
        { label: "Confidence", value: "78%", color: "text-warning" },
        { label: "Recovery ETA", value: "~25 min", color: "text-foreground" },
      ],
      actions: true,
    },
  },
  {
    id: 5,
    type: "resolution" as const,
    sender: "Resolution Agent",
    avatar: "resolution",
    timestamp: "Today 09:47 AM",
    content: null,
    card: {
      title: "✅ Resolution Applied",
      subtitle: "Approved by Sarah Chen · Applied at 09:32 AM",
      body: "Configuration remediation successfully applied to Acme Manufacturing's APAC deployment.\n\n**Changes Made:**\n• Restored `smart-routing` baseline rules (4 conflicts resolved)\n• Preserved 2 valid APAC customizations\n• Re-enabled `auto-escalation` for all user segments\n• Applied guardrail: future config changes will trigger validation check\n\n**Results (15 min post-fix):**\n• Agent usage recovering — up 18% from trough\n• Smart-routing active for 100% of segments\n• Auto-escalation re-enabled\n• Health score trending: 64 → 71 (recovering)",
      metrics: [
        { label: "Usage Recovery", value: "+18%", color: "text-success" },
        { label: "Routing", value: "100%", color: "text-success" },
        { label: "Health Score", value: "64 → 71", color: "text-success" },
      ],
    },
  },
];

// --- Agent details for right panel ---
const agentDetails = [
  {
    name: "Orchestrator Agent",
    icon: Brain,
    status: "complete",
    confidence: 92,
    checked: "Triaged incoming telemetry alert, classified case type, assigned agent sequence",
    evidence: "Usage anomaly classified as Configuration Drift (Pattern CDR-03). Dispatched 4 specialist agents.",
  },
  {
    name: "Telemetry Agent",
    icon: Activity,
    status: "complete",
    confidence: 88,
    checked: "Pulled 72-hour usage metrics, feature utilization baselines, and anomaly detection signals",
    evidence: "smart-routing usage ↓42%, auto-escalation ↓38%, manual-mode fallback ↑310%. Anomaly score: 0.91.",
  },
  {
    name: "Customer Context Agent",
    icon: User,
    status: "complete",
    confidence: 95,
    checked: "Retrieved deployment config, recent change log, SLA terms, and customer history",
    evidence: "Config change on Mar 27 by admin@acme.com — 6 routing rule modifications in APAC region. No prior incidents.",
  },
  {
    name: "Knowledge Agent",
    icon: BookOpen,
    status: "complete",
    confidence: 85,
    checked: "Searched runbooks, past incidents, and product documentation for configuration drift patterns",
    evidence: "Matched RB-118 (Config Drift Remediation). Similar incident at 2 other customers — 89% success rate with merge approach.",
  },
  {
    name: "Resolution Agent",
    icon: Zap,
    status: "approved",
    confidence: 78,
    checked: "Generated remediation plan, validated against blueprint, prepared rollback option",
    evidence: "Merge approach preserves 2/6 custom rules. Rollback option available as fallback. Estimated recovery: 25 min.",
  },
];

const statusStyle: Record<string, { label: string; className: string }> = {
  complete: { label: "Complete", className: "bg-success/10 text-success" },
  "in-progress": { label: "Running", className: "bg-primary/10 text-primary" },
  approved: { label: "Approved", className: "bg-success/10 text-success" },
  waiting: { label: "Awaiting", className: "bg-warning/10 text-warning" },
};

const avatarStyles: Record<string, string> = {
  telemetry: "bg-info/15 text-info",
  orchestrator: "bg-primary/15 text-primary",
  draft: "bg-warning/15 text-warning",
  approval: "bg-warning/15 text-warning",
  resolution: "bg-success/15 text-success",
};

const avatarIcons: Record<string, React.ReactNode> = {
  telemetry: <Activity className="h-4 w-4" />,
  orchestrator: <Brain className="h-4 w-4" />,
  draft: <FileText className="h-4 w-4" />,
  approval: <Clock className="h-4 w-4" />,
  resolution: <CheckCircle2 className="h-4 w-4" />,
};

export default function TeamsLiveCases() {
  const [selectedCustomer, setSelectedCustomer] = useState("cust-1");
  const [selectedCase, setSelectedCase] = useState("CS-2041");

  const customerCases = cases.filter(c => c.customerId === selectedCustomer && c.status !== "resolved");

  // Add our featured case to the list
  const featuredCase = {
    id: "CS-2041",
    customerId: "cust-1",
    title: "CRM Agent usage dropped after customer-specific configuration drift",
    status: "in-progress" as const,
    priority: "high" as const,
    trigger: "telemetry" as const,
    category: "Configuration",
    createdAt: "2025-03-30T09:14:00Z",
    updatedAt: "2025-03-30T09:47:00Z",
    confidence: 78,
    assignedAgent: "Resolution Agent",
    summary: "Usage drop detected across smart-routing and auto-escalation features.",
  };

  const allCases = [featuredCase, ...customerCases.filter(c => c.id !== "CS-2041")];

  return (
    <TeamsShell
      section="Live Cases"
      tabs={[
        { label: "Cases", active: true },
        { label: "Resolved" },
        { label: "Analytics" },
      ]}
    >
      <div className="flex flex-1 overflow-hidden bg-background">
        {/* LEFT: Customer spaces + case list */}
        <div className="w-64 shrink-0 border-r bg-card flex flex-col overflow-hidden">
          <div className="p-3 border-b">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Customer Channels</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1.5 space-y-0.5 border-b">
              {customers.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCustomer(c.id); }}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center gap-2 ${selectedCustomer === c.id ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-accent"}`}
                >
                  <span className="text-muted-foreground">#</span>
                  <span className="flex-1 truncate">{c.name.toLowerCase().replace(/\s+/g, '-')}</span>
                  {c.openCases > 0 && (
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{c.openCases}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-3 border-b">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Active Cases</p>
            </div>
            <div className="p-1.5 space-y-0.5">
              {allCases.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCase(c.id)}
                  className={`w-full text-left px-3 py-2.5 rounded transition-colors ${selectedCase === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                    <Badge variant="outline" className={`text-[9px] px-1 py-0 ${riskColor[c.priority]}`}>{c.priority}</Badge>
                  </div>
                  <p className="text-[11px] font-medium text-foreground leading-tight line-clamp-2">{c.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{c.category} · {c.trigger}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* CENTER: Teams-style thread */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Thread header */}
          <div className="h-12 px-4 border-b bg-card flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground font-medium text-sm">#</span>
              <h2 className="text-sm font-semibold text-foreground truncate">CS-2041: CRM Agent usage dropped after configuration drift</h2>
              <Badge variant="outline" className={`text-[10px] shrink-0 ${riskColor.high}`}>high</Badge>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]"><Pin className="h-3 w-3 mr-1" /> Pin</Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">⋯</Button>
            </div>
          </div>

          {/* Thread body */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              {/* Context banner */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border border-border mb-3">
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">
                  <span className="font-medium text-foreground">Acme Manufacturing</span> · Helio CRM · APAC Region · 340 users affected
                </span>
              </div>

              {threadMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`group flex gap-3 py-3 px-3 -mx-1 rounded-lg transition-colors ${
                    msg.type === "approval" ? "bg-warning/5 border border-warning/15 mx-0 my-2" :
                    msg.type === "resolution" ? "bg-success/5 border border-success/15 mx-0 my-2" :
                    "hover:bg-accent/50"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${avatarStyles[msg.avatar]}`}>
                    {avatarIcons[msg.avatar]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-foreground">{msg.sender}</span>
                      <span className="text-[11px] text-muted-foreground">{msg.timestamp}</span>
                      {msg.type === "telemetry" && <Badge variant="secondary" className="text-[9px] py-0">AUTO-DETECTED</Badge>}
                      {msg.type === "agent" && <Badge variant="secondary" className="text-[9px] py-0">AI SUMMARY</Badge>}
                      {msg.type === "customer-draft" && <Badge variant="outline" className="text-[9px] py-0 border-warning/30 text-warning">DRAFT</Badge>}
                      {msg.type === "approval" && <Badge variant="outline" className="text-[9px] py-0 border-warning/30 text-warning">NEEDS APPROVAL</Badge>}
                      {msg.type === "resolution" && <Badge variant="outline" className="text-[9px] py-0 border-success/30 text-success">RESOLVED</Badge>}
                    </div>

                    {msg.card && (
                      <div className="border rounded-lg bg-card overflow-hidden">
                        <div className="px-4 py-3 border-b bg-muted/30">
                          <p className="text-[13px] font-semibold text-foreground">{msg.card.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{msg.card.subtitle}</p>
                        </div>
                        <div className="px-4 py-3">
                          <div className="text-[12px] text-foreground/85 leading-relaxed whitespace-pre-line">
                            {msg.card.body.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                              part.startsWith("**") && part.endsWith("**")
                                ? <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
                                : <span key={i}>{part}</span>
                            )}
                          </div>
                          {msg.card.metrics && msg.card.metrics.length > 0 && (
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                              {msg.card.metrics.map((m, i) => (
                                <div key={i} className="text-center">
                                  <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {msg.card.actions && (
                          <div className="px-4 py-3 border-t bg-muted/20 flex items-center gap-2">
                            <Button size="sm" className="h-8 text-xs gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Approve & Apply</Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Retry Analysis</Button>
                            <div className="flex-1" />
                            <span className="text-[10px] text-muted-foreground">Awaiting human decision</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Compose */}
          <div className="px-4 pb-4 shrink-0">
            <div className="border rounded-lg bg-card">
              <div className="flex items-center gap-1 px-3 py-2 border-b">
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><span className="font-bold text-xs">B</span></button>
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><span className="italic text-xs">I</span></button>
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><span className="underline text-xs">U</span></button>
                <div className="w-px h-4 bg-border mx-1" />
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><AtSign className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><Paperclip className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><Smile className="h-3.5 w-3.5" /></button>
              </div>
              <div className="p-3">
                <p className="text-sm text-muted-foreground/50">Type a message, @mention a support agent, or add a note...</p>
              </div>
              <div className="flex items-center justify-between px-3 pb-2">
                <div />
                <Button size="sm" className="h-7 px-3 text-xs gap-1.5"><Send className="h-3 w-3" /> Send</Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Orchestration & Context Panel */}
        <div className="w-80 shrink-0 bg-card border-l flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            {/* Panel header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary/15 flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">AI Orchestration Panel</p>
                  <p className="text-[10px] text-muted-foreground">Control layer behind this conversation</p>
                </div>
              </div>
            </div>

            {/* Agent cards */}
            <div className="p-4 space-y-3">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Agent Activity</p>
              {agentDetails.map((agent, i) => {
                const ss = statusStyle[agent.status];
                return (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <div className="px-3 py-2.5 flex items-center gap-2.5 bg-muted/30">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                        agent.name.includes("Orchestrator") ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        <agent.icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-foreground">{agent.name}</p>
                      </div>
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${ss.className}`}>{ss.label}</Badge>
                    </div>
                    <div className="px-3 py-2.5 space-y-2">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Checked</p>
                        <p className="text-[11px] text-foreground/80 leading-relaxed">{agent.checked}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Evidence</p>
                        <p className="text-[11px] text-foreground/80 leading-relaxed">{agent.evidence}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-1">
                          <Progress value={agent.confidence} className="h-1.5" />
                        </div>
                        <span className={`text-[10px] font-medium ${agent.confidence >= 80 ? "text-success" : "text-warning"}`}>
                          {agent.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Runbook */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Runbook Applied</p>
              <Card className="border">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    <p className="text-xs font-semibold text-foreground">RB-118: Configuration Drift Remediation</p>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Steps</span>
                      <span className="text-foreground">5 of 5 complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last used</span>
                      <span className="text-foreground">2025-02-18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success rate</span>
                      <span className="text-success">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action taken */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Action Taken</p>
              <div className="border rounded-lg p-3 bg-success/5 border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <p className="text-xs font-semibold text-foreground">Config Merge Applied</p>
                </div>
                <p className="text-[11px] text-foreground/80 leading-relaxed">
                  Merged APAC routing customizations with blueprint baseline. 4 conflicting rules restored, 2 valid customizations preserved. Guardrail applied for future changes.
                </p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                  <span>Approved by Sarah Chen</span>
                  <span>·</span>
                  <span>09:32 AM</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Controls</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2">
                  <RotateCcw className="h-3.5 w-3.5" /> Re-run Analysis
                </Button>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2">
                  <ArrowUpRight className="h-3.5 w-3.5" /> Escalate to Engineering
                </Button>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2 text-destructive hover:text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" /> Rollback Action
                </Button>
              </div>
            </div>

            {/* Escalation status */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Escalation Status</p>
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <p className="text-xs font-medium text-foreground">No escalation needed</p>
                </div>
                <p className="text-[11px] text-muted-foreground">Case resolved within SLA. Customer notified via Teams channel. Monitoring usage recovery over next 48 hours.</p>
              </div>
            </div>

            {/* Overall confidence */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Overall Confidence</span>
                <span className="text-lg font-bold text-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2 mb-1.5" />
              <p className="text-[10px] text-warning">Below 80% auto-approval threshold — required human approval</p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </TeamsShell>
  );
}
