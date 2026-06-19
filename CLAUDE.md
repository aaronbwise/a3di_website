# CLAUDE.md

## Project Overview

Personal website for Aaron Wise / A3DI (https://www.a3di.dev/). Multi-page static HTML + CSS, built with Vite as a bundler. No JavaScript frameworks or dependencies — just Vite for dev server and production builds.

## Commands

- **Dev server:** `npm run dev`
- **Production build:** `npm run build` (outputs to `dist/`)
- **Preview build:** `npm run preview`

No test framework or linter is configured.

## Architecture

Multi-page static site (Vite MPA mode). Each page is a standalone HTML file sharing `style.css`:

- `index.html` — Homepage (intro, services with bullet details, case study cards)
- `case-studies/alive-and-thrive.html` — A&T multi-country MCHN equity analysis
- `case-studies/unicef-dq-screener.html` — UNICEF JME data quality screening pipeline

Vite config (`vite.config.js`) lists all pages as rollup inputs. To add a page: create the HTML file, add it to `rollupOptions.input`, and link to it from the nav dropdown.

### Navigation

All pages share a header with a CSS-only dropdown menu under "Case Studies" (hover/focus to open, no JS). The dropdown links to both case study pages. Nav, header, and footer markup is duplicated across all HTML files — update all four when changing navigation.

## Styling

Single `style.css` file shared across all pages. **System font stack (no web fonts)** &mdash; three type roles are defined as CSS variables, all mapped to system stacks: `--display` (headings), `--body`, and `--mono`.

The visual language follows the case-studies redesign (see `case-studies-redesign.html`, the committed design reference, and `docs/superpowers/specs/2026-06-15-case-studies-redesign-design.md`). Charts and diagrams are **hand-rolled CSS &mdash; no chart library, no JS**.

### Design tokens (CSS custom properties)

- Palette: `--ink / --ink-2 / --ink-3` (text), `--paper / --surface / --surface-2` (backgrounds), `--line / --line-2` (borders)
- Accent: `--accent / --accent-ink / --accent-50 / --accent-100`
- Semantic tier scale (quality flagging): `--t1 / --t2 / --t3 / --ok` (+ matching `*-bg`)
- Surfaces: `--radius / --radius-sm`, `--shadow-sm / --shadow / --shadow-lg`
- Layout: `--maxw` (1080px)
- Legacy aliases (`--bg`, `--text`, `--dark`, `--border`, `--text-muted`, etc.) map onto the tokens above for back-compat with older markup.

### Case-study component vocabulary

Case-study pages are `<main class="container"> > <article class="cs"> > .cs-hero + .cs-body`. Inside `.cs-body`, content is grouped into `.cs-section` blocks. Reusable components: `.glance` (at-a-glance band), `.flow`/`.node` (pipeline), `.channels`/`.chan` (channel cards), `.aside` (callout), `.viz` + `.triage`/`.lift`/`.mini` (CSS charts), `.terminal` and `.code-block` (code), `.takeaway` (pull-quote), `.cta`.

### Typography conventions (enforced across all HTML files)

- Em-dashes: spaced (` &mdash; `) for parenthetical breaks in prose
- En-dashes: unspaced (`&ndash;`) for numeric ranges (years, pages)
- British spelling: harmonise, analyse, optimise, programme, organisation
- Curly apostrophes: `&rsquo;` in prose (straight quotes in attributes/code only)
- Exception: publication titles are proper nouns &mdash; preserve original punctuation

Responsive breakpoints at `880px` and `560px`.

## Deployment

Hosted on **Netlify** (config in `netlify.toml`):
- Build: `npm run build`, publish: `dist/`
- 301 redirect from `/case-studies/alive-and-thrive` (no extension) to `.html`
- No SPA fallback needed — real HTML files for each route

## npm on Google Drive

This project lives on Google Drive (`G:\My Drive\...`). npm install fails on the virtual filesystem. Workaround: install in a local temp directory, then copy `node_modules` back:

```bash
mkdir -p /tmp/a3di-install && cp package.json /tmp/a3di-install/ && cd /tmp/a3di-install && npm install
cp -r /tmp/a3di-install/node_modules /tmp/a3di-install/package-lock.json .
```
