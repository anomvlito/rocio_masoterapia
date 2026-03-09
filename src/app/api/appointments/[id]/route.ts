import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const body = await request.json();
  const isAdmin = profile?.role === "admin";

  // Usuarios solo pueden cancelar sus propias citas
  if (!isAdmin) {
    const { data: appointment } = await supabase
      .from("appointments")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!appointment || appointment.user_id !== user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    if (body.status && body.status !== "cancelled") {
      return NextResponse.json(
        { error: "Solo puedes cancelar tu cita" },
        { status: 403 }
      );
    }
  }

  const updateData = isAdmin
    ? { status: body.status, admin_notes: body.admin_notes, scheduled_at: body.scheduled_at }
    : { status: "cancelled" };

  const { data, error } = await supabase
    .from("appointments")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
