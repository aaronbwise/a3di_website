# React Migration Plan — a3di.dev

## Context
The current a3di.dev site is static HTML/CSS (2 pages) deployed to Netlify with no build step. It uses Bootstrap 5.3.3 (CDN) for navbar collapse, modals, and form styling, plus custom CSS for all visual design. The goal is to migrate to a Vite + React + Tailwind CSS app, dropping Bootstrap entirely, while preserving the exact same visual appearance and functionality.

**Decisions made:**
- Framework: **Vite + React**
- Styling: **Tailwind CSS** (rewrite all styles)
- Bootstrap: **Drop entirely** (replace with React state + Tailwind)
- Forms: **Keep Netlify Forms** integration
- A11y: **Radix UI** for modal and mobile menu (replaces Bootstrap's focus trapping, Esc handling, aria states)
- SEO: **Netlify Prerendering** enabled (mitigates SPA empty-shell indexing risk)

## Files to reference during migration
- `dist/index.html` — home page HTML (source of truth)
- `dist/case-studies/alive-and-thrive.html` — case study detail HTML
- `dist/css/style.css` — all component styles (~640 lines)
- `dist/css/utilities.css` — grid, container, Bootstrap overrides (~100 lines)
- `../../marketing/config/brand_tokens.yaml` — canonical design tokens

---

## 1. Project Structure

New project at `../landing_page_react/` (sibling to existing site for side-by-side comparison).

```
landing_page_react/
├── public/
│   ├── _headers                          # Netlify security/cache headers
│   ├── index.html                        # SPA shell + hidden Netlify form
│   └── img/
│       ├── optimized_logo.png
│       ├── favicon.jpg
│       ├── showcase1.jpg
│       ├── optimized_aw_headshot.jpg
│       └── at_logo.png
├── src/
│   ├── main.jsx                          # Entry: BrowserRouter wrapper
│   ├── App.jsx                           # Route definitions
│   ├── index.css                         # Tailwind @import, @theme, base styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx                # Navbar + Outlet + Footer + Modal + Cookies
│   │   │   ├── Navbar.jsx                # Logo, nav links, hamburger, contact btn
│   │   │   └── Footer.jsx                # Tagline, copyright, SocialLinks, back-to-top
│   │   ├── shared/
│   │   │   ├── ContactModal.jsx          # Modal overlay, Netlify form handler
│   │   │   ├── CookieConsent.jsx         # GDPR banner, cookie logic, GA4 loader
│   │   │   ├── Badge.jsx                 # Colored tag pill
│   │   │   ├── SocialLinks.jsx           # SVG social icon links
│   │   │   ├── ServiceCard.jsx           # Icon + title + description card
│   │   │   ├── CaseStudyCard.jsx         # Clickable card with tags + "Read more"
│   │   │   └── SectionHeading.jsx        # Centered h2 + optional subtitle
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx           # Full-width bg image, overlay, headline
│   │   │   ├── ServicesSection.jsx        # 4 ServiceCards stacked
│   │   │   ├── CaseStudiesSection.jsx     # CaseStudyCards grid
│   │   │   └── AboutSection.jsx           # Blue bg, headshot + bio
│   │   └── case-study/
│   │       ├── CaseStudyHeader.jsx        # Title, subtitle, tags, client logo
│   │       ├── MetaBar.jsx                # Key-value metadata row
│   │       ├── CaseStudySection.jsx       # Reusable h2 + content wrapper
│   │       ├── MermaidDiagram.jsx         # Mermaid render via useEffect
│   │       ├── CodeBlock.jsx              # macOS-style code snippet
│   │       └── TakeawayBox.jsx            # Callout box
│   ├── pages/
│   │   ├── HomePage.jsx                   # Composes Hero, Services, CaseStudies, About
│   │   └── CaseStudyDetailPage.jsx        # Slug-based case study render
│   ├── content/
│   │   ├── case-studies/                  # Case study content (MDX-ready path)
│   │   │   └── alive-and-thrive.jsx       # A&T case study body content
│   │   ├── caseStudies.js                 # Case study metadata
│   │   ├── services.js                    # Service card content
│   │   └── metadata.js                    # Global SEO defaults (title, description, OG)
│   ├── utils/
│   │   └── analytics.js                   # loadGA() helper
│   └── icons/                             # SVG icon components (9 icons)
├── netlify.toml
├── vite.config.js                         # React + Tailwind plugins
└── package.json
```

---

## 2. Component Hierarchy

### Layout components
| Component | Replaces | State | Key props |
|-----------|----------|-------|-----------|
| `Layout` | Repeated nav/footer/modal across pages | `isContactModalOpen` | — |
| `Navbar` | Bootstrap navbar + collapse (use **Radix NavigationMenu** or manual toggle with proper `aria-expanded`) | `isMobileMenuOpen` | `onContactClick` |
| `Footer` | Footer HTML (identical on both pages) | — | — |

### Shared components
| Component | Replaces | Props |
|-----------|----------|-------|
| `ContactModal` | Bootstrap modal + Netlify form (use **Radix Dialog** for focus trapping, Esc close, aria attrs) | `isOpen`, `onClose` |
| `CookieConsent` | Cookie banner + inline GA script | — (reads cookie internally) |
| `Badge` | `.badge-tag` spans | `label` |
| `SocialLinks` | Footer social SVG links | — |
| `ServiceCard` | `.services .card` | `icon`, `title`, `description` |
| `CaseStudyCard` | `.case-study-card` link | `slug`, `title`, `subtitle`, `tags`, `clientLogo` |
| `SectionHeading` | Repeated heading pattern | `title`, `subtitle?` |

### Page-specific (case study detail)
| Component | Replaces | Props |
|-----------|----------|-------|
| `CaseStudyHeader` | `.cs-header` | `title`, `subtitle`, `tags`, `clientLogo` |
| `MetaBar` | `.cs-meta-bar` | `items: {label, value}[]` |
| `CaseStudySection` | `.cs-section` wrapper | `title`, `children` |
| `MermaidDiagram` | Mermaid `<pre>` + init script | `chart` (Mermaid definition string) |
| `CodeBlock` | `.cs-code-block` with macOS dots | `filename`, `code` |
| `TakeawayBox` | `.cs-takeaway` | `children` |

---

## 3. Routing

**React Router** with two routes:
- `/` → `HomePage`
- `/case-studies/:slug` → `CaseStudyDetailPage`

Both wrapped in `<Layout>` (which provides navbar, footer, modal, cookies).

**ScrollToTop:** React Router does not scroll to top on navigation like a browser page load. Add a `ScrollToTop` component in `App.jsx`:
```jsx
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
```

**Hash-link scrolling:** Nav links like `#services` smooth-scroll when on home page. When navigating from case study page to `/#services`, navigate to `/` first, then scroll on mount via `useEffect` reading `location.hash`.

**Netlify SPA redirect** in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Legacy URL redirect** (preserve old links):
```toml
[[redirects]]
  from = "/case-studies/alive-and-thrive.html"
  to = "/case-studies/alive-and-thrive"
  status = 301
  force = true
```

---

## 3a. SEO: Prerendering

Moving from static HTML to an SPA means `index.html` is an empty shell until JS executes. While Googlebot can render JS, it's not perfect and introduces crawl-budget delays.

**Mitigation:** Enable **Netlify Prerendering** in the Netlify dashboard (Site settings > Build & deploy > Prerendering). This serves a pre-rendered HTML snapshot to bots while real users get the SPA. One-click toggle, no code changes.

**Verify in Phase 6:** Use `curl -A Googlebot <url>` against the deploy preview to confirm the prerendered HTML contains real content, not an empty `<div id="root">`.

---

## 4. Tailwind Configuration

**`src/index.css`** (Tailwind v4 CSS-based config):
```css
@import "tailwindcss";

@theme {
  --color-primary: #3075ff;
  --color-secondary: #0d1d3f;
  --color-dark: #002240;
  --color-light: #f4f4f4;
  --font-sans: "Montserrat", sans-serif;
  --font-mono: "Courier New", Consolas, monospace;
}

@layer base {
  body { @apply font-sans leading-relaxed text-secondary; }
  h1, h2, h3 { @apply font-light leading-tight text-secondary; }
  a { @apply no-underline text-secondary; }
}
```

**Container:** Use `mx-auto max-w-[1100px] px-10 max-md:px-4` inline on container divs.

**Mermaid diagram** — the only place needing custom CSS (Mermaid generates its own DOM, Tailwind can't style internals):
```css
@layer components {
  .mermaid-wrapper svg {
    transform: scale(1.4);
    transform-origin: center;
    margin: 2.5rem 0;
  }
  @media (max-width: 768px) {
    .mermaid-wrapper { overflow-x: auto; }
    .mermaid-wrapper svg { transform: scale(1); margin: 1.25rem 0; }
  }
}
```

### Key CSS → Tailwind mappings

**Navbar:** `flex items-center justify-between py-4 bg-white`. Mobile menu conditionally rendered via `isMobileMenuOpen`. Links: `px-2.5 py-2.5 hover:text-primary`.

**Hero:** `relative min-h-[70vh] bg-cover bg-center` with inline `style={{ backgroundImage }}`. Overlay: `absolute inset-0 bg-black/55`. Text: `text-white font-bold text-[clamp(1.75rem,5vw,3.125rem)]`.

**Service Cards:** `bg-white rounded-lg shadow-md p-5 text-center max-w-[700px] mx-auto transition-transform duration-200 hover:-translate-y-4`. Mobile: `md:h-[250px] h-auto`.

**Case Study Card:** `flex flex-col items-center text-center w-full max-w-[700px] h-[250px] p-7 rounded-md relative overflow-hidden transition-all duration-200 hover:-translate-y-4 hover:shadow-lg bg-white shadow-md`.

**Case Study Detail:** `.cs-back` → `inline-block text-sm text-primary mb-5`. `.cs-header` → `flex justify-between items-start gap-7 mb-6 max-md:flex-col max-md:items-center`. `.cs-meta-bar` → `flex flex-wrap gap-y-5 gap-x-10 py-5 border-y border-gray-200 mb-7 max-md:gap-x-5 max-md:gap-y-3`. `.cs-takeaway` → `bg-light p-6 rounded-md border-l-4 border-primary`.

**About:** `bg-primary p-7` wrapper. Inner: `flex flex-col md:flex-row gap-6`. Headshot: `w-[150px] rounded-full`.

**Footer:** `bg-secondary p-7 text-center text-white grid grid-cols-3 max-md:grid-cols-1 gap-5 items-center`. Icons: `text-white hover:text-primary transition-colors`.

**Cookie Banner:** `fixed bottom-0 inset-x-0 bg-secondary text-white p-4 px-6 flex flex-wrap justify-center items-center gap-4 z-[9999]`.

**Code Block:** Outer: `bg-[#1e1e2e] rounded-lg overflow-hidden my-6`. Header: `flex items-center gap-1.5 px-4 py-2.5 bg-[#2a2a3c]`. Dots: `w-2.5 h-2.5 rounded-full` with `bg-[#ff5f57]`/`bg-[#ffbd2e]`/`bg-[#28c840]`. Code text: `font-mono text-xs leading-relaxed text-[#cdd6f4]`.

---

## 5. JS → React State/Effects

| Current behavior | React replacement |
|-----------------|-------------------|
| Bootstrap navbar collapse (`data-bs-toggle`) | `useState` in `Navbar` |
| Bootstrap modal (`data-bs-toggle="modal"`) | `useState` in `Layout`, passed via props/context |
| Cookie consent banner (30-line inline script) | `CookieConsent` component with `useState` + `useEffect` |
| GA4 conditional load | `utils/analytics.js` `loadGA()` called from CookieConsent |
| Mermaid CDN + `mermaid.initialize()` | `mermaid` npm package + `useEffect` in `MermaidDiagram` |
| `document.write(new Date().getFullYear())` | `{new Date().getFullYear()}` in JSX |

### Contact modal state flow
Since the contact trigger exists in both Navbar and case study CTA, lift state to `Layout`:
```jsx
function Layout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <>
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      <Outlet context={{ openContactModal: () => setIsContactModalOpen(true) }} />
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <CookieConsent />
    </>
  );
}
```

Case study pages access `openContactModal` via `useOutletContext()`.

### MermaidDiagram component pattern
```jsx
import { useEffect, useRef, useId, useState } from 'react';
import mermaid from 'mermaid';

function MermaidDiagram({ chart }) {
  const containerRef = useRef(null);
  const id = useId().replace(/:/g, '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#3075ff',
        primaryTextColor: '#fff',
        primaryBorderColor: '#3075ff',
        lineColor: '#0d1d3f',
        secondaryColor: '#e8f0ff',
        tertiaryColor: '#e8f0ff',
        fontFamily: 'Montserrat',
        fontSize: '18px',
        nodePadding: 16,
      },
    });
    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
        setIsLoaded(true);
      }
    });
  }, [chart, id]);

  // min-h-[200px] prevents Cumulative Layout Shift (CLS) while Mermaid renders
  return <div ref={containerRef} className={`mermaid-wrapper my-6 text-center ${isLoaded ? '' : 'min-h-[200px]'}`} />;
}
```

---

## 6. Netlify Forms (SPA approach)

**Hidden form** in `public/index.html` (for Netlify build-time detection):
```html
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="first-name" />
  <input type="text" name="last-name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>
```

**React form** in `ContactModal.jsx` submits via `fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })` with `form-name=contact` in the body.

**reCAPTCHA:** Replace `data-netlify-recaptcha` with a honeypot field (`netlify-honeypot="bot-field"`). Simpler in SPAs and sufficient for this traffic level. Can upgrade to Google reCAPTCHA v2 later if spam becomes an issue.

**Field sync warning:** The `name` attributes in the hidden `public/index.html` form and the React `ContactModal.jsx` form **must match exactly** — including the hidden `form-name` input. If they diverge, submissions will silently fail or go to spam. Add a code comment in both locations cross-referencing each other.

---

## 7. Case Study Data Model

`src/content/caseStudies.js` — metadata for card rendering and detail page lookup:
```js
export const caseStudies = [
  {
    slug: 'alive-and-thrive',
    title: 'Uncovering Who Is Furthest Behind',
    subtitle: 'Multi-country MCHN equity analysis for Alive & Thrive',
    tags: ['MCHN', 'Southeast Asia', 'Data Pipelines'],
    clientLogo: '/img/at_logo.png',
    clientLogoAlt: 'Alive & Thrive logo',
    meta: { /* OG tags */ },
    metaBar: [
      { label: 'Client', value: 'Alive & Thrive (FHI Solutions)' },
      { label: 'Sector', value: 'Maternal & child health and nutrition' },
      { label: 'Countries', value: 'Cambodia, Lao PDR, Viet Nam' },
      { label: 'Data', value: '15+ survey rounds, 2000–2023' },
      { label: 'Duration', value: 'April–December 2022' },
    ],
  },
];
```

Body content (Challenge, Approach, Result) lives in `src/content/case-studies/alive-and-thrive.jsx` as a component. When case studies grow beyond 2-3, migrate to MDX files — the `content/case-studies/` directory is already structured for that path.

---

## 7a. Security: Content Security Policy

The current site has no CSP. Adding one during migration prevents XSS and controls which origins can load scripts/styles.

**Add to `public/_headers`:**
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com

/img/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

**Mermaid + `unsafe-eval`:** Mermaid may require `'unsafe-eval'` in `script-src` depending on the version. Test this in Phase 1 — if the diagram fails to render, add `'unsafe-eval'` to the CSP. This is a known Mermaid limitation.

---

## 8. Migration Checklist

### Phase 1: Scaffold & build pipeline
- [ ] Create Vite + React project at `../landing_page_react/`
- [ ] Install deps: `tailwindcss @tailwindcss/vite react-router-dom mermaid react-helmet-async @radix-ui/react-dialog @radix-ui/react-navigation-menu`
- [ ] Configure `vite.config.js` (React + Tailwind plugins)
- [ ] Set up `src/index.css` with Tailwind @theme (colors, fonts) and base styles
- [ ] Set up `netlify.toml` (build command, publish dir, redirects)
- [ ] Copy optimized images to `public/img/`
- [ ] Set up `public/_headers` (with CSP) and `public/index.html` (with hidden Netlify form)
- [ ] **Verify:** `npm run dev` starts, Tailwind classes render, CSP does not block Mermaid (test `unsafe-eval` if needed)

### Phase 2: Layout shell
- [ ] Build `Layout.jsx` with modal state and `<Outlet>`
- [ ] Build `Navbar.jsx` — Radix NavigationMenu or manual toggle with `aria-expanded`, React Router links
- [ ] Build `Footer.jsx` + `SocialLinks.jsx` — SVG icons, copyright year
- [ ] Build `ContactModal.jsx` — use Radix Dialog for focus trapping/Esc/aria, Netlify form submit handler
- [ ] Build `CookieConsent.jsx` — cookie read/write, conditional GA4 load
- [ ] Set up `App.jsx` routes with `ScrollToTop` component, create placeholder pages
- [ ] Extract SVG icons into `src/icons/` components
- [ ] **Verify:** navbar renders, hamburger toggles with `aria-expanded`, modal opens/closes (focus trapped, Esc closes), cookie banner works, tab key cannot reach content behind open modal

### Phase 3: Home page
- [ ] Build `HeroSection.jsx` — bg image, overlay, headline, CTA
- [ ] Build `ServicesSection.jsx` + `ServiceCard.jsx` — 4 cards with icons
- [ ] Build `CaseStudiesSection.jsx` + `CaseStudyCard.jsx` — grid with card
- [ ] Build `AboutSection.jsx` — blue bg, 2-column, headshot, bio, CV link
- [ ] Build `Badge.jsx`, `SectionHeading.jsx`
- [ ] Create `content/services.js` and `content/caseStudies.js`
- [ ] Assemble `HomePage.jsx`, implement hash-link scrolling
- [ ] **Verify:** visual match at 375px, 768px, 1440px vs. original

### Phase 4: Case study detail
- [ ] Build `CaseStudyHeader.jsx`, `MetaBar.jsx`, `CaseStudySection.jsx`
- [ ] Build `CodeBlock.jsx` — dark theme, macOS dots, filename
- [ ] Build `MermaidDiagram.jsx` — npm mermaid, useEffect render, brand theme
- [ ] Build `TakeawayBox.jsx` — callout with left border
- [ ] Assemble `CaseStudyDetailPage.jsx` with slug lookup and CTA → modal
- [ ] **Verify:** Mermaid renders, code block displays, responsive stacking works

### Phase 5: SEO & meta tags
- [ ] Wrap `App` in `<HelmetProvider>` in `main.jsx`
- [ ] Add `<Helmet>` in `HomePage.jsx` and `CaseStudyDetailPage.jsx` — unique title, description, OG tags per page
- [ ] Create `content/metadata.js` with global SEO defaults (site name, default OG image)
- [ ] Add Google Fonts preconnect to `public/index.html`
- [ ] Add hero image preload hint
- [ ] Enable **Netlify Prerendering** in dashboard (Site settings > Build & deploy > Prerendering)
- [ ] **Verify:** page titles change on navigation, OG tags render, `curl -A Googlebot <url>` returns real content

### Phase 6: Final QA & deploy
- [ ] Lighthouse audit (compare with original scores)
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)
- [ ] Responsive test (320px, 500px, 768px, 1024px, 1440px)
- [ ] Test Netlify form submission on deploy preview
- [ ] Test cookie consent flow end-to-end
- [ ] Test all navigation paths including direct URL access
- [ ] Test legacy URL redirect (`/case-studies/alive-and-thrive.html` → 301)
- [ ] Deploy to production

---

## 9. Verification Checklist

### Functionality
- [ ] Navbar: logo links home, all nav links scroll/navigate correctly
- [ ] Navbar: mobile hamburger opens/closes, menu items work
- [ ] Contact modal: opens from navbar AND from case study CTA
- [ ] Contact modal: validates required fields, submits to Netlify
- [ ] Cookie consent: appears on first visit, Accept loads GA4, Decline hides, choice persists
- [ ] Case study card: links to detail page
- [ ] Case study detail: back link returns to home #case-studies
- [ ] Case study detail: Mermaid diagram renders with brand colors
- [ ] Case study detail: code block displays correctly
- [ ] Direct URL `/case-studies/alive-and-thrive` loads (SPA redirect works)
- [ ] Old URL `/case-studies/alive-and-thrive.html` → 301 redirect
- [ ] OG meta tags correct per page
- [ ] Back-to-top link scrolls to top
- [ ] CV link opens in new tab
- [ ] Social links open correct profiles in new tabs
- [ ] Page scrolls to top when navigating between routes

### Accessibility (a11y)
- [ ] Modal: focus trapped inside when open (Tab cycles through modal elements only)
- [ ] Modal: closes on Esc key press
- [ ] Modal: focus returns to trigger button on close
- [ ] Modal: has `aria-labelledby` pointing to modal title
- [ ] Navbar: hamburger button has `aria-expanded` toggling with menu state
- [ ] Navbar: hamburger button has `aria-controls` referencing the menu
- [ ] Keyboard: all interactive elements reachable via Tab
- [ ] Lighthouse Accessibility score >= 95

### SEO
- [ ] `curl -A Googlebot <deploy-preview-url>` returns fully rendered HTML (not empty shell)
- [ ] Each page has unique `<title>` and `<meta name="description">`
- [ ] OG tags correct per page (test with LinkedIn Post Inspector)

### Responsive breakpoints
| Width | Check |
|-------|-------|
| 320px | Everything stacks, no horizontal overflow, text readable |
| 500px | Mobile styles applied |
| 768px | Grid collapses, navbar collapses, case study header stacks |
| 1024px | Desktop navbar expands, grids display correctly |
| 1440px | Content within 1100px container, no stretch |
