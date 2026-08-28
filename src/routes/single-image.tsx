import { createFileRoute } from "@tanstack/react-router";
import { ExecutionTrace, QueryComposer, UploadArea } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { ResultPanel } from "@/components/result-panel";
import { SceneViewer } from "@/components/scene-viewer";
import { PageHeader, Tag } from "@/components/workspace";
import { mockResult, mockTrace } from "@/lib/mock-data";
import sceneBefore from "@/assets/scene-before.jpg";

export const Route = createFileRoute("/single-image")({
  head: () => ({
    meta: [
      { title: "Single Image Analysis — SatQuery AI" },
      {
        name: "description",
        content:
          "Visual question answering, captioning and visual grounding on a single satellite scene.",
      },
      { property: "og:title", content: "Single Image Analysis — SatQuery AI" },
      { property: "og:description", content: "VQA, captioning and grounding on one satellite scene." },
    ],
  }),
  component: SingleImage,
});

const vqaResult = {
  ...mockResult,
  task: "vqa" as const,
  model: "RSVQA-Lite",
  query: "How many industrial buildings are visible near the river?",
  answer:
    "Seven industrial structures are visible within 400 m of the river bank, concentrated along the eastern access road. Three additional roof structures are partially occluded by tree cover.",
  confidence: 0.91,
  statistics: [
    { label: "Objects detected", value: "7", hint: "industrial class" },
    { label: "Scene coverage", value: "1.12 km²" },
    { label: "Mean confidence", value: "0.91" },
    { label: "Processing time", value: "2.3 s" },
  ],
};

function SingleImage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analysis"
        title="Single Image Analysis"
        description="Ask questions, generate captions, or ground objects and regions within one satellite scene."
        actions={
          <div className="flex gap-2">
            <Tag tone="primary">VQA</Tag>
            <Tag tone="primary">Captioning</Tag>
            <Tag tone="primary">Grounding</Tag>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SceneViewer
              src={sceneBefore}
              alt="Satellite scene under analysis"
              detections={mockResult.detections}
              caption="Sentinel-2 L2A · 10 m · single-scene mode"
            />
            <div className="space-y-6">
              <QueryComposer placeholder="Ask about objects, land cover or infrastructure in this scene…" />
              <UploadArea title="Scene" hint="One optical or SAR scene" />
            </div>
          </div>
          <ResultPanel result={vqaResult} />
          <ExecutionTrace steps={mockTrace.slice(0, 4)} />
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
