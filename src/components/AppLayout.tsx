import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Map, TrendingUp, Settings,
  MessageSquare, CheckSquare, ArrowUpRight,
  ExternalLink, Zap, FileText, Users, Database,
} from "lucide-react";

const primaryNav = [
  { to: "/", icon: LayoutDashboard, label: "Overview" },
  { to: "/intelligence", icon: Database, label: "Account Intelligence" },
  { to: "/studio", icon: Zap, label: "Blueprint Studio" },
  { to: "/blueprints", icon: Map, label: "Active Blueprint" },
  { to: "/insights", icon: TrendingUp, label: "Insights" },
];

const teamsNav = [
  { to: "/teams/customers", icon: Users, label: "Customer Spaces" },
  { to: "/teams/cases", icon: MessageSquare, label: "Live Cases" },
  { to: "/teams/approvals", icon: CheckSquare, label: "Approvals", highlight: true },
  { to: "/teams/escalations", icon: ArrowUpRight, label: "Escalations" },
];

const secondaryNav = [
  { to: "/templates", icon: FileText, label: "Templates" },
  { to: "/admin", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isActive = (to: string) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const renderNavItem = (item: { to: string; icon: React.ElementType; label: string; highlight?: boolean }, showExternal = false) => {
    const active = isActive(item.to);
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={cn(
          "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] font-medium transition-all duration-150 group",
          active
            ? "bg-sidebar-active text-sidebar-active-foreground shadow-sm"
            : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-foreground"
        )}
      >
        <item.icon className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
        {showExternal && !active && (
          <ExternalLink className="h-2.5 w-2.5 text-sidebar-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-[210px] shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-semibold text-[13px] tracking-tight text-sidebar-active-foreground block leading-tight">Support Studio</span>
            <span className="text-[10px] text-sidebar-muted leading-none">Control Plane</span>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-5">
          {/* Control Plane */}
          <div>
            <p className="px-2.5 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest">Control Plane</p>
            <div className="space-y-0.5">
              {primaryNav.map(item => renderNavItem(item))}
            </div>
          </div>

          <div className="border-t border-sidebar-border" />

          {/* Teams Execution */}
          <div>
            <p className="px-2.5 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest flex items-center gap-1.5">
              Teams Execution
              <ExternalLink className="h-2.5 w-2.5" />
            </p>
            <div className="space-y-0.5">
              {teamsNav.map(item => renderNavItem(item, true))}
            </div>
          </div>

          <div className="border-t border-sidebar-border" />

          {/* Secondary */}
          <div>
            <div className="space-y-0.5">
              {secondaryNav.map(item => renderNavItem(item))}
            </div>
          </div>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2.5 px-2.5 py-2">
            <div className="h-7 w-7 rounded-full bg-sidebar-hover flex items-center justify-center text-[10px] font-semibold text-sidebar-active-foreground">SC</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-sidebar-active-foreground truncate">Sarah Chen</p>
              <p className="text-[10px] text-sidebar-muted truncate">Support Ops Lead</p>
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
