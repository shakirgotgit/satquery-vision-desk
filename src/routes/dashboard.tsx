import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { HowItWorks } from "@/components/how-it-works";
import { mockHistory, mockModels, taskLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SatQuery AI" },
      {
        name: "description",
        content: "Overview of satellite analysis activity, model usage and recent query outcomes.",
      },
      { property: "og:title", content: "Dashboard — SatQuery AI" },
      { property: "og:description", content: "Analysis activity and model usage overview." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Activity across queries, scenes and models in the current workspace."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Queries run" value="128" hint="last 30 days" />
        <StatCard label="Scenes indexed" value="85" hint="optical + SAR" />
        <StatCard label="Mean confidence" value="0.82" hint="completed tasks" />
        <StatCard label="Avg. latency" value="7.4 s" hint="per analysis" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Panel
            title="Recent queries"
            subtitle="Latest analyses in this workspace"
            actions={
              <Link to="/queries" className="text-xs text-primary hover:underline">
                View all
              </Link>
            }
            bodyClassName="p-0"
          >
            <ul className="divide-y divide-border">
              {mockHistory.slice(0, 4).map((q) => (
                <li key={q.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">{q.query}</p>
                    <p className="label-mono mt-0.5">
                      {taskLabels[q.task]} · {q.scene}
                    </p>
                  </div>
                  <Tag tone={q.status === "completed" ? "success" : q.status === "failed" ? "danger" : "primary"}>
                    {q.status}
                  </Tag>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Model utilisation" subtitle="Mock distribution across available tools" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {mockModels.map((m, i) => (
                <li key={m.id} className="px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{m.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{[38, 22, 17, 15, 8][i]}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${[38, 22, 17, 15, 8][i]}%`, background: "var(--gradient-scan)" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
