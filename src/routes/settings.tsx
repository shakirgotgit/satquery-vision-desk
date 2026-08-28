import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/workspace";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SatQuery AI" },
      {
        name: "description",
        content: "Configure backend endpoint, inference defaults and evidence rendering preferences.",
      },
      { property: "og:title", content: "Settings — SatQuery AI" },
      { property: "og:description", content: "Workspace and inference configuration." },
    ],
  }),
  component: Settings,
});

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <label className="label-mono">{label}</label>
      <input
        readOnly
        value={value}
        className="mt-1.5 w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none"
      />
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="System"
        title="Settings"
        description="Placeholders for the configuration this workspace will expose once the FastAPI backend is connected."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Backend" subtitle="Not connected yet" actions={<Tag tone="warning">mock</Tag>}>
          <div className="space-y-4">
            <Field label="API base URL" value="http://localhost:8000" hint="FastAPI service (planned)" />
            <Field label="Request timeout" value="120 s" />
          </div>
        </Panel>

        <Panel title="Inference defaults">
          <div className="space-y-4">
            <Field label="Tile size" value="512 px" />
            <Field label="Tile overlap" value="64 px" />
            <Field label="Confidence threshold" value="0.50" />
          </div>
        </Panel>

        <Panel title="Evidence rendering">
          <div className="space-y-4">
            <Field label="Default overlays" value="regions, heatmap" />
            <Field label="Coordinate system" value="EPSG:4326" />
          </div>
        </Panel>

        <Panel title="Workspace">
          <div className="space-y-4">
            <Field label="Project" value="SIH26167 — SatQuery AI" />
            <Field label="Theme" value="Deep space (dark)" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
