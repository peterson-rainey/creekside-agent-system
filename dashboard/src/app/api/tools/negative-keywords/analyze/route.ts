/**
 * Negative keyword analysis API route.
 *
 * Flow: Parse uploads → compute stats → AI classifies → format response.
 * Code handles parsing/formatting. AI handles classification.
 *
 * CANNOT: classify terms without AI, access external APIs beyond Claude.
 */
import { NextRequest, NextResponse } from 'next/server';
import { parseSearchTermReport } from '@/lib/search-term-analyzer';
import { parseNegativeKeywordList } from '@/lib/negative-keyword-analyzer';
import { analyzeWithAI, computeAccountStats } from '@/lib/ai-keyword-analyzer';
import { checkRateLimit } from '@/lib/utils/rate-limiter';

const MAX_TERMS = 500; // Limit for free tool; larger reports → AI interview upsell

export async function POST(request: NextRequest) {
  // Rate limit
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, 'insights');
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();

    // ── Parse inputs ──────────────────────────────────────────────────
    const searchTermText: string = body.searchTermText || body.keywords || '';
    const keywordListText: string = body.keywordListText || '';
    const negativeListText: string = body.negativeListText || '';
    const businessDescription: string = body.businessDescription || body.manualDescription || '';
    const competitors: string[] = (body.competitors || []).filter(Boolean);

    if (!searchTermText.trim() && !negativeListText.trim()) {
      return NextResponse.json(
        { error: 'Please upload a search term report or negative keyword list.' },
        { status: 400 },
      );
    }

    // ── Parse search terms ────────────────────────────────────────────
    let searchTerms = searchTermText.trim()
      ? parseSearchTermReport(searchTermText)
      : [];

    if (searchTermText.trim() && searchTerms.length === 0) {
      return NextResponse.json(
        { error: 'Could not parse search term report. Please check the format — it should include columns like Search term, Clicks, Cost, etc.' },
        { status: 400 },
      );
    }

    // Cap for free tool
    const wasLimited = searchTerms.length > MAX_TERMS;
    if (wasLimited) {
      // Keep the highest-spend terms for the most useful analysis
      searchTerms = searchTerms.sort((a, b) => b.cost - a.cost).slice(0, MAX_TERMS);
    }

    // ── Parse keyword list (optional) ─────────────────────────────────
    const keywordList = keywordListText.trim()
      ? keywordListText.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 500)
      : undefined;

    // ── Parse existing negatives (optional) ───────────────────────────
    const existingNegatives = negativeListText.trim()
      ? parseNegativeKeywordList(negativeListText)
      : undefined;

    // ── Compute account stats ─────────────────────────────────────────
    const accountStats = computeAccountStats(searchTerms);

    // ── AI classification ─────────────────────────────────────────────
    const analysis = await analyzeWithAI({
      searchTerms,
      keywordList,
      existingNegatives,
      businessDescription,
      competitors,
      accountStats,
    });

    // ── Format response ───────────────────────────────────────────────
    return NextResponse.json({
      ...analysis,
      wasLimited,
      maxTerms: MAX_TERMS,
      originalTermCount: wasLimited ? undefined : searchTerms.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
