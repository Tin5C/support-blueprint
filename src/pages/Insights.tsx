import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, FileText, Activity, BookOpen, AlertTriangle, ArrowUpRight } from "lucide-react";

const patternData = [
  { category: "Config Drift", count: 22, automated: 16, manual: 6 },
  { category: "AI Accuracy", count: 16, automated: 11, manual: 5 },
  { category: "Replication Lag", count: 13, automated: 8, manual: 5 },
  { category: "Connector Issues", count: 11, automated: 7, manual: 4 },
  { category: "Approval Routing", count: 8, automated: 6, manual: 2 },
];

const churnRisk = [
  { name: "HelioWorks AG", score: 82, reason: "3 open critical cases, GDPR compliance risk, health score 38", trend: "rising" },
  { name: "Contoso Digital", score: 45, reason: "Invoice pipeline delays, AI accuracy drop, 3 active cases", trend: "stable" },
];

const docGaps = [
  { topic: "Cross-region failover recovery procedures", priority: "high", affected: 3 },
  { topic: "Configuration drift detection and remediation", priority: "high", affected: 4 },
  { topic: "Multi-currency batch processing guidelines", priority: "medium", affected: 2 },
  { topic: "GDPR data deletion for archived records", priority: "medium", affected: 1 },
  { topic: "Constraint solver policy sync procedures", priority: "low", affected: 2 },
];

const telemetryGaps = [
  "Customer-specific configuration change tracking",
  "AI model prediction freshness monitoring",
  "Approval workflow chain validation",
  "Per-connector batch processing memory profiling",
];

const playbookImprovements = [
  { playbook: "RB-118: Config Drift Remediation", issue: "Missing guardrail step for future prevention", impact: "2 cases needed manual follow-up" },
  { playbook: "RB-045: Batch Processing Recovery", issue: "No multi-currency split guidance", impact: "Pipeline stall at Contoso" },
  { playbook: "RB-092: Replication Recovery", issue: "WAL replay verification missing", impact: "Data integrity risk at HelioWorks" },
];

const weeklyTrend = [
  { week: "W10", automation: 72, resolution: 2.8 },
  { week: "W11", automation: 74, resolution: 2.5 },
  { week: "W12", automation: 76, resolution: 2.1 },
  { week: "W13", automation: 76, resolution: 1.8 },
];

export default function Insights() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Insights & Learning</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">Continuous improvement recommendations from AI analysis — feeds back into your blueprints</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-[13px] font-semibold">Recurring Issue Patterns</CardTitle>
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
                  <Bar dataKey="manual" stackId="a" fill="hsl(var(--warning))" name="Manual" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-[13px] font-semibold">Weekly Trends</CardTitle>
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
                  <Line type="monotone" dataKey="resolution" stroke="hsl(var(--success))" name="Resolution (hrs)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-warning" />
              <CardTitle className="text-[13px] font-semibold">Documentation Gaps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {docGaps.map((d, i) => (
              <div key={i} className="flex items-start justify-between p-2.5 rounded-md border bg-card">
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-foreground">{d.topic}</p>
                  <p className="text-[10px] text-muted-foreground">{d.affected} customers affected</p>
                </div>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 shrink-0 ${d.priority === "high" ? "status-danger" : d.priority === "medium" ? "status-warning" : "status-neutral"}`}>{d.priority}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-info" />
              <CardTitle className="text-[13px] font-semibold">Recommended Telemetry</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {telemetryGaps.map((t, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-md border bg-card">
                <div className="h-1.5 w-1.5 rounded-full bg-info shrink-0" />
                <p className="text-[11px] text-foreground">{t}</p>
              </div>
            ))}

            <div className="pt-3 border-t mt-3">
              <div className="flex items-center gap-2 mb-2.5">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                <p className="text-[13px] font-semibold text-foreground">Playbooks Needing Improvement</p>
              </div>
              {playbookImprovements.map((p, i) => (
                <div key={i} className="p-2.5 rounded-md border bg-card mb-1.5">
                  <p className="text-[11px] font-semibold text-foreground">{p.playbook}</p>
                  <p className="text-[10px] text-destructive mt-0.5">{p.issue}</p>
                  <p className="text-[10px] text-muted-foreground">{p.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
            <CardTitle className="text-[13px] font-semibold">Customers at Churn Risk</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3">
            {churnRisk.map((c, i) => (
              <div key={i} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-semibold text-foreground">{c.name}</p>
                  <Badge variant="outline" className="status-danger text-[10px]">Risk: {c.score}%</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{c.reason}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-destructive">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>Trend: {c.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
