"use client";

import { useMemo, useRef, type RefObject } from "react";
// Named imports, not `import * as THREE` — the wildcard defeats
// tree-shaking and pulls in the whole of three.js (loaders, unused
// geometries, helpers) for the handful of symbols used here.
import { Color, BoxGeometry, EdgesGeometry, MathUtils, type Group } from "three";
import { useFrame } from "@react-three/fiber";

// Kept in sync with globals.css tokens.
const LAYERS = [
  { label: "cabling", color: "#22344E" }, // --border
  { label: "network", color: "#3FA0FF" }, // --accent
  { label: "wireless", color: "#93A6C2" }, // --text-secondary
  { label: "applications", color: "#E8944A" }, // --accent-copper
];

const STACKED_GAP = 0.12;
const EXPLODED_GAP = 0.85;
const boxGeometry = new BoxGeometry(3.2, 0.08, 1.8);
const edgesGeometry = new EdgesGeometry(boxGeometry);

/**
 * `progressRef` is read fresh inside `useFrame`, not passed as a plain
 * prop — this component only ever re-renders once (on mount); every
 * subsequent update comes from the parent calling the Canvas's
 * `invalidate()` on scroll, which fires exactly one `useFrame` tick that
 * picks up whatever `progressRef.current` is at that moment. No animation
 * loop, per the brief for this section.
 */
export function RackLayerScene({ progressRef }: { progressRef: RefObject<number> }) {
  const rootRef = useRef<Group>(null);
  const layerRefs = useRef<(Group | null)[]>([]);
  const colors = useMemo(() => LAYERS.map((l) => new Color(l.color)), []);

  useFrame(() => {
    const progress = progressRef.current;
    const gap = MathUtils.lerp(STACKED_GAP, EXPLODED_GAP, progress);
    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      const centered = i - (LAYERS.length - 1) / 2;
      layer.position.y = centered * gap;
    });
    const root = rootRef.current;
    if (root) root.rotation.x = MathUtils.lerp(0.5, 0.32, progress);
  });

  return (
    <group ref={rootRef} rotation={[0.5, 0, 0]}>
      {LAYERS.map((layer, i) => (
        <group key={layer.label} ref={(el) => { layerRefs.current[i] = el; }}>
          <mesh geometry={boxGeometry}>
            <meshBasicMaterial color={colors[i]} transparent opacity={0.5} />
          </mesh>
          <lineSegments geometry={edgesGeometry}>
            <lineBasicMaterial color={colors[i]} transparent opacity={0.8} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}
