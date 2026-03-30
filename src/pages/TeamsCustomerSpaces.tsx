import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { customers, cases } from "@/data/mockData";
import { useSearchParams } from "react-router-dom";
import { Activity, Server, Shield, Clock, ChevronRight, Hash, ExternalLink } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

export default function TeamsCustomerSpaces() {
  const [params] = useSearchParams();
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
        <div className="w-60 shrink-0 border-r bg-card overflow-y-auto">
          <div className="p-3 border-b">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Customer Channels</p>
          </div>
          <div className="p-1.5 space-y-0.5">
            {customers.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-3 py-2.5 rounded text-xs transition-colors ${selectedId === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{c.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-[9px] px-1 py-0 ${riskColor[c.risk]}`}>{c.risk}</Badge>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground pl-4">
                  <span>{c.openCases} open</span>
                  <span>·</span>
                  <span>{c.lastActivity}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Customer detail */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>Customer Spaces</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">{selected.name}</span>
              </div>
              <h1 className="text-xl font-semibold text-foreground">{selected.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{selected.product} · {selected.environment}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-xs px-2 py-1 ${riskColor[selected.risk]}`}>
                {selected.risk} risk
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1 gap-1">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse-subtle" />
                Teams Connected
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><Activity className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">Health Score</span></div>
                <p className="text-2xl font-bold text-foreground">{selected.healthScore}</p>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><Shield className="h-4 w-4 text-success" /><span className="text-xs text-muted-foreground">Automation Rate</span></div>
                <p className="text-2xl font-bold text-foreground">{selected.automationRate}%</p>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><Server className="h-4 w-4 text-info" /><span className="text-xs text-muted-foreground">Nodes</span></div>
                <p className="text-2xl font-bold text-foreground">{selected.nodes}</p>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Deployed</span></div>
                <p className="text-sm font-bold text-foreground mt-1">{selected.deploymentDate}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Support Cases ({customerCases.length})</h2>
              <Badge variant="outline" className="text-[10px] gap-1"><ExternalLink className="h-2.5 w-2.5" /> Open in Teams Chat</Badge>
            </div>
            {customerCases.length === 0 ? (
              <Card className="border">
                <CardContent className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">No active cases</p>
                  <p className="text-xs text-muted-foreground mt-1">All product deployments operating normally</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {customerCases.map(c => (
                  <div key={c.id} className="flex items-center gap-4 p-3.5 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                    <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{c.id}</span>
                    <div className={`h-2 w-2 rounded-full shrink-0 ${c.status === "resolved" ? "bg-success" : c.status === "in-progress" ? "bg-primary" : c.status === "waiting" ? "bg-warning" : "bg-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{c.title}</p>
                      <p className="text-[11px] text-muted-foreground">{c.category} · {c.trigger === "telemetry" ? "Product telemetry" : "Customer"} triggered</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.priority]}`}>{c.priority}</Badge>
                    <span className="text-[11px] text-muted-foreground w-16 text-right">{c.confidence}%</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TeamsShell>
  );
}
