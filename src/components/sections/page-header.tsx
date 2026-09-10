import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealTextStatic } from "@/components/ui/reveal-text-static";
import { Reveal } from "@/components/motion/reveal";

type PageHeaderProps = {
  eyebrow: string;
  heading: string;
  subline?: string;
  action?: ReactNode;
};

/**
 * Shared opener for the inner pages. Same sky wash and display scale as
 * the home hero but shorter, so a subpage announces itself in the same
 * voice without pretending to be a landing page.
 *
 * The heading uses the CSS-driven word reveal rather than the JS `Reveal`
 * for the same reason the home hero does: it is the LCP element on every
 * one of these pages, so it must not sit at opacity:0 waiting on
 * hydration.
 */
export function PageHeader({ eyebrow, heading, subline, action }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--sky-1)_0%,var(--sky-2)_45%,var(--background)_100%)]"
      />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[22ch] font-bold leading-[1.0] tracking-[-0.035em] text-foreground [font-size:clamp(2.5rem,6.4vw,5rem)]">
          <RevealTextStatic text={heading} />
        </h1>
        {subline && (
          <Reveal index={1}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subline}
            </p>
          </Reveal>
        )}
        {action && (
          <Reveal index={2} className="mt-9">
            {action}
          </Reveal>
        )}
      </div>
    </section>
  );
}
