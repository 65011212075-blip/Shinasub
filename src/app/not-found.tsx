// Root-level fallback for paths that fall outside any matched `[locale]`
// segment (e.g. a malformed URL the proxy never rewrites into a locale).
// The locale-aware 404 that handles the normal case lives at
// src/app/[locale]/not-found.tsx; this one can't know the locale, so it
// defaults to English.
import NotFound from "./[locale]/not-found";

export default NotFound;
