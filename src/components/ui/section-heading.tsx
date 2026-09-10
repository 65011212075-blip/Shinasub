import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  heading: ReactNode;
  /** Supporting copy, set in the narrow right-hand column. */
  intro?: ReactNode;
  /** Optional action rendered under the intro. */
  action?: ReactNode;
  tone?: "paper" | "ink";
  className?: string;
};

/**
 * The standard section opener: kicker and large heading on the left, a
 * narrow column of supporting copy pushed to the right.
 *
 * The asymmetry is the point — the heading gets the full measure it needs
 * for two tight lines of display type while the intro stays a short,
 * three-line block far enough away to read as an annotation rather than a
 * subtitle. Below `lg` the two collapse into a single column in reading
 * order.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  action,
  tone = "paper",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16",
        className,
      )}
    >
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "mt-5 max-w-2xl text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-[3.5rem]",
            tone === "paper" ? "text-foreground" : "text-ink-foreground",
          )}
        >
          {heading}
        </h2>
      </Reveal>

      {(intro || action) && (
        <Reveal index={1}>
          {intro && (
            <p
              className={cn(
                "text-[0.9375rem] leading-relaxed",
                tone === "paper" ? "text-muted-foreground" : "text-ink-muted",
              )}
            >
              {intro}
            </p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      )}
    </div>
  );
}
