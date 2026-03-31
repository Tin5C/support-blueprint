import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { Hash, ChevronRight, Database } from "lucide-react";
import AccountIntelligence from "@/components/AccountIntelligence";
import { aiCustomers, getAccountIntelligence } from "@/data/accountIntelligence";

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
  const [selectedId, setSelectedId] = useState(params.get("id") || "cust-1");
  const selectedData = getAccountIntelligence(selectedId);

  return (
    <div className="flex h-full">
      {/* Account sidebar — styled like Blueprint's right panel */}
      <div className="w-56 shrink-0 border-r bg-card overflow-y-auto">
        <div className="px-4 pt-5 pb-3 border-b">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center">
              <Database className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-[13px] font-semibold text-foreground">Accounts</p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{aiCustomers.length} accounts connected</p>
        </div>
        <div className="p-1.5 space-y-0.5">
          {aiCustomers.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-xs transition-all duration-150 ${selectedId === c.id ? "bg-primary/10 border border-primary/20" : "hover:bg-accent border border-transparent"}`}
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

      {/* Main content — same pattern as Blueprint */}
      <div className="flex-1 overflow-y-auto">
        {selectedData ? (
          <AccountIntelligence data={selectedData} />
        ) : (
          <div className="p-6">
            <p className="text-sm text-muted-foreground">Select an account to view intelligence.</p>
          </div>
        )}
      </div>
    </div>
  );
}
