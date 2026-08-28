import { createFileRoute } from "@tanstack/react-router";
import { CompareViewer } from "@/components/scene-viewer";
import { ExecutionTrace, QueryComposer, UploadArea } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { ResultPanel } from "@/components/result-panel";
import { PageHeader, Panel, Tag } from "@/components/workspace";
import { mockResult } from "@/lib/mock-data";
import sceneBefore from "@/assets/scene-before.jpg";
import sceneAfter from "@/assets/scene-after.jpg";

export const Route = createFileRoute("/change-detection")({
  head: () => ({
    meta: [
      { title: "Change Detection — SatQuery AI" },
      {
        name: "description",
        content: "Bi-temporal change detection between two satellite acquisitions with change maps and statistics.",
      },
      { property: "og:title", content: "Change Detection — SatQuery AI" },
      { property: "og:description", content: "Compare two acquisitions and quantify what changed." },
    ],
  }),
  component: ChangeDetection,
});

const classes = [
  { label: "Built-up gain", area: "3.42 km²", tone: "danger" as const },
  { label: "Vegetation loss", area: "2.18 km²", tone: "warning" as const },
  { label: "Water extension", area: "0.61 km²", tone: "primary" as const },
  { label: "Unchanged", area: "42.9 km²", tone: "success" as const },
];

function ChangeDetection() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analysis"
        title="Change Detection"
        description="Compare two co-registered acquisitions and quantify what changed, where and by how much."
        actions={<Tag tone="primary">Bi-temporal</Tag>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <CompareViewer beforeSrc={sceneBefore} afterSrc={sceneAfter} />
          <div className="grid gap-6 lg:grid-cols-2">
            <QueryComposer placeholder="Ask what changed between the two acquisitions…" />
            <UploadArea title="Bi-temporal pair" hint="Two co-registered scenes (T1 and T2)" />
          </div>
          <Panel title="Change classes" subtitle="Per-class area breakdown" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {classes.map((c) => (
                <li key={c.label} className="flex items-center justify-between px-4 py-3">
                  <Tag tone={c.tone}>{c.label}</Tag>
                  <span className="font-mono text-sm text-foreground">{c.area}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <ResultPanel result={mockResult} />
          <ExecutionTrace steps={mockResult.trace} />
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
