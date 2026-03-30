import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, FileText, Activity, BookOpen, AlertTriangle, ArrowUpRight, Shield, CheckCircle2, Users } from "lucide-react";

const patternData = [
  { category: "Config Drift", count: 22, automated: 16, manual: 6 },
  { category: "AI Accuracy", count: 16, automated: 11, manual: 5 },
  { category: "Replication Lag", count: 13, automated: 8, manual: 5 },
  { category: "Connector Issues", count: 11, automated: 7, manual: 4 },
  { category: "Approval Routing", count: 8, automated: 6, manual: 2 },
];

const weeklyTrend = [
  { week: "W10", automation: 72, escalations: 8, approvals: 12 },
  { week: "W11", automation: 74, escalations: 6, approvals: 10 },
  { week: "W12", automation: 76, escalations: 5, approvals: 9 },
  { week: "W13", automation: 76, escalations: 4, approvals: 8 },
];

const topEscalationCauses = [
  { cause: "Data integrity risk — confidence too low for auto-resolution", count: 5, trend: "down" },
  { cause: "GDPR/compliance actions requiring human judgment", count: 4, trend: "stable" },
  { cause: "Cross-region failover beyond automated scope", count: 3, trend: "down" },
  { cause: "Customer explicitly requested human support", count: 3, trend: "stable" },
  { cause: "Novel failure mode not covered by existing runbooks", count: 2, trend: "up" },
];

const topApprovalActions = [
  { action: "Bulk data operations (merge, delete, migrate)", count: 6, avgWait: "18 min" },
  { action: "Infrastructure scaling beyond baseline", count: 4, avgWait: "12 min" },
  { action: "Configuration rollback affecting production", count: 3, avgWait: "25 min" },
  { action: "Permission/access changes", count: 2, avgWait: "8 min" },
];

const blueprintGaps = [
  { gap: "Cross-region failover recovery — no runbook for multi-region WAL replay", priority: "high", discovered: "From CS-2049 escalation" },
  { gap: "Multi-currency batch processing — missing split-by-currency guidance", priority: "high", discovered: "From CS-2046 approval delay" },
  { gap: "GDPR archived record deletion — no automated coverage", priority: "medium", discovered: "From CS-2050 escalation" },
  { gap: "Constraint solver policy sync — undocumented upgrade path", priority: "medium", discovered: "From CS-2045 telemetry" },
];

const playbookImprovements = [
  { playbook: "RB-118: Config Drift Remediation", issue: "Missing guardrail step for future prevention", impact: "2 cases needed manual follow-up" },
  { playbook: "RB-045: Batch Processing Recovery", issue: "No multi-currency split guidance", impact: "Pipeline stall at Contoso" },
  { playbook: "RB-092: Replication Recovery", issue: "WAL replay verification missing", impact: "Data integrity risk at HelioWorks" },
];

export default function Insights() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Operational Insights</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">How is the support system improving? Escalation drivers, approval bottlenecks, and blueprint gaps feed back into your support logic.</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Automation Rate", value: "76%", change: "+4% over 4 weeks", icon: CheckCircle2, positive: true },
          { label: "Escalation Rate", value: "11%", change: "−3% over 4 weeks", icon: ArrowUpRight, positive: true },
          { label: "Avg Approval Wait", value: "16 min", change: "−8 min vs last month", icon: Shield, positive: true },
          { label: "Human Workload", value: "−22%", change: "vs same period last quarter", icon: Users, positive: true },
        ].map((kpi, i) => (
          <Card key={i} className="kpi-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                <kpi.icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-xl font-bold text-foreground tracking-tight">{kpi.value}</p>
              <p className="text-[10px] mt-1 text-success flex items-center gap-1">
                <TrendingDown className="h-3 w-3" /> {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Weekly trend */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-[13px] font-semibold">Automation vs Escalation Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="automation" stroke="hsl(var(--primary))" name="Automation %" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="escalations" stroke="hsl(var(--destructive))" name="Escalations" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="approvals" stroke="hsl(var(--warning))" name="Approvals" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Issue patterns */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-[13px] font-semibold">Issue Patterns — Auto vs Manual</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patternData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={90} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="automated" stackId="a" fill="hsl(var(--primary))" name="Automated" />
                  <Bar dataKey="manual" stackId="a" fill="hsl(var(--warning))" name="Required Human" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Top escalation causes */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-3.5 w-3.5 text-destructive" />
              <CardTitle className="text-[13px] font-semibold">Top Escalation Causes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {topEscalationCauses.map((e, i) => (
              <div key={i} className="flex items-start justify-between p-2.5 rounded-md border bg-card">
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-foreground">{e.cause}</p>
                  <p className="text-[10px] text-muted-foreground">{e.count} escalations this month</p>
                </div>
                {e.trend === "down" ? <TrendingDown className="h-3 w-3 text-success shrink-0 mt-1" /> :
                 e.trend === "up" ? <TrendingUp className="h-3 w-3 text-destructive shrink-0 mt-1" /> :
                 <span className="text-[10px] text-muted-foreground shrink-0">stable</span>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top approval actions */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-warning" />
              <CardTitle className="text-[13px] font-semibold">Approval Bottlenecks</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {topApprovalActions.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-md border bg-card">
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-foreground">{a.action}</p>
                  <p className="text-[10px] text-muted-foreground">{a.count} approvals · avg wait {a.avgWait}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Blueprint gaps discovered from execution */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-warning" />
            <CardTitle className="text-[13px] font-semibold">Blueprint Gaps Discovered from Execution</CardTitle>
            <Badge variant="secondary" className="text-[10px] ml-auto">{blueprintGaps.length} gaps</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-1.5">
          {blueprintGaps.map((g, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-md border bg-card">
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-foreground">{g.gap}</p>
                <p className="text-[10px] text-muted-foreground">{g.discovered}</p>
              </div>
              <Badge variant="outline" className={`text-[9px] px-1.5 py-0 shrink-0 ${g.priority === "high" ? "status-danger" : "status-warning"}`}>{g.priority}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Playbook improvements */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <CardTitle className="text-[13px] font-semibold">Runbook Improvements Needed</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-1.5">
          {playbookImprovements.map((p, i) => (
            <div key={i} className="p-2.5 rounded-md border bg-card">
              <p className="text-[11px] font-semibold text-foreground">{p.playbook}</p>
              <p className="text-[10px] text-destructive mt-0.5">{p.issue}</p>
              <p className="text-[10px] text-muted-foreground">{p.impact}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
