import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Link, FileText, Play, Sparkles, BookOpen, AlertTriangle, Activity, Shield, Users, ArrowRight } from "lucide-react";

const outputCards = [
  { icon: AlertTriangle, title: "Issue Categories", items: ["Performance Degradation", "Authentication Failures", "Data Integrity", "Connectivity Timeouts", "Plugin Compatibility", "SLA Violations"] },
  { icon: Activity, title: "Failure Modes", items: ["Memory pressure under batch load", "Token refresh race condition", "WAL replay incomplete on failover", "Rate limit cascade in retry loops", "Schema mismatch post-migration"] },
  { icon: Activity, title: "Telemetry to Monitor", items: ["Worker node memory > 85%", "API response time p99 > 2s", "Replication lag > 5s", "Error rate > 0.5%", "Queue depth > 10K", "Disk I/O utilization > 90%"] },
  { icon: BookOpen, title: "Runbooks Generated", items: ["RB-042: Batch Ingestion Memory Pressure", "RB-043: Token Refresh Recovery", "RB-044: Failover Data Recovery", "RB-045: Rate Limit Mitigation", "RB-046: Schema Rollback Procedure"] },
  { icon: Shield, title: "Escalation Rules", items: ["Confidence < 50% → Human review required", "Data loss detected → Immediate escalation", "Compliance category → Auto-escalate to senior", "Customer-triggered + critical → Priority queue", "Resolution time > 4hrs → Manager notification"] },
  { icon: Users, title: "Agent Roles", items: ["Orchestrator: Triage, routing, coordination", "Telemetry Agent: Metrics collection & analysis", "Knowledge Agent: Runbook matching & retrieval", "Customer Context Agent: Deployment awareness", "Resolution Agent: Action planning & execution"] },
];

export default function SupportStudio() {
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Support Studio</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Design your AI support system from product knowledge and deployment context</p>
      </div>

      {/* Input area */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Input Sources</CardTitle>
          <CardDescription className="text-xs">Upload product docs, runbooks, URLs, and customer context to generate a support blueprint</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Upload area */}
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Drop files here</p>
                <p className="text-xs text-muted-foreground mt-1">Product docs, runbooks, architecture diagrams</p>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-[10px]">.pdf</Badge>
                <Badge variant="secondary" className="text-[10px]">.md</Badge>
                <Badge variant="secondary" className="text-[10px]">.docx</Badge>
                <Badge variant="secondary" className="text-[10px]">.yaml</Badge>
              </div>
            </div>

            {/* URL + context inputs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                <input className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Documentation URL (e.g., docs.datasyncpro.io)" defaultValue="https://docs.datasyncpro.io/v4.2" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                <input className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" placeholder="GitHub repo URL" defaultValue="https://github.com/acme/datasync-pro" />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <input className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Deployment notes" defaultValue="AWS multi-region, 24 worker nodes, Oracle + Postgres connectors" />
              </div>
              <textarea
                className="w-full p-3 rounded-lg border bg-card text-sm outline-none placeholder:text-muted-foreground resize-none"
                rows={3}
                placeholder="Additional context about the customer's environment..."
                defaultValue="Customer runs batch ingestion nightly at 2 AM UTC. Peak load ~2.4M records. SLA: 4hr resolution for P1."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleGenerate} disabled={generating} className="gap-2">
              {generating ? (
                <><Sparkles className="h-4 w-4 animate-pulse-subtle" /> Generating Blueprint...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate Support Blueprint</>
              )}
            </Button>
            <Button variant="outline" className="gap-2">
              <Play className="h-4 w-4" /> Define Manually
            </Button>
            {generated && (
              <Button variant="ghost" className="ml-auto gap-2 text-primary" onClick={() => window.location.href = '/blueprint'}>
                View Blueprint <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated output */}
      {generating && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="border animate-pulse">
              <CardContent className="p-5">
                <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3].map(j => <div key={j} className="h-3 bg-muted rounded w-full" />)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {generated && !generating && (
        <div className="grid grid-cols-3 gap-4">
          {outputCards.map((card, i) => (
            <Card key={i} className="border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <card.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {card.items.map((item, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
