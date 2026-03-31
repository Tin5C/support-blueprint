export interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "md" | "docx" | "yaml" | "json";
  status: "uploaded" | "processing" | "ready";
  sizeLabel: string;
}

export interface ProductKnowledgeSource {
  id: string;
  accountId: string;
  workspaceType: "isv" | "si";
  files: UploadedFile[];
  githubRepo?: string;
  docsUrl?: string;
  apiDocsUrl?: string;
  additionalUrls?: string[];
  runbooks: UploadedFile[];
  status: "empty" | "partial" | "complete";
  lastUpdated?: string;
}

export const productKnowledgeSources: ProductKnowledgeSource[] = [
  {
    id: "pk-1",
    accountId: "cust-1",
    workspaceType: "isv",
    files: [
      { id: "f-1", name: "helio-crm-agent-v3.4.2-guide.pdf", type: "pdf", status: "ready", sizeLabel: "4.2 MB" },
      { id: "f-2", name: "architecture-overview.md", type: "md", status: "ready", sizeLabel: "128 KB" },
    ],
    githubRepo: "https://github.com/acme/helio-crm-agent",
    docsUrl: "https://docs.helio-crm.io/v3.4.2",
    apiDocsUrl: "https://api.helio-crm.io/v3/openapi.json",
    runbooks: [
      { id: "rb-1", name: "incident-response-playbook.yaml", type: "yaml", status: "ready", sizeLabel: "24 KB" },
    ],
    status: "complete",
    lastUpdated: "2 hours ago",
  },
];
