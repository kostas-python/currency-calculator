import type { NextApiRequest, NextApiResponse } from 'next';



// Centralized rates data (mock database, acting as in-memory storage for exchange rates)
const rates: Record<string, number> = {
  "USD-EUR": 0.84,
  "EUR-USD": 1.3764,
  "USD-GBP": 0.75,
  "GBP-USD": 1.3333,
  "USD-CHF": 1.1379,
  "CHF-USD": 1.1379,
  "USD-JPY": 76.7200,
  "JPY-USD": 0.013,
  "USD-CAD": 1.25,
  "CAD-USD": 0.8,
  "EUR-GBP": 0.8731,
  "GBP-EUR": 1.145,
  "EUR-CHF": 1.2079,
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
  const directRateKey = `${base}-${target}`;              // Key for direct conversion (e.g., USD-EUR)
  const inverseRateKey = `${target}-${base}`;             // Key for inverse conversion (e.g., EUR-USD)
  

  // Return the direct rate if available, otherwise calculate and return the inverse rate
  return rates[directRateKey] ?? (1 / rates[inverseRateKey]);   
}


// Main API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;     // Extract the HTTP method (GET, POST, PUT, DELETE) from the request

  switch (method) {
    case "GET": {
      // Handle GET requests: fetch exchange rate for a specific pair, or return all rates
      const { base, target } = req.query;  // Extract the 'base' and 'target' query parameters
    

      if (!base && !target) {
        // If no base or target is provided, return all available rates
        res.status(200).json(Object.entries(rates).map(([pair, rate]) => ({ pair, rate })));
        return;
      }

    
      // Validate that both 'base' and 'target' are present and are strings
      if (!base || !target || typeof base !== "string" || typeof target !== "string") {
        res.status(400).json({ error: "Missing or invalid 'base' or 'target' parameters" });
        return;
      }
    

      // Get the exchange rate for the provided base and target
      const rate = getExchangeRate(base, target);
    

      // If rate is found, return it, otherwise respond with an error
      if (rate !== undefined) {
        res.status(200).json({ rate });
      } else {
        res.status(404).json({ error: "Exchange rate not found for the given pair" });
      }
      break;
    }
    

    case "POST": {
      // Handle POST requests: add a new exchange rate
      const { pair, rate } = req.body; // Extract 'pair' and 'rate' from the request body

      // Validate the request data
      if (!pair || typeof rate !== "number") {
        res.status(400).json({ error: "Invalid pair or rate" });
        return;
      }

      // Add the new rate to the in-memory 'rates' object
      rates[pair] = rate;

      // Respond with the newly added rate
      res.status(201).json({ pair, rate });
      break;
    }

    
    case "PUT": {
      // Handle PUT requests: update an existing exchange rate
      const { pair, rate } = req.body;                // Extract 'pair' and 'rate' from the request body

      // Validate the request data
      if (!pair || typeof rate !== "number" || !rates[pair]) {
        res.status(400).json({ error: "Invalid or non-existing pair" });
        return;
      }

      // Update the rate in the in-memory 'rates' object
      rates[pair] = rate;

      // Respond with the updated rate
      res.status(200).json({ pair, rate });
      break;
    }

    
    case "DELETE": {
      // Handle DELETE requests: remove a specific exchange rate
      const { pair } = req.query;                // Extract the 'pair' query parameter

      // Validate the 'pair' parameter
      if (typeof pair !== "string" || !rates[pair]) {
        res.status(400).json({ error: "Invalid or non-existing pair" });
        return;
      }
      

      // Delete the rate from the 'rates' object
      delete rates[pair];

      // Respond with no content (successful deletion)
      res.status(204).end();
      break;
    }

    default: {
      // Handle unsupported HTTP methods
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]); // Specify allowed methods
      res.status(405).end(`Method ${method} Not Allowed`); // Respond with method not allowed error
    }
  }
}
