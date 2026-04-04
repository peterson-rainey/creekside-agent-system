import { NextRequest, NextResponse } from 'next/server';
import { scrapeWebsite } from '@/lib/website-scraper';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const context = await scrapeWebsite(url);
    return NextResponse.json(context);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to scrape website';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
