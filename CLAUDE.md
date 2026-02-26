# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS landing page for A3DI Consulting Firm (https://www.a3di.dev/), a consulting firm specializing in data-driven development and humanitarian insights. No build tools, no package manager — just raw HTML, CSS, and locally served libraries.

## Architecture

All deployable files live in **`dist/`** — this is the Netlify publish directory. There is no build step; edits go directly in `dist/`.

```
dist/
├── index.html          # Main landing page (Bootstrap 5.3.3)
├── _headers            # Netlify security & caching headers
├── css/
│   ├── style.css       # Main styles, CSS variables, media queries, cookie banner
│   └── utilities.css   # Grid system, card/button utilities, BS5 theme overrides
├── js/
│   └── bootstrap.bundle.min.js  # Bootstrap 5.3.3 JS (served locally)
└── img/                # All images (optimized versions prefixed with optimized_)
```

### Key Sections in index.html

Navbar → Hero Showcase (CSS background image) → Services (4-card grid) → About (bio + headshot) → Footer with social links → Cookie consent banner. Contact is handled via a Bootstrap Modal with Netlify Forms + reCAPTCHA.

### CSS Variables (defined in style.css)

- `--primary-color: #3075ff` (blue)
- `--secondary-color: #0d1d3f` (dark blue)
- `--dark-color: #002240`
- `--light-color: #f4f4f4`

Bootstrap theme overrides are set in `utilities.css` via `--bs-primary`, `--bs-secondary`, `--bs-dark`, `--bs-light`.

Responsive breakpoints: 768px (tablet), 500px (mobile).

## Dependencies

- **Bootstrap 5.3.3** — CSS via CDN, JS bundle served locally from `dist/js/`
- **Google Fonts** — Montserrat (loaded via `<link>` with `preconnect`)
- **Google Analytics 4** — tag ID `G-431J69QZ4M` (loaded conditionally after GDPR cookie consent)
- **Icons** — Inline SVGs (no external icon library)

## Security & Headers

Security headers are defined in `dist/_headers` (Netlify format):
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Cache-control for `/img/*` (1 year) and `/css/*` (1 day)

## Deployment

- Hosted on **Netlify** with config in `netlify.toml`
- Publish directory: `dist`
- Contact form uses Netlify Forms (serverless, no backend needed)
- Push to `main` triggers auto-deploy

## Development Workflow

No build commands. Edit files in `dist/` directly and preview by opening `dist/index.html` in a browser. Deploy by pushing to `main`.

## Known Issues

- **Large hero image**: `showcase1.jpg` is ~3.5MB; no WebP/optimized variant exists yet (no image conversion tools available in dev environment)
- **CSP header**: Removed due to Netlify CDN caching issues; can be re-added once propagation is confirmed working
