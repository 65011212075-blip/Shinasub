# Image credits and licensing

Every photograph in `public/images/` is a real photograph under a licence that
permits commercial use. Nothing here is AI-generated, and nothing requires
attribution — the table is kept so the provenance of each file stays auditable
if the licence terms are ever questioned.

## Photography — Pexels Licence

Source: <https://www.pexels.com>. The [Pexels Licence](https://www.pexels.com/license/)
permits free commercial use, with modification, without attribution. Files were
downloaded at 2000px wide; Next.js re-encodes and resizes them per breakpoint at
build/request time, so these are the masters, not what ships to the browser.

| File | Subject | Source photo |
| --- | --- | --- |
| `bangkok-panorama.jpg` | Bangkok aerial panorama, hazy daylight | [pexels.com/photo/15285956](https://www.pexels.com/photo/15285956/) |
| `bangkok-aerial.jpg` | Bangkok aerial: elevated walkway among towers (portrait) | [pexels.com/photo/17975622](https://www.pexels.com/photo/17975622/) |
| `bangkok-street.jpg` | Bangkok street level with elevated walkway | [pexels.com/photo/14826666](https://www.pexels.com/photo/14826666/) |
| `cctv-dome.jpg` | Dome and bullet CCTV cameras against sky | [pexels.com/photo/14773064](https://www.pexels.com/photo/14773064/) |
| `data-center-aisle.jpg` | Data-centre cold aisle | [pexels.com/photo/17323801](https://www.pexels.com/photo/17323801/) |
| `data-center-monitor.jpg` | Data-centre cabling and console | [pexels.com/photo/17489155](https://www.pexels.com/photo/17489155/) |
| `fiber-patch-cords.jpg` | LC fibre patch cords, macro | [pexels.com/photo/1624895](https://www.pexels.com/photo/1624895/) |
| `fiber-patch-panel.jpg` | Loaded fibre patch panel | [pexels.com/photo/2420212](https://www.pexels.com/photo/2420212/) |
| `field-technicians.jpg` | Two technicians servicing outdoor equipment | [pexels.com/photo/33694026](https://www.pexels.com/photo/33694026/) |
| `mast-team.jpg` | Two technicians commissioning a rooftop mast | [pexels.com/photo/15483316](https://www.pexels.com/photo/15483316/) |
| `panel-technician.jpg` | Technician working inside an equipment panel | [pexels.com/photo/31580848](https://www.pexels.com/photo/31580848/) |
| `network-switch.jpg` | Switch ports and patch cables, macro | [pexels.com/photo/2881233](https://www.pexels.com/photo/2881233/) |
| `smart-building.jpg` | Modern glass office tower against open sky (home hero) | [pexels.com/photo/14835164](https://www.pexels.com/photo/14835164/) |
| `rooftop-telecom.jpg` | Rooftop radio and antenna installation | [pexels.com/photo/29161451](https://www.pexels.com/photo/29161451/) |
| `tower-technician.jpg` | Rigger working on a telecoms mast | [pexels.com/photo/19661549](https://www.pexels.com/photo/19661549/) |

Candidates that were rejected rather than shipped, and why:

- Two CAD-workstation frames were dropped from the About page: the drawings
  on screen were an architectural elevation and a piping schematic, neither of
  which is ICT design, and both showed monitor branding.
- A co-working team frame was dropped as generic startup stock — it read as
  neither engineering nor this company.

- A data-centre control-room frame carried prominent third-party vendor logos
  (EMC, HP, Intel, Schneider) across the shot. Real photograph, correctly
  licensed, but on a system integrator's own site those marks read as a claim
  of partnership, so it was dropped rather than cropped.
- Openverse/Flickr results were largely `CC BY-NC` (non-commercial), which does
  not cover use on a company website. Only licences permitting commercial use
  were considered.

## Company assets

| File | Notes |
| --- | --- |
| `Shinasub_Logo.png`, `Shinasub-Logo-W.png` | Shinasub's own marks. |

## Needs a decision — `silom_Edge.jpg`

Not cleared. This is a developer's promotional CGI render of Silom Edge, the
building Shinasub's office is in — not a photograph, and presumably the
copyright of the developer or their visualisation studio. It is still used as
the preview still for the map on the Contact page.

It was left in place because it depicts the actual head office, which a generic
stock photograph cannot do. Replace it with either:

- a photograph Shinasub took of the building or the office, or
- written permission from the building's owner, or
- `bangkok-street.jpg`, which loses the specific building but is cleanly
  licensed.

## Orientation constraint on the stats band

The two frames flanking the figures on the home page sit in columns roughly
224x408 and 240x408 — a ratio near 0.55, because their height is set by the
stack of figures between them. **Both sources must be portrait.**

`bangkok-skyline.jpg` (landscape, 1.50) was originally used on the left and was
replaced by `bangkok-aerial.jpg` (portrait, 0.75) for two reasons:

1. `object-cover` discarded about 70% of its width, leaving a vertical sliver
   of a wide aerial that no longer read as a skyline at all.
2. It rendered blurry. With a landscape source in a box that tall, cover scales
   to match the *height*, so the browser needed roughly 1220px of source width
   — but `sizes="14rem"` asked for 224px, so it fetched the 384w file and
   upscaled it about 3x. Both flanking images now declare
   `sizes="(min-width: 1024px) 20rem, 1px"`, which covers the height-driven
   scale with headroom.

The general rule for any `fill` image here: when the box ratio is *smaller*
than the source ratio, cover scales by height and `sizes` must be larger than
the box's own width. Every other `fill` image on the site sits in a box wider
than its source, so width governs and the declared `sizes` is correct.

## Replaced 3D artwork

The home page's hero originally rendered a hand-built WebGL "fiber backbone"
(rotating node/edge graph with travelling pulses) plus an animated SVG fallback
for machines without WebGL. Both were removed in favour of `smart-building.jpg`,
and the following were deleted with them:

- `src/components/sections/home/hero-background.tsx`
- `src/components/three/fiber-backbone/` (`fiber-backbone.tsx`, `scene.tsx`, `topology.ts`)
- `src/components/ui/background-paths.tsx` (the SVG fallback)
- `src/components/three/use-canvas-active.ts` (only that scene used it)
- the `network-dash` / `network-node-pulse` keyframes in `globals.css`

The Services page still renders its own smaller WebGL piece
(`src/components/three/rack-layer/`), so `three` / `@react-three/fiber` remain
dependencies and the shared helpers (`webgl-detect`, `use-client-value`,
`canvas-error-boundary`) are still in use.

## Removed

`End-to-End.jpg` was deleted. It was AI-generated — visible in the malformed
lettering rendered into the image ("UBOR MRZBRESS SOLUTIONS", "GNN BESCRIBERT")
— and carried no licence provenance.
