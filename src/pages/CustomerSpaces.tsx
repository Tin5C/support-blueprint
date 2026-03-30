import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customers, cases } from "@/data/mockData";
import { useSearchParams } from "react-router-dom";
import { Activity, Server, Shield, Clock, ChevronRight } from "lucide-react";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

export default function CustomerSpaces() {
  const [params] = useSearchParams();
  const [selectedId, setSelectedId] = useState(params.get("id") || "cust-1");
  const selected = customers.find(c => c.id === selectedId)!;
  const customerCases = cases.filter(c => c.customerId === selectedId);

  return (
    <div className="flex h-full">
      {/* Customer list sidebar */}
      <div className="w-72 shrink-0 border-r bg-card overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-sm font-semibold text-foreground">Customer Spaces</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">{customers.length} active deployments</p>
        </div>
        <div className="p-2 space-y-0.5">
          {customers.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${selectedId === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground">{c.name}</span>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.risk]}`}>{c.risk}</Badge>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
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
            <h1 className="text-xl font-semibold text-foreground">{selected.name}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{selected.product} · {selected.environment}</p>
          </div>
          <Badge variant="outline" className={`text-xs px-2 py-1 ${riskColor[selected.risk]}`}>
            {selected.risk} risk
          </Badge>
        </div>

        {/* Deployment overview */}
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

        {/* Case list */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cases ({customerCases.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {customerCases.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">No cases for this customer</p>
                <p className="text-xs text-muted-foreground mt-1">All systems operating normally</p>
              </div>
            ) : (
              customerCases.map(c => (
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{c.id}</span>
                  <div className={`h-2 w-2 rounded-full shrink-0 ${c.status === "resolved" ? "bg-success" : c.status === "in-progress" ? "bg-primary" : c.status === "waiting" ? "bg-warning" : "bg-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{c.title}</p>
                    <p className="text-[11px] text-muted-foreground">{c.category} · {c.trigger === "telemetry" ? "Telemetry" : "Customer"} triggered</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.priority]}`}>{c.priority}</Badge>
                  <span className="text-[11px] text-muted-foreground w-16 text-right">{c.confidence}%</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
