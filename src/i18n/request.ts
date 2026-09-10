import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// This project manages its own translated content (src/content/en.ts /
// th.ts, resolved via getSite(locale)) rather than next-intl's message
// catalogs — next-intl is used here purely for locale routing
// (middleware, Link/useRouter, getLocale). `messages` is left empty.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: {},
  };
});
