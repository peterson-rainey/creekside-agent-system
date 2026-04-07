'use client';

import { useAudit, INDUSTRY_BENCHMARKS } from '@/lib/context/landing-page-audit-context';
import type { PriorityFix } from '@/lib/context/landing-page-audit-context';

function ScoreRing({ percentage, grade, gradeColor }: { percentage: number; grade: string; gradeColor: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center" style={{ width: 160, height: 160 }}>
      <svg width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--bg-tertiary)" strokeWidth="10" />
        <circle
          cx="80" cy="80" r={radius} fill="none"
          stroke={gradeColor} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color: gradeColor }}>{grade}</span>
        <span className="text-[var(--text-secondary)] text-sm">{percentage}/100</span>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors =
    priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
    priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
    priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
    'bg-gray-500/20 text-gray-400';

  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${colors}`}>
      {priority}
    </span>
  );
}

function EffortBadge({ effort }: { effort: string }) {
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
      {effort}
    </span>
  );
}

function FixCard({ fix }: { fix: PriorityFix }) {
  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <PriorityBadge priority={fix.priority} />
        <EffortBadge effort={fix.effortLevel} />
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">
          Expected lift: {fix.expectedLift}
        </span>
      </div>
      <p className="text-[var(--text-primary)] text-sm font-medium mb-2">{fix.question}</p>
      <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{fix.fix}</p>
    </div>
  );
}

function ImprovementSection({ title, fixes }: { title: string; fixes: PriorityFix[] }) {
  if (fixes.length === 0) return null;

  return (
    <div>
      <h4 className="text-[var(--text-primary)] text-sm font-semibold mb-3">{title}</h4>
      <div className="space-y-2">
        {fixes.map((fix, i) => (
          <div key={i} className="flex items-start gap-3 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <PriorityBadge priority={fix.priority} />
                <span className="text-[10px] text-[var(--text-muted)]">Lift: {fix.expectedLift}</span>
              </div>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{fix.question}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuditResultsPanel() {
  const { state, results } = useAudit();
  const benchmark = INDUSTRY_BENCHMARKS[state.industry];
  const answeredCount = Object.keys(state.answers).length;

  if (answeredCount === 0 || !results) {
    return (
      <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">
            Answer the checklist questions to see your audit report
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {/* Section 1: Overall Score */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
          <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4 text-center">Overall Score</h3>
          <div className="flex justify-center mb-4">
            <ScoreRing percentage={results.percentage} grade={results.grade} gradeColor={results.gradeColor} />
          </div>
          <div className="text-center space-y-1">
            <p className="text-[var(--text-secondary)] text-xs">
              {results.totalScore} out of {results.maxScore} points ({results.answeredCount} of {results.totalQuestions} questions answered)
            </p>
            <div className="bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg p-3 text-xs text-[var(--text-secondary)] mt-3">
              <span className="text-[var(--accent)] font-medium">{benchmark.label} Benchmark:</span>{' '}
              Median CR: {benchmark.medianCR} | Top 25%: {benchmark.topQuartileCR}
            </div>
          </div>
        </div>

        {/* Section 2: Category Breakdown */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
          <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {results.categories.map((cat) => {
              const barColor =
                cat.percentage >= 80 ? 'var(--success)' :
                cat.percentage >= 60 ? 'var(--warning)' :
                'var(--danger)';

              return (
                <div key={cat.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[var(--text-secondary)] text-xs">{cat.name}</span>
                    <span className="text-[var(--text-secondary)] text-xs font-medium">{cat.score}/{cat.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Fix These First */}
        {results.priorityFixes.length > 0 && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
            <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">Fix These First</h3>
            <p className="text-[var(--text-muted)] text-xs mb-4">
              The top {results.priorityFixes.length} changes that will have the biggest impact on your conversion rate.
            </p>
            <div className="space-y-3">
              {results.priorityFixes.map((fix, i) => (
                <FixCard key={i} fix={fix} />
              ))}
            </div>
          </div>
        )}

        {/* Section 4: What You're Doing Right */}
        {results.strengths.length > 0 && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
            <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">What You Are Doing Right</h3>
            <div className="space-y-2">
              {results.strengths.map((strength, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[var(--text-secondary)] text-xs">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: How to Improve Your Score */}
        {(results.quickWins.length > 0 || results.mediumEffort.length > 0 || results.biggerProjects.length > 0) && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
            <h3 className="text-[var(--text-primary)] text-sm font-semibold mb-4">How to Improve Your Score</h3>
            <div className="space-y-5">
              <ImprovementSection title="Quick Wins (5 to 15 minutes)" fixes={results.quickWins} />
              <ImprovementSection title="Medium Effort (1 to 4 hours)" fixes={results.mediumEffort} />
              <ImprovementSection title="Bigger Projects (1+ day)" fixes={results.biggerProjects} />
            </div>
          </div>
        )}

        {/* Section 6: CTA */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--accent)]/30 rounded-xl p-6 text-center">
          <h3 className="text-[var(--text-primary)] text-base font-semibold mb-2">
            Want a professional audit with screen-by-screen recommendations?
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            Book a free 15-minute review.
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            We will walk through your actual landing page and give you 3 specific changes to make this week.
          </p>
          <a
            href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:brightness-110 transition-all"
          >
            Book Your Free Audit
          </a>
        </div>
      </div>
    </div>
  );
}
