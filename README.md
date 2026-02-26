# A3DI Consulting Firm Website

- **Live Website:** [A3DI Consulting Firm](https://www.a3di.dev/)

## Overview
Repository for the A3DI Consulting Firm's official website. A3DI is a consulting firm specializing in helping development & humanitarian organisations use data to generate evidence-based, actionable insights for their programmes.

## Features
- **Responsive Design:** Built with Bootstrap 5.3.3, with fluid typography (`clamp()`) and mobile-optimized layouts.
- **Intuitive Navigation:** Clean navbar with collapsible mobile menu.
- **Contact Modal:** Bootstrap modal with Netlify Forms integration and reCAPTCHA for spam protection.
- **GDPR Cookie Consent:** Analytics only load after user consent, with preference stored in cookies.
- **Security Headers:** X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy via Netlify `_headers`.
- **Accessibility:** Semantic HTML, ARIA labels on interactive elements, and 44px minimum tap targets.
- **Social Sharing:** Open Graph and Twitter Card meta tags for rich link previews.
- **Performance:** Preloaded hero image, lazy-loaded headshot, Google Fonts via `preconnect` + `<link>`, and inline SVG icons (no external icon kit).

## Technology Stack
- **HTML/CSS** — No build step; edit files in `dist/` directly.
- **Bootstrap 5.3.3** — CSS via CDN, JS bundle served locally.
- **Google Fonts** — Montserrat, loaded with `preconnect` for performance.
- **Netlify** — Hosting, form handling, and custom headers.

## Project Structure
```
dist/               ← Netlify publish directory
├── index.html      ← Main landing page
├── css/
│   ├── style.css       ← Main styles, responsive breakpoints
│   └── utilities.css   ← Grid system, card/button utilities, BS5 theme overrides
├── img/            ← Images (optimized variants prefixed with optimized_)
├── js/
│   └── bootstrap.bundle.min.js
└── _headers        ← Netlify security & caching headers
netlify.toml        ← Netlify build config
```

## Development
No build tools or package manager required. Edit files in `dist/` and preview by opening `dist/index.html` in a browser. Push to `main` to trigger auto-deploy on Netlify.

## Contact
For inquiries, please contact `aaron@a3di.dev`.
