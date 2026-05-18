#!/usr/bin/env python3
"""
Creekside Meta Ads Audit -- PDF builder REFERENCE template.

This script is the canonical PDF builder for Creekside Meta audits.
It is reproduced verbatim in each audit's $AUDIT_DIR as _build_pdf.py
and then customized for the specific client (data, findings, screenshots).

The Dominnik build on 2026-05-18 is the reference implementation.
Future runs should: copy this file -> _build_pdf.py in the audit folder ->
swap the CLIENT_DATA block (top) and the FINDINGS_DATA block (mid) ->
run -> validate -> clean up _build_pdf.py.

Brand palette: Tailwind blue-600 + slate (sampled from a real Creekside
Loom Brief PDF, May 2026). DO NOT substitute navy/gold or any other set.

Structure: JSM-Sensate diagnostic + B2B Rocket Phase 1/2/3.
Voice: short declarative sentences, no em dashes, no hedging.

KNOWN LAYOUT FIXES baked in:
  - CondPageBreak(120) between sections (not PageBreak), so a section that
    already pushed content past the page boundary doesn't get a blank page.
  - KeepTogether([...]) wrapping each finding section's closing block
    (sub-section heading + body + recommendation line), so the
    RECOMMENDATION line is never orphaned alone on the next page.
  - Letter-spaced caps use triple non-breaking-space between words so
    ReportLab's parser doesn't collapse word boundaries.
  - <font color="#..."> tags in inline runs require the # prefix; bare
    hex throws ValueError at render time.
"""

import os
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image,
    PageBreak, CondPageBreak, KeepTogether, HRFlowable,
)

HERE = Path(__file__).parent
SHOTS = HERE / "screenshots"
OUT = HERE / "audit.pdf"

# ---- Brand palette (Tailwind-derived, sampled from real Creekside doc) -----
BRAND_BLUE = colors.HexColor("#2563EB")       # blue-600 -- primary brand
BRAND_BLUE_DARK = colors.HexColor("#1E40AF")  # blue-800
BRAND_DARK = colors.HexColor("#0F172A")        # slate-900 -- titles, headings
BRAND_BODY = colors.HexColor("#1E293B")        # slate-800 -- body
BRAND_GREY = colors.HexColor("#64748B")        # slate-500 -- captions, footer
BRAND_LIGHT_GREY = colors.HexColor("#94A3B8")  # slate-400
BRAND_BG_LIGHT = colors.HexColor("#F8FAFC")    # slate-50 -- callout fill
BRAND_BORDER = colors.HexColor("#E2E8F0")      # slate-200
BRAND_RED = colors.HexColor("#DC2626")         # red-600 -- critical
BRAND_AMBER = colors.HexColor("#F59E0B")       # amber-500 -- warn
BRAND_GREEN = colors.HexColor("#16A34A")       # green-600 -- ok

PAGE_W, PAGE_H = LETTER
MARGIN = 0.75 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

# Unicode characters as constants -- Python 3.9 disallows backslash in f-strings
MIDDOT = "\u00B7"     # ·
NBSP = "\u00A0"        # non-breaking space
THIN_SP = "\u2009"     # thin space
CHECK = "\u2713"       # ✓

# ============================================================================
# CLIENT_DATA -- swap this block per audit
# ============================================================================
CLIENT_NAME = "Dominnik's Mortgage"
CLIENT_OWNER = "Dominnik Leuschner, Dominnik's Mortgage"
ACCOUNT_ID = "act_870100672715638"
AUDIT_MONTH_YEAR = "May 2026"
AUDIT_DATE = "May 18, 2026"
ACCOUNT_LEAD = "Scott Caldwell"
VERTICAL_STRIP = "Mortgage  \u00B7  Ontario, Canada  \u00B7  CAD"
TAGLINE = ("Compliance gap on a mortgage account, conversion optimization without conversion "
           "signal, and one ad masquerading as a creative system. Fixable inside 90 days.")
SUMMARY = (
    "This audit grades Dominnik's Mortgage Ads (act_870100672715638) against Creekside's "
    "80-point Meta diagnostic. We pulled live data on May 18, 2026 and reviewed every active "
    "campaign, every adset, every creative, the pixel, audiences, and compliance settings. "
    "The account scored 40 of 80. The worst issues compound on each other, which means one "
    "disciplined 30-day fix sprint resolves most of them in parallel."
)
KPI_TILES = [
    ("OBSERVED SPEND", "$1,889"),
    ("ACTIVE CAMPAIGNS", "1"),
    ("ACTIVE ADS", "6"),
    ("OPEN QUESTIONS", "6"),
]
HEADER_TEXT_LEFT = "DOMINNIK'S MORTGAGE  \u00B7  META ADS AUDIT  \u00B7  MAY 2026"
FOOTER_TEXT_LEFT = "CREEKSIDE MARKETING  \u00B7  DOMINNIK'S MORTGAGE  \u00B7  META AUDIT  \u00B7  MAY 2026"

# ---- Helpers ---------------------------------------------------------------
def letter_spaced(s):
    """Letter-spaced caps that preserve word boundaries.

    Single-space joining gets collapsed by ReportLab's paragraph parser,
    so we join words with three NBSPs which ReportLab won't touch.
    """
    s = s.upper()
    return "\u00A0\u00A0\u00A0".join("\u2009".join(w) for w in s.split(" "))

# ---- Styles ----------------------------------------------------------------
ss = getSampleStyleSheet()
style_brand_mark = ParagraphStyle("BrandMark", parent=ss["Normal"], fontName="Helvetica-Bold",
                                  fontSize=11, textColor=BRAND_BLUE, alignment=TA_LEFT, spaceAfter=2, leading=14)
style_brand_sub = ParagraphStyle("BrandSub", parent=ss["Normal"], fontName="Helvetica",
                                 fontSize=7, textColor=BRAND_GREY, alignment=TA_LEFT, spaceAfter=0, leading=10)
style_cover_title = ParagraphStyle("CoverTitle", parent=ss["Normal"], fontName="Helvetica-Bold",
                                   fontSize=28, textColor=BRAND_DARK, alignment=TA_LEFT, spaceBefore=120, spaceAfter=8, leading=34)
style_cover_client = ParagraphStyle("CoverClient", parent=ss["Normal"], fontName="Helvetica-Bold",
                                    fontSize=22, textColor=BRAND_BLUE, alignment=TA_LEFT, spaceAfter=14, leading=28)
style_cover_tagline = ParagraphStyle("CoverTagline", parent=ss["Normal"], fontName="Helvetica-Oblique",
                                     fontSize=12, textColor=BRAND_GREY, alignment=TA_LEFT, spaceAfter=18, leading=18)
style_cover_summary = ParagraphStyle("CoverSummary", parent=ss["Normal"], fontName="Helvetica",
                                     fontSize=11, textColor=BRAND_BODY, alignment=TA_LEFT, spaceAfter=14, leading=16)
style_section_label = ParagraphStyle("SectionLabel", parent=ss["Normal"], fontName="Helvetica-Bold",
                                     fontSize=9, textColor=BRAND_BLUE, alignment=TA_LEFT, spaceBefore=18, spaceAfter=4, leading=12)
style_directive = ParagraphStyle("Directive", parent=ss["Normal"], fontName="Helvetica-Bold",
                                 fontSize=20, textColor=BRAND_DARK, alignment=TA_LEFT, spaceAfter=12, leading=24)
style_h2 = ParagraphStyle("H2", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=13, textColor=BRAND_DARK, alignment=TA_LEFT, spaceBefore=10, spaceAfter=6, leading=16)
style_h3 = ParagraphStyle("H3", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=11, textColor=BRAND_BODY, alignment=TA_LEFT, spaceBefore=8, spaceAfter=4, leading=14)
style_body = ParagraphStyle("Body", parent=ss["Normal"], fontName="Helvetica",
                            fontSize=10.5, textColor=BRAND_BODY, alignment=TA_LEFT, spaceAfter=8, leading=15)
style_italic = ParagraphStyle("Italic", parent=style_body, fontName="Helvetica-Oblique", textColor=BRAND_GREY)
style_caption = ParagraphStyle("Caption", parent=ss["Normal"], fontName="Helvetica-Oblique",
                               fontSize=8.5, textColor=BRAND_GREY, alignment=TA_CENTER, spaceBefore=2, spaceAfter=14, leading=11)
style_rec = ParagraphStyle("Rec", parent=style_body, textColor=BRAND_RED, fontName="Helvetica-Bold")
style_callout = ParagraphStyle("Callout", parent=ss["Normal"], fontName="Helvetica",
                               fontSize=10, textColor=BRAND_BODY, alignment=TA_LEFT, leading=14)
style_kpi_label = ParagraphStyle("KPILabel", parent=ss["Normal"], fontName="Helvetica-Bold",
                                 fontSize=8, textColor=BRAND_GREY, alignment=TA_CENTER, spaceAfter=6, leading=10)
style_kpi_value = ParagraphStyle("KPIValue", parent=ss["Normal"], fontName="Helvetica-Bold",
                                 fontSize=18, textColor=BRAND_BLUE, alignment=TA_CENTER, leading=22)
style_phase_header = ParagraphStyle("PhaseHeader", parent=ss["Normal"], fontName="Helvetica-Bold",
                                    fontSize=11, textColor=BRAND_DARK, alignment=TA_LEFT, spaceBefore=14, spaceAfter=4, leading=15)
style_outcome = ParagraphStyle("Outcome", parent=style_body, fontName="Helvetica-Oblique",
                               textColor=BRAND_GREEN, spaceAfter=10)
style_check = ParagraphStyle("Check", parent=style_body, leftIndent=14, firstLineIndent=-14, spaceAfter=4)

# ---- Page chrome (header + footer) -----------------------------------------
def page_chrome(canv, doc):
    canv.saveState()
    if doc.page > 1:
        canv.setFont("Helvetica-Bold", 7.5)
        canv.setFillColor(BRAND_GREY)
        canv.drawString(MARGIN, PAGE_H - MARGIN + 18, HEADER_TEXT_LEFT)
        canv.setFillColor(BRAND_BLUE)
        canv.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 18, "CREEKSIDE MARKETING")
        canv.setStrokeColor(BRAND_BORDER)
        canv.setLineWidth(0.5)
        canv.line(MARGIN, PAGE_H - MARGIN + 12, PAGE_W - MARGIN, PAGE_H - MARGIN + 12)
        canv.setFont("Helvetica", 7.5)
        canv.setFillColor(BRAND_GREY)
        canv.drawString(MARGIN, MARGIN - 28, FOOTER_TEXT_LEFT)
        canv.drawRightString(PAGE_W - MARGIN, MARGIN - 28, f"Page {doc.page}")
    canv.restoreState()

# ---- Reusable building blocks ----------------------------------------------
def section_label(num, name):
    return Paragraph(f"<b>{letter_spaced(f'Section {num}  {MIDDOT}  {name}')}</b>", style_section_label)

def directive(text):
    return Paragraph(text, style_directive)

def kpi_tile_table(items):
    cell_w = CONTENT_W / len(items)
    tbl = Table(
        [[Paragraph(label, style_kpi_label) for label, _ in items],
         [Paragraph(value, style_kpi_value) for _, value in items]],
        colWidths=[cell_w] * len(items),
        rowHeights=[18, 28],
    )
    tbl.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.75, BRAND_DARK),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, BRAND_BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return tbl

def status_badge(status):
    color = BRAND_RED if status.upper() in ("CRITICAL", "MAJOR GAP", "BUDGET LEAK") else (BRAND_AMBER if status.upper() == "WARN" else BRAND_GREEN)
    return Paragraph(f"<b>{letter_spaced(status)}</b>",
                     ParagraphStyle("Badge", parent=ss["Normal"], fontName="Helvetica-Bold", fontSize=8, textColor=color, leading=11))

def vital_signs_table(rows):
    """rows = list of (area, observation, status) tuples."""
    header = [Paragraph(f"<b>{letter_spaced('Area')}</b>", style_kpi_label),
              Paragraph(f"<b>{letter_spaced('Observation')}</b>", style_kpi_label),
              Paragraph(f"<b>{letter_spaced('Status')}</b>", style_kpi_label)]
    body_rows = [[Paragraph(f"<b>{a}</b>", style_body), Paragraph(o, style_body), status_badge(s)] for a, o, s in rows]
    data = [header] + body_rows
    tbl = Table(data, colWidths=[1.4 * inch, 4.1 * inch, 1.5 * inch], repeatRows=1)
    tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEABOVE", (0, 0), (-1, 0), 1.0, BRAND_DARK),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, BRAND_DARK),
        ("LINEBELOW", (0, 1), (-1, -1), 0.4, BRAND_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    return tbl

def perf_table(rows):
    """rows = list of (metric, value) tuples."""
    header = [Paragraph(f"<b>{letter_spaced('Metric')}</b>", style_kpi_label),
              Paragraph(f"<b>{letter_spaced('Last 30 days')}</b>", style_kpi_label)]
    data = [header]
    for k, v in rows:
        data.append([Paragraph(k, style_body), Paragraph(f"<b>{v}</b>", style_body)])
    tbl = Table(data, colWidths=[3.5 * inch, 3.5 * inch], repeatRows=1)
    tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEABOVE", (0, 0), (-1, 0), 1.0, BRAND_DARK),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, BRAND_DARK),
        ("LINEBELOW", (0, 1), (-1, -1), 0.4, BRAND_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return tbl

def callout(label, color, lines):
    head_style = ParagraphStyle("CO", parent=ss["Normal"], fontName="Helvetica-Bold", fontSize=8.5, textColor=color, leading=11, spaceAfter=4)
    cell_content = [Paragraph(f"<b>{letter_spaced(label)}</b>", head_style)]
    for ln in lines:
        cell_content.append(Paragraph(ln, style_callout))
    tbl = Table([[cell_content]], colWidths=[CONTENT_W])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND_BG_LIGHT),
        ("LINEABOVE", (0, 0), (-1, 0), 2.5, color),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, BRAND_BORDER),
        ("LINEBEFORE", (0, 0), (-1, -1), 0.5, BRAND_BORDER),
        ("LINEAFTER", (0, 0), (-1, -1), 0.5, BRAND_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ]))
    return tbl

def img(filename, caption):
    fp = SHOTS / filename
    if not fp.exists():
        return [Paragraph(f"[missing: {filename}]", style_italic)]
    aspect = 1560 / 2880
    w = CONTENT_W
    h = w * aspect
    return [Image(str(fp), width=w, height=h), Paragraph(caption, style_caption)]

def qw_item(num, title, days, priority, body_text):
    color = BRAND_RED if priority == "HIGH" else BRAND_AMBER if priority == "MED" else BRAND_GREEN
    color_hex = f"#{color.hexval()[2:]}"
    return KeepTogether([
        Paragraph(f'<font color="#2563EB"><b>{letter_spaced(f"QW  {MIDDOT}  {num:02d}")}</b></font>'
                  f'&nbsp;&nbsp;&nbsp;<font color="#0F172A"><b>{title}</b></font>', style_h3),
        Paragraph(f'<font color="{color_hex}"><b>{letter_spaced(priority)}</b></font>'
                  f'&nbsp;&nbsp;&nbsp;<font color="#64748B"><b>{letter_spaced(days)}</b></font>',
                  ParagraphStyle("QWMeta", parent=style_body, fontSize=8, spaceAfter=4)),
        Paragraph(body_text, style_body),
        Spacer(1, 8),
    ])

def st_item(num, title, weeks, priority, body_text):
    color = BRAND_RED if priority == "HIGH" else BRAND_AMBER if priority == "MED" else BRAND_GREEN
    color_hex = f"#{color.hexval()[2:]}"
    return KeepTogether([
        Paragraph(f'<font color="#2563EB"><b>{letter_spaced(f"ST  {MIDDOT}  {num:02d}")}</b></font>'
                  f'&nbsp;&nbsp;&nbsp;<font color="#0F172A"><b>{title}</b></font>', style_h3),
        Paragraph(f'<font color="{color_hex}"><b>{letter_spaced(priority)}</b></font>'
                  f'&nbsp;&nbsp;&nbsp;<font color="#64748B"><b>{letter_spaced(weeks)}</b></font>',
                  ParagraphStyle("STMeta", parent=style_body, fontSize=8, spaceAfter=4)),
        Paragraph(body_text, style_body),
        Spacer(1, 8),
    ])

def initiative(num, title, goal, fixes, outcome):
    block = [
        Paragraph(f'<font color="#2563EB"><b>{num:02d}.&nbsp;&nbsp;</b></font><b>{title}</b>', style_h3),
        Paragraph(f"<b>Goal:</b> {goal}", style_body),
    ]
    for f in fixes:
        block.append(Paragraph(f"&bull;&nbsp; {f}",
                               ParagraphStyle("Bullet", parent=style_body, leftIndent=14, firstLineIndent=-10, spaceAfter=2)))
    block.append(Paragraph(f"<b><i>Outcome:</i></b> <i>{outcome}</i>", style_outcome))
    return KeepTogether(block)

def open_q(num, q, ctx):
    return KeepTogether([
        Paragraph(f'<font color="#2563EB"><b>{num:02d}&nbsp;&nbsp;</b></font><b>{q}</b>', style_h3),
        Paragraph(ctx, style_italic),
        Spacer(1, 4),
    ])

def theme(name, sub, body_text):
    return KeepTogether([
        Paragraph(f"<b>{letter_spaced(name)}</b>",
                  ParagraphStyle("ThemeName", parent=ss["Normal"], fontName="Helvetica-Bold", fontSize=10,
                                 textColor=BRAND_DARK, leading=14, spaceBefore=8, spaceAfter=2)),
        Paragraph(sub, style_italic),
        Paragraph(body_text, style_body),
    ])

def section_break():
    """Use between sections instead of PageBreak() to prevent blank pages."""
    return CondPageBreak(120)

# ============================================================================
# FINDINGS_DATA -- swap this per audit
# ============================================================================
VITAL_SIGNS = [
    ("Structure", "One active lead campaign, seven adsets, eight ads. One ad name repeats across all adsets.", "Critical"),
    ("Pixel + CAPI", "Pixel fired within 24 hours. CAPI status not yet verified in Events Manager.", "Warn"),
    ("Creative", "One image, one body copy, one headline across every cold adset. No video. Advantage+ creative features off.", "Critical"),
    ("Audiences", "Website Visitors 180 and All Leads 180 exist. No lookalikes. No uploaded customer list. Cold audiences too narrow for budget.", "Warn"),
    ("Compliance Gate", "Mortgage account with no Special Ad Category declared. Voluntary verification flag on every adset.", "Critical"),
    ("Spend & Pacing", "$1,889.59 CAD over 30 days. Budget at adset level, not CBO. Lead campaign generated zero pixel leads.", "Critical"),
    ("Tracking", "All Leads 180 offline audience has volume. Pixel reports one Lead event. Reconciliation is an Open Question.", "Warn"),
]
PERF_DATA = [
    ("Observed spend", "$1,889.59 CAD"),
    ("Impressions", "178,814"),
    ("Reach", "70,772"),
    ("Frequency (account avg)", "2.53"),
    ("Frequency (retargeting adset)", "4.15 -- fatigued"),
    ("CTR", "1.41%"),
    ("CPC", "$0.75 CAD"),
    ("Landing page views", "974 at $1.94 / LPV"),
    ("Pixel leads", "1"),
    ("Cost per pixel lead", "$1,889.59 CAD"),
    ("Active campaigns", "1 (Lead Campaigns-5.1)"),
    ("Active adsets", "5 cold + 1 retargeting"),
    ("Active ads", "6 (all identical creative)"),
]

# ---- Story assembly --------------------------------------------------------
story = []

# === COVER (page 1) ========================================================
story += [
    Paragraph("CREEKSIDE MARKETING", style_brand_mark),
    Paragraph(letter_spaced("Paid Media Intelligence"), style_brand_sub),
    Spacer(1, 30),
    Paragraph(f'<font color="#DC2626"><b>{letter_spaced(f"Confidential  {MIDDOT}  For {CLIENT_NAME.split(chr(39))[0]}")}</b></font>', style_brand_sub),
    Paragraph(letter_spaced(f"{AUDIT_MONTH_YEAR}  {MIDDOT}  Account Audit"), style_brand_sub),
    Spacer(1, 40),
    Paragraph("Meta Ads Account Audit", style_cover_title),
    Paragraph(CLIENT_NAME, style_cover_client),
    Paragraph(f"<i>{TAGLINE}</i>", style_cover_tagline),
    Paragraph(SUMMARY, style_cover_summary),
    Spacer(1, 12),
    kpi_tile_table(KPI_TILES),
    Spacer(1, 24),
    Paragraph(f'<font color="#64748B"><b>{letter_spaced("Prepared For")}</b></font>&nbsp;&nbsp;&nbsp;&nbsp;{CLIENT_OWNER}', style_body),
    Paragraph(f'<font color="#64748B"><b>{letter_spaced("Issued")}</b></font>&nbsp;&nbsp;&nbsp;&nbsp;{AUDIT_DATE}', style_body),
    Paragraph(f'<font color="#64748B"><b>{letter_spaced("Prepared By")}</b></font>&nbsp;&nbsp;&nbsp;&nbsp;Creekside Marketing  {MIDDOT}  {ACCOUNT_LEAD}, Account Lead', style_body),
    Spacer(1, 30),
    HRFlowable(width=CONTENT_W, thickness=1.5, color=BRAND_BLUE),
    Paragraph(f"<para alignment='center'><font color='#64748B' size='7'>{letter_spaced(VERTICAL_STRIP)}</font></para>",
              ParagraphStyle("Strip", parent=ss["Normal"])),
    PageBreak(),
]

# === SECTION 01 - EXECUTIVE SUMMARY ========================================
story += [
    section_label("01", "Executive Summary"),
    directive("Three compounding problems. One coordinated fix sprint."),
    Paragraph(
        "Dominnik's account spent $1,889.59 CAD in the last 30 days and the pixel saw one lead. That is not the campaigns failing in isolation. It is the result of three structural problems running in parallel: a mortgage compliance gap, a conversion optimization event with no signal flowing through it, and a single ad creative running everywhere as if there were no audience-level differentiation.",
        style_body),
    Paragraph(
        "None of these are creative judgment calls. Each one is a specific, observable system state with a specific fix. The compliance gap forces an audience rebuild, which slots cleanly into the consolidation we need anyway, which gives the conversion optimization event enough signal to learn, which is when three new creative variants actually start mattering. The phases stack.",
        style_body),
    Spacer(1, 8),
    callout("Audit Posture", BRAND_BLUE, [
        "<i>We grade what the system is doing, not what the operator intended. Where intent is unclear, we surface it as an Open Question rather than assume. Where the account is doing something right, we say so plainly.</i>",
    ]),
    section_break(),
]

# === SECTION 02 - HEALTH SNAPSHOT ==========================================
story += [
    section_label("02", "Health Snapshot"),
    directive("Vital signs."),
    Paragraph("Below: every major audit area, what we observed, and a status badge. Four areas critical, three areas to watch, none currently in good standing.", style_body),
    Spacer(1, 6),
    vital_signs_table(VITAL_SIGNS),
    Spacer(1, 18),
    Paragraph("Last 30 days at a glance", style_h2),
    perf_table(PERF_DATA),
    Spacer(1, 8),
    Paragraph("Cold traffic is engaged ($1.94 per landing page view, $0.75 per click are reasonable for the vertical). The funnel breaks after the click. The lead campaign's optimization event isn't firing in volume, retargeting frequency is north of 4 on a small pool, and the same image is running everywhere.", style_body),
    section_break(),
]

# === SECTION 03 - COMPLIANCE GATE ==========================================
story += [
    section_label("03", "Compliance Gate"),
    directive("Declare the Credit Special Ad Category before anything else moves."),
    callout("Critical Recommendation", BRAND_RED, [
        "This account is a Canadian mortgage account with zero Special Ad Categories declared. Every adset carries Meta's VOLUNTARY_VERIFICATION flag. The current targeting (age 25 to 40, custom radii under 15 miles, narrow interest layers) is not permitted under the Credit category that mortgages must declare. If Meta sweeps this account, you lose the pixel data, the audiences, and the buying history.",
    ]),
    Spacer(1, 10),
]
story += img("01-special-ad-category-empty.png", 'Campaign Review tab: "Special Ad Categories: No categories declared." Every adset inherits this.')
# IMPORTANT: wrap the section's closing block (sub-sections + recommendation) in KeepTogether
# so the RECOMMENDATION line never orphans alone to the next page.
story.append(KeepTogether([
    Paragraph("A. The setting that's missing", style_h3),
    Paragraph("Meta requires advertisers in restricted verticals (credit, housing, employment, social issues) to declare a Special Ad Category. The declaration triggers automatic targeting restrictions: no age limits below 18, no gender targeting, no narrow geo, no interest targeting on sensitive attributes. The protection is real. Skipping the declaration is not a workaround. It's a policy violation Meta increasingly enforces.", style_body),
    Paragraph("B. The flag that's already on", style_h3),
    Paragraph("Every active adset in this account already carries <font face='Courier'>regional_regulated_categories: [\"VOLUNTARY_VERIFICATION\"]</font>. Meta has already noticed this looks regulated. The volunteer-yourself-now window is open. The non-volunteer-and-get-disabled window opens automatically after that.", style_body),
    Paragraph("<b>RECOMMENDATION:</b> Open each campaign, declare the Credit Special Ad Category, and rebuild adset targeting to compliant defaults: region (Ontario), age 18 to 65+, no narrow demographic or interest layering. Yes, you give up some optimization power. The alternative is account loss.", style_rec),
]))
story.append(section_break())

# === SECTION 04 - STRUCTURE & LEARNING =====================================
story += [
    section_label("04", "Structure & Learning"),
    directive("Conversion optimization with zero conversions per week never exits learning."),
]
story += img("02-campaigns-zero-leads.png", "Lead Campaigns-5.1 versus Traffic-5.18. The paused traffic campaign generated the one tracked lead. The active lead campaign generated zero.")
story += img("03-adsets-no-per-lead.png", "Every active adset inside Lead Campaigns-5.1 shows blank Per Lead. None are accumulating the conversion signal Meta's algorithm needs.")
story.append(KeepTogether([
    Paragraph("A. The signal-starvation loop", style_h3),
    Paragraph("Lead Campaigns-5.1 spent $1,054 across 30 days and produced zero pixel-tracked leads. The PAUSED Traffic-4.20 campaign produced the one lead on the account. Adsets are set to optimize for OFFSITE_CONVERSIONS against the Lead event. Meta's learning phase exits at roughly 50 conversions per adset per week. We are at zero per week. The longer this runs, the more you pay to train an algorithm on nothing.", style_body),
    Paragraph("B. The consolidation case", style_h3),
    Paragraph("Five active adsets, each with its own budget, splitting one campaign's spend five ways. Meta cannot pool the signal at the campaign level because CBO isn't on. Even if the optimization event were correct, the budget is sliced too thin for any single adset to hit learning-phase volume.", style_body),
    callout("Working Hypothesis", BRAND_AMBER, [
        "Switching to Lead Ads (Meta's native instant forms) solves the signal problem in days. The form lives on Meta, prefilled with the user's email and phone, and the conversion event fires the moment the form submits. No website variability, no pixel deduplication question, no offline event reconciliation.",
    ]),
    Paragraph("<b>RECOMMENDATION:</b> Switch the lead campaign to Lead Ads with instant forms. Consolidate the four cold adsets into one with broad audience targeting under CBO. Concentrate signal so Meta has enough conversions to learn.", style_rec),
]))
story.append(section_break())

# === SECTION 05 - CREATIVE & AUDIENCES =====================================
story += [
    section_label("05", "Creative & Audiences"),
    directive("One ad, four audiences, four different intents. The math doesn't work."),
    Paragraph("A. The single-creative problem", style_h3),
    Paragraph("Every active adset runs one ad. Every one of those ads uses the same image, the same body copy starting with \"Thinking about breaking your mortgage?\", the same headline \"We're Here To Help\", and the same call-to-action button (CONTACT_US). The audiences in front of these ads are different: first-time buyers, mortgage-house intent, refinancers, and pre-qualifiers. Their psychology and what they care about have very little overlap. The creative isn't doing the work of speaking to any of them specifically.", style_body),
    Paragraph("B. The format gap", style_h3),
    Paragraph("Zero video ads on the account. Every Advantage+ creative feature is set to OPT_OUT. Static-only in 2026, with no creative testing harness behind it, is a 3 to 5x performance gap for mortgage on Meta against accounts that test video and intent-matched copy.", style_body),
]
story.append(KeepTogether([
    Paragraph("C. The retargeting fatigue", style_h3),
    Paragraph("The retargeting adset spent $304 in 30 days, reached 1,828 people, served 7,594 impressions, and produced 41 landing page views at $7.42 each. Frequency 4.15. Same creative as the cold side. Cost per LPV is 7x the cold cost. Retargeting is supposed to be the cheapest conversions on the account, not the most expensive.", style_body),
    Paragraph("D. The audience inventory", style_h3),
    Paragraph("Strong: Website Visitors 180 and All Leads 180 (offline) both exist. Missing: no customer list audience uploaded for suppression and lookalike seeding, no lookalike audiences built, no Advantage+ Audience expansion enabled. Cold targeting is also too narrow for the budget. With Special Ad Category enabled (Section 03), broad targeting becomes mandatory anyway.", style_body),
    Paragraph("<b>RECOMMENDATION:</b> Three ad variants per adset minimum, hooks matched to audience intent. At least one short-form video per adset, ideally Dom on camera. Turn Advantage+ creative on as a test. Build a retargeting-specific creative and cap frequency at 2 per week. Upload Dom's closed-loan list and build 1 percent and 3 percent lookalikes once Lead Ads start producing volume.", style_rec),
]))
story.append(section_break())

# === SECTION 06 - BUDGET & PLACEMENTS ======================================
story += [
    section_label("06", "Budget & Placements"),
    directive("Budget at the adset level fragments the signal."),
]
story.append(KeepTogether([
    Paragraph("A. CBO is off", style_h3),
    Paragraph("All budget is set at the adset level ($20 per day per cold adset, $12 per day for retargeting). Campaign Budget Optimization would let Meta allocate across the adsets in real time toward whichever audience is converting. With CBO off, every adset gets a fixed slice whether it's the best or the worst performer.", style_body),
    Paragraph("B. Placements are intentional but undertested", style_h3),
    Paragraph("Facebook feed and profile feed plus Instagram stream and profile feed. Mobile and desktop both enabled. Reels and Stories are not currently enabled. Reels in particular has been the lowest CPM placement on Meta through 2025 to 2026 for mortgage lead campaigns. Worth a placement-specific test once the creative testing system is live.", style_body),
    Paragraph("<b>RECOMMENDATION:</b> Move to CBO once cold adsets consolidate. Test Reels placement when the second creative variant ships.", style_rec),
]))
story.append(section_break())

# === SECTION 07 - OPEN QUESTIONS ===========================================
story += [
    section_label("07", "Open Questions"),
    directive("Understanding the framework, so we can manage and scale."),
    Paragraph("These are the questions we need answered to remove ambiguity from this account. The answers shape the 90-day plan.", style_italic),
    Spacer(1, 8),
    open_q(1, "Is the All Leads 180 offline audience populated by a real CRM upload, or is it sitting at Meta's audience-size minimum floor?", "The pixel reports one Lead event in 30 days. The offline audience has volume. Reconciling these answers whether the website form is converting at all, or whether Meta just isn't seeing the conversions because the pixel event is misconfigured."),
    open_q(2, "Is the Conversions API integration live and reconciled with the pixel event?", "Pixel-only attribution undercounts in iOS 14.5+ environments. We need to confirm CAPI in Events Manager and dedupe keys are set. This shifts how much of the current performance gap is tracking vs. true performance."),
    open_q(3, "What does the website form thank-you flow actually look like?", "Landing URL is the homepage. If a form exists and there's a thank-you page, the Lead pixel event should fire on it. If there's no dedicated landing page or thank-you trigger, the campaigns can't be optimizing on a Lead event in any meaningful way."),
    open_q(4, "Will Dom appear on camera for short-form video creative?", "Mortgage CPL on Meta drops 30 to 50 percent when the operator's face is on the ad. If yes, we plan a two-shoot calendar for Phase 2. If no, we test stock-footage + voiceover formats instead."),
    open_q(5, "What's the qualified-lead definition on Dom's side, and at what CPL does this account become net profitable?", "Setting the right optimization event downstream of Lead requires knowing where in the funnel revenue actually shows up. This also tells us the ceiling on CPL we can pay before the math stops working."),
    open_q(6, "Does Dom have a closed-loan customer list (CSV with name + email + phone) we can upload?", "Two compounding benefits: exclude existing customers from cold campaigns and seed real-customer lookalikes. This is the single highest-leverage data drop the operator can hand over."),
    section_break(),
]

# === SECTION 08 - THEMES ===================================================
story += [
    section_label("08", "Themes"),
    directive("The patterns underneath the specific findings."),
    theme("Structure", "One campaign, five adsets, one ad: too thin for Meta's algorithm to learn at any of those levels.",
          "Every layer of the account is fragmented. Budget fragments across adsets. Creative fragments across audiences but doesn't differentiate. The fix at each layer is consolidation paired with discipline."),
    theme("Tracking", "The signal you're optimizing on may not be the signal you're receiving.",
          "Pixel says one lead. Offline audience says many. Until that reconciles, every optimization decision the algorithm makes is informed by ambiguous data."),
    theme("Audiences", "Custom-built lists exist. The leverage on top of them is missing.",
          "Website Visitors 180 and All Leads 180 are good foundations. No lookalike on top of them, no customer-list upload, no broad audience test running alongside means the account is leaving Meta's most powerful prospecting tools on the table."),
    theme("Creative", "One ad for every audience, every objective, every funnel stage.",
          "This is the single highest-leverage fix on the account because it compounds with everything else. Different audiences need different messages. Different funnel stages need different messages. Meta's algorithm rewards creative variety, then turns that variety into delivery decisions."),
    theme("Compliance", "A regulated vertical run as if it weren't.",
          "Canadian mortgages without Credit category declared. This is the kind of finding that lives quietly until Meta's next sweep, at which point everything else in this audit becomes moot because the account is gone."),
    section_break(),
]

# === SECTION 09 - QUICK WINS ===============================================
story += [
    section_label("09", f"Quick Wins  {MIDDOT}  Day 1 to 7"),
    directive("Zero new budget, executable inside the first week."),
    qw_item(1, "Declare Credit Special Ad Category on every campaign", "DAY 1", "HIGH",
            "Open each campaign, set Special Ad Category to Credit. Removes the compliance bomb. No new spend, immediate policy alignment."),
    qw_item(2, "Pause the retargeting adset until new creative ships", "DAY 1", "HIGH",
            "Frequency 4.15, $7.42 per LPV. The retargeting pool is fatigued on the cold creative. Pausing stops the bleed while we build a real retargeting variant."),
    qw_item(3, "Disable Audience Network on the lead campaign", "DAY 2", "MED",
            "If currently included in placements, exclude it. Audience Network lead quality is consistently low in mortgage. Test re-adding it only after CPL stabilizes."),
    qw_item(4, "Verify the Lead pixel event is firing on the website form", "DAY 2-3", "HIGH",
            "Open Events Manager, watch the Lead event in real time, fill the form manually. If it fires, we know the gap is upstream. If it doesn't, that's the immediate next fix."),
    qw_item(5, "Confirm CAPI is active and dedupe keys are set", "DAY 3", "HIGH",
            "CAPI catches conversions Apple's ATT framework strips from the pixel. Without it on a regulated vertical, conversion counts are systematically undercounted by 20 to 40 percent."),
    qw_item(6, "Set up offline event upload from Dom's CRM", "DAY 4-5", "MED",
            "If real leads are flowing through the CRM, get them into Meta as offline conversions. Even if pixel tracking is suspect, offline events give Meta a downstream signal to optimize on."),
    qw_item(7, "Prep Campaign Budget Optimization for the consolidation", "DAY 6-7", "MED",
            "Switch budget strategy preview to CBO so when adsets consolidate (Phase 1), the budget pools automatically. No allocation changes yet, just the strategy switch."),
    section_break(),
]

# === SECTION 10 - STRATEGIC RECS ===========================================
story += [
    section_label("10", f"Strategic Recommendations  {MIDDOT}  Week 2 to 4"),
    directive("Depends on Phase 1 fixes landing first."),
    st_item(1, "Migrate lead campaign to Lead Ads (instant forms)", "WK 2", "HIGH",
            "Bypass website variability and pixel deduplication. Lead Ads ship leads to the CRM the same day. Solves the signal-starvation problem in days."),
    st_item(2, "Consolidate four cold adsets into one broad adset under CBO", "WK 2-3", "HIGH",
            "One adset, region-level Ontario targeting, age 18 to 65+, Advantage+ Audience on. Concentrate spend so Meta has enough conversions per adset per week to exit learning."),
    st_item(3, "Launch 3 ad variants per adset, hooks matched to audience intent", "WK 3", "HIGH",
            "Different headlines, different images, different opening lines. The creative testing harness Meta needs to optimize."),
    st_item(4, "Build retargeting-specific creative and reactivate retargeting", "WK 3-4", "MED",
            "Different message for an audience that already raised a hand. Frequency cap 2 per week."),
    st_item(5, "Upload Dom's closed-loan customer list and seed lookalikes", "WK 4", "MED",
            "Customer-list exclusion on cold campaigns plus 1 percent and 3 percent lookalikes from real buyers."),
    section_break(),
]

# === SECTION 11 - 90-DAY PLAN ==============================================
story += [
    section_label("11", "90-Day Plan"),
    directive("Three phases. Each one stacks on the last."),
    KeepTogether([
        Paragraph(f"<font color='#2563EB'><b>{letter_spaced(f'Phase 1  {MIDDOT}  Days 1 to 30  {MIDDOT}  Foundation, Fixes and Funnel Setup')}</b></font>", style_phase_header),
        Paragraph("<b>SPEND:</b> $1,800 to $2,400 CAD ($60 to $80 per day) -- hold flat while compliance and tracking lock in", style_body),
    ]),
    initiative(1, "Compliance and policy alignment", "Account becomes policy-compliant and removes disable risk",
               ["Declare Credit Special Ad Category on every campaign",
                "Rebuild cold audience targeting: Ontario region, age 18 to 65+, Advantage+ Audience on",
                "Validate Voluntary Verification flag clears after declaration"],
               "Compliance gate closed. Account safe from policy disable."),
    initiative(2, "Tracking reconciliation", "Pixel, CAPI, and offline events tell one consistent story",
               ["Confirm Lead pixel event firing on website form thank-you page",
                "Verify Conversions API active and dedupe keys configured",
                "Connect Dom's CRM offline event upload"],
               "Conversion data trustworthy. Future optimization decisions made on real signal."),
    initiative(3, "Funnel setup: Lead Ads instant forms", "Conversion event accumulates in days, not weeks",
               ["Build Meta Lead Ad form with prefilled email + phone fields",
                "Connect form submissions to Dom's CRM via Zapier or native integration",
                "A/B test form length: short form vs. qualifier-rich form"],
               "Lead campaign hits 50+ conversions per adset per week. Learning phase exits."),
    KeepTogether([
        Paragraph(f"<font color='#2563EB'><b>{letter_spaced(f'Phase 2  {MIDDOT}  Days 31 to 60  {MIDDOT}  Scaling, Creative Expansion and Messaging Precision')}</b></font>", style_phase_header),
        Paragraph("<b>SPEND:</b> $2,400 to $3,600 CAD ($80 to $120 per day) -- 25 to 50 percent step-up as signal accumulates", style_body),
    ]),
    initiative(1, "Creative variant ramp: 3 ads per adset, hook-matched",
               "Meta has variants to test; mortgage CPL benchmark drops 20 to 40 percent",
               ["Variant A: rate-focused hook (\"Here's what a 1 percent rate drop saves you on a $700K mortgage\")",
                "Variant B: penalty-focused hook (\"Your break penalty is probably smaller than your bank's told you\")",
                "Variant C: first-time-buyer hook (\"The down payment math nobody walked you through\")"],
               "Creative testing harness running. Algorithm starts identifying intent-creative winners."),
    initiative(2, "Short-form video production", "Video typically 3 to 5x static performance in mortgage on Meta",
               ["Two 30-second clips with Dom on camera, one per intent (refi, first-time-buyer)",
                "Add captions burned into the video file (80 percent of feed views are muted)",
                "Pair each video with a static counterpart so we measure the lift"],
               "Video assets running across cold and retargeting. Performance lift measurable."),
    initiative(3, "Retargeting flywheel reactivation", "Retargeting CPL drops from $7+ per LPV toward cold-cost parity",
               ["Build retargeting-specific creative variants (different from cold)",
                "Frequency cap at 2 per week",
                "Segment retargeting into Website Visitors 30-day vs. Engagers 90-day"],
               "Retargeting CPL profitable again. Funnel velocity increases."),
    KeepTogether([
        Paragraph(f"<font color='#2563EB'><b>{letter_spaced(f'Phase 3  {MIDDOT}  Days 61 to 90  {MIDDOT}  Full Scaling and Vertical Domination')}</b></font>", style_phase_header),
        Paragraph("<b>SPEND:</b> $3,600 to $5,400 CAD ($120 to $180 per day) -- 30 percent increments contingent on CPL targets", style_body),
    ]),
    initiative(1, "Lookalike expansion and audience layering", "Cold prospecting reach expands without sacrificing quality",
               ["Build 1 percent and 3 percent lookalikes from Dom's closed-loan customer list",
                "Test lookalike adsets against the broad-audience baseline",
                "Layer in Reels placement on top-performing creative"],
               "Cold pool 2 to 4x its current size. Reels CPM advantage captured."),
    initiative(2, "Value-based bidding test", "Optimizes for high-value leads, not just lead volume",
               ["Once 200+ purchase/qualified-lead events accumulated, enable value optimization",
                "Pass loan-amount or qualified-lead-tier values back via offline events",
                "Compare value-bidding cohort against standard Lead optimization"],
               "CPL stabilizes. Cost per qualified lead drops while cost per raw lead may rise (which is fine)."),
    initiative(3, "Creative refresh cadence locked in", "Prevents the same fatigue pattern from recurring on month four",
               ["Refresh top 25 percent of creatives every 4 weeks",
                "Auto-pause any ad with frequency 3+ on cold or 2+ on retargeting",
                "Build a creative backlog of 6 to 8 ready-to-ship variants"],
               "Creative testing system runs on its own. No more single-ad-everywhere risk."),
    section_break(),
]

# === SECTION 12 - EXPECTED OUTCOMES ========================================
story += [
    section_label("12", "90-Day Expected Outcomes"),
    directive("What we plan to be true on Day 90."),
]
outcomes = [
    "Special Ad Category declared. Account safe from compliance disable.",
    "Pixel, CAPI, and offline events reconcile. Conversion data trusted.",
    "Lead campaign exited learning phase. 50+ conversions per adset per week.",
    "Creative testing harness running with 3 variants per adset, including video.",
    "Retargeting CPL within 1.5x of cold CPL. Frequency under 3.",
    "Customer-list lookalikes live. Prospecting pool expanded 2 to 4x.",
    "Daily spend in $120 to $180 range, with stable CPL.",
    "Creative refresh cadence locked in. No single creative running more than 4 weeks.",
]
for o in outcomes:
    story.append(Paragraph(f'<font color="#16A34A"><b>&#10003;</b></font>&nbsp;&nbsp;{o}', style_check))
story.append(section_break())

# === CLOSING ===============================================================
story += [
    Spacer(1, 100),
    Paragraph(f"<para alignment='center'><font color='#2563EB' size='14'><b>CREEKSIDE MARKETING</b></font></para>",
              ParagraphStyle("CloseBrand", parent=ss["Normal"], spaceAfter=4)),
    Paragraph(f"<para alignment='center'><font color='#64748B' size='8'>{letter_spaced('Paid Media Intelligence')}</font></para>",
              ParagraphStyle("CloseSub", parent=ss["Normal"], spaceAfter=40)),
    Paragraph(f"<para alignment='center'><font color='#0F172A' size='14'><i>&ldquo;We grade what the system is doing. Then we fix it.&rdquo;</i></font></para>",
              ParagraphStyle("CloseQuote", parent=ss["Normal"], spaceAfter=30)),
    HRFlowable(width=CONTENT_W, thickness=1.5, color=BRAND_BLUE),
    Spacer(1, 12),
    Paragraph(f"<para alignment='center'><font color='#64748B' size='8'>Audit prepared by Creekside Marketing  {MIDDOT}  {AUDIT_DATE}  {MIDDOT}  {CLIENT_NAME} (Meta)</font></para>",
              ParagraphStyle("CloseMeta", parent=ss["Normal"])),
    Paragraph(f"<para alignment='center'><font color='#64748B' size='8'>Contact: ads@creeksidemarketingpros.com</font></para>",
              ParagraphStyle("CloseContact", parent=ss["Normal"])),
]

# ---- Build ----------------------------------------------------------------
doc = SimpleDocTemplate(
    str(OUT), pagesize=LETTER,
    leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=MARGIN,
    title=f"Meta Ads Audit -- {CLIENT_NAME}", author="Creekside Marketing",
)
doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=page_chrome)
print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
