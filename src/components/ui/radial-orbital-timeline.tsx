"use client";

// Custom implementation of a radial/orbital timeline, playing the same role
// as Radial Orbital Timeline by jatin-yadav05
// (https://21st.dev/r/jatin-yadav05/radial-orbital-timeline): milestones
// arranged on an orbit around a center hub. The registry source requires an
// authenticated 21st.dev session to fetch via the shadcn CLI, which this
// environment could not do, so it was rebuilt directly against this
// project's content and tokens (see README). Built as a keyboard-operable
// tab list rather than a hover-only diagram, since Shinasub's timeline has
// few enough milestones that hover-only interaction would exclude touch and
// keyboard users from real content.

import { useState } from "react";
import { cn } from "@/lib/utils";

type OrbitItem = {
  year: string;
  label: string;
  detail: string;
};

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: 50 + radius * Math.cos(angleRad),
    y: 50 + radius * Math.sin(angleRad),
  };
}

export function RadialOrbitalTimeline({ items, ariaLabel }: { items: OrbitItem[]; ariaLabel: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const angleStep = 360 / Math.max(items.length, 1);

  return (
    <div className="grid gap-10 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[280px]">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.6"
            strokeDasharray="2 3"
          />
          <circle cx="50" cy="50" r="10" fill="var(--surface-2)" stroke="var(--brand)" strokeWidth="0.6" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-sm font-semibold text-foreground">
            {items[activeIndex]?.year}
          </span>
        </div>

        {items.map((item, index) => {
          const angle = angleStep * index - 90;
          const { x, y } = polarToCartesian(angle + 90, 38);
          const isActive = index === activeIndex;

          return (
            <button
              key={item.year}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className={cn(
                "absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-surface-1 text-muted-foreground hover:border-brand/60 hover:text-foreground",
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/^\d+$/.test(item.year) ? item.year.slice(-2) : "•"}
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4" role="tabpanel">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={ariaLabel}>
          {items.map((item, index) => (
            <button
              key={item.year}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                index === activeIndex
                  ? "border-brand bg-brand/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.year}
            </button>
          ))}
        </div>
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">{items[activeIndex]?.label}</p>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {items[activeIndex]?.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
