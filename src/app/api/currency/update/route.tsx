
import Currency from '@/models/currency';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { base, target, rate } = await req.json();

  try {
    // Find the existing currency record
    const currency = await Currency.findOne({ where: { base, target } });

    if (!currency) {
      return NextResponse.json({ message: 'Currency not found' }, { status: 404 });
    }

    // Update the rate and save
    currency.rate = rate;
    await currency.save();

    return NextResponse.json(currency);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
