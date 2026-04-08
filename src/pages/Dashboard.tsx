import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, customers, cases, trendData, activityHistory, pendingApprovals, escalations } from "@/data/mockData";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, Clock, Users,
  TrendingUp, ExternalLink, Shield, Activity, ChevronRight, ShieldCheck,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const riskColor: Record<string, string> = {
  low: "status-success",
  medium: "status-warning",
  high: "status-danger",
  critical: "status-critical",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const openCases = cases.filter(c => c.status !== "resolved");
  const recentActivity = activityHistory.slice(0, 5);
  const activeEscalations = escalations.filter(e => e.status !== "resolved");

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header — primary message */}
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Operational Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Is support scaling safely across <span className="font-medium text-foreground">{customers.length} customers</span> and <span className="font-medium text-foreground">{openCases.length} active cases</span>?
        </p>
      </div>

      {/* KPIs — scale and governance metrics */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { label: "Automation Rate", value: `${kpis.automationRate}%`, icon: CheckCircle2, iconClass: "text-success", change: "+3.2% this week", positive: true, desc: "Cases resolved without human intervention" },
          { label: "Pending Approvals", value: pendingApprovals.length, icon: Shield, iconClass: "text-warning", change: "Awaiting human review", positive: false, desc: "Actions requiring human approval" },
          { label: "Active Escalations", value: activeEscalations.length, icon: ArrowUpRight, iconClass: "text-destructive", change: `${activeEscalations.filter(e => e.severity === "critical").length} critical`, positive: false, desc: "Beyond AI resolution capability" },
          { label: "At-Risk Customers", value: kpis.atRiskCustomers, icon: AlertTriangle, iconClass: "text-destructive", change: `of ${customers.length} total`, positive: false, desc: "Health score below threshold" },
          { label: "Avg Resolution", value: kpis.avgResolutionTime, icon: Clock, iconClass: "text-primary", change: "−18 min vs last week", positive: true, desc: "Including AI-assisted cases" },
          { label: "Annual Audit", value: "Certified", icon: ShieldCheck, iconClass: "text-emerald-600", change: "Next: 68 days · Jun 14 · KPMG", positive: false, desc: "March 2025 · with recommendations" },
        ].map((kpi, i) => (
          <Card key={i} className="kpi-card border animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                <kpi.icon className={`h-3.5 w-3.5 ${kpi.iconClass}`} />
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</p>
              <p className={`text-[10px] mt-1 flex items-center gap-1 ${kpi.positive ? "text-success" : "text-muted-foreground"}`}>
                {kpi.positive && <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exception summary — governance focus */}
      <div className="grid grid-cols-3 gap-4">
        {/* Approvals */}
        <button onClick={() => navigate("/teams/approvals")} className="p-5 rounded-lg border bg-card hover:shadow-sm transition-all text-left group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning" />
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pending Approvals</span>
            </div>
            <Badge className="status-warning border text-[10px]">{pendingApprovals.length}</Badge>
          </div>
          <div className="space-y-2">
            {pendingApprovals.slice(0, 2).map((a, i) => (
              <div key={i} className="text-[11px]">
                <p className="font-medium text-foreground truncate">{a.action}</p>
                <p className="text-muted-foreground">{a.customer} · {a.risk} risk · {a.confidence}% confidence</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-primary mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Review all <ChevronRight className="h-3 w-3" /></p>
        </button>

        {/* Escalations */}
        <button onClick={() => navigate("/teams/escalations")} className="p-5 rounded-lg border bg-card hover:shadow-sm transition-all text-left group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-destructive" />
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Active Escalations</span>
            </div>
            <Badge className="status-danger border text-[10px]">{activeEscalations.length}</Badge>
          </div>
          <div className="space-y-2">
            {activeEscalations.slice(0, 2).map((e, i) => (
              <div key={i} className="text-[11px]">
                <p className="font-medium text-foreground truncate">{e.title}</p>
                <p className="text-muted-foreground">{e.customer} · {e.sla}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-primary mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">View all <ChevronRight className="h-3 w-3" /></p>
        </button>

        {/* System status */}
        <div className="p-5 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">System Status</span>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Teams Connected", value: "5 customer spaces", ok: true },
              { label: "AI Agents", value: "5 active, 0 errors", ok: true },
              { label: "Blueprint Coverage", value: "84% across products", ok: true },
              { label: "Auto-Approval Threshold", value: "80% confidence", ok: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-medium text-foreground flex items-center gap-1.5">
                  {s.ok && <div className="h-1.5 w-1.5 rounded-full bg-success" />}
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automation trend + Customer health */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3 border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[13px] font-semibold">Automated vs Manual Resolution — Last 7 Days</CardTitle>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /> Automated</span>
                <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-warning" /> Required Human</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="automated" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.12)" name="Automated" />
                  <Area type="monotone" dataKey="manual" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning) / 0.12)" name="Manual (Human)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer health */}
        <Card className="col-span-2 border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[13px] font-semibold">Customer Health</CardTitle>
              <button onClick={() => navigate("/teams/customers")} className="text-[11px] text-primary font-medium hover:underline flex items-center gap-1">
                Open in Teams <ExternalLink className="h-2.5 w-2.5" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {customers.map((c) => (
              <button key={c.id} className="w-full flex items-center gap-3 p-2.5 rounded-lg border bg-card hover:bg-accent/30 transition-colors text-left" onClick={() => navigate(`/teams/customers?id=${c.id}`)}>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 w-14 justify-center ${riskColor[c.risk]}`}>{c.risk}</Badge>
                <span className="text-[11px] font-medium text-foreground flex-1 truncate">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">{c.openCases} open</span>
                <span className="text-[10px] text-muted-foreground">{c.automationRate}%</span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity — Teams Execution</p>
          <button onClick={() => navigate("/teams/cases")} className="text-[11px] text-primary font-medium hover:underline flex items-center gap-1">
            View all cases <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-1">
          {recentActivity.map((act) => {
            const typeIcon: Record<string, { icon: React.ElementType; class: string }> = {
              "telemetry-alert": { icon: Activity, class: "status-danger" },
              "agent-summary": { icon: CheckCircle2, class: "status-info" },
              "customer-update": { icon: Users, class: "status-warning" },
              "approval-request": { icon: Shield, class: "status-warning" },
              "approval-granted": { icon: CheckCircle2, class: "status-success" },
              "escalation": { icon: ArrowUpRight, class: "status-danger" },
              "resolution": { icon: CheckCircle2, class: "status-success" },
              "note": { icon: Users, class: "status-neutral" },
            };
            const t = typeIcon[act.type] || { icon: Users, class: "status-neutral" };
            return (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/30 transition-colors cursor-pointer">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${t.class}`}>
                  <t.icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-medium text-foreground">{act.sender}</span>
                    <span className="text-[10px] text-muted-foreground">{act.channel}</span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-auto">{act.caseId}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1">{act.content.replace(/[⚡✅⏳🔴📋]/g, '').trim()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
