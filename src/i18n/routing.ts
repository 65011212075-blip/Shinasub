import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "th"],
  defaultLocale: "en",
  // English keeps the bare paths already established (/, /about, ...);
  // Thai is served under /th. Matches how the original (English-only)
  // site's URLs were already set up and referenced in redirects/SEO.
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
