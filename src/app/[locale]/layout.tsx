import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Special_Gothic, Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { getSite } from "@/content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

// Display face for every heading and the wordmark: a heavy, tightly-fitted
// grotesk that can carry the 80-120px headline sizes this layout is built
// around. Only 400/700 are used (nav/eyebrow labels vs. headlines), so the
// variable axis is pinned to those two cuts instead of shipping the whole
// range.
const headingFont = Special_Gothic({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  // next/font has no metrics for this face, so it cannot synthesise a
  // size-adjusted fallback (it says so at build time). Without an explicit
  // stack the swap would go from a default sans to a much narrower grotesk
  // — a visible reflow on the largest text on the page. These are the
  // closest widely-installed condensed grotesques, which keeps the
  // pre-swap line breaks close to the final ones.
  fallback: ["Arial Narrow", "Helvetica Neue Condensed", "Impact", "sans-serif"],
});

// Neo-grotesk body face. Kept at the three weights the UI actually uses:
// 400 body copy, 500 labels/nav, 600 emphasis.
const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Applied for the Thai locale (see globals.css `html[data-locale="th"]`) —
// neither Special Gothic nor Inter covers Thai glyphs, so Thai pages use
// this for both heading and body text instead of falling back to a generic
// system font. 700 is included because Thai headings have to stand in for
// Special Gothic's display weight. `preload: false` because next/font would
// otherwise preload these files on every English page too, even though
// nothing on an English page ever renders in this typeface — that was
// costing LCP on the majority-traffic locale for zero benefit.
const bodyThaiFont = IBM_Plex_Sans_Thai({
  variable: "--font-body-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shinasub.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as AppLocale;
  const site = getSite(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.meta.layout.title,
      template: `%s | ${site.name}`,
    },
    description: site.meta.layout.description,
    applicationName: site.name,
    keywords: [
      "ICT infrastructure Thailand",
      "system integrator Bangkok",
      "network installation",
      "structured cabling",
      "CCTV surveillance systems",
      "server room design",
      "fiber optic backbone",
    ],
    authors: [{ name: site.legalName }],
    alternates: {
      languages: {
        en: siteUrl,
        th: `${siteUrl}/th`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      url: locale === "th" ? `${siteUrl}/th` : siteUrl,
      siteName: site.name,
      title: site.meta.layout.title,
      description: site.meta.layout.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.meta.layout.title,
      description: site.meta.layout.description,
    },
    icons: {
      icon: "/images/Shinasub_Logo.png",
    },
  };
}

function OrganizationJsonLd({ site }: { site: ReturnType<typeof getSite> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.legalName,
    alternateName: site.name,
    url: siteUrl,
    logo: `${siteUrl}${site.logo.light}`,
    image: `${siteUrl}${site.logo.light}`,
    telephone: site.contact.phone,
    faxNumber: site.contact.fax,
    email: site.contact.email,
    foundingDate: site.founded.isoDate,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Room 2, Units 1501-1504, 15th Floor, Silom Edge Building, Silom Road, Suriyawong Subdistrict, Bang Rak District",
      addressLocality: "Bangkok",
      postalCode: "10500",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.coords.lat,
      longitude: site.contact.coords.lng,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);
  const site = getSite(locale);

  return (
    <html
      lang={site.htmlLang}
      data-locale={locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${bodyThaiFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Only needed so Navbar's use of next-intl's Link/usePathname (for
            the language switcher) has locale context on the client —
            translated content itself still flows through getSite(locale)
            as props, not next-intl's message system. */}
        <NextIntlClientProvider>
          <OrganizationJsonLd site={site} />
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-brand focus-visible:px-4 focus-visible:py-2 focus-visible:text-brand-foreground focus-visible:outline-none"
          >
            {site.skipToContent}
          </a>
          <Navbar site={site} locale={locale} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer site={site} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
