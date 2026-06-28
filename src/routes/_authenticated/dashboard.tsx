import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatKes } from '@/lib/utils'
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
  head: () => ({
    title: 'Dashboard — Nest',
    meta: [
      { name: 'description', content: 'Your business financial dashboard' },
    ],
  }),
  errorComponent: () => <div>Error loading dashboard</div>,
  notFoundComponent: () => <div>Dashboard not found</div>,
})

function DashboardComponent() {
  // Mock data - will be replaced with actual Supabase queries
  const cashPosition = 125000
  const recentTransactions = [
    { id: 1, description: 'M-Pesa Paybill - Customer', amount: 15000, direction: 'in', date: '2024-01-15' },
    { id: 2, description: 'Supplier Payment - ABC Ltd', amount: 8500, direction: 'out', date: '2024-01-15' },
    { id: 3, description: 'Counter Sales - Branch 1', amount: 22500, direction: 'in', date: '2024-01-14' },
    { id: 4, description: 'Bank Transfer - Salary', amount: 45000, direction: 'out', date: '2024-01-14' },
    { id: 5, description: 'M-Pesa Till - Walk-in', amount: 3500, direction: 'in', date: '2024-01-13' },
  ]

  const openDebts = [
    { id: 1, counterparty: 'JKL Enterprises', amount: 25000, dueDate: '2024-01-20', status: 'open' },
    { id: 2, counterparty: 'MN Supplies', amount: 12000, dueDate: '2024-01-18', status: 'overdue' },
    { id: 3, counterparty: 'OPQ Retail', amount: 8000, dueDate: '2024-01-25', status: 'open' },
  ]

  const insights = [
    { id: 1, kind: 'cash_dip', title: 'Cash dip detected', body: 'Your cash position dropped 15% this week. Review large outflows.', severity: 'warn' },
    { id: 2, kind: 'slow_payer', title: 'Slow payer alert', body: 'MN Supplies is 5 days overdue on KES 12,000. Send a reminder.', severity: 'critical' },
    { id: 3, kind: 'opportunity', title: 'Growth opportunity', body: 'Your revenue is up 20% this month. Consider upgrading to Growth tier for advanced insights.', severity: 'info' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground">Here's what's happening with your business finances today.</p>
      </div>

      {/* Cash Position Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Cash Position</span>
            <Button variant="ghost" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </CardTitle>
          <CardDescription>Total across all your accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">{formatKes(cashPosition)}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-success">+12.5%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Advisor CTA */}
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Talk to Nest Advisor</h3>
              <p className="text-muted-foreground mb-4">
                Get personalized recommendations for your business. Our AI can help you optimize cash flow, choose the right plan, and unlock more value.
              </p>
              <Link to="/_authenticated/advisor">
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start conversation
                </Button>
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link to="/_authenticated/transactions">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                  <div className={`flex items-center gap-1 font-semibold ${
                    tx.direction === 'in' ? 'text-success' : 'text-destructive'
                  }`}>
                    {tx.direction === 'in' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {formatKes(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Debts */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Open Debts</CardTitle>
              <Link to="/_authenticated/debts">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {openDebts.map((debt) => (
                <div key={debt.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{debt.counterparty}</p>
                    <p className="text-sm text-muted-foreground">Due: {debt.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {debt.status === 'overdue' && (
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                    )}
                    <span className="font-semibold">{formatKes(debt.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Insights</CardTitle>
            <Button variant="ghost" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border ${
                  insight.severity === 'critical'
                    ? 'border-destructive bg-destructive/10'
                    : insight.severity === 'warn'
                    ? 'border-warning bg-warning/10'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {insight.severity === 'critical' && (
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  {insight.severity === 'warn' && (
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  )}
                  {insight.severity === 'info' && (
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  )}
                  <h4 className="font-semibold">{insight.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{insight.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
