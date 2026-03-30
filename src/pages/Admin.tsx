import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Users, Shield, Key, Globe, Bell, Bot, ExternalLink, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Admin() {
  return (
    <div className="p-6 space-y-6 max-w-[1100px] mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Admin</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage integrations, team access, and system configuration</p>
      </div>

      {/* Integration status */}
      <Card className="border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Integrations</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {[
            { name: "Microsoft Teams", status: "connected", detail: "5 customer channels active, support bots deployed", icon: Globe },
            { name: "GitHub", status: "connected", detail: "3 repositories linked for knowledge ingestion", icon: Globe },
            { name: "Datadog", status: "connected", detail: "Product telemetry forwarded, 9 monitors active", icon: Globe },
            { name: "PagerDuty", status: "pending", detail: "Escalation routing configured, awaiting activation", icon: Globe },
            { name: "Salesforce", status: "not-connected", detail: "CRM context enrichment available", icon: Globe },
          ].map((int, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <int.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{int.name}</p>
                <p className="text-[11px] text-muted-foreground">{int.detail}</p>
              </div>
              {int.status === "connected" ? (
                <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20 gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> Connected</Badge>
              ) : int.status === "pending" ? (
                <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">Pending</Badge>
              ) : (
                <Button size="sm" variant="outline" className="h-7 text-xs">Connect</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2"><Users className="h-4 w-4" /> Team</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {[
              { name: "Jane Doe", role: "Admin", email: "jane@company.com" },
              { name: "Alex Chen", role: "Support Engineer", email: "alex@company.com" },
              { name: "Maria Santos", role: "Senior Engineer", email: "maria@company.com" },
              { name: "James Wilson", role: "Support Engineer", email: "james@company.com" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded border bg-card">
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">{m.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{m.email}</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">{m.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2"><Bot className="h-4 w-4" /> Support Agent Configuration</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {[
              { label: "Auto-approval threshold", value: "80%", desc: "Actions above this confidence execute automatically" },
              { label: "Max concurrent cases per agent", value: "10", desc: "Queue overflow triggers load balancing" },
              { label: "Escalation timeout", value: "4 hours", desc: "Cases auto-escalate after this duration" },
              { label: "Knowledge refresh interval", value: "6 hours", desc: "How often agents re-index product documentation" },
            ].map((c, i) => (
              <div key={i} className="p-3 rounded border bg-card">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-medium text-foreground">{c.label}</p>
                  <Badge variant="outline" className="text-[10px] font-mono">{c.value}</Badge>
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
