import { cn } from "@/lib/utils";

/**
 * Section kicker: a small live-dot glyph followed by a tiny all-caps label.
 * Every section on the site opens with one, so the reader can tell where a
 * new block begins without relying on the heading size alone.
 *
 * The dot is a ring with a filled core in brand blue — the one place the
 * network-status motif shows up in flat UI, echoing the pulses in the 3D
 * backbone. Drawn in CSS rather than an icon so it inherits the label's
 * colour on inverted bands.
 */
export function Eyebrow({
  children,
  className,
  tone = "paper",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "ink";
}) {
  return (
    <p
      className={cn(
        "label-caps inline-flex items-center gap-2",
        tone === "paper" ? "text-muted-foreground" : "text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-3 place-items-center rounded-full border",
          tone === "paper" ? "border-foreground/25" : "border-ink-foreground/30",
        )}
      >
        <span className="size-1 rounded-full bg-brand" />
      </span>
      {children}
    </p>
  );
}
