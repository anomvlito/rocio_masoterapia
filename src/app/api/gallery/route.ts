import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("display_order", { ascending: true });

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Solo admins" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const caption = formData.get("caption") as string;
  const category = formData.get("category") as string;

  if (!file) {
    return NextResponse.json({ error: "No se proporcionó archivo" }, { status: 400 });
  }

  const adminSupabase = await createAdminClient();
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const { error: uploadError } = await adminSupabase.storage
    .from("gallery")
    .upload(fileName, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = adminSupabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  const { data, error } = await adminSupabase
    .from("gallery_images")
    .insert({ url: publicUrl, caption, category: category || "general" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
