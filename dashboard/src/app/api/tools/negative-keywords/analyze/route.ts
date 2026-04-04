import { NextRequest, NextResponse } from 'next/server';
import { analyzeNegativeKeywords, parseNegativeKeywordList } from '@/lib/negative-keyword-analyzer';
import { parseSearchTermReport, analyzeSearchTerms, detectUploadType } from '@/lib/search-term-analyzer';
import { getClaudeAnalysis } from '@/lib/claude-analysis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const rawText = body.rawKeywordText || body.keywords;
    const businessKeywords = body.businessKeywords || body.siteContext?.keywords || [];
    const services = body.services || body.siteContext?.services || [];
    const industry = body.industry || body.siteContext?.industry || null;
    const businessName = body.businessName || body.siteContext?.businessName || 'Unknown';
    const businessDescription = body.businessDescription || body.siteContext?.description || '';
    const competitors: string[] = body.competitors || [];
    const manualDescription = body.manualDescription || '';

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json({ error: 'Keyword list or search term report is required' }, { status: 400 });
    }

    // Use manual description to supplement business context if provided
    const effectiveServices = manualDescription
      ? [...services, ...manualDescription.toLowerCase().split(/[,.\n]+/).map((s: string) => s.trim()).filter(Boolean)]
      : services;
    const effectiveDescription = manualDescription || businessDescription;

    // Auto-detect upload type
    const uploadType = body.uploadType || detectUploadType(rawText);

    let result;

    if (uploadType === 'search_terms') {
      // Parse and analyze search term report
      const searchTerms = parseSearchTermReport(rawText);

      if (searchTerms.length === 0) {
        return NextResponse.json({
          error: 'Could not parse search term report. Please check the file format — it should include columns like Search term, Clicks, Cost, etc.'
        }, { status: 400 });
      }

      const searchAnalysis = analyzeSearchTerms(searchTerms, businessKeywords, effectiveServices, industry, competitors);

      // Also run Claude analysis in parallel (non-blocking)
      const claudePromise = getClaudeAnalysis({
        businessName,
        businessDescription: effectiveDescription,
        industry,
        services: effectiveServices,
        keywords: searchTerms.map(t => t.term),
        competitors,
        uploadType,
      });

      const claudeInsights = await claudePromise;

      // Remap field names for frontend consumption
      const remappedTerms = searchAnalysis.wastefulTerms.map(t => ({
        searchTerm: t.term,
        category: t.category,
        priority: t.priority,
        cost: t.wastedSpend,
        clicks: t.clicks,
        impressions: t.impressions,
        conversions: t.conversions,
        reason: t.reason,
        suggestedMatchType: t.suggestedMatchType,
      }));

      result = {
        uploadType: 'search_terms',
        wastefulTerms: remappedTerms,
        totalSpendAnalyzed: searchAnalysis.totalSpendAnalyzed,
        totalWastedSpend: searchAnalysis.totalWastedSpend,
        wastePercentage: Math.round(searchAnalysis.wastePercentage * 10) / 10,
        termCount: searchAnalysis.termCount,
        healthScore: Math.max(0, Math.round(100 - searchAnalysis.wastePercentage * 1.5)),
        detectedIndustry: industry || 'Not detected',
        claudeInsights,
      };
    } else {
      // Existing negative keyword list analysis
      const parsedKeywords = parseNegativeKeywordList(rawText);
      const analysis = analyzeNegativeKeywords(parsedKeywords, businessKeywords, effectiveServices, industry);

      // Generate competitor negatives
      const competitorNegatives = competitors.flatMap(comp => {
        const lower = comp.toLowerCase().trim();
        if (!lower) return [];
        return [
          { keyword: lower, matchType: 'Phrase' as const, reason: `Competitor brand: ${comp}`, category: 'Competitor Brands', priority: 'medium' as const },
          { keyword: `${lower} reviews`, matchType: 'Phrase' as const, reason: `Competitor review search: ${comp}`, category: 'Competitor Brands', priority: 'medium' as const },
          { keyword: `${lower} pricing`, matchType: 'Phrase' as const, reason: `Competitor pricing search: ${comp}`, category: 'Competitor Brands', priority: 'low' as const },
          { keyword: `${lower} vs`, matchType: 'Phrase' as const, reason: `Competitor comparison: ${comp}`, category: 'Competitor Brands', priority: 'low' as const },
        ].filter(neg => !parsedKeywords.some(pk => pk.keyword.toLowerCase() === neg.keyword));
      });

      // Run Claude analysis
      const claudeInsights = await getClaudeAnalysis({
        businessName,
        businessDescription: effectiveDescription,
        industry,
        services: effectiveServices,
        keywords: parsedKeywords.map(k => k.keyword),
        competitors,
        uploadType,
      });

      result = {
        uploadType: 'negative_keywords',
        parsedKeywords,
        missing: [...analysis.missing, ...competitorNegatives],
        unnecessary: analysis.unnecessary,
        matchTypeChanges: analysis.matchTypeChanges,
        healthScore: analysis.summary.healthScore,
        totalAnalyzed: analysis.summary.totalAnalyzed,
        issuesFound: analysis.summary.missingCount + analysis.summary.unnecessaryCount + analysis.summary.matchTypeChangeCount + competitorNegatives.length,
        detectedIndustry: analysis.summary.detectedIndustry || 'Not detected',
        claudeInsights,
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
