export interface SearchTerm {
  term: string;
  matchType: string;
  clicks: number;
  impressions: number;
  cost: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}

export interface WastefulTerm {
  term: string;
  reason: string;
  wastedSpend: number;
  clicks: number;
  impressions: number;
  conversions: number;
  suggestedMatchType: 'Broad' | 'Phrase' | 'Exact';
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface SearchTermAnalysis {
  wastefulTerms: WastefulTerm[];
  totalSpendAnalyzed: number;
  totalWastedSpend: number;
  wastePercentage: number;
  termCount: number;
}

// Auto-detect if the uploaded text is a search term report or a negative keyword list
export function detectUploadType(text: string): 'search_terms' | 'negative_keywords' {
  // Check first 10 lines for report-style headers
  const lines = text.split('\n').slice(0, 10);
  for (const line of lines) {
    const lower = line.toLowerCase();
    // Require multiple column headers on the same line (avoids matching "Search terms report" title)
    if (lower.includes('impr.') || lower.includes('impressions') ||
        (lower.includes('clicks') && lower.includes('cost')) ||
        (lower.includes('search term,') && lower.includes('clicks'))) {
      return 'search_terms';
    }
  }
  // Check if multiple lines have numeric columns (looks like a report)
  const hasNumericColumns = lines.filter(l => {
    const parts = l.split(/[,\t]/);
    return parts.length >= 4 && parts.some(p => /^\$?[\d,.]+%?$/.test(p.trim()));
  }).length >= 2;
  if (hasNumericColumns) return 'search_terms';
  return 'negative_keywords';
}

// Find the actual header row, skipping Google Ads metadata rows (report title, date range).
// Requires multiple column-header keywords on the same line to avoid matching the report title
// (e.g. "Search terms report" is NOT the header; "Search term,Match type,Clicks,..." IS).
function findHeaderRow(lines: string[]): number {
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const lower = lines[i].toLowerCase();
    // Count how many known column headers appear on this line
    const markers = [
      'clicks', 'impr.', 'impressions', 'cost', 'ctr',
      'conversions', 'conv.', 'match type', 'avg. cpc',
    ];
    const matchCount = markers.filter(m => lower.includes(m)).length;
    // A real header row contains at least 3 of these
    if (matchCount >= 3) return i;

    // Fallback: "search term" as a comma/tab-delimited column (not just in the title)
    if ((lower.includes('search term,') || lower.includes('search term\t') || lower.includes('search query,') || lower.includes('search query\t'))
        && (lower.includes('clicks') || lower.includes('impr'))) {
      return i;
    }
  }
  return 0; // Fallback to first line
}

// Parse search term report from Google Ads (handles CSV, TSV, metadata rows, currency formatting)
export function parseSearchTermReport(text: string): SearchTerm[] {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  // Find actual header row (skip metadata)
  const headerIndex = findHeaderRow(lines);

  // Detect delimiter from the header row
  const delimiter = lines[headerIndex].includes('\t') ? '\t' : ',';

  // Parse header to find column indices
  const headerParts = lines[headerIndex].split(delimiter).map(h => h.trim().toLowerCase().replace(/['"]/g, ''));

  const colMap: Record<string, number> = {};
  headerParts.forEach((h, i) => {
    if (h.includes('search term') || h === 'keyword' || h === 'search query') colMap.term = i;
    if (h === 'match type') colMap.matchType = i;
    if (h === 'clicks' || h === 'click') colMap.clicks = i;
    if (h === 'impr.' || h === 'impressions' || h === 'impr') colMap.impressions = i;
    if ((h === 'cost' || h.includes('spend')) && !h.includes('conv') && !h.includes('/')) colMap.cost = i;
    if (h === 'conversions' || h === 'conv.' || h === 'conv') colMap.conversions = i;
    if (h === 'ctr' || h.includes('click-through') || h.includes('click through')) colMap.ctr = i;
    if (h.includes('conv. rate') || h.includes('conversion rate') || h === 'conv rate') colMap.conversionRate = i;
    if (h === 'avg. cpc' || h === 'avg cpc' || h === 'average cpc') colMap.avgCpc = i;
  });

  // If no term column found, try first column
  if (colMap.term === undefined) colMap.term = 0;

  const terms: SearchTerm[] = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();

    // Skip summary/total rows and trailing metadata
    if (lineLower.startsWith('total') || line.startsWith('--') ||
        lineLower.startsWith('report') || lineLower.startsWith('date range') ||
        lineLower.startsWith('note:')) continue;

    // Handle CSV with quoted fields containing commas
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter.charAt(0) && !inQuotes) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current.trim());

    // Parse numeric values, stripping $, commas, %, and quotes
    const parseNum = (idx: number | undefined): number => {
      if (idx === undefined || idx >= parts.length) return 0;
      const val = parts[idx].replace(/[$,%'"]/g, '').replace(/,/g, '').trim();
      return parseFloat(val) || 0;
    };

    const term = parts[colMap.term]?.replace(/^["']|["']$/g, '').trim();
    if (!term || term.length === 0) continue;

    // Normalize match type from Google Ads format
    // Google Ads exports: "Broad match", "Exact match", "Phrase match",
    // "Exact match (close variant)", "Phrase match (close variant)", "AI Max", "Performance Max"
    let rawMatchType = colMap.matchType !== undefined ? parts[colMap.matchType]?.replace(/['"]/g, '').trim() || '' : '';
    let matchType = 'Broad';
    if (rawMatchType.toLowerCase().includes('exact')) matchType = 'Exact';
    else if (rawMatchType.toLowerCase().includes('phrase')) matchType = 'Phrase';
    else if (rawMatchType.toLowerCase().includes('broad')) matchType = 'Broad';

    terms.push({
      term,
      matchType,
      clicks: parseNum(colMap.clicks),
      impressions: parseNum(colMap.impressions),
      cost: parseNum(colMap.cost),
      conversions: parseNum(colMap.conversions),
      ctr: parseNum(colMap.ctr),
      conversionRate: parseNum(colMap.conversionRate),
    });
  }

  return terms;
}

export function analyzeSearchTerms(
  terms: SearchTerm[],
  businessKeywords: string[],
  services: string[],
  industry: string | null,
  competitors: string[],
): SearchTermAnalysis {
  const businessSet = new Set([...businessKeywords, ...services].map(k => k.toLowerCase()));
  const wasteful: WastefulTerm[] = [];
  let totalSpend = 0;
  let totalWaste = 0;

  for (const term of terms) {
    totalSpend += term.cost;
    const lower = term.term.toLowerCase();
    let isWasteful = false;
    let reason = '';
    let category = '';
    let priority: 'high' | 'medium' | 'low' = 'medium';

    // High-spend, zero-conversion terms
    if (term.cost > 0 && term.conversions === 0 && term.clicks >= 3) {
      isWasteful = true;
      reason = `Spent $${term.cost.toFixed(2)} with ${term.clicks} clicks and zero conversions`;
      category = 'Zero Conversions';
      priority = term.cost > 50 ? 'high' : term.cost > 10 ? 'medium' : 'low';
    }

    // Job seeker terms
    const jobTerms = ['job', 'jobs', 'hiring', 'career', 'salary', 'resume', 'employment', 'intern', 'internship'];
    if (jobTerms.some(j => lower.includes(j))) {
      isWasteful = true;
      reason = `Job-seeker search term — unlikely to convert to a customer`;
      category = 'Job Seekers';
      priority = 'high';
    }

    // DIY / Free / Informational
    const diyTerms = ['how to', 'diy', 'tutorial', 'free', 'cheap', 'template', 'sample', 'example', 'what is', 'definition', 'wiki', 'reddit', 'youtube'];
    if (diyTerms.some(d => lower.includes(d))) {
      isWasteful = true;
      reason = `Informational/DIY search — user is researching, not buying`;
      category = 'Informational/DIY';
      priority = term.cost > 10 ? 'high' : 'medium';
    }

    // Competitor brand terms (if provided)
    if (competitors.length > 0) {
      const matchedCompetitor = competitors.find(c => lower.includes(c.toLowerCase()));
      if (matchedCompetitor) {
        isWasteful = true;
        reason = `Contains competitor name "${matchedCompetitor}" — may waste spend on competitor shoppers`;
        category = 'Competitor Terms';
        priority = 'medium';
      }
    }

    // Completely irrelevant to business (no keyword overlap at all)
    if (!isWasteful && term.conversions === 0 && term.clicks >= 2) {
      const words = lower.split(/\s+/);
      const hasBusinessRelevance = words.some(w =>
        w.length > 3 && [...businessSet].some(bk => bk.includes(w) || w.includes(bk))
      );
      if (!hasBusinessRelevance) {
        isWasteful = true;
        reason = `No keyword overlap with your business — likely irrelevant traffic`;
        category = 'Irrelevant';
        priority = term.cost > 20 ? 'high' : term.cost > 5 ? 'medium' : 'low';
      }
    }

    // Negative intent
    const negativeTerms = ['scam', 'fraud', 'lawsuit', 'complaint', 'worst', 'terrible', 'ripoff'];
    if (negativeTerms.some(n => lower.includes(n))) {
      isWasteful = true;
      reason = `Negative sentiment search — will not convert`;
      category = 'Negative Intent';
      priority = 'high';
    }

    if (isWasteful) {
      totalWaste += term.cost;
      // Determine best match type for the negative
      const wordCount = term.term.split(/\s+/).length;
      let suggestedMatchType: 'Broad' | 'Phrase' | 'Exact' = 'Phrase';
      if (wordCount === 1) suggestedMatchType = 'Exact';
      if (wordCount >= 4) suggestedMatchType = 'Exact'; // Very specific, use exact

      wasteful.push({
        term: term.term,
        reason,
        wastedSpend: term.cost,
        clicks: term.clicks,
        impressions: term.impressions,
        conversions: term.conversions,
        suggestedMatchType,
        priority,
        category,
      });
    }
  }

  // Sort by wasted spend descending, then by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  wasteful.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.wastedSpend - a.wastedSpend;
  });

  return {
    wastefulTerms: wasteful,
    totalSpendAnalyzed: totalSpend,
    totalWastedSpend: totalWaste,
    wastePercentage: totalSpend > 0 ? (totalWaste / totalSpend) * 100 : 0,
    termCount: terms.length,
  };
}
