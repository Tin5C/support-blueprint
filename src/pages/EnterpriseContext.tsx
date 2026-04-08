import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, Upload, CheckCircle2, ChevronRight, AlertTriangle,
  Shield, Clock, Database, ClipboardCheck, Loader2, Globe,
  Search, Server, Lock,
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

interface BaselineSection {
  label: string;
  icon: typeof Shield;
  status: "found" | "partial" | "missing";
  count: string;
  items: string[];
  source?: string;
}

function getBaseline(websiteAnalysed: boolean, analysedCount: number): BaselineSection[] {
  const security: BaselineSection = { label: "Security Requirements", icon: Shield, status: "missing", count: "0", items: [] };
  const procurement: BaselineSection = { label: "Procurement Requirements", icon: ClipboardCheck, status: "missing", count: "0", items: [] };
  const data: BaselineSection = { label: "Data Requirements", icon: Database, status: "missing", count: "0", items: [] };
  const sla: BaselineSection = { label: "SLA Commitments", icon: Clock, status: "missing", count: "0", items: [] };
  const aiGov: BaselineSection = { label: "AI Governance Framework", icon: Shield, status: "missing", count: "0", items: [] };

  if (websiteAnalysed) {
    security.status = "partial"; security.count = "3 inferred";
    security.items = ["ISO 27001 alignment required", "MFA likely required (financial services norm)", "Encryption at rest and in transit expected"];
    security.source = "alpinabank.ch";
  }
  if (analysedCount >= 1) {
    security.status = "found"; security.count = "6 detected";
    security.items = ["ISO 27001 alignment · MFA required · AES-256 encryption", "Penetration testing annually · Right to audit", "Incident notification within 4 hours"];
    security.source = "alpinabank.ch + Vendor Security Questionnaire";
    procurement.status = "found"; procurement.count = "4 detected";
    procurement.items = ["SOC 2 Type II or ISO 27001 cert required", "Annual third-party security audit", "Incident notification within 4 hours", "Right to audit clause in all contracts"];
    procurement.source = "Vendor Security Questionnaire";
  }
  if (analysedCount >= 2) {
    security.count = "8 detected";
    security.items = ["ISO 27001 alignment · MFA required · AES-256 encryption", "Penetration testing annually · Vulnerability scanning quarterly", "Right to audit · Incident notification 4hrs", "Approved vendor list required · Change management approval"];
    security.source = "alpinabank.ch + IT Security Policy 2025";
  }
  if (analysedCount >= 3) {
    data.status = "found"; data.count = "4 detected";
    data.items = ["Financial data classified as Tier 1 (highest sensitivity)", "Tier 1 data must remain in Switzerland", "GDPR Article 28 DPA required before processing", "Retention: 10 years for financial records (FINMA)"];
    data.source = "Data Classification Policy";
  }
  if (analysedCount >= 4) {
    sla.status = "found"; sla.count = "5 detected";
    sla.items = ["P1: 1hr acknowledgement / 4hr resolution", "P2: 4hr acknowledgement / next business day", "System availability: 99.9% uptime required", "Maintenance windows: Sundays 02:00–06:00 CET only", "24/7 monitoring for Tier 1 systems"];
    sla.source = "IT Operations Runbook v4";
  }
  return [security, sla, data, procurement, aiGov];
}

function getCoverage(websiteAnalysed: boolean, analysedCount: number): number {
  if (!websiteAnalysed) return 0;
  let c = 45;
  const perDoc = [15, 8, 12, 8];
  for (let i = 0; i < analysedCount && i < perDoc.length; i++) c += perDoc[i];
  return c;
}

const frameworksList = ["FINMA", "GDPR", "ISO 27001", "EU AI Act"];

const connectedSystems = [
  { icon: Lock, label: "Azure AD", sub: "real MFA adoption and access control" },
  { icon: Server, label: "ServiceNow / Jira SM", sub: "real SLA performance history" },
  { icon: Shield, label: "GRC platform", sub: "existing risk register and audit findings" },
];

// Baseline section index mapping: 0=security, 1=sla, 2=data, 3=procurement, 4=aiGov
const sectionRevealStep = [2, 3, 4, 5, -1]; // aiGov never auto-revealed

// ─── Component ───────────────────────────────────────────────

export default function EnterpriseContext() {
  const navigate = useNavigate();
  const [websiteAnalysed, setWebsiteAnalysed] = useState(false);
  const [docs, setDocs] = useState<DocEntry[]>([]);
  const [revealStep, setRevealStep] = useState(0);
  const [dataProcessingAnswer, setDataProcessingAnswer] = useState<"yes" | "no" | "unsure" | null>(null);
  const [aiGovernanceAnswer, setAiGovernanceAnswer] = useState<"documented" | "informal" | "none" | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [analysisPhase, setAnalysisPhase] = useState<"idle" | "analysing" | "complete">("idle");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [docsVisible, setDocsVisible] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);

  const handleDataProcessingAnswer = (a: "yes" | "no" | "unsure") => {
    setDataProcessingAnswer(a);
    setTimeout(() => setRevealStep(7), 1500);
  };

  const analysedCount = docs.filter(d => d.status === "analysed").length;
  const baseline = getBaseline(websiteAnalysed, analysedCount);
  const coverage = getCoverage(websiteAnalysed, analysedCount);
  const effectiveCoverage =
    aiGovernanceAnswer === "documented"
      ? Math.min(100, coverage + 9)
      : aiGovernanceAnswer === "informal" || (dataProcessingAnswer !== null && dataProcessingAnswer !== "unsure")
        ? Math.min(100, coverage + 6)
        : coverage;
  const allDocsAnalysed = analysedCount === docs.length && docs.length > 0;

  const triggerReveal = () => {
    setTimeout(() => setRevealStep(1), 200);
    setTimeout(() => setRevealStep(2), 1200);
    setTimeout(() => setRevealStep(3), 2000);
    setTimeout(() => setRevealStep(4), 2800);
    setTimeout(() => setRevealStep(5), 3600);
    setTimeout(() => setRevealStep(6), 4800);
  };

  const analysisSteps = [
    "Identifying industry and geography…",
    "Detecting regulatory frameworks…",
    "Assessing certification status…",
    "Building enterprise context…",
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  const [isTyping, setIsTyping] = useState(false);

  const startSequenceAfterTypewriter = () => {
    // Step 2 — Documents populate (staggered fade-in, 200ms apart)
    setDocs(initialDocs.map(d => ({ ...d, status: "available" as const })));
    for (let i = 0; i < initialDocs.length; i++) {
      setTimeout(() => setDocsVisible(i + 1), i * 200);
    }
    const docsFinish = (initialDocs.length - 1) * 200 + 250; // last doc fade + buffer

    // Step 3 — Analysis progress (after docs + 400ms pause)
    const progressStart = docsFinish + 400;
    setAnalysisStep(0);
    setTimeout(() => setAnalysisPhase("analysing"), progressStart);
    for (let i = 0; i < 4; i++) {
      setTimeout(() => setAnalysisStep(i + 1), progressStart + (i + 1) * 800);
    }
    const progressFinish = progressStart + 4 * 800;

    // Step 4 — Results appear (after progress + 300ms pause)
    setTimeout(() => {
      setAnalysisPhase("complete");
      setWebsiteAnalysed(true);
      setTimeout(() => setResultVisible(true), 50);
      triggerReveal();
    }, progressFinish + 300);
  };

  const runAnalysis = () => {
    setRevealStep(0);
    setDataProcessingAnswer(null);
    setAiGovernanceAnswer(null);
    setResultVisible(false);
    setDocsVisible(0);
    setDocs([]);

    if (!inputValue.trim()) {
      // Step 1 — Typewriter
      setIsTyping(true);
      const text = "alpinabank.ch";
      let i = 0;
      inputRef.current?.focus();
      const interval = setInterval(() => {
        setInputValue(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          // 300ms pause then start sequence
          setTimeout(() => {
            setIsTyping(false);
            startSequenceAfterTypewriter();
          }, 300);
        }
      }, 60);
    } else {
      // User already typed — skip typewriter, 300ms pause
      setTimeout(() => startSequenceAfterTypewriter(), 300);
    }
  };

  const addDocument = (index: number) => {
    setDocs(prev => { const next = [...prev]; next[index] = { ...next[index], status: "scanning" }; return next; });
    setTimeout(() => {
      setDocs(prev => { const next = [...prev]; next[index] = { ...next[index], status: "analysed" }; return next; });
    }, 800);
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>Enterprise Context</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Step 0 — Establish what enterprise-ready means for this deployment environment</p>
      </div>

      {/* ═══ TWO COLUMNS ═══ */}
      <div className="flex gap-6">
        {/* ── LEFT COLUMN (45%) ── */}
        <div className="w-[45%] shrink-0 space-y-5">
          {/* Section 1 — Deployment environment */}
          <div className="space-y-3">
            <h2 className="text-[14px] font-semibold text-foreground">Deployment environment</h2>
            {(analysisPhase === "idle" || isTyping) && (
              <>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input ref={inputRef} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="e.g. alpinabank.ch or Alpina Bank" className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" style={{ borderColor: "rgba(212,207,198,0.4)" }} readOnly={isTyping} />
                  </div>
                  {isTyping ? (
                    <Button className="h-10 text-[13px] gap-1.5 px-4 shrink-0 opacity-70" disabled>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing…
                    </Button>
                  ) : (
                    <Button className="h-10 text-[13px] gap-1.5 px-4 shrink-0" onClick={runAnalysis}>Analyse <ChevronRight className="h-3.5 w-3.5" /></Button>
                  )}
                </div>
                {!isTyping && <p className="text-[11px] text-muted-foreground">Launch Studio will infer industry, geography, regulatory context and certification status</p>}
              </>
            )}
            {analysisPhase === "analysing" && (
              <>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" value={inputValue} className="w-full h-10 pl-10 pr-4 rounded-md border bg-muted/30 text-[13px] text-foreground font-medium cursor-default" style={{ borderColor: "rgba(212,207,198,0.4)" }} readOnly />
                  </div>
                  <Button className="h-10 text-[13px] gap-1.5 px-4 shrink-0 opacity-70" disabled>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing…
                  </Button>
                </div>
              </>
            )}
            {analysisPhase === "complete" && (
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
                        {["FINMA supervised (Swiss financial regulator)", "GDPR applicable (EU customer data)", "ISO 27001 certified (detected from public profile)", "Azure infrastructure signals detected"].map((s, i) => (
                          <p key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-primary mt-[6px] shrink-0" />{s}
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
            <h2 className="text-[14px] font-semibold text-foreground">Documents</h2>
            <p className="text-[11px] text-muted-foreground">Upload documents from the receiving organisation</p>
            {docs.length === 0 ? (
              <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-primary/40 transition-colors" style={{ borderColor: "rgba(212,207,198,0.3)" }}>
                <Upload className="h-6 w-6 text-muted-foreground" />
                <p className="text-[13px] font-medium text-foreground">Drop documents here or click to upload</p>
                <p className="text-[11px] text-muted-foreground">Security policies · IT runbooks · SLA agreements · Vendor questionnaires</p>
              </div>
            ) : (
            <div className="space-y-2">
              {docs.map((doc, i) => (
                <div style={{ opacity: i < docsVisible ? 1 : 0, transition: "opacity 200ms ease-out" }}
                  key={i}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    doc.status === "available"
                      ? "border-2 border-dashed opacity-80"
                      : doc.status === "scanning"
                        ? "border border-primary/30"
                        : "border"
                  }`}
                  style={{ borderColor: doc.status === "available" ? "rgba(212,207,198,0.35)" : doc.status === "scanning" ? undefined : "rgba(212,207,198,0.25)" }}
                >
                  <div className="p-3 flex items-center gap-3">
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${doc.status === "available" ? "bg-muted/30" : "bg-muted/50"}`}>
                      <FileText className={`h-3.5 w-3.5 ${doc.status === "available" ? "text-muted-foreground/40" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] font-medium truncate ${doc.status === "available" ? "text-muted-foreground" : "text-foreground"}`}>{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{doc.pages} pages</span>
                        <Badge variant="outline" className={`text-[9px] px-1 py-0 border ${doc.tagColor}`} style={{ fontFamily: "'DM Mono', monospace" }}>{doc.tag}</Badge>
                      </div>
                    </div>
                    {doc.status === "available" && (
                      <button onClick={() => addDocument(i)} className="h-7 w-7 rounded-md border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-colors shrink-0" style={{ borderColor: "rgba(212,207,198,0.35)" }}>
                        <Upload className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {doc.status === "scanning" && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border bg-primary/10 text-primary border-primary/20 shrink-0">
                        <Loader2 className="h-2.5 w-2.5 mr-1 animate-spin" />
                        Uploading…
                      </Badge>
                    )}
                    {doc.status === "analysed" && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border bg-emerald-500/10 text-emerald-700 border-emerald-500/20 shrink-0">
                        <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                        Analysed
                      </Badge>
                    )}
                  </div>
                  {/* Scanning progress bar */}
                  {doc.status === "scanning" && (
                    <div className="h-0.5 bg-primary/10 w-full">
                      <div className="h-full bg-primary rounded-full" style={{ animation: "scanProgress 800ms ease-out forwards" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}
            {docs.length > 0 && (
              <div className="border-2 border-dashed rounded-md p-5 text-center cursor-pointer hover:bg-muted/20 transition-colors" style={{ borderColor: "rgba(212,207,198,0.3)" }}>
                <Upload className="h-4 w-4 text-muted-foreground/50 mx-auto mb-1" />
                <p className="text-[11px] text-muted-foreground">Or drop your own documents here</p>
              </div>
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
          {analysisPhase === "idle" && (
            <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="py-16 text-center">
                <Globe className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-[13px] text-muted-foreground">Enter the deployment environment to begin</p>
                <p className="text-[11px] text-muted-foreground mt-1">Coverage: 0%</p>
              </CardContent>
            </Card>
          )}

          {/* Analysing state — 4-step progress */}
          {analysisPhase === "analysing" && (
            <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-6 space-y-3">
                {analysisSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    style={{ opacity: i < analysisStep ? 1 : 0, transition: "opacity 200ms ease-out" }}
                  >
                    {i < analysisStep - 1 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : i === analysisStep - 1 ? (
                      <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20 shrink-0" />
                    )}
                    <span className={`text-[12px] ${i < analysisStep ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Complete — Alpina Bank result + progressive baseline reveal */}
          {analysisPhase === "complete" && (
            <div
              style={{
                opacity: resultVisible ? 1 : 0,
                transform: resultVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 400ms ease-out, transform 400ms ease-out",
              }}
            >
            <Card className="border mb-4" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-foreground">Alpina Bank</h3>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Analysed</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground">Industry</span>
                      <p className="text-[12px] text-foreground">Swiss Private Bank · Financial Services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground">Geography</span>
                      <p className="text-[12px] text-foreground">Switzerland · Zürich HQ · EU data residency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground">Regulatory frameworks detected</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["FINMA", "GDPR", "EU AI Act (High Risk)", "ISO 27001", "Microsoft WAF"].map(fw => (
                          <Badge key={fw} className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0">{fw}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground">Certification status</span>
                      <p className="text-[12px] text-foreground">FINMA supervised · ISO 27001 certified · GDPR compliant</p>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t" style={{ borderColor: "rgba(212,207,198,0.15)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">Context coverage</span>
                    <span className="text-[11px] font-medium text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>84%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: "84%" }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">4 documents uploaded · ready to proceed to Solution Intelligence</p>
                </div>
              </CardContent>
            </Card>
            </div>
          )}

          {/* Live baseline — progressive reveal (after complete) */}
          {websiteAnalysed && (
            <div className="space-y-4">
              {/* Coverage ring — always shown */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full border-4 flex items-center justify-center shrink-0" style={{ borderColor: effectiveCoverage >= 80 ? "hsl(var(--success))" : "hsl(var(--warning))" }}>
                  <span className="text-lg font-bold text-foreground">{effectiveCoverage}%</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">Baseline coverage</p>
                  <p className="text-[11px] text-muted-foreground">
                    {effectiveCoverage < 80 ? "Add documents to complete your baseline" : "Baseline established — ready to proceed"}
                  </p>
                </div>
              </div>

              {/* STEP 1 — Regulatory context card */}
              {revealStep >= 1 && (
                <div className="animate-fade-in border rounded-lg p-4 bg-secondary/30" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Regulatory context · April 2026
                  </p>
                  <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                    Three active developments directly affect this deployment:
                  </p>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-primary text-[11px] mt-0.5 flex-shrink-0">•</span>
                      <p className="text-[11px] text-foreground leading-relaxed">
                        <span className="font-medium">FINMA Circular 2024/1 on AI</span> — effective January 2025, Swiss financial institutions must document AI decision-making and maintain human oversight for liquidity and credit recommendations
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-primary text-[11px] mt-0.5 flex-shrink-0">•</span>
                      <p className="text-[11px] text-foreground leading-relaxed">
                        <span className="font-medium">EU AI Act enforcement</span> — High Risk AI systems must be registered in the EU database by August 2026. AI systems making financial recommendations or credit decisions qualify under Annex III — registration deadline August 2026
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-primary text-[11px] mt-0.5 flex-shrink-0">•</span>
                      <p className="text-[11px] text-foreground leading-relaxed">
                        <span className="font-medium">Swiss nDSG</span> — revised Swiss Data Protection Act in full effect since September 2023, stricter requirements for data processing agreements with third-party vendors including AI providers
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t italic" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                    This evaluation reflects current requirements — not last year's standards.
                  </p>
                </div>
              )}

              {/* Detected frameworks */}
              {revealStep >= 1 && (
                <div className="animate-fade-in">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Detected Frameworks</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {frameworksList.map(fw => (
                      <Badge key={fw} className="bg-primary/10 text-primary border-primary/20 text-[10px] px-2 py-0.5 font-medium">{fw}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Baseline sections — progressive reveal */}
              {baseline.map((section, i) => {
                const step = sectionRevealStep[i];
                if (step < 0 || revealStep < step) return null;
                return (
                  <div key={i} className="animate-fade-in">
                    <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
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
                          {section.status !== "missing" ? (
                            <span className="text-[10px] text-muted-foreground">— {section.count}</span>
                          ) : (
                            <span className="text-[10px] text-muted-foreground">— not found</span>
                          )}
                          {section.source?.includes("alpinabank") && section.status === "partial" && (
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
                  </div>
                );
              })}

              {/* STEP 6 — Data processing question */}
              {revealStep >= 6 && dataProcessingAnswer === null && (
                <DataProcessingQuestion onAnswer={handleDataProcessingAnswer} />
              )}

              {/* STEP 6 — Result after answer */}
              {revealStep >= 6 && dataProcessingAnswer !== null && (
                <DataProcessingResult answer={dataProcessingAnswer} />
              )}

              {/* STEP 7 — AI Governance question */}
              {revealStep >= 7 && aiGovernanceAnswer === null && (
                <AIGovernanceQuestion onAnswer={(a) => setAiGovernanceAnswer(a)} />
              )}
              {revealStep >= 7 && aiGovernanceAnswer !== null && (
                <AIGovernanceResult answer={aiGovernanceAnswer} />
              )}

              {/* AI Governance warning — only when question unanswered */}
              {revealStep >= 5 && dataProcessingAnswer === null && allDocsAnalysed && (
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
              {revealStep >= 2 && (
                <div className="animate-fade-in">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Sources</p>
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
      {allDocsAnalysed && websiteAnalysed && revealStep >= 5 && (
        <div className="border-t pt-4 flex items-center justify-between animate-fade-in" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
          <p className="text-[12px] text-muted-foreground">
            Baseline established · {effectiveCoverage}% confidence · {dataProcessingAnswer !== null && dataProcessingAnswer !== "unsure" ? "Data processing policy confirmed" : "1 gap (AI Governance)"} · Evaluation proceeds with EU AI Act defaults
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

// ─── Data Processing Question ────────────────────────────────

function DataProcessingQuestion({ onAnswer }: { onAnswer: (answer: "yes" | "no" | "unsure") => void }) {
  return (
    <div className="animate-fade-in border border-amber-200 rounded-lg p-4 bg-amber-50/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-700 text-[10px] font-bold">?</span>
        </div>
        <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
          One question before we proceed
        </p>
      </div>
      <p className="text-[12px] text-foreground leading-relaxed mb-3">
        Based on FINMA supervision and EU AI Act High Risk classification, I need to confirm Alpina Bank's data processing policy:
      </p>
      <p className="text-[12px] font-medium text-foreground mb-4">
        Does Alpina Bank's policy require that all financial data is processed exclusively within Switzerland — including by third-party AI and software vendors?
      </p>
      <div className="flex flex-col gap-2">
        {([
          { value: "yes" as const, label: "Yes", detail: "— all processing must remain in Switzerland" },
          { value: "no" as const, label: "No", detail: "— EEA processing is acceptable" },
          { value: "unsure" as const, label: "Not documented", detail: "— needs confirmation from compliance team" },
        ]).map(opt => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="text-left px-3 py-2.5 rounded-md border border-border bg-background text-[12px] text-foreground hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <span className="font-medium">{opt.label}</span> {opt.detail}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Data Processing Result ──────────────────────────────────

function DataProcessingResult({ answer }: { answer: "yes" | "no" | "unsure" }) {
  const configs = {
    yes: {
      icon: "✓", label: "Data residency requirement confirmed",
      iconClass: "bg-green-100 border-green-300", textClass: "text-green-700",
      borderClass: "border-green-200", bgClass: "bg-green-50/50",
      body: "All financial data must remain in Switzerland. This requirement will be applied to the evaluation — any vendor or tool routing data outside Switzerland will be flagged.",
      sub: "Data Requirements updated. Baseline coverage → 94%.",
    },
    no: {
      icon: "✓", label: "EEA processing accepted",
      iconClass: "bg-green-100 border-green-300", textClass: "text-green-700",
      borderClass: "border-green-200", bgClass: "bg-green-50/50",
      body: "EEA-wide data processing is acceptable. GDPR Article 45 adequacy decision applies. Swiss nDSG cross-border transfer requirements still apply.",
      sub: "Data Requirements updated. Baseline coverage → 94%.",
    },
    unsure: {
      icon: "△", label: "Flagged for compliance review",
      iconClass: "bg-amber-100 border-amber-300", textClass: "text-amber-700",
      borderClass: "border-amber-200", bgClass: "bg-amber-50/50",
      body: "Data processing policy is undocumented. Evaluation will proceed using the stricter Switzerland-only assumption as a default.",
      sub: "This will appear as a P1 gap in the Readiness Report.",
    },
  };
  const c = configs[answer];
  return (
    <div className={`animate-fade-in border ${c.borderClass} rounded-lg p-4 ${c.bgClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-5 h-5 rounded-full ${c.iconClass} border flex items-center justify-center flex-shrink-0`}>
          <span className={`${c.textClass} text-[10px] font-bold`}>{c.icon}</span>
        </div>
        <p className={`text-[11px] font-semibold ${c.textClass} uppercase tracking-wider`} style={{ fontFamily: "'DM Mono', monospace" }}>
          {c.label}
        </p>
      </div>
      <p className="text-[12px] text-foreground leading-relaxed mb-2">{c.body}</p>
      <p className="text-[11px] text-muted-foreground">{c.sub}</p>
    </div>
  );
}

// ─── AI Governance Question ──────────────────────────────────

function AIGovernanceQuestion({ onAnswer }: { onAnswer: (a: "documented" | "informal" | "none") => void }) {
  return (
    <div className="animate-fade-in border border-amber-200 rounded-lg p-4 bg-amber-50/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-700 text-[10px] font-bold">?</span>
        </div>
        <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
          One more thing
        </p>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
        EU AI Act Article 9 and FINMA Circular 2024/1 both require human oversight for High Risk AI systems making financial decisions. Industry best practice — adopted by leading Swiss and European financial institutions following 2024 AI incident disclosures — now expects this to be documented before deployment, not added later.
      </p>
      <p className="text-[12px] font-medium text-foreground mb-4">
        Does Alpina Bank have a human-in-the-loop requirement for AI-generated financial recommendations — even informally?
      </p>
      <div className="flex flex-col gap-2">
        {([
          { value: "documented" as const, label: "Yes, documented", sub: "— formal policy or approval workflow exists" },
          { value: "informal" as const, label: "Yes, informally", sub: "— expectation exists but not written down" },
          { value: "none" as const, label: "Not currently", sub: "— no human review requirement in place" },
        ]).map(opt => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="text-left px-3 py-2.5 rounded-md border border-border bg-background text-[12px] text-foreground hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <span className="font-medium">{opt.label}</span> {opt.sub}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── AI Governance Result ────────────────────────────────────

function AIGovernanceResult({ answer }: { answer: "documented" | "informal" | "none" }) {
  const configs = {
    documented: {
      icon: "✓", label: "Human oversight confirmed",
      iconClass: "bg-green-100 border-green-300", textClass: "text-green-700",
      borderClass: "border-green-200", bgClass: "bg-green-50/50",
      body: "Alpina Bank has a documented human oversight requirement. EU AI Act Article 9 and FINMA Circular 2024/1 compliance confirmed on this point.",
      sub: "AI Governance gap closed. Baseline coverage → 97%.",
    },
    informal: {
      icon: "△", label: "Human oversight noted — documentation recommended",
      iconClass: "bg-amber-100 border-amber-300", textClass: "text-amber-700",
      borderClass: "border-amber-200", bgClass: "bg-amber-50/50",
      body: "The expectation exists but is not documented. Best practice — and increasingly a procurement requirement — is to formalise this before go-live.",
      sub: "Flagged as P1 in Readiness Report. Baseline coverage → 94%.",
    },
    none: {
      icon: "△", label: "Human oversight gap identified",
      iconClass: "bg-amber-100 border-amber-300", textClass: "text-amber-700",
      borderClass: "border-amber-200", bgClass: "bg-amber-50/50",
      body: "No human-in-the-loop requirement is in place. For a High Risk AI system under EU AI Act and FINMA supervision, this will be a P1 finding in the Readiness Report.",
      sub: "Remediation: define and document an approval workflow before deployment.",
    },
  };
  const c = configs[answer];
  return (
    <div className={`animate-fade-in border ${c.borderClass} rounded-lg p-4 ${c.bgClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-5 h-5 rounded-full ${c.iconClass} border flex items-center justify-center flex-shrink-0`}>
          <span className={`${c.textClass} text-[10px] font-bold`}>{c.icon}</span>
        </div>
        <p className={`text-[11px] font-semibold ${c.textClass} uppercase tracking-wider`} style={{ fontFamily: "'DM Mono', monospace" }}>
          {c.label}
        </p>
      </div>
      <p className="text-[12px] text-foreground leading-relaxed mb-2">{c.body}</p>
      <p className="text-[11px] text-muted-foreground">{c.sub}</p>
    </div>
  );
}
