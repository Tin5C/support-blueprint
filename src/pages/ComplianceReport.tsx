import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, AlertTriangle, FileText, Loader2, ShieldCheck,
  Download, Clock,
} from "lucide-react";

const periods = ["Last 30 days", "Last 90 days", "Q1 2026", "Full year 2025–2026"];

const complianceDimensions = [
  { dimension: "Governance boundaries", status: "compliant" as const, framework: "Blueprint v2.4", detail: "98.4% adherence" },
  { dimension: "SLA commitments", status: "compliant" as const, framework: "Contract SLA", detail: "92% within SLA" },
  { dimension: "Human oversight frequency", status: "compliant" as const, framework: "FINMA", detail: "312 events" },
  { dimension: "GDPR data deletion", status: "warning" as const, framework: "GDPR Art. 17", detail: "1 open gap — automated coverage gap for archived financial records CS-2047" },
  { dimension: "FINMA AI governance", status: "compliant" as const, framework: "FINMA Circular", detail: "Fully compliant" },
  { dimension: "MiFID II transaction oversight", status: "compliant" as const, framework: "MiFID II", detail: "Fully compliant" },
];

const oversightLog = [
  { caseId: "CS-2041", customer: "Alpina Bank", type: "Approval", actor: "Sarah Chen", action: "Approved forecast model retraining after Q1 data migration", time: "Mar 30, 09:32" },
  { caseId: "CS-2044", customer: "Helvetia Capital", type: "Approval", actor: "Sarah Chen", action: "Approved FX rate feed override + March reconciliation rerun", time: "Mar 30, 05:10" },
  { caseId: "CS-2048", customer: "Zurich Asset Mgmt", type: "Escalation", actor: "Platform Engineering", action: "Escalated — FINMA reporting deadline, automated submission blocked", time: "Mar 30, 02:25" },
  { caseId: "CS-2049", customer: "Zurich Asset Mgmt", type: "Escalation", actor: "Data Engineering + Risk", action: "Escalated — forecast model confidence collapsed, CHF 2.4B affected", time: "Mar 30, 08:10" },
  { caseId: "CS-2051", customer: "Canton Bern Treasury", type: "Auto-approved", actor: "System (96%)", action: "Auto-approved — Q1 tax revenue delay pattern whitelisted", time: "Mar 29, 09:00" },
];

export default function ComplianceReport() {
  const [period, setPeriod] = useState("Last 90 days");
  const [activeTab, setActiveTab] = useState<"summary" | "oversight">("summary");
  const [exporting, setExporting] = useState(false);

  const compliantCount = complianceDimensions.filter(d => d.status === "compliant").length;
  const warningCount = complianceDimensions.filter(d => d.status === "warning").length;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Compliance Report
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            Regulatory compliance evidence and human oversight log
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="h-9 px-3 rounded-md border bg-background text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ borderColor: "rgba(212,207,198,0.4)" }}
          >
            {periods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <Button variant="outline" className="text-[12px] h-9 gap-2 px-4" onClick={handleExport} disabled={exporting}>
            {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
            {exporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Compliant", value: `${compliantCount}/${complianceDimensions.length}`, icon: ShieldCheck, iconClass: "text-emerald-600" },
          { label: "Warnings", value: warningCount, icon: AlertTriangle, iconClass: "text-amber-600" },
          { label: "Oversight Events", value: "312", icon: CheckCircle2, iconClass: "text-primary" },
          { label: "Frameworks", value: "3", icon: FileText, iconClass: "text-primary" },
        ].map((stat, i) => (
          <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</span>
                <stat.icon className={`h-3.5 w-3.5 ${stat.iconClass}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
        {([
          { value: "summary" as const, label: "Compliance summary" },
          { value: "oversight" as const, label: "Human oversight log" },
        ]).map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-[12px] font-medium transition-colors relative ${activeTab === tab.value ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
            {activeTab === tab.value && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
        ))}
      </div>

      {/* Compliance summary tab */}
      {activeTab === "summary" && (
        <div className="space-y-2 animate-fade-in">
          {complianceDimensions.map((dim, i) => (
            <Card key={i} className={`border ${dim.status === "warning" ? "border-l-4 border-l-amber-500" : ""}`} style={{ borderColor: dim.status !== "warning" ? "rgba(212,207,198,0.25)" : undefined, borderTopColor: dim.status === "warning" ? "rgba(212,207,198,0.25)" : undefined, borderRightColor: dim.status === "warning" ? "rgba(212,207,198,0.25)" : undefined, borderBottomColor: dim.status === "warning" ? "rgba(212,207,198,0.25)" : undefined }}>
              <CardContent className="p-3.5 flex items-center gap-3">
                {dim.status === "compliant" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground">{dim.dimension}</p>
                  <p className="text-[10px] text-muted-foreground">{dim.detail}</p>
                </div>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {dim.framework}
                </Badge>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 shrink-0 ${
                  dim.status === "compliant"
                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-700 border-amber-500/20"
                }`}>
                  {dim.status === "compliant" ? "Compliant" : "Warning"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Human oversight log tab */}
      {activeTab === "oversight" && (
        <div className="space-y-2 animate-fade-in">
          {oversightLog.map((event, i) => (
            <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-3.5 flex items-center gap-3">
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 shrink-0 ${
                  event.type === "Approval"
                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                    : event.type === "Escalation"
                      ? "bg-amber-500/10 text-amber-700 border-amber-500/20"
                      : "bg-primary/10 text-primary border-primary/20"
                }`}>
                  {event.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{event.caseId}</span>
                    <span className="text-[11px] text-muted-foreground">{event.customer}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{event.action}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">{event.actor}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
                    <Clock className="h-2.5 w-2.5" />{event.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          <p className="text-[11px] text-muted-foreground pt-2">
            Full oversight log exportable as compliance artifact via Export PDF
          </p>
        </div>
      )}
    </div>
  );
}
