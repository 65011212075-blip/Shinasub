import Image from "next/image";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Site } from "@/content";

/**
 * Inverted closing band. The company name is set once at display scale
 * across the full width and clipped by the bottom of the page — it acts as
 * the sign-off, so the columns above it can stay small and quiet.
 */
export function Footer({ site }: { site: Site }) {
  const contactRows = [
    { icon: Mail, label: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Phone, label: site.contact.phone, href: site.contact.phoneHref },
    { icon: Printer, label: `${site.footer.faxLabel} ${site.contact.fax}` },
    { icon: MapPin, label: site.contact.addressShort },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src={site.logo.dark}
                alt={site.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="font-heading text-xl font-bold tracking-[-0.03em]">
                {site.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
              {site.footer.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted/80">
              {site.footer.body}
            </p>
          </div>

          <div>
            <h2 className="label-caps text-ink-foreground">{site.footer.columnHeading}</h2>
            <ul className="mt-6 space-y-3.5">
              {site.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label-caps text-ink-foreground">{site.contactPage.header.label}</h2>
            <ul className="mt-6 space-y-3.5">
              {contactRows.map((row) => {
                const Icon = row.icon;
                const body = (
                  <>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-2 text-ink-foreground">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-[0.9375rem] leading-snug">{row.label}</span>
                  </>
                );
                return (
                  <li key={row.label}>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="flex items-center gap-3 text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3 text-ink-muted">{body}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/10 py-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.footer.copyright}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>

      {/* Display-scale sign-off. `9vw` keeps it edge-to-edge at every width
          without a media query, and the bottom row is clipped by the page
          edge so it reads as a watermark rather than a heading. */}
      <p
        aria-hidden
        className="select-none pt-2 text-center font-heading font-bold leading-[0.78] tracking-[-0.04em] text-ink-foreground/[0.07]"
        style={{ fontSize: "min(9vw, 9rem)", marginBottom: "-0.18em" }}
      >
        {site.name}
      </p>
    </footer>
  );
}
