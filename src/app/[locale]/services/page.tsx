import type { Metadata } from "next";
import { resolvePageLocale } from "@/lib/locale";
import { getSite } from "@/content";
import { ServicesHeader } from "@/components/sections/services/header";
import { Guide } from "@/components/sections/services/guide";
import { DesignImplementation } from "@/components/sections/services/design-implementation";
import { InstallationDeployment } from "@/components/sections/services/installation-deployment";
import { ManagedOperations } from "@/components/sections/services/managed-operations";
import { CtaBanner } from "@/components/sections/cta-banner";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);
  return { title: site.meta.services.title, description: site.meta.services.description };
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);

  return (
    <>
      <ServicesHeader site={site} />
      <Guide site={site} />
      <DesignImplementation site={site} />
      <InstallationDeployment site={site} />
      <ManagedOperations site={site} />
      <CtaBanner
        heading={site.services.ctaBanner.heading}
        body={site.services.ctaBanner.body}
        ctaLabel={site.services.cta.label}
        ctaHref={site.services.cta.href}
      />
    </>
  );
}
