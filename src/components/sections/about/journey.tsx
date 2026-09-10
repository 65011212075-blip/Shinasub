import Image from "next/image";
import type { Site } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";

/**
 * The company's own account of itself, paired with two photographs of the
 * work it describes, then the milestone orbit.
 *
 * Deliberately *not* built on `SectionHeading`. That component parks its
 * intro in a fixed 20rem column, which is right for the 10-30 word
 * annotations every other section passes it — but this body runs to ~90
 * words, and in a 20rem column it collapsed into a tall grey ribbon beside
 * the heading. Here the heading takes the full width on its own line and
 * the prose gets a proper ~65-character measure underneath it.
 *
 * The two images drift in opposite directions as the section passes, which
 * is what separates them into two planes instead of one flat pair of
 * tiles; the lower offset on the second one keeps the pairing from reading
 * as a symmetrical two-up.
 */
export function Journey({ site }: { site: Site }) {
  const { heading, body, timeline } = site.about.journey;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <Reveal>
        <Eyebrow>{site.about.header.badge}</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.06] text-foreground sm:text-5xl lg:text-[3.5rem]">
          {heading}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16 lg:items-start">
        <Reveal index={1}>
          <p className="max-w-xl text-base leading-[1.75] text-foreground/85 sm:text-lg">
            {body}
          </p>
        </Reveal>

        <Reveal index={2}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Decorative: the paragraph beside them already says what the
                company does, and a translated alt would have to live in
                both content files for purely atmospheric artwork. */}
            <Parallax distance={26}>
              <div aria-hidden className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/images/mast-team.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 264px, 45vw"
                  className="object-cover"
                />
              </div>
            </Parallax>

            <Parallax distance={-26} className="mt-8 sm:mt-12">
              <div aria-hidden className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/images/panel-technician.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 264px, 45vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </div>
        </Reveal>
      </div>

      {/* The orbit gets its own panel below rather than a column beside the
          prose: it needs a square to stay readable, and at this width a
          third column would have squeezed both. */}
      <Reveal className="mt-16 sm:mt-20" index={1}>
        <div className="rounded-3xl bg-surface-1 p-8 sm:p-12">
          <RadialOrbitalTimeline items={[...timeline]} ariaLabel={heading} />
        </div>
      </Reveal>
    </section>
  );
}
