import type { Site } from "@/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Vision and mission as a facing pair of full-height panels, the first
 * inverted. Alternating the fill rather than repeating two identical grey
 * cards keeps the pair reading as a statement rather than a feature grid,
 * and reuses the same numeral/panel language as the home service deck.
 */
export function VisionMission({ site }: { site: Site }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {site.about.visionMission.map((item, index) => {
          const inverted = index === 0;
          return (
            <Reveal key={item.index} index={index}>
              <div
                className={cn(
                  "flex h-full flex-col justify-between gap-16 rounded-3xl p-8 sm:p-10",
                  inverted ? "bg-ink text-ink-foreground" : "bg-surface-1 text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "font-heading text-5xl font-bold leading-none tracking-[-0.04em] sm:text-6xl",
                    inverted ? "text-ink-foreground/90" : "text-foreground/20",
                  )}
                >
                  .{item.index}
                </span>
                <div>
                  <h2 className="text-2xl font-bold leading-[1.1] sm:text-[1.75rem]">{item.name}</h2>
                  <p
                    className={cn(
                      "mt-4 max-w-md text-[0.9375rem] leading-relaxed",
                      inverted ? "text-ink-muted" : "text-muted-foreground",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
