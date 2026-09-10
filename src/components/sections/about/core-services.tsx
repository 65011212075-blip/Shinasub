import Image from "next/image";
import { Check } from "lucide-react";
import type { Site } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutCoreServices({ site }: { site: Site }) {
  const { heading, body, imageAlt, expertiseHeading, expertise, approachHeading, approachBody } =
    site.about.coreServices;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <SectionHeading eyebrow={site.services.header.eyebrow} heading={heading} intro={body} />

      <Reveal className="mt-14" index={1}>
        <div className="relative aspect-[21/9] overflow-hidden rounded-3xl">
          <Image
            src="/images/fiber-patch-cords.jpg"
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 1216px, 100vw"
          />
        </div>
      </Reveal>

      <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
        <Reveal index={2}>
          <div className="h-full rounded-3xl bg-surface-1 p-8 sm:p-10">
            <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">
              {expertiseHeading}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {expertise.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success"
                  >
                    <Check className="size-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal index={3}>
          <div className="h-full rounded-3xl bg-ink p-8 text-ink-foreground sm:p-10">
            <h3 className="text-xl font-bold tracking-[-0.02em]">{approachHeading}</h3>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-muted">{approachBody}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
