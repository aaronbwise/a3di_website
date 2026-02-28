# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for A3DI Consulting Firm (https://www.a3di.dev/), built with Vite + React 19 + Tailwind CSS 4. Recently migrated from static HTML/Bootstrap to a React SPA.

## Commands

- **Dev server:** `npm run dev`
- **Production build:** `npm run build` (outputs to `dist/`)
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint`

No test framework is configured.

## Architecture

### Routing (src/App.jsx)

React Router with a `<Layout>` wrapper providing navbar and footer on all pages:
- `/` — HomePage (hero, services, case studies sections)
- `/case-studies/:slug` — CaseStudyDetailPage (dynamic, slug-based)

In-page navigation uses hash-based smooth scrolling (`#services`, `#case-studies`). A `ScrollToTop` component resets scroll on route changes.

### Content Data Layer (src/content/)

Content is separated from components:
- `metadata.js` — SEO/OG meta tags
- `services.js` — Service card data (4 services)
- `caseStudies.js` — Case study metadata and slug routing
- `case-studies/*.jsx` — Full case study content as JSX components

To add a new case study: create a JSX file in `src/content/case-studies/`, add its entry to `caseStudies.js` with a slug, and it will auto-route.

### Component Organization (src/components/)

- `layout/` — Layout, Navbar, Footer (structural wrappers)
- `sections/` — Page sections (HeroSection, ServicesSection, CaseStudiesSection)
- `case-study/` — Case study detail components (MermaidDiagram, CodeBlock, TakeawayBox, MetaBar)
- `shared/` — Reusable UI (ContactModal, CookieConsent, Badge, ServiceCard, CaseStudyCard, SectionHeading, SocialLinks)

### Icons (src/icons/)

SVG components accepting `className` prop. Mapped by string key in ServiceCard via an icon lookup object.

## Styling

Tailwind CSS 4 configured via `@tailwindcss/vite` plugin. Custom theme defined in `src/index.css` using `@theme`:

- `--color-primary: #3075ff` (blue)
- `--color-secondary: #0d1d3f` (dark blue)
- `--color-dark: #002240`
- `--color-light: #f4f4f4`
- `--font-sans: "Montserrat"`

Responsive design uses Tailwind's `max-md:` prefix (768px breakpoint) and `clamp()` for fluid typography.

## Deployment

Hosted on **Netlify** (config in `netlify.toml`):
- Build: `npm run build`, publish: `dist/`
- SPA fallback: `/* → /index.html` (status 200)
- 301 redirects for legacy static HTML URLs
- Contact form via Netlify Forms (hidden form in `index.html` + URLSearchParams POST in ContactModal)

## Key Integration Details

- **Contact Modal:** Uses Radix UI Dialog. Form POSTs to Netlify Forms; the hidden form in `index.html` must match field names.
- **Google Analytics:** Loaded conditionally via `src/utils/analytics.js` after GDPR cookie consent.
- **Mermaid Diagrams:** Used in case studies. Custom theme colors matching brand. Handles React StrictMode duplicate-render via render counter.
- **React Helmet Async:** Manages `<head>` tags per page. App wrapped in `<HelmetProvider>`.
- **`.npmrc`:** Sets `legacy-peer-deps=true` for react-helmet-async compatibility with React 19.
