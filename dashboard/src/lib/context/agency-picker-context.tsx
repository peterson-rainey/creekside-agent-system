'use client';

import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';

/* ─────────────────────────── Types ─────────────────────────── */

export type BudgetRange = 'under-1k' | '1k-3k' | '3k-10k' | '10k-30k' | '30k-plus';
export type ChannelCount = '1' | '2' | '3-plus';
export type ProjectType = 'ongoing' | 'one-time';
export type Timeline = 'no-rush' | 'moderate' | 'urgent';
export type InternalTeam = 'have-team' | 'no-team';
export type Industry = 'general' | 'ecommerce' | 'regulated' | 'local-service' | 'saas';
export type Involvement = 'hands-off' | 'hands-on';
export type PastExperience = 'never' | 'bad-agency' | 'bad-freelancer' | 'good-either';

export type OptionType = 'agency' | 'freelancer' | 'in-house';
export type ConfidenceLevel = 'Strong Match' | 'Good Fit' | 'Consider Both';

export interface AgencyPickerState {
  budget: BudgetRange;
  channels: ChannelCount;
  projectType: ProjectType;
  timeline: Timeline;
  internalTeam: InternalTeam;
  industry: Industry;
  involvement: Involvement;
  pastExperience: PastExperience;
}

export type AgencyPickerAction =
  | { type: 'SET_BUDGET'; payload: BudgetRange }
  | { type: 'SET_CHANNELS'; payload: ChannelCount }
  | { type: 'SET_PROJECT_TYPE'; payload: ProjectType }
  | { type: 'SET_TIMELINE'; payload: Timeline }
  | { type: 'SET_INTERNAL_TEAM'; payload: InternalTeam }
  | { type: 'SET_INDUSTRY'; payload: Industry }
  | { type: 'SET_INVOLVEMENT'; payload: Involvement }
  | { type: 'SET_PAST_EXPERIENCE'; payload: PastExperience };

export interface AgencyPickerResults {
  scores: Record<OptionType, number>;
  percentages: Record<OptionType, number>;
  winner: OptionType;
  runnerUp: OptionType;
  confidence: ConfidenceLevel;
  budgetReality: {
    freelancerRange: string;
    agencyRange: string;
    hiddenCostsFreelancer: string[];
    hiddenCostsAgency: string[];
  };
  redFlags: string[];
  vettingQuestions: { question: string; why: string }[];
  pros: Record<OptionType, string[]>;
  cons: Record<OptionType, string[]>;
  expectedCost: Record<OptionType, string>;
  managementTime: Record<OptionType, string>;
}

/* ─────────────────────────── Contextual Hints ─────────────────────────── */

export const BUDGET_HINTS: Record<BudgetRange, string> = {
  'under-1k': 'At this budget, a specialist freelancer is your best bet. Most agencies have minimums of $1,500-$3,000/mo.',
  '1k-3k': 'This is the freelancer sweet spot. Some boutique agencies will work here but you may get junior staff.',
  '3k-10k': 'The crossover zone. Either a freelancer or boutique agency can work well depending on your needs.',
  '10k-30k': 'Boutique to mid-size agency territory. Freelancers can struggle to manage this volume across channels.',
  '30k-plus': 'At this spend level, you need an agency with enterprise processes, reporting, and bench depth.',
};

export const CHANNEL_HINTS: Record<ChannelCount, string> = {
  '1': 'A single channel is easy for one specialist to own. You get deep expertise without coordination overhead.',
  '2': 'Two channels can work with either option. Look for cross-channel experience so strategy stays aligned.',
  '3-plus': 'Multiple channels need coordination, unified reporting, and strategic oversight. Agencies handle this natively.',
};

export const INDUSTRY_HINTS: Record<Industry, string> = {
  general: 'General industries have the most options. Focus on finding the right cultural fit and communication style.',
  ecommerce: 'E-commerce thrives on specialists who understand ROAS, feed optimization, and shopping campaigns.',
  regulated: 'Regulated industries (healthcare, finance, legal) need compliance experience. Mistakes can mean fines or ad disapprovals.',
  'local-service': 'Local services benefit from someone who understands geo-targeting, Google Business Profile, and local SEO.',
  saas: 'SaaS marketing needs long funnel thinking, attribution modeling, and patience with longer sales cycles.',
};

/* ─────────────────────────── Scoring Tables ─────────────────────────── */

type ScoreRow = Record<OptionType, number>;

const WEIGHTS = {
  budget: 0.25,
  channels: 0.20,
  internalTeam: 0.15,
  projectType: 0.10,
  timeline: 0.10,
  industry: 0.10,
  involvement: 0.05,
  pastExperience: 0.05,
} as const;

const BUDGET_SCORES: Record<BudgetRange, ScoreRow> = {
  'under-1k':  { freelancer: 9, agency: 1, 'in-house': 5 },
  '1k-3k':     { freelancer: 8, agency: 3, 'in-house': 4 },
  '3k-10k':    { freelancer: 6, agency: 7, 'in-house': 3 },
  '10k-30k':   { freelancer: 3, agency: 9, 'in-house': 2 },
  '30k-plus':  { freelancer: 1, agency: 10, 'in-house': 1 },
};

const CHANNEL_SCORES: Record<ChannelCount, ScoreRow> = {
  '1':      { freelancer: 9, agency: 3, 'in-house': 6 },
  '2':      { freelancer: 6, agency: 6, 'in-house': 4 },
  '3-plus': { freelancer: 2, agency: 9, 'in-house': 2 },
};

const INTERNAL_TEAM_SCORES: Record<InternalTeam, ScoreRow> = {
  'have-team': { freelancer: 8, agency: 4, 'in-house': 7 },
  'no-team':   { freelancer: 3, agency: 9, 'in-house': 1 },
};

const PROJECT_TYPE_SCORES: Record<ProjectType, ScoreRow> = {
  ongoing:  { freelancer: 4, agency: 8, 'in-house': 5 },
  'one-time': { freelancer: 8, agency: 3, 'in-house': 4 },
};

const TIMELINE_SCORES: Record<Timeline, ScoreRow> = {
  'no-rush':  { freelancer: 7, agency: 5, 'in-house': 6 },
  moderate:   { freelancer: 5, agency: 7, 'in-house': 4 },
  urgent:     { freelancer: 3, agency: 9, 'in-house': 2 },
};

const INDUSTRY_SCORES: Record<Industry, ScoreRow> = {
  general:        { freelancer: 6, agency: 6, 'in-house': 5 },
  ecommerce:      { freelancer: 7, agency: 6, 'in-house': 3 },
  regulated:      { freelancer: 2, agency: 9, 'in-house': 2 },
  'local-service': { freelancer: 7, agency: 5, 'in-house': 4 },
  saas:           { freelancer: 5, agency: 7, 'in-house': 3 },
};

const INVOLVEMENT_SCORES: Record<Involvement, ScoreRow> = {
  'hands-off': { freelancer: 3, agency: 9, 'in-house': 2 },
  'hands-on':  { freelancer: 8, agency: 4, 'in-house': 7 },
};

const PAST_EXPERIENCE_SCORES: Record<PastExperience, ScoreRow> = {
  never:          { freelancer: 4, agency: 7, 'in-house': 5 },
  'bad-agency':   { freelancer: 8, agency: 2, 'in-house': 5 },
  'bad-freelancer': { freelancer: 2, agency: 8, 'in-house': 5 },
  'good-either':  { freelancer: 6, agency: 6, 'in-house': 5 },
};

/* ─────────────────────────── Budget Reality Data ─────────────────────────── */

interface BudgetRealityData {
  freelancerRange: string;
  agencyRange: string;
  hiddenCostsFreelancer: string[];
  hiddenCostsAgency: string[];
}

const BUDGET_REALITY: Record<BudgetRange, BudgetRealityData> = {
  'under-1k': {
    freelancerRange: '$500 - $1,000/mo',
    agencyRange: 'Rarely available',
    hiddenCostsFreelancer: ['Tool subscriptions ($50-$200/mo)', 'Your time managing and reviewing work'],
    hiddenCostsAgency: ['Most agencies have $1,500+ minimums', 'Setup fees can exceed monthly budget'],
  },
  '1k-3k': {
    freelancerRange: '$1,000 - $2,500/mo',
    agencyRange: '$1,500 - $3,000/mo',
    hiddenCostsFreelancer: ['Tool subscriptions ($100-$300/mo)', 'No backup if they get sick or leave', 'Your time for strategy and oversight'],
    hiddenCostsAgency: ['May get junior staff at this price point', 'Onboarding fees ($500-$1,500)', 'Contract minimums (3-6 months typical)'],
  },
  '3k-10k': {
    freelancerRange: '$2,500 - $5,000/mo',
    agencyRange: '$3,000 - $8,000/mo',
    hiddenCostsFreelancer: ['Tool costs ($200-$500/mo)', 'Management time (5-10 hrs/mo)', 'May need multiple freelancers for multiple channels'],
    hiddenCostsAgency: ['Agency fee is typically all-inclusive', 'Some charge extra for creative or landing pages', 'Watch for ad spend percentage fees vs flat rate'],
  },
  '10k-30k': {
    freelancerRange: '$8,000 - $15,000/mo (team needed)',
    agencyRange: '$8,000 - $20,000/mo',
    hiddenCostsFreelancer: ['Coordination between multiple freelancers', 'No unified reporting without extra work', 'Risk of inconsistent strategy across channels'],
    hiddenCostsAgency: ['Dedicated account manager included', 'Monthly reporting and strategy calls', 'Ask about team composition and seniority'],
  },
  '30k-plus': {
    freelancerRange: 'Not recommended at this scale',
    agencyRange: '$15,000 - $40,000+/mo',
    hiddenCostsFreelancer: ['Single point of failure at high spend', 'Limited capacity for rapid scaling', 'No bench depth for vacations or emergencies'],
    hiddenCostsAgency: ['Enterprise onboarding (1-2 months)', 'Custom reporting and dashboards', 'Negotiate performance bonuses into contract'],
  },
};

/* ─────────────────────────── Expected Costs ─────────────────────────── */

const EXPECTED_COST: Record<BudgetRange, Record<OptionType, string>> = {
  'under-1k': {
    freelancer: '$500 - $1,000/mo',
    agency: '$1,500+/mo (above budget)',
    'in-house': '$3,000 - $5,000/mo (salary)',
  },
  '1k-3k': {
    freelancer: '$1,000 - $2,500/mo',
    agency: '$1,500 - $3,000/mo',
    'in-house': '$4,000 - $6,000/mo (salary + tools)',
  },
  '3k-10k': {
    freelancer: '$2,500 - $5,000/mo + tools',
    agency: '$3,000 - $8,000/mo all-in',
    'in-house': '$5,000 - $8,000/mo (salary + tools)',
  },
  '10k-30k': {
    freelancer: '$8,000 - $15,000/mo (team)',
    agency: '$8,000 - $20,000/mo',
    'in-house': '$8,000 - $12,000/mo (senior hire)',
  },
  '30k-plus': {
    freelancer: '$15,000+/mo (not recommended)',
    agency: '$15,000 - $40,000+/mo',
    'in-house': '$12,000 - $20,000/mo (team build)',
  },
};

const MANAGEMENT_TIME: Record<BudgetRange, Record<OptionType, string>> = {
  'under-1k': {
    freelancer: '2-4 hrs/week',
    agency: '1-2 hrs/week',
    'in-house': '5-10 hrs/week',
  },
  '1k-3k': {
    freelancer: '3-5 hrs/week',
    agency: '1-2 hrs/week',
    'in-house': '8-15 hrs/week',
  },
  '3k-10k': {
    freelancer: '4-6 hrs/week',
    agency: '1-3 hrs/week',
    'in-house': '10-20 hrs/week',
  },
  '10k-30k': {
    freelancer: '8-12 hrs/week',
    agency: '2-4 hrs/week',
    'in-house': '15-25 hrs/week',
  },
  '30k-plus': {
    freelancer: '15+ hrs/week',
    agency: '3-5 hrs/week',
    'in-house': '20-40 hrs/week (full-time role)',
  },
};

/* ─────────────────────────── Initial State ─────────────────────────── */

const initialState: AgencyPickerState = {
  budget: '1k-3k',
  channels: '2',
  projectType: 'ongoing',
  timeline: 'moderate',
  internalTeam: 'no-team',
  industry: 'general',
  involvement: 'hands-off',
  pastExperience: 'never',
};

/* ─────────────────────────── Reducer ─────────────────────────── */

function agencyPickerReducer(state: AgencyPickerState, action: AgencyPickerAction): AgencyPickerState {
  switch (action.type) {
    case 'SET_BUDGET': return { ...state, budget: action.payload };
    case 'SET_CHANNELS': return { ...state, channels: action.payload };
    case 'SET_PROJECT_TYPE': return { ...state, projectType: action.payload };
    case 'SET_TIMELINE': return { ...state, timeline: action.payload };
    case 'SET_INTERNAL_TEAM': return { ...state, internalTeam: action.payload };
    case 'SET_INDUSTRY': return { ...state, industry: action.payload };
    case 'SET_INVOLVEMENT': return { ...state, involvement: action.payload };
    case 'SET_PAST_EXPERIENCE': return { ...state, pastExperience: action.payload };
    default: return state;
  }
}

/* ─────────────────────────── Scoring Engine ─────────────────────────── */

function computeWeightedScore(state: AgencyPickerState): Record<OptionType, number> {
  const options: OptionType[] = ['freelancer', 'agency', 'in-house'];
  const totals: Record<OptionType, number> = { freelancer: 0, agency: 0, 'in-house': 0 };

  const dimensions: { weight: number; scores: ScoreRow }[] = [
    { weight: WEIGHTS.budget,         scores: BUDGET_SCORES[state.budget] },
    { weight: WEIGHTS.channels,       scores: CHANNEL_SCORES[state.channels] },
    { weight: WEIGHTS.internalTeam,   scores: INTERNAL_TEAM_SCORES[state.internalTeam] },
    { weight: WEIGHTS.projectType,    scores: PROJECT_TYPE_SCORES[state.projectType] },
    { weight: WEIGHTS.timeline,       scores: TIMELINE_SCORES[state.timeline] },
    { weight: WEIGHTS.industry,       scores: INDUSTRY_SCORES[state.industry] },
    { weight: WEIGHTS.involvement,    scores: INVOLVEMENT_SCORES[state.involvement] },
    { weight: WEIGHTS.pastExperience, scores: PAST_EXPERIENCE_SCORES[state.pastExperience] },
  ];

  for (const dim of dimensions) {
    for (const opt of options) {
      totals[opt] += dim.weight * dim.scores[opt];
    }
  }

  return totals;
}

function generateRedFlags(state: AgencyPickerState): string[] {
  const flags: string[] = [];

  if ((state.budget === 'under-1k' || state.budget === '1k-3k') && state.channels === '3-plus') {
    flags.push('Your budget may be too low for 3+ channels. Consider focusing on 1-2 high-impact channels first.');
  }
  if ((state.budget === 'under-1k') && state.involvement === 'hands-off') {
    flags.push('Hands-off management at this budget is risky. Low-cost providers need more oversight, not less.');
  }
  if (state.industry === 'regulated' && state.budget === 'under-1k') {
    flags.push('Regulated industries need compliance expertise. Budget may not attract qualified providers.');
  }
  if (state.industry === 'regulated' && state.timeline === 'urgent') {
    flags.push('Rushing in a regulated industry increases compliance risk. Build in time for legal review.');
  }
  if (state.channels === '3-plus' && state.internalTeam === 'no-team' && state.involvement === 'hands-off') {
    flags.push('Multiple channels with no internal team and hands-off style requires a well-resourced agency. Budget accordingly.');
  }
  if (state.pastExperience === 'bad-agency' && state.budget === '10k-30k') {
    flags.push('Past bad agency experience at higher budgets often comes from poor vetting. Focus on references and case studies this time.');
  }
  if (state.pastExperience === 'bad-freelancer' && state.budget === 'under-1k') {
    flags.push('A bad freelancer experience at low budgets often means you got what you paid for. Consider increasing budget for better talent.');
  }
  if (state.timeline === 'urgent' && state.projectType === 'ongoing') {
    flags.push('Urgent timelines for ongoing work can lead to cutting corners on strategy. Ensure the first 30 days have a clear plan.');
  }
  if (state.budget === '30k-plus' && state.internalTeam === 'no-team') {
    flags.push('At $30K+ spend with no internal team, you need a senior agency partner. Consider hiring an in-house marketing manager to oversee the agency.');
  }

  return flags;
}

function generatePros(state: AgencyPickerState): Record<OptionType, string[]> {
  const pros: Record<OptionType, string[]> = {
    freelancer: [],
    agency: [],
    'in-house': [],
  };

  // Freelancer pros
  if (state.budget === 'under-1k' || state.budget === '1k-3k') {
    pros.freelancer.push('Best value at your budget level');
  }
  if (state.channels === '1') {
    pros.freelancer.push('Deep specialist focus on a single channel');
  }
  if (state.projectType === 'one-time') {
    pros.freelancer.push('Easy to engage for project-based work');
  }
  if (state.involvement === 'hands-on') {
    pros.freelancer.push('Direct communication, no account manager layer');
  }
  if (state.internalTeam === 'have-team') {
    pros.freelancer.push('Integrates well with your existing team');
  }
  if (state.timeline === 'no-rush') {
    pros.freelancer.push('Can take time to find the perfect specialist');
  }
  pros.freelancer.push('Lower overhead costs than an agency');
  pros.freelancer.push('Flexible engagement terms');

  // Agency pros
  if (state.budget === '3k-10k' || state.budget === '10k-30k' || state.budget === '30k-plus') {
    pros.agency.push('Budget supports quality agency services');
  }
  if (state.channels === '3-plus') {
    pros.agency.push('Built to manage multiple channels with unified strategy');
  }
  if (state.internalTeam === 'no-team') {
    pros.agency.push('Full team in place, no hiring needed');
  }
  if (state.projectType === 'ongoing') {
    pros.agency.push('Structured for long-term account growth');
  }
  if (state.involvement === 'hands-off') {
    pros.agency.push('Manages everything with minimal oversight needed');
  }
  if (state.timeline === 'urgent') {
    pros.agency.push('Team depth allows fast ramp-up');
  }
  if (state.industry === 'regulated') {
    pros.agency.push('Experience with compliance and regulated ad policies');
  }
  pros.agency.push('Bench depth for vacations, turnover, and scaling');
  pros.agency.push('Structured reporting and accountability');

  // In-house pros
  if (state.internalTeam === 'have-team') {
    pros['in-house'].push('Leverages your existing team and institutional knowledge');
  }
  if (state.involvement === 'hands-on') {
    pros['in-house'].push('Maximum control over strategy and execution');
  }
  pros['in-house'].push('Deepest understanding of your brand and customers');
  pros['in-house'].push('No external dependency or contract commitments');
  if (state.channels === '1') {
    pros['in-house'].push('One channel is manageable for a dedicated hire');
  }

  return pros;
}

function generateCons(state: AgencyPickerState): Record<OptionType, string[]> {
  const cons: Record<OptionType, string[]> = {
    freelancer: [],
    agency: [],
    'in-house': [],
  };

  // Freelancer cons
  if (state.channels === '3-plus') {
    cons.freelancer.push('Difficult to manage 3+ channels solo');
  }
  if (state.budget === '10k-30k' || state.budget === '30k-plus') {
    cons.freelancer.push('High spend requires more oversight than one person can provide');
  }
  if (state.involvement === 'hands-off') {
    cons.freelancer.push('Freelancers need more active management than agencies');
  }
  if (state.industry === 'regulated') {
    cons.freelancer.push('Compliance expertise is harder to verify with individuals');
  }
  cons.freelancer.push('Single point of failure (illness, vacation, quitting)');
  cons.freelancer.push('You handle tools, reporting, and strategy coordination');

  // Agency cons
  if (state.budget === 'under-1k' || state.budget === '1k-3k') {
    cons.agency.push('Your budget may be below agency minimums');
  }
  if (state.involvement === 'hands-on') {
    cons.agency.push('Less direct control, communication goes through account managers');
  }
  if (state.projectType === 'one-time') {
    cons.agency.push('Most agencies prefer ongoing retainers over one-time projects');
  }
  if (state.pastExperience === 'bad-agency') {
    cons.agency.push('Past negative experience may repeat without better vetting');
  }
  cons.agency.push('Higher cost than freelancers for equivalent work');
  cons.agency.push('Contract lock-ins (typically 3-6 months minimum)');

  // In-house cons
  if (state.internalTeam === 'no-team') {
    cons['in-house'].push('Requires hiring, onboarding, and training from scratch');
  }
  if (state.channels === '3-plus') {
    cons['in-house'].push('One hire rarely covers 3+ channels well');
  }
  cons['in-house'].push('Highest total cost when including salary, benefits, and tools');
  cons['in-house'].push('Limited perspective compared to external providers');
  cons['in-house'].push('Harder to scale up or down based on need');
  if (state.timeline === 'urgent') {
    cons['in-house'].push('Hiring takes 4-8 weeks minimum. Not viable for urgent needs.');
  }

  return cons;
}

function generateVettingQuestions(winner: OptionType, state: AgencyPickerState): { question: string; why: string }[] {
  const questions: { question: string; why: string }[] = [];

  if (winner === 'agency') {
    questions.push({
      question: 'Can I speak directly with the person managing my account day to day?',
      why: 'Many agencies sell with senior staff but assign junior team members. You want to know who actually does the work.',
    });
    questions.push({
      question: 'What does your onboarding process look like, and when should I expect to see initial results?',
      why: 'Good agencies have a structured onboarding. Vague answers here signal disorganization.',
    });
    questions.push({
      question: 'Can you share 2-3 case studies from clients in a similar industry or budget range?',
      why: 'Relevant experience matters more than general portfolio size. Ask for specifics.',
    });
    questions.push({
      question: 'What happens if my primary strategist leaves? What is the transition plan?',
      why: 'Bench depth is a key agency advantage. If they do not have one, that advantage disappears.',
    });
    if (state.industry === 'regulated') {
      questions.push({
        question: 'What experience do you have with ad compliance in my industry?',
        why: 'Regulated industries need providers who understand approval processes and restricted content rules.',
      });
    }
    if (state.budget === '10k-30k' || state.budget === '30k-plus') {
      questions.push({
        question: 'How is your fee structured: flat rate, percentage of spend, or performance-based?',
        why: 'At higher budgets, fee structure significantly impacts total cost. Percentage-based fees can balloon.',
      });
    }
  }

  if (winner === 'freelancer') {
    questions.push({
      question: 'What is your backup plan if you are unavailable for an extended period?',
      why: 'Single point of failure is the biggest freelancer risk. A good freelancer has a network or contingency plan.',
    });
    questions.push({
      question: 'How do you handle reporting, and what tools do you use?',
      why: 'Unlike agencies, freelancers do not always include reporting. Make sure expectations are aligned.',
    });
    questions.push({
      question: 'Can you share results from a similar project with metrics, not just screenshots?',
      why: 'Verifiable results matter more than polished portfolios. Ask for specific KPIs they improved.',
    });
    questions.push({
      question: 'What is your current client load, and how many hours per week will you dedicate to my account?',
      why: 'Overloaded freelancers deliver late and low-quality work. You want dedicated attention.',
    });
    if (state.channels === '2' || state.channels === '3-plus') {
      questions.push({
        question: 'Have you managed multiple channels simultaneously for a single client before?',
        why: 'Multi-channel coordination is different from single-channel expertise. Verify this experience directly.',
      });
    }
  }

  if (winner === 'in-house') {
    questions.push({
      question: 'What specific certifications and platform experience should I require in the job posting?',
      why: 'Hiring the wrong skill set wastes months. Define requirements before you start recruiting.',
    });
    questions.push({
      question: 'What tools and software budget do I need beyond salary?',
      why: 'Tool costs ($500-$2,000/mo) are often overlooked when budgeting for in-house marketing.',
    });
    questions.push({
      question: 'How will I evaluate performance without external benchmarks?',
      why: 'In-house teams lack the cross-client perspective that agencies and freelancers naturally have.',
    });
  }

  return questions;
}

function calculateResults(state: AgencyPickerState): AgencyPickerResults {
  const rawScores = computeWeightedScore(state);

  // Normalize to 0-100 scale (max possible weighted score is 10)
  const scores: Record<OptionType, number> = {
    freelancer: Math.round(rawScores.freelancer * 10),
    agency: Math.round(rawScores.agency * 10),
    'in-house': Math.round(rawScores['in-house'] * 10),
  };

  const totalScore = scores.freelancer + scores.agency + scores['in-house'];
  const percentages: Record<OptionType, number> = {
    freelancer: totalScore > 0 ? Math.round((scores.freelancer / totalScore) * 100) : 0,
    agency: totalScore > 0 ? Math.round((scores.agency / totalScore) * 100) : 0,
    'in-house': totalScore > 0 ? Math.round((scores['in-house'] / totalScore) * 100) : 0,
  };

  const sorted = (Object.entries(scores) as [OptionType, number][]).sort((a, b) => b[1] - a[1]);
  const winner = sorted[0][0];
  const runnerUp = sorted[1][0];

  const gap = sorted[0][1] - sorted[1][1];
  const confidence: ConfidenceLevel = gap >= 15 ? 'Strong Match' : gap >= 5 ? 'Good Fit' : 'Consider Both';

  return {
    scores,
    percentages,
    winner,
    runnerUp,
    confidence,
    budgetReality: BUDGET_REALITY[state.budget],
    redFlags: generateRedFlags(state),
    vettingQuestions: generateVettingQuestions(winner, state),
    pros: generatePros(state),
    cons: generateCons(state),
    expectedCost: EXPECTED_COST[state.budget],
    managementTime: MANAGEMENT_TIME[state.budget],
  };
}

/* ─────────────────────────── Context ─────────────────────────── */

interface AgencyPickerContextValue {
  state: AgencyPickerState;
  dispatch: React.Dispatch<AgencyPickerAction>;
  results: AgencyPickerResults;
}

const AgencyPickerContext = createContext<AgencyPickerContextValue | null>(null);

export function AgencyPickerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(agencyPickerReducer, initialState);

  const results = useMemo(() => calculateResults(state), [state]);

  return (
    <AgencyPickerContext.Provider value={{ state, dispatch, results }}>
      {children}
    </AgencyPickerContext.Provider>
  );
}

export function useAgencyPicker(): AgencyPickerContextValue {
  const ctx = useContext(AgencyPickerContext);
  if (!ctx) throw new Error('useAgencyPicker must be used within AgencyPickerProvider');
  return ctx;
}
