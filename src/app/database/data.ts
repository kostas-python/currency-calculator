
import dotenv from 'dotenv';
<<<<<<<< HEAD:src/app/database/data/index.ts
import User from '@/app/models/user';
import Currency from '@/app/models/currency';
import { seedCurrencies } from '@/app/database/seed';  // Import the seed function
========
import { seedCurrencies } from '@/app/database/seed';  // Import the seed function
import { Sequelize } from 'sequelize';
import User from '@/models/user';
import Currency from '@/models/currency';
>>>>>>>> 131758f8288e8363f77159de0c647c00a013f411:src/app/database/data.ts

dotenv.config();

// Initialize the Sequelize instance with SQLite as the dialect
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Combined function for syncing and optionally seeding the database
async function initializeDatabase() {
  try {
    // Sync all models with the database
    await sequelize.sync();
    console.log('Database synced successfully');
    
    // Seed initial currency data if necessary
    await seedCurrencies();
    console.log('Initial currency data seeded');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

// Initialize and sync the database
initializeDatabase();

// Export Sequelize instance and models for use in other files
export { sequelize, User, Currency };

