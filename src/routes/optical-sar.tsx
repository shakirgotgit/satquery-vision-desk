import { createFileRoute } from "@tanstack/react-router";
import { ExecutionTrace, QueryComposer, UploadArea } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { SceneViewer } from "@/components/scene-viewer";
import { ConfidenceBar, PageHeader, Panel, StatCard, Tag } from "@/components/workspace";
import { mockTrace } from "@/lib/mock-data";
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
          <div className="flex gap-2">
            <Tag tone="primary">Optical</Tag>
            <Tag tone="ai">SAR</Tag>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SceneViewer
              src={sceneBefore}
              alt="Optical acquisition"
              caption="Optical · Sentinel-2 L2A · 10 m · 38% cloud"
            />
            <SceneViewer
              src={sceneAfter}
              alt="SAR acquisition"
              caption="SAR · Sentinel-1 GRD · VV/VH · same AOI"
              className="[&_img]:grayscale [&_img]:contrast-125"
            />
          </div>

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

          <div className="grid gap-6 lg:grid-cols-2">
            <QueryComposer placeholder="Ask across both modalities — e.g. “Where is flooding hidden by clouds?”" />
            <UploadArea title="Multimodal pair" hint="One optical scene and one SAR scene over the same AOI" />
          </div>

          <ExecutionTrace steps={mockTrace} />
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
