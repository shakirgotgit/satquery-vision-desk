import { useState } from "react";
import { CheckCircle2, CircleDashed, ImagePlus, Loader2, SendHorizonal, Upload } from "lucide-react";
import { Panel, Tag } from "@/components/workspace";
import { exampleQueries, taskLabels, type TraceStep } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function QueryComposer({
  placeholder = "Ask about the scene — e.g. \u201cWhat changed near the river between 2019 and 2024?\u201d",
  attachedScenes = 2,
  suggestions = exampleQueries,
}: {
  placeholder?: string;
  attachedScenes?: number;
  suggestions?: readonly string[];
}) {
  const [value, setValue] = useState("");

  return (
    <Panel
      title="Natural-language query"
      subtitle="The agent parses intent, picks a task and routes to a model."
      actions={<Tag tone="ai">agentic</Tag>}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-md border border-input bg-background/60 focus-within:shadow-[var(--glow-primary)]"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between border-t border-border px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImagePlus className="h-4 w-4" />
            {attachedScenes} scene{attachedScenes === 1 ? "" : "s"} attached · GeoTIFF, JPEG, PNG
          </div>
          <button
            type="submit"
            disabled
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-70"
            style={{ background: "var(--gradient-scan)" }}
          >
            Run analysis
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setValue(s)}
            className="rounded-full border border-border bg-surface-raised px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Inference is not connected yet — responses shown in this build are mock data.
      </p>
    </Panel>
  );
}

export function UploadArea({
  title = "Scene upload",
  hint = "GeoTIFF, JPEG or PNG · optical or SAR · up to 2 scenes for bi-temporal tasks",
}: {
  title?: string;
  hint?: string;
}) {
  return (
    <Panel title={title} subtitle={hint}>
      <div className="grid-backdrop flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-background/40 px-6 py-10 text-center">
        <Upload className="h-6 w-6 text-cyan" />
        <p className="mt-3 text-sm font-medium text-foreground">Drop satellite imagery here</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Geo metadata (CRS, bounds, acquisition date) is read automatically when available.
        </p>
        <button
          type="button"
          className="mt-4 rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
        >
          Browse files
        </button>
      </div>
    </Panel>
  );
}

export function ExecutionTrace({ steps }: { steps: TraceStep[] }) {
  return (
    <Panel title="Execution trace" subtitle="Agent reasoning and tool selection">
      <ol className="relative space-y-4 pl-5">
        <span className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-px bg-border" />
        {steps.map((step) => (
          <li key={step.id} className="relative">
            <span className="absolute -left-5 top-0.5">
              {step.status === "done" ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : step.status === "running" ? (
                <Loader2 className="h-4 w-4 animate-spin text-ai" />
              ) : (
                <CircleDashed className="h-4 w-4 text-muted-foreground" />
              )}
            </span>
            <p
              className={cn(
                "text-sm font-medium",
                step.status === "pending" ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {step.title}
            </p>
            <p className="text-xs text-muted-foreground">{step.detail}</p>
            {step.durationMs ? (
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {(step.durationMs / 1000).toFixed(2)}s
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </Panel>
  );
}

export function TaskBadge({ task }: { task: keyof typeof taskLabels }) {
  return <Tag tone="primary">{taskLabels[task]}</Tag>;
}
