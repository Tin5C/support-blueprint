import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Clock, User, ChevronRight, Bot } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";
import { escalations } from "@/data/mockData";

const riskColor: Record<string, string> = {
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const statusBadge: Record<string, string> = {
  active: "bg-destructive/10 text-destructive border-destructive/20",
  acknowledged: "bg-warning/10 text-warning border-warning/20",
  resolved: "bg-success/10 text-success border-success/20",
};

export default function TeamsEscalations() {
  return (
    <TeamsShell
      section="Escalations"
      tabs={[
        { label: "Active", active: true },
        { label: "Resolved" },
        { label: "Patterns" },
      ]}
    >
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[900px] mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">Active Escalations</h1>
              <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-xs">{escalations.filter(e => e.status !== "resolved").length} active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Cases escalated beyond AI resolution — requires human expertise</p>
          </div>

          <div className="space-y-3">
            {escalations.map((e, i) => (
              <Card key={i} className="border border-l-4" style={{ borderLeftColor: e.severity === "critical" ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${e.severity === "critical" ? "bg-destructive/10" : "bg-warning/10"}`}>
                      <ArrowUpRight className={`h-5 w-5 ${e.severity === "critical" ? "text-destructive" : "text-warning"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{e.caseId}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[e.severity]}`}>{e.sla}</Badge>
                        <span className="text-xs font-medium text-foreground">{e.customer}</span>
                        <span className="text-[10px] text-muted-foreground">{e.product}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ml-auto ${statusBadge[e.status]}`}>{e.status}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-2">{e.title}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-[10px] gap-1"><Bot className="h-2.5 w-2.5" /> AI Agents</Badge>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline" className="text-[10px] gap-1 bg-primary/8 text-primary border-primary/20"><User className="h-2.5 w-2.5" /> {e.escalatedTo}</Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{e.reason}</p>
                      <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Escalated {new Date(e.escalatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button size="sm" className="h-8 text-xs">Take Ownership</Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs">View Thread</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
