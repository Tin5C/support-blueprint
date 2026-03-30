import React from "react";
import { Zap, Video, Phone, Search, MoreHorizontal } from "lucide-react";

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
    <div className="flex flex-col h-full animate-fade-in">
      {/* Teams title bar */}
      <div className="h-10 shrink-0 flex items-center justify-between px-4 teams-chrome">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded flex items-center justify-center bg-teams-accent">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-white/90">Support Studio</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-[12px] text-white/50 font-medium">{section}</span>
        </div>
        <div className="flex items-center gap-0.5">
          {[Video, Phone, Search, MoreHorizontal].map((Icon, i) => (
            <button key={i} className="h-7 w-7 rounded flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors">
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Teams tab bar */}
      {tabs && tabs.length > 0 && (
        <div className="h-9 shrink-0 flex items-end gap-0 px-4 border-b teams-tab-bar">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={tab.onClick}
              className={`px-4 py-1.5 text-[11px] font-medium transition-all duration-150 rounded-t-md relative ${
                tab.active
                  ? "text-white bg-background"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}
