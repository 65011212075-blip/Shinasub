"use client";

// Custom-built scene (see DESIGN_PLAN.md "3D layer"). Scroll-driven only —
// no ambient animation loop, per the brief for this section — so the
// canvas stays on `frameloop="demand"` and only re-renders when scroll
// progress actually changes.

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll, useMotionValueEvent } from "motion/react";
import { RackLayerScene } from "./scene";

const DESKTOP_BREAKPOINT = 1024;

export function RackLayerView() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const invalidateRef = useRef<(() => void) | null>(null);

  // This component only mounts on the client (dynamic ssr:false in
  // rack-layer-background.tsx), so it's safe to resolve these
  // synchronously on first render rather than via an effect that corrects a
  // tick later. The timing matters: resolving them in an effect lets a few
  // frames commit against the wrong values first, which on the
  // reduced-motion path meant movement was rendered before the frameloop
  // froze — exactly what the setting asks us not to do.
  const [isDesktop] = useState(() => window.innerWidth >= DESKTOP_BREAKPOINT);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 85%", "end 30%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = reducedMotion ? 0 : Math.min(1, Math.max(0, v));
    invalidateRef.current?.();
  });

  if (!isDesktop) return null;

  return (
    <div ref={wrapperRef} aria-hidden className="mt-10 h-[45vh] max-h-[420px] w-full">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.6, 5.5], fov: 40 }}
        onCreated={({ invalidate }) => {
          invalidateRef.current = invalidate;
        }}
      >
        <RackLayerScene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
