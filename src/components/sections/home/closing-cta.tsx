import Image from "next/image";
import type { Site } from "@/content";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxScale } from "@/components/motion/parallax-scale";

/**
 * Closing call to action. Reuses the hero's sky wash, inverted top to
 * bottom, so the page opens and closes on the same colour and the footer's
 * inverted band arrives as a deliberate cut rather than a third palette.
 */
export function ClosingCta({ site }: { site: Site }) {
  const { heading, cta } = site.home.profileBand;

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--sky-1)_0%,var(--sky-2)_52%,var(--background)_100%)]"
      />
      {/* Two slow, offset blurred discs standing in for cloud movement —
          transform-only, so they ride the compositor and cost nothing. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="cloud-drift absolute -bottom-32 left-[8%] size-[28rem] rounded-full bg-background/50 blur-3xl" />
        <div
          className="cloud-drift absolute -bottom-40 right-[6%] size-[32rem] rounded-full bg-background/40 blur-3xl"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28 text-center sm:px-8 sm:py-36 lg:px-12">
        <Reveal className="flex justify-center">
          <Eyebrow>{site.tagline}</Eyebrow>
        </Reveal>

        <Reveal index={1}>
          <h2 className="mx-auto mt-8 max-w-[20ch] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [font-size:clamp(2.25rem,5.6vw,4.5rem)]">
            {heading}
          </h2>
        </Reveal>

        <Reveal index={2} className="mt-10 flex justify-center">
          <ArrowButton href={cta.href} size="lg">
            {cta.label}
          </ArrowButton>
        </Reveal>
      </div>

      {/* The city the company builds in, closing the page the way the hero
          opens it: full width, scaling on scroll, edge dissolved into the
          band below. Decorative — the section's heading carries the
          message — so the alt stays empty. */}
      <ParallaxScale from={1.08} to={1} drift={0}>
        <div aria-hidden className="fade-to-paper relative h-[34vh] min-h-[220px] sm:h-[42vh]">
          <Image
            src="/images/bangkok-panorama.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </ParallaxScale>
    </section>
  );
}
