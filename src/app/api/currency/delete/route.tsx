
import Currency from '@/models/currency';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { base, target } = await req.json();

  try {
    // Find the currency record
    const currency = await Currency.findOne({ where: { base, target } });

    if (!currency) {
      return NextResponse.json({ message: 'Currency not found' }, { status: 404 });
    }

    // Delete the record
    await currency.destroy();
    return NextResponse.json({ message: 'Currency deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
