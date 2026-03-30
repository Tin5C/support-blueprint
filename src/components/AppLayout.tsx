import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wrench,
  Map,
  Users,
  MessageSquare,
  TrendingUp,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Overview" },
  { to: "/studio", icon: Wrench, label: "Support Studio" },
  { to: "/blueprint", icon: Map, label: "Blueprint" },
  { to: "/customers", icon: Users, label: "Customer Spaces" },
  { to: "/cases", icon: MessageSquare, label: "Case Workspace" },
  { to: "/insights", icon: TrendingUp, label: "Insights" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Dark sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-sidebar-active-foreground">Support Studio</span>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
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

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
