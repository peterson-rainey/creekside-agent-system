"""
Client-facing chart showing how the management fee scales with ad spend.
Clean, professional, white background for embedding in a proposal document.

Pricing structure (current as of 2026-05-25):
- Single plan: $1,500 min/platform, 20% to $30k / 15% to $60k / 10% above $60k, $15k cap

Simplified from 3-plan structure on 2026-05-25 (Plan B Shared and Plan C Retainer removed).
Pairs with build_docx.py.
"""
import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
CHART_PATH = os.path.join(OUT_DIR, "out", "proposal_chart.png")
os.makedirs(os.path.dirname(CHART_PATH), exist_ok=True)


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


def management_fee(platform_spends):
    return min(sum(fee_per_platform(s) for s in platform_spends), 15_000)


spend_range = np.linspace(500, 120_000, 10_000)

# Single platform
fees_1p = np.array([management_fee([s]) for s in spend_range])

# Two platforms (50/50)
fees_2p = np.array([management_fee([s / 2, s / 2]) for s in spend_range])

# Colors
COL_1P = "#1a56db"
COL_2P = "#e3a008"
BG = "white"
GRID = "#e5e7eb"
CAP_COLOR = "#dc2626"

fig, ax = plt.subplots(1, 1, figsize=(10, 7))
fig.patch.set_facecolor(BG)
ax.set_facecolor(BG)
for spine in ax.spines.values():
    spine.set_edgecolor("#d1d5db")
    spine.set_linewidth(0.8)
ax.tick_params(colors="#374151", labelsize=9)
ax.xaxis.label.set_color("#374151")
ax.yaxis.label.set_color("#374151")
ax.title.set_color("#111827")

# Fee curves
ax.plot(spend_range, fees_1p, color=COL_1P, lw=2.5,
        label="Single Platform")
ax.plot(spend_range, fees_2p, color=COL_2P, lw=2.5, linestyle="--",
        label="Two Platforms (50/50 Split)")

# $15K cap line
ax.axhline(y=15_000, color=CAP_COLOR, lw=1.5, linestyle=":", alpha=0.7)
ax.text(2_000, 15_300, "$15,000 monthly cap", fontsize=9, color=CAP_COLOR,
        fontweight="bold")

# $1,500 minimum zone annotation
ax.axhline(y=1_500, color="#9ca3af", lw=1, linestyle=":", alpha=0.5)
ax.text(2_000, 1_700, "$1,500 minimum per platform", fontsize=8, color="#6b7280")

# Tier breakpoint annotations
# 20% -> 15% at $30K
ax.scatter([30_000], [fees_1p[np.searchsorted(spend_range, 30_000)]], color="#374151",
           s=50, zorder=15, marker="o")
ax.annotate("20% \u2192 15%\n$30k/platform",
            xy=(30_000, 6_000), xytext=(36_000, 4_500),
            color="#374151", fontsize=8,
            arrowprops=dict(arrowstyle="-", color="#9ca3af", lw=0.8),
            bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                      edgecolor="#d1d5db", alpha=0.95))

# 15% -> 10% at $60K
ax.scatter([60_000], [fees_1p[np.searchsorted(spend_range, 60_000)]], color="#374151",
           s=50, zorder=15, marker="o")
ax.annotate("15% \u2192 10%\n$60k/platform",
            xy=(60_000, 10_500), xytext=(66_000, 8_800),
            color="#374151", fontsize=8,
            arrowprops=dict(arrowstyle="-", color="#9ca3af", lw=0.8),
            bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                      edgecolor="#d1d5db", alpha=0.95))

ax.set_title("Monthly Management Fee by Ad Spend", fontsize=14, fontweight="bold",
             pad=12, color="#111827")
ax.set_xlabel("Monthly Ad Spend", fontsize=10)
ax.set_ylabel("Monthly Management Fee", fontsize=10)
ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"${x / 1000:.0f}k"))
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"${x:,.0f}"))
ax.legend(facecolor="white", edgecolor="#d1d5db", labelcolor="#111827",
          fontsize=9, loc="upper left", framealpha=1.0)
ax.grid(axis="y", color=GRID, linestyle="-", linewidth=0.7)
ax.grid(axis="x", color=GRID, linestyle="-", linewidth=0.4)
ax.set_xlim(0, 120_000)
ax.set_ylim(0, 17_000)

plt.tight_layout(pad=2.5)
plt.savefig(CHART_PATH, dpi=180, bbox_inches="tight", facecolor=BG)
plt.close()
print(f"Chart saved: {CHART_PATH}")
