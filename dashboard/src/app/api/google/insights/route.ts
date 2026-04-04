import { NextRequest, NextResponse } from 'next/server';
import { getCustomer } from '@/lib/google-ads';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');
    const dateRange = searchParams.get('date_range') || 'LAST_30_DAYS';
    const since = searchParams.get('since');
    const until = searchParams.get('until');
    const level = searchParams.get('level') || 'campaign';

    // Validate date inputs to prevent GAQL injection
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const validPresets = new Set(['LAST_7_DAYS', 'LAST_14_DAYS', 'LAST_30_DAYS', 'THIS_MONTH', 'LAST_MONTH']);

    const hasExplicitDates = since && until && datePattern.test(since) && datePattern.test(until);

    // Build the date filter clause — explicit range overrides preset
    const dateFilter = hasExplicitDates
      ? `segments.date BETWEEN '${since}' AND '${until}'`
      : `segments.date DURING ${validPresets.has(dateRange) ? dateRange : 'LAST_30_DAYS'}`;

    if (!customerId) {
      return NextResponse.json(
        { error: 'customer_id query parameter is required' },
        { status: 400 }
      );
    }

    const customer = getCustomer(customerId);

    if (level === 'account') {
      const results = await customer.query(`
        SELECT
          metrics.impressions,
          metrics.clicks,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_micros,
          metrics.conversions,
          metrics.cost_per_conversion,
          segments.date
        FROM customer
        WHERE ${dateFilter}
        ORDER BY segments.date DESC
      `);

      const data = results.map((row: any) => ({
        date: row.segments.date,
        impressions: row.metrics.impressions,
        clicks: row.metrics.clicks,
        ctr: row.metrics.ctr,
        average_cpc: Number(row.metrics.average_cpc) / 1_000_000,
        cost: Number(row.metrics.cost_micros) / 1_000_000,
        conversions: row.metrics.conversions,
        cost_per_conversion: Number(row.metrics.cost_per_conversion) / 1_000_000,
      }));

      // Also fetch conversion action breakdown
      let conversionBreakdown: Array<{ name: string; conversions: number }> = [];
      try {
        const convResults = await customer.query(`
          SELECT
            segments.conversion_action_name,
            metrics.conversions
          FROM customer
          WHERE ${dateFilter}
        `);
        const breakdownMap: Record<string, number> = {};
        for (const row of convResults as any[]) {
          const conversions = row.metrics.conversions ?? 0;
          if (conversions === 0) continue;
          const name = row.segments.conversion_action_name || 'Unknown';
          breakdownMap[name] = (breakdownMap[name] ?? 0) + conversions;
        }
        conversionBreakdown = Object.entries(breakdownMap)
          .map(([name, conversions]) => ({ name, conversions }))
          .sort((a, b) => b.conversions - a.conversions);
      } catch {
        // Conversion breakdown is optional — don't fail the whole request
      }

      return NextResponse.json({ level: 'account', customer_id: customerId, data, conversionBreakdown });
    }

    // Campaign level (default)
    const results = await customer.query(`
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type,
        metrics.impressions,
        metrics.clicks,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_micros,
        metrics.conversions,
        metrics.cost_per_conversion
      FROM campaign
      WHERE ${dateFilter}
        AND campaign.status != 'REMOVED'
      ORDER BY metrics.cost_micros DESC
    `);

    const data = results.map((row: any) => ({
      campaign_id: row.campaign.id,
      campaign_name: row.campaign.name,
      status: row.campaign.status,
      channel_type: row.campaign.advertising_channel_type,
      impressions: row.metrics.impressions,
      clicks: row.metrics.clicks,
      ctr: row.metrics.ctr,
      average_cpc: Number(row.metrics.average_cpc) / 1_000_000,
      cost: Number(row.metrics.cost_micros) / 1_000_000,
      conversions: row.metrics.conversions,
      cost_per_conversion: Number(row.metrics.cost_per_conversion) / 1_000_000,
    }));

    return NextResponse.json({ level: 'campaign', customer_id: customerId, data });
  } catch (error: any) {
    console.error('Google Ads insights error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Google Ads insights' },
      { status: 500 }
    );
  }
}
