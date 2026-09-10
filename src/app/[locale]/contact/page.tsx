import type { Metadata } from "next";
import { resolvePageLocale } from "@/lib/locale";
import { getSite } from "@/content";
import { ContactHeader } from "@/components/sections/contact/header";
import { InfoCards } from "@/components/sections/contact/info-cards";
import { MapSection } from "@/components/sections/contact/map";
import { ContactForm } from "@/components/sections/contact/contact-form";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);
  return { title: site.meta.contact.title, description: site.meta.contact.description };
}

export default async function ContactPage({ params }: PageProps) {
  const locale = await resolvePageLocale(params);
  const site = getSite(locale);

  return (
    <>
      <ContactHeader site={site} />
      <InfoCards site={site} />
      <MapSection site={site} />
      <ContactForm site={site} locale={locale} />
    </>
  );
}
