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

  const prompt = `You are a Google Ads expert analyzing a search term report. Your job is to classify each search term and recommend negative keywords.

ACCOUNT STATS:
- Total terms: ${accountStats.totalTerms}
- Total spend: $${accountStats.totalSpend.toFixed(2)}
- Total conversions: ${accountStats.totalConversions}
- Avg CPA: $${accountStats.avgCpa.toFixed(2)}
- Avg CTR: ${accountStats.avgCtr.toFixed(1)}%
- Avg conversion rate: ${accountStats.avgConversionRate.toFixed(1)}%
- Non-converting spend: $${accountStats.nonConvertingSpend.toFixed(2)} (${accountStats.nonConvertingTermCount} terms)

SEARCH TERMS (sorted by spend, format: term | clicks | cost | conversions | ctr):
${termsBlock}${keywordsBlock}${negativesBlock}${businessBlock}${competitorsBlock}

INSTRUCTIONS:
1. Use the target keywords (if provided) to understand what the business WANTS to attract.
2. Use conversion data to identify what's actually working vs what's wasting money.
3. A term is "wasteful" if it has spend but is clearly irrelevant to the business intent, OR if it has significant spend with zero conversions and no plausible path to conversion.
4. A term is "underperforming" if it's somewhat relevant but has a CPA 2x+ the account average.
5. A term is "good" if it converts at or below the account average CPA.
6. For negative keywords, suggest the most protective match type: Exact for specific phrases, Phrase for patterns, Broad only for single generic words.
7. If existing negatives are provided, flag any that might be blocking relevant traffic (matching target keywords or converting search terms).

Respond in this exact JSON format:
{
  "classifiedTerms": [
    {"term": "...", "classification": "wasteful|underperforming|acceptable|good", "reason": "...", "category": "Job Seekers|DIY/Free|Competitor|Irrelevant|Low Intent|Geographic Mismatch|Negative Sentiment|Underperforming|Good Traffic", "priority": "high|medium|low", "suggestedAction": "add_negative|monitor|keep|optimize", "suggestedMatchType": "Broad|Phrase|Exact"}
  ],
  "negativeRecommendations": [
    {"keyword": "...", "matchType": "Broad|Phrase|Exact", "reason": "...", "category": "...", "priority": "high|medium|low", "source": "search_terms|pattern|industry"}
  ],
  "existingNegativeIssues": [
    {"keyword": "...", "matchType": "...", "issue": "unnecessary|wrong_match_type|too_broad|too_narrow", "reason": "...", "severity": "critical|warning|info", "suggestedFix": "..."}
  ],
  "healthScore": 0-100,
  "summary": "2-3 sentence overview of the account's search term health",
  "keyInsights": ["insight 1", "insight 2", "insight 3"]
}

Health score guide: 90-100 = excellent (minimal waste), 70-89 = good (some optimization needed), 50-69 = needs work (significant waste), 0-49 = critical (major waste problem).

Classify ALL provided search terms. For negativeRecommendations, include both terms from the report that should be negated AND common industry patterns you'd recommend based on the business context. Be specific and actionable.`;

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Extract JSON from the response (Claude may wrap it in markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AI analysis returned invalid format');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // Calculate wasted spend from classified terms
  const wastefulTerms = (parsed.classifiedTerms || []).filter(
    (t: ClassifiedTerm) => t.classification === 'wasteful' || t.classification === 'underperforming'
  );
  const totalWastedSpend = wastefulTerms.reduce((s: number, t: ClassifiedTerm) => {
    const match = searchTerms.find(st => st.term === t.term);
    return s + (match?.cost ?? 0);
  }, 0);
  const wastePercentage = accountStats.totalSpend > 0
    ? (totalWastedSpend / accountStats.totalSpend) * 100
    : 0;

  return {
    classifiedTerms: parsed.classifiedTerms || [],
    negativeRecommendations: parsed.negativeRecommendations || [],
    existingNegativeIssues: parsed.existingNegativeIssues || [],
    healthScore: parsed.healthScore ?? 50,
    totalWastedSpend: Math.round(totalWastedSpend * 100) / 100,
    wastePercentage: Math.round(wastePercentage * 10) / 10,
    summary: parsed.summary || '',
    keyInsights: parsed.keyInsights || [],
    accountStats,
  };
}
