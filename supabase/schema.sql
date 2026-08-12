create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  app_version text not null,
  question_count smallint not null check (question_count between 10 and 15),
  topic_scores jsonb not null,
  comment text not null check (char_length(trim(comment)) between 1 and 1000)
);
alter table public.feedback enable row level security;
revoke all on table public.feedback from anon, authenticated;
grant insert on table public.feedback to anon, authenticated;
drop policy if exists "Anyone may submit feedback" on public.feedback;
create policy "Anyone may submit feedback" on public.feedback for insert to anon, authenticated
with check (char_length(trim(comment)) between 1 and 1000 and question_count between 10 and 15);
-- No SELECT, UPDATE, or DELETE policy exists for public users.
