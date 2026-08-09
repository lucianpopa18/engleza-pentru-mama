-- ═══════════════════════════════════════════════════════════════
--  Schema bazei de date — rulează o dată în Supabase → SQL Editor.
--  Tabelul „progres": un rând per utilizator, cu tot progresul (jsonb).
--  RLS: fiecare utilizator vede și scrie DOAR rândul lui.
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.progres (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  date       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progres enable row level security;

drop policy if exists "citeste propriul progres"     on public.progres;
drop policy if exists "insereaza propriul progres"    on public.progres;
drop policy if exists "actualizeaza propriul progres" on public.progres;
drop policy if exists "sterge propriul progres"       on public.progres;

create policy "citeste propriul progres"
  on public.progres for select
  using (auth.uid() = user_id);

create policy "insereaza propriul progres"
  on public.progres for insert
  with check (auth.uid() = user_id);

create policy "actualizeaza propriul progres"
  on public.progres for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "sterge propriul progres"
  on public.progres for delete
  using (auth.uid() = user_id);
