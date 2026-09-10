"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Printer, Check, Copy } from "lucide-react";
import type { Site } from "@/content";
import { Reveal } from "@/components/motion/reveal";

const ICONS = { "map-pin": MapPin, phone: Phone, mail: Mail, printer: Printer } as const;

function CopyButton({
  value,
  copyLabel,
  copiedLabel,
}: {
  value: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently,
      // the value is still fully selectable/readable in the card.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="label-caps inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      aria-label={copied ? copiedLabel : copyLabel}
    >
      {copied ? (
        <Check className="size-3.5 text-success" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

export function InfoCards({ site }: { site: Site }) {
  const { copyLabel, copiedLabel } = site.contactPage;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-12">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {site.contactPage.cards.map((card, index) => {
          const Icon = ICONS[card.icon];
          return (
            <Reveal key={card.title} index={index}>
              <div className="flex h-full flex-col rounded-3xl bg-surface-1 p-7">
                <div className="grid size-11 place-items-center rounded-2xl bg-background text-brand">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h2 className="label-caps mt-6 text-muted-foreground">{card.title}</h2>
                {"href" in card && card.href ? (
                  <a
                    href={card.href}
                    className="mt-2 block text-[0.9375rem] leading-relaxed font-medium text-foreground transition-colors hover:text-brand"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 text-[0.9375rem] leading-relaxed font-medium text-foreground">
                    {card.value}
                  </p>
                )}
                <div className="mt-auto pt-5">
                  <CopyButton value={card.value} copyLabel={copyLabel} copiedLabel={copiedLabel} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
