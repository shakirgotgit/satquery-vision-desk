import { Sparkles } from "lucide-react";
import { ConfidenceBar, Panel, StatCard, Tag } from "@/components/workspace";
import { taskLabels, type AnalysisResult } from "@/lib/mock-data";

export function ResultPanel({ result }: { result: AnalysisResult }) {
  return (
    <Panel
      title="Analysis result"
      subtitle={`${taskLabels[result.task]} · ${result.model}`}
      actions={<Tag tone="success">completed</Tag>}
    >
      <div className="flex items-start gap-3 rounded-md border border-ai/30 bg-ai/5 p-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ai" />
        <p className="text-sm leading-relaxed text-foreground">{result.answer}</p>
      </div>

      <div className="mt-4">
        <ConfidenceBar value={result.confidence} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {result.statistics.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} />
        ))}
      </div>

      <div className="mt-4">
        <p className="label-mono">Evidence regions</p>
        <ul className="mt-2 space-y-2">
          {result.detections.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between rounded-md border border-border bg-surface-raised px-3 py-2 text-sm"
            >
              <span className="text-foreground">{d.label}</span>
              <span className="font-mono text-xs text-cyan">{(d.confidence * 100).toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
