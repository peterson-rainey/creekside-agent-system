"""
Client-facing comparison chart for the three pricing plans.
Clean, professional, white background for embedding in a proposal document.

Pricing structure (current as of 2026-05-15):
- Plan A: $1,500 min/platform, 20% to $30k / 15% to $60k / 10% above $60k, $15k cap
- Plan B: $3k flat base + 10% of total spend, $12k cap
- Plan C: $10k flat retainer, all platforms

Original by an external chat agent; updated for Creekside Marketing local environment
and to reflect verified 2026-05-15 pricing. Pairs with build_docx.py.
"""
import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
CHART_PATH = os.path.join(OUT_DIR, "out", "proposal_chart.png")
os.makedirs(os.path.dirname(CHART_PATH), exist_ok=True)


def plan_a_per_platform(spend):
    # Tiered fee: 20% up to $30k, 15% $30k-$60k, 10% above $60k
    # $1,500 minimum applies — fee never drops below $1,500 per platform
    if spend <= 30_000:
        fee = spend * 0.20
    elif spend <= 60_000:
        fee = 30_000 * 0.20 + (spend - 30_000) * 0.15
    else:
        fee = 30_000 * 0.20 + 30_000 * 0.15 + (spend - 60_000) * 0.10
    return max(fee, 1_500)


def plan_a(platform_spends):
    return min(sum(plan_a_per_platform(s) for s in platform_spends), 15_000)


def plan_b(total_spend):
    return min(3_000 + total_spend * 0.10, 12_000)


def plan_c():
    return 10_000


spend_range = np.linspace(500, 120_000, 10_000)

# Single platform
a1 = np.array([plan_a([s]) for s in spend_range])
b1 = np.array([plan_b(s) for s in spend_range])
c1 = np.full_like(spend_range, plan_c())

# Two platforms (50/50)
a2 = np.array([plan_a([s / 2, s / 2]) for s in spend_range])
b2 = np.array([plan_b(s) for s in spend_range])

# Colors
COL_A = "#1a56db"
COL_B = "#e3a008"
COL_C = "#057a55"
BG = "white"
GRID = "#e5e7eb"

fig, axes = plt.subplots(1, 2, figsize=(16, 7))
fig.patch.set_facecolor(BG)

for ax, title, a_fees, note in zip(
    axes,
    ["Single Platform", "Two Platforms (50/50 Split)"],
    [a1, a2],
    ["", "  Plan B base is the same\n  regardless of platform count"],
):
    ax.set_facecolor(BG)
    for spine in ax.spines.values():
        spine.set_edgecolor("#d1d5db")
        spine.set_linewidth(0.8)
    ax.tick_params(colors="#374151", labelsize=9)
    ax.xaxis.label.set_color("#374151")
    ax.yaxis.label.set_color("#374151")
    ax.title.set_color("#111827")

    ax.fill_between(spend_range, a_fees, b1, where=(a_fees > b1), alpha=0.06, color=COL_B)
    ax.fill_between(spend_range, a_fees, b1, where=(a_fees <= b1), alpha=0.06, color=COL_A)

    ax.plot(spend_range, a_fees, color=COL_A, lw=2.5,
            label="Plan A: Tiered % of Spend (capped 15k)")
    ax.plot(spend_range, b1, color=COL_B, lw=2.5, linestyle="--",
            label="Plan B: 3k Base + 10% of Spend (capped 12k)")
    ax.plot(spend_range, c1, color=COL_C, lw=2.5, linestyle="-.",
            label="Plan C: 10k Flat Retainer")

    # A = B at $30,000 (0.20*s = 3000 + 0.10*s)
    ax.scatter([30_000], [6_000], color="#374151", s=70, zorder=15, marker="o")
    ax.annotate("A = B\n$30,000",
                xy=(30_000, 6_000), xytext=(33_000, 4_600),
                color="#374151", fontsize=8,
                arrowprops=dict(arrowstyle="-", color="#9ca3af", lw=0.8),
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                          edgecolor="#d1d5db", alpha=0.95))

    # B = C at $70,000 (3000 + 0.10*70000 = 10000)
    ax.scatter([70_000], [10_000], color="#374151", s=70, zorder=15, marker="o")
    ax.annotate("B = C\n$70,000",
                xy=(70_000, 10_000), xytext=(73_000, 8_600),
                color="#374151", fontsize=8,
                arrowprops=dict(arrowstyle="-", color="#9ca3af", lw=0.8),
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                          edgecolor="#d1d5db", alpha=0.95))

    # A = C: single platform ~$57k; two platforms at $50k combined ($25k each)
    ac_spend = 57_000 if title == "Single Platform" else 50_000
    ax.scatter([ac_spend], [10_000], color="#374151", s=70, zorder=15, marker="o")
    ax.annotate(f"A = C\n${ac_spend // 1000:,}k",
                xy=(ac_spend, 10_000), xytext=(ac_spend - 18_000, 10_600),
                color="#374151", fontsize=8,
                arrowprops=dict(arrowstyle="-", color="#9ca3af", lw=0.8),
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white",
                          edgecolor="#d1d5db", alpha=0.95))

    ax.set_title(title, fontsize=12, fontweight="bold", pad=12, color="#111827")
    ax.set_xlabel("Monthly Ad Spend", fontsize=10)
    ax.set_ylabel("Monthly Agency Fee", fontsize=10)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"${x / 1000:.0f}k"))
    ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"${x:,.0f}"))
    ax.legend(facecolor="white", edgecolor="#d1d5db", labelcolor="#111827",
              fontsize=9, loc="upper left", framealpha=1.0)
    ax.grid(axis="y", color=GRID, linestyle="-", linewidth=0.7)
    ax.grid(axis="x", color=GRID, linestyle="-", linewidth=0.4)
    ax.set_xlim(0, 120_000)
    ax.set_ylim(0, 17_000)

    if note:
        ax.text(0.98, 0.08, note, transform=ax.transAxes,
                fontsize=7.5, color="#6b7280", ha="right",
                bbox=dict(boxstyle="round,pad=0.3", facecolor="#f9fafb",
                          edgecolor="#e5e7eb", alpha=0.9))

plt.suptitle("Agency Fee Comparison — Which Plan Works Best for You?",
             fontsize=13, fontweight="bold", color="#111827", y=1.02)
plt.tight_layout(pad=2.5)
plt.savefig(CHART_PATH, dpi=180, bbox_inches="tight", facecolor=BG)
plt.close()
print(f"Chart saved: {CHART_PATH}")
