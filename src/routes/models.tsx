import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Gauge } from "lucide-react";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { mockModels, taskLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      { title: "Models — SatQuery AI" },
      {
        name: "description",
        content: "Vision-language and remote-sensing models the agent can route tasks to, with metrics and status.",
      },
      { property: "og:title", content: "Models — SatQuery AI" },
      { property: "og:description", content: "Model registry for agentic task routing." },
    ],
  }),
  component: Models,
});

function Models() {
  const ready = mockModels.filter((m) => m.status === "ready").length;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="Models"
        description="The agent selects one of these tools per query based on the identified task and available modalities."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Registered" value={String(mockModels.length)} />
        <StatCard label="Ready" value={String(ready)} hint="available to the router" />
        <StatCard label="Planned" value={String(mockModels.length - ready)} hint="integration pending" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockModels.map((m) => (
          <Panel
            key={m.id}
            title={m.name}
            subtitle={taskLabels[m.task]}
            actions={<Tag tone={m.status === "ready" ? "success" : "warning"}>{m.status}</Tag>}
          >
            <p className="text-sm leading-relaxed text-muted-foreground">{m.description}</p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 shrink-0 text-cyan" />
                <span className="text-muted-foreground">{m.backbone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-3.5 w-3.5 shrink-0 text-cyan" />
                <span className="font-mono text-cyan">{m.metric}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Tag tone={m.modality === "SAR" ? "ai" : m.modality === "Multimodal" ? "warning" : "primary"}>
                {m.modality}
              </Tag>
              <Tag tone="neutral">{taskLabels[m.task]}</Tag>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
