import Image from "next/image";
import {
  Wifi,
  Network,
  Camera,
  Globe,
  GitBranch,
  Server,
  Cable,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import type { Site, SystemSpec } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { RackLayerBackground } from "./rack-layer-background";

const ICONS: Record<SystemSpec["icon"], LucideIcon> = {
  wifi: Wifi,
  network: Network,
  cctv: Camera,
  globe: Globe,
  switch: GitBranch,
  server: Server,
  cable: Cable,
  "layout-grid": LayoutGrid,
};

// Two systems get a wider tile so the grid reads as a deliberate bento
// layout rather than eight uniform cards. With those two doubled, the eight
// systems occupy ten of the four-column grid's cells — the photo tile below
// takes the remaining two, which is what squares the grid off at three full
// rows instead of leaving a ragged half-row.
const WIDE_INDICES = new Set([0, 5]);

export function DesignImplementation({ site }: { site: Site }) {
  const { anchor, heading, intro, systems } = site.services.designImplementation;

  return (
    <section id={anchor} className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <SectionHeading eyebrow={site.services.header.eyebrow} heading={heading} intro={intro} />

      <RackLayerBackground />

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {systems.map((system, index) => {
          const Icon = ICONS[system.icon];
          return (
            <Reveal
              key={system.code}
              index={index % 4}
              className={WIDE_INDICES.has(index) ? "sm:col-span-2" : undefined}
            >
              <SpotlightCard className="h-full" glow={index % 3 === 0 ? "copper" : "brand"}>
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-11 place-items-center rounded-2xl bg-background text-brand">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[0.6875rem] font-medium text-success">
                    <span aria-hidden className="size-1.5 rounded-full bg-success" />
                    {system.status}
                  </span>
                </div>
                <p className="label-caps mt-6 text-muted-foreground">{system.code}</p>
                <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-foreground">
                  {system.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {system.description}
                </p>
              </SpotlightCard>
            </Reveal>
          );
        })}

        {/* Installed hardware in the field, breaking up a grid that is
            otherwise all icons and type. Decorative — the system cards
            carry the content — so the alt is empty. */}
        <Reveal index={2} className="sm:col-span-2">
          <div aria-hidden className="relative h-full min-h-[14rem] overflow-hidden rounded-3xl">
            <Image
              src="/images/cctv-dome.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 608px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
