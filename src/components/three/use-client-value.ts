"use client";

import { useSyncExternalStore } from "react";

const neverChanges = () => () => {};

/**
 * Reads a browser-only value (WebGL support, viewport width, device
 * concurrency, ...) safely: returns `serverValue` during SSR/first paint,
 * then the real client value once mounted. Built on useSyncExternalStore
 * rather than an effect + setState, which the project's
 * react-hooks/set-state-in-effect lint rule (and React's own guidance)
 * flags as a cascading-render anti-pattern for exactly this "read once on
 * mount" case.
 */
export function useClientValue<T>(getValue: () => T, serverValue: T): T {
  return useSyncExternalStore(neverChanges, getValue, () => serverValue);
}
