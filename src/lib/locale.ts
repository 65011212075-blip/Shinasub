import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";

/** Shared by every page: validates the `[locale]` segment and opts the route into static rendering. */
export async function resolvePageLocale(params: Promise<{ locale: string }>): Promise<AppLocale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return locale as AppLocale;
}
