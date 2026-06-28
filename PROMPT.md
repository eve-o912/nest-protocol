# Nest — Build Prompt

Use this prompt to recreate the entire Nest platform from scratch with an AI coding agent (e.g. Lovable). It captures product vision, stack, design system, data model, auth, feature scope, and seed data.

---

## 1. Product Vision

Build **Nest** — an AI-powered financial operating system for SMEs and informal businesses in **Kenya**. All money figures are in **KES**.

Headline: *"Your business finances, built to work."*

Subhead: *"Nest unifies every part of your business finances into one living, intelligent system — giving you real-time visibility, AI-powered decisions, and a verified credit identity that compounds as your business grows. This is financial infrastructure."*

Core jobs Nest does for the user:
1. Unify cash position across **M-Pesa, banks, and branches** in real time.
2. Track **debts owed to and by** the business, with follow-up nudges.
3. Generate **AI insights** that catch problems (cash dips, slow payers, margin leaks) before they cost money.
4. Build a **Financial Passport** — a verified credit identity that unlocks loans.
5. Provide an **AI Advisor** that recommends the right Nest tier and shows ROI in plain KES.

Pricing tiers (do not invent others):
- **Starter** — KES 1,500/mo. For businesses earning KES 30,000–50,000/mo.
- **Growth** — KES 4,500/mo. For businesses earning KES 150,000–300,000/mo.
- **Scale** — KES 12,000/mo. For businesses earning KES 500,000+/mo.

---

## 2. Tech Stack

- **Framework**: TanStack Start v1 (React 19, Vite 7, file-based routing in `src/routes/`).
- **Styling**: Tailwind CSS v4 via `src/styles.css` (`@theme`, OKLCH tokens). No `tailwind.config.js`.
- **UI primitives**: shadcn/ui (already scaffolded under `src/components/ui/`).
- **Backend**: Lovable Cloud (Supabase) — Postgres + Auth + RLS.
- **AI**: Lovable AI Gateway via `@ai-sdk/openai-compatible` + `ai` + `@ai-sdk/react`. Default model: `google/gemini-3-flash-preview`.
- **Chat UI**: `ai-elements` (Conversation, Message, PromptInput).
- **Icons**: `lucide-react`.
- **Notifications**: `sonner`.

Forbidden: React Router DOM, Next.js conventions, `src/pages/`, custom Supabase Edge Functions for app-internal logic (use `createServerFn` or `src/routes/api/*`).

---

## 3. Design System

Dark, premium, "financial infrastructure" feel. Avoid generic purple/indigo SaaS gradients.

- **Palette (OKLCH, in `src/styles.css`)**:
  - Background: deep navy.
  - Foreground: near-white.
  - Primary: warm orange — CTAs, accents, the `nest.` logo dot.
  - Secondary accent: muted teal for charts/passport.
- **Typography** (loaded via `<link>` in `src/routes/__root.tsx`, never `@import` in CSS):
  - Headings: **Sora**.
  - Body: **Inter**.
- **Motion**: a `Reveal` component using `IntersectionObserver` for fade-up on scroll; staggered `animate-fade-in` on the hero.
- **Logo wordmark**: `nest.` with the period in primary orange.
- **Never** hardcode `text-white`, `bg-black`, or hex colors in components — always semantic tokens.

---

## 4. Database Schema (Supabase migrations)

Every `CREATE TABLE` in `public` must be followed by GRANTs, then `ENABLE ROW LEVEL SECURITY`, then policies.

### 4.1 `profiles` 
Auto-populated on signup via trigger on `auth.users`.

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  monthly_revenue_kes numeric,
  business_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile write" on public.profiles for update to authenticated using (auth.uid() = id);
```

Trigger: `handle_new_user()` inserts a profile row from `new.raw_user_meta_data`.

### 4.2 `accounts` — M-Pesa, bank, cash, branch tills
Columns: `id`, `user_id`, `name`, `type` (`mpesa|bank|cash|till`), `balance_kes numeric`, `currency` (default `KES`), `created_at`. RLS: owner-only.

### 4.3 `transactions` 
Columns: `id`, `user_id`, `account_id`, `amount_kes numeric`, `direction` (`in|out`), `category`, `counterparty`, `occurred_at`, `note`. RLS: owner-only. Index on `(user_id, occurred_at desc)`.

### 4.4 `debts` 
Columns: `id`, `user_id`, `direction` (`owed_to_us|owed_by_us`), `counterparty`, `amount_kes numeric`, `due_date`, `status` (`open|paid|overdue`), `note`. RLS: owner-only.

### 4.5 `insights` — AI-generated cards
Columns: `id`, `user_id`, `kind` (`cash_dip|slow_payer|margin|opportunity`), `title`, `body`, `severity` (`info|warn|critical`), `created_at`, `dismissed_at`. RLS: owner-only.

### 4.6 `financial_passport` 
One row per user. Columns: `user_id pk`, `score int` (0–850), `tier` (`bronze|silver|gold`), `verified_revenue_kes`, `months_active`, `on_time_rate numeric`, `updated_at`. RLS: owner-read; writes via server function only.

### 4.7 `advisor_messages` 
Columns: `id`, `user_id`, `role` (`user|assistant|system`), `parts jsonb`, `created_at`. RLS: owner-only. Index on `(user_id, created_at asc)`.

### 4.8 Roles (if/when needed)
Use the canonical `app_role` enum + `user_roles` table + `has_role(uuid, app_role)` security-definer function. **Never** store roles on `profiles`.

---

## 5. Authentication

- Lovable Cloud managed auth. Enable **Email + Password** and **Google OAuth**.
- Configure the Google provider the same turn auth is enabled, or first sign-in throws "Unsupported provider".
- Disable auto-confirm email unless explicitly requested.
- `src/routes/auth.tsx`: dual-mode Sign In / Sign Up form + Google button. Uses `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth/callback" })` from `@/integrations/lovable`.
- `src/routes/_authenticated/route.tsx`: layout route that redirects unauthenticated users to `/auth`, exposes `{ user, session }` via `context`.
- Never edit auto-generated files: `client.ts`, `client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`, `types.ts`, `.env`.
- Resolve the `Link` name collision: alias `lucide-react`'s `Link` icon (e.g. `LinkIcon`) so `@tanstack/react-router`'s `Link` wins.

---

## 6. Feature Roadmap

Build in this order. Each route ships with its own `head()` meta (title + description), error/not-found boundaries, and `Reveal`-animated sections.

### 6.1 Public marketing site (`/`)
Sections, in order:
1. **Nav** — `nest.` logo, links (Features, How it works, Pricing), `Sign in` + primary `Get started` CTA → `/auth`.
2. **Hero** — centered, single column. Headline, subhead, two CTAs. Staggered fade-in.
3. **Features** — three cards (Cash, Insights, Passport) with `lucide-react` icons.
4. **How it works** — 3-step flow.
5. **Testimonials** — generic, no fabricated brand logos or user counts.
6. **Pricing** — Starter / Growth / Scale cards, KES, "Most popular" on Growth.
7. **CTA band** → `/auth`.
8. **Footer**.

No phone mockups, no fake brand logos, no fabricated user counts.

### 6.2 Dashboard (`/_authenticated/dashboard`)
- Welcome by `full_name`.
- Cash position summary card (sum of `accounts.balance_kes`).
- Recent transactions list.
- Open debts summary.
- Insight feed (top 3 non-dismissed insights).
- Prominent gradient card → `/advisor` (Nest Advisor).
- Sign-out button in header.

### 6.3 Accounts, Transactions, Debts
- CRUD pages under `_authenticated/`. Use TanStack Query + Supabase client. Forms with `react-hook-form` + `zod` + shadcn `Form`.
- Format every KES amount with `Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 })`.

### 6.4 Financial Passport (`/_authenticated/passport`)
- Score gauge (0–850), tier badge, verified revenue, months active, on-time rate.
- "What unlocks the next tier" checklist.
- Score is computed by a server function from transactions + debts; never trust client writes.

### 6.5 AI Advisor (`/_authenticated/advisor`)
- Single persistent conversation per user, persisted in `advisor_messages` with RLS.
- `src/routes/api/chat.ts` — POST handler. Verifies Supabase bearer token, loads `profiles.monthly_revenue_kes` and `full_name` for context, streams `streamText` from `google/gemini-3-flash-preview` via Lovable AI Gateway.
- System prompt behaviour:
  - Ask for monthly revenue if unknown.
  - Recommend a tier (Starter / Growth / Scale).
  - Show ROI: monthly cost, estimated value (hours saved, debts tracked & recovered, credit unlocked), cost as % of revenue (one decimal).
  - If they qualify for a higher tier, show what they're missing.
  - Always frame Nest's cost against the cost of *not* having it.
  - Concise, plain language, KES, Markdown, <180 words by default.
- Client (`advisor.tsx`): `useChat` + `DefaultChatTransport` with `Authorization: Bearer <access_token>`. Loads history on mount. Empty state with 4 suggestion chips.
- Persistence: insert the last user message before streaming; insert the assistant `responseMessage.parts` in `onFinish`.

### 6.6 AI Insight Generator
- Server function `generateInsights({ userId })` that pulls recent transactions/debts, asks the gateway for 1–3 structured insights, and inserts them into `insights`.
- Trigger from the dashboard "Refresh insights" button. Rate-limit to one run per 10 minutes per user.

---

## 7. Server Code Conventions

- App-internal logic: `createServerFn` from `@tanstack/react-start` in `*.functions.ts` files under `src/lib/` or alongside routes. Read `process.env.*` **inside** `.handler()`, never at module scope.
- Auth-protected fns: chain `.middleware([requireSupabaseAuth])`. Never call them from public route loaders — only from `_authenticated/*` loaders or from components via `useServerFn`.
- Webhooks / public APIs: file routes under `src/routes/api/public/*`, verify signatures inside the handler.
- `supabaseAdmin` (service role) only inside `*.server.ts` files, and only for verified webhooks / privileged maintenance.

---

## 8. Seed / Demo Data

On first sign-in, if the user has zero accounts, seed realistic Kenyan SME demo data (via a server function, idempotent):
- 3 accounts: `Safaricom M-Pesa Till`, `Equity Bank — Main`, `Cash Drawer — Branch 1`.
- ~40 transactions across the last 30 days, KES 200 – KES 25,000, mixing M-Pesa Paybill, supplier payouts, and counter sales.
- 5 debts (3 owed to us, 2 owed by us), 1 overdue.
- A starting Financial Passport: score 612, tier `silver`, 8 months active, on-time rate 0.84.
- Two initial insights: one `cash_dip` warning, one `opportunity`.

Demo data lives in a migration or a server function — never hand-written in client code.

---

## 9. Acceptance Checklist

- [ ] `/` renders the marketing site with no fabricated logos, user counts, or phone mockups.
- [ ] Email/password and Google sign-in both work end-to-end.
- [ ] New user gets a `profiles` row automatically and seeded demo data on first dashboard visit.
- [ ] All KES amounts use `en-KE` currency formatting.
- [ ] Dashboard, Accounts, Transactions, Debts, Passport, Advisor all live under `_authenticated/`.
- [ ] `/advisor` streams responses, persists both sides of the conversation, and respects RLS.
- [ ] Every public table has GRANTs + RLS + policies; `user_roles` pattern used if roles appear.
- [ ] No hardcoded colors in components; all theming flows through `src/styles.css` tokens.
- [ ] `Reveal` animations on every major marketing section; hero has staggered fade-in.
- [ ] Each route sets its own `head()` title + description; root sets `notFoundComponent`; every loader route sets `errorComponent` + `notFoundComponent`.
