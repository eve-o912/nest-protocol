import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/Reveal'
import { Logo } from '@/components/Logo'
import { Wallet, Brain, CreditCard, ArrowRight, Check, TrendingUp, Shield, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: IndexComponent,
  head: () => ({
    title: 'Nest — Your business finances, built to work',
    meta: [
      { name: 'description', content: 'Nest unifies every part of your business finances into one living, intelligent system — giving you real-time visibility, AI-powered decisions, and a verified credit identity.' },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
})

function IndexComponent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center gap-8">
              <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it works
              </Link>
              <Link to="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/auth">
                <Button>Get started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in animate-delay-100">
              Your business finances, built to work.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-200">
              Nest unifies every part of your business finances into one living, intelligent system — giving you real-time visibility, AI-powered decisions, and a verified credit identity that compounds as your business grows. This is financial infrastructure.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  Start your free trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  See how it works
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 sm:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Everything you need to run your business finances
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Unified Cash Position</CardTitle>
                  <CardDescription>
                    See your complete cash position across M-Pesa, banks, and branch tills in real time. No more switching between apps.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
            <Reveal delay={200}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Catch problems before they cost money. Our AI identifies cash dips, slow payers, and margin leaks automatically.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
            <Reveal delay={300}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Financial Passport</CardTitle>
                  <CardDescription>
                    Build a verified credit identity that unlocks loans as your business grows. Your data becomes your asset.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              How it works
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                  01
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect your accounts</h3>
                <p className="text-muted-foreground">
                  Link your M-Pesa, bank accounts, and cash tills in minutes. We support all major Kenyan financial institutions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-secondary">
                  02
                </div>
                <h3 className="text-xl font-semibold mb-2">Manikka learns your business</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your transaction patterns, cash flow, and business relationships to understand your unique needs.
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                  03
                </div>
                <h3 className="text-xl font-semibold mb-2">Get insights and unlock credit</h3>
                <p className="text-muted-foreground">
                  Receive actionable insights, track debts automatically, and build your Financial Passport to access loans.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Trusted by businesses across Kenya
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    "Nest has completely transformed how I manage my retail business. I can finally see all my cash in one place and the AI insights have helped me recover thousands in overdue payments."
                  </p>
                  <p className="font-semibold">— Retail business owner, Nairobi</p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={200}>
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    "The Financial Passport feature is a game-changer. After using Nest for 6 months, I was able to secure a business loan that I couldn't get before. The data speaks for itself."
                  </p>
                  <p className="font-semibold">— SME distributor, Mombasa</p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Choose the plan that fits your business. All plans include a 30-day free trial.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Reveal delay={100}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">KES 1,500</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Up to 3 accounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Basic insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Financial Passport</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Link to="/auth" className="mt-6 block">
                    <Button variant="outline" className="w-full">
                      Get started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={200}>
              <Card className="border-2 border-primary bg-card relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background px-3 py-1 rounded-full text-xs font-semibold">
                  Most popular
                </div>
                <CardHeader>
                  <CardTitle>Growth</CardTitle>
                  <CardDescription>For scaling businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">KES 4,500</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Unlimited accounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Advanced AI insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Financial Passport Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>AI Advisor access</span>
                    </li>
                  </ul>
                  <Link to="/auth" className="mt-6 block">
                    <Button className="w-full">
                      Get started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={300}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Scale</CardTitle>
                  <CardDescription>For established businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">KES 12,000</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Everything in Growth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Multi-location support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>SLA guarantee</span>
                    </li>
                  </ul>
                  <Link to="/auth" className="mt-6 block">
                    <Button variant="outline" className="w-full">
                      Contact sales
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to take control of your business finances?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start your 30-day free trial today. No credit card required.
            </p>
            <Link to="/auth">
              <Button size="lg">
                Get started now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="text-muted-foreground mt-2">
                Financial infrastructure for Kenyan businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link to="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="#how-it-works" className="hover:text-foreground">How it works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Nest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
