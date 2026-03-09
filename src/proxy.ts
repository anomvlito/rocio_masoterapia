import { NextResponse, type NextRequest } from "next/server";

// Auth & booking disabled for MVP demo — redirect to WhatsApp instead
export async function proxy(request: NextRequest) {
  return NextResponse.next({ request });
}

export const config = {
  matcher: [],
};
