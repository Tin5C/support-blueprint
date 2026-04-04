export const products = [
  { id: "prod-1", name: "Helio CRM Agent", version: "3.4.2", type: "AI-Powered CRM Platform" },
  { id: "prod-2", name: "OpsPilot Assistant", version: "2.1.0", type: "Operations Intelligence Suite" },
  { id: "prod-3", name: "Finance Flow Agent", version: "1.8.5", type: "Financial Automation Platform" },
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
  { id: "cust-1", name: "Acme Manufacturing", product: "Helio CRM Agent", environment: "Azure West US", risk: "high", openCases: 4, automationRate: 68, healthScore: 62, lastActivity: "8 min ago", deploymentDate: "2024-06-12", nodes: 32 },
  { id: "cust-2", name: "Northwind Health", product: "OpsPilot Assistant", environment: "Azure North Europe", risk: "low", openCases: 1, automationRate: 93, healthScore: 91, lastActivity: "1 hr ago", deploymentDate: "2024-04-20", nodes: 48 },
  { id: "cust-3", name: "Contoso Digital", product: "Finance Flow Agent", environment: "Azure EU-West", risk: "medium", openCases: 3, automationRate: 79, healthScore: 73, lastActivity: "22 min ago", deploymentDate: "2024-09-05", nodes: 20 },
  { id: "cust-4", name: "HelioWorks AG", product: "Helio CRM Agent", environment: "Azure West Europe", risk: "critical", openCases: 3, automationRate: 54, healthScore: 38, lastActivity: "2 min ago", deploymentDate: "2024-03-01", nodes: 64 },
  { id: "cust-5", name: "Alpine Grid", product: "OpsPilot Assistant", environment: "Azure Switzerland North", risk: "low", openCases: 1, automationRate: 96, healthScore: 95, lastActivity: "3 hr ago", deploymentDate: "2024-08-18", nodes: 16 },
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
  // Acme Manufacturing — Helio CRM Agent
  { id: "CS-2041", customerId: "cust-1", title: "CRM Agent usage dropped after customer-specific configuration drift", status: "in-progress", priority: "high", trigger: "telemetry", category: "Configuration", createdAt: "2025-03-30T09:14:00Z", updatedAt: "2025-03-30T09:47:00Z", confidence: 78, assignedAgent: "Resolution Agent", summary: "smart-routing and auto-escalation features dropped 34% usage after APAC config change. 340 users affected, health score dropped 82→64." },
  { id: "CS-2042", customerId: "cust-1", title: "Lead scoring model returning stale predictions for enterprise tier", status: "open", priority: "medium", trigger: "telemetry", category: "AI Quality", createdAt: "2025-03-30T07:20:00Z", updatedAt: "2025-03-30T07:20:00Z", confidence: 62, assignedAgent: "Knowledge Agent", summary: "Lead scoring predictions for enterprise-tier accounts haven't refreshed in 48hrs. Model pipeline shows stale feature vectors from data warehouse sync delay." },
  { id: "CS-2043", customerId: "cust-1", title: "Custom Salesforce connector timeout during bulk sync", status: "waiting", priority: "medium", trigger: "customer", category: "Integration", createdAt: "2025-03-29T14:00:00Z", updatedAt: "2025-03-30T06:30:00Z", confidence: 71, assignedAgent: "Telemetry Agent", summary: "Bulk sync of 120K records to Salesforce failing with 504 timeout. Customer reports it worked before their Salesforce sandbox refresh." },
  { id: "CS-2044", customerId: "cust-1", title: "SSO token refresh loop causing intermittent logouts", status: "open", priority: "low", trigger: "customer", category: "Authentication", createdAt: "2025-03-30T10:05:00Z", updatedAt: "2025-03-30T10:05:00Z", confidence: 45, assignedAgent: "Customer Context Agent", summary: "3 users in APAC region reporting intermittent logouts every ~20 minutes. Likely related to SSO token refresh configuration with Okta." },

  // Northwind Health — OpsPilot Assistant
  { id: "CS-2045", customerId: "cust-2", title: "Scheduling optimization suggesting impossible shift overlaps", status: "in-progress", priority: "medium", trigger: "telemetry", category: "AI Quality", createdAt: "2025-03-29T18:00:00Z", updatedAt: "2025-03-30T08:15:00Z", confidence: 83, assignedAgent: "Resolution Agent", summary: "OpsPilot suggesting nurse shift assignments that violate 12-hour rest requirements. Constraint solver using outdated labor rules after customer updated their policy module." },

  // Contoso Digital — Finance Flow Agent
  { id: "CS-2046", customerId: "cust-3", title: "Invoice reconciliation pipeline stalled on multi-currency batch", status: "in-progress", priority: "high", trigger: "telemetry", category: "Performance", createdAt: "2025-03-30T04:30:00Z", updatedAt: "2025-03-30T09:00:00Z", confidence: 74, assignedAgent: "Resolution Agent", summary: "Multi-currency reconciliation batch (EUR/GBP/CHF) stalled at 68% with memory pressure on worker pods. 4,200 invoices pending. SLA window closes in 3 hours." },
  { id: "CS-2047", customerId: "cust-3", title: "Expense categorization accuracy dropped below threshold", status: "open", priority: "medium", trigger: "telemetry", category: "AI Quality", createdAt: "2025-03-30T06:45:00Z", updatedAt: "2025-03-30T06:45:00Z", confidence: 58, assignedAgent: "Knowledge Agent", summary: "Expense auto-categorization accuracy fell from 94% to 81% after Contoso added 3 new GL codes. Model needs retraining or rule augmentation." },
  { id: "CS-2048", customerId: "cust-3", title: "Approval workflow routing to deactivated manager accounts", status: "waiting", priority: "low", trigger: "customer", category: "Configuration", createdAt: "2025-03-29T11:00:00Z", updatedAt: "2025-03-30T02:00:00Z", confidence: 90, assignedAgent: "Resolution Agent", summary: "3 approval chains broken after org restructure. Deactivated manager accounts not cleaned up from routing rules." },

  // HelioWorks AG — Helio CRM Agent
  { id: "CS-2049", customerId: "cust-4", title: "Critical: Customer data replication lag causing stale records in EU region", status: "in-progress", priority: "critical", trigger: "telemetry", category: "Data Integrity", createdAt: "2025-03-30T02:15:00Z", updatedAt: "2025-03-30T09:30:00Z", confidence: 52, assignedAgent: "Resolution Agent", summary: "Cross-region replication lag at 45 seconds (threshold: 5s). EU customer records showing data from 2+ hours ago. 1,200 active users seeing stale contact information." },
  { id: "CS-2050", customerId: "cust-4", title: "GDPR data deletion request failing silently on archived records", status: "open", priority: "critical", trigger: "customer", category: "Compliance", createdAt: "2025-03-30T08:00:00Z", updatedAt: "2025-03-30T08:00:00Z", confidence: 35, assignedAgent: "Customer Context Agent", summary: "HelioWorks DPO reports that GDPR deletion requests complete successfully but archived records in cold storage are not being purged. Regulatory deadline in 72 hours." },
  { id: "CS-2051", customerId: "cust-4", title: "Predictive pipeline scoring timeouts on large account hierarchies", status: "waiting", priority: "high", trigger: "telemetry", category: "Performance", createdAt: "2025-03-29T20:00:00Z", updatedAt: "2025-03-30T05:00:00Z", confidence: 69, assignedAgent: "Telemetry Agent", summary: "Account hierarchy scoring timing out for accounts with >500 child entities. Affects 8 enterprise accounts representing 40% of HelioWorks' pipeline value." },

  // Alpine Grid — OpsPilot Assistant
  { id: "CS-2052", customerId: "cust-5", title: "False positive alert on power grid anomaly detection", status: "resolved", priority: "low", trigger: "telemetry", category: "Alert Tuning", createdAt: "2025-03-28T14:00:00Z", updatedAt: "2025-03-29T09:00:00Z", confidence: 96, assignedAgent: "Resolution Agent", summary: "Planned maintenance window at Substation 7 triggered anomaly detection. Pattern whitelisted. Auto-resolved by tuning agent." },
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
  { id: "act-1", caseId: "CS-2049", customerId: "cust-4", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Replication lag alert: EU region at 45s (threshold 5s). 1,200 users affected. Initiating diagnostic.", timestamp: "2025-03-30T02:15:00Z", channel: "#helioworks-ag" },
  { id: "act-2", caseId: "CS-2049", customerId: "cust-4", type: "agent-summary", sender: "AI Support Summary", content: "Root cause identified: WAL replay bottleneck on secondary EU replica. Primary region write throughput exceeds replica capacity after HelioWorks' March data migration added 2.4M records.", timestamp: "2025-03-30T02:22:00Z", channel: "#helioworks-ag" },
  { id: "act-3", caseId: "CS-2049", customerId: "cust-4", type: "escalation", sender: "Orchestrator Agent", content: "🔴 Escalated to on-call engineering. Confidence 52% — below threshold. Data integrity risk for 1,200 EU users. SLA: P1 response within 30 min.", timestamp: "2025-03-30T02:25:00Z", channel: "#helioworks-ag" },
  { id: "act-4", caseId: "CS-2046", customerId: "cust-3", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Invoice reconciliation pipeline stalled at 68%. Memory pressure on 3/5 worker pods. 4,200 invoices pending. SLA window: 3 hours remaining.", timestamp: "2025-03-30T04:30:00Z", channel: "#contoso-digital" },
  { id: "act-5", caseId: "CS-2046", customerId: "cust-3", type: "agent-summary", sender: "AI Support Summary", content: "Multi-currency batch (EUR/GBP/CHF) exceeding memory allocation. Similar to INC-312 from January. Runbook RB-045 recommends splitting batch by currency and scaling worker pool.", timestamp: "2025-03-30T04:38:00Z", channel: "#contoso-digital" },
  { id: "act-6", caseId: "CS-2046", customerId: "cust-3", type: "approval-request", sender: "Resolution Agent", content: "⏳ Approval needed: Scale worker pool 5→8 pods and split reconciliation into 3 currency-specific batches. Risk: Low. Confidence: 74%. Estimated recovery: 40 min.", timestamp: "2025-03-30T04:42:00Z", channel: "#contoso-digital" },
  { id: "act-7", caseId: "CS-2046", customerId: "cust-3", type: "approval-granted", sender: "Marcus Webb", content: "✅ Approved. Go ahead with the split + scale approach. Please notify the Contoso finance team of the delay.", timestamp: "2025-03-30T05:10:00Z", channel: "#contoso-digital" },
  { id: "act-8", caseId: "CS-2046", customerId: "cust-3", type: "customer-update", sender: "Support Studio · Draft", content: "Hi Contoso team — we detected a delay in your multi-currency invoice reconciliation batch. We've scaled processing capacity and split the batch to resolve the bottleneck. Expected completion: 45 minutes. No data loss. We'll confirm when complete.", timestamp: "2025-03-30T05:15:00Z", channel: "#contoso-digital" },
  { id: "act-9", caseId: "CS-2041", customerId: "cust-1", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Usage anomaly: Helio CRM Agent usage dropped 34% across Acme's APAC deployment. smart-routing and auto-escalation features most affected.", timestamp: "2025-03-30T09:14:00Z", channel: "#acme-manufacturing" },
  { id: "act-10", caseId: "CS-2041", customerId: "cust-1", type: "agent-summary", sender: "AI Support Summary", content: "Configuration drift detected: 6 routing rule modifications in APAC region on Mar 27. 4 rules conflict with blueprint baseline. 340 users affected, health score dropped 82→64.", timestamp: "2025-03-30T09:16:00Z", channel: "#acme-manufacturing" },
  { id: "act-11", caseId: "CS-2041", customerId: "cust-1", type: "approval-request", sender: "Resolution Agent", content: "⏳ Approval needed: Merge APAC routing customizations with blueprint baseline. Preserves 2/6 custom rules. Risk: Medium. Confidence: 78%.", timestamp: "2025-03-30T09:19:00Z", channel: "#acme-manufacturing" },
  { id: "act-12", caseId: "CS-2041", customerId: "cust-1", type: "approval-granted", sender: "Sarah Chen", content: "✅ Approved. Apply the merge. Let me know if usage doesn't recover within 2 hours.", timestamp: "2025-03-30T09:32:00Z", channel: "#acme-manufacturing" },
  { id: "act-13", caseId: "CS-2041", customerId: "cust-1", type: "resolution", sender: "Resolution Agent", content: "✅ Configuration remediation applied. smart-routing restored for 100% of segments. Usage recovering +18% from trough. Health score trending 64→71. Monitoring for 48 hours.", timestamp: "2025-03-30T09:47:00Z", channel: "#acme-manufacturing" },
  { id: "act-14", caseId: "CS-2045", customerId: "cust-2", type: "telemetry-alert", sender: "Telemetry Agent", content: "⚡ Scheduling constraint violation detected: OpsPilot suggesting shifts that violate Northwind's updated 12-hour rest policy.", timestamp: "2025-03-29T18:00:00Z", channel: "#northwind-health" },
  { id: "act-15", caseId: "CS-2045", customerId: "cust-2", type: "agent-summary", sender: "AI Support Summary", content: "Constraint solver using outdated labor rules (v2.3) after Northwind updated their policy module to v3.1. Runbook RB-071 covers policy sync. Auto-fix confidence: 83%.", timestamp: "2025-03-29T18:08:00Z", channel: "#northwind-health" },
  { id: "act-16", caseId: "CS-2050", customerId: "cust-4", type: "note", sender: "Customer Context Agent", content: "📋 HelioWorks AG DPO (Jan Mueller) flagged GDPR deletion gap. Regulatory deadline: April 2. Legal exposure if archived records not purged. Escalation recommended.", timestamp: "2025-03-30T08:05:00Z", channel: "#helioworks-ag" },
  { id: "act-17", caseId: "CS-2052", customerId: "cust-5", type: "resolution", sender: "Resolution Agent", content: "✅ Auto-resolved: Planned maintenance at Substation 7 matched known pattern. Anomaly detection whitelist updated. No action required.", timestamp: "2025-03-29T09:00:00Z", channel: "#alpine-grid" },
  { id: "act-18", caseId: "CS-2048", customerId: "cust-3", type: "agent-summary", sender: "AI Support Summary", content: "3 approval workflow chains broken due to deactivated manager accounts after Contoso's org restructure. Fix: remap to updated reporting hierarchy. Confidence: 90%.", timestamp: "2025-03-29T11:30:00Z", channel: "#contoso-digital" },
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
  { agent: "Orchestrator", action: "Triaged incoming telemetry alert", result: "Classified as Configuration Drift / High priority", timestamp: "09:14:02", confidence: 92 },
  { agent: "Telemetry Agent", action: "Pulled 72-hour usage metrics and anomaly signals", result: "smart-routing ↓42%, auto-escalation ↓38%, manual-mode fallback ↑310%. Anomaly score: 0.91", timestamp: "09:14:18", confidence: 88 },
  { agent: "Customer Context Agent", action: "Retrieved deployment config and change log", result: "Config change on Mar 27 by admin@acme.com — 6 routing rule modifications in APAC region", timestamp: "09:14:34", confidence: 95 },
  { agent: "Knowledge Agent", action: "Searched runbooks and past incidents", result: "Matched RB-118 (Config Drift Remediation). Similar incident at 2 other customers — 89% success rate", timestamp: "09:14:48", confidence: 85 },
  { agent: "Resolution Agent", action: "Proposed: Merge APAC customizations with blueprint baseline", result: "Awaiting approval — confidence 78%, below 80% auto-threshold", timestamp: "09:15:02", confidence: 78 },
];

// --- Case thread messages (rich Teams-style) ---
export const caseThread = [
  { id: 1, type: "system" as const, sender: "Telemetry Agent", content: "⚡ Usage anomaly detected on Acme Manufacturing's Helio CRM deployment. smart-routing and auto-escalation features dropped 34% over 72 hours. Initiating diagnostic sequence.", timestamp: "09:14" },
  { id: 2, type: "agent" as const, sender: "AI Support Summary", content: "**Root Cause Analysis:**\n\nConfiguration drift detected in Acme's APAC region. 6 routing rule modifications on Mar 27 — 4 conflict with blueprint defaults.\n\n• smart-routing: ↓42% usage (fallback to manual)\n• auto-escalation: ↓38% (deactivated for 40% of segments)\n• 340 end-users affected\n• Health score: 82 → 64\n\nRecommended: Merge customizations with baseline (RB-118).", timestamp: "09:16" },
  { id: 3, type: "agent" as const, sender: "Resolution Agent", content: "**Proposed Action Plan:**\n\n1. Merge APAC routing customizations with blueprint baseline\n2. Preserve 2 valid custom rules, restore 4 conflicting ones\n3. Apply guardrail for future config changes\n\n⚠️ Confidence: 78% — below 80% auto-approval threshold\nRequires human approval.", timestamp: "09:19" },
  { id: 4, type: "summary" as const, sender: "Support Studio", content: "**Case Summary for Review:**\n\nAcme Manufacturing's CRM agent usage dropped 34% after a configuration change in their APAC region. AI agents identified configuration drift as the root cause and propose merging customizations with the validated baseline. Approval needed because confidence is 78% (below 80% threshold). 340 users are affected.", timestamp: "09:20" },
];

// --- Issue themes for Insights page ---
export const issueThemes = [
  { theme: "Configuration drift after customer changes", count: 22, trend: "up" as const },
  { theme: "AI model accuracy degradation post-update", count: 16, trend: "up" as const },
  { theme: "Cross-region replication lag spikes", count: 13, trend: "stable" as const },
  { theme: "Integration connector timeouts", count: 11, trend: "down" as const },
  { theme: "Approval workflow routing failures", count: 8, trend: "stable" as const },
  { theme: "SLA window violations on batch jobs", count: 7, trend: "up" as const },
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
  { caseId: "CS-2046", customerId: "cust-3", customer: "Contoso Digital", action: "Scale worker pool 5→8 pods, split reconciliation into currency-specific batches", confidence: 74, risk: "medium", agent: "Resolution Agent", elapsed: "28 min", runbook: "RB-045", product: "Finance Flow Agent" },
  { caseId: "CS-2049", customerId: "cust-4", customer: "HelioWorks AG", action: "Increase replica write capacity and trigger WAL replay catch-up", confidence: 52, risk: "critical", agent: "Resolution Agent", elapsed: "7 hr", runbook: "RB-092", product: "Helio CRM Agent" },
  { caseId: "CS-2051", customerId: "cust-4", customer: "HelioWorks AG", action: "Partition account hierarchy scoring into parallel batches of 100", confidence: 69, risk: "high", agent: "Telemetry Agent", elapsed: "12 hr", runbook: "RB-033", product: "Helio CRM Agent" },
];

export const recentApprovals: { caseId: string; customer: string; action: string; approvedBy: string; time: string; outcome: string }[] = [
  { caseId: "CS-2041", customer: "Acme Manufacturing", action: "Merge APAC routing config with blueprint baseline", approvedBy: "Sarah Chen", time: "09:32 AM", outcome: "Usage recovering +18%" },
  { caseId: "CS-2046", customer: "Contoso Digital", action: "Scale + split invoice reconciliation batch", approvedBy: "Marcus Webb", time: "05:10 AM", outcome: "Pipeline resumed, ETA 40 min" },
  { caseId: "CS-2052", customer: "Alpine Grid", action: "Whitelist maintenance pattern in anomaly detection", approvedBy: "Auto-approved (96%)", time: "Yesterday", outcome: "Auto-resolved" },
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
  { caseId: "CS-2049", customer: "HelioWorks AG", product: "Helio CRM Agent", title: "Cross-region replication lag — EU data integrity risk", severity: "critical", reason: "Confidence 52%, data integrity at risk for 1,200 users", escalatedTo: "Platform Engineering (on-call)", escalatedAt: "2025-03-30T02:25:00Z", sla: "P1 — 30 min response", status: "acknowledged" },
  { caseId: "CS-2050", customer: "HelioWorks AG", product: "Helio CRM Agent", title: "GDPR deletion gap on archived records", severity: "critical", reason: "Regulatory deadline April 2, compliance risk", escalatedTo: "Data Engineering + Legal", escalatedAt: "2025-03-30T08:10:00Z", sla: "P1 — 1 hr response", status: "active" },
  { caseId: "CS-2051", customer: "HelioWorks AG", product: "Helio CRM Agent", title: "Pipeline scoring timeouts on large hierarchies", severity: "high", reason: "Affects 40% of customer pipeline value", escalatedTo: "ML Engineering", escalatedAt: "2025-03-30T05:15:00Z", sla: "P2 — 4 hr response", status: "acknowledged" },
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
  { agent: "Orchestrator Agent", casesHandled: 12, avgConfidence: 91, autoResolved: 0, escalated: 2, topAction: "Triaged and routed 12 cases across 5 customers", status: "active" },
  { agent: "Telemetry Agent", casesHandled: 10, avgConfidence: 86, autoResolved: 1, escalated: 0, topAction: "Detected usage anomalies on 3 deployments", status: "active" },
  { agent: "Knowledge Agent", casesHandled: 8, avgConfidence: 82, autoResolved: 0, escalated: 0, topAction: "Matched 6 cases to existing runbooks", status: "active" },
  { agent: "Customer Context Agent", casesHandled: 7, avgConfidence: 90, autoResolved: 0, escalated: 1, topAction: "Retrieved deployment configs for 5 customers", status: "active" },
  { agent: "Resolution Agent", casesHandled: 9, avgConfidence: 74, autoResolved: 3, escalated: 2, topAction: "Applied config remediation and scaling fixes", status: "active" },
];
