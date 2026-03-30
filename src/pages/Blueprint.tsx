import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Activity, BookOpen, Shield, Users, ArrowRight, Edit2, Heart } from "lucide-react";

const sections = [
  {
    icon: AlertTriangle,
    title: "Support Categories",
    items: [
      { name: "Performance", coverage: 92, cases: 18 },
      { name: "Authentication", coverage: 85, cases: 14 },
      { name: "Data Integrity", coverage: 78, cases: 11 },
      { name: "Connectivity", coverage: 88, cases: 9 },
      { name: "Compliance", coverage: 65, cases: 5 },
      { name: "Integration", coverage: 70, cases: 7 },
    ],
  },
  {
    icon: Activity,
    title: "Signals to Monitor",
    items: [
      { signal: "Worker memory utilization", threshold: "> 85%", status: "active" },
      { signal: "API response time p99", threshold: "> 2s", status: "active" },
      { signal: "Replication lag", threshold: "> 5s", status: "active" },
      { signal: "Error rate", threshold: "> 0.5%", status: "active" },
      { signal: "Queue depth", threshold: "> 10,000", status: "pending" },
      { signal: "Disk I/O saturation", threshold: "> 90%", status: "active" },
      { signal: "Auth token failure rate", threshold: "> 1%", status: "pending" },
    ],
  },
];

const automatedActions = [
  { action: "Scale worker pool", trigger: "Memory > 85%", confidence: 92 },
  { action: "Restart stalled pipeline", trigger: "Throughput = 0 for 5min", confidence: 88 },
  { action: "Rotate auth tokens", trigger: "Token refresh failure", confidence: 95 },
  { action: "Adjust batch size", trigger: "Memory pressure pattern", confidence: 84 },
  { action: "Whitelist traffic pattern", trigger: "False positive alert", confidence: 91 },
];

const approvalActions = [
  { action: "Failover to secondary region", risk: "high", reason: "Potential data loss during WAL replay" },
  { action: "Schema rollback to previous version", risk: "high", reason: "May affect downstream integrations" },
  { action: "Purge and rebuild replication state", risk: "medium", reason: "Temporary service disruption" },
  { action: "Override SLA configuration", risk: "medium", reason: "Customer-facing impact" },
];

const escalationPaths = [
  { from: "AI Agent", to: "Support Engineer", condition: "Confidence < 50%" },
  { from: "Support Engineer", to: "Senior Engineer", condition: "Resolution time > 4hrs" },
  { from: "Senior Engineer", to: "Engineering Lead", condition: "Data loss or compliance issue" },
  { from: "Any level", to: "Customer Success", condition: "Churn risk detected" },
];

export default function Blueprint() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Support Blueprint</h1>
          <p className="text-sm text-muted-foreground mt-0.5">DataSync Pro — AI-generated support system design</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-card">
            <Heart className="h-3.5 w-3.5 text-success" />
            <span className="text-xs font-medium text-foreground">Coverage Score: 82%</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Edit2 className="h-3.5 w-3.5" /> Edit Blueprint</Button>
        </div>
      </div>

      {/* Coverage score bar */}
      <Card className="border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Support Coverage</span>
            <span className="text-sm font-bold text-primary">82%</span>
          </div>
          <Progress value={82} className="h-2" />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-muted-foreground">6 categories · 7 signals · 5 auto-actions · 4 approval gates</span>
            <span className="text-[11px] text-success">+8% from last revision</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {/* Support categories */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Support Categories</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {sections[0].items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground w-28 shrink-0">{item.name}</span>
                <Progress value={item.coverage} className="h-1.5 flex-1" />
                <span className="text-[11px] text-muted-foreground w-8 text-right">{item.coverage}%</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.cases}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Signals to monitor */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Signals to Monitor</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {sections[1].items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded border bg-card">
                <div className="flex items-center gap-2">
                  {item.status === "active" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <span className="text-xs font-medium text-foreground">{item.signal}</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">{item.threshold}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Automated actions */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <CardTitle className="text-sm font-medium">Automated Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {automatedActions.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded border bg-card">
                <div>
                  <p className="text-xs font-medium text-foreground">{a.action}</p>
                  <p className="text-[11px] text-muted-foreground">Trigger: {a.trigger}</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">{a.confidence}% conf</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Approval-required actions */}
        <Card className="border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning" />
              <CardTitle className="text-sm font-medium">Approval-Required Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {approvalActions.map((a, i) => (
              <div key={i} className="p-2 rounded border bg-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground">{a.action}</p>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${a.risk === "high" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/10 text-warning border-warning/20"}`}>{a.risk}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">{a.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Escalation paths */}
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">Escalation Paths</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-3">
            {escalationPaths.map((e, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className="p-3 rounded-lg border bg-card flex-1">
                  <p className="text-[11px] text-muted-foreground">{e.from}</p>
                  <p className="text-xs font-medium text-foreground mt-0.5">{e.condition}</p>
                </div>
                {i < escalationPaths.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
