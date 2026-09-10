"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_EDITORIAL } from "./reveal";

type RollingNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/**
 * Odometer counter: each digit is a 0-9 strip that rolls up to its final
 * face when the figure scrolls into view.
 *
 * Chosen over a plain count-up because the digits stay in fixed columns —
 * a count-up through e.g. 1 -> 12 -> 120 changes width on almost every
 * frame, which shoves the label next to it around. Rolling strips reserve
 * the final width up front, so a row of these stays perfectly aligned
 * while they animate. Under `prefers-reduced-motion` the strips are simply
 * rendered at their final offset with no transition.
 */
export function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const formatted = value.toFixed(decimals);
  const characters = formatted.split("");

  return (
    <span ref={ref} className={cn("inline-flex items-baseline tabular-nums", className)}>
      {prefix}
      {characters.map((character, index) =>
        /\d/.test(character) ? (
          <Digit
            key={index}
            digit={Number(character)}
            // Left-to-right cascade, so the figure settles the way it
            // reads rather than all at once.
            delay={index * 0.07}
            settled={inView}
            instant={prefersReducedMotion ?? false}
          />
        ) : (
          <span key={index}>{character}</span>
        ),
      )}
      {suffix}
    </span>
  );
}

const FACES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Digit({
  digit,
  delay,
  settled,
  instant,
}: {
  digit: number;
  delay: number;
  settled: boolean;
  instant: boolean;
}) {
  // The strip is 10 faces tall, so one face is 10% of it. Offsetting by
  // `digit * 10%` of the strip's own height puts the wanted face in the
  // 1em window — a percentage transform, so it stays correct at every
  // font size without measuring anything.
  const target = `-${digit * 10}%`;

  return (
    // No explicit width: the strip stays in flow, so the column sizes to
    // the widest of its ten faces — identical for every column, at every
    // font size, without hard-coding an em value per typeface. The 1em
    // height plus overflow-hidden is what crops the strip to one face.
    <span aria-hidden className="inline-block h-[1em] overflow-hidden leading-[1em]">
      <motion.span
        className="flex flex-col items-center"
        initial={{ y: "0%" }}
        animate={{ y: settled || instant ? target : "0%" }}
        transition={
          instant
            ? { duration: 0 }
            : { duration: 1.5, ease: EASE_EDITORIAL, delay }
        }
      >
        {FACES.map((face) => (
          <span key={face} className="block h-[1em] leading-[1em]">
            {face}
          </span>
        ))}
      </motion.span>
      {/* The rolling strip is decorative; this keeps the real value in the
          accessibility tree and in the copyable text of the page. */}
      <span className="sr-only">{digit}</span>
    </span>
  );
}
