import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Wrench, Map, FileText, TrendingUp, Settings,
  Zap, Users, MessageSquare, CheckSquare, Bot, ArrowUpRight,
  ExternalLink,
} from "lucide-react";

const controlPlaneNav = [
  { to: "/", icon: LayoutDashboard, label: "Command Center" },
  { to: "/studio", icon: Wrench, label: "Support Studio" },
  { to: "/blueprints", icon: Map, label: "Blueprints" },
  { to: "/templates", icon: FileText, label: "Templates" },
  { to: "/insights", icon: TrendingUp, label: "Insights" },
  { to: "/admin", icon: Settings, label: "Admin" },
];

const teamsNav = [
  { to: "/teams/customers", icon: Users, label: "Customer Spaces" },
  { to: "/teams/cases", icon: MessageSquare, label: "Live Cases" },
  { to: "/teams/approvals", icon: CheckSquare, label: "Approvals" },
  { to: "/teams/agents", icon: Bot, label: "Agent Activity" },
  { to: "/teams/escalations", icon: ArrowUpRight, label: "Escalations" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-60 shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-sidebar-active-foreground">Support Studio</span>
        </div>

        <nav className="flex-1 py-3 px-3 overflow-y-auto">
          {/* Control Plane */}
          <p className="px-3 pt-1 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest">Control Plane</p>
          <div className="space-y-0.5 mb-5">
            {controlPlaneNav.map((item) => {
              const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors",
                    active
                      ? "bg-sidebar-active text-sidebar-active-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          {/* Teams Execution */}
          <p className="px-3 pt-1 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest flex items-center gap-1.5">
            <span>Teams Execution</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </p>
          <div className="space-y-0.5">
            {teamsNav.map((item) => {
              const active = location.pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors",
                    active
                      ? "bg-sidebar-active text-sidebar-active-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-7 w-7 rounded-full bg-sidebar-hover flex items-center justify-center text-xs font-medium text-sidebar-active-foreground">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-active-foreground truncate">Jane Doe</p>
              <p className="text-[11px] text-sidebar-muted truncate">Support Ops Lead</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
