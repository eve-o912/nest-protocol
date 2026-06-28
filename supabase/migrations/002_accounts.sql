-- Accounts table (M-Pesa, bank, cash, branch tills)
create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text not null check (type in ('mpesa', 'bank', 'cash', 'till')),
  balance_kes numeric default 0,
  currency text default 'KES',
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.accounts to authenticated;
grant all on public.accounts to service_role;

alter table public.accounts enable row level security;

create policy "own accounts read" on public.accounts for select to authenticated using (auth.uid() = user_id);
create policy "own accounts write" on public.accounts for insert to authenticated with check (auth.uid() = user_id);
create policy "own accounts update" on public.accounts for update to authenticated using (auth.uid() = user_id);
create policy "own accounts delete" on public.accounts for delete to authenticated using (auth.uid() = user_id);

-- Index for faster queries
create index accounts_user_id_idx on public.accounts(user_id);
