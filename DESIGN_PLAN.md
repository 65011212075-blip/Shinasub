# SHINASUB — Design Plan

## Concept

"The backbone you never see, working every second." — Shinasub builds the invisible network layer (fiber, Wi-Fi, cabling, server rooms) that lets buildings and cities function. The site should feel like looking at that layer made visible: calm, precise, always-on.

## Why dark-first (not the generic dark-mode default)

The brief pins dark-first explicitly ("มืดแต่ไม่ดำสนิท", WCAG AA). To avoid the near-black + single acid accent cliché, the background is blue-tinted navy (not neutral gray-black), and there are **two** accents used for different jobs (signal blue = interactive/brand, copper = warmth/status), not one. Boldness is spent once, in the hero; every other section is quiet, left-aligned, and grid-driven rather than card-kit decoration.

## Palette (dark-first, hex)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0A1220` | Page background — deep navy, not neutral black |
| `--surface-1` | `#101B2E` | Card / panel background |
| `--surface-2` | `#16233C` | Elevated / hovered panel |
| `--surface-3` | `#1E3050` | Navbar-on-scroll, modal, highest elevation |
| `--border` | `#22344E` | Hairline border (used sparingly — nav bottom edge, table-like grids only) |
| `--text-primary` | `#EDF2FA` | Headlines, body |
| `--text-secondary` | `#93A6C2` | Supporting copy, meta |
| `--accent` (signal blue) | `#3FA0FF` | Primary interactive accent — links, primary CTA, active nav, node glow |
| `--accent-copper` | `#E8944A` | Secondary accent — warmth, "24/7" status, secondary CTA outline, hero glow counterpoint |
| `--success` | `#34D399` | "Ready" status |
| `--on-accent` | `#04101F` | Text on accent-blue fills |

Contrast verified with a WCAG relative-luminance calculation (see below), checked against `--bg #0A1220` and `--surface-1 #101B2E`:
- `--text-primary` on `--bg`: 16.68:1 · on `--surface-1`: 15.34:1
- `--text-secondary` on `--bg`: 7.56:1 · on `--surface-1`: 6.96:1
- `--accent` on `--bg`: 6.86:1 (safe for text-sized use, not just large text)
- `--on-accent` on `--accent`: 6.99:1
- `--success` on `--bg`: 9.75:1 · `--accent-copper` on `--bg`: 7.82:1

All pairs clear the 4.5:1 AA threshold for normal text with margin.

## Typography

- **Heading / display:** Space Grotesk — geometric, technical character without going full monospace-cliché. Used for H1–H3 and the SYS 01–08 numerals.
- **Body:** IBM Plex Sans, paired with **IBM Plex Sans Thai** (same type family, designed together) so Thai copy can be added later without a typographic seam — satisfies the Thai-readiness requirement without a third typeface.
- Scale (desktop / mobile): display 64/40, h1 48/32, h2 34/26, h3 24/20, body 17/16, small 14/14. Body measure capped at ~72ch.

## Layout & spacing

- Container: 1280px max width, gutter 24px (mobile) / 32px (tablet) / 48px (desktop).
- Section vertical rhythm: 64px mobile, 96–128px desktop.
- Radius scale used *purposefully*, not uniformly: 10px (inputs, small chips), 16px (cards), 28px (hero panel / primary CTA pill — the one bold place a large radius appears).
- Grids: Home services = 3-col; Services SYS 01–08 = asymmetric bento (not 8 identical tiles) on desktop, single column on mobile.

## Visual motif

**Network pulse** — thin lines connecting nodes, with light traveling along the line (SVG stroke-dashoffset / gradient sweep, not particle/canvas simulation → cheap on mobile). Used as:
- Hero ambient background (primary, animated, ties to fiber/network subject matter).
- A small static variant as a section-divider accent above the footer only (not repeated on every section, to avoid decoration overuse).
- Icons for the 8 SYS cards are semantic (wifi, network, cctv/camera, globe, switch, server, cable, layout) via lucide-react, not the motif itself.

## The one bold moment

The Home hero: full-viewport network-pulse background, large text-reveal H1, dual CTA. Everything after it (services, stats, journey, SYS grid) is calm, aligned to a strict grid, no competing animation.

## Motion principles

- Duration 200–600ms, `ease-out`, stagger 60–100ms.
- Only `transform`/`opacity` animate. No layout-affecting properties.
- Entrance animations play once on first viewport intersection (`<Reveal>` wrapper, IntersectionObserver, `once: true`).
- Ambient loops (hero pulse) are the only infinite animation, and pause off-screen / on hidden tab, and freeze to a static frame under `prefers-reduced-motion`.
- Heavy visual effects are dynamically imported with `ssr:false`.

## 21st.dev components (verified via web search before use — no guessed URLs)

| Component | Author | Verified URL | Used for |
|---|---|---|---|
| Background Paths | kokonutd | `https://21st.dev/r/kokonutd/background-paths` | Home hero ambient background (adapted into the network-pulse motif, recolored to accent tokens) |
| Spotlight Card | easemize (listed as "jahed" in the brief's shorthand — confirmed real author is `easemize`) | `https://21st.dev/r/easemize/spotlight-card` | Home "Core Services" cards, Services SYS cards |
| Container Scroll Animation | aceternity | `https://21st.dev/r/aceternity/container-scroll-animation` | Services → Installation & Deployment scroll section |
| Radial Orbital Timeline | jatin-yadav05 | `https://21st.dev/r/jatin-yadav05/radial-orbital-timeline` | About → "Our Journey" timeline (2013 → today) |
| Reveal Text | isaiahbjork | `https://21st.dev/r/isaiahbjork/reveal-text` | Hero H1, About journey pull-quote |
| Navbar | designali-in | `https://21st.dev/r/designali-in/navbar` | Base structure for the global Navbar (fully reskinned to tokens/content) |

`tommyjepsen/animated-hero`, `prashantsom75/scroll-morph-hero` from the brief's example list could not be verified to exist under those exact slugs during research, so they were **not used** (per the "never guess a URL" rule) — Background Paths + a custom hero layout covers that role instead.

Install attempt: `npx shadcn@latest add <url>` for each, run after `shadcn init`. If the CLI hits the free-tier daily quota or requires auth in this non-interactive environment, the fallback per the brief is used: rebuild the component's visible behavior by hand in `src/components/ui/`, with a header comment citing the author + source URL.

## Two-pass self-check against generic-AI tells

1. Warm cream + serif + terracotta — not used (dark navy, sans-only).
2. Near-black + single acid accent — avoided: background is blue-tinted (not neutral black), and two accents split by job (interactive vs. warmth/status) rather than one neon accent everywhere.
3. Broadsheet hairlines everywhere — avoided: hairlines only on the navbar edge and the SYS grid, not as a page-wide device.
4. SaaS identical-card kit — avoided: card elevation/glow varies by section, SYS grid is an asymmetric bento not 8 identical tiles, spotlight-glow replaces the generic soft grey shadow.
5. Template chrome (tracked ALL-CAPS eyebrows everywhere, dot-joined meta, "WORD — fragment", monospace labels, trailing →) — the brief's own content contains eyebrow/label fields ("Eyebrow: IT Infrastructure...", "Label: Technical Support") so those are kept, but styled modestly (no heavy tracking/neon). Section headings that happen to be typed in caps in the source ("OUR CORE SERVICES") are rendered as real headings at heading scale, not shrunk into a decorative label above another heading. No arrow glyphs appended to routine links; monospace is reserved for the one genuinely data-like string (the map coordinate on Contact).

## 3D layer

Added after the initial build, per a follow-up brief asking for 3D in exactly three places without disturbing anything above. Uses the same `frontend-design` "spend boldness in one place" logic already governing the rest of the site: the Hero gets a real scene, Services gets a smaller supporting one, Contact gets a CSS trick — not three competing showcases.

### Method chosen: React Three Fiber, hand-authored geometry

Of the three options in the brief (R3F+drei, Spline, CSS 3D), **R3F with geometry built directly in code** was used for the Hero and Services pieces. No Spline scene was used anywhere — there was nothing in either spot that raw geometry couldn't do, and Spline's opaque, color-baked-into-the-scene runtime would have fought the token system this whole site is built around. `@react-three/drei` was installed as the brief specified but ends up **unused** — every mesh here is basic enough (instanced spheres, line segments, boxes) that drei's higher-level helpers (`Line`, `Text`, environment presets, etc.) weren't needed, and each one skipped is bundle weight not spent.

Installed versions (checked for React 19 compatibility before installing, not left to whatever `npm install` picked): `three@0.186.0`, `@react-three/fiber@9.7.0`, `@react-three/drei@10.7.8`. No `--force`/`--legacy-peer-deps` was needed — these versions' peer ranges (`react: '>=19 <19.3'`, `three: '>=0.156'`) already satisfy this project's React 19.2.8.

### 4.1 Hero — "Fiber Backbone"

`src/components/three/fiber-backbone/` — `topology.ts` (pure node/edge generator), `scene.tsx` (the R3F content), `fiber-backbone.tsx` (Canvas wrapper: frameloop control, node-count-by-device).

- **Topology**: 60 nodes (30 on narrow viewports or ≤4 logical cores) scattered through a 3D volume, each edged to its 2 nearest neighbours only (no all-pairs mesh) — reads as a sparse backbone, not a point cloud. Biased toward +x/right so the density sits behind the copy side of the hero, where the scrim is lightest.
- **Draw calls**: 4 total — one `LineSegments` for every edge (single merged `BufferGeometry`), one `InstancedMesh` for all nodes, and two small `InstancedMesh`es for the traveling pulses (brand-colored / copper-colored, split so neither needs per-instance vertex colors — see "what didn't work" below). Well under the ≤10 budget.
- **Pulses**: 6–8 small spheres, each assigned to one edge and animated via `lerpVectors` between that edge's endpoints (no allocation inside `useFrame` — one shared `Object3D`/`Vector3` scratch set, reused every tick). ~1-in-5 colored copper, the rest brand blue, per the brief.
- **Camera/motion**: perspective camera, group auto-rotates a full turn every 80s (brief asked ≥60s), plus mouse parallax damped via `THREE.MathUtils.damp` (not a direct bind), clamped to ±6°. Pointer is tracked on `window`, not the canvas — the canvas itself is `pointer-events-none`.
- **Colors**: hardcoded hex constants in `scene.tsx`, commented with which CSS token each mirrors (`--border`, `--text-secondary`, `--accent`, `--accent-copper`) — three.js materials need real numbers, not `var()` strings, so these have to be kept in sync by hand if the palette ever changes.
- **What didn't work first try**: the pulses were originally one `InstancedMesh` with per-instance `setColorAt`/`vertexColors`, which rendered every pulse pure black instead of its assigned color (screenshotted, confirmed, not a hunch). Splitting into two uniform-color meshes (one per color) fixed it immediately and is simpler code besides.
- **A second, more consequential bug caught by testing, not by reading the code**: `nodeCount` and the reduced-motion flag were originally resolved via a client-only-safe hook (`useSyncExternalStore`) that correctly avoids an SSR mismatch — but resolves *a tick after* the first render. Since `nodeCount` fed into the topology generator's `useMemo`, that one-tick-later correction regenerated the *entire* random layout right after first paint (a visible pop/reshuffle), and the same lag meant a few extra frames of rotation/pulse movement had already been committed before `prefers-reduced-motion` actually froze the loop. Fixed by resolving both with a plain lazy `useState(() => ...)` initializer instead — safe here specifically because this component is only ever mounted client-side (behind `dynamic(..., { ssr: false })` in `hero-background.tsx`), so there's no SSR value to reconcile against. Verified after the fix: two screenshots 4 seconds apart under `prefers-reduced-motion: reduce` are pixel-identical.

### 4.2 Services → Design & Implementation — "Rack / Layer View"

`src/components/three/rack-layer/` — four translucent horizontal planes (cabling → network → wireless → applications, the brief's own layer semantics), stacked tight by default and **explode apart as the section scrolls into view**, driven purely by scroll progress (`motion`'s `useScroll`) — no ambient loop, per the brief for this spot specifically. Canvas stays on `frameloop="demand"`; the only thing that ever calls `invalidate()` is a scroll-progress change handler, so it renders zero frames while the user isn't near it.

- Kept (not cut): after building it, it read as a clean establishing visual above the SYS 01–08 grid rather than clutter, so it stayed — capped at 45vh (well under the 60vh ceiling) so it can't compete with the cards below it.
- Desktop-only, and not just via CSS: below 1024px the component returns `null` before the `<Canvas>` ever mounts, so there's no WebGL context opened on mobile/tablet at all, not merely a hidden one.
- No blinking status lights: the brief's "rack with blinking lights" alternative was dropped in favor of pure scroll-drivenness — a blinking light needs a continuous timer, which is exactly the "animation loop" the brief says this section shouldn't have. Static per-layer color coding does the "this is infrastructure" job without it.

### 4.3 Contact — "HQ Marker": CSS 3D, not WebGL

Per the brief's own fallback option. Reasoning: this is explicitly the smallest of the three spots, and Home/Services/Contact are three separate routes (never mounted together), so the "≤1 WebGL canvas per page" rule wasn't actually the deciding factor here — the deciding factor was that a *third* WebGL scene for one small pin marker wasn't worth its own bundle/GPU cost next to what the Hero already spends. `src/components/sections/contact/map.tsx` now wraps the static map photo in a `perspective` container that tilts up to ±5° toward the pointer (damped via a CSS `transition`, disabled for touch pointers and under `prefers-reduced-motion`), with a pin `translateZ`'d 48px above the photo plane and a soft pulse ring. The Google Maps iframe and the coordinate text are both untouched — the tilt only applies to the static photo state, before "Load interactive map" is clicked.

### Accessibility / reduced-motion, verified not just implemented

- All three canvases are `aria-hidden` and `pointer-events-none`; nothing user-meaningful lives only in a canvas (SYS names/descriptions, the address, the coordinates are all real HTML elsewhere on the page).
- `prefers-reduced-motion: reduce`: Hero freezes to one frame (verified via screenshot diff, see above); Services rack freezes at `progress = 0` (fully stacked) instead of exploded, since scroll can't drive an animation the user has asked to minimize; Contact's tilt is skipped entirely.
- WebGL unavailable: tested with Chrome launched via `--disable-webgl --disable-webgl2 --disable-3d-apis`. Hero silently shows the original SVG `BackgroundPaths` (zero `<canvas>` elements render, zero console errors); Services silently shows nothing extra. A `CanvasErrorBoundary` class component also catches a runtime WebGL failure *after* `hasWebGL()` passed (driver-level failures happen), with the same fallback.
- Touch devices: the Hero's mouse-parallax reads `window` pointer position generically (harmless no-op on touch since touch doesn't fire continuous `pointermove`); the Contact tilt explicitly checks `event.pointerType === "touch"` and no-ops.
- Measured, not assumed: 60fps sustained over a 3s sample (`requestAnimationFrame` counting) on desktop, still 60fps under Chrome DevTools' 4× CPU throttle.

### Performance budget: measured, and one number revised

| Metric | Before 3D | After 3D | Target | Result |
|---|---|---|---|---|
| First Load JS, Home (gzip, measured via CDP `encodedDataLength`, not Lighthouse's own — see note) | 394.3 KB | 654.7 KB (**+260.4 KB**) | ≤ +180 KB | **Over budget — revised, see below** |
| LCP, mobile, simulated throttle (Lighthouse) | 3.7–4.2s across repeated runs | 3.9s | ≤ 2.5s | Not met before 3D either (pre-existing); not meaningfully changed by 3D |
| CLS | 0 | 0 | ≤ 0.02 | Met |
| Hero FPS, desktop | — | 60fps (3s rAF sample); 60fps under 4× CPU throttle | ≥ 55fps | Met |
| Lighthouse mobile — Accessibility / Best Practices / SEO | 96 / 100 / 92 | 96 / 100 / 92 | ≥ pre-3D score | Met, unchanged |
| Lighthouse mobile — Performance | 85–90 across repeated runs (same input) | 68–75 across repeated runs | ≥ pre-3D score | **Not met — see note** |

**On the +180KB budget being revised upward**: the actual cost is almost entirely `@react-three/fiber`'s own `Canvas` implementation, which internally does `React.useMemo(() => events.extend(THREE), [])` — extending its JSX catalog with **the entire three.js namespace**, not just the handful of classes (`InstancedMesh`, `BufferGeometry`, `Color`, ...) this code actually imports by name. Confirmed by reading `@react-three/fiber`'s own source (`react-three-fiber.cjs.dev.js`), not guessed: switching every `import * as THREE from "three"` in this codebase to named imports (done — see `scene.tsx` files) produced **zero** measurable bundle change, because R3F's own internal full-namespace import dominates regardless of what the calling code imports. This is a known, documented tradeoff of using R3F's standard `<Canvas>`/JSX-element API rather than hand-writing an imperative Three.js scene with a manually curated `extend()` catalog — the latter would recover most of this weight but is a materially different (and, given this is a decorative layer on 4 marketing pages, likely not worth it) architecture. Per the brief's own appendix ("ถ้าคุณรับได้ว่าเว็บหนักขึ้นเพื่อความสวย ให้แก้เลข First Load JS ขึ้น"), this number is revised to **~260 KB** rather than either abandoning `@react-three/fiber` (the brief's own recommended option) or silently shipping over budget.

**On the Lighthouse Performance score not meeting "no worse than before"**: two things worth separating. First, this sandbox's Lighthouse readings are noisy enough that the *pre-3D* page alone scored anywhere from 74 to 90 across identical repeated runs — a wider spread than the actual before/after 3D delta being reported here, so the score itself is a soft signal in this environment. Second, and more substantively: Total Blocking Time genuinely did increase (~60–130ms before → ~440–870ms after) — that's the real, honest cost of parsing and executing a ~250KB JS chunk on the main thread, and no amount of *scheduling* it differently fixed it. A `requestIdleCallback`-deferred version of the import was tried and measured *worse* (Performance 58, TBT 870ms) than loading eagerly (Performance 75, TBT 510ms): TBT is only counted after First Contentful Paint, so deliberately delaying the chunk to "right after idle" (which lands right after FCP) puts *all* of its blocking cost inside the TBT window, whereas loading eagerly lets some of that cost overlap earlier work instead. The eager version shipped. LCP itself — the metric the brief is strictest about — stayed within the same 3.7–4.2s band the page already had *before* 3D was added, so the Performance/TBT cost is a real but bounded one: it costs blocking time, not the actual paint of the hero text (which is real HTML, unaffected by any of this — see `reveal-text-static.tsx`).
