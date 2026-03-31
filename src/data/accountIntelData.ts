// Account Intelligence – standalone page mock data

export interface AISource {
  id: string;
  name: string;
  type: "crm" | "support" | "slack" | "teams" | "email" | "docs" | "github" | "telemetry" | "cloud-logs" | "api-docs" | "runbooks" | "customer-notes";
  status: "connected" | "partial" | "not-connected";
  freshness: string;
  coverage: number;          // 0-100
  extractedSignals: string[];
}

export interface AccountOverview {
  summary: string;
  deploymentSummary: string;
  keyIntegrations: string[];
  activeEnvironments: { name: string; status: string }[];
  supportHistorySnapshot: string;
  recentIncidents: { title: string; date: string; severity: string }[];
  stakeholders: { name: string; role: string }[];
  openRisks: { title: string; severity: string }[];
}

export interface SupportDesignInput {
  complexity: string;
  recommendedPosture: string;
  suggestedPlaybooks: string[];
  likelyIssueCategories: string[];
  escalationPaths: string[];
  approvalRequirements: string[];
  monitoringGaps: string[];
  customerRestrictions: string[];
  recommendedChannel: string;
}

export interface AgentContextItem {
  label: string;
  value: string;
  tags: string[];   // e.g. "used by agents", "used in playbooks"
}

export interface GapRecommendation {
  id: string;
  type: "missing-source" | "outdated" | "unclear-ownership" | "monitoring-gap" | "missing-approval" | "weak-docs";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

export interface AccountIntelRecord {
  id: string;
  name: string;
  product: string;
  deploymentStatus: string;
  supportStatus: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  connectedSourcesCount: number;
  lastSync: string;
  agentReadiness: "ready" | "partial" | "not-ready";
  sources: AISource[];
  overview: AccountOverview;
  supportDesign: SupportDesignInput;
  agentContext: AgentContextItem[];
  gaps: GapRecommendation[];
}

// ─── Schindler ───

const schindlerSources: AISource[] = [
  { id: "s-1", name: "Salesforce CRM", type: "crm", status: "connected", freshness: "2h ago", coverage: 88, extractedSignals: ["Contract tier: Enterprise", "Renewal in 45 days", "3 open opportunities"] },
  { id: "s-2", name: "Zendesk", type: "support", status: "connected", freshness: "15m ago", coverage: 94, extractedSignals: ["142 tickets last 90 days", "Avg resolution: 4.2h", "Top issue: grounding failures"] },
  { id: "s-3", name: "Microsoft Teams", type: "teams", status: "connected", freshness: "Live", coverage: 72, extractedSignals: ["Active support channel", "12 threads this week", "Preferred escalation path"] },
  { id: "s-4", name: "Confluence docs", type: "docs", status: "connected", freshness: "1d ago", coverage: 65, extractedSignals: ["Deployment guide available", "Runbook partially outdated", "Architecture diagram linked"] },
  { id: "s-5", name: "GitHub – schindler/copilot-hr", type: "github", status: "connected", freshness: "4h ago", coverage: 82, extractedSignals: ["18 recent commits", "3 open issues linked to support", "CI/CD pipeline healthy"] },
  { id: "s-6", name: "Azure Monitor", type: "telemetry", status: "connected", freshness: "Live", coverage: 91, extractedSignals: ["Latency p95: 340ms", "Error rate: 0.4%", "Grounding score: 0.78"] },
  { id: "s-7", name: "Cloud logs (Azure)", type: "cloud-logs", status: "partial", freshness: "6h ago", coverage: 55, extractedSignals: ["Partial log forwarding", "Missing field-ops logs"] },
  { id: "s-8", name: "Internal runbooks", type: "runbooks", status: "connected", freshness: "3d ago", coverage: 70, extractedSignals: ["5 runbooks indexed", "2 need review", "Rollback runbook missing"] },
  { id: "s-9", name: "API documentation", type: "api-docs", status: "partial", freshness: "2w ago", coverage: 40, extractedSignals: ["v2.1 docs available", "v2.3 changes undocumented"] },
  { id: "s-10", name: "Onboarding notes", type: "customer-notes", status: "connected", freshness: "30d ago", coverage: 60, extractedSignals: ["Key stakeholders documented", "Custom SLA terms noted", "Integration constraints captured"] },
];

const schindlerOverview: AccountOverview = {
  summary: "Schindler deploys two AI copilots across HR operations and field service management. The deployment spans 14 countries with a centralized Azure OpenAI backend and regional SharePoint + ServiceNow integrations. Support complexity is high due to multi-region rollout and domain-specific grounding requirements.",
  deploymentSummary: "Production copilots: HR Assistant (14 regions), Field Ops Copilot (5 regions). Azure OpenAI with custom retrieval layer. SharePoint content indexing. ServiceNow for incident routing.",
  keyIntegrations: ["Azure OpenAI", "SharePoint Online", "ServiceNow ITSM", "SAP SuccessFactors", "Power Automate"],
  activeEnvironments: [
    { name: "Production (EU-West)", status: "healthy" },
    { name: "Production (US-East)", status: "healthy" },
    { name: "Staging", status: "degraded" },
    { name: "Dev/Test", status: "healthy" },
  ],
  supportHistorySnapshot: "142 tickets in the last 90 days. 68% auto-resolved. Top category: grounding failures after content updates. Avg first response: 12 min. Avg resolution: 4.2h.",
  recentIncidents: [
    { title: "Grounding failures after SharePoint content migration", date: "2 days ago", severity: "high" },
    { title: "Field Ops copilot latency spike in APAC region", date: "5 days ago", severity: "medium" },
    { title: "HR Assistant returning outdated policy references", date: "1 week ago", severity: "medium" },
  ],
  stakeholders: [
    { name: "Thomas Meier", role: "VP Digital Transformation" },
    { name: "Claudia Weber", role: "IT Operations Lead" },
    { name: "Raj Patel", role: "ServiceNow Admin" },
    { name: "Anna Schulz", role: "HR Systems Manager" },
  ],
  openRisks: [
    { title: "Grounding quality degrades after content updates", severity: "high" },
    { title: "Field Ops copilot not covered by fallback runbook", severity: "high" },
    { title: "Staging environment drift from production", severity: "medium" },
    { title: "Renewal in 45 days — unresolved support friction", severity: "medium" },
  ],
};

const schindlerSupportDesign: SupportDesignInput = {
  complexity: "High — multi-region, multi-product, domain-specific grounding, regulatory constraints",
  recommendedPosture: "Proactive monitoring with governed auto-triage. Human approval required for production changes and customer-facing remediations.",
  suggestedPlaybooks: [
    "Grounding failure triage",
    "Content update validation",
    "Regional latency investigation",
    "Copilot rollback procedure",
    "Escalation to customer IT team",
  ],
  likelyIssueCategories: [
    "Grounding / retrieval quality",
    "Latency and performance",
    "Content freshness",
    "Integration sync failures",
    "Permission / access errors",
  ],
  escalationPaths: [
    "L1 auto-triage → L2 human review → L3 engineering",
    "Customer IT team for ServiceNow / SharePoint issues",
    "Account executive for contract / SLA disputes",
  ],
  approvalRequirements: [
    "Production config changes require human approval",
    "Customer-facing responses above confidence threshold 0.85",
    "Rollback actions require manager sign-off",
  ],
  monitoringGaps: [
    "Field Ops copilot logs not fully forwarded",
    "No alerting on grounding score degradation",
    "Staging drift not monitored",
  ],
  customerRestrictions: [
    "No automated rollbacks without customer IT approval",
    "PII must not appear in support thread summaries",
    "EU data residency — no cross-region data transfer",
  ],
  recommendedChannel: "Microsoft Teams — dedicated support channel per product",
};

const schindlerAgentContext: AgentContextItem[] = [
  { label: "Deployment topology", value: "2 production copilots, 4 environments, Azure OpenAI backend with regional endpoints", tags: ["used by agents"] },
  { label: "Customer constraints", value: "EU data residency, PII filtering required, no auto-rollback without IT approval", tags: ["used by agents", "used in playbooks"] },
  { label: "Approved auto-actions", value: "Auto-triage, log collection, knowledge retrieval, status updates, draft responses below 0.85 confidence", tags: ["used by agents"] },
  { label: "Blocked actions", value: "Production rollback, config changes, direct customer email without approval", tags: ["used by agents", "used in automation"] },
  { label: "Key documentation", value: "Deployment guide, HR policy grounding index, Field Ops runbook, rollback procedure", tags: ["used by agents"] },
  { label: "Recent incident patterns", value: "Grounding failures after content updates (3 incidents in 14 days)", tags: ["used by agents", "used in playbooks"] },
  { label: "Critical integrations", value: "SharePoint content indexing, ServiceNow ticket routing, SAP SuccessFactors sync", tags: ["used by agents"] },
  { label: "Named contacts", value: "Claudia Weber (IT Ops), Raj Patel (ServiceNow), Anna Schulz (HR Systems)", tags: ["used by agents"] },
  { label: "Preferred support channel", value: "Microsoft Teams — #schindler-support-hr and #schindler-support-fieldops", tags: ["used by agents", "used in automation"] },
  { label: "Business-critical workflows", value: "Employee onboarding flow, field technician dispatch, policy compliance check", tags: ["used by agents", "used in playbooks"] },
];

const schindlerGaps: GapRecommendation[] = [
  { id: "g-1", type: "missing-source", title: "Field Ops cloud logs not connected", description: "Only HR copilot logs are forwarded. Field Ops telemetry is missing.", severity: "high", recommendation: "Connect Azure Monitor for Field Ops copilot" },
  { id: "g-2", type: "outdated", title: "API docs outdated for v2.3", description: "Documentation covers v2.1 but v2.3 introduced breaking changes to the retrieval API.", severity: "medium", recommendation: "Update API documentation to reflect v2.3 changes" },
  { id: "g-3", type: "missing-approval", title: "No approver defined for production rollback", description: "Rollback actions are flagged but no approver is assigned in the escalation matrix.", severity: "high", recommendation: "Define approver for production rollback actions" },
  { id: "g-4", type: "weak-docs", title: "Incomplete Field Ops runbook", description: "Field Ops copilot does not have a dedicated triage runbook. Agents fall back to generic procedures.", severity: "medium", recommendation: "Create Field Ops-specific triage runbook" },
  { id: "g-5", type: "monitoring-gap", title: "No grounding score alerting", description: "Grounding quality is measured but not monitored for degradation trends.", severity: "high", recommendation: "Set up grounding score threshold alerts in Azure Monitor" },
  { id: "g-6", type: "unclear-ownership", title: "Staging environment ownership unclear", description: "No team is responsible for staging parity with production.", severity: "low", recommendation: "Assign staging environment ownership to DevOps team" },
];

export const schindlerAccount: AccountIntelRecord = {
  id: "acct-schindler",
  name: "Schindler",
  product: "HR Copilot & Field Ops Copilot",
  deploymentStatus: "Production",
  supportStatus: "Active — 4 open cases",
  riskLevel: "medium",
  connectedSourcesCount: 7,
  lastSync: "2h ago",
  agentReadiness: "partial",
  sources: schindlerSources,
  overview: schindlerOverview,
  supportDesign: schindlerSupportDesign,
  agentContext: schindlerAgentContext,
  gaps: schindlerGaps,
};
