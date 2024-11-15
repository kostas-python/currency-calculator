import Currency from '@/app/models/currency/page';
import { NextResponse } from 'next/server';


// Currency conversion

export async function POST(req: Request) {
  const { base, target, amount } = await req.json();

  try {
    const currency = await Currency.findOne({ where: { base, target } });
    if (!currency) {
      return NextResponse.json({ message: 'Conversion rate not found' }, { status: 404 });
    }

    const convertedAmount = amount * currency.rate;
    return NextResponse.json({ convertedAmount });
  } catch (err: unknown) {

    // Check if err is an instance of Error to safely access message

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}


// Add a new currency exchange rate (CRUD section)

export async function POST_ADD(req: Request) {
  const { base, target, rate } = await req.json();

  try {
    const currency = await Currency.create({ base, target, rate });
    return NextResponse.json(currency);
  } catch (err: unknown) {

    // Check if err is an instance of Error to safely access message

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}


// Update an existing currency rate

export async function PUT(req: Request) {
  const { base, target, rate } = await req.json();

  try {
    const currency = await Currency.findOne({ where: { base, target } });
    if (!currency) {
      return NextResponse.json({ message: 'Currency not found' }, { status: 404 });
    }

    currency.rate = rate;
    await currency.save();
    return NextResponse.json(currency);
  } catch (err: unknown) {

    // Check if err is an instance of Error to safely access message

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}


// Delete a currency exchange rate

export async function DELETE(req: Request) {
  const { base, target } = await req.json();

  try {
    const currency = await Currency.findOne({ where: { base, target } });
    if (!currency) {
      return NextResponse.json({ message: 'Currency not found' }, { status: 404 });
    }

    await currency.destroy();
    return NextResponse.json({ message: 'Currency deleted' });
  } catch (err: unknown) {

    // Check if err is an instance of Error to safely access message

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

