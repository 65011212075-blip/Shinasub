import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shinasub.com";

function localizedPath(route: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/contact"];

  return routes.map((route) => ({
    url: localizedPath(route, routing.defaultLocale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedPath(route, locale)]),
      ),
    },
  }));
}
