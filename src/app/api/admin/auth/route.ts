import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as Record<string, unknown>).password !== 'string'
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { password } = body as { password: string };
  const adminPassword = process.env.ADMIN_PASSWORD || '';

  if (password !== adminPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieValue = Buffer.from(adminPassword).toString('base64');

  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', cookieValue, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 86400,
  });

  return response;
}
