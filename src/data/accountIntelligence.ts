// Account Intelligence mock data for two demo customers

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

// ─── CUSTOMER 1: Northstar Health AI ───

export const northstarCustomer: AICustomer = {
  id: "ai-cust-1",
  name: "Northstar Health AI",
  industry: "Healthcare",
  size: "Mid-market",
  supportTier: "critical",
  region: "EU",
  accountOwner: "Elena Fischer",
  primaryContact: "Marta Klein",
  healthStatus: "medium",
  strategic: true,
};

export const northstarContext: SupportContext = {
  customerId: "ai-cust-1",
  productsInScope: ["Patient Routing Agent", "Clinical Knowledge Assistant"],
  environments: ["Production", "Staging"],
  criticalWorkflows: ["Patient triage", "Escalation routing"],
  businessCriticality: "high",
};

export const northstarSystems: ConnectedSystem[] = [
  { id: "ns-sys-1", customerId: "ai-cust-1", type: "azure", name: "Azure EU-West Subscription", status: "connected" },
  { id: "ns-sys-2", customerId: "ai-cust-1", type: "github", name: "northstar-health/routing-service", status: "connected" },
  { id: "ns-sys-3", customerId: "ai-cust-1", type: "jira", name: "NHAI Support Board", status: "connected" },
  { id: "ns-sys-4", customerId: "ai-cust-1", type: "runbook", name: "Clinical Runbooks", status: "partial" },
  { id: "ns-sys-5", customerId: "ai-cust-1", type: "docs", name: "Product Documentation", status: "partial" },
];

export const northstarKnowledge: KnowledgeSource[] = [
  { id: "ns-ks-1", customerId: "ai-cust-1", type: "runbook", title: "Triage fallback runbook", status: "missing" },
  { id: "ns-ks-2", customerId: "ai-cust-1", type: "documentation", title: "Clinical knowledge update guide", status: "outdated" },
  { id: "ns-ks-3", customerId: "ai-cust-1", type: "repo", title: "Routing service repository", status: "complete" },
  { id: "ns-ks-4", customerId: "ai-cust-1", type: "documentation", title: "Escalation workflow docs", status: "partial" },
];

export const northstarRisks: RiskSignal[] = [
  { id: "ns-r-1", customerId: "ai-cust-1", title: "Outdated knowledge retrieval", description: "Clinical knowledge index not refreshed in 14 days", severity: "high", source: "Telemetry" },
  { id: "ns-r-2", customerId: "ai-cust-1", title: "Approval queue backlog", description: "12 pending approvals older than SLA threshold", severity: "medium", source: "Workflow" },
  { id: "ns-r-3", customerId: "ai-cust-1", title: "Missing fallback runbook", description: "No runbook for triage fallback scenario", severity: "high", source: "Knowledge Graph" },
];

export const northstarChanges: ChangeEvent[] = [
  { id: "ns-ce-1", customerId: "ai-cust-1", type: "Configuration", description: "Retrieval index updated to v3.2", timestamp: "2 days ago" },
  { id: "ns-ce-2", customerId: "ai-cust-1", type: "Deployment", description: "Prompt pack changed for Clinical Assistant", timestamp: "4 days ago" },
  { id: "ns-ce-3", customerId: "ai-cust-1", type: "Policy", description: "Approval threshold changed from 75% to 80%", timestamp: "1 week ago" },
];

export const northstarGaps: GraphGap[] = [
  { id: "ns-gg-1", customerId: "ai-cust-1", type: "Runbook", description: "Missing runbook for triage fallback", severity: "high" },
  { id: "ns-gg-2", customerId: "ai-cust-1", type: "Ownership", description: "No owner mapped to retrieval pipeline", severity: "medium" },
];

export const northstarClassified: ClassifiedEntity[] = [
  { id: "ns-cl-1", customerId: "ai-cust-1", sourceType: "Jira", entityType: "system", label: "NHAI Support Board", confidence: 96, linkedTo: "Jira" },
  { id: "ns-cl-2", customerId: "ai-cust-1", sourceType: "GitHub", entityType: "repo", label: "routing-service", confidence: 98, linkedTo: "GitHub" },
  { id: "ns-cl-3", customerId: "ai-cust-1", sourceType: "Azure", entityType: "environment", label: "Production (EU-West)", confidence: 94, linkedTo: "Azure" },
  { id: "ns-cl-4", customerId: "ai-cust-1", sourceType: "Upload", entityType: "workflow", label: "Patient triage", confidence: 88 },
  { id: "ns-cl-5", customerId: "ai-cust-1", sourceType: "Upload", entityType: "system", label: "Retrieval pipeline", confidence: 82 },
  { id: "ns-cl-6", customerId: "ai-cust-1", sourceType: "Classification", entityType: "risk", label: "Stale documentation detected", confidence: 79 },
  { id: "ns-cl-7", customerId: "ai-cust-1", sourceType: "Classification", entityType: "document", label: "Escalation workflow docs", confidence: 91 },
];

export const northstarIngestion: IngestionActivity[] = [
  { id: "ns-ig-1", customerId: "ai-cust-1", sourceType: "Jira", actionType: "connect", status: "complete", message: "Connected NHAI Support Board — 142 issues indexed", timestamp: "10 min ago" },
  { id: "ns-ig-2", customerId: "ai-cust-1", sourceType: "GitHub", actionType: "connect", status: "complete", message: "Connected routing-service repo — 38 workflows detected", timestamp: "8 min ago" },
  { id: "ns-ig-3", customerId: "ai-cust-1", sourceType: "Runbook", actionType: "upload", status: "complete", message: "Uploaded clinical-escalation-runbook.pdf — classified as Knowledge Source", timestamp: "6 min ago" },
  { id: "ns-ig-4", customerId: "ai-cust-1", sourceType: "Azure", actionType: "connect", status: "complete", message: "Connected Azure EU-West — 2 environments detected", timestamp: "5 min ago" },
  { id: "ns-ig-5", customerId: "ai-cust-1", sourceType: "System", actionType: "classify", status: "complete", message: "Classification complete — 7 entities, 2 gaps, 3 risks identified", timestamp: "3 min ago" },
];

// ─── CUSTOMER 2: Contoso Digital Commerce ───

export const contosoCustomer: AICustomer = {
  id: "ai-cust-2",
  name: "Contoso Digital Commerce",
  industry: "Retail",
  size: "Mid-market",
  supportTier: "standard",
  region: "US",
  accountOwner: "Jason Cole",
  primaryContact: "Nina Patel",
  healthStatus: "low",
  strategic: false,
};

export const contosoContext: SupportContext = {
  customerId: "ai-cust-2",
  productsInScope: ["Checkout API", "Admin Dashboard"],
  environments: ["Production", "Staging", "Dev"],
  criticalWorkflows: ["Checkout", "Order sync"],
  businessCriticality: "medium",
};

export const contosoSystems: ConnectedSystem[] = [
  { id: "cd-sys-1", customerId: "ai-cust-2", type: "azure", name: "Azure US-East Subscription", status: "connected" },
  { id: "cd-sys-2", customerId: "ai-cust-2", type: "github", name: "contoso/checkout-service", status: "connected" },
  { id: "cd-sys-3", customerId: "ai-cust-2", type: "jira", name: "CDX Engineering Board", status: "connected" },
  { id: "cd-sys-4", customerId: "ai-cust-2", type: "runbook", name: "Operations Runbooks", status: "connected" },
  { id: "cd-sys-5", customerId: "ai-cust-2", type: "docs", name: "API Documentation", status: "partial" },
];

export const contosoKnowledge: KnowledgeSource[] = [
  { id: "cd-ks-1", customerId: "ai-cust-2", type: "runbook", title: "Queue replay runbook", status: "complete" },
  { id: "cd-ks-2", customerId: "ai-cust-2", type: "documentation", title: "Checkout deployment guide", status: "complete" },
  { id: "cd-ks-3", customerId: "ai-cust-2", type: "documentation", title: "Email service docs", status: "outdated" },
  { id: "cd-ks-4", customerId: "ai-cust-2", type: "documentation", title: "Permission model doc", status: "partial" },
];

export const contosoRisks: RiskSignal[] = [
  { id: "cd-r-1", customerId: "ai-cust-2", title: "Queue backlog after deployment", description: "Order queue depth spiked 3x after last deployment", severity: "medium", source: "Telemetry" },
  { id: "cd-r-2", customerId: "ai-cust-2", title: "Permission inconsistency", description: "Admin roles out of sync between staging and prod", severity: "low", source: "Configuration" },
  { id: "cd-r-3", customerId: "ai-cust-2", title: "Email service instability", description: "Transactional email delivery rate dropped to 94%", severity: "medium", source: "Monitoring" },
];

export const contosoChanges: ChangeEvent[] = [
  { id: "cd-ce-1", customerId: "ai-cust-2", type: "Deployment", description: "Checkout service v2.4.1 deployed to production", timestamp: "1 day ago" },
  { id: "cd-ce-2", customerId: "ai-cust-2", type: "Infrastructure", description: "Queue scaling changed from 3→5 workers", timestamp: "2 days ago" },
  { id: "cd-ce-3", customerId: "ai-cust-2", type: "Configuration", description: "Auth config updated for SSO provider", timestamp: "3 days ago" },
];

export const contosoGaps: GraphGap[] = [
  { id: "cd-gg-1", customerId: "ai-cust-2", type: "Dependency", description: "Missing dependency map for queue system", severity: "medium" },
  { id: "cd-gg-2", customerId: "ai-cust-2", type: "Documentation", description: "Outdated documentation for email service", severity: "low" },
];

export const contosoClassified: ClassifiedEntity[] = [
  { id: "cd-cl-1", customerId: "ai-cust-2", sourceType: "GitHub", entityType: "repo", label: "checkout-service", confidence: 97, linkedTo: "GitHub" },
  { id: "cd-cl-2", customerId: "ai-cust-2", sourceType: "Azure", entityType: "environment", label: "Production (US-East)", confidence: 95, linkedTo: "Azure" },
  { id: "cd-cl-3", customerId: "ai-cust-2", sourceType: "Azure", entityType: "environment", label: "Staging (US-East)", confidence: 95, linkedTo: "Azure" },
  { id: "cd-cl-4", customerId: "ai-cust-2", sourceType: "Jira", entityType: "system", label: "CDX Engineering Board", confidence: 94, linkedTo: "Jira" },
  { id: "cd-cl-5", customerId: "ai-cust-2", sourceType: "Classification", entityType: "workflow", label: "Checkout flow", confidence: 91 },
  { id: "cd-cl-6", customerId: "ai-cust-2", sourceType: "Classification", entityType: "system", label: "Queue system dependency", confidence: 85 },
  { id: "cd-cl-7", customerId: "ai-cust-2", sourceType: "Classification", entityType: "risk", label: "Outdated email-service docs", confidence: 76 },
];

export const contosoIngestion: IngestionActivity[] = [
  { id: "cd-ig-1", customerId: "ai-cust-2", sourceType: "GitHub", actionType: "connect", status: "complete", message: "Connected checkout-service repo — 24 workflows detected", timestamp: "15 min ago" },
  { id: "cd-ig-2", customerId: "ai-cust-2", sourceType: "Azure", actionType: "connect", status: "complete", message: "Connected Azure US-East — 3 environments detected", timestamp: "12 min ago" },
  { id: "cd-ig-3", customerId: "ai-cust-2", sourceType: "Jira", actionType: "connect", status: "complete", message: "Connected CDX Engineering Board — 89 issues indexed", timestamp: "10 min ago" },
  { id: "cd-ig-4", customerId: "ai-cust-2", sourceType: "Runbook", actionType: "upload", status: "complete", message: "Uploaded queue-replay-runbook.pdf — classified as Knowledge Source", timestamp: "8 min ago" },
  { id: "cd-ig-5", customerId: "ai-cust-2", sourceType: "System", actionType: "classify", status: "complete", message: "Classification complete — 7 entities, 2 gaps, 3 risks identified", timestamp: "5 min ago" },
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
}

const dataMap: Record<string, AccountIntelligenceData> = {
  "ai-cust-1": {
    customer: northstarCustomer,
    context: northstarContext,
    systems: northstarSystems,
    knowledge: northstarKnowledge,
    risks: northstarRisks,
    changes: northstarChanges,
    gaps: northstarGaps,
    classified: northstarClassified,
    ingestion: northstarIngestion,
  },
  "ai-cust-2": {
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

export const aiCustomers = [northstarCustomer, contosoCustomer];

export function getAccountIntelligence(customerId: string): AccountIntelligenceData | null {
  return dataMap[customerId] || null;
}
