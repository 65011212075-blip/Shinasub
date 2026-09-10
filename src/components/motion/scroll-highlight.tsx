"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollHighlightProps = {
  /** The statement. Wrap words in *asterisks* to set them in emphasis. */
  text: string;
  className?: string;
};

/**
 * A long statement that inks in word by word as the reader scrolls through
 * it: every word starts as pale grey and resolves to full ink when the
 * scroll position reaches its place in the sentence.
 *
 * One `useScroll` progress value drives all of the words — each word maps
 * its own narrow slice of that progress via `useTransform`, so there is a
 * single scroll listener for the section no matter how long the copy is,
 * and the interpolation runs on motion values rather than React state (no
 * re-render per frame).
 */
export function ScrollHighlight({ text, className }: ScrollHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Start when the section's top reaches ~80% down the viewport and finish
  // when its bottom passes the midpoint — the sentence completes slightly
  // before it scrolls away, so the reader sees the finished statement.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={cn(
        "font-heading text-3xl leading-[1.18] sm:text-4xl md:text-5xl lg:text-6xl",
        className,
      )}
    >
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          word={word}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1.6) / words.length]}
          disabled={prefersReducedMotion ?? false}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  disabled,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  disabled: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const emphasis = word.startsWith("*") && word.endsWith("*");
  const label = emphasis ? word.slice(1, -1) : word;

  return (
    <span className="relative mr-[0.25em] inline-block">
      {/* Pale ghost stays put so the line never reflows and the unread
          remainder of the sentence is still readable at low contrast. */}
      <span aria-hidden className="text-foreground/[0.14]">
        {label}
      </span>
      <motion.span
        // aria-hidden on the ghost + absolute overlay means the accessible
        // text comes from this copy only, so screen readers read the
        // sentence once, in order.
        //
        // Emphasis is colour, not italic: the display face ships a single
        // upright style, so an `italic` here would be a synthesised slant
        // — which at this size looks like a rendering fault rather than a
        // typographic choice.
        className={cn("absolute inset-0", emphasis && "text-brand")}
        style={{ opacity: disabled ? 1 : opacity }}
      >
        {label}
      </motion.span>
    </span>
  );
}
