// Account Intelligence – canonical mock data aligned with platform-wide story

export interface AISource {
  id: string;
  name: string;
  type: "crm" | "support" | "slack" | "teams" | "email" | "docs" | "github" | "telemetry" | "cloud-logs" | "api-docs" | "runbooks" | "customer-notes";
  status: "connected" | "partial" | "not-connected";
  freshness: string;
  coverage: number;
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
  tags: string[];
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

// ─── Acme Manufacturing — Helio CRM Agent ───

const acmeSources: AISource[] = [
  { id: "a-1", name: "Salesforce CRM", type: "crm", status: "connected", freshness: "1h ago", coverage: 90, extractedSignals: ["Contract tier: Enterprise", "3 open opportunities", "Renewal in 60 days"] },
  { id: "a-2", name: "Zendesk", type: "support", status: "connected", freshness: "10m ago", coverage: 92, extractedSignals: ["4 open cases last 7 days", "Avg resolution: 1.8h", "Top issue: config drift"] },
  { id: "a-3", name: "Microsoft Teams", type: "teams", status: "connected", freshness: "Live", coverage: 78, extractedSignals: ["Active channel: #acme-manufacturing", "8 threads this week", "Preferred escalation path"] },
  { id: "a-4", name: "Confluence docs", type: "docs", status: "connected", freshness: "1d ago", coverage: 68, extractedSignals: ["Deployment guide available", "APAC config runbook partial", "Architecture diagram linked"] },
  { id: "a-5", name: "GitHub – acme/helio-crm-config", type: "github", status: "connected", freshness: "3h ago", coverage: 85, extractedSignals: ["12 recent commits", "Config drift PR open", "CI/CD pipeline healthy"] },
  { id: "a-6", name: "Azure Monitor (West US)", type: "telemetry", status: "connected", freshness: "Live", coverage: 94, extractedSignals: ["API latency p95: 280ms", "Error rate: 0.3%", "Usage anomaly detected (smart-routing ↓34%)"] },
  { id: "a-7", name: "Azure Monitor (APAC)", type: "cloud-logs", status: "partial", freshness: "6h ago", coverage: 52, extractedSignals: ["Partial log forwarding", "APAC routing logs incomplete"] },
  { id: "a-8", name: "Internal runbooks", type: "runbooks", status: "connected", freshness: "2d ago", coverage: 72, extractedSignals: ["RB-118 Config Drift Remediation indexed", "RB-102 OAuth refresh indexed", "APAC-specific runbook missing"] },
  { id: "a-9", name: "Helio CRM API docs", type: "api-docs", status: "connected", freshness: "1w ago", coverage: 80, extractedSignals: ["v3.4.2 docs available", "Routing API fully documented"] },
  { id: "a-10", name: "Onboarding notes", type: "customer-notes", status: "partial", freshness: "45d ago", coverage: 50, extractedSignals: ["Key stakeholders documented", "Salesforce integration constraints noted", "Okta SSO requirements captured"] },
];

const acmeOverview: AccountOverview = {
  summary: "Acme Manufacturing deploys Helio CRM Agent (v3.4.2) across 32 nodes in Azure West US with an APAC regional extension. The deployment supports smart-routing, auto-escalation, and lead scoring for 340+ end-users. Recent configuration drift in the APAC region caused a 34% usage drop, impacting health score from 82 to 64. Support complexity is driven by multi-region config management and Salesforce/Okta integrations.",
  deploymentSummary: "Helio CRM Agent v3.4.2 · 32 nodes · Azure West US (primary) + APAC extension. Features: smart-routing, auto-escalation, lead scoring, pipeline tracking. Salesforce connector for CRM sync, Okta for SSO.",
  keyIntegrations: ["Salesforce", "Okta SSO", "Azure Monitor", "Microsoft Teams", "Confluence"],
  activeEnvironments: [
    { name: "Production (West US)", status: "healthy" },
    { name: "APAC Extension", status: "degraded" },
    { name: "Staging", status: "healthy" },
  ],
  supportHistorySnapshot: "4 open cases, 12 cases in last 30 days. 68% auto-resolved. Top category: configuration drift. Avg first response: 4 min. Avg resolution: 1.8h.",
  recentIncidents: [
    { title: "CRM Agent usage dropped 34% after APAC config change", date: "Today", severity: "high" },
    { title: "Lead scoring model returning stale predictions", date: "Today", severity: "medium" },
    { title: "Salesforce connector timeout during bulk sync", date: "Yesterday", severity: "medium" },
    { title: "SSO token refresh loop causing intermittent logouts", date: "Today", severity: "low" },
  ],
  stakeholders: [
    { name: "Sarah Chen", role: "Support Approver" },
    { name: "admin@acme.com", role: "IT Admin (APAC)" },
  ],
  openRisks: [
    { title: "Configuration drift in APAC routing rules", severity: "high" },
    { title: "Stale lead scoring predictions (48h stale)", severity: "medium" },
    { title: "Salesforce bulk sync timeouts after sandbox refresh", severity: "medium" },
    { title: "Okta SSO token refresh loop for APAC users", severity: "low" },
  ],
};

const acmeSupportDesign: SupportDesignInput = {
  complexity: "High — multi-region deployment, customer-managed config, enterprise integrations (Salesforce, Okta)",
  recommendedPosture: "Proactive monitoring with governed auto-triage. Human approval required for production config changes affecting >100 users.",
  suggestedPlaybooks: [
    "RB-118 Config Drift Remediation",
    "RB-102 OAuth Token Refresh",
    "Salesforce connector troubleshooting",
    "APAC region rollback procedure",
    "Escalation to customer IT team",
  ],
  likelyIssueCategories: [
    "Configuration drift",
    "AI model quality / stale predictions",
    "Integration sync failures",
    "Authentication / SSO errors",
    "Performance / latency",
  ],
  escalationPaths: [
    "AI auto-triage → L1 human review → L2 engineering",
    "Customer IT team for Salesforce / Okta issues",
    "Account executive for contract / SLA disputes",
  ],
  approvalRequirements: [
    "Config changes affecting >100 users require human approval",
    "Confidence below 80% requires human review",
    "Production rollback requires manager sign-off",
  ],
  monitoringGaps: [
    "APAC region logs not fully forwarded",
    "No alerting on lead scoring model staleness",
    "Staging environment drift not monitored",
  ],
  customerRestrictions: [
    "No automated config rollback without Sarah Chen approval",
    "Salesforce bulk operations only during maintenance window",
    "APAC changes require local IT notification",
  ],
  recommendedChannel: "Microsoft Teams — #acme-manufacturing",
};

const acmeAgentContext: AgentContextItem[] = [
  { label: "Deployment topology", value: "Helio CRM v3.4.2, 32 nodes, Azure West US + APAC. Salesforce connector, Okta SSO.", tags: ["used by agents"] },
  { label: "Customer constraints", value: "Config changes >100 users need approval. No auto-rollback without Sarah Chen. Salesforce bulk ops in maintenance window only.", tags: ["used by agents", "used in playbooks"] },
  { label: "Approved auto-actions", value: "Auto-triage, log collection, knowledge retrieval, status updates, draft responses below 80% confidence", tags: ["used by agents"] },
  { label: "Blocked actions", value: "Production config rollback, Salesforce schema changes, direct customer email without approval", tags: ["used by agents", "used in automation"] },
  { label: "Key documentation", value: "RB-118 Config Drift, RB-102 OAuth Refresh, Helio CRM deployment guide, APAC config notes", tags: ["used by agents"] },
  { label: "Recent incident patterns", value: "Config drift after customer changes (CS-2041), stale AI predictions (CS-2042), integration timeouts (CS-2043)", tags: ["used by agents", "used in playbooks"] },
  { label: "Critical integrations", value: "Salesforce CRM sync, Okta SSO, Azure Monitor telemetry", tags: ["used by agents"] },
  { label: "Named contacts", value: "Sarah Chen (Approver), admin@acme.com (APAC IT Admin)", tags: ["used by agents"] },
  { label: "Preferred support channel", value: "Microsoft Teams — #acme-manufacturing", tags: ["used by agents", "used in automation"] },
  { label: "Business-critical workflows", value: "Smart-routing, auto-escalation, lead scoring, pipeline tracking", tags: ["used by agents", "used in playbooks"] },
];

const acmeGaps: GapRecommendation[] = [
  { id: "g-1", type: "missing-source", title: "APAC cloud logs not fully connected", description: "Only West US telemetry is fully forwarded. APAC routing logs are incomplete.", severity: "high", recommendation: "Complete Azure Monitor setup for APAC extension" },
  { id: "g-2", type: "monitoring-gap", title: "No alerting on lead scoring staleness", description: "Lead scoring model freshness is not monitored. CS-2042 was detected late.", severity: "medium", recommendation: "Add model freshness monitoring with 24h threshold alert" },
  { id: "g-3", type: "missing-approval", title: "No approver defined for Salesforce schema changes", description: "Salesforce connector changes are flagged but no approver is assigned.", severity: "high", recommendation: "Assign Sarah Chen or IT lead as approver for Salesforce operations" },
  { id: "g-4", type: "weak-docs", title: "APAC-specific config runbook missing", description: "No dedicated runbook for APAC region config management. Agents fall back to generic procedures.", severity: "medium", recommendation: "Create APAC-specific config management runbook" },
  { id: "g-5", type: "outdated", title: "Onboarding notes stale (45 days)", description: "Customer onboarding notes have not been refreshed since initial setup.", severity: "low", recommendation: "Schedule quarterly onboarding note refresh" },
  { id: "g-6", type: "unclear-ownership", title: "Staging environment ownership unclear", description: "No team is responsible for staging parity with production.", severity: "low", recommendation: "Assign staging environment ownership" },
];

export const acmeAccount: AccountIntelRecord = {
  id: "acct-acme",
  name: "Acme Manufacturing",
  product: "Helio CRM Agent v3.4.2",
  deploymentStatus: "Production",
  supportStatus: "Active — 4 open cases",
  riskLevel: "high",
  connectedSourcesCount: 8,
  lastSync: "1h ago",
  agentReadiness: "partial",
  sources: acmeSources,
  overview: acmeOverview,
  supportDesign: acmeSupportDesign,
  agentContext: acmeAgentContext,
  gaps: acmeGaps,
};

// ─── Contoso Digital — Finance Flow Agent ───

const contosoSources: AISource[] = [
  { id: "c-1", name: "Salesforce CRM", type: "crm", status: "connected", freshness: "2h ago", coverage: 85, extractedSignals: ["Contract tier: Standard", "1 open opportunity", "Renewal in 120 days"] },
  { id: "c-2", name: "Zendesk", type: "support", status: "connected", freshness: "20m ago", coverage: 88, extractedSignals: ["3 open cases last 7 days", "Avg resolution: 2.4h", "Top issue: reconciliation pipeline"] },
  { id: "c-3", name: "Microsoft Teams", type: "teams", status: "connected", freshness: "Live", coverage: 74, extractedSignals: ["Active channel: #contoso-digital", "5 threads this week", "Approval workflow active"] },
  { id: "c-4", name: "Confluence docs", type: "docs", status: "partial", freshness: "3d ago", coverage: 55, extractedSignals: ["Email service docs outdated", "Permission model doc partial", "Checkout guide available"] },
  { id: "c-5", name: "GitHub – contoso/finance-flow", type: "github", status: "connected", freshness: "5h ago", coverage: 80, extractedSignals: ["8 recent commits", "Queue scaling PR merged", "Auth config update deployed"] },
  { id: "c-6", name: "Azure Monitor (EU-West)", type: "telemetry", status: "connected", freshness: "Live", coverage: 90, extractedSignals: ["Reconciliation pipeline health: degraded", "Memory pressure on 3/5 workers", "Invoice queue depth: 4,200"] },
  { id: "c-7", name: "Internal runbooks", type: "runbooks", status: "connected", freshness: "1d ago", coverage: 82, extractedSignals: ["RB-045 Batch Recovery indexed", "Queue replay runbook indexed", "4 runbooks total"] },
  { id: "c-8", name: "Finance Flow API docs", type: "api-docs", status: "connected", freshness: "2w ago", coverage: 75, extractedSignals: ["v1.8.5 docs available", "Multi-currency API documented"] },
];

const contosoOverview: AccountOverview = {
  summary: "Contoso Digital runs Finance Flow Agent (v1.8.5) across 20 nodes in Azure EU-West, supporting invoice reconciliation, expense categorization, and approval workflows. Recent multi-currency batch processing caused memory pressure and pipeline stalls. Support complexity is moderate but driven by financial SLA windows and org restructure impacts on approval routing.",
  deploymentSummary: "Finance Flow Agent v1.8.5 · 20 nodes · Azure EU-West. Features: multi-currency reconciliation, expense auto-categorization, approval workflow routing. Worker pool: 5 pods (scaling to 8 approved).",
  keyIntegrations: ["Azure Monitor", "Microsoft Teams", "Confluence", "SAP (planned)"],
  activeEnvironments: [
    { name: "Production (EU-West)", status: "degraded" },
    { name: "Staging", status: "healthy" },
    { name: "Dev", status: "healthy" },
  ],
  supportHistorySnapshot: "3 open cases, 8 cases in last 30 days. 79% auto-resolved. Top category: performance. Avg first response: 6 min. Avg resolution: 2.4h.",
  recentIncidents: [
    { title: "Invoice reconciliation pipeline stalled on multi-currency batch", date: "Today", severity: "high" },
    { title: "Expense categorization accuracy dropped below threshold", date: "Today", severity: "medium" },
    { title: "Approval workflow routing to deactivated manager accounts", date: "Yesterday", severity: "low" },
  ],
  stakeholders: [
    { name: "Marcus Webb", role: "Support Approver" },
    { name: "Nina Patel", role: "Finance Operations Lead" },
  ],
  openRisks: [
    { title: "Multi-currency batch causing memory pressure on workers", severity: "high" },
    { title: "Expense categorization accuracy dropped from 94% to 81%", severity: "medium" },
    { title: "Broken approval chains after org restructure", severity: "low" },
  ],
};

const contosoSupportDesign: SupportDesignInput = {
  complexity: "Medium — single-region, financial SLA constraints, org restructure complicating approval routing",
  recommendedPosture: "Monitored automation with approval gates for scaling operations and batch recovery. Financial SLA windows require fast turnaround.",
  suggestedPlaybooks: [
    "RB-045 Batch Recovery & Scaling",
    "Queue replay runbook",
    "Expense model retraining trigger",
    "Approval chain remediation",
    "Customer notification for SLA delays",
  ],
  likelyIssueCategories: [
    "Performance / batch processing",
    "AI model accuracy",
    "Approval workflow routing",
    "Infrastructure scaling",
    "Data integrity / reconciliation",
  ],
  escalationPaths: [
    "AI auto-triage → L1 human review → L2 engineering",
    "Finance operations team for SLA-critical delays",
    "Account executive for contract concerns",
  ],
  approvalRequirements: [
    "Worker pool scaling requires human approval",
    "Batch splitting requires human approval",
    "Customer-facing SLA delay notifications need review",
  ],
  monitoringGaps: [
    "Expense model accuracy not continuously monitored",
    "Approval chain health not validated after org changes",
  ],
  customerRestrictions: [
    "No batch operations during market hours (06:00–18:00 CET)",
    "Marcus Webb must approve infrastructure scaling",
    "Financial data must not leave EU-West region",
  ],
  recommendedChannel: "Microsoft Teams — #contoso-digital",
};

const contosoAgentContext: AgentContextItem[] = [
  { label: "Deployment topology", value: "Finance Flow v1.8.5, 20 nodes, Azure EU-West. 5-pod worker pool. Multi-currency reconciliation engine.", tags: ["used by agents"] },
  { label: "Customer constraints", value: "No batch ops during market hours. Marcus Webb approves scaling. EU data residency required.", tags: ["used by agents", "used in playbooks"] },
  { label: "Approved auto-actions", value: "Auto-triage, log collection, queue depth monitoring, draft SLA notifications, expense accuracy tracking", tags: ["used by agents"] },
  { label: "Blocked actions", value: "Worker scaling without approval, batch restarts during market hours, direct customer email without review", tags: ["used by agents", "used in automation"] },
  { label: "Key documentation", value: "RB-045 Batch Recovery, Queue replay runbook, Checkout deployment guide, Finance Flow API docs", tags: ["used by agents"] },
  { label: "Recent incident patterns", value: "Pipeline stalls on multi-currency batches (CS-2046), expense accuracy drops after GL code changes (CS-2047), broken approval chains (CS-2048)", tags: ["used by agents", "used in playbooks"] },
  { label: "Critical integrations", value: "Azure Monitor, Microsoft Teams (#contoso-digital)", tags: ["used by agents"] },
  { label: "Named contacts", value: "Marcus Webb (Approver), Nina Patel (Finance Ops)", tags: ["used by agents"] },
  { label: "Preferred support channel", value: "Microsoft Teams — #contoso-digital", tags: ["used by agents", "used in automation"] },
  { label: "Business-critical workflows", value: "Invoice reconciliation, expense categorization, approval workflow routing", tags: ["used by agents", "used in playbooks"] },
];

const contosoGaps: GapRecommendation[] = [
  { id: "cg-1", type: "monitoring-gap", title: "No continuous expense model accuracy monitoring", description: "Expense categorization accuracy is checked manually. CS-2047 was detected late.", severity: "medium", recommendation: "Add automated accuracy threshold alerting" },
  { id: "cg-2", type: "weak-docs", title: "Email service documentation outdated", description: "Transactional email service docs reference deprecated API endpoints.", severity: "low", recommendation: "Update email service documentation to current API" },
  { id: "cg-3", type: "unclear-ownership", title: "Approval chain ownership unclear after reorg", description: "Org restructure left 3 approval chains pointing to deactivated accounts.", severity: "medium", recommendation: "Validate and update all approval chain mappings" },
  { id: "cg-4", type: "outdated", title: "Permission model documentation partial", description: "Admin role permissions are documented but staging/prod sync rules are missing.", severity: "low", recommendation: "Complete permission model documentation" },
];

export const contosoAccount: AccountIntelRecord = {
  id: "acct-contoso",
  name: "Contoso Digital",
  product: "Finance Flow Agent v1.8.5",
  deploymentStatus: "Production",
  supportStatus: "Active — 3 open cases",
  riskLevel: "medium",
  connectedSourcesCount: 7,
  lastSync: "2h ago",
  agentReadiness: "partial",
  sources: contosoSources,
  overview: contosoOverview,
  supportDesign: contosoSupportDesign,
  agentContext: contosoAgentContext,
  gaps: contosoGaps,
};

// ─── Exports ───

export const allAccounts: AccountIntelRecord[] = [acmeAccount, contosoAccount];

export function getAccountById(id: string): AccountIntelRecord | null {
  return allAccounts.find(a => a.id === id) || null;
}
