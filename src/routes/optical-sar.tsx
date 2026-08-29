import { createFileRoute } from "@tanstack/react-router";
import { ExecutionTrace, QueryComposer } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { SceneViewer } from "@/components/scene-viewer";
import { AnalyzeButton, SceneMetaCard, UploadSlot } from "@/components/gis";
import { ConfidenceBar, PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { mockResult, mockTrace, opticalSceneMeta, sarSceneMeta } from "@/lib/mock-data";
import sceneBefore from "@/assets/scene-before.jpg";
import sceneAfter from "@/assets/scene-after.jpg";

export const Route = createFileRoute("/optical-sar")({
  head: () => ({
    meta: [
      { title: "Optical + SAR Analysis — SatQuery AI" },
      {
        name: "description",
        content: "Multimodal fusion of optical and SAR imagery for all-weather remote sensing analysis.",
      },
      { property: "og:title", content: "Optical + SAR Analysis — SatQuery AI" },
      { property: "og:description", content: "All-weather multimodal analysis combining optical and SAR." },
    ],
  }),
  component: OpticalSar,
});

function OpticalSar() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analysis"
        title="Optical + SAR Analysis"
        description="Fuse optical reflectance with SAR backscatter for cloud-independent, all-weather interpretation."
        actions={
          <div className="flex items-center gap-2">
            <Tag tone="primary">Optical</Tag>
            <Tag tone="ai">SAR</Tag>
            <AnalyzeButton label="Analyze" />
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Panel title="Multimodal pair" subtitle="One optical scene and one SAR scene over the same AOI">
            <div className="grid gap-3 md:grid-cols-2">
              <UploadSlot label="Optical scene" hint="Sentinel-2 / Landsat · GeoTIFF, JPEG, PNG" date="2024-11-02" />
              <UploadSlot label="SAR scene" hint="Sentinel-1 GRD · VV/VH · GeoTIFF" date="2024-11-03" tone="ai" />
            </div>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <SceneViewer
                src={sceneBefore}
                alt="Optical acquisition"
                coords="18.5204° N, 73.8567° E · optical"
                caption="Optical · Sentinel-2 L2A · 10 m · 38% cloud"
              />
              <SceneMetaCard meta={opticalSceneMeta} title="Optical · metadata" />
            </div>
            <div className="space-y-6">
              <SceneViewer
                src={sceneAfter}
                alt="SAR acquisition"
                coords="18.5204° N, 73.8567° E · SAR"
                caption="SAR · Sentinel-1 GRD · VV/VH · same AOI"
                imageClassName="grayscale contrast-125"
              />
              <SceneMetaCard meta={sarSceneMeta} title="SAR · metadata" />
            </div>
          </div>

          <SceneViewer
            src={sceneAfter}
            alt="Fused optical and SAR composite"
            detections={mockResult.detections}
            defaultOverlays={{ heatmap: true }}
            aspect="aspect-[16/9]"
            caption="Combined result · fused composite with evidence regions and backscatter heatmap"
          />

          <Panel title="Fusion summary" subtitle="SARFuse (planned) · mock output">
            <p className="text-sm leading-relaxed text-foreground">
              SAR backscatter resolves the cloud-obscured southern quadrant where optical data is unusable.
              Low VV returns indicate standing water across roughly 1.9 km² of agricultural land.
            </p>
            <div className="mt-4">
              <ConfidenceBar value={0.74} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Cloud cover" value="38%" hint="optical scene" />
              <StatCard label="SAR coverage" value="100%" hint="all-weather" />
              <StatCard label="Water extent" value="1.9 km²" hint="VV threshold" />
              <StatCard label="Fusion gain" value="+21%" hint="vs. optical only" />
            </div>
          </Panel>

          <QueryComposer placeholder="Ask across both modalities — e.g. “Where is flooding hidden by clouds?”" />

          <ExecutionTrace steps={mockTrace} />
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
