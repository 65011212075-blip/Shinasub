"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };
type State = { failed: boolean };

/**
 * WebGL context creation (or a driver-level three.js failure) can throw
 * during mount even after `hasWebGL()` passes — a class component is the
 * only way to catch that in React and drop back to the SVG scene instead
 * of taking the whole hero section down.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[3D] Falling back to static background:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
