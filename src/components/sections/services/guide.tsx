import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { Site } from "@/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { StackCard } from "@/components/motion/stack-card";

// Keyed to the slot rather than the content files: the pillar order is
// fixed across both locales, and the artwork is atmospheric, so it needs no
// translated alt text.
const PILLAR_IMAGES = [
  "/images/network-switch.jpg",
  "/images/field-technicians.jpg",
  "/images/data-center-monitor.jpg",
];

/**
 * The three service pillars, dealt as a deck: each panel pins under the
 * header and the next slides over it.
 *
 * These three are the page's table of contents — each one links down to
 * its own detailed section — so they get the deck treatment rather than a
 * row of equal tiles: the reader is walked past all three in order before
 * reaching any of the detail.
 */
export function Guide({ site }: { site: Site }) {
  const { quote, viewDetailsLabel, pillars } = site.services.guide;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <Reveal>
        <p className="max-w-4xl font-heading text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
          &ldquo;{quote}&rdquo;
        </p>
      </Reveal>

      <div className="mt-16">
        {pillars.map((pillar, index) => (
          <StackCard
            key={pillar.index}
            index={index}
            total={pillars.length}
            className="bg-ink text-ink-foreground"
          >
            <div className="relative flex min-h-[20rem] flex-col justify-between gap-10 p-8 sm:min-h-[24rem] sm:p-12">
              {/* Full-bleed photograph under a heavy scrim. The cards are
                  opaque by necessity — they slide over one another — so the
                  artwork also does the work of telling them apart as they
                  stack. Decorative, hence the empty alt. */}
              <div aria-hidden className="absolute inset-0">
                <Image
                  src={PILLAR_IMAGES[index]}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/80" />
              </div>

              {/* A single brand-tinted bloom per panel, offset by index so
                  the three cards don't look like the same sheet repeated
                  as they slide over one another. */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-24 size-96 rounded-full bg-brand/12 blur-3xl",
                  index === 0 && "right-[-4rem]",
                  index === 1 && "left-1/3",
                  index === 2 && "left-[-4rem]",
                )}
              />

              <div className="relative flex items-start justify-between gap-6">
                <span className="label-caps text-ink-muted">{site.services.header.badge}</span>
                <span
                  aria-hidden
                  className="font-heading text-6xl font-bold leading-none tracking-[-0.04em] text-ink-foreground/90 sm:text-7xl"
                >
                  .{pillar.index}
                </span>
              </div>

              <div className="relative">
                <h2 className="max-w-[16ch] text-3xl font-bold leading-[1.06] tracking-[-0.03em] sm:text-[2.75rem]">
                  {pillar.name}
                </h2>
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
                  {pillar.description}
                </p>
                <a
                  href={`#${pillar.anchor}`}
                  className="group/link mt-8 inline-flex items-center gap-2 rounded-full bg-ink-2 py-2.5 ps-5 pe-2.5 text-sm font-medium text-ink-foreground transition-colors duration-300 hover:bg-ink-foreground hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {viewDetailsLabel}
                  <span className="grid size-6 place-items-center rounded-full bg-ink-foreground/10 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover/link:translate-y-0.5">
                    <ArrowDown className="size-3.5" aria-hidden />
                  </span>
                </a>
              </div>
            </div>
          </StackCard>
        ))}
      </div>
    </section>
  );
}
