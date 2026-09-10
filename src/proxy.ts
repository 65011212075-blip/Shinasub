import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Legacy paths from the previous site. Handled here (exact, case-sensitive
// string match) rather than via next.config.ts `redirects()` — those are
// matched case-insensitively by Next.js by default, which made
// `/Contact` also match the new lowercase `/contact` and redirect it to
// itself in a loop.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/About-Us": "/about",
  "/Service": "/services",
  "/Contact": "/contact",
};

export default function proxy(request: NextRequest) {
  const legacyTarget = LEGACY_REDIRECTS[request.nextUrl.pathname];
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
