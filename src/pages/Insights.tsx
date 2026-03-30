import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, FileText, Activity, BookOpen, AlertTriangle, ArrowUpRight } from "lucide-react";

const patternData = [
  { category: "Memory Pressure", count: 18, automated: 14, manual: 4 },
  { category: "Auth Failures", count: 14, automated: 12, manual: 2 },
  { category: "Replication Lag", count: 11, automated: 7, manual: 4 },
  { category: "Plugin Compat.", count: 9, automated: 3, manual: 6 },
  { category: "SLA Violations", count: 7, automated: 4, manual: 3 },
];

const churnRisk = [
  { name: "Sterling Logistics", score: 82, reason: "5 open critical cases, 3 data incidents in 30 days", trend: "rising" },
  { name: "NovaTech Industries", score: 45, reason: "Repeated SLA misses, plugin compatibility friction", trend: "stable" },
];

const docGaps = [
  { topic: "Cross-region failover recovery procedures", priority: "high", affected: 3 },
  { topic: "Custom plugin upgrade compatibility matrix", priority: "high", affected: 2 },
  { topic: "Batch size optimization guidelines by data volume", priority: "medium", affected: 4 },
  { topic: "Audit log retention and compliance requirements", priority: "medium", affected: 1 },
  { topic: "Token refresh configuration for federated auth", priority: "low", affected: 2 },
];

const telemetryGaps = [
  "WAL replay completion percentage during failover",
  "Per-connector query latency breakdown",
  "Worker node garbage collection pressure",
  "Schema migration rollback success rate",
];

const playbookImprovements = [
  { playbook: "RB-042: Batch Ingestion Memory Pressure", issue: "Missing step for streaming mode activation", impact: "3 cases required manual intervention" },
  { playbook: "RB-044: Failover Data Recovery", issue: "WAL replay verification not included", impact: "Data loss in 1 incident" },
  { playbook: "RB-045: Rate Limit Mitigation", issue: "No guidance for cascading retry loops", impact: "2 cases stuck in retry" },
];

const weeklyTrend = [
  { week: "W10", automation: 76, satisfaction: 4.1, resolution: 3.2 },
  { week: "W11", automation: 78, satisfaction: 4.0, resolution: 2.9 },
  { week: "W12", automation: 79, satisfaction: 4.2, resolution: 2.7 },
  { week: "W13", automation: 81, satisfaction: 4.3, resolution: 2.4 },
];

export default function Insights() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Insights & Learning</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Continuous improvement recommendations from AI analysis</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Issue patterns chart */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Recurring Issue Patterns</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patternData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={100} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="automated" stackId="a" fill="hsl(var(--primary))" name="Automated" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="manual" stackId="a" fill="hsl(var(--warning))" name="Manual" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trends */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Weekly Trends</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="automation" stroke="hsl(var(--primary))" name="Automation %" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolution" stroke="hsl(var(--success))" name="Avg Resolution (hrs)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Documentation gaps */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-warning" />
              <CardTitle className="text-sm font-medium">Documentation Gaps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {docGaps.map((d, i) => (
              <div key={i} className="flex items-start justify-between p-2 rounded border bg-card">
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{d.topic}</p>
                  <p className="text-[11px] text-muted-foreground">{d.affected} customers affected</p>
                </div>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 shrink-0 ${d.priority === "high" ? "bg-destructive/10 text-destructive border-destructive/20" : d.priority === "medium" ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}`}>{d.priority}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Telemetry additions */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-info" />
              <CardTitle className="text-sm font-medium">Recommended Telemetry</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {telemetryGaps.map((t, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded border bg-card">
                <div className="h-2 w-2 rounded-full bg-info shrink-0" />
                <p className="text-xs text-foreground">{t}</p>
              </div>
            ))}

            <div className="pt-3 border-t mt-3">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">Playbooks Needing Improvement</p>
              </div>
              {playbookImprovements.map((p, i) => (
                <div key={i} className="p-2 rounded border bg-card mb-2">
                  <p className="text-xs font-semibold text-foreground">{p.playbook}</p>
                  <p className="text-[11px] text-destructive mt-0.5">{p.issue}</p>
                  <p className="text-[11px] text-muted-foreground">{p.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Churn risk */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <CardTitle className="text-sm font-medium">Customers at Churn Risk</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4">
            {churnRisk.map((c, i) => (
              <div key={i} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                    Risk: {c.score}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{c.reason}</p>
                <div className="flex items-center gap-1 mt-2 text-[11px] text-destructive">
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
