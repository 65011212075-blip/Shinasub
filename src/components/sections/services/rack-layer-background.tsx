"use client";

import dynamic from "next/dynamic";
import { hasWebGL } from "@/components/three/webgl-detect";
import { useClientValue } from "@/components/three/use-client-value";
import { CanvasErrorBoundary } from "@/components/three/canvas-error-boundary";

const RackLayerView = dynamic(
  () => import("@/components/three/rack-layer/rack-layer-view").then((m) => m.RackLayerView),
  { ssr: false, loading: () => null },
);

/**
 * The only WebGL on the site — the home hero's 3D backbone was replaced by
 * photography, so this is what's left of the 3D layer.
 *
 * No static fallback: this piece is explicitly optional decoration, so when
 * WebGL isn't available it renders nothing rather than substituting a
 * second visual. The import is loaded eagerly rather than deferred behind
 * `requestIdleCallback` — measured, deferring made Total Blocking Time
 * worse, because TBT is only counted after FCP, so pushing the chunk's
 * parse/execute to "just after idle" landed all of its cost inside the TBT
 * window instead of letting some overlap earlier work.
 */
export function RackLayerBackground() {
  const webglOk = useClientValue(hasWebGL, false);
  if (!webglOk) return null;

  return (
    <CanvasErrorBoundary fallback={null}>
      <RackLayerView />
    </CanvasErrorBoundary>
  );
}
