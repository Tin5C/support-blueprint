import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ChevronRight, ChevronLeft, Shield, BookOpen,
  Upload, FileText, Sparkles, Database, ExternalLink, Loader2,
  Globe, Code2, Link as LinkIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────

type Step = 1 | 2 | 3;
type GeneratePhase = "idle" | "generating" | "done";

// ─── Step indicator data ─────────────────────────────────────

const steps = [
  { num: 1, label: "Baseline" },
  { num: 2, label: "Define" },
  { num: 3, label: "Generate" },
];

// ─── Component ───────────────────────────────────────────────

export default function SupportStudio() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [step1State, setStep1State] = useState(0);
  const [generatePhase, setGeneratePhase] = useState<GeneratePhase>("idle");
  const [generateStep, setGenerateStep] = useState(0);

  const advance = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    if (currentStep < 3) setCurrentStep((currentStep + 1) as Step);
  };

  const back = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as Step);
  };

  const handleGenerate = () => {
    setGeneratePhase("generating");
    setGenerateStep(0);
    const labels = ["Analysing baseline…", "Applying product knowledge…", "Generating governance boundaries…", "Done"];
    labels.forEach((_, i) => {
      setTimeout(() => {
        setGenerateStep(i);
        if (i === labels.length - 1) {
          setTimeout(() => setGeneratePhase("done"), 600);
        }
      }, (i + 1) * 700);
    });
  };

  const generateLabels = ["Analysing baseline…", "Applying product knowledge…", "Generating governance boundaries…", "Done"];

  return (
    <div className="p-6 space-y-6 max-w-[1100px] mx-auto pb-16 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-[22px] font-light text-foreground tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Blueprint
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Design a governed support blueprint from baseline through generation
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />}
            <div className="flex items-center gap-2">
              {completedSteps.has(step.num) ? (
                <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </div>
              ) : currentStep === step.num ? (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-primary-foreground">{step.num}</span>
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center shrink-0">
                  <span className="text-[11px] text-muted-foreground">{step.num}</span>
                </div>
              )}
              <span className={`text-[12px] font-medium ${currentStep === step.num ? "text-foreground" : completedSteps.has(step.num) ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ STEP 1 — BASELINE ═══ */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-[16px] font-semibold text-foreground">Baseline existing support</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Understand what's already in place before designing anything new</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* ── Left card — From Launch Studio ── */}
            <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-4 space-y-3">
                {step1State === 0 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary shrink-0" />
                      <h3 className="text-[13px] font-semibold text-foreground">From Launch Studio</h3>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Import your readiness score, risk classification, failure modes, and regulatory context.
                    </p>
                    <Button className="text-[12px] h-9 gap-2 w-full" onClick={() => setStep1State(1)}>
                      Import Launch Studio context <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary shrink-0" />
                        <h3 className="text-[13px] font-semibold text-foreground">From Launch Studio</h3>
                      </div>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Imported</Badge>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "Readiness score", value: "67 — Conditionally Ready" },
                        { label: "Risk classification", value: "HIGH RISK — EU AI Act Article 6" },
                        { label: "Regulatory context", value: "GDPR · FINMA · EU AI Act · ISO 27001 · WAF" },
                        { label: "Failure modes identified", value: "10" },
                        { label: "Automation boundaries", value: "6 automated, 5 approval-required" },
                        { label: "Support tier", value: "Tier 2 Standard" },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: "rgba(212,207,198,0.15)" }}>
                          <span className="text-[11px] text-muted-foreground">{row.label}</span>
                          <span className="text-[11px] font-medium text-foreground">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* ── Right card — Existing support operation ── */}
            <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-4 space-y-3">
                {step1State <= 1 && step1State !== 2 && step1State !== 3 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary shrink-0" />
                      <h3 className="text-[13px] font-semibold text-foreground">Existing support operation</h3>
                    </div>
                    {step1State === 0 ? (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">
                          Connect your ticketing system to baseline from real ticket history.
                        </p>
                        <Button variant="outline" className="text-[12px] h-9 gap-2 w-full opacity-50 cursor-not-allowed" disabled>
                          Connect ticketing system
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">
                          Connect your ticketing system to baseline from real ticket history.
                        </p>
                        <Button className="text-[12px] h-9 gap-2 w-full" onClick={() => {
                          setStep1State(2);
                          setTimeout(() => setStep1State(3), 1500);
                        }}>
                          Connect ticketing system <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    )}
                  </>
                ) : step1State === 2 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary shrink-0" />
                      <h3 className="text-[13px] font-semibold text-foreground">Existing support operation</h3>
                    </div>
                    <div className="flex items-center gap-3 py-4 justify-center">
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      <span className="text-[12px] text-muted-foreground">Connecting to Jira SM…</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary shrink-0" />
                      <h3 className="text-[13px] font-semibold text-foreground">Existing support operation</h3>
                    </div>
                    <div className="space-y-3 animate-fade-in">
                      <div className="p-3 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium text-foreground">Ticketing</span>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Connected</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Jira SM · 1,247 tickets · 90-day window</p>
                      </div>
                      <div className="p-3 rounded-md border bg-card" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium text-foreground">Runbooks</span>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Uploaded</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">incident-response-playbook.yaml · escalation-matrix.md</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Support Baseline Report */}
          {step1State === 3 ? (
            <Card className="border border-l-4 border-l-primary animate-fade-in" style={{ borderTopColor: "rgba(212,207,198,0.25)", borderRightColor: "rgba(212,207,198,0.25)", borderBottomColor: "rgba(212,207,198,0.25)" }}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-foreground">Support Baseline Report</h3>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Generated</Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-0">
                  {/* Left column */}
                  <div className="space-y-2">
                    {[
                      { label: "Ticket volume", value: "1,247 / 90 days" },
                      { label: "Top categories", value: "Configuration 34% · Integration 28% · Auth 18% · AI Quality 20%" },
                      { label: "Avg resolution", value: "4.2 hrs" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-start gap-2 py-1">
                        <span className="text-[10px] text-muted-foreground w-24 shrink-0">{row.label}</span>
                        <span className="text-[11px] text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* Right column — Reuse */}
                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-1.5">Reuse opportunities</span>
                    <div className="space-y-1">
                      {["incident-response-playbook.yaml", "escalation-matrix.md", "RB-045: Batch Processing Recovery"].map((rb, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span className="text-[11px] text-foreground">{rb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground pt-2 border-t" style={{ borderColor: "rgba(212,207,198,0.15)" }}>
                  3 existing runbooks will be incorporated into your blueprint automatically
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: "rgba(212,207,198,0.2)" }}>
              <p className="text-[12px] text-muted-foreground/50">Support Baseline Report will appear here</p>
            </div>
          )}

          <Button
            className={`h-10 text-[13px] gap-2 px-5 ${step1State < 3 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={step1State < 3}
            onClick={advance}
          >
            Continue <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* ═══ STEP 2 — DEFINE ═══ */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <button onClick={back} className="text-[12px] text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </button>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-foreground">Define product knowledge</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Product knowledge · uploaded once, deployed per customer</p>
          </div>

          <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-5 space-y-4">
              {/* Product documentation */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Product Documentation</label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-1.5 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors cursor-pointer">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <p className="text-[11px] font-medium text-foreground">Product docs, architecture, API reference</p>
                  <p className="text-[10px] text-muted-foreground">PDF, Markdown, DOCX, YAML — up to 50MB</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <FilePill name="helio-crm-agent-v3.4.2-guide.pdf" />
                  <FilePill name="architecture-overview.md" />
                </div>
              </div>

              {/* URL inputs */}
              <div className="space-y-3">
                <UrlInput icon={Code2} label="GitHub Repository" value="https://github.com/acme/helio-crm-agent" />
                <UrlInput icon={Globe} label="Documentation Site" value="https://docs.helio-crm.io/v3.4.2" />
                <UrlInput icon={LinkIcon} label="API Documentation" value="https://api.helio-crm.io/v3/openapi.json" />
              </div>

              {/* Runbook upload */}
              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Runbooks & Playbooks</label>
                <div className="border-2 border-dashed rounded-lg p-3 flex items-center gap-3 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors cursor-pointer">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] font-medium text-foreground">Upload existing runbooks</p>
                    <p className="text-[10px] text-muted-foreground">YAML, JSON, Markdown</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <FilePill name="incident-response-playbook.yaml" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button className="h-10 text-[13px] gap-2 px-5" onClick={advance}>
              Continue <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Link to="/templates" className="text-[11px] text-primary hover:underline">
              Or start from a template →
            </Link>
          </div>
        </div>
      )}

      {/* ═══ STEP 3 — GENERATE ═══ */}
      {currentStep === 3 && generatePhase !== "done" && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <button onClick={back} className="text-[12px] text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </button>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-foreground">Generate governed blueprint</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Review context and governance boundaries, then generate</p>
          </div>

          {/* From Solution Intelligence — pre-filled */}
          <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <h3 className="text-[13px] font-semibold text-foreground">From Solution Intelligence</h3>
                    <p className="text-[11px] text-muted-foreground">Cash Flow Forecasting Agent v1.0.0 · Sarah Chen · Alpina Bank · FINMA + GDPR + EU AI Act context loaded</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Connected</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Governance boundaries */}
          <Card className="border" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-primary" />
                <h3 className="text-[13px] font-semibold text-foreground">Governance Boundaries</h3>
              </div>
              <p className="text-[11px] text-muted-foreground">Define what AI can do automatically, what requires human approval, and what must never be automated.</p>

              <div className="grid grid-cols-2 gap-4">
                <GovSection title="Allowed Automated Actions" tags={["Scale compute (up to 2x)", "Restart pipeline", "Rotate tokens", "Adjust batch size"]} color="emerald" />
                <GovSection title="Approval-Required Actions" tags={["Bulk merge (>100 records)", "Force reindex", "Roll back migration", "Override rate limits"]} color="amber" />
                <GovSection title="Never Automate" tags={["Delete customer data", "Modify billing", "Regional failover", "Modify audit logs"]} color="red" />
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">Escalation Policy</label>
                  <textarea
                    className="w-full p-3 rounded-lg border bg-card text-[12px] outline-none placeholder:text-muted-foreground/60 resize-none"
                    style={{ borderColor: "rgba(212,207,198,0.25)" }}
                    rows={4}
                    defaultValue="Never auto-execute regional failover. Always escalate data loss scenarios. Compliance/audit issues must go to certified engineers. Any action affecting > 50% of nodes requires human approval."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate button / progress */}
          {generatePhase === "idle" && (
            <Button className="w-full h-11 text-[13px] gap-2" onClick={handleGenerate}>
              <Sparkles className="h-4 w-4" /> Generate Governed Blueprint
            </Button>
          )}

          {generatePhase === "generating" && (
            <Card className="border border-primary/20 bg-primary/[0.03]" style={{ borderColor: undefined }}>
              <CardContent className="p-5 space-y-3">
                {generateLabels.slice(0, generateStep + 1).map((label, i) => (
                  <div key={i} className="flex items-center gap-3 animate-fade-in">
                    {i < generateStep ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                    )}
                    <span className={`text-[12px] ${i < generateStep ? "text-muted-foreground" : "text-foreground font-medium"}`}>{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ═══ STEP 3 — DONE ═══ */}
      {currentStep === 3 && generatePhase === "done" && (
        <div className="space-y-5 animate-fade-in">
          <Card className="border border-emerald-200 bg-emerald-50/30" style={{ borderColor: undefined }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-foreground">
                    Blueprint generated — Cash Flow Forecasting Agent v1.0.0 · v2.4 · 22 rules across 9 sections
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <Link to="/blueprints" className="text-[12px] text-primary hover:underline flex items-center gap-1">
                      View Active Blueprint <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Change will go through approval workflow before deploying to customers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Helper components ───────────────────────────────────────

function FilePill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-card text-[10px] text-foreground" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
      <FileText className="h-3 w-3 text-muted-foreground" />
      {name}
    </span>
  );
}

function UrlInput({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value: string }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1 block">{label}</label>
      <div className="flex items-center gap-2 px-3 h-9 rounded-md border bg-card text-[12px] text-foreground" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
        <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground truncate">{value}</span>
        <CheckCircle2 className="h-3 w-3 text-emerald-600 ml-auto shrink-0" />
      </div>
    </div>
  );
}

function GovSection({ title, tags, color }: { title: string; tags: string[]; color: "emerald" | "amber" | "red" }) {
  const dotColor = color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-destructive";
  return (
    <div>
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">{title}</label>
      <div className="space-y-1">
        {tags.map((tag, i) => (
          <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border bg-card text-[11px] text-foreground" style={{ borderColor: "rgba(212,207,198,0.25)" }}>
            <div className={`h-1.5 w-1.5 rounded-full ${dotColor} shrink-0`} />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
