import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import { getSite } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static (can't be derived per-locale for this special file's `alt` export)
// — left in English, the source language.
export const alt = `${getSite("en").name} — ${getSite("en").home.hero.h1}`;

// Satori (the OG-image renderer) can't fall back to a system font the way a
// browser does — Thai glyphs need an explicit font file. Google Fonts
// doesn't expose a stable direct URL, so this fetches the CSS to find the
// current one, then fetches the font binary it points to.
async function loadThaiFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@600&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((res) => res.text());
    const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    return fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as AppLocale;
  const site = getSite(locale);
  const thaiFont = locale === "th" ? await loadThaiFont() : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          // Mirrors the site's light palette: paper ground with the hero's
          // sky wash pooling in the upper corner. Values are literals
          // because Satori resolves no CSS custom properties — keep these
          // in sync with :root in globals.css.
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 88% 6%, rgba(203,228,246,0.95), transparent 58%), radial-gradient(circle at 6% 96%, rgba(234,244,251,0.9), transparent 52%)",
          color: "#080B0F",
          fontFamily: thaiFont ? "IBM Plex Sans Thai" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: "#1268E3" }} />
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 68, fontWeight: 700, letterSpacing: -2, maxWidth: 960, lineHeight: 1.04 }}>
          {site.home.hero.h1}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#6A7079", maxWidth: 820 }}>
          {site.home.hero.subline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: thaiFont ? [{ name: "IBM Plex Sans Thai", data: thaiFont, weight: 600 as const }] : undefined,
    },
  );
}
