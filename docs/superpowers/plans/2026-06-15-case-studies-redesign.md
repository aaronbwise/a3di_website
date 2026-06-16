# Case Studies Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Roll the `case-studies-redesign.html` mockup across the live `a3di.dev` site — outcome-led, layered case-study pages with CSS-only data visualisations, on a cohesive whole-site visual language.

**Architecture:** Single shared `style.css` rewritten around the mockup's design tokens, with the three font roles mapped to system stacks (no web fonts). The three case-study pages and the homepage are hand-written static HTML using a new shared component library. Header/footer/nav markup is unchanged — restyled via CSS only. No JS, no chart library, no templating/data layer.

**Tech Stack:** Static HTML + one CSS file, bundled by Vite (MPA mode). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-06-15-case-studies-redesign-design.md`

---

## Conventions for every page edit

These project typography rules (from `CLAUDE.md`) apply to all HTML content written below — the markup in this plan already follows them, preserve them:
- Spaced em-dash ` &mdash; ` for parenthetical breaks; unspaced en-dash `&ndash;` for numeric ranges.
- British spelling (harmonise, analyse, optimise, organisation).
- Curly apostrophes `&rsquo;` in prose.

Verification baseline used throughout:
- **Build check:** `npm run build` → expect `✓ built in …` and no errors; `dist/` updated.
- **Visual check:** `npm run dev` → open the listed URL (default `http://localhost:5173`).
- If `npm run build` fails with a missing-deps error, apply the Google-Drive npm workaround in `CLAUDE.md` first.

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `style.css` | All styling: tokens, reset, chrome, homepage, case-study component library, preserved CV/code-block, responsive | Full rewrite (Task 1) |
| `case-studies/unicef-dq-screener.html` | UNICEF JME case study (reference page) | Rebuild `<main>` (Task 2) |
| `case-studies/alive-and-thrive.html` | A&T MCHN equity case study | Rebuild `<main>` (Task 3) |
| `case-studies/namibia-nhies.html` | Namibia NHIES fortification case study | Rebuild `<main>` (Task 4) |
| `index.html` | Homepage — restyled, hero stat per card | Edit `<main>` cards (Task 5) |
| `CLAUDE.md` | Project docs | Update styling/architecture sections (Task 6) |
| `case-studies-redesign.html` | Design reference artifact | Commit to repo (Task 0) |
| `vite.config.js` | Build inputs | **No change** (all live pages already inputs; mockup excluded) |

Header/footer/nav markup in the 4 HTML files is **not edited** — the new chrome is pure CSS.

---

## Task 0: Branch, baseline build, commit the mockup

**Files:**
- Commit: `case-studies-redesign.html` (currently untracked)

- [ ] **Step 1: Confirm repo and branch, create a working branch**

Run:
```bash
git rev-parse --show-toplevel && git branch --show-current
git switch -c redesign/case-studies
```
Expected: repo path ends in `landing_page`; new branch `redesign/case-studies` created from `main`.

- [ ] **Step 2: Establish the build works before any changes**

Run: `npm run build`
Expected: `✓ built in …`, no errors. (If it fails on deps, apply the `CLAUDE.md` npm workaround, then re-run.)

- [ ] **Step 3: Commit the mockup as a tracked design artifact**

The mockup is the visual source of truth for this redesign and was approved for committing.

Run:
```bash
git add case-studies-redesign.html docs/superpowers/specs/2026-06-15-case-studies-redesign-design.md docs/superpowers/plans/2026-06-15-case-studies-redesign.md
git commit -m "docs: add case-studies redesign mockup, spec, and plan"
```
Expected: one commit created.

---

## Task 1: Rewrite `style.css` (design system + chrome + components + homepage)

This is a wholesale replacement of `style.css`. The case-study component block and the mini-chart block are lifted verbatim from `case-studies-redesign.html` (they are already final and font-variable-driven, so swapping the font variables to system stacks is the only change needed for the no-web-fonts requirement).

**Files:**
- Modify: `style.css` (full replace)

- [ ] **Step 1: Replace the entire contents of `style.css` with the following**

```css
/* ============================================================
   a3di.dev — shared stylesheet
   Design tokens from the case-studies redesign; font roles
   mapped to SYSTEM stacks (no web fonts), per CLAUDE.md.
   ============================================================ */

:root{
  /* core palette */
  --ink:#0C1322; --ink-2:#3A4456; --ink-3:#697587;
  --paper:#F3F4F7; --surface:#FFFFFF; --surface-2:#FAFBFC;
  --line:#E3E7ED; --line-2:#D5DAE2;
  --accent:#2F55F0; --accent-ink:#1B37A8; --accent-50:#EDF1FE; --accent-100:#DCE4FD;
  /* semantic tier scale (quality flagging) */
  --t1:#E5484D; --t2:#F2790B; --t3:#E3B007; --ok:#1F9D63;
  --t1-bg:#FDECEC; --t2-bg:#FDF0E3; --t3-bg:#FBF4DA; --ok-bg:#E6F4EC;
  --radius:14px; --radius-sm:9px;
  --maxw:1080px;
  --shadow-sm:0 1px 2px rgba(12,19,34,.04), 0 1px 1px rgba(12,19,34,.06);
  --shadow:0 6px 24px -8px rgba(12,19,34,.18), 0 2px 6px -2px rgba(12,19,34,.08);
  --shadow-lg:0 30px 70px -24px rgba(12,19,34,.40), 0 8px 24px -12px rgba(12,19,34,.22);

  /* font roles → system stacks (NO web fonts) */
  --display: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;

  /* legacy aliases (back-compat for existing markup + orphaned CV page) */
  --bg: var(--paper);
  --text: var(--ink);
  --dark: var(--ink);
  --code-bg:#f0f0f0;
  --tag-bg: var(--accent-50);
  --border: var(--line);
  --text-muted: var(--ink-2);
  --text-subtle: var(--ink-2);
  --text-faint: var(--ink-3);
  --text-label: var(--ink-3);
  --text-placeholder:#b0b0b0;
  --max-width: var(--maxw);
}

/* ---------- reset & base ---------- */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{
  font-family:var(--body);color:var(--ink);background:var(--paper);
  line-height:1.6;font-size:16.5px;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
a:focus-visible{outline:2px solid var(--accent);outline-offset:2px;text-decoration:underline}
img{max-width:100%;height:auto}
h1,h2,h3,h4{font-family:var(--display);font-weight:600;line-height:1.12;letter-spacing:-.02em;color:var(--ink)}
.mono{font-family:var(--mono)}
.muted{color:var(--ink-3)}
.container{max-width:var(--maxw);margin:0 auto;padding:0 28px}

/* ---------- header / nav ---------- */
.site-header{
  border-bottom:1px solid var(--line);background:rgba(243,244,247,.85);
  backdrop-filter:saturate(150%) blur(8px);position:sticky;top:0;z-index:50;
}
.site-header .container{display:flex;align-items:center;justify-content:space-between;height:64px}
.site-header .brand{display:flex;align-items:baseline;gap:.6rem}
.site-header .brand-name{
  font-family:var(--display);font-weight:700;letter-spacing:-.02em;font-size:18px;color:var(--ink);
  display:inline-flex;align-items:center;gap:9px;
}
.site-header .brand-name::before{content:"";width:9px;height:9px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px var(--accent-50)}
.site-header .brand-name:hover{color:var(--accent);text-decoration:none}
.site-header .brand-sub{font-family:var(--mono);font-size:12px;color:var(--ink-3);letter-spacing:.04em}
.site-header nav{display:flex;gap:22px;font-family:var(--mono);font-size:13.5px}
.site-header nav a{color:var(--ink-2)}
.site-header nav a:hover{color:var(--accent);text-decoration:none}
.site-header nav a:focus-visible{color:var(--accent)}

.nav-dropdown{position:relative}
.nav-dropdown-toggle{cursor:pointer}
.nav-dropdown-toggle::after{content:" \25BE";font-size:.7em}
.nav-dropdown-menu{
  display:none;position:absolute;top:100%;left:0;padding:.5rem 0;padding-top:.8rem;list-style:none;
  background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-sm);min-width:230px;
  box-shadow:var(--shadow);z-index:100;
}
.nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown:focus-within .nav-dropdown-menu{display:block}
.nav-dropdown-menu li a{display:block;padding:.4rem 1rem;font-size:13px;color:var(--ink-2);white-space:nowrap}
.nav-dropdown-menu li a:hover,.nav-dropdown-menu li a:focus-visible{color:var(--accent);text-decoration:none;background:var(--accent-50)}

/* ---------- footer ---------- */
.site-footer{
  border-top:1px solid var(--line);padding:40px 0 60px;margin-top:40px;
  font-family:var(--mono);font-size:13px;color:var(--ink-3);
}
.site-footer .footer-content{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px}
.site-footer .footer-links{display:flex;gap:18px}
.site-footer .footer-links a{color:var(--ink-3)}
.site-footer .footer-links a:hover,.site-footer .footer-links a:focus-visible{color:var(--accent)}

/* ---------- back link + case-study shell ---------- */
.back-link{display:inline-block;font-family:var(--mono);font-size:13px;color:var(--ink-3);margin:22px 0 14px}
.back-link:hover{color:var(--accent)}
.cs{
  background:var(--surface);border:1px solid var(--line-2);border-radius:20px;
  box-shadow:var(--shadow-lg);overflow:hidden;margin-bottom:24px;
}

/* ---------- homepage ---------- */
.intro{padding:72px 0 40px;border-bottom:1px solid var(--line)}
.intro h1{font-size:clamp(30px,4.8vw,52px);line-height:1.05;max-width:20ch;margin-bottom:20px}
.intro p{font-size:clamp(17px,2vw,20px);color:var(--ink-2);max-width:62ch}

#services{padding:56px 0;border-bottom:1px solid var(--line)}
#services>h2,#work>h2{font-size:clamp(22px,3vw,30px);margin-bottom:28px}

.service-list{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.service-item{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:22px;box-shadow:var(--shadow-sm)}
.service-item h3{font-size:18px;margin-bottom:8px}
.service-item>p{font-size:14.5px;color:var(--ink-2)}
.service-details{list-style:none;margin-top:12px;display:grid;gap:7px;font-size:13px;color:var(--ink-3)}
.service-details li{padding-left:16px;position:relative}
.service-details li::before{content:"";position:absolute;left:0;top:8px;width:7px;height:7px;border-radius:2px;background:var(--accent-100);border:1px solid var(--accent)}
.service-details a{color:var(--accent)}

#work{padding:56px 0}
.work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.work-card{
  display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);
  border-radius:var(--radius);padding:22px;box-shadow:var(--shadow-sm);transition:border-color .2s,box-shadow .2s;
}
.work-card:hover,.work-card:focus-within{border-color:var(--accent);box-shadow:var(--shadow)}
.work-card .stat{display:flex;flex-direction:column;gap:2px;margin-bottom:14px}
.work-card .stat .n{font-family:var(--display);font-weight:600;font-size:30px;color:var(--accent);letter-spacing:-.02em;line-height:1}
.work-card .stat .l{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3)}
.work-card h3{font-size:18px;margin-bottom:6px}
.work-card h3 a{color:var(--ink)}
.work-card h3 a:hover{color:var(--accent);text-decoration:none}
.work-card .subtitle{font-size:13.5px;color:var(--ink-2);margin-bottom:14px}
.work-card .tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:auto}
.tag{font-family:var(--mono);font-size:11px;background:var(--accent-50);color:var(--accent-ink);padding:.2rem .55rem;border-radius:5px}

/* ============================================================
   CASE STUDY COMPONENT LIBRARY
   (lifted verbatim from case-studies-redesign.html; works with
   system fonts because everything references --display/--body/--mono)
   ============================================================ */

/* ---------- hero ---------- */
.cs-hero{
  background:
    radial-gradient(120% 120% at 85% -10%, rgba(47,85,240,.30), transparent 55%),
    linear-gradient(180deg,#0C1322,#0A1020);
  color:#EAEEF6;padding:48px 44px 40px;position:relative;overflow:hidden;
}
.cs-hero::before{
  content:"";position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:34px 34px;mask-image:radial-gradient(circle at 80% 0%,#000,transparent 70%);
}
.cs-hero>*{position:relative}
.cs-eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#9DB4FF;display:flex;align-items:center;gap:10px}
.cs-eyebrow .org{color:#fff;font-weight:600}
.cs-hero h1{color:#fff;font-size:clamp(30px,4.6vw,52px);line-height:1.05;margin:18px 0 16px;max-width:17ch}
.cs-hero .deck{font-size:clamp(17px,2.1vw,20px);color:#C3CEE4;max-width:60ch}
.cs-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
.cs-stat{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.10);border-radius:12px;padding:18px 16px;backdrop-filter:blur(4px)}
.cs-stat .v{font-family:var(--display);font-weight:600;font-size:clamp(26px,3.2vw,34px);color:#fff;letter-spacing:-.02em;line-height:1}
.cs-stat .v small{font-size:.55em;color:#9DB4FF;font-weight:500}
.cs-stat .k{font-family:var(--mono);font-size:11.5px;color:#9FAEC8;margin-top:9px;letter-spacing:.02em;line-height:1.35}
.cs-meta{display:flex;flex-wrap:wrap;gap:0;margin-top:30px;border-top:1px solid rgba(255,255,255,.12);padding-top:20px}
.cs-meta .m{padding-right:30px;margin-right:30px;border-right:1px solid rgba(255,255,255,.10)}
.cs-meta .m:last-child{border-right:0}
.cs-meta .mk{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#7E8DA8}
.cs-meta .mv{font-size:14.5px;color:#DCE3F0;margin-top:4px;font-weight:500}

/* ---------- body ---------- */
.cs-body{padding:8px 44px 46px}
.cs-section{padding:42px 0;border-bottom:1px solid var(--line)}
.cs-section:last-child{border-bottom:0}
.cs-section>.lab{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;display:flex;align-items:center;gap:10px}
.cs-section>.lab .ix{color:var(--ink-3)}
.cs-section h2{font-size:clamp(23px,3vw,30px);margin-bottom:16px;max-width:24ch}
.cs-section p{font-size:16px;color:var(--ink-2);max-width:68ch;margin-bottom:14px}
.cs-section p strong{color:var(--ink)}

/* at a glance */
.glance{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;background:var(--surface)}
.glance .g{padding:24px 22px;border-right:1px solid var(--line)}
.glance .g:last-child{border-right:0}
.glance .g.out{background:var(--accent-50)}
.glance .gk{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);margin-bottom:10px}
.glance .g.out .gk{color:var(--accent-ink)}
.glance .gv{font-size:15.5px;color:var(--ink);font-weight:450;line-height:1.5}
.glance .g.out .gv{color:var(--accent-ink);font-weight:500}

/* pipeline flow */
.flow{display:flex;align-items:stretch;gap:0;flex-wrap:wrap;margin:6px 0 8px}
.flow .node{
  flex:1;min-width:150px;background:var(--surface);border:1px solid var(--line-2);border-radius:11px;
  padding:15px 15px;box-shadow:var(--shadow-sm);position:relative;
}
.flow .node .nk{font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
.flow .node .nt{font-family:var(--display);font-weight:600;font-size:17px;margin:6px 0 3px}
.flow .node .nd{font-size:12.5px;color:var(--ink-3)}
.flow .arrow{flex:none;align-self:center;color:var(--line-2);padding:0 4px;font-size:20px;display:grid;place-items:center}
.flow .arrow svg{width:22px;height:22px}

/* channel cards */
.channels{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:8px}
.chan{border:1px solid var(--line);border-radius:11px;padding:16px 14px;background:var(--surface);box-shadow:var(--shadow-sm);position:relative}
.chan .id{font-family:var(--mono);font-weight:600;font-size:13px;color:#fff;background:var(--accent);width:26px;height:26px;border-radius:7px;display:grid;place-items:center;margin-bottom:12px}
.chan h4{font-size:15px;margin-bottom:6px;letter-spacing:-.01em}
.chan p{font-size:12.5px;color:var(--ink-3);margin:0}
.chan .typ{position:absolute;top:14px;right:12px;font-family:var(--mono);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;padding:3px 7px;border-radius:5px}
.chan .typ.proc{color:var(--accent-ink);background:var(--accent-50)}
.chan .typ.out{color:#7a4a00;background:var(--t3-bg)}

/* callout aside */
.aside{
  border-left:3px solid var(--accent);background:var(--accent-50);border-radius:0 11px 11px 0;
  padding:16px 20px;margin:22px 0 4px;
}
.aside .at{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-ink);margin-bottom:6px}
.aside p{font-size:14px;color:var(--ink-2);margin:0;max-width:none}

/* viz: triage bar */
.viz{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:26px 26px 24px;box-shadow:var(--shadow-sm);margin:8px 0 22px}
.viz .vtitle{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px;margin-bottom:6px}
.viz .vtitle h4{font-size:17px}
.viz .vtitle .vsub{font-family:var(--mono);font-size:12px;color:var(--ink-3)}
.triage{display:flex;height:54px;border-radius:9px;overflow:hidden;margin:18px 0 14px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.03)}
.triage .seg{display:flex;flex-direction:column;justify-content:center;padding:0 14px;color:#fff;min-width:0}
.triage .seg .p{font-family:var(--display);font-weight:600;font-size:18px;line-height:1}
.triage .seg .l{font-size:10.5px;opacity:.92;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:3px}
.legend{display:flex;flex-wrap:wrap;gap:18px;margin-top:6px}
.legend .li{display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:var(--ink-2);max-width:230px}
.legend .sw{width:11px;height:11px;border-radius:3px;flex:none;margin-top:4px}

/* viz: lift bars */
.lift{display:grid;gap:18px;margin-top:6px}
.lift .row .rl{display:flex;justify-content:space-between;align-items:baseline;font-size:13.5px;margin-bottom:9px}
.lift .row .rl b{font-family:var(--display);font-weight:600}
.lift .row .rl .x{font-family:var(--mono);font-size:12px;color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:5px}
.track{position:relative;background:#EEF1F5;border-radius:7px;height:30px;overflow:hidden}
.track .base{position:absolute;left:0;top:0;bottom:0;background:#C9D2DE;display:flex;align-items:center;padding-left:10px}
.track .fill{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,var(--accent),#5d7bf5);display:flex;align-items:center;padding-left:10px;color:#fff;font-family:var(--mono);font-size:12px;font-weight:500}
.track .blab{font-family:var(--mono);font-size:11px;color:#5b6677}

/* terminal / deliverable */
.terminal{background:#0C1322;border-radius:12px;overflow:hidden;border:1px solid #1e2840;margin-top:6px}
.terminal .tt{display:flex;align-items:center;gap:7px;padding:11px 15px;border-bottom:1px solid #1c2540}
.terminal .tt i{width:10px;height:10px;border-radius:50%;display:block}
.terminal .tt .fn{font-family:var(--mono);font-size:11.5px;color:#7E8DA8;margin-left:8px}
.terminal pre{padding:18px 18px;font-family:var(--mono);font-size:13px;color:#D7E0F2;overflow-x:auto;line-height:1.7}
.terminal pre .c{color:#6E7B95}
.terminal pre .g{color:#6BD08A}
.terminal pre .b{color:#7CA0FF}

/* takeaway */
.takeaway{background:var(--ink);color:#EAEEF6;border-radius:var(--radius);padding:36px 40px;position:relative;overflow:hidden}
.takeaway::before{content:"\201C";position:absolute;top:-10px;left:24px;font-family:var(--display);font-size:130px;color:rgba(255,255,255,.07);line-height:1}
.takeaway .lab{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#9DB4FF;margin-bottom:14px}
.takeaway p{font-family:var(--display);font-weight:500;font-size:clamp(19px,2.4vw,25px);line-height:1.4;color:#fff;max-width:40ch;margin:0;letter-spacing:-.01em}

/* CTA */
.cta{background:linear-gradient(120deg,var(--accent),#1B37A8);color:#fff;border-radius:var(--radius);padding:34px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:8px}
.cta h3{color:#fff;font-size:22px;margin-bottom:6px;max-width:24ch}
.cta p{color:#D5DEFB;font-size:15px;margin:0;max-width:42ch}
.btn{display:inline-flex;align-items:center;gap:9px;background:#fff;color:var(--accent-ink);font-family:var(--mono);font-size:13.5px;font-weight:600;padding:13px 22px;border-radius:9px;white-space:nowrap}
.btn:hover{text-decoration:none;transform:translateY(-1px);box-shadow:0 8px 20px -8px rgba(0,0,0,.4)}
.btn.ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.3)}

/* mini charts (range plots) */
.mini{margin:4px 0 16px}
.mini .mrow{display:grid;grid-template-columns:74px 1fr 54px;align-items:center;gap:10px;margin:7px 0;font-size:12px}
.mini .mrow .ml{font-family:var(--mono);color:var(--ink-3);text-align:right;font-size:11px}
.mini .mrow .mt{background:#EEF1F5;border-radius:5px;height:16px;overflow:hidden}
.mini .mrow .mt i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--accent),#6c87f6)}
.mini .mrow .mv{font-family:var(--mono);color:var(--ink-2);font-size:11px}
.mini .range{position:relative;height:16px;background:#EEF1F5;border-radius:5px}
.mini .range .span{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,#bcd0f8,var(--accent));border-radius:5px}
.mini .range .dot{position:absolute;top:50%;width:9px;height:9px;border-radius:50%;background:#fff;border:2px solid var(--accent-ink);transform:translate(-50%,-50%)}

/* code block (reused by A&T config snippet) */
.code-block{background:var(--ink);color:#D7E0F2;border-radius:12px;border:1px solid #1e2840;overflow:hidden;margin:18px 0;font-size:13px;line-height:1.6}
.code-block .filename{display:block;padding:11px 15px;font-size:11.5px;color:#7E8DA8;border-bottom:1px solid #1c2540;font-family:var(--mono)}
.code-block pre{padding:16px 18px;margin:0;overflow-x:auto;font-family:var(--mono)}
.code-block code{font-family:var(--mono)}

/* ---------- CV page (orphaned, preserved) ---------- */
.cv-section{padding:2rem 0}
.cv-section h2{margin-bottom:1rem}
.cv-entry{margin-bottom:1.5rem}
.cv-entry:last-child{margin-bottom:0}
.cv-entry h3{font-size:1rem;margin-bottom:.1rem}
.cv-entry .org{font-size:.9rem;color:var(--ink-2)}
.cv-entry .dates{font-size:.82rem;color:var(--ink-3);margin-bottom:.4rem}
.cv-entry p,.cv-entry ul{font-size:.92rem}
.cv-entry ul{list-style:disc;padding-left:1.25rem}
.cv-entry ul li + li{margin-top:.25rem}
.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.skills-grid h3{font-size:.95rem}
.skills-grid p{font-size:.9rem;color:var(--ink-2)}
.placeholder{color:var(--text-placeholder);font-style:italic}

/* ---------- responsive ---------- */
@media (max-width:880px){
  .service-list,.work-grid{grid-template-columns:1fr}
  .channels{grid-template-columns:repeat(2,1fr)}
  .cs-stats{grid-template-columns:repeat(2,1fr)}
  .glance{grid-template-columns:1fr}
  .glance .g{border-right:0;border-bottom:1px solid var(--line)}
  .glance .g:last-child{border-bottom:0}
  .cs-hero,.cs-body{padding-left:22px;padding-right:22px}
  .flow .node{min-width:calc(50% - 20px)}
  .flow .arrow{display:none}
  .cs-meta .m{border-right:0;padding-right:0;margin-right:0;width:50%;margin-bottom:14px}
  .site-header .container{height:auto;flex-direction:column;gap:.6rem;padding-top:14px;padding-bottom:14px}
}
@media (max-width:560px){
  .cs-stats{grid-template-columns:1fr 1fr}
  .channels{grid-template-columns:1fr}
  .cta,.takeaway{padding:24px}
  .container{padding:0 18px}
  .footer-content{flex-direction:column;text-align:center}
}
@media print{.site-header{display:none}body{background:#fff}}
```

- [ ] **Step 2: Verify the build succeeds with the new stylesheet**

Run: `npm run build`
Expected: `✓ built in …`, no errors.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: rewrite style.css with redesign tokens, system fonts, component library"
```

---

## Task 2: Rebuild UNICEF JME page (reference page)

Replace only the `<main>` element. The hero + body content is the approved exemplar; copy it verbatim from the committed mockup.

**Files:**
- Modify: `case-studies/unicef-dq-screener.html` (replace the `<main class="container"> … </main>` block, lines 32&ndash;187)

- [ ] **Step 1: Replace the entire `<main class="container"> … </main>` block with this skeleton**

```html
  <main class="container">
    <a href="/" class="back-link">&larr; Home</a>
    <article class="cs">
      <!-- PASTE MOCKUP CONTENT HERE (see Step 2) -->
    </article>
  </main>
```

- [ ] **Step 2: Paste the exemplar content inside `<article class="cs">`**

Open `case-studies-redesign.html` and copy **lines 526&ndash;686** verbatim — that is the `<div class="cs-hero"> … </div>` block immediately followed by the `<div class="cs-body"> … </div>` block (ending at `</div><!-- /cs-body -->`). Paste them as the children of `<article class="cs">`, replacing the placeholder comment.

Do **not** copy the surrounding `<div class="frame">` / `.frame-bar` (browser chrome) — those are mockup-only.

After pasting, confirm the CTA links at the end read:
```html
<a class="btn" href="mailto:aaron@a3di.dev">aaron@a3di.dev &rarr;</a>
<a class="btn ghost" href="https://www.a3di.dev/#work">See more work</a>
```

- [ ] **Step 3: Verify build + visuals**

Run: `npm run build` → expect success.
Run: `npm run dev`, open `http://localhost:5173/case-studies/unicef-dq-screener.html`. Confirm:
- Dark hero with 4 stat tiles (70% / 85% / 2.8× / ~1 sec) and the meta row.
- At-a-glance band (3 cells, last one accent-tinted).
- Pipeline flow with arrows; 5 channel cards (A,B,C,E,F).
- Triage stacked bar (70/17/9/4) and the two lift bars.
- Terminal block; dark takeaway; gradient CTA.
- Header/footer restyled (sticky bar, accent dot on brand), dropdown still opens on hover.

- [ ] **Step 4: Commit**

```bash
git add case-studies/unicef-dq-screener.html
git commit -m "feat: rebuild UNICEF JME case study with redesigned layout"
```

---

## Task 3: Rebuild Alive & Thrive page

**Files:**
- Modify: `case-studies/alive-and-thrive.html` (replace the `<main class="container"> … </main>` block, lines 36&ndash;210)

- [ ] **Step 1: Replace the entire `<main class="container"> … </main>` block with the following**

```html
  <main class="container">
    <a href="/" class="back-link">&larr; Home</a>
    <article class="cs">

      <div class="cs-hero">
        <div class="cs-eyebrow"><span class="org">Alive &amp; Thrive</span> &middot; FHI Solutions</div>
        <h1>Uncovering who is furthest behind</h1>
        <p class="deck">Two decades of maternal and child nutrition data across Cambodia, Lao&nbsp;PDR, and Viet&nbsp;Nam &mdash; harmonised into one pipeline that shows whether progress is reaching the people national averages hide.</p>

        <div class="cs-stats">
          <div class="cs-stat"><div class="v">35<small>pp</small></div><div class="k">widest equity gap surfaced &mdash; between ethnic groups in Lao&nbsp;PDR</div></div>
          <div class="cs-stat"><div class="v">15<small>+</small></div><div class="k">MICS &amp; DHS survey rounds harmonised</div></div>
          <div class="cs-stat"><div class="v">3</div><div class="k">countries, across 20+ years of data</div></div>
          <div class="cs-stat"><div class="v">5</div><div class="k">equity stratifiers, every indicator</div></div>
        </div>

        <div class="cs-meta">
          <div class="m"><div class="mk">Client</div><div class="mv">Alive &amp; Thrive (FHI Solutions)</div></div>
          <div class="m"><div class="mk">Role</div><div class="mv">Design &amp; build</div></div>
          <div class="m"><div class="mk">Stack</div><div class="mv">Python, configuration-driven</div></div>
          <div class="m"><div class="mk">Data</div><div class="mv">15+ rounds &middot; Cambodia, Lao PDR, Viet Nam</div></div>
          <div class="m"><div class="mk">Timeline</div><div class="mv">Apr &ndash; Dec 2022</div></div>
        </div>
      </div>

      <div class="cs-body">

        <div class="cs-section">
          <div class="lab">At a glance</div>
          <div class="glance">
            <div class="g">
              <div class="gk">The problem</div>
              <div class="gv">National averages can hide who is being left behind. A&amp;T needed to know whether 20 years of MCHN progress reached ethnic minorities, rural communities, and the poorest households &mdash; but the evidence sat in dozens of incompatible survey files.</div>
            </div>
            <div class="g">
              <div class="gk">What I built</div>
              <div class="gv">A configuration-driven Python pipeline that harmonises 15+ MICS/DHS rounds, computes standard MCHN indicators, and disaggregates every one by five equity stratifiers across more than 20 years.</div>
            </div>
            <div class="g out">
              <div class="gk">The outcome</div>
              <div class="gv">Per-country equity profiles that surfaced gaps the averages hid &mdash; including a 35-percentage-point gap between ethnic groups in Lao&nbsp;PDR &mdash; delivered as a reusable asset that extends to new countries and rounds.</div>
            </div>
          </div>
        </div>

        <div class="cs-section">
          <div class="lab"><span class="ix">01</span> Challenge</div>
          <h2>National averages mask who progress reaches</h2>
          <p>Alive &amp; Thrive needed to understand how maternal and child health and nutrition outcomes had changed over two decades across Cambodia, Lao&nbsp;PDR, and Viet&nbsp;Nam &mdash; and, critically, whether that progress was reaching the most vulnerable populations.</p>
          <p>Improvements in antenatal care, breastfeeding, or dietary diversity at the country level may not reflect the reality for ethnic minorities, rural communities, or the poorest households. But the data sat in dozens of separate survey files, collected with <strong>different instruments and variable definitions</strong> over more than 20 years.</p>
          <div class="aside">
            <div class="at">The real requirement</div>
            <p>A reusable evidence base &mdash; not a one-off report &mdash; that A&amp;T could extend to new countries and survey rounds without rebuilding the analysis from scratch.</p>
          </div>
        </div>

        <div class="cs-section">
          <div class="lab"><span class="ix">02</span> Approach</div>
          <h2>One config per survey, five equity lenses on every indicator</h2>
          <p>A3DI built a reproducible, configuration-driven analysis pipeline in Python to harmonise 15+ rounds of MICS and DHS surveys across the three countries, then disaggregate every indicator across five stratifiers and across time.</p>

          <div class="flow">
            <div class="node"><div class="nk">Input</div><div class="nt">Raw SPSS</div><div class="nd">15+ MICS/DHS rounds</div></div>
            <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            <div class="node"><div class="nk">Configure</div><div class="nt">JSON per country-year</div><div class="nd">variable mapping</div></div>
            <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            <div class="node"><div class="nk">Harmonise</div><div class="nt">Merge &amp; compute</div><div class="nd">weighted MCHN indicators</div></div>
            <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            <div class="node" style="border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-50)"><div class="nk">Disaggregate</div><div class="nt">5 stratifiers</div><div class="nd">+ weighted logistic trends</div></div>
          </div>

          <div class="code-block">
            <span class="filename">config/vnm_2021_children.json</span>
            <pre><code>{
  "country": "VNM",
  "survey_year": 2021,
  "survey_type": "MICS",
  "indicators": {
    "excl_bf": "BD2",
    "cont_bf": "BD3",
    "mdd_ch": ["food_grp_1", "food_grp_2", "food_grp_3"],
    "mmf_ch": "BD7",
    "mad_ch": ["mdd_ch", "mmf_ch"]
  },
  "equity_stratifiers": {
    "wealth_q": "windex5",
    "region": "HH7",
    "residence": "HH6",
    "eth_hoh": "ethnicity",
    "mother_edu": "welevel"
  }
}</code></pre>
          </div>

          <div class="aside">
            <div class="at">Why it earns trust</div>
            <p>Each country-year maps raw survey variables to standardised indicator definitions through a <strong>JSON config, not hardcoded logic</strong> &mdash; so Viet&nbsp;Nam&rsquo;s 2000 MICS and Cambodia&rsquo;s 2021 DHS run through the same codebase. Every statistic is weighted for the complex survey designs, and disaggregated by wealth quintile, region, residence, ethnicity of household head, and mother&rsquo;s education.</p>
          </div>
        </div>

        <div class="cs-section">
          <div class="lab"><span class="ix">03</span> Result</div>
          <h2>Progress was real &mdash; but deeply uneven</h2>

          <div class="viz">
            <div class="vtitle"><h4>The gap national averages hid</h4><span class="vsub">Lao PDR &middot; between ethnic groups</span></div>
            <div class="mini" aria-hidden="true">
              <div class="mrow"><span class="ml">Majority</span><div class="mt"><i style="width:84%"></i></div><span class="mv">higher</span></div>
              <div class="mrow"><span class="ml">Minority</span><div class="mt"><i style="width:49%;background:linear-gradient(90deg,#E5484D,#f08a8d)"></i></div><span class="mv">lower</span></div>
              <div class="mrow"><span class="ml">Gap</span><div class="range"><div class="span" style="left:49%;width:35%;background:repeating-linear-gradient(45deg,#0c1322,#0c1322 5px,#26324a 5px,#26324a 10px)"></div></div><span class="mv">35pp</span></div>
            </div>
            <p style="font-size:12px;color:var(--ink-3);margin:0;max-width:none">Schematic of the pattern; <strong>35pp is the real finding</strong> &mdash; the breastfeeding/dietary-diversity gap between ethnic groups. The national average sits between the two.</p>
          </div>

          <p>The analysis produced a comprehensive equity profile for each country. Wealth-driven disparities persisted across most indicators; access to services like antenatal care and institutional delivery had expanded substantially, but the <strong>quality</strong> of care within them improved far less.</p>
          <p>Regional and ethnic disparities remained substantial &mdash; particularly in Lao&nbsp;PDR, where gaps in breastfeeding and dietary diversity between ethnic groups <strong>exceeded 35 percentage points</strong>. A&amp;T used the findings to inform country strategies, advocacy with government and donors, and regional knowledge products. Because the pipeline is configuration-driven, it extends to new countries or survey rounds without rebuilding &mdash; a reusable asset, not a one-off deliverable.</p>
        </div>

        <div class="cs-section">
          <div class="takeaway">
            <div class="lab">The takeaway</div>
            <p>When national averages show progress, disaggregated analysis is the only way to know whether it reaches the people who need it most.</p>
          </div>
        </div>

        <div class="cs-section" style="border-bottom:0;padding-bottom:8px">
          <div class="cta">
            <div>
              <h3>Need to know who your averages are hiding?</h3>
              <p>I build reproducible, configuration-driven pipelines that turn scattered survey rounds into equity evidence your team can extend.</p>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <a class="btn" href="mailto:aaron@a3di.dev">aaron@a3di.dev &rarr;</a>
              <a class="btn ghost" href="https://www.a3di.dev/#work">See more work</a>
            </div>
          </div>
        </div>

      </div>
    </article>
  </main>
```

- [ ] **Step 2: Verify build + visuals**

Run: `npm run build` → expect success.
Run: `npm run dev`, open `http://localhost:5173/case-studies/alive-and-thrive.html`. Confirm: dark hero with 35pp lead stat; at-a-glance band; 4-node flow; JSON code block renders dark with filename; equity-gap mini chart with honest caption; takeaway + CTA.

- [ ] **Step 3: Commit**

```bash
git add case-studies/alive-and-thrive.html
git commit -m "feat: rebuild Alive & Thrive case study with redesigned layout"
```

---

## Task 4: Rebuild Namibia NHIES page

**Files:**
- Modify: `case-studies/namibia-nhies.html` (replace the `<main class="container"> … </main>` block, lines 36&ndash;208)

- [ ] **Step 1: Replace the entire `<main class="container"> … </main>` block with the following**

The range-plot bar widths are computed on a common 0&ndash;460 g/c/d axis (`left = min/460`, `width = (max&minus;min)/460`), so the bars are comparable across vehicles.

```html
  <main class="container">
    <a href="/" class="back-link">&larr; Home</a>
    <article class="cs">

      <div class="cs-hero">
        <div class="cs-eyebrow"><span class="org">Iodine Global Network</span> &middot; Namibia</div>
        <h1>Informing national fortification policy</h1>
        <p class="deck">Multi-source analysis of what Namibian households actually eat &mdash; by region and by supply chain &mdash; to turn a blanket fortification mandate into a targeted, evidence-based policy.</p>

        <div class="cs-stats">
          <div class="cs-stat"><div class="v">10<small>&times;</small></div><div class="k">regional spread in staple intake (wheat 30&ndash;292 g/c/d)</div></div>
          <div class="cs-stat"><div class="v">14</div><div class="k">regions analysed</div></div>
          <div class="cs-stat"><div class="v">7</div><div class="k">fortification vehicles assessed</div></div>
          <div class="cs-stat"><div class="v">199</div><div class="k">food items harmonised into one FCT</div></div>
        </div>

        <div class="cs-meta">
          <div class="m"><div class="mk">Client</div><div class="mv">Iodine Global Network (IGN)</div></div>
          <div class="m"><div class="mk">Role</div><div class="mv">Analysis &amp; modelling</div></div>
          <div class="m"><div class="mk">Data</div><div class="mv">NHIES 2015&ndash;16 &middot; DHS 2000&ndash;2013 &middot; 4 FCTs</div></div>
          <div class="m"><div class="mk">Scale</div><div class="mv">14 regions &middot; 7 vehicles</div></div>
          <div class="m"><div class="mk">Timeline</div><div class="mv">Jul 2020 &ndash; Apr 2021</div></div>
        </div>
      </div>

      <div class="cs-body">

        <div class="cs-section">
          <div class="lab">At a glance</div>
          <div class="glance">
            <div class="g">
              <div class="gk">The problem</div>
              <div class="gv">Namibia committed to mandatory staple-food fortification &mdash; but setting standards needs evidence: which foods households eat, how much, through which supply chains, and how that varies across 14 regions.</div>
            </div>
            <div class="g">
              <div class="gk">What I built</div>
              <div class="gv">A modular Python system over NHIES 2015&ndash;16, three DHS rounds, and four food-composition tables &mdash; computing weighted per-capita intake for seven candidate vehicles and a harmonised 199-item nutrient database.</div>
            </div>
            <div class="g out">
              <div class="gk">The outcome</div>
              <div class="gv">Regional fortification vehicle profiles showing ~10&times; variation in staple intake and &gt;45% own-production share for some grains &mdash; evidence that a blanket commercial mandate alone would not reach everyone.</div>
            </div>
          </div>
        </div>

        <div class="cs-section">
          <div class="lab"><span class="ix">01</span> Challenge</div>
          <h2>You cannot set fortification standards on a national average</h2>
          <p>Namibia&rsquo;s Food and Nutrition Security Policy committed the government to mandatory fortification of staple foods. But before setting standards, policymakers needed answers: which foods do households actually consume, in what quantities, and through which supply chains? How does that vary across 14 regions? And what is the baseline for nutrients &mdash; like iodine &mdash; where fortification is already underway?</p>
          <p>The Iodine Global Network contracted A3DI to build the evidence around the 2015&ndash;16 National Household Income and Expenditure Survey (NHIES) &mdash; a 12-month, nationally representative survey with seven-day food diaries. The raw microdata had not been analysed at the detail needed for <strong>vehicle selection, dosage setting, or supply-chain targeting</strong>.</p>
          <div class="aside">
            <div class="at">The real requirement</div>
            <p>Region-level evidence for vehicle selection, dosage setting, and supply-chain targeting &mdash; not a single national figure that hides where the policy would and would not reach.</p>
          </div>
        </div>

        <div class="cs-section">
          <div class="lab"><span class="ix">02</span> Approach</div>
          <h2>Three data sources, seven vehicles, fourteen regions</h2>
          <p>A3DI built a modular analysis system in Python across 15+ Jupyter notebooks, with a custom analytics module for weighted survey calculations (weighted means, weighted medians, and a generalised disaggregation function). The work ran in four interconnected phases.</p>

          <div class="flow">
            <div class="node"><div class="nk">Input</div><div class="nt">3 data sources</div><div class="nd">NHIES, DHS salt, 4 FCTs</div></div>
            <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            <div class="node"><div class="nk">Baseline</div><div class="nt">Grain consumption</div><div class="nd">own-production vs market</div></div>
            <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            <div class="node"><div class="nt">Compute</div><div class="nk">Intake</div><div class="nd">g/c/d &times; 7 vehicles &times; 14 regions</div></div>
            <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            <div class="node" style="border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-50)"><div class="nk">Harmonise</div><div class="nt">199-item FCT</div><div class="nd">&rarr; vehicle profiles</div></div>
          </div>

          <div class="aside">
            <div class="at">Why the sourcing distinction matters</div>
            <p>Only commercially processed grain can be fortified, so the pipeline tracked <strong>own-production vs market purchase</strong>, not just intake. Four food-composition tables (West African 2012, Kenyan, USDA SR24, South African 2017 &mdash; the last PDF-extracted with Camelot) were standardised into one 199-item dataset that fed FAO&rsquo;s ADePT-Food Security Module for micronutrient adequacy modelling.</p>
          </div>
        </div>

        <div class="cs-section">
          <div class="lab"><span class="ix">03</span> Result</div>
          <h2>Consumption varies up to tenfold across regions</h2>

          <div class="viz">
            <div class="vtitle"><h4>Staple intake ranges across 14 regions</h4><span class="vsub">g/c/d, min&ndash;max on a common 0&ndash;460 scale</span></div>
            <div class="mini">
              <div class="mrow"><span class="ml">Wheat</span><div class="range"><div class="span" style="left:6%;width:57%"></div></div><span class="mv">30&ndash;292</span></div>
              <div class="mrow"><span class="ml">Mahangu</span><div class="range"><div class="span" style="left:1%;width:97%"></div></div><span class="mv">4&ndash;452</span></div>
              <div class="mrow"><span class="ml">Maize</span><div class="range"><div class="span" style="left:15%;width:59%"></div></div><span class="mv">67&ndash;338</span></div>
              <div class="mrow"><span class="ml">Salt</span><div class="range"><div class="span" style="left:1%;width:2%"></div></div><span class="mv">2.8&ndash;7.5</span></div>
            </div>
            <p style="font-size:12px;color:var(--ink-3);margin:0;max-width:none">Min&ndash;max across the 14 regions, straight from the NHIES analysis.</p>
          </div>

          <p>Wheat intake ranged from 30 to 292 g/c/d across regions; mahangu from 4 to 452; maize from 67 to 338. Own-production consumption <strong>exceeded 45%</strong> for certain grains in specific regions &mdash; meaning a substantial share of grain intake would not be reached by mandatory commercial fortification alone.</p>
          <p>Salt consumption averaged 5.4 g/c/d nationally (median 4.9), ranging from 2.8 to 7.5 across regions &mdash; essential for setting dosage that delivers adequate micronutrients without exceeding safe limits. The harmonised Food Composition Table gave government and IGN a standardised, locally relevant nutrient database, delivered as reproducible Jupyter notebooks with Excel workbook outputs the team can re-run as new data arrives.</p>
        </div>

        <div class="cs-section">
          <div class="takeaway">
            <div class="lab">The takeaway</div>
            <p>Fortification policy needs more than knowing what people eat &mdash; it needs how much, where, and through which supply chains.</p>
          </div>
        </div>

        <div class="cs-section" style="border-bottom:0;padding-bottom:8px">
          <div class="cta">
            <div>
              <h3>Turning multi-source data into policy evidence?</h3>
              <p>I harmonise messy, multi-source survey and composition data into reproducible analysis your stakeholders can explore and update.</p>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <a class="btn" href="mailto:aaron@a3di.dev">aaron@a3di.dev &rarr;</a>
              <a class="btn ghost" href="https://www.a3di.dev/#work">See more work</a>
            </div>
          </div>
        </div>

      </div>
    </article>
  </main>
```

- [ ] **Step 2: Verify build + visuals**

Run: `npm run build` → expect success.
Run: `npm run dev`, open `http://localhost:5173/case-studies/namibia-nhies.html`. Confirm: dark hero with 10× lead stat; at-a-glance band; 4-node flow; range plot with four vehicle bars on the common scale (salt bar is a tiny sliver, as intended); takeaway + CTA.

- [ ] **Step 3: Commit**

```bash
git add case-studies/namibia-nhies.html
git commit -m "feat: rebuild Namibia NHIES case study with redesigned layout"
```

---

## Task 5: Homepage — add a hero stat to each case-study card

Only the three `.work-card` blocks change (a `.stat` is added at the top of each). The new CSS already styles intro/services/cards; no other markup edits are needed.

**Files:**
- Modify: `index.html:99-127` (the `.work-grid` block)

- [ ] **Step 1: Replace the `<div class="work-grid"> … </div>` block with the following**

```html
      <div class="work-grid">
        <div class="work-card">
          <div class="stat"><span class="n">35pp</span><span class="l">equity gap surfaced</span></div>
          <h3><a href="/case-studies/alive-and-thrive.html">Uncovering Who Is Furthest Behind</a></h3>
          <p class="subtitle">Multi-country MCHN equity analysis for Alive &amp; Thrive</p>
          <div class="tags">
            <span class="tag">Python</span>
            <span class="tag">Survey Analysis</span>
            <span class="tag">Data Pipeline</span>
          </div>
        </div>
        <div class="work-card">
          <div class="stat"><span class="n">70%</span><span class="l">auto-cleared, zero review</span></div>
          <h3><a href="/case-studies/unicef-dq-screener.html">Data Quality Screening at Scale</a></h3>
          <p class="subtitle">Automated quality checks across 1,000+ surveys for UNICEF JME</p>
          <div class="tags">
            <span class="tag">Stata &rarr; R</span>
            <span class="tag">Pipeline</span>
            <span class="tag">Data Quality</span>
          </div>
        </div>
        <div class="work-card">
          <div class="stat"><span class="n">10&times;</span><span class="l">regional intake spread</span></div>
          <h3><a href="/case-studies/namibia-nhies.html">Informing National Fortification Policy</a></h3>
          <p class="subtitle">Multi-source food consumption analysis for Namibia&rsquo;s fortification strategy</p>
          <div class="tags">
            <span class="tag">Python</span>
            <span class="tag">Survey Analysis</span>
            <span class="tag">Policy</span>
          </div>
        </div>
      </div>
```

- [ ] **Step 2: Verify build + visuals**

Run: `npm run build` → expect success.
Run: `npm run dev`, open `http://localhost:5173/`. Confirm: wider (~1080px) layout; intro headline large; three service cards; three case-study cards each leading with a big accent stat; hover highlights the card border. Header/footer match the case-study pages.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: restyle homepage and add hero stat to each case-study card"
```

---

## Task 6: Update `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md` (Styling section + a note in Architecture)

- [ ] **Step 1: Replace the `## Styling` section (from the `## Styling` heading down to, but not including, `## Deployment`) with the following**

```markdown
## Styling

Single `style.css` file shared across all pages. **System font stack (no web fonts)** &mdash; three type roles are defined as CSS variables, all mapped to system stacks: `--display` (headings), `--body`, and `--mono`.

The visual language follows the case-studies redesign (see `case-studies-redesign.html`, the committed design reference, and `docs/superpowers/specs/2026-06-15-case-studies-redesign-design.md`). Charts and diagrams are **hand-rolled CSS &mdash; no chart library, no JS**.

### Design tokens (CSS custom properties)

- Palette: `--ink / --ink-2 / --ink-3` (text), `--paper / --surface / --surface-2` (backgrounds), `--line / --line-2` (borders)
- Accent: `--accent / --accent-ink / --accent-50 / --accent-100`
- Semantic tier scale (quality flagging): `--t1 / --t2 / --t3 / --ok` (+ matching `*-bg`)
- Surfaces: `--radius / --radius-sm`, `--shadow-sm / --shadow / --shadow-lg`
- Layout: `--maxw` (1080px)
- Legacy aliases (`--bg`, `--text`, `--dark`, `--border`, `--text-muted`, etc.) map onto the tokens above for back-compat with older markup and the orphaned CV page.

### Case-study component vocabulary

Case-study pages are `<main class="container"> > <article class="cs"> > .cs-hero + .cs-body`. Inside `.cs-body`, content is grouped into `.cs-section` blocks. Reusable components: `.glance` (at-a-glance band), `.flow`/`.node` (pipeline), `.channels`/`.chan` (channel cards), `.aside` (callout), `.viz` + `.triage`/`.lift`/`.mini` (CSS charts), `.terminal` and `.code-block` (code), `.takeaway` (pull-quote), `.cta`.

### Typography conventions (enforced across all HTML files)

- Em-dashes: spaced (` &mdash; `) for parenthetical breaks in prose
- En-dashes: unspaced (`&ndash;`) for numeric ranges (years, pages)
- British spelling: harmonise, analyse, optimise, programme, organisation
- Curly apostrophes: `&rsquo;` in prose (straight quotes in attributes/code only)
- Exception: publication titles are proper nouns &mdash; preserve original punctuation

Responsive breakpoints at `880px` and `560px`.
```

- [ ] **Step 2: Verify the doc reads correctly**

Run: `git diff CLAUDE.md` and confirm the Styling section reflects the new tokens, the no-web-fonts mapping, and the component vocabulary; the `## Deployment` section is intact below it.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md styling section for the redesign"
```

---

## Task 7: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean production build**

Run: `npm run build`
Expected: `✓ built in …`; `dist/index.html`, `dist/case-studies/{unicef-dq-screener,alive-and-thrive,namibia-nhies}.html` all present.

- [ ] **Step 2: Confirm no web fonts and no JS were introduced**

Run:
```bash
grep -rn "fonts.googleapis\|fonts.gstatic\|<script" index.html case-studies/ style.css
```
Expected: **no matches** (no Google Fonts links, no script tags).

- [ ] **Step 3: Cross-page + responsive visual check**

Run `npm run dev` and walk all four pages at desktop width, then narrow the window through the 880px and 560px breakpoints. Confirm on each:
- Header is sticky, brand shows the accent dot, the "Case Studies" dropdown opens on hover/focus (no JS) and links to all three studies.
- Case-study heroes: stat grids reflow 4 → 2 → 2/1; channel cards (UNICEF) reflow 5 → 2 → 1; glance band stacks; flow arrows hide on narrow.
- Footer restyled and consistent across pages.
- No horizontal overflow at 560px.

- [ ] **Step 4: Confirm the diff is scoped as expected**

Run: `git log --oneline main..HEAD` and `git diff --stat main..HEAD`
Expected commits: mockup/spec/plan, style.css, 3 case studies, homepage, CLAUDE.md. Files touched: `style.css`, the 3 case-study HTML files, `index.html`, `CLAUDE.md`, plus the committed `case-studies-redesign.html` and the `docs/` artifacts. `vite.config.js` unchanged.

- [ ] **Step 5: Integrate the branch**

Use the `superpowers:finishing-a-development-branch` skill to choose how to integrate `redesign/case-studies` (merge to `main`, open a PR, etc.).

---

## Self-Review (completed during planning)

- **Spec coverage:** §5 design system → Task 1; §6 chrome → Task 1 (CSS) ; §7 components → Task 1; §8.1 UNICEF → Task 2; §8.2 A&T → Task 3; §8.3 Namibia → Task 4; §9 homepage → Tasks 1+5; §10 docs/mockup commit → Tasks 0+6; §11 rollout order → task order; §13 acceptance → Task 7. All covered.
- **Placeholder scan:** the one intentional `<!-- PASTE MOCKUP CONTENT HERE -->` (Task 2) is immediately resolved by Step 2 with an exact line range from a committed file — not an open-ended TODO. No other placeholders.
- **Type/name consistency:** class names used in the HTML tasks (`.cs`, `.cs-hero`, `.cs-stats/.cs-stat .v/.k`, `.cs-meta .m/.mk/.mv`, `.glance .g/.gk/.gv`, `.flow .node .nk/.nt/.nd`, `.viz/.triage/.lift/.track/.mini/.range`, `.aside .at`, `.takeaway .lab`, `.cta/.btn`, `.work-card .stat .n/.l`) all match definitions in the Task 1 stylesheet.
- **Content honesty:** A&T chart carries an explicit "schematic; 35pp is the real finding" caption; Namibia bars are documented as computed on a common 0–460 scale.
```