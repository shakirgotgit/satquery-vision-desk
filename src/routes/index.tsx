import { createFileRoute } from "@tanstack/react-router";
import { ExecutionTrace, QueryComposer, UploadArea } from "@/components/query-console";
import { HowItWorks } from "@/components/how-it-works";
import { ResultPanel } from "@/components/result-panel";
import { SceneViewer } from "@/components/scene-viewer";
import { PageHeader, Tag } from "@/components/workspace";
import { mockResult } from "@/lib/mock-data";
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
        actions={<Tag tone="ai">agent ready</Tag>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <QueryComposer />
          <UploadArea />
          <div className="grid gap-6 lg:grid-cols-2">
            <SceneViewer
              src={sceneAfter}
              alt="Satellite scene with detected regions"
              detections={mockResult.detections}
              caption="Sentinel-2 L2A · 10 m · acquired 2024-11-02"
            />
            <ExecutionTrace steps={mockResult.trace} />
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
