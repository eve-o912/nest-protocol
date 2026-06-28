-- Financial Passport table (one row per user)
create table public.financial_passport (
  user_id uuid primary key references auth.users(id) on delete cascade,
  score int not null default 0 check (score >= 0 and score <= 850),
  tier text not null default 'bronze' check (tier in ('bronze', 'silver', 'gold')),
  verified_revenue_kes numeric default 0,
  months_active int default 0,
  on_time_rate numeric default 0 check (on_time_rate >= 0 and on_time_rate <= 1),
  updated_at timestamptz not null default now()
);

grant select on public.financial_passport to authenticated;
grant all on public.financial_passport to service_role;

alter table public.financial_passport enable row level security;

create policy "own passport read" on public.financial_passport for select to authenticated using (auth.uid() = user_id);

-- Trigger to update updated_at timestamp
create trigger update_financial_passport_updated_at
  before update on public.financial_passport
  for each row execute procedure public.update_updated_at_column();
