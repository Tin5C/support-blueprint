import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customers, cases, caseThread, sampleOrchestration } from "@/data/mockData";
import {
  Bot, CheckCircle2, RotateCcw, ArrowUpRight, Shield,
  Brain, Activity, BookOpen, Zap, User,
  Pin, Smile, Paperclip, Send, AtSign,
} from "lucide-react";
import TeamsShell from "@/components/TeamsShell";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const agentIcon: Record<string, React.ReactNode> = {
  "Orchestrator": <Brain className="h-4 w-4" />,
  "Telemetry Agent": <Activity className="h-4 w-4" />,
  "Knowledge Agent": <BookOpen className="h-4 w-4" />,
  "Customer Context Agent": <User className="h-4 w-4" />,
  "Resolution Agent": <Zap className="h-4 w-4" />,
};

export default function TeamsLiveCases() {
  const [selectedCustomer, setSelectedCustomer] = useState("cust-1");
  const [selectedCase, setSelectedCase] = useState("CS-1001");

  const customerCases = cases.filter(c => c.customerId === selectedCustomer && c.status !== "resolved");
  const activeCase = cases.find(c => c.id === selectedCase)!;

  return (
    <TeamsShell
      section="Live Cases"
      tabs={[
        { label: "Cases", active: true },
        { label: "Resolved" },
        { label: "Analytics" },
      ]}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Left: channel list */}
        <div className="w-60 shrink-0 border-r bg-card flex flex-col overflow-hidden">
          <div className="p-3 border-b">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Customer Channels</p>
          </div>
          <div className="p-1.5 space-y-0.5 border-b overflow-y-auto">
            {customers.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCustomer(c.id); const first = cases.find(cs => cs.customerId === c.id && cs.status !== "resolved"); if (first) setSelectedCase(first.id); }}
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
          <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            {customerCases.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c.id)}
                className={`w-full text-left px-3 py-2.5 rounded transition-colors ${selectedCase === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{c.id}</span>
                  <Badge variant="outline" className={`text-[9px] px-1 py-0 ${riskColor[c.priority]}`}>{c.priority}</Badge>
                </div>
                <p className="text-[11px] font-medium text-foreground leading-tight">{c.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Center: thread */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-12 px-4 border-b bg-card flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium text-sm">#</span>
              <h2 className="text-sm font-semibold text-foreground">{activeCase.id}: {activeCase.title}</h2>
              <Badge variant="outline" className={`text-[10px] ${riskColor[activeCase.priority]}`}>{activeCase.priority}</Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]"><Pin className="h-3 w-3 mr-1" /> Pin</Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">⋯</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {caseThread.map(msg => (
              <div key={msg.id} className={`group flex gap-3 py-2 px-2 -mx-2 rounded-md hover:bg-accent/50 transition-colors ${msg.type === "summary" ? "bg-primary/5 border border-primary/10 mx-0 px-4 py-3 my-2" : ""}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  msg.type === "summary" ? "bg-primary text-primary-foreground" :
                  msg.sender === "Orchestrator Agent" ? "bg-primary/15 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-foreground">{msg.sender}</span>
                    <span className="text-[11px] text-muted-foreground">{msg.timestamp}</span>
                    {msg.type !== "summary" && <Badge variant="secondary" className="text-[9px] py-0">APP</Badge>}
                  </div>
                  <div className="text-[13px] text-foreground/85 leading-relaxed whitespace-pre-line">{msg.content}</div>
                  {msg.type === "summary" && (
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" className="h-7 text-xs gap-1.5"><CheckCircle2 className="h-3 w-3" /> Approve</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5"><ArrowUpRight className="h-3 w-3" /> Escalate</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5"><RotateCcw className="h-3 w-3" /> Retry</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Compose */}
          <div className="px-4 pb-4">
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

        {/* Right: orchestration panel */}
        <div className="w-72 shrink-0 bg-card border-l overflow-y-auto">
          <div className="p-4 border-b">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Orchestration</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Support agent collaboration timeline</p>
          </div>

          <div className="p-4 space-y-3">
            {sampleOrchestration.map((step, i) => (
              <div key={i} className="relative">
                {i < sampleOrchestration.length - 1 && <div className="absolute left-[13px] top-8 bottom-0 w-px bg-border" />}
                <div className="flex gap-3">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 z-10 ${step.agent === "Orchestrator" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {agentIcon[step.agent] || <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-foreground">{step.agent}</span>
                      <span className="text-[10px] text-muted-foreground">{step.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{step.action}</p>
                    <div className="mt-1.5 p-2 rounded border bg-background">
                      <p className="text-[11px] text-foreground">{step.result}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${step.confidence >= 80 ? "bg-success" : step.confidence >= 60 ? "bg-warning" : "bg-destructive"}`} />
                      <span className="text-[10px] text-muted-foreground">{step.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Runbook Applied</p>
            <Card className="border">
              <CardContent className="p-3">
                <p className="text-xs font-semibold text-foreground">RB-042: Batch Ingestion Memory Pressure</p>
                <p className="text-[11px] text-muted-foreground mt-1">3 steps · Last used: 2024-12-14 · Success rate: 89%</p>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 border-t">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Product Telemetry</p>
            <div className="space-y-2">
              {[
                { label: "Memory", value: "94%", color: "text-destructive" },
                { label: "CPU", value: "78%", color: "text-warning" },
                { label: "Throughput", value: "↓ 80%", color: "text-destructive" },
                { label: "Pattern match", value: "INC-847 (Dec 2024)", color: "text-foreground" },
              ].map((e, i) => (
                <div key={i} className="p-2 rounded border bg-background text-[11px]">
                  <span className="text-muted-foreground">{e.label}: </span>
                  <span className={`font-medium ${e.color}`}>{e.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Shield className="h-3.5 w-3.5" />
              <span>Overall Confidence</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{activeCase.confidence}%</p>
            <p className="text-[10px] text-warning mt-1">Below 80% auto-approval threshold</p>
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
