import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/workspace";
import { mockModels, taskLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      { title: "Models — SatQuery AI" },
      {
        name: "description",
        content: "Vision-language and remote-sensing models the agent can route tasks to.",
      },
      { property: "og:title", content: "Models — SatQuery AI" },
      { property: "og:description", content: "Model registry for agentic task routing." },
    ],
  }),
  component: Models,
});

function Models() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="Models"
        description="The agent selects one of these tools per query based on the identified task."
      />

      <Panel title="Model registry" bodyClassName="p-0">
        <ul className="divide-y divide-border">
          {mockModels.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold text-foreground">{m.name}</p>
                  <Tag tone={m.status === "ready" ? "success" : "warning"}>{m.status}</Tag>
                </div>
                <p className="label-mono mt-1">{taskLabels[m.task]}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.backbone}</p>
              </div>
              <span className="font-mono text-xs text-cyan">{m.metric}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
