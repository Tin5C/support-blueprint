import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Bot, Globe, CheckCircle2 } from "lucide-react";

export default function Admin() {
  return (
    <div className="p-6 space-y-5 max-w-[1100px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Admin</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">Manage integrations, team access, and agent configuration</p>
      </div>

      <Card className="border">
        <CardHeader className="pb-2">
          <CardTitle className="text-[13px] font-semibold">Integrations</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {[
            { name: "Microsoft Teams", status: "connected", detail: "5 customer channels, support bots deployed" },
            { name: "GitHub", status: "connected", detail: "3 repositories linked for knowledge ingestion" },
            { name: "Datadog", status: "connected", detail: "Product telemetry forwarded, 9 monitors active" },
            { name: "PagerDuty", status: "pending", detail: "Escalation routing configured, awaiting activation" },
            { name: "Salesforce", status: "not-connected", detail: "CRM context enrichment available" },
          ].map((int, i) => (
            <div key={i} className="flex items-center gap-3.5 p-3 rounded-lg border bg-card animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-foreground">{int.name}</p>
                <p className="text-[10px] text-muted-foreground">{int.detail}</p>
              </div>
              {int.status === "connected" ? (
                <Badge variant="outline" className="text-[9px] status-success border gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> Connected</Badge>
              ) : int.status === "pending" ? (
                <Badge variant="outline" className="text-[9px] status-warning border">Pending</Badge>
              ) : (
                <Button size="sm" variant="outline" className="h-7 text-[10px]">Connect</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-semibold flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Team</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {[
              { name: "Sarah Chen", role: "Admin", email: "sarah@company.com" },
              { name: "Marcus Webb", role: "Senior Engineer", email: "marcus@company.com" },
              { name: "Alex Kim", role: "Support Engineer", email: "alex@company.com" },
              { name: "Priya Patel", role: "Support Engineer", email: "priya@company.com" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-md border bg-card">
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground">{m.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-foreground">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{m.email}</p>
                </div>
                <Badge variant="secondary" className="text-[9px]">{m.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-semibold flex items-center gap-2"><Bot className="h-3.5 w-3.5" /> Agent Configuration</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {[
              { label: "Auto-approval threshold", value: "80%", desc: "Actions above this confidence execute automatically" },
              { label: "Max concurrent cases", value: "10", desc: "Queue overflow triggers load balancing" },
              { label: "Escalation timeout", value: "4 hours", desc: "Cases auto-escalate after this duration" },
              { label: "Knowledge refresh", value: "6 hours", desc: "How often agents re-index documentation" },
            ].map((c, i) => (
              <div key={i} className="p-3 rounded-md border bg-card">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-medium text-foreground">{c.label}</p>
                  <Badge variant="outline" className="text-[9px] font-mono">{c.value}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
