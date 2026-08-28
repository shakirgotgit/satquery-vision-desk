import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { UploadArea } from "@/components/query-console";
import { PageHeader, Panel, Tag } from "@/components/workspace";
import { mockDatasets } from "@/lib/mock-data";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title: "Datasets — SatQuery AI" },
      {
        name: "description",
        content: "Optical, SAR and multimodal satellite scene collections available for analysis.",
      },
      { property: "og:title", content: "Datasets — SatQuery AI" },
      { property: "og:description", content: "Manage satellite scene collections and modalities." },
    ],
  }),
  component: Datasets;
});

function Datasets() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="Datasets"
        description="Scene collections available to the agent, grouped by sensor and modality."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {mockDatasets.map((d) => (
          <Panel key={d.id} title={d.name} subtitle={d.sensor} actions={<Tag tone="primary">{d.modality}</Tag>}>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="label-mono">Scenes</p>
                <p className="font-mono text-foreground">{d.scenes}</p>
              </div>
              <div>
                <p className="label-mono">Resolution</p>
                <p className="font-mono text-foreground">{d.resolution}</p>
              </div>
              <div>
                <p className="label-mono">Updated</p>
                <p className="font-mono text-foreground">{d.updatedAt}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Database className="h-3.5 w-3.5 text-cyan" />
              Indexed locally · not yet synced to backend
            </div>
          </Panel>
        ))}
      </div>

      <UploadArea title="Add dataset" hint="Upload a scene collection or connect a catalog endpoint later" />
    </div>
  );
}
