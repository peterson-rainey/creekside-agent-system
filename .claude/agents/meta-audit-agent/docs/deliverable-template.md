# Meta Audit DOCX Template -- Creekside Gold Standard

This template defines the exact structure, branding, voice, and styling for every Creekside Meta Ads audit. It blends the **JSM-Sensate diagnostic style** with the **B2B Rocket Phase 1/2/3 framework**.

## Source of truth

The authoritative gold-standard reference lives in Supabase `agent_knowledge`:

```sql
SELECT content FROM agent_knowledge
WHERE title = 'Meta Audit PDF Output Structure -- JSM-Sensate Findings + B2B Rocket 90-Day Plan (blended)';
```

Original deliverables this template is derived from:
- JSM-Sensate Meta Ads Audit (May 5, 2026) -- gold-standard format
- B2B Rocket Audit + 90-Day Plan PDF -- explicit Phase 1/2/3 plan structure
- Fusion-Dental-Meta-Audit-Plan-V2.pdf (Drive) -- backup reference

If this template ever drifts from the agent_knowledge entry, the agent_knowledge entry wins. Pull from it at the start of every audit run.

---

## File naming

`$AUDIT_DIR/audit.docx` where `$AUDIT_DIR = ~/Desktop/meta-audit-[ACCOUNT_SLUG]-[YYYY-MM-DD]`.

`ACCOUNT_SLUG` = account name lowercased, spaces to hyphens, special characters removed. Example: "Sensate 2026" -> `sensate-2026`.

Folder layout (created in Step 1.5 of the agent flow):
```
~/Desktop/meta-audit-<slug>-<date>/
├── audit.docx              # this document
├── loom-brief.docx
├── audit.md                # markdown fallback if docx build fails
└── screenshots/
    ├── 01-<finding-slug>.png
    ├── 02-<finding-slug>.png
    └── ...
```

The docx embeds screenshots inline via `ImageRun` (not file paths). The folder is self-contained -- the operator can zip and share it without breaking anything.

---

## Brand palette (hex)

**Palette sourced from sampled pixel colors of an existing Creekside Loom Brief PDF (May 2026).** Tailwind-derived. Do NOT substitute navy/gold or any other accent set -- prior iterations got this wrong and the deliverable did not match Creekside's other client docs.

| Token | Hex | Tailwind ref | Use |
|---|---|---|---|
| BRAND_BLUE | `#2563EB` | blue-600 | Primary brand mark, section labels, client name on cover, badge numbers (QW · 01, ST · 01), KPI tile values, brand mark in page header. |
| BRAND_BLUE_DARK | `#1E40AF` | blue-800 | Hover / emphasis variant of BRAND_BLUE (rarely used). |
| BRAND_DARK | `#0F172A` | slate-900 | Title text, directive headlines, body emphasis. |
| BRAND_BODY | `#1E293B` | slate-800 | Body paragraph text. |
| BRAND_GREY | `#64748B` | slate-500 | Italic captions, subheads, page header/footer metadata, KPI tile labels. |
| BRAND_BG_LIGHT_GREY | `#94A3B8` | slate-400 | Tertiary captions. |
| BRAND_BG_LIGHT | `#F8FAFC` | slate-50 | Cream/tinted fill inside callout boxes. |
| BRAND_BORDER | `#E2E8F0` | slate-200 | Table borders, dividers. |
| BRAND_RED | `#DC2626` | red-600 | CRITICAL severity badges, "CRITICAL RECOMMENDATION" callouts, recommendation lines. |
| BRAND_AMBER | `#F59E0B` | amber-500 | WARN severity badges, "WORKING HYPOTHESIS" callouts. |
| BRAND_GREEN | `#16A34A` | green-600 | OK severity badges, checkmark bullets in Expected Outcomes, "ACKNOWLEDGED AND AFFIRMED" callouts. |

Verify the palette periodically by sampling pixels from a recent Creekside deliverable using PyMuPDF + Pillow. If Creekside's brand shifts (e.g. moves off Tailwind blue-600), update this palette here AND in the agent_knowledge source-of-truth entry.

## Typography

- Body font: Helvetica (PDF) / Calibri (DOCX fallback), 10.5pt for body.
- Cover title: 28pt bold, BRAND_DARK.
- Cover client name: 22pt bold, BRAND_BLUE.
- Directive headline (after section label): 20pt bold, BRAND_DARK.
- H2: 13pt bold, BRAND_DARK.
- H3 (subsection A / B / C): 11pt bold, BRAND_BODY.
- Section labels: 9pt bold, BRAND_BLUE, **LETTER-SPACED CAPS** with **visible word boundaries**. Use the `letter_spaced()` helper that splits on space, inserts U+2009 thin-space between characters within each word, then joins words with three non-breaking spaces (`\u00A0\u00A0\u00A0`). Single-space joining gets collapsed by both ReportLab and Word, so word boundaries vanish. Verified the right way in `_build_pdf.py` on the Dominnik audit.
- Severity badges: same letter-spaced caps treatment, colored per palette, 8pt bold.
- Page header: 7.5pt bold uppercase (NO letter-spacing -- the header is narrow enough that letter-spacing causes left/right overlap in the middle). Verified on the Dominnik build.
- Page footer: 7.5pt regular uppercase, no letter-spacing.

## Voice rules

1. **Short declarative sentences.** Long ones cost trust.
2. **Lead with observation, follow with implication.** "Frequency is 4.15. Each retargeted user has now seen the same ad four times. That is fatigue."
3. **Confidence words** when warranted: "the answer is yes," "presumably functional," "exactly what Meta needs."
4. **No em dashes.** Use double hyphens (`--`) or restructure.
5. **No emojis.** Anywhere.
6. **No hedging.** No "could potentially," "may benefit from," "it seems like."
7. **Contractions OK** in narrative sections.
8. **Surface ambiguity as Open Questions, never invent.** When client input is needed to remove ambiguity, the question lives in Section 07. Do not guess the answer in the finding body.
9. **Dollar impact where the data supports it.** "Retargeting cost $7.42 per LPV against $0.96 cold. That's 7x." Not "retargeting is inefficient."
10. **Frame recommendations as system thinking, not checklists.** "Signal-starvation loop" reads as analysis. "Increase budget" reads as a checklist.

---

## Page-level chrome

### Header (every interior page)
```
[CLIENT NAME]  ·  META ADS AUDIT  ·  [MONTH YEAR]                    CREEKSIDE MARKETING
```
- All letter-spaced caps.
- Client name + audit type left-aligned, brand mark right-aligned via tab stop.
- Bottom border: 4-point single, BRAND_GREY.

### Footer (every interior page)
```
CREEKSIDE MARKETING  ·  [CLIENT]  ·  META AUDIT  ·  [MONTH YEAR]      Page N
```
- All letter-spaced caps for the brand line.
- Page number right-aligned via tab stop.

### Page setup
- US Letter (12240 x 15840 DXA). Always set explicitly; docx-js defaults to A4.
- Margins: 0.75 inch (1080 DXA) all sides.

---

## Section-by-section template

### Cover Page (no section label, page break after)

Block-by-block:

1. **Brand mark** (centered, top):
   ```
   C  CREEKSIDE MARKETING
   PAID MEDIA INTELLIGENCE
   ```
   First line: 14pt bold BRAND_BLUE, letter-spaced. Second line: 7pt BRAND_GREY, letter-spaced.

2. **Confidentiality strip** (centered):
   `CONFIDENTIAL  ·  FOR [CLIENT]` (7pt bold BRAND_RED, letter-spaced) then `[MONTH YEAR]  ·  ACCOUNT AUDIT` (7pt BRAND_GREY, letter-spaced).

3. **Title block**:
   - `META ADS ACCOUNT AUDIT` (20pt bold BRAND_DARK, centered)
   - Client name (18pt bold BRAND_BLUE, centered)
   - One-line tagline derived from the audit findings (11pt italic BRAND_GREY, centered). Example: *"Compliance gap on a mortgage account, conversion optimization without conversion signal, and one ad masquerading as a creative system. Fixable inside 90 days."*

4. **Summary paragraph** (centered, 3 to 5 sentences):
   Frame the audit scope, headline score, and the meta-finding -- the structural problem behind the specific findings.

5. **Four KPI tiles** in a single row (2340 DXA each, summing to 9360):
   - Observed Spend
   - Active Campaigns
   - Active Ads
   - Open Questions

   Each tile: bordered (6-point single BRAND_DARK), centered label in letter-spaced caps (7pt bold BRAND_GREY), centered value (14pt bold BRAND_BLUE).

6. **Prepared block** (left-aligned):
   ```
   PREPARED FOR    [Client name, business]
   ISSUED          [Month DD, YYYY]
   PREPARED BY     Creekside Marketing  ·  [Account Lead]
   ```

7. **Bottom descriptor strip** (centered, letter-spaced 7pt BRAND_GREY), separated by a BRAND_BLUE horizontal rule above it:
   Example: `MORTGAGE  ·  ONTARIO, CANADA  ·  CAD`

8. Page break.

---

### SECTION 01 -- EXECUTIVE SUMMARY

- Section label: letter-spaced caps `SECTION 01  ·  EXECUTIVE SUMMARY` in BRAND_BLUE.
- **Directive headline** (H1, 18pt BRAND_BLUE): one sentence stating the audit thesis. Not a generic "we audited this account." Something like *"Three compounding problems. One coordinated fix sprint."*
- 2-3 body paragraphs framing the account structurally + audit scope.
- **AUDIT POSTURE** callout (BRAND_BLUE border): italicized 1-2 sentences stating Creekside's auditor philosophy. Example: *"We grade what the system is doing, not what the operator intended. Where intent is unclear, we surface it as an Open Question rather than assume."*
- Page break.

---

### SECTION 02 -- HEALTH SNAPSHOT

- Section label + directive headline (e.g. *"Vital signs."*).
- 1 body paragraph summarizing the snapshot.
- **Vital Signs status table**:

  | AREA | OBSERVATION | STATUS |
  |---|---|---|
  | Structure | [1 sentence observation] | OK / WARN / CRITICAL |
  | Pixel + CAPI | ... | ... |
  | Creative | ... | ... |
  | Audiences | ... | ... |
  | Compliance Gate | ... | ... |
  | Spend & Pacing | ... | ... |
  | Tracking | ... | ... |

  - Header row: BRAND_DARK top + bottom borders, letter-spaced caps in BRAND_DARK.
  - Data rows: only bottom border in light grey. Status column: letter-spaced caps badge in palette color.

- H3 "Last 30 days at a glance" followed by **Performance Snapshot table**: metric / value pairs.
- 1 closing paragraph interpreting the snapshot in plain language.
- Page break.

---

### SECTIONS 03 through 0N -- FINDINGS (one section per category)

Use the categories that apply. Typical Meta order:

1. **Compliance Gate** (if a regulated vertical -- mortgage, credit, housing, employment, social issues)
2. **Structure & Learning** (consolidation, learning phase, optimization event)
3. **Tracking** (pixel + CAPI + offline events + dedupe)
4. **Creative & Audiences** (variant count, video, retargeting fatigue, audience inventory)
5. **Budget & Placements** (CBO, placement strategy, daily budget thinness)

For each finding section:

- Section label `SECTION 0N  ·  [CATEGORY NAME]` (letter-spaced caps, BRAND_BLUE).
- **Directive H1**: one sentence stating the headline finding.
- Optional 1-2 paragraph framing.
- **Embedded screenshot(s)** from Step 5.5, with italic centered caption underneath each.
- **Sub-section labels (A, B, C, D)** for distinct sub-findings under the same category. Each sub-section: 11pt bold H3 label + 2-3 sentence context paragraph.
- **Callout box** where appropriate. Three types:
  - **CRITICAL RECOMMENDATION** (BRAND_RED border + BRAND_BG_LIGHT fill)
  - **WORKING HYPOTHESIS** (BRAND_AMBER border + BRAND_BG_LIGHT fill)
  - **ACKNOWLEDGED AND AFFIRMED** (BRAND_GREEN border + BRAND_BG_LIGHT fill, for wins)
- **Bold "RECOMMENDATION:"** one-sentence direction at the end of the section, in BRAND_RED.
- Page break.

---

### SECTION 07 -- OPEN QUESTIONS

- Section label + directive headline ("*Understanding the framework, so we can manage and scale.*").
- 1 italic intro paragraph stating Creekside's objective for this section.
- **Numbered open questions (01 through 06 typical)**:
  - Number in BRAND_BLUE bold.
  - Question text in 11pt bold.
  - Italic context paragraph below explaining what the answer unlocks.
- Page break.

This section feeds the Loom Recording Brief directly. Every open question becomes a talking point Lindsey or Scott raises with the client.

---

### SECTION 08 -- THEMES (optional, keep if 4+ distinct patterns)

- Section label + directive headline ("*The patterns underneath the specific findings.*").
- 4-5 named themes. For each:
  - Theme name in letter-spaced caps (10pt bold BRAND_DARK).
  - One-line italic subhead in BRAND_GREY.
  - 2-3 sentence pattern description in body.

Typical Meta themes: STRUCTURE, TRACKING, AUDIENCES, CREATIVE, COMPLIANCE.

---

### SECTION 09 -- QUICK WINS (Day 1 to 7)

- Section label + directive headline (e.g. *"Zero new budget, executable inside the first week."*).
- Items badged `QW · 01` through `QW · 07` (letter-spaced caps in BRAND_BLUE).
- Per item:
  - Badge + title (11pt bold BRAND_BLUE on the same line).
  - Priority badge (HIGH / MED / LOW) in palette color + day badge (e.g. `DAY 1`, `DAY 2-3`) in BRAND_GREY letter-spaced caps.
  - 1-2 sentence rationale.

Quick wins require zero new budget. They are executable inside the first week.

---

### SECTION 10 -- STRATEGIC RECOMMENDATIONS (Week 2 to 4)

- Same format as Quick Wins but badged `ST · 01` through `ST · 05`.
- Week badges instead of day badges (`WK 2`, `WK 2-3`).
- Depends on Open Questions answered or data accumulated from Phase 1.

---

### SECTION 11 -- 90-DAY PLAN

- Section label + directive headline ("*Three phases. Each one stacks on the last.*").

#### Phase 1 (Days 1 to 30) -- Foundation, Fixes & Funnel Setup

- Phase header in letter-spaced caps: `PHASE 1  ·  DAYS 1 TO 30  ·  FOUNDATION, FIXES & FUNNEL SETUP` (9pt bold BRAND_DARK).
- Spend assumption line: `SPEND: $X to $Y CAD ($Z per day) -- [strategy note]` (BRAND_GREY label, body text after).
- 3 numbered initiatives. Per initiative:
  - Number + title (11pt bold BRAND_BLUE, number in BRAND_BLUE).
  - `Goal:` 1-line goal.
  - 3-4 bulleted fixes.
  - `Outcome:` italic 1-line outcome.

#### Phase 2 (Days 31 to 60) -- Scaling, Creative Expansion & Messaging Precision

- Same format. Step-up spend assumption (25-50%).
- Initiatives focus on: creative variant ramp (3 ads/adset, hooks matched to intent), short-form video, retargeting flywheel reactivation.

#### Phase 3 (Days 61 to 90) -- Full Scaling & Vertical Domination

- Same format. Spend in 20-30% increments contingent on CPL targets.
- Initiatives focus on: lookalike expansion, value-based bidding test, creative refresh cadence.

---

### SECTION 12 -- 90-DAY EXPECTED OUTCOMES

- Section label + directive headline (e.g. *"What we plan to be true on Day 90."*).
- 6-8 checkmark bullets (`✓` in BRAND_GREEN bold) of specific, measurable outcomes.

Examples:
- ✓ Special Ad Category declared. Account safe from compliance disable.
- ✓ Lead campaign exited learning phase. 50+ conversions per adset per week.
- ✓ Retargeting CPL within 1.5x of cold CPL. Frequency under 3.

---

### Closing Page

- Brand mark centered (same treatment as cover, slightly smaller).
- Italic philosophical quote (12pt italic BRAND_BLUE centered). Example: *"We grade what the system is doing. Then we fix it."*
- BRAND_BLUE horizontal rule.
- Audit metadata strip (8pt BRAND_GREY centered):
  ```
  Audit prepared by Creekside Marketing  ·  [DATE]  ·  [Client] (Meta)
  Contact: ads@creeksidemarketingpros.com
  ```

---

## Output format and generation

**Primary output:** PDF (`audit.pdf`).
**Alternative:** DOCX (`audit.docx`), only when an operator needs to hand-edit before delivery.
**Fallback:** Markdown (`audit.md`).

PDF is preferred because: (1) the operator's machine is unlikely to have LibreOffice / Word / Pages for docx-to-PDF conversion, (2) Python ReportLab is pure-Python and works on any Mac without native dependencies, and (3) the rendered output is consistent across viewers.

### PRIMARY: PDF via Python ReportLab

Requires: Python 3 with `reportlab` and `Pillow` (default on most macOS installs). Install if missing:
```bash
pip3 install --user reportlab Pillow
```

Build flow:

1. Write `_build_pdf.py` in `$AUDIT_DIR`. Use the Dominnik audit's `_build_pdf.py` as a reference (see git history of this commit -- the script was cleaned out of the deliverable folder but the structure is documented below).
2. Run: `python3 _build_pdf.py`. Writes `$AUDIT_DIR/audit.pdf`.
3. Validate by rendering page 1 and checking it isn't blank:
   ```python
   import fitz
   doc = fitz.open("audit.pdf")
   pix = doc[0].get_pixmap(dpi=72)
   pix.save("/tmp/_audit_p1.png")
   ```
   (`pip3 install --user pymupdf` if `fitz` is not installed.)
4. Clean up scaffolding: `rm _build_pdf.py`.

#### Key ReportLab patterns the script must implement

- **Page chrome via canvas hooks**: `SimpleDocTemplate(..., onLaterPages=page_chrome)` where `page_chrome(canv, doc)` draws header + footer with `canv.drawString` / `canv.drawRightString`. Skip page 1 (the cover).
- **letter_spaced helper**: splits on space, inserts U+2009 between characters within each word, joins words with three non-breaking spaces `\u00A0\u00A0\u00A0`. The triple-NBSP is REQUIRED -- single spaces get collapsed by ReportLab's paragraph parser and word boundaries vanish.
- **Color hex in inline tags**: use `f'<font color="#{color.hexval()[2:]}">'`. The leading `#` is **REQUIRED**; ReportLab's color parser rejects bare hex with `ValueError: Invalid color value 'dc2626'`. `color.hexval()` returns `0xdc2626`; strip the `0x` and prepend `#`. We hit this on the Dominnik build; the failure is at PDF generation time, not parse time, so it surfaces only when you actually render.
- **Embed screenshots via Platypus `Image`**: `Image(str(path), width=CONTENT_W, height=CONTENT_W * 1560/2880)`. Cropped retina captures are 2880x1560, so the aspect ratio is fixed.
- **Callouts via single-cell tables**: thick top border in the severity color, light cream fill (`BRAND_BG_LIGHT`), thin grey borders on the other sides.
- **KPI tiles via 1x4 table**: equal column widths, two rows (labels + values), thin grey grid inside, thicker dark border around the outside.
- **Vital Signs status table**: 3 columns (Area / Observation / Status), no vertical lines, thick dark line above the header, thin grey line below each row.
- **Helpers worth implementing**: `letter_spaced()`, `section_label(num, name)`, `directive(text)`, `callout(label, color, lines)`, `vital_signs_table()`, `perf_table()`, `kpi_tile_table(items)`, `img(filename, caption)`, `qw_item(num, title, days, priority, body)`, `st_item(num, title, weeks, priority, body)`, `initiative(num, title, goal, fixes, outcome)`, `open_q(num, q, ctx)`, `theme(name, sub, body)`.

#### Known layout nit (acceptable, fixable later)

Short paragraphs at the end of a section can orphan to the next page when the previous content fills the page. Wrap the last 2-3 paragraphs of each finding section in `KeepTogether([...])` to keep the recommendation line attached to its B/C/D subheading.

### ALTERNATIVE: DOCX via docx-js

Only use when the operator explicitly needs an editable Word doc. The DOCX won't render with full fidelity to the PDF (some Tailwind colors clip slightly in Word, callout box borders behave differently). Same structural template applies.

1. Local install: `cd "$AUDIT_DIR" && npm init -y && npm install docx`.
2. Write `_build_docx.js` that imports docx classes:
   ```js
   const {
     Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
     AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
     PageBreak, Header, Footer, PageNumber, TabStopType, TabStopPosition,
   } = require("docx");
   ```
3. Embed screenshots inline using:
   ```js
   new ImageRun({
     type: "png",
     data: fs.readFileSync("screenshots/01-finding-slug.png"),
     transformation: { width: 600, height: Math.round(600 * (1560/2880)) },
     altText: { title: "...", description: "...", name: "..." }
   })
   ```
4. Run: `node _build_docx.js`.
5. Validate: `python3 -c "import zipfile; z = zipfile.ZipFile('audit.docx'); assert '[Content_Types].xml' in z.namelist()"`.
6. Clean up scaffolding: `rm -r node_modules && rm package.json package-lock.json _build_docx.js`.

### FALLBACK: Markdown

If both PDF and DOCX builds fail, write markdown to `$AUDIT_DIR/audit.md` with `![alt](./screenshots/...)` references and report fallback prominently. The relative-path approach keeps the folder self-contained.
