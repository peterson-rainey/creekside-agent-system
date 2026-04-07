'use client';

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from 'react';

// ─── Types ───

type AnswerValue = 'yes' | 'no' | 'not-sure';
type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type EffortLevel = '5-minute fix' | '15-minute fix' | '1-4 hours' | '1+ day project';

type IndustryKey = 'ecommerce' | 'saas' | 'lead-gen' | 'local-services' | 'healthcare' | 'legal' | 'real-estate' | 'other';

export interface IndustryBenchmark {
  label: string;
  medianCR: string;
  topQuartileCR: string;
}

export const INDUSTRY_BENCHMARKS: Record<IndustryKey, IndustryBenchmark> = {
  'ecommerce': { label: 'E-commerce', medianCR: '5.2%', topQuartileCR: '8.1%' },
  'saas': { label: 'SaaS', medianCR: '3.0%', topQuartileCR: '7.0%' },
  'lead-gen': { label: 'Lead Generation', medianCR: '4.5%', topQuartileCR: '8.2%' },
  'local-services': { label: 'Local Services', medianCR: '5.5%', topQuartileCR: '9.0%' },
  'healthcare': { label: 'Healthcare / Medical', medianCR: '4.0%', topQuartileCR: '7.0%' },
  'legal': { label: 'Legal', medianCR: '4.0%', topQuartileCR: '7.5%' },
  'real-estate': { label: 'Real Estate', medianCR: '3.0%', topQuartileCR: '5.5%' },
  'other': { label: 'Other', medianCR: '4.0%', topQuartileCR: '7.0%' },
};

export interface AuditQuestion {
  id: number;
  category: string;
  question: string;
  maxPoints: number;
  priority: Priority;
  fix: string;
  expectedLift: string;
  effortLevel: EffortLevel;
}

// 24 questions across 5 categories, 100 points total
export const AUDIT_QUESTIONS: AuditQuestion[] = [
  // Category 1: Value Proposition and Messaging (25 points)
  { id: 1, category: 'Value Proposition and Messaging', question: 'Clear, benefit-driven headline (not clever or vague)', maxPoints: 7, priority: 'HIGH', fix: 'Headlines with numbers convert 36% better (Conductor). Use PAS (Problem, Agitate, Solve) or Before/After/Bridge formulas. Keep it under 10 words and focus on the primary benefit.', expectedLift: '10-30%', effortLevel: '1-4 hours' },
  { id: 2, category: 'Value Proposition and Messaging', question: 'Supporting subheadline explains what you do and who it is for', maxPoints: 5, priority: 'HIGH', fix: 'Your subheadline should answer three questions: What is this? Who is it for? Why should I care? Keep it under 20 words.', expectedLift: '5-15%', effortLevel: '15-minute fix' },
  { id: 3, category: 'Value Proposition and Messaging', question: 'Value proposition is clear within 5 seconds', maxPoints: 6, priority: 'HIGH', fix: 'Show your page to someone for 5 seconds, then ask: What does this company do? Who is it for? What should you do next? If they cannot answer all three, simplify.', expectedLift: '15-25%', effortLevel: '1-4 hours' },
  { id: 4, category: 'Value Proposition and Messaging', question: 'Copy focuses on benefits, not just features', maxPoints: 4, priority: 'MEDIUM', fix: 'For every feature, add "which means..." to find the benefit. "AI-powered analytics" becomes "AI-powered analytics, which means you spot problems before they cost you money."', expectedLift: '5-10%', effortLevel: '1-4 hours' },
  { id: 5, category: 'Value Proposition and Messaging', question: 'Page headline matches the ad or email driving traffic', maxPoints: 3, priority: 'HIGH', fix: 'If your ad says "Get 50% Off Premium Plans," your landing page headline should echo that exact offer. Mismatched messages increase bounce rates by 30-50%.', expectedLift: '10-25%', effortLevel: '15-minute fix' },

  // Category 2: CTA and Conversion Path (25 points)
  { id: 6, category: 'CTA and Conversion Path', question: 'Primary CTA is visible without scrolling (above the fold)', maxPoints: 6, priority: 'HIGH', fix: '80% of user attention is spent above the fold (Nielsen Norman Group). Your CTA must be visible without any scrolling on both desktop and mobile.', expectedLift: '10-20%', effortLevel: '15-minute fix' },
  { id: 7, category: 'CTA and Conversion Path', question: 'CTA button uses action-oriented copy (not "Submit")', maxPoints: 5, priority: 'HIGH', fix: '"Submit" is the worst-performing CTA word (HubSpot). Use first-person action phrases: "Get My Free Quote" converts 90% better than "Get Your Free Quote" (Unbounce A/B test).', expectedLift: '20-40%', effortLevel: '5-minute fix' },
  { id: 8, category: 'CTA and Conversion Path', question: 'CTA button visually stands out with a contrasting color', maxPoints: 4, priority: 'MEDIUM', fix: 'The CTA should be the most visually prominent element on the page. It is not about a specific color, it is about contrast with the surrounding design.', expectedLift: '5-15%', effortLevel: '5-minute fix' },
  { id: 9, category: 'CTA and Conversion Path', question: 'Only one primary CTA or goal per page', maxPoints: 5, priority: 'HIGH', fix: 'Removing navigation from landing pages increases conversion 16-28% (HubSpot). Every link that is not your CTA is an exit path. Aim for a 1:1 attention ratio.', expectedLift: '16-28%', effortLevel: '15-minute fix' },
  { id: 10, category: 'CTA and Conversion Path', question: 'Form asks only essential fields (3-4 max for lead gen)', maxPoints: 5, priority: 'HIGH', fix: 'Formstack analyzed 650,000+ forms: 3 fields = 25% conversion, 5 fields = 20%, 7 fields = 15%. Each removed field lifts conversion about 10%. If you need more fields, use a multi-step form (86% improvement over single long forms).', expectedLift: '25-50%', effortLevel: '15-minute fix' },

  // Category 3: Trust and Social Proof (20 points)
  { id: 11, category: 'Trust and Social Proof', question: 'Customer testimonials or reviews visible on the page', maxPoints: 5, priority: 'HIGH', fix: 'Testimonials placed near the CTA increase conversion by 34% (WikiJob A/B test). Use specific results: "42% more leads in 3 months" beats "Great service!" Named, titled testimonials outperform anonymous ones 2-3x.', expectedLift: '10-34%', effortLevel: '1-4 hours' },
  { id: 12, category: 'Trust and Social Proof', question: 'Trust badges, client logos, or certifications displayed', maxPoints: 4, priority: 'MEDIUM', fix: '5-7 recognizable client logos build instant credibility. Place them near the top of the page or near the CTA. Google/Meta Partner badges, BBB, and industry certifications reduce visitor anxiety.', expectedLift: '5-15%', effortLevel: '15-minute fix' },
  { id: 13, category: 'Trust and Social Proof', question: 'No-risk messaging near the CTA (guarantee, "no credit card required")', maxPoints: 4, priority: 'HIGH', fix: 'Adding "No credit card required" or "Cancel anytime" below the CTA reduces anxiety and lifts conversion 10-30%. This is a 5-minute change with outsized impact.', expectedLift: '10-30%', effortLevel: '5-minute fix' },
  { id: 14, category: 'Trust and Social Proof', question: 'Claims include specific numbers and data (not vague promises)', maxPoints: 4, priority: 'MEDIUM', fix: '"Join 10,847 customers" outperforms "Join thousands of customers." Specific numbers signal authenticity. Add metrics: timeframes, percentages, dollar amounts.', expectedLift: '5-15%', effortLevel: '15-minute fix' },
  { id: 15, category: 'Trust and Social Proof', question: 'No competing outbound links or distracting navigation', maxPoints: 3, priority: 'MEDIUM', fix: 'Footer links, social media icons, blog links, and "About Us" navigation are all exit paths. On a landing page, the only clickable elements should lead to your conversion goal.', expectedLift: '10-20%', effortLevel: '15-minute fix' },

  // Category 4: Technical Performance (15 points)
  { id: 16, category: 'Technical Performance', question: 'Page loads in under 3 seconds', maxPoints: 5, priority: 'HIGH', fix: 'Every additional second of load time reduces conversion by 4.42% (Portent, 94M pageviews). A 5-second page has 3x lower conversion than a 1-second page. Compress images, enable lazy loading, and minimize JavaScript.', expectedLift: '7-20%', effortLevel: '1-4 hours' },
  { id: 17, category: 'Technical Performance', question: 'Fully mobile-responsive design', maxPoints: 5, priority: 'HIGH', fix: 'Mobile converts at 37% of the desktop rate (Monetate). Common mobile killers: tap targets under 44x44px, forms painful on mobile keyboards, no click-to-call, CTA not visible without scrolling, horizontal scroll.', expectedLift: '15-30%', effortLevel: '1-4 hours' },
  { id: 18, category: 'Technical Performance', question: 'HTTPS enabled (not HTTP)', maxPoints: 3, priority: 'CRITICAL', fix: 'Chrome labels HTTP sites as "Not Secure." 84% of users abandon purchases on insecure connections (GlobalSign). HTTPS is non-negotiable. If you do not have it, fix this before anything else.', expectedLift: '1-3% plus trust', effortLevel: '15-minute fix' },
  { id: 19, category: 'Technical Performance', question: 'Images are optimized (not oversized files)', maxPoints: 2, priority: 'MEDIUM', fix: 'Use WebP format, compress to 80% quality, and implement lazy loading for below-fold images. This alone can cut page load time by 30-50%.', expectedLift: '3-10%', effortLevel: '1-4 hours' },

  // Category 5: Visual Hierarchy and Design (15 points)
  { id: 20, category: 'Visual Hierarchy and Design', question: 'Relevant hero image or video above the fold', maxPoints: 3, priority: 'MEDIUM', fix: 'Real photos of your product, team, or results increase trust by up to 35% vs. stock photos (VWO). Video can boost conversion 80%+ but only if it is authentic and under 2 minutes.', expectedLift: '5-35%', effortLevel: '1+ day project' },
  { id: 21, category: 'Visual Hierarchy and Design', question: 'Clean layout with clear visual hierarchy (not cluttered)', maxPoints: 4, priority: 'MEDIUM', fix: 'Users scan in an F-pattern: the top headline gets the most attention, then the left side. Your most important content should follow this pattern. Use whitespace generously.', expectedLift: '5-15%', effortLevel: '1-4 hours' },
  { id: 22, category: 'Visual Hierarchy and Design', question: 'No main site navigation on the landing page', maxPoints: 4, priority: 'HIGH', fix: 'Removing navigation doubled conversion in the Yuppiechef case study and consistently improves conversion in 90%+ of A/B tests (VWO compilation). Your landing page is not your homepage.', expectedLift: '16-28%', effortLevel: '15-minute fix' },
  { id: 23, category: 'Visual Hierarchy and Design', question: 'Urgency or scarcity elements (only if genuine)', maxPoints: 2, priority: 'LOW', fix: 'Genuine countdown timers increase conversion 3-9%. But fake urgency destroys trust. Only use scarcity if the deadline or limited quantity is real.', expectedLift: '3-9%', effortLevel: '15-minute fix' },
  { id: 24, category: 'Visual Hierarchy and Design', question: 'Visual style consistent with the ad creative driving traffic', maxPoints: 2, priority: 'LOW', fix: 'Visual consistency between your ad and landing page reduces cognitive load. If your ad uses blue and your landing page uses red, visitors feel disoriented.', expectedLift: '3-8%', effortLevel: '1-4 hours' },
];

export const CATEGORY_NAMES = [
  'Value Proposition and Messaging',
  'CTA and Conversion Path',
  'Trust and Social Proof',
  'Technical Performance',
  'Visual Hierarchy and Design',
] as const;

// ─── State ───

export interface AuditState {
  industry: IndustryKey;
  pageUrl: string;
  answers: Record<number, AnswerValue>;
}

export type AuditAction =
  | { type: 'SET_INDUSTRY'; payload: IndustryKey }
  | { type: 'SET_PAGE_URL'; payload: string }
  | { type: 'SET_ANSWER'; payload: { questionId: number; value: AnswerValue } }
  | { type: 'RESET' };

const initialState: AuditState = {
  industry: 'other',
  pageUrl: '',
  answers: {},
};

function auditReducer(state: AuditState, action: AuditAction): AuditState {
  switch (action.type) {
    case 'SET_INDUSTRY': return { ...state, industry: action.payload };
    case 'SET_PAGE_URL': return { ...state, pageUrl: action.payload };
    case 'SET_ANSWER': return { ...state, answers: { ...state.answers, [action.payload.questionId]: action.payload.value } };
    case 'RESET': return { ...initialState };
    default: return state;
  }
}

// ─── Scoring Engine ───

export interface CategoryResult {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  items: {
    question: AuditQuestion;
    answer: AnswerValue;
    points: number;
  }[];
}

export interface PriorityFix {
  question: string;
  fix: string;
  expectedLift: string;
  priority: Priority;
  effortLevel: EffortLevel;
  missedPoints: number;
}

export interface AuditResults {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  gradeColor: string;
  categories: CategoryResult[];
  priorityFixes: PriorityFix[];
  strengths: string[];
  answeredCount: number;
  totalQuestions: number;
  quickWins: PriorityFix[];
  mediumEffort: PriorityFix[];
  biggerProjects: PriorityFix[];
}

function getGrade(pct: number): { grade: string; color: string } {
  if (pct >= 95) return { grade: 'A+', color: 'var(--success)' };
  if (pct >= 90) return { grade: 'A', color: 'var(--success)' };
  if (pct >= 85) return { grade: 'B+', color: '#3B82F6' };
  if (pct >= 80) return { grade: 'B', color: '#3B82F6' };
  if (pct >= 75) return { grade: 'C+', color: 'var(--warning)' };
  if (pct >= 70) return { grade: 'C', color: 'var(--warning)' };
  if (pct >= 60) return { grade: 'D', color: '#F97316' };
  return { grade: 'F', color: 'var(--danger)' };
}

function calculateAudit(state: AuditState): AuditResults | null {
  const answeredCount = Object.keys(state.answers).length;
  if (answeredCount === 0) return null;

  const categoryMap = new Map<string, CategoryResult>();

  for (const catName of CATEGORY_NAMES) {
    categoryMap.set(catName, { name: catName, score: 0, maxScore: 0, percentage: 0, items: [] });
  }

  let totalScore = 0;
  let maxScore = 0;
  const strengths: string[] = [];
  const allFixes: PriorityFix[] = [];

  for (const q of AUDIT_QUESTIONS) {
    const answer = state.answers[q.id] || 'not-sure';
    const points = answer === 'yes' ? q.maxPoints : answer === 'not-sure' ? Math.round(q.maxPoints * 0.4) : 0;

    totalScore += points;
    maxScore += q.maxPoints;

    const cat = categoryMap.get(q.category)!;
    cat.score += points;
    cat.maxScore += q.maxPoints;
    cat.items.push({ question: q, answer, points });

    if (answer === 'yes') {
      strengths.push(q.question);
    } else {
      const missedPoints = q.maxPoints - points;
      allFixes.push({
        question: q.question,
        fix: q.fix,
        expectedLift: q.expectedLift,
        priority: q.priority,
        effortLevel: q.effortLevel,
        missedPoints,
      });
    }
  }

  // Calculate category percentages
  for (const cat of categoryMap.values()) {
    cat.percentage = cat.maxScore > 0 ? Math.round((cat.score / cat.maxScore) * 100) : 0;
  }

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const { grade, color } = getGrade(percentage);

  // Sort fixes by priority impact: CRITICAL first, then by missed points
  const priorityOrder: Record<Priority, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
  allFixes.sort((a, b) => {
    const pDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (pDiff !== 0) return pDiff;
    return b.missedPoints - a.missedPoints;
  });

  const priorityFixes = allFixes.slice(0, 5);

  // Group by effort level for the improvement tiers
  const quickWins = allFixes.filter(f => f.effortLevel === '5-minute fix' || f.effortLevel === '15-minute fix');
  const mediumEffort = allFixes.filter(f => f.effortLevel === '1-4 hours');
  const biggerProjects = allFixes.filter(f => f.effortLevel === '1+ day project');

  return {
    totalScore,
    maxScore,
    percentage,
    grade,
    gradeColor: color,
    categories: Array.from(categoryMap.values()),
    priorityFixes,
    strengths,
    answeredCount,
    totalQuestions: AUDIT_QUESTIONS.length,
    quickWins,
    mediumEffort,
    biggerProjects,
  };
}

// ─── Context ───

interface AuditContextValue {
  state: AuditState;
  dispatch: React.Dispatch<AuditAction>;
  results: AuditResults | null;
  resetAll: () => void;
}

const AuditContext = createContext<AuditContextValue | null>(null);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(auditReducer, initialState);
  const results = useMemo(() => calculateAudit(state), [state]);
  const resetAll = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <AuditContext.Provider value={{ state, dispatch, results, resetAll }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit(): AuditContextValue {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error('useAudit must be used within AuditProvider');
  return ctx;
}
