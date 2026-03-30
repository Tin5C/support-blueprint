import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { customers, cases } from "@/data/mockData";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Activity, Server, Shield, Clock, ChevronRight, Hash } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";

const riskColor: Record<string, string> = {
  low: "status-success",
  medium: "status-warning",
  high: "status-danger",
  critical: "status-critical",
};

const statusDot: Record<string, string> = {
  open: "bg-muted-foreground",
  "in-progress": "bg-primary",
  waiting: "bg-warning",
  resolved: "bg-success",
};

export default function TeamsCustomerSpaces() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(params.get("id") || "cust-1");
  const selected = customers.find(c => c.id === selectedId)!;
  const customerCases = cases.filter(c => c.customerId === selectedId);

  return (
    <TeamsShell
      section="Customer Spaces"
      tabs={[
        { label: "Overview", active: true },
        { label: "Deployments" },
        { label: "Telemetry" },
        { label: "History" },
      ]}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Channel list */}
        <div className="w-56 shrink-0 border-r bg-card overflow-y-auto">
          <div className="p-3 border-b">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Customer Channels</p>
          </div>
          <div className="p-1.5 space-y-0.5">
            {customers.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-xs transition-all duration-150 ${selectedId === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    <span className="font-semibold text-foreground text-[11px]">{c.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-[9px] px-1 py-0 ${riskColor[c.risk]}`}>{c.risk}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground pl-[18px]">{c.openCases} open · {c.lastActivity}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Customer detail */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1">
              <span>Customer Spaces</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{selected.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-foreground tracking-tight">{selected.name}</h1>
                <p className="text-[12px] text-muted-foreground mt-0.5">{selected.product} · {selected.environment}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-[11px] px-2 py-1 ${riskColor[selected.risk]}`}>{selected.risk} risk</Badge>
                <Badge variant="outline" className="text-[11px] px-2 py-1 gap-1.5 status-success border">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-subtle" />
                  Connected
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Activity, iconClass: "text-primary", label: "Health Score", value: selected.healthScore },
              { icon: Shield, iconClass: "text-success", label: "Automation", value: `${selected.automationRate}%` },
              { icon: Server, iconClass: "text-info", label: "Nodes", value: selected.nodes },
              { icon: Clock, iconClass: "text-muted-foreground", label: "Deployed", value: selected.deploymentDate },
            ].map((m, i) => (
              <Card key={i} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <m.icon className={`h-3.5 w-3.5 ${m.iconClass}`} />
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{m.label}</span>
                  </div>
                  <p className="text-xl font-bold text-foreground tracking-tight">{m.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-[13px] font-semibold text-foreground mb-3">Support Cases ({customerCases.length})</h2>
            {customerCases.length === 0 ? (
              <Card className="border">
                <CardContent className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">No active cases — all systems operational</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-1.5">
                {customerCases.map(c => (
                  <button
                    key={c.id}
                    onClick={() => navigate("/teams/cases")}
                    className="w-full flex items-center gap-4 p-3.5 rounded-lg border bg-card hover:bg-accent/30 transition-all duration-150 text-left"
                  >
                    <span className="text-[10px] font-mono text-muted-foreground w-16 shrink-0">{c.id}</span>
                    <div className={`h-2 w-2 rounded-full shrink-0 ${statusDot[c.status]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate">{c.title}</p>
                      <p className="text-[10px] text-muted-foreground">{c.category} · {c.trigger === "telemetry" ? "Telemetry" : "Customer"}</p>
                    </div>
                    <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${riskColor[c.priority]}`}>{c.priority}</Badge>
                    <span className="text-[10px] text-muted-foreground w-12 text-right">{c.confidence}%</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
