-- Advisor Messages table (AI chat persistence)
create table public.advisor_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  parts jsonb not null,
  created_at timestamptz not null default now()
);

grant select, insert on public.advisor_messages to authenticated;
grant all on public.advisor_messages to service_role;

alter table public.advisor_messages enable row level security;

create policy "own advisor messages read" on public.advisor_messages for select to authenticated using (auth.uid() = user_id);
create policy "own advisor messages write" on public.advisor_messages for insert to authenticated with check (auth.uid() = user_id);

-- Index for faster queries
create index advisor_messages_user_id_created_at_idx on public.advisor_messages(user_id, created_at asc);
