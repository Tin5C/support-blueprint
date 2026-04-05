import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, Upload, CheckCircle2, ChevronRight, AlertTriangle,
  Shield, Clock, Database, ClipboardCheck, Loader2, Globe,
  Search, Link2, Server, Lock,
} from "lucide-react";

// ─── Types & data ────────────────────────────────────────────

type DocStatus = "available" | "scanning" | "analysed";

interface DocEntry {
  name: string;
  pages: number;
  tag: string;
  tagColor: string;
  status: DocStatus;
}

const initialDocs: DocEntry[] = [
  { name: "Alpina Bank — Vendor Security Questionnaire.pdf", pages: 18, tag: "questionnaire", tagColor: "bg-amber-500/10 text-amber-700 border-amber-500/20", status: "available" },
  { name: "Alpina Bank — IT Security Policy 2025.pdf", pages: 34, tag: "security-policy", tagColor: "bg-rose-500/10 text-rose-700 border-rose-500/20", status: "available" },
  { name: "Alpina Bank — Data Classification Policy.pdf", pages: 12, tag: "data-policy", tagColor: "bg-blue-500/10 text-blue-700 border-blue-500/20", status: "available" },
  { name: "Alpina Bank — IT Operations Runbook v4.pdf", pages: 67, tag: "runbook", tagColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", status: "available" },
];

// Baseline sections keyed by how many docs are analysed
interface BaselineSection {
  label: string;
  icon: typeof Shield;
  status: "found" | "partial" | "missing";
  count: string;
  items: string[];
  source?: string;
}

function getBaseline(websiteAnalysed: boolean, analysedCount: number): BaselineSection[] {
  const security: BaselineSection = {
    label: "Security Requirements", icon: Shield, status: "missing", count: "0", items: [],
  };
  const procurement: BaselineSection = {
    label: "Procurement Requirements", icon: ClipboardCheck, status: "missing", count: "0", items: [],
  };
  const data: BaselineSection = {
    label: "Data Requirements", icon: Database, status: "missing", count: "0", items: [],
  };
  const sla: BaselineSection = {
    label: "SLA Commitments", icon: Clock, status: "missing", count: "0", items: [],
  };
  const aiGov: BaselineSection = {
    label: "AI Governance Framework", icon: Shield, status: "missing", count: "0", items: [],
  };

  if (websiteAnalysed) {
    security.status = "partial";
    security.count = "3 inferred";
    security.items = ["ISO 27001 alignment required", "MFA likely required (financial services norm)", "Encryption at rest and in transit expected"];
    security.source = "alpinabank.ch";
  }

  if (analysedCount >= 1) {
    // Vendor Security Questionnaire
    security.status = "found";
    security.count = "6 detected";
    security.items = ["ISO 27001 alignment · MFA required · AES-256 encryption", "Penetration testing annually · Right to audit", "Incident notification within 4 hours"];
    security.source = "alpinabank.ch + Vendor Security Questionnaire";
    procurement.status = "found";
    procurement.count = "4 detected";
    procurement.items = ["SOC 2 Type II or ISO 27001 cert required", "Annual third-party security audit", "Incident notification within 4 hours", "Right to audit clause in all contracts"];
    procurement.source = "Vendor Security Questionnaire";
  }

  if (analysedCount >= 2) {
    // IT Security Policy
    security.count = "8 detected";
    security.items = ["ISO 27001 alignment · MFA required · AES-256 encryption", "Penetration testing annually · Vulnerability scanning quarterly", "Right to audit · Incident notification 4hrs", "Approved vendor list required · Change management approval"];
    security.source = "alpinabank.ch + IT Security Policy 2025";
  }

  if (analysedCount >= 3) {
    // Data Classification Policy
    data.status = "found";
    data.count = "4 detected";
    data.items = ["Financial data classified as Tier 1 (highest sensitivity)", "Tier 1 data must remain in Switzerland", "GDPR Article 28 DPA required before processing", "Retention: 10 years for financial records (FINMA)"];
    data.source = "Data Classification Policy";
  }

  if (analysedCount >= 4) {
    // IT Operations Runbook
    sla.status = "found";
    sla.count = "5 detected";
    sla.items = ["P1: 1hr acknowledgement / 4hr resolution", "P2: 4hr acknowledgement / next business day", "System availability: 99.9% uptime required", "Maintenance windows: Sundays 02:00–06:00 CET only", "24/7 monitoring for Tier 1 systems"];
    sla.source = "IT Operations Runbook v4";
  }

  return [security, sla, data, procurement, aiGov];
}

function getCoverage(websiteAnalysed: boolean, analysedCount: number): number {
  if (!websiteAnalysed) return 0;
  const base = 45;
  const perDoc = [15, 8, 12, 8]; // coverage added per doc
  let c = base;
  for (let i = 0; i < analysedCount && i < perDoc.length; i++) c += perDoc[i];
  return c;
}

const frameworks = ["FINMA", "GDPR", "ISO 27001", "EU AI Act"];

const connectedSystems = [
  { icon: Lock, label: "Azure AD", sub: "real MFA adoption and access control" },
  { icon: Server, label: "ServiceNow / Jira SM", sub: "real SLA performance history" },
  { icon: Shield, label: "GRC platform", sub: "existing risk register and audit findings" },
];

// ─── Component ───────────────────────────────────────────────

export default function EnterpriseContext() {
  const navigate = useNavigate();
  const [websiteAnalysed, setWebsiteAnalysed] = useState(false);
  const [websiteLoading, setWebsiteLoading] = useState(false);
  const [docs, setDocs] = useState<DocEntry[]>(initialDocs.map(d => ({ ...d })));

  const analysedCount = docs.filter(d => d.status === "analysed").length;
  const baseline = getBaseline(websiteAnalysed, analysedCount);
  const coverage = getCoverage(websiteAnalysed, analysedCount);
  const allDocsAnalysed = analysedCount === docs.length;

  const analyseWebsite = () => {
    setWebsiteLoading(true);
    setTimeout(() => {
      setWebsiteLoading(false);
      setWebsiteAnalysed(true);
    }, 1800);
  };

  const addDocument = (index: number) => {
    setDocs(prev => {
      const next = [...prev];
      next[index] = { ...next[index], status: "scanning" };
      return next;
    });
    setTimeout(() => {
      setDocs(prev => {
        const next = [...prev];
        next[index] = { ...next[index], status: "analysed" };
        return next;
      });
    }, 1500);
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Enterprise Context
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Step 0 — Establish what enterprise-ready means for this deployment environment
        </p>
      </div>

      {/* ISV banner */}
      <Card className="border-l-4 border-l-primary bg-primary/[0.03] border" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
        <CardContent className="p-3">
          <p className="text-[13px] font-medium text-foreground">FinTrack AG · ISV workspace · Evaluating deployment environment for Alpina Bank</p>
        </CardContent>
      </Card>

      {/* ═══ TWO COLUMNS ═══ */}
      <div className="flex gap-6">
        {/* ── LEFT COLUMN (45%) ── */}
        <div className="w-[45%] shrink-0 space-y-5">

          {/* Section 1 — Deployment environment */}
          <div className="space-y-3">
            <h2 className="text-[14px] font-semibold text-foreground">Deployment environment</h2>

            {!websiteAnalysed && !websiteLoading ? (
              <>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. alpinabank.ch or Alpina Bank"
                      className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      style={{ borderColor: "rgba(212,207,198,0.4)" }}
                      readOnly
                    />
                  </div>
                  <Button className="h-10 text-[13px] gap-1.5 px-4 shrink-0" onClick={analyseWebsite}>
                    Analyse <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Launch Studio will infer industry, geography, regulatory context and certification status
                </p>
                <button onClick={analyseWebsite} className="text-[11px] text-primary hover:underline">
                  → Load Alpina Bank demo
                </button>
              </>
            ) : websiteLoading ? (
              <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                <CardContent className="p-4 flex items-center gap-3">
                  <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-foreground">Analysing alpinabank.ch...</p>
                    <p className="text-[11px] text-muted-foreground">Detecting industry, geography, certifications</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-foreground">alpinabank.ch analysed</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">Alpina Bank · Swiss private bank · Zürich, Switzerland</p>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0">Financial Services</Badge>
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0">250–500 employees</Badge>
                      </div>
                      <div className="mt-2.5 space-y-1">
                        {[
                          "FINMA supervised (Swiss financial regulator)",
                          "GDPR applicable (EU customer data)",
                          "ISO 27001 certified (detected from public profile)",
                          "Azure infrastructure signals detected",
                        ].map((s, i) => (
                          <p key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-primary mt-[6px] shrink-0" />
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Section 2 — Documents */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className={`text-[14px] font-semibold ${websiteAnalysed ? "text-foreground" : "text-muted-foreground/50"}`}>Documents</h2>
              {!websiteAnalysed && (
                <span className="text-[10px] text-muted-foreground">Complete Step 1 first</span>
              )}
            </div>

            {websiteAnalysed ? (
              <>
                <p className="text-[11px] text-muted-foreground">Upload documents from the deployment environment to improve accuracy</p>

                {/* Demo document cards */}
                <div className="space-y-2">
                  {docs.map((doc, i) => (
                    <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium text-foreground truncate">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-muted-foreground">{doc.pages} pages</span>
                            <Badge variant="outline" className={`text-[9px] px-1 py-0 border ${doc.tagColor}`} style={{ fontFamily: "'DM Mono', monospace" }}>
                              {doc.tag}
                            </Badge>
                          </div>
                        </div>
                        {doc.status === "available" && (
                          <Button variant="outline" size="sm" className="text-[10px] h-7 px-2.5 shrink-0" onClick={() => addDocument(i)}>
                            + Add
                          </Button>
                        )}
                        {doc.status === "scanning" && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border bg-primary/10 text-primary border-primary/20 shrink-0">
                            <Loader2 className="h-2.5 w-2.5 mr-1 animate-spin" />
                            Scanning…
                          </Badge>
                        )}
                        {doc.status === "analysed" && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border bg-emerald-500/10 text-emerald-700 border-emerald-500/20 shrink-0">
                            <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                            Analysed
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Real upload area */}
                <div className="border-2 border-dashed rounded-md p-5 text-center cursor-pointer hover:bg-muted/20 transition-colors" style={{ borderColor: "rgba(212,207,198,0.3)" }}>
                  <Upload className="h-4 w-4 text-muted-foreground/50 mx-auto mb-1" />
                  <p className="text-[11px] text-muted-foreground">Or drop your own documents here</p>
                </div>
              </>
            ) : (
              <>
                <p className="text-[11px] text-muted-foreground/50">Upload documents from the deployment environment</p>
                <div className="border-2 border-dashed rounded-md p-6 text-center opacity-40" style={{ borderColor: "rgba(212,207,198,0.2)" }}>
                  <Upload className="h-4 w-4 text-muted-foreground/30 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground/50">Security policies · IT runbooks · SLA agreements · Vendor questionnaires · Data classification policies</p>
                </div>
              </>
            )}
          </div>

          {/* Section 3 — Connected systems */}
          <div className="space-y-3">
            <h2 className="text-[14px] font-semibold text-foreground">Connected systems</h2>
            <p className="text-[11px] text-muted-foreground">Connect systems for higher confidence baseline</p>
            <div className="space-y-1.5">
              {connectedSystems.map((sys, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-md border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                  <sys.icon className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-foreground/70">{sys.label}</p>
                    <p className="text-[10px] text-muted-foreground/60">{sys.sub}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-muted-foreground/50 border-muted-foreground/20">Coming soon</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (55%) ── */}
        <div className="flex-1 space-y-4">

          {/* Empty state */}
          {!websiteAnalysed && !websiteLoading && (
            <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="py-16 text-center">
                <Globe className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-[13px] text-muted-foreground">Enter the deployment environment to begin</p>
                <p className="text-[11px] text-muted-foreground mt-1">Coverage: 0%</p>
              </CardContent>
            </Card>
          )}

          {/* Loading state */}
          {websiteLoading && (
            <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="py-16 text-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
                <p className="text-[13px] text-muted-foreground">Analysing deployment environment...</p>
              </CardContent>
            </Card>
          )}

          {/* Live baseline */}
          {websiteAnalysed && (
            <div className="space-y-4 animate-fade-in">
              {/* Coverage score */}
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-16 rounded-full border-4 flex items-center justify-center shrink-0"
                  style={{ borderColor: coverage >= 80 ? "hsl(var(--success))" : "hsl(var(--warning))" }}
                >
                  <span className="text-lg font-bold text-foreground">{coverage}%</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">Baseline coverage</p>
                  <p className="text-[11px] text-muted-foreground">
                    {coverage < 80
                      ? "Add documents to complete your baseline"
                      : allDocsAnalysed
                        ? "Baseline established — ready to proceed"
                        : "Good coverage — add more documents for higher confidence"}
                  </p>
                </div>
              </div>

              {/* Detected frameworks */}
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Detected Frameworks
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {frameworks.map(fw => (
                    <Badge key={fw} className="bg-primary/10 text-primary border-primary/20 text-[10px] px-2 py-0.5 font-medium">{fw}</Badge>
                  ))}
                </div>
              </div>

              {/* Regulatory context (website only) */}
              {analysedCount === 0 && (
                <div className="animate-fade-in">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Regulatory Context
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "FINMA supervised — financial services regulation applies",
                      "GDPR — EU customer data processing obligations",
                      "EU AI Act — HIGH RISK likely (financial recommendations)",
                      "ISO 27001 — certification detected",
                    ].map((item, i) => (
                      <p key={i} className="text-[12px] text-foreground flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-[6px] shrink-0" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Baseline sections */}
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Baseline Coverage
                </p>
                <div className="space-y-2">
                  {baseline.map((section, i) => (
                    <Card key={i} className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          {section.status === "found" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : section.status === "partial" ? (
                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                          )}
                          <span className="text-[12px] font-medium text-foreground">{section.label}</span>
                          {section.status !== "missing" && (
                            <span className="text-[10px] text-muted-foreground">— {section.count}</span>
                          )}
                          {section.status === "missing" && (
                            <span className="text-[10px] text-muted-foreground">— not found</span>
                          )}
                          {section.source && section.source.includes("alpinabank") && section.status === "partial" && (
                            <Badge variant="outline" className="text-[8px] px-1 py-0 bg-amber-500/10 text-amber-700 border-amber-500/20 ml-auto" style={{ fontFamily: "'DM Mono', monospace" }}>inferred</Badge>
                          )}
                        </div>
                        {section.items.length > 0 && (
                          <div className="mt-2 ml-6 space-y-0.5">
                            {section.items.map((item, j) => (
                              <p key={j} className="text-[11px] text-muted-foreground">{item}</p>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* AI Governance gap panel */}
              {allDocsAnalysed && (
                <Card className="border-l-4 border-l-amber-500 bg-amber-500/[0.03] border animate-fade-in" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] font-semibold text-foreground">AI Governance Framework — not documented</p>
                        <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                          Alpina Bank has no AI-specific governance policy. This is common for organisations deploying AI for the first time. The evaluation will run against EU AI Act Article 9 defaults for High Risk systems.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sources */}
              {allDocsAnalysed && (
                <div className="animate-fade-in">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Sources
                  </p>
                  <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                    <CardContent className="p-3 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-[11px] text-foreground">alpinabank.ch — website analysis</span>
                        <Badge variant="outline" className="text-[8px] px-1 py-0 bg-amber-500/10 text-amber-700 border-amber-500/20 ml-auto" style={{ fontFamily: "'DM Mono', monospace" }}>inferred</Badge>
                      </div>
                      {docs.filter(d => d.status === "analysed").map((doc, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-[11px] text-foreground">{doc.name.replace("Alpina Bank — ", "").replace(".pdf", "")}</span>
                          <Badge variant="outline" className="text-[8px] px-1 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 ml-auto" style={{ fontFamily: "'DM Mono', monospace" }}>extracted</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══ BOTTOM CTA ═══ */}
      {allDocsAnalysed && websiteAnalysed && (
        <div className="border-t pt-4 flex items-center justify-between animate-fade-in" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
          <p className="text-[12px] text-muted-foreground">
            Baseline established · {coverage}% confidence · 1 gap (AI Governance) · Evaluation proceeds with EU AI Act defaults
          </p>
          <Button className="h-10 text-[13px] gap-2 px-5" onClick={() => navigate("/intelligence")}>
            Proceed to Solution Intelligence
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
