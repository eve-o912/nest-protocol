import { createServerFn } from '@tanstack/react-start'

interface GenerateInsightsInput {
  userId: string
}

interface Insight {
  kind: 'cash_dip' | 'slow_payer' | 'margin' | 'opportunity'
  title: string
  body: string
  severity: 'info' | 'warn' | 'critical'
}

export const generateInsights = createServerFn({ method: 'POST' })
  .validator((data: GenerateInsightsInput) => data)
  .handler(async ({ data }) => {
    // This will be replaced with actual AI SDK call to Lovable AI Gateway
    // For now, return mock insights
    
    const insights: Insight[] = [
      {
        kind: 'cash_dip',
        title: 'Cash dip detected',
        body: 'Your cash position dropped 15% this week. Review large outflows to supplier payments.',
        severity: 'warn',
      },
      {
        kind: 'slow_payer',
        title: 'Slow payer alert',
        body: 'MN Supplies is 5 days overdue on KES 12,000. Send a payment reminder.',
        severity: 'critical',
      },
      {
        kind: 'opportunity',
        title: 'Growth opportunity',
        body: 'Your revenue is up 20% this month. Consider upgrading to Growth tier for advanced insights.',
        severity: 'info',
      },
    ]

    // In production, this would:
    // 1. Fetch recent transactions and debts from Supabase
    // 2. Send to AI Gateway for analysis
    // 3. Insert generated insights into the insights table
    // 4. Apply rate limiting (1 per 10 minutes per user)

    return { insights, count: insights.length }
  })
