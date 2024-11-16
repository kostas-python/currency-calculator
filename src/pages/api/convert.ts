import type { NextApiRequest, NextApiResponse } from 'next';

// Centralized rates data (mock database, acting as in-memory storage for exchange rates)
let rates: Record<string, number> = {
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

// Helper function to fetch exchange rate
// Supports both direct and inverse rates (e.g., USD-EUR and EUR-USD)
function getExchangeRate(base: string, target: string): number | undefined {
  const directRateKey = `${base}-${target}`; // Key for direct conversion
  const inverseRateKey = `${target}-${base}`; // Key for inverse conversion
  return rates[directRateKey] ?? (1 / rates[inverseRateKey]); // Return direct rate or inverse if exists
}

// Main API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req; // Extract the HTTP method of the request

  switch (method) {
    case "GET": {
      // Extract 'base' and 'target' from the query parameters
      const { base, target } = req.query;

      // Validate query parameters
      if (!base || !target || typeof base !== 'string' || typeof target !== 'string') {
        res.status(400).json({ error: "Missing or invalid 'base' or 'target' parameters" });
        return;
      }

      // Get the exchange rate using the helper function
      const rate = getExchangeRate(base, target);

      // If the rate is found, return it, otherwise send an error
      if (rate !== undefined) {
        res.status(200).json({ rate });
      } else {
        res.status(404).json({ error: "Exchange rate not found for the given pair" });
      }
      break;
    }
    case "POST": {
      // Handle POST requests: add a new rate
      const { pair, rate } = req.body; // Extract data from the request body

      // Validate the request data
      if (!pair || typeof rate !== "number") {
        res.status(400).json({ error: "Invalid pair or rate" });
        return;
      }

      // Add the new rate to the rates object
      rates[pair] = rate;

      // Respond with the created rate
      res.status(201).json({ pair, rate });
      break;
    }
    case "PUT": {
      // Handle PUT requests: update an existing rate
      const { pair, rate } = req.body; // Extract data from the request body

      // Validate the request data
      if (!pair || typeof rate !== "number" || !rates[pair]) {
        res.status(400).json({ error: "Invalid or non-existing pair" });
        return;
      }

      // Update the rate in the rates object
      rates[pair] = rate;

      // Respond with the updated rate
      res.status(200).json({ pair, rate });
      break;
    }
    case "DELETE": {
      // Handle DELETE requests: remove a rate
      const { pair } = req.query; // Extract the pair from the query string

      // Validate the pair parameter
      if (typeof pair !== "string" || !rates[pair]) {
        res.status(400).json({ error: "Invalid or non-existing pair" });
        return;
      }

      // Delete the rate from the rates object
      delete rates[pair];

      // Respond with no content
      res.status(204).end();
      break;
    }
    default: {
      // Handle unsupported methods
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]); // Inform the client about supported methods
      res.status(405).end(`Method ${method} Not Allowed`); // Respond with method not allowed
    }
  }
}


