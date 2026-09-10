"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Site } from "@/content";
import { cn } from "@/lib/utils";
import { ArrowButton } from "@/components/ui/arrow-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

/**
 * The three service pillars as a row of panels where only one is open at a
 * time: the open panel takes roughly half the row and shows its full
 * description in inverted ink, the closed ones collapse to their numeral.
 *
 * Preferred over three equal cards because the pillars are a *sequence*
 * (design -> deploy -> operate), and a deck that opens one at a time makes
 * the reader move along it in order instead of scanning three parallel
 * boxes. The first panel is open on load so the section is never in an
 * empty state.
 *
 * Each panel is a link, which is what makes this keyboard-usable: opening
 * is bound to focus as well as hover, so tabbing through the row walks the
 * deck exactly the way the pointer does, and every description stays in
 * the DOM for assistive tech regardless of which panel is open.
 */
// Positional, not content-driven: the three pillars are a fixed sequence
// (design -> deploy -> operate) shared by both locales, so the artwork is
// keyed to the slot rather than added to the translated content files.
const PANEL_IMAGES = [
  "/images/fiber-patch-panel.jpg",
  "/images/tower-technician.jpg",
  "/images/data-center-aisle.jpg",
];

export function CoreServices({ site }: { site: Site }) {
  const { heading, intro, cards, cta } = site.home.coreServices;
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        eyebrow={site.services.header.eyebrow}
        heading={heading}
        intro={intro}
        action={
          <ArrowButton href={cta.href} variant="outline" size="sm">
            {cta.label}
          </ArrowButton>
        }
      />

      <div className="mt-14 flex flex-col gap-4 lg:h-[27rem] lg:flex-row">
        {cards.map((card, index) => {
          const open = active === index;
          return (
            // The Reveal wrapper is the flex item, so the row's sizing
            // (basis/grow) has to live on it rather than on the Link —
            // otherwise the panel that opens would grow inside a fixed-width
            // wrapper and the row would stop redistributing.
            //
            // Staggered per card (index 0,1,2 -> 0/90/180ms) rather than one
            // Reveal around the whole row: three panels resolving in unison
            // read as a single slab dropping in, which loses the left-to-right
            // deal that makes the sequence legible as a sequence.
            <Reveal
              key={card.index}
              index={index}
              className={cn(
                "lg:basis-0",
                "transition-[flex-grow] duration-700 ease-[var(--ease-editorial)]",
                open ? "lg:grow-[2.4]" : "lg:grow-[1]",
              )}
            >
              <Link
                href={cta.href}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-label={`${card.name} — ${card.description}`}
                className={cn(
                  "group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8",
                  "transition-[background-color,color] duration-700 ease-[var(--ease-editorial)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
                  // Below lg every panel is open (see the description
                  // below), so every panel is inverted; the paper/ink
                  // split only exists where the row can actually collapse.
                  "bg-ink text-ink-foreground",
                  !open && "lg:bg-surface-1 lg:text-foreground",
                )}
              >
                {/* Decorative, so alt is empty — the panel's heading and
                    description already carry the meaning, and a translated
                    alt string would have to live in both content files for
                    artwork that is purely atmospheric. The scrim is what
                    keeps the type at contrast over any frame. */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-editorial)]",
                    !open && "lg:opacity-0",
                  )}
                >
                  <Image
                    src={PANEL_IMAGES[index]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/82" />
                </div>

                <div className="relative flex items-start justify-between gap-6">
                  <span
                    className={cn(
                      "label-caps text-ink-muted transition-colors duration-700",
                      !open && "lg:text-muted-foreground",
                    )}
                  >
                    {site.services.header.badge}
                  </span>
                  {/* The numeral is the closed panel's whole identity, so
                      it stays at display scale in both states and only
                      changes weight of presence via colour. */}
                  <span
                    aria-hidden
                    className={cn(
                      "font-heading text-5xl font-bold leading-none tracking-[-0.04em] text-ink-foreground/90 transition-colors duration-700 sm:text-6xl",
                      !open && "lg:text-foreground/20",
                    )}
                  >
                    .{card.index}
                  </span>
                </div>

                <div className="relative">
                  <h3
                    className={cn(
                      "max-w-[18ch] text-2xl font-bold leading-[1.1] text-ink-foreground transition-colors duration-700 sm:text-[1.75rem]",
                      !open && "lg:text-foreground",
                    )}
                  >
                    {card.name}
                  </h3>
                  {/* Grid-rows trick: the description animates between 0fr
                      and 1fr so it slides open without a measured height,
                      and it is never removed from the accessibility tree. */}
                  <div
                    className={cn(
                      // Always open below lg: on a touch device there is no
                      // hover to open a panel with, and tapping one
                      // navigates away — so a collapsed panel there would
                      // be content with no way to reach it.
                      "mt-4 grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-editorial)]",
                      !open && "lg:mt-0 lg:grid-rows-[0fr] lg:opacity-0",
                    )}
                  >
                    <p className="max-w-md overflow-hidden text-[0.9375rem] leading-relaxed text-ink-muted">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
