-- Insights table (AI-generated cards)
create table public.insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('cash_dip', 'slow_payer', 'margin', 'opportunity')),
  title text not null,
  body text not null,
  severity text not null default 'info' check (severity in ('info', 'warn', 'critical')),
  created_at timestamptz not null default now(),
  dismissed_at timestamptz
);

grant select, insert, update, delete on public.insights to authenticated;
grant all on public.insights to service_role;

alter table public.insights enable row level security;

create policy "own insights read" on public.insights for select to authenticated using (auth.uid() = user_id);
create policy "own insights write" on public.insights for insert to authenticated with check (auth.uid() = user_id);
create policy "own insights update" on public.insights for update to authenticated using (auth.uid() = user_id);
create policy "own insights delete" on public.insights for delete to authenticated using (auth.uid() = user_id);

-- Index for faster queries
create index insights_user_id_idx on public.insights(user_id);
create index insights_dismissed_at_idx on public.insights(dismissed_at);
