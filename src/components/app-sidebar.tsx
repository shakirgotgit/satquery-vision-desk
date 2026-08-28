import { Link, useRouterState } from "@tanstack/react-router";
import {
  Boxes,
  Database,
  Info,
  LayoutDashboard,
  Layers,
  History,
  Radar,
  Satellite,
  Settings,
  Sparkles,
  SplitSquareHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Workspace",
    items: [
      { title: "New Query", url: "/", icon: Sparkles },
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Analysis",
    items: [
      { title: "Single Image Analysis", url: "/single-image", icon: Layers },
      { title: "Change Detection", url: "/change-detection", icon: SplitSquareHorizontal },
      { title: "Optical + SAR", url: "/optical-sar", icon: Radar },
    ],
  },
  {
    label: "Library",
    items: [
      { title: "My Queries", url: "/queries", icon: History },
      { title: "Datasets", url: "/datasets", icon: Database },
      { title: "Models", url: "/models", icon: Boxes },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "About", url: "/about", icon: Info },
    ],
  },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-md"
          style={{ background: "var(--gradient-scan)" }}
        >
          <Satellite className="h-5 w-5 text-primary-foreground" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-sidebar-foreground">SatQuery AI</p>
          <p className="label-mono">Remote sensing copilot</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="label-mono px-2 pb-2">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.url;
                return (
                  <li key={item.url}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_var(--sidebar-primary)]"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon
                        className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success" />
          Backend: mock mode
        </div>
      </div>
    </aside>
  );
}
