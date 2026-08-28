import { useState } from "react";
import { Crosshair, Flame, Grid3x3, Maximize2, MapPin } from "lucide-react";
import type { Detection } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type OverlayKey = "boxes" | "heatmap" | "grid";

const overlayMeta: { key: OverlayKey; label: string; icon: typeof Crosshair }[] = [
  { key: "boxes", label: "Regions", icon: Crosshair },
  { key: "heatmap", label: "Heatmap", icon: Flame },
  { key: "grid", label: "Tiles", icon: Grid3x3 },
];

export function SceneViewer({
  src,
  alt,
  detections = [],
  caption,
  className,
}: {
  src: string;
  alt: string;
  detections?: Detection[];
  caption?: string;
  className?: string;
}) {
  const [overlays, setOverlays] = useState<Record<OverlayKey, boolean>>({
    boxes: true,
    heatmap: false,
    grid: false,
  });

  return (
    <div className={cn("panel overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono">18.5204° N, 73.8567° E · EPSG:4326</span>
        </div>
        <div className="flex items-center gap-1.5">
          {overlayMeta.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setOverlays((o) => ({ ...o, [key]: !o[key] }))}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors",
                overlays[key]
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-surface-raised text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
          <button
            type="button"
            className="rounded-md border border-border bg-surface-raised p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Expand viewer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="relative aspect-square w-full bg-background">
        <img
          src={src}
          alt={alt}
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {overlays.heatmap ? (
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 65% 28%, color-mix(in oklab, var(--destructive) 70%, transparent), transparent 42%), radial-gradient(circle at 30% 68%, color-mix(in oklab, var(--warning) 55%, transparent), transparent 38%), radial-gradient(circle at 22% 30%, color-mix(in oklab, var(--cyan) 45%, transparent), transparent 32%)",
            }}
          />
        ) : null}

        {overlays.grid ? <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-70" /> : null}

        {overlays.boxes
          ? detections.map((d) => (
              <div
                key={d.id}
                className="pointer-events-none absolute rounded-sm border-2 border-cyan"
                style={{
                  left: `${d.box.x * 100}%`,
                  top: `${d.box.y * 100}%`,
                  width: `${d.box.w * 100}%`,
                  height: `${d.box.h * 100}%`,
                  boxShadow: "0 0 18px -4px var(--cyan)",
                }}
              >
                <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-background/85 px-1.5 py-0.5 font-mono text-[10px] text-cyan">
                  {d.label} · {(d.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))
          : null}
      </div>

      {caption ? (
        <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">{caption}</p>
      ) : null}
    </div>
  );
}

export function CompareViewer({
  beforeSrc,
  afterSrc,
  beforeLabel = "T1 · 2019-03-14",
  afterLabel = "T2 · 2024-11-02",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="label-mono">{beforeLabel}</span>
        <span className="label-mono">{afterLabel}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        <img
          src={beforeSrc}
          alt="Before acquisition"
          width={1024}
          height={1024}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={afterSrc}
            alt="After acquisition"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ width: "100vw", maxWidth: "none" }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-cyan"
          style={{ left: `${position}%`, boxShadow: "0 0 16px var(--cyan)" }}
        />
      </div>
      <div className="px-3 py-3">
        <label className="label-mono" htmlFor="compare-slider">
          Swipe comparison
        </label>
        <input
          id="compare-slider"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--cyan)]"
        />
      </div>
    </div>
  );
}
