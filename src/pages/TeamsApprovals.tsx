import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, X, ArrowUpRight, Clock, Shield, Bot } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";
import { pendingApprovals, recentApprovals } from "@/data/mockData";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
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
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[900px] mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">Pending Approvals</h1>
              <Badge className="bg-warning/10 text-warning border border-warning/20 text-xs">{pendingApprovals.length} pending</Badge>
            </div>
            <p className="text-sm text-muted-foreground">AI-recommended actions awaiting human approval before execution</p>
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
                        <span className="text-[10px] text-muted-foreground">{a.product}</span>
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

          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Recently Approved</h2>
            <div className="space-y-2">
              {recentApprovals.map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{a.action}</p>
                    <p className="text-[11px] text-muted-foreground">{a.caseId} · {a.customer} · {a.outcome}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">by {a.approvedBy} · {a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
