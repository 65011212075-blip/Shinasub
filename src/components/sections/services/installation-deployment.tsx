import Image from "next/image";
import type { Site } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Deployment capabilities as a numbered editorial list.
 *
 * Six items is past the point where a stacked deck works — the runway
 * would run to several screens — so this stays a list, but a wide one:
 * numeral and title in the left column, description in the right, with a
 * hairline between rows. Each row reveals on its own beat as it enters,
 * which gives the list the same cadence the deck has without the pinning.
 */
export function InstallationDeployment({ site }: { site: Site }) {
  const { anchor, heading, intro, steps } = site.services.installationDeployment;

  return (
    <section id={anchor} className="scroll-mt-24 bg-surface-1 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow={site.services.header.badge} heading={heading} intro={intro} />

        {/* Field context for the list that follows. Decorative: the steps
            themselves are the content. */}
        <Reveal className="mt-14" index={1}>
          <div aria-hidden className="relative aspect-[21/9] overflow-hidden rounded-3xl">
            <Image
              src="/images/rooftop-telecom.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <ol className="mt-14 border-t border-foreground/8">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.index} index={index % 3}>
              <div className="group grid gap-4 border-b border-foreground/8 py-8 transition-colors duration-500 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8 md:grid-cols-[4rem_22rem_minmax(0,1fr)] md:items-baseline">
                <span
                  aria-hidden
                  className="font-heading text-2xl font-bold leading-none tracking-[-0.03em] text-foreground/25 transition-colors duration-500 group-hover:text-brand"
                >
                  {step.index}
                </span>
                <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                  {step.name}
                </h3>
                <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
