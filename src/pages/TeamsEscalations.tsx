import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Clock, Zap, Video, Phone, Search, MoreHorizontal, AlertTriangle, User, ChevronRight, Bot } from "lucide-react";

const teamsBg = "hsl(264 60% 22%)";
const teamsAccent = "hsl(264 60% 50%)";

const riskColor: Record<string, string> = {
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const escalations = [
  {
    caseId: "CS-1009", customer: "Sterling Logistics", title: "Critical: Data loss during failover",
    from: "Resolution Agent", to: "Senior Engineer", reason: "Data loss detected — 3,200 records. Confidence 52%, below threshold. Failover action requires human judgment.",
    risk: "critical" as const, elapsed: "6 hr 45 min", priority: "P0",
  },
  {
    caseId: "CS-1011", customer: "Sterling Logistics", title: "Missing audit logs — compliance escalation",
    from: "Customer Context Agent", to: "Compliance Engineer", reason: "Compliance category auto-escalated. Customer's compliance team requires March 28–29 audit logs. Gaps detected in log retention.",
    risk: "critical" as const, elapsed: "1 hr 30 min", priority: "P0",
  },
  {
    caseId: "CS-1006", customer: "NovaTech Industries", title: "Workflow stuck in retry loop",
    from: "L1 Support", to: "L2 Senior Engineer", reason: "Unresolved after 2 hours. Retry loop caused by downstream API rate limit — requires investigation of cascade pattern.",
    risk: "high" as const, elapsed: "9 hr", priority: "P1",
  },
  {
    caseId: "CS-1012", customer: "Sterling Logistics", title: "Schema migration rollback needed",
    from: "Resolution Agent", to: "Engineering Lead", reason: "Schema rollback affects 3 downstream integrations. Customer requesting urgent rollback. Approval-required action per blueprint.",
    risk: "high" as const, elapsed: "12 hr", priority: "P1",
  },
];

export default function TeamsEscalations() {
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
          <span className="text-[12px] text-white/60">Escalations</span>
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
              <h1 className="text-xl font-semibold text-foreground">Active Escalations</h1>
              <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-xs">{escalations.length} active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Cases that have been escalated beyond AI agent resolution</p>
          </div>

          <div className="space-y-3">
            {escalations.map((e, i) => (
              <Card key={i} className="border border-l-4" style={{ borderLeftColor: e.risk === "critical" ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${e.risk === "critical" ? "bg-destructive/10" : "bg-warning/10"}`}>
                      <ArrowUpRight className={`h-5 w-5 ${e.risk === "critical" ? "text-destructive" : "text-warning"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{e.caseId}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[e.risk]}`}>{e.priority}</Badge>
                        <span className="text-xs font-medium text-foreground">{e.customer}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-2">{e.title}</p>

                      {/* Escalation path */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-[10px] gap-1"><Bot className="h-2.5 w-2.5" /> {e.from}</Badge>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline" className="text-[10px] gap-1 bg-primary/8 text-primary border-primary/20"><User className="h-2.5 w-2.5" /> {e.to}</Badge>
                      </div>

                      <p className="text-[11px] text-muted-foreground leading-relaxed">{e.reason}</p>

                      <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Escalated {e.elapsed} ago</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button size="sm" className="h-8 text-xs">Take Ownership</Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs">View in Teams</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
