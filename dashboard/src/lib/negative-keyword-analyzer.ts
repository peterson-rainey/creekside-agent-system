export interface NegativeKeyword {
  keyword: string;
  matchType: 'Broad' | 'Phrase' | 'Exact';
}

export interface Recommendation {
  keyword: string;
  matchType: 'Broad' | 'Phrase' | 'Exact';
  reason: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MatchTypeChange {
  keyword: string;
  currentMatchType: string;
  suggestedMatchType: string;
  reason: string;
}

export interface UnnecessaryKeyword {
  keyword: string;
  matchType: string;
  reason: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface AnalysisResult {
  missing: Recommendation[];
  unnecessary: UnnecessaryKeyword[];
  matchTypeChanges: MatchTypeChange[];
  summary: {
    totalAnalyzed: number;
    missingCount: number;
    unnecessaryCount: number;
    matchTypeChangeCount: number;
    detectedIndustry: string | null;
    healthScore: number; // 0-100
  };
}

// Common negative keywords organized by category
const COMMON_NEGATIVES: Record<string, { keywords: string[]; priority: 'high' | 'medium' | 'low'; reason: string }> = {
  'Job Seekers': {
    keywords: ['jobs', 'job', 'hiring', 'career', 'careers', 'salary', 'salaries', 'resume', 'employment', 'employer', 'recruit', 'recruiting', 'internship', 'intern', 'glassdoor', 'indeed', 'linkedin jobs', 'work from home', 'remote jobs', 'part time', 'full time job'],
    priority: 'high',
    reason: 'Filters out job seekers who are not looking for your services',
  },
  'Free / Cheap Seekers': {
    keywords: ['free', 'cheap', 'cheapest', 'discount', 'coupon', 'coupons', 'promo code', 'bargain', 'deal', 'deals', 'clearance', 'wholesale', 'budget'],
    priority: 'high',
    reason: 'Filters out users looking for free or heavily discounted services',
  },
  'DIY / Educational': {
    keywords: ['diy', 'how to', 'tutorial', 'tutorials', 'guide', 'template', 'templates', 'example', 'examples', 'sample', 'samples', 'course', 'courses', 'class', 'classes', 'training', 'certification', 'certificate', 'degree', 'school', 'university', 'college', 'homework', 'assignment'],
    priority: 'medium',
    reason: 'Filters out users looking to do it themselves rather than hire a professional',
  },
  'Informational Intent': {
    keywords: ['what is', 'definition', 'meaning', 'wiki', 'wikipedia', 'youtube', 'video', 'blog', 'article', 'news', 'history of', 'types of', 'vs', 'versus', 'comparison', 'review', 'reviews', 'reddit', 'forum', 'quora'],
    priority: 'medium',
    reason: 'Filters out research-phase users unlikely to convert',
  },
  'Unrelated Services': {
    keywords: ['software', 'app', 'download', 'install', 'login', 'sign in', 'password', 'reset', 'plugin', 'extension', 'api'],
    priority: 'low',
    reason: 'Filters out users looking for digital/software solutions',
  },
  'Geographic Mismatches': {
    keywords: ['near me alternatives', 'online only', 'virtual only', 'nationwide', 'international'],
    priority: 'low',
    reason: 'May filter out users outside your service area',
  },
  'Competitor Research': {
    keywords: ['competitor', 'competitors', 'alternative', 'alternatives', 'vs', 'compare', 'comparison', 'switch from', 'cancel'],
    priority: 'low',
    reason: 'Filters out users researching competitors (may want to keep some)',
  },
  'Negative Intent': {
    keywords: ['scam', 'scams', 'fraud', 'complaint', 'complaints', 'lawsuit', 'sue', 'ripoff', 'rip off', 'terrible', 'worst', 'bad', 'avoid'],
    priority: 'medium',
    reason: 'Filters out users with negative intent',
  },
};

// Industry-specific negatives
const INDUSTRY_NEGATIVES: Record<string, { keywords: string[]; reason: string }> = {
  dental: {
    keywords: ['dental school', 'dental assistant salary', 'dental hygienist school', 'dental insurance plans', 'dental code', 'dental malpractice'],
    reason: 'Common non-patient dental searches',
  },
  legal: {
    keywords: ['law school', 'bar exam', 'legal definition', 'legal aid free', 'pro bono', 'paralegal salary', 'lsat'],
    reason: 'Common non-client legal searches',
  },
  hvac: {
    keywords: ['hvac technician salary', 'hvac school', 'hvac certification', 'hvac manual', 'hvac diagram', 'diy hvac'],
    reason: 'Common non-customer HVAC searches',
  },
  plumbing: {
    keywords: ['plumber salary', 'plumbing code', 'plumbing diagram', 'plumbing school', 'diy plumbing', 'plumbing certification'],
    reason: 'Common non-customer plumbing searches',
  },
  roofing: {
    keywords: ['roofing salary', 'roofing license', 'roofing material calculator', 'diy roofing', 'roofing nail gun'],
    reason: 'Common non-customer roofing searches',
  },
  'real estate': {
    keywords: ['real estate license', 'real estate exam', 'real estate school', 'zillow', 'trulia', 'redfin', 'real estate agent salary'],
    reason: 'Common non-buyer/seller real estate searches',
  },
  medical: {
    keywords: ['medical school', 'nursing salary', 'medical terminology', 'medical coding', 'symptoms', 'webmd', 'home remedy'],
    reason: 'Common non-patient medical searches',
  },
  automotive: {
    keywords: ['mechanic salary', 'auto parts store', 'junkyard', 'diy car repair', 'car manual', 'obd code'],
    reason: 'Common non-customer automotive searches',
  },
  ecommerce: {
    keywords: ['dropshipping', 'alibaba', 'wholesale lot', 'supplier', 'manufacturer', 'bulk buy resale'],
    reason: 'Common non-buyer ecommerce searches',
  },
  'digital marketing': {
    keywords: ['marketing degree', 'marketing internship', 'marketing salary', 'free marketing tools', 'marketing template'],
    reason: 'Common non-client marketing searches',
  },
  fitness: {
    keywords: ['personal trainer salary', 'fitness certification', 'home workout free', 'youtube workout', 'fitness app free'],
    reason: 'Common non-member fitness searches',
  },
  insurance: {
    keywords: ['insurance agent salary', 'insurance license', 'insurance exam', 'free insurance', 'government insurance'],
    reason: 'Common non-customer insurance searches',
  },
  accounting: {
    keywords: ['cpa exam', 'accounting degree', 'bookkeeping course', 'free tax filing', 'turbotax', 'accounting software free'],
    reason: 'Common non-client accounting searches',
  },
  restaurant: {
    keywords: ['restaurant jobs', 'server salary', 'food handler', 'health inspection', 'restaurant supply wholesale'],
    reason: 'Common non-diner restaurant searches',
  },
  'home services': {
    keywords: ['contractor license', 'diy renovation', 'home improvement loan', 'building permit', 'building code'],
    reason: 'Common non-customer home services searches',
  },
};

export function parseNegativeKeywordList(text: string): NegativeKeyword[] {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const keywords: NegativeKeyword[] = [];

  // Skip header/metadata rows common in Google Ads exports
  const headerPatterns = /^(keyword|criteria|campaign|ad group|account|match type|criterion type|negative|report|date range|level|level name)/i;

  for (const line of lines) {
    if (headerPatterns.test(line)) continue;
    // Skip total/summary rows
    if (line.toLowerCase().startsWith('total') || line.startsWith('--')) continue;

    // Detect delimiter: tab (Google Ads Editor) or comma (CSV)
    const delimiter = line.includes('\t') ? '\t' : ',';
    const parts = line.split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));
    let keyword = parts[0];
    let matchType: 'Broad' | 'Phrase' | 'Exact' = 'Broad';

    // Check for match type in columns — handle Google Ads Editor "Criterion Type" format
    // Values: "Negative broad", "Negative phrase", "Negative exact", or bare "Broad"/"Phrase"/"Exact"
    if (parts.length > 1) {
      for (const p of parts) {
        const lower = p.toLowerCase().trim();
        if (lower === 'exact' || lower === 'negative exact' || lower.includes('exact match')) {
          matchType = 'Exact'; break;
        }
        if (lower === 'phrase' || lower === 'negative phrase' || lower.includes('phrase match')) {
          matchType = 'Phrase'; break;
        }
        if (lower === 'broad' || lower === 'negative broad' || lower.includes('broad match')) {
          matchType = 'Broad'; break;
        }
      }

      // For Google Ads Editor format: Campaign | Ad Group | Keyword | Criterion Type
      // The keyword may not be in the first column
      if (parts.length >= 3) {
        const criterionIdx = parts.findIndex(p =>
          /^negative (broad|phrase|exact)$/i.test(p.trim())
        );
        if (criterionIdx > 0) {
          // Keyword is typically the column before Criterion Type
          keyword = parts[criterionIdx - 1];
        }
      }
    }

    // Check for Google Ads plain text format: [exact], "phrase", broad
    if (keyword.startsWith('[') && keyword.endsWith(']')) {
      keyword = keyword.slice(1, -1);
      matchType = 'Exact';
    } else if (keyword.startsWith('"') && keyword.endsWith('"')) {
      keyword = keyword.slice(1, -1);
      matchType = 'Phrase';
    }

    if (keyword && keyword.length > 0 && !headerPatterns.test(keyword)) {
      keywords.push({ keyword: keyword.toLowerCase(), matchType });
    }
  }

  return keywords;
}

export function analyzeNegativeKeywords(
  existingKeywords: NegativeKeyword[],
  businessKeywords: string[],
  services: string[],
  industry: string | null,
): AnalysisResult {
  const existingSet = new Set(existingKeywords.map(k => k.keyword.toLowerCase()));

  // 1. Find missing negatives
  const missing: Recommendation[] = [];

  for (const [category, data] of Object.entries(COMMON_NEGATIVES)) {
    for (const kw of data.keywords) {
      if (!existingSet.has(kw.toLowerCase())) {
        // Check it doesn't conflict with the business
        const conflictsWithBusiness = businessKeywords.some(bk =>
          kw.toLowerCase().includes(bk) || bk.includes(kw.toLowerCase())
        ) || services.some(s =>
          kw.toLowerCase().includes(s) || s.includes(kw.toLowerCase())
        );

        if (!conflictsWithBusiness) {
          missing.push({
            keyword: kw,
            matchType: kw.includes(' ') ? 'Phrase' : 'Broad',
            reason: data.reason,
            category,
            priority: data.priority,
          });
        }
      }
    }
  }

  // Add industry-specific suggestions
  if (industry && INDUSTRY_NEGATIVES[industry]) {
    const industryData = INDUSTRY_NEGATIVES[industry];
    for (const kw of industryData.keywords) {
      if (!existingSet.has(kw.toLowerCase())) {
        const conflictsWithBusiness = businessKeywords.some(bk =>
          kw.toLowerCase().includes(bk) || bk.includes(kw.toLowerCase())
        ) || services.some(s =>
          kw.toLowerCase().includes(s) || s.includes(kw.toLowerCase())
        );

        if (!conflictsWithBusiness) {
          missing.push({
            keyword: kw,
            matchType: kw.includes(' ') ? 'Phrase' : 'Broad',
            reason: industryData.reason,
            category: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry`,
            priority: 'medium',
          });
        }
      }
    }
  }

  // 2. Find unnecessary negatives (blocking relevant traffic)
  const unnecessary: UnnecessaryKeyword[] = [];

  for (const nk of existingKeywords) {
    const lower = nk.keyword.toLowerCase();

    // Check if negative matches business services
    const matchingService = services.find(s =>
      s.includes(lower) || lower.includes(s)
    );

    const matchingKeyword = businessKeywords.slice(0, 20).find(bk =>
      bk === lower || (lower.length > 4 && bk.includes(lower))
    );

    if (matchingService) {
      unnecessary.push({
        keyword: nk.keyword,
        matchType: nk.matchType,
        reason: `This negative may block searches for your service: "${matchingService}"`,
        severity: 'critical',
      });
    } else if (matchingKeyword) {
      unnecessary.push({
        keyword: nk.keyword,
        matchType: nk.matchType,
        reason: `This keyword appears frequently on your website, suggesting it's relevant to your business`,
        severity: 'warning',
      });
    }

    // Flag very short broad match negatives (too aggressive)
    if (nk.matchType === 'Broad' && lower.split(' ').length === 1 && lower.length <= 4) {
      unnecessary.push({
        keyword: nk.keyword,
        matchType: nk.matchType,
        reason: `Single short word on Broad match is very aggressive — may block relevant traffic`,
        severity: 'warning',
      });
    }
  }

  // 3. Match type recommendations
  const matchTypeChanges: MatchTypeChange[] = [];

  for (const nk of existingKeywords) {
    const wordCount = nk.keyword.split(' ').length;

    // Single generic words on Broad — suggest Phrase or Exact
    if (nk.matchType === 'Broad' && wordCount === 1 && nk.keyword.length > 4) {
      matchTypeChanges.push({
        keyword: nk.keyword,
        currentMatchType: nk.matchType,
        suggestedMatchType: 'Exact',
        reason: 'Single-word Broad match negatives can be too aggressive. Consider Exact match to be more precise.',
      });
    }

    // Multi-word phrases on Exact — might be too narrow
    if (nk.matchType === 'Exact' && wordCount >= 4) {
      matchTypeChanges.push({
        keyword: nk.keyword,
        currentMatchType: nk.matchType,
        suggestedMatchType: 'Phrase',
        reason: 'Long exact match negatives are very narrow. Phrase match would catch more variations.',
      });
    }

    // Two-word phrases on Broad — suggest Phrase
    if (nk.matchType === 'Broad' && wordCount === 2) {
      matchTypeChanges.push({
        keyword: nk.keyword,
        currentMatchType: nk.matchType,
        suggestedMatchType: 'Phrase',
        reason: 'Two-word Broad negatives can block unintended queries. Phrase match is safer.',
      });
    }
  }

  // Calculate health score
  const totalIssues = missing.filter(m => m.priority === 'high').length
    + unnecessary.filter(u => u.severity === 'critical').length * 3
    + unnecessary.filter(u => u.severity === 'warning').length;

  const healthScore = Math.max(0, Math.min(100,
    100 - (totalIssues * 3) - (missing.length > 50 ? 20 : 0) - (existingKeywords.length === 0 ? 30 : 0)
  ));

  // Sort missing by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  missing.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return {
    missing,
    unnecessary,
    matchTypeChanges,
    summary: {
      totalAnalyzed: existingKeywords.length,
      missingCount: missing.length,
      unnecessaryCount: unnecessary.length,
      matchTypeChangeCount: matchTypeChanges.length,
      detectedIndustry: industry,
      healthScore,
    },
  };
}

export function generateGoogleAdsCSV(keywords: NegativeKeyword[]): string {
  const lines = ['Keyword'];

  for (const kw of keywords) {
    switch (kw.matchType) {
      case 'Exact':
        lines.push(`[${kw.keyword}]`);
        break;
      case 'Phrase':
        lines.push(`"${kw.keyword}"`);
        break;
      case 'Broad':
      default:
        lines.push(kw.keyword);
        break;
    }
  }

  return lines.join('\n');
}

export function generateGoogleAdsEditorCSV(keywords: NegativeKeyword[], campaignName?: string): string {
  // Google Ads Editor expects tab-separated values with "Criterion Type" column
  // Values must be "Negative broad", "Negative phrase", or "Negative exact"
  const lines = ['Campaign\tAd Group\tKeyword\tCriterion Type'];

  for (const kw of keywords) {
    const campaign = campaignName || '';
    const criterionType = `Negative ${kw.matchType.toLowerCase()}`;
    lines.push(`${campaign}\t\t${kw.keyword}\t${criterionType}`);
  }

  return lines.join('\n');
}
