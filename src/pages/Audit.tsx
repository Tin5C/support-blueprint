import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle, CheckCircle2, Clock, FileText, Loader2,
  ShieldCheck, ExternalLink,
} from "lucide-react";

const evidenceItems = [
  { name: "Case audit trail", status: "ready" as const, detail: "1,847 cases" },
  { name: "Blueprint version history", status: "ready" as const, detail: "4 versions" },
  { name: "Governance compliance summary", status: "ready" as const, detail: "98.4% adherence" },
  { name: "SLA performance report", status: "ready" as const, detail: "11 customers" },
  { name: "Human oversight frequency", status: "ready" as const, detail: "312 events" },
  { name: "Regulatory framework adherence", status: "collecting" as const, detail: "3 frameworks" },
  { name: "Re-evaluation reports", status: "ready" as const, detail: "2 reports" },
];

const auditHistory = [
  { date: "March 2025", auditor: "KPMG Switzerland", result: "Certified — with recommendations", condition: "Improve GDPR deletion coverage for archived records" },
  { date: "March 2024", auditor: "KPMG Switzerland", result: "Certified", condition: null },
];

export default function Audit() {
  const [exporting, setExporting] = useState(false);
  const readyCount = evidenceItems.filter(e => e.status === "ready").length;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Annual Audit
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Independent third-party audit — evidence preparation and history
        </p>
      </div>

      {/* Warning banner */}
      <Card className="border-l-4 border-l-amber-500 bg-amber-500/[0.03] border" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
        <CardContent className="p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-foreground">Next audit in 68 days — June 14, 2026</p>
            <p className="text-[11px] text-muted-foreground">KPMG Switzerland · FINMA + GDPR scope · Contoso Digital</p>
          </div>
          <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 text-[10px] px-2 py-0.5 shrink-0">68 days</Badge>
        </CardContent>
      </Card>

      {/* Evidence package */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Evidence package</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">Auto-assembled from the year's logged data</p>
          </div>
          <Button className="text-[12px] h-9 gap-2 px-4" onClick={handleExport} disabled={exporting}>
            {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileText className="h-3.5 w-3.5" />}
            {exporting ? "Exporting..." : "Export audit package"}
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-1">
          <Progress value={(readyCount / evidenceItems.length) * 100} className="h-2 flex-1" />
          <span className="text-[11px] text-muted-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            {readyCount}/{evidenceItems.length} ready
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {evidenceItems.map((item, i) => (
            <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-3 flex items-center gap-3">
                {item.status === "ready" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <Loader2 className="h-4 w-4 text-amber-600 animate-spin shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                </div>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 shrink-0 ${
                  item.status === "ready"
                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-700 border-amber-500/20"
                }`}>
                  {item.status === "ready" ? "Ready" : "Collecting"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Audit history */}
      <div className="space-y-3">
        <h2 className="text-[14px] font-semibold text-foreground">Audit history</h2>
        <div className="space-y-2">
          {auditHistory.map((audit, i) => (
            <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-[13px] font-semibold text-foreground">{audit.date}</span>
                    <span className="text-[11px] text-muted-foreground">· {audit.auditor}</span>
                  </div>
                  <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${
                    audit.condition
                      ? "bg-amber-500/10 text-amber-700 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                  }`}>
                    {audit.result}
                  </Badge>
                </div>
                {audit.condition && (
                  <p className="text-[11px] text-muted-foreground ml-6 mt-1">
                    Condition: {audit.condition}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Open remediation */}
      <Card className="border-l-4 border-l-amber-500 border" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-foreground">Open recommendation from March 2025</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Improve GDPR deletion coverage for archived records
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-700 border-amber-500/20">In progress</Badge>
                <Link to="/teams/cases" className="text-[11px] text-primary hover:underline flex items-center gap-1">
                  View CS-2050 <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
