import React from "react";
import { Zap, Video, Phone, Search, MoreHorizontal, MessageSquare } from "lucide-react";

const teamsBg = "hsl(264 60% 22%)";
const teamsAccent = "hsl(264 60% 50%)";

interface TeamsTab {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface TeamsShellProps {
  section: string;
  tabs?: TeamsTab[];
  children: React.ReactNode;
}

export default function TeamsShell({ section, tabs, children }: TeamsShellProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Teams title bar */}
      <div className="h-10 shrink-0 flex items-center justify-between px-4" style={{ background: teamsBg }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded flex items-center justify-center" style={{ background: teamsAccent }}>
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-white/90">Support Studio</span>
          </div>
          <span className="text-white/30">|</span>
          <span className="text-[12px] text-white/60">{section}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Video className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Phone className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><Search className="h-3.5 w-3.5" /></button>
          <button className="h-7 w-7 rounded flex items-center justify-center text-white/50 hover:bg-white/10"><MoreHorizontal className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      {/* Teams tab bar */}
      {tabs && tabs.length > 0 && (
        <div className="h-9 shrink-0 flex items-end gap-0 px-4 border-b" style={{ background: "hsl(264 40% 16%)" }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={tab.onClick}
              className={`px-4 py-1.5 text-[12px] font-medium transition-colors rounded-t-md relative ${
                tab.active
                  ? "text-white bg-background"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label}
              {tab.active && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" style={{ display: "none" }} />}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}
