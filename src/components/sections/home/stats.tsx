import Image from "next/image";
import type { Site } from "@/content";
import { RollingNumber } from "@/components/motion/rolling-number";
import { Reveal } from "@/components/motion/reveal";

/**
 * The operating record, as a band of figures flanked by two site
 * photographs.
 *
 * Left deliberately headless: it lands directly under the services deck,
 * which has just introduced what the company does, so a second heading
 * here would restate it. The figures and their labels are the whole
 * content, and the two images give the band the same full-width weight a
 * headed section would have had.
 */
export function Stats({ site }: { site: Site }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <Reveal>
        <div className="grid gap-3 lg:grid-cols-[14rem_minmax(0,1fr)_15rem] lg:gap-4">
          {/* Both photographs are decorative framing for the figures, so
              they carry empty alt text and drop out entirely on narrow
              screens rather than stacking above the numbers.

              Both sources must be PORTRAIT. These columns are ~224x408 and
              ~240x408 (a ratio near 0.55) because their height is set by
              the stack of figures beside them, so a landscape source gets
              ~70% of its width cropped away and arrives as a meaningless
              vertical sliver.

              `sizes` is deliberately larger than the column width. With a
              portrait source in a box this tall, object-cover scales to
              match the *height*, so the image is rendered about
              `ratio * 408` CSS px wide (~306px here) even though only
              224px of it is visible. Declaring the column width instead
              made the browser fetch a 384w file and upscale it ~3x, which
              is exactly how this rendered blurry before. */}
          <div className="relative hidden overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/bangkok-aerial.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 20rem, 1px"
              className="object-cover"
            />
          </div>

          <ul className="flex flex-col gap-3">
            {site.stats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center justify-between gap-6 rounded-2xl bg-surface-1 px-6 py-5 sm:px-8"
              >
                <span className="font-heading text-3xl font-bold leading-none tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
                  <RollingNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.format === "decimal" ? 1 : 0}
                  />
                </span>
                <span className="label-caps text-end text-muted-foreground">{stat.label}</span>
              </li>
            ))}
          </ul>

          <div className="relative hidden overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/bangkok-street.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 20rem, 1px"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
