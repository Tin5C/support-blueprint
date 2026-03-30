import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, customers, cases, issueThemes, trendData, activityHistory, pendingApprovals, escalations } from "@/data/mockData";
import {
  ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, Clock, Users,
  TrendingUp, Minus, ExternalLink, Bot, Zap, Shield, MessageSquare,
  Activity, ChevronRight,
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
  const recentActivity = activityHistory.slice(0, 6);

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header with story context */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Command Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your AI support system across <span className="font-medium text-foreground">{customers.length} customers</span> and <span className="font-medium text-foreground">3 products</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[11px] px-2.5 py-1 gap-1.5 status-success border">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-subtle" />
            Teams Connected
          </Badge>
          <Badge variant="outline" className="text-[11px] px-2.5 py-1 gap-1.5">
            <Bot className="h-3 w-3" />
            5 Agents Active
          </Badge>
        </div>
      </div>

      {/* Story steps — quick nav */}
      <div className="grid grid-cols-6 gap-2">
        {[
          { step: 1, label: "Define", desc: "Support Studio", route: "/studio", icon: Zap, done: true },
          { step: 2, label: "Generate", desc: "Blueprint", route: "/blueprints", icon: Activity, done: true },
          { step: 3, label: "Deploy", desc: "To Teams", route: "/teams/customers", icon: Users, done: true },
          { step: 4, label: "Execute", desc: `${openCases.length} active cases`, route: "/teams/cases", icon: MessageSquare, active: true },
          { step: 5, label: "Escalate", desc: `${escalations.length} active`, route: "/teams/escalations", icon: ArrowUpRight, count: escalations.length },
          { step: 6, label: "Learn", desc: "Insights", route: "/insights", icon: TrendingUp },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => navigate(s.route)}
            className={`p-3 rounded-lg border text-left transition-all duration-150 hover:shadow-sm group ${
              s.active ? "border-primary/30 bg-primary/[0.04]" : "bg-card hover:bg-accent/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`story-step ${s.active ? "story-step-active" : s.done ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {s.done && !s.active ? "✓" : s.step}
              </span>
              <span className="text-[11px] font-semibold text-foreground">{s.label}</span>
              {s.count && <Badge className="status-danger text-[9px] px-1 py-0 ml-auto border">{s.count}</Badge>}
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{s.desc}</p>
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Automation Rate", value: `${kpis.automationRate}%`, icon: CheckCircle2, iconClass: "text-success", change: "+3.2%", changeDir: "up", changeColor: "text-success" },
          { label: "Unresolved Exceptions", value: kpis.unresolvedExceptions, icon: AlertTriangle, iconClass: "text-warning", change: "+2", changeDir: "up", changeColor: "text-destructive" },
          { label: "At-Risk Customers", value: kpis.atRiskCustomers, icon: Users, iconClass: "text-destructive", change: `of ${customers.length}`, changeDir: "none", changeColor: "text-muted-foreground" },
          { label: "Avg Resolution", value: kpis.avgResolutionTime, icon: Clock, iconClass: "text-info", change: "-18 min", changeDir: "down", changeColor: "text-success" },
        ].map((kpi, i) => (
          <Card key={i} className="kpi-card border animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                <kpi.icon className={`h-3.5 w-3.5 ${kpi.iconClass}`} />
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</p>
              <p className={`text-[11px] mt-1 flex items-center gap-1 ${kpi.changeColor}`}>
                {kpi.changeDir === "up" && <ArrowUpRight className="h-3 w-3" />}
                {kpi.changeDir === "down" && <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teams execution + activity feed */}
      <div className="grid grid-cols-3 gap-4">
        {/* Teams status cards */}
        <div className="col-span-1 space-y-3">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <ExternalLink className="h-3 w-3" /> Teams Execution
          </p>
          <button onClick={() => navigate("/teams/approvals")} className="w-full p-4 rounded-lg border bg-card hover:shadow-sm transition-all text-left group">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-4 w-4 text-warning" />
              <Badge className="status-warning border text-[10px]">{pendingApprovals.length}</Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">Pending Approvals</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Actions awaiting human review</p>
          </button>
          <button onClick={() => navigate("/teams/escalations")} className="w-full p-4 rounded-lg border bg-card hover:shadow-sm transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <ArrowUpRight className="h-4 w-4 text-destructive" />
              <Badge className="status-danger border text-[10px]">{escalations.filter(e => e.status !== "resolved").length}</Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">Active Escalations</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Requires human expertise</p>
          </button>
          <button onClick={() => navigate("/teams/agents")} className="w-full p-4 rounded-lg border bg-card hover:shadow-sm transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <Bot className="h-4 w-4 text-primary" />
              <Badge variant="outline" className="text-[10px] status-success border">Healthy</Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">Agent Activity</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">5 agents · {openCases.length} active cases</p>
          </button>
        </div>

        {/* Activity feed */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</p>
            <button onClick={() => navigate("/teams/cases")} className="text-[11px] text-primary font-medium hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-1.5">
            {recentActivity.map((act) => {
              const typeIcon: Record<string, { icon: React.ElementType; class: string }> = {
                "telemetry-alert": { icon: Activity, class: "status-danger" },
                "agent-summary": { icon: Bot, class: "status-info" },
                "customer-update": { icon: MessageSquare, class: "status-warning" },
                "approval-request": { icon: Shield, class: "status-warning" },
                "approval-granted": { icon: CheckCircle2, class: "status-success" },
                "escalation": { icon: ArrowUpRight, class: "status-danger" },
                "resolution": { icon: CheckCircle2, class: "status-success" },
                "note": { icon: MessageSquare, class: "status-neutral" },
              };
              const t = typeIcon[act.type] || { icon: MessageSquare, class: "status-neutral" };
              return (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/30 transition-colors cursor-pointer">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${t.class}`}>
                    <t.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-semibold text-foreground">{act.sender}</span>
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

      {/* Charts + issue themes */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 border">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-semibold">Case Volume — Last 7 Days</CardTitle>
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
                  <Area type="monotone" dataKey="manual" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning) / 0.12)" name="Manual" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-semibold">Top Issue Themes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            {issueThemes.slice(0, 5).map((t, i) => (
              <div key={i} className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-foreground truncate">{t.theme}</p>
                  <p className="text-[10px] text-muted-foreground">{t.count} occurrences</p>
                </div>
                {t.trend === "up" && <TrendingUp className="h-3 w-3 text-destructive shrink-0 mt-0.5" />}
                {t.trend === "down" && <ArrowDownRight className="h-3 w-3 text-success shrink-0 mt-0.5" />}
                {t.trend === "stable" && <Minus className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Customer health */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[13px] font-semibold">Customer Health</CardTitle>
            <button onClick={() => navigate("/teams/customers")} className="text-[11px] text-primary font-medium hover:underline flex items-center gap-1">
              Open in Teams <ExternalLink className="h-2.5 w-2.5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1.5">
            {customers.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/30 transition-colors cursor-pointer" onClick={() => navigate(`/teams/customers?id=${c.id}`)}>
                <span className="text-[11px] font-semibold text-foreground w-36 truncate">{c.name}</span>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${riskColor[c.risk]}`}>{c.risk}</Badge>
                <span className="text-[10px] text-muted-foreground w-28 truncate">{c.product}</span>
                <div className="flex-1" />
                <span className="text-[10px] text-muted-foreground">{c.openCases} open</span>
                <span className="text-[10px] text-muted-foreground">{c.automationRate}% auto</span>
                <span className="text-[10px] text-muted-foreground">{c.lastActivity}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
