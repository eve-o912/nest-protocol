import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatKes } from '@/lib/utils'
import { Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/debts')({
  component: DebtsComponent,
  head: () => ({
    title: 'Debts — Nest',
    meta: [
      { name: 'description', content: 'Track debts owed to and by your business' },
    ],
  }),
  errorComponent: () => <div>Error loading debts</div>,
  notFoundComponent: () => <div>Debts not found</div>,
})

function DebtsComponent() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDebt, setNewDebt] = useState({
    direction: 'owed_to_us',
    counterparty: '',
    amount: '',
    dueDate: '',
    note: '',
  })

  // Mock data - will be replaced with actual Supabase queries
  const debts = [
    { id: 1, direction: 'owed_to_us', counterparty: 'JKL Enterprises', amount: 25000, dueDate: '2024-01-20', status: 'open', note: '' },
    { id: 2, direction: 'owed_to_us', counterparty: 'MN Supplies', amount: 12000, dueDate: '2024-01-18', status: 'overdue', note: '' },
    { id: 3, direction: 'owed_to_us', counterparty: 'OPQ Retail', amount: 8000, dueDate: '2024-01-25', status: 'open', note: '' },
    { id: 4, direction: 'owed_by_us', counterparty: 'XYZ Wholesalers', amount: 35000, dueDate: '2024-01-30', status: 'open', note: 'Inventory purchase' },
    { id: 5, direction: 'owed_by_us', counterparty: 'ABC Logistics', amount: 5000, dueDate: '2024-01-15', status: 'paid', note: 'Delivery fees' },
  ]

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be replaced with actual Supabase mutation
    console.log('Adding debt:', newDebt)
    setShowAddForm(false)
    setNewDebt({ direction: 'owed_to_us', counterparty: '', amount: '', dueDate: '', note: '' })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-success" />
      default:
        return <Clock className="w-4 h-4 text-warning" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'bg-destructive/10 text-destructive'
      case 'paid':
        return 'bg-success/10 text-success'
      default:
        return 'bg-warning/10 text-warning'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Debts</h1>
          <p className="text-muted-foreground">Track debts owed to and by your business</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add debt
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Add new debt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDebt} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="direction">Direction</Label>
                <select
                  id="direction"
                  className="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm"
                  value={newDebt.direction}
                  onChange={(e) => setNewDebt({ ...newDebt, direction: e.target.value })}
                >
                  <option value="owed_to_us">Owed to us (someone owes us)</option>
                  <option value="owed_by_us">Owed by us (we owe someone)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="counterparty">Counterparty</Label>
                <Input
                  id="counterparty"
                  placeholder="e.g., Customer name, Supplier name"
                  value={newDebt.counterparty}
                  onChange={(e) => setNewDebt({ ...newDebt, counterparty: e.target.value })}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={newDebt.amount}
                    onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newDebt.dueDate}
                    onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Input
                  id="note"
                  placeholder="Additional details"
                  value={newDebt.note}
                  onChange={(e) => setNewDebt({ ...newDebt, note: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add debt</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Owed to us</CardTitle>
            <CardDescription>Money others owe your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {debts.filter(d => d.direction === 'owed_to_us').map((debt) => (
                <div key={debt.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{debt.counterparty}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadge(debt.status)}`}>
                        {debt.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due: {debt.dueDate}
                    </p>
                    {debt.note && (
                      <p className="text-sm text-muted-foreground mt-1">{debt.note}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(debt.status)}
                    <span className="font-semibold text-lg">{formatKes(debt.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Owed by us</CardTitle>
            <CardDescription>Money your business owes others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {debts.filter(d => d.direction === 'owed_by_us').map((debt) => (
                <div key={debt.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{debt.counterparty}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadge(debt.status)}`}>
                        {debt.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due: {debt.dueDate}
                    </p>
                    {debt.note && (
                      <p className="text-sm text-muted-foreground mt-1">{debt.note}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(debt.status)}
                    <span className="font-semibold text-lg">{formatKes(debt.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
