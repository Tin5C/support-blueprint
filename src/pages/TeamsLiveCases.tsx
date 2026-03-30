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
  ChevronRight, FileText, Settings,
} from "lucide-react";
import TeamsShell from "@/components/TeamsShell";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const threadMessages = [
  {
    id: 1, type: "telemetry" as const, sender: "Telemetry Agent", avatar: "telemetry", timestamp: "Today 09:14 AM",
    card: {
      title: "Telemetry-Triggered Case Created",
      subtitle: "CS-2041 · Acme Manufacturing · Helio CRM",
      body: "Product telemetry detected a **34% drop in CRM agent usage** across Acme Manufacturing's deployment over the past 72 hours. Feature utilization for `smart-routing` and `auto-escalation` declined from baseline. Automated investigation initiated.",
      metrics: [
        { label: "Usage Drop", value: "−34%", color: "text-destructive" },
        { label: "Affected Features", value: "3 of 12", color: "text-warning" },
        { label: "Detection", value: "Anomaly Model", color: "text-foreground" },
      ],
    },
  },
  {
    id: 2, type: "agent" as const, sender: "AI Support Summary", avatar: "orchestrator", timestamp: "Today 09:16 AM",
    card: {
      title: "Root Cause Analysis Complete",
      subtitle: "Confidence: 78% · Evidence from 4 sources",
      body: "**Summary:** Acme Manufacturing's IT team applied a configuration change on March 27 that modified routing rules for their APAC region. This change drifted from the validated baseline, causing `smart-routing` to fall back to manual mode.\n\n**Impact:** 340 end-users affected. Average handle time increased 2.1x. Customer health score dropped from 82 → 64.\n\n**Root Cause:** Configuration drift in `routing_config.apac.v3` — 4 of 6 rule modifications conflict with blueprint defaults.",
      metrics: [
        { label: "Users Affected", value: "340", color: "text-destructive" },
        { label: "AHT Increase", value: "2.1×", color: "text-warning" },
        { label: "Health Score", value: "82 → 64", color: "text-destructive" },
      ],
    },
  },
  {
    id: 3, type: "customer-draft" as const, sender: "Draft — Customer Update", avatar: "draft", timestamp: "Today 09:18 AM",
    card: {
      title: "Customer-Facing Update (Ready for Review)",
      subtitle: "Will be posted to #acme-manufacturing after approval",
      body: "Hi Acme team,\n\nWe detected a configuration change in your APAC routing rules that's affecting smart-routing and auto-escalation for approximately 340 users.\n\nWe recommend merging your changes with baseline defaults (preserving your APAC customizations where safe). Would you like us to proceed?",
      metrics: [],
    },
  },
  {
    id: 4, type: "approval" as const, sender: "Governance Check — Approval Required", avatar: "approval", timestamp: "Today 09:19 AM",
    card: {
      title: "Approval Required — Configuration Remediation",
      subtitle: "Action cannot proceed without human review",
      body: "**Proposed Action:** Merge Acme's APAC routing customizations with blueprint baseline defaults. Restores `smart-routing` and `auto-escalation` while preserving 2 valid custom rules.\n\n**Why approval is needed:**\n• Risk Level: Medium — affects production routing for 340 users\n• Confidence: 78% — below 80% auto-approval threshold\n• Policy: Configuration changes affecting >100 users require human approval\n\n**Runbook:** RB-118 (Configuration Drift Remediation)\n**Estimated Recovery:** ~25 minutes after approval",
      metrics: [
        { label: "Risk", value: "Medium", color: "text-warning" },
        { label: "Confidence", value: "78%", color: "text-warning" },
        { label: "Recovery ETA", value: "~25 min", color: "text-foreground" },
      ],
      actions: true,
    },
  },
  {
    id: 5, type: "resolution" as const, sender: "Resolution Applied", avatar: "resolution", timestamp: "Today 09:47 AM",
    card: {
      title: "Resolution Complete",
      subtitle: "Approved by Sarah Chen · Applied at 09:32 AM",
      body: "Configuration remediation successfully applied.\n\n**Changes Made:**\n• Restored `smart-routing` baseline rules (4 conflicts resolved)\n• Preserved 2 valid APAC customizations\n• Applied guardrail: future config changes will trigger validation check\n\n**Results (15 min post-fix):**\n• Agent usage recovering — up 18% from trough\n• Smart-routing active for 100% of segments\n• Health score trending: 64 → 71 (recovering)",
      metrics: [
        { label: "Usage Recovery", value: "+18%", color: "text-success" },
        { label: "Routing", value: "100%", color: "text-success" },
        { label: "Health Score", value: "64 → 71", color: "text-success" },
      ],
    },
  },
];

const agentDetails = [
  { name: "Orchestrator", icon: Brain, status: "complete", confidence: 92, checked: "Triaged alert, classified case type, assigned investigation sequence", evidence: "Usage anomaly classified as Configuration Drift. Dispatched specialist agents." },
  { name: "Telemetry Agent", icon: Activity, status: "complete", confidence: 88, checked: "72-hour usage metrics, feature baselines, anomaly detection", evidence: "smart-routing ↓42%, auto-escalation ↓38%, manual-mode fallback ↑310%." },
  { name: "Customer Context", icon: User, status: "complete", confidence: 95, checked: "Deployment config, change log, SLA terms, customer history", evidence: "Config change Mar 27 by admin@acme.com — 6 routing rule modifications." },
  { name: "Knowledge Agent", icon: BookOpen, status: "complete", confidence: 85, checked: "Runbooks, past incidents, documentation", evidence: "Matched RB-118. Similar incident at 2 other customers — 89% success rate." },
  { name: "Resolution Agent", icon: Zap, status: "approved", confidence: 78, checked: "Remediation plan, blueprint validation, rollback option", evidence: "Merge approach preserves 2/6 custom rules. Estimated recovery: 25 min." },
];

const statusStyle: Record<string, { label: string; className: string }> = {
  complete: { label: "Done", className: "bg-success/10 text-success" },
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
  approval: <Shield className="h-4 w-4" />,
  resolution: <CheckCircle2 className="h-4 w-4" />,
};

export default function TeamsLiveCases() {
  const [selectedCustomer, setSelectedCustomer] = useState("cust-1");
  const [selectedCase, setSelectedCase] = useState("CS-2041");

  const customerCases = cases.filter(c => c.customerId === selectedCustomer && c.status !== "resolved");

  const featuredCase = {
    id: "CS-2041", customerId: "cust-1",
    title: "CRM Agent usage dropped after customer-specific configuration drift",
    status: "in-progress" as const, priority: "high" as const, trigger: "telemetry" as const,
    category: "Configuration", createdAt: "2025-03-30T09:14:00Z", updatedAt: "2025-03-30T09:47:00Z",
    confidence: 78, assignedAgent: "Resolution Agent",
    summary: "Usage drop detected across smart-routing and auto-escalation features.",
  };

  const allCases = [featuredCase, ...customerCases.filter(c => c.id !== "CS-2041")];

  return (
    <TeamsShell section="Live Cases" tabs={[{ label: "Cases", active: true }, { label: "Resolved" }, { label: "Analytics" }]}>
      <div className="flex flex-1 overflow-hidden bg-background">
        {/* LEFT */}
        <div className="w-64 shrink-0 border-r bg-card flex flex-col overflow-hidden">
          <div className="p-3 border-b">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Customer Channels</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1.5 space-y-0.5 border-b">
              {customers.map(c => (
                <button key={c.id} onClick={() => setSelectedCustomer(c.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center gap-2 ${selectedCustomer === c.id ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-accent"}`}>
                  <span className="text-muted-foreground">#</span>
                  <span className="flex-1 truncate">{c.name.toLowerCase().replace(/\s+/g, '-')}</span>
                  {c.openCases > 0 && <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{c.openCases}</span>}
                </button>
              ))}
            </div>
            <div className="p-3 border-b">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Active Cases</p>
            </div>
            <div className="p-1.5 space-y-0.5">
              {allCases.map(c => (
                <button key={c.id} onClick={() => setSelectedCase(c.id)}
                  className={`w-full text-left px-3 py-2.5 rounded transition-colors ${selectedCase === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}>
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

        {/* CENTER: Thread */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="h-12 px-4 border-b bg-card flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-muted-foreground font-medium text-sm">#</span>
              <h2 className="text-sm font-semibold text-foreground truncate">CS-2041: CRM Agent usage dropped after configuration drift</h2>
              <Badge variant="outline" className={`text-[10px] shrink-0 ${riskColor.high}`}>high</Badge>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]"><Pin className="h-3 w-3 mr-1" /> Pin</Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border border-border mb-3">
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">
                  <span className="font-medium text-foreground">Acme Manufacturing</span> · Helio CRM · APAC Region · 340 users affected
                </span>
              </div>

              {threadMessages.map(msg => (
                <div key={msg.id} className={`group flex gap-3 py-3 px-3 -mx-1 rounded-lg transition-colors ${
                  msg.type === "approval" ? "bg-warning/5 border border-warning/15 mx-0 my-2" :
                  msg.type === "resolution" ? "bg-success/5 border border-success/15 mx-0 my-2" :
                  "hover:bg-accent/50"
                }`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${avatarStyles[msg.avatar]}`}>
                    {avatarIcons[msg.avatar]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-foreground">{msg.sender}</span>
                      <span className="text-[11px] text-muted-foreground">{msg.timestamp}</span>
                      {msg.type === "telemetry" && <Badge variant="secondary" className="text-[9px] py-0">AUTO-DETECTED</Badge>}
                      {msg.type === "agent" && <Badge variant="secondary" className="text-[9px] py-0">AI ANALYSIS</Badge>}
                      {msg.type === "customer-draft" && <Badge variant="outline" className="text-[9px] py-0 border-warning/30 text-warning">DRAFT</Badge>}
                      {msg.type === "approval" && <Badge variant="outline" className="text-[9px] py-0 border-warning/30 text-warning">APPROVAL REQUIRED</Badge>}
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
                            <Button size="sm" className="h-8 text-xs gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Approve</Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Re-analyze</Button>
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

          <div className="px-4 pb-4 shrink-0">
            <div className="border rounded-lg bg-card">
              <div className="flex items-center gap-1 px-3 py-2 border-b">
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><span className="font-bold text-xs">B</span></button>
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><span className="italic text-xs">I</span></button>
                <div className="w-px h-4 bg-border mx-1" />
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><AtSign className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-accent"><Paperclip className="h-3.5 w-3.5" /></button>
              </div>
              <div className="p-3">
                <p className="text-sm text-muted-foreground/50">Type a message or add a note...</p>
              </div>
              <div className="flex items-center justify-between px-3 pb-2">
                <div />
                <Button size="sm" className="h-7 px-3 text-xs gap-1.5"><Send className="h-3 w-3" /> Send</Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Evidence & Governance Panel */}
        <div className="w-80 shrink-0 bg-card border-l flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary/15 flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Evidence & Governance</p>
                  <p className="text-[10px] text-muted-foreground">Policy checks, evidence, and approval state</p>
                </div>
              </div>
            </div>

            {/* Overall confidence */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Overall Confidence</span>
                <span className="text-lg font-bold text-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2 mb-1.5" />
              <p className="text-[10px] text-warning">Below 80% auto-approval threshold — human approval required</p>
            </div>

            {/* Agent evidence */}
            <div className="p-4 space-y-2.5">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Evidence Trail</p>
              {agentDetails.map((agent, i) => {
                const ss = statusStyle[agent.status] || statusStyle.complete;
                return (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <div className="px-3 py-2 flex items-center gap-2.5 bg-muted/30">
                      <agent.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-[11px] font-semibold text-foreground flex-1">{agent.name}</p>
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${ss.className}`}>{ss.label}</Badge>
                    </div>
                    <div className="px-3 py-2 space-y-1.5">
                      <p className="text-[10px] text-muted-foreground">{agent.checked}</p>
                      <p className="text-[11px] text-foreground/80">{agent.evidence}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={agent.confidence} className="h-1 flex-1" />
                        <span className={`text-[10px] font-medium ${agent.confidence >= 80 ? "text-success" : "text-warning"}`}>{agent.confidence}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Runbook */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Runbook Applied</p>
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <p className="text-xs font-semibold text-foreground">RB-118: Config Drift Remediation</p>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between"><span className="text-muted-foreground">Steps</span><span className="text-foreground">5 of 5 complete</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Success rate</span><span className="text-success">89%</span></div>
                </div>
              </div>
            </div>

            {/* Resolution */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Action Taken</p>
              <div className="border rounded-lg p-3 bg-success/5 border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <p className="text-xs font-semibold text-foreground">Config Merge Applied</p>
                </div>
                <p className="text-[11px] text-foreground/80 leading-relaxed">
                  Merged APAC routing customizations with blueprint baseline. 4 conflicts resolved, 2 customizations preserved. Guardrail applied.
                </p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                  <span>Approved by Sarah Chen · 09:32 AM</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Controls</p>
              <div className="space-y-1.5">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2"><RotateCcw className="h-3.5 w-3.5" /> Re-run Analysis</Button>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2 text-destructive hover:text-destructive"><AlertTriangle className="h-3.5 w-3.5" /> Rollback</Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </TeamsShell>
  );
}
