import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, customers, cases, issueThemes, trendData } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, Clock, Users, TrendingUp, Minus, ExternalLink, Bot, Zap, Shield, MessageSquare } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const riskColor: Record<string, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const openCases = cases.filter(c => c.status !== "resolved");
  const pendingApprovals = 4;
  const activeEscalations = 4;

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Command Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Support operations control plane — design, deploy, and monitor AI support systems</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs px-2.5 py-1 gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-subtle" />
            Teams Connected
          </Badge>
          <Badge variant="outline" className="text-xs px-2.5 py-1 gap-1.5">
            <Bot className="h-3 w-3" />
            5 Agents Active
          </Badge>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="kpi-card border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Automation Rate</p>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <p className="text-2xl font-bold mt-2 text-foreground">{kpis.automationRate}%</p>
            <p className="text-xs text-success mt-1 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +3.2% from last week</p>
          </CardContent>
        </Card>
        <Card className="kpi-card border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Unresolved Exceptions</p>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <p className="text-2xl font-bold mt-2 text-foreground">{kpis.unresolvedExceptions}</p>
            <p className="text-xs text-destructive mt-1 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +2 since yesterday</p>
          </CardContent>
        </Card>
        <Card className="kpi-card border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">At-Risk Customers</p>
              <Users className="h-4 w-4 text-destructive" />
            </div>
            <p className="text-2xl font-bold mt-2 text-foreground">{kpis.atRiskCustomers}</p>
            <p className="text-xs text-muted-foreground mt-1">of {customers.length} total</p>
          </CardContent>
        </Card>
        <Card className="kpi-card border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Resolution Time</p>
              <Clock className="h-4 w-4 text-info" />
            </div>
            <p className="text-2xl font-bold mt-2 text-foreground">{kpis.avgResolutionTime}</p>
            <p className="text-xs text-success mt-1 flex items-center gap-1"><ArrowDownRight className="h-3 w-3" /> -18 min from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Teams execution status */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Teams Execution Status
            </CardTitle>
            <Badge variant="outline" className="text-[10px] gap-1"><ExternalLink className="h-2.5 w-2.5" /> Open in Teams</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => navigate("/teams/approvals")} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left">
              <div className="flex items-center justify-between mb-2">
                <Shield className="h-5 w-5 text-warning" />
                <Badge className="bg-warning/10 text-warning border border-warning/20 text-xs">{pendingApprovals}</Badge>
              </div>
              <p className="text-sm font-semibold text-foreground">Pending Approvals</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Actions awaiting human review</p>
            </button>
            <button onClick={() => navigate("/teams/escalations")} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left">
              <div className="flex items-center justify-between mb-2">
                <ArrowUpRight className="h-5 w-5 text-destructive" />
                <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-xs">{activeEscalations}</Badge>
              </div>
              <p className="text-sm font-semibold text-foreground">Active Escalations</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Cases beyond AI resolution</p>
            </button>
            <button onClick={() => navigate("/teams/agents")} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left">
              <div className="flex items-center justify-between mb-2">
                <Bot className="h-5 w-5 text-primary" />
                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">All healthy</Badge>
              </div>
              <p className="text-sm font-semibold text-foreground">Agent Activity</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">5 agents processing 8 cases</p>
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {/* Trend chart */}
        <Card className="col-span-2 border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Case Volume — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="automated" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" name="Automated" />
                  <Area type="monotone" dataKey="manual" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning) / 0.15)" name="Manual" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Issue themes */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Issue Themes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {issueThemes.map((t, i) => (
              <div key={i} className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{t.theme}</p>
                  <p className="text-[11px] text-muted-foreground">{t.count} occurrences</p>
                </div>
                {t.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />}
                {t.trend === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />}
                {t.trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Blueprints + Customer overview */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active blueprints */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Blueprints</CardTitle>
              <button onClick={() => navigate("/blueprints")} className="text-xs text-primary font-medium hover:underline">View all →</button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {[
              { name: "Helio CRM Agent", coverage: 84, deployments: 5, status: "active" },
              { name: "DataSync Pro", coverage: 82, deployments: 3, status: "active" },
              { name: "CloudGuard AI", coverage: 78, deployments: 2, status: "draft" },
            ].map((bp, i) => (
              <button key={i} onClick={() => navigate("/blueprints")} className="w-full flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{bp.name}</p>
                  <p className="text-[11px] text-muted-foreground">{bp.deployments} deployments · {bp.coverage}% coverage</p>
                </div>
                <Badge variant="outline" className={`text-[10px] ${bp.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}`}>{bp.status}</Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Customer health */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Customer Health</CardTitle>
              <button onClick={() => navigate("/teams/customers")} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">Open in Teams <ExternalLink className="h-2.5 w-2.5" /></button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {customers.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                <span className="text-xs font-semibold text-foreground w-32 truncate">{c.name}</span>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.risk]}`}>{c.risk}</Badge>
                <div className="flex-1" />
                <span className="text-[11px] text-muted-foreground">{c.openCases} open</span>
                <span className="text-[11px] text-muted-foreground">{c.automationRate}% auto</span>
                <span className="text-[11px] text-muted-foreground">{c.lastActivity}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
