import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Zap, Copy, Clock, Users, CheckCircle2 } from "lucide-react";

const templates = [
  { name: "SaaS Platform Support", description: "Multi-tenant SaaS with API integrations, SSO, and webhook-driven workflows", categories: 8, signals: 12, runbooks: 10, deployments: 3, updated: "Mar 28, 2026" },
  { name: "AI Agent Runtime", description: "LLM-powered agent deployments with observability, guardrails, and fallback chains", categories: 6, signals: 9, runbooks: 7, deployments: 1, updated: "Mar 25, 2026" },
  { name: "Data Pipeline Platform", description: "ETL/ELT pipelines with batch ingestion, CDC, schema management, and connectors", categories: 7, signals: 11, runbooks: 9, deployments: 2, updated: "Mar 22, 2026" },
  { name: "Infrastructure Monitoring", description: "Cloud infrastructure with auto-scaling, failover, and compliance requirements", categories: 9, signals: 15, runbooks: 12, deployments: 0, updated: "Mar 18, 2026" },
  { name: "Embedded Analytics", description: "Customer-facing dashboards with data refresh, export, and permission management", categories: 5, signals: 7, runbooks: 5, deployments: 0, updated: "Mar 12, 2026" },
];

export default function Templates() {
  return (
    <div className="p-6 space-y-6 max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Blueprint Templates</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Start from proven support system designs — customize for your product and customers</p>
        </div>
        <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" /> Create Template</Button>
      </div>

      <div className="space-y-3">
        {templates.map((t, i) => (
          <Card key={i} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                    {t.deployments > 0 && <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">{t.deployments} active</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{t.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span>{t.categories} categories</span>
                    <span>·</span>
                    <span>{t.signals} signals</span>
                    <span>·</span>
                    <span>{t.runbooks} runbooks</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.updated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs"><Copy className="h-3 w-3" /> Duplicate</Button>
                  <Button size="sm" className="gap-1.5 h-8 text-xs"><Zap className="h-3 w-3" /> Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
