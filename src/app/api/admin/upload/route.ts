import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

const SLOT_MAP: Record<string, string> = {
  hero: 'hero.jpg',
  profile: 'profile.webp',
  gallery1: 'gallery1.webp',
  gallery2: 'gallery2.webp',
};

function isSessionValid(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  const expected = Buffer.from(adminPassword).toString('base64');
  const cookie = request.cookies.get('admin_session');
  return cookie?.value === expected;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isSessionValid(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  const slot = formData.get('slot');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing file field' }, { status: 400 });
  }

  if (typeof slot !== 'string' || !(slot in SLOT_MAP)) {
    return NextResponse.json({ ok: false, error: 'Invalid slot' }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ ok: false, error: 'Invalid file type' }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ ok: false, error: 'File too large' }, { status: 400 });
  }

  const filename = SLOT_MAP[slot];
  const destPath = path.join(process.cwd(), 'public', 'images', filename);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(destPath, buffer);
  } catch {
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
