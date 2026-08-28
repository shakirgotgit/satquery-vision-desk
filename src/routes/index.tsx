import { createFileRoute } from "@tanstack/react-router";
import { ExecutionTrace, QueryComposer } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { ResultPanel } from "@/components/result-panel";
import { SceneViewer } from "@/components/scene-viewer";
import { AnalyzeButton, SceneMetaCard, UploadSlot } from "@/components/gis";
import { PageHeader, Panel, Tag } from "@/components/workspace";
import { mockResult, opticalSceneMeta } from "@/lib/mock-data";
import sceneAfter from "@/assets/scene-after.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "New Query — SatQuery AI" },
      {
        name: "description",
        content:
          "Ask natural-language questions about satellite imagery and get grounded answers with visual evidence.",
      },
      { property: "og:title", content: "New Query — SatQuery AI" },
      {
        property: "og:description",
        content: "Natural-language satellite image analysis with agentic model routing.",
      },
    ],
  }),
  component: NewQuery,
});

function NewQuery() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="New Query"
        description="Upload imagery, ask in plain language, and let the agent route your question to the right remote-sensing model."
        actions={
          <div className="flex items-center gap-2">
            <Tag tone="ai">agent ready</Tag>
            <AnalyzeButton label="Analyze" />
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <QueryComposer />

          <Panel
            title="Scene upload"
            subtitle="Attach one scene, or two for bi-temporal and multimodal tasks"
            actions={<Tag tone="neutral">GeoTIFF · JPEG · PNG</Tag>}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <UploadSlot label="Scene A (required)" hint="Optical or SAR · GeoTIFF, JPEG, PNG" date="2019-03-14" />
              <UploadSlot
                label="Scene B (optional)"
                hint="Second acquisition for change or fusion"
                date="2024-11-02"
                tone="ai"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Geo metadata (CRS, bounds, acquisition date) is read automatically when present in the file.
            </p>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <SceneViewer
              src={sceneAfter}
              alt="Satellite scene with detected regions"
              detections={mockResult.detections}
              caption="GIS visualization · Sentinel-2 L2A · 10 m · acquired 2024-11-02"
            />
            <div className="space-y-6">
              <ExecutionTrace steps={mockResult.trace} />
              <SceneMetaCard meta={opticalSceneMeta} />
            </div>
          </div>

          <ResultPanel result={mockResult} />
        </div>
        <div className="space-y-6">
          <HowItWorks />
        </div>
      </div>
    </div>
  );
}
