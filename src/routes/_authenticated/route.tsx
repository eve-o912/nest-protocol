import { createFileRoute, Outlet, Link, useNavigate } from '@tanstack/react-router'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Wallet, CreditCard, MessageSquare, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: ({ location }) => {
    // In production, this would check for actual auth session
    // For now, we'll allow access for development
    // if (!isAuthenticated) {
    //   throw redirect({ to: '/auth', search: { redirect: location.href } })
    // }
  },
})

function AuthenticatedLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = () => {
    // This will be replaced with actual Supabase sign out
    navigate({ to: '/auth' })
  }

  const navigation = [
    { name: 'Dashboard', href: '/_authenticated/dashboard', icon: LayoutDashboard },
    { name: 'Accounts', href: '/_authenticated/accounts', icon: Wallet },
    { name: 'Transactions', href: '/_authenticated/transactions', icon: LayoutDashboard },
    { name: 'Debts', href: '/_authenticated/debts', icon: CreditCard },
    { name: 'Passport', href: '/_authenticated/passport', icon: CreditCard },
    { name: 'Advisor', href: '/_authenticated/advisor', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/_authenticated/dashboard">
                <Logo />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="hidden md:flex"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border">
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={() => {
                handleSignOut()
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start mt-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
