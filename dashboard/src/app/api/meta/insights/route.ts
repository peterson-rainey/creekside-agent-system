import { NextRequest, NextResponse } from 'next/server';
import { callPipeboard } from '@/lib/pipeboard';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const account_id = searchParams.get('account_id');
    if (!account_id) {
      return NextResponse.json(
        { error: 'account_id query parameter is required' },
        { status: 400 }
      );
    }

    const time_range = searchParams.get('time_range') || 'last_30d';
    const since = searchParams.get('since');
    const until = searchParams.get('until');
    const level = searchParams.get('level') || 'account';

    // Build PipeBoard args — explicit date range overrides preset time_range
    const pipeboardArgs: Record<string, unknown> = {
      object_id: account_id,
      level,
    };

    if (since && until) {
      // Use explicit date range (YYYY-MM-DD format)
      pipeboardArgs.time_range = { since, until };
    } else {
      pipeboardArgs.time_range = time_range;
    }

    const result = await callPipeboard('get_insights', pipeboardArgs);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message.includes('not configured') ? 500 : 502;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
