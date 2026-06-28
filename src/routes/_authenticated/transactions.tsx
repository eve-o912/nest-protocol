import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatKes } from '@/lib/utils'
import { Plus, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/transactions')({
  component: TransactionsComponent,
  head: () => ({
    title: 'Transactions — Nest',
    meta: [
      { name: 'description', content: 'View and manage your transactions' },
    ],
  }),
  errorComponent: () => <div>Error loading transactions</div>,
  notFoundComponent: () => <div>Transactions not found</div>,
})

function TransactionsComponent() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    accountId: '',
    amount: '',
    direction: 'in',
    category: '',
    counterparty: '',
    note: '',
  })

  // Mock data - will be replaced with actual Supabase queries
  const transactions = [
    { id: 1, account: 'Safaricom M-Pesa Till', amount: 15000, direction: 'in', category: 'Sales', counterparty: 'Customer', date: '2024-01-15', note: '' },
    { id: 2, account: 'Equity Bank — Main', amount: 8500, direction: 'out', category: 'Supplier', counterparty: 'ABC Ltd', date: '2024-01-15', note: 'Monthly payment' },
    { id: 3, account: 'Cash Drawer — Branch 1', amount: 22500, direction: 'in', category: 'Sales', counterparty: 'Counter', date: '2024-01-14', note: '' },
    { id: 4, account: 'Equity Bank — Main', amount: 45000, direction: 'out', category: 'Payroll', counterparty: 'Employees', date: '2024-01-14', note: 'January salaries' },
    { id: 5, account: 'Safaricom M-Pesa Till', amount: 3500, direction: 'in', category: 'Sales', counterparty: 'Walk-in', date: '2024-01-13', note: '' },
  ]

  const accounts = [
    { id: 1, name: 'Safaricom M-Pesa Till' },
    { id: 2, name: 'Equity Bank — Main' },
    { id: 3, name: 'Cash Drawer — Branch 1' },
  ]

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be replaced with actual Supabase mutation
    console.log('Adding transaction:', newTransaction)
    setShowAddForm(false)
    setNewTransaction({ accountId: '', amount: '', direction: 'in', category: '', counterparty: '', note: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transactions across all accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add transaction
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Add new transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">Account</Label>
                  <select
                    id="account"
                    className="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm"
                    value={newTransaction.accountId}
                    onChange={(e) => setNewTransaction({ ...newTransaction, accountId: e.target.value })}
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direction">Direction</Label>
                  <select
                    id="direction"
                    className="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm"
                    value={newTransaction.direction}
                    onChange={(e) => setNewTransaction({ ...newTransaction, direction: e.target.value })}
                  >
                    <option value="in">Money in</option>
                    <option value="out">Money out</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Sales, Supplier"
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="counterparty">Counterparty</Label>
                <Input
                  id="counterparty"
                  placeholder="e.g., Customer name, Supplier name"
                  value={newTransaction.counterparty}
                  onChange={(e) => setNewTransaction({ ...newTransaction, counterparty: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Input
                  id="note"
                  placeholder="Additional details"
                  value={newTransaction.note}
                  onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add transaction</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>All transactions</CardTitle>
          <CardDescription>Showing all transactions across your accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{tx.counterparty}</p>
                    <span className="text-sm text-muted-foreground">• {tx.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tx.account} • {tx.date}
                  </p>
                  {tx.note && (
                    <p className="text-sm text-muted-foreground mt-1">{tx.note}</p>
                  )}
                </div>
                <div className={`flex items-center gap-1 font-semibold text-lg ${
                  tx.direction === 'in' ? 'text-success' : 'text-destructive'
                }`}>
                  {tx.direction === 'in' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                  {formatKes(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
