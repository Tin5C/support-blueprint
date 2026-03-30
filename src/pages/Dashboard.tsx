import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { kpis, customers, cases, issueThemes, trendData } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, Clock, Users, TrendingUp, Minus } from "lucide-react";
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

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Support operations at a glance</p>
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

      <div className="grid grid-cols-3 gap-4">
        {/* Trend chart */}
        <Card className="col-span-2 border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Case Volume — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[220px]">
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

      {/* Customer spaces quick links */}
      <Card className="border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Customer Spaces</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-5 gap-3">
            {customers.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/customers?id=${c.id}`)}
                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.risk]}`}>
                    {c.risk}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{c.openCases} open cases</p>
                <p className="text-[11px] text-muted-foreground">{c.lastActivity}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent cases */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Recent Cases</CardTitle>
            <button onClick={() => navigate("/cases")} className="text-xs text-primary font-medium hover:underline">View all →</button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {openCases.slice(0, 5).map((c) => {
              const cust = customers.find(cu => cu.id === c.customerId);
              return (
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/cases")}>
                  <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{c.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{c.title}</p>
                    <p className="text-[11px] text-muted-foreground">{cust?.name} · {c.category}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.priority]}`}>{c.priority}</Badge>
                  <span className="text-[11px] text-muted-foreground w-20 text-right shrink-0">{c.confidence}% conf.</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
