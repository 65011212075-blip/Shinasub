"use client";

// HQ marker uses CSS 3D (perspective + translateZ), not a WebGL canvas —
// see DESIGN_PLAN.md "3D layer" for why: this is explicitly the smallest
// of the three 3D spots, and a second/third WebGL context for one small
// marker wasn't worth the bundle weight and GPU cost next to the Hero's
// real scene. Never replaces the Google Maps iframe or the coordinate text.

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { Site } from "@/content";
import { Reveal } from "@/components/motion/reveal";

const MAX_TILT_DEG = 5;

export function MapSection({ site }: { site: Site }) {
  const { heading, coordPrefix, building, image, loadCta } = site.contactPage.map;
  const { lat, lng, label: coordLabel } = site.contact.coords;
  const [loadMap, setLoadMap] = useState(false);
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reducedMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * MAX_TILT_DEG * 2, y: px * MAX_TILT_DEG * 2 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <Reveal className="overflow-hidden rounded-3xl bg-surface-1">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          {loadMap ? (
            <iframe
              title={`${building} — Google Maps`}
              src={`https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
              className="absolute inset-0 size-full"
              style={{ perspective: "1000px" }}
            >
              <button
                type="button"
                onClick={() => setLoadMap(true)}
                className="group absolute inset-0 size-full overflow-hidden focus-visible:outline-none"
                aria-label={`${loadCta} — ${building}`}
                style={
                  {
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                    transformStyle: "preserve-3d",
                    transition: "transform 300ms ease-out",
                  } as CSSProperties
                }
              >
                <Image
                  src={image}
                  alt={`${building}, ${site.contact.addressShort}`}
                  fill
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Floating pin, popped forward on the Z axis above the photo plane. */}
                <div
                  aria-hidden
                  className="absolute left-[46%] top-[38%]"
                  style={{ transform: "translateZ(48px)", transformStyle: "preserve-3d" }}
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute size-8 rounded-full bg-brand/30 blur-md motion-safe:animate-ping motion-reduce:hidden" />
                    <span className="relative flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_8px_20px_rgba(18,104,227,0.35)]">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                  </span>
                </div>

                <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 px-6 py-5 text-sm font-medium text-foreground">
                  <MapPin className="size-4 text-brand" aria-hidden />
                  {loadCta}
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-base font-bold tracking-[-0.01em] text-foreground">{heading}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{building}</p>
          </div>
          <p className="label-caps text-muted-foreground">
            {coordPrefix} <span className="font-mono">{coordLabel}</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
