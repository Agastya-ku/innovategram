import { NextResponse } from 'next/server';
import { mockConnectionRequests } from '@/data/mockInnovations';
import { ConnectionRequest } from '@/types/innovategram';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockConnectionRequests
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newReq: ConnectionRequest = {
      ...body,
      id: `CR-2026-00${45 + Math.floor(Math.random() * 900)}`,
      status: 'Pending Innovator Consent',
      createdAt: new Date().toISOString().split('T')[0]
    };

    return NextResponse.json({
      success: true,
      data: newReq
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

