import type { NextApiRequest, NextApiResponse } from 'next';



// Define rates with string keys and number values

const rates: Record<string, number> = {
  "USD-EUR": 0.84,
  "EUR-USD": 1.19,
  "EUR-GBP": 0.8731,
  "USD-JPY": 76.7200,
  "CHF-USD": 1.1379,
  "GBP-CAD": 1.5648,
  // Add other rates as needed
};


// Helper function to fetch exchange rate from rates
function getExchangeRate(base: string, target: string): number | undefined {
  // Create keys for both direct and inverse exchange rates
  const directRateKey = `${base}-${target}`;
  const inverseRateKey = `${target}-${base}`;


  // First, check for direct rate, then for inverse rate
  return rates[directRateKey] ?? (1 / rates[inverseRateKey]);
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { base, target } = req.query;


  // Validate query parameters
  if (!base || !target || typeof base !== 'string' || typeof target !== 'string') {
    return res.status(400).json({ error: "Invalid base or target currency" });
  }

  // Get exchange rate (either direct or inverse)

  const rate = getExchangeRate(base.toUpperCase(), target.toUpperCase());


  if (rate !== undefined) {
    res.status(200).json({ rate });
  } else {
    res.status(404).json({ error: "Rate not found" });
  }
}
