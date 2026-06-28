import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatKes } from '@/lib/utils'
import { Plus, Wallet, Building2, DollarSign, Store } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/accounts')({
  component: AccountsComponent,
  head: () => ({
    title: 'Accounts — Nest',
    meta: [
      { name: 'description', content: 'Manage your M-Pesa, bank, and cash accounts' },
    ],
  }),
  errorComponent: () => <div>Error loading accounts</div>,
  notFoundComponent: () => <div>Accounts not found</div>,
})

function AccountsComponent() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAccount, setNewAccount] = useState({ name: '', type: 'mpesa', balance: '' })

  // Mock data - will be replaced with actual Supabase queries
  const accounts = [
    { id: 1, name: 'Safaricom M-Pesa Till', type: 'mpesa', balance: 45000 },
    { id: 2, name: 'Equity Bank — Main', type: 'bank', balance: 65000 },
    { id: 3, name: 'Cash Drawer — Branch 1', type: 'cash', balance: 15000 },
  ]

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'mpesa':
        return <Wallet className="w-5 h-5" />
      case 'bank':
        return <Building2 className="w-5 h-5" />
      case 'cash':
        return <DollarSign className="w-5 h-5" />
      case 'till':
        return <Store className="w-5 h-5" />
      default:
        return <Wallet className="w-5 h-5" />
    }
  }

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'mpesa':
        return 'M-Pesa'
      case 'bank':
        return 'Bank'
      case 'cash':
        return 'Cash'
      case 'till':
        return 'Till'
      default:
        return type
    }
  }

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be replaced with actual Supabase mutation
    console.log('Adding account:', newAccount)
    setShowAddForm(false)
    setNewAccount({ name: '', type: 'mpesa', balance: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Accounts</h1>
          <p className="text-muted-foreground">Manage your M-Pesa, bank, and cash accounts</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add account
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Add new account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account name</Label>
                <Input
                  id="accountName"
                  placeholder="e.g., Safaricom M-Pesa Till"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account type</Label>
                <select
                  id="accountType"
                  className="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm"
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="bank">Bank</option>
                  <option value="cash">Cash</option>
                  <option value="till">Till</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountBalance">Initial balance (KES)</Label>
                <Input
                  id="accountBalance"
                  type="number"
                  placeholder="0"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add account</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                    <CardDescription>{getAccountTypeLabel(account.type)}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatKes(account.balance)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
