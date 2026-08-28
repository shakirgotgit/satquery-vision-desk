import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, Layers, Radar, SplitSquareHorizontal } from "lucide-react";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { QuickAccessCard } from "@/components/gis";
import { analysisTypeStats, mockDatasets, mockHistory, taskLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SatQuery AI" },
      {
        name: "description",
        content: "Overview of satellite analysis activity, analysis types, datasets and recent query outcomes.",
      },
      { property: "og:title", content: "Dashboard — SatQuery AI" },
      { property: "og:description", content: "Analysis activity, datasets and quick access to workflows." },
    ],
  }),
  component: Dashboard,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Welcome back, analyst"
        description="Activity across queries, scenes and models in the SatQuery AI workspace. All figures are mock data."
        actions={
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-primary-foreground"
            style={{ background: "var(--gradient-scan)" }}
          >
            New Analysis
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Queries run" value="128" hint="last 30 days" />
        <StatCard label="Scenes indexed" value="127" hint="optical + SAR" />
        <StatCard label="Mean confidence" value="0.82" hint="completed tasks" />
        <StatCard label="Avg. latency" value="7.4 s" hint="per analysis" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <QuickAccessCard
          to="/single-image"
          title="Single Image Analysis"
          description="VQA, captioning and visual grounding on one scene."
          icon={Layers}
        />
        <QuickAccessCard
          to="/change-detection"
          title="Change Detection"
          description="Bi-temporal comparison with change maps and statistics."
          icon={SplitSquareHorizontal}
        />
        <QuickAccessCard
          to="/optical-sar"
          title="Optical + SAR"
          description="All-weather multimodal fusion analysis."
          icon={Radar}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Panel
          title="Recent analyses"
          subtitle="Latest queries in this workspace"
          actions={
            <Link to="/queries" className="text-xs text-primary hover:underline">
              View all
            </Link>
          }
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-border">
            {mockHistory.slice(0, 5).map((q) => (
              <li key={q.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">{q.query}</p>
                  <p className="label-mono mt-0.5">
                    {taskLabels[q.task]} · {q.scene} · {formatDate(q.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan">{(q.confidence * 100).toFixed(0)}%</span>
                  <Tag tone={q.status === "completed" ? "success" : q.status === "failed" ? "danger" : "primary"}>
                    {q.status}
                  </Tag>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-6">
          <Panel title="Analysis types" subtitle="Distribution of the last 128 queries" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {analysisTypeStats.map((s) => (
                <li key={s.task} className="px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{taskLabels[s.task]}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.count}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.share}%`, background: "var(--gradient-scan)" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            title="Recent datasets"
            actions={
              <Link to="/datasets" className="text-xs text-primary hover:underline">
                Browse
              </Link>
            }
            bodyClassName="p-0"
          >
            <ul className="divide-y divide-border">
              {mockDatasets.slice(0, 4).map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 truncate text-sm text-foreground">
                      <Database className="h-3.5 w-3.5 shrink-0 text-cyan" />
                      {d.name}
                    </p>
                    <p className="label-mono mt-0.5">
                      {d.sensor} · {d.scenes} scenes
                    </p>
                  </div>
                  <Tag tone="primary">{d.modality}</Tag>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
