import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Activity, BookOpen, User, Zap, CheckCircle2, AlertTriangle } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";
import { agentActivity } from "@/data/mockData";

const agentIcons: Record<string, React.ElementType> = {
  "Orchestrator Agent": Brain,
  "Telemetry Agent": Activity,
  "Knowledge Agent": BookOpen,
  "Customer Context Agent": User,
  "Resolution Agent": Zap,
};

export default function TeamsAgentActivity() {
  return (
    <TeamsShell
      section="Agent Activity"
      tabs={[
        { label: "All Agents", active: true },
        { label: "Audit Log" },
        { label: "Performance" },
      ]}
    >
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1100px] mx-auto space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Support Agent Activity</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Real-time status and actions from AI support agents across all customer deployments</p>
          </div>

          {/* Agent summary row */}
          <div className="grid grid-cols-5 gap-3">
            {agentActivity.map((a, i) => {
              const Icon = agentIcons[a.agent] || Brain;
              return (
                <Card key={i} className="border">
                  <CardContent className="p-3 text-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-semibold text-foreground">{a.agent.replace(" Agent", "")}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className={`h-1.5 w-1.5 rounded-full ${a.status === "active" ? "bg-success animate-pulse-subtle" : "bg-muted-foreground"}`} />
                      <span className="text-[10px] text-muted-foreground capitalize">{a.status}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed agent cards */}
          <div className="space-y-4">
            {agentActivity.map((agent, i) => {
              const Icon = agentIcons[agent.agent] || Brain;
              return (
                <Card key={i} className="border">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-sm font-semibold text-foreground">{agent.agent}</h3>
                          <div className="flex items-center gap-1">
                            <div className={`h-2 w-2 rounded-full ${agent.status === "active" ? "bg-success animate-pulse-subtle" : "bg-muted-foreground"}`} />
                            <span className="text-[11px] text-muted-foreground capitalize">{agent.status}</span>
                          </div>
                          <div className="flex items-center gap-4 ml-auto text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {agent.casesHandled} cases handled</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {agent.autoResolved} auto-resolved</span>
                            <span>Avg confidence: <span className="font-semibold text-foreground">{agent.avgConfidence}%</span></span>
                          </div>
                        </div>
                        <div className="p-3 rounded border bg-background">
                          <p className="text-[11px] text-foreground">{agent.topAction}</p>
                          {agent.escalated > 0 && (
                            <p className="text-[10px] text-warning mt-1">{agent.escalated} case(s) escalated to human review</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
