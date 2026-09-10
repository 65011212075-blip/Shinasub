import type { Site } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

/**
 * Managed operations as a disclosure list, with the heading held in a
 * sticky left column while the rows scroll past it.
 *
 * These items are the "what do you actually do for me after handover"
 * answers — the shape a reader scans rather than reads straight through —
 * so collapsing them to titles and letting the reader open what they care
 * about beats five paragraphs of equal weight.
 */
export function ManagedOperations({ site }: { site: Site }) {
  const { anchor, heading, badge, intro, items } = site.services.managedOperations;

  return (
    <section
      id={anchor}
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{badge}</Eyebrow>
            <h2 className="mt-6 text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </div>
        </Reveal>

        <Reveal index={1}>
          <Accordion items={[...items]} />
        </Reveal>
      </div>
    </section>
  );
}
