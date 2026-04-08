import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, TrendingUp, Settings,
  MessageSquare, CheckSquare, ArrowUpRight,
  ExternalLink, Zap, FileText, Database, Plus,
  Shield, Lock, Eye, FileSearch, ShieldCheck,
} from "lucide-react";
import logo from "@/assets/logo.svg";

const lsAssess = [
  { to: "/context", icon: FileSearch, label: "Enterprise Context" },
  { to: "/intelligence", icon: Database, label: "Solution Intelligence" },
];

const lsValidate = [
  { to: "/readiness", icon: Shield, label: "Readiness Report" },
  { to: "/review", icon: Lock, label: "Expert Review", badge: "Premium" },
];

const lsDeliver = [
  { to: "/preview", icon: Eye, label: "Support Preview" },
];

const ssOverview = [
  { to: "/", icon: LayoutDashboard, label: "Overview" },
];

const ssSetUp = [
  { to: "/studio", icon: Zap, label: "Blueprint" },
];

const ssOperate = [
  { to: "/teams/cases", icon: MessageSquare, label: "Live Cases" },
  { to: "/teams/approvals", icon: CheckSquare, label: "Approvals" },
  { to: "/teams/escalations", icon: ArrowUpRight, label: "Escalations" },
];

const ssGovern = [
  { to: "/insights", icon: TrendingUp, label: "Insights" },
  { to: "/audit", icon: ShieldCheck, label: "Audit" },
  { to: "/compliance", icon: FileText, label: "Compliance" },
];

const secondaryNav = [
  { to: "/admin", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isActive = (to: string) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const renderNavItem = (item: { to: string; icon: React.ElementType; label: string; badge?: string }) => {
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
        {item.badge && (
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-semibold uppercase">{item.badge}</span>
        )}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="w-[210px] shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center px-5 py-3 border-b border-sidebar-border">
          <img src={logo} alt="SavanoAI" className="h-6 w-auto" />
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-5">
          {/* Launch Studio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2.5 pb-1">
              <p className="text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest">Launch Studio</p>
              <NavLink to="/context" title="Start new evaluation" className="h-4 w-4 rounded flex items-center justify-center text-primary hover:bg-sidebar-hover transition-colors">
                <Plus className="h-3 w-3" />
              </NavLink>
            </div>

            <div>
              <p className="px-2.5 pb-1 text-[9px] font-semibold text-sidebar-muted uppercase tracking-widest">Assess</p>
              <div className="space-y-0.5">
                {lsAssess.map(item => renderNavItem(item))}
              </div>
            </div>

            <div>
              <p className="px-2.5 pb-1 text-[9px] font-semibold text-sidebar-muted uppercase tracking-widest">Validate</p>
              <div className="space-y-0.5">
                {lsValidate.map(item => renderNavItem(item))}
              </div>
            </div>

            <div>
              <p className="px-2.5 pb-1 text-[9px] font-semibold text-sidebar-muted uppercase tracking-widest">Deliver</p>
              <div className="space-y-0.5">
                {lsDeliver.map(item => renderNavItem(item))}
              </div>
            </div>
          </div>

          <div className="border-t border-sidebar-border" />

          {/* Support Studio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2.5 pb-1">
              <p className="text-[10px] font-semibold text-sidebar-muted uppercase tracking-widest">Support Studio</p>
              <NavLink to="/studio" title="Set up new support blueprint" className="h-4 w-4 rounded flex items-center justify-center text-primary hover:bg-sidebar-hover transition-colors">
                <Plus className="h-3 w-3" />
              </NavLink>
            </div>

            <div className="space-y-0.5">
              {ssOverview.map(item => renderNavItem(item))}
            </div>

            <div>
              <p className="px-2.5 pb-1 text-[9px] font-semibold text-sidebar-muted uppercase tracking-widest">Set up</p>
              <div className="space-y-0.5">
                {ssSetUp.map(item => renderNavItem(item))}
              </div>
            </div>

            <div>
              <p className="px-2.5 pb-1 text-[9px] font-semibold text-sidebar-muted uppercase tracking-widest">Operate</p>
              <div className="space-y-0.5">
                {ssOperate.map(item => renderNavItem(item))}
              </div>
            </div>

            <div>
              <p className="px-2.5 pb-1 text-[9px] font-semibold text-sidebar-muted uppercase tracking-widest">Govern</p>
              <div className="space-y-0.5">
                {ssGovern.map(item => renderNavItem(item))}
              </div>
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
