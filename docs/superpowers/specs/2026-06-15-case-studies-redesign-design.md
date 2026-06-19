# Case Studies Redesign — Design Spec

- **Date:** 2026-06-15
- **Status:** Approved (pending spec review)
- **Source artifact:** `case-studies-redesign.html` (self-contained proposal + working mockup)

## 1. Context

`a3di.dev` is a multi-page static site (Vite MPA, plain HTML + a single shared
`style.css`, no JS framework). The live site comprises:

- `index.html` — homepage (intro, services, case-study cards)
- `case-studies/unicef-dq-screener.html`
- `case-studies/alive-and-thrive.html`
- `case-studies/namibia-nhies.html`

There is no local CV page — the footer's "CV" link points to the external
`aaronbwise.com`. CV is **out of scope** for this redesign.

The current case studies are technically strong but read as four stacked walls of
prose: the strongest numbers are buried mid-paragraph, metadata leads instead of
outcomes, there is no scannable layer, and — for a data consultancy — there is no
data visualisation. `case-studies-redesign.html` diagnoses this and provides a
fully rebuilt UNICEF JME exemplar plus direction for the other two.

## 2. Goal

Roll the redesign across the live site: outcome-led, layered (skim + deep-read)
case-study pages with CSS-only data visualisations, on a cohesive whole-site
visual language — without violating the site's no-web-fonts / no-JS principles.

## 3. Non-goals

- No config/templating/data layer (pages stay hand-written static HTML).
- No JS, no chart library (all charts are hand-rolled CSS).
- No web fonts.
- No client quotes/logos this round (CTA only).
- CV page is not touched.
- The proposal scaffolding in the mockup (cover, diagnosis, strategy, apply,
  build, the `.frame` browser chrome) is **not** ported to the live site.

## 4. Decisions (resolved during brainstorming)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Design reach | **Whole-site restyle** (case studies + homepage + header/footer) |
| 2 | Fonts | **Keep system fonts** — map the mockup's 3 font roles onto system stacks |
| 3 | Architecture | **Hand-written HTML + shared CSS** (no config/template system) |
| 4 | Trust signal | **CTA only** for now; quote/logo component deferred |
| 5 | Mockup file | **Commit** `case-studies-redesign.html` to the repo (excluded from Vite inputs) |
| 6 | Homepage width | **Widen to ~1080px** for cohesion |

## 5. Design system foundation (`style.css`)

Rewrite `style.css` around the mockup's token set, with font variables mapped to
system stacks.

**Tokens to port:** `--ink / --ink-2 / --ink-3`; `--paper / --surface /
--surface-2`; `--line / --line-2`; `--accent / --accent-ink / --accent-50 /
--accent-100`; semantic tier scale `--t1 / --t2 / --t3 / --ok` (+ `*-bg`);
`--radius / --radius-sm`; `--shadow-sm / --shadow / --shadow-lg`.

**Font roles → system stacks (no web fonts):**

- `--display` (headings): `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`,
  weight 600, letter-spacing `-.02em` (carries the "Space Grotesk" feel).
- `--body`: same system sans (replaces "Inter").
- `--mono`: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
  (replaces "JetBrains Mono"; matches existing mono usage).

**Layout:** `--max-width` 740px → **`--maxw: 1080px`**. Prose blocks capped at
~68ch for readability. This widens the homepage notably (intended).

**Backward-compatibility note:** the existing palette custom properties
(`--bg`, `--text`, `--accent`, `--dark`, `--text-muted`, etc.) are referenced
throughout current markup. Either (a) keep them as aliases mapped to the new
tokens, or (b) update every reference. Plan will choose per-component; aliasing is
the low-risk default to avoid missed references.

## 6. Shared chrome (header / footer / nav)

Restyle existing `.site-header` / `.site-footer` to new tokens: sticky
translucent topbar, brand with accent dot, mono-style nav. **Keep** the CSS-only
"Case Studies" dropdown and current nav/footer link structure (no JS, no behaviour
change). Header/footer markup stays duplicated across all 4 HTML files per current
convention — update all four together.

## 7. Case-study component library (new CSS classes)

Extracted from the mockup exemplar (drop all proposal-only classes:
`.frame`, `.topbar`, `.cover`, `.diag`, `.principle`, `.ba`, `.apply`, `.impl`,
`.check`, `.stackbox`):

- `cs-hero` — dark gradient hero: eyebrow, h1, deck, 4-up `cs-stats` grid, `cs-meta` row
- `cs-body` — light content wrapper
- `cs-section` + `.lab` (indexed section labels)
- `glance` — at-a-glance 3-cell band (problem / build / outcome)
- `flow` / `node` / `arrow` — pipeline diagram (replaces old `.pipeline-diagram`)
- `aside` — accent callout
- `channels` / `chan` — channel cards (UNICEF)
- `viz` — chart container
- `triage` — stacked proportion bar
- `lift` / `track` / `base` / `fill` — baseline-vs-result bars
- `mini` / `mrow` / `range` / `span` / `dot` — range/bar plots (A&T, Namibia)
- `terminal` — dark deliverable/code block
- `takeaway` — dark pull-quote block
- `cta` — gradient call-to-action (email + "see more work")

All charts are CSS-only. Responsive breakpoints at 880px and 560px (from mockup).

## 8. Per-study content mapping

All figures below are drawn from the existing published pages — no invented data.

### 8.1 UNICEF JME (`unicef-dq-screener.html`) — ship first (reference page)

Port the mockup exemplar nearly verbatim.

- **Hero stats:** 70% cleared automatically · 85% known-bad caught out-of-sample ·
  2.8× detection vs baseline (12× for Tier 1) · ~1 sec to score (callable from Stata)
- **Meta:** Client UNICEF/WHO/World Bank JME · Role Design & build · Stack Python → R
  (for Stata) · Scale 1,091 surveys · 167 countries · Timeline Dec 2025 – May 2026
- **Glance:** problem / what I built / outcome (per mockup copy)
- **Flow:** 1,091 CSVs → 136 indicators (10 calculator classes) → 5 channels →
  4 review tiers
- **Channels:** A PCA composite · B Mahalanobis · C Mixed-effects · E Prevalence
  outlier · F Prevalence coherence
- **Charts:** `triage` (70 / 17 / 9 / 4); `lift` (85% flagged @ 2.8× baseline 30%;
  50% Tier 1 @ ~12× baseline 4%)
- **Terminal:** `Rscript score_survey.R` → TIER 3, 1 channel flagged (digit
  preference), 0.8s
- **Takeaway + CTA**

### 8.2 Alive & Thrive (`alive-and-thrive.html`)

- **Hero stats:** 15+ survey rounds · 3 countries · 20+ years · 5 equity stratifiers
- **Lead figure:** 35pp gap (breastfeeding / dietary diversity between ethnic groups,
  Lao PDR) — promoted from one clause in the Result paragraph
- **Meta:** Client Alive & Thrive (FHI Solutions) · Sector MCHN · Countries Cambodia,
  Lao PDR, Viet Nam · Data 15+ MICS/DHS rounds, 2000–2023 · Duration Apr–Dec 2022
- **Glance:** problem / build / outcome
- **Flow:** raw SPSS + JSON config per country-year → ingest & standardise → merge →
  compute MCHN indicators → disaggregated tabulations (5 stratifiers) + weighted
  logistic regression → equity profiles
- **Code block:** reuse existing `config/vnm_2021_children.json` snippet, restyled
- **Chart:** `mini`/`range` equity-gap visual. **Content nuance:** the published
  copy gives only the 35pp gap (not a precise majority/minority pair), so the chart
  is a schematic of the pattern with **35pp as the real labelled finding** (mockup
  framing). Caption must say so explicitly to stay honest.
- **Takeaway + CTA**

### 8.3 Namibia NHIES (`namibia-nhies.html`)

- **Hero stats:** 14 regions · 7 vehicles assessed · 199 food items harmonised ·
  13 years of salt trends
- **Lead figure:** dramatic regional spread in staple intake (~10×)
- **Meta:** Client Iodine Global Network (IGN) · Sector food security & micronutrient
  fortification · Country Namibia · Data NHIES 2015–16, DHS 2000–2013, 4 Food
  Composition Tables · Duration Jul 2020 – Apr 2021
- **Glance:** problem / build / outcome
- **Flow (4 phases):** inputs (NHIES, DHS salt, 4 FCTs) → grain baseline /
  iodization trends / FCT harmonisation → g/c/d × 7 vehicles, regional salt trends,
  199-item FCT → regional fortification vehicle profiles
- **Chart:** `mini`/`range` plot, min–max across 14 regions on a shared axis
  (wheat 30–292 · mahangu 4–452 · maize 67–338 · salt 2.8–7.5 g/c/d). **Bar widths
  must be computed from the real values on one common scale** (mockup widths are
  illustrative). Note >45% own-production share alongside.
- **Takeaway + CTA**

## 9. Homepage (`index.html`)

- Adopt new tokens and ~1080px width.
- Add a **hero stat** to each case-study card (proposal step 6) so impact shows
  before the click — e.g. JME "70% auto-cleared", A&T "35pp gap surfaced",
  Namibia "10× regional spread".
- Intro/services keep current content/structure, restyled.

## 10. Config / docs

- `vite.config.js`: no changes (all live pages already inputs; mockup excluded).
- Commit `case-studies-redesign.html` to git (tracked artifact, not a build input).
- Update `CLAUDE.md`: new design tokens, component vocabulary, system-font mapping
  (reaffirm no web fonts), "charts are hand-rolled CSS, no library", new ~1080px
  width.

## 11. Rollout order

1. New `style.css` foundation + shared chrome + component library (lands with JME).
2. **UNICEF JME** page — validate the direction on the fully-specified page.
3. **Alive & Thrive** + **Namibia NHIES** pages.
4. **Homepage** cards + restyle.
5. **CLAUDE.md** update; commit the mockup artifact.

`npm run build` (and visual check via `npm run dev`) after each milestone.

## 12. Risks / open items

- **Shared stylesheet, all pages affected:** restyling `style.css` touches every
  page at once. Mitigate by aliasing legacy tokens and checking each page renders.
- **npm on Google Drive:** install workaround documented in `CLAUDE.md` if deps
  needed (none expected — no new deps).
- **A&T chart honesty:** only the 35pp gap is a published figure; chart is
  schematic with an explicit caption.
- **Namibia chart scaling:** compute bar widths from real min–max on a common axis.

## 13. Acceptance criteria

- All 3 case-study pages use the new layered layout (hero + glance + prose + ≥1
  CSS chart + takeaway + CTA), figures matching published copy.
- Homepage and shared chrome restyled to the new system at ~1080px; nav dropdown
  still works with no JS.
- No web fonts, no JS, no chart library introduced.
- `npm run build` succeeds; all pages render correctly at desktop and mobile widths.
- `CLAUDE.md` updated; `case-studies-redesign.html` committed.
