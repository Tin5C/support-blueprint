import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Hash, ChevronRight } from "lucide-react";
import TeamsShell from "@/components/TeamsShell";
import AccountIntelligence from "@/components/AccountIntelligence";
import { aiCustomers, getAccountIntelligence } from "@/data/accountIntelligence";
import { cases } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";

const healthColor: Record<string, string> = {
  healthy: "status-success",
  medium: "status-warning",
  low: "status-danger",
  critical: "status-critical",
};

const tierLabel: Record<string, string> = {
  standard: "STD",
  premium: "PRM",
  critical: "CRT",
};

export default function TeamsCustomerSpaces() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(params.get("id") || "cust-1");
  const [activeTab, setActiveTab] = useState("Intelligence");
  const selectedData = getAccountIntelligence(selectedId);

  return (
    <TeamsShell
      section="Account Intelligence"
      tabs={[
        { label: "Intelligence", active: activeTab === "Intelligence", onClick: () => setActiveTab("Intelligence") },
        { label: "Cases", active: activeTab === "Cases", onClick: () => setActiveTab("Cases") },
        { label: "Deployments", active: activeTab === "Deployments", onClick: () => setActiveTab("Deployments") },
        { label: "History", active: activeTab === "History", onClick: () => setActiveTab("History") },
      ]}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Channel list */}
        <div className="w-56 shrink-0 border-r bg-card overflow-y-auto">
          <div className="p-3 border-b">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Customer Channels</p>
          </div>
          <div className="p-1.5 space-y-0.5">
            {aiCustomers.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-xs transition-all duration-150 ${selectedId === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    <span className="font-semibold text-foreground text-[11px]">{c.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pl-[18px]">
                  <Badge variant="outline" className={`text-[8px] px-1 py-0 ${healthColor[c.healthStatus]}`}>{c.healthStatus}</Badge>
                  <span className="text-[9px] text-muted-foreground">{tierLabel[c.supportTier]} · {c.region}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        {activeTab === "Intelligence" && selectedData ? (
          <AccountIntelligence data={selectedData} />
        ) : activeTab === "Cases" ? (
          <div className="flex-1 p-6 overflow-y-auto animate-fade-in">
            <h2 className="text-[13px] font-semibold text-foreground mb-3">Support Cases</h2>
            <p className="text-[11px] text-muted-foreground">Cases view — navigate to Live Cases for full experience.</p>
          </div>
        ) : (
          <div className="flex-1 p-6 overflow-y-auto animate-fade-in">
            <Card className="border">
              <CardContent className="py-10 text-center">
                <p className="text-sm text-muted-foreground">{activeTab} view coming soon</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </TeamsShell>
  );
}
