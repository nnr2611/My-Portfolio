# CLAUDE.md: Nithish Ragav portfolio (rebuild from scratch)

## Project goal
Personal portfolio for Nithish Ragav Narayana Shankar, AI/ML engineer (agentic LLM systems, time-series forecasting, computer vision), based in Edmonton, AB.
The site opens with a dark, sci-fi hero: **multiple force fields** steering thousands of particles, plus a **light ink-stir effect** that follows the cursor. Below the hero the site is clean, fast and readable.

Deploy target: Vercel (auto-deploy from `main`, preview URL per branch).

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS (shadcn/ui optional, only if a component clearly needs it)
- No heavy animation libs for the hero. Plain Canvas 2D, no Three.js, unless asked.
- Framer Motion allowed for section transitions only.

## How to work with me
- Build in small steps. After each step: run `npm run build`, summarise what changed in 2-3 lines, and stop for feedback.
- Do not refactor unrelated files. Do not add dependencies without asking.
- Keep answers concise and professional.
- Commit after each approved step with a clear message.

## Folder layout
```
app/
  layout.tsx
  page.tsx                  # composes sections
  globals.css
components/
  hero/
    HeroCanvas.tsx          # "use client", all canvas code
    HeroHud.tsx             # HTML overlay (name, role, readouts)
    fields.ts               # force field definitions + math
    ink.ts                  # ink particle logic
  sections/                 # About, Projects, Skills, Publications, Contact
data/
  content.ts                # ALL copy: projects, skills, papers, links
public/                     # images, resume PDF
```
Rule: content lives in `data/content.ts`, never hardcoded in components.

## Hero spec

### Visual
- Background `#05070f`. Particles drawn with additive blending (`globalCompositeOperation = 'lighter'`) over a translucent fade (`rgba(5,7,15,0.10-0.14)`) to create trails.
- Palettes (switchable in code, default Nebula): Nebula (hue 190-300), Aurora (110-190), Ember (340-400), Mono.
- Colour particles by local flow angle or by speed, not randomly.
- HUD overlay in HTML on top of the canvas (monospace, small caps, thin corner brackets): name, role, live readouts (cursor azimuth/elevation, particle count). Must stay selectable text.

### Multiple force fields (core feature)
Particles move by summing several independent fields every frame. Each field is a small object so fields can be added, removed or toggled:

1. **Base flow**: smooth noise-based angle field, slowly evolving over time. Ambient motion.
2. **Attractors (2-4)**: slowly orbiting points that pull particles in (softened inverse-square, clamp max force). Particles should bend around them, not collapse into them.
3. **Repellers (1-2)**: push particles away, creating clear voids.
4. **Vortices (1-3)**: tangential force around a centre (clockwise and counter-clockwise), giving spirals.
5. **Wind**: a weak constant direction that slowly rotates.
6. **Cursor field**: while the cursor is over the hero, it acts as a vortex + gentle repeller (radius ~150px).

Field centres drift on slow Lissajous paths so the composition keeps changing. Add an optional debug mode (`?debug=1`) that draws field centres and radii.

Implementation notes:
- Define `type Field = { force(x, y, t): [number, number] }`. Sum forces, add to velocity, apply damping (~0.96), clamp speed.
- Pre-compute nothing per particle that can be shared per frame (field positions are computed once per frame).
- Keep per-frame allocations at zero in the hot loop (no new arrays/objects per particle).

### Ink-stir on cursor movement
- On pointer move, spawn 3-6 ink particles per frame at the cursor, with initial velocity = ~25% of cursor velocity + small random jitter.
- Ink particles live ~100 frames, shrink and fade, are advected by the same fields (so ink visibly bends around attractors and vortices) plus a little extra curl noise.
- Colour cycles slowly through the active palette.
- Cap ink particles at ~900. Cull oldest first.
- Subtle: ink must not overpower the page. Tune alpha and size so text in the HUD stays readable.

### Optional later layer
- Faint star field behind everything (parallax warp, speed driven by scroll). Only after the above is approved.

## Performance and accessibility (non-negotiable)
- Use `requestAnimationFrame`; pause when the tab is hidden or the hero is off-screen (`IntersectionObserver`).
- Handle `devicePixelRatio` (cap at 2) and resize with a debounced handler.
- Particle count scales with canvas area and device (e.g. ~650 desktop, ~250 mobile). Reduce on low `navigator.hardwareConcurrency`.
- Honour `prefers-reduced-motion`: render one static frame, no ink, no animation.
- Canvas is decorative: `aria-hidden="true"`. All real text is HTML.
- Target Lighthouse Performance 90+ on mobile for the page.
- Touch devices: use pointer events; touch-drag should also stir ink.

## Sections below the hero
Dark theme consistent with the hero, but quiet. Order: About, Featured Projects, Skills, Publications, Contact.
- Projects as cards with thin glowing borders, tech tags, a metric badge (e.g. "+15% accuracy", "0.2°C MAE") and a GitHub link.
- Skills: grouped, compact (chips or a simple grid). Avoid very long bullet lists.
- Publications: title, venue, date, one-line result, link.
- Contact: email, location, GitHub, LinkedIn. A simple form only if there is a working backend; otherwise a mailto link.
- Content comes from `data/content.ts` (see Content source below).

## Content source
The old portfolio is at `../My-Portfolio-old` (read-only reference; never edit it).
- Extract text content only: about copy, projects, skills, publications, links, image file names.
- Do NOT copy its components, styles, Tailwind config or layout code.
- Copy only the images that are actually used from its `public/` folder into this project's `public/`.
- Put everything into `data/content.ts` as typed objects (`Project`, `SkillGroup`, `Publication`, `Link`).
- The old copy may be outdated. The live site https://nithish-ragav.vercel.app/ is the newer source of truth. Where the two differ, or a metric/date/link looks stale or inconsistent, list the differences for me to confirm instead of guessing.
- Do not invent projects, metrics or claims. If something is missing, leave a `TODO` and tell me.

## Style rules
- TypeScript strict. No `any` unless commented.
- Small, named functions. Comment the maths (field formulas) briefly.
- Tailwind for layout; hero canvas styling stays in code.
- Accessible colour contrast for all HTML text.

## Commands
```bash
npm run dev      # local dev at http://localhost:3000
npm run build    # must pass before every commit
npm run lint
```

## Step plan (do one at a time, then stop for feedback)
1. Scaffold check, extract content from `../My-Portfolio-old` into `data/content.ts` (see Content source), copy needed images, base layout and dark theme. Stop and show me `data/content.ts` for review before continuing.
2. `HeroCanvas.tsx` with base flow field + particle trails + resize/DPR handling.
3. Add multiple force fields (attractors, repellers, vortices, wind) with a `?debug=1` overlay.
4. Add cursor field and ink-stir.
5. Add HUD overlay, palette switch, reduced-motion fallback, off-screen pause, mobile tuning.
6. Build the sections below the hero.
7. Lighthouse and accessibility pass, then deploy a Vercel preview.

## Definition of done for the hero
- Smooth 60fps on a typical laptop, no jank on mid-range phones.
- Several visibly distinct force fields shape the particle motion.
- Moving the cursor leaves a coloured ink trail that bends with the fields.
- Static fallback works with reduced motion on.
- No console errors; `npm run build` passes.
