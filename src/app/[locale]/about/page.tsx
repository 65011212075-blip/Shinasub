import type { Metadata } from "next";
import { resolvePageLocale } from "@/lib/locale";
import { getSite } from "@/content";
import { AboutHeader } from "@/components/sections/about/header";
import { Journey } from "@/components/sections/about/journey";
import { VisionMission } from "@/components/sections/about/vision-mission";
import { AboutCoreServices } from "@/components/sections/about/core-services";
import { Commitment } from "@/components/sections/about/commitment";
import { CtaBanner } from "@/components/sections/cta-banner";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);
  return { title: site.meta.about.title, description: site.meta.about.description };
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);

  return (
    <>
      <AboutHeader site={site} />
      <Journey site={site} />
      <VisionMission site={site} />
      <AboutCoreServices site={site} />
      <Commitment site={site} />
      <CtaBanner
        heading={site.about.ctaBanner.heading}
        body={site.about.ctaBanner.body}
        ctaLabel={site.about.cta.label}
        ctaHref={site.about.cta.href}
      />
    </>
  );
}
