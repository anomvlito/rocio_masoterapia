export type ServiceType =
  | "descontracturante"
  | "deportivo"
  | "relajante"
  | "kinesico";

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: "user" | "admin";
  created_at: string;
}

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  scheduled_at: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  profile?: Profile;
  service?: Service;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: "treatment" | "facility" | "team" | "general";
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface BusinessHours {
  day: number; // 0=domingo, 1=lunes, ..., 6=sábado
  open_time: string; // "09:00"
  close_time: string; // "19:00"
  is_open: boolean;
}
