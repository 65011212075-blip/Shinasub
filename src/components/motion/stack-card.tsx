"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type StackCardProps = {
  children: ReactNode;
  /** Position in the deck — drives stacking order and the pinned offset. */
  index: number;
  /** How many cards are in the deck, used to size the last card's runway. */
  total: number;
  className?: string;
};

/**
 * One panel of a sticky "deck": each card pins near the top of the
 * viewport, and the following card scrolls up over it, so the section
 * reads as a stack being dealt rather than a list being scrolled.
 *
 * Built on `position: sticky` plus an ascending z-index, which the browser
 * pins on the compositor — no scroll handler is needed for the pinning
 * itself. The only scroll-linked work is the outgoing card's slight
 * scale-down and dim, which is what stops the covered card from looking
 * like a flat sheet of paper behind the new one. Each card gets a small
 * downward offset so the earlier cards' top edges stay visible as a spine.
 *
 * Under `prefers-reduced-motion` the deck degrades to plain stacked
 * blocks: no pinning, no scaling.
 */
export function StackCard({ children, index, total, className }: StackCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Progress of *this* card being covered: 0 while it is the top card,
  // 1 once it has been fully overtaken.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.12", "end 0.35"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("mb-4 overflow-hidden rounded-3xl", className)}>{children}</div>
    );
  }

  return (
    <div
      ref={ref}
      className="sticky"
      style={{
        // Stagger the pin points so each card parks a little lower than
        // the one before it, leaving a visible spine of earlier cards.
        top: `calc(4.5rem + ${index * 1.25}rem)`,
        zIndex: index + 1,
        // The last card needs no runway; the others need enough room below
        // them that the next card can travel over before the section ends.
        marginBottom: index === total - 1 ? 0 : "1.25rem",
      }}
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: "center top" }}
        className={cn("overflow-hidden rounded-3xl", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
