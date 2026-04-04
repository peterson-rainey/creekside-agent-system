import Anthropic from '@anthropic-ai/sdk';

interface ClaudeAnalysisInput {
  businessName: string;
  businessDescription: string;
  industry: string | null;
  services: string[];
  keywords: string[]; // either wasteful terms or existing negatives
  competitors: string[];
  uploadType: 'search_terms' | 'negative_keywords';
}

export interface ClaudeInsight {
  summary: string;
  businessSpecificNegatives: Array<{
    keyword: string;
    matchType: 'Broad' | 'Phrase' | 'Exact';
    reason: string;
  }>;
  warnings: string[]; // things the user should know
  industryTips: string[];
}

export async function getClaudeAnalysis(input: ClaudeAnalysisInput): Promise<ClaudeInsight | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null; // Gracefully skip if no API key

  try {
    const client = new Anthropic({ apiKey });

    const keywordSample = input.keywords.slice(0, 100).join(', ');

    const prompt = input.uploadType === 'search_terms'
      ? `You are a Google Ads expert analyzing a Search Term Report for a business.

Business: ${input.businessName}
Description: ${input.businessDescription}
Industry: ${input.industry || 'Unknown'}
Services: ${input.services.slice(0, 20).join(', ')}
${input.competitors.length > 0 ? `Competitors: ${input.competitors.join(', ')}` : ''}

Here are search terms that triggered their ads (sample): ${keywordSample}

Provide:
1. A 2-3 sentence summary of what you see in their search term data — are they attracting the right traffic?
2. Up to 15 business-specific negative keywords they should add that a generic tool wouldn't catch. Think about their specific industry, services, and what DOESN'T apply to them. For each, specify the keyword, match type (Broad/Phrase/Exact), and a brief reason.
3. Up to 3 warnings — things that look concerning in their data (e.g., "You're getting a lot of searches for X which suggests your targeting is too broad").
4. Up to 3 industry-specific tips for negative keyword management in their industry.

Respond in this exact JSON format:
{"summary":"...","businessSpecificNegatives":[{"keyword":"...","matchType":"Broad|Phrase|Exact","reason":"..."}],"warnings":["..."],"industryTips":["..."]}`

      : `You are a Google Ads expert reviewing a negative keyword list for a business.

Business: ${input.businessName}
Description: ${input.businessDescription}
Industry: ${input.industry || 'Unknown'}
Services: ${input.services.slice(0, 20).join(', ')}
${input.competitors.length > 0 ? `Competitors: ${input.competitors.join(', ')}` : ''}

Their current negative keywords (sample): ${keywordSample}

Provide:
1. A 2-3 sentence assessment of their negative keyword list — is it comprehensive? Any obvious gaps?
2. Up to 15 business-specific negative keywords they're missing that a generic tool wouldn't catch. Think about their specific services and what searches would be irrelevant. For each, specify keyword, match type, and reason.
3. Up to 3 warnings about their current list (e.g., negatives that might block good traffic).
4. Up to 3 industry-specific tips.

Respond in this exact JSON format:
{"summary":"...","businessSpecificNegatives":[{"keyword":"...","matchType":"Broad|Phrase|Exact","reason":"..."}],"warnings":["..."],"industryTips":["..."]}`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]) as ClaudeInsight;
    return parsed;
  } catch (error) {
    console.error('Claude analysis failed:', error);
    return null; // Non-blocking — tool works without it
  }
}
