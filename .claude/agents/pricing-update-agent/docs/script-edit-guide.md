# Script Edit Guide -- Exact Line Patterns to Update

This file contains the exact code patterns to find and replace in each proposal script during Step 3. Use these as search anchors to guarantee you update the right lines.

---

## proposal_chart.py

### fee_per_platform() function

Find this block (exact structure):
```python
def fee_per_platform(spend):
    # Tiered fee: 20% up to $30k, 15% $30k-$60k, 10% above $60k
    # $1,500 minimum applies -- fee never drops below $1,500 per platform
    if spend <= 30_000:
        fee = spend * 0.20
    elif spend <= 60_000:
        fee = 30_000 * 0.20 + (spend - 30_000) * 0.15
    else:
        fee = 30_000 * 0.20 + 30_000 * 0.15 + (spend - 60_000) * 0.10
    return max(fee, 1_500)
```

Replace with the new breakpoints, rates, and minimum. The comment on the first line should also be updated to reflect the new values.

### management_fee() function

Find:
```python
def management_fee(platform_spends):
    return min(sum(fee_per_platform(s) for s in platform_spends), 15_000)
```

Replace `15_000` with the new cap value.

### Cap line label

Find:
```python
ax.text(2_000, 15_300, "$15,000 monthly cap", fontsize=9, color=CAP_COLOR,
```

Update both the y-position (cap + 300 as a label offset) and the text string.

### Cap line position

Find:
```python
ax.axhline(y=15_000, color=CAP_COLOR, lw=1.5, linestyle=":", alpha=0.7)
```

Replace `15_000` with new cap.

### Minimum line label

Find:
```python
ax.text(2_000, 1_700, "$1,500 minimum per platform", fontsize=8, color="#6b7280")
```

Update the y-position (minimum + 200 offset) and the text string.

### Minimum line position

Find:
```python
ax.axhline(y=1_500, color="#9ca3af", lw=1, linestyle=":", alpha=0.5)
```

Replace `1_500` with new minimum.

### Tier breakpoint annotation 1 (20% -> 15% at $30K)

Find this block:
```python
ax.scatter([30_000], [fees_1p[np.searchsorted(spend_range, 30_000)]], color="#374151",
           s=50, zorder=15, marker="o")
ax.annotate("20% \u2192 15%\n$30k/platform",
            xy=(30_000, 6_000), xytext=(36_000, 4_500),
```

Update `30_000` occurrences to breakpoint1. Update the annotation text to show the new rates and breakpoint label. Adjust `xy` and `xytext` y-coordinates based on what fee_per_platform(breakpoint1) returns at new rates.

### Tier breakpoint annotation 2 (15% -> 10% at $60K)

Find this block:
```python
ax.scatter([60_000], [fees_1p[np.searchsorted(spend_range, 60_000)]], color="#374151",
           s=50, zorder=15, marker="o")
ax.annotate("15% \u2192 10%\n$60k/platform",
            xy=(60_000, 10_500), xytext=(66_000, 8_800),
```

Update `60_000` to breakpoint2. Update annotation text. Adjust y-coordinates.

### y-axis limit

Find:
```python
ax.set_ylim(0, 17_000)
```

Replace `17_000` with `cap + 2000` (e.g., if cap=$18K, use 20_000).

### x-axis limit

The `ax.set_xlim(0, 120_000)` should remain unless the new breakpoint2 is greater than $80K, in which case extend to `breakpoint2 * 2`.

### Module docstring

Update the docstring at the top of the file to reflect new values and the current date.

---

## build_docx.py

### ROWS array

Find:
```python
ROWS = [
    ["Onboarding Fee (one-time)", "$1,500 per platform"],
    ["Monthly Management Fee",
     "$1,500 minimum per platform\n(applies until ad spend exceeds $7,500/mo)"],
    ["Variable Rate",
     "20% up to $30k spend\n15% from $30k-$60k\n10% over $60k\n(Calculated per platform)"],
    ["Monthly Cap", "$15,000 / month"],
]
```

Replace with new values. The minimum threshold in row 2 must be recalculated: `minimum / rate1`. Tier breakpoints in row 3 must match the new breakpoints in $k notation (e.g., `$30k` means breakpoint1=$30,000).

### Cap reference in "Fee Scaling" body text

Find:
```python
"the tier breakpoints where the percentage decreases and the $15,000 monthly cap."
```

Update the cap value.

### Module docstring

Update the top-of-file comment to reflect the current date and new pricing.

---

## build_lead_docx.py

### DEFAULT_PRICING dict

Find:
```python
# Current pricing (2026-05-25) -- matches pricing-logic.md and build_docx.py
# Simplified from 3-plan structure: Plan B Shared and Plan C Retainer removed.
DEFAULT_PRICING = {
    "onboarding_fee": "$1,500 per platform (one-time)",
    "monthly_min": "$1,500 minimum per platform",
    "variable_rate_desc": (
        "20% of ad spend up to $30,000/month\n"
        "15% from $30,000 to $60,000\n"
        "10% above $60,000\n"
        "(Calculated per platform; $1,500 minimum applies until spend exceeds $7,500/mo)"
    ),
    "monthly_cap": "$15,000 / month",
    "plan_label": "Creekside Management Fee",
}
```

Replace all dollar values and percentages with the new values. Update the date in the comment. The threshold in the parenthetical `(Calculated per platform; $X,XXX minimum applies until spend exceeds $X,XXX/mo)` must be recalculated: `minimum / rate1`.

---

## build_slides.py

### Slide 1 rows (pricing card body content)

Find:
```python
rows = [
    ("VARIABLE FEE", "20% up to $30k\n15% from $30k-$60k\n10% above $60k"),
    ("MINIMUM FEE", "$1,500 per platform"),
    ("MONTHLY CAP", "$15,000 maximum"),
    ("ONBOARDING", "$1,500 per platform"),
]
```

Replace with new values. Tier breakpoints in `$Xk` notation. Minimum, cap, and onboarding as dollar amounts.

### Slide 1 footer text

Find:
```python
add_text(slide1, Inches(0.7), footer_top, Inches(11.9), Inches(0.6),
         "The $1,500 minimum fee per platform acts as a floor, covering your first "
         "$7,500 in ad spend. Once you spend over $7,500, the 20% rate naturally takes over.",
         size=11, color=GRAY_TEXT, align=PP_ALIGN.CENTER)
```

Update both dollar amounts. The `$7,500` is the threshold (minimum/rate1). The `$1,500` is the minimum. The `20%` is rate1.

### Slide 2 commentary text

Find:
```python
add_text(slide2, Inches(1.0), commentary_top,
         Inches(11.3), Inches(0.9),
         "Your management fee scales with your ad spend. The percentage drops "
         "at $30,000 and again at $60,000 per platform. The $15,000 monthly cap "
         "means your costs are predictable even as you grow.",
         size=13, color=DARK_TEXT, align=PP_ALIGN.CENTER)
```

Update `$30,000`, `$60,000`, and `$15,000` to new breakpoints and cap.

### Module docstring

Update the top-of-file comment with current date and new pricing.

---

## Common Pitfalls

1. **Minimum threshold in two places**: It appears in both `build_docx.py` row 2 and `build_lead_docx.py` `variable_rate_desc`. Both must be updated to `min/rate1`. Mismatches between these two will cause the docx and lead docx to show different thresholds.

2. **Annotation y-coordinates**: After changing breakpoints, the `xy` annotation points in `proposal_chart.py` may be off. The y-coordinate of `xy` should roughly equal `fee_per_platform(breakpoint_value)` at the new rates. Calculate mentally:
   - At breakpoint1: fee = breakpoint1 * rate1 (e.g., $30K * 0.20 = $6,000)
   - At breakpoint2: fee = breakpoint1 * rate1 + (breakpoint2 - breakpoint1) * rate2 (e.g., $6K + $30K * 0.15 = $10,500)
   Adjust `xy` to match the actual fee at the breakpoint, not a hardcoded value.

3. **Slide 2 chart display**: The chart embedded in slides is generated by `proposal_chart.py`. If the chart script ran first (Step 4a), the chart embedded in the slide deck will already use the new values. No need to regenerate the chart separately for slides.

4. **Slide footer threshold**: The footer text says "Once you spend over $7,500, the 20% rate naturally takes over." If rate1 changes (e.g., from 20% to 18%), update the percentage in the footer text, not just the threshold dollar amount.

5. **$k vs $K vs $K,000**: The scripts use mixed notation. Use exactly what already exists in each file. Do not standardize notation -- keep it consistent with the surrounding file.
