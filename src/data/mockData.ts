export const products = [
  { id: "prod-1", name: "DataSync Pro", version: "4.2.1", type: "Data Integration Platform" },
  { id: "prod-2", name: "CloudGuard AI", version: "2.8.0", type: "AI Security Platform" },
  { id: "prod-3", name: "FlowEngine", version: "3.1.4", type: "Workflow Automation Suite" },
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
  { id: "cust-1", name: "Meridian Financial", product: "DataSync Pro", environment: "AWS US-East", risk: "high", openCases: 4, automationRate: 72, healthScore: 58, lastActivity: "12 min ago", deploymentDate: "2024-08-15", nodes: 24 },
  { id: "cust-2", name: "Apex Healthcare", product: "CloudGuard AI", environment: "Azure West EU", risk: "low", openCases: 1, automationRate: 94, healthScore: 92, lastActivity: "2 hr ago", deploymentDate: "2024-06-01", nodes: 48 },
  { id: "cust-3", name: "NovaTech Industries", product: "FlowEngine", environment: "GCP US-Central", risk: "medium", openCases: 3, automationRate: 81, healthScore: 74, lastActivity: "35 min ago", deploymentDate: "2024-10-22", nodes: 16 },
  { id: "cust-4", name: "Sterling Logistics", product: "DataSync Pro", environment: "AWS EU-West", risk: "critical", openCases: 5, automationRate: 61, healthScore: 41, lastActivity: "3 min ago", deploymentDate: "2024-03-10", nodes: 32 },
  { id: "cust-5", name: "Pinnacle Media", product: "CloudGuard AI", environment: "Azure US-East", risk: "low", openCases: 0, automationRate: 97, healthScore: 96, lastActivity: "1 day ago", deploymentDate: "2024-09-05", nodes: 12 },
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
  { id: "CS-1001", customerId: "cust-1", title: "Sync pipeline stall on large batch ingestion", status: "in-progress", priority: "high", trigger: "telemetry", category: "Performance", createdAt: "2025-03-29T14:22:00Z", updatedAt: "2025-03-30T08:15:00Z", confidence: 67, assignedAgent: "Resolution Agent", summary: "Pipeline throughput dropped 80% during batch ingestion of 2.4M records. Telemetry shows memory pressure on worker nodes." },
  { id: "CS-1002", customerId: "cust-1", title: "Authentication token refresh failures", status: "open", priority: "medium", trigger: "customer", category: "Authentication", createdAt: "2025-03-30T06:10:00Z", updatedAt: "2025-03-30T06:10:00Z", confidence: 45, assignedAgent: "Knowledge Agent", summary: "Customer reports intermittent 401 errors on API calls after token refresh cycle." },
  { id: "CS-1003", customerId: "cust-1", title: "Data validation rule mismatch", status: "waiting", priority: "medium", trigger: "telemetry", category: "Data Quality", createdAt: "2025-03-28T18:00:00Z", updatedAt: "2025-03-29T12:00:00Z", confidence: 82, assignedAgent: "Resolution Agent", summary: "Validation rules on schema v4.2 not matching customer's custom transformations." },
  { id: "CS-1004", customerId: "cust-1", title: "Connector timeout to legacy Oracle DB", status: "open", priority: "low", trigger: "customer", category: "Connectivity", createdAt: "2025-03-30T09:00:00Z", updatedAt: "2025-03-30T09:00:00Z", confidence: 55, assignedAgent: "Telemetry Agent", summary: "Intermittent timeout connecting to Oracle 12c instance behind customer VPN." },
  { id: "CS-1005", customerId: "cust-2", title: "False positive alert on network anomaly", status: "resolved", priority: "low", trigger: "telemetry", category: "Alert Tuning", createdAt: "2025-03-27T10:00:00Z", updatedAt: "2025-03-28T15:00:00Z", confidence: 95, assignedAgent: "Resolution Agent", summary: "Scheduled backup traffic was flagged as lateral movement. Whitelisted pattern." },
  { id: "CS-1006", customerId: "cust-3", title: "Workflow execution stuck in retry loop", status: "in-progress", priority: "high", trigger: "telemetry", category: "Execution", createdAt: "2025-03-29T22:00:00Z", updatedAt: "2025-03-30T07:30:00Z", confidence: 73, assignedAgent: "Resolution Agent", summary: "Step 4 of onboarding workflow retrying indefinitely due to downstream API rate limit." },
  { id: "CS-1007", customerId: "cust-3", title: "Custom action plugin compatibility issue", status: "open", priority: "medium", trigger: "customer", category: "Integration", createdAt: "2025-03-30T03:00:00Z", updatedAt: "2025-03-30T03:00:00Z", confidence: 38, assignedAgent: "Knowledge Agent", summary: "Customer-built Salesforce plugin fails after FlowEngine 3.1.4 upgrade." },
  { id: "CS-1008", customerId: "cust-3", title: "Scheduled job missing SLA window", status: "waiting", priority: "medium", trigger: "telemetry", category: "Performance", createdAt: "2025-03-29T08:00:00Z", updatedAt: "2025-03-30T01:00:00Z", confidence: 61, assignedAgent: "Telemetry Agent", summary: "Nightly reconciliation job exceeding 4hr SLA window by 45 minutes consistently." },
  { id: "CS-1009", customerId: "cust-4", title: "Critical: Data loss during failover", status: "in-progress", priority: "critical", trigger: "telemetry", category: "Data Integrity", createdAt: "2025-03-30T02:00:00Z", updatedAt: "2025-03-30T08:45:00Z", confidence: 52, assignedAgent: "Resolution Agent", summary: "3,200 records lost during automated failover from primary to secondary region. WAL replay incomplete." },
  { id: "CS-1010", customerId: "cust-4", title: "Replication lag exceeding threshold", status: "open", priority: "high", trigger: "telemetry", category: "Performance", createdAt: "2025-03-30T05:00:00Z", updatedAt: "2025-03-30T05:00:00Z", confidence: 78, assignedAgent: "Telemetry Agent", summary: "Cross-region replication lag at 12 seconds, threshold is 5 seconds." },
  { id: "CS-1011", customerId: "cust-4", title: "Customer escalation: missing audit logs", status: "open", priority: "critical", trigger: "customer", category: "Compliance", createdAt: "2025-03-30T07:00:00Z", updatedAt: "2025-03-30T07:00:00Z", confidence: 30, assignedAgent: "Customer Context Agent", summary: "Sterling compliance team requires audit logs for March 28-29 period. Logs show gaps." },
  { id: "CS-1012", customerId: "cust-4", title: "Schema migration rollback needed", status: "waiting", priority: "high", trigger: "customer", category: "Data Quality", createdAt: "2025-03-29T16:00:00Z", updatedAt: "2025-03-30T04:00:00Z", confidence: 71, assignedAgent: "Resolution Agent", summary: "v4.2 schema migration caused column type conflicts. Customer requesting rollback to v4.1." },
];

export interface AgentStep {
  agent: string;
  action: string;
  result: string;
  timestamp: string;
  confidence: number;
}

export const sampleOrchestration: AgentStep[] = [
  { agent: "Orchestrator", action: "Triaged incoming alert", result: "Classified as Performance / Critical", timestamp: "08:02:14", confidence: 92 },
  { agent: "Telemetry Agent", action: "Pulled system metrics", result: "Memory at 94%, CPU at 78%, disk I/O saturated", timestamp: "08:02:18", confidence: 88 },
  { agent: "Customer Context Agent", action: "Retrieved deployment config", result: "24 worker nodes, batch size 500K, no recent config changes", timestamp: "08:02:22", confidence: 95 },
  { agent: "Knowledge Agent", action: "Searched runbooks", result: "Matched: RB-042 'Batch Ingestion Memory Pressure'", timestamp: "08:02:25", confidence: 85 },
  { agent: "Resolution Agent", action: "Proposed: Scale workers to 32, reduce batch to 250K", result: "Awaiting approval — confidence below threshold", timestamp: "08:02:30", confidence: 67 },
];

export const caseThread = [
  { id: 1, type: "system" as const, sender: "Orchestrator Agent", content: "Alert received: Pipeline throughput dropped 80% on Meridian Financial's DataSync Pro deployment. Initiating diagnostic sequence.", timestamp: "08:02:14", },
  { id: 2, type: "agent" as const, sender: "Telemetry Agent", content: "System metrics collected:\n• Memory: 94% (critical)\n• CPU: 78% (elevated)\n• Disk I/O: Saturated on 3/24 worker nodes\n• Network: Normal\n\nPattern matches historical incident INC-847 from 2024-12.", timestamp: "08:02:18", },
  { id: 3, type: "agent" as const, sender: "Knowledge Agent", content: "Found matching runbook: **RB-042 — Batch Ingestion Memory Pressure**\n\nRecommended actions:\n1. Scale worker pool from 24 → 32 nodes\n2. Reduce batch size from 500K → 250K records\n3. Enable streaming mode for tables > 1M rows", timestamp: "08:02:25", },
  { id: 4, type: "agent" as const, sender: "Resolution Agent", content: "Proposed resolution ready for review:\n\n**Action Plan:**\n• Scale worker nodes: 24 → 32\n• Reduce batch size: 500K → 250K\n• Estimated recovery: ~15 minutes\n\n⚠️ Confidence: 67% — Below auto-approval threshold (80%)\nRequires human approval.", timestamp: "08:02:30", },
  { id: 5, type: "summary" as const, sender: "Support Studio", content: "**Case Summary for Human Review:**\n\nMeridian Financial is experiencing a pipeline stall during batch ingestion of 2.4M records. AI agents identified memory pressure as root cause and propose scaling workers + reducing batch size. This matches a known pattern from December 2024. Approval needed because confidence is below the 80% auto-threshold.", timestamp: "08:02:35", },
];

export const issueThemes = [
  { theme: "Memory pressure during batch operations", count: 18, trend: "up" as const },
  { theme: "Token refresh / auth cycle failures", count: 14, trend: "stable" as const },
  { theme: "Cross-region replication lag", count: 11, trend: "up" as const },
  { theme: "Plugin compatibility post-upgrade", count: 9, trend: "down" as const },
  { theme: "SLA window violations on scheduled jobs", count: 7, trend: "stable" as const },
];

export const kpis = {
  automationRate: 81,
  unresolvedExceptions: 8,
  atRiskCustomers: 2,
  avgResolutionTime: "2.4 hrs",
};

export const trendData = [
  { date: "Mar 24", automated: 42, manual: 8, total: 50 },
  { date: "Mar 25", automated: 38, manual: 12, total: 50 },
  { date: "Mar 26", automated: 45, manual: 6, total: 51 },
  { date: "Mar 27", automated: 41, manual: 9, total: 50 },
  { date: "Mar 28", automated: 48, manual: 5, total: 53 },
  { date: "Mar 29", automated: 44, manual: 10, total: 54 },
  { date: "Mar 30", automated: 39, manual: 13, total: 52 },
];
