# Case Study Improvement Plan

Based on external audit (Apr 2026), filtered through site context: solo technical consultancy targeting UN/NGO/development organisations who hire for data pipeline and analysis work.

## Guiding principle

Shift results sections from "here's what I built" to "here's the decision-making power I unlocked" -- without sacrificing the technical depth that differentiates A3DI from generalist consultancies.

---

## 1. Restructure Result sections into Findings + Impact

**Priority: High | Effort: Low-Medium**

The single biggest upgrade. All three case studies describe what was found but not what changed. Restructure each Result section into two clear sub-parts:

### Key Findings (bulleted, quantified)

Pull the strongest numbers out of prose and into a scannable list.

- **A&T:** Wealth disparities persisted across nearly all indicators; ethnic gaps exceeded 35 percentage points in Lao PDR; service access improved but quality of care lagged
- **UNICEF:** 4% Tier 1, 9% Tier 2, 17% Tier 3, 70% no review needed; 85% of historically rejected surveys flagged; 50% classified Tier 1 (12x baseline)
- **Namibia:** Wheat 30-292 g/c/d, mahangu 4-452 g/c/d across regions; own-production >45% in some regions; salt 2.8-7.5 g/c/d nationally

### Impact (decisions enabled)

Add a short paragraph or 2-3 bullets on what the work made possible. Frame as "decisions enabled" not "outcomes claimed" (we often don't know what the client ultimately did).

- **A&T:** Informed country strategies, donor engagement, regional knowledge products; pipeline reused for additional survey rounds
- **UNICEF:** Replaced ad-hoc review with systematic triage; reduced review burden by ~70%; established reproducible scoring that persists across staff turnover
- **Namibia:** Provided evidence base for vehicle selection and dosage setting; identified regions where commercial fortification alone won't reach households

---

## 2. Add bold lead sentence to each Challenge section

**Priority: High | Effort: Low**

Add a single bold sentence at the top of each Challenge section that states the core problem. The supporting paragraphs remain as-is.

Examples:

- **A&T:** "National averages were masking deep inequality -- A&T needed to know whether two decades of progress was reaching the most vulnerable populations."
- **UNICEF:** "With 1,000+ surveys in the database and new rounds arriving regularly, manual quality review couldn't keep up."
- **Namibia:** "Before setting fortification standards, policymakers needed to know which foods Namibians actually eat, in what quantities, and through which supply chains."

---

## 3. Add bullet summary to each Approach section

**Priority: High | Effort: Low**

Add 3-5 bullets immediately after the opening paragraph of each Approach section, before the pipeline diagram. Keep the detailed paragraphs below the diagram for readers who want depth.

### A&T bullets
- Harmonised 15+ MICS/DHS survey rounds across 3 countries using JSON configuration per country-year
- Standardised MCHN indicators across different survey instruments and variable definitions
- Produced disaggregated analysis across 5 equity dimensions (wealth, region, residence, ethnicity, education)
- Modelled trends over 20+ years to identify persistent vs closing gaps

### UNICEF bullets
- Computed 136 quality indicators per survey across 10 measurement dimensions
- Scored each survey through 5 independent statistical channels (PCA, Mahalanobis, mixed-effects, prevalence outlier, prevalence coherence)
- Used hierarchical mixed-effects models so single-survey countries borrow strength from their region
- Persisted model parameters as language-agnostic Parquet files for instant scoring of new surveys

### Namibia bullets
- Analysed NHIES 7-day food diary data for grain production and consumption patterns
- Calculated grams per capita per day for 7 candidate fortification vehicles across 14 regions
- Harmonised 4 Food Composition Tables (199 items) for micronutrient adequacy modelling
- Analysed 3 rounds of DHS data (2000-2013) for historical salt iodization trends

---

## 4. Add 1-2 insight visuals per case study

**Priority: High | Effort: High**

Pipeline diagrams show process. Insight visuals show value. This is the highest-effort item but also the most impactful for perceived sophistication.

### What to create

- **A&T:** Horizontal bar chart showing disparity by wealth quintile or ethnicity for 1-2 key indicators (e.g. exclusive breastfeeding). Could show Lao PDR ethnic gap to make the 35pp number visual.
- **UNICEF:** Tier distribution breakdown -- simple stacked bar or donut showing 4%/9%/17%/70% split. Possibly a second visual showing validation performance (flagged vs unflagged for historically rejected surveys).
- **Namibia:** Regional variation chart for 2-3 fortification vehicles (bar chart showing g/c/d by region). Or a simple table showing the range for each vehicle.

### Implementation options
- **Option A:** Static SVG/PNG images created externally, embedded as `<img>` tags. Simplest. Matches the no-JS philosophy.
- **Option B:** Inline SVG in the HTML. More control over styling (can use CSS variables for colours). No extra file to load.
- **Option C:** A lightweight charting approach using CSS (e.g. CSS bar charts with `width: XX%`). No images needed. Limited but could work for simple bar charts.

### Considerations
- Data sensitivity: confirm with clients that specific numbers can be shown publicly (A&T and Namibia work may have restrictions)
- Keep visuals simple -- one clear point per chart, not dashboards
- Use the site's existing colour palette (--accent for primary, --text-muted for secondary)

---

## 5. Make subtitles more outcome-oriented

**Priority: Medium | Effort: Low**

Current subtitles describe the work. Revised subtitles should hint at what the work unlocked, without becoming marketing taglines.

- **A&T current:** "Multi-country MCHN equity analysis for Alive & Thrive"
- **A&T revised:** "Revealing who two decades of nutrition progress left behind across Southeast Asia"

- **UNICEF current:** "Automated quality checks across 1,000+ surveys for UNICEF JME"
- **UNICEF revised:** "Systematic quality screening that triages 1,000+ surveys for expert review"

- **Namibia current:** "Multi-source food consumption and nutrient analysis for Namibia's fortification strategy"
- **Namibia revised:** "Evidence base for targeting food fortification across Namibia's 14 regions"

These are starting points -- tone should stay factual and understated, not promotional.

---

## 6. Upgrade one stats-bar metric per case study to be outcome-flavoured

**Priority: Medium | Effort: Low**

Keep 3 scale/scope metrics. Replace 1 with an outcome metric.

- **A&T:** Replace "5 Equity stratifiers" with "35pp Largest disparity found" (or similar)
- **UNICEF:** Replace one metric with "85% Detection rate" (historically rejected surveys flagged)
- **Namibia:** Current stats bar already has good variety. Could swap "13 Years of salt trends" for "10x Consumption range across regions" or keep as-is.

---

## 7. Add a subtle CTA after the takeaway

**Priority: Low-Medium | Effort: Low**

Not a sales pitch. A single line in the site's existing voice, with a contact link. Same across all three pages.

Draft:

```html
<div class="case-study-cta">
  <p>
    Working with complex survey data or multi-source analysis?
    <a href="mailto:aaron@a3di.dev">Get in touch</a> to discuss your project.
  </p>
</div>
```

Style: small text, same colour as .back-link, sits between takeaway and footer. No background box, no hard sell.

---

## Items intentionally excluded

These were recommended in the audit but don't fit the site's positioning:

- **"My Role" in meta bar** -- solo consultancy, redundant
- **Removing the JSON code block (A&T)** -- differentiator for technical audience, not clutter
- **Reducing technical depth** -- depth is the value proposition for the target client base
- **Marketing copy in the takeaway** -- dilutes the strongest section
- **9-section page structure** -- bloat; fold improvements into existing 4-section structure

---

## Implementation order

1. **Challenge lead sentences** (item 2) -- 30 min, immediate scannability win
2. **Approach bullet summaries** (item 3) -- 1 hr, makes the longest sections accessible
3. **Result restructuring** (item 1) -- 2 hr, the core strategic upgrade
4. **Subtitle rewrites** (item 5) -- 30 min, pairs well with result changes
5. **Stats bar tweaks** (item 6) -- 15 min
6. **CTA line** (item 7) -- 15 min
7. **Insight visuals** (item 4) -- 4-8 hr, highest effort but highest visual impact; can be done last without blocking other changes
