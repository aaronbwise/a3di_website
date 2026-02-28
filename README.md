# A3DI Consulting Firm Website

**Live Website:** [https://www.a3di.dev/](https://www.a3di.dev/)

## Overview

Official website for A3DI Consulting Firm, specializing in helping development and humanitarian organisations use data to generate evidence-based, actionable insights for their programmes.

## Technology Stack

- **React 19** with React Router for client-side routing
- **Vite** for development and production builds
- **Tailwind CSS 4** for utility-first styling
- **Radix UI** for accessible dialog/modal components
- **Mermaid** for flowchart diagrams in case studies
- **Netlify** for hosting, form handling, and deployment

## Features

- **Responsive Design** — Fluid typography with `clamp()` and mobile-optimized layouts using Tailwind's responsive utilities
- **Case Study Pages** — Dynamic slug-based routing with Mermaid diagrams and syntax-highlighted code blocks
- **Contact Modal** — Accessible modal (Radix UI) with Netlify Forms integration
- **GDPR Cookie Consent** — Google Analytics loads only after user consent
- **SEO** — Per-page meta tags via React Helmet (Open Graph and Twitter Card support)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview   # preview the build locally
```

### Linting

```bash
npm run lint
```

## Deployment

The site deploys automatically to Netlify on push to `main`. Build configuration is defined in `netlify.toml`.

## Contact

For inquiries, please contact `aaron@a3di.dev`.
