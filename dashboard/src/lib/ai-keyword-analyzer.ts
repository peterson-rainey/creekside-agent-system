/**
 * Keyword analysis engine: statistics + AI.
 *
 * Code handles MATH: data sufficiency, binomial tests, CPA heuristics, Bayesian estimation.
 * AI handles RELEVANCE: is this term relevant to the business intent?
 *
 * CANNOT: access external APIs beyond Claude, or write to the database.
 */
import Anthropic from '@anthropic-ai/sdk';
import { evaluateSearchTerm, type StatisticalVerdict } from './search-term-classifier';

export interface ParsedSearchTerm {
  term: string;
  matchType: string;
  clicks: number;
  impressions: number;
  cost: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}

export interface AccountStats {
  totalTerms: number;
  totalSpend: number;
  totalClicks: number;
  totalConversions: number;
  avgCpa: number;
  avgCtr: number;
  avgConversionRate: number;
  convertingTermCount: number;
  nonConvertingTermCount: number;
  nonConvertingSpend: number;
}

export interface ClassifiedTerm {
  term: string;
  classification: 'wasteful' | 'underperforming' | 'acceptable' | 'good';
  reason: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  suggestedAction: 'add_negative' | 'monitor' | 'keep' | 'optimize';
  suggestedMatchType: 'Broad' | 'Phrase' | 'Exact';
  cost: number;
  clicks: number;
  conversions: number;
}

export interface NegativeRecommendation {
  keyword: string;
  matchType: 'Broad' | 'Phrase' | 'Exact';
  reason: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  source: 'search_terms' | 'pattern' | 'industry';
}

export interface ExistingNegativeIssue {
  keyword: string;
  matchType: string;
  issue: 'unnecessary' | 'wrong_match_type' | 'too_broad' | 'too_narrow';
  reason: string;
  severity: 'critical' | 'warning' | 'info';
  suggestedFix?: string;
}

export interface AIAnalysisResult {
  classifiedTerms: ClassifiedTerm[];
  negativeRecommendations: NegativeRecommendation[];
  existingNegativeIssues: ExistingNegativeIssue[];
  healthScore: number;
  totalWastedSpend: number;
  wastePercentage: number;
  summary: string;
  keyInsights: string[];
  accountStats: AccountStats;
}

export function computeAccountStats(terms: ParsedSearchTerm[]): AccountStats {
  const totalSpend = terms.reduce((s, t) => s + t.cost, 0);
  const totalClicks = terms.reduce((s, t) => s + t.clicks, 0);
  const totalConversions = terms.reduce((s, t) => s + t.conversions, 0);
  const totalImpressions = terms.reduce((s, t) => s + t.impressions, 0);
  const converting = terms.filter(t => t.conversions > 0);
  const nonConverting = terms.filter(t => t.conversions === 0);

  return {
    totalTerms: terms.length,
    totalSpend,
    totalClicks,
    totalConversions,
    avgCpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
    avgCtr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
    avgConversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
    convertingTermCount: converting.length,
    nonConvertingTermCount: nonConverting.length,
    nonConvertingSpend: nonConverting.reduce((s, t) => s + t.cost, 0),
  };
}

export async function analyzeWithAI(opts: {
  searchTerms: ParsedSearchTerm[];
  keywordList?: string[];
  existingNegatives?: { keyword: string; matchType: string }[];
  businessDescription?: string;
  competitors?: string[];
  accountStats: AccountStats;
}): Promise<AIAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('AI analysis unavailable — API key not configured');
  }

  const { searchTerms, keywordList, existingNegatives, businessDescription, competitors, accountStats } = opts;

  // ── Step 1: Statistical classification of all terms ─────────────────
  // Code handles math. Determines data sufficiency, runs binomial tests,
  // CPA heuristics, and Bayesian estimation.
  const sorted = [...searchTerms].sort((a, b) => b.cost - a.cost);
  const topTerms = sorted.slice(0, 300);

  const baselineCvr = accountStats.avgConversionRate / 100;
  const targetCpa = accountStats.avgCpa > 0 ? accountStats.avgCpa : accountStats.totalSpend / Math.max(accountStats.totalTerms, 1);

  const statResults = topTerms.map(st => ({
    ...st,
    stat: evaluateSearchTerm(st.clicks, st.conversions, st.cost, st.impressions, baselineCvr, targetCpa),
  }));

  // ── Step 2: Ask Claude ONLY about business relevance ────────────────
  // Claude determines if a term is relevant to this specific business.
  // It does NOT judge performance metrics — the stats engine already did that.
  const termsForAI = topTerms.map(t => t.term);

  const keywordsBlock = keywordList?.length
    ? `\n\nTARGET KEYWORDS (what the business is intentionally bidding on):\n${keywordList.slice(0, 200).join('\n')}`
    : '';

  const negativesBlock = existingNegatives?.length
    ? `\n\nCURRENT NEGATIVE KEYWORDS:\n${existingNegatives.slice(0, 200).map(n => `${n.keyword} [${n.matchType}]`).join('\n')}`
    : '';

  const businessBlock = businessDescription
    ? `\n\nBUSINESS DESCRIPTION:\n${businessDescription.slice(0, 1000)}`
    : '';

  const competitorsBlock = competitors?.length
    ? `\n\nKNOWN COMPETITORS: ${competitors.join(', ')}`
    : '';

  const prompt = `You are a Google Ads expert. Your ONLY job is to determine which search terms are IRRELEVANT to this business. Do NOT evaluate performance metrics — that's already handled separately.

SEARCH TERMS (these are actual queries that triggered the business's ads):
${termsForAI.join('\n')}${keywordsBlock}${negativesBlock}${businessBlock}${competitorsBlock}

INSTRUCTIONS:
1. Use the target keywords and business description to understand what this business WANTS to attract.
2. Flag terms that are clearly IRRELEVANT to the business — not just low-performing, but genuinely wrong audience:
   - Job seekers (salary, hiring, career, jobs, resume, internship)
   - DIY/free seekers who won't buy (free, diy, how to, tutorial, template, download)
   - Competitor brand searches (searching for a specific competitor by name)
   - Wrong industry entirely (the term has nothing to do with this business)
   - Wrong geography (searching for a different city/state)
   - Negative sentiment (scam, complaint, lawsuit, worst)
   - Pure research with no purchase intent (what is, definition, wiki, reddit, youtube)
3. Do NOT flag a term as irrelevant just because it has "free" or "test" in it — consider the BUSINESS CONTEXT. If the business sells test prep materials, "free practice test" might be wasteful, but "nmls practice test" is their core product.
4. If you're unsure whether a term is relevant, do NOT flag it. Only flag terms you are confident are irrelevant.

Respond in this exact JSON format:
{
  "irrelevantTerms": [
    {"term": "exact term from the list", "reason": "why this is irrelevant to the business", "category": "Job Seekers|DIY/Free|Competitor|Irrelevant|Geographic Mismatch|Negative Sentiment|Research Only", "suggestedMatchType": "Broad|Phrase|Exact"}
  ],
  "negativeRecommendations": [
    {"keyword": "...", "matchType": "Broad|Phrase|Exact", "reason": "...", "category": "...", "priority": "high|medium|low", "source": "search_terms|pattern|industry"}
  ],
  "existingNegativeIssues": [
    {"keyword": "...", "matchType": "...", "issue": "unnecessary|wrong_match_type|too_broad|too_narrow", "reason": "...", "severity": "critical|warning|info", "suggestedFix": "..."}
  ],
  "summary": "2-3 sentence overview of the search term relevance quality",
  "keyInsights": ["insight 1", "insight 2", "insight 3"]
}

Only flag terms you are CONFIDENT are irrelevant. When in doubt, leave it out.`;

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AI analysis returned invalid format');
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error('AI analysis returned malformed JSON. Please try again.');
  }

  // ── Step 3: Merge statistical + AI results ──────────────────────────
  interface AIFlaggedTerm { term: string; reason: string; category: string; suggestedMatchType: string }
  const irrelevantTerms: AIFlaggedTerm[] = parsed.irrelevantTerms || [];
  const irrelevantSet = new Set(irrelevantTerms.map(t => t.term?.toLowerCase()));
  const irrelevantMap = new Map(irrelevantTerms.map(t => [t.term?.toLowerCase(), t]));

  // Map statistical verdicts to final classifications
  const verdictToClassification = (verdict: StatisticalVerdict, isIrrelevant: boolean): ClassifiedTerm['classification'] => {
    if (isIrrelevant) return 'wasteful';
    if (verdict === 'UNDERPERFORMING' || verdict === 'PAUSE_CANDIDATE') return 'underperforming';
    if (verdict === 'LIKELY_UNDERPERFORMING') return 'underperforming';
    if (verdict === 'GOOD') return 'good';
    return 'acceptable'; // INSUFFICIENT_DATA and PERFORMING_OK
  };

  const classifiedTerms: ClassifiedTerm[] = statResults.map(st => {
    const isIrrelevant = irrelevantSet.has(st.term.toLowerCase());
    const aiData = irrelevantMap.get(st.term.toLowerCase());
    const classification = verdictToClassification(st.stat.verdict, isIrrelevant);

    // Build reason: combine statistical reason with AI relevance reason
    let reason = st.stat.reason;
    if (isIrrelevant && aiData) {
      reason = aiData.reason;
    } else if (st.stat.verdict === 'INSUFFICIENT_DATA' && !isIrrelevant) {
      reason = st.stat.reason; // Statistical reason explains the data gap
    }

    // Determine category
    let category = 'Acceptable';
    if (isIrrelevant && aiData) {
      category = aiData.category || 'Irrelevant';
    } else if (classification === 'underperforming') {
      category = 'Underperforming';
    } else if (classification === 'good') {
      category = 'Good Traffic';
    } else if (st.stat.verdict === 'INSUFFICIENT_DATA') {
      category = 'Monitoring';
    }

    const suggestedAction: ClassifiedTerm['suggestedAction'] =
      classification === 'wasteful' ? 'add_negative' :
      classification === 'underperforming' ? 'monitor' : 'keep';

    const wordCount = st.term.split(/\s+/).length;
    const suggestedMatchType: ClassifiedTerm['suggestedMatchType'] =
      isIrrelevant && aiData?.suggestedMatchType ? aiData.suggestedMatchType as ClassifiedTerm['suggestedMatchType'] :
      wordCount === 1 ? 'Exact' : wordCount <= 3 ? 'Phrase' : 'Exact';

    return {
      term: st.term,
      classification,
      reason,
      category,
      priority: (isIrrelevant ? 'high' : st.stat.confidence === 'high' ? 'medium' : 'low') as ClassifiedTerm['priority'],
      suggestedAction,
      suggestedMatchType,
      cost: st.cost,
      clicks: st.clicks,
      conversions: st.conversions,
    };
  });

  // Calculate wasted spend
  const totalWastedSpend = classifiedTerms
    .filter(t => t.classification === 'wasteful' || t.classification === 'underperforming')
    .reduce((s, t) => s + t.cost, 0);
  const wastePercentage = accountStats.totalSpend > 0
    ? (totalWastedSpend / accountStats.totalSpend) * 100
    : 0;

  // Deterministic health score from actual waste ratio
  const healthScore = Math.max(0, Math.min(100, Math.round(100 - wastePercentage * 1.5)));

  return {
    classifiedTerms,
    negativeRecommendations: parsed.negativeRecommendations || [],
    existingNegativeIssues: parsed.existingNegativeIssues || [],
    healthScore,
    totalWastedSpend: Math.round(totalWastedSpend * 100) / 100,
    wastePercentage: Math.round(wastePercentage * 10) / 10,
    summary: parsed.summary || '',
    keyInsights: parsed.keyInsights || [],
    accountStats,
  };
}
