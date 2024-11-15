import Currency from "@/app/models/currency/page";
import { sequelize } from "../data/page";

// Endpoints 

const initialCurrencyRates = [
  { base: 'EUR', target: 'USD', rate: 1.3764 },
  { base: 'EUR', target: 'CHF', rate: 1.2079 },
  { base: 'EUR', target: 'GBP', rate: 0.8731 },
  { base: 'USD', target: 'JPY', rate: 76.7200 },
  { base: 'CHF', target: 'USD', rate: 1.1379 },
  { base: 'GBP', target: 'CAD', rate: 1.5648 },
];


export async function seedCurrencies() {
  try {
    await sequelize.sync();

    // Check if the currency table is empty, and if so, insert the initial rates

    const count = await Currency.count();
    if (count === 0) {
      await Currency.bulkCreate(initialCurrencyRates);
      console.log('Initial currency rates added to the database.');
    } else {
      console.log('Currency rates already exist in the database.');
    }
  } catch (error) {
    console.error('Error seeding currency data:', error);
  }
}

seedCurrencies();
