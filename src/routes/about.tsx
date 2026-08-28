import { createFileRoute } from "@tanstack/react-router";
import { HowItWorks } from "@/components/how-it-works";
import { PageHeader, Panel, Tag } from "@/components/workspace";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SatQuery AI" },
      {
        name: "description",
        content:
          "SatQuery AI (SIH26167) is an interactive vision-language assistant for multimodal remote sensing image analysis through text queries.",
      },
      { property: "og:title", content: "About — SatQuery AI" },
      {
        property: "og:description",
        content: "Problem statement, capabilities and architecture of the SatQuery AI platform.",
      },
    ],
  }),
  component: About,
});

const capabilities = [
  { title: "Single-image VQA", detail: "Answer natural-language questions about one satellite scene." },
  { title: "Captioning & grounding", detail: "Describe scenes and localise the referenced regions." },
  { title: "Change detection", detail: "Quantify bi-temporal change with masks and per-class statistics." },
  { title: "Optical + SAR fusion", detail: "All-weather interpretation combining reflectance and backscatter." },
  { title: "Agentic orchestration", detail: "Intent parsing, task identification and model routing." },
  { title: "Evidence-first answers", detail: "Every answer ships with overlays, statistics and confidence." },
];

function About() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="SIH26167"
        title="About SatQuery AI"
        description="An interactive vision-language assistant for multimodal remote sensing image analysis through text queries."
        actions={<Tag tone="ai">frontend foundation</Tag>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Panel title="Problem statement">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Remote sensing analysis normally requires selecting and chaining specialised tools by hand.
              SatQuery AI replaces that with a natural-language interface: the user asks a question, an agent
              identifies the task, selects the appropriate model, runs the analysis on the imagery, and returns
              a grounded answer with visual evidence and a confidence score.
            </p>
          </Panel>

          <Panel title="Core capabilities" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {capabilities.map((c) => (
                <li key={c.title} className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Architecture" subtitle="Current build status">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-surface-raised p-3">
                <p className="label-mono">Frontend</p>
                <p className="mt-1 text-sm text-foreground">React · TypeScript · Tailwind CSS</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Structure, navigation and component system in place. Mock data only.
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-raised p-3">
                <p className="label-mono">Backend</p>
                <p className="mt-1 text-sm text-foreground">FastAPI (separate team member)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Not implemented here — no API calls or model inference yet.
                </p>
              </div>
            </div>
          </Panel>
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
