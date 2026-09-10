"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Long decelerating curve — the whole system's entrance easing. */
export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied by 90ms so siblings cascade in. */
  index?: number;
  /** Vertical travel distance in px for the entrance. */
  distance?: number;
  /** Blur radius the element sharpens *from*, in px. 0 opts out. */
  blur?: number;
  as?: "div" | "li" | "section" | "span";
};

/**
 * The single scroll-reveal primitive used across every page: content rises
 * a short distance, sharpens out of a blur, and fades in on a long
 * decelerating curve, once, the first time it enters the viewport.
 *
 * Deliberately one gesture for the entire site — the composed feel of the
 * scroll comes from every section entering *identically*, so the only
 * per-instance knobs are the stagger index and travel distance. Under
 * `prefers-reduced-motion` it collapses to a plain opacity fade with no
 * transform and no blur.
 */
export function Reveal({
  children,
  className,
  index = 0,
  distance = 26,
  blur = 8,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: {
          opacity: 0,
          y: distance,
          filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.9,
            ease: EASE_EDITORIAL,
            delay: index * 0.09,
          },
        },
      };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
