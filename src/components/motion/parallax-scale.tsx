"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxScaleProps = {
  children: ReactNode;
  className?: string;
  /** Scale at the start and end of the section's scroll runway. */
  from?: number;
  to?: number;
  /** Vertical drift in px across the same runway. */
  drift?: number;
};

/**
 * Scroll-linked scale + drift, used for the hero's visual layer: the
 * artwork grows and settles as the page scrolls past it, so leaving the
 * hero feels like moving *through* it rather than away from it.
 *
 * The raw scroll progress is passed through a soft spring before it drives
 * the transform. Binding scale directly to scroll position tracks a
 * trackpad's jitter one-to-one and looks mechanical; the spring gives the
 * layer a little weight without decoupling it from the scrollbar.
 */
export function ParallaxScale({
  children,
  className,
  from = 1,
  to = 1.22,
  drift = 0,
}: ParallaxScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useTransform(smooth, [0, 1], [from, to]);
  const y = useTransform(smooth, [0, 1], [0, drift]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <motion.div style={{ scale, y, transformOrigin: "center bottom" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
