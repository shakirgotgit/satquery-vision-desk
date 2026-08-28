import { workflowSteps } from "@/lib/mock-data";

export function HowItWorks() {
  return (
    <section className="panel">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">How SatQuery AI Works</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Query to grounded answer in six orchestrated steps.
        </p>
      </div>
      <ol className="relative space-y-4 px-4 py-4">
        <span className="absolute left-[27px] top-6 h-[calc(100%-3rem)] w-px bg-border" />
        {workflowSteps.map((s) => (
          <li key={s.step} className="relative flex gap-3">
            <span
              className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-ai)" }}
            >
              {s.step}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
