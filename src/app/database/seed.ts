<<<<<<<< HEAD:src/app/database/seed/index.ts
import { sequelize } from "../data";
import Currency from "@/app/models/currency";
========

import Currency from "@/models/currency";
import { sequelize } from "./data";
>>>>>>>> 131758f8288e8363f77159de0c647c00a013f411:src/app/database/seed.ts

// Remove the initialCurrencyRates array since it's no longer needed

export async function seedCurrencies() {
  try {
    await sequelize.sync(); // Ensure the tables are created

    // Optional: Skip seeding logic if you are managing rates dynamically
    const count = await Currency.count();
    if (count === 0) {
      console.log('Currency rates are not being seeded. They are managed dynamically.');
    } else {
      console.log('Currency rates already exist in the database.');
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
}
