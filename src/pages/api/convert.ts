import type { NextApiRequest, NextApiResponse } from 'next';

const rates: Record<string, number> = {
  "USD-EUR": 0.84,
  "EUR-USD": 1.19,
  "USD-GBP": 0.75,
  "GBP-USD": 1.3333,
  "USD-CHF": 1.1379,
  "CHF-USD": 0.8794,
  "USD-JPY": 76.7200,
  "JPY-USD": 0.013,
  "USD-CAD": 1.25,
  "CAD-USD": 0.8,
  "EUR-GBP": 0.8731,
  "GBP-EUR": 1.145,
  "EUR-CHF": 1.349,
  "CHF-EUR": 0.741,
  "EUR-JPY": 91.25,
  "JPY-EUR": 0.01095,
  "GBP-CHF": 1.322,
  "CHF-GBP": 0.7565,
  "GBP-JPY": 102.16,
  "JPY-GBP": 0.00979,
  "CHF-JPY": 67.52,
  "JPY-CHF": 0.0148,
  "CAD-EUR": 0.672,
  "EUR-CAD": 1.488,
  "CAD-GBP": 0.600,
  "GBP-CAD": 1.5648,
  "CAD-CHF": 0.7115,
  "CHF-CAD": 1.403,
  "CAD-JPY": 61.44,
  "JPY-CAD": 0.0163
};


// Helper function to fetch exchange rate from rates
function getExchangeRate(base: string, target: string): number | undefined {
  const directRateKey = `${base}-${target}`;
  const inverseRateKey = `${target}-${base}`;
  
  console.log(`Looking up rate for: ${base}-${target} or inverse ${target}-${base}`);

  return rates[directRateKey] ?? (1 / rates[inverseRateKey]);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { base, target } = req.query;

  // Log the incoming request for debugging
  console.log(`Received request: base=${base}, target=${target}`);

  // Validate query parameters
  if (!base || !target || typeof base !== 'string' || typeof target !== 'string') {
    console.error("Invalid or missing base or target currency", { base, target });
    return res.status(400).json({ error: "Invalid base or target currency" });
  }

  // Get exchange rate (either direct or inverse)
  const baseStr = base?.toUpperCase() ?? '';  // Default to empty string if undefined
  const targetStr = target?.toUpperCase() ?? '';

  const rate = getExchangeRate(baseStr, targetStr);

  if (rate !== undefined) {
    console.log(`Returning exchange rate for ${baseStr}-${targetStr}: ${rate}`);
    return res.status(200).json({ rate });
  } else {
    console.error(`Rate not found for ${baseStr}-${targetStr}`);
    return res.status(404).json({ error: "Rate not found" });
  }
}

