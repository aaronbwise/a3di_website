# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS landing page for A3DI Consulting Firm (https://www.a3di.dev/), a consulting firm specializing in data-driven development and humanitarian insights. No build tools, no package manager — just raw HTML, CSS, and CDN-loaded libraries.

## Architecture

All deployable files live in **`dist/`** — this is the Netlify publish directory. There is no build step; edits go directly in `dist/`.

```
dist/
├── index.html          # Main landing page (Bootstrap 5.3.3)
├── blog.html           # Blog listing (currently removed from nav)
├── blog-post1.html     # Blog post template (currently unused)
├── css/
│   ├── style.css       # Main styles, CSS variables, media queries
│   └── utilities.css   # Custom grid system, card/button utilities
└── img/                # All images (optimized versions prefixed with optimized_)
```

### Key Sections in index.html

Navbar → Hero Showcase (CSS background image) → Services (4-card grid) → About (bio + headshot) → Footer with social links. Contact is handled via a Bootstrap Modal with Netlify Forms + reCAPTCHA.

### CSS Variables (defined in style.css)

- `--primary-color: #3075ff` (blue)
- `--secondary-color: #0d1d3f` (dark blue)
- `--dark-color: #002240`
- `--light-color: #f4f4f4`

Responsive breakpoints: 768px (tablet), 500px (mobile).

## External Dependencies (all via CDN)

- **Bootstrap 5.3.3** — CSS + JS bundle (grid, navbar, modal, cards)
- **Font Awesome** — kit loaded from `kit.fontawesome.com` (~7 icons used)
- **Google Fonts** — Montserrat (loaded via `@import` in style.css)
- **Google Analytics 4** — tag ID `G-431J69QZ4M`

## Deployment

- Hosted on **Netlify** with config in `netlify.toml`
- Publish directory: `dist`
- Contact form uses Netlify Forms (serverless, no backend needed)
- Push to `main` triggers auto-deploy

## Development Workflow

No build commands. Edit files in `dist/` directly and preview by opening `dist/index.html` in a browser. Deploy by pushing to `main`.

## Known Issues

- **Bootstrap version mismatch**: `blog.html` and `blog-post1.html` use Bootstrap 5.0.2; `index.html` uses 5.3.3
- **Render-blocking font**: Google Fonts loaded via CSS `@import` instead of `<link preload>`
- **Large images**: `showcase1.jpg` is ~3.5MB; optimized variants exist for logo and headshot but not for the showcase
- **Fixed dimensions in CSS**: Showcase uses `height: 600px`; service cards use hardcoded widths at breakpoints — both cause mobile layout issues

See `UPDATE_PLAN.md` for the full prioritized improvement roadmap covering performance, security headers, form validation, mobile optimization, and image optimization.
