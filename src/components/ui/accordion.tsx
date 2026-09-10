"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItem = {
  name: string;
  description: string;
};

/**
 * Stacked disclosure rows. One panel is open at a time, and the first is
 * open on load so the list is never a wall of closed bars.
 *
 * The panel body animates between `grid-rows-[0fr]` and `[1fr]` rather
 * than an explicit max-height: the row opens to exactly its content's
 * height at any viewport width, with no measurement and no magic number
 * that clips long copy at narrow widths. The body stays mounted, so the
 * text is always present for find-in-page and assistive tech, and
 * `aria-expanded`/`hidden`-free markup keeps the button/region pairing
 * honest.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.name}
            className={cn(
              "overflow-hidden rounded-2xl transition-colors duration-500",
              open ? "bg-surface-2" : "bg-surface-1",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                // Clicking the open row closes it, so the list can be
                // fully collapsed rather than forcing one row open.
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-start text-base font-medium text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:px-8"
              >
                <span>{item.name}</span>
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center text-muted-foreground"
                >
                  {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-editorial)]",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl px-6 pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground sm:px-8">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
