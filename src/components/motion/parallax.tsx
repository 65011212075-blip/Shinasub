"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Vertical travel in px across the element's full pass through the
   * viewport. Positive drifts down (slower than the page), negative drifts
   * up (faster). Give paired elements opposite signs so they separate.
   */
  distance?: number;
};

/**
 * Vertical scroll parallax for in-page elements.
 *
 * Distinct from `ParallaxScale`, which zooms a full-bleed plate over a
 * section's own scroll runway. This one just offsets an element against
 * the page as it passes through the viewport, which is what makes a pair
 * of images read as two separate planes rather than one flat block.
 *
 * Keep `distance` small — 20-40px. The effect should be noticeable only as
 * depth; past that it turns into visible sliding and the layout stops
 * feeling anchored. As with the hero, raw scroll drives a spring rather
 * than the transform directly, so trackpad jitter doesn't telegraph
 * straight through.
 */
export function Parallax({ children, className, distance = 28 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Full pass: from the element entering the bottom of the viewport to it
  // leaving the top. Symmetric, so the element sits at its natural
  // position exactly when it's centred on screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
