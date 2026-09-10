import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getSite } from "@/content";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default async function NotFound({ params }: { params?: Promise<{ locale: string }> }) {
  const rawLocale = params ? (await params).locale : undefined;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as AppLocale;
  const site = getSite(locale);
  const { eyebrow, heading, body, ctaHome, ctaContact } = site.notFound;

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="sky-wash absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[68vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[18ch] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [font-size:clamp(2.5rem,6.4vw,5rem)]">
          {heading}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ArrowButton href="/" size="lg">
            {ctaHome}
          </ArrowButton>
          <Link
            href="/contact"
            className="inline-flex h-[3.25rem] items-center rounded-full border border-foreground/10 bg-background px-7 text-base font-medium text-foreground transition-[transform,background-color] duration-300 ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            {ctaContact}
          </Link>
        </div>
      </div>
    </section>
  );
}
