import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { mockHistory, taskLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/queries")({
  head: () => ({
    meta: [
      { title: "My Queries — SatQuery AI" },
      {
        name: "description",
        content: "History of natural-language satellite analysis queries with tasks, scenes and confidence.",
      },
      { property: "og:title", content: "My Queries — SatQuery AI" },
      { property: "og:description", content: "Browse past analyses and their outcomes." },
    ],
  }),
  component: Queries,
});

function Queries() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="My Queries"
        description="Every analysis is stored with its task, model, evidence and confidence for reproducibility."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total queries" value="128" />
        <StatCard label="Completed" value="119" hint="93% success" />
        <StatCard label="Failed" value="9" hint="mostly geo-registration" />
      </div>

      <Panel title="Query history" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {["ID", "Query", "Task", "Scene", "Confidence", "Status"].map((h) => (
                  <th key={h} className="label-mono px-4 py-2.5 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockHistory.map((q) => (
                <tr key={q.id} className="hover:bg-surface-raised">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{q.id}</td>
                  <td className="max-w-sm px-4 py-3 text-foreground">{q.query}</td>
                  <td className="px-4 py-3 text-muted-foreground">{taskLabels[q.task]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{q.scene}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cyan">
                    {(q.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3">
                    <Tag tone={q.status === "completed" ? "success" : q.status === "failed" ? "danger" : "primary"}>
                      {q.status}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
