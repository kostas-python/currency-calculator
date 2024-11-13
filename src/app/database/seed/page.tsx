import Currency from "@/app/models/currency/page";
import { sequelize } from "../data/page";

// Endpoints 

const initialCurrencyRates = [
  { base: 'Euro', target: 'US Dollar', rate: 1.3764 },
  { base: 'Euro', target: 'Swiss Franc', rate: 1.2079 },
  { base: 'Euro', target: 'British Pound', rate: 0.8731 },
  { base: 'US Dollar', target: 'JPY', rate: 76.7200 },
  { base: 'Swiss Franc', target: 'US Dollar', rate: 1.1379 },
  { base: 'British Pound', target: 'CAD', rate: 1.5648 },
];


async function seedCurrencies() {
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
