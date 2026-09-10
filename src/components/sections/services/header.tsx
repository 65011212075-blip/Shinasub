import type { Site } from "@/content";
import { ArrowButton } from "@/components/ui/arrow-button";
import { PageHeader } from "@/components/sections/page-header";

export function ServicesHeader({ site }: { site: Site }) {
  const { eyebrow, h1, subline, cta, badge, tagline } = site.services.header;

  return (
    <PageHeader
      eyebrow={eyebrow}
      heading={h1}
      subline={subline}
      action={
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <ArrowButton href={cta.href} size="md">
              {cta.label}
            </ArrowButton>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {badge}
            </span>
          </div>
          <p className="text-sm text-muted-foreground/80">{tagline}</p>
        </div>
      }
    />
  );
}
