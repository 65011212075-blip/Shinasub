import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Site } from "@/content";
import { ArrowButton } from "@/components/ui/arrow-button";
import { RevealTextStatic } from "@/components/ui/reveal-text-static";
import { ParallaxScale } from "@/components/motion/parallax-scale";

/**
 * Centred editorial hero: a pale sky wash, the headline at display scale,
 * and a wide photographic plate below the copy that grows as the page
 * scrolls past it.
 *
 * The plate sits *under* the text rather than behind it, so the headline
 * never has to compete with the image for contrast, and so the scale-up
 * has a scroll runway to travel through. Its lower edge is dissolved into
 * the page, which is what lets the section end without a seam.
 */
export function Hero({ site }: { site: Site }) {
  const { h1, subline, ctaPrimary, ctaSecondary } = site.home.hero;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="sky-wash absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-6 pt-16 text-center sm:px-8 sm:pt-24 lg:px-12">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-background/60 py-1.5 ps-2.5 pe-4 backdrop-blur-sm">
          <span aria-hidden className="grid size-4 place-items-center rounded-full bg-brand/15">
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
          <span className="label-caps text-foreground/70">{site.legalName}</span>
        </div>

        {/* clamp() rather than breakpoint steps: the headline is the one
            element that should track the viewport continuously, so it stays
            at the same optical size relative to its measure at every width. */}
        <h1 className="mx-auto mt-8 max-w-[62rem] font-bold leading-[0.98] tracking-[-0.035em] text-foreground [font-size:clamp(2.75rem,7.4vw,6.25rem)]">
          <RevealTextStatic text={h1} />
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ArrowButton href={ctaPrimary.href} size="lg">
            {ctaPrimary.label}
          </ArrowButton>
          <Link
            href={ctaSecondary.href}
            className="inline-flex h-[3.25rem] items-center rounded-full border border-foreground/10 bg-background px-7 text-base font-medium text-foreground transition-[transform,background-color] duration-300 ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            {ctaSecondary.label}
          </Link>
        </div>
      </div>

      <ParallaxScale from={1} to={1.22} drift={-20} className="mt-14 sm:mt-20">
        <div className="fade-to-paper relative h-[38vh] min-h-[260px] sm:h-[48vh]">
          {/* Decorative: the headline and subline carry the message, and a
              translated alt would have to live in both content files for a
              purely atmospheric plate. `priority` because this is the
              largest element in the initial viewport on the home page —
              without it the LCP waits on lazy-loading. */}
          <Image
            src="/images/smart-building.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </ParallaxScale>
    </section>
  );
}
