"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { Site } from "@/content";
import { cn } from "@/lib/utils";
import { ArrowButton } from "@/components/ui/arrow-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar({ site, locale }: { site: Site; locale: AppLocale }) {
  // `usePathname` here is next-intl's — it returns the path with the
  // locale prefix already stripped (e.g. always "/about"), which is what
  // both the active-link check and the language switcher need.
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on navigation. Adjusted during render (per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  // instead of an effect, so it can't cause an extra cascading render.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const otherLocale: AppLocale = locale === "en" ? "th" : "en";

  return (
    <header
      className={cn(
        // The bar is opaque from the first pixel rather than fading in on
        // scroll: the hero behind it is a pale sky wash, and a transparent
        // bar left the near-black wordmark floating with nothing to sit on.
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-500",
        scrolled ? "border-border shadow-[0_1px_24px_-16px_rgb(8_11_15/0.5)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <Image
            src={site.logo.light}
            alt={site.name}
            width={32}
            height={32}
            className="h-7 w-7 object-contain"
            priority
          />
          <span className="font-heading text-xl font-bold tracking-[-0.03em] text-foreground">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "label-caps relative py-2 transition-colors duration-300",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {/* Underline grows from the centre on hover and stays put
                    on the current page — one shared element, so hovering
                    the active link doesn't double-draw it. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-center bg-foreground transition-transform duration-300 ease-[var(--ease-editorial)]",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div
            role="group"
            aria-label={site.languageSwitcher.label}
            className="flex items-center rounded-full border border-border p-0.5 text-[0.6875rem] font-semibold tracking-wide"
          >
            <Link
              href={pathname}
              locale="en"
              aria-current={locale === "en" ? "true" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors duration-300",
                locale === "en"
                  ? "bg-ink text-ink-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {site.languageSwitcher.en}
            </Link>
            <Link
              href={pathname}
              locale="th"
              aria-current={locale === "th" ? "true" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors duration-300",
                locale === "th"
                  ? "bg-ink text-ink-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {site.languageSwitcher.th}
            </Link>
          </div>

          <ArrowButton href={site.navCta.href} size="sm">
            {site.navCta.label}
          </ArrowButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <button
            type="button"
            aria-label={site.mobileMenuLabel}
            onClick={() => setOpen(true)}
            className="-me-2 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
          <SheetContent side="right" className="w-full max-w-xs border-border bg-background">
            <SheetHeader>
              <SheetTitle className="font-heading text-xl font-bold tracking-[-0.03em]">
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
              {site.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <SheetClose key={item.href} render={<Link href={item.href} />}>
                    <span
                      className={cn(
                        "block rounded-xl px-4 py-3.5 font-heading text-2xl font-bold tracking-[-0.02em] transition-colors",
                        active ? "bg-surface-1 text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                  </SheetClose>
                );
              })}

              <div
                role="group"
                aria-label={site.languageSwitcher.label}
                className="mt-4 flex items-center gap-2 px-4"
              >
                <SheetClose
                  render={<Link href={pathname} locale={otherLocale} />}
                  className="label-caps text-foreground underline underline-offset-4"
                >
                  {otherLocale === "th" ? site.languageSwitcher.th : site.languageSwitcher.en}
                </SheetClose>
              </div>

              {/* A plain link rather than ArrowButton: SheetClose needs to
                  own the rendered element to attach its close handler, and
                  ArrowButton renders its own Link internally. Matches the
                  pattern the nav items above already use. */}
              <SheetClose
                render={<Link href={site.navCta.href} />}
                className="mx-4 mt-4 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-ink-foreground transition-colors hover:bg-ink-2"
              >
                {site.navCta.label}
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
