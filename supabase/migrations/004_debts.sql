-- Debts table
create table public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  direction text not null check (direction in ('owed_to_us', 'owed_by_us')),
  counterparty text not null,
  amount_kes numeric not null,
  due_date timestamptz,
  status text not null default 'open' check (status in ('open', 'paid', 'overdue')),
  note text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.debts to authenticated;
grant all on public.debts to service_role;

alter table public.debts enable row level security;

create policy "own debts read" on public.debts for select to authenticated using (auth.uid() = user_id);
create policy "own debts write" on public.debts for insert to authenticated with check (auth.uid() = user_id);
create policy "own debts update" on public.debts for update to authenticated using (auth.uid() = user_id);
create policy "own debts delete" on public.debts for delete to authenticated using (auth.uid() = user_id);

-- Index for faster queries
create index debts_user_id_idx on public.debts(user_id);
create index debts_status_idx on public.debts(status);
