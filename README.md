# SHINASUB — corporate website

Next.js (App Router) rebuild of shinasub.com — see `DESIGN_PLAN.md` for the design system,
2D-component, and 3D-layer rationale.

## Stack

- Next.js 16 (App Router, `src/`), TypeScript (`strict`), Tailwind CSS v4
- `next-intl` for English/Thai routing (`/` = English, `/th` = Thai) — see "Internationalization" below
- `three` + `@react-three/fiber` for the Hero and Services 3D scenes — see "3D layer" below
- shadcn/ui (Base UI primitives) for form controls, sheet, badge, card
- `motion` for scroll/entrance animation, plain CSS keyframes for the Hero H1 (see below)
- `react-hook-form` + `zod` + a Server Action for the contact form
- `lucide-react` icons, `next/image`, `next/font` (Space Grotesk + IBM Plex Sans / IBM Plex Sans Thai)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run lint      # ESLint
npx tsc --noEmit  # type-check
npm run build     # production build
```

All three currently pass clean.

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Used in metadata, sitemap, robots, JSON-LD. Defaults to `https://www.shinasub.com`. |
| `RESEND_API_KEY` | Optional | Enables real email delivery for the contact form via [Resend](https://resend.com). Without it, submissions are logged server-side (`src/lib/actions.ts`) and the form still reports success, so the flow is reviewable end-to-end without live credentials. |

## Internationalization

English (`/`, `/about`, `/services`, `/contact`) and Thai (`/th`, `/th/about`, `/th/services`,
`/th/contact`) — English keeps the un-prefixed paths the original site already used; Thai is
additive under `/th`. Routing is `next-intl` (`src/i18n/`, `src/proxy.ts`), but **translated content
is not next-intl's message-catalog system** — it's two plain typed objects,
`src/content/en.ts` and `src/content/th.ts`, both satisfying the same `Site` type from
`src/content/types.ts`, resolved via `getSite(locale)` and passed down as a normal `site` prop from
each page/layout to its section components. That keeps every existing component's shape (`site.home.hero.h1`, etc.) unchanged — only the import site moved from a static `site.ts` to
`getSite(locale)`. next-intl itself is used only for the parts that are genuinely routing: the
`[locale]` segment, middleware/redirect handling, and the locale-aware `Link`/`usePathname` used by
the navbar's language switcher.

To add a third field to any page, add it to `src/content/types.ts` first (TypeScript will then
require it in **both** `en.ts` and `th.ts` — that's deliberate, it's what catches a missed
translation at compile time instead of at runtime).

Legal name, phone/fax/email, coordinates, and image paths are intentionally identical in both
locale files rather than factored out — simpler to keep every locale file fully self-contained than
to split "translatable" from "static" data for a 4-page site.

## Redirects

`src/proxy.ts` (Next.js renamed `middleware.ts` → `proxy.ts` in v16; the file convention, not just
this project, changed) handles two things: the legacy capitalized paths from the old site
(`/About-Us` → `/about`, `/Service` → `/services`, `/Contact` → `/contact`, exact case-sensitive
string match) before handing off to `next-intl`'s own middleware for locale detection/rewriting.
`experimental.caseSensitiveRoutes: true` in `next.config.ts` is a second layer of the same fix —
Next's default case-insensitive matching would otherwise make `/Contact` also match the canonical
lowercase `/contact` and redirect it to itself.

## 3D layer

Three 3D touchpoints, per a follow-up brief — full rationale, the scene-by-scene breakdown, and the
measured performance budget (including where it went **over** the originally-specified bundle-size
target, and why) are in `DESIGN_PLAN.md` under "3D layer". Short version:

- **Home hero** (`src/components/three/fiber-backbone/`) — the one bold 3D moment: a network of
  ~60 nodes with traveling light pulses along a subset of edges, ambient (slow auto-rotate + damped
  mouse parallax). Falls back to the original SVG background if WebGL is unavailable or a runtime
  error occurs (`CanvasErrorBoundary`), and freezes to a single static frame under
  `prefers-reduced-motion`.
- **Services → Design & Implementation** (`src/components/three/rack-layer/`) — four layered planes
  that explode apart as the section scrolls into view. Scroll-driven only (no ambient loop), desktop
  only (the `<Canvas>` never mounts below 1024px, not just CSS-hidden).
- **Contact map** (`src/components/sections/contact/map.tsx`) — CSS 3D (`perspective` +
  `translateZ`), not WebGL: a pointer-tilt on the static map photo with a floating pin marker.
  Chosen over a third WebGL scene deliberately — see DESIGN_PLAN.md for why.

**To disable the 3D layer** (e.g. if the bundle-size tradeoff documented in DESIGN_PLAN.md isn't
acceptable): in `src/components/sections/home/hero-background.tsx`, remove the `webglOk` branch so
`HeroBackground` always returns `<BackgroundPaths />`; in
`src/components/sections/services/rack-layer-background.tsx`, make it always return `null`. Then
`npm uninstall three @react-three/fiber @react-three/drei @types/three`, remove
`transpilePackages: ["three"]` from `next.config.ts`, and delete `src/components/three/`.

## 21st.dev components

Six 21st.dev community components were identified for reuse (URLs verified via web search before
use, never guessed — see `DESIGN_PLAN.md` for the full table with sources). Installing any of them
via `npx shadcn add <21st.dev url>` returned `Authentication required` in this environment (the
21st.dev registry requires a logged-in/API-key session for the shadcn CLI to pull from), and no
21st MCP server was available to configure non-interactively. Per the brief's own fallback for
this situation, each component's visible behavior was rebuilt by hand in `src/components/ui/`,
styled to this project's tokens, with a header comment in each file citing the original author and
URL:

- `background-paths.tsx` — kokonutd/background-paths (Hero ambient background — since superseded by
  the 3D scene as the primary background, kept as its fallback)
- `spotlight-card.tsx` — easemize/spotlight-card (service + SYS cards)
- `container-scroll.tsx` — aceternity/container-scroll-animation (Installation & Deployment)
- `radial-orbital-timeline.tsx` — jatin-yadav05/radial-orbital-timeline (About → Our Journey)
- `reveal-text.tsx` — isaiahbjork/reveal-text (below-the-fold text reveals)
- `navbar.tsx` — designali-in/navbar (base structure for the global Navbar)

If 21st MCP access becomes available later, these can be swapped for the real registry components
without changing any call sites — each one exposes the same simple props its section already uses.

## Project structure

```
src/
  app/
    [locale]/                 layout.tsx, template.tsx, page.tsx, about/, services/, contact/,
                               not-found.tsx, opengraph-image.tsx — everything locale-scoped
    sitemap.ts, robots.ts     locale-agnostic; sitemap lists both locales with hreflang alternates
    not-found.tsx             root fallback for paths outside any matched [locale] segment
  i18n/                       routing.ts, navigation.ts, request.ts (next-intl config)
  proxy.ts                    legacy-path redirects + next-intl middleware (see "Redirects")
  components/
    ui/                       shadcn/ui components + the hand-built 21st.dev-inspired ones
    three/                    fiber-backbone/, rack-layer/, + shared helpers (webgl-detect,
                               use-canvas-active, use-client-value, canvas-error-boundary)
    layout/                   Navbar, Footer (both take `site` + `locale` as props)
    sections/                 per-page section components (home/, about/, services/, contact/) —
                               each takes `site: Site` as a prop, not a module-level import
    motion/                   Reveal (scroll-reveal wrapper used site-wide), Counter (number ticker)
  content/
    types.ts                  the `Site` type — the single shape both locale files must satisfy
    en.ts / th.ts              the actual copy, one file per locale
    index.ts                  getSite(locale) — resolves which of the above to use
  lib/                        cn, contact-schema.ts (zod), actions.ts (contact Server Action),
                               locale.ts (resolvePageLocale — shared by every page)
```

## Notable implementation decisions

- **Hero H1 uses plain CSS, not `motion`** (`reveal-text-static.tsx` + the `.word-reveal` keyframes
  in `globals.css`). An earlier version used the same `motion`-driven reveal as the rest of the
  page; testing showed that leaves the LCP-critical headline at `opacity:0` until JS hydrates,
  which risks the brief's "Hero LCP < 2.5s" target on a slow connection. The CSS version paints
  immediately regardless of hydration timing. Every other scroll-reveal on the site still uses
  `motion`'s `whileInView`, which is normal and doesn't affect LCP since those sections start below
  the fold.
- **`RevealText` drives its staggered children from one `useInView` observer**, not one
  `whileInView` per chunk. An earlier per-chunk version reliably left later chunks stuck at their
  hidden state in testing (only the first chunk would ever reveal) — a single observer controlling
  all children via `animate` fixed it and is also fewer IntersectionObservers.
- **The Hero's ambient background sits behind a left-to-right scrim** (`from-background
  via-background/75 to-transparent`) so the network-pulse lines/nodes recede behind the headline
  instead of visually crossing through the letters — this applies to both the SVG version and the
  3D scene.
- **3D scene state (node positions, reduced-motion) is resolved via a lazy `useState(() => ...)`
  initializer, not an SSR-safe `useSyncExternalStore` hook**, even though the latter is used
  elsewhere in this codebase for the same "read a browser API on mount" problem. The two 3D scene
  components are guaranteed client-only (behind `dynamic(..., { ssr: false })`), so there's no SSR
  value to reconcile — and testing showed the one-tick-later correction that
  `useSyncExternalStore` involves was regenerating the entire random node layout right after first
  paint (visible pop) and letting a few extra frames of motion through before
  `prefers-reduced-motion` froze the scene. See DESIGN_PLAN.md "3D layer" for the before/after
  screenshots that caught this.

## What wasn't possible / needs a decision

- **21st MCP** wasn't configured (needs a login/API key this environment doesn't have) — see above.
- **Email delivery** is mocked until `RESEND_API_KEY` is set.
- **The 3D bundle-size budget** (originally ≤+180KB gzip) was revised upward to ~+260KB — root
  cause and reasoning in DESIGN_PLAN.md "3D layer". This is inherent to `@react-three/fiber`'s
  `<Canvas>` (it internally extends its JSX catalog with the entire three.js namespace, confirmed by
  reading its source), not fixable without dropping the brief's own recommended library.
- **Lighthouse Performance score** dropped from an (already noisy, 74–90 across repeated runs)
  baseline to 68–75 after adding 3D — a real cost (~250KB of JS to parse/execute costs real Total
  Blocking Time), documented with numbers rather than hidden, in DESIGN_PLAN.md. LCP itself, the
  metric the brief is strictest about, stayed within the same band the page already had before 3D.
- **Screenshots/manual QA** were done with headless Chrome + Puppeteer driven directly (the
  `claude-in-chrome` browser tool wasn't connected in this environment) — scroll-through testing,
  375px/1440px viewports, `prefers-reduced-motion` emulation, WebGL disabled via Chrome flags, and
  4× CPU throttling via the DevTools protocol.

## New copy not in the source CONTENT block

The brief's CONTENT section covers all page copy, but a few short UI strings weren't specified and
were written fresh (present in both `en.ts` and `th.ts`, the Thai versions are original translations
of this same fresh English text, not sourced content):

- Home "Corporate Profile" band CTA label ("Contact Us") — reused existing wording, brief only
  specified the destination.
- About/Services closing CTA banner heading + supporting line ("Ready to strengthen your
  infrastructure?" / "Let's design your next system.") — the brief only required "CTA → /contact".
- Contact form field labels/placeholders, validation messages, and submit/status text.
- 404 page copy, footer copyright line, "Skip to content" link, language switcher labels.
- The company's **legal name is kept in English in the Thai content too** (`Shinasub Company
  Limited`) — its registered Thai name isn't confirmed anywhere in the source material, and
  guessing a legal entity name felt riskier than leaving it in English.
#   S h i n a s u b  
 