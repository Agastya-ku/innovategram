import { NextResponse } from 'next/server';
import { initialInnovations } from '@/data/mockInnovations';
import { Innovation } from '@/types/innovategram';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get('sector');
  const state = searchParams.get('state');
  const query = searchParams.get('q');

  let results = [...initialInnovations];

  if (sector && sector !== 'all') {
    results = results.filter(i => i.sector === sector);
  }

  if (state && state !== 'all') {
    results = results.filter(i => i.location.state === state);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      i =>
        i.title.en.toLowerCase().includes(q) ||
        i.title.hi.toLowerCase().includes(q) ||
        i.title.gu.toLowerCase().includes(q) ||
        i.originalTranscript.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newId = `IG-2026-00${1025 + Math.floor(Math.random() * 9000)}`;

    const newRecord: Innovation = {
      ...body,
      id: newId,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      isSampleData: false
    };

    return NextResponse.json({
      success: true,
      data: newRecord
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

