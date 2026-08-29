import { createFileRoute } from "@tanstack/react-router";
import { CompareViewer, SceneViewer } from "@/components/scene-viewer";
import { ExecutionTrace, QueryComposer } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { ResultPanel } from "@/components/result-panel";
import { AnalyzeButton, ChangeMapPanel, SceneMetaCard, UploadSlot } from "@/components/gis";
import { PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { beforeSceneMeta, mockResult, opticalSceneMeta } from "@/lib/mock-data";
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

function ChangeDetection() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analysis"
        title="Change Detection"
        description="Compare two co-registered acquisitions and quantify what changed, where and by how much."
        actions={
          <div className="flex items-center gap-2">
            <Tag tone="primary">Bi-temporal</Tag>
            <AnalyzeButton label="Analyze" />
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Panel title="Bi-temporal pair" subtitle="Two co-registered scenes over the same AOI">
            <div className="grid gap-3 md:grid-cols-2">
              <UploadSlot label="Before (T1)" hint="Earlier acquisition · GeoTIFF, JPEG, PNG" date="2019-03-14" />
              <UploadSlot label="After (T2)" hint="Later acquisition · GeoTIFF, JPEG, PNG" date="2024-11-02" tone="ai" />
            </div>
          </Panel>

          <CompareViewer
            beforeSrc={sceneBefore}
            afterSrc={sceneAfter}
            detections={mockResult.detections}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <SceneViewer
              src={sceneAfter}
              alt="Change map with heatmap overlay"
              detections={mockResult.detections}
              defaultOverlays={{ heatmap: true }}
              aspect="aspect-[16/10]"
              caption="Change heatmap and evidence regions over T2"
            />
            <ChangeMapPanel />
          </div>

          <Panel title="Change statistics" subtitle="Mock output · ChangeFormer-B2">
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Changed area" value="6.21 km²" hint="all classes" />
              <StatCard label="Change ratio" value="12.7%" hint="of AOI" />
              <StatCard label="Time span" value="5 y 8 m" hint="T1 → T2" />
              <StatCard label="Tiles processed" value="36" hint="512 px · 64 px overlap" />
            </div>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <QueryComposer placeholder="Ask what changed between the two acquisitions…" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <SceneMetaCard meta={beforeSceneMeta} title="Before · metadata" />
              <SceneMetaCard meta={opticalSceneMeta} title="After · metadata" />
            </div>
          </div>

          <ResultPanel result={mockResult} />
          <ExecutionTrace steps={mockResult.trace} />
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
