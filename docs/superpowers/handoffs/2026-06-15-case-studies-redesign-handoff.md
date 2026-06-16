# Handoff — Case Studies Redesign (2026-06-15)

## TL;DR
Executing the case-studies redesign plan with subagent-driven development. **Tasks 0–2 done and committed; Task 3 is next.** Working tree is clean. Resume by dispatching the Task 3 implementer.

- **Branch:** `redesign/case-studies` (off `main`)
- **HEAD:** `91063e1`
- **Plan (source of truth):** `docs/superpowers/plans/2026-06-15-case-studies-redesign.md`
- **Spec:** `docs/superpowers/specs/2026-06-15-case-studies-redesign-design.md`
- **Mockup (committed design reference):** `case-studies-redesign.html`

## What this project is
Rolling the `case-studies-redesign.html` mockup across the live a3di.dev site (Vite MPA, plain HTML + one shared `style.css`). Whole-site restyle, **system fonts (no web fonts)**, **no JS / no chart library** (charts are CSS), hand-written HTML (no templating). All 4 design decisions and content mapping are in the spec.

## Commits so far (newest first)
```
91063e1 style: normalise UNICEF case study typography to project conventions
eec0b0c feat: rebuild UNICEF JME case study with redesigned layout
881f637 fix(a11y): restore keyboard focus outline on header nav links
4a9a7bd feat: rewrite style.css with redesign tokens, system fonts, component library
afb9725 docs: add case-studies redesign mockup, spec, and plan
```

## Task status
- [x] **Task 0** — branch + baseline build + committed mockup/spec/plan (`afb9725`)
- [x] **Task 1** — full `style.css` rewrite (`4a9a7bd`); + a11y fix splitting the nav hover/focus rule so keyboard focus keeps an outline (`881f637`)
- [x] **Task 2** — UNICEF JME page rebuilt from mockup exemplar (`eec0b0c`); + typography normalised to project conventions (`91063e1`)
- [ ] **Task 3** — Rebuild **Alive & Thrive** page (`case-studies/alive-and-thrive.html`) — *NEXT*
- [ ] **Task 4** — Rebuild **Namibia NHIES** page (`case-studies/namibia-nhies.html`)
- [ ] **Task 5** — Homepage: add a hero stat to each case-study card (`index.html`)
- [ ] **Task 6** — Update `CLAUDE.md` Styling section
- [ ] **Task 7** — Final verification (clean build, grep proves no web fonts/JS, responsive walk-through), final code review, then `superpowers:finishing-a-development-branch`

The in-session task list (TaskCreate IDs #1–#8) mirrors this; #1–#3 are completed, #4 (Task 3) was set in_progress.

## How to resume
1. Re-enter the `superpowers:subagent-driven-development` flow (we are mid-execution).
2. For each remaining task: dispatch a **general-purpose implementer subagent (model: sonnet)** → **spec-compliance reviewer** → **code-quality reviewer** → fix loop → mark complete. Templates live under the skill's base dir (`implementer-prompt.md`, `spec-reviewer-prompt.md`, `code-quality-reviewer-prompt.md`).
3. **Base SHA for the next task's code review = current HEAD before that task** (Task 3 base = `91063e1`).

### Implementer prompt pattern that's been working
Tell the subagent: working dir, confirm branch `redesign/case-studies` (don't switch), the hard rules (no web fonts, no JS, only edit `<main>`, leave head/header/footer untouched), then point it at the **plan file section for that task** and instruct it to apply the Step-1 markup **verbatim** (preserve entities `&rsquo;`/`&mdash;`/`&ndash;`/`&nbsp;`). Finish with: `npm run build` (expect `✓ built`), `grep -nE "<script|fonts.googleapis|fonts.gstatic" <file>` (expect none), commit only that file.

- **Task 3** markup is fully written in the plan (Task 3, Step 1). Includes the `config/vnm_2021_children.json` code block and the equity-gap `.mini`/`.range` chart with the honest caption ("Schematic of the pattern; 35pp is the real finding"). Commit msg: `feat: rebuild Alive & Thrive case study with redesigned layout`.
- **Task 4** markup is fully written in the plan (Task 4, Step 1). Range plot bars are pre-computed on a common 0–460 g/c/d scale. Commit msg: `feat: rebuild Namibia NHIES case study with redesigned layout`.
- **Task 5** replaces only the `.work-grid` block in `index.html` (markup in plan Task 5 Step 1). Commit msg: `feat: restyle homepage and add hero stat to each case-study card`.
- **Task 6** replaces the `## Styling` section of `CLAUDE.md` (content in plan Task 6 Step 1). Commit msg: `docs: update CLAUDE.md styling section for the redesign`.

> Note: A&T and Namibia markup in the plan was authored to already follow the typography conventions, so they should NOT need the typography sweep that Task 2 needed (Task 2's content was copied from the quick mockup, which used raw chars).

## Decisions / review judgments already made (don't re-litigate)
- **Heading levels** (`<h4>` in `.viz` titles, `<h3>` in `.cta`) skip a level vs. the section `<h2>`s. Accepted as the approved mockup's consistent design — best-practice nicety, not a WCAG failure. Don't restructure unless the user asks (it would ripple through CSS + all 3 pages).
- **Interim "dead" CSS**: old classes (`.stats-bar`, `.pipeline-*`, old `.takeaway` meaning) are intentionally unstyled after Task 1; the page rebuilds (Tasks 2–4) replace that markup, and nothing deploys until Task 7. No compat stubs.
- **`&rarr;` vs literal `→`** in CTA: keep the entity (matches plan + project entity convention; renders identically).
- **`--surface-2`** token is defined but currently unused — intentional palette completeness, leave it.
- **`&mdash;` left raw** only in the `<meta name="description">` attribute and inside the terminal `<pre>` block — intentional (attributes/code are exempt).

## Gotchas
- **npm on Google Drive:** `npm install` fails on the virtual FS; deps are already installed and `npm run build` works (~2s). If a fresh install is ever needed, use the temp-dir workaround in `CLAUDE.md`.
- **LF→CRLF git warnings** on commit are benign on Windows; ignore.
- Build output goes to `dist/`. Dev server: `npm run dev` (default `http://localhost:5173`). No test framework — "verification" = build success + visual check + grep.
- Don't commit to `main`; stay on `redesign/case-studies`. Integration happens in Task 7 via `finishing-a-development-branch`.

## Final-deploy guardrail
Before finishing the branch (Task 7), confirm: all 3 case-study pages rebuilt, homepage cards updated, `CLAUDE.md` updated, `npm run build` clean, `grep -rnE "fonts.googleapis|fonts.gstatic|<script" index.html case-studies/ style.css` returns nothing, and a responsive pass at 880px/560px shows no overflow.
