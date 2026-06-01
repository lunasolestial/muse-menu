-- ============================================================
-- Muse & Menu Society — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── Enums ────────────────────────────────────────────────────────────────────
create type user_role            as enum ('public', 'member', 'admin');
create type membership_tier      as enum ('society', 'salon', 'patron');
create type membership_status    as enum ('applied', 'invited', 'active', 'paused', 'rejected');
create type event_visibility     as enum ('public', 'members_only');
create type event_status         as enum ('draft', 'announced', 'invitation_release', 'composed', 'waitlist_only', 'archived');
create type rsvp_status          as enum ('pending', 'confirmed', 'waitlisted', 'declined', 'cancelled');
create type partner_type         as enum ('chef', 'vendor', 'venue');
create type archive_visibility   as enum ('public_excerpt', 'members_only');
create type guest_request_status as enum ('pending', 'approved', 'declined');

-- ── Users ─────────────────────────────────────────────────────────────────────
create table users (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null unique,
  name       text,
  created_at timestamptz default now(),
  role       user_role not null default 'public'
);

alter table users enable row level security;
create policy "users can read own row"   on users for select using (auth.uid() = id);
create policy "users can update own row" on users for update using (auth.uid() = id);
create policy "admins can read all"      on users for select using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- Auto-create user row on auth signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Memberships ───────────────────────────────────────────────────────────────
create table memberships (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references users(id) on delete cascade,
  tier       membership_tier not null default 'society',
  status     membership_status not null default 'applied',
  start_date date,
  end_date   date,
  notes      text,
  created_at timestamptz default now()
);

alter table memberships enable row level security;
create policy "members can read own membership" on memberships for select using (auth.uid() = user_id);
create policy "admins can manage all memberships" on memberships for all using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── Member Profiles ───────────────────────────────────────────────────────────
create table member_profiles (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null unique references users(id) on delete cascade,
  dietary_restrictions     text,
  hard_nos                 text,
  favorite_flavors         text,
  dislikes                 text,
  seating_preferences      text,
  celebration_notes        text,
  celebration_dates        jsonb,
  accessibility_needs      text,
  conversation_preferences text,
  default_guest_name       text,
  default_guest_notes      text,
  updated_at               timestamptz default now()
);

alter table member_profiles enable row level security;
create policy "members can manage own profile" on member_profiles for all using (auth.uid() = user_id);
create policy "admins can read all profiles" on member_profiles for select using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── Events ────────────────────────────────────────────────────────────────────
create table events (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  date                timestamptz not null,
  location            text not null,
  capacity            int not null default 24,
  visibility          event_visibility not null default 'members_only',
  status              event_status not null default 'draft',
  theme_title         text,
  muse_note_public    text,
  muse_note_member    text,
  menu_preview_public text,
  menu_full_member    text,
  dress_note          text,
  photo_policy        text,
  created_at          timestamptz default now()
);

alter table events enable row level security;
-- Public can see public events
create policy "public can view public events" on events for select using (
  visibility = 'public' and status not in ('draft')
);
-- Members can see all non-draft events
create policy "members can view all events" on events for select using (
  exists (select 1 from users where id = auth.uid() and role in ('member', 'admin'))
  and status != 'draft'
);
-- Admins can manage events
create policy "admins can manage events" on events for all using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── RSVPs ─────────────────────────────────────────────────────────────────────
create table rsvps (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references users(id) on delete cascade,
  event_id              uuid not null references events(id) on delete cascade,
  status                rsvp_status not null default 'pending',
  guest_count           int not null default 0,
  dietary_confirmation  text,
  private_note_to_host  text,
  created_at            timestamptz default now(),
  unique (user_id, event_id)
);

alter table rsvps enable row level security;
create policy "members can manage own rsvps" on rsvps for all using (auth.uid() = user_id);
create policy "admins can view all rsvps" on rsvps for select using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── Guest Requests ────────────────────────────────────────────────────────────
create table guest_requests (
  id                uuid primary key default gen_random_uuid(),
  rsvp_id           uuid not null references rsvps(id) on delete cascade,
  guest_name        text not null,
  relationship_note text,
  status            guest_request_status not null default 'pending',
  created_at        timestamptz default now()
);

alter table guest_requests enable row level security;
create policy "members can manage own guest requests" on guest_requests for all using (
  exists (select 1 from rsvps where rsvps.id = rsvp_id and rsvps.user_id = auth.uid())
);
create policy "admins can manage all guest requests" on guest_requests for all using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── Archive Posts ─────────────────────────────────────────────────────────────
create table archive_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  event_id        uuid references events(id) on delete set null,
  title           text not null,
  lede            text not null,
  body            text not null,
  gallery         jsonb default '[]',
  menu_highlights jsonb default '[]',
  muse_notes      text,
  published_at    timestamptz,
  visibility      archive_visibility not null default 'members_only'
);

alter table archive_posts enable row level security;
create policy "public can see public excerpts" on archive_posts for select using (
  visibility = 'public_excerpt' and published_at is not null
);
create policy "members can read all archive" on archive_posts for select using (
  exists (select 1 from users where id = auth.uid() and role in ('member', 'admin'))
  and published_at is not null
);
create policy "admins can manage archive" on archive_posts for all using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── Partner Inquiries ─────────────────────────────────────────────────────────
create table partner_inquiries (
  id          uuid primary key default gen_random_uuid(),
  type        partner_type not null,
  name        text not null,
  brand       text,
  email       text not null,
  website     text,
  credentials text,
  message     text not null,
  created_at  timestamptz default now()
);

alter table partner_inquiries enable row level security;
create policy "anyone can submit partner inquiry" on partner_inquiries for insert with check (true);
create policy "admins can view partner inquiries" on partner_inquiries for select using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);

-- ── Sponsor Inquiries ─────────────────────────────────────────────────────────
create table sponsor_inquiries (
  id             uuid primary key default gen_random_uuid(),
  brand          text not null,
  contact_name   text not null,
  email          text not null,
  website        text,
  budget_range   text,
  alignment_note text not null,
  created_at     timestamptz default now()
);

alter table sponsor_inquiries enable row level security;
create policy "anyone can submit sponsor inquiry" on sponsor_inquiries for insert with check (true);
create policy "admins can view sponsor inquiries" on sponsor_inquiries for select using (
  exists (select 1 from users where id = auth.uid() and role = 'admin')
);
