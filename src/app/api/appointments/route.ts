import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const query = supabase
    .from("appointments")
    .select(`
      *,
      service:services(*),
      profile:profiles(full_name, email, phone)
    `)
    .order("scheduled_at", { ascending: true });

  // Admins ven todas las citas, usuarios solo las propias
  if (!profile || profile.role !== "admin") {
    query.eq("user_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { service_id, scheduled_at, notes } = body;

  if (!service_id || !scheduled_at) {
    return NextResponse.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  // Verificar que el slot esté disponible
  const { data: existing } = await supabase
    .from("appointments")
    .select("id")
    .eq("scheduled_at", scheduled_at)
    .in("status", ["pending", "confirmed"])
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "Ese horario ya está reservado" },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      user_id: user.id,
      service_id,
      scheduled_at,
      notes,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
