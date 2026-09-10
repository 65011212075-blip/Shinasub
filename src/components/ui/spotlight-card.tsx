"use client";

// Pointer-tracking spotlight panel: a soft radial highlight follows the
// cursor across the card. Rebuilt for the light system — on paper the
// highlight has to *warm* the fill rather than light it up, so the tint is
// kept low-alpha and paired with a lift and a hairline ring, which is what
// actually reads as hover at these values.
//
// The glow only tracks the mouse — touch input never fires pointermove for
// hover in the same way, so it naturally stays off on touch devices; we
// additionally gate on pointerType to be explicit.

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  glow?: "brand" | "copper";
};

export function SpotlightCard({ children, className, glow = "brand" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  }

  const glowColor = glow === "brand" ? "var(--brand)" : "var(--copper)";

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-surface-1 p-6 sm:p-7",
        "ring-1 ring-transparent transition-[transform,box-shadow] duration-500 ease-[var(--ease-editorial)]",
        "hover:-translate-y-1 hover:ring-foreground/8",
        className,
      )}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--spotlight-x) var(--spotlight-y), color-mix(in oklch, ${glowColor} 12%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
