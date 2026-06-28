import { createServerFn } from '@tanstack/react-start'

interface SeedDataInput {
  userId: string
}

export const seedDemoData = createServerFn({ method: 'POST' })
  .validator((data: SeedDataInput) => data)
  .handler(async ({ data }) => {
    // This will be replaced with actual Supabase mutations
    // For now, return success status
    
    // In production, this would:
    // 1. Check if user has any accounts (idempotent check)
    // 2. If zero accounts, seed:
    //    - 3 accounts: Safaricom M-Pesa Till, Equity Bank — Main, Cash Drawer — Branch 1
    //    - ~40 transactions across last 30 days (KES 200 – KES 25,000)
    //    - 5 debts (3 owed to us, 2 owed by us), 1 overdue
    //    - Financial Passport: score 612, tier silver, 8 months active, on-time rate 0.84
    //    - 2 initial insights: cash_dip warning, opportunity
    
    const seedData = {
      accounts: [
        { name: 'Safaricom M-Pesa Till', type: 'mpesa', balance: 45000 },
        { name: 'Equity Bank — Main', type: 'bank', balance: 65000 },
        { name: 'Cash Drawer — Branch 1', type: 'cash', balance: 15000 },
      ],
      transactions: 40,
      debts: 5,
      passport: {
        score: 612,
        tier: 'silver',
        monthsActive: 8,
        onTimeRate: 0.84,
      },
    }

    console.log('Seeding demo data for user:', data.userId, seedData)

    return { success: true, seeded: seedData }
  })
