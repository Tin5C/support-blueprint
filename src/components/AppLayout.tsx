import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Wrench, Map, FileText, TrendingUp, Settings,
  Users, MessageSquare, CheckSquare, Bot, ArrowUpRight,
  ExternalLink, Zap,
} from "lucide-react";

const storySteps = [
  { step: 1, to: "/studio", icon: Wrench, label: "Support Studio", sub: "Define" },
  { step: 2, to: "/blueprints", icon: Map, label: "Blueprint", sub: "Generate" },
  { step: 3, to: "/teams/customers", icon: Users, label: "Deploy to Teams", sub: "Deploy" },
  { step: 4, to: "/teams/cases", icon: MessageSquare, label: "Execute Support", sub: "Execute" },
  { step: 5, to: "/teams/escalations", icon: ArrowUpRight, label: "Escalations", sub: "Exceptions" },
  { step: 6, to: "/insights", icon: TrendingUp, label: "Insights", sub: "Learn" },
];

const controlPlaneNav = [
  { to: "/", icon: LayoutDashboard, label: "Command Center" },
  { to: "/templates", icon: FileText, label: "Templates" },
  { to: "/admin", icon: Settings, label: "Admin" },
];

const teamsNav = [
  { to: "/teams/approvals", icon: CheckSquare, label: "Approvals" },
  { to: "/teams/agents", icon: Bot, label: "Agent Activity" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isActive = (to: string) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-[220px] shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
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

        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
          {/* Product story flow */}
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest">Product Flow</p>
            <div className="space-y-0.5">
              {storySteps.map((item) => {
                const active = isActive(item.to);
                const isTeams = item.to.startsWith("/teams");
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
                    <span className={cn("story-step", active ? "story-step-active" : "story-step-default")}>
                      {item.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{item.label}</span>
                    </div>
                    {isTeams && !active && (
                      <ExternalLink className="h-2.5 w-2.5 text-sidebar-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-sidebar-border" />

          {/* Additional nav */}
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest">More</p>
            <div className="space-y-0.5">
              {controlPlaneNav.map((item) => {
                const active = isActive(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] font-medium transition-all duration-150",
                      active
                        ? "bg-sidebar-active text-sidebar-active-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-foreground"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Teams extras */}
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest flex items-center gap-1.5">
              Teams
              <ExternalLink className="h-2.5 w-2.5" />
            </p>
            <div className="space-y-0.5">
              {teamsNav.map((item) => {
                const active = isActive(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] font-medium transition-all duration-150",
                      active
                        ? "bg-sidebar-active text-sidebar-active-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-foreground"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0" />
                    {item.label}
                  </NavLink>
                );
              })}
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
