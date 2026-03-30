import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Activity, BookOpen, User, Zap, Video, Phone, Search, MoreHorizontal, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const teamsBg = "hsl(264 60% 22%)";
const teamsAccent = "hsl(264 60% 50%)";

const agents = [
  {
    name: "Orchestrator Agent", icon: Brain, status: "active" as const,
    activeCases: 8, resolved24h: 14, avgConfidence: 82,
    recentActions: [
      { action: "Triaged CS-1010: Replication lag for Sterling Logistics", time: "3 min ago", result: "Routed to Telemetry Agent" },
      { action: "Triaged CS-1011: Missing audit logs escalation", time: "12 min ago", result: "Auto-escalated to compliance team" },
      { action: "Coordinated resolution for CS-1001: Pipeline stall", time: "28 min ago", result: "Awaiting human approval" },
    ],
  },
  {
    name: "Telemetry Agent", icon: Activity, status: "active" as const,
    activeCases: 5, resolved24h: 11, avgConfidence: 88,
    recentActions: [
      { action: "Pulled metrics for Sterling replication lag", time: "5 min ago", result: "Lag at 12s, threshold 5s" },
      { action: "Detected memory pressure on Meridian workers", time: "1 hr ago", result: "94% memory, triggered alert" },
      { action: "Baseline comparison for NovaTech job timing", time: "2 hr ago", result: "45 min over SLA window" },
    ],
  },
  {
    name: "Knowledge Agent", icon: BookOpen, status: "active" as const,
    activeCases: 4, resolved24h: 9, avgConfidence: 85,
    recentActions: [
      { action: "Matched RB-042 for batch memory pressure", time: "28 min ago", result: "High relevance match" },
      { action: "Searching for plugin compatibility guidance", time: "3 hr ago", result: "No direct match — flagged gap" },
      { action: "Retrieved auth token refresh procedure", time: "6 hr ago", result: "RB-043 applied successfully" },
    ],
  },
  {
    name: "Customer Context Agent", icon: User, status: "idle" as const,
    activeCases: 2, resolved24h: 7, avgConfidence: 93,
    recentActions: [
      { action: "Loaded Sterling deployment config", time: "6 min ago", result: "32 nodes, multi-region, PCI-DSS" },
      { action: "Checked Meridian SLA terms", time: "30 min ago", result: "Enterprise tier, 1hr response" },
      { action: "Verified NovaTech feature flags", time: "2 hr ago", result: "Workflow automation enabled" },
    ],
  },
  {
    name: "Resolution Agent", icon: Zap, status: "waiting" as const,
    activeCases: 3, resolved24h: 6, avgConfidence: 71,
    recentActions: [
      { action: "Proposed worker scaling for Meridian", time: "28 min ago", result: "Awaiting approval (67% conf)" },
      { action: "Proposed failover for Sterling", time: "6 hr ago", result: "Awaiting approval (52% conf)" },
      { action: "Auto-resolved Apex false positive alert", time: "1 day ago", result: "Whitelisted pattern (95% conf)" },
    ],
  },
];

export default function TeamsAgentActivity() {
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
          <span className="text-[12px] text-white/60">Agent Activity</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Video className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Phone className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Search className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><MoreHorizontal className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1100px] mx-auto space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Agent Activity</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Real-time status and recent actions from all AI support agents</p>
          </div>

          {/* Agent summary */}
          <div className="grid grid-cols-5 gap-3">
            {agents.map((a, i) => (
              <Card key={i} className="border">
                <CardContent className="p-3 text-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-semibold text-foreground">{a.name.replace(" Agent", "")}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className={`h-1.5 w-1.5 rounded-full ${a.status === "active" ? "bg-success animate-pulse-subtle" : a.status === "waiting" ? "bg-warning" : "bg-muted-foreground"}`} />
                    <span className="text-[10px] text-muted-foreground capitalize">{a.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed agent cards */}
          <div className="space-y-4">
            {agents.map((agent, i) => (
              <Card key={i} className="border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <agent.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                        <div className={`flex items-center gap-1`}>
                          <div className={`h-2 w-2 rounded-full ${agent.status === "active" ? "bg-success animate-pulse-subtle" : agent.status === "waiting" ? "bg-warning" : "bg-muted-foreground"}`} />
                          <span className="text-[11px] text-muted-foreground capitalize">{agent.status}</span>
                        </div>
                        <div className="flex items-center gap-4 ml-auto text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {agent.activeCases} active</span>
                          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {agent.resolved24h} resolved (24h)</span>
                          <span className="flex items-center gap-1">Avg confidence: <span className="font-semibold text-foreground">{agent.avgConfidence}%</span></span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {agent.recentActions.map((action, j) => (
                          <div key={j} className="flex items-center gap-3 p-2.5 rounded border bg-background">
                            <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-foreground">{action.action}</p>
                            </div>
                            <Badge variant="secondary" className="text-[10px] shrink-0">{action.result}</Badge>
                            <span className="text-[10px] text-muted-foreground shrink-0 w-16 text-right">{action.time}</span>
                          </div>
                        ))}
                      </div>
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
