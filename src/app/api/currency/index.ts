
import Currency from '@/models/currency';
import { NextResponse } from 'next/server';


// Currency conversion endpoint (POST)
export async function POST(req: Request) {

  // Destructure base currency, target currency, and the amount from the request body
  const { base, target, amount } = await req.json();

  try {
    // Fetch the currency conversion rate from the database based on the base and target currencies
    const currency = await Currency.findOne({ where: { base, target } });
    
    // If no conversion rate is found, return a 404 error
    if (!currency) {
      return NextResponse.json({ message: 'Conversion rate not found' }, { status: 404 });
    }

    // Perform the conversion and calculate the converted amount
    const convertedAmount = amount * currency.rate;
    return NextResponse.json({ convertedAmount }); // Return the converted amount as a JSON response
  } catch (err: unknown) {
    
    // Handle errors by checking if the error is an instance of Error to safely access its message
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 }); // Return the error message with a 500 status
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 }); // Fallback for unknown errors
    }
  }
}


// Add a new currency exchange rate (CRUD section)
export async function POST_ADD(req: Request) {
  // Destructure base, target, and rate from the request body to create a new currency rate
  const { base, target, rate } = await req.json();

  try {
    // Create a new currency exchange rate in the database
    const currency = await Currency.create({ base, target, rate });
    return NextResponse.json(currency); // Return the newly created currency rate
  } catch (err: unknown) {
    // Handle errors similarly by checking if the error is an instance of Error
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 }); // Return the error message with a 500 status
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 }); // Fallback for unknown errors
    }
  }
}


// Update an existing currency rate (CRUD section)

export async function PUT(req: Request) {

  // Destructure base, target, and rate from the request body to update an existing currency rate
  const { base, target, rate } = await req.json();

  try {
    // Find the existing currency conversion rate in the database
    const currency = await Currency.findOne({ where: { base, target } });
    
    // If no currency record is found, return a 404 error
    if (!currency) {
      return NextResponse.json({ message: 'Currency not found' }, { status: 404 });
    }

    // Update the rate of the existing currency record
    currency.rate = rate;
    await currency.save();           // Save the updated currency record to the database
    return NextResponse.json(currency);      // Return the updated currency record
  } catch (err: unknown) {

    // Handle errors safely as in previous functions
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}


// Delete a currency exchange rate (CRUD section)

export async function DELETE(req: Request) {

  // Destructure base and target from the request body to identify the currency to delete
  const { base, target } = await req.json();

  try {
    // Find the currency record in the database based on base and target

    const currency = await Currency.findOne({ where: { base, target } });
    
    // If no currency record is found, return a 404 error

    if (!currency) {
      return NextResponse.json({ message: 'Currency not found' }, { status: 404 });
    }

    // Destroy (delete) the currency record from the database

    await currency.destroy();
    return NextResponse.json({ message: 'Currency deleted' }); // Return a success message
  } catch (err: unknown) {

    // Handle errors as in the other functions
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
