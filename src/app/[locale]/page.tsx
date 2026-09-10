import type { Metadata } from "next";
import { resolvePageLocale } from "@/lib/locale";
import { getSite } from "@/content";
import { Hero } from "@/components/sections/home/hero";
import { CoreServices } from "@/components/sections/home/core-services";
import { Stats } from "@/components/sections/home/stats";
import { Statement } from "@/components/sections/home/statement";
import { ClosingCta } from "@/components/sections/home/closing-cta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);
  return { title: site.meta.home.title, description: site.meta.home.description };
}

export default async function Home({ params }: PageProps) {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);

  return (
    <>
      <Hero site={site} />
      <CoreServices site={site} />
      <Stats site={site} />
      <Statement site={site} />
      <ClosingCta site={site} />
    </>
  );
}
