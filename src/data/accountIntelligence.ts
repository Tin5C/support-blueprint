// Account Intelligence mock data — aligned with canonical customers from mockData.ts

export interface AICustomer {
  id: string;
  name: string;
  industry: string;
  size: string;
  supportTier: "standard" | "premium" | "critical";
  region: string;
  accountOwner: string;
  primaryContact: string;
  healthStatus: "healthy" | "medium" | "low" | "critical";
  strategic: boolean;
}

export interface SupportContext {
  customerId: string;
  productsInScope: string[];
  environments: string[];
  criticalWorkflows: string[];
  businessCriticality: "low" | "medium" | "high" | "critical";
}

export interface ConnectedSystem {
  id: string;
  customerId: string;
  type: "jira" | "github" | "azure" | "runbook" | "docs";
  name: string;
  status: "connected" | "partial" | "missing";
}

export interface KnowledgeSource {
  id: string;
  customerId: string;
  type: "runbook" | "documentation" | "repo" | "ticket-history";
  title: string;
  status: "complete" | "partial" | "missing" | "outdated";
}

export interface RiskSignal {
  id: string;
  customerId: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
}

export interface ChangeEvent {
  id: string;
  customerId: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface GraphGap {
  id: string;
  customerId: string;
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface ClassifiedEntity {
  id: string;
  customerId: string;
  sourceType: string;
  entityType: "system" | "workflow" | "repo" | "environment" | "owner" | "document" | "risk";
  label: string;
  confidence: number;
  linkedTo?: string;
}

export interface IngestionActivity {
  id: string;
  customerId: string;
  sourceType: string;
  actionType: "connect" | "upload" | "classify";
  status: "pending" | "processing" | "complete";
  message: string;
  timestamp: string;
}

// ─── CUSTOMER 1: Acme Manufacturing — Helio CRM Agent ───

export const acmeCustomer: AICustomer = {
  id: "cust-1",
  name: "Acme Manufacturing",
  industry: "Manufacturing",
  size: "Enterprise",
  supportTier: "premium",
  region: "US (West) + APAC",
  accountOwner: "Sarah Chen",
  primaryContact: "admin@acme.com",
  healthStatus: "medium",
  strategic: true,
};

export const acmeContext: SupportContext = {
  customerId: "cust-1",
  productsInScope: ["Helio CRM Agent"],
  environments: ["Production (West US)", "APAC Extension", "Staging"],
  criticalWorkflows: ["Smart-routing", "Auto-escalation", "Lead scoring"],
  businessCriticality: "high",
};

export const acmeSystems: ConnectedSystem[] = [
  { id: "a-sys-1", customerId: "cust-1", type: "azure", name: "Azure West US Subscription", status: "connected" },
  { id: "a-sys-2", customerId: "cust-1", type: "github", name: "acme/helio-crm-config", status: "connected" },
  { id: "a-sys-3", customerId: "cust-1", type: "jira", name: "Acme CRM Support Board", status: "connected" },
  { id: "a-sys-4", customerId: "cust-1", type: "runbook", name: "CRM Runbooks", status: "connected" },
  { id: "a-sys-5", customerId: "cust-1", type: "docs", name: "Deployment Documentation", status: "partial" },
];

export const acmeKnowledge: KnowledgeSource[] = [
  { id: "a-ks-1", customerId: "cust-1", type: "runbook", title: "RB-118 Config Drift Remediation", status: "complete" },
  { id: "a-ks-2", customerId: "cust-1", type: "runbook", title: "RB-102 OAuth Token Refresh", status: "complete" },
  { id: "a-ks-3", customerId: "cust-1", type: "documentation", title: "APAC config runbook", status: "missing" },
  { id: "a-ks-4", customerId: "cust-1", type: "repo", title: "helio-crm-config repository", status: "complete" },
  { id: "a-ks-5", customerId: "cust-1", type: "documentation", title: "Salesforce connector guide", status: "partial" },
];

export const acmeRisks: RiskSignal[] = [
  { id: "a-r-1", customerId: "cust-1", title: "Configuration drift in APAC routing rules", description: "6 routing rule modifications conflict with blueprint baseline — 340 users affected", severity: "high", source: "Telemetry" },
  { id: "a-r-2", customerId: "cust-1", title: "Stale lead scoring predictions", description: "Lead scoring model hasn't refreshed in 48 hours — stale feature vectors", severity: "medium", source: "Telemetry" },
  { id: "a-r-3", customerId: "cust-1", title: "Salesforce connector bulk sync timeout", description: "Bulk sync of 120K records failing after Salesforce sandbox refresh", severity: "medium", source: "Customer" },
];

export const acmeChanges: ChangeEvent[] = [
  { id: "a-ce-1", customerId: "cust-1", type: "Configuration", description: "APAC routing rules modified by admin@acme.com (6 changes)", timestamp: "3 days ago" },
  { id: "a-ce-2", customerId: "cust-1", type: "Configuration", description: "Config drift remediation applied (approved by Sarah Chen)", timestamp: "Today" },
  { id: "a-ce-3", customerId: "cust-1", type: "Integration", description: "Salesforce sandbox refreshed by customer IT", timestamp: "Yesterday" },
];

export const acmeGaps: GraphGap[] = [
  { id: "a-gg-1", customerId: "cust-1", type: "Runbook", description: "Missing APAC-specific config management runbook", severity: "high" },
  { id: "a-gg-2", customerId: "cust-1", type: "Monitoring", description: "No alerting on lead scoring model staleness", severity: "medium" },
];

export const acmeClassified: ClassifiedEntity[] = [
  { id: "a-cl-1", customerId: "cust-1", sourceType: "Azure", entityType: "environment", label: "Production (West US)", confidence: 96, linkedTo: "Azure" },
  { id: "a-cl-2", customerId: "cust-1", sourceType: "Azure", entityType: "environment", label: "APAC Extension", confidence: 94, linkedTo: "Azure" },
  { id: "a-cl-3", customerId: "cust-1", sourceType: "GitHub", entityType: "repo", label: "helio-crm-config", confidence: 98, linkedTo: "GitHub" },
  { id: "a-cl-4", customerId: "cust-1", sourceType: "Jira", entityType: "system", label: "Acme CRM Support Board", confidence: 95, linkedTo: "Jira" },
  { id: "a-cl-5", customerId: "cust-1", sourceType: "Telemetry", entityType: "workflow", label: "Smart-routing pipeline", confidence: 90 },
  { id: "a-cl-6", customerId: "cust-1", sourceType: "Telemetry", entityType: "workflow", label: "Auto-escalation engine", confidence: 88 },
  { id: "a-cl-7", customerId: "cust-1", sourceType: "Classification", entityType: "risk", label: "Config drift detected in APAC", confidence: 82 },
];

export const acmeIngestion: IngestionActivity[] = [
  { id: "a-ig-1", customerId: "cust-1", sourceType: "Azure", actionType: "connect", status: "complete", message: "Connected Azure West US — 3 environments detected", timestamp: "10 min ago" },
  { id: "a-ig-2", customerId: "cust-1", sourceType: "GitHub", actionType: "connect", status: "complete", message: "Connected helio-crm-config repo — 12 recent commits indexed", timestamp: "8 min ago" },
  { id: "a-ig-3", customerId: "cust-1", sourceType: "Jira", actionType: "connect", status: "complete", message: "Connected Acme CRM Support Board — 4 open cases indexed", timestamp: "6 min ago" },
  { id: "a-ig-4", customerId: "cust-1", sourceType: "Runbook", actionType: "upload", status: "complete", message: "Uploaded RB-118 Config Drift Remediation — classified as Knowledge Source", timestamp: "4 min ago" },
  { id: "a-ig-5", customerId: "cust-1", sourceType: "System", actionType: "classify", status: "complete", message: "Classification complete — 7 entities, 2 gaps, 3 risks identified", timestamp: "2 min ago" },
];

// ─── CUSTOMER 2: Contoso Digital — Finance Flow Agent ───

export const contosoCustomer: AICustomer = {
  id: "cust-3",
  name: "Contoso Digital",
  industry: "Financial Services",
  size: "Mid-market",
  supportTier: "standard",
  region: "EU (West)",
  accountOwner: "Marcus Webb",
  primaryContact: "Nina Patel",
  healthStatus: "low",
  strategic: false,
};

export const contosoContext: SupportContext = {
  customerId: "cust-3",
  productsInScope: ["Finance Flow Agent"],
  environments: ["Production (EU-West)", "Staging", "Dev"],
  criticalWorkflows: ["Invoice reconciliation", "Expense categorization", "Approval routing"],
  businessCriticality: "medium",
};

export const contosoSystems: ConnectedSystem[] = [
  { id: "c-sys-1", customerId: "cust-3", type: "azure", name: "Azure EU-West Subscription", status: "connected" },
  { id: "c-sys-2", customerId: "cust-3", type: "github", name: "contoso/finance-flow", status: "connected" },
  { id: "c-sys-3", customerId: "cust-3", type: "jira", name: "Contoso Engineering Board", status: "connected" },
  { id: "c-sys-4", customerId: "cust-3", type: "runbook", name: "Operations Runbooks", status: "connected" },
  { id: "c-sys-5", customerId: "cust-3", type: "docs", name: "API Documentation", status: "partial" },
];

export const contosoKnowledge: KnowledgeSource[] = [
  { id: "c-ks-1", customerId: "cust-3", type: "runbook", title: "RB-045 Batch Recovery & Scaling", status: "complete" },
  { id: "c-ks-2", customerId: "cust-3", type: "runbook", title: "Queue replay runbook", status: "complete" },
  { id: "c-ks-3", customerId: "cust-3", type: "documentation", title: "Email service docs", status: "outdated" },
  { id: "c-ks-4", customerId: "cust-3", type: "documentation", title: "Permission model doc", status: "partial" },
];

export const contosoRisks: RiskSignal[] = [
  { id: "c-r-1", customerId: "cust-3", title: "Multi-currency batch causing memory pressure", description: "EUR/GBP/CHF reconciliation stalled at 68%, 4,200 invoices pending", severity: "high", source: "Telemetry" },
  { id: "c-r-2", customerId: "cust-3", title: "Expense categorization accuracy dropped", description: "Accuracy fell from 94% to 81% after 3 new GL codes added", severity: "medium", source: "Telemetry" },
  { id: "c-r-3", customerId: "cust-3", title: "Broken approval chains after org restructure", description: "3 approval workflows routing to deactivated manager accounts", severity: "medium", source: "Configuration" },
];

export const contosoChanges: ChangeEvent[] = [
  { id: "c-ce-1", customerId: "cust-3", type: "Deployment", description: "Worker pool scaled 5→8 pods (approved by Marcus Webb)", timestamp: "Today" },
  { id: "c-ce-2", customerId: "cust-3", type: "Infrastructure", description: "Reconciliation batch split into currency-specific batches", timestamp: "Today" },
  { id: "c-ce-3", customerId: "cust-3", type: "Configuration", description: "Auth config updated for SSO provider", timestamp: "3 days ago" },
];

export const contosoGaps: GraphGap[] = [
  { id: "c-gg-1", customerId: "cust-3", type: "Monitoring", description: "Expense model accuracy not continuously monitored", severity: "medium" },
  { id: "c-gg-2", customerId: "cust-3", type: "Documentation", description: "Outdated email service documentation", severity: "low" },
];

export const contosoClassified: ClassifiedEntity[] = [
  { id: "c-cl-1", customerId: "cust-3", sourceType: "Azure", entityType: "environment", label: "Production (EU-West)", confidence: 96, linkedTo: "Azure" },
  { id: "c-cl-2", customerId: "cust-3", sourceType: "Azure", entityType: "environment", label: "Staging (EU-West)", confidence: 95, linkedTo: "Azure" },
  { id: "c-cl-3", customerId: "cust-3", sourceType: "GitHub", entityType: "repo", label: "finance-flow", confidence: 97, linkedTo: "GitHub" },
  { id: "c-cl-4", customerId: "cust-3", sourceType: "Jira", entityType: "system", label: "Contoso Engineering Board", confidence: 94, linkedTo: "Jira" },
  { id: "c-cl-5", customerId: "cust-3", sourceType: "Classification", entityType: "workflow", label: "Invoice reconciliation", confidence: 92 },
  { id: "c-cl-6", customerId: "cust-3", sourceType: "Classification", entityType: "system", label: "Queue system", confidence: 86 },
  { id: "c-cl-7", customerId: "cust-3", sourceType: "Classification", entityType: "risk", label: "Outdated email-service docs", confidence: 78 },
];

export const contosoIngestion: IngestionActivity[] = [
  { id: "c-ig-1", customerId: "cust-3", sourceType: "Azure", actionType: "connect", status: "complete", message: "Connected Azure EU-West — 3 environments detected", timestamp: "12 min ago" },
  { id: "c-ig-2", customerId: "cust-3", sourceType: "GitHub", actionType: "connect", status: "complete", message: "Connected finance-flow repo — 8 recent commits indexed", timestamp: "10 min ago" },
  { id: "c-ig-3", customerId: "cust-3", sourceType: "Jira", actionType: "connect", status: "complete", message: "Connected Contoso Engineering Board — 3 open cases indexed", timestamp: "8 min ago" },
  { id: "c-ig-4", customerId: "cust-3", sourceType: "Runbook", actionType: "upload", status: "complete", message: "Uploaded RB-045 Batch Recovery — classified as Knowledge Source", timestamp: "6 min ago" },
  { id: "c-ig-5", customerId: "cust-3", sourceType: "System", actionType: "classify", status: "complete", message: "Classification complete — 7 entities, 2 gaps, 3 risks identified", timestamp: "4 min ago" },
];

// ─── Helper to get all data by customer ID ───

export interface AccountIntelligenceData {
  customer: AICustomer;
  context: SupportContext;
  systems: ConnectedSystem[];
  knowledge: KnowledgeSource[];
  risks: RiskSignal[];
  changes: ChangeEvent[];
  gaps: GraphGap[];
  classified: ClassifiedEntity[];
  ingestion: IngestionActivity[];
  workspaceType: "isv" | "si";
}

const dataMap: Record<string, AccountIntelligenceData> = {
  "cust-1": {
    customer: acmeCustomer,
    context: acmeContext,
    systems: acmeSystems,
    knowledge: acmeKnowledge,
    risks: acmeRisks,
    changes: acmeChanges,
    gaps: acmeGaps,
    classified: acmeClassified,
    ingestion: acmeIngestion,
    workspaceType: "isv",
  },
  "cust-3": {
    customer: contosoCustomer,
    context: contosoContext,
    systems: contosoSystems,
    knowledge: contosoKnowledge,
    risks: contosoRisks,
    changes: contosoChanges,
    gaps: contosoGaps,
    classified: contosoClassified,
    ingestion: contosoIngestion,
  },
};

export const aiCustomers = [acmeCustomer, contosoCustomer];

export function getAccountIntelligence(customerId: string): AccountIntelligenceData | null {
  return dataMap[customerId] || null;
}
