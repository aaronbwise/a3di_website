# A3DI Website Update Plan

## Performance Improvements

### 1. Resource Loading
- [ ] **Standardize Bootstrap version**: `blog-post1.html` and `blog.html` use Bootstrap 5.0.2 while `index.html` uses 5.3.3. Update all pages to 5.3.3.
- [ ] **Move Google Fonts from CSS `@import` to HTML `<link preload>`**: The `@import` in `style.css` is render-blocking. Replace with `<link rel="preload" as="style">` in each HTML `<head>`.
- [ ] **Replace Font Awesome kit with self-hosted SVGs**: You only use ~7 icons (`fa-clipboard-list`, `fa-laptop-code`, `fa-chart-line`, `fa-user-group`, `fa-linkedin`, `fa-github`, `fa-twitter`, `fa-circle-arrow-up`). Self-hosting inline SVGs eliminates an external request and reduces payload significantly.
- [ ] **Consider a custom Bootstrap build**: You use navbar, modal, grid, and cards. A custom build would cut unused CSS/JS.

### 2. Image Optimization
- [ ] **Use existing optimized images**: `index.html` references `aw_headshot_jpg.jpg` (~343KB) but `optimized_aw_headshot.jpg` (~19KB) already exists in `dist/img/`. Swap the `src` for an immediate ~320KB saving.
- [ ] **Serve images in modern formats**: Use `<picture>` elements with WebP/AVIF sources and JPG fallback for `blog1-6.jpg`, `showcase1.jpg`, `aw_headshot_jpg.jpg`, and `optimized_logo.png`.
- [ ] **Add `loading="lazy"`** to below-the-fold images (blog cards, about headshot).
- [ ] **Add explicit `width` and `height` attributes** to all `<img>` tags to prevent Cumulative Layout Shift (CLS).
- [ ] **Preload the hero/showcase image**: Add `<link rel="preload" as="image" href="img/showcase1.jpg">` in `index.html` `<head>`, or convert the CSS background-image to an `<img>` tag with `fetchpriority="high"`.

### 3. Caching
- [ ] **Add cache-control headers in `netlify.toml`** for static assets:
  ```toml
  [[headers]]
    for = "/img/*"
    [headers.values]
      Cache-Control = "public, max-age=31536000, immutable"

  [[headers]]
    for = "/css/*"
    [headers.values]
      Cache-Control = "public, max-age=31536000, immutable"
  ```

---

## Security Improvements

### 4. Security Headers (add to `netlify.toml`)
- [ ] Add the following headers:
  ```toml
  [[headers]]
    for = "/*"
    [headers.values]
      X-Content-Type-Options = "nosniff"
      X-Frame-Options = "DENY"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Permissions-Policy = "camera=(), microphone=(), geolocation=()"
      Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://kit.fontawesome.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src https://fonts.gstatic.com https://ka-f.fontawesome.com; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://ka-f.fontawesome.com; frame-src https://www.google.com https://www.gstatic.com;"
  ```

### 5. Form Validation
- [ ] Add `required` attribute to all contact form fields (`first-name`, `last-name`, `email`, `message`).
- [ ] Add `maxlength` constraints (e.g., `maxlength="100"` for names, `maxlength="1000"` for message).
- [ ] Add `pattern` or proper `type="email"` validation (already using `type="email"` — just ensure `required` is present).

### 6. External Script Integrity
- [ ] Font Awesome kit script (`kit.fontawesome.com/9a0aea4ea3.js`) has no `integrity` attribute. Note: SRI hashes won't work with FA kit scripts because the content is dynamically generated and changes on updates. The real fix is switching to self-hosted SVGs (see item 1 above).

### 7. GDPR / Cookie Consent
- [ ] If serving EU visitors, add a cookie consent banner before loading Google Analytics (`G-431J69QZ4M`).

---

## HTML & CSS Bugs

### 8. Markup Fixes
- [ ] **Unclosed `<div>` in About section**: `index.html:154` opens a `.container` div that is never closed before `</section>` on line 169. Add the missing `</div>`.
- [ ] **Remove debug logging**: `index.html:195-198` has `console.log` statements checking for Bootstrap/Popper.js. Remove for production.
- [ ] **Update copyright year**: Footer (`index.html:176`) says "Copyright © 2022". Update to current year or make it dynamic.
- [ ] **Fix favicon MIME type**: `index.html:28` uses `type="image/jpg"` — the correct MIME type is `image/jpeg`. Better yet, convert to a proper `.ico`, `.png`, or `.svg` favicon.

### 9. CSS Cleanup
- [ ] **Resolve custom/Bootstrap class name collisions**: `utilities.css` defines `.btn`, `.card`, `.container`, `.bg-primary`, `.btn-primary`, `.btn-dark`, `.text-center`, etc. — all names Bootstrap also uses. For example, `.btn` sets `height: 35px` conflicting with Bootstrap's button sizing, and `.container` sets `overflow: auto` which can cause unexpected scrollbars. Either namespace custom classes (e.g. `.a3di-card`) or remove them in favor of Bootstrap's versions.
- [ ] **Consolidate duplicate CSS rule blocks**: `style.css` has two separate `.about` blocks (lines 171-174 and 176-178) and two `.footer` blocks (lines 217-221 and 222-226) that should be merged.

---

## Accessibility & SEO

### 10. Accessibility
- [ ] **Add `aria-label` to footer social links**: Links on `index.html:179-183` are just `<a><i class="fab fa-linkedin"></i></a>` with no accessible text. Add `aria-label="LinkedIn"`, etc.
- [ ] **Add accessible label to scroll-to-top button**: The arrow icon link (`index.html:185`) has no text or `aria-label` for screen readers.

### 11. Social Sharing / SEO Meta Tags
- [ ] **Add Open Graph meta tags**: No `og:title`, `og:description`, `og:image` tags. Important for link previews when shared on LinkedIn, Twitter/X, etc.
- [ ] **Add Twitter Card meta tags**: `twitter:card`, `twitter:title`, `twitter:description` for rich previews.

---

## Mobile Optimization

### 12. Viewport & Touch Targets
- [ ] **Replace fixed showcase height**: Change `height: 600px` on `.showcase` to `min-height: 70vh` (or similar) so it adapts to varying screen sizes without overflow or whitespace.
- [ ] **Increase tap target sizes**: Ensure navbar links and footer social icons meet the 44×44px minimum tap target (per WCAG/Google guidelines). Footer icons with `fa-2x` and `margin: 10px` may be too tight — add padding or increase the clickable area.

### 13. Responsive Layout Fixes
- [ ] **Remove hardcoded card widths**: `.services .card` uses fixed widths at each breakpoint (`768px`, `500px`, `300px`). Replace with `width: 100%` and a `max-width` constraint, letting the grid handle responsiveness.
- [ ] **Fix about section column stacking**: `.col` and `.col-9` don't stack properly on mobile. Switch to `col-12 col-md-3` / `col-12 col-md-9` so the headshot and bio text reflow correctly.
- [ ] **Normalize blog card image heights**: Add `object-fit: cover` with a fixed height (e.g., `height: 200px`) to `.card-img-top` so cards stay visually consistent across tablet widths.

### 14. Responsive Typography
- [ ] **Scale showcase heading**: `.showcase h1` at `50px` overflows on small screens. Use `font-size: clamp(1.75rem, 5vw, 3.125rem)` or add a media query to reduce it.
- [ ] **Scale about paragraph text**: `.about p` at `20px` is large on mobile. Apply a similar `clamp()` or media query (e.g., `16px` on screens under `768px`).

### 15. Mobile Performance
- [ ] **Serve a smaller showcase image on mobile**: The full-size `showcase1.jpg` loads regardless of screen size. Use a CSS media query to swap in a smaller/compressed version for screens under `768px`, or convert to a `<picture>` element with a mobile-optimized source.

---

## Suggested Priority Order

| Priority | Task | Impact |
|----------|------|--------|
| 1 | Fix HTML bugs (unclosed div, remove console.log, copyright year) | High — correctness, quick wins |
| 2 | Swap in existing optimized headshot image | High — free ~320KB saving, zero effort |
| 3 | Add security headers in `netlify.toml` (incl. `frame-src` for reCAPTCHA) | High — quick win |
| 4 | Standardize Bootstrap to 5.3.3 on all pages | High — fixes known vulnerabilities |
| 5 | Optimize images (WebP, lazy loading, dimensions) | High — performance |
| 6 | Add `required` and validation to form fields | Medium |
| 7 | Move Google Fonts to `<link preload>` | Medium — eliminates render block |
| 8 | Add caching headers for static assets | Medium |
| 9 | Resolve custom/Bootstrap CSS class collisions | Medium — reduces subtle bugs |
| 10 | Consolidate duplicate CSS rule blocks | Low — cleanup |
| 11 | Replace Font Awesome kit with self-hosted SVGs | Medium |
| 12 | Add `aria-label` to social links and scroll-to-top | Medium — accessibility |
| 13 | Replace fixed showcase height with responsive units | High — mobile layout |
| 14 | Remove hardcoded card widths, fix column stacking | High — mobile layout |
| 15 | Scale typography responsively (`clamp()` or media queries) | Medium — mobile readability |
| 16 | Serve smaller showcase image on mobile | Medium — mobile performance |
| 17 | Increase tap target sizes for nav/footer icons | Medium — mobile usability |
| 18 | Add Open Graph and Twitter Card meta tags | Medium — SEO/social sharing |
| 19 | Fix favicon MIME type / format | Low — quick fix |
| 20 | Normalize blog card image heights | Low — visual polish |
| 21 | Add cookie consent for GDPR compliance | Low-Medium (depends on audience) |
