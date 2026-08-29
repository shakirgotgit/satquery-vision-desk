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

          <Panel title="Technology stack" subtitle="What this prototype is built with">
            <div className="grid gap-3 sm:grid-cols-2">
              {techStack.map((t) => (
                <div key={t.layer} className="rounded-md border border-border bg-surface-raised p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="label-mono">{t.layer}</p>
                    <Tag tone={t.status === "implemented" ? "success" : "warning"}>{t.status}</Tag>
                  </div>
                  <p className="mt-1 text-sm text-foreground">{t.stack}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.detail}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Team" subtitle="SIH26167 · role split" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {team.map((m) => (
                <li key={m.role} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.role}</p>
                    <p className="text-xs text-muted-foreground">{m.detail}</p>
                  </div>
                  <Tag tone={m.tone}>{m.owner}</Tag>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <HowItWorks />
      </div>
    </div>
  );
}
