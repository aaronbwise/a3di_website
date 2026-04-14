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
- `cv/index.html` — Full CV (experience, education, skills, publications)
- `case-studies/alive-and-thrive.html` — A&T multi-country MCHN equity analysis
- `case-studies/unicef-dq-screener.html` — UNICEF JME data quality screening pipeline

Vite config (`vite.config.js`) lists all pages as rollup inputs. To add a page: create the HTML file, add it to `rollupOptions.input`, and link to it from the nav dropdown.

### Navigation

All pages share a header with a CSS-only dropdown menu under "Case Studies" (hover/focus to open, no JS). The dropdown links to both case study pages. Nav, header, and footer markup is duplicated across all HTML files — update all four when changing navigation.

## Styling

Single `style.css` file shared across all pages. System font stack (no web fonts).

### Design tokens (CSS custom properties)

- `--bg`, `--text`, `--accent`, `--dark` — core palette
- `--text-muted`, `--text-subtle`, `--text-faint`, `--text-label`, `--text-placeholder` — semantic gray scale
- `--code-bg`, `--tag-bg` — surface colors (currently same value, independently adjustable)
- `--border`, `--max-width` — layout

### Typography conventions (enforced across all HTML files)

- Em-dashes: spaced (` &mdash; `) for parenthetical breaks in prose
- En-dashes: unspaced (`&ndash;`) for numeric ranges (years, pages)
- British spelling: harmonise, analyse, optimise, programme, organisation
- Curly apostrophes: `&rsquo;` in prose (straight quotes in attributes/code only)
- Exception: publication titles are proper nouns — preserve original punctuation

Responsive breakpoint at `768px`. The narrow max-width (740px) means most layouts work at mobile widths with minimal changes.

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
