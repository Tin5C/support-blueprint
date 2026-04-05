// SavanoAI Evaluation Engine — Core Types
// These interfaces define the output format for all 9 evaluation agents.

export interface Finding {
  id: string;                // e.g. "OP-001"
  priority: "P0" | "P1" | "P2";
  title: string;             // plain language, no jargon
  description: string;       // business impact first, technical detail second
  framework: string;         // e.g. "Microsoft WAF — Operational Excellence"
  article: string;           // specific clause e.g. "WAF OE-04" or "FINMA Art. 7"
  remediation: string;       // exact fix instruction
  effort: string;            // e.g. "2 hours" or "1 day"
  evidence?: string;         // what was found (or not found)
}

export interface AgentResult {
  agentId: number;           // 1-9
  agentName: string;
  score: number;             // 0-100
  weight: number;            // percentage weight in composite score
  status: "pass" | "conditional" | "fail";
  findings: Finding[];
}

export interface EvaluationOutput {
  evaluationId: string;
  accountId: string;         // e.g. "fintrack-ag"
  productId: string;         // e.g. "cash-flow-agent"
  timestamp: string;
  compositeScore: number;    // weighted average of all 9 agents
  scoreBand: "enterprise-ready" | "conditionally-ready" | "requires-remediation" | "not-ready";
  regulatoryContext: string[];  // e.g. ["GDPR", "FINMA", "EU AI Act (High Risk)"]
  agents: AgentResult[];
}

// Score band thresholds
// 80-100: enterprise-ready
// 60-79:  conditionally-ready
// 40-59:  requires-remediation
// 0-39:   not-ready

export function getScoreBand(score: number): EvaluationOutput["scoreBand"] {
  if (score >= 80) return "enterprise-ready";
  if (score >= 60) return "conditionally-ready";
  if (score >= 40) return "requires-remediation";
  return "not-ready";
}

// Enterprise Context types — output of Step 0 parser

export type RequirementConfidence = "extracted" | "inferred";

export interface EnterpriseRequirement {
  id: string;
  category: "security" | "sla" | "data" | "procurement" | "operational" | "compliance";
  requirement: string;
  source: string;            // document name or "questionnaire"
  confidence: RequirementConfidence;
  framework?: string;        // mapped regulatory framework if applicable
}

export interface EnterpriseBaseline {
  organisationName: string;
  documents: DocumentMeta[];
  requirements: EnterpriseRequirement[];
  gaps: BaselineGap[];
  regulatoryFrameworks: string[];
  coveragePercent: number;
}

export interface DocumentMeta {
  name: string;
  pages: number;
  uploadedAt: string;
  tag: string;
  status: "uploaded" | "processing" | "analysed";
}

export interface BaselineGap {
  id: string;
  description: string;
  category: string;
  resolvable: "questionnaire" | "document-required";
}
