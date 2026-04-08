export const products = [
  { id: "prod-1", name: "Cash Flow Forecasting Agent", version: "1.0.0", type: "AI Cash Flow Intelligence" },
];

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type CaseStatus = "open" | "in-progress" | "waiting" | "resolved";
export type CaseTrigger = "telemetry" | "customer";

export interface Customer {
  id: string;
  name: string;
  product: string;
  environment: string;
  risk: RiskLevel;
  openCases: number;
  automationRate: number;
  healthScore: number;
  lastActivity: string;
  deploymentDate: string;
  nodes: number;
}

export const customers: Customer[] = [
  { id: "cust-1", name: "Alpina Bank", product: "Cash Flow Forecasting Agent", environment: "Azure Switzerland North", risk: "high", openCases: 3, automationRate: 72, healthScore: 87, lastActivity: "8 min ago", deploymentDate: "2025-01-15", nodes: 8 },
  { id: "cust-2", name: "Helvetia Capital", product: "Cash Flow Forecasting Agent", environment: "Azure Switzerland North", risk: "low", openCases: 2, automationRate: 88, healthScore: 93, lastActivity: "1 hr ago", deploymentDate: "2025-02-10", nodes: 6 },
  { id: "cust-3", name: "Nord Insurance AG", product: "Cash Flow Forecasting Agent", environment: "Azure West Europe", risk: "medium", openCases: 2, automationRate: 76, healthScore: 79, lastActivity: "22 min ago", deploymentDate: "2025-03-01", nodes: 4 },
  { id: "cust-4", name: "Zurich Asset Mgmt", product: "Cash Flow Forecasting Agent", environment: "Azure Switzerland North", risk: "critical", openCases: 3, automationRate: 54, healthScore: 54, lastActivity: "2 min ago", deploymentDate: "2024-11-20", nodes: 12 },
  { id: "cust-5", name: "Canton Bern Treasury", product: "Cash Flow Forecasting Agent", environment: "Azure Switzerland North", risk: "low", openCases: 1, automationRate: 94, healthScore: 96, lastActivity: "3 hr ago", deploymentDate: "2025-02-28", nodes: 4 },
];

export interface Case {
  id: string;
  customerId: string;
  title: string;
  status: CaseStatus;
  priority: RiskLevel;
  trigger: CaseTrigger;
  category: string;
  createdAt: string;
  updatedAt: string;
  confidence: number;
  assignedAgent: string;
  summary: string;
}

export const cases: Case[] = [
  // Alpina Bank
  { id: "CS-2041", customerId: "cust-1", title: "Forecasting model returning stale predictions after Q1 data migration", status: "in-progress", priority: "high", trigger: "telemetry", category: "Forecast Drift", createdAt: "2025-03-30T09:14:00Z", updatedAt: "2025-03-30T09:47:00Z", confidence: 78, assignedAgent: "Resolution Agent", summary: "Cash flow predictions not updating after Q1 data migration. Model using pre-migration feature vectors. 340 corporate accounts showing stale 7-day forecasts. Confidence dropped from 89% to 61%." },
  { id: "CS-2042", customerId: "cust-1", title: "Cash flow projection variance >15% on corporate accounts", status: "open", priority: "medium", trigger: "telemetry", category: "AI Quality", createdAt: "2025-03-30T07:20:00Z", updatedAt: "2025-03-30T07:20:00Z", confidence: 62, assignedAgent: "Knowledge Agent", summary: "Variance between projected and actual cash flows exceeded 15% threshold on 12 corporate accounts. Likely caused by seasonal pattern not captured in Q1 retraining window." },
  { id: "CS-2043", customerId: "cust-1", title: "ERP data pipeline latency spike — SAP connector timeout", status: "waiting", priority: "medium", trigger: "customer", category: "Data Feed", createdAt: "2025-03-29T14:00:00Z", updatedAt: "2025-03-30T06:30:00Z", confidence: 71, assignedAgent: "Telemetry Agent", summary: "SAP ERP connector timing out during daily batch sync. 4,200 transactions pending ingestion. Alpina Bank IT reports SAP sandbox refresh may be the cause." },

  // Helvetia Capital
  { id: "CS-2044", customerId: "cust-2", title: "Cash flow projection variance >15% threshold on corporate accounts", status: "in-progress", priority: "high", trigger: "telemetry", category: "AI Quality", createdAt: "2025-03-30T04:30:00Z", updatedAt: "2025-03-30T09:00:00Z", confidence: 74, assignedAgent: "Resolution Agent", summary: "Multi-currency cash flow projections (EUR/CHF/USD) showing 18% variance on 8 institutional portfolios. Likely caused by stale FX rate feed after market close." },
  { id: "CS-2045", customerId: "cust-2", title: "Reconciliation pipeline stalled — EUR/CHF fx rate feed timeout", status: "open", priority: "medium", trigger: "telemetry", category: "Reconciliation", createdAt: "2025-03-30T06:45:00Z", updatedAt: "2025-03-30T06:45:00Z", confidence: 58, assignedAgent: "Knowledge Agent", summary: "EUR/CHF FX rate feed from SIX Financial timed out during overnight batch. 2,100 reconciliation entries pending. March closing period at risk." },

  // Nord Insurance AG
  { id: "CS-2046", customerId: "cust-3", title: "Forecast confidence dropped below 70% for insurance portfolios", status: "in-progress", priority: "medium", trigger: "telemetry", category: "Forecast Drift", createdAt: "2025-03-29T18:00:00Z", updatedAt: "2025-03-30T08:15:00Z", confidence: 83, assignedAgent: "Resolution Agent", summary: "Forecast confidence for Nord Insurance premium cash flow projections dropped from 84% to 67% after they added 3 new product lines. Model needs recalibration." },
  { id: "CS-2047", customerId: "cust-3", title: "GDPR data retention audit flagged stale policyholder records", status: "waiting", priority: "low", trigger: "customer", category: "Compliance", createdAt: "2025-03-29T11:00:00Z", updatedAt: "2025-03-30T02:00:00Z", confidence: 90, assignedAgent: "Resolution Agent", summary: "Nord Insurance DPO flagged that archived policyholder financial data exceeds configured retention period. 1,200 records need review against GDPR Art. 17 deletion requirements." },

  // Zurich Asset Mgmt
  { id: "CS-2048", customerId: "cust-4", title: "FINMA monthly reporting export failed — submission at risk", status: "in-progress", priority: "critical", trigger: "telemetry", category: "Regulatory", createdAt: "2025-03-30T02:15:00Z", updatedAt: "2025-03-30T09:30:00Z", confidence: 52, assignedAgent: "Resolution Agent", summary: "Automated FINMA monthly liquidity report export failed. Data aggregation pipeline returned incomplete results — 3 of 8 fund portfolios missing. Submission deadline in 4 hours." },
  { id: "CS-2049", customerId: "cust-4", title: "Forecast model confidence collapsed to 31% after data feed corruption", status: "open", priority: "critical", trigger: "telemetry", category: "Data Integrity", createdAt: "2025-03-30T08:00:00Z", updatedAt: "2025-03-30T08:00:00Z", confidence: 35, assignedAgent: "Customer Context Agent", summary: "Corrupted market data feed injected invalid CHF/USD rates into the forecast pipeline. Model confidence collapsed from 86% to 31%. All Zurich Asset Mgmt portfolio projections unreliable until resolved." },
  { id: "CS-2050", customerId: "cust-4", title: "Unexplained 23% variance in cash flow projections for fund portfolios", status: "waiting", priority: "high", trigger: "telemetry", category: "AI Quality", createdAt: "2025-03-29T20:00:00Z", updatedAt: "2025-03-30T05:00:00Z", confidence: 69, assignedAgent: "Telemetry Agent", summary: "Cash flow projections for 5 fund portfolios showing 23% variance from actuals. Pattern emerged after March rebalancing. Affects CHF 2.4B in managed assets." },

  // Canton Bern Treasury
  { id: "CS-2051", customerId: "cust-5", title: "Forecast confidence dipped below threshold for Canton portfolios", status: "resolved", priority: "medium", trigger: "telemetry", category: "Forecast Drift", createdAt: "2025-03-28T14:00:00Z", updatedAt: "2025-03-29T09:00:00Z", confidence: 96, assignedAgent: "Resolution Agent", summary: "Temporary dip in forecast confidence for Canton pension portfolios caused by delayed Q1 tax revenue data. Auto-resolved when data feed caught up. Pattern whitelisted." },
];

// --- Teams-style activity history ---
export interface ActivityEntry {
  id: string;
  caseId: string;
  customerId: string;
  type: "telemetry-alert" | "agent-summary" | "customer-update" | "approval-request" | "approval-granted" | "escalation" | "resolution" | "note";
  sender: string;
  content: string;
  timestamp: string;
  channel: string;
}

export const activityHistory: ActivityEntry[] = [
  { id: "act-1", caseId: "CS-2048", customerId: "cust-4", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ FINMA reporting export failed. 3 of 8 fund portfolios missing from aggregation. Submission deadline in 4 hours.", timestamp: "2025-03-30T02:15:00Z", channel: "#zurich-asset-mgmt" },
  { id: "act-2", caseId: "CS-2048", customerId: "cust-4", type: "agent-summary", sender: "AI Support Summary", content: "Root cause identified: Data aggregation pipeline timeout on fund portfolios with >500 positions. Similar to INC-287 from February. Pipeline needs partitioning by fund.", timestamp: "2025-03-30T02:22:00Z", channel: "#zurich-asset-mgmt" },
  { id: "act-3", caseId: "CS-2048", customerId: "cust-4", type: "escalation", sender: "Orchestrator Agent", content: "🔴 Escalated to on-call engineering. Confidence 52% — below threshold. FINMA regulatory deadline in 4 hours. SLA: P1 response within 30 min.", timestamp: "2025-03-30T02:25:00Z", channel: "#zurich-asset-mgmt" },
  { id: "act-4", caseId: "CS-2044", customerId: "cust-2", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Cash flow projection variance >15% on 8 institutional portfolios. EUR/CHF FX rate feed stale. March closing period at risk.", timestamp: "2025-03-30T04:30:00Z", channel: "#helvetia-capital" },
  { id: "act-5", caseId: "CS-2044", customerId: "cust-2", type: "agent-summary", sender: "AI Support Summary", content: "Multi-currency projection variance caused by stale FX rate feed from SIX Financial. Similar to INC-312 from January. Runbook RB-045 recommends manual FX rate override during outage.", timestamp: "2025-03-30T04:38:00Z", channel: "#helvetia-capital" },
  { id: "act-6", caseId: "CS-2044", customerId: "cust-2", type: "approval-request", sender: "Resolution Agent", content: "⏳ Approval needed: Override FX rate feed with manual CHF/EUR fix during outage. Rerun reconciliation batch for March closing. Risk: Medium. Confidence: 74%.", timestamp: "2025-03-30T04:42:00Z", channel: "#helvetia-capital" },
  { id: "act-7", caseId: "CS-2044", customerId: "cust-2", type: "approval-granted", sender: "Sarah Chen", content: "✅ Approved. Apply the manual FX rate override. Notify Helvetia Capital portfolio managers of the recalculation.", timestamp: "2025-03-30T05:10:00Z", channel: "#helvetia-capital" },
  { id: "act-8", caseId: "CS-2044", customerId: "cust-2", type: "customer-update", sender: "Support Studio · Draft", content: "Hi Helvetia Capital team — we detected a stale FX rate feed affecting your multi-currency cash flow projections. We've applied a manual rate override and are rerunning the March reconciliation. Expected completion: 45 minutes. No data loss. We'll confirm when complete.", timestamp: "2025-03-30T05:15:00Z", channel: "#helvetia-capital" },
  { id: "act-9", caseId: "CS-2041", customerId: "cust-1", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Forecast drift detected: Alpina Bank corporate cash flow predictions not updating after Q1 data migration. 340 accounts showing stale forecasts.", timestamp: "2025-03-30T09:14:00Z", channel: "#alpina-bank" },
  { id: "act-10", caseId: "CS-2041", customerId: "cust-1", type: "agent-summary", sender: "AI Support Summary", content: "Model using pre-migration feature vectors. Q1 data migration on Mar 27 changed 6 data source mappings. 4 mappings conflict with model training baseline. 340 corporate accounts affected, confidence dropped 89→61%.", timestamp: "2025-03-30T09:16:00Z", channel: "#alpina-bank" },
  { id: "act-11", caseId: "CS-2041", customerId: "cust-1", type: "approval-request", sender: "Resolution Agent", content: "⏳ Approval needed: Retrain forecast model with post-migration data mappings. Preserves 2/6 custom mappings. Risk: Medium. Confidence: 78%.", timestamp: "2025-03-30T09:19:00Z", channel: "#alpina-bank" },
  { id: "act-12", caseId: "CS-2041", customerId: "cust-1", type: "approval-granted", sender: "Sarah Chen", content: "✅ Approved. Run the retraining. Let me know if forecast confidence doesn't recover within 2 hours.", timestamp: "2025-03-30T09:32:00Z", channel: "#alpina-bank" },
  { id: "act-13", caseId: "CS-2041", customerId: "cust-1", type: "resolution", sender: "Resolution Agent", content: "✅ Model retrained with post-migration mappings. Forecast confidence recovering 61→74%. Corporate account predictions updating. Monitoring for 48 hours.", timestamp: "2025-03-30T09:47:00Z", channel: "#alpina-bank" },
  { id: "act-14", caseId: "CS-2046", customerId: "cust-3", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Forecast confidence drop: Nord Insurance premium cash flow projections fell from 84% to 67% after new product line addition.", timestamp: "2025-03-29T18:00:00Z", channel: "#nord-insurance" },
  { id: "act-15", caseId: "CS-2046", customerId: "cust-3", type: "agent-summary", sender: "AI Support Summary", content: "Model not calibrated for 3 new insurance product lines added by Nord Insurance. Runbook RB-071 covers model recalibration. Auto-fix confidence: 83%.", timestamp: "2025-03-29T18:08:00Z", channel: "#nord-insurance" },
  { id: "act-16", caseId: "CS-2049", customerId: "cust-4", type: "note", sender: "Customer Context Agent", content: "📋 Zurich Asset Mgmt CRO flagged forecast confidence collapse. CHF 2.4B in managed assets affected. Board presentation scheduled for tomorrow. Escalation recommended.", timestamp: "2025-03-30T08:05:00Z", channel: "#zurich-asset-mgmt" },
  { id: "act-17", caseId: "CS-2051", customerId: "cust-5", type: "resolution", sender: "Resolution Agent", content: "✅ Auto-resolved: Canton Bern Treasury forecast confidence dip caused by delayed Q1 tax revenue data. Data feed caught up. Pattern whitelisted.", timestamp: "2025-03-29T09:00:00Z", channel: "#canton-bern" },
  { id: "act-18", caseId: "CS-2047", customerId: "cust-3", type: "agent-summary", sender: "AI Support Summary", content: "GDPR retention audit at Nord Insurance flagged 1,200 archived policyholder records exceeding retention period. Fix: run automated deletion job with compliance team approval. Confidence: 90%.", timestamp: "2025-03-29T11:30:00Z", channel: "#nord-insurance" },
];

// --- Agent orchestration steps (reusable per case) ---
export interface AgentStep {
  agent: string;
  action: string;
  result: string;
  timestamp: string;
  confidence: number;
}

export const sampleOrchestration: AgentStep[] = [
  { agent: "Orchestrator", action: "Triaged incoming telemetry alert", result: "Classified as Forecast Drift / High priority", timestamp: "09:14:02", confidence: 92 },
  { agent: "Telemetry Agent", action: "Pulled 72-hour forecast metrics and anomaly signals", result: "Corporate forecasts stale since Mar 27 migration. Confidence ↓89→61%. 340 accounts affected.", timestamp: "09:14:18", confidence: 88 },
  { agent: "Customer Context Agent", action: "Retrieved deployment config and data migration log", result: "Data migration on Mar 27 by admin@alpina.ch — 6 data source mapping changes", timestamp: "09:14:34", confidence: 95 },
  { agent: "Knowledge Agent", action: "Searched runbooks and past incidents", result: "Matched RB-118 (Post-Migration Model Retraining). Similar incident at 2 other bank customers — 89% success rate", timestamp: "09:14:48", confidence: 85 },
  { agent: "Resolution Agent", action: "Proposed: Retrain model with post-migration data mappings", result: "Awaiting approval — confidence 78%, below 80% auto-threshold", timestamp: "09:15:02", confidence: 78 },
];

// --- Case thread messages (rich Teams-style) ---
export const caseThread = [
  { id: 1, type: "system" as const, sender: "Telemetry Agent", content: "⚡ Forecast drift detected on Alpina Bank's Cash Flow Forecasting Agent. Corporate cash flow predictions not updating since Q1 data migration. 340 accounts showing stale 7-day forecasts.", timestamp: "09:14" },
  { id: 2, type: "agent" as const, sender: "AI Support Summary", content: "**Root Cause Analysis:**\n\nModel using pre-migration feature vectors after Alpina Bank's Q1 data migration. 6 data source mapping changes on Mar 27 — 4 conflict with model training baseline.\n\n• Forecast confidence: 89% → 61%\n• Corporate accounts affected: 340\n• Stale predictions: 7-day cash flow forecasts\n\nRecommended: Retrain model with post-migration mappings (RB-118).", timestamp: "09:16" },
  { id: 3, type: "agent" as const, sender: "Resolution Agent", content: "**Proposed Action Plan:**\n\n1. Retrain forecast model with post-migration data mappings\n2. Preserve 2 valid custom mappings, update 4 conflicting ones\n3. Apply guardrail for future data migration validation\n\n⚠️ Confidence: 78% — below 80% auto-approval threshold\nRequires human approval.", timestamp: "09:19" },
  { id: 4, type: "summary" as const, sender: "Support Studio", content: "**Case Summary for Review:**\n\nAlpina Bank's cash flow forecasts stopped updating after a Q1 data migration changed 6 data source mappings. AI agents identified stale feature vectors as the root cause and propose retraining the model with post-migration data. Approval needed because confidence is 78% (below 80% threshold). 340 corporate accounts are affected.", timestamp: "09:20" },
];

// --- Issue themes for Insights page ---
export const issueThemes = [
  { theme: "Forecast drift after data migrations", count: 22, trend: "up" as const },
  { theme: "FX rate feed failures during market hours", count: 16, trend: "up" as const },
  { theme: "Reconciliation pipeline stalls (multi-currency)", count: 13, trend: "stable" as const },
  { theme: "Data feed connector timeouts (ERP/SAP)", count: 11, trend: "down" as const },
  { theme: "Regulatory reporting export failures", count: 8, trend: "stable" as const },
  { theme: "Model confidence drops post-retraining", count: 7, trend: "up" as const },
];

// --- KPIs ---
export const kpis = {
  automationRate: 76,
  unresolvedExceptions: 11,
  atRiskCustomers: 2,
  avgResolutionTime: "1.8 hrs",
};

// --- Trend data ---
export const trendData = [
  { date: "Mar 24", automated: 38, manual: 10, total: 48 },
  { date: "Mar 25", automated: 42, manual: 8, total: 50 },
  { date: "Mar 26", automated: 45, manual: 7, total: 52 },
  { date: "Mar 27", automated: 40, manual: 14, total: 54 },
  { date: "Mar 28", automated: 44, manual: 9, total: 53 },
  { date: "Mar 29", automated: 47, manual: 6, total: 53 },
  { date: "Mar 30", automated: 36, manual: 15, total: 51 },
];

// --- Approvals queue ---
export interface ApprovalItem {
  caseId: string;
  customerId: string;
  customer: string;
  action: string;
  confidence: number;
  risk: RiskLevel;
  agent: string;
  elapsed: string;
  runbook: string;
  product: string;
}

export const pendingApprovals: ApprovalItem[] = [
  { caseId: "CS-2044", customerId: "cust-2", customer: "Helvetia Capital", action: "Override FX rate feed with manual CHF/EUR fix during outage and rerun March reconciliation batch", confidence: 74, risk: "medium", agent: "Resolution Agent", elapsed: "28 min", runbook: "RB-045", product: "Cash Flow Forecasting Agent" },
  { caseId: "CS-2048", customerId: "cust-4", customer: "Zurich Asset Mgmt", action: "Partition fund portfolio aggregation into parallel batches and resubmit FINMA report", confidence: 52, risk: "critical", agent: "Resolution Agent", elapsed: "7 hr", runbook: "RB-092", product: "Cash Flow Forecasting Agent" },
  { caseId: "CS-2050", customerId: "cust-4", customer: "Zurich Asset Mgmt", action: "Extend forecast window from 30 to 90 days for Q2 planning cycle", confidence: 69, risk: "high", agent: "Telemetry Agent", elapsed: "12 hr", runbook: "RB-033", product: "Cash Flow Forecasting Agent" },
];

export const recentApprovals: { caseId: string; customer: string; action: string; approvedBy: string; time: string; outcome: string }[] = [
  { caseId: "CS-2041", customer: "Alpina Bank", action: "Retrain forecast model with post-migration data mappings", approvedBy: "Sarah Chen", time: "09:32 AM", outcome: "Confidence recovering 61→74%" },
  { caseId: "CS-2044", customer: "Helvetia Capital", action: "Override FX rate feed + rerun March reconciliation", approvedBy: "Sarah Chen", time: "05:10 AM", outcome: "Reconciliation resumed, ETA 40 min" },
  { caseId: "CS-2051", customer: "Canton Bern Treasury", action: "Whitelist Q1 tax revenue delay pattern in anomaly detection", approvedBy: "Auto-approved (96%)", time: "Yesterday", outcome: "Auto-resolved" },
];

// --- Escalation items ---
export interface EscalationItem {
  caseId: string;
  customer: string;
  product: string;
  title: string;
  severity: RiskLevel;
  reason: string;
  escalatedTo: string;
  escalatedAt: string;
  sla: string;
  status: "active" | "acknowledged" | "resolved";
}

export const escalations: EscalationItem[] = [
  { caseId: "CS-2048", customer: "Zurich Asset Mgmt", product: "Cash Flow Forecasting Agent", title: "FINMA monthly reporting deadline in 4 hours — automated submission blocked", severity: "critical", reason: "Confidence 52%, FINMA regulatory deadline, 3 of 8 fund portfolios missing", escalatedTo: "Platform Engineering (on-call)", escalatedAt: "2025-03-30T02:25:00Z", sla: "P1 — 30 min response", status: "acknowledged" },
  { caseId: "CS-2049", customer: "Zurich Asset Mgmt", product: "Cash Flow Forecasting Agent", title: "Forecast model confidence collapsed to 31% after data feed corruption", severity: "critical", reason: "CHF 2.4B in managed assets affected, all portfolio projections unreliable", escalatedTo: "Data Engineering + Risk", escalatedAt: "2025-03-30T08:10:00Z", sla: "P1 — 1 hr response", status: "active" },
  { caseId: "CS-2050", customer: "Alpina Bank", product: "Cash Flow Forecasting Agent", title: "Unexplained 23% variance in corporate cash flow projections", severity: "high", reason: "Pattern emerged after March rebalancing, affects corporate treasury planning", escalatedTo: "ML Engineering", escalatedAt: "2025-03-30T05:15:00Z", sla: "P2 — 4 hr response", status: "acknowledged" },
];

// --- Agent activity summaries ---
export interface AgentActivitySummary {
  agent: string;
  casesHandled: number;
  avgConfidence: number;
  autoResolved: number;
  escalated: number;
  topAction: string;
  status: "active" | "idle";
}

export const agentActivity: AgentActivitySummary[] = [
  { agent: "Orchestrator Agent", casesHandled: 12, avgConfidence: 91, autoResolved: 0, escalated: 2, topAction: "Triaged and routed 12 cases across 5 bank customers", status: "active" },
  { agent: "Telemetry Agent", casesHandled: 10, avgConfidence: 86, autoResolved: 1, escalated: 0, topAction: "Detected forecast drift and data feed anomalies across 3 deployments", status: "active" },
  { agent: "Knowledge Agent", casesHandled: 8, avgConfidence: 82, autoResolved: 0, escalated: 0, topAction: "Matched 6 cases to existing runbooks", status: "active" },
  { agent: "Customer Context Agent", casesHandled: 7, avgConfidence: 90, autoResolved: 0, escalated: 1, topAction: "Retrieved deployment configs for 5 bank customers", status: "active" },
  { agent: "Resolution Agent", casesHandled: 9, avgConfidence: 74, autoResolved: 3, escalated: 2, topAction: "Applied model retraining, FX rate overrides, and reconciliation fixes", status: "active" },
];
