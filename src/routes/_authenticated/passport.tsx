import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatKes } from '@/lib/utils'
import { Shield, TrendingUp, Clock, CheckCircle, Award } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/passport')({
  component: PassportComponent,
  head: () => ({
    title: 'Financial Passport — Nest',
    meta: [
      { name: 'description', content: 'Your verified credit identity' },
    ],
  }),
  errorComponent: () => <div>Error loading passport</div>,
  notFoundComponent: () => <div>Passport not found</div>,
})

function PassportComponent() {
  // Mock data - will be replaced with actual Supabase queries
  const passport = {
    score: 612,
    tier: 'silver',
    verifiedRevenue: 450000,
    monthsActive: 8,
    onTimeRate: 0.84,
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'text-yellow-500'
      case 'silver':
        return 'text-gray-300'
      case 'bronze':
        return 'text-orange-400'
      default:
        return 'text-gray-400'
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
      case 'silver':
        return 'bg-gray-400/20 text-gray-300 border-gray-400/30'
      case 'bronze':
        return 'bg-orange-400/20 text-orange-400 border-orange-400/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-success'
    if (score >= 600) return 'text-yellow-400'
    if (score >= 500) return 'text-orange-400'
    return 'text-destructive'
  }

  const nextTierRequirements = [
    { label: 'Increase on-time payment rate', current: '84%', target: '90%', met: false },
    { label: 'Reach 12 months active', current: '8 months', target: '12 months', met: false },
    { label: 'Verified revenue > KES 500,000', current: formatKes(450000), target: formatKes(500000), met: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Financial Passport</h1>
        <p className="text-muted-foreground">Your verified credit identity that unlocks loans as your business grows</p>
      </div>

      {/* Score Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Credit Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-border flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(passport.score)}`}>
                    {passport.score}
                  </div>
                  <div className="text-xs text-muted-foreground">/ 850</div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tier</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getTierBadge(passport.tier)}`}>
                  {passport.tier.charAt(0).toUpperCase() + passport.tier.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verified Revenue</span>
                <span className="font-semibold">{formatKes(passport.verifiedRevenue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Months Active</span>
                <span className="font-semibold">{passport.monthsActive} months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">On-Time Payment Rate</span>
                <span className="font-semibold">{(passport.onTimeRate * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What unlocks next tier */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            What unlocks the next tier
          </CardTitle>
          <Card_description>
            Complete these requirements to upgrade from {passport.tier} to gold
          </Card_description>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nextTierRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${req.met ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {req.met ? <CheckCircle className="w-4 h-4" /> : <span className="text-sm">{index + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{req.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {req.current} → {req.target}
                  </p>
                </div>
                {req.met && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Better Loan Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Higher scores unlock lower interest rates from partner lenders
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <CardTitle className="text-lg">Faster Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get approved in hours, not days, with your verified financial history
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Higher Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access larger credit lines as your passport score improves
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
