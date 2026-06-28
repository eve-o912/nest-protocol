-- Transactions table
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid not null references public.accounts(id) on delete cascade,
  amount_kes numeric not null,
  direction text not null check (direction in ('in', 'out')),
  category text,
  counterparty text,
  occurred_at timestamptz not null default now(),
  note text
);

grant select, insert, update, delete on public.transactions to authenticated;
grant all on public.transactions to service_role;

alter table public.transactions enable row level security;

create policy "own transactions read" on public.transactions for select to authenticated using (auth.uid() = user_id);
create policy "own transactions write" on public.transactions for insert to authenticated with check (auth.uid() = user_id);
create policy "own transactions update" on public.transactions for update to authenticated using (auth.uid() = user_id);
create policy "own transactions delete" on public.transactions for delete to authenticated using (auth.uid() = user_id);

-- Index for faster queries
create index transactions_user_id_occurred_at_idx on public.transactions(user_id, occurred_at desc);
create index transactions_account_id_idx on public.transactions(account_id);
