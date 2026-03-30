import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cases, customers } from "@/data/mockData";
import { CheckCircle2, X, ArrowUpRight, Clock, Shield, Zap, Video, Phone, Search, MoreHorizontal, Bot } from "lucide-react";

const teamsBg = "hsl(264 60% 22%)";
const teamsAccent = "hsl(264 60% 50%)";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const pendingApprovals = [
  { caseId: "CS-1001", customer: "Meridian Financial", action: "Scale worker nodes 24 → 32 and reduce batch size", confidence: 67, risk: "medium" as const, agent: "Resolution Agent", elapsed: "28 min", runbook: "RB-042" },
  { caseId: "CS-1009", customer: "Sterling Logistics", action: "Initiate regional failover from US-East to US-West", confidence: 52, risk: "critical" as const, agent: "Resolution Agent", elapsed: "6 hr 45 min", runbook: "RB-044" },
  { caseId: "CS-1012", customer: "Sterling Logistics", action: "Roll back schema migration from v4.2 to v4.1", confidence: 71, risk: "high" as const, agent: "Resolution Agent", elapsed: "12 hr", runbook: "RB-046" },
  { caseId: "CS-1007", customer: "NovaTech Industries", action: "Force plugin recompilation against FlowEngine 3.1.4 API", confidence: 38, risk: "medium" as const, agent: "Knowledge Agent", elapsed: "3 hr 10 min", runbook: "RB-047" },
];

export default function TeamsApprovals() {
  return (
    <div className="flex flex-col h-full">
      {/* Teams chrome */}
      <div className="h-10 shrink-0 flex items-center justify-between px-4" style={{ background: teamsBg }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded flex items-center justify-center" style={{ background: teamsAccent }}>
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-white/90">Support Studio</span>
          </div>
          <span className="text-white/30">|</span>
          <span className="text-[12px] text-white/60">Approvals</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Video className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Phone className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Search className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><MoreHorizontal className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[900px] mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">Pending Approvals</h1>
              <Badge className="bg-warning/10 text-warning border border-warning/20 text-xs">{pendingApprovals.length} pending</Badge>
            </div>
            <p className="text-sm text-muted-foreground">AI agent actions requiring human approval before execution</p>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((a, i) => (
              <Card key={i} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-5 w-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{a.caseId}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs font-medium text-foreground">{a.customer}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[a.risk]}`}>{a.risk}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-2">{a.action}</p>
                      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Bot className="h-3 w-3" /> {a.agent}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Waiting {a.elapsed}</span>
                        <span>Runbook: {a.runbook}</span>
                        <span>Confidence: <span className={`font-semibold ${a.confidence >= 70 ? "text-foreground" : "text-warning"}`}>{a.confidence}%</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button size="sm" className="gap-1.5 h-8"><CheckCircle2 className="h-3.5 w-3.5" /> Approve</Button>
                      <Button size="sm" variant="outline" className="gap-1.5 h-8"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
                      <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-destructive"><X className="h-3.5 w-3.5" /> Reject</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recently approved */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Recently Approved</h2>
            <div className="space-y-2">
              {[
                { case: "CS-1005", customer: "Apex Healthcare", action: "Whitelist backup traffic pattern in anomaly detection", by: "Jane Doe", time: "2 hr ago" },
                { case: "CS-1003", customer: "Meridian Financial", action: "Update validation rules for schema v4.2 transforms", by: "Jane Doe", time: "5 hr ago" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{a.action}</p>
                    <p className="text-[11px] text-muted-foreground">{a.case} · {a.customer}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">by {a.by} · {a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
