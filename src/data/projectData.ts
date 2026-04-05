// Canonical account + project data for Solution Intelligence

export type HealthStatus = "high" | "medium" | "low" | "critical";
export type ProjectStatus = "active" | "onboarding" | "inactive";
export type WorkspaceType = "isv" | "si";
export type Severity = "low" | "medium" | "high" | "critical";
export type ServiceStatus = "connected" | "partial" | "pending" | "disconnected";
export type KnowledgeStatus = "complete" | "partial" | "missing" | "outdated";

export interface Account {
  id: string;
  name: string;
  industry: string;
  tier: "standard" | "premium" | "critical";
  health: HealthStatus;
  region: string;
  accountOwner: string;
  isFullySeeded: boolean;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  version: string;
  status: ProjectStatus;
  workspaceType: WorkspaceType;
  deployedDate: string;
  metrics: ProjectMetrics;
  architecture: ArchitectureComponent[];
  environments: Environment[];
  agents: Agent[];
  connectedServices: ConnectedService[];
  knowledgeSources: KnowledgeSource[];
  riskSignals: RiskSignal[];
}

export interface ProjectMetrics {
  openCases: number;
  resolutionRate: number;
  automationRate: number;
  csat: number;
}

export interface ArchitectureComponent {
  name: string;
  type: "api" | "worker" | "database" | "cache" | "queue" | "gateway" | "model" | "scheduler";
  status: "healthy" | "degraded" | "down";
  description: string;
}

export interface Environment {
  id: string;
  name: string;
  cloud: "Azure" | "AWS" | "GCP" | "On-Prem";
  region: string;
  nodes: number;
  uptime: string;
  status: "running" | "degraded" | "stopped";
}

export interface Agent {
  id: string;
  name: string;
  type: "orchestrator" | "telemetry" | "resolution" | "knowledge" | "context" | "triage";
  version: string;
  status: "active" | "idle" | "error";
  confidence: number;
  casesHandled: number;
  autoResolved: number;
}

export interface ConnectedService {
  id: string;
  name: string;
  type: "jira" | "github" | "azure" | "slack" | "pagerduty" | "datadog" | "salesforce" | "servicenow" | "confluence" | "runbook";
  status: ServiceStatus;
  lastSync: string;
  detail: string;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: "runbook" | "documentation" | "repo" | "api-spec" | "ticket-history";
  status: KnowledgeStatus;
  pages: number;
  lastUpdated: string;
  uploadedBy: string;
}

export interface RiskSignal {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  detectedDate: string;
  status: "new" | "investigating" | "mitigated" | "resolved";
}

// ─── 13 ACCOUNTS ─────────────────────────────────────────────

export const accounts: Account[] = [
  // ── 0. FinTrack AG (Launch Studio demo) ──
  {
    id: "fintrack-ag",
    name: "FinTrack AG",
    industry: "Financial Services",
    tier: "standard",
    health: "medium",
    region: "Azure Switzerland North",
    accountOwner: "Sarah Chen",
    isFullySeeded: true,
    projects: [
      {
        id: "proj-ft1",
        name: "Cash Flow Forecasting Agent",
        version: "1.0.0",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2025-03-15",
        metrics: { openCases: 0, resolutionRate: 0, automationRate: 0, csat: 0 },
        architecture: [
          { name: "Azure API Gateway", type: "gateway", status: "healthy", description: "Primary entry point for all agent requests" },
          { name: "Cash Flow Analysis Engine", type: "model", status: "healthy", description: "Core ML model for liquidity forecasting" },
          { name: "ERP Integration Layer", type: "worker", status: "healthy", description: "Connects to SAP/Oracle ERP systems" },
          { name: "Notification Service", type: "worker", status: "healthy", description: "Alerts and recommendations delivery" },
          { name: "Azure Key Vault", type: "cache", status: "healthy", description: "Secrets and certificate management" },
          { name: "PostgreSQL on Azure", type: "database", status: "healthy", description: "Transaction and forecast data store" },
        ],
        environments: [
          { id: "env-ft1", name: "Production (Switzerland North)", cloud: "Azure", region: "Switzerland North", nodes: 4, uptime: "99.2%", status: "running" },
          { id: "env-ft2", name: "Staging", cloud: "Azure", region: "Switzerland North", nodes: 2, uptime: "99.9%", status: "running" },
        ],
        agents: [],
        connectedServices: [
          { id: "cs-ft1", name: "Azure Switzerland North Subscription", type: "azure", status: "connected", lastSync: "5 min ago", detail: "2 environments, 6 nodes monitored" },
          { id: "cs-ft2", name: "fintrack/cashflow-agent", type: "github", status: "connected", lastSync: "1 hr ago", detail: "42 commits indexed" },
          { id: "cs-ft3", name: "#fintrack-ag", type: "slack", status: "connected", lastSync: "2 min ago", detail: "Case notifications active" },
          { id: "cs-ft4", name: "Banking Data Provider API", type: "salesforce", status: "partial", lastSync: "3 hr ago", detail: "Vendor risk assessment pending" },
        ],
        knowledgeSources: [
          { id: "ks-ft1", name: "Cash Flow Agent Architecture Doc", type: "documentation", status: "partial", pages: 8, lastUpdated: "1 week ago", uploadedBy: "Sarah Chen" },
          { id: "ks-ft2", name: "Deployment Runbook (Draft)", type: "runbook", status: "partial", pages: 4, lastUpdated: "3 days ago", uploadedBy: "Sarah Chen" },
        ],
        riskSignals: [
          { id: "rs-ft1", severity: "critical", title: "Hardcoded API key in repository", description: "Production API credentials found in plain text in committed source code", detectedDate: "2025-03-20", status: "new" },
          { id: "rs-ft2", severity: "high", title: "No human oversight for financial recommendations", description: "EU AI Act Article 14 requires human oversight for High Risk AI systems", detectedDate: "2025-03-20", status: "new" },
          { id: "rs-ft3", severity: "high", title: "No GDPR data processing agreement", description: "Processing Alpina Freight's financial data without a signed Article 28 DPA", detectedDate: "2025-03-20", status: "new" },
          { id: "rs-ft4", severity: "high", title: "No monitoring configured on Azure", description: "No Azure Monitor, no alerting, no logging — cannot meet Alpina's 4-hour SLA", detectedDate: "2025-03-20", status: "new" },
        ],
      },
    ],
  },

  // ── 1. Acme Manufacturing (fully seeded) ──
  {
    id: "cust-1",
    name: "Acme Manufacturing",
    industry: "Manufacturing",
    tier: "premium",
    health: "medium",
    region: "Azure West Europe + Southeast Asia",
    accountOwner: "Sarah Chen",
    isFullySeeded: true,
    projects: [
      {
        id: "proj-1a",
        name: "Helio CRM Agent",
        version: "3.4.2",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-06-12",
        metrics: { openCases: 4, resolutionRate: 78, automationRate: 68, csat: 4.1 },
        architecture: [
          { name: "CRM API Gateway", type: "gateway", status: "healthy", description: "Edge gateway handling all CRM API traffic" },
          { name: "Smart-Routing Engine", type: "worker", status: "degraded", description: "ML-based lead and case routing pipeline" },
          { name: "Lead Scoring Model", type: "model", status: "degraded", description: "Predictive model for enterprise lead scoring" },
          { name: "Contact Database", type: "database", status: "healthy", description: "Primary contact and account data store" },
          { name: "Event Queue", type: "queue", status: "healthy", description: "Async event processing for CRM actions" },
          { name: "Session Cache", type: "cache", status: "healthy", description: "Redis-backed session and token cache" },
        ],
        environments: [
          { id: "env-1a1", name: "Production (West US)", cloud: "Azure", region: "West US 2", nodes: 24, uptime: "99.94%", status: "running" },
          { id: "env-1a2", name: "APAC Extension", cloud: "Azure", region: "Southeast Asia", nodes: 8, uptime: "99.87%", status: "degraded" },
          { id: "env-1a3", name: "Staging", cloud: "Azure", region: "West US 2", nodes: 4, uptime: "99.99%", status: "running" },
        ],
        agents: [
          { id: "ag-1a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 92, casesHandled: 12, autoResolved: 0 },
          { id: "ag-1a2", name: "Telemetry Agent", type: "telemetry", version: "1.8.3", status: "active", confidence: 88, casesHandled: 10, autoResolved: 1 },
          { id: "ag-1a3", name: "Resolution Agent", type: "resolution", version: "1.6.1", status: "active", confidence: 78, casesHandled: 9, autoResolved: 3 },
          { id: "ag-1a4", name: "Knowledge Agent", type: "knowledge", version: "1.4.0", status: "active", confidence: 85, casesHandled: 8, autoResolved: 0 },
          { id: "ag-1a5", name: "Customer Context", type: "context", version: "1.3.2", status: "idle", confidence: 90, casesHandled: 7, autoResolved: 0 },
        ],
        connectedServices: [
          { id: "cs-1a1", name: "Azure West US Subscription", type: "azure", status: "connected", lastSync: "5 min ago", detail: "3 environments, 36 nodes monitored" },
          { id: "cs-1a2", name: "acme/helio-crm-config", type: "github", status: "connected", lastSync: "12 min ago", detail: "12 recent commits indexed" },
          { id: "cs-1a3", name: "Acme CRM Support Board", type: "jira", status: "connected", lastSync: "8 min ago", detail: "4 open cases synced" },
          { id: "cs-1a4", name: "Salesforce (Acme)", type: "salesforce", status: "partial", lastSync: "2 hr ago", detail: "Bulk sync connector timeout — sandbox refresh" },
          { id: "cs-1a5", name: "#acme-manufacturing", type: "slack", status: "connected", lastSync: "1 min ago", detail: "Case notifications active" },
        ],
        knowledgeSources: [
          { id: "ks-1a1", name: "RB-118 Config Drift Remediation", type: "runbook", status: "complete", pages: 14, lastUpdated: "2 weeks ago", uploadedBy: "Sarah Chen" },
          { id: "ks-1a2", name: "RB-102 OAuth Token Refresh", type: "runbook", status: "complete", pages: 8, lastUpdated: "1 month ago", uploadedBy: "Sarah Chen" },
          { id: "ks-1a3", name: "Helio CRM v3.4 Architecture Guide", type: "documentation", status: "complete", pages: 42, lastUpdated: "3 weeks ago", uploadedBy: "Marcus Webb" },
          { id: "ks-1a4", name: "helio-crm-config repository", type: "repo", status: "complete", pages: 0, lastUpdated: "12 min ago", uploadedBy: "GitHub sync" },
          { id: "ks-1a5", name: "APAC Config Runbook", type: "runbook", status: "missing", pages: 0, lastUpdated: "—", uploadedBy: "—" },
          { id: "ks-1a6", name: "Salesforce Connector Guide", type: "documentation", status: "partial", pages: 6, lastUpdated: "2 months ago", uploadedBy: "Sarah Chen" },
        ],
        riskSignals: [
          { id: "rs-1a1", severity: "high", title: "Configuration drift in APAC routing rules", description: "6 routing rule modifications conflict with blueprint baseline — 340 users affected", detectedDate: "2025-03-27", status: "investigating" },
          { id: "rs-1a2", severity: "medium", title: "Stale lead scoring predictions", description: "Lead scoring model hasn't refreshed in 48 hours — stale feature vectors", detectedDate: "2025-03-30", status: "new" },
          { id: "rs-1a3", severity: "medium", title: "Salesforce connector bulk sync timeout", description: "Bulk sync of 120K records failing after Salesforce sandbox refresh", detectedDate: "2025-03-29", status: "investigating" },
        ],
      },
    ],
  },

  // ── 2. Northwind Health ──
  {
    id: "cust-2",
    name: "Northwind Health",
    industry: "Healthcare",
    tier: "premium",
    health: "high",
    region: "Azure North Europe",
    accountOwner: "Sarah Chen",
    isFullySeeded: true,
    projects: [
      {
        id: "proj-2a",
        name: "OpsPilot Assistant",
        version: "2.1.0",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-04-20",
        metrics: { openCases: 1, resolutionRate: 94, automationRate: 93, csat: 4.7 },
        architecture: [
          { name: "Scheduling API", type: "api", status: "healthy", description: "REST API for shift scheduling and optimization" },
          { name: "Constraint Solver", type: "worker", status: "degraded", description: "Optimization engine for shift assignments" },
          { name: "Staff Database", type: "database", status: "healthy", description: "Staff profiles, certifications, availability" },
          { name: "Notification Service", type: "worker", status: "healthy", description: "Multi-channel shift notification dispatch" },
        ],
        environments: [
          { id: "env-2a1", name: "Production (North Europe)", cloud: "Azure", region: "North Europe", nodes: 32, uptime: "99.98%", status: "running" },
          { id: "env-2a2", name: "DR (West Europe)", cloud: "Azure", region: "West Europe", nodes: 16, uptime: "99.99%", status: "running" },
          { id: "env-2a3", name: "Staging", cloud: "Azure", region: "North Europe", nodes: 8, uptime: "99.99%", status: "running" },
        ],
        agents: [
          { id: "ag-2a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 94, casesHandled: 4, autoResolved: 0 },
          { id: "ag-2a2", name: "Telemetry Agent", type: "telemetry", version: "1.8.3", status: "active", confidence: 91, casesHandled: 3, autoResolved: 0 },
          { id: "ag-2a3", name: "Resolution Agent", type: "resolution", version: "1.6.1", status: "active", confidence: 83, casesHandled: 2, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-2a1", name: "Azure North Europe Subscription", type: "azure", status: "connected", lastSync: "3 min ago", detail: "3 environments, 56 nodes monitored" },
          { id: "cs-2a2", name: "northwind/opspilot", type: "github", status: "connected", lastSync: "20 min ago", detail: "8 recent commits indexed" },
          { id: "cs-2a3", name: "Northwind Ops Board", type: "jira", status: "connected", lastSync: "10 min ago", detail: "1 open case synced" },
          { id: "cs-2a4", name: "#northwind-health", type: "slack", status: "connected", lastSync: "2 min ago", detail: "Case notifications active" },
          { id: "cs-2a5", name: "PagerDuty (Northwind)", type: "pagerduty", status: "connected", lastSync: "5 min ago", detail: "On-call schedule synced" },
        ],
        knowledgeSources: [
          { id: "ks-2a1", name: "RB-071 Policy Sync Runbook", type: "runbook", status: "complete", pages: 11, lastUpdated: "1 week ago", uploadedBy: "Sarah Chen" },
          { id: "ks-2a2", name: "OpsPilot v2.1 Admin Guide", type: "documentation", status: "complete", pages: 38, lastUpdated: "2 weeks ago", uploadedBy: "Marcus Webb" },
          { id: "ks-2a3", name: "northwind/opspilot repository", type: "repo", status: "complete", pages: 0, lastUpdated: "20 min ago", uploadedBy: "GitHub sync" },
        ],
        riskSignals: [
          { id: "rs-2a1", severity: "medium", title: "Constraint solver using outdated labor rules", description: "OpsPilot suggesting shifts that violate updated 12-hour rest requirements", detectedDate: "2025-03-29", status: "investigating" },
        ],
      },
    ],
  },

  // ── 3. Contoso Digital (fully seeded) ──
  {
    id: "cust-3",
    name: "Contoso Digital",
    industry: "Swiss Financial Services",
    tier: "standard",
    health: "medium",
    region: "EU West",
    accountOwner: "Marcus Webb",
    isFullySeeded: true,
    projects: [
      {
        id: "proj-3a",
        name: "Finance Flow Agent",
        version: "1.8.5",
        status: "active",
        workspaceType: "si",
        deployedDate: "2024-09-05",
        metrics: { openCases: 3, resolutionRate: 71, automationRate: 79, csat: 3.9 },
        architecture: [
          { name: "Reconciliation Engine", type: "worker", status: "degraded", description: "Multi-currency invoice reconciliation pipeline" },
          { name: "Expense Classifier", type: "model", status: "degraded", description: "ML-based expense auto-categorization" },
          { name: "Approval Router", type: "worker", status: "healthy", description: "Workflow routing for financial approvals" },
          { name: "Finance Data Lake", type: "database", status: "healthy", description: "Central data store for invoices, expenses, GL" },
          { name: "Batch Scheduler", type: "scheduler", status: "healthy", description: "Cron-based batch job orchestration" },
        ],
        environments: [
          { id: "env-3a1", name: "Production (EU-West)", cloud: "Azure", region: "West Europe", nodes: 16, uptime: "99.91%", status: "running" },
          { id: "env-3a2", name: "Staging", cloud: "Azure", region: "West Europe", nodes: 4, uptime: "99.99%", status: "running" },
        ],
        agents: [
          { id: "ag-3a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 90, casesHandled: 6, autoResolved: 0 },
          { id: "ag-3a2", name: "Resolution Agent", type: "resolution", version: "1.6.1", status: "active", confidence: 74, casesHandled: 5, autoResolved: 2 },
          { id: "ag-3a3", name: "Knowledge Agent", type: "knowledge", version: "1.4.0", status: "active", confidence: 82, casesHandled: 4, autoResolved: 0 },
        ],
        connectedServices: [
          { id: "cs-3a1", name: "Azure EU-West Subscription", type: "azure", status: "connected", lastSync: "4 min ago", detail: "2 environments, 20 nodes monitored" },
          { id: "cs-3a2", name: "contoso/finance-flow", type: "github", status: "connected", lastSync: "15 min ago", detail: "8 recent commits indexed" },
          { id: "cs-3a3", name: "Contoso Engineering Board", type: "jira", status: "connected", lastSync: "6 min ago", detail: "3 open cases synced" },
          { id: "cs-3a4", name: "Operations Runbooks", type: "runbook", status: "connected", lastSync: "1 hr ago", detail: "2 runbooks indexed" },
          { id: "cs-3a5", name: "#contoso-digital", type: "slack", status: "connected", lastSync: "1 min ago", detail: "Case notifications active" },
        ],
        knowledgeSources: [
          { id: "ks-3a1", name: "RB-045 Batch Recovery & Scaling", type: "runbook", status: "complete", pages: 18, lastUpdated: "1 week ago", uploadedBy: "Marcus Webb" },
          { id: "ks-3a2", name: "Queue Replay Runbook", type: "runbook", status: "complete", pages: 9, lastUpdated: "3 weeks ago", uploadedBy: "Marcus Webb" },
          { id: "ks-3a3", name: "Finance Flow API Spec", type: "api-spec", status: "complete", pages: 0, lastUpdated: "2 weeks ago", uploadedBy: "GitHub sync" },
          { id: "ks-3a4", name: "Email Service Docs", type: "documentation", status: "outdated", pages: 12, lastUpdated: "4 months ago", uploadedBy: "Sarah Chen" },
          { id: "ks-3a5", name: "Permission Model Doc", type: "documentation", status: "partial", pages: 5, lastUpdated: "2 months ago", uploadedBy: "Marcus Webb" },
        ],
        riskSignals: [
          { id: "rs-3a1", severity: "high", title: "Multi-currency batch causing memory pressure", description: "EUR/GBP/CHF reconciliation stalled at 68%, 4,200 invoices pending", detectedDate: "2025-03-30", status: "investigating" },
          { id: "rs-3a2", severity: "medium", title: "Expense categorization accuracy dropped", description: "Accuracy fell from 94% to 81% after 3 new GL codes added", detectedDate: "2025-03-30", status: "new" },
          { id: "rs-3a3", severity: "medium", title: "Broken approval chains after org restructure", description: "3 approval workflows routing to deactivated manager accounts", detectedDate: "2025-03-29", status: "mitigated" },
        ],
      },
    ],
  },

  // ── 4. HelioWorks AG ──
  {
    id: "cust-4",
    name: "HelioWorks AG",
    industry: "Energy",
    tier: "standard",
    health: "critical",
    region: "Azure West Europe",
    accountOwner: "Sarah Chen",
    isFullySeeded: true,
    projects: [
      {
        id: "proj-4a",
        name: "Helio CRM Agent",
        version: "3.4.2",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-03-01",
        metrics: { openCases: 3, resolutionRate: 52, automationRate: 54, csat: 3.2 },
        architecture: [
          { name: "CRM API Gateway", type: "gateway", status: "healthy", description: "Edge gateway for EU CRM traffic" },
          { name: "Replication Manager", type: "worker", status: "degraded", description: "Cross-region data replication controller" },
          { name: "Pipeline Scorer", type: "model", status: "degraded", description: "Predictive pipeline value scoring" },
          { name: "Contact Database (EU)", type: "database", status: "degraded", description: "EU replica showing replication lag" },
          { name: "GDPR Processor", type: "worker", status: "degraded", description: "Data deletion and anonymization pipeline" },
        ],
        environments: [
          { id: "env-4a1", name: "Production (EU-West)", cloud: "Azure", region: "West Europe", nodes: 48, uptime: "99.72%", status: "degraded" },
          { id: "env-4a2", name: "Production (EU-North)", cloud: "Azure", region: "North Europe", nodes: 16, uptime: "99.95%", status: "running" },
        ],
        agents: [
          { id: "ag-4a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 88, casesHandled: 8, autoResolved: 0 },
          { id: "ag-4a2", name: "Telemetry Agent", type: "telemetry", version: "1.8.3", status: "active", confidence: 69, casesHandled: 6, autoResolved: 0 },
          { id: "ag-4a3", name: "Resolution Agent", type: "resolution", version: "1.6.1", status: "active", confidence: 52, casesHandled: 5, autoResolved: 0 },
          { id: "ag-4a4", name: "Customer Context", type: "context", version: "1.3.2", status: "active", confidence: 90, casesHandled: 3, autoResolved: 0 },
        ],
        connectedServices: [
          { id: "cs-4a1", name: "Azure West Europe Subscription", type: "azure", status: "connected", lastSync: "2 min ago", detail: "2 environments, 64 nodes monitored" },
          { id: "cs-4a2", name: "helioworks/crm-platform", type: "github", status: "connected", lastSync: "8 min ago", detail: "23 recent commits indexed" },
          { id: "cs-4a3", name: "HelioWorks Support Board", type: "jira", status: "connected", lastSync: "5 min ago", detail: "3 open cases synced" },
          { id: "cs-4a4", name: "#helioworks-ag", type: "slack", status: "connected", lastSync: "1 min ago", detail: "Critical alerts active" },
          { id: "cs-4a5", name: "PagerDuty (HelioWorks)", type: "pagerduty", status: "connected", lastSync: "3 min ago", detail: "P1 escalation active" },
        ],
        knowledgeSources: [
          { id: "ks-4a1", name: "RB-092 Replication Recovery", type: "runbook", status: "complete", pages: 22, lastUpdated: "5 days ago", uploadedBy: "Sarah Chen" },
          { id: "ks-4a2", name: "RB-033 Hierarchy Scoring", type: "runbook", status: "complete", pages: 10, lastUpdated: "2 weeks ago", uploadedBy: "Sarah Chen" },
          { id: "ks-4a3", name: "GDPR Compliance Procedures", type: "documentation", status: "partial", pages: 15, lastUpdated: "1 month ago", uploadedBy: "Marcus Webb" },
        ],
        riskSignals: [
          { id: "rs-4a1", severity: "critical", title: "Cross-region replication lag — EU data integrity risk", description: "Replication lag at 45s (threshold 5s), 1,200 users seeing stale data", detectedDate: "2025-03-30", status: "investigating" },
          { id: "rs-4a2", severity: "critical", title: "GDPR deletion gap on archived records", description: "Archived records in cold storage not being purged — regulatory deadline in 72 hours", detectedDate: "2025-03-30", status: "new" },
          { id: "rs-4a3", severity: "high", title: "Pipeline scoring timeouts on large hierarchies", description: "Scoring timing out for accounts with >500 child entities — 40% of pipeline value", detectedDate: "2025-03-29", status: "investigating" },
        ],
      },
    ],
  },

  // ── 5. Alpine Grid ──
  {
    id: "cust-5",
    name: "Alpine Grid",
    industry: "Utilities",
    tier: "standard",
    health: "high",
    region: "Azure Switzerland North",
    accountOwner: "Marcus Webb",
    isFullySeeded: true,
    projects: [
      {
        id: "proj-5a",
        name: "OpsPilot Assistant",
        version: "2.1.0",
        status: "active",
        workspaceType: "si",
        deployedDate: "2024-08-18",
        metrics: { openCases: 1, resolutionRate: 96, automationRate: 96, csat: 4.8 },
        architecture: [
          { name: "Grid Monitor API", type: "api", status: "healthy", description: "Real-time grid telemetry ingestion" },
          { name: "Anomaly Detector", type: "model", status: "healthy", description: "Power grid anomaly detection model" },
          { name: "Alert Router", type: "worker", status: "healthy", description: "Alert classification and routing" },
        ],
        environments: [
          { id: "env-5a1", name: "Production (EU-Central)", cloud: "Azure", region: "Switzerland North", nodes: 12, uptime: "99.99%", status: "running" },
          { id: "env-5a2", name: "Staging", cloud: "Azure", region: "Switzerland North", nodes: 4, uptime: "99.99%", status: "running" },
        ],
        agents: [
          { id: "ag-5a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 96, casesHandled: 3, autoResolved: 1 },
          { id: "ag-5a2", name: "Resolution Agent", type: "resolution", version: "1.6.1", status: "idle", confidence: 96, casesHandled: 2, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-5a1", name: "Azure Switzerland North Subscription", type: "azure", status: "connected", lastSync: "10 min ago", detail: "2 environments, 16 nodes monitored" },
          { id: "cs-5a2", name: "alpine/grid-ops", type: "github", status: "connected", lastSync: "30 min ago", detail: "3 recent commits indexed" },
          { id: "cs-5a3", name: "#alpine-grid", type: "slack", status: "connected", lastSync: "5 min ago", detail: "Case notifications active" },
        ],
        knowledgeSources: [
          { id: "ks-5a1", name: "Grid Monitoring Runbook", type: "runbook", status: "complete", pages: 16, lastUpdated: "1 month ago", uploadedBy: "Marcus Webb" },
          { id: "ks-5a2", name: "OpsPilot v2.1 Admin Guide", type: "documentation", status: "complete", pages: 38, lastUpdated: "2 weeks ago", uploadedBy: "Marcus Webb" },
        ],
        riskSignals: [],
      },
    ],
  },

  // ── 6. Meridian Logistics ──
  {
    id: "cust-6",
    name: "Meridian Logistics",
    industry: "Logistics",
    tier: "premium",
    health: "high",
    region: "Azure West Europe + North Europe",
    accountOwner: "Sarah Chen",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-6a",
        name: "OpsPilot Assistant",
        version: "2.0.4",
        status: "active",
        workspaceType: "si",
        deployedDate: "2024-11-02",
        metrics: { openCases: 0, resolutionRate: 89, automationRate: 85, csat: 4.4 },
        architecture: [
          { name: "Route Optimizer", type: "worker", status: "healthy", description: "Fleet route optimization engine" },
          { name: "Dispatch API", type: "api", status: "healthy", description: "Driver dispatch and tracking API" },
        ],
        environments: [
          { id: "env-6a1", name: "Production (West Europe)", cloud: "Azure", region: "West Europe", nodes: 8, uptime: "99.96%", status: "running" },
        ],
        agents: [
          { id: "ag-6a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 91, casesHandled: 2, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-6a1", name: "Azure West Europe Subscription", type: "azure", status: "connected", lastSync: "15 min ago", detail: "1 environment monitored" },
          { id: "cs-6a2", name: "#meridian-logistics", type: "slack", status: "connected", lastSync: "10 min ago", detail: "Case notifications active" },
        ],
        knowledgeSources: [
          { id: "ks-6a1", name: "Fleet Ops Runbook", type: "runbook", status: "partial", pages: 7, lastUpdated: "3 weeks ago", uploadedBy: "Sarah Chen" },
        ],
        riskSignals: [],
      },
    ],
  },

  // ── 7. Solaris Fintech ──
  {
    id: "cust-7",
    name: "Solaris Fintech",
    industry: "Financial Services",
    tier: "standard",
    health: "medium",
    region: "Azure Switzerland North",
    accountOwner: "Marcus Webb",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-7a",
        name: "Finance Flow Agent",
        version: "1.8.5",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-07-15",
        metrics: { openCases: 2, resolutionRate: 74, automationRate: 72, csat: 3.8 },
        architecture: [
          { name: "Claims Processor", type: "worker", status: "healthy", description: "Automated claims intake and routing" },
          { name: "Policy Database", type: "database", status: "healthy", description: "Policy and claims data store" },
        ],
        environments: [
          { id: "env-7a1", name: "Production (Switzerland North)", cloud: "Azure", region: "Switzerland North", nodes: 20, uptime: "99.93%", status: "running" },
          { id: "env-7a2", name: "Staging", cloud: "Azure", region: "North Europe", nodes: 6, uptime: "99.99%", status: "running" },
        ],
        agents: [
          { id: "ag-7a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 87, casesHandled: 5, autoResolved: 1 },
          { id: "ag-7a2", name: "Resolution Agent", type: "resolution", version: "1.6.1", status: "active", confidence: 72, casesHandled: 3, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-7a1", name: "Azure Switzerland North Subscription", type: "azure", status: "connected", lastSync: "8 min ago", detail: "2 environments monitored" },
          { id: "cs-7a2", name: "Solaris Eng Board", type: "jira", status: "pending", lastSync: "—", detail: "Awaiting API key configuration" },
        ],
        knowledgeSources: [
          { id: "ks-7a1", name: "Claims Processing Guide", type: "documentation", status: "partial", pages: 22, lastUpdated: "6 weeks ago", uploadedBy: "Marcus Webb" },
        ],
        riskSignals: [
          { id: "rs-7a1", severity: "medium", title: "Claims processing latency increase", description: "P95 latency up 40% over past week — likely related to Q4 volume", detectedDate: "2025-03-28", status: "investigating" },
        ],
      },
    ],
  },

  // ── 8. Cascade Retail ──
  {
    id: "cust-8",
    name: "Cascade Retail",
    industry: "Retail",
    tier: "premium",
    health: "high",
    region: "Azure West Europe",
    accountOwner: "Sarah Chen",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-8a",
        name: "Helio CRM Agent",
        version: "3.4.2",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-05-10",
        metrics: { openCases: 1, resolutionRate: 91, automationRate: 88, csat: 4.5 },
        architecture: [
          { name: "CRM API Gateway", type: "gateway", status: "healthy", description: "Retail CRM gateway with omnichannel support" },
          { name: "Contact Database", type: "database", status: "healthy", description: "Customer contact and engagement data" },
        ],
        environments: [
          { id: "env-8a1", name: "Production (West Europe)", cloud: "Azure", region: "West Europe", nodes: 24, uptime: "99.97%", status: "running" },
          { id: "env-8a2", name: "Production (EU-West)", cloud: "Azure", region: "West Europe", nodes: 12, uptime: "99.96%", status: "running" },
        ],
        agents: [
          { id: "ag-8a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 93, casesHandled: 3, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-8a1", name: "Azure West Europe Subscription", type: "azure", status: "connected", lastSync: "5 min ago", detail: "2 environments, 36 nodes" },
          { id: "cs-8a2", name: "#cascade-retail", type: "slack", status: "connected", lastSync: "3 min ago", detail: "Case notifications active" },
        ],
        knowledgeSources: [
          { id: "ks-8a1", name: "Retail Operations Runbook", type: "runbook", status: "complete", pages: 30, lastUpdated: "2 weeks ago", uploadedBy: "Sarah Chen" },
        ],
        riskSignals: [],
      },
      {
        id: "proj-8b",
        name: "Finance Flow Agent",
        version: "1.8.5",
        status: "onboarding",
        workspaceType: "isv",
        deployedDate: "2025-02-20",
        metrics: { openCases: 0, resolutionRate: 0, automationRate: 0, csat: 0 },
        architecture: [
          { name: "Reconciliation Engine", type: "worker", status: "healthy", description: "Invoice reconciliation for retail procurement" },
        ],
        environments: [
          { id: "env-8b1", name: "Staging (West Europe)", cloud: "Azure", region: "West Europe", nodes: 4, uptime: "99.99%", status: "running" },
        ],
        agents: [],
        connectedServices: [
          { id: "cs-8b1", name: "Azure Staging Subscription", type: "azure", status: "pending", lastSync: "—", detail: "Awaiting production config" },
        ],
        knowledgeSources: [],
        riskSignals: [],
      },
    ],
  },

  // ── 9. Vertex Systems ──
  {
    id: "cust-9",
    name: "Vertex Systems",
    industry: "Technology",
    tier: "standard",
    health: "high",
    region: "Azure North Europe",
    accountOwner: "Marcus Webb",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-9a",
        name: "OpsPilot Assistant",
        version: "2.1.0",
        status: "active",
        workspaceType: "si",
        deployedDate: "2024-10-01",
        metrics: { openCases: 0, resolutionRate: 92, automationRate: 90, csat: 4.6 },
        architecture: [
          { name: "Resource Scheduler", type: "scheduler", status: "healthy", description: "Cloud resource scheduling and optimization" },
          { name: "Operations API", type: "api", status: "healthy", description: "Internal operations management API" },
        ],
        environments: [
          { id: "env-9a1", name: "Production (North Europe)", cloud: "Azure", region: "North Europe", nodes: 6, uptime: "99.98%", status: "running" },
        ],
        agents: [
          { id: "ag-9a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "idle", confidence: 95, casesHandled: 1, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-9a1", name: "Azure West US", type: "azure", status: "connected", lastSync: "20 min ago", detail: "1 environment monitored" },
        ],
        knowledgeSources: [],
        riskSignals: [],
      },
    ],
  },

  // ── 10. Harbor Insurance ──
  {
    id: "cust-10",
    name: "Harbor Insurance",
    industry: "Insurance",
    tier: "premium",
    health: "medium",
    region: "Azure West Europe",
    accountOwner: "Sarah Chen",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-10a",
        name: "Helio CRM Agent",
        version: "3.4.1",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-08-22",
        metrics: { openCases: 2, resolutionRate: 76, automationRate: 74, csat: 4.0 },
        architecture: [
          { name: "CRM API Gateway", type: "gateway", status: "healthy", description: "Insurance CRM gateway for policy and claims" },
          { name: "Customer 360 DB", type: "database", status: "healthy", description: "Unified customer profile store" },
          { name: "Campaign Engine", type: "worker", status: "healthy", description: "Claims processing and policy renewal automation" },
        ],
        environments: [
          { id: "env-10a1", name: "Production (West Europe)", cloud: "Azure", region: "West Europe", nodes: 16, uptime: "99.95%", status: "running" },
          { id: "env-10a2", name: "Production (EU-West)", cloud: "Azure", region: "West Europe", nodes: 8, uptime: "99.93%", status: "running" },
        ],
        agents: [
          { id: "ag-10a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 86, casesHandled: 4, autoResolved: 0 },
          { id: "ag-10a2", name: "Telemetry Agent", type: "telemetry", version: "1.8.3", status: "active", confidence: 84, casesHandled: 3, autoResolved: 0 },
        ],
        connectedServices: [
          { id: "cs-10a1", name: "Azure West Europe Subscription", type: "azure", status: "connected", lastSync: "6 min ago", detail: "2 environments, 24 nodes" },
          { id: "cs-10a2", name: "harbor/crm-platform", type: "github", status: "connected", lastSync: "25 min ago", detail: "5 recent commits indexed" },
          { id: "cs-10a3", name: "ServiceNow (Harbor)", type: "servicenow", status: "partial", lastSync: "1 hr ago", detail: "Incident sync — partial mapping" },
        ],
        knowledgeSources: [
          { id: "ks-10a1", name: "Insurance CRM Playbook", type: "documentation", status: "partial", pages: 28, lastUpdated: "1 month ago", uploadedBy: "Sarah Chen" },
        ],
        riskSignals: [
          { id: "rs-10a1", severity: "medium", title: "Claims processing latency increase", description: "Claims processing P95 latency up 35% during peak renewal period", detectedDate: "2025-03-28", status: "investigating" },
        ],
      },
    ],
  },

  // ── 11. Pinnacle Legal ──
  {
    id: "cust-11",
    name: "Pinnacle Legal",
    industry: "Legal Services",
    tier: "standard",
    health: "high",
    region: "Azure Switzerland North",
    accountOwner: "Sarah Chen",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-11a",
        name: "OpsPilot Assistant",
        version: "2.1.0",
        status: "active",
        workspaceType: "isv",
        deployedDate: "2024-09-15",
        metrics: { openCases: 1, resolutionRate: 88, automationRate: 86, csat: 4.3 },
        architecture: [
          { name: "Document Analyzer", type: "api", status: "healthy", description: "Legal document analysis and classification" },
          { name: "Case Classifier", type: "model", status: "healthy", description: "Legal case auto-classification" },
          { name: "Ticket Router", type: "worker", status: "healthy", description: "SLA-aware ticket routing" },
        ],
        environments: [
          { id: "env-11a1", name: "Production (EU-West)", cloud: "Azure", region: "West Europe", nodes: 20, uptime: "99.96%", status: "running" },
          { id: "env-11a2", name: "DR (EU-Central)", cloud: "Azure", region: "Switzerland North", nodes: 10, uptime: "99.99%", status: "running" },
        ],
        agents: [
          { id: "ag-11a1", name: "Orchestrator", type: "orchestrator", version: "2.1.0", status: "active", confidence: 90, casesHandled: 6, autoResolved: 2 },
          { id: "ag-11a2", name: "Triage Agent", type: "triage", version: "1.2.0", status: "active", confidence: 87, casesHandled: 5, autoResolved: 1 },
        ],
        connectedServices: [
          { id: "cs-11a1", name: "Azure Switzerland North Subscription", type: "azure", status: "connected", lastSync: "4 min ago", detail: "2 environments, 30 nodes" },
          { id: "cs-11a2", name: "Datadog (Pinnacle Legal)", type: "datadog", status: "connected", lastSync: "1 min ago", detail: "Application metrics streaming" },
          { id: "cs-11a3", name: "#pinnacle-legal", type: "slack", status: "connected", lastSync: "2 min ago", detail: "P1/P2 alerts active" },
        ],
        knowledgeSources: [
          { id: "ks-11a1", name: "Legal Case Management Playbook", type: "runbook", status: "complete", pages: 20, lastUpdated: "2 weeks ago", uploadedBy: "Sarah Chen" },
        ],
        riskSignals: [],
      },
    ],
  },

  // ── 12. Orion Aerospace ──
  {
    id: "cust-12",
    name: "Orion Aerospace",
    industry: "Aerospace",
    tier: "premium",
    health: "low",
    region: "Azure North Europe",
    accountOwner: "Marcus Webb",
    isFullySeeded: false,
    projects: [
      {
        id: "proj-12a",
        name: "Helio CRM Agent",
        version: "3.3.0",
        status: "onboarding",
        workspaceType: "si",
        deployedDate: "2025-01-10",
        metrics: { openCases: 0, resolutionRate: 0, automationRate: 0, csat: 0 },
        architecture: [
          { name: "CRM API Gateway", type: "gateway", status: "healthy", description: "Aerospace CRM gateway — initial setup" },
        ],
        environments: [
          { id: "env-12a1", name: "Staging (North Europe)", cloud: "Azure", region: "North Europe", nodes: 4, uptime: "99.99%", status: "running" },
        ],
        agents: [],
        connectedServices: [
          { id: "cs-12a1", name: "Azure West US", type: "azure", status: "pending", lastSync: "—", detail: "Awaiting production setup" },
          { id: "cs-12a2", name: "Confluence (Orion)", type: "confluence", status: "disconnected", lastSync: "—", detail: "OAuth token expired" },
        ],
        knowledgeSources: [],
        riskSignals: [],
      },
      {
        id: "proj-12b",
        name: "OpsPilot Assistant",
        version: "2.1.0",
        status: "inactive",
        workspaceType: "si",
        deployedDate: "2024-06-01",
        metrics: { openCases: 0, resolutionRate: 65, automationRate: 58, csat: 3.4 },
        architecture: [
          { name: "Fleet Scheduler", type: "scheduler", status: "down", description: "Aerospace fleet scheduling — decommissioned" },
        ],
        environments: [
          { id: "env-12b1", name: "Production (North Europe)", cloud: "Azure", region: "North Europe", nodes: 2, uptime: "—", status: "stopped" },
        ],
        agents: [],
        connectedServices: [],
        knowledgeSources: [],
        riskSignals: [],
      },
    ],
  },
];

// Helper to find a project across all accounts
export function findProject(accountId: string, projectId: string): { account: Account; project: Project } | null {
  const account = accounts.find(a => a.id === accountId);
  if (!account) return null;
  const project = account.projects.find(p => p.id === projectId);
  if (!project) return null;
  return { account, project };
}
