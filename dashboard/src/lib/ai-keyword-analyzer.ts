/**
 * AI-powered keyword analysis engine.
 *
 * This module sends structured search/keyword data to Claude for classification.
 * Code handles parsing and formatting; AI handles classification.
 *
 * CANNOT: classify terms on its own, access external APIs, or write to the database.
 */
import Anthropic from '@anthropic-ai/sdk';

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

  // Build a compact data representation (limit to 300 terms to control token cost)
  // Prioritize: highest spend first, then include a mix of converting and non-converting
  const sorted = [...searchTerms].sort((a, b) => b.cost - a.cost);
  const topTerms = sorted.slice(0, 300);

  const termsBlock = topTerms.map(t =>
    `${t.term} | clicks:${t.clicks} | cost:$${t.cost.toFixed(2)} | conv:${t.conversions} | ctr:${(t.ctr).toFixed(1)}%`
  ).join('\n');

  const keywordsBlock = keywordList?.length
    ? `\n\nTARGET KEYWORDS (what the business is intentionally bidding on):\n${keywordList.slice(0, 200).join('\n')}`
    : '';

  const negativesBlock = existingNegatives?.length
    ? `\n\nCURRENT NEGATIVE KEYWORDS:\n${existingNegatives.slice(0, 200).map(n => `${n.keyword} [${n.matchType}]`).join('\n')}`
    : '';

  const businessBlock = businessDescription
    ? `\n\nBUSINESS DESCRIPTION:\n${businessDescription.slice(0, 500)}`
    : '';

  const competitorsBlock = competitors?.length
    ? `\n\nKNOWN COMPETITORS: ${competitors.join(', ')}`
    : '';

  const prompt = `You are a Google Ads expert analyzing a search term report. Identify problematic search terms and recommend negative keywords.

ACCOUNT STATS:
- Total terms: ${accountStats.totalTerms}
- Total spend: $${accountStats.totalSpend.toFixed(2)}
- Total conversions: ${accountStats.totalConversions}
- Avg CPA: ${accountStats.avgCpa > 0 ? '$' + accountStats.avgCpa.toFixed(2) : 'N/A (zero conversions)'}
- Avg CTR: ${accountStats.avgCtr.toFixed(1)}%
- Avg conversion rate: ${accountStats.avgConversionRate.toFixed(1)}%
- Non-converting spend: $${accountStats.nonConvertingSpend.toFixed(2)} (${accountStats.nonConvertingTermCount} terms)

SEARCH TERMS (sorted by spend, format: term | clicks | cost | conversions | ctr):
${termsBlock}${keywordsBlock}${negativesBlock}${businessBlock}${competitorsBlock}

INSTRUCTIONS:
1. Use the target keywords (if provided) to understand what the business WANTS to attract. Use the business description (if provided) to understand the business context — what they sell, who they serve, and what's relevant to them.
2. Use conversion data to identify what's actually working vs what's wasting money.
3. If the account has ZERO conversions across all terms, focus on identifying terms that are clearly irrelevant to the business intent. Do not classify zero-conversion terms as underperforming just because they have no conversions — focus on RELEVANCE to the business, not conversion metrics.
4. A term is "wasteful" if it is clearly irrelevant to the business intent (job seekers, DIY, competitors, wrong industry, wrong geography, informational queries that will never convert like "what is..." or "definition of...").
5. A term is "underperforming" ONLY if it meets ALL of these criteria: (a) it has 5+ clicks, (b) it has meaningful spend (more than $10 or more than the average CPA), AND (c) it has zero conversions despite being somewhat relevant. Do NOT flag terms with 1-4 clicks as underperforming — there is not enough data to judge. Do NOT flag low CTR as a problem by itself — CTR depends heavily on match type and competition, not relevance.
6. Only list terms you are flagging as wasteful or underperforming. Do NOT list acceptable or good terms — they are determined automatically from whatever you don't flag.
7. For negative keywords, suggest the most protective match type: Exact for specific phrases, Phrase for patterns, Broad only for single generic words.
8. If existing negatives are provided, flag any that might be blocking relevant traffic.
9. When writing reasons, reference actual dollar amounts and metrics from the data. Do NOT say "low CTR" unless the CTR is genuinely low relative to the account average. Do NOT say "high cost" unless the cost is meaningfully high relative to the account's average CPA or total spend.

Respond in this exact JSON format:
{
  "flaggedTerms": [
    {"term": "exact term from the list above", "classification": "wasteful|underperforming", "reason": "...", "category": "Job Seekers|DIY/Free|Competitor|Irrelevant|Low Intent|Geographic Mismatch|Negative Sentiment|Underperforming", "priority": "high|medium|low", "suggestedAction": "add_negative|monitor", "suggestedMatchType": "Broad|Phrase|Exact"}
  ],
  "negativeRecommendations": [
    {"keyword": "...", "matchType": "Broad|Phrase|Exact", "reason": "...", "category": "...", "priority": "high|medium|low", "source": "search_terms|pattern|industry"}
  ],
  "existingNegativeIssues": [
    {"keyword": "...", "matchType": "...", "issue": "unnecessary|wrong_match_type|too_broad|too_narrow", "reason": "...", "severity": "critical|warning|info", "suggestedFix": "..."}
  ],
  "summary": "2-3 sentence overview of the account's search term health",
  "keyInsights": ["insight 1", "insight 2", "insight 3"]
}

Be thorough — flag ALL wasteful and underperforming terms, not just a sample. For negativeRecommendations, include terms from the report that should be negated AND common industry patterns. Be specific and actionable.`;

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Extract JSON from the response (Claude may wrap it in markdown code blocks)
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

  // Build a lookup of flagged terms by name
  const flaggedByTerm = new Map<string, { classification: string; reason: string; category: string; priority: string; suggestedAction: string; suggestedMatchType: string }>();
  for (const ft of (parsed.flaggedTerms || [])) {
    flaggedByTerm.set(ft.term?.toLowerCase(), ft);
  }

  // Build full classified terms list by joining AI flags with parsed performance data
  const classifiedTerms: ClassifiedTerm[] = topTerms.map(st => {
    const flagged = flaggedByTerm.get(st.term.toLowerCase());
    if (flagged) {
      return {
        term: st.term,
        classification: flagged.classification as ClassifiedTerm['classification'],
        reason: flagged.reason || '',
        category: flagged.category || 'Flagged',
        priority: (flagged.priority || 'medium') as ClassifiedTerm['priority'],
        suggestedAction: (flagged.suggestedAction || 'add_negative') as ClassifiedTerm['suggestedAction'],
        suggestedMatchType: (flagged.suggestedMatchType || 'Phrase') as ClassifiedTerm['suggestedMatchType'],
        cost: st.cost,
        clicks: st.clicks,
        conversions: st.conversions,
      };
    }
    // Unflagged: classify based on conversion data
    const isGood = st.conversions > 0;
    return {
      term: st.term,
      classification: isGood ? 'good' as const : 'acceptable' as const,
      reason: isGood ? 'Generating conversions' : 'Not flagged as problematic',
      category: isGood ? 'Good Traffic' : 'Acceptable',
      priority: 'low' as const,
      suggestedAction: 'keep' as const,
      suggestedMatchType: 'Phrase' as const,
      cost: st.cost,
      clicks: st.clicks,
      conversions: st.conversions,
    };
  });

  // Calculate wasted spend from flagged terms using actual parsed data
  const totalWastedSpend = classifiedTerms
    .filter(t => t.classification === 'wasteful' || t.classification === 'underperforming')
    .reduce((s, t) => s + t.cost, 0);
  const wastePercentage = accountStats.totalSpend > 0
    ? (totalWastedSpend / accountStats.totalSpend) * 100
    : 0;

  // Deterministic health score from actual waste ratio
  // 0% waste = 100, 15% waste = 78, 30% waste = 55, 50% waste = 25, 67%+ waste = 0
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
