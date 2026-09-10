import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/motion/reveal";

type CtaBannerProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

/**
 * Shared closing CTA for About and Services. Mirrors the home page's
 * closing section — same sky wash rising into the footer's inverted band —
 * so every page lands on the same note regardless of which one the visitor
 * arrived on.
 */
export function CtaBanner({ heading, body, ctaLabel, ctaHref }: CtaBannerProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--sky-1)_0%,var(--sky-2)_52%,var(--background)_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="cloud-drift absolute -bottom-32 left-[10%] size-[26rem] rounded-full bg-background/50 blur-3xl" />
        <div
          className="cloud-drift absolute -bottom-36 right-[8%] size-[30rem] rounded-full bg-background/40 blur-3xl"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28 text-center sm:px-8 sm:py-36 lg:px-12">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] font-bold leading-[1.04] tracking-[-0.035em] text-foreground [font-size:clamp(2.25rem,5.2vw,4rem)]">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {body}
          </p>
        </Reveal>
        <Reveal index={1} className="mt-10 flex justify-center">
          <ArrowButton href={ctaHref} size="lg">
            {ctaLabel}
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
