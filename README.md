# Nest — Financial Operating System for Kenyan SMEs

An AI-powered financial operating system for SMEs and informal businesses in Kenya. Nest unifies cash position across M-Pesa, banks, and branches in real time, tracks debts, generates AI insights, and builds a verified Financial Passport for credit access.


nest-protocol/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Logo.tsx
│   │   └── Reveal.tsx
│   ├── lib/                # Utilities and server functions
│   │   ├── utils.ts
│   │   ├── insights.functions.ts
│   │   └── seed.functions.ts
│   ├── routes/             # File-based routing
│   │   ├── __root.tsx
│   │   ├── index.tsx       # Marketing site
│   │   ├── auth.tsx        # Authentication
│   │   └── _authenticated/ # Protected routes
│   └── styles.css          # Tailwind CSS v4 with OKLCH tokens
├── supabase/
│   └── migrations/         # Database schema
└── package.json
```

## Features

### Public Marketing Site
- Hero section with CTAs
- Features showcase
- How it works
- Testimonials
- Pricing tiers (Starter, Growth, Scale)
- Footer

### Authenticated Dashboard
- Cash position summary
- Recent transactions
- Open debts
- AI insights feed
- Nest Advisor CTA

### Accounts Management
- Add M-Pesa, bank, cash, and till accounts
- View account balances
- Track cash position across all accounts

### Transactions
- Record money in/out
- Categorize transactions
- Track counterparty details

### Debts Tracking
- Track debts owed to us
- Track debts owed by us
- Status tracking (open, paid, overdue)
- Due date reminders

### Financial Passport
- Credit score (0-850)
- Tier system (Bronze, Silver, Gold)
- Verified revenue tracking
- On-time payment rate
- Next tier requirements

### AI Advisor
- Persistent conversation
- Personalized recommendations
- Tier recommendations with ROI analysis
- Cash flow optimization tips

## Design System

### Colors (OKLCH)
- Background: Deep navy
- Foreground: Near-white
- Primary: Warm orange (CTAs, accents)
- Secondary: Muted teal (charts, passport)

### Typography
- Headings: Sora
- Body: Inter

### Components
- Reveal: IntersectionObserver-based fade-up animation
- Cards: shadcn/ui Card components
- Buttons: shadcn/ui Button with variants

## Database Schema

- `profiles` - User profiles with business info
- `accounts` - M-Pesa, bank, cash, till accounts
- `transactions` - Money in/out records
- `debts` - Debts tracking
- `insights` - AI-generated insights
- `financial_passport` - Credit score and tier
- `advisor_messages` - AI chat persistence

All tables have Row Level Security (RLS) enabled.

## Pricing

- **Starter**: KES 1,500/mo (KES 30,000–50,000/mo revenue)
- **Growth**: KES 4,500/mo (KES 150,000–300,000/mo revenue)
- **Scale**: KES 12,000/mo (KES 500,000+/mo revenue)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run ESLint
- `npm run typecheck` - Run TypeScript check

### Code Conventions

- Use TanStack Query for data fetching
- Use `createServerFn` for server-side logic
- All KES amounts formatted with `formatKes()` utility
- No hardcoded colors - use semantic tokens from `styles.css`
- All authenticated routes under `_authenticated/`

## License

Proprietary - All rights reserved
