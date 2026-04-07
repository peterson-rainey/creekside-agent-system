'use client';

import { useState } from 'react';
import { useAudit, AUDIT_QUESTIONS, CATEGORY_NAMES, INDUSTRY_BENCHMARKS } from '@/lib/context/landing-page-audit-context';
import { SelectInput } from '@/components/ui/SelectInput';

// Inline TriStateToggle component
function TriStateToggle({ value, onChange }: { value: 'yes' | 'no' | 'not-sure' | undefined; onChange: (v: 'yes' | 'no' | 'not-sure') => void }) {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => onChange('yes')}
        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
          value === 'yes'
            ? 'bg-[var(--success)] text-white'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
      >
        Yes
      </button>
      <button
        onClick={() => onChange('no')}
        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
          value === 'no'
            ? 'bg-[var(--danger)] text-white'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
      >
        No
      </button>
      <button
        onClick={() => onChange('not-sure')}
        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
          value === 'not-sure'
            ? 'bg-[var(--warning)] text-white'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
      >
        Not Sure
      </button>
    </div>
  );
}

const industryOptions = Object.entries(INDUSTRY_BENCHMARKS).map(([value, bench]) => ({
  value,
  label: bench.label,
}));

export function AuditInputPanel() {
  const { state, dispatch, resetAll } = useAudit();
  const [collapsed, setCollapsed] = useState(false);
  const answeredCount = Object.keys(state.answers).length;

  return (
    <div className="w-full lg:w-[420px] shrink-0 bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border)] lg:h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <h2 className="text-[var(--text-primary)] text-lg font-semibold mb-1">
            Audit Checklist
          </h2>
          <p className="text-[var(--text-muted)] text-xs">
            Answer {AUDIT_QUESTIONS.length} questions to grade your landing page
          </p>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--accent)] bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg"
        >
          {collapsed ? 'Show' : 'Hide'}
          <svg className={`w-3.5 h-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className={`p-6 pt-4 space-y-5 transition-all overflow-hidden ${collapsed ? 'max-h-0 p-0 lg:max-h-none lg:p-6 lg:pt-4' : 'max-h-[5000px]'}`}>
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[var(--text-secondary)] text-xs">{answeredCount} of {AUDIT_QUESTIONS.length} answered</span>
            {answeredCount > 0 && (
              <button onClick={resetAll} className="text-xs text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors">
                Reset All
              </button>
            )}
          </div>
          <div className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / AUDIT_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Industry Selector */}
        <section>
          <SelectInput
            label="Your Industry"
            value={state.industry}
            onChange={(v) => dispatch({ type: 'SET_INDUSTRY', payload: v as any })}
            options={industryOptions}
          />
          <div className="bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg p-3 text-xs text-[var(--text-secondary)]">
            <span className="text-[var(--accent)] font-medium">Benchmark:</span>{' '}
            Median CR: {INDUSTRY_BENCHMARKS[state.industry].medianCR} | Top 25%: {INDUSTRY_BENCHMARKS[state.industry].topQuartileCR}
          </div>
        </section>

        {/* Landing Page URL (optional) */}
        <section>
          <label className="block text-[var(--text-secondary)] text-sm mb-1">
            Landing Page URL <span className="text-[var(--text-muted)] text-xs">(optional, for your reference)</span>
          </label>
          <input
            type="url"
            value={state.pageUrl}
            onChange={(e) => dispatch({ type: 'SET_PAGE_URL', payload: e.target.value })}
            placeholder="https://example.com/landing-page"
            className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
          />
        </section>

        {/* Questions by Category */}
        {CATEGORY_NAMES.map((catName) => {
          const catQuestions = AUDIT_QUESTIONS.filter((q) => q.category === catName);
          const catScore = catQuestions.reduce((sum, q) => {
            const answer = state.answers[q.id];
            if (answer === 'yes') return sum + q.maxPoints;
            if (answer === 'not-sure') return sum + Math.round(q.maxPoints * 0.4);
            return sum;
          }, 0);
          const catMax = catQuestions.reduce((sum, q) => sum + q.maxPoints, 0);

          return (
            <section key={catName}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[var(--text-primary)] text-sm font-semibold">{catName}</h3>
                <span className="text-[var(--accent)] text-xs font-medium">{catScore}/{catMax}</span>
              </div>
              <div className="space-y-2">
                {catQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-start justify-between gap-3 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{q.question}</p>
                      <span className={`text-[10px] font-medium mt-1 inline-block px-1.5 py-0.5 rounded ${
                        q.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                        q.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                        q.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {q.priority} ({q.maxPoints}pts)
                      </span>
                    </div>
                    <TriStateToggle
                      value={state.answers[q.id]}
                      onChange={(v) => dispatch({ type: 'SET_ANSWER', payload: { questionId: q.id, value: v } })}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
