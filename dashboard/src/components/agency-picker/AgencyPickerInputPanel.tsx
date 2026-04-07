'use client';

import { useState } from 'react';
import { useAgencyPicker, BUDGET_HINTS, CHANNEL_HINTS, INDUSTRY_HINTS } from '@/lib/context/agency-picker-context';
import { SelectInput } from '@/components/ui/SelectInput';
import { ToggleGroup } from '@/components/ui/ToggleGroup';

const budgetOptions = [
  { value: 'under-1k', label: 'Under $1,000/mo' },
  { value: '1k-3k', label: '$1,000 - $3,000/mo' },
  { value: '3k-10k', label: '$3,000 - $10,000/mo' },
  { value: '10k-30k', label: '$10,000 - $30,000/mo' },
  { value: '30k-plus', label: '$30,000+/mo' },
];

const channelOptions = [
  { value: '1', label: '1 channel (e.g. Google Ads only)' },
  { value: '2', label: '2 channels (e.g. Google + Meta)' },
  { value: '3-plus', label: '3+ channels (full mix)' },
];

const timelineOptions = [
  { value: 'no-rush', label: 'No rush (3-6 months)' },
  { value: 'moderate', label: 'Moderate (1-3 months)' },
  { value: 'urgent', label: 'Urgent (under 1 month)' },
];

const industryOptions = [
  { value: 'general', label: 'General B2B/B2C' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'regulated', label: 'Healthcare / Legal / Finance (regulated)' },
  { value: 'local-service', label: 'Local Service Business' },
  { value: 'saas', label: 'SaaS / Tech' },
];

const experienceOptions = [
  { value: 'never', label: 'Never hired for marketing' },
  { value: 'bad-agency', label: 'Bad experience with agency' },
  { value: 'bad-freelancer', label: 'Bad experience with freelancer' },
  { value: 'good-either', label: 'Good experience with either' },
];

export function AgencyPickerInputPanel() {
  const { state, dispatch } = useAgencyPicker();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full lg:w-[380px] shrink-0 bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border)] lg:h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <h2 className="text-[var(--text-primary)] text-lg font-semibold mb-1">
            Your Situation
          </h2>
          <p className="text-[var(--text-muted)] text-xs">
            Answer 8 quick questions to get a personalized recommendation
          </p>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--accent)] bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg"
        >
          {collapsed ? 'Show' : 'Hide'}
          <svg
            className={`w-3.5 h-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div
        className={`p-6 pt-4 space-y-5 transition-all overflow-hidden ${
          collapsed ? 'max-h-0 p-0 lg:max-h-none lg:p-6 lg:pt-4' : 'max-h-[2000px]'
        }`}
      >
        {/* 1. Monthly Marketing Budget */}
        <section>
          <SelectInput
            label="Monthly Marketing Budget"
            value={state.budget}
            onChange={(v) => dispatch({ type: 'SET_BUDGET', payload: v as typeof state.budget })}
            options={budgetOptions}
          />
          <div className="bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg p-3 text-xs text-[var(--text-secondary)] -mt-1">
            <span className="text-[var(--accent)] font-medium">Insight:</span>{' '}
            {BUDGET_HINTS[state.budget]}
          </div>
        </section>

        {/* 2. Number of Channels */}
        <section>
          <SelectInput
            label="Marketing Channels Needed"
            value={state.channels}
            onChange={(v) => dispatch({ type: 'SET_CHANNELS', payload: v as typeof state.channels })}
            options={channelOptions}
          />
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-3 text-xs text-[var(--text-muted)] -mt-1">
            {CHANNEL_HINTS[state.channels]}
          </div>
        </section>

        {/* 3. Project Type */}
        <section>
          <label className="block text-[var(--text-secondary)] text-sm mb-1">Project Type</label>
          <ToggleGroup
            options={[
              { value: 'ongoing', label: 'Ongoing Campaigns' },
              { value: 'one-time', label: 'One-Time Project' },
            ]}
            value={state.projectType}
            onChange={(v) => dispatch({ type: 'SET_PROJECT_TYPE', payload: v as typeof state.projectType })}
          />
        </section>

        {/* 4. Timeline */}
        <section>
          <SelectInput
            label="Timeline"
            value={state.timeline}
            onChange={(v) => dispatch({ type: 'SET_TIMELINE', payload: v as typeof state.timeline })}
            options={timelineOptions}
          />
        </section>

        {/* 5. Internal Team */}
        <section>
          <label className="block text-[var(--text-secondary)] text-sm mb-1">Internal Marketing Team</label>
          <ToggleGroup
            options={[
              { value: 'have-team', label: 'Have Internal Team' },
              { value: 'no-team', label: 'No Internal Team' },
            ]}
            value={state.internalTeam}
            onChange={(v) => dispatch({ type: 'SET_INTERNAL_TEAM', payload: v as typeof state.internalTeam })}
          />
        </section>

        {/* 6. Industry */}
        <section>
          <SelectInput
            label="Industry"
            value={state.industry}
            onChange={(v) => dispatch({ type: 'SET_INDUSTRY', payload: v as typeof state.industry })}
            options={industryOptions}
          />
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-3 text-xs text-[var(--text-muted)] -mt-1">
            {INDUSTRY_HINTS[state.industry]}
          </div>
        </section>

        {/* 7. Level of Involvement */}
        <section>
          <label className="block text-[var(--text-secondary)] text-sm mb-1">Level of Involvement</label>
          <ToggleGroup
            options={[
              { value: 'hands-off', label: 'Hands-Off' },
              { value: 'hands-on', label: 'Hands-On' },
            ]}
            value={state.involvement}
            onChange={(v) => dispatch({ type: 'SET_INVOLVEMENT', payload: v as typeof state.involvement })}
          />
          <p className="text-[var(--text-muted)] text-xs -mt-1">
            {state.involvement === 'hands-off'
              ? 'You want to delegate and see results'
              : 'You want to collaborate and stay involved'}
          </p>
        </section>

        {/* 8. Past Experience */}
        <section>
          <SelectInput
            label="Past Marketing Experience"
            value={state.pastExperience}
            onChange={(v) => dispatch({ type: 'SET_PAST_EXPERIENCE', payload: v as typeof state.pastExperience })}
            options={experienceOptions}
          />
        </section>
      </div>
    </div>
  );
}
