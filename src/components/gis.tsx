import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarClock, Upload } from "lucide-react";
import { Panel, Tag } from "@/components/workspace";
import type { SceneMeta } from "@/lib/mock-data";
import { changeClasses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/** Scene metadata table used beside every image preview. */
export function SceneMetaCard({ meta, title = "Image metadata" }: { meta: SceneMeta; title?: string }) {
  const rows: [string, string | undefined][] = [
    ["File", meta.name],
    ["Sensor", meta.sensor],
    ["Acquired", meta.acquiredAt],
    ["Resolution", meta.resolution],
    ["Bands", meta.bands],
    ["CRS", meta.crs],
    ["Size", meta.size],
    ["Cloud cover", meta.cloud],
  ];
  return (
    <Panel title={title} bodyClassName="p-0">
      <dl className="divide-y divide-border">
        {rows
          .filter(([, v]) => Boolean(v))
          .map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 px-4 py-2">
              <dt className="label-mono">{k}</dt>
              <dd className="truncate font-mono text-xs text-foreground">{v}</dd>
            </div>
          ))}
      </dl>
    </Panel>
  );
}

/** A single upload slot, optionally with an acquisition-date field. */
export function UploadSlot({
  label,
  hint = "GeoTIFF, JPEG or PNG",
  date,
  tone = "primary",
  className,
}: {
  label: string;
  hint?: string;
  date?: string;
  tone?: "primary" | "ai" | "neutral";
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border border-border bg-surface-raised p-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <Tag tone={tone}>slot</Tag>
      </div>
      <div className="grid-backdrop mt-3 flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-background/40 px-4 py-6 text-center">
        <Upload className="h-5 w-5 text-cyan" />
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
        <button
          type="button"
          className="mt-3 rounded-md border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          Browse files
        </button>
      </div>
      {date !== undefined ? (
        <label className="mt-3 block">
          <span className="label-mono flex items-center gap-1.5">
            <CalendarClock className="h-3 w-3 text-cyan" />
            Acquisition date
          </span>
          <input
            readOnly
            value={date}
            className="mt-1 w-full rounded-md border border-input bg-background/60 px-2.5 py-1.5 font-mono text-xs text-foreground outline-none"
          />
        </label>
      ) : null}
    </div>
  );
}

/** Change map with per-class legend and share bars. */
export function ChangeMapPanel({ children }: { children?: ReactNode }) {
  return (
    <Panel title="Change map" subtitle="Per-class change mask · mock output" bodyClassName="p-0">
      {children}
      <ul className="divide-y divide-border">
        {changeClasses.map((c) => (
          <li key={c.label} className="px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <Tag tone={c.tone}>{c.label}</Tag>
              <span className="font-mono text-sm text-foreground">{c.area}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full",
                  c.tone === "danger"
                    ? "bg-destructive"
                    : c.tone === "warning"
                      ? "bg-warning"
                      : c.tone === "primary"
                        ? "bg-primary"
                        : "bg-success",
                )}
                style={{ width: `${c.share}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** Quick-access navigation card used on the dashboard. */
export function QuickAccessCard({
  to,
  title,
  description,
  icon: Icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      to={to}
      className="panel group flex flex-col gap-2 p-4 transition-colors hover:border-primary/50"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-md"
        style={{ background: "var(--gradient-scan)" }}
      >
        <Icon className="h-4.5 w-4.5 text-primary-foreground" />
      </span>
      <p className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Link>
  );
}

/** Primary call-to-action used by every analysis workflow. */
export function AnalyzeButton({ label = "Run analysis" }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-primary-foreground"
      style={{ background: "var(--gradient-scan)" }}
    >
      {label}
    </button>
  );
}
