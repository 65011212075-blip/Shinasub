import type { Site } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * Service-level commitment, set as a full-bleed inverted band. This is the
 * page's strongest claim, so it gets the only colour inversion on the
 * About page outside the panel pair — the palette change does the emphasis
 * work that a larger type size would otherwise have to.
 */
export function Commitment({ site }: { site: Site }) {
  const { heading, label, body } = site.about.commitment;

  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
        <Reveal>
          <Eyebrow tone="ink">{label}</Eyebrow>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-6 max-w-[18ch] font-bold leading-[1.04] tracking-[-0.035em] [font-size:clamp(2.25rem,5.2vw,4rem)]">
            {heading}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
