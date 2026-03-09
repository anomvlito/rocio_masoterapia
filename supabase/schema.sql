-- ============================================
-- Masoy Rehabilitación - Supabase Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now() not null
);

-- RLS for profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- SERVICES
-- ============================================
create table public.services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null check (type in ('descontracturante', 'deportivo', 'relajante', 'kinesico')),
  description text,
  duration_minutes integer not null default 60,
  price numeric(10,2) not null,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

alter table public.services enable row level security;

-- Anyone can read services
create policy "Public can view active services"
  on public.services for select
  using (is_active = true);

-- Only admin can modify services
create policy "Admins can manage services"
  on public.services for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Seed services
insert into public.services (name, type, description, duration_minutes, price) values
  ('Masaje Descontracturante', 'descontracturante', 'Técnica específica para liberar tensiones musculares acumuladas, ideal para contracturas cervicales, dorsales y lumbares.', 60, 30000),
  ('Masaje Deportivo', 'deportivo', 'Diseñado para deportistas, mejora el rendimiento, previene lesiones y acelera la recuperación post-entrenamiento.', 60, 35000),
  ('Masaje Relajante', 'relajante', 'Técnica suave que reduce el estrés, alivia la tensión nerviosa y promueve el bienestar general.', 60, 25000),
  ('Tratamiento Kinésico', 'kinesico', 'Evaluación y tratamiento kinésico personalizado por diagnóstico médico. Para bebés, adultos y adultos mayores.', 45, 40000);

-- ============================================
-- BUSINESS HOURS
-- ============================================
create table public.business_hours (
  id uuid primary key default uuid_generate_v4(),
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0=domingo
  open_time time not null,
  close_time time not null,
  is_open boolean default true,
  unique(day_of_week)
);

alter table public.business_hours enable row level security;

create policy "Public can view business hours"
  on public.business_hours for select to anon, authenticated using (true);

create policy "Admins can manage business hours"
  on public.business_hours for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Seed default hours (Lunes a Sábado)
insert into public.business_hours (day_of_week, open_time, close_time, is_open) values
  (0, '10:00', '14:00', false), -- Domingo: cerrado
  (1, '09:00', '19:00', true),  -- Lunes
  (2, '09:00', '19:00', true),  -- Martes
  (3, '09:00', '19:00', true),  -- Miércoles
  (4, '09:00', '19:00', true),  -- Jueves
  (5, '09:00', '19:00', true),  -- Viernes
  (6, '09:00', '14:00', true);  -- Sábado (media jornada)

-- ============================================
-- APPOINTMENTS
-- ============================================
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  service_id uuid references public.services(id) not null,
  scheduled_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  admin_notes text,
  created_at timestamptz default now() not null
);

alter table public.appointments enable row level security;

-- Users can view and manage own appointments
create policy "Users can view own appointments"
  on public.appointments for select
  using (auth.uid() = user_id);

create policy "Users can create appointments"
  on public.appointments for insert
  with check (auth.uid() = user_id);

create policy "Users can cancel own appointments"
  on public.appointments for update
  using (auth.uid() = user_id)
  with check (status in ('cancelled'));

-- Admins can manage all appointments
create policy "Admins can manage all appointments"
  on public.appointments for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- GALLERY IMAGES
-- ============================================
create table public.gallery_images (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  caption text,
  category text default 'general' check (category in ('treatment', 'facility', 'team', 'general')),
  is_featured boolean default false,
  display_order integer default 0,
  created_at timestamptz default now() not null
);

alter table public.gallery_images enable row level security;

create policy "Public can view gallery"
  on public.gallery_images for select to anon, authenticated using (true);

create policy "Admins can manage gallery"
  on public.gallery_images for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- STORAGE BUCKET for gallery images
-- ============================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true);

create policy "Public gallery images are viewable"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "Admins can upload gallery images"
  on storage.objects for insert
  with check (
    bucket_id = 'gallery' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete gallery images"
  on storage.objects for delete
  using (
    bucket_id = 'gallery' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
