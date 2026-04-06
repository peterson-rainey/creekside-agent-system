import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from '@/lib/utils/rate-limiter';

// ── Cost tracking ──────────────────────────────────────────────────────────
// Sonnet pricing: $3/M input, $15/M output tokens
// $10 budget ≈ 600K output tokens or 3.3M input tokens
// We track estimated cost per email and cut off at $10.
const COST_LIMIT_CENTS = 1000; // $10.00 in cents
const INPUT_COST_PER_TOKEN = 3 / 1_000_000;   // $3/M
const OUTPUT_COST_PER_TOKEN = 15 / 1_000_000;  // $15/M

// In-memory cost ledger per email (persists across requests within a serverless instance)
const costLedger = new Map<string, number>();

// Max conversation length (prevents unbounded context growth)
const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 200;

// ── Allowed toolContext keys per tool ──────────────────────────────────────
const ALLOWED_CONTEXT_KEYS: Record<string, string[]> = {
  'roas-calculator': ['businessType', 'industry', 'totalBudget', 'duration', 'spendModel', 'roasAssumptions', 'totalRevenue', 'totalProfit', 'avgCac', 'breakEvenMonth'],
  'ad-budget-calculator': ['industry', 'businessType', 'revenueGoal', 'revenueTimeframe', 'avgDealValue', 'conversionRate', 'currentMonthlySpend', 'recommendedBudget', 'expectedCpa', 'leadsNeeded'],
  'negative-keywords': ['uploadType', 'healthScore', 'detectedIndustry', 'issuesFound', 'termCount', 'wastePercentage'],
};

function sanitizeToolContext(tool: string, raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object') return null;
  const allowed = ALLOWED_CONTEXT_KEYS[tool];
  if (!allowed) return null;
  const sanitized: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in (raw as Record<string, unknown>)) {
      const val = (raw as Record<string, unknown>)[key];
      // Only allow primitives and plain objects (no functions, no symbols)
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' || (typeof val === 'object' && val !== null)) {
        sanitized[key] = val;
      }
    }
  }
  return Object.keys(sanitized).length > 0 ? sanitized : null;
}

// ── Tool-specific system prompts ──────────────────────────────────────────
const TOOL_PROMPTS: Record<string, string> = {
  'roas-calculator': `You are an expert digital advertising strategist conducting a discovery interview to build a custom ROAS projection for a business owner. Your goal is to understand their business deeply enough to give them a personalized projection they can't get from the free calculator.

Focus areas (explore in order, but follow their signal):
1. Business basics: What they sell, who they sell to, average transaction value, margins
2. Current marketing: What they're spending now, what platforms, what's working/not
3. History: Previous agency experiences, what went wrong, what they learned
4. Goals: Revenue targets, growth timeline, what success looks like in 6 months
5. Capacity: Can they handle more customers? What's their bottleneck?
6. Competition: Who are they competing against? What market are they in?

After gathering enough info (usually 6-8 exchanges), provide a CUSTOM ANALYSIS that includes:
- Personalized ROAS projection with conservative/base/optimistic scenarios
- Specific platform recommendations (Google vs Meta allocation)
- Budget recommendation tailored to their situation
- 90-day roadmap (Month 1: foundation, Month 2: optimization, Month 3: scale)
- Honest assessment of risks and what could go wrong
- 2-3 specific tactical recommendations for their industry`,

  'ad-budget-calculator': `You are an expert digital advertising strategist conducting a discovery interview to build a custom ad budget recommendation for a business owner. Your goal is to give them a specific, defensible budget number tied to their actual business goals.

Focus areas (explore in order, but follow their signal):
1. Revenue goals: What they want to hit and by when
2. Current state: What they're spending now, customer acquisition cost, close rate
3. Business model: Deal value, repeat purchase rate, customer lifetime value
4. Sales process: How leads become customers, bottlenecks in the funnel
5. Previous experience: What they've tried, what budgets they've tested
6. Competitive landscape: Who else is advertising in their space, how saturated is the market
7. Capacity: If you doubled their leads tomorrow, could they handle it?

After gathering enough info (usually 6-8 exchanges), provide a CUSTOM ANALYSIS that includes:
- Specific monthly budget recommendation with rationale (not just "spend more")
- Budget-to-outcome math: at $X you get Y leads, Z customers, W revenue
- Platform allocation (Google vs Meta vs Other) with dollar amounts
- What they CAN'T do at their current budget vs what opens up at recommended
- 90-day scaling plan (start conservative, measure, then scale)
- Honest assessment: if their budget is too low, say so and explain the minimum viable spend`,

  'negative-keywords': `You are an expert Google Ads specialist conducting a discovery interview to build a custom negative keyword strategy for a business owner. Your goal is to understand their business well enough to identify the exact searches they're wasting money on.

Focus areas (explore in order, but follow their signal):
1. Business specifics: What exactly they sell, what they DON'T sell, service area
2. Target customer: Who is their ideal customer? Who is NOT their customer?
3. Current campaigns: What keywords they're bidding on, what match types
4. Known waste: What irrelevant searches have they noticed? What types of leads are bad?
5. Competitors: Who else shows up for their keywords?
6. Geography: Where do they serve? Where DON'T they serve?
7. Budget context: How much are they spending, what's their cost-per-lead?

After gathering enough info (usually 6-8 exchanges), provide a CUSTOM ANALYSIS that includes:
- Categorized negative keyword list (50-100+ keywords) organized by theme
- Match type recommendations for each (Broad, Phrase, Exact) with reasoning
- Estimated waste reduction (% of budget they're likely wasting on irrelevant clicks)
- Campaign structure recommendations (shared vs campaign-level negatives)
- Industry-specific negative patterns they probably haven't thought of
- A maintenance schedule for reviewing and updating negatives`,
};

const SYSTEM_BASE = `You are conducting a diagnostic business interview, modeled on a top digital marketing consultant's discovery call technique. Your approach:

STYLE:
- Consultative, not salesy. You're a diagnostician, not a vendor.
- Ask ONE focused question at a time. Never ask multiple questions in one message.
- Listen to what they say and follow THEIR signal — don't stick to a rigid script.
- When they give a short answer, dig deeper: "Tell me more about that" or "What specifically about that isn't working?"
- Mirror their language back to them to show you understand.
- Be radically honest. If something won't work, say so.

FLOW:
1. Start with a warm, brief opener then a single broad question: "Tell me about your business — what's working and what's not?"
2. Follow their signal — whatever they go long on is where the pain is.
3. Ask diagnostic follow-ups based on what they said (not a generic list).
4. After 6-8 exchanges, you should have enough to deliver a custom analysis.
5. When you have enough info, deliver the analysis in a structured, actionable format.

IMPORTANT:
- Keep messages SHORT (2-4 sentences max per response, unless delivering the final analysis).
- The interview should feel like a conversation, not a form.
- When delivering the final analysis, be thorough and specific — this is the paid value.
- Format the final analysis with clear headers, bullet points, and bold key numbers.
- End the analysis with a clear call-to-action to book a strategy call for implementation help.`;

export async function POST(request: NextRequest) {
  // ── Rate limit by IP ──────────────────────────────────────────────────
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, 'insights');
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({
      error: 'Too many requests. Please wait a moment before sending another message.',
      retryAfter: rateCheck.retryAfter,
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': String(rateCheck.retryAfter ?? 60) },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { messages, tool, toolContext, sessionId, email } = body;

    // ── Input validation ──────────────────────────────────────────────
    if (!messages || !Array.isArray(messages) || !tool || !TOOL_PROMPTS[tool]) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Cap message array to prevent unbounded context growth
    const cappedMessages = messages.slice(-MAX_MESSAGES);

    // Validate and truncate individual messages
    const validatedMessages = cappedMessages.map((m: { role: string; content: string }) => ({
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: typeof m.content === 'string' ? m.content.slice(0, MAX_MESSAGE_LENGTH) : '',
    }));

    // ── Per-email cost cap ($10) ──────────────────────────────────────
    const userEmail = typeof email === 'string' ? email.slice(0, MAX_NAME_LENGTH).toLowerCase() : ip;
    const currentCostCents = costLedger.get(userEmail) ?? 0;

    if (currentCostCents >= COST_LIMIT_CENTS) {
      return new Response(JSON.stringify({
        error: 'You\'ve reached the usage limit for the free AI analysis. Book a strategy call for a deeper dive into your business.',
        limitReached: true,
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Sanitize toolContext ──────────────────────────────────────────
    const safeContext = sanitizeToolContext(tool, toolContext);
    const contextBlock = safeContext
      ? `\n\nThe user has already been using the free ${tool} tool. Here is the context from their session:\n${JSON.stringify(safeContext, null, 2)}\n\nUse this to personalize your questions — you already know some things about them. Don't re-ask what you already know.`
      : '';

    // ── Call Claude ──────────────────────────────────────────────────
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: `${SYSTEM_BASE}\n\n${TOOL_PROMPTS[tool]}${contextBlock}`,
      messages: validatedMessages,
    });

    const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : '';

    // ── Track cost ──────────────────────────────────────────────────
    const inputTokens = response.usage?.input_tokens ?? 0;
    const outputTokens = response.usage?.output_tokens ?? 0;
    const costDollars = (inputTokens * INPUT_COST_PER_TOKEN) + (outputTokens * OUTPUT_COST_PER_TOKEN);
    const costCents = Math.ceil(costDollars * 100);
    costLedger.set(userEmail, currentCostCents + costCents);

    // ── Persist to Supabase (best-effort) ───────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey && sessionId && typeof sessionId === 'string') {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('tool_interviews').upsert({
          session_id: sessionId.slice(0, 100),
          tool,
          messages: [...validatedMessages, { role: 'assistant', content: assistantMessage }],
          tool_context: safeContext,
          email: userEmail,
          cost_cents: currentCostCents + costCents,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'session_id' });
      } catch {
        // Best-effort persistence — don't break the interview if DB is down
      }
    }

    return new Response(JSON.stringify({
      message: assistantMessage,
      usage: { costCents: currentCostCents + costCents, limitCents: COST_LIMIT_CENTS },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Interview service error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
