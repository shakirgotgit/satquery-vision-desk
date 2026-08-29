import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { mockHistory, taskLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/queries")({
  head: () => ({
    meta: [
      { title: "My Queries — SatQuery AI" },
      {
        name: "description",
        content: "History of natural-language satellite analysis queries with tasks, dates, status and confidence.",
      },
      { property: "og:title", content: "My Queries — SatQuery AI" },
      { property: "og:description", content: "Browse past analyses and their outcomes." },
    ],
  }),
  component: Queries,
});

const routeForTask: Record<string, string> = {
  vqa: "/single-image",
  captioning: "/single-image",
  grounding: "/single-image",
  "change-detection": "/change-detection",
  "sar-fusion": "/optical-sar",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
                {["ID", "Query", "Analysis type", "Date / time", "Confidence", "Status", ""].map((h) => (
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
                  <td className="max-w-sm px-4 py-3">
                    <p className="text-foreground">{q.query}</p>
                    <p className="label-mono mt-0.5">{q.scene}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{taskLabels[q.task]}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {formatDate(q.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-cyan">
                    {(q.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3">
                    <Tag tone={q.status === "completed" ? "success" : q.status === "failed" ? "danger" : "primary"}>
                      {q.status}
                    </Tag>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={routeForTask[q.task] ?? "/"}
                      className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-primary hover:underline"
                    >
                      View result
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
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
