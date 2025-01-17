
import Currency from '@/models/currency';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { base, target, rate } = await req.json();

  try {
    // Add a new currency conversion rate
    const currency = await Currency.create({ base, target, rate });
    return NextResponse.json(currency);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
