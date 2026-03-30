import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, X, ArrowUpRight, Clock, Shield, FileText } from "lucide-react";
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
              <Badge className="status-warning border text-[10px]">{pendingApprovals.length} awaiting review</Badge>
            </div>
            <p className="text-[12px] text-muted-foreground">AI-recommended actions that require human approval before execution. Each action includes risk assessment, evidence, and policy context.</p>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((a, i) => (
              <Card key={i} className="border border-l-4 hover:shadow-sm transition-all duration-150 animate-slide-up" style={{
                borderLeftColor: a.risk === "critical" ? "hsl(var(--destructive))" : a.risk === "high" ? "hsl(var(--warning))" : "hsl(var(--border))",
                animationDelay: `${i * 60}ms`,
              }}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.risk === "critical" ? "bg-destructive/10" : "bg-warning/10"}`}>
                      <Shield className={`h-5 w-5 ${a.risk === "critical" ? "text-destructive" : "text-warning"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* What */}
                      <p className="text-[13px] font-semibold text-foreground mb-2">{a.action}</p>
                      
                      {/* Context */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-3 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Customer</span>
                          <span className="font-medium text-foreground">{a.customer}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Product</span>
                          <span className="font-medium text-foreground">{a.product}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Risk Level</span>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${riskColor[a.risk]}`}>{a.risk}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className={`font-semibold ${a.confidence >= 80 ? "text-foreground" : a.confidence >= 60 ? "text-warning" : "text-destructive"}`}>{a.confidence}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Runbook</span>
                          <span className="font-mono text-foreground">{a.runbook}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Waiting</span>
                          <span className="text-foreground">{a.elapsed}</span>
                        </div>
                      </div>

                      {/* Why approval needed */}
                      <div className="p-2.5 rounded-md bg-muted/50 border mb-3">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Why approval is required</p>
                        <p className="text-[11px] text-foreground">
                          {a.confidence < 80 ? `Confidence ${a.confidence}% is below the 80% auto-approval threshold.` : ''}
                          {a.risk === "critical" ? " Critical risk level requires human review regardless of confidence." : ""}
                          {a.risk === "high" ? " High-risk action per governance policy." : ""}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="gap-1.5 h-8 text-[11px]"><CheckCircle2 className="h-3.5 w-3.5" /> Approve</Button>
                        <Button size="sm" variant="outline" className="gap-1.5 h-8 text-[11px]"><ArrowUpRight className="h-3.5 w-3.5" /> Escalate</Button>
                        <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-[11px] text-destructive"><X className="h-3.5 w-3.5" /> Reject</Button>
                        <div className="flex-1" />
                        <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-[11px]"><FileText className="h-3.5 w-3.5" /> View Evidence</Button>
                      </div>
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
