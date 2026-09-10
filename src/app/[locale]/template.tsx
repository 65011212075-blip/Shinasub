"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_EDITORIAL } from "@/components/motion/reveal";

/**
 * Next.js re-mounts `template.tsx` on every navigation (unlike layout.tsx),
 * which is what makes a page-level transition possible here.
 *
 * Deliberately the mildest gesture on the site — a short rise and fade on
 * the same curve as every section reveal, with no blur. The page's own
 * first section is already blur-rising in behind this, and stacking two
 * blurs made arriving on a page feel like the browser had stalled.
 */
export default function Template({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: EASE_EDITORIAL,
      }}
    >
      {children}
    </motion.div>
  );
}
