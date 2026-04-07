'use client';

import { useAgencyPicker, type OptionType } from '@/lib/context/agency-picker-context';
import { KpiCard } from '@/components/ui/KpiCard';

/* ─────────────────────────── Helpers ─────────────────────────── */

const OPTION_LABELS: Record<OptionType, string> = {
  agency: 'Agency',
  freelancer: 'Freelancer',
  'in-house': 'In-House',
};

const OPTION_ICONS: Record<OptionType, string> = {
  agency: '\u{1F3E2}',
  freelancer: '\u{1F9D1}\u200D\u{1F4BB}',
  'in-house': '\u{1F3E0}',
};

const CONFIDENCE_TREND: Record<string, 'up' | 'neutral'> = {
  'Strong Match': 'up',
  'Good Fit': 'up',
  'Consider Both': 'neutral',
};

/* ─────────────────────────── Component ─────────────────────────── */

export function AgencyPickerResultsPanel() {
  const { results } = useAgencyPicker();
  const {
    scores,
    percentages,
    winner,
    runnerUp,
    confidence,
    budgetReality,
    redFlags,
    vettingQuestions,
    pros,
    cons,
    expectedCost,
    managementTime,
  } = results;

  const options: OptionType[] = ['agency', 'freelancer', 'in-house'];
  const maxScore = Math.max(...Object.values(scores));

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
        <div>
          <h2 className="text-[var(--text-primary)] text-lg font-semibold">
            Your Recommendation
          </h2>
          <p className="text-[var(--text-muted)] text-xs mt-1">
            Based on your answers, here is what we recommend
          </p>
        </div>
        <a
          href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:brightness-110 transition-all"
        >
          Get a Custom Plan
        </a>
      </div>

      <div className="p-6 space-y-8">

      {/* ─── Section 1: KPI Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Best Match"
          value={`${OPTION_ICONS[winner]} ${OPTION_LABELS[winner]}`}
          subtitle={`${percentages[winner]}% match score`}
        />
        <KpiCard
          label="Confidence"
          value={confidence}
          trend={CONFIDENCE_TREND[confidence]}
          subtitle={winner === runnerUp ? undefined : `Runner-up: ${OPTION_LABELS[runnerUp]}`}
        />
        <KpiCard
          label="Expected Monthly Cost"
          value={expectedCost[winner]}
          subtitle={`For ${OPTION_LABELS[winner].toLowerCase()}`}
        />
        <KpiCard
          label="Management Time"
          value={managementTime[winner]}
          subtitle="Your weekly time commitment"
        />
      </div>

      {/* ─── Section 2: Score Comparison Bars ─── */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">
          Score Comparison
        </h3>
        <div className="space-y-3">
          {options.map((opt) => {
            const pct = maxScore > 0 ? Math.round((scores[opt] / maxScore) * 100) : 0;
            const isWinner = opt === winner;
            return (
              <div key={opt} className="flex items-center gap-3">
                <span className="text-[var(--text-secondary)] text-sm w-24 shrink-0">
                  {OPTION_LABELS[opt]}
                </span>
                <div className="flex-1 bg-[var(--bg-tertiary)] rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max(pct, 8)}%`,
                      backgroundColor: isWinner ? 'var(--accent)' : 'var(--border)',
                    }}
                  >
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {percentages[opt]}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Section 3: Side-by-Side Comparison ─── */}
      <div>
        <h3 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">
          Side-by-Side Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt) => {
            const isWinner = opt === winner;
            return (
              <div
                key={opt}
                className={`bg-[var(--bg-secondary)] border rounded-xl p-4 ${
                  isWinner
                    ? 'border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]'
                    : 'border-[var(--border)]'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[var(--text-primary)] font-semibold">
                    {OPTION_ICONS[opt]} {OPTION_LABELS[opt]}
                  </h4>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isWinner
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {percentages[opt]}%
                  </span>
                </div>

                {/* Cost */}
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">
                  Expected Cost
                </p>
                <p className="text-[var(--text-primary)] text-sm font-medium mb-3">
                  {expectedCost[opt]}
                </p>

                {/* Pros */}
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">
                  Pros
                </p>
                <ul className="space-y-1 mb-3">
                  {pros[opt].slice(0, 5).map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-[var(--success)] mt-0.5 shrink-0">+</span>
                      <span className="text-[var(--text-secondary)]">{pro}</span>
                    </li>
                  ))}
                </ul>

                {/* Cons */}
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">
                  Cons
                </p>
                <ul className="space-y-1">
                  {cons[opt].slice(0, 5).map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-[var(--warning)] mt-0.5 shrink-0">-</span>
                      <span className="text-[var(--text-secondary)]">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Section 4: Budget Reality Check ─── */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">
          Budget Reality Check
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Freelancer column */}
          <div>
            <p className="text-[var(--text-primary)] font-medium text-sm mb-1">
              Freelancer Range
            </p>
            <p className="text-[var(--accent)] font-semibold mb-3">
              {budgetReality.freelancerRange}
            </p>
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
              Hidden Costs
            </p>
            <ul className="space-y-1">
              {budgetReality.hiddenCostsFreelancer.map((cost, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-[var(--warning)] mt-0.5 shrink-0">!</span>
                  <span className="text-[var(--text-secondary)]">{cost}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Agency column */}
          <div>
            <p className="text-[var(--text-primary)] font-medium text-sm mb-1">
              Agency Range
            </p>
            <p className="text-[var(--accent)] font-semibold mb-3">
              {budgetReality.agencyRange}
            </p>
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
              Hidden Costs
            </p>
            <ul className="space-y-1">
              {budgetReality.hiddenCostsAgency.map((cost, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-[var(--warning)] mt-0.5 shrink-0">!</span>
                  <span className="text-[var(--text-secondary)]">{cost}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Section 5: Red Flags ─── */}
      {redFlags.length > 0 && (
        <div>
          <h3 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">
            Red Flags to Watch
          </h3>
          <div className="space-y-3">
            {redFlags.map((flag, i) => (
              <div
                key={i}
                className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: i === 0 ? 'var(--danger)' : 'var(--warning)' }}
              >
                <p className="text-[var(--text-secondary)] text-sm">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Section 6: Vetting Questions ─── */}
      {vettingQuestions.length > 0 && (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
          <h3 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">
            Questions to Ask Your {OPTION_LABELS[winner]}
          </h3>
          <div className="space-y-4">
            {vettingQuestions.map((vq, i) => (
              <div key={i}>
                <p className="text-[var(--text-primary)] text-sm font-medium mb-1">
                  {i + 1}. {vq.question}
                </p>
                <p className="text-[var(--text-muted)] text-xs pl-4">
                  Why this matters: {vq.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Section 7: CTA ─── */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--accent)] rounded-xl p-6 text-center">
        <p className="text-[var(--text-primary)] font-semibold text-lg mb-2">
          Not sure which is right?
        </p>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Get a free consultation with a PPC specialist who will give you an honest recommendation, even if it is not us.
        </p>
        <a
          href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-shadow hover:shadow-[0_0_20px_var(--accent-glow)]"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Book a Free Consultation
        </a>
      </div>

      </div>
    </div>
  );
}
