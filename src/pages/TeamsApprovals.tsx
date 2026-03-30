import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, X, ArrowUpRight, Clock, Shield, Bot } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";
import { pendingApprovals, recentApprovals } from "@/data/mockData";

const riskColor: Record<string, string> = {
  low: "status-success",
  medium: "status-warning",
  high: "status-danger",
  critical: "status-critical",
};

export default function TeamsApprovals() {
  return (
    <TeamsShell
      section="Approvals"
      tabs={[
        { label: "Pending", active: true },
        { label: "Approved" },
        { label: "Rejected" },
      ]}
    >
      <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
        <div className="max-w-[900px] mx-auto space-y-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-semibold text-foreground tracking-tight">Pending Approvals</h1>
              <Badge className="status-warning border text-[10px]">{pendingApprovals.length} pending</Badge>
            </div>
            <p className="text-[12px] text-muted-foreground">AI-recommended actions awaiting human approval before execution</p>
          </div>

          <div className="space-y-2.5">
            {pendingApprovals.map((a, i) => (
              <Card key={i} className="border hover:shadow-sm transition-all duration-150 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-4 w-4 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-muted-foreground">{a.caseId}</span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[11px] font-medium text-foreground">{a.customer}</span>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${riskColor[a.risk]}`}>{a.risk}</Badge>
                        <span className="text-[10px] text-muted-foreground">{a.product}</span>
                      </div>
                      <p className="text-[12px] font-semibold text-foreground mb-2">{a.action}</p>
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Bot className="h-3 w-3" /> {a.agent}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.elapsed}</span>
                        <span>{a.runbook}</span>
                        <span>Confidence: <span className={`font-semibold ${a.confidence >= 70 ? "text-foreground" : "text-warning"}`}>{a.confidence}%</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button size="sm" className="gap-1.5 h-8 text-[11px]"><CheckCircle2 className="h-3.5 w-3.5" /> Approve</Button>
                      <Button size="sm" variant="outline" className="gap-1.5 h-8 text-[11px]"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
                      <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-[11px] text-destructive"><X className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-[12px] font-semibold text-foreground mb-2.5">Recently Approved</h2>
            <div className="space-y-1.5">
              {recentApprovals.map((a, i) => (
                <div key={i} className="flex items-center gap-3.5 p-3 rounded-lg border bg-card">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-foreground">{a.action}</p>
                    <p className="text-[10px] text-muted-foreground">{a.caseId} · {a.customer} · {a.outcome}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{a.approvedBy} · {a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
