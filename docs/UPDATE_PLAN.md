# A3DI Website Update Plan

## Performance Improvements

### 1. Resource Loading
- [x] **Standardize Bootstrap version**: Updated all pages to Bootstrap 5.3.3. Deleted `blog.html` and `blog-post1.html` (unused).
- [x] **Move Google Fonts from CSS `@import` to HTML `<link>`**: Replaced `@import` in `style.css` with `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>`.
- [x] **Replace Font Awesome kit with inline SVGs**: All 8 icons replaced with inline `<svg>` elements using `fill="currentColor"`. FA kit script removed.
- [ ] **Consider a custom Bootstrap build**: You use navbar, modal, grid, and cards. A custom build would cut unused CSS/JS.

### 2. Image Optimization
- [x] **Use existing optimized images**: Swapped `aw_headshot_jpg.jpg` to `optimized_aw_headshot.jpg` (~320KB saving).
- [ ] **Serve images in modern formats**: WebP/AVIF conversion skipped — no image tools available in dev environment. Can be done manually.
- [x] **Add `loading="lazy"`** to below-the-fold headshot image.
- [x] **Add explicit `width` and `height` attributes** to headshot `<img>` tag.
- [x] **Preload the hero/showcase image**: Added `<link rel="preload" as="image" href="img/showcase1.jpg">` in `<head>`.

### 3. Caching
- [x] **Add cache-control headers** for static assets: `/img/*` (1 year, immutable) and `/css/*` (1 day) via `dist/_headers`.

---

## Security Improvements

### 4. Security Headers
- [x] Added X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy via `dist/_headers`.
- [ ] **CSP header**: Implemented but removed due to Netlify CDN caching issues. Can be re-added once propagation is confirmed.

### 5. Form Validation
- [x] Added `required` attribute to all contact form fields.
- [x] Added `maxlength="100"` to name fields and `maxlength="1000"` to message textarea.
- [x] `type="email"` already present with `required`.

### 6. External Script Integrity
- [x] **Font Awesome kit removed entirely** — replaced with inline SVGs. No external icon script needed.
- [x] **Bootstrap JS served locally** from `dist/js/bootstrap.bundle.min.js` — eliminates CDN dependency for JS.

### 7. GDPR / Cookie Consent
- [x] Added cookie consent banner with Accept/Decline buttons. Google Analytics loads only after consent.

---

## HTML & CSS Bugs

### 8. Markup Fixes
- [x] **Fixed unclosed `<div>` in About section**: Added missing `</div>` for `.container`.
- [x] **Removed debug logging**: `console.log` statements removed.
- [x] **Dynamic copyright year**: Uses `document.write(new Date().getFullYear())`.
- [x] **Fixed favicon MIME type**: Changed to `type="image/jpeg"`.

### 9. CSS Cleanup
- [x] **Resolved custom/Bootstrap class collisions**: Removed conflicting `.btn`, `.container overflow: auto`, `.bg-*/.btn-*` color rules, and `.text-center` from `utilities.css`. Added Bootstrap CSS custom property overrides (`--bs-primary`, etc.).
- [x] **Consolidated duplicate CSS blocks**: Merged duplicate `.about` and `.footer` blocks in `style.css`.

---

## Accessibility & SEO

### 10. Accessibility
- [x] **Added `aria-label` to footer social links**: LinkedIn, GitHub, Twitter links all have aria-labels.
- [x] **Added `aria-label="Back to top"` to scroll-to-top link**.
- [x] **Footer social links meet 44x44px tap target minimum** via `min-height`/`min-width` + `inline-flex`.

### 11. Social Sharing / SEO Meta Tags
- [x] **Added Open Graph meta tags**: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`.
- [x] **Added Twitter Card meta tags**: `twitter:card`, `twitter:title`, `twitter:description`.

---

## Mobile Optimization

### 12. Viewport & Touch Targets
- [x] **Replaced fixed showcase height**: Changed `height: 600px` to `min-height: 70vh`.
- [x] **Increased tap target sizes**: Footer social icons now meet 44x44px minimum.

### 13. Responsive Layout Fixes
- [x] **Removed hardcoded card widths**: Service cards use `width: 100%; max-width: 700px` with `max-width: 100%` in media queries.
- [x] **Fixed about section column stacking**: Changed to `col-12 col-md-3` / `col-12 col-md-9`.
- [x] ~~**Normalize blog card image heights**~~: N/A — blog pages deleted.

### 14. Responsive Typography
- [x] **Scaled showcase heading**: Uses `font-size: clamp(1.75rem, 5vw, 3.125rem)`.
- [x] **Scaled about paragraph text**: Uses `font-size: clamp(1rem, 2.5vw, 1.25rem)`.

### 15. Mobile Performance
- [ ] **Serve a smaller showcase image on mobile**: Requires image conversion tools to create a mobile-optimized version. Can be done manually.

---

## Suggested Priority Order

| Priority | Task | Status |
|----------|------|--------|
| 1 | Fix HTML bugs (unclosed div, remove console.log, copyright year) | Done |
| 2 | Swap in existing optimized headshot image | Done |
| 3 | Add security headers (incl. `frame-src` for reCAPTCHA) | Done (CSP removed due to CDN caching) |
| 4 | Standardize Bootstrap to 5.3.3 on all pages | Done (blog pages deleted) |
| 5 | Optimize images (WebP, lazy loading, dimensions) | Partial — lazy loading & dimensions done; WebP pending |
| 6 | Add `required` and validation to form fields | Done |
| 7 | Move Google Fonts to `<link>` with preconnect | Done |
| 8 | Add caching headers for static assets | Done |
| 9 | Resolve custom/Bootstrap CSS class collisions | Done |
| 10 | Consolidate duplicate CSS rule blocks | Done |
| 11 | Replace Font Awesome kit with inline SVGs | Done |
| 12 | Add `aria-label` to social links and scroll-to-top | Done |
| 13 | Replace fixed showcase height with responsive units | Done |
| 14 | Remove hardcoded card widths, fix column stacking | Done |
| 15 | Scale typography responsively (`clamp()`) | Done |
| 16 | Serve smaller showcase image on mobile | Pending (needs image tools) |
| 17 | Increase tap target sizes for footer icons | Done |
| 18 | Add Open Graph and Twitter Card meta tags | Done |
| 19 | Fix favicon MIME type | Done |
| 20 | Normalize blog card image heights | N/A (blog deleted) |
| 21 | Add cookie consent for GDPR compliance | Done |

### Remaining Items
- Custom Bootstrap build (nice-to-have, low priority)
- WebP/AVIF image conversion for showcase and other images
- Mobile-optimized showcase image
- Re-add CSP header once Netlify CDN caching issue is resolved
