import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customers, cases, caseThread, sampleOrchestration } from "@/data/mockData";
import { Bot, User, CheckCircle2, AlertTriangle, RotateCcw, ArrowUpRight, Shield, Brain, Activity, BookOpen, Zap } from "lucide-react";

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

export default function CaseWorkspace() {
  const [selectedCustomer, setSelectedCustomer] = useState("cust-1");
  const [selectedCase, setSelectedCase] = useState("CS-1001");

  const customerCases = cases.filter(c => c.customerId === selectedCustomer && c.status !== "resolved");
  const activeCase = cases.find(c => c.id === selectedCase)!;

  return (
    <div className="flex h-full">
      {/* Left column: customer + case list */}
      <div className="w-64 shrink-0 border-r bg-card flex flex-col overflow-hidden">
        <div className="p-3 border-b">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customers</p>
        </div>
        <div className="p-1.5 space-y-0.5 border-b">
          {customers.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedCustomer(c.id); const first = cases.find(cs => cs.customerId === c.id && cs.status !== "resolved"); if (first) setSelectedCase(first.id); }}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${selectedCustomer === c.id ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-accent"}`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{c.name}</span>
                {c.openCases > 0 && <span className="text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded-full">{c.openCases}</span>}
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 border-b">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cases</p>
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

      {/* Center: Thread */}
      <div className="flex-1 flex flex-col overflow-hidden border-r">
        {/* Case header */}
        <div className="p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`text-[10px] ${riskColor[activeCase.priority]}`}>{activeCase.priority}</Badge>
            <h2 className="text-sm font-semibold text-foreground">{activeCase.title}</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">{activeCase.summary}</p>
        </div>

        {/* Thread messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {caseThread.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === "summary" ? "bg-primary/5 p-4 rounded-lg border border-primary/10 -mx-1" : ""}`}>
              <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${msg.type === "system" ? "bg-primary/10 text-primary" : msg.type === "summary" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">{msg.sender}</span>
                  <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                </div>
                <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action bar */}
        <div className="p-4 border-t bg-card flex items-center gap-3">
          <Button size="sm" className="gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Approve Action</Button>
          <Button size="sm" variant="outline" className="gap-2"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
          <Button size="sm" variant="outline" className="gap-2"><RotateCcw className="h-3.5 w-3.5" /> Retry</Button>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Confidence: <span className="font-semibold text-foreground">{activeCase.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Right: AI orchestration panel */}
      <div className="w-80 shrink-0 bg-card overflow-y-auto">
        <div className="p-4 border-b">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Orchestration</p>
        </div>

        <div className="p-4 space-y-3">
          {sampleOrchestration.map((step, i) => (
            <div key={i} className="relative">
              {i < sampleOrchestration.length - 1 && (
                <div className="absolute left-[13px] top-8 bottom-0 w-px bg-border" />
              )}
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

        {/* Runbook used */}
        <div className="p-4 border-t">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Runbook Applied</p>
          <Card className="border">
            <CardContent className="p-3">
              <p className="text-xs font-semibold text-foreground">RB-042: Batch Ingestion Memory Pressure</p>
              <p className="text-[11px] text-muted-foreground mt-1">3 steps · Last used: 2024-12-14 · Success rate: 89%</p>
            </CardContent>
          </Card>
        </div>

        {/* Evidence */}
        <div className="p-4 border-t">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Evidence</p>
          <div className="space-y-2">
            <div className="p-2 rounded border bg-background text-[11px]">
              <span className="text-muted-foreground">Memory: </span><span className="text-destructive font-medium">94%</span>
            </div>
            <div className="p-2 rounded border bg-background text-[11px]">
              <span className="text-muted-foreground">CPU: </span><span className="text-warning font-medium">78%</span>
            </div>
            <div className="p-2 rounded border bg-background text-[11px]">
              <span className="text-muted-foreground">Throughput: </span><span className="text-destructive font-medium">↓ 80%</span>
            </div>
            <div className="p-2 rounded border bg-background text-[11px]">
              <span className="text-muted-foreground">Pattern match: </span><span className="text-foreground font-medium">INC-847 (Dec 2024)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
