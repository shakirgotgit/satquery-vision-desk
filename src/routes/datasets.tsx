import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Database, Layers, MapPin } from "lucide-react";
import { UploadSlot } from "@/components/gis";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
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
      { property: "og:description", content: "Manage satellite scene collections, regions and modalities." },
    ],
  }),
  component: Datasets,
});

function Datasets() {
  const total = mockDatasets.reduce((n, d) => n + d.scenes, 0);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="Datasets"
        description="Scene collections available to the agent, grouped by sensor, region and modality."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Collections" value={String(mockDatasets.length)} />
        <StatCard label="Scenes indexed" value={String(total)} hint="optical + SAR" />
        <StatCard label="Modalities" value="3" hint="optical · SAR · multimodal" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockDatasets.map((d) => (
          <Panel
            key={d.id}
            title={d.name}
            subtitle={d.sensor}
            actions={<Tag tone={d.modality === "SAR" ? "ai" : d.modality === "Multimodal" ? "warning" : "primary"}>{d.modality}</Tag>}
          >
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
                <p className="label-mono">Acquired</p>
                <p className="font-mono text-foreground">{d.acquiredAt}</p>
              </div>
            </div>

            <dl className="mt-4 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
                <span className="text-muted-foreground">{d.region}</span>
              </div>
              <div className="flex items-start gap-2">
                <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
                <span className="text-muted-foreground">{d.dataType}</span>
              </div>
              <div className="flex items-start gap-2">
                <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
                <span className="text-muted-foreground">Last updated {d.updatedAt}</span>
              </div>
              <div className="flex items-start gap-2">
                <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
                <span className="text-muted-foreground">Indexed locally · not yet synced to backend</span>
              </div>
            </dl>
          </Panel>
        ))}
      </div>

      <Panel title="Add dataset" subtitle="Upload a scene collection or connect a catalog endpoint later">
        <div className="grid gap-3 md:grid-cols-2">
          <UploadSlot label="New collection" hint="Drop GeoTIFF scenes or a zipped collection" />
          <UploadSlot label="Reference / label layer" hint="Optional masks or annotations" tone="neutral" />
        </div>
      </Panel>
    </div>
  );
}
